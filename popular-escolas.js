var app = require('./config/server');
var path = require('path');
const csv = require('csvtojson');

var tiposModel = app.app.models.tiposModel;
var estadosModel = app.app.models.estadosModel;
var cidadesModel = app.app.models.cidadesModel;
var distitosModel = app.app.models.distritosModel;
var bairrosModel = app.app.models.bairrosModel;

var connection = app.config.dbConnection();

var cvsPath =  path.dirname(require.main.filename) +'/'+'escolas.csv';
const csvFilePath = cvsPath;
console.log(cvsPath);
var contador = 0;
var limit = 10;
var escolas = [];
var tipo = []

csv()
  .fromFile(csvFilePath)
  .on('csv', (csvRow)=>{
      // Converte a linha em um Array
      var data = csvRow[0].toString().split(";")
      //seta a variavel com a posição do Array
      var endereco = data[6];
      var distrito = data[12];
      var cidade = data[15];

      if(endereco != undefined || distrito != undefined || cidade != undefined){
          escolas[contador] = parse(data);
          contador = contador + 1;
      }

  })
  .on('done',(error)=>{
      popularBd(escolas)
});


function popularBd(escolas){
  populaTipo(escolas);
  populaEstado(escolas);
  populaCidade(escolas);
  populaDistrito(escolas);
  populaBairro(escolas);
};


function populaTipo(escolas){
  var values = []
  var res = []
  for(i = 0; i < escolas.length; i++){
    if(values.indexOf(escolas[i].tipodesc) <= 0 ){
        values.push(escolas[i].tipodesc);
    };
  };
  tipos = values.filter(function(item, pos) {
    return values.indexOf(item) == pos ;
  });

  for(i = 0; i < tipos.length; i++){
      res.push([tipos[i]]);
  }

  tiposModel.postTipo(res, connection, function(err, result){
    console.log(result);
  });
}

function populaEstado(escolas){
  var values = []
  var res = []
  for(i = 0; i < escolas.length; i++){
    if(values.indexOf(escolas[i].estado) <= 0 ){
        values.push(escolas[i].estado);
    };
  };
  estados = values.filter(function(item, pos) {
    return values.indexOf(item) == pos ;
  });
  for(i = 0; i < estados.length; i++){
      res.push([estados[i]]);
  }
  estadosModel.postEstado(res, connection, function(err, result){
    console.log(result);
  });
}

function populaCidade(escolas){

  var cidades = []
  var res = []
  var resultado = []
  var estados = []

  for(i = 0; i < escolas.length; i++){
      cidades.push(escolas[i].cidade,escolas[i].estado);
  };

  cidadesUnique = cidades.filter(function(item, pos) {
    return cidades.indexOf(item) == pos;
  });

  var map = cidadesUnique.reduce(function(prev, cur) {
      prev[cur] = prev[cur];
      return prev;
    }, {});


  for (var key in map) {
      cid = key.split(',');
      if(cid[0] != '' && cid[1] != ''){
         res.push(cid);
      }
  }

  for(var i = 0; i < res.length; i = i + 2){
      resultado.push(res[i].concat(res[i + 1]));
  }

  resultado.forEach(function(value){
    cidadesModel.postCidadeDescEstado(value, connection, function(err, result){
        console.log(result);
    });
  });

}

function populaDistrito(escolas){

  var distrito = []
  var cidade = []
  var res = []

  for(i = 0; i < escolas.length; i++){
    distrito.push([escolas[i].distrito,escolas[i].cidade]);
  };

  distritoUnique = distrito.filter(function(item, pos) {
    return distrito.indexOf(item) == pos;
  });

  var map = distritoUnique.reduce(function(prev, cur) {
    prev[cur] = prev[cur];
    return prev;
  }, {});

 for (var key in map) {
   dist = key.split(',');
   if(dist[0] != '' && dist[1] != ''){
     res.push(dist);
   }
 }

 res.forEach(function(value){
   distitosModel.postDistritoDescCidade(value, connection, function(err, result){
       console.log(result);
   });
 });

}

function populaBairro(escolas){

  var bairro = []
  var distrito = []
  var res = []

  for(i = 0; i < escolas.length; i++){
    bairro.push([escolas[i].bairro,escolas[i].distrito]);
  };

  bairroUnique = bairro.filter(function(item, pos) {
    return bairro.indexOf(item) == pos;
  });

  var map = bairroUnique.reduce(function(prev, cur) {
    prev[cur] = prev[cur];
    return prev;
  }, {});

  for (var key in map) {
    dist = key.split(',');
    if(dist[0] != '' && dist[1] != ''){
      res.push(dist);
    }
  }

  res.forEach(function(value){
    bairrosModel.postBairroDescDistrito(value, connection, function(err, result){
        console.log(result);
    });
  });

}

function parse(data){
  var result = '{ "tipodesc" : null, "nomesc" : null, "diretoria" : null, "subpref" : null, "ceu" : null, "endereco" : null, "numero" : null, "bairro" : null, "cep" : null, "tel1" : null, "tel2" : null, "situacao" : null, "distrito" : null, "latitude" : null, "longitude" : null, "cidade" : null, "estado" : null }';
  var resultJson = JSON.parse(result);

  resultJson.tipodesc = data[0];
  resultJson.nomesc = data[1];
  resultJson.diretoria = data[2];
  resultJson.subpref = data[3];
  resultJson.ceu = data[4];
  resultJson.endereco = data[5];
  resultJson.numero = data[6];
  resultJson.bairro = data[7];
  resultJson.cep = data[8];
  resultJson.tel1 = data[9];
  resultJson.tel2 = data[10];
  resultJson.situacao = data[11];
  resultJson.distrito = data[12];
  resultJson.latitude = data[13];
  resultJson.longitude = data[14];
  resultJson.cidade = data[15];
  resultJson.estado = data[16];

  return resultJson
}

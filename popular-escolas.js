var app = require('./config/server');
var path = require('path');
const csv = require('csvtojson');

var tiposModel = app.app.models.tiposModel;
var estadosModel = app.app.models.estadosModel;
var cidadesModel = app.app.models.cidadesModel;
var distitosModel = app.app.models.distritosModel;
var bairrosModel = app.app.models.bairrosModel;
var enderecosModel = app.app.models.enderecosModel;
var depadmsModel = app.app.models.depadmsModel;
var diretoriasModel = app.app.models.diretoriasModel;
var escolasModel = app.app.models.escolasModel;

var connection = app.config.dbConnection();

var cvsPath =  path.dirname(require.main.filename) +'/'+'escolas.csv';
const csvFilePath = cvsPath;

var contador = 0;
var limit = 10;
var escolas = [];
var tipo = []

console.log(cvsPath);

csv()
  .fromFile(csvFilePath)
  .on('csv', (csvRow)=>{
      // Converte a linha em um Array
      var data = csvRow[0].toString().replace(',' , '.').split(";");

      var escola = parse(data)
      if(verifyOk(escola)){
        escolas[contador] = escola;
      }
      contador = contador + 1;
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
  populaEndereco(escolas);
  populaDiretoria(escolas);
  populaDepadm(escolas);
  populaEscola(escolas);
};

function populaTipo(escolas){
  var myTipo = []
  var res = []

  escolas.forEach(function(value){
    myTipo.push([value.tipodesc]);
  });

  var map = myTipo.reduce(function(prev, cur) {
    prev[cur] = prev[cur];
    return prev;
  }, {});

  for (var key in map) {
      resp = key.split(',');
      res.push(resp);
  }

  tiposModel.postTipo(res, connection, function(err, result){
    console.log(result);
  });
}

function populaEstado(escolas){

  var myEstado = []
  var res = []

  escolas.forEach(function(value){
    myEstado.push([value.estado]);
  });

  var map = myEstado.reduce(function(prev, cur) {
    prev[cur] = prev[cur];
    return prev;
  }, {});


  for (var key in map) {
      resp = key.split(',');
      res.push(resp);
  }

  estadosModel.postEstado(res, connection, function(err, result){
    console.log(result);
  });
}

function populaCidade(escolas){

  var myCidades = []
  var res = []

  escolas.forEach(function(value){
    myCidades.push([value.cidade,value.estado]);
  });

  var map = myCidades.reduce(function(prev, cur) {
      prev[cur] = prev[cur];
      return prev;
    }, {});

  for (var key in map) {
    resp = key.split(',');
    res.push(resp);
  }

  res.forEach(function(value){
    cidadesModel.postCidadeDescEstado(value, connection, function(err, result){
      console.log(result);
    });
  });
}

function populaDistrito(escolas){

  var myDistrito = []
  var res = []

  escolas.forEach(function(value){
    myDistrito.push([value.distrito,value.cidade]);
  });

  var map = myDistrito.reduce(function(prev, cur) {
    prev[cur] = prev[cur];
    return prev;
  }, {});

 for (var key in map) {
   resp = key.split(',');
   res.push(resp);
 }

 res.forEach(function(value){
   distitosModel.postDistritoDescCidade(value, connection, function(err, result){
       console.log(result);
   });
 });
}

function populaBairro(escolas){

  var myBairro = []
  var res = []

  escolas.forEach(function(value){
    myBairro.push([value.bairro,value.distrito,value.cidade,value.estado]);
  });

  var map = myBairro.reduce(function(prev, cur) {
    prev[cur] = prev[cur];
    return prev;
  }, {});

  for (var key in map) {
    resp = key.split(',');
    res.push(resp);
  }

  res.forEach(function(value){
    bairrosModel.postBairroDescDistrito(value, connection, function(err, result){
        console.log(result);
    });
  });
}

function populaEndereco(escolas){

  var endereco = []
  var res = []

  escolas.forEach(function(value){
    endereco.push([
        value.endereco,
        value.numero,
        value.complemento,
        value.cep,
        value.bairro,
        value.distrito,
        value.cidade,
        value.estado,
        //value.latitude,
        //value.longitude
        0,
        0
      ]);
  });

  var map = endereco.reduce(function(prev, cur) {
    prev[cur] = prev[cur];
    return prev;
  }, {});

  for (var key in map) {
    resp = key.split(',');
    res.push(resp);
  }

  res.forEach(function(value){
    enderecosModel.postEnderecoByDescriptions(value, connection, function(err, result){
      console.log(result);
    });
  });


}

function populaDiretoria(escolas){

  var myDiretoria = []
  var res = []

  escolas.forEach(function(value){
    myDiretoria.push([value.diretoria]);
  });

  var map = myDiretoria.reduce(function(prev, cur) {
    prev[cur] = prev[cur];
    return prev;
  }, {});

  for (var key in map) {
    dist = key.split(',');
    res.push(dist);
  }

  res.forEach(function(value){
    diretoriasModel.postDiretoriaOnlyDesc(value[0], connection, function(err, result){
      console.log(result);
    });
  });

}

function populaDepadm(escolas){

  var myDiretoria = []
  var res = []

  escolas.forEach(function(value){
    myDiretoria.push([value.depadm]);
  });

  var map = myDiretoria.reduce(function(prev, cur) {
    prev[cur] = prev[cur];
    return prev;
  }, {});

  for (var key in map) {
    dist = key.split(',');
    res.push(dist);
  }

  res.forEach(function(value){
    depadmsModel.postDepadmOnlyDesc(value[0], connection, function(err, result){
      console.log(result);
    });
  });

}

function populaEscola(escolas){
  var myEscola = []
  var res = []

  escolas.forEach(function(value){
    myEscola.push([
        value.nomesc,
        value.email,
        value.ddd,
        value.tel1,
        value.tel2,
        value.tipodesc,
        value.diretoria,
        value.depadm,
        value.endereco,
        value.bairro,
        value.distrito,
        value.cidade,
        value.estado,
        value.cep
      ]);
  });

  var map = myEscola.reduce(function(prev, cur) {
    prev[cur] = prev[cur];
    return prev;
  }, {});

  for (var key in map) {
    dist = key.split(',');
    res.push(dist);
  }

  res.forEach(function(value){
    escolasModel.postEscolaByDescriptions(value, connection, function(err, result){
      console.log(result);
    });
  });
}

function verifyOk(data){

  if(!ifOk(data.endereco)){
    return false
  }
  if(!ifOk(data.bairro)){
    return false
  }
  if(!ifOk(data.distrito)){
    return false
  }
  if(!ifOk(data.cidade)){
    return false
  }
  function ifOk(value){
    if(value == undefined){
      return false
    }else{
      return true
    }
  }

  return true;
}

function parse(data){
  var result = '{ "tipodesc" : null, "nomesc" : null, "diretoria" : null, "depadm" : null, "ceu" : null, "endereco" : null, "numero" : null, "bairro" : null, "cep" : null, "tel1" : null, "tel2" : null, "situacao" : null, "distrito" : null, "latitude" : null, "longitude" : null, "cidade" : null, "estado" : null, "complemento" : null, "ddd" : null, "email" : null }';
  var resultJson = JSON.parse(result);

  resultJson.tipodesc = removeAccents(data[0]);
  resultJson.nomesc = removeAccents(data[1]);
  resultJson.diretoria = removeAccents(data[2]);
  resultJson.depadm = removeAccents(data[3]);
  resultJson.ceu = removeAccents(data[4]);
  resultJson.endereco = removeAccents(data[5]);
  resultJson.numero = removeAccents(data[6]);
  resultJson.bairro = removeAccents(data[7]);
  resultJson.cep = removeAccents(data[8]);
  resultJson.tel1 = removeAccents(data[9]);
  resultJson.tel2 = removeAccents(data[10]);
  resultJson.situacao = removeAccents(data[11]);
  resultJson.distrito = removeAccents(data[12]);
  resultJson.latitude = removeAccents(data[13]);
  resultJson.longitude = removeAccents(data[14]);
  resultJson.cidade = removeAccents(data[15]);
  resultJson.estado = removeAccents(data[16]);
  resultJson.ddd = removeAccents(data[17]);
  resultJson.email = removeAccents(data[18]).toLowerCase();
  resultJson.complemento = removeAccents(data[19]);


  function removeAccents(str) {
    var accents    = 'ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var accentsOut = "AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    if (!str) {
      str = '';
    }
    str = str.toString().split('');
    var strLen = str.length;
    var i, x;
    for (i = 0; i < strLen; i++) {
      if ((x = accents.indexOf(str[i])) != -1) {
        str[i] = accentsOut[x];
      }
    }
    return str.join('');
  }

  return resultJson
}

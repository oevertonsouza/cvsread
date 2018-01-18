
var teste;
var value = function(teste){
  var path = require('path');
  const csv = require('csvtojson')

  var cvsPath =  path.dirname(require.main.filename) +'/'+'escolas.csv';
  const csvFilePath = cvsPath;

  var contador = 0;
  var limit = 10;
  var result;

  csv()
    .fromFile(csvFilePath)
    .on('csv', (csvRow)=>{
        // Converte a linha em um Array
        var data = csvRow[0].toString().split(";")
        //seta a variavel com a posição do Array
        var endereco = data[6];


        if(endereco != undefined ){
            result = parse(data);
            return result;
        }
        return result;
        process.exit(1);

    })
    .on('done',(error)=>{
        console.log(error)
    });

    return result;
}

function setValue(value){

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

console.log('aiaiai' + value());


module.exports = function(){
  return value;
};

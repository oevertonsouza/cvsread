var path = require('path');
const csv = require('csvtojson')


var cvsPath =  path.dirname(require.main.filename) +'/'+'escolas.csv';
const csvFilePath = cvsPath;

console.log(cvsPath);
var contador = 0

csv()
.fromFile(csvFilePath)
.on('csv', (csvRow)=>{
    // Converte a linha em um Array
    var myRow = csvRow[0].toString().split(";")
    //seta a variavel com a posição do Array
    var codigo = myRow[7];
    var rua = myRow[8];
    if(codigo != undefined /*&& codigo == '2365008'*/){
        contador = contador + 1;
        console.log(codigo);
        process.exit(1);

    }
})
.on('done',(error)=>{
    console.log(contador);
})

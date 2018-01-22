module.exports = function(){

  //Pegar todos os Escolas
  this.getEscolas = function(connection, callback){
    connection.query('select * from ESCOLAS;', callback);
  };

  //Pegar Escolas por ID
  this.getEscolaById = function(id, connection, callback){
    connection.query(`select * from ESCOLAS where ID = ${id};`, callback);
  };

  //Pegar Escola por ID
  this.getEscolaByDescription = function(descricao, connection, callback){
    connection.query(`select ID from ESCOLAS where DESCRICAO = "${descricao}";`, callback);
  };

  //Inserir Escola
  this.postEscolaByDescriptions = function(escola , connection, callback){

      var nome = escola[0];
      var email = escola[1];
      var telefone1 = escola[2];
      if(!telefone1 == '' || !telefone1 == undefined  ){
          telefone1 = '11' + telefone1;
      }
      var telefone2 = escola[3];
      if(!telefone2 == '' || !telefone2 == undefined  ){
          telefone2 = '11' + telefone1;
      }
      var tipo = escola[4];
      var diretoria = escola[5];
      var subprefeitura = escola[6];
      var endereco = escola[7];
      var bairro = escola[8];
      var distrito = escola[9];
      var cidade = escola[10];
      var estado = escola[11];
      var cep = escola[12];

      var query = `insert into ESCOLAS (
                      NOME,
                      EMAIL,
                      TELEFONE1,
                      TELEFONE2,
                      TIPO_ID,
                      DIRETORIA_ID,
                      SUBPREFEITURA_ID,
                      ENDERECO_ID
                   )
                   select
                      "${nome}" as NOME,
                      "${email}" as EMAIL,
                      "${telefone1}" as TELEFONE1,
                      "${telefone2}" as TELEFONE2,
                      (select ID from TIPOS where DESCRICAO = "${tipo}") as TIPO_ID,
                      (select ID from DIRETORIAS where DESCRICAO = "${diretoria}") as DIRETORIA_ID,
                      (select ID from SUBPREFEITURAS where DESCRICAO = "${subprefeitura}") as SUBPREFEITURA_ID,
                      (select
                          E.ID
                        from
                          ENDERECOS E
                        inner join BAIRROS B on (E.BAIRRO_ID = B.ID)
                        inner join DISTRITOS D on (B.DISTRITO_ID = D.ID)
                        inner join CIDADES C on (D.CIDADE_ID = C.ID)
                        inner join ESTADOS ES on (C.ESTADO_ID = ES.ID)
                        where 1=1
                          and E.ENDERECO = "${endereco}"
                          and E.CEP = "${cep}"
                          and B.DESCRICAO = "${bairro}"
                          and D.DESCRICAO = "${distrito}"
                          and C.DESCRICAO = "${cidade}"
                          and ES.DESCRICAO = "${estado}"
                        ) as ENDERECO_ID
                    `
      console.log(query);
      //connection.query(query, callback);
  };

  return this;
}

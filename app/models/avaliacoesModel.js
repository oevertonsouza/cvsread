module.exports = function(){

  //insere avaliacao
  this.postAvaliacao = function(avaliacao, connection, callback){
    connection.query('insert into AVALIACAO SET ?;' , avaliacao ,callback);
  };

  //retorna acesso
  this.getAvaliacaoByUserIdAndEscolaId = function(userId, escolaId, connection, callback){
    var query = `select * from AVALIACAO where USUARIO_ID = ${userId} and ESCOLA_ID = "${escolaId}";`
    connection.query(query ,callback);
  };

  this.verifyAvaliacao = function(usuario_id, escola_id, connection, callback){
    var query = `
      select
        * from AVALIACAO
      where 1=1
      and USUARIO_ID = ${usuario_id}
      and ESCOLA_ID = ${escola_id};
    `;
    connection.query(query, callback);
  };


  this.atualizaAvaliacao = function(usuarioId, escolaId, nota, connection, callback){
    var query = `
      update from AVALIACAO
        set NOTA = ${nota}
      where 1=1
        and USUARIO_ID = ${usuarioId}
        and ESCOLA_ID = ${escolaId}
      ;`;
    connection.query(query, callback);
  };


  return this;
}

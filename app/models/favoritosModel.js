module.exports = function(){

  //Pegar Favoritos por ID
  this.getFavoritosById = function(usuario_id, connection, callback){
    console.log(usuario_id);
    var query = `
      select
        ES.ID,
        ES.NOME as ESCOLA,
        EN.ENDERECO as ENDERECO,
        EN.NUMERO,
        B.DESCRICAO as BAIRRO,
        C.DESCRICAO as CIDADE,
        EST.DESCRICAO as ESTADO
      from FAVORITOS F
        inner join ESCOLAS ES on (F.ESCOLA_ID = ES.ID)
        inner join ENDERECOS EN on (ES.ENDERECO_ID = EN.ID)
        inner join BAIRROS B on (EN.BAIRRO_ID = B.ID)
        inner join DISTRITOS D on (EN.DISTRITO_ID = D.ID)
        inner join CIDADES C on (EN.CIDADE_ID = C.ID)
        inner join ESTADOS EST on (EN.ESTADO_ID = EST.ID)
      where USUARIO_ID = ${usuario_id};
    `;
    connection.query(query, callback);
  };

  this.verifyFavoritos = function(usuarioId, escolaId, connection, callback){
    var query = `
      select
        * from FAVORITOS
      where 1=1
      and USUARIO_ID = ${usuarioId}
      and ESCOLA_ID = ${escolaId};
    `;
    connection.query(query, callback);
  };

  this.removeFavoritos = function(usuario_id, escola_id, connection, callback){
    var query = `
      delete from FAVORITOS where USUARIO_ID = ${usuario_id} and ESCOLA_ID = ${escola_id};
    `;
    connection.query(query, callback);
  };

  //Inserit Favorito
  this.postFavoritos = function(favoritos , connection, callback){
    connection.query(`insert into FAVORITOS SET ?;`, favoritos, callback);
  };

  return this;
}

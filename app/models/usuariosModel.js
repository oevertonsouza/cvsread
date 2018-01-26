module.exports = function(){

  //Pegar todos os Usuarios
  this.postUsuarios = function(user, connection, callback){
    connection.query('INSERT INTO USUARIOS SET ?', user, callback)
  };

  this.getUsuarios = function(email, connection, callback){
    connection.query('select * from USUARIOS where EMAIL = ?', [email], callback)
  };

  return this;
}

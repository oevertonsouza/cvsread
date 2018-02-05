module.exports = function(){

  //Pegar todos os Usuarios
  this.postUsuarios = function(user, connection, callback){
    var query = connection.query('INSERT INTO USUARIOS SET ?', user, callback)
  };

  this.getUsuarios = function(email, connection, callback){
    var query = connection.query('select * from USUARIOS where EMAIL = ?', [email], callback)
  };

  return this;
}

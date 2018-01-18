module.exports = function(){

  this.getTipos = function(connection, callback){
    connection.query('select * from TIPOS;', callback);
  };

  this.getTipo = function(id, connection, callback){
    connection.query(`select * from TIPOS where ID = ${id}`, callback);
  };

  return this;
}

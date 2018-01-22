module.exports = function(application) {
  //get
  application.get('/diretorias', function(req, res){

    var connection = application.config.dbConnection();
    var diretoriasModel = application.app.models.diretoriasModel;

      diretoriasModel.getDiretorias(connection, function(err, result){
        res.send(result);
      });
  });
};

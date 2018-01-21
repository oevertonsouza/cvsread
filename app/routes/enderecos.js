module.exports = function(application) {
  //get
  application.get('/enderecos', function(req, res){

    var connection = application.config.dbConnection();
    var enderecosModel = application.app.models.enderecosModel;

      enderecosModel.getEnderecos(connection, function(err, result){
        res.send(result);
      });
  });

};

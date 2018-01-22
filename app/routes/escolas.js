module.exports = function(application) {
  //get
  application.get('/escolas', function(req, res){

    var connection = application.config.dbConnection();
    var escolasModel = application.app.models.escolasModel;

      escolasModel.getEscolas(connection, function(err, result){
        res.send(result);
      });
  });

};

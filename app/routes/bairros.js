module.exports = function(application) {
  //get
  application.get('/bairros', function(req, res){

    var connection = application.config.dbConnection();
    var bairrosModel = application.app.models.bairrosModel;

      bairrosModel.getBairros(connection, function(err, result){
        res.send(result);
      });
  });

};

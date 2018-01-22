module.exports = function(application) {
  //get
  application.get('/subprefeituras', function(req, res){

    var connection = application.config.dbConnection();
    var subprefeiturasModel = application.app.models.subprefeiturasModel;

      subprefeiturasModel.getSubprefeituras(connection, function(err, result){
        res.send(result);
      });
  });

};

module.exports = function(application) {
  //get
  application.get('/distritos', function(req, res){

    var connection = application.config.dbConnection();
    var distritosModel = application.app.models.distritosModel;

      distritosModel.getDistritos(connection, function(err, result){
        res.send(result);
      });
  });

};

module.exports = function(application) {
  //get
  application.get('/estados', function(req, res){

    var connection = application.config.dbConnection();
    var estadosModel = application.app.models.estadosModel;

      estadosModel.getEstados(connection, function(err, result){
        res.send(result);
      });
  });

};

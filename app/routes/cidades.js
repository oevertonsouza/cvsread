module.exports = function(application) {
  //get
  application.get('/cidades', function(req, res){

    var connection = application.config.dbConnection();
    var cidadesModel = application.app.models.cidadesModel;

      cidadesModel.getCidades(connection, function(err, result){
        res.send(result);
      });
  });

};

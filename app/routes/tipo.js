module.exports = function(application) {

  //get
  application.get('/tipo', function(req, res){

    var connection = application.config.dbConnection();
    var tiposModel = application.app.models.tiposModel;

      tiposModel.getTipoById(req.query.id, connection, function(err, result){
        res.send(result);
      });
  });


  //post
  application.post('/tipo', function(req, res){

      var connection = application.config.dbConnection();
      var tiposModel = application.app.models.tiposModel;

      tiposModel.postTipo(req.body.descricao, connection, function(err, result){
          res.send(result);
      });
  });

};

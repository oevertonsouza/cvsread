module.exports = function(application) {

  //get
  application.get('/escola', function(req, res){

    var connection = application.config.dbConnection();
    var escolasModel = application.app.models.escolasModel;

      escolasModel.getEscolaById(req.query.id, connection, function(err, result){
        res.send(result);
      });
  });

  //post
  application.post('/escola', function(req, res){

      var connection = application.config.dbConnection();
      var escolasModel = application.app.models.escolasModel;

      escolasModel.postTipo(req.body.descricao, connection, function(err, result){
          res.send(result);
      });
  });

};

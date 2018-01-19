module.exports = function(application) {

  //get
  application.get('/estado', function(req, res){

    var connection = application.config.dbConnection();
    var estadosModel = application.app.models.estadosModel;

      estadosModel.getEstadoById(req.query.id, connection, function(err, result){
        res.send(result);
      });
  });


  //post
  application.post('/estado', function(req, res){

      var connection = application.config.dbConnection();
      var estadosModel = application.app.models.estadosModel;

      estadosModel.postTipo(req.body.descricao, connection, function(err, result){
          res.send(result);
      });
  });

};

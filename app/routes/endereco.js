module.exports = function(application) {

  //get
  application.get('/endereco', function(req, res){

    var connection = application.config.dbConnection();
    var enderecosModel = application.app.models.enderecosModel;

      enderecosModel.getEnderecoById(req.query.id, connection, function(err, result){
        res.send(result);
      });
  });

  //post
  application.post('/endereco', function(req, res){

      var connection = application.config.dbConnection();
      var enderecosModel = application.app.models.enderecosModel;

      enderecosModel.postTipo(req.body.descricao, connection, function(err, result){
          res.send(result);
      });
  });

};

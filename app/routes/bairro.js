module.exports = function(application) {

  //get
  application.get('/bairro', function(req, res){

    var connection = application.config.dbConnection();
    var bairrosModel = application.app.models.bairrosModel;

      bairrosModel.getBairroById(req.query.id, connection, function(err, result){
        res.send(result);
      });
  });

  //post
  application.post('/bairro', function(req, res){

      var connection = application.config.dbConnection();
      var bairrosModel = application.app.models.bairrosModel;

      bairrosModel.postTipo(req.body.descricao, connection, function(err, result){
          res.send(result);
      });
  });

};

module.exports = function(application) {


  application.get('/bairros', function(req, res){

    var connection = application.config.dbConnection();
    var bairrosModel = application.app.models.bairrosModel;

    if(req.query.id)
    {
      bairrosModel.getBairroById(req.query.id, connection, function(err, result){
         res.send(result);
       });
    }else if(req.query.desc){
      bairrosModel.getBairroByDescricao(req.query.desc, connection, function(err, result){
         res.send(result);
       });
    }else{
        bairrosModel.getBairros(connection, function(err, result){
          res.send(result);
        });
    }

  });

  //post
  application.post('/bairros', function(req, res){

      var connection = application.config.dbConnection();
      var bairrosModel = application.app.models.bairrosModel;

      bairrosModel.postTipo(req.body.descricao, connection, function(err, result){
          res.send(result);
      });
  });

};

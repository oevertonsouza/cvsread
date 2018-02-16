module.exports = function(application) {

  application.get('/bairros', function(req, res){

    var connection = application.config.dbConnection();
    var bairrosModel = application.app.models.bairrosModel;
    var acessoModel = application.app.models.acessoModel;

    acessoModel.getAcessoByUuidAndUserId(req.query.key, req.query.userid,connection, function(err, result){
      if((result.length > 0) && (req.query.key = result[0].UUID)){
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
      }else{
        res.send({
          "code":202,
          "failed":"Chave inválida"
        });
      }
    })
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

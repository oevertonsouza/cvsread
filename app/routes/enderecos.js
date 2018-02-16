module.exports = function(application) {
  //get
  application.get('/enderecos', function(req, res){

    var connection = application.config.dbConnection();
    var enderecosModel = application.app.models.enderecosModel;
    var acessoModel = application.app.models.acessoModel;

    acessoModel.getAcessoByUuidAndUserId(req.query.key, req.query.userid,connection, function(err, result){
      if((result.length > 0) && (req.query.key = result[0].UUID)){
        if(req.query.id)
        {
          enderecosModel.getEnderecoById(req.query.id, connection, function(err, result){
            res.send(result);
          });
        }else if(req.query.desc){
          enderecosModel.getEnderecoByDescription(req.query.desc, connection, function(err, result){
            res.send(result);
          });
        }else{
          enderecosModel.getEnderecos(connection, function(err, result){
            res.send(result);
          });
        }
      }else{
        res.send({
          "code":202,
          "failed":"Chave inválida"
        })
      }
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

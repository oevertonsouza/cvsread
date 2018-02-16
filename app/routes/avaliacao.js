module.exports = function(application) {

  application.post('/avaliacao', function(req, res){

    var connection = application.config.dbConnection();
    var avaliacoesModel = application.app.models.avaliacoesModel;
    var acessoModel = application.app.models.acessoModel;

    var userAgent = req.headers['User-Agent'];
    var token = req.headers['x-auth-token'];

    acessoModel.getAcessoByUuidAndUserId(token, userAgent, connection, function(err, result){
      if((result.length > 0) && (token = result[0].UUID)){
        avaliacoesModel.verifyAvaliacao(req.body.usuario_id,req.body.escola_id, connection, function(err, result){
            if ((result) && (result.length > 0)){
              avaliacoesModel.atualizaAvaliacao(req.body.usuario_id,req.body.escola_id, connection, function(err, result){
                if(err){
                  res.send({
                    "code":400,
                    "failed":"Erro ao atualizar avaliação."
                  });
                }else{
                  res.send({
                    "code":200,
                    "sucess":"Avaliacao atualizada com sucesso."
                  });
                }
              });
            }else if((result) && (result.length == 0)){
              avaliacoesModel.postAtualizacao(req.body, connection, function(err, result){
                res.send({
                  "code":200,
                  "sucess":"Avaliação efetuada com sucesso.",
                  "message" : JSON.stringify(result)
                });
              });
            }
          });
      }else{
        res.send({
          "code":202,
          "failed":"Chave inválida"
        });
      };
    });
  });
};

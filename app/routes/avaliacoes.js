module.exports = function(application) {

  application.post('/avaliacoes', function(req, res){

    var connection = application.config.dbConnection();
    var avaliacoesModel = application.app.models.avaliacoesModel;
    var acessoModel = application.app.models.acessoModel;

    var userId = req.headers['userid'];
    var token = req.headers['x-auth-token'];

    var avaliacao = req.body;

    acessoModel.getAcessoByUuidAndUserId(token, userId, connection, function(err, result){
      if((result.length > 0) && (token = result[0].UUID)){
        avaliacoesModel.verifyAvaliacao(avaliacao.USUARIO_ID,avaliacao.ESCOLA_ID, connection, function(err, result){
            if ((result) && (result.length > 0)){
              avaliacoesModel.atualizaAvaliacao(avaliacao.USUARIO_ID,avaliacao.ESCOLA_ID, avaliacao.NOTA, connection, function(err, result){
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
                };
              });
            }else if((result) && (result.length == 0)){
              avaliacoesModel.postAvaliacao(avaliacao, connection, function(err, result){
                res.send({
                  "code":200,
                  "sucess":"Avaliação efetuada com sucesso.",
                  "message" : JSON.stringify(result)
                });
              });
            };
          });
      }else{
        res.send({
          "code":202,
          "failed":"Chave inválida"
        });
      };
      connection.end();
    });
  });
};

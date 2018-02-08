module.exports = function(application) {

  //get
  application.get('/favoritos', function(req, res){

    var connection = application.config.dbConnection();
    var favoritosModel = application.app.models.favoritosModel;
    var acessoModel = application.app.models.acessoModel;

    acessoModel.getAcessoByUuid(req.query.key,connection, function(err, result){
      if((result.length > 0) && (req.query.key = result[0].UUID)){
        favoritosModel.getFavoritosById(req.query.userid, connection, function(err, result){
          res.send(result);
        });
      }else{
        res.send({
          "code":202,
          "failed":"Chave inválida"
        });
      };
    });
  });

  application.post('/favoritos', function(req, res){

    var connection = application.config.dbConnection();
    var favoritosModel = application.app.models.favoritosModel;
    var acessoModel = application.app.models.acessoModel;

    var userAgent = req.headers['User-Agent'];
    var token = req.headers['x-auth-token'];

    acessoModel.getAcessoByUuid(token ,connection, function(err, result){
      if((result.length > 0) && (token = result[0].UUID)){
        favoritosModel.verifyFavoritos(req.body.usuario_id,req.body.escola_id, connection, function(err, result){
            if ((result) && (result.length > 0)){
              favoritosModel.removeFavoritos(req.body.usuario_id,req.body.escola_id, connection, function(err, result){
                if(err){
                  res.send({
                    "code":400,
                    "failed":"Erro ao remover favorito"
                  });
                }else{
                  res.send({
                    "code":200,
                    "sucess":"Favorito removido com sucesso"
                  });
                }
              });
            }else if((result) && (result.length == 0)){
              favoritosModel.postFavoritos(req.body, connection, function(err, result){
                res.send({
                  "code":200,
                  "sucess":"Favorito inserido com sucesso",
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

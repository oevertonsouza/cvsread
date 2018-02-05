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
        favoritosModel.postFavoritos(req.body, connection, function(err, result){
          res.send({
            "code":200,
            "sucess":"Favorito inserido com sucesso.",
            "message" : JSON.stringify(result)
          });
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

module.exports = function(application) {

  //get
  application.get('/distritos', function(req, res){

    var connection = application.config.dbConnection();
    var distritosModel = application.app.models.distritosModel;
    var acessoModel = application.app.models.acessoModel;

    acessoModel.getAcessoByUuidAndUserId(req.query.key, req.query.userid,connection, function(err, result){
      if((result.length > 0) && (req.query.key = result[0].UUID)){
        if(req.query.id)
        {
          distritosModel.getDistritoById(req.query.id, connection, function(err, result){
            res.send(result);
            connection.end();
          });
        }else if(req.query.desc){
          distritosModel.getDiretoriaByDescription(req.query.desc, connection, function(err, result){
            res.send(result);
            connection.end();
          });
        }else{
          distritosModel.getDistritos(connection, function(err, result){
            res.send(result);
            connection.end();
          });
        }
      }else{
        res.send({
          "code":202,
          "failed":"Chave inválida"
        });
        connection.end();
      }
    });
  });

  //post
  application.post('/distrito', function(req, res){

      var connection = application.config.dbConnection();
      var distritosModel = application.app.models.distritosModel;

      distritosModel.postTipo(req.body.descricao, connection, function(err, result){
          res.send(result);
      });
  });

};

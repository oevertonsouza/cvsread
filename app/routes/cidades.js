module.exports = function(application) {
  //get
  application.get('/cidades', function(req, res){

    var connection = application.config.dbConnection();
    var cidadesModel = application.app.models.cidadesModel;
    var acessoModel = application.app.models.acessoModel;

    acessoModel.getAcessoByUuidAndUserId(req.query.key, req.query.userid,connection, function(err, result){
      if((result.length > 0) && (req.query.key = result[0].UUID)){
        if(req.query.id){
          cidadesModel.getCidadeById(req.query.id, connection, function(err, result){
            res.send(result);
            connection.end();
          });
        }else if(req.query.desc){
          cidadesModel.getCidadeByDescription(req.query.desc, connection, function(err, result){
            res.send(result);
            connection.end();
          });
        }else{
          cidadesModel.getCidades(connection, function(err, result){
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
      connection.end();
    });
  });
};

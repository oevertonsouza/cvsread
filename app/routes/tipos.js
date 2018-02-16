module.exports = function(application) {

  application.get('/tipos', function(req, res){

    var connection = application.config.dbConnection();
    var tiposModel = application.app.models.tiposModel;
    var acessoModel = application.app.models.acessoModel;

    acessoModel.getAcessoByUuidAndUserId(req.query.key, req.query.userid,connection, function(err, result){
      if((result.length > 0) && (req.query.key = result[0].UUID)){
        if(req.query.id)
        {
          tiposModel.getTipoById(req.query.id, connection, function(err, result){
            res.send(result);
            connection.end();
          });
        }else if(req.query.desc){
          tiposModel.getTipoByDescription(req.query.desc, connection, function(err, result){
            res.send(result);
            connection.end();
          });
        }else{
          tiposModel.getTipos(connection, function(err, result){
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
      };
      connection.end();
    });
  });
};

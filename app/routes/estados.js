module.exports = function(application) {
  //get
  application.get('/estados', function(req, res){

    var connection = application.config.dbConnection();
    var estadosModel = application.app.models.estadosModel;
    var acessoModel = application.app.models.acessoModel;

    acessoModel.getAcessoByUuidAndUserId(req.query.key, req.query.userid,connection, function(err, result){
      if((result.length > 0) && (req.query.key = result[0].UUID)){
        if(req.query.id)
        {
          estadosModel.getEstadoById(req.query.id, connection, function(err, result){
            res.send(result);
            connection.end();
          });
        }else if(req.query.desc){
          estadosModel.getEstadoByDescription(req.query.desc, connection, function(err, result){
            res.send(result);
            connection.end();
          });
        }else{
          estadosModel.getEstados(connection, function(err, result){
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
};

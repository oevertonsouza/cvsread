module.exports = function(application) {
  //get
  application.get('/depadms', function(req, res){

    var connection = application.config.dbConnection();
    var depadmsModel = application.app.models.depadmsModel;
    var acessoModel = application.app.models.acessoModel;

    acessoModel.getAcessoByUuidAndUserId(req.query.key, req.query.userid,connection, function(err, result){
      if((result.length > 0) && (req.query.key = result[0].UUID)){
        if(req.query.id)
        {
          depadmsModel.getDepadmById(req.query.id, connection, function(err, result){
            res.send(result);
          });
        }else if(req.query.desc){
          depadmsModel.getDepadmByDescription(req.query.desc, connection, function(err, result){
            res.send(result);
          });
        }else{
          depadmsModel.getDepadms(connection, function(err, result){
            res.send(result);
          });
        };
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

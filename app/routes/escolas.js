module.exports = function(application) {
  //get
  application.get('/escolas', function(req, res){

    var connection = application.config.dbConnection();
    var escolasModel = application.app.models.escolasModel;
    var acessoModel = application.app.models.acessoModel;

    acessoModel.getAcessoByUuidAndUserId(req.query.key, req.query.userid,connection, function(err, result){
      if((result.length > 0) && (req.query.key = result[0].UUID)){
        if(req.query.id)
        {
          escolasModel.getEscolaById(req.query.id, connection, function(err, result){
            res.send(result);
          });
        }else if(req.query.desc){
          escolasModel.getEscolaByDescription(req.query.desc, connection, function(err, result){
            res.send(result);
          });
        }else{
          escolasModel.getEscolas(connection, function(err, result){
            res.send(result);
          });
        }
      }else{
        res.send({
          "code":202,
          "failed":"Chave inválida"
        });
      }
    });
  });
};

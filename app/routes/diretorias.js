module.exports = function(application) {
  //get
  application.get('/diretorias', function(req, res){

    var connection = application.config.dbConnection();
    var diretoriasModel = application.app.models.diretoriasModel;
    var acessoModel = application.app.models.acessoModel;

    acessoModel.getAcessoByUuid(req.query.key,connection, function(err, result){
      if((result.length > 0) && (req.query.key = result[0].UUID)){
        if(req.query.id)
        {
          diretoriasModel.getDiretoriaById(req.query.id, connection, function(err, result){
            res.send(result);
          });
        }else if(req.query.desc){
          diretoriasModel.getDiretoriaByDescription(req.query.desc, connection, function(err, result){
            res.send(result);
          });
        }else{
          diretoriasModel.getDiretorias(connection, function(err, result){
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

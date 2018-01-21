module.exports = function(application) {

  //get
  application.get('/diretoria', function(req, res){

    var connection = application.config.dbConnection();
    var diretoriasModel = application.app.models.diretoriasModel;

      diretoriasModel.getDiretoriaById(req.query.id, connection, function(err, result){
        res.send(result);
      });
  });

  //post
  application.post('/diretoria', function(req, res){

      var connection = application.config.dbConnection();
      var diretoriasModel = application.app.models.diretoriasModel;

      diretoriasModel.postTipo(req.body.descricao, connection, function(err, result){
          res.send(result);
      });
  });

};

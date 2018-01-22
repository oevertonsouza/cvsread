module.exports = function(application) {

  //get
  application.get('/subprefeitura', function(req, res){

    var connection = application.config.dbConnection();
    var subprefeiturasModel = application.app.models.subprefeiturasModel;

      subprefeiturasModel.getSubprefeituraById(req.query.id, connection, function(err, result){
        res.send(result);
      });
  });

  //post
  application.post('/subprefeitura', function(req, res){

      var connection = application.config.dbConnection();
      var subprefeiturasModel = application.app.models.SubprefeiturasModel;

      subprefeiturasModel.postTipo(req.body.descricao, connection, function(err, result){
          res.send(result);
      });
  });

};

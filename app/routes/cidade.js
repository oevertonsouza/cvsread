module.exports = function(application) {

  //get
  application.get('/cidade', function(req, res){

    var connection = application.config.dbConnection();
    var cidadesModel = application.app.models.cidadesModel;

      cidadesModel.getCidadeById(req.query.id, connection, function(err, result){
        res.send(result);
      });
  });


  //post
  application.post('/cidade', function(req, res){

      var connection = application.config.dbConnection();
      var cidadesModel = application.app.models.cidadesModel;

      cidadesModel.postTipo(req.body.descricao, connection, function(err, result){
          res.send(result);
      });
  });

};

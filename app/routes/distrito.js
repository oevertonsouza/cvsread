module.exports = function(application) {

  //get
  application.get('/distrito', function(req, res){

    var connection = application.config.dbConnection();
    var distritosModel = application.app.models.distritosModel;

      distritosModel.getDistritoById(req.query.id, connection, function(err, result){
        res.send(result);
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

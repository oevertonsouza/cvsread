module.exports = function(application) {

  application.get('/tipo', function(req, res){

    var connection = application.config.dbConnection();
    var tiposModel = application.app.models.tiposModel;

    tiposModel.getTipo(req.query.id, connection, function(err, result){
        res.send(result);
    });
  });
};

module.exports = function(application) {

  application.get('/tipos', function(req, res){

    var connection = application.config.dbConnection();
    var tiposModel = application.app.models.tiposModel;

    tiposModel.getTipos(connection, function(err, result){
        console.log(result);
        res.send(result);
    });
  });
};

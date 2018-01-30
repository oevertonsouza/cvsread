module.exports = function(application) {
  //post
  application.post('/register', function(req, res){

    var connection = application.config.dbConnection();
    var usuariosModel = application.app.models.usuariosModel;
    var today = new Date();

    var user={
      "username":req.body.username,
      "email":req.body.email,
      "password":req.body.password,
      "dt_criacao":today,
      "dt_modificado":today,
      "premium": false
    }

    usuariosModel.postUsuarios(user, connection, function(error, result){
      //res.send(result);
      if (error) {
        console.log("error ocurred", error);
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
        console.log('The solution is: ', result);
        res.send({
          "code":200,
          "success":"user registered sucessfully"
        });
      }
    });
  });
};

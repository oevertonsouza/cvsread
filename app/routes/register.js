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

    usuariosModel.getUsuarios(user.email, connection, function(error, result ){


      if ((result.length > 0) && (result[0].EMAIL = user.email)) {
        res.send({
          "code":202,
          "warning":"Email já cadastrado."
        });
      }else{
        usuariosModel.postUsuarios(user, connection, function(error, result){
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
              "success":"Usuário registrado com sucesso."
            });
          }
        });
      }
    });
  });
};

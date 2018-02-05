module.exports = function(application) {
  //post
  application.post('/register', function(req, res){

    var md5 = require('md5');
    var connection = application.config.dbConnection();
    var usuariosModel = application.app.models.usuariosModel;
    var today = new Date();

    var password = md5(req.body.password);

    var user={
      "username":req.body.username,
      "email":req.body.email,
      "password": password,
      "dt_criacao":today,
      "dt_modificado":today,
      "ativo" : false,
      "premium": false
    }

    usuariosModel.getUsuarios(user.email, connection, function(error, result ){
      if ((result) && (result.length > 0) && (result[0].EMAIL = user.email)) {
        res.send({
          "code":202,
          "warning":"Email já cadastrado."
        });
      }else{
        usuariosModel.postUsuarios(user, connection, function(error, result){
          if (error) {
            res.send({
              "code":400,
              "failed":"error ocurred",
              "message": error.message
            })
          }else{
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

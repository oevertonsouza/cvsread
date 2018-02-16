module.exports = function(application) {
  //post
  application.post('/register', function(req, res){
    var CryptoJS = require("crypto-js");

    var connection = application.config.dbConnection();
    var usuariosModel = application.app.models.usuariosModel;
    var today = new Date();

    var password =  CryptoJS.AES.encrypt(req.body.password, "CHAVE");

    var user={
      "username":req.body.username,
      "email":req.body.email,
      "password": password,
      "dt_criacao":today,
      "dt_modificado":today,
      //"ativo" : false,
      "premium": false
    }

    usuariosModel.getUsuarios(user.email, connection, function(error, result ){
      if ((result) && (result.length > 0) && (result[0].EMAIL = user.email)) {
        res.send({
          "code":202,
          "message":"Email já cadastrado.",
          "description":"Verifique sua caixa de email, e ative sua conta.",
        });
        connection.end();
      }else{
        usuariosModel.postUsuarios(user, connection, function(error, result){
          if (error) {
            res.send({
              "code":400,
              "message":"error ocurred",
              "description": error.message
            });
            connection.end();
          }else{
            res.send({
                "code":200,
                "message":"Usuário registrado com sucesso =).",
                "description":"Acesse seu email e ative sua conta.",
            });
            connection.end();
          }
          connection.end();
        });
      }
      connection.end();
    });
  });
};

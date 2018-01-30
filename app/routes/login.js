module.exports = function(application) {
  const uuidv4 = require('uuid/v4');

  //post
  application.post('/login', function(req, res){

    var connection = application.config.dbConnection();
    var usuariosModel = application.app.models.usuariosModel;
    var acessoModel = application.app.models.acessoModel;

    var today = new Date();
    var email= req.body.email;
    var password = req.body.password;

    var acesso = {
      usuario_id : '',
      uuid : uuidv4(),
      ultimoacesso : today,
    }

    usuariosModel.getUsuarios(email, connection, function(error, result){
      if (error) {
        console.log(erro);
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
        if(result.length > 0){
          if(result[0].PASSWORD == password){
            acesso.usuario_id = result[0].ID;
            acessoModel.postAcesso(acesso, connection, function(error, result){
              if(error){
                res.send({
                  "code":400,
                  "failed":"erro ao controlar acesso"
                });
              }else{
                res.send({
                  "code":200,
                  "success":"login sucessfull with Access"
                });
              }
            });
            res.send({
              "code":200,
              "success":"login sucessfull"
            });
          }
          else{
            res.send({
              "code":204,
              "success":"Email and password does not match"
            });
          }
        }else{
          res.send({
            "code":204,
            "success":"Email does not exits"
          });
        }
      }
    });
  });
}

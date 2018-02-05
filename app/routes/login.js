module.exports = function(application) {
  const uuidv4 = require('uuid/v4');
  //post
  application.post('/login', function(req, res){

    var md5 = require('md5');
    var connection = application.config.dbConnection();
    var usuariosModel = application.app.models.usuariosModel;
    var acessoModel = application.app.models.acessoModel;

    var today = new Date();
    var email= req.body.email;
    var password = md5(req.body.password);

    var acesso = {
      usuario_id : '',
      uuid : uuidv4(),
      ultimoacesso : today,
    }

    usuariosModel.getUsuarios(email, connection, function(error, result){
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
        if((result) && (result.length > 0) && (result[0].PASSWORD == password)){
            acesso.usuario_id = result[0].ID;
            acessoModel.postAcesso(acesso, connection, function(error, result){
              if(error){
                res.send({
                  "code":400,
                  "failed":"error ocurred"
                });
              }else{
                res.send({
                  "code":200,
                  "success":"Login efetuado com sucesso!",
                  "accessId" : acesso.uuid
                });
              }
            });
          }else{
            res.send({
              "code":204,
              "success":"Falha ao efetuar login"
            });
          }
        }
    });
  });
}

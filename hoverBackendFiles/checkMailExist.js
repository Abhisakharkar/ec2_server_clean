var check_mail_exist = function (req,res) {

  var mysql = require('mysql');

  var mail;
  mail=req.body.mail;
  console.log(mail);

  var con = require('./databaseOptions')
  var sql = "SELECT * FROM `RETAILER_AUTH` where `mail`= ?";
      con.query(sql,[mail], function (err, rows) {
        if(err)
        {console.log(err);
          console.log("error in retailer select in checkMailExist");
        }
        else {
          if(!rows.length){
            console.log("mail does not exist");
              var myobj={
              mailExist:false,
              responseFrom:"check_mail_exist"
            }
          }
          else{
            console.log("mail exist");
              var myobj={
              mailExist:true,
              responseFrom:"check_mail_exist"
            }
          }
          console.log(JSON.stringify(myobj));
          res.end(JSON.stringify(myobj));
        }
      });
}
module.exports=check_mail_exist;

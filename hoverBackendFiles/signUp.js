var sign_up = function(req, res) {
  const jwt = require('jsonwebtoken');

  var deviceId, mail, password, subsciptionDateTime, codeVerified, mandatoryDate, membership, retailerId, shopActPhoto, shopActLicenseNo;
  mail = req.body.mail;
  console.log(mail);
  password = req.body.password;
  deviceId = req.body.deviceId;
  subscriptionDateTime = req.body.subscriptionDateTime;
  codeVerified = 0;
  mandatoryData = 0;
  membership = 1;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //random code generator
  }
  var code = getRandomInt(10000, 99999);

  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({ // node mailer
    service: 'gmail',
    auth: {
      user: 'wolfsburgproject@gmail.com',
      pass: 'Wolfsburg@1234'
    }
  });
  var mailOptions = {
    from: 'wolfsburgproject@gmail.com',
    to: mail,
    subject: 'Email authentication for hover!',
    text: 'Authentication code is : ' + code + '.'
  };
  var con = require('./databaseOptions')


  var sql = "INSERT INTO `RETAILER_AUTH` (`retailerId`, `mail`, `password`, `membership`, `subscriptionDateTime`, `shopActPhoto`, `shopActLicenseNo`, `code`, `codeVerified`, `mandatoryData`,`deviceId`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
  con.query(sql, [retailerId, mail, password, membership, subscriptionDateTime, shopActPhoto, shopActLicenseNo, code, codeVerified, mandatoryData, deviceId], function(err, result) {
    if (err) {
      console.log(err);
      console.log("error in sign_up query insertion");
      var myobj = {
        signUpSuccessStatus: false,
        mailSent: false,
        responseFrom: "sign_up"
      }
      console.log(JSON.stringify(myobj));
      res.end(JSON.stringify(myobj));
    } else {
      console.log("sign_up successful");
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
          var myobj = {
            signUpSuccessStatus: true,
            mailSent: false,
            responseFrom: "sign_up"
          }
          console.log(JSON.stringify(myobj));
          res.end(JSON.stringify(myobj));
        } else {
          console.log('Email sent: ' + info.response);
          const data = {
            retailerId: result.insertId,
            mail: mail
          }
          jwt.sign({
            data
          }, 'abhishek_007', (err, token) => {
            if (err) {
              res.send("error generating token");
            } else {
              var myobj = {
                signUpSuccessStatus: true,
                mailSent: true,
                token: token,
                responseFrom: "sign_up"
              }
              console.log(JSON.stringify(myobj));
              res.end(JSON.stringify(myobj));
            }
          });

        }
      });
    }
  });

}
module.exports = sign_up;

var resend_verification_code = function(req, res, authData) {
  var mail, retailerId;
  mail = authData.data.mail;
  retailerId = authData.data.retailerId;
  var randomstring=require("randomstring");
  var reqId=randomstring.generate({
    length:10,
    charset:'alphabetic',
    capitalization:'uppercase'
  });
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
    subject: 'authentication request id : '+reqId,
    text: 'Authentication code is : ' + code + '.'
  };
  var con = require('./databaseOptions')


  var sql = "UPDATE RETAILER_AUTH SET Code = ? WHERE retailerId = ?";
  con.query(sql, [code, retailerId], function(err, result) {
    if (err) {
      console.log(err);
      var myobj = {
        codeUpdate: false,
        update: false,
        responseFrom: "resend_verification_code"
      }
      console.log(JSON.stringify(myobj));
      res.send(JSON.stringify(myobj));
    } else {
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
          var myobj = {
            codeUpdate: true,
            mailSent: false,
            responseFrom: "resend_verification_code"
          }
          console.log(JSON.stringify(myobj));
          res.end(JSON.stringify(myobj));
        } else {
          console.log('Email sent: ' + info.response);
          var myobj = {
            reqId:reqId,
            codeUpdate: true,
            mailSent: true,
            responseFrom: "resend_verification_code"
          }
          console.log(JSON.stringify(myobj));
          res.end(JSON.stringify(myobj));
        }
      });
    }
  });
}
module.exports = resend_verification_code;

var sign_in = function(req, res) {
  const jwt = require('jsonwebtoken');
  var mail, password;
  mail = req.body.mail;
  password = req.body.password;

  var con = require('./databaseOptions')

  var sql = "SELECT * FROM RETAILER_AUTH WHERE mail = ? AND password =?";
  con.query(sql, [mail, password], function(err, rows) {
    if (err) {
      console.log(err);
      console.log("error in sql query in sign in");
      var myobj = {
        signIn: false,
        responseFrom: "sign_in"
      }
      console.log(JSON.stringify(myobj));
      res.send(JSON.stringify(myobj));
    } else {
      if (!rows.length) {
        console.log("password wrong");
        var myobj = {
          signIn: false,
          responseFrom: "sign_in"
        }
        console.log(JSON.stringify(myobj));
        res.end(JSON.stringify(myobj));
      } else {
        var retailerId = rows[0].retailerId;
        const data = {
          retailerId: retailerId,
          mail: rows[0].mail
        }
        jwt.sign({
          data
        }, 'abhishek_007', (err, token) => {
          if (err) {
            res.send("error generating token");
          } else {
            if (!rows[0].codeVerified) {
              var myobj = {
                signIn: true,
                responseFrom: "sign_in", // also  kept same for update device id
                token: token,
                retailerAuthTable: {
                  retailerId:rows[0].retailerId,
                  membership: rows[0].membership,
                  subscriptionDateTime: rows[0].subscriptionDateTime,
                  shopActPhoto: rows[0].shopActPhoto,
                  shopActLicenseNo: rows[0].shopActLicenseNo,
                  codeVerified: rows[0].codeVerified,
                  mandatoryData: rows[0].mandatoryData,
                  deviceId: rows[0].deviceId
                }
              }
              console.log(JSON.stringify(myobj));
              res.end(JSON.stringify(myobj));
            } else {
              var sql = "SELECT * FROM `RETAILER_DATA` where `retailerId`=?";
              con.query(sql, [retailerId], function(err, data) {
                if (err) {
                  console.log(err);
                  console.log("retailer_data fetch problem");
                } else {
                  console.log("retailer_data fetched");
                  var myobj = {
                    signIn: true,
                    responseFrom: "sign_in", // also  kept same for update device id
                    token: token,
                    retailerAuthTable: {
                      retailerId:rows[0].retailerId,
                      membership: rows[0].membership,
                      subscriptionDateTime: rows[0].subscriptionDateTime,
                      shopActPhoto: rows[0].shopActPhoto,
                      shopActLicenseNo: rows[0].shopActLicenseNo,
                      codeVerified: rows[0].codeVerified,
                      mandatoryData: rows[0].mandatoryData,
                      deviceId: rows[0].deviceId
                    },
                    retailerDataTable: data[0]
                  }
                  console.log(JSON.stringify(myobj));
                  res.end(JSON.stringify(myobj));
                }
              });
            }
          }
        });

      }
    }
  });
}
module.exports = sign_in;

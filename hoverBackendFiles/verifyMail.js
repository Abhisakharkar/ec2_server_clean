var verify_mail = function(req, res, authData) {
  var code, retailerId;
  retailerId = authData.data.retailerId;
  console.log(authData.data);
  code = req.body.code;

  var con = require('./databaseOptions')

  var sql = 'SELECT * FROM `RETAILER_AUTH` WHERE `retailerId` = ? AND `code`=?';
  con.query(sql, [retailerId, code], function(err, rows) {
    if (err) {
      console.log(err);
      console.log("query failed");
    } else {
      if (!rows.length) {
        var myobj = {
          verificationStatus: false,
          responseFrom: "verify_mail"
        }
        console.log("rows length is 0");
        res.send(JSON.stringify(myobj));
      } else {
        var url_lp = '/private/' + retailerId + '/lp.jpeg';
        var sql = "UPDATE RETAILER_AUTH SET code = '-32565' , codeVerified = '1' , shopActPhoto = ?  WHERE retailerId = ? ";
        con.query(sql, [url_lp, retailerId], function(err, result2) {
          if (err) {
            var myobj = {
              verificationStatus: true,
              update: false,
              responseFrom: "verify_mail"
            }
            console.log("sql update failed");
            res.send(JSON.stringify(myobj));
          } else {
            var sql = "SELECT * FROM `RETAILER_AUTH` where `retailerId`=?";
            con.query(sql, [retailerId], function(err, result) {
              if (err) {
                console.log("error in returning retailer table");
                var myobj = {
                  'verificationStatus': true,
                  'update': true,
                  'output': false,
                  responseFrom: "verify_mail"
                }
                console.log(JSON.stringify(myobj));
                res.send(JSON.stringify(myobj));
              } else {
                var url_dp = '/public/' + retailerId + '/dp.jpeg';
                var url_sp = '/public/' + retailerId + '/sp.jpeg';
                var sql = "INSERT INTO `RETAILER_DATA` (`retailerId`, `enterpriseName`, `mobileNo`, `addLine1`, `sublocality1Id`, `localityId`, `proprietor`, `profilePhoto`, `latLoc`, `longLoc`, `deliveryStatus`, `maxDeliveryDistanceInMeters`, `maxFreeDeliveryDistanceInMeters`, `chargePerHalfKiloMeterForDelivery`, `minAmountForFreeDelivery`, `openCloseIsManual`, `shopOpenTime1`, `shopCloseTime1`, `shopOpenTime2`, `shopCloseTime2`, `currentState`, `shopPhoto`, `appliedForVerification`, `verifiedByTeam`, `locationVerified`, `mobileVerified`,`lastStatusUpdate`) VALUES (?, NULL, NULL, NULL, NULL, NULL, NULL, ?, NULL, NULL, '0', NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, '0', ?, '0', '0', '0', '0',NULL)"
                con.query(sql, [retailerId, url_dp, url_sp], function(err, result1) {
                  if (err) console.log("error in retailer_data entry");
                  else {
                    console.log("retailer data entered");
                    var sql = "SELECT * FROM `RETAILER_DATA` where `retailerId`=?";
                    con.query(sql, [retailerId], function(err, data) {
                      if (err) {
                        console.log(err);
                        console.log("retailer_data fetch problem");
                      } else {
                        console.log("retailer_data fetched");
                        var myobj = {
                          'verificationStatus': true,
                          'update': true,
                          responseFrom: "verify_mail",
                          'retailerAuthTable': {
                            retailerId:result[0].retailerId,
                            membership: result[0].membership,
                            subscriptionDateTime: result[0].subscriptionDateTime,
                            shopActPhoto: result[0].shopActPhoto,
                            shopActLicenseNo: result[0].shopActLicenseNo,
                            codeVerified: result[0].codeVerified,
                            mandatoryData: result[0].mandatoryData,
                            deviceId: result[0].deviceId

                          },
                          'retailerDataTable': data[0]
                        }
                        console.log(result);
                        console.log(JSON.stringify(myobj));
                        res.send(JSON.stringify(myobj));
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    }
  });
}
module.exports = verify_mail;

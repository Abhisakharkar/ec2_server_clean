var update_device_id = function(req, res, authData) {
  var retailerId = authData.data.retailerId;
  var token= req.token;
  var deviceId = req.body.deviceId;
  if (deviceId==null) {
    res.end("send device id");
  }

  var con = require('./databaseOptions')

  var sql = "UPDATE `RETAILER_AUTH` SET `deviceId` = ? WHERE `RETAILER_AUTH`.`retailerId` = ? ";
  con.query(sql, [deviceId, retailerId], function(err, result) {
    if (err) {
      console.log(err);
      console.log("error in device id update");
      var myobj = {

        update: false
      }
      res.send(JSON.stringify(myobj));
    } else {
      console.log("device id updated");
      var sql = "SELECT * FROM `RETAILER_AUTH` WHERE `RETAILER_AUTH`.`retailerId` = ? ";
      con.query(sql, [retailerId], function(err, rows) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          var myobj = {
            signIn: true,
            deviceIdUpdate: true,
            responseFrom: "sign_in", // also  kept same for sign in
            token:token,
            retailerAuthTable:{
              retailerId:rows[0].retailerId,
              membership:rows[0].membership,
              subscriptionDateTime:rows[0].subscriptionDateTime,
              shopActPhoto:rows[0].shopActPhoto,
              shopActLicenseNo:rows[0].shopActLicenseNo,
              codeVerified:rows[0].codeVerified,
              mandatoryData:rows[0].mandatoryData,
              deviceId:rows[0].deviceId,
            }
          }
          res.send(JSON.stringify(myobj));
        }
      }); // select retailer from retailer_auth
    }
  }); // update device id
}
module.exports = update_device_id;

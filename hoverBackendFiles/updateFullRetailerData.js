var update_full_retailer_data = function(req, res, authData) {
  var retailerId = authData.data.retailerId;
  var con = require('./databaseOptions')
  if (req.body.mandatoryData!=null && req.body.shopActLicenseNo!=null){
  var insertInAuth=false;
    insertInAuth=true;
  }


  makeQueryForRetailerDataUpdate = require('./../makeQueries/makeQueryForRetailerDataUpdate');
  var queryData = makeQueryForRetailerDataUpdate.makeQuery(req);
  var updateVariables = queryData.updateVariables;
  var variablesValues = queryData.variablesValues;
  var updateData = queryData.updateData;
  variablesValues.push(retailerId);
  var sql = "UPDATE `RETAILER_DATA` SET " + updateVariables + " WHERE retailerId=?";
  con.query(sql, variablesValues, function(err, rows) {
    if (err) {
      console.log(err);
      var myobj = {
        responseFrom: "update_full_retailer_data",
        update: false
      }
      console.log(myobj);
      res.end(JSON.stringify(myobj));
    } else {
      if (insertInAuth) {
        var sql = "UPDATE `RETAILER_AUTH` SET `mandatoryData` = ?, `shopActLicenseNo` = ? WHERE retailerId=?";
        con.query(sql,[req.body.mandatoryData,req.body.shopActLicenseNo,retailerId], function(err, result) {
        if (err) {
          console.log(err);
          var myobj = {
            responseFrom: "update_full_retailer_data",
            update: false
          }
          console.log(myobj);
          res.end(JSON.stringify(myobj));
        } else {
          var myobj = {
            responseFrom: "update_full_retailer_data",
            update: true,
            updateData: updateData,
            mandatoryData:req.body.mandatoryData,
            shopActLicenseNo:req.body.shopActLicenseNo
          }
          console.log(myobj);
          res.end(JSON.stringify(myobj));
        }
        });
      }else {
        var myobj = {
          responseFrom: "update_full_retailer_data",
          update: true,
          updateData: updateData
        }
        console.log(myobj);
        res.end(JSON.stringify(myobj));
      }

    }
  });
}

module.exports = update_full_retailer_data;






// var req={
//   body:{
//
//     enterpriseName:'bckshbvc',
//     mobileNo:535485424,
//     addLine1:'kuhzdbfkuf',
//     sublocality1Id:1,
//     localityId:7,
//     proprietor:'hbmhzsbc',
//     latloc:75.8776,
//     longloc:67.8978,
//     deliveryStatus:0,
//     maxDeliveryDistanceInMeters:566,
//     maxFreeDeliveryDistanceInMeters:867,
//     chargePerHalfKiloMeterForDelivery:15.25,
//     openCloseIsManual:0,
//     shopOpenTime1:'09:33:35',
//     shopCloseTime1:'09:33:35',
//     shopOpenTime2:'09:33:35',
//     shopCloseTime2:'09:33:35',
//      currentState:0
//
//   }
// }

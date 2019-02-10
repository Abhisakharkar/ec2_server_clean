var update_full_auth_data = function (req, res, authData) {
  //var req={
  //   body:{
  //     //  shopActLicenseNo:78676786
  //     //mandatoryData:1,
  //     deviceId:'kgiyg8'
  //   }
  // }

  var mysql = require('mysql');
  //var retailerId=authData.data.retailerId;
  retailerId=authData.data.retailerId;
  var con = require('./databaseOptions')

      makeQueryForRetailerAuthDataUpdate=require('./../makeQueries/makeQueryForRetailerAuthDataUpdate');
      var queryData=makeQueryForRetailerAuthDataUpdate.makeQuery(req);
      var updateVariables=queryData.updateVariables;
      var variablesValues=queryData.variablesValues;
      var updateData=queryData.updateData;
      variablesValues.push(retailerId);
      var sql = "UPDATE `RETAILER_AUTH` SET "+updateVariables+" WHERE retailerId=?";
      con.query(sql,variablesValues, function(err, rows) {
        if (err) {
          console.log(err);
          var myobj = {
            responseFrom: "update_full_auth_data",
            update: false
          }
          console.log(myobj);
          res.end(JSON.stringify(myobj));
        } else {
          var myobj = {
            responseFrom: "update_full_auth_data",
            update: true,
            updateData:updateData
          }
         console.log(myobj);
         res.end(JSON.stringify(myobj));
        }
      });



}
module.exports=update_full_auth_data;

var get_retailers_near_me = function (req,res) {

  var con= require('./databaseOptions')
  if (req.body.localityId==null){
    res.end("localityId is a required field");
  }else {
      makeQueryForGetRetailerNearMe=require('./../makeQueries/makeQueryForGetRetailerNearMe');
      var queryData=makeQueryForGetRetailerNearMe.makeQuery(req);
      var updateVariables=queryData.updateVariables;
      var variablesValues=queryData.variablesValues;
      var updateData=queryData.updateData;
      console.log(updateVariables);
      console.log(variablesValues);
      var sql = "SELECT `retailerId`, `enterpriseName`, `mobileNo`, `shopPhoto`, `subLocality1Id`, `localityId`, `latloc`, `longloc`, `deliveryStatus`, `verifiedByTeam` FROM `RETAILER_DATA` WHERE "+updateVariables;
      con.query(sql,variablesValues, function(err, rows) {
        if (err) {
          res.sendStatus(500);
        }
        else {
          var myObj={
            retailers:rows
          }
          res.end(JSON.stringify(myObj));
        }
      });
    }
}
module.exports=get_retailers_near_me;

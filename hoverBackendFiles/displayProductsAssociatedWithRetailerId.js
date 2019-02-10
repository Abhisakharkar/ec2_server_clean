var display_products_associated_with_retailer_id = function(req, res, authData) {


  var retailerId = authData.data.retailerId;

  var con = require('./databaseOptions')



  var sql = "SELECT * FROM `RET_PROD_ID` WHERE `retailerId` = ? ";
  con.query(sql, [retailerId], function(err, rows) {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log("retailerId" + retailerId);
      var myObj = {
        responseFrom: "display_products_associated_with_retailer_id",
        "retailerId": retailerId,
        "items": rows
      }
      console.log(myObj);
      res.end(JSON.stringify(myObj));
    }
  });
}

module.exports = display_products_associated_with_retailer_id;

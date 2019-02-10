var update_retailer_product = function(req, res, authData) {


  var retailerId = authData.data.retailerId;
  var productId = req.body.productId;
  if (productId == null) {
    console.log("product id null");
    res.end("productId is a required field");
  }else {


  var con = require('./databaseOptions')

  makeQueryForUpdateRetailerProduct = require('./../makeQueries/makeQueryForUpdateRetailerProduct');
  var queryData = makeQueryForUpdateRetailerProduct.makeQuery(req);
  var updateVariables = queryData.updateVariables;
  var variablesValues = queryData.variablesValues;
  var updateData = queryData.updateData;
  variablesValues.push(retailerId);
  variablesValues.push(productId);
  console.log("Connected!");
  var sql = "UPDATE `RET_PROD_ID` SET " + updateVariables + " WHERE `RET_PROD_ID`.`retailerId` = ? AND `RET_PROD_ID`.`productId` = ? ";
  con.query(sql, variablesValues, function(err, result) {
    if (err) {
      console.log(err);
      var myObj = {
        insertSuccess: false,
        responseFrom: "update_retailer_product",
        in: 'four_true'
      }
      res.end(JSON.stringify(myObj));

    } else {
      console.log("1 record inserted in RET_PROD_ID table");
      var myObj = {
        insertSuccess: true,
        responseFrom: "update_retailer_product",
        in: 'four_true'
      }
      res.end(JSON.stringify(myObj));
    }
  });
}
}

module.exports = update_retailer_product;

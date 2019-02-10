var magento_get_product_with_ids = function(req, res) {


"use strict";

var Ids = req.body.Ids;
if(Ids==null){
  res.sendStatus(400);
}else {
//instantiate the client object
var endPoint = '/V1/products?fields=items[sku,id,name,price,attribute_set_id,custom_attributes]';

const mageClient = require('./magentoOptions')
//basic usage

  mageClient.get(endPoint, { //?fields=items[sku,id,name,price,attribute_set_id,custom_attributes[value]]
    "search_criteria": {
      "currentPage": '1',
      "filter_groups": [{
        "filters": [{
          "field": "entity_id",
          "value": Ids,
          "condition_type": "in"
        }]
      }]
    }
  }).then(products => {
    res.contentType('application/json');           //Get a list of all products in category
    var myObj = {
      "responseFrom": "magento_get_product_with_ids",
      "items": products.items
    }
    res.send(JSON.stringify(myObj));
    console.log(products);
  }).catch(err => {
  console.log(err);
  })
}
}
module.exports = magento_get_product_with_ids;

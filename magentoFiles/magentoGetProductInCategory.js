var magento_get_product_in_category = function(req, res) {


"use strict";

var cat_id = req.body.categoryId;
if(cat_id==null){
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
          "field": "category_id",
          "value": cat_id,
          "condition_type": "eq"
        }]
      }]
    }
  }).then(products => {
    res.contentType('application/json');           //Get a list of all products in category
    var myObj = {
      "responseFrom": "magento_get_product_in_category",
      "items": products.items
    }
    res.send(JSON.stringify(myObj));
    console.log(products);
  }).catch(err => {
  console.log(err);
  })
}
}
module.exports = magento_get_product_in_category;

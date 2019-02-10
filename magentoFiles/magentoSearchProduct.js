var magento_search_product = function(req, res) {

    var searchTerm = req.body.searchTerm;
    if (searchTerm!=null) {
    "use strict";
    const mageClient=require('./magentoOptions')
    mageClient.get('/V1/search?fields=items[id]', {
        "search_criteria": {
          //  "currentPage":'1',
          "requestName": "quick_search_container",
          "filter_groups": [{
            "filters": [{
              "field": "search_term",
              "value": searchTerm,
              "condition_type": "like"
            }]
          }]
        }
    }) //Get a list of all products
    .then(products => {
      if(products.items==null){
        var myObj={
          "responseFrom":"magento_search_product",
          "products":[]
        }
      res.end(JSON.stringify(myObj));
    }else {

        var p_id = "";
        for (var i = 0; i < products.items.length; i++) {
          p_id += products.items[i].id;
          if (i < (products.items.length - 1)) {
            p_id += ",";
          }
        }
        mageClient.get('V1/products?fields=items[sku,id,name,price,attribute_set_id,custom_attributes]', {
            "search_criteria": {
              "currentPage": '1',
              "filter_groups": [{
                "filters": [{
                  "field": "entity_id",
                  "value": p_id,
                  "condition_type": "in"
                }]
              }]
            }
          }) //Get a list of all products
          .then(products1 => {
            var myObj={
              "responseFrom":"magento_search_product",
              "products":products1.items
            }
          res.end(JSON.stringify(myObj));
        })
      }
    })
  }else {
    res.sendStatus(400);
  }
}
module.exports = magento_search_product;

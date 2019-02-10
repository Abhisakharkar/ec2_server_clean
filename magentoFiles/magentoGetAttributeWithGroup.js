var magento_get_attribute_with_group = function(req, res) {
  const JSONStreamStringify = require('json-stream-stringify');
  "use strict";

  var attributeSetId = req.body.attributeSetId;
  var csv;
  if(attributeSetId==9){
    csv='26,25';
  }else {
    csv='25,26,29,27,30';
  }
  var count=0;
  var length=0;


  var groupArray = [];
  const mageClient=require('./magentoOptions')
  mageClient.get('/V1/products/attribute-sets/groups/list', {
      "search_criteria": {
        "filter_groups": [{
          "filters": [{
            "field": "attribute_set_id",
            "value": attributeSetId
          }]
        },{
          "filters": [{
            "field": "attribute_group_id",
            "value": csv,
            "condition_type":'nin'
          }]
        }]
      }
    }) //Get a list of all products
    .then(products => {
      if(products.items==null){
        var myObj={
          "responseFrom":'magento_get_attribute_with_group',
          "result": "no such attribute set or no groups in this set",
          "attributes": []
        }
      res.end(JSON.stringify(myObj));
      }else {

        length=products.items.length;
        for (var i = 0; i < products.items.length; i++) {
          var group_id = products.items[i].attribute_group_id;
          console.log("group id =" + group_id);
          var name = products.items[i].attribute_group_name;
          console.log("name =" + name);
          get_attributes_from_group(res, name, group_id);

        }
      }
    });

  function get_attributes_from_group(res, name, group_id) {
    mageClient.get('V1/products/attributes?fields=items[attribute_id,attribute_code,frontend_input,is_required,backend_type]', {
        searchCriteria: {
          "filter_groups": [{
            "filters": [{
              "field": "attribute_group_id",
              "value": group_id
            }]
          }]
        }
      }) //Get a list of all products
      .then(products1 => {
        var myObj = {
          "responseFrom":'magento_get_attribute_with_group',
          "group_name": name,
          "group_id": group_id,
          "attributes": products1
        }
        var bool = addcount();
        if(bool){
        res.write(JSON.stringify(myObj));
        res.write(",");
        }
        else{
          res.end(JSON.stringify(myObj));
        }

      }); // attributes
  }
  function addcount() {
    count++;
    if(count<length)
    {
      return true;
    }
    else {
      return false;
    }

  }

} // upper end


module.exports = magento_get_attribute_with_group;

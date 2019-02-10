var magento_get_categories = function (req,res) {
      "use strict";

      const mageClient=require('./magentoOptions')
      mageClient.get('/V1/categories/list?fields=items[id,parent_id,name,position,level,children,path,include_in_menu,custom_attributes]'
      , {searchCriteria: {currentPage:'1'}}) //Get a list of all categories
      .then(products => {
    //do something with the returned product data

    res.contentType('application/json');
    var myObj={
      "responseFrom":"magento_get_categories",
      "items":products.items
    }
    res.send(JSON.stringify(myObj));

  });

}
module.exports=magento_get_categories;

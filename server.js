var express = require('express');
var bodyParser = require('body-parser');
const jwt= require('jsonwebtoken');
var app = express();
var jsonParser = bodyParser.json();
var mkdirp = require('mkdirp');
var retailerIdForImage;


//const express = require('express')
//const app = express()
var multer = require('multer')
var storage = multer.diskStorage({
  destination: (req, file, cb) =>  {
    if(file.originalname.split('.')[1]=='sp' || file.originalname.split('.')[1]=='dp'){
      mkdirp('/var/www/html/rt/public/' + retailerIdForImage, function(err) {
        if (err) {
        console.log("error making directory");
        }
        else {
          console.log("directory made in public");
            cb(null, '/var/www/html/rt/public/' + retailerIdForImage)
        }
      });
    }else if (file.originalname.split('.')[1]=='lp')
     {
      mkdirp('/var/www/html/rt/private/' + retailerIdForImage, function(err) {
        if (err) {
        console.log("error making directory");
        }
        else {
          console.log("directory made in private");
          cb(null, '/var/www/html/rt/private/' + retailerIdForImage)
        }
      });
    }
  },
  filename: (req, file, cb) => {
    //cb(null, file.originalname.split('.')[1] + '.' + file.mimetype.split('/')[1])
    cb(null, file.originalname.split('.')[1] + '.jpeg' )
  }
});
var upload = multer({
  storage: storage
})

app.post('/upload',verifyForImage,upload.single('imageFile'), function(req, res, next) {
  retailerIdForImage=null;
  res.send('Image Saved!');
});





app.post('/check_mail_exist', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  check_mail_exist = require('./hoverBackendFiles/checkMailExist');
  check_mail_exist(req, res);
});

app.post('/sign_up', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  sign_up = require('./hoverBackendFiles/signUp');
  sign_up(req, res);
});

app.post('/get_retailers_near_me', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  get_retailers_near_me = require('./hoverBackendFiles/getRetailersNearMe');
  get_retailers_near_me(req, res);

});

app.post('/sign_in', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  sign_in = require('./hoverBackendFiles/signIn');
  sign_in(req, res);
});

app.post('/verify_mail', jsonParser,verifyToken, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      verify_mail = require('./hoverBackendFiles/verifyMail');
      verify_mail(req, res, authData);
    }
  });
});
app.post('/check_device_id', jsonParser,verifyToken, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      check_device_id = require('./hoverBackendFiles/checkDeviceId');
      check_device_id(req, res, authData);
    }
  });
});
app.post('/resend_verification_code', jsonParser, verifyToken, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      resend_verification_code = require('./hoverBackendFiles/resendVerificationCode');
      resend_verification_code(req, res, authData);
    }
  });
});

app.post('/get_location_ids', jsonParser, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
      get_location_ids = require('./hoverBackendFiles/getLocationIds');
      get_location_ids(req, res);
});



app.post('/add_retailer_product', jsonParser,verifyToken, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      add_retailer_product = require('./hoverBackendFiles/addRetailerProduct');
      add_retailer_product(req, res,authData);
    }
  });
});

app.post('/update_retailer_product', jsonParser,verifyToken, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      update_retailer_product = require('./hoverBackendFiles/updateRetailerProduct');
      update_retailer_product(req, res,authData);
    }
  });
});
app.post('/display_products_associated_with_retailer_id', jsonParser,verifyToken, function(req, res) {
  console.log("Request from:" + req.url);
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      display_products_associated_with_retailer_id = require('./hoverBackendFiles/displayProductsAssociatedWithRetailerId');
      display_products_associated_with_retailer_id(req, res,authData);
    }
  });
});

app.post('/update_device_id', jsonParser,verifyToken, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      update_device_id = require('./hoverBackendFiles/updateDeviceId');
      update_device_id(req, res, authData);
    }
    console.log("Request from:" + req.url);
  });
});

app.post('/update_full_auth_data', jsonParser,verifyToken, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      update_full_auth_data = require('./hoverBackendFiles/updateFullAuthData');
      update_full_auth_data(req, res, authData);
    }
    console.log("Request from:" + req.url);
  });
});

app.post('/update_full_retailer_data', jsonParser,verifyToken, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  jwt.verify(req.token,'abhishek_007',(err,authData)=>{
    if (err) {
      res.sendStatus(403);
    }else {
      update_full_retailer_data = require('./hoverBackendFiles/updateFullRetailerData');
      update_full_retailer_data(req, res, authData);
    }
    console.log("Request from:" + req.url);
  });
});


app.post('/magento_search_product', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  magento_search_product = require('./magentoFiles/magentoSearchProduct');
  magento_search_product(req, res);

  console.log("Request from:" + req.url);

});

app.post('/magento_search_in_category', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  magento_search_in_category = require('./magentoFiles/magentoSearchInCategory');
  magento_search_in_category(req, res);

  console.log("Request from:" + req.url);

});

app.post('/magento_get_attribute_with_group', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  magento_get_attribute_with_group = require('./magentoFiles/magentoGetAttributeWithGroup');
  magento_get_attribute_with_group(req, res);

  console.log("Request from:" + req.url);

});

app.post('/magento_get_product_in_category', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  magento_get_product_in_category = require('./magentoFiles/magentoGetProductInCategory');
  magento_get_product_in_category(req, res);
  console.log("Request from:" + req.url);

});

app.post('/magento_get_product_with_ids', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  magento_get_product_with_ids = require('./magentoFiles/magentoGetProductWithIds');
  magento_get_product_with_ids(req, res);
  console.log("Request from:" + req.url);

});

app.post('/magento_get_categories', jsonParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);

  magento_get_categories = require('./magentoFiles/magentoGetCategories');
  magento_get_categories(req, res);

  console.log("Request from:" + req.url);

});

function verifyToken(req,res,next) {
  const bearerHeader =req.headers['authorization'];
  console.log(bearerHeader);
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken= bearer[1];
    req.token = bearerToken;
    next();
  }else {
    res.sendStatus(403);
  }
}

function verifyForImage(req,res,next) {

  const bearerHeader =req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
   const bearer = bearerHeader.split(' ');
   const bearerToken= bearer[1];
   req.token =bearerToken;
    jwt.verify(req.token,'abhishek_007',(err,authData)=>{
      if (err) {
        res.sendStatus(403);
      }else {
        retailerIdForImage=authData.data.retailerId;
        console.log(retailerIdForImage);
        next();
      }
    });
  }else {
    res.sendStatus(403);
  }
}

app.listen(6868);

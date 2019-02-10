var get_location_id = function(req, res) {
  var latloc = req.body.latloc;
  var longloc = req.body.longloc;
  if (latloc == null || longloc == null) {
    res.sendstatus(400);
  }else {
  var latlngloc = latloc + "," + longloc;
  console.log(latlngloc);
  var con = require('./databaseOptions')
  var apiKey = 'AIzaSyD936hIXMiYNq60MZ2mqXXuS_2TsM38Q-U';

  var rp = require('request-promise');
  var options = {
    uri: 'https://maps.googleapis.com/maps/api/geocode/json',
    qs: {
      latlng: latlngloc, // -> uri + '?access_token=xxxxx%20xxxxx'
      result_type: 'locality|sublocality_level_1|sublocality_level_2',
      key: apiKey
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  };

  rp(options).then(function(api) {
    var apiResultLength = api.results.length;
    var length=0;
    var locality;
    var googleLocalityId;
    var subLocality1;
    var googleSubLocality1Id;
    var subLocality2;
    var googleSubLocality2Id;
    var localityId;
    var localityTier;
    var myObj = {};
    var localityArray = [];
    var subLocality1Array = [];
    var subLocality2Array = [];
    if (apiResultLength) {
      for (var i = (apiResultLength - 1); i > -1; i--) {
        var typesLength = api.results[i].types.length;
        for (var j = 0; j < typesLength; j++) {
          value = api.results[i].types[j];
          if (value == 'locality') {
            localityArray.push(i);
          } else if (value == 'sublocality_level_1') {
            subLocality1Array.push(i);
          } else if (value == 'sublocality_level_2') {
            subLocality2Array.push(i);
          }
        }
      }
    } else {
      myObj = {
        status: 'failed no address for this coordinate'
      }
      console.log(myObj);
      res.end(JSON.stringify(myObj));
    }
    if (localityArray[0] != null && subLocality1Array[0] != null && subLocality2Array[0] != null) {
      length = 3;
      locality = api.results[localityArray[0]].formatted_address;
      googleLocalityId = api.results[localityArray[0]].place_id;
      subLocality1 = api.results[subLocality1Array[0]].address_components[0].long_name;
      googleSubLocality1Id = api.results[subLocality1Array[0]].place_id;
      subLocality2 = api.results[subLocality2Array[0]].address_components[0].long_name;
      googleSubLocality2Id = api.results[subLocality2Array[0]].place_id;
    } else if (localityArray[0] != null && subLocality1Array[0] != null) {
      length = 2;
      locality = api.results[localityArray[0]].formatted_address;
      googleLocalityId = api.results[localityArray[0]].place_id;
      subLocality1 = api.results[subLocality1Array[0]].address_components[0].long_name;
      googleSubLocality1Id = api.results[subLocality1Array[0]].place_id;
    } else if (localityArray[0] != null) {
      length = 1;
      locality = api.results[localityArray[0]].formatted_address;
      googleLocalityId = api.results[localityArray[0]].place_id;
    } else {
      myObj = {
        status: 'failed no address for this coordinate no locality found'
      }
      console.log(myObj);
      res.end(JSON.stringify(myObj));
    }
    if(length>0){
      con.query("SELECT `localityId`, `tier`, `locality`, `wholesaleTier` FROM `LOCALITY_ID` WHERE `googleLocalityId` = ? ", [googleLocalityId], function(err, rows) {
        if (err) {
          console.log(err);
          console.log("error in locality search");
        } else {
          get_sub_locality_1 = require('./getSubLocality1');
          myObj.length = length;
          if (rows.length) {
            myObj.localityData = rows[0];
            if (myObj.length > 1) {
              get_sub_locality_1(res, con, myObj, subLocality1, googleSubLocality1Id, subLocality2, googleSubLocality2Id);
            } else {
              console.log(myObj);
              res.end(JSON.stringify(myObj));
            }
          } else {
            con.query("INSERT INTO `LOCALITY_ID` (`localityId`, `locality`, `googleLocalityId`, `tier`, `wholesaleTier`) VALUES (NULL, ?, ?, '0', '0')", [locality, googleLocalityId], function(err, rows1) {
              if (err) {
                console.log(err);
                console.log("error in locality insertion");
              } else {
                var localityData = {
                  localityId: rows1.insertId,
                  tier: 0,
                  locality: locality,
                  wholesaleTier: 0
                }
                myObj.localityData = localityData;
                if (myObj.length > 1) {
                  get_sub_locality_1(res, con, myObj, subLocality1, googleSubLocality1Id, subLocality2, googleSubLocality2Id);
                } else {
                  console.log(myObj);
                  res.end(JSON.stringify(myObj));
                }
              }
            });
          }
        }
      });
    }
  }).catch(function(err) {
      // API call failed...
      console.log("error in reverse geocoding api response");
      res.sendstatus(500);

  });
}
}
module.exports = get_location_id;

//https://maps.googleapis.com/maps/api/geocode/json?latlng=19.132997,72.842140&result_type=locality|sublocality_level_1|sublocality_level_2&key=AIzaSyD936hIXMiYNq60MZ2mqXXuS_2TsM38Q-U


//
// con.query("INSERT INTO `LOCALITY_ID` (`localityId`, `locality`, `googleLocalityId`, `tier`) VALUES (NULL, ?, ?, '0')",[locality,googleLocalityId]  , function(err, rows){
//   if(err) {
//     console.log(err);
//     console.log("error in locality insertion");
//   }
//   else {
//     localityId=rows.insertId;
//   }
//   if (length==2) {
//     con.query("INSERT INTO `LOCALITY_ID` (`localityId`, `locality`, `googleLocalityId`, `tier`) VALUES (NULL, ?, ?, '0')",[locality,googleLocalityId]  , function(err, rows){
//         console.log(err);
//         console.log("error in locality insertion");
//       }
//       if(err) {
//       else {
//         localityId=rows.insertId;
//       }
//   }

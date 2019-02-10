var get_sub_locality_1=function (res,con,myObj,subLocality1,googleSubLocality1Id,subLocality2,googleSubLocality2Id) {
  con.query("SELECT `subLocality1Id`, `tier`, `subLocality1`, `wholesaleTier` FROM `SUB_LOCALITY_1_ID` WHERE `googleSubLocality1Id` = ? ",[googleSubLocality1Id]  , function(err, rows){
    if(err) {
      console.log(err);
      console.log("error in sub locality 1 search");
    }
    else {
      get_sub_locality_2=require('./getSubLocality2');
      if (rows.length) {
        myObj.subLocality1Data=rows[0];
        if (myObj.length>2) {
          get_sub_locality_2(res,con,myObj,subLocality2,googleSubLocality2Id);
        }
        else {
          console.log(myObj);
          res.end(JSON.stringify(myObj));
        }
      }
      else {
        con.query("INSERT INTO `SUB_LOCALITY_1_ID` (`subLocality1Id`, `subLocality1`, `googleSubLocality1Id`, `localityId`, `tier`, `wholesaleTier`) VALUES (NULL, ?, ?, ?, '0', '0')",[subLocality1,googleSubLocality1Id,myObj.localityData.localityId]  , function(err, rows1){
          if(err) {
            console.log(err);
            console.log("error in sub locality 1 insertion");
          }
          else {
            var subLocality1Data={
              subLocality1Id:rows1.insertId,
              subLocality1:subLocality1,
              tier:0,
              wholesaleTier:0
            }
            myObj.subLocality1Data=subLocality1Data;
            if (myObj.length>2) {
              get_sub_locality_2(res,con,myObj,subLocality2,googleSubLocality2Id);
            }
            else {
              console.log(myObj);
              res.end(JSON.stringify(myObj));
            }
          }
        });
      }
    }
  });

}
module.exports=get_sub_locality_1;

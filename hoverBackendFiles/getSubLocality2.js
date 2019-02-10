var get_sub_locality_2=function (res,con,myObj,subLocality2,googleSubLocality2Id) {
  con.query("SELECT `subLocality2Id`, `subLocality2`, `tier`, `wholesaleTier` FROM `SUB_LOCALITY_2_ID` WHERE `googleSubLocality2Id` = ? ",[googleSubLocality2Id]  , function(err, rows){
    if(err) {
      console.log(err);
      console.log("error in sub locality 2 search");
    }
    else {
      if (rows.length) {
        myObj.subLocality2Data=rows[0];
        console.log(myObj);
        res.end(JSON.stringify(myObj));
      }
      else {
        con.query("INSERT INTO `SUB_LOCALITY_2_ID` (`subLocality2Id`, `subLocality2`, `googleSubLocality2Id`, `subLocality1Id`, `tier`) VALUES (NULL, ?, ?, ?, '0')",[subLocality2,googleSubLocality2Id,myObj.subLocality1Data.subLocality1Id]  , function(err, rows1){
          if(err) {
            console.log(err);
            console.log("error in sub locality 2 insertion");
          }
          else {
            var subLocality2Data={
              subLocality2Id:rows1.insertId,
              subLocality2:subLocality2,
              tier:0,
              wholesaleTier:0
            }
            myObj.subLocality2Data=subLocality2Data;
            console.log(myObj);
            res.end(JSON.stringify(myObj));
          }
        });
      }
    }
  });

}
module.exports=get_sub_locality_2;

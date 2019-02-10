module.exports ={ makeQuery: function (req) {

    var updateVariables,variablesValues=[],updateData=[];

    var count=0;
    if (req.body.localityId!=null) {
      updateVariables='`localityId` = ?';
      variablesValues.push(req.body.localityId);
      updateData.push({"localityId":req.body.localityId});
      count++;
    }
    if (req.body.subLocality1Id!=null) {
      variablesValues.push(req.body.subLocality1Id);
      updateData.push({"sublocality1Id":req.body.sublocality1Id});
      if (updateVariables==null) {
        updateVariables='`sublocality1Id` = ?';
        count++;
      }else {
        updateVariables+=' AND `sublocality1Id` = ?';
        count++;
      }
    }

    if (req.body.subLocality2Id!=null) {
      variablesValues.push(req.body.subLocality2Id);
      updateData.push({"sublocality2Id":req.body.sublocality2Id});
      if (updateVariables==null) {
        updateVariables='`sublocality2Id` = ?';
        count++;
      }else {
        updateVariables+=' AND `sublocality2Id` = ?';
        count++;
      }
    }

    var obj={
      updateVariables:updateVariables,
      variablesValues:variablesValues,
      updateData:updateData
    }

    return obj;
  }
  };

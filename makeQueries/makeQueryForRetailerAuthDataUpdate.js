module.exports ={ makeQuery: function (req) {
  
    var updateVariables,variablesValues=[],updateData=[];

    var count=0;
    if (req.body.shopActLicenseNo!=null) {
      updateVariables='`shopActLicenseNo` = ?';
      variablesValues.push(req.body.shopActLicenseNo);
      updateData.push({"shopActLicenseNo":req.body.shopActLicenseNo});
      count++;
    }
    if (req.body.mandatoryData!=null) {
      variablesValues.push(req.body.mandatoryData);
      updateData.push({"mandatoryData":req.body.mandatoryData});
      if (updateVariables==null) {
        updateVariables='mandatoryData = ?';
        count++;
      }else {
        updateVariables+=', mandatoryData = ?';
        count++;
      }
    }

    if (req.body.deviceId!=null) {
      variablesValues.push(req.body.deviceId);
      updateData.push({"deviceId":req.body.deviceId});
      if (updateVariables==null) {
        updateVariables='deviceId = ?';
        count++;
      }else {
        updateVariables+=', deviceId = ?';
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

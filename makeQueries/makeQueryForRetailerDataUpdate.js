//make query for profile data : proprietor,mobileNo, enterprise name,addLine1,sublocality1,locality,latloc,longloc
module.exports ={ makeQuery: function (req) {
var data;
  // var req={
  //   body:{
  //
  //     enterpriseName:'bckshbvc',
  //     mobileNo:535485424,
  //     addLine1:'kuhzdbfkuf',
  //     // sublocality1Id:1,
  //     // localityId:7,
  //     // proprietor:'hbmhzsbc',
  //     // latloc:75.8776,
  //     // longloc:67.8978,
  //     // deliveryStatus:0,
  //     // maxDeliveryDistanceInMeters:566,
  //     // maxFreeDeliveryDistanceInMeters:867,
  //     // chargePerHalfKiloMeterForDelivery:15.25,
  //     // openCloseIsManual:0,
  //     // shopOpenTime1:'09:33:35',
  //     shopCloseTime1:'09:33:35',
  //     shopOpenTime2:'09:33:35',
  //     shopCloseTime2:'09:33:35',
  //     currentState:0
  //
  //   }
  // }
  var updateVariables,variablesValues=[],updateData=[];

  var count=0;
  if (req.body.proprietor!=null) {
    updateVariables='`proprietor` = ?';
    variablesValues.push(req.body.proprietor);
    updateData.push({"proprietor":req.body.proprietor});
    count++;
  }
  if (req.body.mobileNo!=null) {
    if (updateVariables==null) {
      updateVariables='mobileNo = ?';
      variablesValues.push(req.body.mobileNo);

      updateData.push({"mobileNo":req.body.mobileNo});
      count++;
    }else {
      updateVariables+=', mobileNo = ?';
      variablesValues.push(req.body.mobileNo);
      updateData.push({"mobileNo":req.body.mobileNo});
      count++;
    }
  }
  if (req.body.enterpriseName!=null) {
    if (updateVariables==null) {
      updateVariables='enterpriseName = ?';
      variablesValues.push(req.body.enterpriseName);
      updateData.push({'enterpriseName':req.body.enterpriseName});
      count++;
    }else {
      updateVariables+=', enterpriseName = ?';
      variablesValues.push(req.body.enterpriseName);
      updateData.push({'enterpriseName':req.body.enterpriseName});
      count++;
    }
  }
  if (req.body.addLine1!=null) {
    if (updateVariables==null) {
      updateVariables='addLine1 = ?';
      variablesValues.push(req.body.addLine1);
      updateData.push({'addLine1':req.body.addLine1});
      count++;
    }else {
      updateVariables+=', addLine1 = ?';
      variablesValues.push(req.body.addLine1);
      updateData.push({'addLine1':req.body.addLine1});
      count++;
    }
  }
  if (req.body.subLocality1Id!=null) {
    if (updateVariables==null) {
      updateVariables='subLocality1Id = ?';
      variablesValues.push(req.body.subLocality1Id);
      updateData.push({'subLocality1Id':req.body.subLocality1Id});
      count++;
    }else {
      updateVariables+=', subLocality1Id = ?';
      variablesValues.push(req.body.subLocality1Id);
      updateData.push({'subLocality1Id':req.body.subLocality1Id});
      count++;
    }
  }
  if (req.body.localityId!=null) {
    if (updateVariables==null) {
      updateVariables='localityId = ?';
      variablesValues.push(req.body.localityId);
      updateData.push({'localityId':req.body.localityId});
      count++;
    }else {
      updateVariables+=', localityId = ?';
      variablesValues.push(req.body.localityId);
      updateData.push({'localityId':req.body.localityId});
      count++;
    }
  }
  if (req.body.latLoc!=null) {
    if (updateVariables==null) {
      updateVariables='latLoc = ?';
      variablesValues.push(req.body.latLoc);
      updateData.push({'latLoc':req.body.latLoc});
      count++;
    }else {
      updateVariables+=', latLoc = ?';
      variablesValues.push(req.body.latLoc);
      updateData.push({'latLoc':req.body.latLoc});
      count++;
    }
  }
  if (req.body.longLoc!=null) {
    if (updateVariables==null) {
      updateVariables='longLoc = ?';
      variablesValues.push(req.body.longLoc);
      updateData.push({'longLoc':req.body.longLoc});
      count++;
    }else {
      updateVariables+=', longLoc = ?';
      variablesValues.push(req.body.longLoc);
      updateData.push({'longLoc':req.body.longLoc});
      count++;
    }
  }
  if (req.body.deliveryStatus!=null) {
    if (updateVariables==null) {
      updateVariables='deliveryStatus = ?';
      variablesValues.push(req.body.deliveryStatus);
      updateData.push({'deliveryStatus':req.body.deliveryStatus});
      count++;
    }else {
      updateVariables+=', deliveryStatus = ?';
      variablesValues.push(req.body.deliveryStatus);
      updateData.push({'deliveryStatus':req.body.deliveryStatus});
      count++;
    }
  }
  if (req.body.maxDeliveryDistanceInMeters!=null) {
    if (updateVariables==null) {
      updateVariables='maxDeliveryDistanceInMeters = ?';
      variablesValues.push(req.body.maxDeliveryDistanceInMeters);
      updateData.push({'maxDeliveryDistanceInMeters':req.body.maxDeliveryDistanceInMeters});
      count++;
    }else {
      updateVariables+=', maxDeliveryDistanceInMeters = ?';
      variablesValues.push(req.body.maxDeliveryDistanceInMeters);
      updateData.push({'maxDeliveryDistanceInMeters':req.body.maxDeliveryDistanceInMeters});
      count++;
    }
  }
  if (req.body.maxFreeDeliveryDistanceInMeters!=null) {
    if (updateVariables==null) {
      updateVariables='maxFreeDeliveryDistanceInMeters = ?';
      variablesValues.push(req.body.maxFreeDeliveryDistanceInMeters);
      updateData.push({'maxFreeDeliveryDistanceInMeters':req.body.maxFreeDeliveryDistanceInMeters});
      count++;
    }else {
      updateVariables+=', maxFreeDeliveryDistanceInMeters = ?';
      variablesValues.push(req.body.maxFreeDeliveryDistanceInMeters);
      updateData.push({'maxFreeDeliveryDistanceInMeters':req.body.maxFreeDeliveryDistanceInMeters});
      count++;
    }
  }
  if (req.body.chargePerHalfKiloMeterForDelivery!=null) {
    if (updateVariables==null) {
      updateVariables='chargePerHalfKiloMeterForDelivery = ?';
      variablesValues.push(req.body.chargePerHalfKiloMeterForDelivery);
      updateData.push({'chargePerHalfKiloMeterForDelivery':req.body.chargePerHalfKiloMeterForDelivery});
      count++;
    }else {
      updateVariables+=', chargePerHalfKiloMeterForDelivery = ?';
      variablesValues.push(req.body.chargePerHalfKiloMeterForDelivery);
      updateData.push({'chargePerHalfKiloMeterForDelivery':req.body.chargePerHalfKiloMeterForDelivery});
      count++;
    }
  }
  if (req.body.minAmountForFreeDelivery!=null) {
    if (updateVariables==null) {
      updateVariables='minAmountForFreeDelivery = ?';
      variablesValues.push(req.body.minAmountForFreeDelivery);
      updateData.push({'minAmountForFreeDelivery':req.body.minAmountForFreeDelivery});
      count++;
    }else {
      updateVariables+=', minAmountForFreeDelivery = ?';
      variablesValues.push(req.body.minAmountForFreeDelivery);
      updateData.push({'minAmountForFreeDelivery':req.body.minAmountForFreeDelivery});
      count++;
    }
  }

  if (req.body.openCloseIsManual!=null) {
    if (updateVariables==null) {
      updateVariables='openCloseIsManual = ?';
      variablesValues.push(req.body.openCloseIsManual);
      updateData.push({'openCloseIsManual':req.body.openCloseIsManual});
      count++;
    }else {
      updateVariables+=', openCloseIsManual = ?';
      variablesValues.push(req.body.openCloseIsManual);
      updateData.push({'openCloseIsManual':req.body.openCloseIsManual});
      count++;
    }
  }
  if (req.body.shopOpenTime1!=null) {
    if (updateVariables==null) {
      updateVariables='shopOpenTime1 = ?';
      variablesValues.push(req.body.shopOpenTime1);
      updateData.push({'shopOpenTime1':req.body.shopOpenTime1});
      count++;
    }else {
      updateVariables+=', shopOpenTime1 = ?';
      variablesValues.push(req.body.shopOpenTime1);
      updateData.push({'shopOpenTime1':req.body.shopOpenTime1});
      count++;
    }
  }
  if (req.body.shopCloseTime1!=null) {
    if (updateVariables==null) {
      updateVariables='shopCloseTime1 = ?';
      variablesValues.push(req.body.shopCloseTime1);
      updateData.push({'shopCloseTime1':req.body.shopCloseTime1});
      count++;
    }else {
      updateVariables+=', shopCloseTime1 = ?';
      variablesValues.push(req.body.shopCloseTime1);
      updateData.push({'shopCloseTime1':req.body.shopCloseTime1});
      count++;
    }
  }
  if (req.body.shopOpenTime2!=null) {
    if (updateVariables==null) {
      updateVariables='shopOpenTime2 = ?';
      variablesValues.push(req.body.shopOpenTime2);
      updateData.push({'shopOpenTime2':req.body.shopOpenTime2});
      count++;
    }else {
      updateVariables+=', shopOpenTime2 = ?';
      variablesValues.push(req.body.shopOpenTime2);
      updateData.push({'shopOpenTime2':req.body.shopOpenTime2});
      count++;
    }
  }
  if (req.body.shopCloseTime2!=null) {
    if (updateVariables==null) {
      updateVariables='shopCloseTime2 = ?';
      variablesValues.push(req.body.shopCloseTime2);
      updateData.push({'shopCloseTime2':req.body.shopCloseTime2});
      count++;
    }else {
      updateVariables+=', shopCloseTime2 = ?';
      variablesValues.push(req.body.shopCloseTime2);
      updateData.push({'shopCloseTime2':req.body.shopCloseTime2});
      count++;
    }
  }
  if (req.body.currentState!=null) {
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    if (updateVariables==null) {
      updateVariables='currentState = ?, lastStatusUpdate = ?';
      variablesValues.push(req.body.currentState);
      variablesValues.push(formatted);
      updateData.push({'currentState':req.body.currentState});
      updateData.push({'lastStatusUpdate':formatted});
      count++;
    }else {
      updateVariables+=', currentState = ?, lastStatusUpdate = ?';
      variablesValues.push(req.body.currentState);
      variablesValues.push(formatted);
      updateData.push({'currentState':req.body.currentState});
      updateData.push({'lastStatusUpdate':formatted});
      count++;
    }
  }
  if (req.body.appliedForVerification!=null) {
    if (updateVariables==null) {
      updateVariables='appliedForVerification = ?';
      variablesValues.push(req.body.appliedForVerification);
      updateData.push({'appliedForVerification':req.body.appliedForVerification});
      count++;
    }else {
      updateVariables+=', appliedForVerification = ?';
      variablesValues.push(req.body.appliedForVerification);
      updateData.push({'appliedForVerification':req.body.appliedForVerification});
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


//}

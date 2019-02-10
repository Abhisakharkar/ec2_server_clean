module.exports ={ makeQuery: function (req) {

    var updateVariables,variablesValues=[],updateData=[];

    var count=0;
    if (req.body.price!=null) {
      updateVariables='`price` = ?';
      variablesValues.push(req.body.price);
      updateData.push({"price":req.body.price});
      count++;
    }
    if (req.body.photo!=null) {
      variablesValues.push(req.body.photo);
      updateData.push({"photo":req.body.photo});
      if (updateVariables==null) {
        updateVariables='photo = ?';
        count++;
      }else {
        updateVariables+=', photo = ?';
        count++;
      }
    }
    if (req.body.availability!=null) {
      variablesValues.push(req.body.availability);
      updateData.push({"availability":req.body.availability});
      if (updateVariables==null) {
        updateVariables='availability = ?';
        count++;
      }else {
        updateVariables+=', availability = ?';
        count++;
      }
    }
    if (req.body.star!=null) {
      variablesValues.push(req.body.star);
      updateData.push({"star":req.body.star});
      if (updateVariables==null) {
        updateVariables='star = ?';
        count++;
      }else {
        updateVariables+=', star = ?';
        count++;
      }
    }
    if (req.body.textField!=null) {
      variablesValues.push(req.body.textField);
      updateData.push({"textField":req.body.textField});
      if (updateVariables==null) {
        updateVariables='textField = ?';
        count++;
      }else {
        updateVariables+=', textField = ?';
        count++;
      }
    }

    if (req.body.description!=null) {
      variablesValues.push(req.body.description);
      updateData.push({"description":req.body.description});
      if (updateVariables==null) {
        updateVariables='description = ?';
        count++;
      }else {
        updateVariables+=', description = ?';
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

const { default: mongoose } = require("mongoose");
const { validateString, validateNumber, validateObjectId, validateArray, validateEnum } = require("../validations/Validation");
const SIZEENUM = require("../enums/Size")
const PERMISSIONTYPE = require("../enums/PermissionType")

function checkPermissionDto(permissions) {
  const errMessages = [];
  if (!validateArray(permissions)){     
    permissions.forEach((p,index) => {
        if(validateEnum(PERMISSIONTYPE,p))
            errMessages.push(`trường permissions tại ${index} chưa hợp lệ`);
    })  
  } else {
    errMessages.push(`array permissions chưa hợp lệ`);
  }
 
  if (errMessages.length > 0)
    return {
      errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, ""),
    };

  return { data: { permissions} };
}

module.exports = { checkPermissionDto };

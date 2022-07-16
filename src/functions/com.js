export const validVar = (data) => {
    if(data){
        if(data != null && data != undefined && data != '' && data != 'null' && data != 'undefined'){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

export const cloneDeep = (data) => {
    if(data == null || data == undefined){return data}
    if(data.constructor === Array){
        var newArr = [];
        for(var i=0; data.length>i; i++){
            if(data[i] == null || data[i] == undefined){
                var newArrVal = data[i];
            }else if(data[i].constructor === Array || data[i].constructor === Object){
                var newArrVal = cloneDeep(data[i]);
            }else{
                var newArrVal = data[i];
            }
            newArr.push(newArrVal)
        }
        return newArr;
    }else if(data.constructor === Object){
        var newObj = {};
        for(var key in data){
            if(data[key] == null || data[key] == undefined){
                var newObjVal = data[key];
            }else if(data[key].constructor === Array || data[key].constructor === Object){
                var newObjVal = cloneDeep(data[key]);
            }else{
                var newObjVal = data[key];
            }
            newObj[key] = newObjVal
        }
        return newObj;
    }else{
        return data
    }
}
export const clearNumber = (data) => {
    return Number(data.replace(/\D/g,''));
}
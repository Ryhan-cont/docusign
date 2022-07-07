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



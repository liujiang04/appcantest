var gt = window.gt || {}
/**
 * localStorage保存数据
 * @param String key  保存数据的key值
 * @param String value  保存的数据
 */
function setLocVal(key,value){
    window.localStorage.removeItem(key);
    window.localStorage[key] = value;
}
gt.setLocVal = setLocVal

/**
 * 根据key取localStorage的值
 * @param Stirng key 保存的key值
 */
function getLocVal(key){
    if(window.localStorage[key])
        return window.localStorage[key];
    else
        return "";
}
gt.getLocVal = getLocVal
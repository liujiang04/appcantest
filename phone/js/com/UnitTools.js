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


/**
 * 图片转base64
 */

function getBase64ByLocalUrl(url) {//这是站内的一张图片资源，采用的相对路径//实现将项目的图片转化成base64
    function convertImgToBase64(url, callback, outputFormat){
        var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'),
            img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img,0,0);
            var dataURL = canvas.toDataURL(outputFormat || 'image/png');
            callback.call(this, dataURL);
            canvas = null;
        };
        img.src = url;
    }
    base64Img = ""
    convertImgToBase64(url, function(base64){
        //转化后的base64
        alert(base64Img);
        base64Img = base64
    });
    return base64Img
}
 gt.getBase64ByLocalUrl = getBase64ByLocalUrl

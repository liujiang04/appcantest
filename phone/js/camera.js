(function($) {

    //添加  事件
    appcan.button("#nav-left", "btn-act",
    function() {});
    appcan.button("#nav-right", "btn-act",
    function() {});

    $("#Button_98lTtt").html("开始拍照 ")
    appcan.button("#Button_98lTtt", "btn-act",
        function() {
        //系统相机
        //     var comtextareass = '0';
        //     var quality = '100';
        //     uexCamera.open(comtextareass, quality, function(savePath) {
        //         alert(savePath)
        //         // if(savePath){
        //         //     $("#Image_dAPnHj").src = savePath
        //         // }else{
        //         //
        //         // }
        //     });
       //使用自定义的  不会卡死  系统的 可能会卡死  而且可能性很大...
        var comtextareass = 0;
        var quality = 100;
        uexCamera.openInternal(comtextareass, quality, function(data) {
            alert(data);
            $("#Image_dAPnHj").attr("src",data);
        });
        });
    beginLoadTools()

})($);

//在 公共js  加载完成之后  默认执行 main方法

var main = function () {
    //处理异步


}
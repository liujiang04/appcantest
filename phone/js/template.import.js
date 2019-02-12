var $template = {
    load : function(tpl) {
        var items = ( tpl ? $("[data-import]", $(tpl)) : $("[data-import]"));
        for (var i = 0; i < items.length; i++) {
            var item = $(items[i]);
            if (item.data("async") == true)
                continue;
            appcan.request.ajax({
                url : item.attr("data-import"),
                type : 'GET',
                timeout : 10000,
                async : false,
                success : function(data) {
                    var i = $(data);
                    item.html(i);
                    $template.load(i);
                },
                error : function(e) {
                }
            });
        }
    },
    loadByUrl : function(dom, url) {
        appcan.request.ajax({
            url : url,
            type : 'GET',
            timeout : 10000,
            async : false,
            success : function(data) {
                var i = $(data);
                dom.html(i);
                $template.load(i);
            },
            error : function(e) {
            }
        });
    },
    loadByDom :function(dom){
        this.loadByUrl(dom,$(dom).data("import"));
    }
}
_.extend($template, Backbone.Events);
$template.load();

/****************************    华丽的分割线 在此  加载  自己的所有公共js           ******************************/

var gt = window.gt || {}

var loadSingleScript = function (src, callback) {
    console.log(src)
    var s = document.createElement('script');
    s.async = false;
    s.src = src;
    s.addEventListener('load', function () {
        s.parentNode.removeChild(s);
        s.removeEventListener('load', arguments.callee, false);
        callback();
    }, false);
    document.body.appendChild(s);
};
gt.loadSingleScript = loadSingleScript

var beginLoadTools = function () {
    gt.loadSingleScript("js/com/UnitTools.js",function () {
        gt.loadSingleScript("js/com/Const.js",function () {
            if(App.IS_NEED_CONSOLE){
                gt.loadSingleScript(App.eruda,function () {runMain()})
            }else {runMain()}
        })
    })
    var runMain = function () {
        if(window.main){
            main()
        }
    }
}

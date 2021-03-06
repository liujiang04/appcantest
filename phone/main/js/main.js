appcan.button("#nav-left", "btn-act",
    function () {
    });
appcan.button("#nav-right", "btn-act",
    function () {
    });
var da = [{ // ID 必须不一样 才能 出来
    id: 0,
    sort: "成品粮油",
    num: "4",
    total: "10",
}, {
    "id": 1,
    "sort": "肉类",
    "num": "0",
    "total": "10",
}, {
    "id": 2,
    "sort": "禽蛋、水产",
    "num": "0",
    "total": "10",
}, {
    "id": 3,
    "sort": "蔬菜、水果",
    "num": "0",
    "total": "10",
}, {
    "id": 4,
    "sort": "奶类",
    "num": "0",
    "total": "10",
}, {
    "id": 5,
    "sort": "其它",
    "num": "0",
    "total": "10",
}];

appcan.ready(function () {
    $.scrollbox($("body")).on("releaseToReload",
        function () { //After Release or call reload function,we reset the bounce
            $("#ScrollContent").trigger("reload", this);
        }).on("onReloading",
        function (a) { //if onreloading status, drag will trigger this event
        }).on("dragToReload",
        function () { //drag over 30% of bounce height,will trigger this event
        }).on("draging",
        function (status) { //on draging, this event will be triggered.
        }).on("release",
        function () { //on draging, this event will be triggered.
        }).on("scrollbottom",
        function () { //on scroll bottom,this event will be triggered.you should get data from server
            $("#ScrollContent").trigger("more", this);
        }).hide();
})
function getData() {
    return da
}
/*mvvm*/
var Service = new MVVM.Service({
    pretreatment: function (data, option) {
        return data;
    },
    dosuccess: function (data, option) {
        return data;
    },
    doerror: function (e, err, option) {
        return err;
    },
    validate: function (data, option) {
        return data;
    },
    changeData: function (data) {
        this.dosuccess(data)
    },
    ajaxCall: function (data, option) {
        var self = this;
        option.success(self.dosuccess(getData(), option));
        /*appcan.request.ajax({
                url: "",
                type: "GET",
                data: this.pretreatment(data, option),
                dataType: "",
                contentType: "application/x-www-form-urlencoded",
                success: function(data) {
                    var res = self.validate(data, option);
                    if (!res) option.success(self.dosuccess(data, option));
                    else option.error(self.doerror(data, res, option));
                },
                error: function(e, err) {
                    option.error(self.doerror(e, err, option));
                }
            });*/
    }
});
var Model_Collection = MVVM.Model.extend({
    defaults: {},
    //在model创建后执行的方法
    initialize: function () {
        console.log("数据初始化");
    },
    computeds: {
        add: {
            //这里是参数的依赖，也可以使用this.get("username")
            get: function () {
                console.log(this.get("sort"))
                //return 55 + 55;
            }
        }
    },
    sync: function (method, model, options) {
        console.log(method, model, options);
        switch (method) {
            case "create":
                break;
            case "update":
                break;
            case "patch":

                break;
            case "delete":

                break;
            default:
                break;
        }
    }
})
var Collection = new (MVVM.Collection.extend({
    initialize: function () {
        return;
    },
    parse: function (data) {
        return data;
    },
    model: Model_Collection,
    sync: function (method, collection, options) {
        console.log(method)
        switch (method) {
            case "read":
                Service.request({}, options);
                break;
            default:
                break;
        }
    }
}))();
var ViewModel = new (MVVM.ViewModel.extend({
    el: "#sortList",
    collection: Collection,
    initialize: function () {
        this.collection.fetch()
        return
    },
    itemEvents: {
        "tap": function (ev, param) {
            console.log("index = > " + _.indexOf(_.pluck(Collection.models, 'id'),this.model.get("id")))
            console.log(ev.data)
            //this.collection.set("add", da)
        }
    },
    events: {
        "reload": function (ev, param) {
            console.log('reload')
            totalpage = 0;
            curpage = 1;
            this.collection.fetch({
                "success": function () {
                    //debugger;
                    param.reset();
                },
                "error": function () {
                    //debugger;
                    param.reset();
                }
            })
        },
        "more": function (ev, param) {      //关键的代码就在这里
            console.log('more')
            //alert(curpage+"======"+totalpage);
            if (curpage < totalpage) {
                curpage = curpage + 1;
                this.collection.fetch();//加载更多时需要加这一句，不然数据会被覆盖，关键点就在这里
                param.reset();//这个也比较关键，没有这个，会导致后面不执行加载
            }
            // this.collection.fetch({remove: false});
            // param.reset();
        }
    }
}))();
// ViewModel.collection.fetch()
// ViewModel.collection.sync("")
//
// ViewModel.trigger()
//
// ViewModel.collection.trigger('add',"")

//Cannot read property 'trigger' of undefined appcan 里面 zport  版本问题 不用管
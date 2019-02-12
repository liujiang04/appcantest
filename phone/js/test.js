(function($) {
    appcan.button("#nav-left", "btn-act",
    function() {});
    appcan.button("#nav-right", "btn-act",
    function() {});
    beginLoadTools()
})($);

var main = function () {
    appcan.button("#Button_EdDV2Y","btn-act",
        function() {
            alert(gt.getLocVal(StoreKey.UserID))
            appcan.window.open({
                name : "camera",
                data : "camera.html",
                aniId : 10
            });
        });
}
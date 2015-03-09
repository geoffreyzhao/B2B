$(function(){

    /*  头部弹出菜单操作  开始  */
    
    var navShow = false;
    $(".subNavSpan").tap(function(){
        if (navShow) {
            $(".subNavDiv").hide();
        } else {
            $(".subNavDiv").show();
        }
        navShow = !navShow;
    });

    /*  头部弹出菜单操作  结束  */    

});

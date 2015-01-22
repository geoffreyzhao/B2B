function init_header(){
    currentMenuIndex = $("#top_menu > li.current").index();
    //菜单事件设置
    $("#top_menu > li").each(function(index){
        var obj = $("#top_menu > li.current");
        $(this).hover(function(){
            //记住当前是那个菜单
            if(currentMenuIndex < 0) {
                currentMenuIndex = $("#top_menu > li.current").index();
            }

            //$("#top_menu > li:eq(" + currentMenuIndex + ")").removeClass("current");

            $("#top_menu > li").removeClass("mnav");
            if(!$(this).hasClass("current")){
                $(this).addClass("mnav");
            }
            //$(".sub_menu").hide();
            //$(".sub_menu",this).show();
        },function(){

        });
    });

    /*
    $("#top_menu").mouseleave(function(){
        $("#top_menu > li").removeClass("mnav");
        $(".sub_menu").hide();
        $("#top_menu > li:eq(" + currentMenuIndex + ")").addClass("current");
        $("#top_menu > li:eq(" + currentMenuIndex + ") .sub_menu").show();
    });
    */

    /* 消息tab 切换 */
    $(".mesAndnotice li").each(function(index){
        $(this).click(function(e){
            $(".mes_switchover .mes").hide();
            $(".mes_switchover .mes:eq(" + index + ")").show();
            $(".mesAndnotice li").removeClass("current_stateli");
            $(this).addClass("current_stateli");
            e.stopPropagation();
        });
    });

    /* 消息关闭按钮 */
    $("#message .ck").click(function(){
        $("#message_pop").hide();
        e.stopPropagation();
    });

    $("#message_pop").click(function(e){
        e.stopPropagation();
    });

    $("html").click(function(e){
        $("#message_pop").css("display") == 'block' ? $("#message_pop").hide() : '';
        //e.stopPropagation();
    });

    $("#message h3").click(function(e){
        $("#message_pop").toggle();
        e.stopPropagation();
    });
	
}

$(function(){

    /** 返回顶部 */
    var $backToTopTxt = "返回顶部",
    $backToTopEle = $('<a class="backToTop"></a>').appendTo($("#container")).text($backToTopTxt).attr("title", $backToTopTxt).click(function() {
        $("html, body").animate({
            scrollTop: 0
        },
        120);
    }),
    $backToTopFun = function() {
        var st = $(document).scrollTop(),
        winh = $(window).height();
        (st > 800) ? $backToTopEle.show() : $backToTopEle.hide();
    };
    $(window).bind("scroll", $backToTopFun);
    $(function() {
        $backToTopFun();
    });

    /** 返回顶部结束 */
});
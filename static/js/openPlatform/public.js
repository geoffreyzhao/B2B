//  开放平台公用js,  头部导航交互，公共弹窗添加class等

$(function(){

	/*  头部导航交互  开始  */
	recoverCurrentNav();

    $(".first-level-nav").mouseenter(function(){
        $(".second-level-nav").hide();
        $(this).find(".second-level-nav").show();
    });

    $(".first-level-nav").mouseleave(function(){
        $(this).find(".second-level-nav").hide();
        
        recoverCurrentNav();
    });
    /*  头部导航交互  结束  */



    /* 返回顶部  开始  */
    var $backToTopEle = $('<a class="returnTop"></a>').appendTo($("section.main-body")).attr("title", "返回顶部").click(function() {
            $("html, body").animate({
                    scrollTop: 0
                },
                120);
        }),
        $backToTopFun = function() {
            var st = $(document).scrollTop(),
                winh = $(window).height();
            (st > 100) ? $backToTopEle.show() : $backToTopEle.hide();
        };
    $(window).bind("scroll", $backToTopFun);
    /* 返回顶部  结束  */
    
    /* 翻页和tab隔行换色 start */
    $(".lightBlueTab tbody tr:odd,.blueHeadTab tbody tr:odd").css("background-color","#f2f9fc");
    $(".pagination .ellipsisLi").prev("li").css("border-right","1px solid #ccd5de");
    /* 翻页和tab隔行换色 end */
    

});

function recoverCurrentNav() {
    $(".second-level-nav").hide();
    $(".first-level-nav").each(function(){
        if ($(this).hasClass("currentStairMenu")) {
            $(this).find(".second-level-nav").show();
        }
    });
}



var g = {};
$(function() {
    
    // 为左侧菜单栏添加点击事件  实现slideToggle效果 并改变小图标
    
    $(".firstLevel .bigTitleClickContent").click(function() {
        $(this).closest("li").find("ul").slideToggle();
        var $leftArrow = $(this).find("span");
        if ($leftArrow.hasClass("sideBottomArrowIcon")) {
            $leftArrow.removeClass("sideBottomArrowIcon");
        } else {
            $leftArrow.addClass("sideBottomArrowIcon");
        }
    });
    
    //head 菜单hove效果

    recoverCurrentNav();

    $(".first-level-nav").mouseenter(function(){
        $(".second-level-nav").hide();
        $(this).find(".second-level-nav").show();
    });

    $(".first-level-nav").mouseleave(function(){
        $(this).find(".second-level-nav").hide();
        
        recoverCurrentNav();
    });

    //返回顶部
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
    
    

});

function recoverCurrentNav() {
    $(".second-level-nav").hide();
    $(".first-level-nav").each(function(){
        if ($(this).hasClass("currentStairMenu")) {
            $(this).find(".second-level-nav").show();
        }
    });
}
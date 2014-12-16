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
    
    //head 菜单点击效果
    // $(".currentStairMenu").click(function(){
    //     $(".headSecondLevel").toggle();
    //     var $arrow = $(this).find("i");
    //     if ($arrow.hasClass("bottomArrowIcon")) {
    //         $arrow.removeClass("bottomArrowIcon");
    //     } else {
    //         $arrow.addClass("bottomArrowIcon");
    //     }
    // });
    $(".currentStairMenu").mouseenter(function(){
        $(".headSecondLevel").slideDown();
    });

    $(".currentStairMenu").mouseleave(function(){
        $(".headSecondLevel").slideUp();
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
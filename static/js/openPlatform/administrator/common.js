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

});

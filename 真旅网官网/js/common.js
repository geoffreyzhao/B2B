/* 返回顶部  开始  */
$(function(){
    var $backToTopEle = $('<a class="returnTop"></a>').appendTo($("section.mainBody")).attr("title", "返回顶部").click(function() {
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
/* 返回顶部  结束  */
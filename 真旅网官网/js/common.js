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

    /* 返回顶部  结束  */

    /*  旗下网站 hover事件，不需要
    $(".website").hover(function(){
        $(".websiteList").show();
    }, function(event){
        var websiteX1 = $(".websiteList").offset().left,
            websiteY1 = $(".websiteList").offset().top,
            websiteX2 = websiteX1 + $(".websiteList").outerWidth(),
            websiteY2 = websiteY1 + $(".websiteList").outerHeight();

        if (event.clientX > websiteX2 || event.clientX < (websiteX1 - 5)
            || event.clientY > websiteY2 || event.clientY < (websiteY1 - 5)) {
            $(".websiteList").hide();
        }
    });

    $(".websiteList").mouseout(function(){
        var websiteX1 = $(".websiteList").offset().left,
            websiteY1 = $(".websiteList").offset().top,
            websiteX2 = websiteX1 + $(".websiteList").outerWidth(),
            websiteY2 = websiteY1 + $(".websiteList").outerHeight();


        if (event.clientX > (websiteX2 - 5) || event.clientX < websiteX1
            || event.clientY > (websiteY2 - 5) || event.clientY < websiteY1) {
            $(".websiteList").hide();
        }
        
    });
    */
    /* 旗下网站链接
    $("#b2b-website").click(function(){
        window.open("http://www.tdxinfo.com");
    });
    
    $("#b2g-website").click(function(){
        window.open("http://vipcorp.travelzen.com");
    });
    */
});

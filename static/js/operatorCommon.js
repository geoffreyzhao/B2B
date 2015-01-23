$(function(){
	/*
	** 返回顶部的操作在 init.js中(是开发在维护,这里先注释)  By:shuaigeng.zhao 
	*/
	/*
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

	$backToTopFun();
	*/
});

function adjustBodyBg(param) {
    if (param !== undefined) {
        var windowWidth = $(window).outerWidth();
        windowWidth = (windowWidth < 980) ? 980 : windowWidth;
        var resetLeft = (windowWidth - 980)/2;

        if (typeof(param) == "string") {
            $(param).css({
                "width": windowWidth + "px",
                "margin-left": -resetLeft + "px"
            });
        } else if (param instanceof Array) {
            for (var i = 0; i < param.length; i++) {
                $(param[i]).css({
                    "width": windowWidth + "px",
                    "margin-left": -resetLeft + "px"
                });
            }
        }
    } else {
        console.log("adjust window width no params");
    }
}
$(function() {
    /** 返回顶部 */
    /*
    var offset = $("#container").offset();
    var w = $("#container").width();
    */
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
		//IE6下的定位
		if (!window.XMLHttpRequest) {
			$backToTopEle.css("top", st + winh - 166);
		}
	};
	$(window).bind("scroll", $backToTopFun);
    /*
    $(window).bind("resize", function(){
        var offset = $("#container").offset();
        var w = $("#container").width();
        $backToTopEle.css({left:offset.left + w + 20}); 
    });
    */
	$(function() {
		$backToTopFun();
	});

    /** 返回顶部结束 */


    var screen_change = function(p){
        if(p == "fullscreen"){
            $("#container").css("width","100%");
        }else{
            $("#container").css("width","980");
        }
    }


    /* 注册一个切换全屏的快捷建 */
    $("body").keydown(function(e){
        if(e.altKey && e.keyCode == 13){
            if(/980/.test($("#container").css("width"))){
                screen_change("fullscreen");
            }else{
                screen_change("");
            }
        }
    });
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


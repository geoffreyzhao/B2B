function load_header() {
	$.get(encodeURI("/运营商/同步头.html"), {},
	function(data) {
		$(".header").html(data);
		init_header();
	});
}
$(function() {
    /** 返回顶部 */
    /*
    var offset = $("#container").offset();
    var w = $("#container").width();
    */
	var $backToTopTxt = "返回顶部",
	$backToTopEle = $('<a class="backToTop"></a>').appendTo($("body")).text($backToTopTxt).attr("title", $backToTopTxt).click(function() {
		$("html, body").animate({
			scrollTop: 0
		},
		120);
	}),
	$backToTopFun = function() {
		var st = $(document).scrollTop(),
		winh = $(window).height();
		(st > 0) ? $backToTopEle.show() : $backToTopEle.hide();
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

	if (typeof(init_header) == "undefined") {
		$.getScript("/static/js/header.js", function() {
			load_header();
		});
	} else {
		load_header();
	}


    /* 注册一个切换全屏的快捷建 */
    $("body").keydown(function(e){
        if(e.altKey && e.keyCode == 13){
            if(/980/.test($("#container").css("width"))){
                $("#container").css("width","100%");
            }else{
                $("#container").css("width","980");
            }
        }
    });
});


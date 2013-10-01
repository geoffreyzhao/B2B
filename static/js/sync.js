function load_header() {
	$.get(encodeURI("/运营商/同步头.html"), {},
	function(data) {
		$(".header").html(data);
		init_header();
	});
}
$(function() {
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
	$(function() {
		$backToTopFun();
	});

	if (typeof(init_header) == "undefined") {
		$.getScript("/static/js/header.js", function() {
			load_header();
		});
	} else {
		load_header();
	}
});


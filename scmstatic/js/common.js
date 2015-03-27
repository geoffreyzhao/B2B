/*  设置全局 html font-size  */
var root = document.getElementsByTagName("html")[0];
var w = window.innerWidth >= 640 ? 640 : window.innerWidth;
root.style.fontSize = (w / 320) * 20 + "px";

$(function(){

	$(".viewport").css({
		"min-height": $(window).height() + "px"
	});
    
});


/*  设置全局 html font-size  */
var root = document.getElementsByTagName("html")[0];
root.style.fontSize = (window.innerWidth / 320) * 20 + "px";

$(function(){

	$(".viewport").css({
		"min-height": $(window).height() + "px"
	});
    
});


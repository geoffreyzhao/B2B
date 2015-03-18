$(function(){
	var root = document.getElementsByTagName('html')[0],
		    NATIVE_W = 320;

	$(window).load(function(){
		var w = window.innerWidth;
        var cw = (w / NATIVE_W) * 20;
		root.style.fontSize = cw + 'px';
	});

	$(".viewport").css({
		"min-height": $(window).height() + "px"
	});
    
});
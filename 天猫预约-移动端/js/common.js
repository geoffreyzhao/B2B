$(function(){
	var root = document.getElementsByTagName('html')[0],
		    NATIVE_W = 640,
		    NATIVE_H = 1136;

	$(window).load(function(){
		var cw = 20,
	        w = window.innerWidth,
	        h = window.innerHeight;

		if ((w / h) > (NATIVE_W / NATIVE_H)) {
			cw = h / (NATIVE_H / 40);
		} else {
			cw = w / (NATIVE_W / 40);
		}
		root.style.fontSize = cw + 'px';
	});

	$(".viewport").css({
		"min-height": $(window).height() + "px"
	});
});
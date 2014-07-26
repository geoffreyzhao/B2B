$(function(){

	$(".first-navi-li").each(function(index) {
		$(this).click(function(){
			$(this).addClass("first-navi-active");
			$(this).siblings("li").removeClass('first-navi-active');
		});
	});

	$(".navi-slide-hover").hide();

	$(".second-navi-li").each(function() {
		// $(this).hover(function(){
		// 	$(this).children(".navi-slide-hover").show('600');
		// }, function(){
		// 	$(this).children('.navi-slide-hover').hide('600');
		// });

		$(this).click(function() {
			$(this).children(".navi-slide-hover").show();
			$(this).siblings().children('.navi-slide-hover').hide();
		});
	});

	$(".setting-content").hide();

	$(".setting-icon").hover(function(){
		$(this).addClass("setting-icon-active");
		$(".setting-content").show();
	}, function(){
		$(this).removeClass("setting-icon-active");
		// $(".setting-content").mouseout();
	});

	$(".setting-content").hover(function() {
		$(".setting-content").show();
	}, function(){
		$(".setting-content").hide();
	});


})
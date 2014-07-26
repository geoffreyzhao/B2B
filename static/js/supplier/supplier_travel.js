// 新版供应商  -- 旅游模块
$(function(){

	// 左侧边栏 hover 改变样式
	$(".menu-item-normal").hover(function(){
		$(this).children(".menu-item-num-normal").addClass('menu-item-num-hover');
	}, function(){
		$(this).children(".menu-item-num-normal").removeClass('menu-item-num-hover');
	});

	// 左侧边栏 click 改变样式
	$(".menu-item-normal").click(function(){
		$(this).addClass("menu-item-active");
		$(this).children(".menu-item-num-normal").addClass('menu-item-num-active');
		$(this).children(".menu-item-title-normal").addClass('menu-item-title-active');

		$(this).siblings().removeClass("menu-item-active");
		$(this).siblings().children(".menu-item-num-normal").removeClass('menu-item-num-active');
		$(this).siblings().children(".menu-item-title-normal").removeClass('menu-item-title-active');
	});

});
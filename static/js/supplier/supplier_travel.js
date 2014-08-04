// 新版供应商  -- 旅游模块
$(function(){

	// header common js start
	if ($(".bg-header-repeat") != null) {
		window.onresize = function() {
			var headWidthStr = $(".bg-header-repeat").css("width");
			var totalWidth = headWidthStr.substring(0, headWidthStr.length - 2);
			var width = totalWidth / 2 - 490;
			$(".header-top-left").css("width", width + "px");
		};
	}


	$(".first-navi-li").each(function(index) {
		$(this).click(function(){
			$(this).addClass("first-navi-active");
			$(this).siblings("li").removeClass('first-navi-active');
		});
	});

	var indexArr = [];

	$(".second-navi-li").each(function(index) {

		$(this).bind("mouseenter", function(){
			$(this).children(".navi-slide-hover").animate({
				height: '5px'
			}, 300, 'swing');
		});

		$(this).bind("mouseleave", function(){
			$(this).children('.navi-slide-hover').animate({
				height: '0px'
			}, 200, 'swing');
		});

		$(this).click(function() {
			$(this).addClass("second-navi-active");
			$(this).siblings().removeClass("second-navi-active");

			// 用数组存放每次的索引号，为减少内存占用，只取数组最新加入的两个
			indexArr.push(index);
			if (indexArr.length > 2) {
				indexArr = indexArr.slice(indexArr.length - 2);
			}

			// 解除 mouseleave 事件的绑定，以免和click事件冲突
			$(this).unbind("mouseleave");

			$(this).children(".navi-slide-hover").css("height","5px");
			$(this).siblings().children('.navi-slide-hover').css("height","0px");

			// 为上一次点击的li 重新绑定 mouseleave 事件
			if (indexArr.length == 2) {
				$(this).parent().children('li').eq(indexArr[0]).bind("mouseleave", function(){
					$(this).children('.navi-slide-hover').animate({
						height: '0px'
					}, 200, 'swing');
				});
			}
		});
	});

	$(".third-navi-li").each(function(){
		$(this).click(function(){
			$(this).siblings().removeClass("third-navi-active");
			$(this).addClass("third-navi-active");
		});
	});

	$(".setting-content").hide();

	$(".setting-icon").hover(function(){
		$(this).addClass("setting-icon-active");
		$(".setting-content").show();
	}, function(){
		$(this).removeClass("setting-icon-active");
		$(".setting-content").mouseout();
	});

	$(".setting-content").hover(function() {
		$(".setting-content").show();
	}, function(){
		$(".setting-content").hide();
	});

	// header common js end


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

	// 删除景点图片
	$(".del-spot-picture").click(function(){
		$(this).parent('li').remove();
	});

	// 弹层手动关闭	
	$("body").delegate('.popup-close', 'click', function() {
		$(this).parents(".k-tooltip-content").siblings(".k-tooltip-button").click();
	});


	// 照片图层

	$("body").delegate(".pic-popup-body", "mouseenter", function() {
	    $(".upload-pic-icon").addClass("upload-pic-icon-hover");
	});

	$("body").delegate(".pic-popup-body", "mouseleave", function() {
	    $(".upload-pic-icon").removeClass("upload-pic-icon-hover");
	});


	// 文本框内容提示 和 错误提示 (参照“标题”的效果)
	$(".title-input-tip").hide();
	$(".title-error-tip").hide();

	$(".travel-title input").focus(function(){
		$(this).removeClass("error-tip-border");
		$(this).addClass("input-tip-border");

		$(".title-input-tip").show();
		$(".title-error-tip").hide();
	});

	$(".travel-title input").blur(function(){

		$(".title-input-tip").hide();
		if ($(this).val() == "") {
			$(this).addClass("error-tip-border");
			$(".title-error-tip").show();
		} else {
			$(this).removeClass("error-tip-border");
			$(".title-error-tip").hide();
		}
		$(this).removeClass("input-tip-border");
	});

	$(".path-name-input-tip").hide();
	$(".path-name-error-tip").hide();

	$(".path-name").focus(function(){
		$(this).removeClass("error-tip-border");
		$(this).addClass("input-tip-border");

		$(".path-name-input-tip").show();
		$(".path-name-error-tip").hide();
	});

	$(".path-name").blur(function(){

		$(".path-name-input-tip").hide();
		if ($(this).val() == "") {
			$(this).addClass("error-tip-border");
			$(".path-name-error-tip").show();
		} else {
			$(this).removeClass("error-tip-border");
			$(".path-name-error-tip").hide();
		}
		$(this).removeClass("input-tip-border");
	});

});
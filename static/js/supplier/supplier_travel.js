// 新版供应商  -- 旅游模块
$(function(){

	// header common js start
	$(".first-navi-li").each(function(index) {
		$(this).click(function(){
			$(this).addClass("first-navi-active");
			$(this).siblings("li").removeClass('first-navi-active');
		});
	});

	$(".navi-slide-hover").hide();

	$(".second-navi-li").each(function() {
		$(this).hover(function(){
			$(this).children(".navi-slide-hover").show('600');
		}, function(){
			$(this).children('.navi-slide-hover').hide('600');
		});

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

	// 景点弹层
	$(".add-spot-popup").hide();

	$(".add-spot").click(function(){
		$(".add-spot-popup").show();
	});

	$(".travel-path").delegate(".popup-close", "click", function(){
		$(".add-spot-popup").hide();
	});

	$(".add-spot").delegate(".popup-add-button", "click", function(){
		var newSpot = $(this).parent().siblings().children('input').val();
		var oldSpot = $(".spot-path").html();
		$(".spot-path").html(oldSpot + "——" + newSpot);
	});

	// 照片图层
	$(".add-pic-popup").hide();

	$(".add-picture").click(function(){
		$(".add-pic-popup").show();
	});

	$(".travel-path").delegate(".pic-popup-close", "click", function(){
		$(".add-pic-popup").hide();
	});

	$(".pic-popup-body").hover(function(){
		$(".upload-pic-icon").addClass("upload-pic-icon-hover");
	}, function(){
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

});
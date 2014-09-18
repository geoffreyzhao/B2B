$(function(){
	var manageBussinessBtn = $(".shipBasicInfo").find(".manageCls");			//管理业务类型按钮
	var manageBussinessDetail = $(".shipBasicInfo").find(".businessSlide");		//管理业务类型内容
	var manageCancel = $(".shipBasicInfo").find(".cancel");						//取消管理业务按钮
	manageBussinessBtn.on("click",function(){
		manageBussinessDetail.slideDown();
	});

	manageCancel.on("click",function(){
		manageBussinessDetail.hide();
	});
});
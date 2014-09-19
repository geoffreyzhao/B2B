$(function(){
	var manageBussinessBtn = $(".shipBasicInfo").find(".manageCls");			//管理业务类型按钮
	var manageBussinessDetail = $(".shipBasicInfo").find(".businessSlide");		//管理业务类型对话框
	var manageCancel = $(".shipBasicInfo").find(".cancel");						//取消管理业务按钮
	var businessContent = $(".shipBasicInfo").find(".businessType");			//管理业务类型内容
	var businessCell = $(".shipBasicInfo").find(".businessName");				//业务类型单元
	var businessCellLast = $(".shipBasicInfo").find(".businessName:last");
	var addBtn = $(".shipBasicInfo").find(".add");
	var cancelBtn = $(".shipBasicInfo").find(".cancelAdd");
	var inputBusinessName = $(".shipBasicInfo .inputBussinessType").find("input");
	var addBusinessTypeBtn = $(".shipBasicInfo").find(".addBusinessTypeBtn");



	var ac_window = new PopWindow('.editBusiness',{
            title:'修改业务名称',
            width:'458',
            height:'216',
            template:'#editBusiness-Template'
        }).init();




	var editCollect = $(".shipBasicInfo .businessName").find(".right");
	var currentEditCell = null;
	editCollect.on("click",function(){
		currentEditCell = this;
		var k_widget = $(".k-widget").find(".button_2_1");
		k_widget.on("click",function(){
			var typeName = $(currentEditCell).prev();
			var currentName = typeName.text();
			var editorContent = $(".k-widget").find(".editorContent");
			if(null != typeName)
				typeName.text(editorContent.val());

			// alert(typeName.text());
			var businessTypeSelOpt = $(".shipBasicInfo").find("#businessTypeSel").children();
			businessTypeSelOpt.each(function(){

			 // 	var addName = editorContent.val();
				 if(currentName == $(this).text())
				 	$(this).text(editorContent.val());
				// 	hasFlag = true;
		});

		});
	});


	// var confirmChangBtn = $("#editBusinessName");
	// console.log(confirmChangBtn.size());
	// confirmChangBtn.on("click",function(){
	// 	// if(null != currentEditCell){
	// 		alert($(currentEditCell).text());
	// 	// }
	// });

	// $("body").on("click","#editBusiness-Template", , function(){
	// 	alert("看到了么");
	// });








	manageBussinessBtn.on("click",function(){
		manageBussinessDetail.slideDown();
	});

	manageCancel.on("click",function(){
		manageBussinessDetail.hide();
	});



	addBtn.on("click",function(){
		var cloneCell = businessCell.eq(0).clone(true);
		var businessTypeSelOpt = $(".shipBasicInfo").find("#businessTypeSel").children();
		var businessType = $(".shipBasicInfo").find("#businessTypeSel");
		var addName = inputBusinessName.val();

		var hasFlag = false;
		
		businessTypeSelOpt.each(function(){
			if(addName == $(this).text())
				hasFlag = true;
		});

		if(false == hasFlag)
		{
			cloneCell.children().first().text(addName);
			businessCellLast.after(cloneCell);


			// var dynamicList = $("#businessTypeSel_listbox");
			// console.log(dynamicList.html());

			// var copy = businessType.eq(0).clone(true);
			// console.log(copy);
			
			 businessType.append("<option value="+addName+">"+addName+"</option>");

			// dynamicList.append("<li tabindex='-1' role='option' unselectable='on' class='k-item'>"+addName+"</li>");
		}
		else{
			hasFlag =false;
		}

	});

	cancelBtn.on("click",function(){
		var inputBussinessType = $(".shipBasicInfo").find(".inputBussinessType");
		inputBussinessType.hide();
	});

	addBusinessTypeBtn.on("click",function(){
		var inputBussinessType = $(".shipBasicInfo").find(".inputBussinessType");
		inputBussinessType.show();
	})


});
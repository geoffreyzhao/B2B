$(function(){
	
	var signBtn = $('#signBtn');
	var singImg1 = $('#signBtn').find('.singImg1');
	var signSave = $('#signSave');
	var saveBtn = $('#signSave').find('.saveBtn');
	// alert($('#signSave').find('button').size());
	singImg1.bind('click',function(){
		signBtn.css('display','none');
		signSave.css('display','inline');
	});

	saveBtn.bind('click',function(){
		signBtn.css('display','inline');
		signSave.css('display','none');
	});


	// var addModelBtn = $('#modelList').find('.addModel');
	// addModelBtn.trigger('click');

	var modelInfo = $('.contentRight').find('span');
	var modelTxtarea = $('.contentCenter').find('textarea');
	modelInfo.bind('click',function(){
		var _modelPoint = this;
		modelTxtarea.val(function(){
		 	return this.value+$(_modelPoint).text();
		 });
	});

	var errorInfo = $('#errorInfo');
	var modelTitle = $('.modelTitlePos2');
		modelTitle.on('blur',function(){
			var titleNum = $(this).val().length;
			if(0 == titleNum)
			{
				errorInfo.show();
				$(this).css('border','1px solid red');
			}
				
		});

		

		// modelTitle.bind('propertychange',function(){
		// 	$(this).css('border','1px solid green');
		// });
	// modelTitle.get(0).attachEvent("onpropertychange",function (){
 //                           $(this).css('border','1px solid green');
 //                     });

});

function setWordNumText() {
	var wordNum = $('.contentCenter').find('textarea').val().length;
    var messageNum = wordNum % 60 == 0 ? wordNum / 60 : parseInt(wordNum / 60) + 1
	$(".wordNum").text(wordNum);
	$(".infoNum").text(messageNum);
}

function getModleTitleFontNum(){

	var modelTitle = $('.modelTitlePos2');
	var errorInfo = $('#errorInfo');
	var modelFontNum = modelTitle.val().length;
	if(modelFontNum > 0)
	{
		errorInfo.hide();
		modelTitle.css('border','1px solid #abadb3');
	}
}

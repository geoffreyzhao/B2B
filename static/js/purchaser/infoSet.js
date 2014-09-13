$(function(){
	
	var signBtn = $('#signBtn');
	var singImg1 = $('#signBtn').find('.singImg1');
	var signSave = $('#signSave');
	var saveBtn = $('#signSave').find('.saveBtn');
	// alert($('#signSave').find('button').size());
	singImg1.bind('click',function(){
		signBtn.css('display','none');
		signSave.css('display','inline');
		$(".setNameTip").hide();
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
		setWordNumText();
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

		modelTitle.on('focus',function(){
			var titleNum = $(this).val().length;
			if(0 == titleNum)
			{
				errorInfo.hide();
				$(this).css('border','1px solid #abadb3');
			}
				
		});

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



function getMsgLength(){
        var modelTitle = $('.messageConTextarea textarea');//焦点得到 textarea取消报错
        var errorInfo = $('.errorsTips');
        var modelFontNum = modelTitle.val().length;
        if(modelFontNum > 0)
        {
            errorInfo.hide();
            modelTitle.css('border','1px solid #abadb3');
        }

        wordNum = $(".messageConTextarea textarea").val().length;
        messageNum = wordNum % 60 == 0 ? wordNum / 60 : parseInt(wordNum / 60) + 1;
        setWordNumText(wordNum,messageNum);

        $(".word-num").text(wordNum);
        $(".message-num").text(messageNum);
};
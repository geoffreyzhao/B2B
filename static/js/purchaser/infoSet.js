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








});





// var $$ = $.noConflict();

// $$(function(){

// 	var slideDownBtn = $$(".hotTagSlideBtn");
// 	var hotTag = $$(".hotTagTable .hotTagTableShow").find("div");
// 	var hotTagAll = $$(".hotTagTable td").find("div");
// 	var tagInput = $$(".tagInput");

// 	var flag = 1;
// 	slideDownBtn.on("click",function(){
// 		if(1 == flag)
// 		{
// 			hotTag.slideDown();
// 			$$(this).removeClass();
// 	 		$$(this).addClass("hotTagSlideUp");
// 	 		flag = 2;
// 		}
// 		else if(2 == flag){
// 			hotTag.slideUp();
// 			$$(this).removeClass();
// 	 		$$(this).addClass("hotTagSlideBtn");
// 	 		flag = 1;
// 		}
// 	});
// });


jQuery(function($){ 
    var slideDownBtn = $(".hotTagSlideBtn");
	var hotTag = $(".hotTagTable .hotTagTableShow").find("div");
	var hotTagAll = $(".hotTagTable td").find("div");
	var tagInput = $(".tagInput");

	var flag = 1;
	slideDownBtn.on("click",function(){
		if(1 == flag)
		{
			hotTag.slideDown();
			$(this).removeClass();
	 		$(this).addClass("hotTagSlideUp");
	 		flag = 2;
		}
		else if(2 == flag){
			hotTag.slideUp();
			$(this).removeClass();
	 		$(this).addClass("hotTagSlideBtn");
	 		flag = 1;
		}
	});


	
	// var $$ = $.noConflict();
	// jQuery.getScript("/static/js/textboxList/mootools-1.2.1-core-yc.js");
	// jQuery.getScript("/static/js/textboxList/GrowingInput.js");
	// jQuery.getScript("/static/js/textboxList/TextboxList.js");
	// jQuery.getScript("/static/js/textboxList/TextboxList.Autocomplete.js");
	// jQuery.getScript("/static/js/textboxList/TextboxList.Autocomplete.Binary.js");
	// jQuery.getScript("/static/js/supplier/textboxList.js");

});


	 

	

		












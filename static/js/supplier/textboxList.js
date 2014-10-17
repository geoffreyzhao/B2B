// $$ = jQuery;

// $$(function(){
	
// 	var t = new TextboxList('form_tags_input', {});
	
// 	var slideDownBtn = $$(".hotTagSlideBtn");
// 	var hotTag = $$(".hotTagTable .hotTagTableShow").find("div");
// 	var hotTagAll = $$(".hotTagTable td").find("div");
// 	var tagInput = $$(".tagInput");

// 	var flag = 1;
	
// 	hotTagAll.on("click", function(){
// 		var tempVal = tagInput.val();
// 		t.add($$(this).text());
// 	});	
// });


jQuery(function($){ 
    var t = new TextboxList('form_tags_input', {});

	var slideDownBtn = $(".hotTagSlideBtn");
	var hotTag = $(".hotTagTable .hotTagTableShow").find("div");
	var hotTagAll = $(".hotTagTable td").find("div");
	var tagInput = $(".tagInput");

	var flag = 1;
	
	hotTagAll.on("click", function(){
		var tempVal = tagInput.val();
		t.add($(this).text());
	});	 
});













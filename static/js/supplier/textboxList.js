$(function(){
	var slideDownBtn = $("#hotTagSlideBtn-arrow").find("i");
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



	var tagsPlugin = $("#form_tags_input").tagsInput({
    					"width":"790px",
    					"height":"26px",
    					"maxChars":"6",
    					});

	// var hotTag = $(".hotTagTable .hotTagTableShow").find("div");
	// var hotTagAll = $(".hotTagTable td").find("div");
	// var tagInput = $(".tagInput");

	var flag = 1;
	
	hotTagAll.on("click", function(){
		var tempVal = tagInput.val();
		tagsPlugin.addTag($(this).text());
	});	 
});




















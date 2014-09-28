$(function(){
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

	hotTagAll.on("click", function(){
		var tempVal = tagInput.val();
		tagInput.val(tempVal+$(this).text()+"; ");
	});
	
});
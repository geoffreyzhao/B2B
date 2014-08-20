$(function() {
	// alert($("#downButton").find(".scanHov").get(0).className);
	var scanBtn = $("#downButton").find(".download");
	var scanHov = $("#downButton").find(".scanHov");

	if(scanBtn)
	{
		scanBtn.on("mouseover",function(){
			if(scanHov)
				scanHov.css({display:"block"});
		});

		scanBtn.on("mouseout",function(){
			if(scanHov)
				scanHov.css({display:"none"});
		});
	}
		
	if(scanHov)
	{
		scanHov.on("mouseover",function(){
			$(this).css({display:"block"});
		});
		scanHov.on("mouseout",function(){
			$(this).css({display:"none"});
		});
	}

	var titleSel = $("#title").find(".titleBlock");
	var logo2 = $("#title").find(".logo2");
	var logo3 = $("#title").find(".logo3");
	var logo4 = $("#title").find(".logo4");

	var logoAll = [];
	logoAll.push(logo2);
	logoAll.push(logo3);
	logoAll.push(logo4);

	// $.each(logoAll,function(){
	// 	$(this).on("click",function(){
	// 		var titleSel = $("#title").find(".titleBlock");
	// 		$.each(titleSel,function(){
	// 			$(this).removeClass("titleBlock");
	// 		});
	// 			$(this).addClass("titleBlock");
	// 	});
	// });
	$(logoAll).each(function(){
		$(this).on("click",function(){
			var titleSel = $("#title").find(".titleBlock");
			$(titleSel).each(function(){
				$(this).removeClass("titleBlock");
			});
				$(this).addClass("titleBlock");
		});
	});
});



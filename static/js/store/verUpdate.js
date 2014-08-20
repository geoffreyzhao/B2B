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

		

		
		
	
});
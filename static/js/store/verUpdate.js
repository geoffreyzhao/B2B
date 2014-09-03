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

	var logoLeftCover = $("#title").find(".logoLeftCover");
	var logoMidCover = $("#title").find(".logoMidCover");
	var logoRigCover = $("#title").find(".logoRigCover");
	var logoCoverAll = [];
	logoCoverAll.push(logoLeftCover);
	logoCoverAll.push(logoMidCover);
	logoCoverAll.push(logoRigCover);

	$(logoCoverAll).each(function(){
		
		$(this).on("click",function(){
			$(logoCoverAll).each(function(){
				$(this).removeClass("logoClickCover");
			});

			if($(this).hasClass("logoLeftCover"))
				$(this).addClass("logoClickCover");
			else if($(this).hasClass("logoMidCover"))
				$(this).addClass("logoClickCover");
			else if($(this).hasClass("logoRigCover"))
				$(this).addClass("logoClickCover");
		});
	});

	$(logoAll).each(function(){
		$(this).on("click",function(){

			$(logoCoverAll).each(function(){
				$(this).removeClass("logoClickCover");
				
			});



			if($(this).hasClass("logo2"))
				logoLeftCover.addClass("logoClickCover");
			else if($(this).hasClass("logo3"))
				logoMidCover.addClass("logoClickCover");
			else if($(this).hasClass("logo4"))
				logoRigCover.addClass("logoClickCover");
		});

	});

	logo2.hover(
		function(){
			logoLeftCover.addClass("logoClickCover2");

		},
		function(){
			logoLeftCover.removeClass("logoClickCover2");
		}
	);

	logo3.hover(
		function(){
			logoMidCover.addClass("logoClickCover2");
		},
		function(){
			logoMidCover.removeClass("logoClickCover2");
		}
	);

	logo4.hover(
		function(){
			logoRigCover.addClass("logoClickCover2");
		},
		function(){
			logoRigCover.removeClass("logoClickCover2");
		}
	);

});



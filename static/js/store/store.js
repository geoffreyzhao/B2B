/** 采购商 公共 js 文件 */
$(function() {
    var $backToTopTxt = "返回顶部", $backToTopEle = $('<a class="backToTop"></a>').appendTo($("body"))
        .text($backToTopTxt).attr("title", $backToTopTxt).click(function() {
            $("html, body").animate({ scrollTop: 0 }, 120);
    }), $backToTopFun = function() {
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > 0)? $backToTopEle.show(): $backToTopEle.hide();    
        //IE6下的定位
        if (!window.XMLHttpRequest) {
            $backToTopEle.css("top", st + winh - 166);    
        }
    };
    $(window).bind("scroll", $backToTopFun);
    $(function() { $backToTopFun(); });
	
    if(typeof($.datepicker) != "undefined"){
        $.datepicker.regional[ "zh-CN" ];

        var dpSetting = {
            css : {"z-index": 20000},
			showDay:true,
			numberOfMonths:[1,2],
			minDate :new Date(),
			firstDay:0,
			showButtonPanel :true
		};

        var dpSettingUlt = {
            css : {"z-index": 20000},
			showDay:true,
			numberOfMonths:[1,2],
			firstDay:0,
			showButtonPanel :true
		};


        var dpEle = $(".datepicker");

        $.each(dpEle,function(){
            var item = $(this);
            if( item.hasClass("dpUlt") ){
                item.datepicker(dpSettingUlt);
            }else{
                item.datepicker(dpSetting);
            }
        });
    }
		
    if(typeof(kendo) != "undefined"){
        kendo.init($("body"));
    }
});


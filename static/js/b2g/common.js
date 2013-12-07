$(function() {
    /*
    var offset = $(".main-body").eq(0).offset();
    var w = $(".main-body").eq(0).width();
    */

    var $backToTopTxt = "返回顶部", $backToTopEle = $('<a class="backToTop"></a>').appendTo($("body"))
    .text($backToTopTxt).attr("title", $backToTopTxt).click(function() {
            $("html, body").animate({ scrollTop: 0 }, 120);
    }), $backToTopFun = function() {
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > 0)? $backToTopEle.show(): $backToTopEle.hide();    
        //IE6下的定位
        if (!window.XMLHttpRequest) {
            $backToTopEle.css("top", st + winh - 166);
//            $advice.css("top", st + winh - 166);
        }
    };//$advice=$('<a class="advice"></a>').appendTo($("body"));
    
    $(window).bind("scroll", $backToTopFun);
    /*
    $(window).bind("resize", function(){
        var offset = $(".main-body").eq(0).offset();
        var w = $(".main-body").eq(0).width();
        $backToTopEle.css({left:offset.left + w + 20});
        $advice.css({left:offset.left + w + 20});
    });
    */
    $(function() { $backToTopFun(); });
	
    if(typeof($.datepicker) != "undefined"){
        $.datepicker.regional[ "zh-CN" ];

        var dpSetting = {
            css : {"z-index": 20000},
			showDay:true,
			numberOfMonths:[1,2],
			minDate :new Date(),
			firstDay:0,
			showButtonPanel :true,
            monthNames:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
		};

        var dpSettingUlt = {
            css : {"z-index": 20000},
			showDay:true,
			numberOfMonths:[1,2],
			firstDay:0,
			showButtonPanel :true
		};

        var dpSettingShort = {
            css : {"z-index": 20000},
			numberOfMonths:[1,2],
			firstDay:0,
			showButtonPanel :true
		};


        var dpEle = $(".datepicker");

        $.each(dpEle,function(){
            var item = $(this);
            if( item.hasClass("dpUlt") ){
                item.datepicker(dpSettingUlt);
            }else if(item.hasClass("dpShort")){
                item.datepicker(dpSettingShort);
            }else{
                item.datepicker(dpSetting);
            }
        });
    }
		
    if(typeof(kendo) != "undefined"){
        kendo.init($("body"));
    }


    $("body").delegate(".toggle_trigger","click",function(){
        var that = $(this);
        var o = $.parseJSON($(this).attr("toggle"));
        var t = $(this);

        if(o.filer){
            t = $(o.filter,$(this));
        }

        $(o.target).slideToggle("normal");

        /* 折叠 toggle_trigger */
        if(o.toggleSelfClass){
            if(typeof(o.toggleSelfClass) == "string"){
                that.toggleClass(o.toggleSelfClass);
            }else{
                if(that.hasClass(o.toggleSelfClass[0])){
                    that.removeClass(o.toggleSelfClass[0]).addClass(o.toggleSelfClass[1]);
                }else{
                    that.removeClass(o.toggleSelfClass[1]).addClass(o.toggleSelfClass[0]);
                }
            }
        }

        /* 折叠触发者 */
        if(o.toggleClass){
            if(typeof(o.toggleClass) == "string"){
                t.toggleClass(o.toggleClass);
            }else{
                if(t.hasClass(o.toggleClass[0])){
                    t.removeClass(o.toggleClass[0]).addClass(o.toggleClass[1]);
                }else{
                    t.removeClass(o.toggleClass[1]).addClass(o.toggleClass[0]);
                }
            }
        }

        /* 切换触发者文本 */
        if(o.toggleText){
            if(t.html() == o.toggleText[0]){
                t.html(o.toggleText[1]);
            }else{
                t.html(o.toggleText[0]);
            }
        }
    });
	
});


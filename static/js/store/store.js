/** 采购商 公共 js 文件 */
$(function() {

    domain_check = {
        product_store:'store.tdxinfo.com',
        product_static:'sc1.tdxinfo.com',
        dev_static:'static.travelzensh.com',
        dev_store:'f.op.com:8280'
    };
    domain_check.isProduct = (function(){ return !!~location.hostname.indexOf("tdxinfo.com"); }());
    domain_check.isDev = (function(){ return !!~location.hostname.indexOf("op.com"); }());

    /*
    var offset = $(".main-body").eq(0).offset();
    var w = $(".main-body").eq(0).width();
    */

    var $backToTopTxt = "返回顶部", $backToTopEle = $('<a class="backToTop"></a>').appendTo($(".main-body"))
    .text($backToTopTxt).attr("title", $backToTopTxt).click(function() {
            $("html, body").animate({ scrollTop: 0 }, 120);
    }), $backToTopFun = function() {
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > 800)? $backToTopEle.show(): $backToTopEle.hide();
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
            onSelect:function(){
                $(this).trigger("change");
            }
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
        
        var dpSettingDistributor={
            css : {"z-index": 20000},
            numberOfMonths:[1,2],
            firstDay:0,
            showButtonPanel :true,
            showOtherMonths:true,
            selectOtherMonths:true
        }
        
        var dpSettingSingle={
            css : {"z-index": 20000},
            firstDay:0,
            showButtonPanel :true,
            showOtherMonths:true,
            selectOtherMonths:true
        }


        var dpEle = $(".datepicker");

        $.each(dpEle,function(){
            var item = $(this);
            if( item.hasClass("dpUlt") ){
                item.datepicker(dpSettingUlt);
            }else if(item.hasClass("dpShort")){
                item.datepicker(dpSettingShort);
            }else if(item.hasClass("dpSettingDistributor")){
                item.datepicker(dpSettingDistributor);
            }else if(item.hasClass("dpSettingSingle")){
                item.datepicker(dpSettingSingle);
            }else{
                item.datepicker(dpSetting);
            }
        });
    }

    if(typeof(kendo) != "undefined"){
        kendo.init($("body"));
    }

    $("body").delegate(".toggle_trigger","click",function(){
        var that = $(this),
            t = that,
            textFilter = t,
            temp,
            i,j,
            noslide,
            tags = ['th','tr','td','table','tbody','thead','tfooter'];

        if(that.attr("data-toggle")){
            o = $.parseJSON(that.attr("data-toggle"));
        }else{
            o = $.parseJSON(that.attr("toggle"));
        }

        if(o.filer){
            t = $(o.filter,that);
        }

        if(o.textFilter) {
            textFilter = $(o.textFilter,that);
        }

        temp = $(o.target).get(0);
        noslide = false;

        for(i = 0, j = tags.length; i < j; i++){
            if(temp && (temp.tagName.toLowerCase() == tags[i])){
                noslide = true;
                break;
            }
        }

        if(noslide){
            if(o.wrapper){
                $(o.target,that.closest(o.wrapper)).toggle();
            }else{
                $(o.target).toggle();
            }

        }else{
            if(o.wrapper){
                $(o.target,that.closest(o.wrapper)).slideToggle("normal");
            }else{
                $(o.target).slideToggle("normal");
            }
        }

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
            if(textFilter.html() == o.toggleText[0]){
                textFilter.html(o.toggleText[1]);
            }else{
                textFilter.html(o.toggleText[0]);
            }
        }
    });


	$(".upProcess i").each(function(index){
		var cur = $(this);
		var x = 0,y = 0;
		if(cur.hasClass("hightlight")){
			x = 16;
		}else if(cur.hasClass("unable")){
			x = 32;
		}

		y = (parseInt(cur.html()) - 1) * 16;

		cur.css({"background-position":" -" + x + "px -" + y + "px"});
	});


    $('body').on('change','.placeholdersjs',function(){
        var that = $(this);
        var ptext = that.data('placeholderValue');
        var val = that.val();

        if( val=='' || val == ptext){
            that.css('color','#aaa');
        }else{
            that.css('color','#666');
        }
    });
    

    // 增加发布会页面入口
    var conf_enter_url = (function(){
        var prefix = "/static";
        if (domain_check.isProduct){
            prefix = '//'+ domain_check.product_static;
        }
        if (domain_check.isDev){
            prefix = '//'+ domain_check.dev_static;
        }
        return prefix+"/special/source/conference.html";
    })();
    //var conf_enter = $('.main-header').append('<a href="'+conf_enter_url+'" class="conf_enter_wrapper"><i></i><s></s></a>');

    // Gif动画logo执行3分钟后，切换为静态logo，5分钟后再次切换回动画，依此循环
    // 获取图片所在根目录
    var dirArr = $("#headLogo").attr("src").split('/');
    var parentDir = dirArr.slice(0, dirArr.length - 1).join('/');

    // 切换效果 start
    function switchLogo() {

        $("#headLogo").attr("src", parentDir + "/newLogo.png");
        $("#headLogo").addClass("headStaticLogo");

        setTimeout(function() {
            $("#headLogo").attr("src", parentDir + "/logoGif.gif");
            $("#headLogo").removeClass("headStaticLogo");
        }, 1000*5*60);
    }

    setTimeout(function(){
        switchLogo();
        setInterval(switchLogo, 1000*8*60);
    }, 1000*3*60);

    // 切换效果 end

});


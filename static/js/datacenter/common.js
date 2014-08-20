var g = {};
$(function() {

    if (typeof($.datepicker) != "undefined") {
        $.datepicker.regional["zh-CN"];

        var dpSetting = {
            css: {
                "z-index": 20000
            },
            showTomorrow: true,
            numberOfMonths: [1, 2],
            minDate: new Date(),
            firstDay: 0,
            showButtonPanel: true,
            monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        };

        var dpSettingUlt = {
            css: {
                "z-index": 20000
            },
            showTomorrow: true,
            numberOfMonths: [1, 2],
            firstDay: 0,
            showButtonPanel: true
        };

        var dpSettingShort = {
            css: {
                "z-index": 20000
            },
            showTomorrow: true,
            numberOfMonths: [1, 2],
            firstDay: 0,
            showButtonPanel: true
        };


        g.dpSetting = dpSetting;
        g.dpSettingUlt = dpSettingUlt;
        g.dpSettingShort = dpSettingShort;


        var dpEle = $(".datepicker");

        $.each(dpEle, function() {
            var item = $(this);

            if (item.hasClass("dpUlt")) {
                item.datepicker(dpSettingUlt);
            } else if (item.hasClass("dpShort")) {
                item.datepicker(dpSettingShort);
            } else {
                item.datepicker(dpSetting);
            }
        });
    }

    if (typeof(kendo) != "undefined") {
        kendo.init($("body"));
    }

    $('.classify li').bind("click.switch", function() {
        $(this).closest("ul").find("li").removeClass("currentModel");
        $(this).addClass("currentModel");
    });

    // 为左侧菜单栏添加点击事件  实现slideToggle效果
    /*$(".secondLevel").hide();*/

    $(".firstLevel em").click(function() {
        $(this).closest("li").find("ul").slideToggle();
        /*$(this).parent().siblings('.firstLevel').closest("li").find("ul").slideUp();*/

        var $siblingFirstLevel = $(this).parent().siblings('.firstLevel').children('em').children('span');
        $siblingFirstLevel.removeClass('menuExpand');
        $siblingFirstLevel.removeClass('menuExpandHover');
        $siblingFirstLevel.addClass('menuFold');

        if ($(this).children('span').hasClass('menuFold')) {
            $(this).children('span').removeClass('menuFold');
            $(this).children('span').removeClass('menuFoldHover');
            $(this).children('span').addClass('menuExpand');
        } else {
            $(this).children('span').removeClass('menuExpand');
            $(this).children('span').removeClass('menuExpandHover');
            $(this).children('span').addClass('menuFold');
        }
    });

    // 为一级菜单添加hover事件  改变图标
    $(".firstLevel em").hover(function() {
        var $menuTreeIcon = $(this).children('span');
        if ($menuTreeIcon.hasClass('menuExpand')) { // 当前状态为：展开
            $menuTreeIcon.addClass('menuExpandHover');
        } else { // 当前状态为：折叠
            $menuTreeIcon.addClass('menuFoldHover');
        }
    }, function() {
        $menuTreeIcon = $(this).children('span');
        if ($menuTreeIcon.hasClass('menuExpand')) {
            $menuTreeIcon.removeClass('menuExpandHover');
        } else {
            $menuTreeIcon.removeClass('menuFoldHover');
        }
    });

    // 二级菜单点击事件
    $(".secondLevel li").bind("click", function() {
        $(".secondLevel li").removeClass("currentStatus");
        $(this).addClass("currentStatus");
    });

});
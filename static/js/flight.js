$(function(){
    kendo.init($('body'));
    $('.actions').fixedBar();
    var lensf = function (){
        $.each($('.instr'),function(){
            var that = $(this);
            if(that.find('.highlight-fl').size()>0){
                var ele = that.find('.highlight');
                var len = ele.size();
                var wid = ele.width()*len + 15;
                that.find('.line').prepend('<div style="background-color:#FF6608;height:2px;width:'+wid+'px" />')
            }
        });
    }
    lensf();
});

function PopWindow(trigger, customSettings){
    var kendoWinDefaults = {
        visible:false,
        animation:false,
        width:570,
        modal:true
    }
    this.kendoWinSettings = kendoWinDefaults; 
    this.triggerText = trigger;
    this.trigger = $(trigger);
    this.customSettings = customSettings; 
    this.win = null;
}

PopWindow.prototype = {
    init:function(){
        var isCreated = false;
        if(this.trigger.attr('role') === 'window_trigger'){
            isCreated = true;
        }
        
        if(!isCreated){
            this.createWin();
            this.bindClick();
            return this.win;
        }

    }, 
    createWin:function(){
        var windowEle = $('<div class="popup-window">');
        windowEle.appendTo($('body'));

        var customSettings = this.customSettings || eval('('+this.trigger.data('options')+')');
        var opts,data_template;

        data_template = this.trigger.data('template');

        opts = $.extend( this.kendoWinSettings, customSettings);

        if ( customSettings || data_template ){
            if( typeof opts.content === 'undefined'){
                if( data_template ){
                    opts.template = data_template;  
                }
                if( opts.template ){
                    opts.content = {
                        template : kendo.template($(opts.template).html()) 
                    }
                }
            }
        }

        if( typeof opts.content === 'undefined' ){
            throw new Error(this.triggerText + '缺少content(弹窗内容)属性');
        }else{
            this.win = windowEle.kendoWindow( opts ).data('kendoWindow'); 
        }
    },
    bindClick:function(){
        var win = this.win;
        this.trigger.attr('role','window_trigger');
        $('body').delegate(this.triggerText,'click',function(){
            win.center();
            win.open();
            kendo.init($('.popup-window'));
        });
    }
}


function GridTable(trigger, customSettings){
    var kendoWinDefaults = {
        scrollable:false,
        pageable:{
            pageSize: 10,
			messages: {
				display: " 共 {2} 个订单，{0} - {1} 条",
				empty: "找个0个记录",
				page: "页",
				of: "共 {0}",
				itemsPerPage: "每页",
				first: "第一页",
				previous: "前一页",
				next: "后一页",
				last: "最后页",
				refresh: "刷新"
			}
		}
    }
    this.kendoWinSettings = kendoWinDefaults; 
    this.triggerText = trigger;
    this.trigger = $(trigger);
    this.customSettings = customSettings; 
    this.grid = null;
}

GridTable.prototype = {
    init:function(){
        var isCreated = false;
        if(this.trigger.attr('role') === 'grid'){
            isCreated = true;
        }
        
        if(!isCreated){
            this.createGrid();
            return this.grid;
        }
    }, 
    createGrid:function(){
        var customSettings = this.customSettings || eval('('+this.trigger.data('options')+')');
        var opts;
        opts = $.extend( this.kendoWinSettings, customSettings);

        if( typeof opts.dataSource === 'undefined' ){
            throw new Error(this.triggerText + '缺少dataSource属性');
        }else{
            this.grid = this.trigger.kendoGrid( opts ).data('kendoGrid'); 
        }
    }
}


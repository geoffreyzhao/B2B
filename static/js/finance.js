$(function(){
    $('.actions').fixedBar();
    kendo.init($('.block1'));
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
        $('body').delegate(this.triggerText,'click',function(e){
            e.preventDefault();
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
                display: " 共 {2} 条记录，{0} - {1} 条",
                empty: "共 0 条记录",
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

var Collpase = function(opts){
    /*
    * container: Element
    * limitHeight : NUM
    * trigger : Element
    * triggerexp : the className while it is expanded
    * */
    this.limitHeight = 100;
    this.triggerexp = 'col-expp';
    this.trigger = '.content-collapse';
    $.extend(this,opts);
    this.container = $(this.container);
}
Collpase.prototype = {
    init:function(){
        if(this.getContainerHeight()<this.limitHeight) return this;
        this.render(); 
        this.bindClick();
        return this;
    },
    render:function(){
        var container = this.container; 
        this.originHeight = container[0].style.height;
        var trigger= this.triggerEle = $('<div class="'+(this.trigger+'_').slice(1,-1)+'"><div /></div>');
        trigger.appendTo(container).show();
        container.css({
            position:'relative',
            height:this.limitHeight + 'px',
            overflow:'hidden'
        });  
    },
    getContainerHeight:function(){
        return this.container.height();
    },
    setHeight:function(){
        if (this.triggerEle.hasClass(this.triggerexp)){
            this.triggerEle.removeClass(this.triggerexp);
            this.container.height(this.limitHeight);
        }
    },
    resetHeight:function(){
        if (!this.triggerEle.hasClass(this.triggerexp)){
            this.triggerEle.addClass(this.triggerexp);
            this.container.height(this.originHeight == ''?'':'100');
        }
    },
    bindClick:function(){
        var that = this;
        // collopse;
        $('body').delegate(that.trigger, 'click',function(){
            if ($(this).hasClass(that.triggerexp)){
                that.setHeight();
            }else{
                that.resetHeight();
            }
        });

    }
}

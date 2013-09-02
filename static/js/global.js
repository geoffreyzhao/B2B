/*
* Author: shaotian.hu
* Email:  shaotian.hu@travelzen.com
*/

$.extend($,{
    _type:function(x){
        return Object.prototype.toString.call(x).slice(8,-1).toLowerCase();
    }
});

//弹窗封装
function PopWindow(trigger, customSettings){
    var kendoWinDefaults = {
        visible:false,
        animation:false,
        width:570,
        modal:true
    }
    this.cache = true;
    this.kendoWinSettings = kendoWinDefaults; 
    this.triggerText = trigger;
    this.trigger = $(trigger);
    this.customSettings = customSettings; 
    this.win = null;
};
PopWindow.prototype = {
    init:function(){
        var isCreated = false;
        if(this.trigger.attr('role') === 'window_trigger'){
            isCreated = true;
        }

        if(!isCreated){
            this.render();
            this.bindClick();
            return this.win;
        }

    }, 
    render:function(){
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
                        template : kendo.template($(opts.template).html())(opts.data||{}) 
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
        var that = this;
        that.trigger.attr('role','window_trigger');
        $('body').delegate(that.triggerText,'click',function(e){
            e.preventDefault();
            if(!that.cache){
                that.win.refresh(); 
            }
            that.win.center();
            that.win.open();

            kendo.init($('.popup-window'));
        });
    }
};

// 表格封装
function GridTable(trigger, customSettings){
    var kendoWinDefaults = {
        scrollable:false,
        pageable:{
            pageSize: 10,
            messages: {
                display: " 共 <b>{2}</b> 条记录，<b>{0}</b> - <b>{1}</b> 条",
                empty: "共 <b>0</b> 条记录",
                page: "页",
                of: "共 <b>{0}</b>",
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
};
GridTable.prototype = {
    init:function(){
        var isCreated = false;
        if(this.trigger.attr('role') === 'grid'){
            isCreated = true;
        }

        if(!isCreated){
            this.render();
            return this.grid;
        }
    }, 
    render:function(){
        var customSettings = this.customSettings || eval('('+this.trigger.data('options')+')');
        var opts;
        opts = $.extend( this.kendoWinSettings, customSettings);
        if( typeof opts.dataSource === 'undefined' ){
            throw new Error(this.triggerText + '缺少dataSource属性');
        }else{
            this.grid = this.trigger.kendoGrid( opts ).data('kendoGrid'); 
        }
    }
};

// 定高函数：超过3行时隐藏
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
};
Collpase.prototype = {
    init:function(){
        //this.container.attr("originHeight",this.container.height());
        this.container.attr("originPosition",this.container.css("position"));

        if(this.getContainerHeight()<this.limitHeight) return this;
        this.render(); 
        this.bindClick();
        return this;
    },
    render:function(){
        var container = this.container; 

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
            this.container.css({
                position: 'relative',
                height: this.limitHeight + 'px',
                overflow:'hidden'
            });
        }
    },
    resetHeight:function(){
        if (!this.triggerEle.hasClass(this.triggerexp)){
            this.triggerEle.addClass(this.triggerexp);
            this.container.css({
                //height: this.container.attr("originHeight") + 'px',
                height: "auto",
                overflow:''
            });
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
};

// 浮层模块
var FloatLayer = function(opts){
    var opts = $.extend({
        trigger:"",
        data:{},
        template:"",
        async:false,
        type:'click',
        offsetX:0,
        offsetY:20,
        toggle:true,
        open:$.noop,
        close:$.noop
    },opts);

    var tpl;

    opts.trigger = opts.trigger.jquery ? opts.trigger : $(opts.trigger);

    var layer = $('<div class="ac-floatlayer" style="display:none;position:absolute;"/>');

    if(opts.css) {
        layer.css(opts.css);
    }

    if(!opts.async){
        tpl = kendo.template( $(opts.template).html() );
        layer.html(tpl(opts.data));
    }

    $('body').append(layer);
    kendo.init(layer);

    $(document).on('click',function(e){
        // $('.FLAYA').removeClass('FLAYA');
        var t = $(e.target);
        if ( !t.is(opts.trigger) ){
            if ( t.closest('.ac-floatlayer').length !==1 ){
                layer.close();
            }
        }
    });

    function set_pos(ele){
        var pos = ele.offset();
        layer.css({
            left:pos.left + opts.offsetX,
            top:pos.top + opts.offsetY
        });
    }

    if(opts.trigger.length>0){
        opts.toggle=false; 
    };

    // todo: support more type;
    $('body').delegate(opts.trigger,opts.type,function(e){
        var that = e.data;
        set_pos(that);
        layer.input = that;
        if(opts.toggle){
            layer.toggle();
        }else{
            layer.open();
        }
    });

    layer.open = function(){
        layer.show();
    };

    layer.data = function(d){
        tpl = kendo.template( $(opts.template).html() );
        layer.html(tpl(d)); 
        kendo.init(layer);
    };

    layer.content = function(d){
        layer.html(d);
        kendo.init(layer);
    };

    layer.close = function(){
        layer.hide();
    };
    return layer;
};

//常旅客模块
var frequentFlyer=function(opts){
    var opts=$.extend({trigger:"zAutocomplete",offsetX:-1,offsetY:19},opts);
    var layer=new FloatLayer(opts);
    kendo.init(layer);

    $("#ffc_input").focusin(function(){
        $(this).trigger("zAutocomplete");
    })

    return layer;
}

/* 城市补全js 模板
<script type="text/x-kendo-template" id="city_popup">
<div id="tabstrip" class="tcy_tabstrip" style="display:none;">
<span class="tcy_title">
热门城市/国家（支持中文名/拼音/英文名/三字码）
</span>
<ul>
<li id="hot_city" class="k-state-active">热门</li>
# for (var i=0; i<data.group.length; i++ ) { #
<li>#= data.group[i] #</li>
# } #
</ul>
<div id="hot_city_tab">
<ul class="tcy_list clearfix">

# for(var j=0;j<hotcitylist.length;j++){ #
# var citylist_item = hotcitylist[j] #
<li class="item" title="#= citylist_item.code #" data-code="#= citylist_item.code #">#= citylist_item.name #</li>
# } #
</ul>
</div>

# for(var i=0;i<data.citylist.length;i++){ #
# var citylist_item = data.citylist[i] #
<div class="city_tab">
<ul class="tcy_list clearfix">
# for(var k=0;k<data.group[i].length;k++){ #
<li class="tcy_list_sep">#= data.group[i].split('')[k] #</li>
# for(var j=0;j<citylist_item.value.length;j++){ #
# var citylist_value_item = citylist_item.value[j]; #
# if(citylist_value_item.py.slice(0,1) == data.group[i].split('')[k]) {#
<li class="item" title="#= citylist_value_item.code #" data-code="#= citylist_value_item.code #">#= citylist_value_item.name #</li>
# } #
# } #
# } #
</ul>
</div>

# } #
</div>
</script>

模板结束 */

var CityAutocomplete = function(settings){
    var that = {};
    var inputs,opts,hot_tabs;

    var defaults = {
        input : ".suggest-city",
        url: './searchflight_files/data.txt',
        group: ["ABCD","EFGHJ", "KLMN", "PQRSTW", "XYZ"]
    };

    that.options = $.extend(defaults,settings);


    /* /FlightReserve/DataAssistant/GetCitys.aspx */

    function process_citydata(d){
        return jQuery.map(d.split(';'),function(n){
            if(n.indexOf('|')==-1) return;
            var item = n.split('|');
            return {'code':item[0],'search':item[0]+'|'+item[2]+'|'+item[1],'py':item[1],'name':item[2]};
        });
    }

    function process_pinyin(arr, group, col){
        var result = [],
        len = group.length,
        r = 0,
        item;

        for(; r<len; r++){
            item = group[r];
            result[r] = {
                name:"",
                value:[]
            };
            result[r]['name'] = group[r];
            jQuery.each(arr, function(index,i) {
                var str = i[col];
                var first_letter = str.toUpperCase().charCodeAt(0);
                var rangeStart = item.charCodeAt(0);
                var rangeEnd = item.charCodeAt(group[r].length-1);

                if (first_letter >= rangeStart && first_letter <= rangeEnd) {
                    result[r]['value'].push(i);
                }
            });
        }

        return result;
    }

    function render_hotcity_tabs(data,input){
        var templateID = opts.template || "#city_popup_tpl"; 

        hot_tabs = FloatLayer({
            toggle:false,
            trigger:input,
            type:'focus',
            offsetY:25,
            data:data,
            template:templateID,
            css : that.options.css ? that.options.css : {}
        });


        hot_tabs.delegate('.tcy_list li[data-code]','click',function(){
            var $t = $(this);
            var text = $t.text();

            hot_tabs.input.val(text);
            if (opts.codeEle){
                $(opts.codeEle).val($t.data('code'));
            }else{
                hot_tabs.input.data('code').val($t.data('code'));
            }
            hot_tabs.close();
        });

        hot_tabs.find('.tcy_tabstrip').kendoTabStrip({
            animation:false
        });
    }

    function render_suggest_city(data,input){
        var autocomplate_defaults = {
            dataTextField:'search',
            animation:false,
            filter:function(d,f){
                return {
                    filters:[{
                        ignoreCase: true,
                        value:  d,
                        operator: 'startswith',
                        field: 'code'
                    },{
                        ignoreCase: true,
                        value:  d,
                        operator: 'startswith',
                        field: 'py'
                    },{
                        ignoreCase: true,
                        value:  d,
                        operator: 'startswith',
                        field: 'name'
                    }],
                    logic:'or'
                }
            },
            template: '<span class="sg_py">${data.py}</span><span class="sg_name">${data.name}</span><span class="sg_code">（${data.code}）</span>',
            dataSource: data,
            highlightFirst: true,
            placeholder:"拼音/城市码/中文",
            select:opts.select || function(t){
                var dataItem = this.dataItem(t.item.index());
                t.preventDefault();
                t.sender.value(dataItem.name);
                if (opts.codeEle){
                    $(opts.codeEle).val(dataItem.code);
                }else{
                    $(t.sender.element).data('code').val(dataItem.code);
                }
            }
        };

        input.kendoAutoComplete($.extend(autocomplate_defaults,opts.autocomplete));

        if (opts.width){
            input.each(function(){
                var t = $(this); 
                t.data('kendoAutoComplete').list.width(opts.width||200);
            });
        }
        
        input.on('keyup',function(){
            var $t = $(this);
            if( $t.val() === '' ){
                hot_tabs.open();
            }else{
                hot_tabs.close();
            }
        });

        input.on('focus',function(){
            hot_tabs.find('.tcy_tabstrip').data('kendoTabStrip').activateTab("#hot_city"); 
        });

    };


    opts = that.options;
    inputs = opts.input.jquery ? opts.input : $(opts.input);

    function main(d){
        that.init = function(inputEle){
            if(typeof opts.codeEle == 'undefined'){
                inputEle.each(function(){
                    var t = $(this);
                    var ele = $('<input type="hidden" name="'+(t.name||'')+'_code">');
                    t.data('code',ele);
                    t.after(ele);
                });
            }
            var citydata = d.split('@');
            var pcitydata = process_citydata(citydata[1]);
            var citygroup = opts.group;

            // 去掉热门
            citygroup.shift();

            render_hotcity_tabs({
                "group": citygroup,
                "citylist": process_pinyin(pcitydata, citygroup, "py"),
                "hotcitylist": process_citydata(citydata[0])
            },inputEle);

            render_suggest_city(pcitydata,inputEle);
            return that;
        };


        that.init(inputs);
    }

    if(!CityAutocomplete.data){
        $.get(opts.url,function(d){
            CityAutocomplete.data = d;
            main(d);
        });
    }else{
        main(CityAutocomplete.data);
    }


};



// 一些jquery插件
$.loadingbar = function(settings) {
    var defaults = {
        container: 'body',
        showClose: true,
        loadingText: '数据加载中，请稍候…'
    };
    var xhr;
    var cfg = $.extend(defaults,settings);
    var postext;


    if(cfg.container==='body'){
        postext = 'fixed';
    }else{
        postext = 'absolute';
        $(cfg.container).css({position:'relative'});
    }


    /* 统一ajax遮罩*/
    var loading_tpl = '<div class="lightbox loading" style="display:none;position:'+postext+' "><table cellspacing="0">\
    <tbody><tr><td>\
        <div class="lightbox-content">\
        '+"<span class=loading_close>×</span>"+'\
        <i class=loading_icon>&nbsp;</i><span class=loading_text>'+ cfg.loadingText+ '</span>\
        </div>\
        </td></tr>\
        </tbody></table></div>';

    var spin_wrap = $(loading_tpl);

    $(cfg.container).append(spin_wrap);

    $(document).ajaxSend(function(event, jqxhr, settings) {
        var state = false;
        var surl = settings.url;
        $.each(cfg.urls,function(i,item){
            if($._type(item) === 'regexp'){
                if(item.exec(surl)) {
                    state = true;
                    return false;
                } 
            }else if($._type(item) === 'string'){
                if(item === surl) {
                    state = true;
                    return false;
                } 
            }else{
                throw new Error('[urls] type error,string or regexp required');
            }
        });

        if(state){
            spin_wrap.show();
        }

        if(typeof cfg.urls === 'undefined'){
            spin_wrap.show();
        }

        if(cfg.showClose){
            $('.loading_close').on('click',function(){
                jqxhr.abort();
                spin_wrap.hide();
            });
        }
    });

    $(document).ajaxSuccess(function() {
        spin_wrap.hide();
    });

};

//plugin serialize_form
$.fn.serialize_form = function(){
    var result = [];
    var that = $(this);
    that.find('input,textarea,select').each(function(index) {
        var i = $(this);
        var name = i.attr('name');
        var eleType = i.attr('type');
        var isDisabled = i.attr('disabled');
        var value = i.attr('value');

        var isChecked = i.attr('checked');

        if (isDisabled || name == '' || typeof name == 'undefined' || name == '__MYVIEWSTATE') {
            return;
        }

        if ((eleType == 'checkbox' || eleType == 'radio') &&  isChecked != 'checked') {
            return;
        }

        // result[name]=value;
        result.push(name + '=' + value);

    });

    return result.join('&');
};

$.plainObjectSize = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


$.fieldsetFormat = function(type,settings){
    // 纯对象数据长度
    // example : plainObjectSize({a:1,b:2}) == 2;
    var plainObjectSize = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    var output = {};
    var type = type || 'get';
    var params={
        selector:'fieldset',
        item:'.group-item',
        items:'.group-items',
        data:''
    };

    params = $.extend(params,arguments[1]);

    var data = params.data;
    var selector = (typeof params.selector=='string')?$(params.selector):params.selector;
    var item = params.item;
    var items = params.items;
    var loop = function(nodeList,parent,pindex){
        var gobj = {};
        nodeList.each(function() {
            var that = $(this);
            var name = that.prop('name');
            var eleType = that.prop('type');
            var isDisabled= that.prop('disabled');

            if (name == '' ||  name=='__MYVIEWSTATE' || isDisabled){
                return false;
            }

            var value = that.prop('value');

            if (isDisabled || name == '' ||  name=='__MYVIEWSTATE'){
                return false;
            }

            if ( (eleType == 'checkbox' || eleType == 'radio') && that.prop('checked')==false ){
                return false;
            }

            if(type=="get"){
                gobj[name] = value;
            }

            if(type=="set"){
                if(pindex!=undefined){
                    that.prop('value',data[parent][pindex][name]);
                }else{
                    that.prop('value',data[parent][name]);
                }
            }
        });

        return gobj;
    };

    $.each(selector,function(index) {
        var i = $(this);
        if(index==0 &&i.prop('tagName')!='FIELDSET'){
            return false;
        }
        if (i.prop('name') == '') {
            return false;
        }
        if (i.find(item).size()>0) {
            if(i.find(items).size()>0){
                var obj = loop(i.find('input,select,textarea').filter(':not('+items+' input)').filter(':not('+items+' select)').filter(':not('+items+' textarea)'));

                i.find(items).each(function(vp){
                    var vp = $(this);
                    var arr = [];
                    vp.find(item).each(function(pindex) {
                        var v = $(this);
                        if(v.hasClass('disabled')||v.prop('disabled')) return false;
                        var vpobj = loop(v.find('input,select,textarea'),vp.prop('rel'),pindex);
                        if(plainObjectSize(vpobj)){
                            arr.push(vpobj);
                        }

                    });

                    obj[vp.prop('rel')] = arr;

                });

                output[i.prop('name')] = obj;
            }else{
                var arr = [];
                i.find(item).each(function(pindex) {
                    var v = $(this);
                    var obj = loop(v.find('input,select,textarea'),i.prop('name'),pindex);
                    arr.push(obj);
                });

                output[i.attr('name')] = arr;
            }

        } else {
            var obj = loop(i.find('input,select,textarea'),i.prop('name'));
            output[i.attr('name')] = obj;
        }

    });
    return output;
};


var lensf = function (settings){
    var defaults = {
        container:'.instr',
        highlight:'.highlight-fl'
    };
    var opts = $.extend(defaults,settings);

    $.each($(opts.container),function(){
        var that = $(this);
        var current = that.find('[class]').eq(-1);
        var ele = that.find('span');
        ele.eq(0).addClass('first');
        ele.eq(-1).addClass('last');
        if(current.length>0){
            var hi = current.prevAll().addClass('highlight');
            var wid = ele.eq(0).outerWidth(true)*(hi.length);
            that.append('<em class="line"><div style="width:'+wid+'px" /></em>')
        }else{
            that.append('<em class="line"></em>')
        }
    });
};

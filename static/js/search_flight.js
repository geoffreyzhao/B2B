/*  模板
<script type="text/x-kendo-template" id="city_popup_tpl">
<div id="tabstrip" class="tabstrip" style="width:370px">
<ul>
<li id="hot_city" class="k-state-active">热门</li>
# for (var i=0; i<data.group.length; i++ ) {#
<li>#= data.group[i] #</li>
# } #
</ul>

<div title="热门" id="hot_city_tab">
<ul class="tcy_list">
<li data-code="PEK">北京</li>
<li data-code="SHA">上海虹桥</li>
<li data-code="PVG">上海浦东</li>
<li data-code="CAN">广州</li>
<li data-code="SZX">深圳</li>
<li data-code="CTU">成都</li>
<li data-code="HGH">杭州</li>
<li data-code="WUH">武汉</li>
<li data-code="XIY">西安</li> 
<li data-code="CKG">重庆</li>
<li data-code="TAO">青岛</li>
<li data-code="CSX">长沙</li>
<li data-code="NKG">南京</li>
<li data-code="XMN">厦门</li>
<li data-code="KMG">昆明</li>
<li data-code="DLC">大连</li>
<li data-code="TSN">天津</li> 
<li data-code="CGO">郑州</li>
<li data-code="SYX">三亚</li>
<li data-code="TNA">济南</li>
<li data-code="FOC">福州</li>
</ul>
</div>

# for(var i=0;i<data.citylist.length;i++){ #
#  var citylist_item = data.citylist[i] #
<div title="#= citylist_item.name #" class="city_tab">
<ul class="tcy_list">
# for(var j=0;j<citylist_item.value.length;j++){ #
#  var citylist_value_item = citylist_item.value[j] #
<li data-code="#= citylist_value_item.code #">#= citylist_value_item.name #</li>
# } #
</ul></div>
# } #


</div>
</script>
*/

var CityAutocomplete = function(){
    var that = {};
    var input,opts,pcitydata,ppy,citygroup,url,process_citydata;
    var hot_tabs;
    /* /FlightReserve/DataAssistant/GetCitys.aspx */

    var posited_tabwindow = function(ele){
        var pos = ele.offset();
        hot_tabs.css({
            display:'block',
            position:'absolute',
            left:pos.left - 2,
            top:pos.top + 23
        }).data('sugid',ele.attr('id'));
    };

    var process_pinyin = function(arr, group, col) {
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
    var init_hotcity_tabs = function(data){
        var city_popup_tpl = kendo.template($("#city_popup_tpl").html());
        $('body').append(city_popup_tpl(data));
        hot_tabs = $('#tabstrip');

        hot_tabs.delegate('.tcy_list li','click',function(){
            hot_tabs.hide();
            var $t = $(this);
            // var code = $t.attr('href');
            var text = $t.text();
            var sugid = hot_tabs.data('sugid');
            $('#'+ sugid).val(text);
        });

        hot_tabs.kendoTabStrip({
            animation:false
        });
    }

    var init_suggest_city = function(data){

        input.kendoAutoComplete({
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
            select:function(t){
                t.preventDefault();
                t.sender.value(t.item[0].children[1].innerHTML);
            }
        });

        input.on('focus',function(e){
            var $t = $(this);
            if($t.val() == '') {
                var tabcity = hot_tabs.data('kendoTabStrip');
                tabcity.activateTab($("#hot_city"));

                if ( $t.data('kendoAutoComplete').popup.element[0].style.display !== 'block' ){
                    posited_tabwindow($t);
                }
            }
        });

        input.on('blur',function(e){
            console.log(e);
            if (  e.relatedTarget && e.relatedTarget.id != "tabstrip" || e.relatedTarget === null){
                hot_tabs.hide();
            }
            // if( ( e.target.id!='id_endCity' || e.target.id!='id_startCity' ) && $(e.target).parents('.tabstrip').length<=0) {
            //     hot_tabs.hide();
            // }
        });

        input.on('keyup',function(){
            var $t = $(this);
            if( $t.val() === '' ){
                posited_tabwindow($t);
            }else{
                hot_tabs.hide();
            }
        });

        $.each(input,function(){
            $(this).data('kendoAutoComplete').bind('open',function(){
                hot_tabs.hide();
            }).bind('close',function(e){
                if(e.sender.value()===''){
                    posited_tabwindow(e.sender.element);
                } });
        });
    }

    that.setOptions = function(settings){
        var defaults = {
            input : $(".suggest-city"),
            url: './searchflight_files/data.txt',
            group: ["ABCD","EFGHJ", "KLMN", "PQRSTW", "XYZ"]
        };

        defaults.process_citydata = function(d){
            return jQuery.map(d.split(';'),function(n){
                var item = n.split('|');
                return {'code':item[0],'search':item[0]+'|'+item[3]+'|'+item[2],'py':item[2],'name':item[3]};
            });
        }

        that.options = $.extend(defaults,settings);
        return that;
    };

    that.init = function(){
        if(typeof that.options === 'undefined'){
            that.setOptions(); 
        }

        opts = that.options;

        input = opts.input;
        citygroup = opts.group;
        url = opts.url;
        process_citydata = opts.process_citydata;

        $.get(url,function(d){
            var citydata = d;
            pcitydata = process_citydata(citydata);
            ppy = process_pinyin(pcitydata, citygroup, "py");
            var data = {
                "group": citygroup,
                "citylist": ppy
            }
            init_hotcity_tabs(data);
            init_suggest_city(pcitydata);
        });

        return that;
    };

    return that;
}();


var Collpase = function(opts){
    this.opts = opts;
    this.limitHeight = 100;
}
Collpase.prototype = {
    init:function(){},
    render:function(){},
    getContainerHeight:function(){
        var container = this.container;
        return container.height();
    },
    bindClick:function(){
        this.trigger.bind('click',function(){
             
        });
    }
}


jQuery(function($){
    kendo.culture("zh-CHS");

    //起飞时间
    $(".timepicker").kendoTimePicker();

    CityAutocomplete.setOptions({
        url:'/static/js/data.txt',
        group: ["ABCDEFG","HJ", "KLMN", "PQRSTW", "XYZ"]
    });

    CityAutocomplete.init();

    //日历
    $("#depd").kendoDatePicker({
        min:new Date(),
        month:{
            empty:'<span class="date_empty">${data.value}</span>'
        },
        change:function(e){
            var arrddatepicker = $("#arrd").data("kendoDatePicker");
            var min = e.sender._value||new Date();
            arrddatepicker.min(min);
            if(arrddatepicker.value()&&arrddatepicker.value().getTime()<min){
                arrddatepicker.value(null);
            }
        }
    });

    $("#arrd").kendoDatePicker({
        min:new Date(),
        month:{
            empty:'<span class="date_empty">${data.value}</span>'
        }
    });

    $("#arrd").on('focus',function(){
        var arrddatepicker = $("#arrd").data("kendoDatePicker");
        arrddatepicker.open();
    });

    $("#depd").on('focus',function(){
        var depddatepicker = $("#depd").data("kendoDatePicker");
        depddatepicker.open();
    });

    $('.radio_is_single').on('change',function(){
        var $t= $(this);
        var $ele = $('.arrdate');
        if($t.hasClass('is_single')){
            var arrddatepicker = $("#arrd").data("kendoDatePicker");
            arrddatepicker.enable(false);
        }

        if($t.hasClass('is_double')){
            var arrddatepicker = $("#arrd").data("kendoDatePicker");
            arrddatepicker.enable();
        }
    });

    //航空公司
    var selc = $(".sel_airlines").kendoComboBox({
        filter: "contains",
        suggest: true,
        index: 3
    });

    $(".sel_airlines").on('focus',function(){
        var combobox=$("#sel_airlines").data("kendoComboBox");
        combobox.open();
    });

    $('body').delegate('.more-down','click',function(e){
        e.preventDefault()
       var data_row =  $(this).closest('.data-row');
       var info_row = data_row.nextUntil('.data-row');
        data_row.addClass('expanded'); 
        info_row.show();
        info_row.find('.more-up').last().show();
    });

    $('body').delegate('.more-up','click',function(e){
        e.preventDefault()
        if($(this).closest('.expanded').length){
            var data_row = $(this).closest('.data-row');
            var info_row = data_row.nextUntil('.data-row');
        }else{
            var current_info_row =  $(this).closest('.info-row');
            var info_row = current_info_row.prevUntil('.data-row').andSelf();
            var data_row = current_info_row.prevAll('.data-row').eq(0);
        }

        data_row.removeClass('expanded'); 
        info_row.hide();
    })
});



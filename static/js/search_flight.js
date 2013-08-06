jQuery(function($){

    $('.block2 .row1 a').click(function(e){
        e.preventDefault();
        $.get('/static/js/data2.txt',function(d){
            console.log(d);
        }); 
    })

    // 指定元素遮住,指定url触发 
    $.loadingbar({ container:'.block2', urls:[/2.txt$/] });
    // 全屏
    //$.loadingbar();
    
    kendo.culture('zh-CN');
    kendo.init($('body'));
    //起飞时间
    $(".timepicker").kendoTimePicker();

    CityAutocomplete({
        input:'.suggest-city',
        url:'/static/js/data.txt',
        group: ["ABCDEFG","HJ", "KLMN", "PQRSTW", "XYZ"]
    });

    //日历
    // $("#depd").kendoDatePicker({
    //     min:new Date(),
    //     month:{
    //         empty:'<span class="date_empty">${data.value}</span>'
    //     },
    //     change:function(e){
    //         var arrddatepicker = $("#arrd").data("kendoDatePicker");
    //         var min = e.sender._value||new Date();
    //         arrddatepicker.min(min);
    //         if(arrddatepicker.value()&&arrddatepicker.value().getTime()<min){
    //             arrddatepicker.value(null);
    //         }
    //     }
    // });

    // $("#arrd").kendoDatePicker({
    //     min:new Date(),
    //     month:{
    //         empty:'<span class="date_empty">${data.value}</span>'
    //     }
    // });

    // $("#arrd").on('focus',function(){
    //     var arrddatepicker = $("#arrd").data("kendoDatePicker");
    //     arrddatepicker.open();
    // });

    // $("#depd").on('focus',function(){
    //     var depddatepicker = $("#depd").data("kendoDatePicker");
    //     depddatepicker.open();
    // });

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
    });

    new PopWindow('.gj-grid-table .tgq',{
        cache:false,
        width: '470',
        title:'退改签',
        template:'#ac-check-template',
        open:function(e){
            e.sender.element.find('.btns').hide();
        }
    }).init();

    new PopWindow('.ac-check',{
        cache:false,
        width: '470',
        title:'提示信息',
        template:'#ac-check-template'
    }).init();


});



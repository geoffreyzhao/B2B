$(function(){
    kendo.culture('zh-CN');
    kendo.init($('body'));
    $('.actions').fixedBar();
    var lensf = function (){
        $.each($('.instr'),function(){
            var that = $(this);
            if(that.find('.highlight-fl').size()>0){
                var ele = that.find('.highlight');
                var len = ele.size();
                var wid = ele.outerWidth(true)*(len-1);
                that.find('.line').prepend('<div style="background-color:#FF6608;height:2px;width:'+wid+'px" />')
            }
        });
    }
    lensf();


    $('.ac-toggle').bind('click',function(){
        var that = $(this);
        var target = that.data('target');
        $(target).slideToggle(); 
        that.toggleClass('expanded');
        if(that.find('b').text() == '展开'){
            that.find('b').text('收起'); 
        }else{
            that.find('b').text('展开'); 
        }
    });


    $('.ac-edit').bind('click',function(){
        var that = $(this); 
        var target = that.data('target');
        var scrollClass;
        $(target).toggle();
        $(target).siblings().filter('td span').toggle();

        if(that.data('scroll')){
            $(target).closest('table').parent().toggleClass('xscroll');
        }

        if(that.find('b').text() == '编辑'){
            that.find('b').text('保存'); 
        }else{
            that.find('b').text('编辑'); 
        }

        setTimeout(function(){
            that.toggleClass('ac-save');
        },0);
    });


});

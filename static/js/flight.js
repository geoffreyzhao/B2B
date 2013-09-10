$(function(){
    kendo.culture('zh-CN');
    kendo.init($('body'));
    $('.actions').fixedBar();

    var t = /proto|dev\.b2b\.com/i;
    if(t.test(location.href)){
        lensf();
    }

    $('.ac-toggle').bind('click',function(){
        var that = $(this);
        var target = that.data('target');
        $(target).toggle(); 
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

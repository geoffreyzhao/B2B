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
        var text = that.data('text');
        var textArray;
        var textEle = that.find('b');
        var target = that.data('target');
        $(target).toggle();
        that.toggleClass('expanded');

        if(!text){
            text='显示|隐藏';
        }

        textArray = text.split('|');
        if(textArray.length===2){
            if(textEle.text() == textArray[0] ){
                textEle.text(textArray[1]);
            }else{
                textEle.text(textArray[0]);
            }
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

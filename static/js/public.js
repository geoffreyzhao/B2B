$(function(){
    //菜单事件设置
    $("#top_menu > li").each(function(index){
        $(this).hover(function(){
            $(this).addClass("mnav");
            $(".sub_menu").hide();
            $(".sub_menu",this).show();
        },function(){
            $(this).removeClass("mnav");
        });
    });

    $("#sub_menu_bar").mouseleave(function(){
        $(".sub_menu").hide();
        $("#top_menu li.current .sub_menu").show();
    });

    $("#message h3 a,#message h3 span").mouseover(function(){
        $("#message_pop").show();
        $("#message_pop .ck a").click(function(){
            $("#message_pop").hide();
        });
    });
});

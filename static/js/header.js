function init_header(){
    $("#top_menu > li").each(function(index){
        $(this).hover(function(){
            $(this).addClass("mnav");
        },function(){
            $(this).removeClass("mnav");
        });
        $(this).click(function(){
            var refresh = true;
            if($(this).hasClass("current")){
                refresh = false;
            }
            $("#top_menu > li").removeClass("current");
            $(this).addClass("current");

            if(refresh){
                $(".sub_menu").hide();
                $(".sub_menu",this).fadeIn(); 
            }
        });
    });

    $("#message h3 a,#message h3 span").mouseover(function(){
        $("#message_pop").show();
        $("#message_pop .ck a").click(function(){
            $("#message_pop").hide();
        });
    });
}

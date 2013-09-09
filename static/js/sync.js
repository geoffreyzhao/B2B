function load_header(){
    $.get(encodeURI("/运营商/同步头.html"),{},function(data){
        $(".header").html(data);
        init_header();
    });
}
$(function(){
   if(typeof(init_header) == "undefined"){
       $.getScript("/static/js/header.js",function(){
           load_header();
       });
   }else{
       load_header();
   }
});

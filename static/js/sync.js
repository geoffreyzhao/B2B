$(function(){

   if(typeof(init_header) == "undefined"){
       $.getScript("/static/js/header.js",function(){
           $(".header").load(encodeURI("/运营商/同步头.html"),{},function(){
               init_header();
           });
       });
   }

});

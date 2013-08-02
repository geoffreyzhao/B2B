var currentMenuIndex = -1;
$(function(){
   if(typeof(init_header) == "undefined"){
       $.getScript("/static/js/header.js",function(){
           init_header(); 
       });
   }else{
       init_header(); 
   }

});

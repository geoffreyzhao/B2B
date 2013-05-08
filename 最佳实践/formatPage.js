;$(function(){
   var $ul = $("<ul></ul>");
   $("body > h1").each(function(index){
       var title = "示例" + (index + 1) + " " + $(this).html();
       $(this).html(title);
       $ul.append("<li><a href=\"#example" + (index + 1) + "\">" + $(this).html() + "</a></li>");
       $("<a name=\"example" + (index + 1) + "\"></a>").insertBefore(this);
   });
   
   $("body").prepend($ul);
});
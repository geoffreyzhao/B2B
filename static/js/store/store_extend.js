$(function(){
    
    var t_closerightSlider;

    $(".rightSlider li").mouseenter(function(){
        window.clearTimeout(t_closerightSlider);
        var i=$(this).index();
        $(".rs_infoContainer").hide().eq(i).show();
        $(".rightSliderContainer .newsNum").hide();
    });
    $(".rightSlider li").mouseleave(function(){
        t_closerightSlider=window.setTimeout(function(){$(".rs_infoContainer").hide();$(".rightSliderContainer .newsNum").show();},100);
    })
    $(".rs_infoContainer").mouseenter(function(){
        window.clearTimeout(t_closerightSlider);
    })
    $(".rs_infoContainer").mouseleave(function(){
        t_closerightSlider=window.setTimeout(function(){$(".rs_infoContainer").hide();$(".rightSliderContainer .newsNum").show();},100);
    })
});
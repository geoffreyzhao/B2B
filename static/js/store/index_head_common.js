/*  采购商头部一级菜单切换动态logo  */
$(function(){
	// Gif动画logo执行30秒后，切换为静态logo，3分钟后再次切换回动画，依此循环
    // 获取图片所在根目录
    var dirArr = $("#headLogo").attr("src").split('/');
    var parentDir = dirArr.slice(0, dirArr.length - 1).join('/');

    // 切换效果 start
    function switchLogo() {

        $("#headLogo").attr("src", parentDir + "/newLogo.png");
        $("#headLogo").addClass("headStaticLogo");

        setTimeout(function() {
            $("#headLogo").attr("src", parentDir + "/logoGif.gif");
            $("#headLogo").removeClass("headStaticLogo");
        }, 1000*3*60);
    }

    setTimeout(function(){
        switchLogo();
        setInterval(switchLogo, 1000*3.5*60);
    }, 1000*0.5*60);

    // 切换效果 end

    // 为gif logo添加点击事件，跳转至app介绍.html
    $("#headLogo").click(function(){
        if ($(this).attr("src") == parentDir + "/logoGif.gif") {
            window.location.href = "/采购商/app介绍.html";
        }
    });
});
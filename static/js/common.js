$(document).ready(function() {
	$("#menu").kendoMenu({
		direction:'default' //该参数可控制 子菜单弹出的方向,  left, right, top ,top right,top left 
	});
	
	$("select").kendoDropDownList();
	$(".Datepicker").kendoDatePicker({format: "yyyy-MM-dd",culture:"zh-CN"});
	
	$(".tabstrip").kendoTabStrip({ animation: { open: { effects: 'toggle' } } });
	
	
	
	var recentOper = '<div id="slide-in-share">' +
			'<a id="slide-in-handle" href="javascript:void(0);">最近操作</a>' +
			'<ul>' + 
				'<li><a href="javascript:void(0);">订单管理</a></li>' + 
				'<li><a href="javascript:void(0);">政策管理</a></li>' + 
				'<li><a href="javascript:void(0);">角色管理</a></li>' + 
			'</ul>' +
		'</div>' ;
	
	
	$("body").append(recentOper);
	
	var slide = kendo.fx($("#slide-in-share")).slideIn("left"),
	visible = true;

	$("#slide-in-handle").click(function(e) {
		if (visible) {
			slide.reverse();
		} else {
			slide.play();
		}
		visible = !visible;
		e.preventDefault();
	});
});
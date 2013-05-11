$(document).ready(function() {
	$("#menu").kendoMenu({
		direction:'default' //该参数可控制 子菜单弹出的方向,  left, right, top ,top right,top left 
	});
	
	$("select").kendoDropDownList();
	$(".Datepicker").kendoDatePicker();
	
	$(".tabstrip").kendoTabStrip({ animation: { open: { effects: 'toggle' } } });
});
var orderDetail = function(orderId){
	if (!$("#orderDetail").data("kendoWindow")) {
		$("#orderDetail").kendoWindow({
			width: "630px",
			height: "315px",
			title: "订单详情",
			actions: ["Refresh", "Close"],
			content: "订单详情.html?orderID=" + orderId + "&timestamp=" + (new Date()).toString(),
			width:1000,
			minHeight:600,
			visible: false,
			modal:true
		}).data("kendoWindow").open().center();
	}else{
		$("#orderDetail").data("kendoWindow").open().center();
	}
};
	

$(function(){
	$("#orderList").kendoGrid({
		dataSource: {
			type: "odata",
			transport: {
				read: "http://demos.kendoui.com/service/Northwind.svc/Orders"
			},
			schema: {
			    model: {
				fields: {
						OrderID: { type: "number" },
						Freight: { type: "number" },
						ShipName: { type: "string" },
						OrderDate: { type: "date" },
						ShipCity: { type: "string" }
					}
			    }
			},
			pageSize: 30,
			serverPaging: true,
			serverFiltering: true,
			serverSorting: true
		},
		height: 1000,
		sortable: true,
		pageable: true,
		resizable: true,
		selectable: "single",
		dataBound: function() {
			//
		},
		columns: [
			{
				field:"OrderID",
				title: "订单编号",
				width:100,
				template:"<a href=\"javascript:orderDetail('#=OrderID#');\">#=OrderID#</a>"
			},
			{
				field: "OrderDate",
				title: "订单日期",
				width: 120,
				format: "{0:yyyy-MM-dd}"
			}, 
			{
				field: "ShipName",
				title: "客户名称",
				width: 260
			}, {
				field: "ShipCity",
				title: "来源城市",
				width: 150
			}
		]
	});
});
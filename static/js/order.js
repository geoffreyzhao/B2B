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
			pageSize: 20,
			serverPaging: true,
			serverFiltering: true,
			serverSorting: true
		},
		height: 430,
		sortable: true,
		pageable: true,
		resizable: true,
		dataBound: function() {
			//
		},
		columns: [
			{
				field:"OrderID",
				title: "订单编号",
				width:100
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
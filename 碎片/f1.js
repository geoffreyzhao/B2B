function FixCol() {
	if (typeof(arguments[0]) == "undefined") {
		return;
	}

	var defaults = {
        lineClassName: "fixline",
        fixClassName: "fixcol",
		position: "fixed",
		kendoGrid: false,
        debug: true,
		/* 修正量 */
		th_top: 1,
        th_left:0,
		td_top: 0,
        td_left:0
	},
	opts,
	t = arguments[0],
	wrapper,
	thead,
	tbody,
	table;

	if (typeof(t.sender.wrapper) != "undefined") {
		opts = {
            th_h: -2,
			th_left: - 30,
			td_left: - 26,
            td_top:1,
            td_height_addup: -2,
			kendoGrid: true
		};

		/* kendo grid */
		wrapper = $(t.sender.wrapper);
		thead = $(t.sender.thead);
		tbody = $(t.sender.tbody);
		table = $(t.sender.table);
	} else {
		/* default table */
		wrapper = $(t);
		thead = $("table > thead", wrapper);
		tbody = $("table > tbody", wrapper);
		table = $("table", wrapper);
	}

	opts = $.extend(defaults, opts);

	if (opts.kendoGrid && ! t.sender.options.scrollable) {
		opts.td_left = 0;
		opts.th_left = 0;
	}

	/* 容器宽度 */
	var w = wrapper.width();


    var getDocScroll = function(){
		return {top:$(document).scrollTop(),left :$(document).scrollLeft()};
    };

	var setPosition = function(obj, p_left, p_top, p_w, p_h) {
        var d = getDocScroll();
		$(obj).css({
			width: p_w,
			//height: Math.floor(p_h + opts.td_height_addup),
			height: p_h + Math.abs(opts.td_height_addup) ,
			left: p_left - d.left,
			//top: p_top - d.top + Math.abs(opts.td_height_addup) 
			top: p_top - d.top
		}).addClass(opts.fixClassName);
	};

    /** 
     * 标志量
     */
    this.hasFixed = false;

	var setFixed = function() {
		var offset = wrapper.offset();
        var th = $("tr:eq(0) th:last", thead);
		var th_w = th.width();
		var th_h = $("tr:eq(0)", thead).height();

		setPosition($("tr:eq(0) th:last", thead), offset.left + w - th_w + opts.th_left, offset.top + opts.th_top, th_w, th_h + opts.th_h);

        if(!this.hasFixed){
            th.data("offset",{ left: offset.left + w - th_w + opts.th_left ,top: offset.top + opts.th_top}); 
        }

        if(opts.debug){
            console.log(th.data("offset"));
        }

		if (opts.kendoGrid) {
			th_h = $(".k-grid-header", wrapper).outerHeight() + opts.td_top;
		}

		var row_height = [], td, remember = []; 
		$("tr", tbody).each(function(index) {
			td = $("td:last", this);
            var tr_offset = $(this).offset();
			var td_w = td.width();
			var td_h = $("td:eq(1)", this).height();
			row_height[index] = $(this).outerHeight();


			var sh = th_h;
			for (var i = 1; i < row_height.length; i++) {
				sh += row_height[i - 1];
			}

			setPosition(td, offset.left + w - td_w + opts.td_left, offset.top + sh, td_w, th_h );
            if(!this.hasFixed){
                td.data("offset",{ left: offset.left + w - td_w + opts.td_left,top : offset.top + sh}); 
                if(0 == index){
                    remember.push(td.data("offset"));
                }
            }
            if(opts.debug){
                console.log(td.data("offset"));
            }

            var fixline = $('<div class="' + opts.fixClassName + " " + opts.lineClassName + ' sep_line"></div>').css({
                width:100,
                top: tr_offset.top - 2,
                left: td.data("offset").left
            });
            wrapper.append(fixline);
		});

        remember.push(td.data("offset"));

        console.log(remember);
        if(!this.hasFixed){
            var fixline = $('<div class="' + opts.fixClassName + " " + opts.lineClassName + ' left_line"></div>').css({
                height:remember[1].top - remember[0].top + row_height[row_height.length -1] ,
                top:remember[0].top,
                left: remember[0].left
            });
            wrapper.append(fixline);
        }

        this.hasFixed = true;
	}


    var lightReFixed = function(){
        var d = getDocScroll();
        $("." + opts.fixClassName).each(function(){
            var a = $(this).data("offset");
            $(this).css({
                top: a.top - d.top,
                left: a.left - d.left
            });
        });
    };

	var unFixed = function() {

        $("." + opts.lineClassName,wrapper).remove();
        $("." + opts.fixClassName).removeClass(opts.fixClassName);
        /*
		setPosition($("tr:eq(0) th:last", thead), "static", 0, 0, "auto", "auto");
		$("tr", tbody).each(function(index) {
			var td = $("td:last", this);
			setPosition(td, "static", 0, 0, "auto", "auto");
		});
        */
        this.hasFixed = false;
	}

	if(opts.debug){
        setFixed();
    }

    if(!opts.debug){
        wrapper.mouseenter(function() {
            setFixed();
        }).mouseleave(function() {
            unFixed();
        });
    }

    /**
     * 外部函数
     */
    this.resizeFixed = setFixed;
    this.stopFixed = unFixed;



	$(window).bind("scroll", lightReFixed);
	$(window).bind("resize", lightReFixed);
}

var grid;

$(document).ready(function() {

    /*
	$("#ma").mouseenter(function() {
		console.log("mouseenter");
	}).mouseleave(function() {
		console.log("mouseleave");
	});
    */

	var items = [{
		id: 1,
		text: "Tea",
		image: "tea.png"
	},
	{
		id: 2,
		text: "Coffee",
		image: "coffee.png"
	}];

/*
	$("#treeview").kendoTreeView({
		checkboxes: {
			checkChildren: true,
			template: "<input type='checkbox' name='checkedFiles[#= item.id #]' checked value='true' />"
		},

		dataSource: items,
		dataImageUrlField: "image"
	});
    */

	grid = $("#grid").kendoGrid({
		dataSource: {
			data: products,
			schema: {
				model: {
					fields: {
						ProductName: {
							type: "string"
						},
						UnitPrice: {
							type: "number"
						},
						UnitsInStock: {
							type: "number"
						},
						Discontinued: {
							type: "boolean"
						}
					}
				}
			},
			pageSize: 6 

			/*
			type: "odata",
			transport: {
				read: "http://demos.kendoui.com/service/Northwind.svc/Orders"
			},
			schema: {
				model: {
					fields: {
						OrderID: {
							type: "number"
						},
						ShipCountry: {
							type: "string"
						},
						ShipCity: {
							type: "string"
						},
						ShipName: {
							type: "string"
						},
						OrderDate: {
							type: "date"
						},
						ShippedDate: {
							type: "date"
						}
					}
				}
			},
			pageSize: 15
            */
		},
		sortable: false,
		scrollable: true,
		resizable: false,
		//height:400,
		dataBound: function(e) {
			console.log(e);
			FixCol(e);
		},
		pageable: {
			input: true,
			numeric: false
		},
		columns: [
		{
			field: "ProductName ",
			title: "aaaaa",
			width: "300px",
            template:kendo.template("#=ProductName#<br/>asasas")

		},
             {
			field: "UnitPrice",
			title: "Unit Price",
			format: "{0:c}",
			width: "200px"
		},
		{
			field: "UnitsInStock",
			title: "Units In Stock",
			width: "300px"
		},
		{
			field: "Discontinued",
			width: "300px"
		}]

		/*
		columns: [{
			field: "OrderID",
			title: "ID",
			width: 180
		},
		{
			field: "OrderDate",
			title: "Order Date",
			width: 200,
			format: "{0:MM/dd/yyyy}"
		},
		{
			field: "ShipCountry",
			title: "Ship Country",
			width: 200
		},
		{
			field: "ShipCity",
			title: "Ship City",
			width: 200
		},
		{
			field: "ShipName",
			title: "Ship Name",
			width: 300
		},
		{
			field: "ShippedDate",
			title: "Shipped Date",
			format: "{0:MM/dd/yyyy}",
			width: 200
		}]
        */
	});
});


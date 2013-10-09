function FixCol() {
	if (typeof(arguments[0]) == "undefined") {
		return;
	}
    var e = document.createElement("DIV"),
        c = {
            haspointerlock: "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document
        };

    c.ismozilla = "MozAppearance" in e.style;

    if(c.ismozilla){
        this.startFixed = function(){};
        return this;
    }

	var defaults = {
        fixClassName: "fixcol",
        offsetName: "offset",
		kendoGrid: false
	},
	opts,
	t = arguments[0],
	wrapper,
	thead,
	tbody,
	table;


	if (typeof(t.sender.wrapper) != "undefined") {
		opts = {
			kendoGrid: true
		};

		/* kendo grid */
		wrapper = $(t.sender.wrapper);
		thead = $(t.sender.thead);
		tbody = $(t.sender.tbody);
		table = $(t.sender.table);
        grid_content = $(table).closest(".k-grid-content");
	} else {
		/* default table */
		wrapper = $(t);
		thead = $("table > thead", wrapper);
		tbody = $("table > tbody", wrapper);
		table = $("table", wrapper);
	}

	opts = $.extend(defaults, opts);

	if (opts.kendoGrid && ! t.sender.options.scrollable) {
        //grid table scrollable 为 false
        return ;
	}

	/* 容器宽度 */
	var w = wrapper.width();

	var setFixed = function() {


        var th = $("tr:eq(0) th:last", thead);
        var p = th.position();
        var last_w ;
        var l = 0;
		$("tr", tbody).each(function(index) {
			var td = $("td:last", this);
            
            if(!last_w){
                last_w = td.width();
            }

            l = w - p.left - last_w;
            if(l > 0){
                l = 0;
            }
            
            td.css({
                left: l
            }).addClass(opts.fixClassName).data(opts.offsetName,{left: l});
		});

        th.css({
            left: l
        }).addClass(opts.fixClassName).data(opts.offsetName,{left: l});

	}


    var lightReFixed = function(){
        var d = $(table).position();
        $("." + opts.fixClassName).each(function(){
            var a = $(this).data(opts.offsetName);
            var t_left = (a.left - d.left) > 0 ? 0 : (a.left - d.left) ;
            $(this).stop().animate({left:t_left});
        });
    };

	var unFixed = function() {
        $("." + opts.fixClassName).removeClass(opts.fixClassName).css({left:0});
	}


    /**
     * 外部函数
     */
    this.resizeFixed = function(){
        unFixed();

        if(grid_content){
            grid_content.scrollLeft(0);
        }else{
            wrapper.scrollLeft(0);
        }

        setFixed();
    };

    this.startFixed = setFixed;

    this.stopFixed = unFixed;

    if(grid_content){
        grid_content.bind("scroll",lightReFixed);
    }else{
        wrapper.bind("scroll",lightReFixed);
    }
        
    return this;
}


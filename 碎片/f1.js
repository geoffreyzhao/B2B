function FixCol(target,userOpts) {
	if (typeof(target) == "undefined") {
		return;
	}

	var defaults = {
        fixClassName: "fixcol",
        fixLineName : "fixline",
        offsetName: "offset",
		kendoGrid: false,
        autoWrap: false,
        lastChangeIndex: 0,
        lineAddUp: -60
	},
	opts,
	t = target,
	wrapper,
	thead,
	tbody,
	table;

    var e = document.createElement("DIV"),
        c = {
            haspointerlock: "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document
        };
        c.isie = "all" in document && "attachEvent" in e && !c.isopera;
        c.isieold = c.isie && !("msInterpolationMode" in e.style);
        c.isie7 = c.isie && !c.isieold && (!("documentMode" in document) || 7 == document.documentMode);
        c.isie8 = c.isie && "documentMode" in document && 8 == document.documentMode;
        c.isie9 = c.isie && "performance" in window && 9 <= document.documentMode;
        c.isie10 = c.isie && "performance" in window && 10 <= document.documentMode;


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

	opts = $.extend(defaults, opts, userOpts);

	if (opts.kendoGrid && ! t.sender.options.scrollable) {
        //grid table scrollable 为 false

        if(c.isie8){
            opts.lineAddUp += 30; 
        }else{
            opts.lineAddUp += 18; 
        }
	}



    if(c.isieold || c.isie7){

        opts.lastChangeIndex = opts.lastChangeIndex < 0 ? 0 : opts.lastChangeIndex;
        var fields =  $("tr:eq(0) th",thead).size();
        opts.lastChangeIndex = opts.lastChangeIndex > fields ? fields : opts.lastChangeIndex; 


        var colgroup = $("colgroup",table);

        if(colgroup){
            $("colgroup",thead).each(function(){
                var col = $("col:last",this);
                col.insertBefore($("col:eq(" + opts.lastChangeIndex  + ")", this));
            });
            $("colgroup",tbody).each(function(){
                var col = $("col:last",this);
                col.insertBefore($("col:eq(" + opts.lastChangeIndex  + ")", this));
            });
        }

        $("tr",thead).each(function(){
            var o = $("th:last",this);
            var ins = $("th:eq(" + opts.lastChangeIndex + ")", this).css({"border-left-width":1});
            o.insertBefore(ins);
        });
        $("tr",tbody).each(function(){
            var o = $("td:last",this);
            o.insertBefore($("td:eq(" + opts.lastChangeIndex + ")", this));
        });

        this.startFixed = function(){
            //empty;
        };

        this.stopFixed = function(){
            //empty;
        };
        return this;
    }

	/* 容器宽度 */
	var w = wrapper.width();

    var getDocScroll = function(){
        return {top:$(document).scrollTop(),left: $(document).scrollLeft()};
    };



    /*
    var autoWrap = function(obj){
        if(c.isieold || c.isie7){
            opts.autoWrap = true;
        }

        if(!this.hasWrap && opts.autoWrap){
            var wrapDiv = $('<div class="fixwrap"></div>');
            var child = obj.children();
            if(child.length){
                obj.append(wrapDiv.append(child));
            }else{
                obj.html(wrapDiv.html(obj.html()));
            }
        }else{
            obj.addClass(opts.fixClassName);
        }
    };
    */

	var setFixed = function() {
        var th = $("tr:eq(0) th:last", thead),
            th_offset = th.offset(), 
            d = getDocScroll(),
            p = wrapper.offset(),
            last_w ,
            l = 0,
            st = 0;


		$("tr", tbody).each(function(index) {
			var td = $("td:last", this),
                td_offset = td.offset();

            //autoWrap(td);

            td.addClass(opts.fixClassName);

            if(!last_w){
                last_w = td.outerWidth();
            }

            l = p.left + w - last_w;
            td.css({
                left: l,
                zIndex: index + 1
            }).data(opts.offsetName,{left: l,top:td_offset.top});
		});

        //autoWrap(th);
        //this.hasWrap = true;

        th.css({
            left:l,
            zIndex:0
        }).data(opts.offsetName,{left: l,top:th_offset.top});

        th.addClass(opts.fixClassName);

        var vline = $('<div class="' + opts.fixClassName + ' ' + opts.fixLineName + ' "></div>').data(opts.offsetName,{left: l,top:th_offset.top}).css({
            left:l,
            zIndex:100,
            top: th_offset.top,
            height: wrapper.height() + opts.lineAddUp + (c.isie8 ? -25 : 0) 
        });

        wrapper.append(vline);
	}

    var lightReFixed = function(){
        var d = getDocScroll();
        $("." + opts.fixClassName).each(function(){
            var a = $(this).data(opts.offsetName);
            $(this).stop().animate({
                left : a.left - d.left,
                top : a.top - d.top
            },20);

            /*
            $(this).css({
                left : a.left - d.left,
                top : a.top - d.top
            });
            */
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

    $(window).bind("scroll", lightReFixed);
    
    /**
    if(c.isie8 || c.isie7 || c.isieold){
        // empty
    }else{
        $(window).bind("resize", lightReFixed);
    }
    */

    return this;
}


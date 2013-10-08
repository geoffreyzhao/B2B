function FixCol() {
	if (typeof(arguments[0]) == "undefined") {
		return;
	}

	var defaults = {
        lineClassName: "fixline",
        fixClassName: "fixcol",
		position: "fixed",
        offsetName: "offset",
		kendoGrid: false,
        debug: true,
		/* 修正量 */
		th_top: 1,
        th_left:0,
		td_top: 3,
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
		opts.td_left += 17;
		opts.th_left += 17;
	}

	/* 容器宽度 */
	var w = wrapper.width();


    var getDocScroll = function(){
		return {top:$(document).scrollTop(),left :$(document).scrollLeft()};
    };

	var setPosition = function(obj,p_left, p_top, p_w, p_h) {
        var d = getDocScroll();
		$(obj).css({
            position:opts.position,
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
        var d = getDocScroll();
		var offset = wrapper.offset();
        var th = $("tr:eq(0) th:last", thead);
		var th_w = th.width();
        var th_o_w = th.outerWidth();
		var th_h = $("tr:eq(0) th:eq(0)", thead).innerHeight();
        var th_o_h = th.outerHeight(); 

		setPosition($("tr:eq(0) th:last", thead), offset.left + w - th_w + opts.th_left, offset.top + opts.th_top, th_w, th_h + opts.th_h);

        if(!this.hasFixed){
            th.data(opts.offsetName,{ left: offset.left + w - th_w + opts.th_left ,top: offset.top + opts.th_top}); 
        }

		var row_height = [], td, remember = [],sh = 0;
		$("tr", tbody).each(function(index) {
			td = $("td:last", this);
            var tr_offset = $(this).offset();
			//var td_w = td.width();
            var td_w = th_w;
			var td_h = $("td:eq(0)", this).height();

            /*
			row_height[index] = $(this).height();
            sh = th_o_h + opts.td_top;
			for (var i = 1; i < row_height.length; i++) {
				sh += row_height[i - 1];
			}
            */

			setPosition(td, offset.left + w - td_w + opts.td_left, tr_offset.top , td_w, td_h -1 );
            if(!this.hasFixed){
                td.data(opts.offsetName,{ left: offset.left + w - td_w + opts.td_left,top : tr_offset.top }); 
                if(0 == index){
                    remember.push(td.data(opts.offsetName));
                }
            }


            var lineOffset = {
                top: tr_offset.top - 2,
                left: td.data(opts.offsetName).left 
            };
            if(opts.debug){
                console.log(td.data(opts.offsetName).top,"-",td.data(opts.offsetName).left);
            }

            if(0 != index){
                var fixline = $('<div class="' + opts.fixClassName + " " + opts.lineClassName + ' sep_line"></div>').css({
                    width:th_o_w,
                    top: lineOffset.top,
                    left: lineOffset.left  
                }).data(opts.offsetName,lineOffset);

                wrapper.append(fixline);
            }
		});

        remember.push(td.data(opts.offsetName));

        /*
        if(!this.hasFixed){
            var left_line = $('<div class="' + opts.fixClassName + " " + opts.lineClassName + ' left_line"></div>').css({
                height:remember[1].top - remember[0].top + row_height[row_height.length -1] ,
                top:remember[0].top,
                left: remember[0].left - 3
            }).data(opts.offsetName,{left: remember[0].left - 3, top:remember[0].top});
            wrapper.append(left_line);
        }
        */

        this.hasFixed = true;
	}


    var lightReFixed = function(){
        var d = getDocScroll();
        $("." + opts.fixClassName).each(function(){
            var a = $(this).data(opts.offsetName);
            $(this).css({
                top: a.top - d.top,
                left: a.left - d.left
            });
        });
    };

	var unFixed = function() {

        $("." + opts.lineClassName,wrapper).remove();
        $("." + opts.fixClassName).removeClass(opts.fixClassName);
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


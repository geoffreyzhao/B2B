$(function() { // 格式化日期字符串
	Date.prototype.format = function(format) {
		var o = {
			"M+" : this.getMonth() + 1, // month
			"d+" : this.getDate(), // day
			"h+" : this.getHours(), // hour
			"m+" : this.getMinutes(), // minute
			"s+" : this.getSeconds(), // second
			"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
			"S" : this.getMilliseconds()
		// millisecond
		}
		if (/(y+)/.test(format))
			format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for ( var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	}

	// 获取制定日期第二天的字符串形式
	// format，返回日期格式，可以为空，默认"yyyy-MM-dd",currentDate:可以为空，默认是调用此方法的日期对象
	Date.prototype.getNextDate = function(format, currentDate) {
		var nextDate_milliseconds = null;
		if (currentDate == null || typeof (currentDate) == "undefined" || !(currentDate instanceof Date)) {
			nextDate_milliseconds = this.getTime() + 1000 * 60 * 60 * 24;
		} else {
			nextDate_milliseconds = currentDate.getTime() + 1000 * 60 * 60 * 24;
		}
		var nextDate = new Date(nextDate_milliseconds);
		var dateFormat = "yyyy-MM-dd";
		if (format != null && typeof (format) == "undefined") {
			dateFormat = format;
		}
		return nextDate.format(dateFormat);
	}

	// 获取月末日期字符串形式
	Date.prototype.getMonthEndDate = function(format, currentDate) {
		var monthEndDate = null;
		var monthEndDate_year = null;
		var monthEndDate_month = null;
		var monthEndDate_date = null;
		if (currentDate == null || typeof (currentDate) == "undefined" || !(currentDate instanceof Date)) {
			monthEndDate_month = this.getMonth();
			monthEndDate_year =  parseInt(this.getFullYear());
		} else {
			monthEndDate_month = currentDate.getMonth();
			monthEndDate_year =  parseInt(currentDate.getFullYear());
		}
		switch (monthEndDate_month + 1) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			monthEndDate_date = 31;
			break;
		case 2:
			if (monthEndDate_year % 4 == 0 && (monthEndDate_year % 100 != 0 || monthEndDate_year % 400 == 0))
				monthEndDate_date = 29;
			else
				monthEndDate_date = 28;
			break;
		default:
			monthEndDate_date = 30;
			break;
		}
		if (monthEndDate_year != null && monthEndDate_month != null && monthEndDate_date != null) {
			monthEndDate = new Date(monthEndDate_year, monthEndDate_month, monthEndDate_date);
		}
		var dateFormat = "yyyy-MM-dd";
		if (format != null && typeof (format) == "undefined") {
			dateFormat = format;
		}
		return monthEndDate.format(dateFormat);
	}

	Date.prototype.getAddDate = function(format, currentDate, addDate) {
		var addDate_milliseconds = null;
		if (currentDate == null || typeof (currentDate) == "undefined" || !(currentDate instanceof Date)) {
			addDate_milliseconds = this.getTime() + 1000 * 60 * 60 * 24 * (addDate - 1);
		} else {
			addDate_milliseconds = currentDate.getTime() + 1000 * 60 * 60 * 24 * (addDate - 1);
		}
		var addDate = new Date(addDate_milliseconds);
		var dateFormat = "yyyy-MM-dd";
		if (format != null && typeof (format) == "undefined") {
			dateFormat = format;
		}
		return addDate.format(dateFormat);
	}
});

function setEndDateMinDateLagerBeginDate(beginDateId, endDateId) {
	$("#" + beginDateId).datepicker("option", "onSelect", function(dateText, inst) {
		var date = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);
		$("#" + endDateId).datepicker("option", "minDate", date);
		$("#" + beginDateId).change();
	});
}

function setDateEnd(obj, name, date) {

	var p = $(obj).parent();
	while (p.find(".datepicker[" + name + "]").length == 0) {
		if (p.get(0).tagName == 'body'.toUpperCase()) {
			break;
		}
		p = $(p).parent();
	}

	var e = $(p).find(".datepicker[" + name + "]");
	e.datepicker("option", "minDate", date);
		if (e.prop('disabled') == false) {
			if(typeof(e.val())!="undefined"&&new Date(e.val())<new Date($(obj).val())){
				e.datepicker("setDate", $(obj).val());
			}
		}
}
function setDateMonthEnd(obj, name, date) {
	var p = $(obj).parent();
	while (p.find(".datepicker[" + name + "]").length == 0) {
		if (p.get(0).tagName == 'body'.toUpperCase()) {
			break;
		}
		p = $(p).parent();
	}
	var e = $(p).find(".datepicker[" + name + "]");
	e.datepicker("option", "minDate", date);
	if (e.prop('disabled') == false) {
		e.datepicker("setDate", date.getMonthEndDate("yyyy-MM-dd", date));
	}
}

var dateStartWithMonthEndConfig = {
	css : {
		"z-index" : 20000
	},
	numberOfMonths : [ 1, 1 ],
	showButtonPanel : true,
	onSelect : function(dateText, inst) {
		var date = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);
		setDateMonthEnd(this, "dateEndWithMonthEnd", date);
	}
};

var dateEndWithMonthEndConfig = {
	css : {
		"z-index" : 20000
	},
	numberOfMonths : [ 1, 1 ],
	showButtonPanel : true
};

var singleDateConfig = {
	css : {
		"z-index" : 20000
	},
	numberOfMonths : [ 1, 1 ],
	minDate : new Date(),
	showButtonPanel : true,
	onSelect : function(dateText, inst) {
		var date = new Date();
		setDateEnd(this, "singelDateEnd", date);
	}
};

//保险，生效日期为当前日期+1天
var effectiveDateConfig = {
	css: {
		"z-index": 20000
	},
	numberOfMonths: [1, 1],
	minDate: new Date(),
	showButtonPanel: true,
	changeMonth : true,
	changeYear : true
}

/* 双月 配置 ，有最小日期 */
var startDateConfig = {
	css : {
		"z-index" : 20000
	},
	numberOfMonths : [ 1, 2 ],
	minDate : new Date(),
	showButtonPanel : true,
	onSelect : function(dateText, inst) {
		var date = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);
		setDateEnd(this, "dateEnd", date);
	}
};
var endDateConfig = {
	css : {
		"z-index" : 20000
	},
	numberOfMonths : [ 1, 2 ],
	minDate : new Date(),
	showButtonPanel : true
};

/* 双月 配置 ，有最小日期 end */


/* 双月 配置 ，无限制日期选择 */
var startDateConfigNoStart = {
	css : {
		"z-index" : 20000
	},
	numberOfMonths : [1, 2],
	showButtonPanel : true,
	onSelect : function(dateText, inst) {
		var date = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);
		setDateEnd(this, "dateEndNoStart", date);
	}
};
var endDateConfigNoStart = {
	css : {
		"z-index" : 20000
	},
	numberOfMonths : [1, 2],
	showButtonPanel : true
};
/* 双月 配置 ，无限制日期选择 end */

/* 单月 配置 ，有最小日期 */
var startDateConfigWithOne = {
	css : {
		"z-index" : 20000
	},
	numberOfMonths : [ 1, 1 ],
	minDate : new Date(),
	showButtonPanel : true,
	onSelect : function(dateText, inst) {
		var date = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);
		setDateEnd(this, "dateEndOne", date);
	}
};

var endDateConfigWithOne = {
	css : {
		"z-index" : 20000
	},
	numberOfMonths : [ 1, 1 ],
	showButtonPanel : true
};

/* 单月 配置 ，有最小日期 end */

/* 单月 配置 ，无限制日期选择 */
var startDateConfigWithOneNoStart = {
	css : {
		"z-index" : 20000
	},
	numberOfMonths : [ 1, 1 ],
	showButtonPanel : true,
	onSelect : function(dateText, inst) {
		var date = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);

		setDateEnd(this, "dateStartOneNoEnd", date);
		/*
		 * if
		 * ($(this).parent().find(".datepicker[dateStartOneNoEnd]").length!=0) {
		 * $(this).parent().find(".datepicker[dateStartOneNoEnd]").datepicker("option",
		 * "minDate", date); } else {
		 * $(this).parent().siblings().find(".datepicker[dateStartOneNoEnd]").datepicker("option",
		 * "minDate", date); }
		 */
		// $(this).parent().find(".datepicker[dateStartOneNoEnd]").datepicker("setDate",
		// dateText);
	}
};
var endDateConfigWithOneNoEnd = {
	css : {
		"z-index" : 20000
	},
	numberOfMonths : [ 1, 1 ],
	minDate : new Date(),
	showButtonPanel : true
};
/* 单月 配置 ，无限制日期选择 end */

var notMinDateConfig = {
	css : {
		"z-index" : 20000
	},
	numberOfMonths : [ 1, 1 ],
	showButtonPanel : true
};

var singleMonthConfig = {
	css : {
		"z-index" : 20000
	},
	yearRange : "1950:" + ((new Date()).getFullYear() + 30),
	changeMonth : true,
	changeYear : true,
	numberOfMonths : [ 1, 1 ],
	showButtonPanel : true
};

var dateTimePickerConfig = {
	css : {
		"z-index" : 20000
	},
	yearRange : "1950:" + ((new Date()).getFullYear() + 30),
	changeMonth : true,
	changeYear : true,
	numberOfMonths : [ 1, 1 ],
	showButtonPanel : true,
	changeTime : true,
	timeFormat : "hh:mm:ss"
};

var birthDateConfig = {
	changeYear : true,
	changeMonth : true,
	yearRange : new Date().getFullYear() - 100 + ':' + new Date().getFullYear(),
	css : {
		"z-index" : 20000
	},
	maxDate : new Date()
};
var documentValidityEndConfig = {
	changeYear : true,
	changeMonth : true,
	yearRange : new Date().getFullYear() + ':' + (new Date().getFullYear() + 100)
};

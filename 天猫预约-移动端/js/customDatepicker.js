/*  自定义日历  */

(function($) {
 
    $.fn.customDatepicker = function(data) {

    	var template = "";

    	for (var z = 0; z < data.length; z++) {
	    	var year = data[z].year;
	    	var monthArr = data[z].month;
	    	var currentDate = new Date().getDate();

	    	for (var i = 0; i < monthArr.length; i++) {
	    		template += "<div class='monthBanner'>" + year + "年" + monthArr[i].monthIndex 
	    					+ "月</div><table class='calTable ct-" + year + "-" 
	    					+ monthArr[i].monthIndex + "'><tr>";

	    		var dayArr = _.pluck(monthArr[i].monthData, "day"); // 萃取出所有需要自定义的日期
	    		var curentMonthDate = new Date(year, monthArr[i].monthIndex - 1, 1);
		        var nextMonthDate = new Date(curentMonthDate.getFullYear(), curentMonthDate.getMonth() + 1,
		            curentMonthDate.getDate());
		        var monthDays = (nextMonthDate - curentMonthDate)/(1000*60*60*24);  // 获得当前月天数

		        var firstWeekDay = curentMonthDate.getDay();  // 获得当前月1号是周几, 范围0-6
		        var lastWeekDay = nextMonthDate.getDay() - 1 < 0 ? 6 : nextMonthDate.getDay() - 1; 
		        // 计算当月最后一天是周几

		        var currentDay = 1;  // 从1号开始排列当月的日期

		        for (var j = 0; j < firstWeekDay; j++) {  // 当月1号之前td为空
		        	if (j == firstWeekDay - 1) {
		        		template += "<td></td>";
		        	} else {
		            	template += "<td class='otherMonthDay'></td>";
		        	}
		        }

		        for (; currentDay <= monthDays; currentDay++) {

		            var w1 = firstWeekDay == 0 ? 7 : firstWeekDay;

		            if (currentDay % 7 == (7 - w1) && currentDay != monthDays) {   // 一行的最后一个
		                template += "<td>" + geneTdContent(currentDay) + "</td></tr><tr>";
		            } else if (currentDay == monthDays) {   //  当前日期是最后一天
		                template += "<td>" + geneTdContent(currentDay) + "</td>";
		                for (var t = 0; t < 6 - lastWeekDay; t++) {
		                    template += "<td class='otherMonthDay'></td>";
		                }
		                template += "</tr></table>";
		            } else {   //  正常日期显示
		                template += "<td>" + geneTdContent(currentDay) + "</td>";
		            }
		        }

	    	}
	    }
        function geneTdContent(currentDay) {   //  生成日期内容模板

        	var dayStr = "";

        	if ($.inArray(currentDay, dayArr) != -1) {  // 需要自定义日期

        		// 获取需要自定义日期的数据
        		var dayInfo = _.findWhere(monthArr[i].monthData, {"day": currentDay});

        		if (!!dayInfo.enable) {  //  日期可点击
        			dayStr += "<div class='dayCont enable'>";
        		} else {   //  日期不可点击
        			dayStr += "<div class='dayCont'>";
        		}

        		if (ifToday(year, monthArr[i].monthIndex, currentDay)) {  //  如果是当天，头部内容显示今天
        			dayStr += "<div class='top-day-cont current-date'>今天</div>";
        		} else {  //  头部不显示内容
        			dayStr += "<div class='top-day-cont'></div>";
        		}

        		if (!!dayInfo.holiday) {  //  有假期参数
        			dayStr += "<div class='middle-day-cont' data-daynum='" 
        					+ year + "-" + monthArr[i].monthIndex + "-" 
        					+ dayInfo.day + "'>" + dayInfo.holiday + "</div>";
        		} else {  // 无假期参数时只显示日期数字
        			dayStr += "<div class='middle-day-cont' data-daynum='" 
        					+ dayInfo.day + "'>" + dayInfo.day + "</div>";
        		}

        		if (!!dayInfo.price) {  //  有加价
        			dayStr += "<div class='bottom-day-cont'><span class='price-num'>+" 
        					+ dayInfo.price + "</span>起</div>";
        		} else {  //  无加价
        			dayStr += "<div class='bottom-day-cont'></div>";
        		}

        	} else {   //  只显示日期数字
        		dayStr += "<div class='dayCont'>";

        		if (ifToday(year, monthArr[i].monthIndex, currentDay)) {
        			dayStr += "<div class='top-day-cont current-date'>今天</div>";
        		} else {
        			dayStr += "<div class='top-day-cont'></div>";
        		}

        		dayStr += "<div class='middle-day-cont' data-daynum='" + year + "-" 
        				+ monthArr[i].monthIndex + "-" + currentDay
        				+ "'>" + currentDay + "</div>" 
        				+ "<div class='bottom-day-cont'></div></div>";
        	}
        	return dayStr;
        }

        function ifToday(y, m, d) {
        	var dt = new Date();
        	return (y == dt.getFullYear() && m == (dt.getMonth() + 1) && d == dt.getDate()) ? true : false;
        }

        this.append(template);
        return this;
    }; 
}(jQuery));
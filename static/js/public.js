/**
 * 封装 请求 
 */
var JsonE = {
	insertBefore: function: (template) {},
	insertAfter: function(template) {},
	appentTo: function(template) {},
	prependTo: function(template) {},
	innerHTML: function(template) {},
	exec: function() {},

	request: function(url, params, templates) {

		$.getJSON(url, params, function(serverData) {
			//服务器返回 {"status":0,"data":[{"type":"innerHTML","id":"div1","value":[]},......]}
			if (serverData.status != 0) {
				//服务器出错
				if (console.log) {
					console.log(serverData);
				}
				return;
			}
			var data = serverData.data;
			var len = data.length;


			for (var i = 0; i < len; i++) {
				switch (data[i].type) {
				case 'insertBefore':
					$(data[i].id).insertBefore(template(data[i].value));
					break;
				case 'insertAfter':
					$(data[i].id).insertAfter(template(data[i].value));
					break;
				case 'prependTo':
					$(template(data[i].value)).prependTo(data[i].id);
					break;
				case 'appendTo':
					$(template(data[i].id)).appendTo(data[i].value);
					break;
				case 'innerHTML':
					$(template(data[i].id)).html(data[i].value);
					break;
				case 'exec':
					eval("" + data[i].value + "");
					break;
				default:
					break;
				}
			}
		});
	}
}


Array.prototype.inArray = function(p_val){

    for(var i = 0, l = this.length; i < l; i++) {
		if(this[i] == p_val) {
			return true;
		}
	}
	return false;

};
var hotel_dataSource = new kendo.data.DataSource({
		data: [
        {
			hotel_id: 1,
			city: "上海1",
			position: "闸北区",
			hotel_name: "宝华国际酒店",
			star: "5",
			brand: "宝华国际",
			sign_manager: "张三",
		},
        {
			hotel_id: 2,
			city: "上海2",
			position: "闸北区",
			hotel_name: "宝华国际酒店",
			star: "5",
			brand: "宝华国际",
			sign_manager: "张三",
		},
        {
			hotel_id: 3,
			city: "上海3",
			position: "闸北区",
			hotel_name: "宝华国际酒店",
			star: "5",
			brand: "宝华国际",
			sign_manager: "张三",
		},
        {
			hotel_id: 4,
			city: "上海4",
			position: "闸北区",
			hotel_name: "宝华国际酒店",
			star: "5",
			brand: "宝华国际",
			sign_manager: "张三",
		},
        {
			hotel_id: 5,
			city: "上海5",
			position: "闸北区",
			hotel_name: "宝华国际酒店",
			star: "5",
			brand: "宝华国际",
			sign_manager: "张三",
		},
        {
			hotel_id: 6,
			city: "上海6",
			position: "闸北区",
			hotel_name: "宝华国际酒店",
			star: "5",
			brand: "宝华国际",
			sign_manager: "张三",
		},
        {
			hotel_id: 7,
			city: "上海7",
			position: "闸北区",
			hotel_name: "宝华国际酒店",
			star: "5",
			brand: "宝华国际",
			sign_manager: "张三",
		},
        {
			hotel_id: 8,
			city: "上海8",
			position: "闸北区",
			hotel_name: "宝华国际酒店",
			star: "5",
			brand: "宝华国际",
			sign_manager: "张三",
		},
        {
			hotel_id: 9,
			city: "上海9",
			position: "闸北区",
			hotel_name: "宝华国际酒店",
			star: "5",
			brand: "宝华国际",
			sign_manager: "张三",
		},
        {
			hotel_id: 10,
			city: "上海10",
			position: "闸北区",
			hotel_name: "宝华国际酒店",
			star: "5",
			brand: "宝华国际",
			sign_manager: "张三",
		},
        {
			hotel_id: 11,
			city: "上海11",
			position: "闸北区",
			hotel_name: "宝华国际酒店",
			star: "5",
			brand: "宝华国际",
			sign_manager: "张三",
		}

        ],
        page:1,
        pageSize: 2
	}
);

/* 已排除列表 */
var filterd_data = {
    city:[],
    hotel:[],
    customer:[]
};

var filter_win = { };

var exclude_item_tpl = kendo.template($("#exclude_item_tpl").html());  

function select_item(obj){
    var data = hotel_dataSource.data(); 
    var data_offset = (hotel_dataSource.page() - 1) * hotel_dataSource.pageSize();
    var index = $(obj).closest("tr").index() + data_offset;
    var item = data[index]; 
    var self_name = $(obj).attr("name"); 

    var f = $(obj).closest(".filter").find(".filtered_data");

    if($(obj).prop("checked")){
        var node = exclude_item_tpl({id:item.hotel_id,name:self_name,hotel_name:item.hotel_name,hotel_position:item.position});
        if(!filterd_data[self_name].inArray(item.hotel_id)){
            filterd_data[self_name].push(item.hotel_id);
            f.append(node);
        }
    }else{
        if(filterd_data[self_name].inArray(item.hotel_id)){

            for(var i =0,l = filterd_data[self_name].length; i < l; i++){
                if(filterd_data[self_name][i] == item.hotel_id){
                    break;
                }
            }
            var a = filterd_data[self_name].slice(0,i);
            var b = filterd_data[self_name].slice(i + 1);
            filterd_data[self_name] = a.concat(b); 
            $("#" + self_name + item.hotel_id).remove();
        }
    }

    console.log(filterd_data[self_name]);
};

$(function() {
	var hotel_table;

	filter_win["hotel"] = new PopWindow("#filter_hotel", {
		title: "勾选排除酒店",
		width: 730,
		template: "#filter_hotel_tpl",
        activate:function(){
            //
        },
		open: function() {
			hotel_table = new GridTable('#hotel_list', {
				dataSource:hotel_dataSource,
                dataBounding:function(e){
                },
				dataBound: function(e) {
                    $(".filter tbody input[name=hotel]").each(function(index){
                        if(filterd_data["hotel"].inArray($(this).val())){
                            $(this).prop("checked",true);
                        }
                    });

					filter_win["hotel"].center();
				},
				rowTemplate: kendo.template($("#hotel_row_tpl").html())
			}).init();
		}
	}).init();

	$("body").delegate("a.clean_data", "click", function() {
		/* clean data */
        var name = $(this).attr("name");
        $(this).closest(".filter").find(".filtered_data").html("");
        filterd_data[name].length = 0;

        $(".filter .filter_num").html(filterd_data[name].length);
        $(".filter input[name=" + name + "]").prop("checked",false);
        $(".filter input[name=" + name + "_checkall]").prop("checked",false);
	});


    $("body").delegate(".filter .btns a","click",function(){

        var index = $(this).index();
        var name = $(this).attr("name");
        var group = name.substring(0,name.indexOf('_'));
        console.log(group,index)

        if(0 == index){
            //保存按钮
            $(this).closest(".filter").find(".item_data").appendTo("." + group + "_wrapper");
        }
        filter_win[group].close();
        
    });

    $("body").delegate(".filter table input[type=checkbox]","click",function(){
        var checkbox_name = $(this).attr("name"); 
        var check_status = $(this).prop("checked");
        if(/checkall/.test(checkbox_name)){
            //全选
            checkbox_name = checkbox_name.replace('_checkall','');

            $(".filter tbody input[name=" + checkbox_name + "]").each(function(){
                $(this).prop("checked",check_status);
                select_item(this);
            });

        }else{
            // 单条
            select_item(this);
        }

        $(".filter .filter_num").html(filterd_data[checkbox_name].length);

    });
});


/* 国际机票首页 */
$(function() {
	$("#btn_upload").uploadify({
		buttonClass: "button_gray",
		buttonText: "浏 览",
		width: 71,
		height: 25,
		uploader: 'http://www.tz-local.com/test.php',
		swf: '/static/js/uploadify/uploadify.swf',
		queueID: 'queue',
		removeTimeout: 0,
		onUploadSuccess: function(file, data, response) {},
		onUploadError: function(file, errorCode, errorMsg, errorString) {
			alert(errorString);
		}
	});

	$("input[name='passenger_type']").click(function() {
		if ($(this).val() == "child") {
			$("#child_extra").show();
		} else {
			$("#child_extra").hide();
		}

		if ($(this).val() == "others") {
            $("#doc_need").show();
		}else{
            $("#doc_need").hide();
        }
	});
	$("input[name='with_type']").click(function() {

        switch($(this).val()){
            case 'without_adult':
                $("#adult_pnr").hide();
                $("#adult_order_id").hide();
                break;
            case 'adult_pnr':
                $("#adult_pnr").show();
                $("#adult_order").hide();
                break;
            case 'adult_order':
                $("#adult_pnr").hide();
                $("#adult_order").show();
                break;
            default:
                break;
        }
    });

	$("input[name='flight_type']").click(function() {
        switch($(this).val()){
            case 'one_way':
                $(".muti_trip").hide();
                $(".round_trip").hide();
                $(".one_way").show();
                $("#return_date").hide();
                break;
            case 'round_trip':
                $(".muti_trip").hide();
                $(".one_way").hide();
                $(".round_trip").show();
                $("#return_date").show();
                $(".mutl_trip").hide();
                break;
            case 'muti_trip':
                $(".one_way").hide();
                $(".round_trip").hide();
                $(".muti_trip").show();
                break;
            default:
                break;
        }
    });
});


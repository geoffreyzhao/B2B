/**
 * ===================
 * some style
 * ===================
#lean_overlay {
    position: fixed;
    z-index:100;
    top: 0px;
    left: 0px;
    height:100%;
    width:100%;
    background: #000;
    display: none;
}
 *
 * usage
 * ===================
 * $(".trigger_selector").leanModal();
 *
 */

(function($) {

	$.fn.extend({

		leanModal: function(options) {
			var defaults = {
				top: 100,
				overlay: 0.5,
				closeButton: null,
				posType: 'fixed'
			}

			$("body").append("<div id='lean_overlay'></div>");
			var options = $.extend(defaults, options);

			return this.each(function() {
				var o = options;
				var posTop = o.top;

				$(this).click(function(e) {
					var layer = $("#lean_overlay");

					if (jQuery.isFunction(o.top) && posTop != 'fixed') {
						posTop = o.top();
					};

					var modal_id = $(this).attr("href");

					layer.click(function() {
						close_modal(modal_id);
					});

					$(o.closeButton).click(function() {
						close_modal(modal_id);
					});

					var modal_height = $(modal_id).outerHeight();
					var modal_width = $(modal_id).outerWidth();

					layer.css({
						'display': 'block',
						opacity: 0
					}).fadeTo(200, o.overlay);

					$(modal_id).css({
						'display': 'block',
						'position': o.posType,
						'opacity': 0,
						'z-index': 11000,
						'left': 50 + '%',
						'margin-left': - (modal_width / 2) + "px",
						'top': posTop + "px"
					}).fadeTo(200, 1);

					e.preventDefault();
				});

			});

			function close_modal(modal_id) {
				$("#lean_overlay").fadeOut(200);
				$(modal_id).css({
					'display': 'none'
				});
			}

		}
	});

})(jQuery);


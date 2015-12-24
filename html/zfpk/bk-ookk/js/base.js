$(function() {
	var swiper = new Swiper('.swiper-container', {
		pagination : '.swiper-pagination',
		direction : 'vertical',
		slidesPerView : 1,
		paginationClickable : true,
		spaceBetween : 30,
		mousewheelControl : true,

		onSlideChangeStart : function(swiper) {
			if (swiper.activeIndex > 0) {
				$('div.arrow').hide();
			} else {
				$('div.arrow').show();
			}
		},
		onSlideChangeEnd : function(swiper) {
			swiper.destroy(true);
		}
	});
	
	$('#bm').click(function() {
		userinfo('', controller, salt, function() {
			window.location.reload();
		});
	});
	reHeight();
});
/**窗口自适应**/
$(window).resize(function() {
	reHeight();
});
/**自适应页面高度**/
function reHeight() {
	$('.role_cc').height($(window).height() - 180);
}

var swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        mousewheelControl : true,
    onSlideChangeStart : function(swiper){ 
      if(swiper.activeIndex > 0){ 
        $('div.arrow').hide(); 
      } else{ 
        $('div.arrow').show(); 
      }
    },
    onSlideChangeEnd : function(swiper){
      swiper.destroy(true);
    }
   
});

$(function(){
  
  reHeight();
});
/**窗口自适应**/
$(window).resize(function() {
    reHeight();
});
/**自适应页面高度**/
function reHeight(){
  $('.role_cc').height($(window).height()-200);
  $('.resize').height($(window).height());
}
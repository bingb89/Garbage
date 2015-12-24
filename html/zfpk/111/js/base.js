var swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        mousewheelControl : true,
    onSlideChangeStart : function(swiper){
      if(swiper.activeIndex > 0)
      {
        $('div.arrow').hide();
      }
      else
      {
        $('div.arrow').show();
      }
    }
  });

$(function(){

   $('#bm').click(function(){
    var option = {
            'id' : 'modal_submit',
            'title':'我要报名',
            'content' : '<section class="sign"><div class="sign_c"><form class="form-inline"><div class="form-group has-success has-feedback"><label class="control-label">姓名：</label><div class="input-group"><span class="input-group-addon"><i class="fa fa-user"></i></span><input id="name" type="text" class="form-control"></div></div><div class="form-group has-success has-feedback"><label class="control-label">电话号码：</label><div class="input-group"><span class="input-group-addon"><i class="fa fa-mobile"></i></span><input type="tel" class="form-control" id="tel" maxlength="11"></div></div></form></div></section>',
            'btn_close_title' : '提交'
          }
          Modal.modal(option);
          return false;
  });

  reHeight();
});
/**窗口自适应**/
$(window).resize(function() {
    reHeight();
});
/**自适应页面高度**/
function reHeight(){
  $('.role_cc').height($(window).height()-180);
}
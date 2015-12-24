var swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        mousewheelControl : true,
    onSlideChangeStart : function(swiper){
      
      if(swiper.activeIndex > 0){ $('div.arrow').hide(); }
      else{  $('div.arrow').show(); }
    }
});
$(function(){

  //活动规则
  $(document).on('click','#role',function(){
    var option = {
      'id' : 'modal_role',
      'title':'活动规则',
      'content' : '<div class="role_c"><p><span>一、活动时间</span>　　2015年12月24日-12月30日，共7天。</p><p><span>二、活动设奖</span>　　活动共设四个奖项：<br />　　一等奖7名，分别获得价值8000元的旅游梦想基金；<br />　　二等奖28名，分别获得价值4000元的旅游梦想基金；<br />　　三等奖500名，分别获得精美纪念品一份。<br /><strong>　　旅游梦想基金只为中奖者提供旅游资金，中奖者在福彩中心指定的旅行社任意选择所有旅游产品，一人或多人使用不限，不可兑换现金。旅游梦想基金使用有效期为1年，即从2016年1月1日起至2016年12月31日止，逾期未使用视为自动放弃。</strong></p><p><span>四、中奖方式</span>　　以“摇圣诞树”的活动方式，摇落礼盒，如果出现的是圣诞老人，则获一个一等奖，如出现的是麋鹿车，则获一个二等奖,如出现的是雪花，则获一个三等奖。各奖等可兼中兼得。</p><p><span>活动规则</span>　　（一）用户通过搜索“广西福彩”公众号或扫描微信二维码关注“广西福彩”官方微信参与。<br />　　（二）进入公众号，发送“圣诞有礼”或在官方微信底部菜单栏有“新闻公告”，选择“圣诞有礼”，系统会自动回复活动链接，点开链接进入活动页面。<br />　　　（三）用户根据页面提示进入后，可看到可“摇圣诞树”的次数、玩法规则介绍、中奖记录。<br />　　（四）通过官方微信号个人彩豆直接兑换“摇圣诞树”机会，需使用1000彩豆兑换一次“摇圣诞树”的机会，不限次数，彩豆用完为止；<br />　　（五）通过转发分享活动页面到朋友圈收集朋友的支持票，每获得以10票为递增的支持票数，则可再获得一次“摇圣诞树”机会，不限次数。</p><p><span>三、参与条件</span>　　参与者年龄在18至65周岁，身体健康，符合旅行社有关出行条件，不出行的不实行现金兑付。</p><p><span>四、活动须知</span>　　（一）参与者已经详细阅读并理解本次活动的规程，对活动没有异议。<br />　　（二）参与者保证其按照本次活动要求所提供的资料均是真实有效的。<br />　　（三）用户注册登记个人信息，包括姓名和手机号码，务必填写真实有效的手机号码，作为唯一领奖凭证。<br />　　（四）活动结束后，中奖奖金统一发放。<br />　　（四）活动结束后，中奖结果在广西福彩中心官方微信公众号、官方网站、有关报纸专栏中公布。中奖者须于中奖结果公布日起7个工作日内联系广西福利彩票发行中心进行中奖确认登记（电话：0771-5878381转3），逾期没有进行中奖确认的视为弃奖。<br />（五）获得三等奖的，统一在活动结束后以快递的形式寄出。<br />（六）本活动最终解释权归广西福利彩票发行中心所有。</p></div>',
      'btn_close_title' : '关闭'
    }
    Modal.modal(option);
    return false;
  }); 

  //新闻滚动
  var scrollTimer = null; 
  var delay = 2000; 
  $('.scrollNews').hover(function () { 
     clearInterval(scrollTimer); 
  }, function () { 
     scrollTimer = setInterval(function () { 
     scrollNews(); 
  }, delay); 
  }).triggerHandler('mouseout'); 

  //点击摇一摇
  var clicktag = 0;  

  $('.yao').click(function () { 
    
      if($.cookie("the_cookie") == "ci"){
        yao1();
        return false;
      } else {
        opt();
      }

      function opt(){
          var option = {
            'id' : 'modal_tip',
            'title':'活动提示',
            'content' : '需要消耗您1000彩豆，确定摇一摇吗？',
            'btn_close_title' : '取消',
            'btn_save_title':'确定'
          }
          Modal.modal(option,yao);      
          $('#modal_tip .modal-footer').prepend('<div class="checkbox"><label class="nomore"><input id="check" type="checkbox">  不再提示</div>');
          return false;

          function yao(){
            $('.btn_save').click(function(event){
              event.preventDefault();
              $('.modal').modal('hide');
              yao1();
              if($("#check").is(':checked') == true){
                $.cookie('the_cookie', "ci");
              } else {
                $.cookie('the_cookie', null);
              }
            });
          }
      }
       

      function yao1(){
        if (clicktag == 0) {  
            clicktag = 1; 
            var beep = $("#beep-one")[0];
            beep.currentTime = 0;
            beep.play();
            start_lottery();
            setTimeout(function () { clicktag = 0; }, 8000);  
          }
      }
  }); 
  
  reHeight();
});
/**窗口自适应**/
$(window).resize(function() {
    reHeight();
});
/**自适应页面高度**/
function reHeight(){
  var w = $(window).width()
  $('.resize').height($(window).height());
  var w1 = $('.main').width(w);
  $('.main').css('marginLeft','-' + w/2 + 'px');
  
}
//滚动新闻 
function scrollNews() { 
  var n = $('.scrollNews > ul'); 
  var h = n.find('li:first').height(); 
  n.animate({ 'marginTop': - h + 'px' }, 600, function () { 
    n.css({ margin: 0 }).find('li:first').appendTo(n); 
  }); 
} 

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
      'title':'游戏规则',
      'content' : '<div class="role_c"><h3>一、活动时间</h3><p>2015年12月11日至22日，共12天</p><h3>二、活动周期</h3><p>　　动物总动员全天开奖84期为一个活动周期，整个活动分12个周期进行。</p><h3>三、奖项设置</h3><p>　　<strong>（一）动物王PK奖</strong><br />　　参与用户通过“动物总动员投注体验”页面进行投注，动物总动员全天开奖结束后（一个周期），统计用户剩余的虚拟中奖总金额，并按中奖总金额进行排名，若出现并列名次则按提交成功时间先后进行排名。每个活动周期中奖金额排名前55名即可获得动物王PK奖。<br />　　每个活动周期中奖总金额排名前5名用户即获得一等奖，依次轮推。<strong>每个活动周期设一等奖5名，各奖励5g千足金毛泽东像章一枚；二等奖20名，各奖励300元移动话费；三等奖30名，各奖励200元移动话费。</strong><br /><br />　　<strong>（二）运气大比拼抽取幸运奖</strong><br />　　用户参与活动，且未获动物王PK奖，每轮活动周期微信平台通过电子抽奖的方式抽取幸运奖名单。每个活动周期抽取幸运奖40名，各奖励100元移动话费。<br />　　<strong>整个活动设置一等奖60名，二等奖240名，三等奖名，四等奖360名，幸运奖480名。</strong></p><h3>四、活动规则</h3><p><strong>　　1、本活动仅限归属地为湖南省内的手机用户参与。</strong><br />　　2、用户通过搜索 “ 湖南福彩 ” 公众号或扫描湖南福彩微信二维码关注 “ 湖南福彩 ” 官方微信的均可参与。<br />　　3、活动入口：<br />　　　　1）发送 “ 动物总动员 ” 至湖南福彩官方微信，系统会自动回复活动链接，点开链接进入活动页面。<br/>　　　　2）在官方微信底部菜单栏有 “ 新闻公告 ” ，选择 “ 动物总动员模拟投注 ” ，进入活动页面。<br />　　4、用户根据页面提示进行 “ 动物总动员模拟投注 ” 。页面包括动物总动员玩法规则介绍、中奖记录、投注记录、历史开奖记录以及动物总动员走势图等多个功能按钮，用户可点开查看和使用。<br />　　5、用户参与模拟投注后，系统每周期（动物总动员一天开奖为一周期）赠送2000虚拟币作为活动当期投注金。<strong>每天转发一次 “ 动物总动员模拟投注体验 ” 活动页面到朋友圈或朋友，系统即赠送2000虚拟币作为活动当期的投注金，</strong>若您不参与投注活动或未使用完毕，虚拟币则在动物总动员当周期开奖后自动清零。<br />　　6、用户在进行模拟投注时消耗的金额将先从系统赠送的虚拟币中扣除，赠送虚拟币扣除完毕后，再从用户的虚拟中奖金额中扣除，一个周期结束后，虚拟币和中奖金额都清零。<br />　　7、模拟投注体验活动的投注方式、开奖时间等流程均与我省福彩 “ 快乐十分之动物总动员 ” 的真实流程相同。每10分钟开奖一次，每天开奖84期（9：00—23:00）。</p><h3>五、活动须知</h3><p>　　（一）参与者已经详细阅读并理解本次活动的规则，对活动规则没有异议。<br /><br />　　（二） 每周期结束后，中奖结果将在湖南福彩网、湖南福彩官方微信上予以公布。<br /><br />　　（三） 中奖名单公布后3个自然日内，获奖者须按照湖南福彩官方微信平台向中奖者发送中奖信息登记要求完成中奖确认登记，如逾期未登记或无法联系上的，将视为自动弃奖。获得一等奖的用户需通过湖南福彩官方微信完成身份证号码、手机号码、邮寄地址（详细地址）、邮政编码的登记并上传身份证照片，如逾期未登记或无法联系上的，将视为自动弃奖。获得移动话费的用户充值话费必须提供归属地为湖南省内的移动电话号码，否则话费无法赠送到位，若不提供者视为弃奖。<br /><br />　　（四） 湖南省福利彩票发行中心将通过申通快递向获得一等奖者的用户邮寄奖品，邮寄将采用贵重物品保价并回寄签收单的方式。因邮寄信息错误导致奖品退回的，视为弃奖。获得移动话费的用户，中奖话费将于活动结束后15日内充值到用户提供的手机号码中。<br /><br />　　（五） 本活动详情请登录湖南福彩网或拨打咨询热线0731-89735644。</p></div>',
      'btn_close_title' : '关闭'
    }
    Modal.modal(option);
    return false;
  }); 

   //排名
   $('.fa-chevron-circle-left').addClass('no');
   $('.list_c table tr').eq(1).find('td').css({'background':'#bf1313','color':'#fff'})
   $(document).on('click','.fa-chevron-circle-right',function(){

     $('.fa-chevron-circle-left').removeClass('no');
     var cla = $('table:visible').attr('class');
     var a = parseInt(cla.replace(/[^0-9]/ig,""));

     if(a < 12){
       $('.list_' + a).hide();
       $('.list_' + (a+1)).show().find('tr').eq(1).find('td').css({'background':'#bf1313','color':'#fff'});
       $('.n').text(a+1);
       if(a == 11){
         $(this).addClass('no');
       }
     }
    
   });
   $(document).on('click','.fa-chevron-circle-left',function(){

     $('.fa-chevron-circle-right').removeClass('no');
     var cla = $('table:visible').attr('class');
     var a = parseInt(cla.replace(/[^0-9]/ig,""));
     if(a > 1){
       $('.list_' + a).hide();
       $('.list_' + (a-1)).show().find('tr').eq(1).find('td').css({'background':'#bf1313','color':'#fff'});
       $('.n').text(a-1);
       if(a == 2){
         $(this).addClass('no');
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
}

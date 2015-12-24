
$(function(){

  //进入活动界面
  $(document).on('click', '#inActive', function() {
    $('#content').show();
    $('#container').hide();
    $(this).addClass('hover').siblings().removeClass('hover');
  });

  //玩法选择
  $(document).on('click', '#active1', function() {
    $('.imgs p').eq(0).show().siblings().hide();
  });
  $(document).on('click', '#active2', function() {
    $('.imgs p').eq(1).show().siblings().hide();
  });
  $(document).on('click', '#active3', function() {
    $('.imgs p').eq(2).show().siblings().hide();
  });
  $(document).on('click', '#active4', function() {
    $('.imgs p').eq(3).show().siblings().hide();
  }); 

  //活动规则
  $(document).on('click','#role',function(){
    var option = {
      'id' : 'modal_role',
      'title':'游戏规则',
      'content' : '<div class="role_c"><p><span>一、活动时间</span><br />　2015年11月1日至12月31日,共61天。</p><p><span>二、活动奖品</span><br />　一等奖3名：便携笔记本电脑 ThinkPad X250（20CLA0KJCD）<strong>（价值6500元）</strong><br />　二等奖5名：联想昭阳笔记本电脑E40-80<strong>（价值3200元）</strong><br />　三等奖15名：超薄相机 佳能（Canon）IXUS170<strong>（价值1000元）</strong></p><p><span>三 、活动内容</span><br />　活动期间，凡在贵州省内投注站购买双色球、3D、快3、七乐彩游戏单票金额超过20元（含20元）的彩民，均可通过贵州福彩官方微信报名参与活动。</p><p><span>四、参与方式</span><br />　1、彩民通过搜索微信号GZ_FLCP关注贵州福彩官方微信<br />　2、关注成功后，在微信对话窗口发送文字“十五周年”，系统将回复活动简介，并有“活动登记”按钮，点击进入活动登记页面。<br />　3、彩民在活动登记页面完成参与活动的彩票信息、姓名、手机号码登记工作。<br /><br />　<strong>提示：<br />　　一个微信号、一个手机号可登记多张彩票，中奖几率更大，一张彩票只能登记一次。</strong></p><p><span>五、活动抽奖</span><br />　2016年1月6日，贵州省福利彩票发行中心将在公证机构的监督下对成功入围的彩票进行抽奖，从入围彩票中抽取一、二、三等奖的获奖彩票，并根据获奖彩票获取对应获奖者。若单人中得多个奖等，可兼中兼得。</p><p><span>六、获奖名单公布</span><br />　2016年1月8日，省福彩中心将通过官方微信、官方网站及《贵州都市报》公布获奖者名单。</p><p><span>七、活动要求</span><br />　中奖用户需在获奖者名单公布后5个工作日内，登陆贵州福彩官方微信完成姓名、身份证号码、收件地址、手机号码等登记工作，如逾期未登记或无法联系上的，将视为自动弃奖。</p><p></p><span>八、活动奖品发放</span><br />　省福彩中心将通过邮政EMS向获奖者邮寄奖品。邮寄将采用贵重物品保价、并回寄签收单的双向邮递方式。</p></div>',
      'btn_close_title' : '关闭'
    }
    Modal.modal(option);
    return false;
  }); 

  //提交
  $(document).on('click','#submit',function(){
    var number = $('#numberCheck').val();
    var numberSerial = $('#numberSerial').val();
    //如果表单为空，提示用户
    if(number == ""){
     //显示错误提示信息
     var errorMsg = " * 投注机号不允许为空 ";
     $('#numberCheck').next().html(errorMsg);
     return false;
    } else {
        var reg = /^\d{8}$/;
        if(reg.test(number)){
          var errorMsg = "";
          $('#numberCheck').next().html(errorMsg);
        } else {
          var errorMsg = " * 请输入有效的8位数字投注机号 ";
          $('#numberCheck').next().html(errorMsg);
          return false;
        }
         
    }
    if(numberSerial == ""){
     //显示错误提示信息
     var errorMsg = " * 流水号不允许为空 ";
     $('#numberSerial').next().html(errorMsg);
     return false;
    } else {
      var reg = /^\d+$/;
      if(reg.test(numberSerial)){
         var errorMsg = "";
         $('#numberSerial').next().html(errorMsg);
      } else {
         var errorMsg = " * 请输入有效的数字 ";
         $('#numberSerial').next().html(errorMsg);
         return false;
      }
    }
    var option = {
      'id' : 'modal_submit',
      'title':'提示',
      'content' : '<p class="submit_r">恭喜您，已成功报名参加幸运大抽奖，如果您有其它彩票满足条件，可继续登记参与，中奖几率更大哦！</p>',
      'btn_close_title' : '关闭'
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
  $('.resize').height($(window).height());
}
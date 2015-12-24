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
      'content' : '<div class="role_c"><h1>　　为配合双色球游戏6亿元大派奖活动，同时进一步开发双色球市场，发展新彩民，计划在官方微信服务号开展 “双色球模拟投注体验”抽奖活动。具体活动方案如下：<br />　　福彩双色球游戏具有大奖大，小奖多的特点，深受广大彩民喜爱，恰逢双色球游戏6亿元派奖期间，特在广西福彩官方微信公众号举办“双色球模拟投注体验”抽奖活动，活动将参照中国福利彩票“双色球”的真实投注方式、开奖时间、派奖等流程，让您真实体验到双色球所带来的快乐与幸运。动动手指，参与活动拿奖金。</h1><p><span>一、活动时间</span>　　2015年11月2日至11月29日</p><p><span>二、活动设奖</span><strong>运气大比拼抽奖：</strong>　　运气大比拼分4个周期进行，每个比拼周期参照真实双色球游戏三个销售期的投注、开奖时间和派奖流程。参与用户通过“双色球模拟投注体验”页面进行投注，双色球三次开奖后（一个周期），统计用户剩余的虚拟中奖总金额，在每个活动周期排名前100名用户中抽出红色快乐奖5名，各奖励2000元现金；蓝色幸运奖20名，各奖励500元现金。<br />　　运气大比拼周期时间：<br />　　第一期：11月2日-11月8日<br />　　第二期：11月9日-11月15日<br />　　第三期：11月16日-11月22日<br />　　第四期：11月23日-11月29日<br /><strong>每周期结束后的次日，通过电子抽奖的方式抽取获奖名单。</strong></p><p><span>三、活动规则：</span>　　1、用户通过搜索“广西福彩”公众号或扫描广西福彩微信二维码关注“广西福彩”官方微信的均可参与。<br />　　2、活动入口：<br />　　　1）发送“双色球”至广西福彩官方微信，系统会自动回复活动链接，点开链接进入活动页面。<br />　　　2）在官方微信底部菜单栏有“新闻公告”，选择“双色球模拟投注”，进入活动页面。<br />　　3、用户注册登记个人信息，包括姓名和手机号码，务必填写真实有效的手机号码，作为唯一领奖凭证。<br />　　4、用户根据页面提示进行“双色球模拟投注”。页面包括双色球玩法规则介绍、中奖记录、投注记录、历史开奖记录以及双色球走势图等多个功能按钮，用户可点开查看和使用。<br />　　5、用户参与模拟投注后，系统每个开奖周期赠送2000虚拟币作为活动当个开奖期投注金。每天首次转发“双色球模拟投注体验”抽奖活动页面到朋友圈或朋友，系统额外赠送2000虚拟币作为活动当期的投注金，除了中奖虚拟币其余的虚拟币都在双色球当期开奖后自动清零。<br />　　6、用户在进行模拟投注时消耗的金额将先从系统赠送的虚拟币中扣除，赠送虚拟币扣除完毕后，再从用户的虚拟中奖金额中扣除，一个活动周期（三个开奖周期）结束后，虚拟币和中奖金额都清零。<br />　　7、活动排名按中奖总金额进行排名，可以并列！<br />　　8、模拟投注体验活动的投注方式、开奖时间、派奖奖额等流程一切均与中国福彩双色球的真实流程相同。<br />　　9、一个周期内，红色快乐奖及蓝色幸运奖，不可兼中兼得。</p><p><span>四、活动须知</span>　　（一）参与者已经详细阅读并理解本次活动的规则，对活动规则没有异议。<br />　　（二）每周期结束后，抽奖结果在广西福彩中心官方微信公众号、官方网站、有关报纸专栏中公布。<br />　　（三）中奖用户须于抽奖结果公布日起在7个工作日内联系广西福利彩票发行中心进行中奖确认登记（电话：0771-5878381转3），逾期没有进行中奖确认的视为弃奖。<br />　　（四）活动结束后，中奖奖金统一发放。<br />　　（五）本活动最终解释权归广西福利彩票发行中心所有。</p></div>',
      'btn_close_title' : '关闭'
    }
    Modal.modal(option);
    return false;
  }); 

  //本期排名
  $(document).on('click','#list',function(){
    var option = {
      'id' : 'modal_list',
      'title':'本期排名',
      'content' : '<div class="list_c"><table class="table table-striped"><tr><th>名次</th><th>昵称</th><th>总中奖彩豆</th><th>剩余彩豆</th></tr><tr><td>10</td><td>自己</td><td>10000</td><td>100000</td></tr><tr class="fd"><td>1</td><td>bbb</td><td>100</td><td>10</td></tr><tr ><td>2</td><td>aabbcc</td><td>1000</td><td>10</td></tr><tr class="fd"><td>3</td><td>aaa</td><td>10</td><td>10</td></tr><tr ><td>4</td><td>ddd</td><td>999</td><td>10</td></tr><tr class="fd"><td>5</td><td>aaa</td><td>10</td><td>10</td></tr><tr ><td>6</td><td>ddd</td><td>999</td><td>10</td></tr><tr class="fd"><td>7</td><td>aaa</td><td>10</td><td>10</td></tr><tr ><td>8</td><td>ddd</td><td>999</td><td>10</td></tr><tr class="fd"><td>9</td><td>aaa</td><td>10</td><td>10</td></tr><tr ><td>10</td><td>ddd</td><td>999</td><td>10</td></tr><tr class="fd"><td>11</td><td>aaa</td><td>10</td><td>10</td></tr><tr ><td>12</td><td>ddd</td><td>999</td><td>10</td></tr><tr class="fd"><td>13</td><td>aaa</td><td>10</td><td>10</td></tr><tr ><td>14</td><td>ddd</td><td>999</td><td>10</td></tr><tr class="fd"><td>15</td><td>aaa</td><td>10</td><td>10</td></tr></table></div>',
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
  var w = $(window).width() - 100 + 'px';
  var h = $(window).height();
  $('.main').width(w);
  $('.main').height(h);
  $('.main').css({'marginLeft':'-' + parseInt(w)/2 + 'px'})
}
var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        mousewheelControl: true,
    onSlideChangeStart : function(swiper){
      if(swiper.activeIndex > 0)
      {
        $('div.arrow').hide();
        //球弹出来
        $('#prize li').eq(0).addClass('ballLeft');
        $('#prize li').eq(1).addClass('ballDown');
        $('#prize li').eq(2).addClass('ballRight');
        $('#prize li').eq(3).addClass('ballLeft');
        $('#prize li').eq(4).addClass('ballDown');
        $('#prize li').eq(5).addClass('ballRight');
        $('#prize li').eq(6).addClass('ballUp');
      }
      else
      {
        $('div.arrow').show();
        //球弹出来
        $('#prize li').eq(0).removeClass('ballLeft');
        $('#prize li').eq(1).removeClass('ballDown');
        $('#prize li').eq(2).removeClass('ballRight');
        $('#prize li').eq(3).removeClass('ballLeft');
        $('#prize li').eq(4).removeClass('ballDown');
        $('#prize li').eq(5).removeClass('ballRight');
        $('#prize li').eq(6).removeClass('ballUp');
        $('#prize li p').empty().append('<span></span>');
        $('#tip').css('visibility','hidden');
        
      }
    }
    });

$(function(){

   //双色球翻转
    var i = 0;
    var n = 1;
    $('#ssq_start').click(function(){
        $('#prize li p').empty().append('<span></span>');
        $('#tip').css('visibility','hidden');
        $('#prize li span').addClass('hover');
        $('#prize li p').addClass('hover');
        if(i == 2*n){
          setTimeout(function(){
            $('#prize li span').removeClass('hover');
            $('#prize li p').removeClass('hover');
            $('#tip').text("恭喜获得走近双色球免费北京游入围名单").css('visibility','visible');
            i++;
            n++;
          },2000);
        } else{
          setTimeout(function(){
            $('#prize li span').removeClass('hover');
            $('#prize li p').removeClass('hover');
            var m1 = createRandom2(1 , 1 , 16);
            var m2 = createRandom2(6 , 1 , 33);
            $('#prize li').eq(6).find('p').text(m1);
            $('#prize li').eq(0).find('p').text(m2[0]);
            $('#prize li').eq(1).find('p').text(m2[1]);
            $('#prize li').eq(2).find('p').text(m2[2]);
            $('#prize li').eq(3).find('p').text(m2[3]);
            $('#prize li').eq(4).find('p').text(m2[4]);
            $('#prize li').eq(5).find('p').text(m2[5]);
            var mz = m1[0] + m2[0] + m2[1] + m2[2] + m2[3] + m2[4] + m2[5];
            $('#tip').text("恭喜您获得 " + mz + " 彩豆").css('visibility','visible');
            i++;
          },2000);
      }
    }); 

    



    //游戏规则
   $(document).on('click','#game',function(){
    var option = {
      'id' : 'modal_game',
      'title':'游戏规则',
      'content' : '<p class="game_tip"><span class="title_big">一、活动内容</span><br />　　广西福彩官方微信开展“转动双色球带您游北京”抽奖活动，凡关注广西福彩官方微信的用户，均可参与，并有机会获得参加“走近双色球免费北京游”活动名额，而后福彩带您免费游北京看双色球开奖。<br /><br /><span class="title_big">二、活动时间</span><br />2015年8月27日至9月20日,共分五期进行。<br />第一期：8月27日-8月31日<br />第二期：9月01日-9月05日<br />第三期：9月06日-9月10日<br />第四期：9月11日-9月15日<br />第五期：9月16日-9月20日<br /><br /><span class="title_big">三、  活动奖项设置</span><br />特等奖：免费北京游　5个/期<br />一等奖：价值100元刮刮乐彩票　10个/期<br />二等奖：价值50元刮刮乐彩票　20个/期<br />三等奖：500个彩豆　30个/期<br /><br /><span class="title_big">四、  活动规则</span><br />1、用户需关注广西福彩微信公共账号才可以参加“转动双色球带您游北京”抽奖活动，每天有三次入围的机会，分享朋友圈后可再获得一次翻转双色球的入围抽奖的机会。<br />2、用户可通过两个入口进入游戏：<br />　　1）用在官方微信对话窗口发送文字“走近双色球”，系统将回复活动简介，点击进入活动页面；<br />　　2）在底部菜单栏点击“新闻公告”，选择“走近双色球”进入活动页面；<br />3、用户在活动页面设置为7个双色球图片，点击翻转双色球，翻转结果有两种：<br />　　1)“恭喜获得走近双色球免费北京游入围名单” <br />　　2)双色球号码，并随机赠送10-50彩豆；<br />4、 每期结束后的次日，通过电子抽奖的方式在获得入围抽奖资格的用户中产生参加“走近双色球免费北京游” 活动名额及其它奖项。在100名入围名单中抽取，5名特等奖，10名一等奖，20名二等奖，30名三等奖。<br />5、用户按页面要求注册信息，务必填写真实有效的手机号码，作为唯一领奖凭证。<br /><br /><span class="title_big">五、  活动须知</span><br />1、特等奖不能兼中兼得。<br />2、每期结束后，中奖结果在广西福彩中心官方网站、有关报纸专栏中公布。<br />3、中奖用户须于抽奖结果公布日起在7个自然日内联系广西福利彩票发行中心进行中奖确认登记并兑奖，逾期没有进行中奖确认的视为放弃兑奖权利。</p>',
      'btn_close_title' : '关闭'
    }
    Modal.modal(option);
    return false;
  }); 

   //切换
   $('.list_page article li').eq(0).addClass('active');
    $('.list_page article li').click(function(){
       var index = $(this).index() + 1;
       $(this).addClass('active').siblings().removeClass('active');
       $('.list_' + index).show().siblings().hide();
    });

    //分享
  $(document).on('click','#share',function(){
    $('#mscover').show();
    setTimeout(function () {
        $("#mscover").hide();
    }, 8000);
  });
  $(document).on('click','#mscover',function(){
    $(this).hide();
  });

  //预约下一期
  $(document).on('click','.bot a',function(){
     var option = {
      'id' : 'modal_next',
      'title':'预约下一期',
      'content' : '<p class="next_sucess">预约成功，我们将在下一期提前1小时给您消息！</p>',
      'btn_close_title' : '关闭'
    }
    Modal.modal(option);
    return false;
  });


  reHeight();
});
/**随机数**/
function createRandom2(num , from , to){
  var arr=[];
  var json={};
  while(arr.length<num){
      //产生单个随机数
      var ranNum=Math.ceil(Math.random()*(to-from))+from;
      //通过判断json对象的索引值是否存在 来标记 是否重复
      if(!json[ranNum]){
          json[ranNum]=1;
          arr.push(ranNum);
      }
  }
  return arr;
} 
/**窗口自适应**/
$(window).resize(function() {
    reHeight();
});
/**自适应页面高度**/
function reHeight(){
  $('.list_c').height($(window).height()-220);
  $('.wrapper_info').width($(window).width()-60);
  $('.wrapper_info').height($(window).height()-540);
  $('.blank img').height($(window).height());
}
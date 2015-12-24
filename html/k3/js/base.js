var option = {
  "body": '<h1>本次购买需要消费<em class="rr">6</em>彩豆,您确定购买吗？</h1>',
  "url": "success.html",
  btn_save_title: '确认',
  btn_close_title: '取消'
}
Modal.init(option);
$(function(){
  $(document).on('click','.immediate',function(){
    $('.modal').modal();
  });
  /**遗漏显示隐藏**/
  $(document).on('click','.omit',function(){
    $(this).toggleClass('hover');
    $('.sel_wrap:visible').find('.yi_num').toggle();
  });
  /**选择和值--二同号单选select**/
  var val=$('#sel_c').val();
  $('#sel_1').show();
  $(document).on('change','#sel_c',function(){
    var i=$('option:selected',$(this)).index()+1;
    $('#sel_'+i).show().siblings().hide();
  });
  /**点击加样式**/
  var num = new Array();
  $(document).on('click','.sel_cc li',function(){
    $(this).toggleClass('hover');
    $(this).children().addClass('hover');
    $('a.btn_g').addClass('active');
  });
  /**二同号单选**/
  $(document).on('click','#sel_2 li',function(){
    num.push($(this).text().substr(-1));
    var i;
    function isRepeat(num) {
       var hash = {};
       for(i in num) {
           if(hash[num[i]]){ return true; }
           hash[num[i]] = true;
        }
       return false;
    }
    if(isRepeat(num)){
      num.pop();
      $(this).removeClass('hover');
      alert('选择了相同号');
    }
    var erdan=$('#erdan li');
    var erdan2=$('#erdan2 li');
    if(erdan.hasClass('hover')&&erdan2.hasClass('hover')){
      $('a.btn_g').addClass('active');
    }else{
      $('a.btn_g').removeClass('active');
    }
  });
  /**三同号通选**/
  $(document).on('click','#sel_5 li',function(){
    $('#sel_5 li a').addClass('hover');
  });
  /**两不同号**/
  $(document).on('click','#sel_6 li',function(){
    if($(this).hasClass('hover')&&($('.hover').length-1)>1){
      $('a.btn_g').addClass('active');
    }else{
      $('a.btn_g').removeClass('active');
    }
  });
  /**三不同号**/
  $(document).on('click','#sel_7 li',function(){
    if($(this).hasClass('hover')&&($('.hover').length-1)>2){
      $('a.btn_g').addClass('active');
    }else{
      $('a.btn_g').removeClass('active');
    }
  });
  /**随机数**/
  $(document).on('click','#one',function(){
    var s=$('.sel_wrap:visible').find('li');
    if($('.sel_wrap:visible').attr('id')=='sel_2'){
      var m=createRandom2(2,0,s.length/2-1);
      $('#erdan li').removeClass('hover');
      $('#erdan2 li').removeClass('hover');
      $('#erdan li').eq(m[0]).addClass('hover');
      $('#erdan2 li').eq(m[1]).addClass('hover');
      $('a.btn_g').addClass('active');
    }
    else if($('.sel_wrap:visible').attr('id')=='sel_5'){
      $('.sel_wrap:visible li').addClass('hover');
      $('a.btn_g').addClass('active');
    }
    else if($('.sel_wrap:visible').attr('id')=='sel_6'){
      var m=createRandom2(2,0,s.length-1);
      $('.sel_wrap:visible li').removeClass('hover');
      $('.sel_wrap:visible li').eq(m[0]).addClass('hover');
      $('.sel_wrap:visible li').eq(m[1]).addClass('hover');
      $('a.btn_g').addClass('active');
    }
    else if($('.sel_wrap:visible').attr('id')=='sel_7'){
      var m=createRandom2(3,0,s.length-1);
      $('.sel_wrap:visible li').removeClass('hover');
      $('.sel_wrap:visible li').eq(m[0]).addClass('hover');
      $('.sel_wrap:visible li').eq(m[1]).addClass('hover');
      $('.sel_wrap:visible li').eq(m[2]).addClass('hover');
      $('a.btn_g').addClass('active');
    }
    else{
      var r=parseInt(s.length*Math.random());
      $('.sel_wrap:visible li').removeClass('hover');
      $('.sel_wrap:visible li').eq(r).addClass('hover').hide().fadeIn();
      $('a.btn_g').addClass('active');
    }
  });
/**注数和彩豆清零**/
  var zhu_n=$('#zhu_n');
  var caid_n=$('#caid_n');
  $(document).on('click','#empt',function(){
    zhu_n.text(0);
    caid_n.text(0);
  });
  /**中奖记录和投注记录切换**/
  $(document).on('click','#win',function(){
    $('#sel_win').show();
    $('#sel_tou').hide();
    $(this).addClass('hover').siblings().removeClass('hover');
  });
  $(document).on('click','#tou',function(){
    $('#sel_tou').show();
    $('#sel_win').hide();
    $(this).addClass('hover').siblings().removeClass('hover');
  });
  /**点击删除该条记录**/
  $(document).on('click', '.x', function(){
    $(this).parent().remove();
  });
    /**自适应页面高度**/
    reHeight();
  /**向下滑动**/
  $('.dd').click(function(){
    var a=$(this).parent().parent().parent().hasClass('in');
    $(this).addClass('glyphicon-menu-down');
  });

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
  $('.sel_hi').height($(window).height()-90);
  $('.sel_wrap').height($(window).height()-196);
  $('.over_auto').height($(window).height()-235);
  $('.sel_win').height($(window).height()-106);
  $('.share_bg').height($(window).height()).css('background','#f0eff4');
}
/*摇一摇*/

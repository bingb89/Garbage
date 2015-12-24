$(function(){

   var i = 0;

    //报名

   $('#submit').click(function(){

      i++;

      if(i <= 160){
          var option = {
            'id' : 'modal_submit',
            'title':'报名成功',
            'content' : '<p><span class="red">“恭喜您获得30元中福在线即开型彩票游戏分值，报名时间结束后请到中福在线彩票销售厅领取。</span><br />地址：南宁市葛村路23号福彩大厦一楼”</p>',
            'btn_close_title' : '关闭'
          }
          Modal.modal(option);
          return false;
        } else {
          var option = {
            'id' : 'modal_submit',
            'title':'报名失败',
            'content' : '<p>“您已微信登记报名成功，需到中福在线葛村路销售厅确认比赛名额，方可正式参加扑克牌比赛。”</p>',
            'btn_close_title' : '关闭'
          }
          Modal.modal(option);
          return false;
        }
    }
    
  }); 


   <script>
  $(function(){
     $(window).scroll(function(){
        if($(window).scrollTop() > 100){
          $('#head').css('top','0px');
        } else {
          $('#head').css('top','160px');
        }
     });
  })  
  
</script>

});
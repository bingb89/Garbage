$(function(){

   //弹出导航菜单
  $('.menu').each(function(){
    $('.menu').click(function(){
      $('.menu_down').toggle();
    });
  }); 

  $("*").click(function (event) {
      if (!$(this).hasClass("menu_down")&&!$(this).hasClass("menu")){
          $(".menu_down").hide();
      }
      event.stopPropagation();   
  });

  //
  // var m = $('.list_wrap').width();
  // var h = parseInt((m/8)*3) - 4;
  // $('.list_t').height(h);



  /*var imgSrc = $(".list_t img").attr("src");
  var m = $('.list_wrap').width();
  getImageWidth(imgSrc,function(w,h){
    // console.log({width:w,height:h});
    if(w/h != 4/3){
      h = parseInt(4/3)
    }
  });*/

   //切换
   $('.tab_menu li').eq(0).addClass('active');
    $('.tab_menu li').click(function(){
       var index = $(this).index() + 1;
       $(this).addClass('active').siblings().removeClass('active');
       $('.content_' + index).show().siblings('.tab_content').hide();
    });

  reHeight();
});

/**窗口自适应**/
$(window).resize(function() {
    reHeight();
});
/**自适应页面高度**/
function reHeight(){
  
  //首页一行放置两个
  if( $(window).width() > 1024){
    var m = $('.list_wrap').width($(window).width() / 2 - 20);
  } else {
    var m = $('.list_wrap').width($(window).width() / 2 - 11);
  }
  $('.sub_cr').width($(window).width() - 159 );
  var w = $(window).width();
  //轮播图
  $(".slider").slider({width:w,height:245,during:2000});
  $('.list_wrap').width($(window).width() / 2 - 11);
  

}

//
function getImageWidth(url,callback){
  var img = new Image();
  img.src = url;
  if(img.complete){
      callback(img.width, img.height);
  }else{
      img.onload = function(){
        callback(img.width, img.height);
      }
  }
}

//转盘token
var pan_token = 'f9e6c6d1d28233f9d32b016d65c6aeb6';

var save_token  = '79733df5a9f21cf4b7baf8d3b834e474';

var salt    = '0LpaYKYI';

(function(win){   
  var res   = [{id:'arrow',size:16,src:'images/arrow.png'},{id:'pan',size:174,src:'images/pan_c.png'}]; 
  
  if(Q.isWebKit && Q.supportTouch)
  {
    document.body.style.webkitTouchCallout = "none";
    document.body.style.webkitUserSelect = "none";
    document.body.style.webkitTextSizeAdjust = "none";
    document.body.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
  }

  var Luck = Quark.Luck = function(){
    Luck.superClass.constructor.call(this);
    //容器宽度
    this.width    = 0;
    //容器高度
    this.height   = 0;
    //x方向缩放比例
    this.xrate    = 1;
     //y方向缩放比例
      this.yrate    = 1;
    //比例
    this.rate   = 1;
    //加载图像
    this.images   = null;
    //加载图片的进度条
    this.loader   = null;       
  }
  
  Quark.inherit(Luck, Quark.EventDispatcher);
  
  Luck.prototype.init = function(){
    //手机宽
    this.width  = Q.isMobile ? $(win).width() : 400;    
    //手机高
    this.height = Q.isMobile ? $(win).height() : 630;   
    //x轴比例
    this.xrate = this.width / 400;
     //y方向缩放比例
      this.yrate = this.height / 630;
    
    var imageres = null;    
        
    //设置手机容器的宽高全屏
      /*$('.ly-plate').css({
      position  : 'absolute',
      left    : '0px',
      top     : '0px',
      width   : this.width + 'px', 
      height    : this.height + 'px'
      });*/
    
    var ww = this.width;
    
    //横屏
    if(this.width > this.height)
    {
      ww = this.height;
    }
    
    //加载进度条
      if($('.loading').length == 0){      
      this.loader = $('<div class="loader"></div>');    
      this.loader.css({
        position  : 'absolute',
        width     : this.width + 'px',
        left    : '0px',
        top     : (this.height >> 1) + 'px',
        'text-align': 'center',
        'color'   : '#fff'        
      });
      $('.ly-plate').after(this.loader);
      }
    
    var loader = new Q.ImageLoader();
    loader.addEventListener("loaded", Q.delegate(this.onLoadLoaded, this));
    loader.addEventListener("complete", Q.delegate(this.onLoadComplete, this));             
    loader.load(res);   
            
  }
  
  Luck.prototype.onLoadLoaded = function(e){
    this.loader.html('<i class="fa fa-refresh fa-spin" style="font-size:21.5px"></i><br>');
      this.loader.html(this.loader.html() + Math.round(e.target.getLoadedSize()/e.target.getTotalSize()*100) + "%");
  }
  
  Luck.prototype.onLoadComplete = function(e){    
    e.target.removeAllEventListeners();
      this.loader.remove();
      this.loader = null;
      this.images = e.images;
    this.start();   
  }
  
  Luck.prototype.getImage = function(id)
  {
    return this.images[id].image;
  } 
  
  Luck.prototype.start = function(){                
    if($('#pan').length == 0){
      var pan = this.getImage('pan');           
      $('.rotate-bg').append(pan);
      var length  = $(pan).width();
      var cww   = $('.rotate-bg').width();
      this.rate   = length/400;     
      var offset  = (cww - length) / 2;
      
      $(pan).attr('id','pan').css({
        left  : offset + 'px',
        top   : offset + 'px'
      });
    }
    
    if($('#arrow').length == 0){
      var arrow = this.getImage('arrow');                 
      $('.lottery-star').append(arrow);           
      var length  = $(arrow).width() * this.rate;           
      var cww   = $('.lottery-star').width();
      var offset  = (cww - length) / 2;
      
      $(arrow).attr('id','arrow').css({
        left  : offset + 'px',
        top   : offset + 'px',
        height  : length + 'px',
        width   : length + 'px'
      });
    }   
  }
  
  Luck.prototype.rotateFunc = function(prizeid,angle,text,isinfo){    
    $('#pan').stopRotate();
    $("#pan").rotate({
      angle:0, 
      duration: 4000,     
      animateTo: angle+1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。
      callback:function(){        
        if(prizeid == 99){
          text = '<p>很遗憾，你没有抽中奖，谢谢您的参与!</p>';
        }else if(prizeid < 99 && prizeid > 0){
          text = '<p>duang..duang.., 恭喜您抽中了<b>'+text+'</b>彩豆</p>';
          if(isinfo)
          {
            text += '<p>请认真填写以下信息，姓名、身份证、地址等信息登记工作，这将是您领奖的唯一凭证哦！如逾期未登记的或无法联系上的，将视为彩民自动弃奖！</p><div class="form-group"><label class="sr-only" for="truename">姓名</label><input type="text" class="form-control" id="truename" name="truename" placeholder="姓名" value="'+truename+'" datatype="*" nullmsg="姓名不能为空"></div><div class="form-group"><label class="sr-only" for="address">地址</label><input type="text" class="form-control" id="address" name="address" placeholder="地址" value="'+address+'" datatype="*" nullmsg="地址不能为空"></div><div class="form-group"><label class="sr-only" for="idcard">身份证</label><input type="text" class="form-control" id="idcard" name="idcard" placeholder="身份证" value="'+idcard+'" datatype="idcard" nullmsg="身份证号不能为空" errormsg="请输入18位的有效身份证号码"></div>';
          }                   
        }else{
          text = '<p>亲,非法操作哦</p>';
        }       
        $('#myModal').data('bodyhtml',text);                
        $('#myModal').modal({backdrop : 'static', keyboard : false, show : true});
        
        $.ajax('http://sctech.uplott.com/act/turnplate/save',{
          type  : 'POST',
          data  : {token : save_token},
          cache : false
        }).done(function(data){         
          var footer = $('#myModal').find('.modal-footer');   
          if(prizeid < 99 && prizeid > 0)
          {
            if(isinfo)
            {
              footer.html('<button id="send" data-loading-text="保存中..." class="btn btn-primary" autocomplete="off">提交信息</button>');
            }else{
              footer.html('<button type="button" class="btn btn-default" data-dismiss="modal">再玩一次</button>');
            }           
          }
          else
          {
            footer.html('<button type="button" class="btn btn-default" data-dismiss="modal">再玩一次</button>');
          }
          $('#myModal').on('hidden.bs.modal', function (e) {    
            location.reload();
           });
        });     
      }
    });
  }
  
  Luck.prototype.timeout = function(){
    $("#pan").rotate({
      angle:0, 
      duration: 10000, 
      animateTo: 2160, //这里是设置请求超时后返回的角度，所以应该还是回到最原始的位置，2160是因为我要让它转6圈，就是360*6得来的
      callback:function(){
        //alert('网络超时');
        location.reload();
      }
    });
  } 
  //$(win).resize(function(){location.reload();});
})(window);


var yyl = new Q.Luck();   
yyl.init();
play();
function play(){
  $(document).one('click','#arrow',function(){
    $.ajax('http://sctech.uplott.com/act/turnplate/pan',{
      type  : 'POST',
      data  : {token : pan_token},
      cache : false,
      timeout : 9500,
      beforeSend: function ( xhr ) {
        yyl.timeout();
      },
      dataType: 'json'
    }).done(function(data){
      if(data.status == 'n'){
         $('#myModal').data('bodyhtml',data.info);                
         $('#myModal').on('show.bs.modal', function (e) {   
          var footer = $('#myModal').find('.modal-footer');
          footer.html('<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>');      
        });          
         $('#myModal').modal();
         $('#myModal').on('hidden.bs.modal', function (e) {   
          location.reload();
         });
      }
      else
      {
        yyl.rotateFunc(data.prizeid,data.angle,data.text);
      }
    });
  });
}

$('#myModal').on('show.bs.modal', function (e) {    
  var title = $('#myModal').find('.modal-title');
  var bodys = $('#myModal').find('.modal-body');
  var footer = $('#myModal').find('.modal-footer');
  title.html('温馨提示');
  bodys.html($('#myModal').data('bodyhtml'));
  footer.html('<a href="javascript:;" class="btn btn-primary disabled" role="button"><i class="fa fa-refresh fa-spin"></i> 正在保存</a>');      
});

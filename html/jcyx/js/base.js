$(function(){
	//是否有条件参加该游戏
	$(document).on('click','#index article',function(){
		var i = 0;
		if(i > 0){
			var option = {
				'id' : 'modal_articel',
				'content' : '抱歉！您已经参加过了。',
				btn_close_title: '关闭'
			}
			Modal.modal(option);
			return false;
		} else {
			$('#main').show().siblings('div').hide();
			return false;
		}

	});
	//即将开始弹出
	$(document).on('click','#soon article',function(){
		var option = {
			'id' : 'modal_soon',
			'title':'提示',
			'content' : '<p class="games_tip">抱歉！竞猜游戏还未开始，请耐心等待！</p>',
			'btn_close_title' : '关闭'
		}
		Modal.modal(option);
		return false;
	});
	//详情页弹出游戏规则
	$(document).on('click','#games',function(){
		var option = {
			'id' : 'modal_games',
			'title':'游戏规则',
			'content' : '<p class="games_tip">游戏规则正在整理中……</p>',
			'btn_close_title' : '关闭'
		}
		Modal.modal(option);
		return false;
	});
	//详情页选择选项
	$(document).on('click','#main .main_select',function(){
		$('.main_select').each(function(){
			$(this).removeClass('active');
			$(this).removeClass('active');
		});
		$(this).addClass('active');
		$(this).addClass('active');

	});
	//详情页选择彩豆
	$(document).on('click','.dropup ul li',function(){
		var n = $(this).attr('n');
		if(n == 0){
			var w = $('.btn-warning').width();
			$('.dropdown-menu').hide();
			$('.btn-warning').hide();
			$('.dropup h3').addClass('show');
			$('.d_toggle').width(w + 100 + 'px');
		} else {
			$('.btn-warning em').text(n);
			$('.btn_a a').text('立即竞猜 ' + n + ' 彩豆');
		}
	});
	//其他数量的彩豆
	$('#input_num').keyup(function(){
		texts();
	});
	$('#input_num').blur(function(){
		texts();
	})
	function texts(){
		var tt = $('#input_num').val();
		$('.btn_a a').text('立即竞猜 ' + tt + ' 彩豆');
		$('.btn_a a').attr('limit',8)
		if( $(window).width() <= 320 && tt > 999){
		     $("[limit]").limit();
		}
	}
	//立即竞猜
	$(document).on('click','#go',function(){
		var v = $(this).find('a').text();
		if(v.match(/\d+/g)){
			var n = 1;
			if(n == 1){
				var option = {
					'id' : 'modal_games',
					'title':'提示',
					'content' : '<p class="failure"><i class="fa fa-frown-o mr10"></i>竞猜失败！您的彩豆数量不足</p>',
					'btn_close_title' : '关闭'
				}
				Modal.modal(option);
				return false;
			} else {
				var option = {
					'id' : 'modal_games',
					'title':'提示',
					'content' : '<p class="okodd"><img src="images/ye.png" class="mr10" alt="耶,竞猜成功！"> 竞猜成功！请等待开奖通知</p>',
					'btn_close_title' : '关闭'
				}
				Modal.modal(option);
				return false;
			}
		} else {
			var option = {
				'id' : 'modal_games',
				'title':'提示',
				'content' : '<p class="games_tip">您还没有输入彩豆数量</p>',
				'btn_close_title' : '关闭'
			}
			Modal.modal(option);
			return false;
		}
	});
	//弹出留言框modal
	$(document).on('click','#public',function(){
		var option = {
			'id' : 'modal_games',
			'title':'发表留言',
			'content' : '<textarea id="myarea" class="form-control" onKeyUp="keypress2()" onblur="keypress2()"></textarea><p class="text-right num_pub"><label id="pinglun">0 / 60</label></p> ',
			'btn_close_title' : '取消',
			'btn_save_title' : '发送'
		}
		Modal.modal(option);
		$('.modal .btn_save').show();
		return false;
	});
	//分享到
	$(document).on('click','#share_to',function(){
		$('#mscover').show();
		setTimeout(function () {
		        $("#mscover").hide();
		}, 8000);
	});
	$(document).on('click','#mscover',function(){
		$(this).hide();
	});

	//左滑
	//reHeight();

	//首页弹出提示层
	$(window).load(function(){
	          $('#notice').show();
	});
	$('#notice').css({
	          position:'fixed',
	          left: ($(window).width() - $('#notice').outerWidth()) / 2 ,
	          top: ($(window).height() - $('#notice').outerHeight()) / 2 ,
	});
	$('#close_no').click(function(){
	          $('#notice').slideUp();
	          $(this).hide();
	});

});
//textarea输入长度处理
function keypress2() {
	var text1 = document.getElementById("myarea").value;
	var len;
	if(text1.length >= 60){
		document.getElementById("myarea").value = text1.substr(0,60);
		len = 0;
		document.getElementById("pinglun").style.color = "red";
	}else{
		len = 60 - text1.length;
	}
	var show = 60 - len +' / 60' ;
	document.getElementById("pinglun").innerText = show;
}
jQuery.fn.limit=function(){
    var self = $("[limit]");
    self.each(function(){
        var objString = $(this).text();
        var objLength = $(this).text().length;
        var num = $(this).attr("limit");
        if(objLength > num){
            $(this).attr("title",objString);
            objString = $(this).text(objString.substring(0,num) + "...");
        }
    })
}


//左滑
function load (){
    var obj = document.getElementById("quiz").getElementsByTagName('article');
    var all = document.getElementById('quiz_c');
    var w = document.body.clientWidth;
    var event = event || window.event;

   for(var i=0;i<obj.length;i++){
   	    obj[i].addEventListener('touchstart',function(event){
	               x1 = event.touches[0].clientX;
	               y1 = event.touches[0].clientY;
 	    });
   	    obj[i].addEventListener('touchmove',function(event){
	               event.preventDefault();
	               x2 = event.touches[0].clientX;
	               y2 = event.touches[0].clientY;
	               x = x2 - x1;
	               y = y2 - y1;

	               if((x < 0) && (Math.abs(y) < 5)){
	               	all.style.right = w - x2 + 'px';
	               }
 	    });
	    obj[i].addEventListener('touchend',function(event){
	               var index = this.getAttribute("index");
    	               if(all.style.right > 0 + 'px'){
	               	all.style.right = w + 'px';
		           switch(index){
			       case "1": location.href="waitting_m.html";break;
			       case "2": location.href="waitting_m.html";break;
	        	            }
	               }

	    });
   }
}
function load2 (){
    var obj = document.getElementById("winning").getElementsByTagName('article');
    var all = document.getElementById('winning_c');
    var w = document.body.clientWidth;
    var event = event || window.event;

   for(var i=0;i<obj.length;i++){
   	    obj[i].addEventListener('touchstart',function(event){
	               x1 = event.touches[0].clientX;
	               y1 = event.touches[0].clientY;
 	    });
   	    obj[i].addEventListener('touchmove',function(event){
	               event.preventDefault();
	               x2 = event.touches[0].clientX;
	               y2 = event.touches[0].clientY;
	               x = x2 - x1;
	               y = y2 - y1;

	               if((x < 0) && (Math.abs(y) < 5)){
	               	all.style.right = w - x2 + 'px';
	               }
 	    });
	    obj[i].addEventListener('touchend',function(event){
	               var index = this.getAttribute("index");
    	               if(all.style.right > 0 + 'px'){
	               	all.style.right = w + 'px';
		           switch(index){
			       case "1": location.href="lottery_m.html";break;
			       case "2": location.href="lottery_m.html";break;
	        	            }
	               }

	    });
   }
}
window.addEventListener('load',load, false);
window.addEventListener('load',load2, false);
//originalEvent.changedTouches[0].pageX
/*function reHeight() {
	$('#quiz_c').css('min-height',$(window).height() - 50);
	$('#winning_c').css('min-height',$(window).height() - 50);
	$('#message').css('min-height',$(window).height() - 110);
}*/

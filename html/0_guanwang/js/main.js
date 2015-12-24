$(function(){

	$("#nav-wrap").prepend('<div id="menu-icon">导航菜单</div>');
	$("#menu-icon").on("click",function(){
		$("#nav").slideDown();
		$(this).toggleClass("active");
	});

	$("#nav>li a").hover(function(){
		$("#nav>li a").each(function(){
			$(this).removeClass("hover");
		});
		$(this).addClass("hover");
	})

	function tick(){
		$('#news a:first').slideUp( function () {
			$(this).appendTo($('#ticker_01')).slideDown();
		});
	}
	setInterval(function(){ tick () }, 5000);

	$(".navbar").find("li").hover(function(){
		$(".navbar").find("li").each(function(){
        	$(this).removeClass('active');
		})
		$(this).addClass('active');
	});

	$(".navbar-cases").find("li:first").css('background','#e81710');
	$(".navbar-cases").find("li:first a").css('color','#fff');
	$(".navbar-cases").find("li").hover(function(){
		$(".navbar-cases").find("li").each(function(){
        	$(this).css('background','');
        	$(this).find('a').css('color','')
		})
		$(this).css('background','#e81710');
		$(this).find('a').css('color','#fff')
	});


	$(window).on('scroll',function(){
		var st = $(document).scrollTop();
		if( st>0 ){
			if( $('.content').length != 0  ){
				var w = $(window).width(),mw = $('.content').width();
				if( (w-mw)/2 > 70 )
					$('#go-top').css({'left':(w-mw)/2+mw+20});
				else{
					$('#go-top').css({'left':'auto'});
				}
			}
			$('#go-top').fadeIn(function(){
				$(this).removeClass('dn');
			});
		}else{
			$('#go-top').fadeOut(function(){
				$(this).addClass('dn');
			});
		}
	});
	$('#go-top').on('click',function(){
		$('html,body').animate({'scrollTop':0},500);
	});

});


var elems_selector=".section-btn li>a",
        slideObj_selector=".section-wrap",
        elems=$(elems_selector),
        timer=null,
        par=null,
        interval=10;
function init () {
    document.body.scrollTop=1;
    document.body.scrollTop==1?par=document.body:par=document.documentElement;
    var offsetY_arr=[588,1177,1628,1670];
    for (var i = 0; i < offsetY_arr.length; i++) {
        addItem(elems[i],offsetY_arr[i]);
    };
}
function addItem (elem,value) {
    $(elem).data({offsetY:value});
    $(elem).click(function () {
        //var curValue=slideObj.scrollTop||0;
        var targetVal=parseInt($(this).data("offsetY"));
        move(targetVal,interval);
    })
}
function move (valueY,interval) {
    if(timer){
        clearTimeout(timer);
        timer=null;
    }
    var curValue=parseInt(par.scrollTop)||0;
    if(curValue==valueY) return;
    if(curValue>valueY){
        var dist=curValue-valueY;
        dist=Math.ceil(dist/10);
        curValue=curValue-dist;
    }
    else if(curValue<valueY){
        var dist=valueY-curValue;
        dist=Math.ceil(dist/10);
        curValue=curValue+dist;
    }
    par.scrollTop=curValue;
    timer=setTimeout(function () {
        move(valueY,interval);
    },interval);
}

init();




var Modal = {
	size: 'normal', //尺寸 normal 正常 large 大尺寸 small 小尺寸 
	title: '提示',
	btn_save_title: '保存',
	btn_close_title: '关闭',
	url:'',

	init: function(option){
		if(option != undefined){
			$.each(option,function(n,m){
				Modal[n] = m;
			});
		}
		var classname = '';
    	if(Modal.size == 'large'){
    		classname = 'modal-lg';
    	}else if(Modal.size == 'small'){
    		classname = 'modal-sm';
    	}
    	var id = '';
    	if(Modal.id != undefined){
    		id = 'id="' + Modal.id + '"';
    	}
    	var html = '<div '+id+' class="modal fade bs-example-'+classname+'"><div class="modal-dialog '+classname+'"><div class="modal-content"><form name="modal_form" id="modal_form" action="'+Modal.url+'" method="post"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">'+Modal.title+'</h4></div><div class="modal-body">'+Modal.content+'</div><div class="modal-footer"><button type="button" class="btn btn-default btn_close" data-dismiss="modal">'+Modal.btn_close_title+'</button><button type="submit" class="btn btn-primary btn_save">'+Modal.btn_save_title+'</button></div></form></div></div></div>';
    	if($('.modal').length > 0){
        	$('.modal').remove();
        }
    	$('body').append(html);
        
        $('.modal .btn_save').hide();
        if(option != undefined){
	        if((option.url != undefined && option.url != null) || (option.btn_save_title != undefined && option.btn_save_title != null)){
	        	$('.modal .btn_save').show();
	        }
        }
        
        //侦听弹窗事件
        $('.modal').on('show.bs.modal', function (e) {
        	//show 方法调用之后立即触发该事件
        	

        })
        $('.modal').on('shown.bs.modal', function (e) {
        	//此事件在模态框已经显示出来（并且同时在 CSS 过渡效果完成）之后被触发

        })
        $('.modal').on('hidd.bs.modal', function (e) {
        	//hide 方法调用之后立即触发该事件

        })
        $('.modal').on('hidden.bs.modal', function (e) {
        	//此事件在模态框被隐藏（并且同时在 CSS 过渡效果完成）之后被触发

        })
        $('.modal').on('loaded.bs.modal', function (e) {
        	//从远端的数据源加载完数据之后触发该事件

        })
		
	},
	modal: function(option){
		Modal.init(option);
		if($('.modal-backdrop').length > 0) $('.modal-backdrop').remove();
		$('.modal').modal();
	},
	show: function(content,callback){
		if($('.modal').length == 0){
			Modal.modal({
				'content' : content
			});
			$('.modal .btn_save').hide();
		}else{
			$('.modal').modal();
			$('.modal').find('.btn_save').hide();
			$('.modal').find('.modal-body').html(content);
			$('.modal').find('button').html(function(){
				return $(this).text();
			});
			$('.modal').find('button').removeAttr('disabled');
		}
		
		if($.isFunction(callback))
		{
			callback.apply(null);
		}
	},
	onhidden: function(callback){
		if($.isFunction(callback))
		{
			$('.modal').on('hidden.bs.modal', function () {
				callback.apply(null);
			});
		}
	},
	set: function(json){
		$.each(json,function(n,m){
			if(n == 'form'){
				$.each(m,function(x,y){
					$('.modal').find('form').attr(x, y);
					if(x == 'action'){
						$('.modal').find('.btn_save').show();
					}
				});
			}else{
				$('.modal').attr(n, m);
			}
		});
	},
	ajax: function(e,option, callback){
		$.ajax({
			url			: option.url,
			type		: option.type?option.type:'POST',
			data		: option.data,
			dataType	: option.dataType?option.dataType:"json",
			cache		: false,
			beforeSend	: function(){
				if(e != undefined && e != null){
					Modal.btn = e.target;
					var text = $(Modal.btn).text();
					$(Modal.btn).html('<i class="fa fa-refresh fa-spin"></i> ' + text);	
					$(Modal.btn).attr("disabled","disabled");
				}

			},
			success: function(result){
				if(result){
					if(callback && (callback  instanceof Function)){
						return callback(result);
					}
				}else{
					return false;
				}
			}

		},'json')
		
	}
}
/*
var option = {
	"content": "dslkjfljsld",
	"url": "<?php echo site_url($controller.'/test');?>",
} 
Modal.init(option);*/
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
        if(Modal.url != ''){
        	$('.modal .btn_save').show();
        }

	},
	modal: function(option){
		Modal.init(option);
		$('.modal').modal();
	},
	show: function(content){
		if(Modal.btn == undefined || Modal.btn == ''){
			$('.modal:visible').find('.modal-body').html(content);
			$('.modal:visible').find('button').html(function(){
				return $(this).text();
			});
			$('.modal:visible').find('button').removeAttr('disabled');
		}else{
			$(Modal.btn).parents('.modal').find('.modal-body').html(content);
			$(Modal.btn).html($(Modal.btn).text());
			$(Modal.btn).removeAttr('disabled');
		}
	},
	set: function(json){
		$.each(json,function(n,m){
			if(n == 'form'){
				$.each(m,function(x,y){
					$('.modal:visible').find('form').attr(x, y);
				});
			}else{
				$('.modal:visible').attr(n, m);
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
				Modal.btn = e.target;
				var text = $(Modal.btn).text();
				$(Modal.btn).html('<i class="fa fa-refresh fa-spin"></i> ' + text);
				$(Modal.btn).attr("disabled","disabled");

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

		})
	}
}
/*
var option = {
	"content": "dslkjfljsld",
	"url": "<?php echo site_url($controller.'/test');?>",
}
Modal.init(option);*/
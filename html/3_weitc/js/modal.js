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
        var html = '<div class="modal fade bs-example-'+classname+'" id="modal"><div class="modal-dialog '+classname+'"><div class="modal-content"><form name="modal_form" id="modal_form" action="'+Modal.url+'" method="post"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">'+Modal.title+'</h4></div><div class="modal-body">'+Modal.body+'</div><div class="modal-footer"><button type="button" class="btn btn-default btn_close" data-dismiss="modal">'+Modal.btn_close_title+'</button><button type="submit" class="btn btn-primary btn_save">'+Modal.btn_save_title+'</button></div></form></div></div></div>';
        $('body').append(html);
        $('.modal .btn_save').hide();
        if(Modal.url != ''){
        	$('.modal .btn_save').show();
        }
	}

}


/*var option = {
	"size": "small",
	"body": "dslkjfljsld",
	"url": "<?php echo site_url($controller.'/test');?>",
} 
Modal.init(option);*/
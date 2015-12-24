/**
Core script to handle the entire layout and base functions
**/
var App = function () {

    // IE mode
    var isRTL = false;
	var isIE  = false;
    var isIE8 = false;
    var isIE9 = false;
    var isIE10 = false;	

    var handleInit = function() {

        if ($('body').css('direction') === 'rtl') {
            isRTL = true;
        }
		isIE = !! navigator.userAgent.match(/MSIE/);
        isIE8 = !! navigator.userAgent.match(/MSIE 8.0/);
        isIE9 = !! navigator.userAgent.match(/MSIE 9.0/);
        isIE10 = !! navigator.userAgent.match(/MSIE 10/); 
    };	

    return {        
        init: function () {           
            handleInit();			
        },        

        isIE8: function () {
            return isIE8;
        },

        isRTL: function () {
            return isRTL;
        },		
		
		//获取多个checkbox的值
		get_checkbox_values : function(cname){
			var str = '';
			$(":checkbox[name='"+cname+"']:checked").each(function(){ 
				str += $(this).val()+",";
			});
			str = str.substr(0, str.length-1);
			return str;
		},
		
		//获取单个checkbox的值
		get_checkbox_value : function(cname){
			var str = $(":checkbox[name='"+cname+"']:checked:first").val();			
			return str;
		},
				
		//全选或全不选		
		get_checkbox_all : function(checkall,cname){
			$(document).on('click',checkall,function(){
				$self = $(this);
				var flag = $self.prop("checked");
				$("[name='"+cname+"']:checkbox").prop('checked',flag);
			});
		},
		
		//自定义表单提示
		tiptype : function(msg,o,cssctl,byname){			
			//msg：提示信息;
			//o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
			//cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;
			var formobj;
			if($.type(byname) === "string"){
				formobj = $("#form_"+byname);
			}
			else{
				formobj = byname;				
			}
			if(!o.obj.is(formobj)){//验证表单元素时o.obj为该表单元素，全部验证通过提交表单时o.obj为该表单对象;								
				var parents = o.obj.parents('div.form-group');															    
				cssctl(o.obj,o.type);
				o.obj.removeClass('Validform_checktip Validform_wrong Validform_error Validform_right');
				o.obj.next('.form-control-feedback').remove();				
				switch(o.type){
					case 1:
						parents.find('.help-inline').html('<i class="fa fa-refresh fa-spin"></i>');
						parents.find('.help-block').html('<i class="fa fa-refresh fa-spin"></i>');													
					break;
					case 2:
						parents.removeClass('has-error').addClass('has-success');
						o.obj.after('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
						if(o.obj.parents('.input-group').length > 0)
						{							
							o.obj.next().css('top','0px');
						}
						//parents.find('.help-inline').html('<i class="fa fa-check"></i>');
						//parents.find('.help-block').html('<i class="fa fa-check"></i>');
						parents.find('.help-inline').html('');
						parents.find('.help-block').html('');						
						break;
					case 3:
						parents.removeClass('has-success').addClass('has-error');
						o.obj.after('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
						if(o.obj.parents('.input-group').length > 0)
						{							
							o.obj.next().css('top','0px');
						}
						//parents.find('.help-inline').html('<i class="fa fa-times"></i> ' + msg);
						//parents.find('.help-block').html('<i class="fa fa-times"></i> ' + msg);
						parents.find('.help-inline').html(msg);
						parents.find('.help-block').html(msg);											
					break;
					case 4:
						parents.removeClass().addClass('form-group');						
						parents.find('.help-inline').html('');
						parents.find('.help-block').html('');																	
					break;
				}						
			}
		},
		
		beforeSubmit : function(curform){
			var button = curform.find(':submit').length > 0 ? curform.find(':submit') : $('#send');				
			var text = button.text();
			button.html('<i class="fa fa-refresh fa-spin"></i> ' + text);	
			button.attr("disabled","disabled");
		},
		
		vaildFail : function(curform){
			var button = curform.find(':submit').length > 0 ? curform.find(':submit') : $('#send');
			var text = button.text();
			button.html('<i class="fa fa-check"></i> ' + text);
			button.removeAttr("disabled");
		},		
		
		idcard : function(gets,obj,curform,datatype){					
			if (gets.length != 18)
			{
				return '请填写18位有效的身份证号码!';
			}
			var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子;
			var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值，10代表X;
			
			if (gets.length == 15) {   
				return isValidityBrithBy15IdCard(gets);   
			}else if (gets.length == 18){   
				var a_idCard = gets.split("");// 得到身份证数组   
				if (isValidityBrithBy18IdCard(gets)&&isTrueValidateCodeBy18IdCard(a_idCard)) {   
					return true;   
				}   
					//return false;
				return '请填写18位有效的身份证号码!';
			}
			//return false;
			return '请填写18位有效的身份证号码!';
				
			function isTrueValidateCodeBy18IdCard(a_idCard) {   
				var sum = 0; // 声明加权求和变量   
				if (a_idCard[17].toLowerCase() == 'x') {   
					a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作   
				}   
				for ( var i = 0; i < 17; i++) {   
					sum += Wi[i] * a_idCard[i];// 加权求和   
				}   
				valCodePosition = sum % 11;// 得到验证码所位置   
				if (a_idCard[17] == ValideCode[valCodePosition]) {   
					return true;   
				}
				return false;   
			}
				
			function isValidityBrithBy18IdCard(idCard18){   
				var year = idCard18.substring(6,10);   
				var month = idCard18.substring(10,12);   
				var day = idCard18.substring(12,14);   
				var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
					// 这里用getFullYear()获取年份，避免千年虫问题   
				if(temp_date.getFullYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){   
					return false;   
				}
				return true;   
			}
				
			function isValidityBrithBy15IdCard(idCard15){   
				var year =  idCard15.substring(6,8);   
				var month = idCard15.substring(8,10);   
				var day = idCard15.substring(10,12);
				var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
				// 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
				if(temp_date.getYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){   

					return false;   
				}
				return true;
			}
		},
		
		//窗口滚动加载，分页是条数
		scroll_load : function(url,obj,offset,post){
			if( ! offset) offset = 50;						
			$(window).scroll(function(){  
    		    // 当滚动到最底部以上500像素时， 加载新内容
				var postdata = {};
				if(post)
				{
					$.each(post,function(i,n){
						postdata[n] = $('#' + n).val();
					});
				}
				
				var scrolltop = $(document).height() - $(window).height() - $(document).scrollTop();
				
    			if (scrolltop < 300)
				{
					if( ! obj.sol)
					{
						obj.sol = 1;					
						var start = parseInt(obj.attr('start'));
						if(start == -1)
						{
							return;
						}
						if(!start)
						{
							start = offset;
						}
						else
						{
							start += offset;	
						}
						$.ajax(url + '/' + start,{
							type  : post ? 'POST' : 'GET',
							data  : postdata,
							cache : false,
							beforeSend:function()
							{
								if($('#scroll_load').length == 0)
								{
									obj.after('<nav id="scroll_load" class="navbar navbar-default navbar-fixed-bottom" role="navigation"><div class="container"><p class="navbar-text" style="text-align:center"><i class="fa fa-refresh fa-spin"></i></p></div></nav>');
								}														
							}
						})					
						.done(function(data){
							$('#scroll_load').remove();
							if(data)
							{								
								obj.sol = null;
								obj.attr('start',start);															
								obj.append(data);
							}
							else
							{								
								obj.attr('start',-1);								
							}
						});
					}
				}
			}); 
		},
		
		//窗口滚动加载，分页是页码
		scroll_load_page : function(url,obj,post){										
			$(window).scroll(function(){				
    		    // 当滚动到最底部以上500像素时， 加载新内容
				var postdata = {};
				if(post)
				{
					$.each(post,function(i,n){
						postdata[n] = $('#' + n).val();
					});
				}
				
				var scrolltop = $(document).height() - $(window).height() - $(document).scrollTop();
				
    			if (scrolltop < 300)
				{					
					if( ! obj.sol)
					{
						obj.sol = 1;					
						var page = parseInt(obj.attr('page'));
						if(page == -1)
						{
							return;
						}
						if(!page)
						{
							page = 1;
						}
						else
						{
							page++;
						}
						$.ajax(url + '/' + page,{
							type  : post ? 'POST' : 'GET',
							data  : postdata,
							cache : false,
							beforeSend:function()
							{
								if($('#scroll_load').length == 0)
								{
									obj.after('<nav id="scroll_load" class="navbar navbar-default navbar-fixed-bottom" role="navigation"><div class="container"><p class="navbar-text" style="text-align:center"><i class="fa fa-refresh fa-spin"></i></p></div></nav>');
								}														
							}
						})					
						.done(function(data){
							$('#scroll_load').remove();
							if(data)
							{								
								obj.sol = null;
								obj.attr('page',page);															
								obj.append(data);
							}
							else
							{								
								obj.attr('page',-1);								
							}
						});
					}
				}
			}); 
		},
		
		//div滚动加载
		
		
		//点击按钮,ajax请求
		bajax : function(url,obj,option){
			var span;
			if(jQuery.isPlainObject(option) && option.type=="POST"){
				var csrf_hidden = $('[name^="csrf_"]:hidden');
				var csrf_token_name = csrf_hidden.val();
				if(csrf_token_name){					
					option.data[csrf_hidden.attr('name')] = csrf_token_name;
				}
			}
			$.ajax(url,{				
				type : jQuery.isPlainObject(option) && option.type ? option.type : "GET",
				data : jQuery.isPlainObject(option) && option.data ? option.data : '',
				cache : false,
				dataType : 'json',
				beforeSend: function(){
					obj.iclass = obj.prop('class');
					obj.text = obj.text();
					span = $('<span class="'+obj.iclass+' disabled">'+obj.text+' <i class="fa fa-refresh fa-spin"></i></span>').replaceAll(obj);
					if(option.before){
						option.before();
					}									
				}
			}).done(function(data) {
				obj.replaceAll(span);								
				if(data.status == 'y'){					
					if(jQuery.isPlainObject(option) && option.url){
						data.url = option.url;
					}					
					if(option.done){
						option.done(data);
					}												
				}else{
					if(option.error){
						option.error(data);
					}
				}				
			});	
		}	
    };

}();

//div滚动ajax分页加载插件
(function($) {
    $.fn.scroll_load = function(url,obj,post) {
        var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
    	var nScrollTop = 0;   //滚动到的当前位
		var nDivHight = 0;
		var sol = 0;
		var $self = $(this);
		var postdata = {};
		if(post)
		{
			$.each(post,function(i,n){
				postdata[n] = $('#' + n).val();
			});
		}	
		
		$self.scroll(function(){
			nDivHight = $self.height();			
			nScrollHight = $self[0].scrollHeight;						
			nScrollTop = $self[0].scrollTop;			
			if(nScrollTop + nDivHight + 300 >= nScrollHight){
				if(sol == 0)
				{					
					sol = 1;					
					var page = parseInt(obj.attr('page'));
					if(page == -1)
					{
						return;
					}
					if(!page)
					{
						page = 1;
					}
					else
					{
						page++;
					}
					$.ajax(url + '/' + page,{
						type  : post ? 'POST' : 'GET',
						data  : postdata,
						cache : false,
						beforeSend:function()
						{
							if($('#scroll_load').length == 0)
							{
								obj.after('<nav id="scroll_load" class="navbar navbar-default navbar-fixed-bottom" role="navigation"><div class="container"><p class="navbar-text" style="text-align:center"><i class="fa fa-refresh fa-spin"></i></p></div></nav>');
							}														
						}
					})					
					.done(function(data){
						$('#scroll_load').remove();
						if(data)
						{								
							sol = 0;
							obj.attr('page',page);															
							obj.append(data);
						}
						else
						{								
							obj.attr('page',-1);								
						}
					});
				}			
			}
		});			
    };
})(jQuery);

//格式化银行卡
(function($) {
    // 输入框格式化 
    $.fn.bankInput = function(options) {
        var defaults = {
            min: 10, // 最少输入字数 
            max: 25, // 最多输入字数 
            deimiter: ' ', // 账号分隔符 
            onlyNumber: true, // 只能输入数字 
            copy: true // 允许复制 
        };
        var opts = $.extend({}, defaults, options);
        var obj = $(this);
        obj.css({
            imeMode: 'Disabled',
            borderWidth: '1px',
            color: '#000',
            fontFamly: 'Times New Roman'
        }).attr('maxlength', opts.max);
        if (obj.val() != '') obj.val(obj.val().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter));
		
		$(document).on('keyup',obj,function(event){
			if (opts.onlyNumber) {
                if (!(event.keyCode >= 48 && event.keyCode <= 57)) {
                    //this.value = this.value.replace(/\D/g, '');
					obj.val(obj.val().replace(/\D/g, ''));
                }
            }
			obj.val(obj.val().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter));
            //this.value = this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter);
		});
		
		$(document).on('onpaste',obj,function(event){
			return false;
		});
		
		$(document).on('dragenter',obj,function(event){
			 return !clipboardData.getData('text').match(/\D/);
		});
		
		$(document).on('blur',obj,function(event){
			//this.value = this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter);
			obj.val(obj.val().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter));
            if (obj.val().length < opts.min) {
                obj.focus();
            }
		});        
    }
    // 列表显示格式化 
    $.fn.bankList = function(options) {
        var defaults = {
            deimiter: ' ' // 分隔符 
        };
        var opts = $.extend({}, defaults, options);
        return this.each(function() {
            $(this).text($(this).text().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1" + opts.deimiter));
        })
    }
})(jQuery);
	
App.init();
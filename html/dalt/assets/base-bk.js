$(window).resize(function() {
	reHeight();
});
var storage = window.localStorage;
var index = {};// 选号索引
$(function() {
	tzList(storage);
	var _html = '';

	addEventListener('input', function() {
		bei = ($("#btv").val()) * 1;
		zhui = ($("#ztv").val()) * 1;

		if (bei > 99) {
			$("#btv").val(99);
		} // 最大值
		if (bei < 1) {
			$("#btv").val('');
		} // 最小值
		if (isNaN(bei)) {
			$("#btv").val(1);
			return false;
		} // 非法数字
		if(parseInt(bei) != bei){
			$("#btv").val(Math.floor(bei));
		}//整数处理

		if (zhui < 1) {
			$("#ztv").val('');
		} // 最小值
		if (isNaN(zhui)) {
			$("#ztv").val(1);
			return false;
		}
		if(parseInt(zhui) != zhui){
			$("#ztv").val(Math.floor(zhui));
		}//整数处理
		zong_zs();
	}, false);

	/* 点击球
	$('.ui_ball').click(function() {
		var _class = $(this).hasClass('hover');
		if (_class == false) {
			$(this).addClass('hover');
		} else {
			$(this).removeClass('hover');
		}
		var zs = jisuan();
		if(zs > 0){
			$('#addball').addClass('active');
		}else{
			$('#addball').removeClass('active');
		}
	});*/

	/* 添加投注
	$('#addball').click(function() {
		var danzhu = {};
		var touzhu = _touzhu;
		var sj_str = new Array();
		var danzhu_arr1 = new Array();
		var danzhu_arr2 = new Array();

		$('section#sel').find('.hover').each(function() {
			if ($(this).parents('.sel_cc').index($('.sel_cc')) == 0) {
				danzhu_arr1.push($(this).attr('n'));
			} else {
				danzhu_arr2.push($(this).attr('n'));
			}
		});
		var zs = jisuan();
		if(zs <= 0){
			Modal.modal({
				'content' : '至少选择1注'
			});
			return false;
		}
		var danzhu_str1 = danzhu_arr1.join(',');
		var danzhu_str2 = danzhu_arr2.join(',');

		sj_str.push(danzhu_str1);
		if (danzhu_str2.length > 0) {
			sj_str.push(danzhu_str2);
		}
		sj = sj_str.join(' | ');
		//console.log(danzhu_str1);
		danzhu.ball = sj;
		danzhu.zs = $('#tz_zs').html();
		danzhu.je = $('#tz_je').html();
		if(danzhu.zs > 1){
			danzhu.title = '复式投注 '+danzhu.zs+'注 '+danzhu.je+'豆';
		}else{
			danzhu.title = '单式投注 '+danzhu.zs+'注 '+danzhu.je+'豆';
		}
		danzhu = JSON.stringify(danzhu);
		var date = new Date();
		var time = date.getTime() + '' + 1;
		storage.setItem('ssq_' + time, danzhu);
		$('figure').toggle();
		tzList(storage);
		zs_clear();
	});*/

	/* 立即投注 */
	$('#pay').click(function() {

		var zong_cd = tzList(storage);
		if (zong_cd > 0) {
			var option = {
				'id' : 'modal_pay',
				'content' : '<h1>本次购买需要消费<em class="rr">' + zong_cd + '</em>彩豆,您确定购买吗？</h1>',
				'url' : controller + '/pay',
				'btn_save_title' : '确定',
				'btn_close_title' : '关闭',
			}
			Modal.modal(option);
		} else {
			Modal.modal({
				'content' : '<h1>还没投注呢~~</h1>'
			});
		}
	});


	$(document).on('click', '#modal_pay .btn_save', function(e) {
		e.preventDefault();
		var _this = $(this);
		var zong_zs = tzList(storage);
		var bei = $('#btv').val();
		bei = bei < 1 ? 1 : bei;
		var zhui = $('#ztv').val();
		zhui = zhui < 1 ? 1 : zhui;
		var checked = $('#tz:checked').val();

		if (checked) {
			var stop = 1;
		} else {
			var stop = 0;
		}

		var list = showStorage(storage);
		var option = {
			url			: controller + '/pay',
			data		: {"list" : list,"bei" : bei,"zhui" : zhui,"stop" : stop},
		};

		Modal.ajax(e,option,function(data){
			if (data.code == 'success') {
				storage.clear();
				tzList(storage);
			} else if (data.code == 'error') {
				Modal.show(data.tishi);
			} else if (data.code == 'auth') {
				var html = $('#user_info').html();
				Modal.show(html);
				Modal.set({'id': 'save_info','form':{'action': controller+'/save_info'}});

				var form = $("#save_info form").Validform({
					btnSubmit	: '#save_info .btn_save',
					label		: '.control-label',
					ignoreHidden: true,
					ajaxPost	:true,
					tiptype		:function(msg,o,cssctl){
						App.tiptype(msg,o,cssctl,'save_info');
					},
					datatype	: {
						"idcard": function(gets,obj,curform,datatype){
							return App.idcard(gets,obj,curform,datatype);
						}
					},
					beforeSubmit:function(curform){
						App.beforeSubmit(curform);
					},
					callback : function(data){
						if(data.status == 'y')
						{
							alert(data.info);
							$('.modal').modal('hide');
						}
						else
						{
							alert(data.info);
							$('.modal input').val('');
						}
					}
				});
				return false;
			}
			if (data.url != '') {
				window.location.href = data.url;
			}
		});

	});

	// 号码篮
	$('.btn_basket').click(function() {
		$('figure').toggle();
	});

	/* 继续选号 */
	$('.btn_continue').click(function() {
		$('figure').toggle();
	});

	/* 点击删除所选备投 */
	$(document).on('click', '.del_stor', function() {
		var del_id = $(this).attr('value');
		storage.removeItem(del_id);
		tzList(storage);
	});

	// //////////////////////////
	/** 遗漏显示隐藏* */
	$(document).on('click', '.omit', function() {
		$(this).toggleClass('hover');
		$('.sel_wrap:visible').find('.yi_num').toggle();
	});
	$('#sel_1').show();

	/** 随机一注
	$(document).on('click', '#one', function() {

		var touzhu = _touzhu;
		if ($(this).parents('figure').attr('id') == 'index') {
			// 选号页
			$('#sel li a').removeClass('hover');

			var m1 = createRandom2(6, touzhu._min1, touzhu._max1);
			var m2 = createRandom2(1, touzhu._min2, touzhu._max2);

			$.each(m1,function(n,m){
				$('#erdan li a').each(function() {
					if ($(this).attr('n') == m) {
						$(this).addClass('hover');
					}
				});
			});
			$('#erdan2 li a').each(function() {
				if ($(this).attr('n') == m2[0]) {
					$(this).addClass('hover');
				}
			});
			$('a.btn_g').addClass('active');
			jisuan();
		} else if ($(this).parents('figure').attr('id') == 'list') {
			// 号码篮
			rand_ball();
		}
	});* */
	/** 随机五注
	$(document).on('click', '#five', function() {
		rand_ball(5);

	});* */
	// 删除选号页数据
	$(document).on('click', '#zs_clear', function() {
		zs_clear();
	});
	// 清空所有选号数据
	$(document).on('click', '#all_clear', function() {
		if ($('#tz_list').html() != '') {
			if (window.confirm('确定删除所有选号吗？')) {
				all_clear();
			}
		}
	});
	$(document).on('click', '#win', function() {
		$('#sel_win').show();
		$('#sel_tou').hide();
		$(this).addClass('hover').siblings().removeClass('hover');
	});
	$(document).on('click', '#tou', function() {
		$('#sel_tou').show();
		$('#sel_win').hide();
		$(this).addClass('hover').siblings().removeClass('hover');
	});

	$(document).on('click', '.panel-heading', function(){
		var obj = $(this).find('.dd');
		$('.dd').each(function(index){
			if(index != obj.index('.dd')) $(this).removeClass('glyphicon-menu-down');
		})

		$(this).find('.dd').toggleClass('glyphicon-menu-down');
	});
	/** 自适应页面高度* */
	reHeight();
});

// ///////////////////////////////////////
// 取本地存储数据
function showStorage(storage) {
	var data = [];
	for ( var i = 0; i < storage.length; i++) {
		// key(i)获得相应的键，再用getItem()方法获得对应的值

		var key = storage.key(i);
		var arr = key.split('_');
		if (arr[0] == 'ssq') {
			data.push(storage.getItem(storage.key(i)));
		}
		// document.write(storage.key(i)+ " : " +
		// storage.getItem(storage.key(i)) + "<br>");
	}
	return data;
}

function closeConv(id, div, e) {
	$(document).unbind('click').bind('click', function() {
		$("#" + div).hide();
	});
}
function _rand(min, max) {
	return Math.floor(min + Math.random() * (max - min));
}

// 少于两位左补0
function str_pad(str) {
	var len = (str + '').length;
	if (len < 2) {
		return '0' + str;
	} else {
		return str;
	}
}
// 清空选号页
function zs_clear() {
	index = {}; // 清空所选号码索引
	$('.sel_wrap .hover').removeClass('hover');
	$('#addball').removeClass('active');
	$('#currinfo').html('');
}

// 清空号码篮数据
function all_clear() {
	index = {}; // 清空所选号码索引
	$('#tz_list').html('');
	$('#btv').val(1);
	$('#ztv').val(1);
	$('#tz').attr('checked', false);
	$('#zs').html(0);
	$('#cd').html(0);
	storage.clear();
}

function in_array(str, arr) {
	len = arr.length;
	for ( var i in arr) {
		if (arr[i] == str) {
			return false;
		}
	}
	return true;
}

// 组合
function C(n, m) {
	if(m > 0 && n >= m){
		return Math.floor(A(n, m)/J(m));
	}else{
		return false;
	}
}

// 排列
function A(n, m) {
	if(m > 0 && n >= m){
		return J(n)/J(n-m);
	}else{
		return false;
	}
}

// 阶乘
function J(n) {
	var num = 1;
	if (n > 1) {
		for ( var i = n; i >= 1; i--) {
			num *= i;
		}
	}
	return num;
}

/*// 求投注总数
function tz_num(ball_count) {

	var c1 = C(ball_count[0], 6);
	var c2 = C(ball_count[1], 1);
	return c1*c2;
}

// 计算注数总金额（zs注数，dj单价）
function jisuan() {
	var touzhu = _touzhu;
	var dj = touzhu['price'];
	var ball_count = new Array(
			$('section#sel .sel_cc').eq(0).find('.hover').length,
			$('section#sel .sel_cc').eq(1).find('.hover').length
		);
	var zs = tz_num(ball_count);
	var je = zs * dj;
	$('#currinfo').html('共<em id="tz_zs">' + zs + '</em>注，<span  id="tz_je" class="color_red">' + je + '</span>彩豆');
	return zs;
}*/

// 总注数
function zong_zs() {
	var bei = $('#btv').val();
	bei = bei < 1 ? 1 : bei;
	var zhui = $('#ztv').val();
	zhui = zhui < 1 ? 1 : zhui;
	var zong_zs = ($("#zs").html()) * 1;
	var zong_je = zong_zs * bei * zhui * 2;
	$('#cd').html(zong_je);
}
// 添加到投注列表
function tzList(storage) {
	var bei = $('#btv').val();
	bei = bei < 1 ? 1 : bei;
	var zhui = $('#ztv').val();
	zhui = zhui < 1 ? 1 : zhui;
	var _html = '';
	var zs_count = 0;/* 计算总注数 */
	var arr = new Array();
	for ( var i in storage) {
		var key = i.split('ssq_');
		if (key.length > 1) {
			arr.push(key[1]);

		}
	}
	arr.sort();
	for ( var i = arr.length - 1; i >= 0; i--) {
		var data = eval('(' + storage['ssq_' + arr[i]] + ')');
		zs_count = zs_count + parseInt(data.zs);
		//console.log(data);

		_html += '<li><a href="javascript:void(0);" class="fl"><h6>'
				+ data.ball
				+ '</h6><p>'
				+ data.title
				+ '</p></a><a href="javascript:void(0);" class="fr vc x del_stor" value="ssq_'
				+ arr[i]
				+ '"><span class="glyphicon glyphicon-remove"></span></a><br class="cl"></li>';
	}
	$('#tz_list').html(_html);
	var zong_je = zs_count * 2 * bei * zhui;
	$('#zs').html(zs_count);
	$('#cd').html(zong_je);
	return zong_je;
}

// ////////////////////////////
/*// 随机选号
function rand_ball(num) {
	if (num == undefined)
		num = 1;
	var touzhu = _touzhu;

	var redball = [];
	var blueball = [];

	$('#sel li a').removeClass('hover');

	for ( var i = 0; i < num; i++) {
		redball[i] = createRandom2(6, touzhu._min1, touzhu._max1);
		blueball[i] = createRandom2(1, touzhu._min2, touzhu._max2);
	}
	$.each(redball, function(n, m) {
		var danzhu = {};
		danzhu.ball = m.join(',') + ' | ' + blueball[n];
		danzhu.zs = '1';
		danzhu.je = '2';
		danzhu.title = '单式投注 '+danzhu.zs+'注 '+danzhu.je+'豆';
		danzhu = JSON.stringify(danzhu);
		var date = new Date();
		var time = date.getTime() + '' + n;
		storage.setItem('ssq_' + time, danzhu);
	});
	tzList(storage);
}*/

function createRandom2(num, from, to) {
	var arr = [];
	var json = {};
	while (arr.length < num) {
		// 产生单个随机数
		var ranNum = Math.floor(Math.random() * (to - from + 1)) + from;
		// 通过判断json对象的索引值是否存在 来标记 是否重复
		if (!json[ranNum]) {
			json[ranNum] = 1;
			arr.push(str_pad(ranNum, 2, '0'));
		} else {
			var len = 0;
			for ( var i in json) {
				len++;
			}
			if (len >= num) {
				return arr;
			}
		}
	}
	return arr;
}
function reHeight() {
	$('.sel_wrap').height($(window).height() - 195);
	$('.over_auto').height($(window).height() - 230);
	$('.sel_list').height($(window).height() - 190);
	$('.sel_hi').height($(window).height() - 106);
	$('.sel_info').height($(window).height() - 90);
}

/**
 *@param str            初始字符串
 *@param length         重复长度
 *@param pad            填充字符
 *@param type           填充类型
 *@return str
 */
function str_pad(str,num,pad,type){
    if(isNaN(num)) num = 5;
    if(isNaN(type)) type = 'left';
    length = Math.max(0,(num - str.toString().length));

    if(type == 'left'){
        for(i=0;i<length;i++){
            str = pad + str;
        }
    }else {
        for(i=0;i<length;i++){
            str += pad;
        }
    }
    return str;
}
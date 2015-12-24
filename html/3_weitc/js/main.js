var option = {
  "size": "small",
  "body": '<div class="cash_num"><h4><em class="fl">卡号：<em class="ka">6225 5288 6555 4187<input type="text" id="account" style="display:none;" /></em></em><a href="#" class="fr btn_sm btn_mis btn_bl alter_ka">修改</a><br class="cl"></h4><p class="cl mt20">金额：<input type="number" placeholder="请输入金额" id="money" class="mr20">元</p></div>',
  "url": "/",
  }
  Modal.init(option);
$(function(){
  /****/
  $('.top_btn').click(function(){
    $('.modal').modal();
  });
  $('.ti').click(function(){
	var ti_body='<h1 class="tc mb20 oran f14">提现明细</h1><table class="table bgf tc"><thead><tr class="bf5"><td>姓名</td><td>申请时间</td><td>金额</td><td>状态</td></tr></thead><tbody><tr><td>张三</td><td>2015/04/20</td><td>100</td><td>处理中</td></tr><tr><td>赵四</td><td>2015/04/20</td><td>50</td><td>已完成</td></tr></tbody></table>';
	$('.modal .modal-body').html(ti_body);
	$('.modal').modal();
  });
/*$("#modal").on("hidden.bs.model",function(event){
	var modal = $(this);
	modal.removeData("bs.modal");
	U.button.removeData();
	if($('.modal-backdrop').length > 0)
	{
		$('.modal-backdrop').remove();
	}
	modal.find('.modal-content').html('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">加载中</h4></div><div class="modal-body" style="text-align:center; font-size:200%;"><i class="fa fa-refresh fa-spin"></i></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div>');
});
  /**nav**/
  $('.drop').click(function(){
    $(this).parent().find('.drop_info').slideToggle();
  });
  /**提现+修改**/
 $(".alter_ka").click(function() {
	var ka = $(this).parent().find(".ka");
	var txt = ka.text();
    var input=$("<input type='text' MaxLength='19' id='account' value='"+txt+"' />");
	ka.html(input);
    $('#account').inputFormat('account');
		input.click(function() { return false; });
		input.trigger("focus");
		input.blur(function() {
			var newtxt = input.val();
			if (newtxt != txt) {
				ka.html(newtxt);
			}
			else {
				ka.html(newtxt);
			}
      });
  });
  $('#money').inputFormat('amount');
  /**修改**/
  $('.alter').click(function(){
  	var ti_body='<div class="ss"><p>A:<em><input type="number" class="ss_m ss_r"></em><em><input type="number" class="ss_m ss_r"></em><em><input type="number" class="ss_m ss_r"></em><em><input type="number" class="ss_m ss_r"></em><em><input type="number" class="ss_m ss_r"></em><em><input type="number" class="ss_m ss_r"></em><em><input type="number" class="ss_m ss_b"></em></p></div>';
	$('.modal .modal-body').html(ti_body);
	$('.modal').modal();
  })
})


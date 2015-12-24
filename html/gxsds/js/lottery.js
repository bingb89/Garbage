
function tree(id){
    this.obj = $('#'+id);
    this.yao = this.obj.find('.yao');
    this.moveHandler = null;
    this.move = function(){
        this.yao.hide();
        this.obj.attr('class','moveRight');
        var obj = this.obj;
        this.moveHandler = setInterval(function(){
            if(obj.hasClass('moveLeft')){
                obj.attr('class','moveRight');
            }else{
                obj.attr('class','moveLeft');
            }
        },100);
    };
    this.stop = function(){
        clearInterval(this.moveHandler);
        this.obj.attr('class','stop');
    };
    this.recover = function(){
        clearInterval(this.moveHandler);
        this.yao.show();
        this.obj.attr('class','normal');
    };
}

award_id = 0; //奖品ID
award_name = '';//中奖名称
function start_lottery(){
    var myTree = new tree('tree');
    $.ajax({
        url: 'lottery.php',
        type: "post",
        data:null,
        dataType: "json",
        timeout: 20000,
        cache: false,
        beforeSend: function(){// 提交之前
            myTree.move();
        },
        error: function(){//出错
            myTree.recover();
            alert('服务端出错！');
        },
        success: function(res){//成功
            if(typeof(res.award_id)!='undefined'){
                award_id = res.award_id;//得到奖品ID
                award_name = res.award_name;//得到奖品名称
                setTimeout(function(){
                    myTree.stop();
                    document.getElementById('beep-one').pause();
                    document.getElementById('beep-one1').play();
                    effect.zoomIn('award_'+award_id,1);
                },7000);
                setTimeout(function(){myTree.recover();},8000);
            }else{
                myTree.recover();
                alert('抽奖出错！');
            }
        }
    });
}
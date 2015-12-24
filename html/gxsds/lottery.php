<?php
//奖品配置
$award = array(
    // 奖品ID => array('奖品名称',概率)
    1 => array('圣诞老人',0.3),
    2 => array('麋鹿车',0.3),
    3 => array('雪花',0.3),
    4 => array('没有奖品',0.6),
);

$r =rand(1,100);
$num = 0;
$award_id = 0;
foreach($award as $k=>$v){
    $tmp = $num;
    $num += $v[1]*100;
    if($r>$tmp && $r<=$num){
        $award_id = $k;
        break;
    }
}

jsonBack(array('award_id'=>$award_id,'award_name'=>$award[$award_id][0]));

//
function jsonBack($data){
    header("Content-type: application/json");
    if(isset($_GET['callback'])){
        echo $_GET['callback']."(".json_encode($data).")";
    }else{
        echo json_encode($data);
    }
    exit();
}
?>
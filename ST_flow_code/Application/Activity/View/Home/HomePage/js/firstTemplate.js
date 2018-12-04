

function alertShow()
{
		$(".mask").show();
		$(".alert_box").show();
}

function alertHide()
{
		$(".mask").hide();
		$(".alert_box").hide();
}
	
$("#btncancel").click(function(e){
	e.stopPropagation();
	alertHide();
});

$("#btnok").click(function(e){
	e.stopPropagation();
	alertHide();
	//提交表单
	$("#form1").submit();
});

//随机领取手机流量
function getRandomFlowAJAX() {

	var phoneValue = $("#phoneNumber").val();
	var mod=$("#mod").val();
	var func=$("#func").val();
	//var url=$("#url").val();
	
	
	var position=$("#position").val();

	if(position == 1)
	{
		var positionstatue = localStorage.getItem("positionstatue");
		//如果当前为空。则表示定位系统未开启
		if(positionstatue == null && positionstatue == "")
		{
			alert("对不起。当前活动仅支持在门店附近，请开启定位");
			return;
		}
	}

	if (phoneValue != "") {
		if (!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0,0-9])\d{8}$/i.test(phoneValue)) {

			alert("请输入正确的手机号");
			//mui.alert("请输入正确的手机号");
		} else {
			localStorage.setItem("positionstatue","");
			alertShow();
			// if(confirm("如果您中奖。我们将您号码展示在获奖名单之中。"))
			// {
			// 	$("#form1").submit();	
			// }
		}
	} else {
		//mui.alert("手机号码不能为空");
		alert("手机号码不能为空");
	}
}



//活动规则弹出框
$("#rule").click(function(){
  $('.bg').fadeIn(200);
  $('.content').fadeIn(400);
});

//活动规则遮罩层
$(".bg").click(function(){
  $('.bg').fadeOut(200);
  $('.content').fadeOut(200);
});

//电话号码模糊处理
function formatPhone(phone) {
	return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

//轮播
function loop() {
	var items = award.find('.licell');
	if (items.length > 3) {
		items.eq(0).addClass('move');
		setTimeout(function() {
			items.eq(0).appendTo(award).removeClass('move');
			loop();
		}, 2000);
	}
};

// function GetuserlistInfo(){
// 	// 获取获奖用户
// 	var url = '/index.php/Sdk/Public/rewardedUsers';
//
// 	$.ajax({
// 		type: "GET",
// 		url: url,
// 		contentType: "application/x-www-form-urlencoded",
// 		success: function(repData) {
// 	        	var newjson = eval('(' + repData + ')');
// 			$.each(newjson.data, function(i, item) {
// 				createTableItem(item);
// 			});
// 		}
// 	});
// }

// 获取获奖用户
var aid=$("#user_activity_id").val();
var user_type=$("#user_type").val();
var user_id=$("#user_id").val();

$.ajax({
	type: "POST",
 	url: '/index.php/Activity/Public/rewarded_users/',
 	data:{aid:aid,user_type:user_type,user_id:user_id},
	dataType: 'json',
	contentType: "application/x-www-form-urlencoded",
	success: function(repData) {
		$.each(repData.data, function(index, element) {
			createTableItem(element);
			console.log(index + " " + element.mobile);
		});
	},
	error:function(){
	}
});

//用户名称过长，缩略显示
function fixWx_name(wx_name) {
	if (wx_name.length > 6){
		return wx_name.substring(0,4)+"...";
	}else{
		return wx_name;
	}
}

//动态生成table_cell
function createTableItem(element) {
	var str = element.order_date;

		$('#mui-table-view').append(
			'<li class=\"licell\" >' +
				'<div class="user_item">' +
					'<img src=\"'+element.wx_photo+'\" alt="" />'+
						'<div class="user_info">' +
							'<span class="user_name">' +fixWx_name(element.wx_name)+ '<em> 抢到' + element.product_name + '</em></span>' +
							'<span class="user_tel">' + formatPhone(element.mobile) +'<em>'  + str.substring(5,str.length-3) + '</em></span>'+
						'</div>' + 
				'</div>' + 
			'</li>'
		);
								
		// 	$('#mui-table-view').append(
		// 	'<li class=\"mui-table-view-cell mui-media\" style=\"height: 4rem;\">' +
		// 	'<img class=\"mui-media-object mui-pull-left\" src=\"'+element.wx_photo+'\" style=\"border-radius:0.3rem;\">' +
		// 	'<div class=\"mui-media-body\" style=\"color:white;display:inline-block;font-size:0.8rem\">' +fixWx_name(element.wx_name)+
		// 	'<p class=\"mui-ellipsis\" style=\"font-size:0.8rem;margin-top:0.2rem;\">' + formatPhone(element.mobile) +
		// 	'</p>' + '</div>' + '<div class=\"mui-media-right\" style=\"font-size:0.8rem;\">' +
		// 	'抢到' + element.product_name + '<p class=\"mui-ellipsis\" style=\"text-align:right;font-size:0.6rem;margin-top:0.2rem;\">' + str.substring(5,str.length-3) +
		// 	'</p>' + '</div>' + '</li>'
		// );
	loop();
}


	$('.zandiv').bind('click', function () {
		alert('123');
    		var M = '<?php echo show()?>';
		alert(M);
	});

//for(var i = 0;i< 10;i++)
//{
//	var element = {};
//	element.order_date = "99999999";
//	element.wx_photo = "http://crm.eoc.cn/resources//crm/upload/public/2016/02/07/9516d2fa-7c3a-4f9c-9ba6-1ad53ed76952.jpg";
//	element.wx_name = "张三"+i;
//	element.mobile = "18279113903";
//	element.product_name = '10M';
//
//	createTableItem(element);
//}
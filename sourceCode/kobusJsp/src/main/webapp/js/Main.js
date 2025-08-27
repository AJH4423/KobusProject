var agent = "pc";
$(document).ready(function(){
	agent = fnUserAgent();

	$(".main_tab a").on("click", function(){
		$(".main_tab a").removeClass("on");
		$(this).addClass("on");
	});
	
	// 팝업창 iframe submit
	var pupListLen = $("#pupListLen").val();
	for(var inx=0; inx < pupListLen; inx++){
		$("#popForm"+inx).submit();
	}
	
	// 메인배너 background url 치환
/*	$(".bnr_box .main_bus").css("background", $(".bnr_box .main_bus").css("background").replace(/url\(["|']?([^"']*)["|']?\)/, "url(/mngr/mainBnrImg.do?bnrNoCd=BNR1)"));
	$(".bnr_box .main_app").css("background", $(".bnr_box .main_app").css("background").replace(/url\(["|']?([^"']*)["|']?\)/, "url(/mngr/mainBnrImg.do?bnrNoCd=BNR2)"));*/
	
	// 로그인 입력 여부 체크 (회원)
	$("#usrId, #usrPwd").keyup(function(){
		var usrId = $("#usrId").val();
		var usrPwd = $("#usrPwd").val();
		var usrLgnBtn = $("#usrLgnBtn"); 
		if(usrId.length > 0 && usrPwd.length > 0){
			usrLgnBtn.removeClass("ready");
		} else {
			if(!usrLgnBtn.hasClass("ready")){
				usrLgnBtn.addClass("ready");
			}
		}
	});
	
	// 로그인 입력 여부 체크 (비회원)
	$("#nombrsid, #nombrspass").keyup(function(){
		var usrId = $("#nombrsid").val();
		var usrPwd = $("#nombrspass").val();
		var usrLgnBtn = $("#nonUsrLgnBtn"); 
		if(usrId.length > 0 && usrPwd.length > 0){
			usrLgnBtn.removeClass("ready");
		} else {
			if(!usrLgnBtn.hasClass("ready")){
				usrLgnBtn.addClass("ready");
			}
		}
	});
	
	
	var min = 0;
	var max = 60;
	var extrComp = $("#extrComp").val();
	if (extrComp == 'ARMY'){
		var stdDtm = $("#stdDtm").val();
		var endDtm = $("#endDtm").val();
		min = new Date(Number(stdDtm.substring(0,4)),Number(stdDtm.substring(4,6))-1,Number(stdDtm.substring(6,8)));
		max = new Date(Number(endDtm.substring(0,4)),Number(endDtm.substring(4,6))-1,Number(endDtm.substring(6,8)));
	}
	
	$('#datepicker11, #datepicker22').datepicker({
		showOn:"button",
		buttonImage:"/images/page/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"달력",
		minDate: min,
		maxDate: max,
		onSelect: function(){
			var txtFld = 'text_date1';
			if ($(this).attr('id') == 'datepicker22') txtFld = 'text_date2';
			fnYyDtmStup(2,txtFld,$(this).val());
		},
		beforeShow: function(){
			var date_offset = $(this).parents('.date_picker_wrap').offset();
			var date_width  = $(this).parents('.date_picker_wrap').outerWidth();
			var date_height = $(this).parents('.date_picker_wrap').outerHeight();
			var picker_width = $('#ui-datepicker-div').outerWidth();
			if($('body').width() == 320){
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : 0
					});
				});
			}else {
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : (date_offset.left + date_width) - picker_width
					});
				});
			}
		},
	});
		
});

function fnUserAgent(){
	var sAgent = navigator.userAgent;
	var agent = "pc";
	if (sAgent.match(/iPhone|UP.Browser|Android|BlackBerry|Windows CE|Nokia|webOS|Opera Mini|SonyEricsson|opera mobi|Windows Phone|IEMobile|POLARIS/) != null){
		agent ="mobile";
	}else if(sAgent.match(/tablet|iPad/) != null){
		agent = "tablet";
	}else{
		agent = "pc";
	}
	
	return agent;
}

function fnMainBnrLine(obj){
	var mainBusArr = obj.text().split(" ");
	var mainBusNum = Math.floor(mainBusArr.length/2)+1;
	var mainBusText = "";
	var mainBusSubText = "";
	for(var inx=0; inx < mainBusNum; inx++){
		mainBusText += mainBusArr[inx];
		mainBusText += " ";	
	}
	for(var inx=mainBusNum; inx < mainBusArr.length; inx++){
		mainBusSubText += mainBusArr[inx];	
		mainBusSubText += " ";	
	}
	obj.text(mainBusText);
	obj.append("<span class=\"block\">"+mainBusSubText+"</span>");
}

function fnLogout(){
	location.href = "/logout.do";
}

function fnAlcnSrchBef(){
	var deprCd = $("#deprCd").val();
	var arvlCd = $("#arvlCd").val();
	var deprDtm = $("#deprDtm").val();
	var currDate = new Date().yyyymmdd();

	
	if(deprCd != "" && deprCd != null && arvlCd != "" && arvlCd != null){
		if(deprDtm == currDate){
			alert("지정차 출발 당일에 승차권을 발행한 경우는 발행시점 기준 1시간 이내까지 취소수수료가 부과되지 않습니다. \n(단, 지정차 출발 이후에는 승차권 발행시점과 상관없이 취소수수료 부과되오니 유의 바랍니다.)");
		}
		$('[data-remodal-id=popFee]').remodal().open();
	} else {
//		alert("출발지와 도착지를 선택해주세요.");
//		$("#readDeprInfoList").focus();
//		return false;

		if (deprCd == ""){
			alert("출발지를 선택해 주세요.");
			$('#readDeprInfoList').focus();
			return;
		}
		
		if (arvlCd == ""){
			alert("도착지를 선택해 주세요.");
			$('#readArvlInfoList').focus();
			return;
		}

	}
}

function fnPopFeeAgrm(){
	if(agent == "true"){
		location.href="/mrs/rotinf.do";
	} else {
		fnAlcnSrch();
	}
}

function fnGoAlcnSrch(){
	$('[data-remodal-id=popFee]').remodal().open();
}

function cookieDoneChk(){
	if ( $('.noti_pop:visible').size() == 0){
		$('.pop_dimmed').hide();
		$('.noti_pop_wrap').hide();
	 }
}

function fnUsrSubmit(){
	if(event.keyCode == 13){
		fnlogin();
	}
}

function fnNonUsrSubmit(){
	if(event.keyCode == 13){
		NonUsrInsert();
	}
}

Date.prototype.yyyymmdd = function() {
	  var mm = this.getMonth() + 1; // getMonth() is zero-based
	  var dd = this.getDate();

	  return [this.getFullYear(),
	          (mm>9 ? '' : '0') + mm,
	          (dd>9 ? '' : '0') + dd
	         ].join('');
	};
	

function fnGoFreepass(){
	location.href="/adtnprdnew/frps/frpsPrchGd.do";
}


function fnGoWheel(){
	window.open("/wchr/main.do");
}	
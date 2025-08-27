$(document).ready(function() {
	
	// 첫 페이지 접근 시 값 세팅
	var thisTime = $("#thisTime").val();
	var deprCd = $("#deprCd").val();
	var deprTime = $("#deprTime").val();
	var deprTimeSub = deprTime.substring(0,2);
    $("#busCld").val(deprCd);
    $("#busCldChoiceVal").val(deprCd);
    
	if (is_select("busCld")){ // select 태크처리
		$("#busCld > option[value='+a+']").attr("selected","selected");
		$("#busCld").selectric();
	}
	
	// SelectBox 시간리스트 제어
	var html = [];
	var value= "";
	var subvalue= ""; // 07:20 --> 08:00 선택되게
	var min= ":00";
	var curTime = thisTime+":00";
	for(var idx =0; idx < 24; idx++){
		if(Number(thisTime) <= idx){
			if(idx <10) {
				value="0"+idx;
				subvalue="0"+(idx-1);
			} else {
				value= idx;
				subvalue=(idx-1);
			}
			html[idx] = "<option value="+subvalue+">"+value+min+"</option>";
		}
	}
	
	$("#curTime").val(curTime);
	if (is_select("timeChoice")){ // select 태크처리
		$("#timeChoice").append(html.join(''));
		$("#timeChoice").val(deprTimeSub);
		$("#timeChoiceVal").val($("#timeChoice option:selected").text());
		$("#timeChoice").selectric();
	}
	
});

function fnSearch() {
	if($("#pynDvsCd").val() == "3"){	// 지불구분코드가 마일리지일때 
		if($("#deprCd").val() != $("#busCldChoiceVal").val()){	// 기존버스등급과 다른 버스등급으로 선택됐을경우 
		    $("#busCld").val($("#deprCd").val());	// selectbox 선택값 변경
		}
	}
	
	// 세종시 터미널 코드 분리로 인한 예외처리 (352,358 중 대표코드 352 사용) 2018.02.22
	if($("#deprnCd").val() == "358"){
		$("#deprnCd").val("352");
	}
	if($("#arvlCd").val() == "358"){
		$("#arvlCd").val("352");
	}
	
	// 의정부 터미널 코드 분리로 인한 예외처리 (170,173 중 대표코드 170 사용) yahan 2020-01-07
	if($("#deprnCd").val() == "173"){
		$("#deprnCd").val("170");
	}
	if($("#arvlCd").val() == "173"){
		$("#arvlCd").val("170");
	}

	// 20210430 yahan 이중호출 방지
	$("form[name=mrschangefrm]").attr({"action" : "/koBus/modifyResvSch.do", "method" : "post", "target" : "_self"}).submit(); // step2.do[배차조회]

//	var mrschangefrm = $("form[name=mrschangefrm]").serialize() ;
//	$.ajax({	
//        url      : "/mrs/timznAlcnSrch.ajax",
//        type     : "post",
//        data : mrschangefrm,
//        dataType : "json",
//        success  : function(alcnInfMap){
//        	if(alcnInfMap.rotVldChc == "N"){
//        		alert("배차정보가 없습니다. \n조회조건을 다시 확인하여 주시기 바랍니다.");
//        		return;
//        	}else{
//        		$("form[name=mrschangefrm]").attr({"action" : "/mrs/mrschantimestep2.do", "method" : "post", "target" : "_self"}).submit(); // step2.do[배차조회]
//        	}
//        }
//	});
}

// 시간 선택
function fnTimeChoice(value) {
	document.mrschangefrm.timeChoiceVal.value=value;
}

// 버스등급 선택
function fnBusCldChoice(value) {
	document.getElementById('deprCd').value = value;
}
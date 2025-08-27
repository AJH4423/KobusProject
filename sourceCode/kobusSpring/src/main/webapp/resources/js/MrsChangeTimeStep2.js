/* 전역변수 : 모든 전역변수에 접두사로 all 사용
 * 최종확인변수 : 모든 변수에 접미사 cfm 사용 
 */
/* $(function(){
 	$('.time li.on a').on('click', function(){
 		var num = $(this).data('time');
 		var pos = $('.bus_time p[data-time='+ num + ']').position().top;
 		var currentScrollTop = $('.bus_time').scrollTop();
 		$('.bus_time').stop().animate({scrollTop : pos + currentScrollTop},300);
 	});
 });*/
$(document).ready(function() {
	$("#alcnDeprDtm").text($("#alcnDeprDT").val()); //날짜
	$("#rideDate").text($("#alcnDeprDT").val()); //날짜
	$("#alcnDeprTmlNm").text($("#deprnNm").val()); //출발터미널
	$("#alcnArvlTmlNm").text($("#arvlNm").val()); //도착터미널
	
	var takeDrtmAll = Number($("#takeDrtmOrg").val()); //전체소요시간
	var takeDrtm = "";
	var takeDrtmHH = parseInt(takeDrtmAll/60) ; 
	if(takeDrtmHH > 0){
		takeDrtm = parseInt(takeDrtmAll/60)+"시간 "+(takeDrtmAll%60)+"분 소요";
	}else{
		takeDrtm = (takeDrtmAll%60)+"분 소요";
	}
	$("#takeDrtm").text(takeDrtm); //소요시간
	
	var distOrg = Number($("#distOrg").val()); //거리
	if(distOrg > 0){
		$("#dist").text($("#distOrg").val()+" Km"); //거리
	}else{
		$("#dist").text("-"); //거리
	}
	
	$("#reloadBtn").on("click",(function() {
//		fnReload();
		$("#reloadStatus").val("Y");
		$("#alcnSrchFrm").submit();
	}));
	
	// 20241008 웹접근성
	setTimeout(function(){
		if ($("#reloadStatus").val() == "Y"){
			$("#reloadBtn").focus();
		}
		if ($("#reloadStatus").val() == "CAL"){
			$("#busDate11").next("button").focus();
		}
	}, 100);
	
});



function fnAlcnYyDtmStup(ddChk,dtVal){
	
	var yyDtm = "";
	var yymmdd = "";
	if(ddChk == 2){//datepicker를 통해서 들어온 데이터인지 화면에서 자동설정된 데이터인지 구분
		var yyDtmDvs = dtVal.split(".");  //.substring(dtVal.length-3,dtVal.length);
		yyDtm = dtVal;
		yymmdd = yyDtmDvs[0].trim()+""+(Number(yyDtmDvs[1].trim()) < 10?"0"+yyDtmDvs[1].trim():yyDtmDvs[1].trim())+""+(Number(yyDtmDvs[2].trim()) < 10 ? "0"+yyDtmDvs[2].trim():yyDtmDvs[2].trim());
	}
	
	var rtrpChc = $("#rtrpChc").val(); // 왕편복편 체크
	
	if(rtrpChc == '1'){ //왕편
		
		$('.date_cont').text(yyDtm);
		$("#alcnDeprDtm").text(yyDtm);
		$("#deprDtmAll").val(yyDtm);
		$("#deprDtm").val(yymmdd);

	}else if(rtrpChc == '2'){ //복편
		
		$('.date_cont').text(yyDtm);
		$("#alcnDeprDtm").text(yyDtm);
		$("#arcnDtmAll").val(yyDtm);
		$("#arcnDtm").val(yymmdd);
	}
	
	fnReload();
}



 function fnTimeChcList(obj){
	$(".time").find("li").removeClass("active");
	$(obj).addClass("active");
}
 


function fnReload(){
//	$("#alcnSrchFrm").submit();
	window.location.reload();
}



function fnUpdRot(){
	$("#alcnSrchFrm").attr("action","/mrs/mrschantimestep1.do");
	$("#alcnSrchFrm").submit();
}


// 2017.04.12 잔여좌석 비교를 위해 rmnSatsNum 추가
//prvtBbizEmpAcmtRt:국민차장제 동의여부추가)-180704
//mlgAcmtYn : 마일리지 적립여부 추가 - 190723
// tempRotYn삭제후 할인구분코드	DC_DVS_CD(arr)로 변경 20200327 yahan
function fnSatsChc(deprDt,deprTime,alcnDeprTime,alcnDeprTrmlNo,alcnArvlTrmlNo,indVBusClsCd,cacmCd,dcDvsCd, rmnSatsNum, deprTrmlNo, arvlTrmlNo, prvtBbizEmpAcmtRt, chldSftySatsYn, mlgAcmtYn, dsprSatsYn){ //좌석선택화면전환:모든 변수에 접미사cfm
	$("#deprTimeTo").val(deprTime);
	$("#alcnDeprTimeTo").val(alcnDeprTime);
	$("#alcnDeprTrmlNo").val(alcnDeprTrmlNo);
	$("#alcnArvlTrmlNo").val(alcnArvlTrmlNo);
	$("#indVBusClsCd").val(indVBusClsCd);
	$("#cacmCd").val(cacmCd);
	$("#prvtBbizEmpAcmtRt").val(prvtBbizEmpAcmtRt);	
	$("#chldSftySatsYn").val(chldSftySatsYn);
	
	if((indVBusClsCd == "7" || indVBusClsCd == "8") && mlgAcmtYn == "N"){
	//	alert("해당 배차는 할인 적용된 요금으로 운영중입니다.\n할인 운영 시 마일리지 적립 대상이 아닙니다.")
	}
	
	//휠체어 가능 배차 경우
	if(dsprSatsYn == "Y"){
		alert("휠체어 탑승가능차량으로 소요시간이 늘어날수도 있습니다.");
	}
	
	$("#dcDvsCd").val(dcDvsCd);
//20200327 yahan 삭제	
//	if(tempRotYn=="Y"){
//		alert("특별편성된 임시배차 차량입니다.");
//	}	
	var dt = new Date(deprDt.substring(0,4), deprDt.substring(4,6)-1, deprDt.substring(6,8));

	var week  = new Array('일','월','화','수','목','금','토');		//요일 array
	var wkdy  = week[dt.getDay()];
	var yyDtm  = deprDt.substring(0,4)+". "+Number(deprDt.substring(4,6))+". "+Number(deprDt.substring(6,8))+". "+wkdy;
	//alert(yyDtm);
	$("#orignalDT").val(deprDt);
	$("#alcnDeprDT").val(yyDtm);
	
	var adltNum = parseInt($("#adltNum").val());
	var teenNum = parseInt($("#teenNum").val());
	var chldNum = parseInt($("#chldNum").val());
	var uvsdNum = parseInt($("#uvsdNum").val());
	var sncnNum = parseInt($("#sncnNum").val());
	var dsprNum = parseInt($("#dsprNum").val());
	// 20210525 yahan
	var vtr3Num = parseInt($("#vtr3Num").val());
	var vtr5Num = parseInt($("#vtr5Num").val());
	var vtr7Num = parseInt($("#vtr7Num").val());
	var currSatsTot = adltNum + teenNum + chldNum + uvsdNum + sncnNum + dsprNum + vtr3Num + vtr5Num + vtr7Num; // 기존예매건
	var trmlNoChk = "N";

	$("#deprDtm").val(deprDt);
	$("#deprDtmAll").val(yyDtm);
	cfmDeprDt = $("#deprDtmAll").val().split(".");
	
	// 세종시 터미널 코드 분리로 인한 예외처리 (352,358 중 대표코드 352 사용) 2018.02.22
	if((deprTrmlNo == "352" || deprTrmlNo == "358") && arvlTrmlNo== "010"){
		$("#deprnCd").val(deprTrmlNo);
	}
	if(deprTrmlNo == "010" && (arvlTrmlNo == "352" || arvlTrmlNo == "358")){
		$("#arvlCd").val(arvlTrmlNo);
	}
	if((deprTrmlNo == "352" || deprTrmlNo == "358") && arvlTrmlNo== "118"){
		$("#deprnCd").val(deprTrmlNo);
	}
	
	// 의정부 터미널 코드 분리로 인한 예외처리 (170,173 중 대표코드 170 사용) yahan 2020-01-07
	if((deprTrmlNo == "170" || deprTrmlNo == "173") && (arvlTrmlNo== "801" || arvlTrmlNo== "810")){
		$("#deprnCd").val(deprTrmlNo);
	}
	if((deprTrmlNo == "801" || deprTrmlNo == "810") && (arvlTrmlNo == "170" || arvlTrmlNo == "173")){
		$("#arvlCd").val(arvlTrmlNo);
	}
	
	
	// 20230820 터미널코드 이원화 체크
	$("#deprnCd").val(deprTrmlNo);
	$("#arvlCd").val(arvlTrmlNo);
	
	
	if($("#alcnDeprTrmlNo").val() == $("#arvlCd").val()){
		trmlNoChk = "Y";
	}
	
	if(rmnSatsNum >= currSatsTot){ // 기존예매건의 수가 잔여좌석보다 같거나 작을때 ----- 변경가능
		var cfmDeprDt = $("#alcnDeprDT").val().split(".");
		var cfmDeprDtFor = cfmDeprDt[2].substring(1,3);
		var cfmText = "출발일자가 "+cfmDeprDt[1]+"월 "+cfmDeprDtFor+"일이 맞습니까?";
		if(trmlNoChk == "Y"){
			alert("배차정보 조회 시 오류가 발생하였습니다.");
			fnReload();
		}else{
			if(confirm(cfmText)){				
				$("#alcnSrchFrm").attr("action","/mrs/mrschantimestep3.do");
				$("#alcnSrchFrm").submit();
			}
		}
	} else {
		alert("선택하신 차량의 잔여좌석이 변경하시려는 좌석수보다 부족합니다. 좌석수를 변경하시려면 취소 후 다시 예매하시기 바랍니다.");
	}
}


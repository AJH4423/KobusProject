/* 전역변수 : 모든 전역변수에 접두사로 all 사용
 * 최종확인변수 : 모든 변수에 접미사 cfm 사용 
 */
var allAdltChcCnt = 0;
var allChldChcCnt = 0;
var allTeenChcCnt = 0;
var allUvsdChcCnt = 0;
var allSncnChcCnt = 0;
var allDsprChcCnt = 0;
var allBohnChcCnt = 0;
var allDfptChcCnt = 0;
var allSelSeatCnt = 0;
var none_click=0;
var groupDcCheck = "N"; // 단체할인적용여부
var bohnDcFlag = 0; // 보훈할인등급
var bohnDcWith = 0; // 보훈동반여부

var detailBoxHeadHeight = function() {
	$('.detailBox_head').height($('.detailBox_head .count_seat .inner').height() + 7);
}
  
$(window).resize(function(){
    detailBoxHeadHeight();
});
  
$(document).ready(function() {
	detailBoxHeadHeight();
	
	/**
	 * 20200326
	 * yahan
	 */
	$("input:radio[id='salesInfo_1']").attr("disabled",true);
	$("input:radio[id='salesInfo_2']").attr("disabled",true);
	$("input:radio[id='salesInfo_3']").attr("disabled",true);
	$("input:radio[id='salesInfo_4']").attr("disabled",true);
	$("input:radio[id='salesInfo_5']").attr("disabled",true);
	
	/**
	 * 20200724 yahan
	 * 미할인 기본 선택후 할인 있을때 기본해제
	 */
	$("input:radio[id='salesInfo_0']").prop("checked",true);
	$("input:radio[id='salesInfo_a']").prop("checked",true);
	$("input:radio[id='salesInfo_b']").prop("checked",true);
	
	
	if ($("#ctyDcFee2").val() > 0 || $("#ctyDcFee5").val() > 0){
		groupDcCheck = "Y";
	}
	
	// 20210525 yahan
	if ($("#rtSelVtr3Cnt").val() > 0) bohnDcFlag = 30; // 보훈할인등급
	if ($("#rtSelVtr5Cnt").val() > 0) bohnDcFlag = 50;
	if ($("#rtSelVtr7Cnt").val() > 0) bohnDcFlag = 70;
	if ($("#rtSelVtr3Cnt").val() > 1) bohnDcWith = 1; // 보훈동반여부
	if ($("#rtSelVtr5Cnt").val() > 1) bohnDcWith = 1;
	if ($("#rtSelVtr7Cnt").val() > 1) bohnDcWith = 1;
	if (bohnDcFlag > 0) $(".bohnDcRate").text(bohnDcFlag);

	
	var pathDvs = $("#pathDvs").val(); //왕복여부
	var pathStep = $("#pathStep").val(); //왕복스텝
	if(pathDvs == "rtrp" ){
		var rtrpDerpDtmHtml = "<span>가는 날</span>";
		var rtrpArvlDtmHtml = "<span>오는 날</span>";
		$("#rtrpDeprDtm").html(rtrpDerpDtmHtml+$("#deprDtmAll").val()); //가는날
		$("#rtrpArvlDtm").html(rtrpArvlDtmHtml+$("#arvlDtmAll").val()); //오는날
		$("#satsRotInfo").addClass("around");
		if($("#pathStep").val() == "2"){
			$("#seatChcPage").addClass("change_time");
			if($("#prmmDcDvsCd").val() == "4"){
				//$("#salesInfo_4").trigger("click");
				//$("#rtrpPrmmDc").css("display","block");
				
				// 20210707 yahan
				if (Number($("#ctyDcFee4").val()) == 0){
					alert("★선택하신 차량은 왕복할인이 적용되지 않습니다. \n다른 차량을 선택하여 다시 예매하시기 바랍니다");
					fnUpdAlcn();
					return;
				}
				$("input:radio[id='salesInfo_4']").prop("checked",true);
				$("#salesInfo_0").parent("li").remove();
				$("#salesInfo_a").parent("li").remove();
				$("#salesInfo_b").parent("li").remove();
				
			}else{
				$("#salesInfo_0").trigger("click");
				$("#prmmDcDvsCd").val("0");
				$("#rtrpPrmmDc").css("display","none");
			}
			 if($("#teenFeeNCntY").val() == "Y"){
				alert("★선택하신 차량은 중고생 좌석이 존재하지 않아 일반좌석으로 변경됩니다."); 
			 }
			 if($("#uvsdFeeNCntY").val() == "Y"){
				 alert("★선택하신 차량은 대학생 좌석이 존재하지 않아 일반좌석으로 변경됩니다."); 
			 }
			 if($("#sncnFeeNCntY").val() == "Y"){
				 alert("★선택하신 차량은 경로 좌석이 존재하지 않아 일반좌석으로 변경됩니다."); 
//				 location.href ="/mrs/rotinf.do";
			 }
			 if($("#dsprFeeNCntY").val() == "Y"){
				 alert("★선택하신 차량은 장애인 좌석이 존재하지 않아 일반좌석으로 변경됩니다.");
			 }
			 
			 if($("#vtr7FeeNCntY").val() == "Y"){
				 var type = "일반";
				 if($("#vtr5FeeNCntY").val() != "Y") type = "50";
				 else if($("#vtr3FeeNCntY").val() != "Y") type = "30";
				 if (type != "일반"){
					 alert("★선택하신 차량은 보훈70 좌석이 존재하지 않아 "+type+"좌석으로 변경됩니다.");
				 }else{
					 alert("★선택하신 차량은 보훈 좌석이 존재하지 않아 예매가 불가 합니다.\n다른 차량을 선택하여 다시 예매하시기 바랍니다");
					 //location.href ="/mrs/rotinf.do";
					 fnUpdAlcn();
					 return;
				 }
			 }
			 if($("#vtr5FeeNCntY").val() == "Y"){
				 var type = "일반";
				 if($("#vtr3FeeNCntY").val() != "Y") type = "30";
				 if (type != "일반"){
					 alert("★선택하신 차량은 보훈70 좌석이 존재하지 않아 "+type+"좌석으로 변경됩니다.");
				 }else{
					 alert("★선택하신 차량은 보훈 좌석이 존재하지 않아 예매가 불가 합니다.\n다른 차량을 선택하여 다시 예매하시기 바랍니다");
					 //location.href ="/mrs/rotinf.do";
					 fnUpdAlcn();
					 return;
				 }
			 }
			 if($("#vtr3FeeNCntY").val() == "Y"){
				 alert("★선택하신 차량은 보훈 좌석이 존재하지 않아 예매가 불가 합니다.\n다른 차량을 선택하여 다시 예매하시기 바랍니다");
				 //location.href ="/mrs/rotinf.do";
				 fnUpdAlcn();
				 return;
			 }
//			 if($("#dfptFeeNCntY").val() == "Y"){
//				 alert("★선택하신 차량은 후불 좌석이 존재하지 않아 예매가 불가 합니다.\n다른 차량을 선택하여 다시 예매하시기 바랍니다");
//				 //location.href ="/mrs/rotinf.do";
//				 fnUpdAlcn();
//				 return;
//			 }
		}else{
			$("#seatChcPage").removeClass("change_time");
		}
	}else{
		$("#seatChcPage").removeClass("change_time");
		if(pathDvs == "trtr" && pathStep == "1"){
			$("#satsDeprTmlNm").removeClass("opacity");
			$("#satsArvlTmlNm").addClass("opacity");
		}else if(pathDvs == "trtr" && pathStep == "2"){
			$("#seatChcPage").addClass("change_time");
			$("#satsDeprTmlNm").addClass("opacity");
			$("#satsArvlTmlNm").removeClass("opacity");
		}else{
			$("#satsDeprTmlNm").removeClass("opacity");
			$("#satsArvlTmlNm").removeClass("opacity");
		}
		$("#satsRotInfo").removeClass("around");
		$("#satsDeprDtm").text($("#deprDtmAll").val()); //날짜
	}
	$("#satsDeprTmlNm").text($("#deprNm").val()); //출발터미널
	$("#satsArvlTmlNm").text($("#arvlNm").val()); //도착터미널
	
	$("#locInf").val("sats");
	var takeDrtmAll = Number($("#takeDrtmOrg").val()); //전체소요시간
	var takeDrtm = "";
	var takeDrtmHH = parseInt(takeDrtmAll/60) ; 
	if(takeDrtmHH > 0){
		takeDrtm = parseInt(takeDrtmAll/60)+"시간 "+(takeDrtmAll%60)+"분 소요";
	}else{
		takeDrtm = (takeDrtmAll%60)+"분 소요";
	}
	$("#satsTakeDrtm").text(takeDrtm); //소요시간
	
	var distOrg = Number($("#distOrg").val()); //거리
	if(distOrg > 0){
		$("#satsDist").text($("#distOrg").val()+" Km"); //거리
	}else{
		$("#satsDist").text("-"); //거리
	}
	var prsTimeAll = $("#prsTimeAll").val();
	var chkDeprDtTime = $("#chkDeprDt").val()+""+$("#chkDeprTime").val();
	if(Number(prsTimeAll) > Number(chkDeprDtTime)){
		$("#bfrhMrsDcView").css("display","none");
	}
	
	var chkMoblieCnt = 0;
	if(Number($("#adltFee").val()) > 0){
		chkMoblieCnt++;
	}
	if(Number($("#chldFee").val()) > 0){
		chkMoblieCnt++;
	}
	if(Number($("#teenFee").val()) > 0){
		chkMoblieCnt++;
	}
	if(Number($("#uvsdFee").val()) > 0){
		chkMoblieCnt++;
	}	
	if(Number($("#sncnFee").val()) > 0){
		chkMoblieCnt++;
	}
	if(Number($("#dsprFee").val()) > 0){
		chkMoblieCnt++;
	}
	
	if(chkMoblieCnt == 2){
		$("#mobileSelCnt").addClass("col2");
	}else if(chkMoblieCnt == 3){
		$("#mobileSelCnt").addClass("col3");
	}else if(chkMoblieCnt == 4){
		$("#mobileSelCnt").addClass("col4");
	}else{
		$("#mobileSelCnt").addClass("col2");
	}
	
	if($("#ctyPrmmDcYn").val() != "Y"){
		$("#prmmDcDvsCd").val("0");
	}
	
	
	
	 $(".popLogin .remodal-close").click(function() {
		 fnCancPcpy("clk");
	});
	//$(".pop_place .remodal-close").trigger("click");
	/* if($("#tlcnTrcnUtlzPsbYn").val() == "N"){
		 alert("선택하신 차량은 모바일티켓 발권이 불가하니 \n홈티켓 발권 또는 예매 후 현장발권 하시기 바랍니다.");
	 }*/
	 
	 if ($('#extrComp').val() == 'ARMY'){
		 if ($("#tlcnTrcnUtlzPsbYn").val() == "N"){
			 setTimeout(function(){
					 alert("※검표기가 미설치된 차량입니다.\n터미널에서 재발생 (예매시 입력한 핸드폰 번호로 조회) 후 탑승하시기 바랍니다.");
			 },500);
		 }
	 
		 if (Number($("#dfptFee").val()) == 0){
			 alert("★선택하신 차량은 후불 좌석이 존재하지 않아 예매가 불가 합니다.\n다른 차량을 선택하여 다시 예매하시기 바랍니다");
			 fnUpdAlcn();
			 return;
		 }
	 }
	 
	 
	 // 뒷좌석 할인 좌석 녹색으로 표시
	 //if($("#ctyPrmmDcYn").val() == "Y" && $("#pathDvs").val() != "rtrp"){
	 // 20200724 yahan yahan 뒷좌석 할인 노출조건변경
	if ($("#ctyDcFee3").val() > 0 ) {
		 $(".last_seat").addClass("honors");
	 }
	
	 $("#agree").click(function(){
         popCrewClose(1,'Y');
         popCrewOpen(2,'Y');
     });
     
     $("#disagree").click(function(){
         popCrewClose(1,'N');
     });

     $("#close").click(function(){
         popCrewClose(2,'Y');
     });
	
});

//국민 차장제 팝업 추가 (180705)
function popCrewOpen(id, yn) {
	if(id == 2){
		$("#agrmYn").val(yn);
	}
    $('[data-remodal-id=popCrew' + id +']').remodal().open();   
}

function popCrewClose(id, yn) {
	if(id == 2){
		alert('고객님께서는 국민안전 승무원이 되셨습니다.\n<<시범운영중인 자율적 참여제도>>');
	}else{
		alert('고객님께서는 국민안전 승무원을 거부하여 적용되지 않습니다.\n<<시범운영중인 자율적 참여제도>>');
		$("#agrmYn").val(yn);
	}	
	$('[data-remodal-id=popCrew' + id +']').remodal().close();
} 

var arrSeat = new Array();
var iSel = 0;
//좌석 지정 (180702)
function fnSetSeat(num, val, seatGb){	
	if($("#prvtBbizEmpAcmtRt").val() == "Y" && val == "3" && seatGb == "adltCnt"){	//국민 차장제 대상이고 일반좌석 3번 일때
		//팝업 띄우기
		 popCrewOpen(1,'');  // 팝업 열기		
	}
	
	if (seatGb == "bohnCnt" && num >= 2){
		if (arrSeat[num-2] == undefined){
			num = num-1;
		}
	}
	for(var i=0; i<10; i++){
		arrSeat[num-1] = new Array();
		arrSeat[num-1][0] = val;
		arrSeat[num-1][1] = seatGb;	
	}
}

//왕복일때 복편 좌석 지정
function fnSetSeat2(val, seatGb){
	/**
	 * 20200331
	 * yahan -hooni
	 */
	var _allAdltChcCnt = 0;
	var _allChldChcCnt = 0;
	var _allTeenChcCnt = 0;
	var _allUvsdChcCnt = 0;
	var _allSncnChcCnt = 0;
	var _allDsprChcCnt = 0;
	var _allBohnChcCnt = 0;
	var _allDfptChcCnt = 0;
	for(var i=0; i<arrSeat.length; i++){
		if(arrSeat[i][1] == 'adltCnt') { _allAdltChcCnt++; }
		else if(arrSeat[i][1] == 'chldCnt') { _allChldChcCnt++; }
		else if(arrSeat[i][1] == 'teenCnt') { _allTeenChcCnt++; }
		else if(arrSeat[i][1] == 'uvsdCnt') { _allUvsdChcCnt++; }
		else if(arrSeat[i][1] == 'sncnCnt') { _allSncnChcCnt++; }
		else if(arrSeat[i][1] == 'dsprCnt') { _allDsprChcCnt++; }
		else if(arrSeat[i][1] == 'bohnCnt') { _allBohnChcCnt++; }
		else if(arrSeat[i][1] == 'dfptCnt') { _allDfptChcCnt++; }
	}
	
	var addSeatchk = "";
	if(_allAdltChcCnt < allAdltChcCnt) { addSeatchk = "adltCnt"; }
	if(addSeatchk == "" && _allChldChcCnt < allChldChcCnt) { addSeatchk = "chldCnt"; }
	if(addSeatchk == "" && _allTeenChcCnt < allTeenChcCnt) { addSeatchk = "teenCnt"; }
	if(addSeatchk == "" && _allUvsdChcCnt < allUvsdChcCnt) { addSeatchk = "uvsdCnt"; }
	if(addSeatchk == "" && _allSncnChcCnt < allSncnChcCnt) { addSeatchk = "sncnCnt"; }
	if(addSeatchk == "" && _allDsprChcCnt < allDsprChcCnt) { addSeatchk = "dsprCnt"; }
	if(addSeatchk == "" && _allBohnChcCnt < allBohnChcCnt) { addSeatchk = "bohnCnt"; }
	if(addSeatchk == "" && _allDfptChcCnt < allDfptChcCnt) { addSeatchk = "dfptCnt"; }

	seatGb = addSeatchk;

	/* */
	if($("#prvtBbizEmpAcmtRt").val() == "Y" && val == "3" && seatGb == "adltCnt"){	//국민 차장제 대상이고 일반좌석 3번 일때
		//팝업 띄우기
		popCrewOpen(1,'');  // 팝업 열기		
	}
	
	arrSeat[iSel] = new Array();
	arrSeat[iSel][0] = val;
	arrSeat[iSel][1] = seatGb;	
	iSel++;
}

//좌석 삭제 (180702)
function fnDelSeat(val){
	for(var i=0; i<10; i++){
		if(typeof arrSeat[i] != "undefined"){
			if(arrSeat[i][0] == val){
				if(arrSeat[i][1] == "adltCnt"){
					$("#adltCnt").text($("#adltCnt").text()-1); 
					if(val == "3"){
						$("#agrmYn").val("U");	
					}
				}
				if(arrSeat[i][1] == "chldCnt"){
					$("#chldCnt").text($("#chldCnt").text()-1);
				}
				if(arrSeat[i][1] == "teenCnt"){
					$("#teenCnt").text($("#teenCnt").text()-1);
				}
				if(arrSeat[i][1] == "uvsdCnt"){
					$("#uvsdCnt").text($("#uvsdCnt").text()-1);
				}
				if(arrSeat[i][1] == "sncnCnt"){
					$("#sncnCnt").text($("#sncnCnt").text()-1);
				}
				if(arrSeat[i][1] == "dsprCnt"){
					$("#dsprCnt").text($("#dsprCnt").text()-1);
				}
				if(arrSeat[i][1] == "bohnCnt"){
					// 20250331
					//$("#bohnCnt").text($("#bohnCnt").text()-1);
				}
//				if(arrSeat[i][1] == "dfptCnt"){
//					$("#dfptCnt").text($("#dfptCnt").text()-1);
//				}
				
				/**
				 * 20200331
				 * hooni
				 * 좌석선택 체크 오류 수정
				 */
				//arrSeat[i].length = 0;
				arrSeat.splice(i, 1);
				break;
			}			
		}
	}
}

//왕복일때 복편 좌석 삭제
function fnDelSeat2(val){
	for(var i=0; i<10; i++){
		if(typeof arrSeat[i] != "undefined"){
			if(arrSeat[i][0] == val){
				$("#agrmYn").val("U");
				/**
				 * 20200331
				 * yahan -hooni
				 */
				//arrSeat[i].length = 0;
				arrSeat.splice(i, 1);
				break;
			}			
		}
	}
	iSel--;
}

var addSeatchk = "";

function fnSeatCnt(obj,fnVal){

	fnSelSeatCnt(); //전체 선택매수설정
	
	var clkObjVal = $(obj).parents('.countBox').find('.count').text(); //+- 클릭시 기존 값
	var rmnSatsNum = $("#rmnSatsNum").val(); //잔여좌석수
	var mathVal = 0; //+- 작업후 count
	
	//좌석 권종 표시 (180702)
	var clkObjId = $(obj).parents('.countBox').find('.count').attr("id");
	
	
	if(fnVal == "add"){
		
		// 좌석 1개씩 선택 (180702)
		if($("input:checkbox[name=seatBoxDtl]:checked").length < allSelSeatCnt){
			alert("좌석을 먼저 선택해주세요.");
			return;
		}
		
		if((allSelSeatCnt+1) > Number(rmnSatsNum)){
			alert("잔여좌석수 이하로 다시 선택해 주세요.");
			return;
		}else{
			
			/*
			 * 20200331
			 * yahan
			 * 최대 예매가능매수 수정
			 * 
			if($("#ctyPrmmDcYn").val() =="Y"){ //시외우등할인시는 10매
				if($("#pathDvs").val() == "rtrp"){
					if((allSelSeatCnt+1) <= 5 ){
						mathVal = Number(clkObjVal)+1;
					}else{
						alert("매수를 총 5매 이하로 다시 선택해 주세요.");
						return;
					}
				}else{
					if((allSelSeatCnt+1) <= 10 ){
						mathVal = Number(clkObjVal)+1;
					}else{
						alert("매수를 총 10매 이하로 다시 선택해 주세요.");
						return;
					}
				}
			}else{ // 시외우등할인이 아닐시는 6매
				if($("#pathDvs").val() == "rtrp"){
					if((allSelSeatCnt+1) <= 3 ){
						mathVal = Number(clkObjVal)+1;
					}else{
						alert("매수를 총 3매 이하로 다시 선택해 주세요.");
						return;
					}
				}else{
					if((allSelSeatCnt+1) <= 6 ){
						mathVal = Number(clkObjVal)+1;
					}else{
						alert("매수를 총 6매 이하로 다시 선택해 주세요.");
						return;
					}
				}
			}
			*/

			// 좌석수 제한 체크...
			var maxSeatCnt = checkMaxSeatCnt((allSelSeatCnt+1));
			if((allSelSeatCnt+1) > maxSeatCnt ){
				return;
			}
			
			mathVal = Number(clkObjVal)+1;
			//mathVal*	
			addSeatchk = clkObjId;
			
			
			// 20210525 yahan
			if (clkObjId == "bohnCnt"){
				if (clkObjVal == '0'){
					$('[data-remodal-id="popBohun1"]').remodal().open();
					bohnDcFlag = 0; // 보훈할인등급 초기화
					bohnDcWith = 0; // 보훈동반여부 최기화
				}else{
					return;
				}
			}
			
			/**
			 * 20240608 건보공단연계
			 */
			if (clkObjId == "uvsdCnt" && ($("#deprCd").val() == '246' || $("#arvlCd").val() == '246' || $("#deprCd").val() == '244' || $("#arvlCd").val() == '244')){
				if (clkObjVal == '0'){
					$('[data-remodal-id="popNhis1"]').remodal().open();
				}else{
					return;
				}
			}
			
			
		}
	}else{
		if($("input:checkbox[name=seatBoxDtl]:checked").length >= allSelSeatCnt) {
			alert("선택된 좌석을 먼저 해제 해주세요.");
			return;
		}
		if(Number(clkObjVal) <= 0){
			mathVal = 0;
		}else{
			mathVal = Number(clkObjVal)-1;
		}
	}
	
	$(obj).parents('.countBox').find('.count').text(mathVal); 
	
	
	/**
	 * 20200326
	 * yahan
	 */
//	if($("#ctyPrmmDcYn").val() == "Y"){
//		var adltChcCnt = ($("#adltCnt").text() == 0 || $("#adltCnt").text() == "") ? 0 : $("#adltCnt").text();
//alert(adltChcCnt);
//
//		if(Number($("#ctyDcFee2").val()) > 0 && adltChcCnt >= 5 ||
//			Number($("#ctyDcFee5").val()) > 0 && adltChcCnt >= 4){
//			$("input:radio[id='salesInfo02']").attr("disabled",false);
//		}else{
//			if($("input:radio[id='salesInfo02']").is(":checked")){
//				$("#salesInfo05").trigger("click");
//			}
//			$("input:radio[id='salesInfo02']").attr("disabled",true);
//		}
//	}
	
	fnSamdDataSet();
	if($("input:checkbox[name=seatBoxDtl]:checked").length > 0){ //1좌석이상이 선택되어 있을경우 선택된 값 계산
		fnAmtClln();
	}

}



function fnSamdDataSet(){
	var clientWidth = document.body.clientWidth;
	if(clientWidth < 768){
		$("#adltCnt").text($("#adltCntMob").text());
		$("#chldCnt").text($("#chldCntMob").text());
		$("#teenCnt").text($("#teenCntMob").text());
		$("#uvsdCnt").text($("#uvsdCntMob").text());
		$("#sncnCnt").text($("#sncnCntMob").text());
		$("#dsprCnt").text($("#dsprCntMob").text());
		$("#bohnCnt").text($("#bohnCntMob").text());
		$("#dfptCnt").text($("#dfptCntMob").text());
	}else{
		$("#adltCntMob").text($("#adltCnt").text());
		$("#chldCntMob").text($("#chldCnt").text());
		$("#teenCntMob").text($("#teenCnt").text());
		$("#uvsdCntMob").text($("#uvsdCnt").text());
		$("#sncnCntMob").text($("#sncnCnt").text());
		$("#dsprCntMob").text($("#dsprCnt").text());
		$("#bohnCntMob").text($("#bohnCnt").text());
		$("#dfptCntMob").text($("#dfptCnt").text());
	}
}


function fnAmtClln(){
	//카운트
	
	var adltChcCnt = ($("#adltCnt").text() == 0 || $("#adltCnt").text() == "") ? 0 : $("#adltCnt").text();
	var chldChcCnt = ($("#chldCnt").text() == 0 || $("#chldCnt").text() == "") ? 0 : $("#chldCnt").text();
	var teenChcCnt = ($("#teenCnt").text() == 0 || $("#teenCnt").text() == "") ? 0 : $("#teenCnt").text();
	var uvsdChcCnt = ($("#uvsdCnt").text() == 0 || $("#uvsdCnt").text() == "") ? 0 : $("#uvsdCnt").text();
	var sncnChcCnt = ($("#sncnCnt").text() == 0 || $("#sncnCnt").text() == "") ? 0 : $("#sncnCnt").text();
	var dsprChcCnt = ($("#dsprCnt").text() == 0 || $("#dsprCnt").text() == "") ? 0 : $("#dsprCnt").text();
	var bohnChcCnt = ($("#bohnCnt").text() == 0 || $("#bohnCnt").text() == "") ? 0 : $("#bohnCnt").text();
	var dfptChcCnt = ($("#dfptCnt").text() == 0 || $("#dfptCnt").text() == "") ? 0 : $("#dfptCnt").text();
	
	
	/**
	 * 20200326
	 * yahan
	 */
//	if($("#ctyPrmmDcYn").val() == "Y"){
//
//		if(Number($("#ctyDcFee2").val()) > 0 && adltChcCnt >= 5 ||
//			Number($("#ctyDcFee5").val()) > 0 && adltChcCnt >= 4){
//			$("input:radio[id='salesInfo_2']").attr("disabled",false);
//		}else{
////			if($("input:radio[id='salesInfo02']").is(":checked")){
////				$("#salesInfo05").trigger("click");
////			}
//			$("input:radio[id='salesInfo_2']").prop("checked",false);
//			$("input:radio[id='salesInfo_2']").attr("disabled",true);
//		}
//	}
	
	var adltCheckCnt = 0;
	var chldCheckCnt = 0;
	var teenCheckCnt = 0;
	var uvsdCheckCnt = 0;
	var sncnCheckCnt = 0;
	var dsprCheckCnt = 0;
	var bohnCheckCnt = 0;
	var dfptCheckCnt = 0;
	
	
	/*
	if($("input:checkbox[name=seatBoxDtl]:checked").length <= adltChcCnt ){ //성인선택수
		adltCheckCnt = $("input:checkbox[name=seatBoxDtl]:checked").length;
	}else{
		adltCheckCnt = adltChcCnt;
		if($("input:checkbox[name=seatBoxDtl]:checked").length <= (Number(adltChcCnt)+Number(chldChcCnt)) ){
			chldCheckCnt = $("input:checkbox[name=seatBoxDtl]:checked").length - Number(adltChcCnt);
		}else{
			chldCheckCnt = chldChcCnt;
			if($("input:checkbox[name=seatBoxDtl]:checked").length <= (Number(adltChcCnt)+Number(chldChcCnt)+Number(teenChcCnt)) ){
				teenCheckCnt = $("input:checkbox[name=seatBoxDtl]:checked").length - Number(adltChcCnt) - Number(chldChcCnt);
			}else{
				teenCheckCnt = teenChcCnt;
				uvsdCheckCnt = $("input:checkbox[name=seatBoxDtl]:checked").length - Number(adltChcCnt) - Number(chldChcCnt) - Number(teenChcCnt);
			}
		}
	}*/
	
	//인원수 (180703)
	for(var i=0; i<10; i++){
		if(typeof arrSeat[i] != "undefined"){
			if(arrSeat[i][1] == "adltCnt"){
				adltCheckCnt++;
			}
			if(arrSeat[i][1] == "chldCnt"){
				chldCheckCnt++;
			}
			if(arrSeat[i][1] == "teenCnt"){
				teenCheckCnt++;
			}
			if(arrSeat[i][1] == "uvsdCnt"){
				uvsdCheckCnt++;
			}
			if(arrSeat[i][1] == "sncnCnt"){
				sncnCheckCnt++;
			}
			if(arrSeat[i][1] == "dsprCnt"){
				dsprCheckCnt++;
			}
			if(arrSeat[i][1] == "bohnCnt"){
				bohnCheckCnt++;
			}
			if(arrSeat[i][1] == "dfptCnt"){
				dfptCheckCnt++;
			}
		}		
	}
	
	
	//단가금액
	var adltUprc = $("#adltFee").val(); //일반
	var chldUprc = $("#chldFee").val();
	var teenUprc = $("#teenFee").val();
	var uvsdUprc = $("#uvsdFee").val();
	var sncnUprc = $("#sncnFee").val();
	var dsprUprc = $("#dsprFee").val();
	var bohnUprc = 0;
	if (bohnDcFlag == 30) bohnUprc = $("#vtr3Fee").val();
	if (bohnDcFlag == 50) bohnUprc = $("#vtr5Fee").val();
	if (bohnDcFlag == 70) bohnUprc = $("#vtr7Fee").val();
	var dfptUprc = $("#dfptFee").val();
	
	var adltCllnUprc = Number(adltCheckCnt) * Number(adltUprc); 
	var chldCllnUprc = Number(chldCheckCnt) * Number(chldUprc);
	var teenCllnUprc = Number(teenCheckCnt) * Number(teenUprc);
	var uvsdCllnUprc = Number(uvsdCheckCnt) * Number(uvsdUprc);
	var sncnCllnUprc = Number(sncnCheckCnt) * Number(sncnUprc);
	var dsprCllnUprc = Number(dsprCheckCnt) * Number(dsprUprc);
	var bohnCllnUprc = Number(bohnCheckCnt) * Number(bohnUprc);
	var dfptCllnUprc = Number(dfptCheckCnt) * Number(dfptUprc);
	var AllCllnUprc = adltCllnUprc+chldCllnUprc+teenCllnUprc+uvsdCllnUprc+sncnCllnUprc+dsprCllnUprc+bohnCllnUprc+dfptCllnUprc;
	
	$("#adltSeatCnt").text(adltCheckCnt+"명");
	$("#chldSeatCnt").text(chldCheckCnt+"명");
	$("#teenSeatCnt").text(teenCheckCnt+"명");
	$("#uvsdSeatCnt").text(uvsdCheckCnt+"명");
	$("#sncnSeatCnt").text(sncnCheckCnt+"명");
	$("#dsprSeatCnt").text(dsprCheckCnt+"명");
	$("#bohnSeatCnt").text(bohnCheckCnt+"명");
	$("#dfptSeatCnt").text(dfptCheckCnt+"명");
	
	$("#adltTotAmt").text(comma(adltCllnUprc)+"원");
	$("#chldTotAmt").text(comma(chldCllnUprc)+"원");
	$("#teenTotAmt").text(comma(teenCllnUprc)+"원");
	$("#uvsdTotAmt").text(comma(uvsdCllnUprc)+"원");
	$("#sncnTotAmt").text(comma(sncnCllnUprc)+"원");
	$("#dsprTotAmt").text(comma(dsprCllnUprc)+"원");
	$("#bohnTotAmt").text(comma(bohnCllnUprc)+"원");
	$("#dfptTotAmt").text(comma(dfptCllnUprc)+"원");
	
	$("#allTotAmtLocU").text(comma(AllCllnUprc)+"원");
	
	$("#adltTotPrice").val(adltCllnUprc);
	$("#chldTotPrice").val(chldCllnUprc);
	$("#teenTotPrice").val(teenCllnUprc);
	$("#allTotAmtPrice").val(AllCllnUprc);
	
	
	//할인 금액을 내려줄경우
	var bfrhMrsDc =  (Number($("#ctyDcFee1").val())*Number(adltCheckCnt));
	var grpMrsDc = 0;
	// 단체할인적용 5명 이상 선택시 금액 노출, 5명 미만은 0원으로 노출 
	if(Number($("#ctyDcFee2").val()) > 0 && adltCheckCnt >= 5){
		grpMrsDc =   (Number($("#ctyDcFee2").val())*Number(adltCheckCnt));
	}else
	// 단체할인적용 4명 이상 선택시 금액 노출, 4명 미만은 0원으로 노출
	if(Number($("#ctyDcFee5").val()) > 0 && adltCheckCnt >= 4){
		grpMrsDc =   (Number($("#ctyDcFee5").val())*Number(adltCheckCnt));
	}
	var rtrpMrsDc =  (Number($("#ctyDcFee4").val())*Number(adltCheckCnt)); 
	var fnlSeatCnt = $("#ctyDcFee3Cnt").val();
	var fnlSatsMrsDc = 0;
	if(adltCheckCnt >= fnlSeatCnt){
		fnlSatsMrsDc =  (Number($("#ctyDcFee3").val())*Number(fnlSeatCnt));
	}else{
		fnlSatsMrsDc =  (Number($("#ctyDcFee3").val())*Number(adltCheckCnt));
	}
	var dayAdltDc = 0, dayEtcDc = 0, holiAdltDc = 0, holiEtcDc = 0;
	if (feeList['1_a'] != undefined) dayAdltDc += Number(adltCheckCnt)*(Number(feeList['1_0'])-Number(feeList['1_a']));
	if (feeList['1_b'] != undefined) holiAdltDc += Number(adltCheckCnt)*(Number(feeList['1_0'])-Number(feeList['1_b']));
	
	if (feeList['2_a'] != undefined) dayEtcDc += Number(chldCheckCnt)*(Number(feeList['2_0'])-Number(feeList['2_a']));
	if (feeList['9_a'] != undefined) dayEtcDc += Number(teenCheckCnt)*(Number(feeList['9_0'])-Number(feeList['9_a']));
	if (feeList['8_a'] != undefined) dayEtcDc += Number(uvsdCheckCnt)*(Number(feeList['8_0'])-Number(feeList['8_a']));
	if (feeList['o_a'] != undefined) dayEtcDc += Number(sncnCheckCnt)*(Number(feeList['o_0'])-Number(feeList['o_a']));
	if (feeList['d_a'] != undefined) dayEtcDc += Number(dsprCheckCnt)*(Number(feeList['d_0'])-Number(feeList['d_a']));
	
	if (feeList['2_b'] != undefined) holiEtcDc += Number(chldCheckCnt)*(Number(feeList['2_0'])-Number(feeList['2_b']));
	if (feeList['9_b'] != undefined) holiEtcDc += Number(teenCheckCnt)*(Number(feeList['9_0'])-Number(feeList['9_b']));
	if (feeList['8_b'] != undefined) holiEtcDc += Number(uvsdCheckCnt)*(Number(feeList['8_0'])-Number(feeList['8_b']));
	if (feeList['o_b'] != undefined) holiEtcDc += Number(sncnCheckCnt)*(Number(feeList['o_0'])-Number(feeList['o_b']));
	if (feeList['d_b'] != undefined) holiEtcDc += Number(dsprCheckCnt)*(Number(feeList['d_0'])-Number(feeList['d_b']));

	if (bohnDcFlag == 30){
		if (feeList['3_a'] != undefined) dayEtcDc += Number(bohnCheckCnt)*(Number(feeList['3_0'])-Number(feeList['3_a']));
		if (feeList['3_b'] != undefined) holiEtcDc += Number(bohnCheckCnt)*(Number(feeList['3_0'])-Number(feeList['3_b']));
	}
	if (bohnDcFlag == 50){
		if (feeList['4_a'] != undefined) dayEtcDc += Number(bohnCheckCnt)*(Number(feeList['4_0'])-Number(feeList['4_a']));
		if (feeList['4_b'] != undefined) holiEtcDc += Number(bohnCheckCnt)*(Number(feeList['4_0'])-Number(feeList['4_b']));
	}
	if (bohnDcFlag == 70){
		if (feeList['j_a'] != undefined) dayEtcDc += Number(bohnCheckCnt)*(Number(feeList['j_0'])-Number(feeList['j_a']));
		if (feeList['j_b'] != undefined) holiEtcDc += Number(bohnCheckCnt)*(Number(feeList['j_0'])-Number(feeList['j_b']));
	}
	if (feeList['6_a'] != undefined) dayEtcDc += Number(dfptCheckCnt)*(Number(feeList['6_0'])-Number(feeList['6_a']));
	if (feeList['6_b'] != undefined) holiEtcDc += Number(dfptCheckCnt)*(Number(feeList['6_0'])-Number(feeList['6_b']));

	/**
	 * 20200724 yahan
	 * 미할인 기본 선택후 할인 있을때 기본해제
	 */
	// 사전예매할인금액 셋팅
	if ($("#bfrhMrsDcView").css("display") == "none"){
		bfrhMrsDc = 0;
	}
	// 왕복예매할인금액 셋팅
	if ($("#pathDvs").val() != "rtrp"){
		rtrpMrsDc = 0;
	}
	var dc_total = Number(bfrhMrsDc)+Number(grpMrsDc)+Number(rtrpMrsDc)+Number(fnlSatsMrsDc);
	if (dc_total > 0){
		if (none_click == 0){
			$("input:radio[id='salesInfo_0']").prop("checked",false);
		}
	} else {
		$("input:radio[id='salesInfo_0']").prop("checked",true);
	}
	none_click = 0;
	
	
	var dayMrsDc = dayAdltDc;
	var holiMrsDc= holiAdltDc;
	if (bfrhMrsDc) 						bfrhMrsDc	+= dayEtcDc + holiEtcDc;
	if (grpMrsDc) 						grpMrsDc  	+= dayEtcDc + holiEtcDc;
	if (fnlSatsMrsDc) 					fnlSatsMrsDc+= dayEtcDc + holiEtcDc;
	if (rtrpMrsDc) 						rtrpMrsDc 	+= dayEtcDc + holiEtcDc;
	if (dayMrsDc  || adltCheckCnt==0)	dayMrsDc 	+= dayEtcDc + holiEtcDc;
	if (holiMrsDc || adltCheckCnt==0)	holiMrsDc 	+= dayEtcDc + holiEtcDc;
	
		
	$("#bfrhMrsDc").text(comma(bfrhMrsDc)+"원"); //사전예매할인금액
	fnRadioCheck("1", bfrhMrsDc);
	$("#grpMrsDc").text(comma(grpMrsDc)+"원"); //단체예매할인금액
	if(Number($("#ctyDcFee2").val()) > 0 && Number(grpMrsDc) > 0){
		fnRadioCheck("2", grpMrsDc);
	}
	if (Number($("#ctyDcFee5").val()) > 0 && Number(grpMrsDc) > 0){
		fnRadioCheck("5", grpMrsDc);
	}
	$("#fnlSatsMrsDc").text(comma(fnlSatsMrsDc)+"원"); //뒷좌석예매할인금액
	fnRadioCheck("3", fnlSatsMrsDc);
	$("#rtrpMrsDc").text(comma(rtrpMrsDc)+"원"); //왕복예매할인금액
	fnRadioCheck("4", rtrpMrsDc);
	$("#dayMrsDc").text(comma(dayMrsDc)+"원"); //주중할인금액
	fnRadioCheck("a", dayMrsDc);
	$("#holiMrsDc").text(comma(holiMrsDc)+"원"); //주말할인금액
	fnRadioCheck("b", holiMrsDc);
	// 화면에 출력하는 할인금액
	//-----------------------------------------


	var salesInfo = $("input:radio[name='salesInfo']:checked").val();
	if (salesInfo == undefined){
		// 20210706 할인이 체크된게 없으면 미할인을 기본으로 체크하자.
		if ($("#salesInfo_a").length) $("input:radio[id='salesInfo_a']").prop("checked",true);
		if ($("#salesInfo_b").length) $("input:radio[id='salesInfo_b']").prop("checked",true);
		if ($("#salesInfo_0").length) $("input:radio[id='salesInfo_0']").prop("checked",true);

		salesInfo = $("input:radio[name='salesInfo']:checked").val();
	}
	$("#prmmDcDvsCd").val(salesInfo);
	
	var dcTotalPrc = 0;
	var prmmDcDvsCdChk = $("#prmmDcDvsCd").val();
	
	
	if(prmmDcDvsCdChk == "0"){//미할인
		dcTotalPrc = 0;
	}else if(prmmDcDvsCdChk == "1"){//사전
		dcTotalPrc = bfrhMrsDc;
	}else if(prmmDcDvsCdChk == "2" || prmmDcDvsCdChk == "5"){//단체
		dcTotalPrc = grpMrsDc;
	}else if(prmmDcDvsCdChk == "3"){ //뒷좌석
		dcTotalPrc = fnlSatsMrsDc;
	}else if(prmmDcDvsCdChk == "4"){ //왕복
		dcTotalPrc = rtrpMrsDc;
	}else if(prmmDcDvsCdChk == "a"){ //주중
		dcTotalPrc = dayMrsDc;
	}else if(prmmDcDvsCdChk == "b"){ //주말
		dcTotalPrc = holiMrsDc;
	}
	
	var AllCllnDcUprc = AllCllnUprc - dcTotalPrc;
	
	$("#allTotAmtLocD").text(comma(AllCllnDcUprc)+"원");
}

function fnRadioCheck(num, dc){
	if (Number(dc) > 0){
		$("input:radio[id='salesInfo_"+num+"']").attr("disabled",false);
	}else{
		$("input:radio[id='salesInfo_"+num+"']").prop("checked",false);
		$("input:radio[id='salesInfo_"+num+"']").attr("disabled",true);
	}
}

function fnSelSeatCnt(){
	var clientWidth = document.body.clientWidth;
	if(clientWidth < 768){
		allAdltChcCnt = ($("#adltCntMob").text() == 0 || $("#adltCntMob").text() == "") ? 0 : $("#adltCntMob").text();
		allChldChcCnt = ($("#chldCntMob").text() == 0 || $("#chldCntMob").text() == "") ? 0 : $("#chldCntMob").text();
		allTeenChcCnt = ($("#teenCntMob").text() == 0 || $("#teenCntMob").text() == "") ? 0 : $("#teenCntMob").text();
		allUvsdChcCnt = ($("#uvsdCntMob").text() == 0 || $("#uvsdCntMob").text() == "") ? 0 : $("#uvsdCntMob").text();
		allSncnChcCnt = ($("#sncnCntMob").text() == 0 || $("#sncnCntMob").text() == "") ? 0 : $("#sncnCntMob").text();
		allDsprChcCnt = ($("#dsprCntMob").text() == 0 || $("#dsprCntMob").text() == "") ? 0 : $("#dsprCntMob").text();
		allBohnChcCnt = ($("#bohnCntMob").text() == 0 || $("#bohnCntMob").text() == "") ? 0 : $("#bohnCntMob").text();
		allDfptChcCnt = ($("#dfptCntMob").text() == 0 || $("#dfptCntMob").text() == "") ? 0 : $("#dfptCntMob").text();
	}else{
		allAdltChcCnt = ($("#adltCnt").text() == 0 || $("#adltCnt").text() == "") ? 0 : $("#adltCnt").text();
		allChldChcCnt = ($("#chldCnt").text() == 0 || $("#chldCnt").text() == "") ? 0 : $("#chldCnt").text();
		allTeenChcCnt = ($("#teenCnt").text() == 0 || $("#teenCnt").text() == "") ? 0 : $("#teenCnt").text();
		allUvsdChcCnt = ($("#uvsdCnt").text() == 0 || $("#uvsdCnt").text() == "") ? 0 : $("#uvsdCnt").text();
		allSncnChcCnt = ($("#sncnCnt").text() == 0 || $("#sncnCnt").text() == "") ? 0 : $("#sncnCnt").text();
		allDsprChcCnt = ($("#dsprCnt").text() == 0 || $("#dsprCnt").text() == "") ? 0 : $("#dsprCnt").text();
		allBohnChcCnt = ($("#bohnCnt").text() == 0 || $("#bohnCnt").text() == "") ? 0 : $("#bohnCnt").text();
		allDfptChcCnt = ($("#dfptCnt").text() == 0 || $("#dfptCnt").text() == "") ? 0 : $("#dfptCnt").text();
	}
	allSelSeatCnt = Number(allAdltChcCnt) + Number(allChldChcCnt) + Number(allTeenChcCnt) + 
					Number(allUvsdChcCnt) + Number(allSncnChcCnt) + Number(allDsprChcCnt) + Number(allBohnChcCnt) + Number(allDfptChcCnt);
}

var selectedSeatIds = [];

function fnSeatChc(obj, id){
	
	 
	
	if($(obj).parents('.seatBox').hasClass("wheel")){
		alert("휠체어 우선 예매 가능 좌석입니다.\n다른 좌석을 선택해주세요.");
		$("input:checkbox[name=seatBoxDtl]").first().focus();
		obj.checked = false;
		return;
	}
	
	
	fnSelSeatCnt();	

	if(obj.checked == true){
		if(allSelSeatCnt <= 0){
			alert("매수를 먼저 선택해 주세요.");
			
			function moveFocusToNextElement() {
				var $currentElement = $(document.activeElement);
				var $focusableElements = $('button, [href]');
				var currentIndex = $focusableElements.index($currentElement);
				
				if (currentIndex >= 0 && currentIndex < $focusableElements.length - 1) {
					$focusableElements.eq(currentIndex + 1).focus();
				}
			}
			
			var allZero = true;
			$(".text_num.count").each(function() {
				if ($(this).text().trim() != '0') {
					allZero = false;
					return false;
				}
			});
			
			if(allZero) {
				$(".btn_refresh").first().focus();
				moveFocusToNextElement();
			}
			
			obj.checked = false;
			return;
		}
		
		//왕복 or 환승이고 복편일 경우 (매수가 확정이므로 권종 지정 필요)
		if($("#pathDvs").val() == "rtrp" || $("#pathDvs").val() == "trtr"){
			if($("#pathStep").val() == "2"){
				if($("input:checkbox[name=seatBoxDtl]:checked").length <= Number(allAdltChcCnt)){
					addSeatchk = "adltCnt";
				}else if($("input:checkbox[name=seatBoxDtl]:checked").length <= Number(allAdltChcCnt) + Number(allChldChcCnt)){
					addSeatchk = "chldCnt";
				}else if($("input:checkbox[name=seatBoxDtl]:checked").length <= Number(allAdltChcCnt) + Number(allChldChcCnt) + Number(allTeenChcCnt)){
					addSeatchk = "teenCnt";
				}else if($("input:checkbox[name=seatBoxDtl]:checked").length <= Number(allAdltChcCnt) + Number(allChldChcCnt) + Number(allTeenChcCnt) + Number(allUvsdChcCnt)){
					addSeatchk = "uvsdCnt";
				}else if($("input:checkbox[name=seatBoxDtl]:checked").length <= Number(allAdltChcCnt) + Number(allChldChcCnt) + Number(allTeenChcCnt) + Number(allUvsdChcCnt) + Number(allSncnChcCnt)){
					addSeatchk = "sncnCnt";
				}else if($("input:checkbox[name=seatBoxDtl]:checked").length <= Number(allAdltChcCnt) + Number(allChldChcCnt) + Number(allTeenChcCnt) + Number(allUvsdChcCnt) + Number(allSncnChcCnt) + Number(allDsprChcCnt)){
					addSeatchk = "dsprCnt";
				}else if($("input:checkbox[name=seatBoxDtl]:checked").length <= Number(allAdltChcCnt) + Number(allChldChcCnt) + Number(allTeenChcCnt) + Number(allUvsdChcCnt) + Number(allSncnChcCnt) + Number(allDsprChcCnt) + Number(allBohnChcCnt)){
					addSeatchk = "bohnCnt";
				}else if($("input:checkbox[name=seatBoxDtl]:checked").length <= Number(allAdltChcCnt) + Number(allChldChcCnt) + Number(allTeenChcCnt) + Number(allUvsdChcCnt) + Number(allSncnChcCnt) + Number(allDsprChcCnt) + Number(allBohnChcCnt) + Number(allDfptChcCnt)){
					addSeatchk = "dfptCnt";
				}
			}
		}
		else{
			if (addSeatchk == '' && Number(allDfptChcCnt) > 0){
				addSeatchk = "dfptCnt";
			}
		}
		var seatCheckLength = $("input:checkbox[name=seatBoxDtl]:checked").length;
		if(seatCheckLength > allSelSeatCnt){
			//alert("좌석을 초과 선택하셨습니다. 현재선택하신 매수는"+seatCheckLength+"매 입니다.");
			alert("좌석을 초과 선택하셨습니다.");
			obj.checked = false;
			return;
		}else{
			
			// 좌석수 제한 체크...
			var maxSeatCnt = checkMaxSeatCnt(seatCheckLength);
			if(seatCheckLength > maxSeatCnt ){
				obj.checked = false;
				return;
			}
			
			if(seatCheckLength == allSelSeatCnt){
				$("#satsChcCfmBtn").removeClass("ready");
				if(($("#pathDvs").val() == "rtrp" && $("#pathStep").val() == "2") 
					|| ($("#pathDvs").val() == "trtr" && $("#pathStep").val() == "2")){	//왕복이고 복편일 경우
					fnSetSeat2($("input:checkbox[id="+id+"]").val(), addSeatchk);	//좌석지정(180703)
				}else{
					fnSetSeat(allSelSeatCnt, $("input:checkbox[id="+id+"]").val(), addSeatchk);	//좌석지정(180703)
				}
			}else{
				$("#satsChcCfmBtn").addClass("ready");
				if(($("#pathDvs").val() == "rtrp" && $("#pathStep").val() == "2") || 
					($("#pathDvs").val() == "trtr" && $("#pathStep").val() == "2")){	//왕복이고 복편일 경우
					fnSetSeat2($("input:checkbox[id="+id+"]").val(), addSeatchk);	//좌석지정(180703)
				}else{
					fnSetSeat(allSelSeatCnt, $("input:checkbox[id="+id+"]").val(), addSeatchk);	//좌석지정(180703)
				}
			}
		}
		
		if (obj.checked) {
        // 선택 시 배열에 추가 (중복 방지)
        if (!selectedSeatIds.includes(id)) {
            selectedSeatIds.push(id);
        }
    } else {
        // 선택 취소 시 배열에서 제거
        selectedSeatIds = selectedSeatIds.filter(seatId => seatId !== id);
        
        
    }
		
	}else{
		if($("input:checkbox[name=seatBoxDtl]:checked").length < allSelSeatCnt){
			$("#satsChcCfmBtn").addClass("ready");
			if(($("#pathDvs").val() == "rtrp" && $("#pathStep").val() == "2") 
				|| ($("#pathDvs").val() == "trtr" && $("#pathStep").val() == "2")){	//왕복이고 복편일 경우
				fnDelSeat2($("input:checkbox[id="+id+"]").val());		//좌석삭제(180703)
			}else{
				fnDelSeat($("input:checkbox[id="+id+"]").val());		//좌석삭제(180703)
			}
		}
	}
	
	var chcSeatNum = "";
	var chcSeatNumComma = "";
//	var lastSeatChkCnt = $("#ctyDcFee3Cnt").val();
	var lastSeatChkCnt = 0;
	var adltCntChk = $("#adltCnt").text();
	$("input:checkbox[name=seatBoxDtl]").each(function(index){
		if(this.checked == true){
			if(chcSeatNum.length <= 0){
				chcSeatNum = $(this).val();
				chcSeatNumComma = $(this).val();
			}else{
				chcSeatNum += ":"+$(this).val();
				chcSeatNumComma += ", "+$(this).val();
			}
			//마지막좌석 선택 카운트
			if($(this).parents('.seatBox').hasClass("last_seat")){
				/**
				 * 20200331
				 * yahan
				 * 뒷좌석 할인 일반만 카운트하기
				 */
				//lastSeatChkCnt++;
				var seatid = $(this).val();
				arrSeat.forEach(function(el){
					if (el[0] == seatid && el[1] == "adltCnt") {
						lastSeatChkCnt++;
					}
				});
			}			
		}		
	});
	if(lastSeatChkCnt > adltCntChk){
		lastSeatChkCnt = adltCntChk;
	}
	$("#ctyDcFee3Cnt").val(lastSeatChkCnt); //뒷좌석
	
	if($("input:checkbox[name=seatBoxDtl]:checked").length > 0){
		$("#selSeatNum").val(chcSeatNum);
		$("#selSeatView").text(chcSeatNumComma+"번");
	}else{
		$("#selSeatNum").val("");
		$("#selSeatView").text("좌석을 선택해주세요");
		$("input:radio[id='salesInfo_3']").attr("checked",false);
	}	
	fnAmtClln();
	
	
	// ★ 여기부터 배열 동기화 추가 코드 ★
	if(obj.checked){
	    if(!selectedSeatIds.includes(id)){
	        selectedSeatIds.push(id);
	    }
	}else{
	    selectedSeatIds = selectedSeatIds.filter(seatId => seatId !== id);
	}
	
}



function fnCtyPrmmDC(ctyPrmmCd){
	//alert(ctyPrmmCd);//last_seat
	/* 	 0 : 미할인, 1 : 사전할인, 2 : 단체할인, 3 : 뒤좌석할인, 4 : 왕복할인 */
	//$(".last_seat").removeClass("honors");
	
	$("#prmmDcDvsCd").val(ctyPrmmCd);
	//시외우등 할인선택시 부가상품이 있는경우(1인예매시)		
	if(ctyPrmmCd == "1"){//사전할인
//		$("#prmmDcDvsCd").val("1");
	}else if(ctyPrmmCd == "2" || ctyPrmmCd == "5"){//단체할인
		$('[data-remodal-id=modal02]').remodal().open();
	}else if(ctyPrmmCd == "3"){//뒷좌석할인
//		$("#prmmDcDvsCd").val("3");
		//$(".last_seat").addClass("honors");
	}else if(ctyPrmmCd == "4"){//왕복할인
		if($("#pathStep").val() == "2"){
			fnFeeOk("4");
		}else{
			if(allAdltChcCnt > 0){
				$('[data-remodal-id=modal03]').remodal().open();
			}else{
				$("input:radio[id='salesInfo_4']").attr("checked",false);
			}
		}
	}else if(ctyPrmmCd == "a"){//주중
	}else if(ctyPrmmCd == "b"){//주말
	}else{
		$("#prmmDcDvsCd").val("0");
		none_click = 1;
		
		// 좌석수 제한 체크...
		var maxSeatCnt = checkMaxSeatCnt(allSelSeatCnt);
		if(allSelSeatCnt > maxSeatCnt ){
			if ($("#ctyDcFee2").val() > 0) {
				$("input:radio[id='salesInfo_2']").prop("checked",true);
			}
			if ($("#ctyDcFee5").val() > 0) {
				$("input:radio[id='salesInfo_5']").prop("checked",true);
			}
			return;
		}
	}
	
	if($("input:checkbox[name=seatBoxDtl]:checked").length > 0){ //1좌석이상이 선택되어 있을경우 선택된 값 계산
		fnAmtClln();
	}
}



function fnFeeCanc(chcCnt){
	$("#prmmDcDvsCd").val("0");
//	$("#salesInfo05").trigger("click");
	/**
	 * 20200724 yahan 미할인 기본 선택후 할인 있을때 기본해제
	 */
	$("input:radio[id='salesInfo_1']").attr("checked",false);
	$("input:radio[id='salesInfo_2']").attr("checked",false);
	$("input:radio[id='salesInfo_3']").attr("checked",false);
	$("input:radio[id='salesInfo_4']").attr("checked",false);
	$("input:radio[id='salesInfo_5']").attr("checked",false);

	if($("input:checkbox[name=seatBoxDtl]:checked").length > 0){ //1좌석이상이 선택되어 있을경우 선택된 값 계산
		fnAmtClln();
	}
}



function fnFeeOk(chcCnt){

//	if(chcCnt == '2'){
//		$("#prmmDcDvsCd").val("2");//단체할인코드
//	}else if(chcCnt == '4'){
//		$("#prmmDcDvsCd").val("4");//왕복할인코드
//	}
	$("#prmmDcDvsCd").val(chcCnt);
	
	if($("input:checkbox[name=seatBoxDtl]:checked").length > 0){ //1좌석이상이 선택되어 있을경우 선택된 값 계산
		fnAmtClln();
	}
}

/**
 * 보훈처 연계
 */
function fnBohnCan(){
	$("#bohnCnt").text('0');
	$('[data-remodal-id=popBohun1]').remodal().close();
}
function fnBohnOk(){
		
	if ($('#number').val() == ''){
		alert("보훈번호를 입력하세요.");
		$('#number').focus();
		return;
	}
	if ($('#birth').val().length != 8){
		alert("생년월일 8자리를 확인하세요.");
		$('#birth').focus();
		return;
	}
	hpNumber = $('#hpnumber').val();
	hpNumber = hpNumber.replace(/-/g,"");
	$('#hpnumber').val(hpNumber)
	if (hpNumber.length != 10 && hpNumber.length != 11){
		alert("휴대폰번호를 확인하세요.");
		$('#hpnumber').focus();
		return;
	}
	if($("input:radio[name=companion_check]:checked").length == 0){
		alert("동반자 여부를 선택하세요.");
		return;
	}
	if($("input:checkbox[name=agree1]:checked").length == 0){
		alert("'운임 할인을 위한 국가유공자 자격정보 수집/활용'에 동의하셔야 합니다.");
		return;
	}
	if($("input:checkbox[name=agree2]:checked").length == 0){
		alert("'자격정보 제3자 제공'에 동의하셔야 합니다.");
		return;
	}
	
	var bohnCheckForm = $("form[name=bohnCheckForm]").serialize();
//	console.log(bohnCheckForm);
	var url = "/mrs/bohnLevelCheck.ajax";
	
	$("#loading").show();
	$.ajax({	
        url      : url,
        type     : "post",
        data     : bohnCheckForm,
        dataType : "json",
        async    : true,
        success  : function(data){
        	console.log(data);
        	$("#loading").hide();
        	
        	if (data.status == "S" && data.return_code == "01"){
        		bohnDcFlag = Number(data.REDUCTION_RATE);
        		bohnDcWith = (data.COMPANION_YN=="Y") ? 1 : 0;
        		
            	if (bohnDcFlag == 0){
    	    		alert("보훈번호 인증에 실패하였거나 보훈할인 대상자가 아닙니다.\n다시 선택해 주세요.");
    	    		$("#bohnCnt").text('0');
    	    	}else{
	        		
	        		if(bohnDcWith == 0 && 
	    				$("input:radio[name=companion_check]:checked").val() == "Y"){
	    				alert("동반자 할인이 불가합니다.\n본인만 할인적용됩니다.");
	    			}
	    			if(bohnDcWith == 1 && 
	    				$("input:radio[name=companion_check]:checked").val() == "Y"){
	    				var bohnCnt = $("#bohnCnt").text();
	    				bohnCnt++;
	    				$("#bohnCnt").text(bohnCnt);
	    			}
	    			$(".bohnDcRate").text(bohnDcFlag);
	        		
	    			fnSelSeatCnt();
	    			// 좌석수 제한 체크...
	    			var maxSeatCnt = checkMaxSeatCnt(allSelSeatCnt);
	    			if(allSelSeatCnt > maxSeatCnt ){
	    				$("#bohnCnt").text('0');
	    				bohnDcFlag = 0; // 보훈할인등급 초기화
	    				bohnDcWith = 0; // 보훈동반여부 최기화
	    				return;
	    			}
    	    	}
        	}else{
        		bohnDcFlag = 0;
        		var msg = data.return_msg;
        		if (msg != "") msg += "\n";
        		msg += data.error_msg + " ["+data.return_code+"]";
        		alert(msg);
        	}
        	
        	
			$('[data-remodal-id=popBohun1]').remodal().close();
        },
        error:function (e){
        	console.log(e);
        }
	});
}
function fnBohnOk_test(){
	if ($('#number').val() == ''){
		alert("보훈번호를 입력하세요.");
		$('#number').focus();
		return;
	}
	if ($('#birth').val().length != 8){
		alert("생년월일 8자리를 확인하세요.");
		$('#birth').focus();
		return;
	}
//	hpNumber = $('#hpnumber').val();
//	hpNumber = hpNumber.replace(/-/g,"");
//	$('#hpnumber').val(hpNumber)
//	if (hpNumber.length != 10 && hpNumber.length != 11){
//		alert("휴대폰번호를 확인하세요.");
//		$('#hpnumber').focus();
//		return;
//	}
	if($("input:radio[name=companion_check]:checked").length == 0){
		alert("동반자 여부를 선택하세요.");
		return;
	}
	if($("input:checkbox[name=agree1]:checked").length == 0){
		alert("'운임 할인을 위한 국가유공자 자격정보 수집/활용'에 동의하셔야 합니다.");
		return;
	}
	if($("input:checkbox[name=agree2]:checked").length == 0){
		alert("'자격정보 제3자 제공'에 동의하셔야 합니다.");
		return;
	}
	
	var bohnCheckForm = $('#bohnCheckForm').serialize();
	console.log(bohnCheckForm);
	
	// 테스트용 연동후에는 삭제
	if ($('#vtr7Fee').val() > '0' &&
		confirm("보훈70으로 진행하십니까?\n\nㅇ취소를 누르면 보훈50/보훈30을 선택 할수있습니다.") == true){
		bohnDcFlag = 70;
	}else if (confirm("보훈50으로 진행하십니까?\n\nㅇ취소를 누르면 보훈보훈30을 선택 할수있습니다.") == true){
		bohnDcFlag = 50;
	}else if (confirm("보훈30으로 진행하십니까?") == true){
		bohnDcFlag = 30;
	}else{
		bohnDcFlag = 0;
	}
// 20210612 yahan 여기서 체크가 필요한지 모르겠음
//	// 보훈할인율가 보훈권종 체크.. 없으면 하위권종
//	if (bohnDcFlag == 70 && ($("#vtr7Fee").val() == '0' || $("#vtr7Fee").val() == '')){
//		alert("★선택하신 차량은 보훈70 좌석이 존재하지 않아 보훈50으로 적용됩니다.");
//		bohnDcFlag = 50;
//	}
//	if (bohnDcFlag == 50 && ($("#vtr5Fee").val() == '0' || $("#vtr5Fee").val() == '')){
//		alert("★선택하신 차량은 보훈50 좌석이 존재하지 않아 보훈30으로 적용됩니다.");
//		bohnDcFlag = 30;
//	}
//	if (bohnDcFlag == 30 && ($("#vtr3Fee").val() == '0' || $("#vtr3Fee").val() == '')){
//		alert("★선택하신 차량은 보훈30 좌석이 존재하지 않아 일반좌석으로 적용됩니다.");
//		bohnDcFlag = 0;
//	}

	if (bohnDcFlag == 0){
		alert("보훈번호 인증에 실패하였거나 보훈할인 대상자가 아닙니다.\n다시 선택해 주세요.");
		$("#bohnCnt").text('0');
	}else{
		// 테스트용 연동후에는 삭제
		if (confirm("*동반자를 포함할까요?\n\n ㅇ동반자 포함은 확인, 미포함은 취소를 누르세요") == true){
			bohnDcWith = 1;
		}
		if(bohnDcWith == 0 && 
			$("input:radio[name=companion_check]:checked").val() == "Y"){
			alert("동반자 할인이 불가합니다.\n본인만 할인적용됩니다.");
		}
		if(bohnDcWith == 1 && 
			$("input:radio[name=companion_check]:checked").val() == "Y"){
			var bohnCnt = $("#bohnCnt").text();
			bohnCnt++;
			$("#bohnCnt").text(bohnCnt);
		}
		$(".bohnDcRate").text(bohnDcFlag);
	}
//	$.ajax({	
//        url      : "/mrs/satsChcLoginChk.ajax",
//        type     : "post",
//        data     : rotInfFrm,
//        dataType : "json",
//        async    : true,
//        success  : function(data){
//        	
//alert(data);
//
//			$('[data-remodal-id=popBohun1]').remodal().close();
//        },
//        error:function (e){
//        	fnCancPcpy();
//        }
//	});
	
	$('[data-remodal-id=popBohun1]').remodal().close();
	
	
	
	fnSelSeatCnt();
	// 좌석수 제한 체크...
	var maxSeatCnt = checkMaxSeatCnt(allSelSeatCnt);
	if(allSelSeatCnt > maxSeatCnt ){
		$("#bohnCnt").text('0');
		bohnDcFlag = 0; // 보훈할인등급 초기화
		bohnDcWith = 0; // 보훈동반여부 최기화
		return;
	}
}

/**
 * 20240608 건보공단연계
 */
function fnNhisCan(){
	$("#uvsdCnt").text('0');
	$('[data-remodal-id=popNhis1]').remodal().close();
}
function fnNhisOk(){
		
	if ($('#nhis_number').val() == '' || $('#nhis_number').val().length != 6){
		alert("사원번호를 입력하세요.");
		$('#nhis_number').focus();
		return;
	}
	hpNumber = $('#nhis_hpnumber').val();
	hpNumber = hpNumber.replace(/-/g,"");
	$('#nhis_hpnumber').val(hpNumber)
	if (hpNumber.length != 10 && hpNumber.length != 11){
		alert("휴대폰번호를 확인하세요.");
		$('#nhis_hpnumber').focus();
		return;
	}
	if($("input:checkbox[name=nhis_agree1]:checked").length == 0){
		alert("'운임 할인을 위한 건강보험공단 사원정보 수집/활용'에 동의하셔야 합니다.");
		return;
	}
	if($("input:checkbox[name=nhis_agree2]:checked").length == 0){
		alert("'사원정보 제3자 제공'에 동의하셔야 합니다.");
		return;
	}
	
	var nhisCheckForm = $("form[name=nhisCheckForm]").serialize();
	console.log(nhisCheckForm);
	var url = "/mrs/nhisLevelCheck.ajax";
	
	$("#loading").show();
	$.ajax({	
        url      : url,
        type     : "post",
        data     : nhisCheckForm,
        dataType : "json",
        async    : true,
        success  : function(data){
        	console.log(data);
        	$("#loading").hide();
        	
        	if (data.result == 'OK' || data.result == 'Y'){
        		alert('인증되었습니다. 좌석을 선택해주세요.');
            	$('[data-remodal-id=popNhis1]').remodal().close();
        	}
        	else{
        		alert(data.msg);
        	}
        },
        error:function (e){
        	console.log(e);
        }
	});
}

function fnReload(){//화면 새로고침
	$("#satsChcFrm").submit();
}



function fnUpdRot(){//노선조회로 이동
	// 세종시 터미널 코드 분리로 인한 예외처리 (352,358 중 대표코드 352 사용) 2018.02.22
	if($("#deprCd").val() == "358"){
		$("#deprCd").val("352");
	}
	if($("#arvlCd").val() == "358"){
		$("#arvlCd").val("352");
	}
	
	// 의정부 터미널 코드 분리로 인한 예외처리 (170,173 중 대표코드 170 사용) yahan 2020-01-07
	if($("#deprCd").val() == "173"){
		$("#deprCd").val("170");
	}
	if($("#arvlCd").val() == "173"){
		$("#arvlCd").val("170");
	}
		
		
		
	$("#satsChcFrm").attr("action","/koBus/kobusSeat.do");
	$("#satsChcFrm").submit();
}



function fnUpdAlcn(){//배차조회로 이동
	// 세종시 터미널 코드 분리로 인한 예외처리 (352,358 중 대표코드 352 사용) 2018.02.22
	if($("#deprCd").val() == "358"){
		$("#deprCd").val("352");
	}
	if($("#arvlCd").val() == "358"){
		$("#arvlCd").val("352");
	}
	
	// 의정부 터미널 코드 분리로 인한 예외처리 (170,173 중 대표코드 170 사용) yahan 2020-01-07
	if($("#deprCd").val() == "173"){
		$("#deprCd").val("170");
	}
	if($("#arvlCd").val() == "173"){
		$("#arvlCd").val("170");
	}
	
	$("#satsChcFrm").attr("action","/koBus/kobusSeat.do");
	$("#satsChcFrm").submit();
}



function fnSatsChcCfm(e){
	var cfmPrmmDcDvsCd = $("#prmmDcDvsCd").val();
	
	
	try{e.preventDefault();}catch(e){}
	fnSelSeatCnt();
	
	if(allSelSeatCnt <= 0){
		alert("매수와 좌석을 선택해주세요.");
		function moveFocusToNextElement() {
			var $currentElement = $(document.activeElement);
			var $focusableElements = $('button, [href]');
			var currentIndex = $focusableElements.index($currentElement);
			
			if (currentIndex >= 0 && currentIndex < $focusableElements.length - 1) {
				$focusableElements.eq(currentIndex + 1).focus();
			}
		}
		
		var allZero = true;
		$(".text_num.count").each(function() {
			if ($(this).text().trim() != '0') {
				allZero = false;
				return false;
			}
		});
		
		if(allZero) {
			$(".btn_refresh").first().focus();
			moveFocusToNextElement();
		}
		return;
	}
	var selSeatCntChk = $("input:checkbox[name=seatBoxDtl]:checked").length;
	if((selSeatCntChk <= 0) || (allSelSeatCnt != selSeatCntChk)){
		alert("좌석을 선택해주세요.");
		$("input:checkbox[name=seatBoxDtl]").first().focus();
		return;
	}
	var ctyPrmmDcYn = $("#ctyPrmmDcYn").val();
//	if(ctyPrmmDcYn == "Y" && $("input:radio[name=salesInfo]:checked").length == 0 && allAdltChcCnt > 0){
	if(ctyPrmmDcYn == "Y" && $("input:radio[name=salesInfo]:checked").length == 0){
		alert("할인 구분을 선택하세요.");
		$(".selectSeat_detail").find("input:radio[name=salesInfo]").first().focus();
		return;
	}

	// 좌석수 제한 체크...
	var maxSeatCnt = checkMaxSeatCnt(allSelSeatCnt);
	if(allSelSeatCnt > maxSeatCnt ){
		return;
	}


	if(allChldChcCnt > 0 || allTeenChcCnt > 0 || allUvsdChcCnt > 0 || allSncnChcCnt > 0 || allDsprChcCnt > 0 || allBohnChcCnt || allDfptChcCnt > 0){
		alert("할인 승차권 부정 사용시 운임의 10배 부가 운임을 요구할 수 있습니다.");
	}
	
//alert(cfmPrmmDcDvsCd);	
	if(cfmPrmmDcDvsCd == "0"){
		$("#selAdltCnt").val(allAdltChcCnt);
		$("#selAdltDcCnt").val("0");
	}else if(cfmPrmmDcDvsCd == "3"){
		var selAdltDcCnt = $("#ctyDcFee3Cnt").val();
		if(selAdltDcCnt >= selAdltDcCnt){
			$("#selAdltCnt").val(Number(allAdltChcCnt) - Number(selAdltDcCnt));
			$("#selAdltDcCnt").val(selAdltDcCnt);
		}else{
			$("#selAdltCnt").val("0");
			$("#selAdltDcCnt").val(allAdltChcCnt);
		}
	}else if(cfmPrmmDcDvsCd == "1" || cfmPrmmDcDvsCd == "2" || cfmPrmmDcDvsCd == "4" ||
				// 20200330 yahan
				cfmPrmmDcDvsCd == "5"){
		$("#selAdltCnt").val("0");
		$("#selAdltDcCnt").val(allAdltChcCnt);
	}else{
		if(cfmPrmmDcDvsCd == "a" || cfmPrmmDcDvsCd == "b"){
			$("#prmmDcDvsCd").val(cfmPrmmDcDvsCd);
		} else {
			$("#prmmDcDvsCd").val("0");
		}
		
		$("#selAdltCnt").val(allAdltChcCnt);
		$("#selAdltDcCnt").val("0");
	}
	$("#selChldCnt").val(allChldChcCnt);
	$("#selTeenCnt").val(allTeenChcCnt);
	$("#selUvsdCnt").val(allUvsdChcCnt);
	$("#selSncnCnt").val(allSncnChcCnt);
	$("#selDsprCnt").val(allDsprChcCnt);
	$("#selVtr3Cnt").val((bohnDcFlag == 30) ? allBohnChcCnt : 0);
	$("#selVtr5Cnt").val((bohnDcFlag == 50) ? allBohnChcCnt : 0);
	$("#selVtr7Cnt").val((bohnDcFlag == 70) ? allBohnChcCnt : 0);
	$("#selDfptCnt").val(allDfptChcCnt);

	$("#selSeatCnt").val(selSeatCntChk);
	//fnLoginChk();// 로그인을 나중으로, 선점을 우선
	
	//선택좌석 순서변경(180703)
	var selSeatNumNew = "";
	
	var adltNum = new Array();
	var chldNum = new Array();
	var teenNum = new Array();
	var uvsdNum = new Array();
	var sncnNum = new Array();
	var dsprNum = new Array();
	var bohnNum = new Array();
	var dfptNum = new Array();
	
	//성인 선택 좌석
	var j=0;
	for(var i=0; i<10; i++){
		if(typeof arrSeat[i] != "undefined"){
			if(arrSeat[i][1] == "adltCnt"){
				adltNum[j] = arrSeat[i][0];
				j++;
			}			
		}
	}
	/*adltNum.sort();
	for(var i=0; i<adltNum.length; i++){
		if(selSeatNumNew.length <= 0){
			selSeatNumNew = adltNum[i]; 
		}else{
			selSeatNumNew += ":" + adltNum[i]; 
		}		
	}*/
	//초등생 선택 좌석	
	j=0;
	for(var i=0; i<10; i++){
		if(typeof arrSeat[i] != "undefined"){
			if(arrSeat[i][1] == "chldCnt"){		
				chldNum[j] = arrSeat[i][0];
				j++; 
			}			
		}
	}
	/*chldNum.sort();
	for(var i=0; i<chldNum.length; i++){
		if(selSeatNumNew.length <= 0){
			selSeatNumNew = chldNum[i]; 
		}else{
			selSeatNumNew += ":" + chldNum[i]; 
		}		
	}*/
	//중고생 선택 좌석
	j=0;
	for(var i=0; i<10; i++){
		if(typeof arrSeat[i] != "undefined"){
			if(arrSeat[i][1] == "teenCnt"){
				teenNum[j] = arrSeat[i][0];
				j++;
			}			
		}
	}
	/*teenNum.sort();
	for(var i=0; i<teenNum.length; i++){
		if(selSeatNumNew.length <= 0){
			selSeatNumNew = teenNum[i]; 
		}else{
			selSeatNumNew += ":" + teenNum[i]; 
		}		
	}*/
	//대학생 선택 좌석
	j=0;
	for(var i=0; i<10; i++){
		if(typeof arrSeat[i] != "undefined"){
			if(arrSeat[i][1] == "uvsdCnt"){
				uvsdNum[j] = arrSeat[i][0];
				j++;
			}			
		}
	}
	uvsdNum.sort();
	for(var i=0; i<uvsdNum.length; i++){
		if(selSeatNumNew.length <= 0){
			selSeatNumNew = uvsdNum[i]; 
		}else{
			selSeatNumNew += ":" + uvsdNum[i]; 
		}		
	}
	//경로 선택 좌석
	j=0;
	for(var i=0; i<10; i++){
		if(typeof arrSeat[i] != "undefined"){
			if(arrSeat[i][1] == "sncnCnt"){
				sncnNum[j] = arrSeat[i][0];
				j++;
			}			
		}
	}
	sncnNum.sort();
	for(var i=0; i<sncnNum.length; i++){
		if(selSeatNumNew.length <= 0){
			selSeatNumNew = sncnNum[i]; 
		}else{
			selSeatNumNew += ":" + sncnNum[i]; 
		}		
	}
	//장애인 선택 좌석
	j=0;
	for(var i=0; i<10; i++){
		if(typeof arrSeat[i] != "undefined"){
			if(arrSeat[i][1] == "dsprCnt"){
				dsprNum[j] = arrSeat[i][0];
				j++;
			}			
		}
	}
	dsprNum.sort();
	for(var i=0; i<dsprNum.length; i++){
		if(selSeatNumNew.length <= 0){
			selSeatNumNew = dsprNum[i]; 
		}else{
			selSeatNumNew += ":" + dsprNum[i]; 
		}		
	}
	//보훈 선택 좌석
	j=0;
	for(var i=0; i<10; i++){
		if(typeof arrSeat[i] != "undefined"){
			if(arrSeat[i][1] == "bohnCnt"){
				bohnNum[j] = arrSeat[i][0];
				j++;
			}			
		}
	}
	bohnNum.sort();
	for(var i=0; i<bohnNum.length; i++){
		if(selSeatNumNew.length <= 0){
			selSeatNumNew = bohnNum[i]; 
		}else{
			selSeatNumNew += ":" + bohnNum[i]; 
		}		
	}
	//후불 선택 좌석
	j=0;
	for(var i=0; i<10; i++){
		if(typeof arrSeat[i] != "undefined"){
			if(arrSeat[i][1] == "dfptCnt"){
				dfptNum[j] = arrSeat[i][0];
				j++;
			}			
		}
	}
	dfptNum.sort();
	for(var i=0; i<dfptNum.length; i++){
		if(selSeatNumNew.length <= 0){
			selSeatNumNew = dfptNum[i]; 
		}else{
			selSeatNumNew += ":" + dfptNum[i]; 
		}		
	}

	//alert(selSeatNumNew);
	$("#selSeatNum").val(selSeatNumNew);
	
	if(cfmPrmmDcDvsCd != "0" && cfmPrmmDcDvsCd != "a" && cfmPrmmDcDvsCd != "b"){
		var msg = '할인미적용';
		if ($("#salesInfo_0").length == 0) msg = '주중/주말할인';
		
		if(!confirm("부가상품으로 결제를 원하실 경우 "+ msg +"을 선택해주세요.\n계속 진행하시겠습니까?")){
			return;
		}
		if(cfmPrmmDcDvsCd == "3"){
			if($("#fnlSatsMrsDc").text()=="0원"){
				alert("뒷좌석을 선택하지 않아 할인 미적용으로 변경됩니다.");
				$("#prmmDcDvsCd").val("0");
				$("#salesInfo_0").trigger("click");
			}
		}
	}
	fnSetPcpy();
}



/*function fnLoginChk(){
	//var rotInfFrm = $("form[name=rotInfFrm]").serialize() ;
	$.ajax({	
        url      : "/mrs/satsChcLoginChk.ajax",
        type     : "post",
        //data : rotInfFrm,
        dataType : "json",
        async    : true,
        success  : function(LoginChkMap){
        	//alert(LoginChkMap.loginYn);
        	if(LoginChkMap.loginYn == "N" || LoginChkMap.mbrsDvsCd == "1"){
        		var popLogin = $('[data-remodal-id=popLogin]').remodal().open();
        	}else{
        		if(LoginChkMap.mbrsDvsCd == "1"){ //비회원
        			$("#nonMbrsYn").val("Y");
        		}else{ // 회원
        			$("#nonMbrsYn").val("N");
        		}
        		fnFrmSubmit();
        	}
        },
        error:function (e){
        	fnCancPcpy();
        }
	});
}*/

function fnLoginChk(){
	//var rotInfFrm = $("form[name=rotInfFrm]").serialize() ;
	let login = $(".util-list > li:nth-child(1)").text();
	
	if(login.equal("로그인")) {
		var popLogin = $('[data-remodal-id=popLogin]').remodal().open();
	}else {
		$("#nonMbrsYn").val("N");
	}
	
	
	if(LoginChkMap.loginYn == "N" || LoginChkMap.mbrsDvsCd == "1"){
        		var popLogin = $('[data-remodal-id=popLogin]').remodal().open();
        	}else{
        		if(LoginChkMap.mbrsDvsCd == "1"){ //비회원
        			$("#nonMbrsYn").val("Y");
        		}else{ // 회원
        			$("#nonMbrsYn").val("N");
        		}
        		fnFrmSubmit();
        	}
}



function fnSatsSubmit(){  //레이어로그인에서 데이터 가져오기
	fnFrmSubmit(); //좌석선점
}


function fnNonUsrMrs(){
	$("#nonMbrsYn").val("Y");
	fnFrmSubmit(); //결제
}



/*function fnSetPcpy(){
	var satsChcFrm = $("form[name=satsChcFrm]").serialize() ;
	alert("전송할 데이터:" + satsChcFrm);
	alert("MSG_CD:", setPcpyMap);
	$.ajax({	
        url      : "/koBus/setPcpy.ajax",
        type     : "post",
        data     : satsChcFrm,
        dataType : "json",
        async    : true,
        success  : function(setPcpyMap){
				
        	if(setPcpyMap.MSG_CD =="ERR"){        		
        		fnFailPcpy("pcpy");
        	}else{
        		$("#satsNoAll").val(setPcpyMap.satsNoAll);
        		$("#pcpyNoAll").val(setPcpyMap.pcpyNoAll);
        		$("#estmAmt").val(setPcpyMap.ESTM_AMT);
        		$("#dcAmt").val(setPcpyMap.DC_AMT);
        		$("#tissuAmt").val(setPcpyMap.TISSU_AMT);
        		//alert($("#pcpyNoAll").val());
        		if($("#pathDvs").val() == "rtrp"){
        			if($("#pathStep").val() == "1"){
        				var rtrpDt1 = $("#selSeatCnt").val() //입력매수,일반인할인매수,일반인,중고생,초등생,대학생 순으로','로 구분
	        			+":"+$("#selAdltDcCnt").val()  //일반인할인매수
	        			+":"+$("#selAdltCnt").val()  //일반인
	        			+":"+$("#selTeenCnt").val() //중고생
	        			+":"+$("#selChldCnt").val() //초등생
	        			+":"+$("#selUvsdCnt").val() //대학생
	        			+":"+$("#selSncnCnt").val() //경로(권종추가-201906)
	        			+":"+$("#selDsprCnt").val() //장애인(권종추가-201906)
	        			+":"+$("#selVtr3Cnt").val() //보훈(권종추가-20210501)
	        			+":"+$("#ctyPrmmDcYn").val() //시외후등형할인구분
	        			+":"+$("#estmAmt").val() //예매금액
	        			+":"+$("#dcAmt").val() //할인금액
	        			+":"+$("#tissuAmt").val() //결제금액
	        			+":"+$("#deprDt").val() //출발일
	        			+":"+$("#deprTime").val() //출발시간
	        			+":"+$("#indVBusClsCd").val() //버스등급
	        			+":"+$("#cacmCd").val() //운수사코드
	        			+":"+$("#prmmDcDvsCd").val() //시외우등형할인코드
        				+":"+$("#agrmYn").val() //국민차장제 동의 여부 (180705)
        				+":"+$("#selVtr5Cnt").val() //보훈(권종추가-20210501)
        				+":"+$("#selVtr7Cnt").val() //보훈(권종추가-20210501)
        				+":"+$("#selDfptCnt").val(); //후불(권종추가-20220722)
        			
	        			$("#pathStep").val("2");
	        			$("#pcpyNoAll1").val($("#pcpyNoAll").val());
	        			$("#satsNoAll1").val($("#satsNoAll").val());
	        			$("#rtrpDtl1").val(rtrpDt1);
	        			
	        			// 세종시 터미널 코드 분리로 인한 예외처리 (352,358 중 대표코드 352 사용) 2018.02.22	        			
	        			if($("#deprCd").val() == "358"){
	        				$("#deprCd").val("352");
	        			}
	        			if($("#arvlCd").val() == "358"){
	        				$("#arvlCd").val("352");
	        			}
	        			
	        			// 의정부 터미널 코드 분리로 인한 예외처리 (170,173 중 대표코드 170 사용) yahan 2020-01-07
	        			if($("#deprCd").val() == "173"){
	        				$("#deprCd").val("170");
	        			}
	        			if($("#arvlCd").val() == "173"){
	        				$("#arvlCd").val("170");
	        			}
	        			
	        			$("#satsChcFrm").attr("action","/koBus/kobusSeat.do");
	        			$("#satsChcFrm").submit();
        			}else if($("#pathStep").val() == "2"){
        				var rtrpDt2 = $("#selSeatCnt").val() //입력매수,일반인할인매수,일반인,중고생,초등생,대학생 순으로','로 구분
	        			+":"+$("#selAdltDcCnt").val()  //일반인할인매수
	        			+":"+$("#selAdltCnt").val()  //일반인
	        			+":"+$("#selTeenCnt").val() //중고생
	        			+":"+$("#selChldCnt").val() //초등생
	        			+":"+$("#selUvsdCnt").val() //대학생
	        			+":"+$("#selSncnCnt").val() //경로(권종추가-201906)
	        			+":"+$("#selDsprCnt").val() //장애인(권종추가-201906)
	        			+":"+$("#selVtr3Cnt").val() //보훈(권종추가-20210501)
	        			+":"+$("#ctyPrmmDcYn").val() //시외후등형할인구분
	        			+":"+$("#estmAmt").val() //예매금액
	        			+":"+$("#dcAmt").val() //할인금액
	        			+":"+$("#tissuAmt").val() //결제금액
	        			+":"+$("#deprDt").val() //출발일
	        			+":"+$("#deprTime").val() //출발시간
	        			+":"+$("#indVBusClsCd").val() //버스등급
	        			+":"+$("#cacmCd").val() //운수사코드
	        			+":"+$("#prmmDcDvsCd").val() //시외우등형할인코드
        				+":"+$("#agrmYn").val() //국민차장제 동의 여부 (180705)
        				+":"+$("#selVtr5Cnt").val() //보훈(권종추가-20210501)
        				+":"+$("#selVtr7Cnt").val() //보훈(권종추가-20210501)
        				+":"+$("#selDfptCnt").val(); //후불(권종추가-20220722)
        				
        				$("#satsNoAll2").val($("#satsNoAll").val());
        				$("#pcpyNoAll2").val($("#pcpyNoAll").val());
        				$("#rtrpDtl2").val(rtrpDt2);
        				if (fnLoginChk()) {
					      $("#satsChcFrm").attr("action", "/koBus/payment/buspay.htm");
					      $("#satsChcFrm").submit();
					    }
        			}
        		}else{
        			if ($('#extrComp').val() == 'ARMY'){
						// 비회원예매
						fnNonUsrMrs();
					} else{
	        			fnLoginChk();
					}
        		}
        	}
        },
        error:function (e){
			console.log("AJAX ERROR", e);
			alert("에러 발생: " + JSON.stringify(e));
        	fnFailPcpy("pcpy");        	
        }
	});
}*/
function fnSetPcpy(){
	var selectedSeatStr = selectedSeatIds.join(",");
	
	$("#selectedSeatIds").val(selectedSeatStr);
	
	var satsChcFrm = $("form[name=satsChcFrm]").serialize() 
               + "&ajax=true&ajaxType=setPcpy"
               + "&selectedSeatIds=" + encodeURIComponent(selectedSeatStr);
	console.log("전송할 데이터:" + satsChcFrm);
	
	
	$.ajax({	
        url      : "/koBus/setPcpy.ajax",
        type     : "post",
        data     : satsChcFrm,
        dataType : "json",
        async    : true,
        success  : function(data){
        		if($("#pathDvs").val() == "rtrp"){
        			if($("#pathStep").val() == "1"){
        				var rtrpDt1 = $("#selSeatCnt").val() //입력매수,일반인할인매수,일반인,중고생,초등생,대학생 순으로','로 구분
	        			+":"+$("#selAdltDcCnt").val()  //일반인할인매수
	        			+":"+$("#selAdltCnt").val()  //일반인
	        			+":"+$("#selTeenCnt").val() //중고생
	        			+":"+$("#selChldCnt").val() //초등생
	        			+":"+$("#selUvsdCnt").val() //대학생
	        			+":"+$("#selSncnCnt").val() //경로(권종추가-201906)
	        			+":"+$("#selDsprCnt").val() //장애인(권종추가-201906)
	        			+":"+$("#selVtr3Cnt").val() //보훈(권종추가-20210501)
	        			+":"+$("#ctyPrmmDcYn").val() //시외후등형할인구분
	        			+":"+$("#estmAmt").val($("#allTotAmtLocU").val()) //예매금액
	        			+":"+$("#dcAmt").val($("#holiMrsDc").val()) //할인금액
	        			+":"+$("#tissuAmt").val($("#allTotAmtLocD").val()) //결제금액
	        			+":"+$("#deprDt").val() //출발일
	        			+":"+$("#deprTime").val() //출발시간
	        			+":"+$("#indVBusClsCd").val() //버스등급
	        			+":"+$("#cacmCd").val() //운수사코드
	        			+":"+$("#cacmNm").val() //운수사명
	        			+":"+$("#changeResId").val() //운수사명
	        			+":"+$("#prmmDcDvsCd").val() //시외우등형할인코드
        				+":"+$("#agrmYn").val() //국민차장제 동의 여부 (180705)
        				+":"+$("#selVtr5Cnt").val() //보훈(권종추가-20210501)
        				+":"+$("#selVtr7Cnt").val() //보훈(권종추가-20210501)
        				+":"+$("#selDfptCnt").val(); //후불(권종추가-20220722)
        			
        				$("#pathStep").val("2");
	        			$("#pcpyNoAll1").val($("#pcpyNoAll").val());
	        			$("#satsNoAll1").val($("#satsNoAll").val());
	        			$("#rtrpDtl1").val(rtrpDt1);
	        			
	        			// 세종시 터미널 코드 분리로 인한 예외처리 (352,358 중 대표코드 352 사용) 2018.02.22	        			
	        			if($("#deprCd").val() == "358"){
	        				$("#deprCd").val("352");
	        			}
	        			if($("#arvlCd").val() == "358"){
	        				$("#arvlCd").val("352");
	        			}
	        			if($("#pathStep").val() == "1") {
	        				$("#pathStep").val("2");
	        			}
	        			
	        			// 의정부 터미널 코드 분리로 인한 예외처리 (170,173 중 대표코드 170 사용) yahan 2020-01-07
	        			if($("#deprCd").val() == "173"){
	        				$("#deprCd").val("170");
	        			}
	        			if($("#arvlCd").val() == "173"){
	        				$("#arvlCd").val("170");
	        			}
	        			
	        			// 왕복 페이지 이동 -> 오는편 배차선택 페이지로 이동시키기
	        			$("#satsChcFrm").attr("action","/koBus/reservation2.do");
	        			console.log('폼 action:', $("#satsChcFrm").attr("action"));
	        			$("#satsChcFrm").submit();
        			}else if($("#pathStep").val() != "1"){
        				var rtrpDt2 = $("#selSeatCnt").val() //입력매수,일반인할인매수,일반인,중고생,초등생,대학생 순으로','로 구분
	        			+":"+$("#selAdltDcCnt").val()  //일반인할인매수
	        			+":"+$("#selAdltCnt").val()  //일반인
	        			+":"+$("#selTeenCnt").val() //중고생
	        			+":"+$("#selChldCnt").val() //초등생
	        			+":"+$("#selUvsdCnt").val() //대학생
	        			+":"+$("#selSncnCnt").val() //경로(권종추가-201906)
	        			+":"+$("#selDsprCnt").val() //장애인(권종추가-201906)
	        			+":"+$("#selVtr3Cnt").val() //보훈(권종추가-20210501)
	        			+":"+$("#ctyPrmmDcYn").val() //시외후등형할인구분
	        			+":"+$("#estmAmt").val() //예매금액
	        			+":"+$("#dcAmt").val() //할인금액
	        			+":"+$("#tissuAmt").val() //결제금액
	        			+":"+$("#deprDt").val() //출발일
	        			+":"+$("#deprTime").val() //출발시간
	        			+":"+$("#indVBusClsCd").val() //버스등급
	        			+":"+$("#cacmCd").val() //운수사코드
	        			+":"+$("#prmmDcDvsCd").val() //시외우등형할인코드
        				+":"+$("#agrmYn").val() //국민차장제 동의 여부 (180705)
        				+":"+$("#selVtr5Cnt").val() //보훈(권종추가-20210501)
        				+":"+$("#selVtr7Cnt").val() //보훈(권종추가-20210501)
        				+":"+$("#selDfptCnt").val(); //후불(권종추가-20220722)
        				
        				$("#satsNoAll2").val($("#satsNoAll").val());
        				$("#pcpyNoAll2").val($("#pcpyNoAll").val());
        				$("#rtrpDtl2").val(rtrpDt2);

        				if (fnLoginChk()) {
					      $("#satsChcFrm").attr("action", "/koBus/payment/buspay.htm");
					      $("#satsChcFrm").submit();
					    }
        			}
        		}else{

						// 편도 예매
						$("#satsChcFrm").attr("action","/koBus/payment/buspay.htm");
					    console.log('폼 action:', $("#satsChcFrm").attr("action"));
					    $("#satsChcFrm").submit();

        		}
        },
        error:function (e){
			console.log("AJAX ERROR", e);
			alert("에러 발생: " + JSON.stringify(e));
        	fnFailPcpy("pcpy");        	
        }
	});
}



function fnFrmSubmit(){
	$("#satsChcFrm").attr("action","/mrs/stplcfmpym.do");
	$("#satsChcFrm").submit();
}



function fnFailPcpy(errCd){
	if(errCd == "pcpy"){
		alert("좌석선점에 실패했습니다. 잠시 후 다시 시도해 주시기 바랍니다.");
	}else if(errCd == "lgn"){
		alert("로그인에 실패했습니다. 잠시 후 다시 시도해 주시기 바랍니다.");
	}
	return;
}



function fnCancPcpy(lgnCnac){
	//alert(lgnCnac);
	var pcpyCanMsg = "";
	if(lgnCnac == "clk"){
		pcpyCanMsg = "clk";
		var satsChcFrm = $("form[name=satsChcFrm]").serialize() ;
		$.ajax({	
	        url      : "/mrs/cancPcpy.ajax",
	        type     : "post",
	        data     : satsChcFrm,
	        dataType : "json",
	        async    : true,
	        success  : function(cancPcpyMap){
	        	fnFailPcpy(pcpyCanMsg);
	        },
	        error:function (e){
	        	fnFailPcpy(pcpyCanMsg);
	        }
		});
	}else{
		pcpyCanMsg = "lgn";
	}
}

//20210610 좌석수 제한 체크...
function checkMaxSeatCnt(seatCnt){
	// 기본 6매
	var maxSeatCnt = 6;
	if ($("input:radio[id='salesInfo_2']").prop("checked") == true ||
		$("input:radio[id='salesInfo_5']").prop("checked") == true) {
		maxSeatCnt = 10;
	}
	
	if(seatCnt > maxSeatCnt ){
		var msg = "매수를 총 "+ maxSeatCnt +"매 이하로 선택해 주세요.";
		if($("#ctyPrmmDcYn").val() =="Y" && groupDcCheck == "Y" && $("#pathDvs").val() != "rtrp"){
			msg += "\n단체할인 선택시 10매 까지 가능합니다.";
		}

		alert(msg);
	}
//	console.log("seatCnt="+seatCnt+"/maxSeatCnt="+maxSeatCnt);
	return maxSeatCnt;
}
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
var calDate = "";
var rtrpStDate = "";
var rtrpStDateOrg = "";
$(document).ready(function() {
	var dt = new Date();
	var yyyy = dt.getFullYear();
	var mm   = dt.getMonth()+1;
	var dd   = dt.getDate();
	var mm2Len = Number(mm) < 10 ? "0"+mm : mm;
	var dd2Len = Number(dd) < 10 ? "0"+dd : dd;
	var dd0    = Number(dt.getDate()) < 10 ? "0"+dt.getDate() : dt.getDate();
	var dd1    = Number(dt.getDate()+1) < 10 ? "0"+(dt.getDate()+1) : (dt.getDate()+1);
	var yymmddD0 = yyyy+""+mm2Len+""+dd0;		//오늘날짜
	
	if(yymmddD0 == $("#deprDtm").val()){ //오늘이면
		$("#notiNoToday").css("display","none");
	}
	
	var pathDvs = $("#pathDvs").val(); //왕복여부
	var pathStep = $("#pathStep").val(); //왕복스텝
	if(pathDvs == "rtrp" ){
		var rtrpDerpDtmHtml = "<span>가는 날</span>";
		var rtrpArvlDtmHtml = "<span>오는 날</span>";
		$("#rtrpDeprDtm").html(rtrpDerpDtmHtml+$("#deprDtmAll").val()); //가는날
		$("#rtrpArvlDtm").html(rtrpArvlDtmHtml+$("#arvlDtmAll").val()); //오는날
		$("#alcnRotInfo").addClass("around");
		if(pathStep == "1"){ //왕복중 복편일경우 출도착지 변경 및 날짜 변경
			$("#rideDate").text($("#deprDtmAll").val()); //날짜
			calDate = $("#deprDtm").val();
			$("#alcnPriceInf").addClass("bottom");
		}else if(pathStep == "2"){
			calDate = $("#arvlDtm").val();
			$("#rideDate").text($("#arvlDtmAll").val()); //날짜
			$("#alcnPriceInf").removeClass("bottom");
			rtrpStDateOrg = $("#deprDtm").val();
			rtrpStDateOrg = rtrpStDateOrg.substring(0,4)+"-"+rtrpStDateOrg.substring(4,6)+"-"+rtrpStDateOrg.substring(6);
			rtrpStDate = new Date(rtrpStDateOrg);
		}
	}else{
		if(pathDvs == "trtr" && pathStep == "1"){
			$("#alcnDeprTmlNm").removeClass("opacity");
			$("#alcnArvlTmlNm").addClass("opacity");
		}else if(pathDvs == "trtr" && pathStep == "2"){
			$("#alcnDeprTmlNm").addClass("opacity");
			$("#alcnArvlTmlNm").removeClass("opacity");
		}else{
			$("#alcnDeprTmlNm").removeClass("opacity");
			$("#alcnArvlTmlNm").removeClass("opacity");
		}
		calDate = $("#deprDtm").val();
		$("#alcnRotInfo").removeClass("around");
		$("#alcnDeprDtm").text($("#deprDtmAll").val()); //날짜
		$("#rideDate").text($("#deprDtmAll").val()); //날짜
		$("#alcnPriceInf").addClass("bottom");
	}
	$("#alcnDeprTmlNm").text($("#deprNm").val()); //출발터미널
	$("#alcnArvlTmlNm").text($("#arvlNm").val()); //도착터미널
	calDate = calDate.substring(0,4)+"-"+calDate.substring(4,6)+"-"+calDate.substring(6);
	var selDate = new Date(calDate);
	
	var min = 0;
	var max = 60;
	var extrComp = $("#extrComp").val();
	if (extrComp == 'ARMY'){
		var stdDtm = $("#stdDtm").val();
		var endDtm = $("#endDtm").val();
		min = new Date(Number(stdDtm.substring(0,4)),Number(stdDtm.substring(4,6))-1,Number(stdDtm.substring(6,8)));
		max = new Date(Number(endDtm.substring(0,4)),Number(endDtm.substring(4,6))-1,Number(endDtm.substring(6,8)));
	}
	
	$('#busDate11').datepicker({
		showOn:"button",
		buttonImage:"/images/page/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"날짜 선택 달력",
		minDate: min,
		maxDate: max,
		onSelect: function(){
			fnAlcnYyDtmStup(2,$(this).val());
		},
		beforeShow: function(){
			var date_offset = $(this).parents('.head_date').offset();
			var date_width  = $(this).parents('.head_date').outerWidth();
			var date_height = $(this).parents('.head_date').outerHeight();
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
	
	$("#busDate11").datepicker('setDate',selDate);
	if(pathDvs == "rtrp" && pathStep == "2" ){
		$("#busDate11").datepicker("option","minDate",rtrpStDate);
	}
	
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
		//fnReload();
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
	
	if($("#rtrpStep2DtYn").val() == "N"){
		alert("가는편 차량의 도착예정시간 이후 조회되는 배차목록이 없습니다. 다른 날자를 선택해주세요.");
	}
	
	
// 20210501 yahan
//	//프리미엄
//	if($("#psrmFeeVal").val() == "0"){
//		$("#psrmFeeNm").addClass("nocont");
//	}else{
//		$("#psrmFeeNm").removeClass("nocont");
//	}
//	//우등
//	if($("#prmmFeeVal").val() == "0"){
//		$("#prmmFeeNm").addClass("nocont");
//	}else{
//		$("#prmmFeeNm").removeClass("nocont");
//	}
//	//고속
//	if($("#hspdFeeVal").val() == "0"){
//		$("#hspdFeeNm").addClass("nocont");
//	}else{
//		$("#hspdFeeNm").removeClass("nocont");
//	}
//	//심야프리미엄
//	if($("#mdntPsrmFeeVal").val() == "0"){
//		$("#mdntPsrmFeeNm").addClass("nocont");
//	}else{
//		$("#mdntPsrmFeeNm").removeClass("nocont");
//	}
//	//심야우등
//	if($("#mdntPrmmFeeVal").val() == "0"){
//		$("#mdntPrmmFeeNm").addClass("nocont");
//	}else{
//		$("#mdntPrmmFeeNm").removeClass("nocont");
//	}
//	//심야고속
//	if($("#mdntHspdFeeVal").val() == "0"){
//		$("#mdntHspdFeeNm").addClass("nocont");
//	}else{
//		$("#mdntHspdFeeNm").removeClass("nocont");
//	}
//	//할증프리미엄
//	if($("#mdntPsrmExchFeeVal").val() == "0"){
//		$("#mdntPsrmExchFeeNm").addClass("nocont");
//	}else{
//		$("#mdntPsrmExchFeeNm").removeClass("nocont");
//	}
//	//할증우등
//	if($("#mdntPrmmExchFeeVal").val() == "0"){
//		$("#mdntPrmmExchFeeNm").addClass("nocont");
//	}else{
//		$("#mdntPrmmExchFeeNm").removeClass("nocont");
//	}
//	//할증고속
//	if($("#mdntHspdExchFeeVal").val() == "0"){
//		$("#mdntHspdExchFeeNm").addClass("nocont");
//	}else{
//		$("#mdntHspdExchFeeNm").removeClass("nocont");
//	}
	
	// 캘린더 키보드 포커싱
	$(document).on('keydown', '.datepicker-btn', function(e) {
		if (e.key === 'Enter' || e.keyCode === 13) {
			e.preventDefault();
			$(this).find('.ui-datepicker-trigger').click();

			$("#ui-datepicker-div").focus();
			$(".ui-state-disabled").attr("tabindex", "-1");
			$(".ui-datepicker-prev, .ui-datepicker-next").attr("href", "javascript:void(0)");
		}
	});

	// 캘린더 오늘 텍스트 추가
	$("#ui-datepicker-div").datepicker({
		beforeShowDay: function(date) {
			const today = new Date();
			
			if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
				return [true, "ui-datepicker-today", "오늘"];
			}
			return [true, ""];
		},
//		onSelect: function() {
//			addTodaySpan();
//		}
	});
	
	$(".ui-datepicker-trigger").on("click", function() {
		setTimeout(addTodaySpan, 50);
		$(this).parent().addClass('datepicker-active');
		$("#ui-datepicker-div").focus();
		$(".ui-state-disabled").attr("tabindex", "-1");
		$(".ui-datepicker-prev, .ui-datepicker-next").attr("href", "javascript:void(0)");
	});
	$(".ui-corner-all").on("click", function() {
		setTimeout(addTodaySpan, 50);
		$("#ui-datepicker-div").focus();
		$(".ui-state-disabled").attr("tabindex", "-1");
		$(".ui-datepicker-prev, .ui-datepicker-next").attr("href", "javascript:void(0)");
	});
	
	function addTodaySpan() {
		const $todayTd = $('td.ui-datepicker-today');
		const $activeLink = $('td.ui-datepicker-current-day a');		
		
		if ($todayTd.length && !$todayTd.find('.today').length) {
			$todayTd.append('<span class="today">오늘</span>');
		}
		
		if ($activeLink) {
			$activeLink.attr('title', '선택됨');
		}
	}
		
});



function fnAlcnYyDtmStup(ddChk,dtVal){
	var deprDtmAllOrg = $("#deprDtmAll").val();
	var deprDtmOrg = $("#deprDtm").val();
	var arvlDtmAllOrg = $("#arvlDtmAll").val();
	var arvlDtmOrg = $("#arvlDtm").val();
	
	$("#deprDtmAllOrg").val(deprDtmAllOrg);
	$("#deprDtmOrg").val(deprDtmOrg);
	$("#arvlDtmAllOrg").val(arvlDtmAllOrg);
	$("#arvlDtmOrg").val(arvlDtmOrg);
	
	var yyDtm = "";
	var yymmdd = "";
	if(ddChk == 2){//datepicker를 통해서 들어온 데이터인지 화면에서 자동설정된 데이터인지 구분
		var yyDtmDvs = dtVal.split(".");  //.substring(dtVal.length-3,dtVal.length);
		yyDtm = dtVal;
		yymmdd = yyDtmDvs[0].trim()+""+(Number(yyDtmDvs[1].trim()) < 10?"0"+yyDtmDvs[1].trim():yyDtmDvs[1].trim())+""+(Number(yyDtmDvs[2].trim()) < 10 ? "0"+yyDtmDvs[2].trim():yyDtmDvs[2].trim());
	}
	
	var pathDvs = $("#pathDvs").val(); 
	var pathStep = $("#pathStep").val(); // 왕편복편 체크
	
	if(pathDvs == "rtrp"){
		$('.date_cont').text(yyDtm);
		var rtrpDerpDtmHtml = "<span>가는 날</span>";
		var rtrpArvlDtmHtml = "<span>오는 날</span>";
		
		if(pathStep == "1"){ //복편
			if(Number(yymmdd) > Number(arvlDtmOrg)){
				alert("가는 편 출발일자는 오는 편 보다 이전으로 선택하시기 바랍니다. ");
				$("#busDate11").datepicker('setDate',deprDtmAllOrg);
				$("#deprDtmAll").val(deprDtmAllOrg);
				$("#deprDtm").val(deprDtmOrg);
				$('.date_cont').text(deprDtmAllOrg);
				return;
			}else{
				$("#deprDtmAll").val(yyDtm);
				$("#deprDtm").val(yymmdd);
				$("#rtrpDeprDtm").html(rtrpDerpDtmHtml+yyDtm);
			}
		}else if(pathStep = "2"){
			$("#arvlDtmAll").val(yyDtm);
			$("#arvlDtm").val(yymmdd);
			$("#rtrpArvlDtm").html(rtrpArvlDtmHtml+yyDtm);
		}
	}else{ //왕편 alcnDeprDtm
		$('.date_cont').text(yyDtm);
		$("#alcnDeprDtm").text(yyDtm);
		$("#deprDtmAll").val(yyDtm);
		$("#deprDtm").val(yymmdd);

	} 
	//20241008 웹접근성
	$("#reloadStatus").val("CAL");
	
	fnReloadAjx();
}



function fnReloadAjx(){
//	var alcnSrchFrm = $("form[name=alcnSrchFrm]").serialize() ;
//	$.ajax({	
//        url      : "/mrs/readAlcnSrchCnt.ajax",
//        type     : "post",
//        data : alcnSrchFrm,
//        dataType : "json",
//        async    : true,
//        success  : function(alcnSrchCntMap){
//        	if(Number(alcnSrchCntMap.alcnCnt) > 0){
//        		fnReload();
//        	}else{
//        		alert("조회되는 배차가 없습니다. 배차정보에 관한 사항은 출발지 터미널로 문의하시기 바랍니다.");
//        		fnReturnReloadAjax();
//        	}
//        },
//        error: function(){
//        	alert("배차 조회에 실패했습니다. 잠시 후 다시 시도해보시기 바랍니다.");
//        	fnReturnReloadAjax();
//        }
//	});
	fnReload();
}


function fnReload(){
	$("#alcnSrchFrm").submit();
}



function fnReturnReloadAjax(){
	$("#deprDtmAll").val($("#deprDtmAllOrg").val());
	$("#deprDtm").val($("#deprDtmOrg").val());
	$("#arvlDtmAll").val($("#arvlDtmAllOrg").val());
	$("#arvlDtm").val($("#arvlDtmOrg").val());

	var pathDvs = $("#pathDvs").val(); 
	var pathStep = $("#pathStep").val(); // 왕편복편 체크
	
	if(pathDvs == "rtrp"){
		var rtrpDerpDtmHtml = "<span>가는 날</span>";
		var rtrpArvlDtmHtml = "<span>오는 날</span>";
		if(pathStep == "2"){
			$('.date_cont').text($("#arvlDtmAll").val());
			$("#rtrpArvlDtm").html(rtrpArvlDtmHtml+$("#arvlDtmAllOrg").val());
		}else{
			$('.date_cont').text($("#deprDtmAll").val());
			$("#rtrpDeprDtm").html(rtrpDerpDtmHtml+$("#deprDtmAllOrg").val());
		}
	}else{
		$('.date_cont').text($("#deprDtmAll").val());
	}
}



function fnUpdRot(){
	$("#alcnSrchFrm").attr("action","/koBus/kobus_seat.do");
	$("#alcnSrchFrm").submit();
}

//prvtBbizEmpAcmtRt:국민차장제 동의여부추가)-180704
//mlgAcmtYn : 마일리지 적립여부 추가 - 190723
//tempRotYn삭제후 할인구분코드	DC_DVS_CD(arr)로 변경 20200327 yahan

function fnSatsChc(deprDt,deprTime,alcnDeprTime,alcnDeprTrmlNo,alcnArvlTrmlNo,indVBusClsCd,cacmCd,dcDvsCd,mrsPsbYn,alertYn,deprTrmlNo,arvlTrmlNo,prvtBbizEmpAcmtRt,chldSftySatsYn,mlgAcmtYn,dsprSatsYn){ //좌석선택화면전환:모든 변수에 접미사cfm
	if((indVBusClsCd == "7" || indVBusClsCd == "8") && mlgAcmtYn == "N"){
//		alert("해당 배차는 할인 적용된 요금으로 운영중입니다.\n할인 운영 시 마일리지 적립 대상이 아닙니다.")
		alert("해당 배차는 마일리지 적립 대상이 아닙니다.")
	}
	if(mrsPsbYn == "N"){
		if((alcnDeprTrmlNo == "635" && alcnArvlTrmlNo == "020") || (alcnDeprTrmlNo == "635" && alcnArvlTrmlNo == "316")){
			alert("해당 노선은 현장 발권만 가능한 노선입니다.");
			return;
		}else if((alcnDeprTrmlNo == "463" && alcnArvlTrmlNo == "010")){
			alert("창구/무인기를 통해 발권하시기 바랍니다.");
			return;
		}else{
			alert("홈페이지에서 예매가 불가능한 노선입니다.\n모바일앱에서 예매하시기 바랍니다.");
			return;
		}
	}	 
	
	//휠체어 가능 배차 경우
	if(dsprSatsYn == "Y"){
		alert("휠체어 동반 탑승 시 소요시간이 약 30분 이상 늘어날수도 있습니다.");
	}
	
	var dt = new Date(deprDt.substring(0,4), deprDt.substring(4,6)-1, deprDt.substring(6,8));

	var week  = new Array('일','월','화','수','목','금','토');		//요일 array
	var wkdy  = week[dt.getDay()];
	var yyDtm  = deprDt.substring(0,4)+". "+Number(deprDt.substring(4,6))+". "+Number(deprDt.substring(6,8))+". "+wkdy;


	$("#deprTime").val(deprTime);
	$("#alcnDeprTime").val(alcnDeprTime);
	$("#alcnDeprTrmlNo").val(alcnDeprTrmlNo);
	$("#alcnArvlTrmlNo").val(alcnArvlTrmlNo);
	$("#indVBusClsCd").val(indVBusClsCd);
	$("#cacmCd").val(cacmCd);

	$("#dcDvsCd").val(dcDvsCd);
// 20200327 yahan 삭제	
//	if(tempRotYn=="Y"){
//		alert("특별편성된 임시배차 차량입니다.");
//	}
	var cfmDeprDt = "";
	var pathDvs = $("#pathDvs").val(); 
	var pathStep = $("#pathStep").val(); // 왕편복편 체크
	
	var trmlNoChk = "N";
	if(pathDvs == "rtrp" && pathStep == '2'){ //복편
	
		$("#arvlDtm").val(deprDt);
		$("#arvlDtmAll").val(yyDtm);
		cfmDeprDt = $("#arvlDtmAll").val().split(".");
		
		// 세종시 터미널 코드 분리로 인한 예외처리 (352,358 중 대표코드 352 사용) 2018.02.22		
		if((deprTrmlNo == "352" || deprTrmlNo == "358") && arvlTrmlNo== "010"){
			$("#deprCd").val(arvlTrmlNo);
			$("#arvlCd").val(deprTrmlNo);
		}
		if(deprTrmlNo == "010" && (arvlTrmlNo == "352" || arvlTrmlNo == "358")){
			$("#arvlCd").val(deprTrmlNo);
			$("#deprCd").val(arvlTrmlNo);
		}
		if((deprTrmlNo == "352" || deprTrmlNo == "358") && arvlTrmlNo== "118"){
			$("#deprCd").val(arvlTrmlNo);
		}

		// 의정부 터미널 코드 분리로 인한 예외처리 (170,173 중 대표코드 170 사용) yahan 2020-01-07
		if((deprTrmlNo == "170" || deprTrmlNo == "173") && (arvlTrmlNo== "801" || arvlTrmlNo== "810")){
			$("#deprCd").val(arvlTrmlNo);
			$("#arvlCd").val(deprTrmlNo);
		}
		if((deprTrmlNo == "801" || deprTrmlNo == "810") && (arvlTrmlNo == "170" || arvlTrmlNo == "173")){
			$("#arvlCd").val(deprTrmlNo);
			$("#deprCd").val(arvlTrmlNo);
		}
		
		
		// 20221226 성남터미널 한시적 이원화
		if('20230101' <= deprDt  && deprDt <= '20230131'){
			if (deprTrmlNo == "121" ||  arvlTrmlNo== "121"){
				$("#deprCd").val(arvlTrmlNo);
				$("#arvlCd").val(deprTrmlNo);
			}
		}
		
		// 20230820 터미널코드 이원화 체크
		$("#deprCd").val(arvlTrmlNo);
		$("#arvlCd").val(deprTrmlNo);

		
		if($("#alcnDeprTrmlNo").val() == $("#deprCd").val()){
			trmlNoChk = "Y";
		}
	}else{
		
		$("#deprDtm").val(deprDt);
		$("#deprDtmAll").val(yyDtm);
		cfmDeprDt = $("#deprDtmAll").val().split(".");
		
		// 세종시 터미널 코드 분리로 인한 예외처리 (352,358 중 대표코드 352 사용) 2018.02.22
		if((deprTrmlNo == "352" || deprTrmlNo == "358") && arvlTrmlNo== "010"){
			$("#deprCd").val(deprTrmlNo);
		}
		if(deprTrmlNo == "010" && (arvlTrmlNo == "352" || arvlTrmlNo == "358")){
			$("#arvlCd").val(arvlTrmlNo);
		}
		if((deprTrmlNo == "352" || deprTrmlNo == "358") && arvlTrmlNo== "118"){
			$("#deprCd").val(deprTrmlNo);
		}

		// 의정부 터미널 코드 분리로 인한 예외처리 (170,173 중 대표코드 170 사용) yahan 2020-01-07
		if((deprTrmlNo == "170" || deprTrmlNo == "173") && (arvlTrmlNo== "801" || arvlTrmlNo== "810")){
			$("#deprCd").val(deprTrmlNo);
		}
		if((deprTrmlNo == "801" || deprTrmlNo == "810") && (arvlTrmlNo == "170" || arvlTrmlNo == "173")){
			$("#arvlCd").val(arvlTrmlNo);
		}

		
		// 20221226 성남터미널 한시적 이원화
		if('20230101' <= deprDt  && deprDt <= '20230131'){
			if (deprTrmlNo == "121"){
				$("#deprCd").val(deprTrmlNo);
			}
			if (arvlTrmlNo== "121"){
				$("#arvlCd").val(arvlTrmlNo);
			}
		}

		// 20230820 터미널코드 이원화 체크
		$("#deprCd").val(deprTrmlNo);
		$("#arvlCd").val(arvlTrmlNo);
		
		
		if($("#alcnDeprTrmlNo").val() == $("#arvlCd").val()){
			trmlNoChk = "Y";
		}
	}
	
//alert("alcnDeprTrmlNo:"+$("#alcnDeprTrmlNo").val() + "  " + "deprCd:"+$("#deprCd").val());
//alert("alcnArvlTrmlNo:"+$("#alcnArvlTrmlNo").val() + "  " + "arvlCd:"+$("#arvlCd").val());

	var cfmText = "출발일자가 "+cfmDeprDt[1]+"월 "+cfmDeprDt[2]+"일이 맞습니까?";

	// 인천-> 정안(휴)하행, 정안(휴)상행 -> 인천 (18.10.24)
	if(( alcnDeprTrmlNo == "100" && alcnArvlTrmlNo == "615" && deprTrmlNo == "100" && arvlTrmlNo == "315" ) 
		|| ( alcnDeprTrmlNo == "615" && alcnArvlTrmlNo == "100" && deprTrmlNo == "316" && arvlTrmlNo == "100")){
		cfmText = cfmText + "\n해당 노선은 안산을 경유하여 추가 소요시간(30분 이상)이 발생하오니,\n확인 후 이용하시기 바랍니다.";
	}
		
	// 창원-> 선산(휴)하행 (19.6.20)
	if((( alcnDeprTrmlNo == "710" && alcnArvlTrmlNo == "150" && deprTrmlNo == "710" && arvlTrmlNo == "813" ) ||
			( alcnDeprTrmlNo == "710" && alcnArvlTrmlNo == "120" && deprTrmlNo == "710" && arvlTrmlNo == "813" ))){
		cfmText = cfmText + "\n해당 차량은 마산을 경유하여 추가 소요시간(30분 이상)이 발생하오니,\n확인 후 이용하시기 바랍니다.";
	}
	
	
	if(trmlNoChk == "Y"){	
		alert("배차정보 조회 시 오류가 발생하였습니다.");
		fnReload();
	}else{
		if(alertYn == "Y"){
			cfmText = cfmText + "\n해당차량은 송도 경유로 소요시간이 30분 추가 됩니다.";
		}else if(alertYn == "D"){
			cfmText = cfmText + "\n해당차량은 대구혁신 경유로 소요시간이 20분 추가 됩니다.";
		}else if(alertYn == "J"){
			cfmText = cfmText + "\n해당차량은 단양 경유로 소요시간이 30분 추가 됩니다.";
		}else if(alertYn == "E"){
			cfmText = cfmText + "\n해당 노선은 구리, 구미를 경유하는 노선이오니, 이용에 참고하여 주시기 바랍니다.";
		}
		
		//광주-인천T1,T2 마일리지 불가 팝업		
		if(((deprTrmlNo == "500" && arvlTrmlNo == "105") || (deprTrmlNo == "500" && arvlTrmlNo == "117")) && (indVBusClsCd == "7" || indVBusClsCd == "8")){
			alert("해당 노선은 마일리지 적립/사용 불가 노선입니다.");
		}
		
		//서울경부-강릉 주말 마일리지 불가 팝업	(2019.1.9~)	
		if(((deprTrmlNo == "010" && arvlTrmlNo == "200") || (deprTrmlNo == "200" && arvlTrmlNo == "010")) && (indVBusClsCd == "7" || indVBusClsCd == "8")){
			//alert("[프리미엄버스 마일리지 주말 미적립 안내]\n해당노선은 프리미엄 주말 할인 노선으로\n주말 프리미엄 버스 이용 시 마일리지가 미적립 됩니다.\n이 점 참고해 주시기 바랍니다.");
			// 20211118 삭제
			//alert("[서울-강릉 고객감사 할인 안내]\n- 프리미엄버스 주말할인 시행\n- 요금 : 27,900원 -> 23,700원(15%)\n* 프리미엄 마일리지 적립 제외");
		}
		
		// 2020-02-11 서울↔유성, 안성, 세종시 (금호고속)
		if (cacmCd == '01') {
			if (
					// 센트럴-유성
					(deprTrmlNo == "020" && arvlTrmlNo == "360") || (deprTrmlNo == "360" && arvlTrmlNo == "020") ||
					// 경부-안성
					(deprTrmlNo == "010" && arvlTrmlNo == "130") || (deprTrmlNo == "130" && arvlTrmlNo == "010") ||
					// 경부-세종시
					(deprTrmlNo == "010" && arvlTrmlNo == "358") || (deprTrmlNo == "360" && arvlTrmlNo == "358") ||
					(deprTrmlNo == "010" && arvlTrmlNo == "352") || (deprTrmlNo == "360" && arvlTrmlNo == "352")
				) {
				
				alert("['금호고속'의 '감성창문'에서 '안테나'의 가사와 음악을 만나보세요.]\n\n" +
						"○ 이용방법: '감성창문' 속 QR코드를 찍어 그 곡의 음악 감상\n" +
						"○ 운행노선: 서울-유성, 서울-안성, 서울-세종시(왕복적용)\n" +
						"○ 운행시간 및 좌석번호 : 금호고속 홈페이지 참조");
			}
		}
		
		// 20240423 경포터미널 추가
		if (deprDt <= '20240531'){
			if (cacmCd == '02' || cacmCd == '05') { // 동부, 속리산
				if (
						(deprTrmlNo == "010" && arvlTrmlNo == "352") || (deprTrmlNo == "352" && arvlTrmlNo == "010") || // 서울-세종
						(deprTrmlNo == "010" && arvlTrmlNo == "353") || (deprTrmlNo == "353" && arvlTrmlNo == "010") || // 서울-세종청사
						(deprTrmlNo == "010" && arvlTrmlNo == "351") || (deprTrmlNo == "351" && arvlTrmlNo == "010") || // 서울-세종연구단지
						(deprTrmlNo == "010" && arvlTrmlNo == "358") || (deprTrmlNo == "358" && arvlTrmlNo == "010") || // 서울-세종터미널(연구)
						(deprTrmlNo == "010" && arvlTrmlNo == "361") || (deprTrmlNo == "361" && arvlTrmlNo == "010") || // 서울-세종국무조정실
						(deprTrmlNo == "010" && arvlTrmlNo == "362") || (deprTrmlNo == "362" && arvlTrmlNo == "010") || // 서울-세종시청
						(deprTrmlNo == "100" && arvlTrmlNo == "230") || (deprTrmlNo == "230" && arvlTrmlNo == "100") || // 인천-속초
						(deprTrmlNo == "100" && arvlTrmlNo == "270") || (deprTrmlNo == "270" && arvlTrmlNo == "100") || // 인천-속초
						(deprTrmlNo == "400" && arvlTrmlNo == "700") || (deprTrmlNo == "700" && arvlTrmlNo == "400") || // 청주-부산
						(deprTrmlNo == "400" && arvlTrmlNo == "500") || (deprTrmlNo == "500" && arvlTrmlNo == "400") 	// 청주-광주
						){
					alert("[신규노선 안내]\n\n" +
							"1. 노 　　선 : 서울~경포해변\n" +
							"2. 운  행  사 : 주식회사 동부고속\n" +
							"3. 운행예정일 : 2024년 5월 3일\n" +
							"4. 운행 횟수 : 일 4회 왕복 운행\n" +
							"\n" +
							"많은 이용 바랍니다.");
				}
				
			}
		}
		
		
//		alert(cacmCd);
//		alert(alcnDeprTrmlNo);
//		alert(alcnArvlTrmlNo);
//
//		//deprCdCfm == "020"

		
		
		if(confirm(cfmText)){
			fnSeatStaChk(alcnDeprTrmlNo, alcnArvlTrmlNo, prvtBbizEmpAcmtRt, chldSftySatsYn, dsprSatsYn);
		}	

	}
}

//prvtBbizEmpAcmtRt:국민차장제 동의여부추가)-180704
//chldSftySatsYn:유아카시트 추가)-180802
//dsprSatsYn:휠체어가능여부 추가)-190926
function fnSeatStaChk(alcnDeprTrmlNo, alcnArvlTrmlNo, prvtBbizEmpAcmtRt, chldSftySatsYn, dsprSatsYn){
	var alcnSrchFrm = $("form[name=alcnSrchFrm]").serialize() ;
	
	$("#prvtBbizEmpAcmtRt").val(prvtBbizEmpAcmtRt);
	$("#chldSftySatsYn").val(chldSftySatsYn);
	$("#dsprSatsYn").val(dsprSatsYn);
	
	// 20210430 yahan
	$("#alcnSrchFrm").attr("action","/koBus/kobus_seat.do");
	$("#alcnSrchFrm").submit();
	return;
	/*
	$.ajax({	
        url      : "/mrs/readSatsChcChk.ajax",
        type     : "post",
        data : alcnSrchFrm,
        dataType : "json",
        async    : true,
        success  : function(readSatsChcMap){
        	if(readSatsChcMap.valChk == "Y"){
        		$("#alcnSrchFrm").attr("action","/mrs/satschc.do");
        		$("#alcnSrchFrm").submit();
        	}else{
//        		alert("배차정보 조회 시 오류가 발생하였습니다. 문제가 지속될 시 고객센터(1644-9030)으로 연락바랍니다.");
        		alert("배차정보 조회 시 오류가 발생하였습니다.");
        	}
        },
        error : function(){
//        	alert("배차정보 조회 시 오류가 발생하였습니다. 문제가 지속될 시 고객센터(1644-9030)으로 연락바랍니다.");
        	alert("배차정보 조회 시 오류가 발생하였습니다.");
        }
	});
	*/
}

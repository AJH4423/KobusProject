/* 전역변수 : 모든 전역변수에 접두사로 all 사용
 * 최종확인변수 : 모든 변수에 접미사 cfm 사용 
 */

$(document).ready(function() {
	//alert($("#deprCd").val()+" <> "+$("#deprNm").val());
	//alert($("#arvlCd").val()+" <> "+$("#arvlNm").val());
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

	if($("#abnrData").val() == "abnr"){
		alert("조회되는 배차가 없습니다. 배차정보에 관한 사항은 출발지 터미널로 문의하시기 바랍니다.");
		$("#loading").hide();
		return;
	}
	if($("#pathDvs").val() != "" && $("#pathDvs").val() != null){
		fnPathDvsChk($("#pathDvs").val());
	} else{
		fnPathDvsChk("sngl");
	}
	if($("#deprDtmAll").val() != "" && $("#deprDtmAll").val() != null){
		fnYyDtmStup(2,'text_date1',$("#deprDtmAll").val());
	}else{
		fnYyDtmStup(0,'text_date1','0');
	}
	if($("#arvlDtmAll").val() != "" && $("#arvlDtmAll").val() != null){
		fnYyDtmStup(2,'text_date2',$("#arvlDtmAll").val());
	}else{
		fnYyDtmStup(0,'text_date2','0');
	}
	if($("#deprCd").val() != "" && $("#deprCd").val() != null){
		$("#deprNmSpn").text($("#deprNm").val());
	} 
	if($("#arvlCd").val() != "" && $("#arvlCd").val() != null){
		$("#arvlNmSpn").text($("#arvlNm").val());
		fnEmptyCssStup();
		$("#alcnSrchBtn .btn_confirm").removeClass("ready");
	}
	
	//$("#oGradeAll").attr("checked",true);//버스등급 설정
	$("input[name=busClsCdR]").change(function() {
		$("#busClsCd").val(this.value);
	});
	if($("#busClsCd").val() != "" && $("#busClsCd").val() != null){
		$("input[name=busClsCdR][value=" + $("#busClsCd").val() + "]").trigger("click");
	} else {
		$("input[name=busClsCdR][value=0]").trigger("click");
	}
	

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



function fnYyDtmStup(ddChk,txtFld,dtVal){
	var dt0 = new Date();
	var dt1 = new Date();
	dt1.setDate(dt1.getDate()+1);
	var dt = new Date();
	if(ddChk < 2){
		dt.setDate(dt.getDate()+ddChk);
	}
	var yyyy = dt.getFullYear();
	var mm   = dt.getMonth()+1;
	var week = new Array('일','월','화','수','목','금','토');
	var dd   = dt.getDate();
	var wkdy = week[dt.getDay()];
	var yyDtm = yyyy+". "+mm+". "+dd+". "+wkdy;
	var mm2Len = Number(mm) < 10 ? "0"+mm : mm;
	var dd2Len = Number(dd) < 10 ? "0"+dd : dd;
	var dd0    = Number(dt0.getDate()) < 10 ? "0"+dt0.getDate() : dt0.getDate();
	var dd1    = Number(dt.getDate()) < 10 ? "0"+(dt.getDate()) : (dt.getDate());
	
	var yymmdd = yyyy+""+mm2Len+""+dd2Len;
	var yymmddD0 = yyyy+""+mm2Len+""+dd0;
	if(ddChk == 2){//datepicker를 통해서 들어온 데이터인지 화면에서 자동설정된 데이터인지 구분
		var yyDtmDvs = dtVal.split(".");  //.substring(dtVal.length-3,dtVal.length);
		yyDtm = dtVal;
		mm2Len = (Number(yyDtmDvs[1].trim()) < 10?"0"+yyDtmDvs[1].trim():yyDtmDvs[1].trim());
		dd1 = (Number(yyDtmDvs[2].trim()) < 10 ? "0"+yyDtmDvs[2].trim():yyDtmDvs[2].trim());
		yymmdd = yyDtmDvs[0].trim()+""+mm2Len+""+dd1;
	}
	var yymmddD1 = yyyy+""+mm2Len+""+dd1;
	var bscYymmddD1 = dt1.getFullYear()+(Number(dt1.getMonth()+1) < 10 ? "0"+(dt1.getMonth()+1):(dt1.getMonth()+1))+(Number(dt1.getDate()) < 10 ? "0"+(dt1.getDate()) : (dt1.getDate()));
	
	var min = 0;
	var max = 60;
	var extrComp = $("#extrComp").val();
	if (extrComp == 'ARMY'){
		var stdDtm = $("#stdDtm").val();
		var endDtm = $("#endDtm").val();
		min = new Date(Number(stdDtm.substring(0,4)),Number(stdDtm.substring(4,6))-1,Number(stdDtm.substring(6,8)));
		max = new Date(Number(endDtm.substring(0,4)),Number(endDtm.substring(4,6))-1,Number(endDtm.substring(6,8)));
	}
	
	$('#datepicker11').datepicker({
		showOn:"button",
		buttonImage:"/images/page/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"가는날 선택 달력",
		minDate: min,
		maxDate: max,
		onSelect: function(){
			var txtFld = 'text_date1';
			if ($(this).attr('id') == 'datepicker22') txtFld = 'text_date2';
			fnYyDtmStup(2,txtFld,$(this).val());
			$('.datepicker-active').focus();
			$('.datepicker-btn').removeClass('datepicker-active');
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
	$('#datepicker22').datepicker({
		showOn:"button",
		buttonImage:"/images/page/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"오는날 선택 달력",
		minDate: min,
		maxDate: max,
		onSelect: function(){
			var txtFld = 'text_date1';
			if ($(this).attr('id') == 'datepicker22') txtFld = 'text_date2';
			fnYyDtmStup(2,txtFld,$(this).val());
			$('.datepicker-active').focus();
			$('.datepicker-btn').removeClass('datepicker-active');
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
	
	
	if(txtFld == 'text_date1'){
		
		$('.'+txtFld).text(yyDtm);
		$("#deprDtm").val(yymmdd);
		$("#deprDtmAll").val(yyDtm);
		
		
		if(Number(yymmdd) > Number($("#arvlDtm").val())){
			fnYyDtmStup(ddChk,'text_date2',dtVal);
		}
		if(Number(yymmdd) <= Number(bscYymmddD1)){
			if(yymmdd == yymmddD0){
				$("#deprThddChc").addClass("active");
				$("#deprNxdChc").removeClass("active").removeAttr('title');
			}else if(yymmdd == yymmddD1){
				$("#deprThddChc").removeClass("active").removeAttr('title');
				$("#deprNxdChc").addClass("active");
			}else{
				$("#deprThddChc").removeClass("active").removeAttr('title');
				$("#deprNxdChc").removeClass("active").removeAttr('title');
			}
		}else{
			$("#deprThddChc").removeClass("active").removeAttr('title');
			$("#deprNxdChc").removeClass("active").removeAttr('title');
		}
		
		if(ddChk < 2){
			$("#datepicker11").datepicker('setDate',dt);
		}
	}else if(txtFld == 'text_date2'){
		
		if(Number($("#deprDtm").val()) <= Number(yymmdd)){
			
			$('.'+txtFld).text(yyDtm);
			$("#arvlDtm").val(yymmdd);
			$("#arvlDtmAll").val(yyDtm);
		
			if(Number(yymmdd) <= Number(bscYymmddD1)){
				if(yymmdd == yymmddD0){
					$("#arvlThddChc").addClass("active");
					$("#arvlNxdChc").removeClass("active").removeAttr('title');
				}else if(yymmdd == yymmddD1){
					$("#arvlThddChc").removeClass("active").removeAttr('title');
					$("#arvlNxdChc").addClass("active");
				}else{
					$("#arvlThddChc").removeClass("active").removeAttr('title');
					$("#arvlNxdChc").removeClass("active").removeAttr('title');
				}
			}else{
				$("#arvlThddChc").removeClass("active").removeAttr('title');
				$("#arvlNxdChc").removeClass("active").removeAttr('title');
			}
			
			if(ddChk < 2){
				$("#datepicker22").datepicker('setDate',dt);
			}else{
				var dpChk1 = $("#datepicker11").datepicker('getDate');
				$("#datepicker22").datepicker('setDate',dpChk1);
			}
		}else{
			
			if(Number($("#deprDtm").val()) > Number(yymmdd)){
				$(this).removeClass("active").removeAttr('title');
				var dpChk1 = $("#datepicker11").datepicker('getDate');
				$("#datepicker22").datepicker('setDate',dpChk1);
			}
		}
	}
}






function fnPathDvsChk(Dvs){ //메인화면에서 탭클릭시
	$("#pathDvs").val(Dvs);
	
	if( Dvs == "rtrp"){
		$("#rtrpYnAll").addClass("round");
		$("#snglRotAll").removeClass("active").removeAttr('title');
		$("#rtrpRotAll").addClass("active");
		if($("#deprNmSpn").text().length > 0 && $("#arvlNmSpn").text().length > 0){ // 기존 출도착지가 모두 선택되어 있을경우
			
			var deprCd = $("#deprCd").val();
			var arvlCd = $("#arvlCd").val();
			fnDerpListArvlYn(deprCd,arvlCd); //변경된 출발지에 기존 도착지 정보가 있는지 확인값
		}
		$("#chgDeprArvl").css("display","block");
		$("#imptDepr").css("display","block");
	}else{
		$("#rtrpYnAll").removeClass("round");
		$("#snglRotAll").addClass("active");
		$("#rtrpRotAll").removeClass("active").removeAttr('title');
		if(Dvs == "sngl"){
			$("#r1").prop("checked",true);
			$("#r2").prop("checked",false);
			$("#chgDeprArvl").css("display","block");
			$("#imptDepr").css("display","block");
		}else if(Dvs == "trtr"){
			$("#r1").prop("checked",false);
			$("#r2").prop("checked",true);
			$("#chgDeprArvl").css("display","none");
			if($("#pathStepRtn").val() != "2"){
				fnDeprInfDlt();//출발지 초기화
		 		fnArvlInfDlt();//도착지 초기화
			}
	 		//$("#imptDepr").css("display","none");
		}else{
			$("#pathDvs").val("sngl");
			$("#r1").prop("checked",true);
			$("#r2").prop("checked",false);
			$("#chgDeprArvl").css("display","block");
			//$("#imptDepr").css("display","block");
		}
	}
}





function fnAlcnSrch(){ //배차목록 조회하기 최종확인변수:모든 변수에 접미사cfm 
	var deprDtmChk = $("#deprDtm").val();
	var deprDtmChkYn = "N";
	
	
	
	var dt = new Date();		//오늘날짜 전체
	var yyyy  = dt.getFullYear();		//선택한 년도
	var mm    = dt.getMonth()+1;		//선택한 월
	var mm2Len = Number(mm) < 10 ? "0"+mm : mm;			// 선택ㅡㅜ?ㅌ월 ex:01 두글자로 변환
	var ddTo    = Number(dt.getDate()) < 10 ? "0"+dt.getDate() : dt.getDate(); 			// 숫자형
	var yymmddD0 = yyyy+""+mm2Len+""+ddTo;		//오늘날짜
	
	var hh = dt.getHours();
	var mi = dt.getMinutes();
	var ss = dt.getSeconds();
	var hhmiss = String(hh).padStart(2, '0') + 
				 String(mi).padStart(2, '0') +
				 String(ss).padStart(2, '0');
	
	if(deprDtmChk != null && deprDtmChk != "" && deprDtmChk.length == 8){
		deprDtmChkYn = "Y";
	}
	if(deprDtmChkYn == "N"){
		alert(deprDtmChk);
		alert("출발일을 다시 한번 확인해주세요.");
		$('.datepicker-active').focus();
		$('.datepicker-btn').removeClass('datepicker-active');
		fnYyDtmStup(0,'text_date1','0');
		return;
	}
	if(!$("#alcnSrchBtn .btn_confirm").hasClass("ready")){
		var crchDeprArvlYnCfm = $("#crchDeprArvlYn").val(); // 스왑버튼이 클릭이 된 경우가 있는지 확인
		var deprCdCfm =  $("#deprCd").val();
		var arvlCdCfm =  $("#arvlCd").val();
		var deprCdChcCfm = "N";
		if(crchDeprArvlYnCfm == "Y"){ // 스왑이 있었을 경우 출도착지 정보가 전체 출발지에 있는지 확인. 없으면 실패 리턴
			if(allDeprList == null || allDeprList.length <= 0){
				fnDerpList("Y","all");
			}
			for(var inx = 0 ; inx < allDeprList.length ; inx++){ 
				if(deprCdCfm == allDeprList[inx][0]){
					deprCdChcCfm = "Y";
				}
			}
		}else{
			deprCdChcCfm = "Y";
		}
		
		if(deprCdChcCfm != "Y"){
			alert("해당 노선은 예매 불가한 노선입니다.");
			fnRotIntz();
			$("#alcnSrchBtn .btn_confirm").addClass("ready");
			
			fnEmptyCssStup();
			
		}else{
			
			
			//인천공항 출발노선 
			if( deprCdCfm == "105" && (arvlCdCfm == "500" || arvlCdCfm == "505"|| arvlCdCfm == "510"|| arvlCdCfm == "516"|| arvlCdCfm == "525"|| arvlCdCfm == "520"|| arvlCdCfm == "801")) {
				if (confirm("인천공항 출발 노선은 코버스 노선이 아니라 시외버스 통합예매시스템(https://txbus.t-money.co.kr)에서 운행 하는 노선입니다. "+
							"시외버스 통합예매시스템 홈페이지로 이동합니다. \n" +
							"인천공항 출발 관련 문의는 시외버스 통합예매시스템(☎1644-3070)으로 하시기 바랍니다."))
				{
					var openNewWindow = window.open("about:blank");
					// 20220718 yahan 아래 url이 존재하지 않아 페이지 오류남
					//openNewWindow.location.href="https://txbus.t-money.co.kr/intro/intro.html";
					openNewWindow.location.href="https://txbus.t-money.co.kr";
					return false;
				}
			}else{
				
				// 20230501 센트럴코드변경
				if (deprCdCfm == "021") deprCdCfm = "020";
				if (arvlCdCfm == "021") arvlCdCfm = "020";
				// 20230820 정읍코드변경
				if (deprCdCfm == "631") deprCdCfm = "630";
				if (arvlCdCfm == "631") arvlCdCfm = "630";
				
				console.log( '['+ yymmddD0 +'/'+ hhmiss +'] ['+ deprCdCfm +'/'+ arvlCdCfm +']' );
				/**
				 * =============================
				 * 노선팝업
				 * deprCdCfm : 출발지
				 * arvlCdCfm : 도착지
				 * =============================
				 */
				



				
				// 20250530
				if (
						(deprCdCfm == "010" && arvlCdCfm == "177") || (deprCdCfm == "177" && arvlCdCfm == "010") || //서울경부↔안중
						(deprCdCfm == "010" && arvlCdCfm == "176") || (deprCdCfm == "176" && arvlCdCfm == "010") || //서울경부↔안중오거리
						(deprCdCfm == "174" && arvlCdCfm == "177") || (deprCdCfm == "177" && arvlCdCfm == "174") || //평택용이↔안중
						(deprCdCfm == "174" && arvlCdCfm == "176") || (deprCdCfm == "176" && arvlCdCfm == "174") || //평택용이↔안중오거리
						(deprCdCfm == "175" && arvlCdCfm == "177") || (deprCdCfm == "177" && arvlCdCfm == "175") || //평택대↔안중
						(deprCdCfm == "175" && arvlCdCfm == "176") || (deprCdCfm == "176" && arvlCdCfm == "175") || //평택대↔안중오거리
						(deprCdCfm == "180" && arvlCdCfm == "177") || (deprCdCfm == "177" && arvlCdCfm == "180") || //평택↔안중
						(deprCdCfm == "180" && arvlCdCfm == "176") || (deprCdCfm == "176" && arvlCdCfm == "180") || //평택↔안중오거리
						(deprCdCfm == "177" && arvlCdCfm == "010") || (deprCdCfm == "010" && arvlCdCfm == "177") || //안중↔서울경부
						(deprCdCfm == "177" && arvlCdCfm == "174") || (deprCdCfm == "174" && arvlCdCfm == "177") || //안중↔평택용이
						(deprCdCfm == "177" && arvlCdCfm == "175") || (deprCdCfm == "175" && arvlCdCfm == "177") || //안중↔평택대
						(deprCdCfm == "177" && arvlCdCfm == "180") || (deprCdCfm == "180" && arvlCdCfm == "177") || //안중↔평택
						(deprCdCfm == "176" && arvlCdCfm == "010") || (deprCdCfm == "010" && arvlCdCfm == "176") || //안중오거리↔서울경부
						(deprCdCfm == "176" && arvlCdCfm == "174") || (deprCdCfm == "174" && arvlCdCfm == "176") || //안중오거리↔평택용이
						(deprCdCfm == "176" && arvlCdCfm == "175") || (deprCdCfm == "175" && arvlCdCfm == "176") || //안중오거리↔평택대
						(deprCdCfm == "176" && arvlCdCfm == "180") || (deprCdCfm == "180" && arvlCdCfm == "176")    //안중오거리↔평택
						) {
					alert("[서울~안중 노선 운행중단 안내]\n\n"
							+ "오랜 시간 해당 노선을 이용해 주신 고객 여러분께 불편을 드리게 되어 진심으로 사과드립니다.\n"
							+ "서울~안중 노선은 그동안 여러분의 소중한 일상과 함께해 왔지만,\n"
							+ "지속적인 운행 여건 악화 및 불가피한 운영 사정으로 인해 운행을 종료하게 되었습니다.\n"
							+ "고객 여러분의 너른 양해 부탁드립니다.\n"
							+ "\n"
							+ "- 운행중단 노선 : 서울~안중\n"
							+ "- 운행 종료일 : 2025. 07. 01(화) 첫차부터");
				}
				
				// 20250528
				if (
						(deprCdCfm == "110" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "110") || //수원↔삼척
						(deprCdCfm == "112" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "112") || //영통↔삼척
						(deprCdCfm == "114" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "114") || //신갈시외↔삼척
						(deprCdCfm == "238" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "238")    //횡성↔삼척
						) {
					alert("[중간 경유지 변경 안내]\n\n"
							+ "2025년 6월 1일부 노선 운행이 변경 됩니다.\n"
							+ "삼척해수욕장으로 가시는 고객께서는 도착지를 '삼척해변'으로 \n"
							+ "조회 바랍니다.");
				}
				// 20250526 
				if (
						(deprCdCfm == "116" && arvlCdCfm == "500") || (deprCdCfm == "500" && arvlCdCfm == "116")    //고양백석↔광주(유·스퀘어)
						) {
					alert("■ 신규 노선 운행 안내\n\n"
							+ "1. `25년 6월 1일(일)부로 고양백석 ↔ 광주 (전주 경유)\n"
							+ "    노선이 운행되오니, 이용에 참고 부탁드립니다.\n"
							+ "2. 고양백석발 : 09:10,15:40\n"
							+ "    광주발 : 08:10,16:00\n"
							+ "3. 문의 : 서울 02-530-6311\n"
							+ "    광주 062-360-8715");
					
				}
				// 20250523 
				if (
						(deprCdCfm == "801" && arvlCdCfm == "120") || (deprCdCfm == "120" && arvlCdCfm == "801")    //동대구↔성남
						) {
					alert("『동대구↔성남』노선에 대하여 아래와 같이 전산망이 변경됩니다.\n"
							+ "\n"
							+ "-시  행  일 : 2025년 6월 1일\n"
							+ "-모  바  일 : 티머니GO 또는 버스타고\n"
							+ "-홈페이지 : 시외버스 통합예매 또는 버스타고\n"
							+ "-노선변경 : 동대구↔성남 ⇒ 동대구-구미-성남");
				}
				// 20250423
				if (
						(deprCdCfm == "116" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "116")    //고양백석↔강릉
						) {
					alert("[노선 변경 안내]\n\n"
							+ "2025년 5월 1일부 노선 운행이 변경 됩니다.\n"
							+ "주문진으로 가시는 고객께서는 고양~주문진으로 조회 바랍니다.\n"
							+ "(횡성휴게소 미경유)\n"
							+ "\n"
							+ "변경 전 : 고양(백석) - 횡성(휴) - 강릉\n"
							+ "변경 후 : 고양(백석) - 주문진 - 강릉");
				}
				// 20250417
				if (
						(deprCdCfm == "716" && arvlCdCfm == "500") || //울산신복→광주(유·스퀘어)
						(deprCdCfm == "716" && arvlCdCfm == "801")    //울산신복→동대구
						) {
					alert("[울산신복정류장 출발시간 안내]\n\n"
							+ "해당시간은 울산(기점) 출발시간입니다. \n"
							+ "울산신복(중간정차지)에서는 약 10~20분 후 출발 예정입니다.\n"
							+ "도로사정에 따라 출발시간이 지연될 수 있습니다.");
				}
				
				// 20250320
				if (
						(deprCdCfm == "830" && arvlCdCfm == "500") || //포항→광주(유·스퀘어)
						(deprCdCfm == "828" && arvlCdCfm == "500") || //포항시청→광주(유·스퀘어)
						(deprCdCfm == "500" && arvlCdCfm == "830") || //광주(유·스퀘어)→포항
						(deprCdCfm == "500" && arvlCdCfm == "828")    //광주(유·스퀘어)→포항시청
						) {
					if (deprCdCfm == "830" && arvlCdCfm == "500") {
						alert("[광주~포항시청~포항 노선 운행 중단 안내]\n\n"
								+ "※ 광주~포항시청~포항(고속) 노선이 3월 24일부터 운행 중단됩니다.\n"
								+ "   광주행 이용 고객께서는 포항(시외)터미널에서 출발하는 광주행 노선을 이용해 주시기 바랍니다.\n\n"
								+ "※ 포항(시외)터미널 노선 예매 방법 : 티머니GO, 버스타고\n"
								+ "※ 포항(시외)버스터미널 : 경북 포항시 남구 증흥로 85, (상도동)");
					}
					if (deprCdCfm == "828" && arvlCdCfm == "500") {
						alert("[광주~포항시청~포항 노선 운행 중단 안내]\n\n"
								+ "※ 광주~포항시청~포항(고속) 노선이 3월 24일부터 운행 중단됩니다.\n"
								+ "   광주행 이용 고객께서는 포항(시외)터미널에서 출발하는 광주행 노선을 이용해 주시기 바랍니다.\n\n"
								+ "※ 포항(시외)터미널 노선 예매 방법 : 티머니GO, 버스타고\n"
								+ "※ 포항(시외)버스터미널 : 경북 포항시 남구 증흥로 85, (상도동)");
					}
					if (deprCdCfm == "500" && arvlCdCfm == "830") {
						alert("[광주~포항시청~포항 노선 운행 중단 안내]\n\n"
								+ "※ 광주~포항시청~포항(고속) 노선이 3월 24일부터 운행 중단됩니다.\n"
								+ "   포항행 이용 고객께서는 포항(시외)터미널로 가는 광주행 노선을 이용해 주시기 바랍니다.\n\n"
								+ "※ 포항(시외)버스터미널 : 경북 포항시 남구 증흥로 85, (상도동)");
					}
					if (deprCdCfm == "500" && arvlCdCfm == "828") {
						alert("[광주~포항시청~포항 노선 운행 중단 안내]\n\n"
								+ "※ 광주~포항시청~포항(고속) 노선이 3월 24일부터 운행 중단됩니다.\n"
								+ "   포항행 이용 고객께서는 포항(시외)터미널로 가는 광주행 노선을 이용해 주시기 바랍니다.\n\n"
								+ "※ 포항(시외)버스터미널 : 경북 포항시 남구 증흥로 85, (상도동)");
					}
				}
				// 20250306 안산 ↔ 수원 ↔ 순천 ↔ 여수
				if (
						(deprCdCfm == "190" && arvlCdCfm == "110") || (deprCdCfm == "110" && arvlCdCfm == "190") || //안산↔수원
						(deprCdCfm == "190" && arvlCdCfm == "515") || (deprCdCfm == "515" && arvlCdCfm == "190") || //안산↔순천
						(deprCdCfm == "190" && arvlCdCfm == "510") || (deprCdCfm == "510" && arvlCdCfm == "190") || //안산↔여수
						(deprCdCfm == "110" && arvlCdCfm == "515") || (deprCdCfm == "515" && arvlCdCfm == "110") || //수원↔순천
						(deprCdCfm == "110" && arvlCdCfm == "510") || (deprCdCfm == "510" && arvlCdCfm == "110")    //수원↔여수
						) {
					alert("■ 운행시간표 변경 안내\n\n"
							+ "- 내용 : 3월1일부 해당 노선의 경로 및 운행 시간표가 변경되오니,\n"
							+ "　　　　이용에 참고 부탁드립니다.\n"
							+ "- 변경 전 :  수원 - 순천 - 여수 (4회)\n"
							+ "- 변경 후 :  안산 - 수원 - 신갈 - 순천 (3회)\n"
							+ "　　　　　안산 - 수원 - 영통 - 신갈 - 여천 - 여수 (4회)\n"
							+ "- 회사 : 금호고속, 경기고속");
				}
					
				// 20250305 고창~정읍~김제~인천공항T1~인천공항T2
				if (
						(deprCdCfm == "635" && arvlCdCfm == "630") || (deprCdCfm == "630" && arvlCdCfm == "635") || //고창↔정읍
						(deprCdCfm == "635" && arvlCdCfm == "620") || (deprCdCfm == "620" && arvlCdCfm == "635") || //고창↔김제
						(deprCdCfm == "635" && arvlCdCfm == "105") || (deprCdCfm == "105" && arvlCdCfm == "635") || //고창↔인천공항T1
						(deprCdCfm == "635" && arvlCdCfm == "117") || (deprCdCfm == "117" && arvlCdCfm == "635") || //고창↔인천공항T2
						(deprCdCfm == "630" && arvlCdCfm == "105") || (deprCdCfm == "105" && arvlCdCfm == "630") || //정읍↔인천공항T1
						(deprCdCfm == "630" && arvlCdCfm == "117") || (deprCdCfm == "117" && arvlCdCfm == "630") || //정읍↔인천공항T2
						(deprCdCfm == "620" && arvlCdCfm == "105") || (deprCdCfm == "105" && arvlCdCfm == "620") || //김제↔인천공항T1
						(deprCdCfm == "620" && arvlCdCfm == "117") || (deprCdCfm == "117" && arvlCdCfm == "620")    //김제↔인천공항T2
						) {
					alert("■ 노선 연장 운행 안내\n\n"
							+ "1. 03월10일부 해당 노선의 경로 및 운행시간이 변경되오니, 이용에 참고 부탁드립니다.\n"
							+ "    ▶변경전 : 정읍~김제~인천공항T1~인천공항T2\n"
							+ "    ▶변경후 : 고창~정읍~김제~인천공항T1~인천공항T2\n"
							+ "\n"
							+ "- 문의 : 042-855-0386 ( 인천공항 ), 063-272-5012 ( 김제,정읍,고창 )");
				}
				
				// 20250224  대전-전주 우등요금 할인 
				if (yymmddD0 >= 20250301 && yymmddD0 <= 20250831) {
					if (
							(deprCdCfm == "300" && arvlCdCfm == "602") || (deprCdCfm == "602" && arvlCdCfm == "300") || //대전복합↔전주
							(deprCdCfm == "300" && arvlCdCfm == "605") || (deprCdCfm == "605" && arvlCdCfm == "300") || //대전복합↔호남제일
							(deprCdCfm == "305" && arvlCdCfm == "602") || (deprCdCfm == "602" && arvlCdCfm == "305") || //대전청사↔전주
							(deprCdCfm == "305" && arvlCdCfm == "605") || (deprCdCfm == "605" && arvlCdCfm == "305")    //대전청사↔호남제일
							) {
						alert("[대전∼전주노선 우등고속 10% 할인 안내]\n"
								+ "대전∼전주노선 우등고속 요금을 아래와 같이 한시적으로 할인하고자 하오니 고객 여러분의 많은 이용 바랍니다.\n\n"
								+ "º 시행일자 : '25. 3. 1.(토)\n"
								+ "º 시행노선 : 대전복합↔전주, 대전복합↔전주호남제일문, \n"
								+ "　　　　　  대전청사↔전주, 대전청사↔전주호남제일문\n"
								+ "º 요금할인 : 우등고속 10% 할인 적용"
								//+ "º 적용기간 : 2025. 3. 1.(토)∼8. 31(일) / 6개월 예정"
								)
					}
				}
				
				
				// 20250213 성남-동대구 
				if (
						(deprCdCfm == "120" && arvlCdCfm == "801") // 성남-동대구
						) {
					alert("※ 성남→동대구노선의 운행시간이 변경됨을 안내드립니다.\n"
							+ "\n"
							+ " - 월-금요일 : 08:00, 13:30, 19:00\n"
							+ " - 토-일요일 : 08:00, 09:30, 11:00 ,13:30, 19:00\n"
							+ " - 운행 업체 : 속리산고속")
				}
				if (
						(deprCdCfm == "801" && arvlCdCfm == "120") // 성남-동대구
						) {
					alert("※ 동대구→성남 노선의 운행시간이 변경됨을 안내드립니다.\n"
							+ "\n"
							+ " - 월-금요일 : 08:00, 13:30, 19:00\n"
							+ " - 토-일요일 : 08:00, 13:30, 15:30, 17:30, 19:00\n"
							+ " - 운행 업체 : 속리산고속")
				}
				 
				// 20250120 
				if (
						(deprCdCfm == "020" && arvlCdCfm == "620") || (deprCdCfm == "620" && arvlCdCfm == "020") || //센트럴시티(서울)↔김제
						(deprCdCfm == "020" && arvlCdCfm == "581") || (deprCdCfm == "581" && arvlCdCfm == "020")    //센트럴시티(서울)↔함평
						) {
					alert("■ 운행시간표 안내\n\n"
							+ " - 내용 : 전북혁신~김제~함평 (일/2회)\n"
							+ " - 회사 : 금호고속\n"
							+ " - 문의 : 02-530-6311");
				}
				
				// 20250116 서울-이천, 서울-여주
				if (
						(deprCdCfm == "010" && arvlCdCfm == "160") || (deprCdCfm == "160" && arvlCdCfm == "010") || // 서울-이천
						(deprCdCfm == "010" && arvlCdCfm == "172") || (deprCdCfm == "172" && arvlCdCfm == "010")    // 서울-이천부발
						) {
					alert("[서울-이천 노선 차량 등급 및 요금 변경 안내]\n\n"
							+ "서울-이천 노선 차량 등급 및 요금 변경 운행됨을 안내드립니다. "
							+ "이용에 참고하시기 바랍니다.\n"
							+ "\n"
							+ "※ 차량등급 : 일반 → 우등 (요금 5,800원 → 6,300원)\n"
							+ "※ 변경일 : 2025년 2월 3일(월)\n"
							+ "\n"
							+ "항상 동부고속과 함께해주셔서 감사합니다.");
				}
				if (
						(deprCdCfm == "010" && arvlCdCfm == "140") || (deprCdCfm == "140" && arvlCdCfm == "010") || // 서울-여주
						(deprCdCfm == "010" && arvlCdCfm == "139") || (deprCdCfm == "139" && arvlCdCfm == "010")    // 서울-여주대
						) {
					alert("[서울-여주 노선 차량 등급 및 요금 변경 안내]\n\n"
							+ "서울-여주 노선 차량 등급 및 요금 변경 운행됨을 안내드립니다. "
							+ "이용에 참고하시기 바랍니다.\n"
							+ "\n"
							+ "※ 차량등급 : 일반 → 우등 (요금 7,200원 → 7,900원)\n"
							+ "※ 변경일 : 2025년 2월 3일(월)\n"
							+ "\n"
							+ "항상 동부고속과 함께해주셔서 감사합니다.");
				}
				
				// 20241213 [김해공항 노선 예매 안내]
				if (
						(deprCdCfm == "500" && arvlCdCfm == "740") || //광주(유·스퀘어)→김해공항
						(deprCdCfm == "515" && arvlCdCfm == "740") || //순천→김해공항
						(deprCdCfm == "525" && arvlCdCfm == "740")    //동광양→김해공항
						){
					alert("[김해공항 노선 예매 안내]\n\n"+
							"※ 김해공항행 노선 이용 시 천재지변, 고속도로 정체 등의 이유로 도착시간이 예정시간보다 다소 지연될 수 있습니다.\n"+
							"   해당 노선 예매 시 항공편 출발시간 등을 고려하여 평균 버스 소요시간보다 좀 더 여유 있게 예매하시기를 안내 드립니다.\n"+
							"\n"+
							"※ 공항버스 이용시 소화물은 1인당 최대 2개로 제한됩니다.\n"+
							"   (소화물 1개 기준 : 가로 50cm, 세로 40cm, 높이 20cm 이내 또는 총 중량 20킬로그램 미만)");
				}
				// 20241205 금호고속 인천공항 도착노선
				if (
						(deprCdCfm == "500" && arvlCdCfm == "105") || //광주(유·스퀘어)→인천공항T1
						(deprCdCfm == "505" && arvlCdCfm == "105") || //목포→인천공항T1
						(deprCdCfm == "560" && arvlCdCfm == "105") || //영광→인천공항T1
						(deprCdCfm == "515" && arvlCdCfm == "105") || //순천→인천공항T1
						(deprCdCfm == "510" && arvlCdCfm == "105") || //여수→인천공항T1
						(deprCdCfm == "525" && arvlCdCfm == "105") || //동광양→인천공항T1
						(deprCdCfm == "520" && arvlCdCfm == "105") || //광양→인천공항T1
						(deprCdCfm == "500" && arvlCdCfm == "117") || //광주(유·스퀘어)→인천공항T2
						(deprCdCfm == "505" && arvlCdCfm == "117") || //목포→인천공항T2
						(deprCdCfm == "560" && arvlCdCfm == "117") || //영광→인천공항T2
						(deprCdCfm == "515" && arvlCdCfm == "117") || //순천→인천공항T2
						(deprCdCfm == "510" && arvlCdCfm == "117") || //여수→인천공항T2
						(deprCdCfm == "525" && arvlCdCfm == "117") || //동광양→인천공항T2
						(deprCdCfm == "520" && arvlCdCfm == "117")    //광양→인천공항T2
						){
					alert("[인천공항 노선 예매 안내]\n\n"+
							"※ 인천공항행 노선 이용 시 천재지변, 고속도로 정체 등의 이유로 도착시간이 예정시간보다 다소 지연될 수 있습니다.\n"+
							"  해당 노선 예매 시 항공편 출발시간 등을 고려하여 평균 버스 소요시간보다 좀 더 여유 있게 (예시 : 비행기 출발 최소 3시간 전 공항에 도착) 예매하시기를 안내 드립니다.\n"+
							"※ 공항버스 이용시 소화물은 1인당 최대 2개로 제한됩니다.\n"+
							"   (소화물 1개 기준 : 가로 50cm, 세로 40cm, 높이 20cm 이내 또는 총 중량 20킬로그램 미만)"); 
				}
				
				// 20241205 추가 20250526 수정
				// 서울010-영월(272)왕복 운행시간 변경
				if (
						(deprCdCfm == "010" && arvlCdCfm == "272") || (deprCdCfm == "272" && arvlCdCfm == "010") 
						){
					alert("[■ 운행시간표 변경 안내]\n\n"+
							"1. 2025년 6월 1일(일)부 서울 ↔ 영월 노선의 운행 시간이 변경되오니, 이용에 참고 부탁드립니다.\n" + 
							"\n"+
							"2. 해당 노선은 경기고속과 공동운수를 실시하오니, 이용에 참고 부탁드립니다.\n"+
							"\n"+
							"- 문의 : 02-530-6311"); 
				}
				// 20241119 센트럴~무안~남악~진도
				if (
						(deprCdCfm == "020" && arvlCdCfm == "550") || //센트럴시티(서울)→무안
						(deprCdCfm == "020" && arvlCdCfm == "592") || //센트럴시티(서울)→남악
						(deprCdCfm == "020" && arvlCdCfm == "590")    //센트럴시티(서울)→진도
						){
					alert("■ 운행시간표 변경 안내\n\n"+
							"1. 12월1일부 해당 노선의 일부 시간 변경되오니, \n"+
							"    이용에 참고 부탁드립니다.\n"+
							"  ▶변경전 : 08:50분 센트럴~무안~남악~진도\n"+
							"  ▶변경후 : 08:10분 센트럴~무안~남악~진도\n"+
							"  - 문의 : 02-530-6311\n"+
							"          062-360-8715");
				}
				
				// 20241106 센트럴-담양(왕복), 정안휴-담양(왕복), 센트럴-정읍, 정안휴-정읍
				if (
						(deprCdCfm == "020" && arvlCdCfm == "582") || (deprCdCfm == "582" && arvlCdCfm == "020") ||
						(deprCdCfm == "315" && arvlCdCfm == "582") || (deprCdCfm == "582" && arvlCdCfm == "316") ||
						(deprCdCfm == "020" && arvlCdCfm == "630") || 
						(deprCdCfm == "315" && arvlCdCfm == "630") 
						){
					alert("[서울～정읍～담양노선 운행 안내]\n\n" +
							" ㅇ운송개시일 : ´24. 12. 01(일)\n" +
							" ㅇ노선경로 : 서울―정읍(태인)―담양\n" +
							" ※ 정읍↔담양 구간 운송개시\n" +
							"\n" + 
							"※ 서울∼정읍노선이 이용고객대비 공급좌석간에 큰 차이가 있어서 " +
							"'24년 12월부터 불가피하게 감회운행을 시행하오니 고객 여러분의 많은 이해와 양해를 바랍니다.");
				}
				// 정읍-담양
				if ((deprCdCfm == "630" && arvlCdCfm == "582")){
					alert("[안    내]\n\n" +
							"정읍발 출발 차량은 서울(기점)에서 출발한 차량입니다.\n" +
							"도로사정에 따라 출발시간이 지연될 수 있습니다.\n" +
							"\n" + 
							"※ 서울∼정읍노선이 이용고객대비 공급좌석간에 큰 차이가 있어서 " +
							"'24년 12월부터 불가피하게 감회운행을 시행하오니 고객 여러분의 많은 이해와 양해를 바랍니다.");
				}
				
				// 20241030 충남고속 홈티켓이 불가 안내
				if (
						(deprCdCfm == "396" && arvlCdCfm == "397") || //안면도→창기리
						(deprCdCfm == "397" && arvlCdCfm == "020") || //창기리→센트럴시티(서울)
						(deprCdCfm == "394" && arvlCdCfm == "020") || //태안→센트럴시티(서울)
						(deprCdCfm == "394" && arvlCdCfm == "300") || //태안→대전복합
						(deprCdCfm == "394" && arvlCdCfm == "100") || //태안→인천
						(deprCdCfm == "312" && arvlCdCfm == "020") || //당진→센트럴시티(서울)
						(deprCdCfm == "312" && arvlCdCfm == "388") || //당진→기지시
						(deprCdCfm == "388" && arvlCdCfm == "020") || //기지시→센트럴시티(서울)
						(deprCdCfm == "388" && arvlCdCfm == "700") || //기지시→부산
						(deprCdCfm == "388" && arvlCdCfm == "703") || //기지시→부산사상
						(deprCdCfm == "312" && arvlCdCfm == "300") || //당진→대전복합
						(deprCdCfm == "388" && arvlCdCfm == "300") || //기지시→대전복합
						(deprCdCfm == "398" && arvlCdCfm == "020") || //예산→센트럴시티(서울)
						(deprCdCfm == "398" && arvlCdCfm == "399") || //예산→덕산스파
						(deprCdCfm == "399" && arvlCdCfm == "020") || //덕산스파→센트럴시티(서울)
						(deprCdCfm == "389" && arvlCdCfm == "390") || //홍성→내포
						(deprCdCfm == "390" && arvlCdCfm == "020") || //내포→센트럴시티(서울)
						(deprCdCfm == "391" && arvlCdCfm == "392") || //청양→정산
						(deprCdCfm == "392" && arvlCdCfm == "020")    //정산→센트럴시티(서울)
						){
					alert("[충남고속 탑승안내]\n\n" +
							"본 노선은 인터넷예매 내역으로 탑승이 불가능 합니다.\n" +
							"반드시 '창구' 혹은 '무인발권기'에서 \"종이승차권\"을 발권 받으신 후 탑승하시기 바랍니다.\n" +
							"\n" +
							"바로 탑승을 원하시는 경우 \"티머니GO\"또는 \"고속버스 티머니\" 어플에서 예매하시기 바랍니다.");
				}

				// IDC이전
				if (yymmddD0 < 20241030 || (yymmddD0 == 20241030 && hhmiss < 50000)){
					if (
							(deprCdCfm == "500" && arvlCdCfm == "117") || //광주(유·스퀘어)->인천공항T2
							(deprCdCfm == "500" && arvlCdCfm == "020") || //광주(유·스퀘어)->센트럴시티(서울)
							(deprCdCfm == "620" && arvlCdCfm == "117") || //김제->인천공항T2
							(deprCdCfm == "735" && arvlCdCfm == "010") || //김해->서울경부
							(deprCdCfm == "736" && arvlCdCfm == "117") || //김해장유->인천공항T2
							(deprCdCfm == "736" && arvlCdCfm == "010") || //김해장유->서울경부
							(deprCdCfm == "706" && arvlCdCfm == "010") || //내서->서울경부
							(deprCdCfm == "801" && arvlCdCfm == "010") || //동대구->서울경부
							(deprCdCfm == "705" && arvlCdCfm == "010") || //마산->서울경부
							(deprCdCfm == "505" && arvlCdCfm == "117") || //목포->인천공항T2
							(deprCdCfm == "700" && arvlCdCfm == "010") || //부산->서울경부
							(deprCdCfm == "805" && arvlCdCfm == "010") || //서대구->서울경부
							(deprCdCfm == "010" && arvlCdCfm == "830") || //서울경부->포항
							(deprCdCfm == "010" && arvlCdCfm == "710") || //서울경부->창원
							(deprCdCfm == "010" && arvlCdCfm == "700") || //서울경부->부산
							(deprCdCfm == "010" && arvlCdCfm == "705") || //서울경부->마산
							(deprCdCfm == "010" && arvlCdCfm == "801") || //서울경부->동대구
							(deprCdCfm == "020" && arvlCdCfm == "500") || //센트럴시티(서울)->광주(유·스퀘어)
							(deprCdCfm == "515" && arvlCdCfm == "117") || //순천->인천공항T2
							(deprCdCfm == "510" && arvlCdCfm == "117") || //여수->인천공항T2
							(deprCdCfm == "510" && arvlCdCfm == "020") || //여수->센트럴시티(서울)
							(deprCdCfm == "560" && arvlCdCfm == "117") || //영광->인천공항T2
							(deprCdCfm == "715" && arvlCdCfm == "010") || //울산->서울경부
							(deprCdCfm == "716" && arvlCdCfm == "010") || //울산신복->서울경부
							(deprCdCfm == "360" && arvlCdCfm == "020") || //유성->센트럴시티(서울)
							(deprCdCfm == "602" && arvlCdCfm == "020") || //전주->센트럴시티(서울)
							(deprCdCfm == "630" && arvlCdCfm == "117") || //정읍->인천공항T2
							(deprCdCfm == "722" && arvlCdCfm == "010") || //진주->서울경부
							(deprCdCfm == "710" && arvlCdCfm == "010") || //창원->서울경부
							(deprCdCfm == "711" && arvlCdCfm == "010") || //창원역->서울경부
							(deprCdCfm == "830" && arvlCdCfm == "010") || //포항->서울경부
							
							(deprCdCfm == "500" && arvlCdCfm == "105") || //광주(유·스퀘어)->인천공항T1
							(deprCdCfm == "620" && arvlCdCfm == "105") || //김제->인천공항T1
							(deprCdCfm == "736" && arvlCdCfm == "105") || //김해장유->인천공항T1
							(deprCdCfm == "505" && arvlCdCfm == "105") || //목포->인천공항T1
							(deprCdCfm == "515" && arvlCdCfm == "105") || //순천->인천공항T1
							(deprCdCfm == "510" && arvlCdCfm == "105") || //여수->인천공항T1
							(deprCdCfm == "560" && arvlCdCfm == "105") || //영광->인천공항T1
							(deprCdCfm == "630" && arvlCdCfm == "105")    //정읍->인천공항T1
							){
						alert("[시스템 점검 안내]\n\n" +
								"- 10/30(수) 00:30~05:00 시간대에 탑승 예정인 고객께서는 예매 후 " +
								"모바일승차권을 저장 (고속버스티머니앱 접속 → 해당 승차권 조회 → 승차권 저장 클릭) 하시기 바랍니다. \n\n" +
								"- 문의사항 : 티머니 고객센터(1644-9030)");
					}
				}

				// 20241022 인천(100)-서부산(703)
				if (
						(deprCdCfm == "100" && arvlCdCfm == "703") || (deprCdCfm == "703" && arvlCdCfm == "100")
						){
					alert("□ 노선 휴업 안내\n" +
							"\n" +
							"그동안 이용해 주신 고객 여러분께 진심으로 감사의 말씀을 드립니다.\n" +
							"해당노선을 지속적으로 운행하고자 최대한 노력하였으나, \n" +
							"이용수요 급감 및 인건비, 유가 등 고정비용 상승으로 \n" +
							"더 이상 운영이 어려워 다음과 같이 운행이 중단되오니 \n" +
							"고객 여러분의 많은 이해와 양해를 바랍니다.\n" +
							"\n" +
							" - 휴업일자 : 24년 11월 01일(금) 부\n" +
							"\n" +
							"더 나은 서비스로 찾아뵙도록 노력하겠습니다. " +
							"감사합니다.");
					
				}
				
				// 20240927 청주-서부산
				if (
						(deprCdCfm == "400" && arvlCdCfm == "703") || (deprCdCfm == "703" && arvlCdCfm == "400")  // 청주-서부산
						){
					alert("□ 노선 휴업 안내\n" +
							"\n" +
							"그동안 이용해 주신 고객 여러분께 진심으로 감사의 말씀을 드립니다.\n" +
							"해당노선을 지속적으로 운행하고자 최대한 노력하였으나, \n" +
							"이용수요 급감 및 인건비, 유가 등 고정비용 상승으로 \n" +
							"더 이상 운영이 어려워 다음과 같이 운행이 중단되오니 \n" +
							"고객 여러분의 많은 이해와 양해를 바랍니다.\n" +
							"\n" +
							" - 운행중단일자 : 24년 10월 16일(수) 부\n" +
							"\n" +
							"더 나은 서비스로 찾아뵙도록 노력하겠습니다. " +
							"감사합니다.");
					
				}
				
				// 20240923 서울(센트럴) ↔ 나주혁신(531),영암(570),강진(535),장흥(580) [왕복 적용]
				if(
						(deprCdCfm == "020" && arvlCdCfm == "531") || (deprCdCfm == "020" && arvlCdCfm == "570") ||
						(deprCdCfm == "020" && arvlCdCfm == "535") || (deprCdCfm == "020" && arvlCdCfm == "580")
						){
					alert("■ 노선경로 변경 안내\n" +
							"\n" +
							"1. 10월1일부 해당 노선의 일부 변경되오니, \n" +
							"이용에 참고 부탁드립니다.\n" +
							"\n" +
							"  ▶변경전 : 07:20분(우등) 센트럴~강진~장흥\n" +
							"                08:40분(프리) 센트럴~나주혁신~영암~장흥\n" +
							"\n" +
							"  ▶변경후 : 07:20분(프리) 센트럴~나주혁신~강진~장흥\n" +
							"                08:40분(우등) 센트럴~영암~강진~장흥\n" +
							"\n" +
							"- 문의 : 02-530-6311\n" +
							"           062-360-8715");
				}
				if(
						(deprCdCfm == "531" && arvlCdCfm == "020") || (deprCdCfm == "570" && arvlCdCfm == "020") ||
						(deprCdCfm == "535" && arvlCdCfm == "020") || (deprCdCfm == "580" && arvlCdCfm == "020")
						){
					alert("■ 노선경로 변경 안내\n" +
							"\n" +
							"1. 10월1일부 해당 노선의 일부 변경되오니, \n" +
							"이용에 참고 부탁드립니다.\n" +
							"\n" +
							"  ▶변경전 : 15:20분(프리) 장흥~영암~나주혁신~센트럴\n" +
							"                17:00분(우등) 장흥~강진~센트럴\n" +
							"\n" +
							"  ▶변경후 : 15:20분(우등) 장흥~강진~영암~센트럴\n" +
							"                17:00분(우등) 장흥~강진~나주혁신~센트럴\n" +
							"\n" +
							"- 문의 : 02-530-6311\n" +
							"           062-360-8715");
				}
				
				// 20240903 동서울
				if(	(deprCdCfm == "032") ){
					alert("■동서울터미널 10월 예매안내\n" +
							"\n" +
//							"동서울 터미널 프로그램 수정으로 인하여 2024년 10월 01일부터 출발하는 " +
//							"차량은 2024년 09월 20일 부터 예매 가능하오니 " +
							"동서울터미널에서 출발하는 10월 예매는 10월1일 00시부터 가능하오니 " +
							"이용에 참고하여 주시기 바랍니다.");
				}
				
				// 20240828 의정부(170),구리(169)-부산(700)(상ㆍ하행) 운행종료
//				if(
//						(deprCdCfm == "169" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "169") ||
//						(deprCdCfm == "170" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "170")
//						){
//					alert("▣ 의정부-구리-부산 운행중단 안내\n" +
//							"\n" +
//							"-노   선 : 의정부-구리-부산(상ㆍ하행)\n" +
//							"-운행사 : 금호익스프레스\n" +
//							"-종료일 : 24년 9월 1일(월)\n" +
//							"-기   타 :  9월17(화), 9월18(수) 운행 유지\n" +
//							"-문   의  : 02-530-6222\n" +
//							"\n" +
//							"그동안 의정부-구리-부산 노선을 이용해 주셔서 감사합니다.");
//				}
				// 20240820 서울 ↔ 공주(320)
				if(
						(deprCdCfm == "010" && arvlCdCfm == "320") || (deprCdCfm == "320" && arvlCdCfm == "010")
						){
					alert("▣ 서울 ↔ 공주 프리미엄 요금할인 종료 안내\n" +
							"\n" +
							"   1. 노선 : 서울 ↔ 공주\n" +
							"   2. 시행일자 : 24년 9월 1일 00시 발권(예매)부터 적용\n" +
							"   3. 요금 :  변경 전 - 16,600원\n" +
							"                변경 후 - 17,800원\n" +
							"\n" +
							"※ 프리미엄요금 할인이 종료되오니 이용에 참고하여 주시기 바랍니다."); 
				}
				// 20240820 동서울 ↔ 창원(710), 창원역(711)
				if(
						(deprCdCfm == "710" && arvlCdCfm == "032") || (deprCdCfm == "032" && arvlCdCfm == "710") ||
						(deprCdCfm == "711" && arvlCdCfm == "032") || (deprCdCfm == "032" && arvlCdCfm == "711")
						){
					alert("[■ 동서울~창원 프리미엄 버스 운행 안내]\n" +
							"\n" +
							"   1. 운행노선 : 동서울~창원역~창원\n" +
							"   2. 시행일자 : 2024.09.01.(일) 부\n" +
							"   3. 변경사항 : 프리미엄 버스 투입 운행\n" +
							"   4. 운행시간 : 모바일 어플 또는 코버스 홈페이지 참고\n" +
							"   5. 요금할인 : 프리미엄 주중 9% / 주말 5% 할인\n" +
							"\n" +
							"※ 고객님께서는 이용에 참고하여 주시기 바라며, 많은 이용 부탁드립니다.");
				}
				// 20240820 동서울 ↔ 진주(722), 진주개양(723), 진주혁신(724)
				if(
						(deprCdCfm == "722" && arvlCdCfm == "032") || (deprCdCfm == "032" && arvlCdCfm == "722") ||
						(deprCdCfm == "723" && arvlCdCfm == "032") || (deprCdCfm == "032" && arvlCdCfm == "723") ||
						(deprCdCfm == "724" && arvlCdCfm == "032") || (deprCdCfm == "032" && arvlCdCfm == "724")
						){
					alert("[■ 동서울~진주 프리미엄 버스 운행 안내\n" +
							"\n" +
							"   1. 운행노선 : 동서울~진주개양(혁신)~진주\n" +
							"   2. 시행일자 : 2024.09.01.(일) 부\n" +
							"   3. 변경사항 : 프리미엄 버스 투입 운행\n" +
							"   4. 운행시간 : 모바일 어플 또는 코버스 홈페이지 참고\n" +
							"   5. 요금할인 : 프리미엄 주중 8% 할인\n" +
							"\n" +
							"※ 고객님께서는 이용에 참고하여 주시기 바라며, 많은 이용 부탁드립니다.");
				}
				// 20240820 용인~창원
				//용인(150) ↔ 창원(710), 마산(705)
				//용인신갈(111) ↔ 창원(710), 마산(705)
				if(
						(deprCdCfm == "150" && arvlCdCfm == "710") || (deprCdCfm == "710" && arvlCdCfm == "150") ||
						(deprCdCfm == "150" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "150") ||
						(deprCdCfm == "111" && arvlCdCfm == "710") || (deprCdCfm == "710" && arvlCdCfm == "111") ||
						(deprCdCfm == "111" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "111")
						){
					alert("■ 용인~창원 프리미엄 버스 운행 안내\n" +
							"\n" +
							"   1. 운행노선 : 용인~용인신갈~마산~창원\n" +
							"   2. 시행일자 : 2024.09.01.(일) 부\n" +
							"   3. 변경사항 : 프리미엄 버스 투입 운행\n" +
							"   4. 운행시간 : 모바일 어플 또는 코버스 홈페이지 참고\n" +
							"   5. 요금할인 : 프리미엄 주중 5% 할인\n" +
							"\n" +
							"※ 고객님께서는 이용에 참고하여 주시기 바라며, 많은 이용 부탁드립니다."); 
				}

				// 20240726 수원~진주 프리미엄 버스
				//수원(110) ↔ 진주(722), 진주개양(723), 진주혁신(724)
				if(
						(deprCdCfm == "110" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "110") ||
						(deprCdCfm == "110" && arvlCdCfm == "723") || (deprCdCfm == "723" && arvlCdCfm == "110") ||
						(deprCdCfm == "110" && arvlCdCfm == "724") || (deprCdCfm == "724" && arvlCdCfm == "110") 
					){
					alert("[수원~진주 프리미엄 버스 운행 안내]\n\n" +
							"   1. 운행노선 : 수원~진주개양(혁신)~진주\n" +
							"   2. 운행시간 : Kobus 홈페이지 또는 승차권 예매 앱 참조\n" +
							"   3. 시행일자 : 2024.08.05.(월) 부\n" +
							"\n" +
							"   ※ 고객님들의 많은 이용 부탁드립니다.");
				}
				if((deprCdCfm == "722" && arvlCdCfm == "110")){
					alert("※ 진주터미널 출발 승차권을 가지고 중간경유지 승차는 불가합니다.");
				}
				if((deprCdCfm == "723" && arvlCdCfm == "110")){
					alert("※ 해당시간은 진주(기점) 출발시간입니다. " +
							"진주개양(중간정차지)에서는 약 7~10분 후 출발 예정입니다. " +
							"도로사정에 따라 출발시간이 지연될 수 있습니다.");
				}
				if((deprCdCfm == "724" && arvlCdCfm == "110")){
					alert("※ 해당시간은 진주(기점) 출발시간입니다. " +
							"진주혁신(중간정차지)에서는 약 10분 후 출발 예정입니다. " +
							"도로사정에 따라 출발시간이 지연될 수 있습니다.");
				}
				
				// 20240716 순천, 부산 왕복
				if(
						(deprCdCfm == "700" && arvlCdCfm == "515") || (deprCdCfm == "515" && arvlCdCfm == "700")
					){
					alert("[순천↔부산노선 할인중단 안내]\n\n" +
							"순천↔부산 노선에 적용되었던 일부할인(경로,대학생)이\n" +
							"2024.03.11(월)부로 중단되었음을 안내드리오니\n" +
							"이용하는 데에 착오 없으시길 바랍니다.");
				}
				
				// 20240627 금호고속 경로 및 출발시간 변경
				// 영광560, 함평581, 무안550, 해제552, 지도585, 목포505, 진도590, 해남595
				if(
						(deprCdCfm == "020" && arvlCdCfm == "560") || (deprCdCfm == "560" && arvlCdCfm == "020") ||
						(deprCdCfm == "020" && arvlCdCfm == "581") || (deprCdCfm == "581" && arvlCdCfm == "020") ||
						(deprCdCfm == "020" && arvlCdCfm == "550") || (deprCdCfm == "550" && arvlCdCfm == "020") ||
						(deprCdCfm == "020" && arvlCdCfm == "552") || (deprCdCfm == "552" && arvlCdCfm == "020") ||
						(deprCdCfm == "020" && arvlCdCfm == "585") || (deprCdCfm == "585" && arvlCdCfm == "020") ||
						(deprCdCfm == "020" && arvlCdCfm == "505") || (deprCdCfm == "505" && arvlCdCfm == "020") ||
						(deprCdCfm == "020" && arvlCdCfm == "590") || (deprCdCfm == "590" && arvlCdCfm == "020") ||
						(deprCdCfm == "020" && arvlCdCfm == "595") || (deprCdCfm == "595" && arvlCdCfm == "020") 
					){
					alert("[경유지 및 시간변경 안내]\n\n" +
							"- 7월1일부 해당 노선의 경유지 및 출발시간이 변경되오니, 이용에 참고 부탁드립니다.\n" +
							"\n" +
							"- 문  의 : 02-530-6311(금호고속[서울])\n" +
							"           062-360-8715(금호고속[광주])");
				}
				// 20240627 문장 운행종료584
				if(
						(deprCdCfm == "020" && arvlCdCfm == "584") || (deprCdCfm == "584" && arvlCdCfm == "020")
					){
					alert("[운행 종료 안내]\n\n" +
							"- 내  용 : 운행종료\n" +
							"- 회  사 : 금호고속\n" +
							"- 문  의 : 02-530-6311(금호고속[서울])\n" +
							"           062-360-8715(금호고속[광주])\n" +
							"- 시행일 : 2024년 7월 1일(월)");
				}
				
// 20240627 삭제
//				// 20240626 센트럴시티 매표소 무인시스템
//				if (deprCdCfm == "020" || arvlCdCfm == "020"){
//					alert("[센트럴시티터미널 매표소 무인 시스템 운영]\n" +
//							"'2024년 7월 15일(월)' 부터 아래 시간대에는 무인시스템으로 " +
//							"운영되오니 참고하시기 바랍니다\n" +
//							"\n" +
//							"■ 무인 시스템 운영시간 (현금결제 불가)\n" +
//							" - 오전 05:00 ~ 07:00\n" +
//							" - 심야 22:00 ~ 02:00\n" +
//							"■ 이용방법\n" +
//							" - 무인발권기 : 카드 결제만 가능 (발권/취소/환불 가능)");
//				}

				// 20240530 버스전용차로연장
				if (
						// 서울경부-평택용이174, 평택대175, 평택180, 안중오거리176, 안중177
						(deprCdCfm == "010" && arvlCdCfm == "174") || (deprCdCfm == "174" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "175") || (deprCdCfm == "175" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "176") || (deprCdCfm == "176" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "177") || (deprCdCfm == "177" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "180") || (deprCdCfm == "180" && arvlCdCfm == "010") ||
						// 천안(310),아산서부(341),배방정류소(337), 아산온양(340), 아산둔포(344),아산테크노(338)
						(deprCdCfm == "010" && arvlCdCfm == "310") || (deprCdCfm == "310" && arvlCdCfm == "010") || 
						(deprCdCfm == "010" && arvlCdCfm == "337") || (deprCdCfm == "337" && arvlCdCfm == "010") || 
						(deprCdCfm == "010" && arvlCdCfm == "338") || (deprCdCfm == "338" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "340") || (deprCdCfm == "340" && arvlCdCfm == "010") || 
						(deprCdCfm == "010" && arvlCdCfm == "341") || (deprCdCfm == "341" && arvlCdCfm == "010") || 
						(deprCdCfm == "010" && arvlCdCfm == "344") || (deprCdCfm == "344" && arvlCdCfm == "010") ||
						// 죽전118, 신갈영덕119, 탕정삼성LCD(349),아산탕정사무소(342),선문대(347),천안3공단(346), 천안아산(343)
						(deprCdCfm == "010" && arvlCdCfm == "118") || (deprCdCfm == "118" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "119") || (deprCdCfm == "119" && arvlCdCfm == "010") || 
						(deprCdCfm == "010" && arvlCdCfm == "342") || (deprCdCfm == "342" && arvlCdCfm == "010") || 
						(deprCdCfm == "010" && arvlCdCfm == "343") || (deprCdCfm == "343" && arvlCdCfm == "010") || 
						(deprCdCfm == "010" && arvlCdCfm == "346") || (deprCdCfm == "346" && arvlCdCfm == "010") || 
						(deprCdCfm == "010" && arvlCdCfm == "347") || (deprCdCfm == "347" && arvlCdCfm == "010") || 
						(deprCdCfm == "010" && arvlCdCfm == "349") || (deprCdCfm == "349" && arvlCdCfm == "010") 
						){
					alert("[버스전용차로 연장 안내]\n\n" +
							"1. 시 행 일 : 2024. 06. 03(월)\n" +
							"2. 내 　 용 : 평일 버스전용차로 확대\n" +
							"      양재IC~오산IC → 양재IC~안성ID (18.4km 연장확대)\n\n" +
							"평일 버스전용차로 확대로 인해 정체시간에 더 원활하게 운행이 가능하오니 " +
							"고객님들의 많은 이용 부탁드립니다.");
				}
				
				// 20240530 서울-평택 정기권
				// 서울경부-평택용이174, 평택대175, 평택180, 안중오거리176, 안중177
				if (
						(deprCdCfm == "010" && arvlCdCfm == "174") || (deprCdCfm == "174" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "175") || (deprCdCfm == "175" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "176") || (deprCdCfm == "176" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "177") || (deprCdCfm == "177" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "180") || (deprCdCfm == "180" && arvlCdCfm == "010") 
						){
					alert("[정기권 신규 도입 안내]\n\n" +
							"1. 노 선 명 : 서울↔평택\n" +
							"2. 이용등급 : 우등 정기권\n" +
							"3. 이용권종 : 일반/학생 20일, 30일권\n" +
							"4. 도입사유 : 우등형 차량 투입에 따른 도입\n" +
							"5. 시행일자 : 2024. 05. 01(수)\n\n" +
							"※ 자세한 내용은 '정기권 이용 안내'를 참고해 주시기 바랍니다.");
				}
				// 20240530 서울-탕정삼성LCD
				// 죽전118, 신갈영덕119, 탕정삼성LCD(349),아산탕정사무소(342),선문대(347),천안3공단(346), 천안아산(343)
				if(
						// 하행
						(deprCdCfm == "010" && arvlCdCfm == "118") || 
						(deprCdCfm == "010" && arvlCdCfm == "119") || 
						(deprCdCfm == "010" && arvlCdCfm == "346") || 
						(deprCdCfm == "010" && arvlCdCfm == "343") || 
						(deprCdCfm == "010" && arvlCdCfm == "347") || 
						(deprCdCfm == "010" && arvlCdCfm == "342") || 
						(deprCdCfm == "010" && arvlCdCfm == "349") ||
						// 상행
						(deprCdCfm == "349" && arvlCdCfm == "010") ||
						(deprCdCfm == "349" && arvlCdCfm == "118") || 
						(deprCdCfm == "349" && arvlCdCfm == "119") || 
						(deprCdCfm == "349" && arvlCdCfm == "346") || 
						(deprCdCfm == "349" && arvlCdCfm == "343") || 
						(deprCdCfm == "349" && arvlCdCfm == "347") || 
						(deprCdCfm == "349" && arvlCdCfm == "342")  
						){
					alert("[서울↔탕정 노선 시간표 변경안내]\n\n" +
							"1. 적용일자 : 2024. 06. 01(토)\n" +
							"2. 노 　 선 : 서울↔탕정삼성LCD\n" +
							"3. 변경사항 : 일부시간 조정\n" +
							"    가. 탕정발 06:10분→07:00분\n" +
							"    나. 서울발 09:30분→09:55분");
				}
				
				
				// 20240513 조치원홍대
				if (deprCdCfm == "354" || arvlCdCfm == "354"){
					alert("[현장 매표중단 안내]\n\n" +
							"2024년 5월 21일부터 조치원 홍대정류장 현장 매표 및 발권이\n" +
							"중단되오니 모바일 및 홈페이지를 통해 예매해주시기 바랍니다.");
				}

				// 20240430 경주↔부산 
				if (
						(deprCdCfm == "815" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "815") 
						){
					alert("[안내]\n\n" +
							"금호고속에서 운행하던 경주(고속)-부산(고속) 노선의 운행이\n" +
							"2024년 5월 1일(수)부로 종료되었으니,\n" +
							"경주(시외)-부산동부 노선을 이용해주시길 바랍니다.\n\n" +
							"감사합니다.");
				}
				
				// 20240508 안동840발 동대구 전산망변경
				if (
						(deprCdCfm == "840" && arvlCdCfm == "801") 
						){
					alert("『안동→동대구 』 노선에 대하여 아래와 같이 전산망이 변경됩니다.\n\n" +
							"1. 시 행 일 : 2024년 6월 1일(토)\n" +
							"2. 모 바 일 : 버스타고\n" +
							"3. 홈페이지 : 버스타고");
				}

				// 20240424 동대구801-영주835,안동840 전산망변경
				if (
						(deprCdCfm == "801" && arvlCdCfm == "835") || (deprCdCfm == "835" && arvlCdCfm == "801") ||
						(deprCdCfm == "801" && arvlCdCfm == "840") 
						){
					alert("『동대구↔영주 』,『동대구→안동 』 노선에 대하여 아래와 같이 전산망이 변경됩니다.\n\n" +
							"1. 시 행 일 : 2024년 6월 1일(토)\n" +
							"2. 모 바 일 : 티머니GO 또는 버스타고\n" +
							"3. 홈페이지 : 시외버스 통합예매 또는 버스타고");
				}

				// 20240423 yahan 서울-경포해변
				if (yymmddD0 < '20240531'){
					if(
							(deprCdCfm == "010" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "010") || // 서울-강릉
							(deprCdCfm == "010" && arvlCdCfm == "210") || (deprCdCfm == "210" && arvlCdCfm == "010") || // 서울-동해
							(deprCdCfm == "010" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "010") || // 서울-삼척
							(deprCdCfm == "010" && arvlCdCfm == "230") || (deprCdCfm == "230" && arvlCdCfm == "010") || // 서울-속초
							(deprCdCfm == "010" && arvlCdCfm == "270") || (deprCdCfm == "270" && arvlCdCfm == "010") || // 서울-양양
							(deprCdCfm == "010" && arvlCdCfm == "400") || (deprCdCfm == "400" && arvlCdCfm == "010") || // 서울-청주
							
							(deprCdCfm == "010" && arvlCdCfm == "240") || (deprCdCfm == "240" && arvlCdCfm == "010") || // 서울-원주
							(deprCdCfm == "010" && arvlCdCfm == "245") || (deprCdCfm == "245" && arvlCdCfm == "010") || // 서울-원주문막
							(deprCdCfm == "010" && arvlCdCfm == "244") || (deprCdCfm == "244" && arvlCdCfm == "010") || // 서울-원주혁신
							(deprCdCfm == "010" && arvlCdCfm == "246") || (deprCdCfm == "246" && arvlCdCfm == "010") || // 서울-원주기업도시
							(deprCdCfm == "010" && arvlCdCfm == "450") || (deprCdCfm == "450" && arvlCdCfm == "010") || // 서울-제천
							(deprCdCfm == "010" && arvlCdCfm == "449") || (deprCdCfm == "449" && arvlCdCfm == "010") || // 서울-제천하소
							
							(deprCdCfm == "010" && arvlCdCfm == "150") || (deprCdCfm == "150" && arvlCdCfm == "010") || // 서울-용인
							(deprCdCfm == "010" && arvlCdCfm == "149") || (deprCdCfm == "149" && arvlCdCfm == "010") || // 서울-용인유림
							(deprCdCfm == "010" && arvlCdCfm == "160") || (deprCdCfm == "160" && arvlCdCfm == "010") || // 서울-이천
							(deprCdCfm == "010" && arvlCdCfm == "172") || (deprCdCfm == "172" && arvlCdCfm == "010") || // 서울-이천부발
							(deprCdCfm == "010" && arvlCdCfm == "140") || (deprCdCfm == "140" && arvlCdCfm == "010") || // 서울-여주
							(deprCdCfm == "010" && arvlCdCfm == "139") || (deprCdCfm == "139" && arvlCdCfm == "010") || // 서울-여주대
							(deprCdCfm == "010" && arvlCdCfm == "141") || (deprCdCfm == "141" && arvlCdCfm == "010") || // 서울-여주프리미엄
							
							(deprCdCfm == "010" && arvlCdCfm == "350") || (deprCdCfm == "350" && arvlCdCfm == "010") || // 서울-조치원
							(deprCdCfm == "010" && arvlCdCfm == "354") || (deprCdCfm == "354" && arvlCdCfm == "010") || // 서울-홍대조치원
							(deprCdCfm == "010" && arvlCdCfm == "355") || (deprCdCfm == "355" && arvlCdCfm == "010") || // 서울-고대조치원
							
							(deprCdCfm == "032" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "032") || // 동서울-강릉
							(deprCdCfm == "032" && arvlCdCfm == "210") || (deprCdCfm == "210" && arvlCdCfm == "032") || // 동서울-동해
							(deprCdCfm == "032" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "032") || // 동서울-삼척
							(deprCdCfm == "032" && arvlCdCfm == "230") || (deprCdCfm == "230" && arvlCdCfm == "032") || // 동서울-속초
							(deprCdCfm == "032" && arvlCdCfm == "270") || (deprCdCfm == "270" && arvlCdCfm == "032") || // 동서울-양양
							(deprCdCfm == "032" && arvlCdCfm == "400") || (deprCdCfm == "400" && arvlCdCfm == "032") || // 동서울-청주
							
							(deprCdCfm == "110" && arvlCdCfm == "210") || (deprCdCfm == "210" && arvlCdCfm == "110") || // 수원-동해
							(deprCdCfm == "110" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "110") || // 수원-삼척
							(deprCdCfm == "110" && arvlCdCfm == "219") || (deprCdCfm == "219" && arvlCdCfm == "110") || // 수원-강원대
							(deprCdCfm == "112" && arvlCdCfm == "210") || (deprCdCfm == "210" && arvlCdCfm == "112") || // 영통-동해
							(deprCdCfm == "112" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "112") || // 영통-삼척
							(deprCdCfm == "112" && arvlCdCfm == "219") || (deprCdCfm == "219" && arvlCdCfm == "112") || // 영통-강원대
							(deprCdCfm == "114" && arvlCdCfm == "210") || (deprCdCfm == "210" && arvlCdCfm == "114") || // 신갈시외-동해
							(deprCdCfm == "114" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "114") || // 신갈시외-삼척
							(deprCdCfm == "114" && arvlCdCfm == "219") || (deprCdCfm == "219" && arvlCdCfm == "114") || // 신갈시외-강원대
							
							(deprCdCfm == "120" && arvlCdCfm == "801") || (deprCdCfm == "801" && arvlCdCfm == "120") || // 성남-동대구
							(deprCdCfm == "120" && arvlCdCfm == "805") || (deprCdCfm == "805" && arvlCdCfm == "120") || // 성남-서대구
							(deprCdCfm == "120" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "120") || // 성남-부산
							(deprCdCfm == "400" && arvlCdCfm == "801") || (deprCdCfm == "801" && arvlCdCfm == "400") || // 청주-동대구
							(deprCdCfm == "400" && arvlCdCfm == "805") || (deprCdCfm == "805" && arvlCdCfm == "400") || // 청주-서대구
							//(deprCdCfm == "400" && arvlCdCfm == "703") || (deprCdCfm == "703" && arvlCdCfm == "400") || // 청주-서부산
							
							(deprCdCfm == "115" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "115") || // 고양-강릉
							(deprCdCfm == "310" && arvlCdCfm == "500") || (deprCdCfm == "500" && arvlCdCfm == "310") || // 천안-광주
							(deprCdCfm == "120" && arvlCdCfm == "730") || (deprCdCfm == "730" && arvlCdCfm == "120") 	// 성남-통영
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
				// 
				

				// 20240422 인천-천안-아산 정기권
				// 천안(310),아산서부(341),배방정류소(337), 아산온양(340)
				if (
						(deprCdCfm == "337" && arvlCdCfm == "100") || (deprCdCfm == "100" && arvlCdCfm == "337") ||
						(deprCdCfm == "341" && arvlCdCfm == "100") || (deprCdCfm == "100" && arvlCdCfm == "341") ||
						//(deprCdCfm == "343" && arvlCdCfm == "100") || (deprCdCfm == "100" && arvlCdCfm == "343") || 천안아산(343) 
						(deprCdCfm == "310" && arvlCdCfm == "100") || (deprCdCfm == "100" && arvlCdCfm == "310") ||  
						(deprCdCfm == "340" && arvlCdCfm == "100") || (deprCdCfm == "100" && arvlCdCfm == "340") 
						){
					alert("[정기권 신규 도입 안내]\n\n" +
							"1. 노 선 명 : 인천~천안~아산\n" +
							"2. 이용등급 : 우등 정기권\n" +
							"3. 이용권종 : 일반/학생 20일, 30일권\n" +
							"4. 도입사유 : 우등형 차량 투입에 따른 도입\n" +
							"5. 시행일자 : 2024. 05. 01(수)\n\n" +
							"※자세한 내용은 '정기권 이용 안내'를 참고해 주시기 바랍니다.\n\n" +
							"※중간정류장 승차시 교통상황에 따라 예정된 출발시간이 다소 지연 될 수 있는점 양해 부탁드립니다.");
				}
				

				// 20240328 yahan 수정
				//센트럴시티->군산
				if(deprCdCfm == "020" && arvlCdCfm == "610"){
					alert("[동군산(대야) 경유시간 안내]\n" +
							"아래 시간대에 한하여 동군산(대야)정류장에 경유하고 있으니 참고 바랍니다.\n\n" +
							"- 센트럴시티(서울) → 군산 (총 3회) : 08:00 / 13:00 / 17:20\n" +
							"- 운행고속사 : 금호, 중앙, 천일\n" +
							"- 동군산(대야)정류장 경유 시 약 2시간 45분 소요");
				}
				//군산->센트럴시티
				if(deprCdCfm == "610" && arvlCdCfm == "020"){
					alert("[동군산(대야) 경유시간 안내]\n" +
							"아래 시간대에 한하여 동군산(대야)정류장에 경유하고 있으니 참고 바랍니다.\n\n" +
							"- 군산 → 센트럴시티(서울) (총 3회) : 08:00 / 12:20 / 17:40\n" +
							"- 운행고속사 : 금호, 중앙, 천일\n" +
							"- 동군산(대야)정류장 경유 시 약 2시간 45분 소요");
				}	

				// 20240320 ~ 20240327
				// 동부고속 승무사원 채용 공고
				if (yymmddD0 < '20240327'){
					if(
							// 서울-동해, 서울-삼척, 서울-제천, 서울-용인, 서울-이천, 서울-여주, 동서울-동해, 동서울-삼척, 동서울-속초
							(deprCdCfm == "010" && arvlCdCfm == "210") || (deprCdCfm == "210" && arvlCdCfm == "010") ||
							(deprCdCfm == "010" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "010") ||
							(deprCdCfm == "010" && arvlCdCfm == "450") || (deprCdCfm == "450" && arvlCdCfm == "010") ||
							(deprCdCfm == "010" && arvlCdCfm == "140") || (deprCdCfm == "140" && arvlCdCfm == "010") ||
							(deprCdCfm == "010" && arvlCdCfm == "150") || (deprCdCfm == "150" && arvlCdCfm == "010") ||
							(deprCdCfm == "010" && arvlCdCfm == "160") || (deprCdCfm == "160" && arvlCdCfm == "010") ||
							(deprCdCfm == "032" && arvlCdCfm == "210") || (deprCdCfm == "210" && arvlCdCfm == "032") ||
							(deprCdCfm == "032" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "032") ||
							(deprCdCfm == "032" && arvlCdCfm == "230") || (deprCdCfm == "230" && arvlCdCfm == "032") 
						){
						alert("[동부고속 고속버스 151기 승무사원 모집]\n\n" +
								"1. 지원자격(아래 둘 중 하나에 해당하는 자)\n" +
								"  ① 버스회사 운전 경력 2년 이상\n" +
								"  ② 화물 운전 경력 3년 이상\n" +
								"\n" +
								"2. 지원기간\n" +
								"  * 2024.03.11(월) ~ 03.26(화)\n" +
								"\n" +
								"3. 채용절차\n" +
								"  * 서류마감 ▶ 면접전형 ▶ 실기전형 ▶ 채용검진 ▶ 최종합격\n" +
								"\n" +
								"4. 지원방법\n" +
								"  * 우편접수:서울 서초구 신반포로 194, 9층 924호\n" +
								"  * 이메일접수:recruit@dongbubus.com\n" +
								"\n" +
								"5. 제출서류\n" +
								"  * 이력서 + 주민등록등본\n" +
								"  * 운전면허증 / 버스운전자격증 사본\n" +
								"  * 운전경력증명서(전체경력)\n" +
								"  * 교통안전공단 운수종사자 정보조회 사본(최근 3개월 이내)\n" +
								"  * 경력증명서 / 재직증명서\n" +
								"  * 운전적성정밀 신규/특별검사 판정표(최근 3개월 이내)\n" +
								"  * 건강보험득실 확인서(건강보험공단)");
					}
				}
				// 20240223
				if(
						(deprCdCfm == "355" && arvlCdCfm == "010")
					){
					alert("[안내]\n\n" +
							"고대조치원 현장 매표/발권업무 종료\n" +
							"    * 종료일시 : `24.03.01 00시");
				}
				if(
						(deprCdCfm == "020" && arvlCdCfm == "585")
					){
					alert("[서울-지도 일부 운행 시간 경로 변경]\n\n" +
							"▣ 14:55 서울-장성-문장-함평-지도\n" +
							"　 09:45 지도-함평-문장-장성-서울\n" +
							"▣ 소요시간 : 5시간");
				}
				if(
						(deprCdCfm == "585" && arvlCdCfm == "020")
					){
					alert("[서울-지도 일부 운행 시간 경로 변경]\n\n" +
							"▣ 09:45 지도-함평-문장-장성-서울\n" +
							"　 14:55 서울-장성-문장-함평-지도\n" +
							"▣ 소요시간 : 5시간");
				}
				// 20240206 인천100-익산615,익산팔봉616,정안하315,정안상316 : 왕복
				if(
						(deprCdCfm == "100" && arvlCdCfm == "615") || (deprCdCfm == "615" && arvlCdCfm == "100") ||
						(deprCdCfm == "100" && arvlCdCfm == "616") || (deprCdCfm == "616" && arvlCdCfm == "100") ||
						(deprCdCfm == "100" && arvlCdCfm == "315") || (deprCdCfm == "316" && arvlCdCfm == "100")
					){
					alert("[인천-정안노선 안내]\n\n" +
							"▣ 안산터미널 경유차량은 추가 소요시간이(30분이상) 발생하오니 이용에 참고하여 주시기 바랍니다.");
				}
				
				
				// 20240124 서울->세종352(연구단지351,청사353,연구358,국무조정361,세종시청362)
				if(
						(deprCdCfm == "010" && arvlCdCfm == "352") || (deprCdCfm == "352" && arvlCdCfm == "010")
					){
					alert("[안내]\n\n" +
							"서울-세종노선 연구단지 경유차량은 터미널 도착 \n" +
							"까지 20분 더 소요되오니 이용에 참고하여주시기 바랍니다.");
				}
				
				// 20240111 광주 500 -> 인천공항T1(105),T2(117) 
//				if (
//						(deprCdCfm == "500" && arvlCdCfm == "105") ||
//						(deprCdCfm == "500" && arvlCdCfm == "117") 
//					) {
//					alert("[인천공항 노선 예매 안내]\n\n" +
//							"인천공항행 노선 이용 시 고속도로 정체 등의 이유로 도착시간이 예정시간보다 다소 지연될 수 있습니다. \n" +
//							"해당 노선 예매 시 항공편 출발시간 등을 고려하여 평균 버스 소요시간보다 좀 더 여유 있게 예매하시기를 안내 드립니다.");
//				}
				// 20240108 전주<-> 광주
//				if((deprCdCfm == "602" && arvlCdCfm == "500")){
//					alert("[노선 운행 관련 안내]\n\n" +
//							"1. 예매(예약)하는 해당시간은 전주터미널 출발시간으로 약 15분후 차량이 도착합니다.\n" +
//							"2. 사고, 고장발생, 천재지변등의 사유로 정규시간에 협정차량이 운행될 수 있습니다.\n" +
//							"3. 전주 출발 승차권으로 호남제일문에서 탑승 불가하오니 유의 하시길 바랍니다.");
//				}
				if((deprCdCfm == "500" && arvlCdCfm == "602")){
					alert("[노선 운행 관련 안내]\n\n" +
							"1. 사고 고장발생 천재지변등의 사유로 정규시간에 협정차량이 운행될 수 있습니다.");
					alert("[터미널 짐보관 서비스 안내]\n\n" +
							"자유로운 여행의 시작\n" +
							"여행은 가볍게 짐은 '광주유스퀘어'에 보관하세요\n" +
							"    운영 : 8시~20시\n" +
							"    비용 : 기본 2천원부터~");
				}
				if(
						(deprCdCfm == "710" && arvlCdCfm == "120") || (deprCdCfm == "120" && arvlCdCfm == "710") ||
						(deprCdCfm == "722" && arvlCdCfm == "120") || (deprCdCfm == "120" && arvlCdCfm == "722") ||
						(deprCdCfm == "723" && arvlCdCfm == "120") || (deprCdCfm == "120" && arvlCdCfm == "723") ||
						(deprCdCfm == "724" && arvlCdCfm == "120") || (deprCdCfm == "120" && arvlCdCfm == "724") 
						){
					alert("[안    내]\n\n" +
							  "2024년 1월 1일 부로 중앙고속이 단독운행하오니\n" +
							  "이용에 참고해주시기 바랍니다.");
				}
				
				// 20231226 성남~창원 (상하행)
				if(
						(deprCdCfm == "710" && arvlCdCfm == "120") || (deprCdCfm == "120" && arvlCdCfm == "710") ||
						(deprCdCfm == "722" && arvlCdCfm == "120") || (deprCdCfm == "120" && arvlCdCfm == "722") ||
						(deprCdCfm == "723" && arvlCdCfm == "120") || (deprCdCfm == "120" && arvlCdCfm == "723") ||
						(deprCdCfm == "724" && arvlCdCfm == "120") || (deprCdCfm == "120" && arvlCdCfm == "724") 
						){
					alert("[안    내]\n\n" +
							  "2024년 1월 1일 부로 중앙고속이 단독운행하오니\n" +
							  "이용에 참고해주시기 바랍니다.");
				}
				// 20231226 동서울~창원 (상하행)
//				if(
//						(deprCdCfm == "710" && arvlCdCfm == "032") || (deprCdCfm == "032" && arvlCdCfm == "710") ||
//						(deprCdCfm == "711" && arvlCdCfm == "032") || (deprCdCfm == "032" && arvlCdCfm == "711") ||
//						(deprCdCfm == "722" && arvlCdCfm == "032") || (deprCdCfm == "032" && arvlCdCfm == "722") ||
//						(deprCdCfm == "723" && arvlCdCfm == "032") || (deprCdCfm == "032" && arvlCdCfm == "723") ||
//						(deprCdCfm == "724" && arvlCdCfm == "032") || (deprCdCfm == "032" && arvlCdCfm == "724") 
//						){
//					alert("[안    내]\n\n" +
//							  "1. 시행일자 : 2024년 1월 1일 부\n" +
//							  "2. 변경사항 : 운수사 변경 및 운행시간 조정 운행\n" +
//							  "3. 운 수 사 : 동양고속 단독운행\n" +
//							  "4. 운행시간 : 모바일 어플 또는 코버스 홈페이지 참고\n\n" +
//							  "※ 고객님들께서는 이용에 참고하여 주시기 바라며,\n" +
//							  "    많은 이용 부탁드립니다. 감사합니다.");
//				}

				// 20231214 춘천고속터미널 안내
				if(deprCdCfm == "250"){
					alert("[춘천고속터미널 안내]\n\n" +
							"▣ 대상노선 : 춘천-동대구, 춘천-서대구, 춘천-광주\n" +
							"춘천시외버스터미널에서는 위 고속버스 노선의 탑승이 불가합니다.\n" +
							"해당 노선은 고속버스터미널을 이용바랍니다.\n" +
							"  - 주소: 춘천시 터미널길14번길 15");
				}
				
				// 20230830 정읍→센트럴, 정읍→정안 상행 
				if(
						(deprCdCfm == "630" && arvlCdCfm == "020") || 
						(deprCdCfm == "630" && arvlCdCfm == "316") 
						){
					// 20230901 ~ 20241130
					if (yymmddD0 <= '20241130'){
						alert("[안    내]\n\n" +
								"정읍발 09:40, 11:20, 15:50, 18:00 출발 차량은 담양(기점)에서 출발한 차량입니다.\n" +
								"도로사정에 따라 출발시간이 지연될 수 있습니다.");
					}
					if (yymmddD0 >= 20241201){
						alert("[안    내]\n\n" +
								"정읍발 출발 차량은 담양(기점)에서 출발한 차량입니다.\n" +
								"도로사정에 따라 출발시간이 지연될 수 있습니다.\n" +
								"\n" + 
								"※ 서울∼정읍노선이 이용고객대비 공급좌석간에 큰 차이가 있어서 " +
								"'24년 12월부터 불가피하게 감회운행을 시행하오니 고객 여러분의 많은 이해와 양해를 바랍니다.");
					}
				}
				
// 20241106 내용수정
//				// 20230810 센트럴-담양, 정안휴-담양
//				if (
//						(deprCdCfm == "020" && arvlCdCfm == "582") || (deprCdCfm == "582" && arvlCdCfm == "020") ||
//						(deprCdCfm == "315" && arvlCdCfm == "582") || (deprCdCfm == "582" && arvlCdCfm == "316")
//						){
//					alert("[서울-담양노선 정읍 경유 안내]\n\n" +
//							" ㅇ운송개시일 : `23.09.01 (금)\n" +
//							" ㅇ노선경로 : 서울-정읍-담양");
//				}
				
// 20230712 삭제
//				// 20230705 낙동강휴게소(상·하행) 승차권 판매를 중단
//				if (
//						(deprCdCfm == "823" || arvlCdCfm == "823") ||
//						(deprCdCfm == "824" || arvlCdCfm == "824")
//						){
//					alert("[낙동강휴게소 승차권 판매중단 안내]\n\n" +
//							"`23.7.5일 오전에 발생한 상주·영천고속도로 상의 산사태로인한 교통통제로 " +
//							"불가피하게 낙동강휴게소(상·하행) 승차권 판매를 중단하고 우회 운행 예정이오니 " +
//							"양해하여 주시기 바랍니다.\n" +
//							" (낙동강휴게소 승·하차 불가, 고속도로 복구시까지)");
//				}
				// 진주-광주 중간하차
				if (
						(deprCdCfm == "722" && arvlCdCfm == "500") || // 진주(722)->광주
						(deprCdCfm == "723" && arvlCdCfm == "500")    // 진주개양(723)->광주
						){
					alert("[진주～광주 노선 중간하차 안내]\n\n" +
							"1. 시행일자 : '23.07.01 (토)\n" +
							"2. 노선경로 : 진주～진주개양～광주 운암동(중간하차)～광주");
				}
				// 서울↔안성, 안성회관, 안성한경, 안성중대, 안성대림, 안성공도, 안성풍림
				if (
						(deprCdCfm == "010" && arvlCdCfm == "130") || (deprCdCfm == "130" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "131") || (deprCdCfm == "131" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "132") || (deprCdCfm == "132" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "133") || (deprCdCfm == "133" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "134") || (deprCdCfm == "134" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "137") || (deprCdCfm == "137" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "138") || (deprCdCfm == "138" && arvlCdCfm == "010")
						){
					// 20250226 추가 20250526 수정
					alert("■ 운행시간표 변경 안내\n\n"
							+ "1. 2025년 6월 1일(일)부로 서울 ↔ 안성 노선의 운행시간이 변경되오니, 이용에 참고 부탁드립니다.");
// 20250226 삭제
//					// 20231005 추가
//					alert("[매표소 운영중단 안내]\n\n" +
//							"1. 중단노선 : 안성한경대↔서울\n" +
//							"2. 시행일자 : 2023년 10월 12일 (목요일)\n" +
//							"3. 승차권구입\n" +
//							"    - 고속버스 티머니 모바일 앱[예약]\n" +
//							"    - 차량 내 통합단말기 결재시스템");
// 20231005 삭제
//					// 20230820 추가 yahan
//					alert("■ 안성한경-서울 증회 안내\n\n" +
//							"1. 변경 전 : 31회\n" +
//							"   변경 후 : 전체 운행 시간\n" +
//							"2. 시행 : 2023년 8월 1일(화) 부터\n" +
//							"3. 안성 발 : 시행 중");
					
					// 기존
					alert("■ 정기권 도입 안내\n\n" +
							"1. 노선 : 서울↔안성, 안성회관, 안성한경, 안성중대,\n" +
							"                    안성대림, 안성공도, 안성풍림\n" +
							"2. 시 행 일 자 : 2023년 6월 16일~ (15일부터 판매)\n" +
							"3. 정기권종류 : 20일권(일반기준 30% 할인) \n" +
							"                    5일권 (일반기준 25% 할인)\n" +
							" * 자세한 내용은 '고속버스티머니 앱'을 참고해 주시기 바랍니다.");
					
					// 20250226  추가 - 상행
					if (arvlCdCfm == "010") {
						alert("■ 노선 운행 관련 안내\n\n"
								+ "1. 해당 승차권 시간은 안성터미널 출발시간입니다.\n"
								+ "   경유지별 출발예정시간은 티머니GO 도착시간안내를 참고부탁드립니다.\n"
								+ "2. 안성 터미널 승차권으로 경유지 탑승이 어려우니, 유의 하시길 바랍니다.");
					}
				}
				// 20230504 고양화정터미널 운영중단
//				if (
//						(deprCdCfm == "115" || arvlCdCfm == "115")
//						){
//					alert("[고양화정터미널 운영중단 안내]\n\n" +
//							" 고양 화정터미널의 운영 중단으로 고속버스 노선의 화정터미널 경유를\n" +
//							" 아래와 같이 중단하오니 이용에 착오 없으시기 바랍니다.\n\n" +
//							" - 고양 화정터미널 운영/운행중단\n" +
//							"    (고양 백석터미널을 이용하여 주시기 바랍니다.)\n" +
//							" - 일시 : 2023년 6월 1일 첫차부터");
//				}
				
				// 20230418 대전-천안 정기권 판매중단
//				if (
//						(deprCdCfm == "300" && arvlCdCfm == "310") || (deprCdCfm == "310" && arvlCdCfm == "300")
//						){
//					alert("[대전-천안노선 정기권 판매 중단안내]\n\n" +
//							" 대전-천안 노선의 정기권 신규 판매가 4/18부로\n" +
//							" 운송사 사정으로 인해 중단되었으니 이용에 참고하시기 바랍니다.\n" +
//							" (기존 구매분 정상 이용 가능)");
//				}
				
// 20240430 운행중단으로 삭제
//				// 20230412 경주-부산 노선의 우등 할인요금을 정상화 
//				if (
//						(deprCdCfm == "815" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "815")
//						){
//					alert("[요금 정상화  안내]\n\n" +
//							"경주-부산 노선의 우등 할인요금을 정상화 하오니 이용에 참고하여 주시기 바랍니다.\n" +
//							"　▣ 할인 요금 정상화 : 5,700원 → 7,400원\n" +
//							"　▣ 시행 : 2023년 5월 1일(월) 부터\n" +
//							"　▣ 문의 :  051-508-8882(금호고속)" );
//				}

				// 20230214 짐보관 서비스
				if((deprCdCfm == "020" && arvlCdCfm == "360")){	//서울-유성
					alert("[금호고속 짐보관 서비스 안내]\n\n" +
							"자유로운 여행의 시작!!!\n" +
							"여행은 가볍게 짐은 '금호고속 짐보관 서비스'\n\n" +
							"예약 및 문의처 : 042-822-0386 짐보관 유성");
				}
				if((deprCdCfm == "020" && arvlCdCfm == "370")){	//서울-논산
					alert("[금호고속 짐보관 서비스 안내]\n\n" +
							"자유로운 여행의 시작!!!\n" +
							"여행은 가볍게 짐은 '금호고속 짐보관 서비스'\n\n" +
							"예약 및 문의처 : 041-735-3677 짐보관 논산");
				}
				if((deprCdCfm == "020" && arvlCdCfm == "610")){	//서울-군산
					alert("[군산터미널 짐보관 서비스 안내]\n\n" +
							"자유로운 여행의 시작!!!\n" +
							"여행은 가볍게 짐은 '군산터미널 짐보관 서비스'\n\n" +
							"예약 및 문의처 : 063-443-1928 짐보관 군산");
				}
				if((deprCdCfm == "010" && arvlCdCfm == "320")){	//서울-공주
					alert("[금호고속 짐보관 서비스 안내]\n\n" +
							"자유로운 여행의 시작!!!\n" +
							"여행은 가볍게 짐은 '금호고속 짐보관 서비스'\n\n" +
							"예약 및 문의처 : 041-855-2319 짐보관 공주");
				}
				//서울, 동서울, 성남, 의정부, 전주, 시흥, 인천, 울산, 수원, 대전, 원주, 청주, 대구-광주
				if(((deprCdCfm == "020" || deprCdCfm == "032" || deprCdCfm == "120" || deprCdCfm == "170" || deprCdCfm == "602" ||  
						deprCdCfm == "195" || deprCdCfm == "100" || deprCdCfm == "715" || deprCdCfm == "110" || deprCdCfm == "300" || 
						deprCdCfm == "240" || deprCdCfm == "401" || deprCdCfm == "801" || deprCdCfm == "805")
						&& arvlCdCfm == "500")){
					alert("[광주유스퀘어 짐보관 서비스 안내]\n\n" +
							"자유로운 여행의 시작!!!\n" +
							"여행은 가볍게 짐은 '광주유스퀘어 짐보관 서비스'\n\n" +
							"예약 및 문의처 : 062-360-8724 짐보관 광주");
				}
				if((deprCdCfm == "020" && arvlCdCfm == "510")){	//서울-여수
					alert("[여수터미널 짐보관 서비스 안내]\n\n" +
							"자유로운 여행의 시작!!!\n" +
							"여행은 가볍게 짐은 '여수터미널 짐보관 서비스'\n\n" +
							"예약 및 문의처 : 062-360-8724 짐보관 여수");
				}

				
				// 20221227 성남터미널
//				if( (deprCdCfm == "120")){
//					alert("[성남터미널 승차장소 변경 안내]\n\n" +
//							"성남터미널 사업자가 변경되어 아래와 같이 안내 하오니 이용에 착오 없으시길 바랍니다.\n" +
//							"1. 노선 : 성남터미널 출발 전노선\n" +
//							"2. 승차 장소 : 기존) 지하1층 =>\n" +
//							"                  변경) 지상1층 (※현 택시승강장)\n" +
//							"3. 매표 장소 : 기존) 지하1층 => 변경) 지상1층\n" +
//							"4. 시행 일자 : 2023년 1월 1일 첫차부터~\n" +
//							"5. 문의처 : 경기고속 (Tel. 031-725-2112)");
//				}
				
// 20230119 삭제
//				// 20221227 서울-강릉 해돋이
//				if(
//						(deprCdCfm == "010" && arvlCdCfm == "200")
//						){
//					alert("[2023년 해돋이를 위한 막차 연장 운행]\n\n" +
//							"2023년 해돋이를 위해 막차를 연장하오니, " +
//							"12월 31일 24시 이후 차량을 이용하실 고객께서는 " +
//							"1월 1일로 조회 및 예매하여 이용하시기 바랍니다.");
//				}
				
				// 20221226 중앙대 매표소 중단
				if ('20221226' <= yymmddD0 && yymmddD0 <= '20230131'){
					if(
						(deprCdCfm == "010" && arvlCdCfm == "130") || (deprCdCfm == "130" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "131") || (deprCdCfm == "131" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "132") || (deprCdCfm == "132" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "133") || (deprCdCfm == "133" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "134") || (deprCdCfm == "134" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "137") || (deprCdCfm == "137" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "138") || (deprCdCfm == "138" && arvlCdCfm == "010")
						){
					alert("[중앙대 매표소 운영 중단]\n\n" +
							"1. 시행일자 : 2023년 1월 1일\n" +
							"2. 승차권구입\n" +
							"  ▶ 고속버스 티머니 모바일 앱(예약)\n" +
							"  ▶ 차량 내 통합단말기 결재시스템");
					}
				}

// 20240206 삭제 
//				// 20221218 센트럴-익산, 인천-익산
//				if(
//						(deprCdCfm == "100" && arvlCdCfm == "615") || (deprCdCfm == "615" && arvlCdCfm == "100") ||
//						(deprCdCfm == "020" && arvlCdCfm == "615") || (deprCdCfm == "615" && arvlCdCfm == "020")
//						){
//					alert("[익산터미널 폐업에따른 터미널이전 안내]\n\n" +
//							"※익산고속버스터미널 운영중단으로 고속버스 승.하차시 익산시외버스터미널을 이용하여 주시기 바랍니다.\n\n" +
//							"이전일 : 2023년 1월 1일 (일요일)");
//				}
				
// 20231218 삭제				
//				// 20221212 광주-원주240(문막245)
//				if(
//						(deprCdCfm == "500" && arvlCdCfm == "240") || (deprCdCfm == "240" && arvlCdCfm == "500") ||
//						(deprCdCfm == "500" && arvlCdCfm == "245") || (deprCdCfm == "245" && arvlCdCfm == "500") 
//						){
//					alert("[원주터미널 통합이전 안내]\n\n" +
//							"  1. 시행일자: 2022년 12월 13일(화)\n" +
//							"  2. 내      용: 원주고속버스터미널 운영종료로 인하여 원주종합버스터미널로 이전하오니 이용에 참고하시기 바랍니다.\n" +
//							"  3. 변  경  전: 원주고속버스터미널 (서원대로 181)\n" +
//							"  4. 변  경  후: 원주종합버스터미널 10번 승차홈 (서원대로 171)");
//				}
//				// 20221212 서울-원주240(문막245)
//				if(
//						(deprCdCfm == "010" && arvlCdCfm == "240") || (deprCdCfm == "240" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "245") || (deprCdCfm == "245" && arvlCdCfm == "010") 
//						){
//					alert("[원주고속버스터미널 원주종합터미널 통합 이전 안내]\n\n" +
//							"  1. 현재: 강원도 원주시 서원대로 181\n" +
//							"  2. 변경: 강원도 원주시 서원대로 171\n" +
//							"  3. 통합 이전 일자: 2022년 12월 13일(화)\n\n" +
//							"※이용에 참고하여 주시기 바랍니다. 감사합니다.");
//				}

// 20231102 삭제
//				// 20221122 용인-광주노선
//				//용인(150) -> 정안(315) / 정안(316) -> 용인(150)
//				//용인(150) ↔ 광주(500)
//				//용인신갈(111) -> 정안(315) / 정안(316) -> 용인신갈(111)
//				//용인신갈(111) ↔ 광주(500)
//				if(
//						(deprCdCfm == "150" && arvlCdCfm == "315") || (deprCdCfm == "316" && arvlCdCfm == "150") ||
//						(deprCdCfm == "150" && arvlCdCfm == "500") || (deprCdCfm == "500" && arvlCdCfm == "150") ||
//						(deprCdCfm == "111" && arvlCdCfm == "315") || (deprCdCfm == "316" && arvlCdCfm == "111") ||
//						(deprCdCfm == "111" && arvlCdCfm == "500") || (deprCdCfm == "500" && arvlCdCfm == "111") 
//						){
//					alert("[용인기흥역 중간정차 운행중단 안내]\n\n" +
//							"  1. 시행일자 : 2022. 11. 01 (화) 부\n" +
//							"  2. 운행경로 : 용인~용인신갈~정안(휴)~광주\n" +
//							"  3. 변경사유 : 노선사정으로 인한 기흥역 중간정차 중단\n" +
//							"※그동안 기흥역에서 승.하차를 하신 고객님들께서는 인근에 있는\n" +
//							"   용인신갈 정류소를 이용하여 주시기 바랍니다.");
//				}
//				// 20221122 용인-부산노선
//				//용인(150) -> 낙동강(823) / 낙동강(824) -> 용인(150)
//				//용인(150) ↔ 부산(700)
//				//용인신갈(111) -> 낙동강(823) / 낙동강(824) -> 용인신갈(111)
//				//용인신갈(111) ↔ 부산(700)
//				if(
//						(deprCdCfm == "150" && arvlCdCfm == "823") || (deprCdCfm == "824" && arvlCdCfm == "150") ||
//						(deprCdCfm == "150" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "150") ||
//						(deprCdCfm == "111" && arvlCdCfm == "823") || (deprCdCfm == "824" && arvlCdCfm == "111") ||
//						(deprCdCfm == "111" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "111") 
//						){
//					alert("[용인기흥역 중간정차 운행중단 안내]\n\n" +
//							"  1. 시행일자 : 2022. 11. 01 (화) 부\n" +
//							"  2. 운행경로 : 용인~용인신갈~낙동강(휴)~부산\n" +
//							"  3. 변경사유 : 노선사정으로 인한 기흥역 중간정차 중단\n" +
//							"※그동안 기흥역에서 승.하차를 하신 고객님들께서는 인근에 있는\n" +
//							"   용인신갈 정류소를 이용하여 주시기 바랍니다.");
//				}
//				// 20221109 추가
//				//용인(150) ↔ 진주(722) = 20220308 추가 
//				//용인(150) -> 인삼랜드(324) / 인삼랜드(325) -> 용인(150)
//				//용인(150) ↔ 진주개양(723)
//				//용인(150) ↔ 진주혁신(724)
//				//용인신갈(111) -> 인삼랜드(324) / 인삼랜드(325) -> 용인신갈(111)
//				//용인신갈(111) ↔ 진주개양(723)
//				//용인신갈(111) ↔ 진주혁신(724)
//				//용인신갈(111) ↔ 진주(722)
//				//용인기흥(161) -> 인삼랜드(324) / 인삼랜드(325) -> 용인기흥(161)
//				//용인기흥(161) ↔ 진주개양(723)
//				//용인기흥(161) ↔ 진주혁신(724)
//				//용인기흥(161) ↔ 진주(722)
//				if(
//						(deprCdCfm == "150" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "150") ||
//						(deprCdCfm == "150" && arvlCdCfm == "324") || (deprCdCfm == "325" && arvlCdCfm == "150") ||
//						(deprCdCfm == "150" && arvlCdCfm == "723") || (deprCdCfm == "723" && arvlCdCfm == "150") ||
//						(deprCdCfm == "150" && arvlCdCfm == "724") || (deprCdCfm == "724" && arvlCdCfm == "150") ||
//						
//						(deprCdCfm == "111" && arvlCdCfm == "324") || (deprCdCfm == "325" && arvlCdCfm == "111") ||
//						(deprCdCfm == "111" && arvlCdCfm == "723") || (deprCdCfm == "723" && arvlCdCfm == "111") ||
//						(deprCdCfm == "111" && arvlCdCfm == "724") || (deprCdCfm == "724" && arvlCdCfm == "111") ||
//						(deprCdCfm == "111" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "111") ||
//
//						(deprCdCfm == "161" && arvlCdCfm == "324") || (deprCdCfm == "325" && arvlCdCfm == "161") ||
//						(deprCdCfm == "161" && arvlCdCfm == "723") || (deprCdCfm == "723" && arvlCdCfm == "161") ||
//						(deprCdCfm == "161" && arvlCdCfm == "724") || (deprCdCfm == "724" && arvlCdCfm == "161") ||
//						(deprCdCfm == "161" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "161") 
//						){
//					alert("[용인~진주 용인기흥역 중간정차 개시 및 요금인하 안내]\n\n" +
//							"1. 시행일자 : 2022. 11. 14 (월) 부\n" +
//							"2. 운행경로 : 용인~용인기흥역~용인신갈~인삼랜드(휴)~\n" +
//							"                  진주개양/혁신~진주\n" +
//							"3. 운행시간 : Kobus 참고\n" +
//							"4. 운행요금변경\n" +
//							"   가. 용인~진주 : 일반 31,200원→30,400원 (-800원 인하)\n" +
//							"   나. 용인기흥역~진주 : 일반 31,200원→28,600원 (-2,600원 인하)\n" +
//							"   다. 용인신갈~진주 : 일반 31,200원→28,300원 (-2,900원 인하)\n" +
//							"5. 탑승장소 : 경기 용인시 기흥구 중부대로 지하 460, \n" +
//							"                  기흥역 시외버스 정류장\n" +
//							"※ 고객님들의 많은 이용 부탁드립니다.");
//				}

				// 20221102 노선팝업 삭제 정리 후 내용 추가
				// 마산-동서울, 진주-서울경부, 창원-서울경부, 진해-동서울
				if((deprCdCfm == "705" && arvlCdCfm == "032")){
					alert("마산터미널 출발 승차권을 가지고 중간경유지 승차는 불가합니다."); 
				}
				if((deprCdCfm == "722" && arvlCdCfm == "010")){
					alert("진주터미널 출발 승차권을 가지고 중간경유지 승차는 불가합니다."); 
				}
				if((deprCdCfm == "710" && arvlCdCfm == "010")){
					alert("창원터미널 출발 승차권을 가지고 중간경유지 승차는 불가합니다."); 
				}
				if((deprCdCfm == "704" && arvlCdCfm == "032")){
					alert("해당 노선은 모바일 승차권으로 직접 탑승하시기 바랍니다.\n" +
							"터미널에서 창구발권/재발행이 안됩니다."); 
				}
				// 청주-동서울
//				if((deprCdCfm == "032" && arvlCdCfm == "400") || (deprCdCfm == "400" && arvlCdCfm == "032")){
//					alert("[청주고속터미널 현대화사업에 따른 임시터미널 개장 안내]\n\n" +
//							"■ 임시터미널 : 기존터미널 건너편 이랜드타운힐스 1층\n" +
//							"     - 승차위치 : 기존터미널 건너편 이랜드타운힐스 앞\n" +
//							"     - 하차위치 : 기존터미널 정문앞 시내버스 정류장 앞\n" +
//							"■ 일시 : `21. 05. 25 (05:00시부터)"); 
//				}
				
				// 20221026 용인~창원 기흥역 중간정차 운행중단 안내
				//용인(150) ↔ 창원(710), 마산(705), 선산(812) / 선산(813)
				//용인신갈(111) ↔ 창원(710), 마산(705), 선산(812) / 선산(813)
				//용인기흥(161) ↔ 창원(710), 마산(705), 선산(812) / 선산(813)
//				if(
//						(deprCdCfm == "150" && arvlCdCfm == "710") || (deprCdCfm == "710" && arvlCdCfm == "150") ||
//						(deprCdCfm == "150" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "150") ||
//// 이미 등록되어 있음
////						(deprCdCfm == "150" && arvlCdCfm == "812") || (deprCdCfm == "813" && arvlCdCfm == "150") ||
//						(deprCdCfm == "111" && arvlCdCfm == "710") || (deprCdCfm == "710" && arvlCdCfm == "111") ||
//						(deprCdCfm == "111" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "111") ||
////						(deprCdCfm == "111" && arvlCdCfm == "812") || (deprCdCfm == "813" && arvlCdCfm == "111") ||
//						(deprCdCfm == "161" && arvlCdCfm == "710") || (deprCdCfm == "710" && arvlCdCfm == "161") ||
//						(deprCdCfm == "161" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "161") 
////						(deprCdCfm == "161" && arvlCdCfm == "812") || (deprCdCfm == "813" && arvlCdCfm == "161")
//						){
//					alert("■ 용인~창원 기흥역 중간정차 운행중단 안내\n\n" +
//							"1. 시행일자 : 2022. 11. 01 (화) 부\n" +
//							"2. 운행경로 : 용인~용인신갈~선산(휴)~마산~창원\n" +
//							"3. 변경사유 : 노선사정으로 인한 기흥역 중간정차 중단\n" +
//							"※ 그동안 기흥역에서 승·하차를 하신 고객님들께는 인근에 있는\n" +
//							"     용인신갈 정류소를 이용하여 주시기 바랍니다."); 
//				}
				
				// 20221018 yahan
				// 광주비아 출발
				if(
						(deprCdCfm == "503")
						){
					alert("■ 차량도착시간안내\n\n" +
							"예매(예약)하는 해당시간은 광주(유·스퀘어) 출발시간으로 \n" +
							"약10분후 차량이 도착됩니다."); 
				}
				
// 20220831 삭제
//				// 20220811 yahan
//				// 수원(110) -> 순천(515)/여천(509)/여수(510) 
//				// 순천(515)/여천(509)/여수(510) -> 영통(112) / 신갈시외 (114) / 수원(110)
//				if (
//						(deprCdCfm == "110" && arvlCdCfm == "515") || (deprCdCfm == "515" && arvlCdCfm == "110") ||
//						(deprCdCfm == "110" && arvlCdCfm == "509") || (deprCdCfm == "509" && arvlCdCfm == "110") ||
//						(deprCdCfm == "110" && arvlCdCfm == "510") || (deprCdCfm == "510" && arvlCdCfm == "110") ||
//						(deprCdCfm == "515" && arvlCdCfm == "112") ||
//						(deprCdCfm == "509" && arvlCdCfm == "112") ||
//						(deprCdCfm == "510" && arvlCdCfm == "112") ||
//						(deprCdCfm == "515" && arvlCdCfm == "114") ||
//						(deprCdCfm == "509" && arvlCdCfm == "114") ||
//						(deprCdCfm == "510" && arvlCdCfm == "114")
//						){
//					alert("[수원-순천(여수) 노선, 순천 신대지구 추가 경유 실시]\n\n" +
//							"1. 시행일자 : 2022. 9. 1.부(목)\n" +
//							"2. 노선경로 : 수원~영통(하차)~신갈시외~순천~신대CGV~여천~여수\n" +
//							"3. 신대CGV 승차위치(상행) : CGV신대점 앞 신대 시외버스 정류장 (무인단말기 비치)\n" +
//							" ※ 경유지 추가로 인해 소요시간이 소폭 증가되었으니 양해해주시기 바랍니다."); 
//				}

				// 20220726 yahan 단독노선
				// 서울010-동해210-삼척220, 서울-제천450(하소449), 서울-이천160(신하172), 서울-여주140(여주대139), 서울-용인150(유림149)
//				if (
//						(deprCdCfm == "010" && arvlCdCfm == "270") || (deprCdCfm == "270" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "230") || (deprCdCfm == "230" && arvlCdCfm == "010") ||
//						
//						(deprCdCfm == "010" && arvlCdCfm == "210") || (deprCdCfm == "210" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "010") ||
//
//						(deprCdCfm == "010" && arvlCdCfm == "450") || (deprCdCfm == "450" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "449") || (deprCdCfm == "449" && arvlCdCfm == "010") ||
//
//						(deprCdCfm == "010" && arvlCdCfm == "160") || (deprCdCfm == "160" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "172") || (deprCdCfm == "172" && arvlCdCfm == "010") ||
//
//						(deprCdCfm == "010" && arvlCdCfm == "140") || (deprCdCfm == "140" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "139") || (deprCdCfm == "139" && arvlCdCfm == "010") ||
//
//						(deprCdCfm == "010" && arvlCdCfm == "150") || (deprCdCfm == "150" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "149") || (deprCdCfm == "149" && arvlCdCfm == "010")
//						){
//					alert("※파업종료에 따른 노선 운행 정상화 안내\n\n" +
//							"1. 파업종료일 : 2022.08.10\n" +
//							"2. 내용 : (주)동부고속 노동조합에서 진행한 총파업 \n" +
//							"     종료에 따라 노선 운행이 순차적으로 정상 운행될 \n" +
//							"     것을 알려드립니다.\n" +
//							"3. 그동안 당사 파업으로 인해 이용에 불편함을 드려 \n" +
//							"     죄송합니다. 보다 향상된 서비스로 보답하겠습니다."); 
//				}
				// 20220802 동서울030-강릉200 삭제
				// (deprCdCfm == "030" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "030") ||
				
				// 20220726 yahan 공동노선
				// 서울-강릉200, 서울-원주240(문막245), 서울-원주기업246-원주혁신244, 동서울030-강릉200
				// 고양(백석116,화정115)-강릉200, 서울-양양270-속초230, 수원110-동해210-삼척220, 인천100-양양270-속초230, 
				// 서울-세종352(연구358,연구단지351,국무조정361,청사353)
//				if (
//						(deprCdCfm == "010" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "010") ||
//
//						(deprCdCfm == "010" && arvlCdCfm == "240") || (deprCdCfm == "240" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "245") || (deprCdCfm == "245" && arvlCdCfm == "010") ||
//
//						(deprCdCfm == "010" && arvlCdCfm == "246") || (deprCdCfm == "246" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "244") || (deprCdCfm == "244" && arvlCdCfm == "010") ||
//
//						//(deprCdCfm == "030" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "030") ||
//
//						(deprCdCfm == "116" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "116") ||
//						(deprCdCfm == "115" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "115") ||
//
//						//(deprCdCfm == "010" && arvlCdCfm == "270") || (deprCdCfm == "270" && arvlCdCfm == "010") ||
//						//(deprCdCfm == "010" && arvlCdCfm == "230") || (deprCdCfm == "230" && arvlCdCfm == "010") ||
//
//						(deprCdCfm == "110" && arvlCdCfm == "210") || (deprCdCfm == "210" && arvlCdCfm == "110") ||
//						(deprCdCfm == "110" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "110") ||
//
//						(deprCdCfm == "100" && arvlCdCfm == "270") || (deprCdCfm == "270" && arvlCdCfm == "100") ||
//						(deprCdCfm == "100" && arvlCdCfm == "230") || (deprCdCfm == "230" && arvlCdCfm == "100") ||
//
//						(deprCdCfm == "010" && arvlCdCfm == "352") || (deprCdCfm == "352" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "358") || (deprCdCfm == "358" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "351") || (deprCdCfm == "351" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "361") || (deprCdCfm == "361" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "353") || (deprCdCfm == "353" && arvlCdCfm == "010")
//						){
//					alert("※파업종료에 따른 노선 운행 정상화 안내\n\n" +
//							"1. 파업종료일 : 2022.08.10\n" +
//							"2. 내용 : (주)동부고속 노동조합에서 진행한 총파업 \n" +
//							"     종료에 따라 노선 운행이 순차적으로 정상 운행될 \n" +
//							"     것을 알려드립니다.\n" +
//							"3. 그동안 당사 파업으로 인해 이용에 불편함을 드려 \n" +
//							"     죄송합니다. 보다 향상된 서비스로 보답하겠습니다."); 
//				}

				// 20220722 yahan
				//수원(110)-서부산(703)
//				if(
//						(deprCdCfm == "110" && arvlCdCfm == "703") || (deprCdCfm == "703" && arvlCdCfm == "110")
//						){
//// 20230526 변경
////					alert("■ 수원-서부산(사상) 운행안내\n\n" +
////							"1. 시행일자 : 2021. 08. 01부(월)\n" +
////							"2. 운행노선 : 수원TR–선산(휴)-서부산TR\n" +
////							"3. 변경사항 : 운행회수 변경(2회→1회)\n" +
////							"4. 운행시간표\n" +
////							"    - 서부산(사상)발 09:40 / 수원발 17:00\n" +
////							"5. 코로나19 영향누적에 따른 경영악화로 인해 불가피한 회수 조정을 실시하게 되었습니다.\n" +
////							"     고객님들의 양해를 부탁드립니다."); 
//					alert("■ 수원-서부산(사상) 운행중단 안내\n\n" +
//					"   - 그동안 이용해 주신 고객여러분께 진심으로 감사의 말씀드립니다.\n" +
//					"      당사는 해당노선을 지속적으로 운행하고자 노력하였으나,\n" +
//					"      코로나19영향 누적에 따른 경영악화로 인해 불가피하게 \n" +
//					"      운행중단을 하게 되었습니다.\n" +
//					"      고객 여러분의 많은 이해와 양해를 부탁드립니다.\n" +
//					"   - 운행중단 일자 : 2023년 6월 1일 부 (1년간)"); 
//				}
				
				// 20220721 yahan
				// 전주602,전주호남제일문605,오산127,광명125,철산126
//				if (
//						(deprCdCfm == "602" && arvlCdCfm == "125") || (deprCdCfm == "125" && arvlCdCfm == "602") ||
//						(deprCdCfm == "602" && arvlCdCfm == "126") || (deprCdCfm == "126" && arvlCdCfm == "602") ||
//						(deprCdCfm == "605" && arvlCdCfm == "125") || (deprCdCfm == "125" && arvlCdCfm == "605") ||
//						(deprCdCfm == "605" && arvlCdCfm == "126") || (deprCdCfm == "126" && arvlCdCfm == "605") ||
//						(deprCdCfm == "127" && arvlCdCfm == "125") || (deprCdCfm == "125" && arvlCdCfm == "127") ||
//						(deprCdCfm == "127" && arvlCdCfm == "126") || (deprCdCfm == "126" && arvlCdCfm == "127")
//						){
//					alert("○[노선운행 중단 안내]\n" +
//							"▣ '광명','철산' 노선운행 중단되오니 이용에 참고하시기 바랍니다.\n" +
//							"    (전주～오산 까지 운행)\n" +
//							"▣ 시행 : '22년 8월 1일(월)부");
//					
//				}

				// 20220713 yahan
				// 서울-제천(상하행 전체) 449,450
				if (
						(deprCdCfm == "010" && arvlCdCfm == "449") || (deprCdCfm == "449" && arvlCdCfm == "010") ||
						(deprCdCfm == "010" && arvlCdCfm == "450") || (deprCdCfm == "450" && arvlCdCfm == "010")
						){
					alert(
							// 20221102 삭제
							//"○[서울-제천 프리미엄 버스 요금 할인 안내]\n" +
							//"  ▶프리미엄 버스 요금 할인 20,100→18,000원(-2,000원 10.5%)\n" +
							//"  =======================================\n" +
							//"\n" +
							"○제천 시티투어 연계 운행\n" +
							"  ▶출발 : 09:10분 (제천고속버스터미널)\n" +
							"  ▶코스 : 의림지, 청풍(케이블카, 유람선, 출렁다리 외)\n" +
							"  ▶’제천 시티투어’ 홈페이지에서 예매 및 문의 바랍니다.\n" +
							"  =======================================\n" +
							"\n" +
							"○제휴할인 서비스\n" +
							"  ▶3G렌터카 : 요금표 금액의 40% 할인\n" +
							"  ▶청풍호반 케이블카 : 1,000원 할인\n" +
							"  1. 이용방법\n" +
							"    ▷제천↔서울 고속버스 모바일티켓 또는 승차권 소지\n" +
							"    ▷출발일 기준 30일 이내에 방문하셔야 할인 적용 가능\n" +
							"  2. 이용방법 및 업체 상세정보는 ‘코버스＇홈페이지(웹) 참조\n" +
							"\n" +
							"  ※ 자세한 사항은 제천고속버스터미널 문의");
				}
				
				// 20220704 yahan
				// 서울(010)-양양(270), 동서울(032)-양양(270), 인천(100)-양양(270)
//				if (
//						(deprCdCfm == "010" && arvlCdCfm == "270") || (deprCdCfm == "270" && arvlCdCfm == "010") ||
//						(deprCdCfm == "032" && arvlCdCfm == "270") || (deprCdCfm == "270" && arvlCdCfm == "032") ||
//						(deprCdCfm == "100" && arvlCdCfm == "270") || (deprCdCfm == "270" && arvlCdCfm == "100")
//						){
//					alert("[양양종합여객터미널 이전 안내]\n\n" +
//							"- 주소 : 양양군 양양읍 양양로 25 → 양양군 양양읍 송암리 29-8번지\n" +
//							"- 터미널 이전일 : 2022.7.1(금)\n" +
//							"터미널이 다음과 같이 이전하오니 이용에 참고하시기 바랍니다.");
//				}
				
				// 20220407 yahan
				// 인천공항T1(105),T2(117)<->김해(735),김해장유(736)
				if (
						(deprCdCfm == "105" && arvlCdCfm == "735") || (deprCdCfm == "735" && arvlCdCfm == "105") ||
						(deprCdCfm == "105" && arvlCdCfm == "736") || (deprCdCfm == "736" && arvlCdCfm == "105") ||
						(deprCdCfm == "117" && arvlCdCfm == "735") || (deprCdCfm == "735" && arvlCdCfm == "117") ||
						(deprCdCfm == "117" && arvlCdCfm == "736") || (deprCdCfm == "736" && arvlCdCfm == "117")
						){
					alert("인천공항-김해 승객 소지 수화물 제한 안내\n" +
							"Notification of luggage restriction (ICN Int'l Airport to Gimhae route)\n" +
							"旅客携带行李限制通知(仁川机场-金海航线)\n" +
							"\n" +
							"2022년 1월 27일부 '중대재해처벌법' 시행에 따라 당사는 운행 중 버스 통로 및 안전운행에 방해가 되는 공간에 수화물 보관을 제한하고자 " +
							"승객 1인당 2개의 수화물만 허용하오니 승객 여러분께서는 이점 양해해 주시기 바랍니다.\n" +
							"(추가 수화물 적재 시, 별도 좌석 구매 후(50%/아동요금 발권)해당 좌석에 수하물 적재 가능)\n" +
							"\n" +
							"According to the enforcement of the 'The Fatal Industrial Accidents Act', we allow only two carry-on luggage per person for safety while driving. " +
							"And it can only be loaded under the bus. Thank for your understanding.\n" +
							"(If you need to load additional luggage, you should buy additional seat at half price)\n" +
							"\n" +
							"2022年1月27日起，根据《重大灾害处罚法》的施行，本公司在运行过程中限制在公交通道及妨碍安全运行的空间内保管行李，每位乘客只允许携带2件行李，请各位乘客谅解。\n" +
							"如果装载额外的行李物品，需要购买单独座位 (需购买50%儿童票），可在该座位上装载行李物品）\n" +
							"\n" +
							"시행일자 : 2022년 4월 11일(월)");
				}
				
				// 20220328 yahan
				// 광주500<->구미810 전산망변경
//				if (
//						(deprCdCfm == "500" && arvlCdCfm == "810") || (deprCdCfm == "810" && arvlCdCfm == "500")
//						){
//					alert("[광주-구미 노선 전산망 변경]\n\n" +
//							"'22.4.1일(금)부로 광주↔구미 → 광주↔구미복지,구미공단,구미 노선변경\n\n" +
//							"고속버스 → 시외우등직행버스로 운행됨에 따라 예매처 변경.\n\n" +
//							"  -모바일 : 시외버스티머니 또는 버스타고모바일\n" +
//							"  -홈페이지 : 시외버스통합예매 또는 버스타고");
//				}
				// 20220328 yahan
				// 순천신대지구512 출도착
				if (
						(deprCdCfm == "512" && arvlCdCfm == "703")
						){
					alert("[순천신대지구(CGV) 경유 노선 안내]\n\n" +
							"* 해당노선 : 순천-부산사상\n" +
							"* 승차위치 : CGV순천신대점 앞 버스 정류장\n" +
							"          (전남 순천시 해룡면 신대리 2139)\n\n" +
							"※유의사항 : 삼동 시내버스정류장(복성고 방면)승차장과 위치가 다르오니 이용하실 정류장을 확인후 이용바랍니다.");
				}
				if (
						(deprCdCfm == "703" && arvlCdCfm == "512")
						){
					alert("[순천신대지구(CGV) 정류소 위치 안내]\n\n" +
							"* 하차위치 : CGV순천신대점 앞 버스 정류장 인근\n" +
							"          (전남 순천시 해룡면 신대리 2139)\n\n" +
							"※유의사항 : 삼동 시내버스정류장(복성고 방면)승차장과 위치가 다르오니 이용하실 정류장을 확인후 이용바랍니다.");
				}
				if (
						(deprCdCfm == "513" && arvlCdCfm == "020") || (deprCdCfm == "513" && arvlCdCfm == "100") || (deprCdCfm == "513" && arvlCdCfm == "700") 
						){
					alert("[순천신대지구 경유 고속버스 노선 안내]\n\n" +
							"* 해당노선 : 순천-서울,인천,부산\n" +
							"* 승차위치 : 삼동 시내버스정류장(복성고 방면)\n" +
							"          (전남 순천시 해룡면 상삼리 464-9)\n\n" +
							"※유의사항 : 순천신대지구(CGV)승차장과 위치가 다르오니 이용하실 정류장을 확인후 이용바랍니다.");
				}
				if (
						(deprCdCfm == "020" && arvlCdCfm == "513") || (deprCdCfm == "100" && arvlCdCfm == "513") || (deprCdCfm == "700" && arvlCdCfm == "513") 
						){
					alert("[순천신대지구 정류소 위치 안내]\n\n" +
							"* 하차위치 : 삼동 시내버스정류장(복성고 방면)\n" +
							"          (전남 순천시 해룡면 상삼리 464-9)\n\n" +
							"※유의사항 : 순천신대지구(CGV)승차장과 위치가 다르오니 이용하실 정류장을 확인후 이용바랍니다.");
				}
				
				// 20220318 yahan
				// 서울010-이천마장택지지구171
//				if (
//						(deprCdCfm == "010" && arvlCdCfm == "171") || (deprCdCfm == "171" && arvlCdCfm == "010")
//						){
//					alert("[노선 운행종료 안내]\n\n" +
//							"이천마장택지지구-서울 노선이 3월 29일 운행 종료와 함께\n" +
//							"3/30부터 이천터미널~강남역 직행좌석형 시내버스(3401번)로\n" +
//							"변경 운행됨에 따라 안내드리니, 이용에 착오 없으시기 바랍니다.\n\n" +
//							"  1. 운행종료일 : 3/29 막차 이후\n" +
//							"  2. 운행 변경 후 버스카드 사용 가능(수도권 환승 가능)\n" +
//							"  3. 노선운행정보 : 경기도 버스정보시스템(http://gbis.go.kr)\n" +
//							"    - 운행 종료 후 기존 승차권 예매 방법 사용 불가");
//				}
// 20230820 삭제 yahan
//				// 20220316 yahan
//				// 서울경부010-안성풍림132, 안성공도133, 안성대림137, 안성중대131, 한경대134, 시민회관138, 안성130 왕복반영
//				if (
//						(deprCdCfm == "010" && arvlCdCfm == "130") || (deprCdCfm == "130" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "131") || (deprCdCfm == "131" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "132") || (deprCdCfm == "132" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "133") || (deprCdCfm == "133" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "134") || (deprCdCfm == "134" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "137") || (deprCdCfm == "137" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "138") || (deprCdCfm == "138" && arvlCdCfm == "010")
//						){
//					alert("[우등차량 투입안내]\n\n" +
//							"해당 노선에 우등고속 차량이 추가 운행하오니\n" +
//							"이용에 참고하시기 바랍니다.\n" +
//							"  시행일 : '22년 3월 21(월) ~");
//				}
				// 센트럴020-남원625 왕복
//				if (
//						(deprCdCfm == "020" && arvlCdCfm == "625") || (deprCdCfm == "625" && arvlCdCfm == "020")
//						){
//					alert("[터미널 이전운행 안내]\n\n" +
//							"남원고속버스터미널 운영중단으로\n" +
//							"고속버스 승차하차시 남원시외버스터미널 이용하여 주시기 바랍니다.\n" +
//							"  이전일 : '22년 4월 1일(금요일)");
//				}
				
				// 20220311 yahan
				//고양백석116↔진주722, 고양백석116↔진주개양723, 고양백석116↔진주혁신724
				//고양화정115↔진주722, 고양화정115↔진주개양723, 고양화정115↔진주혁신724
				//원주240↔진주722, 원주문막245↔진주722, 원주240↔진주혁신724, 원주문막245↔진주혁신724
//				if (
//						(deprCdCfm == "116" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "116") ||
//						(deprCdCfm == "116" && arvlCdCfm == "723") || (deprCdCfm == "723" && arvlCdCfm == "116") ||
//						(deprCdCfm == "116" && arvlCdCfm == "724") || (deprCdCfm == "724" && arvlCdCfm == "116") ||
//						(deprCdCfm == "115" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "115") ||
//						(deprCdCfm == "115" && arvlCdCfm == "723") || (deprCdCfm == "723" && arvlCdCfm == "115") ||
//						(deprCdCfm == "115" && arvlCdCfm == "724") || (deprCdCfm == "724" && arvlCdCfm == "115") ||
//						(deprCdCfm == "240" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "240") ||
//						(deprCdCfm == "245" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "245") ||
//						(deprCdCfm == "240" && arvlCdCfm == "724") || (deprCdCfm == "724" && arvlCdCfm == "240") ||
//						(deprCdCfm == "245" && arvlCdCfm == "724") || (deprCdCfm == "724" && arvlCdCfm == "245")
//						){
//					alert("[노선 폐지 안내]\n\n" +
//							"그동안 이용해 주신 고객 여러분께 진심으로 감사의 말씀을 드립니다.\n" +
//							"해당노선을 지속적으로 운행하고자 노력하였으나, " +
//							"코로나19 확산으로 인한 이용수요 급감 및 인건비, 유가 등 " +
//							"고정비용상승으로 더 이상 운영이 어려워 아래와 같이 " +
//							"운행중단 되오니 고객 여러분의 많은 이해와 양해를 바랍니다.\n\n" +
//							"              - 아        래 -\n" +
//							"  1. 폐지일자 : 2022년 4월 1일(토) 부");
//				}
				// 20220311 yahan
				//상봉040↔청주400
//				if (
//						(deprCdCfm == "040" && arvlCdCfm == "400") || (deprCdCfm == "400" && arvlCdCfm == "040")
//						){
//					alert("[노선 폐지 및 휴업 안내]\n\n" +
//							"그동안 이용해 주신 고객 여러분께 진심으로 감사의 말씀을 드립니다.\n" +
//							"해당노선을 지속적으로 운행하고자 노력하였으나, " +
//							"코로나19 확산으로 인한 이용수요 급감 및 인건비, 유가 등 " +
//							"고정비용상승으로 더 이상 운영이 어려워 아래와 같이 " +
//							"운행중단 되오니 고객 여러분의 많은 이해와 양해를 바랍니다.\n\n" +
//							"              - 아        래 -\n" +
//							"  1. 폐지일자 : 2022년 4월 1일(토) 부");
//				}

// 20240530 삭제
//				// 20220222 yahan
//				// 서울경부-평택용이동174, 서울경부-평택대175, 서울경부-평택180, 서울경부-안중오거리176, 서울경부-안중177
//				if (
//						(deprCdCfm == "010" && arvlCdCfm == "174") || (deprCdCfm == "174" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "175") || (deprCdCfm == "175" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "176") || (deprCdCfm == "176" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "177") || (deprCdCfm == "177" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "180") || (deprCdCfm == "180" && arvlCdCfm == "010") 
//						){
//					alert("[서울-평택, 서울-평택-안중 노선 시간표 변경 안내]\n\n" +
//							"1. 시행일자 : 2022. 03. 01부(화)\n" +
//							"2. 해당노선 : 서울-평택, 서울-평택-안중\n" +
//							"3. 변경사항 : 노선 양수에 따른 시간표 변경\n" +
//							"4. 예약전 이용하시고자 하는 시간대를 다시한번 확인 부탁드립니다.");
//				}
				
				// 20220217 yahan
				// 대전복합300↔전주602,대전복합300↔전주호남제일문605,대전청사305↔전주602,대전청사305↔전주호남제일문605
//				if (
//						(deprCdCfm == "300" && arvlCdCfm == "602") || (deprCdCfm == "602" && arvlCdCfm == "300") ||
//						(deprCdCfm == "300" && arvlCdCfm == "605") || (deprCdCfm == "605" && arvlCdCfm == "300") ||
//						(deprCdCfm == "305" && arvlCdCfm == "602") || (deprCdCfm == "602" && arvlCdCfm == "305") ||
//						(deprCdCfm == "305" && arvlCdCfm == "605") || (deprCdCfm == "605" && arvlCdCfm == "305") 
//						){
//					alert("[대전-전주노선 우등고속 운행안내]\n" +
//							" * 운송개시 : 2022년 2월 28일(월)\n" +
//							" * 노선경로 : 대전복합TR ~ 대전청사 ~ 전주호남제일문 ~\n" +
//							"                  전주고속TR");
//					
//				}
				// 20220118 yahan
				// 센터럴<->완도/원동->완도
//				if ((deprCdCfm == "020" && arvlCdCfm == "575")){
//					alert("[센트럴시티(서울)→완도 운행사 변경 안내]\n" +
//							" * 변경일 : 2022년 1월 20일(목)\n" +
//							" * 금호고속 → 한일고속");
//				}
//				if ((deprCdCfm == "575" && arvlCdCfm == "020")){
//					alert("[완도→센트럴시티(서울) 운행사 변경 안내]\n" +
//							" * 변경일 : 2022년 1월 20일(목)\n" +
//							" * 금호고속 → 한일고속");
//				}
//				if ((deprCdCfm == "578" && arvlCdCfm == "020")){
//					alert("[원동→센트럴시티(서울) 운행사 변경 안내]\n" +
//							" * 변경일 : 2022년 1월 20일(목)\n" +
//							" * 금호고속 → 한일고속");
//				}

// 20221220 삭제 ==> 신대지 출발노선만 해당되어 삭제함
//				// 20220114 yahan
//				// 순천-서울,인천,부산
//				if (
//// 20220328 yahan 내용중복으로 513은 삭제
////						(deprCdCfm == "513" && arvlCdCfm == "020") || (deprCdCfm == "513" && arvlCdCfm == "100") || (deprCdCfm == "513" && arvlCdCfm == "700") ||
//						(deprCdCfm == "515" && arvlCdCfm == "020") || (deprCdCfm == "515" && arvlCdCfm == "100") || (deprCdCfm == "515" && arvlCdCfm == "700") 
//						){
//					alert("[신대지구 승차위치]\n" +
//							" * 삼동 시내버스정류장(전남 순천시 해룡면 상삼리 464-9)\n\n" +
//							" ※유의사항 : 시외버스 승차장(CGV)과 위치가 다르오니\n" +
//							"                 상기주소를 확인 후 이용 바랍니다.");
//					
//				}
				

// 20240530 삭제
//				// 20220106 yahan
//				// 하행
//				// 서울경부->탕정삼성LCD(349),아산탕정사무소(342),선문대(347),천안3공단(346)
//				if(
//						(deprCdCfm == "010" && arvlCdCfm == "349") || (deprCdCfm == "010" && arvlCdCfm == "342") ||
//						(deprCdCfm == "010" && arvlCdCfm == "347") || (deprCdCfm == "010" && arvlCdCfm == "346")
//						){
//					alert("[서울경부-탕정삼성LCD 노선 운행시간 변경 안내]\n" +
//							"  1. 적용일자 : 2021. 11. 01(월)부\n" +
//							"  2. 변경사항 : 기존 5회 ⇒ 6회 운행\n" +
//							"  3. 운행시간 :\n" +
//							"    - 서울발 06:20, 07:25, 09:30, 12:35, 16:20, 20:00\n" +
//							"    ※ 07:25 특정기간 미운행(토~일, 공휴일)\n" +
//							"    ※ 죽전, 신갈영덕발 출발시간은 Kobus에서 참고하여\n" +
//							"       주시기 바랍니다.");
//					// 정기권 안내(상하행)
//					alert("[정기권 도입 안내]\n" +
//							"  1. 시행일자 : 2021. 11. 01(월)부\n" +
//							"  2. 정기권 판매를 실시하오니 많은 이용 부탁드립니다.\n" +
//							"    ※ 전일30일권(37%↓),평일30일권(20%↓),평일20일권(15%↓)\n" +
//							"    ※ 자세한 내용은 '고속버스티머니'어플을 참고하여 주시기 바랍니다.");
//				}
//				// 죽전118->탕정삼성LCD(349),아산탕정사무소(342),선문대(347),천안3공단(346)
//				if(
//						(deprCdCfm == "118" && arvlCdCfm == "349") || (deprCdCfm == "118" && arvlCdCfm == "342") ||
//						(deprCdCfm == "118" && arvlCdCfm == "347") || (deprCdCfm == "118" && arvlCdCfm == "346")
//						){
//					alert("[서울경부-탕정삼성LCD 노선 운행시간 변경 안내]\n" +
//							"  1. 적용일자 : 2021. 11. 01(월)부\n" +
//							"  2. 변경사항 : 기존 5회 ⇒ 6회 운행\n" +
//							"  3. 운행시간 :\n" +
//							"    - 죽전발 06:40, 07:45, 09:50, 12:55, 16:40, 20:20\n" +
//							"    ※ 07:45 특정기간 미운행(토~일, 공휴일)\n" +
//							"    ※ 서울경부, 신갈영덕발 출발시간은 Kobus에서 참고하여\n" +
//							"       주시기 바랍니다.");
//					// 정기권 안내(상하행)
//					alert("[정기권 도입 안내]\n" +
//							"  1. 시행일자 : 2021. 11. 01(월)부\n" +
//							"  2. 정기권 판매를 실시하오니 많은 이용 부탁드립니다.\n" +
//							"    ※ 전일30일권(37%↓),평일30일권(20%↓),평일20일권(15%↓)\n" +
//							"    ※ 자세한 내용은 '고속버스티머니'어플을 참고하여 주시기 바랍니다.");
//				}
//				// 신갈영덕119->탕정삼성LCD(349),아산탕정사무소(342),선문대(347),천안3공단(346)
//				if(
//						(deprCdCfm == "119" && arvlCdCfm == "349") || (deprCdCfm == "119" && arvlCdCfm == "342") ||
//						(deprCdCfm == "119" && arvlCdCfm == "347") || (deprCdCfm == "119" && arvlCdCfm == "346")
//						){
//					alert("[서울경부-탕정삼성LCD 노선 운행시간 변경 안내]\n" +
//							"  1. 적용일자 : 2021. 11. 01(월)부\n" +
//							"  2. 변경사항 : 기존 5회 ⇒ 6회 운행\n" +
//							"  3. 운행시간 :\n" +
//							"    - 신갈영덕발 06:45, 07:50, 09:55, 13:00, 16:45, 20:25\n" +
//							"    ※ 07:50 특정기간 미운행(토~일, 공휴일)\n" +
//							"    ※ 서울경부, 죽전발 출발시간은 Kobus에서 참고하여\n" +
//							"       주시기 바랍니다.");
//					// 정기권 안내(상하행)
//					alert("[정기권 도입 안내]\n" +
//							"  1. 시행일자 : 2021. 11. 01(월)부\n" +
//							"  2. 정기권 판매를 실시하오니 많은 이용 부탁드립니다.\n" +
//							"    ※ 전일30일권(37%↓),평일30일권(20%↓),평일20일권(15%↓)\n" +
//							"    ※ 자세한 내용은 '고속버스티머니'어플을 참고하여 주시기 바랍니다.");
//				}
//				// 상행
//				// 탕정삼성LCD->죽전(118),신갈영덕(119),서울경부(010)
//				if(
//						(deprCdCfm == "349" && arvlCdCfm == "118") || (deprCdCfm == "349" && arvlCdCfm == "119") || (deprCdCfm == "349" && arvlCdCfm == "010")
//						){
//					alert("[탕정삼성LCD-서울 노선 운행시간 변경 안내]\n" +
//							"  1. 적용일자 : 2021. 11. 01(월)부\n" +
//							"  2. 변경사항 : 기존 5회 ⇒ 6회 운행\n" +
//							"  3. 운행시간 :\n" +
//							"    - 탕정삼성LCD발 06:10, 09:30, 13:20, 15:40, 17:40, 19:20\n" +
//							"    ※ 17:40 특정기간 미운행(토~일, 공휴일)\n" +
//							"    ※ 아산탕정사무소,선문대,천안아산역,천안3공단발  \n" +
//							"       출발시간은 Kobus에서 참고하여 주시기 바랍니다.");
//					// 정기권 안내(상하행)
//					alert("[정기권 도입 안내]\n" +
//							"  1. 시행일자 : 2021. 11. 01(월)부\n" +
//							"  2. 정기권 판매를 실시하오니 많은 이용 부탁드립니다.\n" +
//							"    ※ 전일30일권(37%↓),평일30일권(20%↓),평일20일권(15%↓)\n" +
//							"    ※ 자세한 내용은 '고속버스티머니'어플을 참고하여 주시기 바랍니다.");
//				}
//				// 아산탕정사무소->죽전(118),신갈영덕(119),서울경부(010)
//				if(
//						(deprCdCfm == "342" && arvlCdCfm == "118") || (deprCdCfm == "342" && arvlCdCfm == "119") || (deprCdCfm == "342" && arvlCdCfm == "010")
//						){
//					alert("[탕정삼성LCD-서울 노선 운행시간 변경 안내]\n" +
//							"  1. 적용일자 : 2021. 11. 01(월)부\n" +
//							"  2. 변경사항 : 기존 5회 ⇒ 6회 운행\n" +
//							"  3. 운행시간 :\n" +
//							"    - 아산탕정사무소발 06:15, 09:35, 13:25, 15:45, 17:45, 19:25\n" +
//							"    ※ 17:45 특정기간 미운행(토~일, 공휴일)\n" +
//							"    ※ 탕정삼성LCD,선문대,천안아산역,천안3공단발 \n" +
//							"       출발시간은 Kobus에서 참고하여 주시기 바랍니다.");
//					// 정기권 안내(상하행)
//					alert("[정기권 도입 안내]\n" +
//							"  1. 시행일자 : 2021. 11. 01(월)부\n" +
//							"  2. 정기권 판매를 실시하오니 많은 이용 부탁드립니다.\n" +
//							"    ※ 전일30일권(37%↓),평일30일권(20%↓),평일20일권(15%↓)\n" +
//							"    ※ 자세한 내용은 '고속버스티머니'어플을 참고하여 주시기 바랍니다.");
//				}
//				// 선문대->죽전(118),신갈영덕(119),서울경부(010)
//				if(
//						(deprCdCfm == "347" && arvlCdCfm == "118") || (deprCdCfm == "347" && arvlCdCfm == "119") || (deprCdCfm == "347" && arvlCdCfm == "010")
//						){
//					alert("[탕정삼성LCD-서울 노선 운행시간 변경 안내]\n" +
//							"  1. 적용일자 : 2021. 11. 01(월)부\n" +
//							"  2. 변경사항 : 기존 5회 ⇒ 6회 운행\n" +
//							"  3. 운행시간 :\n" +
//							"    - 선문대발 06:20, 09:40, 13:30, 15:50, 17:50, 19:30\n" +
//							"    ※ 17:50 특정기간 미운행(토~일, 공휴일)\n" +
//							"    ※ 탕정삼성LCD,아산탕정사무소,천안아산역,천안3공단발 \n" +
//							"       출발시간은 Kobus에서 참고하여 주시기 바랍니다.");
//					// 정기권 안내(상하행)
//					alert("[정기권 도입 안내]\n" +
//							"  1. 시행일자 : 2021. 11. 01(월)부\n" +
//							"  2. 정기권 판매를 실시하오니 많은 이용 부탁드립니다.\n" +
//							"    ※ 전일30일권(37%↓),평일30일권(20%↓),평일20일권(15%↓)\n" +
//							"    ※ 자세한 내용은 '고속버스티머니'어플을 참고하여 주시기 바랍니다.");
//				}
//				// 천안3공단->죽전(118),신갈영덕(119),서울경부(010)
//				if(
//						(deprCdCfm == "346" && arvlCdCfm == "118") || (deprCdCfm == "346" && arvlCdCfm == "119") || (deprCdCfm == "346" && arvlCdCfm == "010")
//						){
//					alert("[탕정삼성LCD-서울 노선 운행시간 변경 안내]\n" +
//							"  1. 적용일자 : 2021. 11. 01(월)부\n" +
//							"  2. 변경사항 : 기존 5회 ⇒ 6회 운행\n" +
//							"  3. 운행시간 :\n" +
//							"    - 천안3공단발 06:40, 10:00, 13:50, 16:10, 18:10, 19:50\n" +
//							"    ※ 18:10 특정기간 미운행(토~일, 공휴일)\n" +
//							"    ※ 탕정삼성LCD,아산탕정사무소,선문대,천안아산역발 \n" +
//							"       출발시간은 Kobus에서 참고하여 주시기 바랍니다.");
//					// 정기권 안내(상하행)
//					alert("[정기권 도입 안내]\n" +
//							"  1. 시행일자 : 2021. 11. 01(월)부\n" +
//							"  2. 정기권 판매를 실시하오니 많은 이용 부탁드립니다.\n" +
//							"    ※ 전일30일권(37%↓),평일30일권(20%↓),평일20일권(15%↓)\n" +
//							"    ※ 자세한 내용은 '고속버스티머니'어플을 참고하여 주시기 바랍니다.");
//				}
				
				// 20211203 yahan 
				// 광명<->강릉,속초 / 철산<->강릉,속초 노선폐지
//				if(
//						(deprCdCfm == "125" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "125") ||
//						(deprCdCfm == "125" && arvlCdCfm == "230") || (deprCdCfm == "230" && arvlCdCfm == "125") ||
//						(deprCdCfm == "126" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "126") ||
//						(deprCdCfm == "126" && arvlCdCfm == "230") || (deprCdCfm == "230" && arvlCdCfm == "126")
//						){
//					alert("[노선 폐지 안내]\n" +
//							"그동안 광명-속초 노선을 이용해 주신 고객 여러분께 진심으로 감사의 말씀을 드립니다.\n" +
//							"해당노선을 지속적으로 운행하고자 노력하였으나, 코로나19 확산으로 인한 이용수요 급감 및 " +
//							"인건비, 유가 등 고정비용상승으로 더 이상 운영이 어려워 아래와 같이 운행중단 되오니 " +
//							"고객 여러분의 많은 이해와 양해를 바랍니다.\n" +
//							"  1. 폐지일자 : 2022년 1월 1일(토) 부\n" +
//							"  2. 운행경로 : 광명(철산역)-광명(KTX역)-강릉-속초");
//				}

				// 20211112 yahan
				if ('20211116' <= yymmddD0 && yymmddD0 < '20211230'){
					var flatForm='', end='', text='';
					// 서울->대전,대전청사
					if(
							(deprCdCfm == "010" && arvlCdCfm == "300") ||
							(deprCdCfm == "010" && arvlCdCfm == "305") ||
							(deprCdCfm == "010" && arvlCdCfm == "307")
							){
						end  = "30";
						text = "30일(목)";
						flatForm = "대전,대전청사 : 11, 12번홈 ⇒ 12번홈";
					}
					// 서울->세종
					if(
							(deprCdCfm == "010" && arvlCdCfm == "351") ||
							(deprCdCfm == "010" && arvlCdCfm == "352") ||
							(deprCdCfm == "010" && arvlCdCfm == "353") ||
							(deprCdCfm == "010" && arvlCdCfm == "358") ||
							(deprCdCfm == "010" && arvlCdCfm == "361") ||
							(deprCdCfm == "010" && arvlCdCfm == "362") 
							){
						end  = "30";
						text = "30일(목)";
						flatForm = "세종시,세종연구단지 : 7번홈 ⇒ 13번홈";
					}
					// 서울->포항,경주,영천
					if(
							(deprCdCfm == "010" && arvlCdCfm == "830") ||
							(deprCdCfm == "010" && arvlCdCfm == "828") ||
							(deprCdCfm == "010" && arvlCdCfm == "815") ||
							(deprCdCfm == "010" && arvlCdCfm == "845") ||
							(deprCdCfm == "010" && arvlCdCfm == "846") 
							){
						end  = "30";
						text = "30일(목)";
						flatForm = "포항,경주,영천 : 9번홈 ⇒ 14번홈";
					}
					// 서울->구미,김천,상주,점촌
					if(
							(deprCdCfm == "010" && arvlCdCfm == "810") ||
							(deprCdCfm == "010" && arvlCdCfm == "440") ||
							(deprCdCfm == "010" && arvlCdCfm == "820") ||
							(deprCdCfm == "010" && arvlCdCfm == "825") ||
							(deprCdCfm == "010" && arvlCdCfm == "850") 
							){
						end  = "30";
						text = "30일(목)";
						flatForm = "구미,김천,상주,점촌 : 10번홈 ⇒ 15번홈";
					}
					// 서울->대구
					if(
							(deprCdCfm == "010" && arvlCdCfm == "801") ||
							(deprCdCfm == "010" && arvlCdCfm == "805") ||
							(deprCdCfm == "010" && arvlCdCfm == "809") 
							){
						end  = "30";
						text = "30일(목)";
						flatForm = "대구 : 8번홈 ⇒ 16번홈";
					}
					// 서울->천안
					if(
							(deprCdCfm == "010" && arvlCdCfm == "310") 
							){
						end  = "30";
						text = "30일(목)";
						flatForm = "천안 : 14, 15번홈 ⇒ 17번홈";
					}
					// 서울->공주,아산
					if(
							(deprCdCfm == "010" && arvlCdCfm == "320") ||
							(deprCdCfm == "010" && arvlCdCfm == "118") ||
							(deprCdCfm == "010" && arvlCdCfm == "119") ||
							(deprCdCfm == "010" && arvlCdCfm == "337") ||
							(deprCdCfm == "010" && arvlCdCfm == "338") ||
							(deprCdCfm == "010" && arvlCdCfm == "340") ||
							(deprCdCfm == "010" && arvlCdCfm == "341") ||
							(deprCdCfm == "010" && arvlCdCfm == "342") ||
							(deprCdCfm == "010" && arvlCdCfm == "343") ||
							(deprCdCfm == "010" && arvlCdCfm == "344") ||
							(deprCdCfm == "010" && arvlCdCfm == "346") ||
							(deprCdCfm == "010" && arvlCdCfm == "347") ||
							(deprCdCfm == "010" && arvlCdCfm == "349")
							){
						end  = "30";
						text = "30일(목)";
						flatForm = "공주, 아산 : 16번홈 ⇒ 1번홈";
					}
					var endDay = '202112'+end;
					if (flatForm != '' && yymmddD0 <= endDay)
					{
						alert("[승차홈 임시 변경 안내]\n" +
								"서울 경부터미널 승차홈 보수공사로\n" +
								"승차홈이 변경되오니 이용에 참고하시기 바랍니다.\n\n" +
								"1. 변경일자\n" +
								"  - 12월 8일(수) ~ 12월 "+ text + "\n" +
								"2. 변경 승차홈\n" + 
								"  - "+ flatForm +"\n" +
								"※ 이용객 여러분의 양해 부탁드립니다.");
					}
				}
				
				// 20211020 yahan
				// 전주->오산, 전주->광명, 전주->철산
				if(yymmddD0 < 20211201) {
					if(
							(deprCdCfm == "602" && arvlCdCfm == "127") ||
							(deprCdCfm == "602" && arvlCdCfm == "125") ||
							(deprCdCfm == "602" && arvlCdCfm == "126")
							){
						alert("※11월 1일 운행시간표 변경\n" +
								"- 막차시간 19:00 → 18:20 변경");
					}
					// 철산->전주, 광명->전주
					if(
							(deprCdCfm == "126" && arvlCdCfm == "602") ||
							(deprCdCfm == "125" && arvlCdCfm == "602")
							){
						alert("※11월 1일 운행시간표 변경\n");
					}				
					// 오산->전주
					if(
							(deprCdCfm == "127" && arvlCdCfm == "602")
							){
						alert("※11월 1일 운행시간표 변경\n" +
								"- 막차시간 20:30 → 19:50 변경");
					}
				}
				
// 20221122 삭제
//				// 20210630 yahan
//				// 용인(150) ↔ 진주(722) 
//				// 용인(150) ↔ 광주(500) 
//				// 용인(150) ↔ 부산(700) 
//				// 용인(150) ↔ 창원(710)
//				// 용인(150) ↔ 마산(705)
//				if(
//						// 20220308 삭제
//						// (deprCdCfm == "150" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "150") ||
//						(deprCdCfm == "150" && arvlCdCfm == "500") || (deprCdCfm == "500" && arvlCdCfm == "150") ||
//						(deprCdCfm == "150" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "150")
//						// 20221026 삭제
////						(deprCdCfm == "150" && arvlCdCfm == "710") || (deprCdCfm == "710" && arvlCdCfm == "150") ||
////						(deprCdCfm == "150" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "150")
//						){
//					alert("[용인 노선 기흥역 중간정차 개시]\n\n" +
//							"   1. 시행일자 : 2021. 07. 01 (목) 부\n" +
//							"   2. 운행노선 : 용인~광주, 용인~마산~창원, 용인~부산\n" +
//							"   3. 탑승장소 : 경기 용인시 기흥구 중부대로, 기흥역 시외버스 정류장\n" +
//							"                 (기흥역 수인분당선 4번 출구 앞)\n" +
//							"   4. 운행시간 및 요금 : Kobus 참고");
//							//"   5. 교통정체로 인해 출발시간이 지연될 수 있사오니 양해부탁드립니다.");
//				}
				
// 20221122 삭제 및 재정리
//				// 20210630 yahan
//				//용인(150) ↔ 진주(722) = 20220308 추가 
//				//용인(150) -> 인삼랜드(324) / 인삼랜드(325) -> 용인(150)
//				//용인(150) ↔ 진주개양(723)
//				//용인(150) ↔ 진주혁신(724)
//				//용인(150) -> 정안(315) / 정안(316) -> 용인(150)
//				//용인(150) -> 낙동강(823) / 낙동강(824) -> 용인(150)
//				//용인(150) -> 선산(812) / 선산(813)) -> 용인(150)
//				//용인(150) ↔ 마산(705)
//				//
//				//용인신갈(111) -> 인삼랜드(324) / 인삼랜드(325) -> 용인신갈(111)
//				//용인신갈(111) ↔ 진주개양(723)
//				//용인신갈(111) ↔ 진주혁신(724)
//				//용인신갈(111) ↔ 진주(722)
//				//용인신갈(111) -> 정안(315) / 정안(316) -> 용인신갈(111)
//				//용인신갈(111) ↔ 광주(500)
//				//용인신갈(111) -> 낙동강(823) / 낙동강(824) -> 용인신갈(111)
//				//용인신갈(111) ↔ 부산(700)
//				//용인신갈(111) -> 선산(812) / 선산(813) -> 용인신갈(111)
//				//용인신갈(111) ↔ 마산(705)
//				//용인신갈(111) ↔ 창원(710)
//				//
//				//용인기흥(161) -> 인삼랜드(324) / 인삼랜드(325) -> 용인기흥(161)
//				//용인기흥(161) ↔ 진주개양(723)
//				//용인기흥(161) ↔ 진주혁신(724)
//				//용인기흥(161) ↔ 진주(722)
//				//용인기흥(161) -> 정안(315) / 정안(316) -> 용인기흥(161)
//				//용인기흥(161) ↔ 광주(500)
//				//용인기흥(161) -> 낙동강(823) / 낙동강(824) -> 용인기흥(161)
//				//용인기흥(161) ↔ 부산(700)
//				//용인기흥(161) -> 선산(812) / 선산(813) -> 용인기흥(161)
//				//용인기흥(161) ↔ 마산(705)
//				//용인기흥(161) ↔ 창원(710)
//				if(
//						// 20221109 삭제 // 20220308 추가
//						//(deprCdCfm == "150" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "150") ||
//						//(deprCdCfm == "150" && arvlCdCfm == "324") || (deprCdCfm == "325" && arvlCdCfm == "150") ||
//						//(deprCdCfm == "150" && arvlCdCfm == "723") || (deprCdCfm == "723" && arvlCdCfm == "150") ||
//						//(deprCdCfm == "150" && arvlCdCfm == "724") || (deprCdCfm == "724" && arvlCdCfm == "150") ||
//						
//						(deprCdCfm == "150" && arvlCdCfm == "315") || (deprCdCfm == "316" && arvlCdCfm == "150") ||
//						(deprCdCfm == "150" && arvlCdCfm == "823") || (deprCdCfm == "824" && arvlCdCfm == "150") ||
//						(deprCdCfm == "150" && arvlCdCfm == "812") || (deprCdCfm == "813" && arvlCdCfm == "150") ||
//						// 20220308 삭제
//						// (deprCdCfm == "150" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "150") ||
//						
//						// 20221109 삭제
//						//(deprCdCfm == "111" && arvlCdCfm == "324") || (deprCdCfm == "325" && arvlCdCfm == "111") ||
//						//(deprCdCfm == "111" && arvlCdCfm == "723") || (deprCdCfm == "723" && arvlCdCfm == "111") ||
//						//(deprCdCfm == "111" && arvlCdCfm == "724") || (deprCdCfm == "724" && arvlCdCfm == "111") ||
//						//(deprCdCfm == "111" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "111") ||
//						
//						(deprCdCfm == "111" && arvlCdCfm == "315") || (deprCdCfm == "316" && arvlCdCfm == "111") ||
//						(deprCdCfm == "111" && arvlCdCfm == "823") || (deprCdCfm == "824" && arvlCdCfm == "111") ||
//						(deprCdCfm == "111" && arvlCdCfm == "500") || (deprCdCfm == "500" && arvlCdCfm == "111") ||
//						(deprCdCfm == "111" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "111") ||
//						(deprCdCfm == "111" && arvlCdCfm == "812") || (deprCdCfm == "813" && arvlCdCfm == "111") ||
//						// 20221122 이동
//						//(deprCdCfm == "111" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "111") ||
//						//(deprCdCfm == "111" && arvlCdCfm == "710") || (deprCdCfm == "710" && arvlCdCfm == "111") ||
//						
//						// 20221109 삭제
//						//(deprCdCfm == "161" && arvlCdCfm == "324") || (deprCdCfm == "325" && arvlCdCfm == "161") ||
//						//(deprCdCfm == "161" && arvlCdCfm == "723") || (deprCdCfm == "723" && arvlCdCfm == "161") ||
//						//(deprCdCfm == "161" && arvlCdCfm == "724") || (deprCdCfm == "724" && arvlCdCfm == "161") ||
//						//(deprCdCfm == "161" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "161") ||
//						
//						(deprCdCfm == "161" && arvlCdCfm == "315") || (deprCdCfm == "316" && arvlCdCfm == "161") ||
//						(deprCdCfm == "161" && arvlCdCfm == "823") || (deprCdCfm == "824" && arvlCdCfm == "161") ||
//						(deprCdCfm == "161" && arvlCdCfm == "500") || (deprCdCfm == "500" && arvlCdCfm == "161") ||
//						(deprCdCfm == "161" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "161") ||
//						(deprCdCfm == "161" && arvlCdCfm == "812") || (deprCdCfm == "813" && arvlCdCfm == "161") 
//						// 20221122 이동
//						//(deprCdCfm == "161" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "161") ||
//						//(deprCdCfm == "161" && arvlCdCfm == "710") || (deprCdCfm == "710" && arvlCdCfm == "161")
//						){
////					alert("[용인 노선 기흥역 중간정차 개시]\n\n" +
////							"   1. 시행일자 : 2021. 07. 01 (목) 부\n" +
////							"   2. 운행노선 : 용인~광주, 용인~마산~창원, 용인~진주, 용인~부산\n" +
////							"   3. 탑승장소 : 경기 용인시 기흥구 중부대로, 기흥역 시외버스 정류장\n" +
////							"                 (기흥역 수인분당선 4번 출구 앞)\n" +
////							"   4. 운행시간 및 요금 : Kobus 참고\n" +
////							"   5. 교통정체로 인해 출발시간이 지연될 수 있사오니 양해부탁드립니다.");
//					alert("[용인~진주 기흥역 중간정차 운행중단 안내]\n\n" +
//							"  1. 시행일자 : 2022. 03. 14 (월) 부\n" +
//							"  2. 운행경로 : 용인~용인신갈~인삼랜드(휴)~진주개양(혁신)~진주\n" +
//							"  3. 변경사유 : 노선사정으로 인한 기흥역 중간정차 중단\n" +
//							"※그동안 기흥역에서 승.하차를 하신 고객님들께서는 인근에 있는\n" +
//							"   용인신갈 정류소를 이용하여 주시기 바랍니다.");
//				}
				
				// 20210625 yahan
				// 서울-안동(840) 프리미엄 신설
				if((deprCdCfm == "010" && arvlCdCfm == "840")){
					alert("[안동 노선 프리미엄 버스(신설) 운행 안내]\n\n" +
							"　* 운행시간 : 09:00, 12:30, 18:40 / (일:3회 운행)\n" +
							"　* 운행일자 : 2021. 7. 12. (월) 부터");
				}
// 20230203 삭제
//				// 동양고속 - 수원~삼척 노선팝업
//				if(
//						(deprCdCfm == "110" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "110") ||
//						(deprCdCfm == "110" && arvlCdCfm == "219") || (deprCdCfm == "219" && arvlCdCfm == "110") ||
//						(deprCdCfm == "110" && arvlCdCfm == "210") || 
//						(deprCdCfm == "110" && arvlCdCfm == "238") || (deprCdCfm == "239" && arvlCdCfm == "110") ||
//						
//						(deprCdCfm == "112" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "112") ||
//						(deprCdCfm == "112" && arvlCdCfm == "219") || (deprCdCfm == "219" && arvlCdCfm == "112") ||
//						(deprCdCfm == "112" && arvlCdCfm == "210") || 
//						(deprCdCfm == "112" && arvlCdCfm == "238") || (deprCdCfm == "239" && arvlCdCfm == "112") ||
//						
//						(deprCdCfm == "114" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "114") ||
//						(deprCdCfm == "114" && arvlCdCfm == "219") || (deprCdCfm == "219" && arvlCdCfm == "114") ||
//						(deprCdCfm == "114" && arvlCdCfm == "210") || 
//						(deprCdCfm == "114" && arvlCdCfm == "238") || (deprCdCfm == "239" && arvlCdCfm == "114")
//						){
//					alert("※ 수원-삼척 노선 고급형 투입 안내\n\n" +
//							"   1. 시행일자 : 2021. 07. 02 (금) 부\n" +
//							"   2. 운행노선 : 수원 – 동해 – 강원대입구 - 삼척\n" +
//							"   3. 운행시간 : 09:00분, 15:00분 (일 2회)\n" +
//							"    - 우등시간 변경(10:00분→11:00분, 16:00분→17:00분)\n" +
//							"   4. 고급(프리미엄) 요금 상시 10% 할인 시행");
//				}
//				// 동해출발 선택 시
//				if(
//						(deprCdCfm == "210" && arvlCdCfm == "110") || 
//						(deprCdCfm == "210" && arvlCdCfm == "112") || 
//						(deprCdCfm == "210" && arvlCdCfm == "114") 
//						){
//					alert("※ 수원-삼척 노선 고급형 투입 안내\n\n" +
//							"   1. 시행일자 : 2021. 07. 02 (금) 부\n" +
//							"   2. 운행노선 : 수원 – 동해 – 강원대입구 - 삼척\n" +
//							"   3. 운행시간 : 09:25분, 15:25분 (일 2회)\n" +
//							"    - 우등시간 변경(10:25분→11:25분, 16:25분→17:25분)\n" +
//							"   4. 고급(프리미엄) 요금 상시 10% 할인 시행");
//				}

				// 선산도착지 선택:하행 812 상행 813
				if((arvlCdCfm == "812") || (arvlCdCfm == "813")){
					alert("[선산휴게소 환승 안내]\n\n" +
							"※선산 휴게소에서 환승하시는 고객께서는\n" +
							"  도로 교통 상황에 따라 도착 시간이 지연될 수 있으니 \n" +
							"  이점 참고하시어 환승 승차권을 예매하시기 바랍니다.");
				}

//				// 20210623 yahan
//				// 서울-공주(320)하행 요금정상화 시행
//				if((deprCdCfm == "010" && arvlCdCfm == "320") || (deprCdCfm == "320" && arvlCdCfm == "010")){
//					alert("[서울~공주 요금정상화 시행]\n\n" +
//							"　* 시행일 : 2021.6.28.(월요일) 부터");
//				}
//				// 동대구(801)-울산(715)하행 요금정상화 시행
//				if((deprCdCfm == "801" && arvlCdCfm == "715") || (deprCdCfm == "715" && arvlCdCfm == "801")){
//					alert("[대구~울산 요금정상화 시행]\n\n" +
//							"　* 시행일 : 2021.6.28.(월요일) 부터");
//				}

				
				// 20210623 yahan
				// 서울-영월(272)하행 운행시간 변경
//				if (
//						(deprCdCfm == "010" && arvlCdCfm == "272")
//						){
//					alert("[코로나19 관련 운행시간 변경 안내]\n\n" +
//							"최근 코로나19 재확산으로 인하여 아래와 같이 운행시간이 변경되오니 이용에 착오 없으시기 바랍니다.\n\n" +
//							"○ 서울->영월 (하행)\n" +
//							"　* 첫차 : 10시00분 -> 11시05분\n" +
//							"　* 시행일 : 2021.7.1.(목요일) 부터");
//				}
//20220713 yahan 변경
//				// 20210526 yahan
//				// 서울(010)-제천(450) 프리미엄버스 === 왕복
//				if(
//						(deprCdCfm == "010" && arvlCdCfm == "450") || (deprCdCfm == "450" && arvlCdCfm == "010")
//					){
//					alert("[서울-제천 프리미엄 버스 요금 할인 안내]\n\n" +
//							"○ 프리미엄 버스 요금 할인 18,000원(-2,000원 10.5%)\n" +
//							"○ 시행일 : 2021년 6월 14일\n\n" +
//							"고객님의 많은 이용 바랍니다.");
//				}
				
// 20240530 삭제
//				// 20210521 yahan
//				// 서울(010)-(아산온양340),아산둔포(344),아산테크노(338) === 왕복
//				if(
//						(deprCdCfm == "010" && arvlCdCfm == "340") || (deprCdCfm == "340" && arvlCdCfm == "010") || 
//						(deprCdCfm == "010" && arvlCdCfm == "344") || (deprCdCfm == "344" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "338") || (deprCdCfm == "338" && arvlCdCfm == "010")
//					){
//					alert("[서울-둔포-아산 노선 우등투입 안내]\n\n" +
//							"1. 시행일자 : 2021. 06. 07부(월)\n" +
//							"2. 운행노선 : 서울경부TR-둔포-아산테크노밸리-아산고속TR\n" +
//							"3. 변경사항 : 일반(45석) → 우등(28석) 변경\n" +
//							"4. 운행시간 : 변경없음(이전과 동일)\n" +
//							"　가. 서울발 09:20, 15:20, 20:30 (3회)\n" +
//							"　나. 아산발 06:50, 12:00, 18:00 (3회)\n" +
//							"5. 정기권 판매 일시 중지\n" +
//							"　가. 중지사유 : 우등차량 투입 및 우등 정기권 도입 준비\n" +
//							"　나. 재개일자 : 2021. 06. 07부(월)");
//				}
				
// 2021-10-20 삭제
//				// 20210521 yahan
//				// 서울(010) 천안아산(343),아산서부(341),배방정류소(337) === 왕복
//				if(
//						(deprCdCfm == "010" && arvlCdCfm == "343") || (deprCdCfm == "343" && arvlCdCfm == "010") || 
//						(deprCdCfm == "010" && arvlCdCfm == "341") || (deprCdCfm == "341" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "337") || (deprCdCfm == "337" && arvlCdCfm == "010")
//					){
//					alert("[정기권 판매 일시 중지]\n\n" +
//							"1. 중지사유 : 우등차량 투입 및 우등 정기권 도입 준비\n" +
//							"2. 재개일자 : 2021. 06. 07부(월)");
//				}
				
				
				//20210426 yahan
				// 고양화정(115),고양백석(116)-진주(722),진주개양(723),진주혁신(724)
				if(
						(deprCdCfm == "115" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "115") || 
						(deprCdCfm == "115" && arvlCdCfm == "723") || (deprCdCfm == "723" && arvlCdCfm == "115") ||
						(deprCdCfm == "115" && arvlCdCfm == "724") || (deprCdCfm == "724" && arvlCdCfm == "115") ||
						
						(deprCdCfm == "116" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "116") ||
						(deprCdCfm == "116" && arvlCdCfm == "723") || (deprCdCfm == "723" && arvlCdCfm == "116") ||
						(deprCdCfm == "116" && arvlCdCfm == "724") || (deprCdCfm == "724" && arvlCdCfm == "116") 
						){
					alert("[고양-진주노선 운행시간 조정 안내]\n\n" +
							"`21.5.1부로 운행시간이 일부 조정되오니\n" +
							"이용에 참고해주시기 바랍니다.");
				}

// 20220928 삭제
//				// 20210405 yahan
//				// 경부-통영(730)하행 운행시간 변경
//				if (
//						(deprCdCfm == "010" && arvlCdCfm == "730")
//						){
//					alert("[코로나19 관련 운행시간 변경 안내]\n\n" +
//							"최근 코로나19 재확산으로 인하여 아래와 같이 운행시간이 변경되오니 이용에 착오 없으시기 바랍니다.\n\n" +
//							"○ 서울->통영 (하행)\n" +
//							"　* 첫차 : 06시20분 -> 07시00분\n" +
//							"　* 시행일 : 2021.4.12.(월요일) 부터");
//				}
				
				// 20210318 yahan
				// 센트럴~목포 첫차/막차 운행시간 변경 안내
				if(
						(deprCdCfm == "020" && arvlCdCfm == "505") || (deprCdCfm == "505" && arvlCdCfm == "020")
						){
					alert("[센트럴~목포 첫차/막차 운행시간 변경 안내]\n\n" +
							"○ 첫차 : 05:35 → 06:00\n" +
							"○ 막차 : 01:00 → 23:55\n" +
							"○ 시행일 : 2021.4.1.(목요일)");
				}

				// 20210610 yahan
				// 서울-원주혁신
				if ((deprCdCfm == "010" && arvlCdCfm == "244") || (deprCdCfm == "244" && arvlCdCfm == "010")){
					alert("[서울-원주기업-원주혁신노선 안내]\n\n" +
							"○ 탑승장소 : 원주기업(스타세븐 건물 건너편 버스정류장)\n" +
							"              원주혁신(국민건강보험공단 정문 버스정류장)\n" +
							// 20221102 삭제
							//"○ 우등요금 할인 11,200원(-2,200원, -16.4%)\n" +
							"○ 노선경로가 변경(영동고속도로)되었으니 이용에 참고하시기 바랍니다.");
				}
				// 서울-원주기업
				if ((deprCdCfm == "010" && arvlCdCfm == "246") || (deprCdCfm == "246" && arvlCdCfm == "010")){
					alert("[서울-원주기업-원주혁신노선 안내]\n\n" +
							"○ 탑승장소 : 원주기업(스타세븐 건물 건너편 버스정류장)\n" +
							"              원주혁신(국민건강보험공단 정문 버스정류장)\n" +
							// 20221102 삭제
							//"○ 우등요금 할인 9,600원(-1,300원, -11.9%)\n" +
							"○ 노선경로가 변경(영동고속도로)되었으니 이용에 참고하시기 바랍니다.");
				}
//				// 20210304 yahan
//				// 서울-원주혁신노선 원주기업도시 경유 안내
//				if(
//						(deprCdCfm == "010" && arvlCdCfm == "244") || (deprCdCfm == "244" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "246") || (deprCdCfm == "246" && arvlCdCfm == "010")
//						){
//					// 20210325
//					alert("[서울-원주혁신노선 원주기업도시 경유 안내]\n\n" +
//							"○ 운송개시일 : '21. 3. 16(화)\n" +
//							"○ 운행횟수 : 일 9회\n" +
//							"○ 노선경로 : 서울경부-원주기업-원주혁신\n" +
//							"○ 탑승장소 : 원주기업(스타세븐 건물 건너편 버스정류장)\n" +
//							"　　　　　　 원주혁신(국민건강보험공단 정문 버스정류장)\n" +
//							"○ 서울-원주혁신 우등요금을 한시적으로 11,200원(-600원,-5.1%)\n" +
//							"   으로 조정하오니 이용에 참고하시기 바랍니댜.('21.3.29부)"); 
//							
//					// 20210311
//					alert("[서울경부-원주기업-원주혁신 운행안내]\n\n" +
//							"○ 운행노선 : 서울-원주기업-원주혁신\n" +
//							"○ 운행횟수 : 일 9회\n" +
//							"○ 운행일자 : 2021.3.16.(화요일) 부터");
//					// 20210310
//					alert("[서울-원주혁신노선 원주기업도시 경유 안내]\n\n" +
//							"○ 운송개시일 : '21. 3. 16(화)\n" +
//							"○ 노선경로 : 서울경부-원주기업-원주혁신\n" +
//							"○ 우등요금 : 서울-원주기업 9,600원(신설)\n" +
//							"　　　　　　 서울-원주혁신 11,800원(+500원)\n" +
//							"　　　　　　 ※ 기존 12,200원→11,300원 할인종료\n" +
//							"○ 탑승장소 : 원주기업(스타세븐 건물 건너편 버스정류장)\n" +
//							"　　　　　　 원주혁신(국민건강보험공단 정문 버스정류장)");
//				}

// 20240530 삭제
//				// 20210302 yahan
//				// 평택-안중, 평택-안중오거리
//				if(
//						(deprCdCfm == "180" && arvlCdCfm == "176") || 
//						(deprCdCfm == "180" && arvlCdCfm == "177")
//						){
//					alert("[평택→안중(오거리) 승차장소 안내]\n\n" +
//							"○ 위치 : 평택역.AK플라자 시내버스 정류장, 통복시장 로터리 방면\n" +
//							"　 (정류장번호 15698)\n" +
//							"○ 문의 : 동양고속 평택사업소 031-655-2453");
//				}

// 20240422 삭제후 재등록
//				// 20210203 yahan
//				// 인천~천안~아산 노선 정기권 제도와 대학생 할인을 
//				if (
//						(deprCdCfm == "337" && arvlCdCfm == "100") || 
//						(deprCdCfm == "341" && arvlCdCfm == "100") || 
//						(deprCdCfm == "343" && arvlCdCfm == "100") || 
//						(deprCdCfm == "310" && arvlCdCfm == "100") || 
//						
//						(deprCdCfm == "100" && arvlCdCfm == "310") || 
//						(deprCdCfm == "100" && arvlCdCfm == "343") ||
//						(deprCdCfm == "100" && arvlCdCfm == "341") ||
//						(deprCdCfm == "100" && arvlCdCfm == "337") ||
//						(deprCdCfm == "100" && arvlCdCfm == "340") 
//						){
//					alert("※ 인천~천안~아산 노선 정기권, 대학생 할인 도입 안내\n\n" +
//							"1. 도입일자 : 2021년 2월 22일\n" +
//							"2. 정기권 종류\n" +
//							" - 가. 전일 정기권 (30일권) : 최대 36.7% 할인\n" +
//							" - 나. 평일 정기권 (20일권/30일권) : 최대 15~20% 할인\n" +
//							"3. 대학생 할인 : 일반(성인) 운임의 20% 할인");
//				}
				
				// 20210127 yahan
				// 동대구801,서대구805↔신갈（용인）111,용인150 노선 전산망 변경
//				if (
//						(deprCdCfm == "801" && arvlCdCfm == "111") || (deprCdCfm == "801" && arvlCdCfm == "150") ||
//						(deprCdCfm == "805" && arvlCdCfm == "111") || (deprCdCfm == "805" && arvlCdCfm == "150") ||
//						(deprCdCfm == "111" && arvlCdCfm == "801") || (deprCdCfm == "111" && arvlCdCfm == "805") ||
//						(deprCdCfm == "150" && arvlCdCfm == "801") || (deprCdCfm == "150" && arvlCdCfm == "805")
//						){
//					alert("[동대구,서대구발 신갈（용인）,용인행 노선 전산망 변경]\n\n" +
//							"`21. 2. 1일（월）부로 동대구,서대구↔신갈（용인）,용인→동대구,구미↔신갈(용인),기흥역,용인 노선으로 변경.(서대구 경유X)\n\n" +
//							"고속버스→시외우등직행버스로 운행됨에 따라 예매처 변경.\n\n" +
//							" - 모바일: 시외버스티머니 또는 버스타고모바일\n" +
//							" - 홈페이지: 시외버스통합예매 또는 버스타고\n" +
//							" ※ 배차 조회가 되지 않을 경우 상세한 배차 정보는 출발터미널로 확인해주세요.");
//				}
				
				// 20201229 yahan
				// 경부-울산(715) 하행, 경부-김해(735) 하행 운행시간 변경
//				if (
//						(deprCdCfm == "010" && arvlCdCfm == "715")
////						(deprCdCfm == "010" && arvlCdCfm == "715") || (deprCdCfm == "010" && arvlCdCfm == "735")
//						){
//					alert("[코로나19 관련 운행시간 변경 안내]\n\n" +
//							"최근 코로나19 재확산으로 인하여 아래와 같이 운행시간이 변경되오니 이용에 착오 없으시기 바랍니다.\n\n" +
//							"○ 서울->울산 (하행)\n" +
//							"　* 첫차 : 06시00분 -> 06시30분\n" +
//							"　* 막차 : 00시30분 -> 22시00분\n\n");
//// 20220928 삭제
////							"○ 서울->김해 (하행)\n" +
////							"　* 첫차 : 06시30분 -> 07시50분\n" +
////							"　* 막차 : 23시50분 -> 22시30분");
//				}
				
				// 20201218 yahan
				// 광주500 ⟺ 통영730 노선 매표 발권 전산망 이전 
				if (
						(deprCdCfm == "500" && arvlCdCfm == "730") || (deprCdCfm == "730" && arvlCdCfm == "500")
						){
					alert("<광주 ⟺ 통영 노선 매표 발권 전산망 이전 안내>\n\n" +
							"'광주 ⟺ 통영' 노선의 매표 발권 전산망이 아래와 같이 이전됨을 알려드리오니 이용에 착오 없으시기 바랍니다.\n\n" +
							"○ 변경일자 : 2021년 1월 1일부(금요일)\n" +
							"○ 운행노선 : 광주 ⟺ 통영\n" +
							"○ 변경내용 : 코버스(고속버스) 전산망에서 시외버스 전산망으로 이전\n" +
							"○ 시외버스 예매 이용방법\n" +
							"　* 광주발 - 통영착 : 티머니 (https://txbus.t-money.co.kr) 예매\n" +
							"　* 통영발 - 광주착 : 버스타고 (https://www.bustago.or.kr) 예매");
				}
				
// 20201221 yahan
// 다시 요청할때까지 보류
//				// 20201218 yahan
//				// 대구801~경주815 kobus전산해지
//				if(yymmddD0 >= 20201221) { 
//					if (
//							(deprCdCfm == "801" && arvlCdCfm == "815") || (deprCdCfm == "815" && arvlCdCfm == "801") 
//							){
//						alert("[대구↔경주 예매 홈페이지 및 모바일 앱 변경 안내]\n\n" +
//								"○ 2021년 1월 1일부터 예매사이트가 변경되어 \n" +
//								"　고속버스통합예매 홈페이지(https://www.kobus.co.kr) 및 \n" +
//								"　고속버스티머니앱에서 예매가 불가능합니다.\n" +
//								"○ 해당 노선을 이용하실 고객께서는 \n" +
//								"　버스타고(https://www.bustago.or.kr) / 버스타고앱 또는 \n" +
//								"　티머니시외버스(https://txbus.t-money.co.kr)/시외버스티머니앱에서\n" +
//								"　예매하여주시기 바랍니다.");
//					}
//				}
					
				// 20201215 yahan
				// 서울~강진 노선통합 관련 팝업요청
//				if(yymmddD0 >= 20201221) { 
//					
////					- 영산포→센트럴시티(서울) 565 020
////					- 영산포→정안(휴)상행 565 316
////
////					- 강진→센트럴시티(서울) 535 020
////					- 강진→정안(휴)상행 535 316
////
////					- 센트럴시티(서울)→강진 020 535
////					- 정안(휴)하행→강진 315 535
//					if (
//							(deprCdCfm == "565" && arvlCdCfm == "020") ||
//							(deprCdCfm == "565" && arvlCdCfm == "316") ||
//							(deprCdCfm == "535" && arvlCdCfm == "020") ||
//							(deprCdCfm == "535" && arvlCdCfm == "316") ||
//							(deprCdCfm == "020" && arvlCdCfm == "535") ||
//							(deprCdCfm == "315" && arvlCdCfm == "535") 
//							){
//						alert("[서울↔영산포, 서울↔강진 노선통합 안내]\n\n" +
//								"○ 운송개시일 : '21.1.1(금)\n" +
//								"○ 노선경로 : 센트럴시티-나주-영산포-강진\n" +
//								"○ 요금 : 기존과 동일하게 적용");
//					}
//				}
				
				// 20210303 yahan
				// 동대구~경주 시외버스로 이관
//				if (
//						(deprCdCfm == "801" && arvlCdCfm == "815") || (deprCdCfm == "815" && arvlCdCfm == "801")
//						){
////						// 20201204 yahan
////						// 동대구~경주 요금할인안내
////						alert("[요금할인안내]\n\n" +
////								"대구~경주 노선 우등버스 이용시 " +
////								"사전예매(2일전)/단체예매(5~10인)/왕복예매할 경우, " +
////								"10%할인 요금을 적용해드리오니 이용에 참고하여 주시기 바랍니다." );
//					alert("[예매변경안내]\n\n" +
//							"▶ `21. 3. 1(월) 부터 [대구~경주] 예매는 아래의 어플과 홈페이지에서 가능합니다.\n" +
//							"  시외버스티머니(App)/홈페이지(https://txbus.t-money.co.kr)\n" +
//							"  버스타고모바일(App)/홈페이지(www.bustago.or.kr)");
//				}
				
// 20250526 삭제
//				// 20201130 yahan
//				// 동광양(525)~서울(센트럴)(020)
//				if (
//						(deprCdCfm == "525" && arvlCdCfm == "020") || (deprCdCfm == "020" && arvlCdCfm == "525")
//						){
//						alert("[프리미엄 버스 운행 안내]\n\n" +
//								" ○ 운행노선 : 동광양~광양~서울(센트럴)\n" +
//								" ○ 운행개시 : 2020.12.18(금요일) 부터" );
//				}
				
// 20221102 삭제
//				// 20201130 yahan 금액변경 37,900 -> 37,400
//				// 20201124 yahan
//				// 의정부(170)-부산(700) / 구리(169)-부산(700)
//				if (
//						(deprCdCfm == "170" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "170") ||
//						(deprCdCfm == "169" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "169")
//						){
//						alert("[요금변경 안내]\n\n" +
//								"의정부~구리~부산 노선의 요금이 `20년12월01일자로 인하되오니,\n" +
//								"이용에 참고하여 주시기 바랍니다.\n" +
//								"　▶의정부~부산 : 42,300원 → 37,400원\n" +
//								"　▶구 리~부 산 : 37,400원 → 35,400원" );
//				}
				
// 20201204 삭제
//				// 20201123 yahan
//				// 대구(801)-경주(815) 왕복
//				if (
//						(deprCdCfm == "801" && arvlCdCfm == "815") || (deprCdCfm == "815" && arvlCdCfm == "801")
//						){
//						alert("[요금변경 안내]\n\n" +
//								"대구~경주 노선의 요금할인율이 22%에서 10%로 조정되어,\n" +
//								"`20년12월01일자로 우등요금이 6,500원으로 변경되오니,\n" +
//								"이용에 참고하여 주시기 바랍니다." );
//				}
				
				
// 20210104 삭제요청
//				// 20201117 yahan
//				// 공주(320)->서울(010) 심야시간조정
//				if (
//						(deprCdCfm == "320" && arvlCdCfm == "010")
//						){
//						alert("[심야시간 조정안내]\n\n" +
//								"공주→서울경부 운행시간중 심야시간이 조정되어 운행되오니 " +
//								"확인후 이용하시기 바랍니다.\n" +
//								"　▶변경전 : 22시30분 → 변경후 : 22시00분\n" +
//								"　▶시행시기 : 2020년 12월 01일(화) 부터\n" +
//								"　▶코로나19 종료시 종전대로 재조정 됩니다.");
//				}

				// 20201117 yahan
				// 여수(510)->부산사상(703) / 여천(509)->부산사상 / 부산사상->여수
				if (
						(deprCdCfm == "510" && arvlCdCfm == "703") ||
						(deprCdCfm == "509" && arvlCdCfm == "703") ||
						(deprCdCfm == "703" && arvlCdCfm == "510")
						){
						alert("※ 해당노선은 프리미엄 마일리지 적립 및 사용 불가 노선입니다.");
				}
// 20240108 삭제
//				// 20201117 yahan
//				// 광주(500)->전주(602) / 전주->광주 / 호남제일문(605)->광주
//				if (
//						(deprCdCfm == "500" && arvlCdCfm == "602") ||
//						(deprCdCfm == "602" && arvlCdCfm == "500") ||
//						(deprCdCfm == "605" && arvlCdCfm == "500")
//						){
//						alert("※ 해당노선은 프리미엄 마일리지 적립 및 사용 불가 노선입니다.");
//				}
				
				// 20201019 yahan
				// <동대구발 수원, 안산행 노선 전산망 변경> 
				if(yymmddD0 >= 20201021) { 
//					if ((deprCdCfm == "801" && arvlCdCfm == "110") || (deprCdCfm == "110" && arvlCdCfm == "801")){
//						alert("<동대구발 수원, 안산행 노선 전산망 변경>\n\n" +
//								"`20. 11. 1일자로 동대구↔수원행 노선이 고속버스 → 시외직행버스로 변경되어 운행됩니다.\n" +
//								"홈페이지 : 동대구,수원(버스타고)\n" +
//								"모 바 일 : 고속버스모바일 → 동대구, 수원(버스타고모바일) 변경됩니다.\n" +
//								"기존 이용승객들께서는 확인하시고 이용부탁드립니다.");
//					}
//					if ((deprCdCfm == "801" && arvlCdCfm == "190") || (deprCdCfm == "190" && arvlCdCfm == "801")){
//						alert("<동대구발 수원, 안산행 노선 전산망 변경>\n\n" +
//								"`20. 11. 1일자로 동대구↔안산행 노선이 고속버스 → 시외직행버스로 변경되어 운행됩니다.\n" +
//								"홈페이지 : 안산(시외버스통합예매)\n" +
//								"모 바 일 : 고속버스모바일 → 안산(시외버스모바일) 변경됩니다.\n" +
//								"기존 이용승객들께서는 확인하시고 이용부탁드립니다.");
//					}
					// 20201030 yahan 문구변경
//					if (
//							(deprCdCfm == "801" && arvlCdCfm == "110") || (deprCdCfm == "110" && arvlCdCfm == "801") ||
//							(deprCdCfm == "801" && arvlCdCfm == "190") || (deprCdCfm == "190" && arvlCdCfm == "801")
//							){
//							alert("<동대구발 수원, 안산행 노선 전산망 변경>\n\n" +
//									"`20. 11. 1일자로 동대구↔수원,동대구↔안산노선이 고속버스→시외직행버스로 운행됨에 따라 " +
//									"아래와 같이 예매처가 변경됨.\n\n" +
//									"모 바 일 : 시외버스티머니 또는 버스타고모바일\n" +
//									"홈페이지 : 시외버스통합예매 또는 버스타고" );
//					}
				}
// 20230820 삭제 yahan
//				// 20201019 yahan
//				// 안성, 평택, 공주 취소관련 팝업
//				if(
//						(deprCdCfm == "010" && arvlCdCfm == "130") || (deprCdCfm == "130" && arvlCdCfm == "010") || 
//						(deprCdCfm == "010" && arvlCdCfm == "180") || (deprCdCfm == "180" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "320") || (deprCdCfm == "320" && arvlCdCfm == "010") ||
//						
//						// 20201029 yahan 노선추가
//						// 안성중대, 안성풍림, 안성공도, 안성한경, 안성대림, 안성회관, 평택용이, 평택대
//						(deprCdCfm == "131" || arvlCdCfm == "131") ||
//						(deprCdCfm == "132" || arvlCdCfm == "132") ||
//						(deprCdCfm == "133" || arvlCdCfm == "133") ||
//						(deprCdCfm == "134" || arvlCdCfm == "134") ||
//						(deprCdCfm == "137" || arvlCdCfm == "137") ||
//						(deprCdCfm == "138" || arvlCdCfm == "138") ||
//						(deprCdCfm == "174" || arvlCdCfm == "174") ||
//						(deprCdCfm == "175" || arvlCdCfm == "175") 
//						){
//						alert("[알림]\n\n" +
//								"승차권을 대량으로 예매하여 반복적으로 취소할 경우\n" +
//								"다른 이용고객 피해 및 운수회사 업무를 방해하는\n" +
//								"행위로 간주되어 불이익을 당할 수 있음을\n" +
//								"양지해 주시기 바랍니다.");
//				}
				
//20220713 yahan 변경
//				// 20200908 yahan
//				if(
//						(deprCdCfm == "010" && arvlCdCfm == "449") || (deprCdCfm == "010" && arvlCdCfm == "450")
//						){
//						alert("제천하소행 고객께서는 ‘서울-제천하소＇로 조회하여 에매해주시길 바랍니다.\n" +
//								"\n" +
//								"1. 제휴할인 서비스\n" +
//								"　▶청풍호반케이블카 : 1,000원 할인\n" +
//								"　▶청풍랜드 : 2,000~3,000원 할인\n" +
//								"　▶청풍나루(유람선) : 2,000원 할인\n" +
//								"\n" +
//								"2. 이용방법\n" +
//								"　▶고속버스 모바일 티켓 또는 승차권 소지\n" +
//								"　▶출발일 기준 30일 이내에 방문하여야 할인 적용 가능\n" +
//								"\n" +
//								"3. 관련 노선\n" +
//								"　▶제천↔서울(경부)\n" +
//								"\n" +
//								"4. 이용방법 및 업체 상세정보 ‘코버스‘홈페이지(웹) 공지사항 참조\n" +
//								"\n" +
//								"※ 자세한 사항은 제천고속버스터미널 문의");
//					}

				// 20200902 yahan
				// 서울(010)-양양(270), 동서울(032)-양양(270)
				/*
				if (
						yymmddD0 <= 20200903 && 
						(
							(deprCdCfm == "010" && arvlCdCfm == "270") || 
							(deprCdCfm == "032" && arvlCdCfm == "270")
						)
					) {
					alert("★양양터미널 침수로 인해 9/2~9/3 양양을 운행하지 않습니다.");
				}
				*/

				// 20200831 yahan
				// 서울(010)-속초(230), 서울(010)-양양(270)
				// 동서울(032)-속초(230), 동서울(032)-양양(270)
				if(
						(deprCdCfm == "010" && arvlCdCfm == "270") || 
						(deprCdCfm == "010" && arvlCdCfm == "230") ||
						(deprCdCfm == "032" && arvlCdCfm == "270") || 
						(deprCdCfm == "032" && arvlCdCfm == "230") 
						){
					alert("[속초서핑 속초바다서프 제휴할인]\n\n" +
							"속초행 노선 이용시\n" +
							"서핑 입문강습 10% 할인\n" +
							"서핑보드 렌탈 10% 할인\n" +
							"바다서프카페 음료 10% 할인\n\n" +
							"예약문의 : 033-633-1611\n" +
							"속초해수욕장 남문 앞 바다서프");
				}

				// 20200803 yahan 도로침수로 인한 미운행 안내
				// 배방정류소337, 아산서부341, 아산온양340
//				if (
//						yymmddD0 == 20200803 && 
//						(
//							(deprCdCfm == "337" || arvlCdCfm == "337") || 
//							(deprCdCfm == "341" || arvlCdCfm == "341") || 
//							(deprCdCfm == "340" || arvlCdCfm == "340")
//						)
//					) {
//					alert("[아산서부(휴), 배방정류소 운행 일시 중단 알림]\n\n" +
//							"1. 중단사유 : 도로침수로 인한 정류장 미운행\n" +
//							"2. 대상노선 : 서울~아산, 인천~아산\n" +
//							"3. 적용일자 : 2020년 8월 3일(월)\n" +
//							" ※ 단, 도로사정 호전시 정상운행");
//				}
				
// 2021-1020 삭제
//				// 20210121 천안아산역343 -> 서울010 추가
//				// 20200730 yahan 아산탕정사무소(342), 천안3공단(346), 선문대(347), 탕정삼성LCD(349)
//				if(
//						(deprCdCfm == "010" && arvlCdCfm == "343") || (deprCdCfm == "343" && arvlCdCfm == "010") ||
//						(deprCdCfm == "342" || arvlCdCfm == "342") ||
//						(deprCdCfm == "346" || arvlCdCfm == "346") ||
//						(deprCdCfm == "347" || arvlCdCfm == "347") ||
//						(deprCdCfm == "349" || arvlCdCfm == "349")
//					){
//					// 20210114 삭제요청
////					alert("기존 아산탕정-서울남부 노선의 종착지가 서울경부와 서울남부로 분할되어 운행되오니 " +
////							"목적지와 시간을 다시한번 확인하여 주십시오.\n\n" +
////							"적용일자: 2020년 8월 10일 (월) 출발시간부터");
//					alert("서울남부-탕정삼성LCD노선의 기점이 서울경부로 변경되어 운행되오니 " +
//							"착오없으시길 바랍니다.\n\n" +
//							"적용일자: 2021년 1월 20일(수)부");
//				}
				
// 20230119 삭제
//				// 20200724 yahan 광양터미널 사업자 및 터미널 위치 변경
//				if( deprCdCfm == "520" ){
//					alert("[안내]\n" +
//							"광양터미널 위치가 8.3(월)부터 변경 됩니다.\n\n" +
//							"현재 : 인동숲 공영주차장 內(광양읍 인서리 238)\n" +
//							"변경 : 광양버스터미널 건물(광양읍 순광로 688)");
//							//20200804 yahan - 삭제요청
//							//"터미널 운영 사업자 변경에 따라 8.3(월)이후 예매는 8.3(월)부터 가능합니다.");
//				}
				
				// 20220318 삭제
				// 20200629 yahan
				// 서울~마장택지지구 증회 운행
//				if(
//						(deprCdCfm == "010" && arvlCdCfm == "171") || (deprCdCfm == "171" && arvlCdCfm == "010")
//					){
//					alert("[서울~마장택지지구 증회 운행]\n\n" +
//							"운행횟수 : 일 4회 -> 8회 (4회 증회)\n" +
//							"증회운행 : 2020년 7월 1일 (수) 부터");
//				}
				
				// 20200626 yahan
				// '20년 7월 11일(토) 부터 '김제' 노선 감회(7회->6회) 및 일부 배차시간 조정
				if(deprCdCfm == "020" && arvlCdCfm == "620"){
					alert("[알림] '센트럴시티' -> '김제' 노선 배차 시간이 조정되오니\n" +
							"예매 시 참고하시기 바랍니다.\n\n" +
							"*시행일 : 7/11(토)부터\n\n" +
							"<조정전>\n" +
							"06:40, 08:20, 10:50, 12:40, 15:10, 17:20, 19:30\n\n" +
							"<조정후>\n" +
							"06:40, 09:10, 11:40, 13:50, 16:30, 19:30");
				}

				
				// 20200528 yahan
				// 서울010 -> 원주240 노선팝업
				if(deprCdCfm == "010" && arvlCdCfm == "240"){
					alert("※원주문막행 고객께서는 '서울-원주문막'으로\n\n" +
							"조회하여 예매해주시기를 바랍니다.");
				}
				
// 20200521 삭제요청
//				// 20200520 안성 -> 서울
//				if(deprCdCfm == "130" && arvlCdCfm == "010"){
//					alert("[출퇴근 고객 주중 할인 이벤트]\n\n" +
//							"출퇴근 이용객의 교통편의 증진을 위하여, " +
//							"6월 3일부터 안성발 서울행 노선의 06시 35분과 06시 50분 차량의 요금을 " +
//							"아래와 같이 할인하오니, 많은 이용 바랍니다.\n" +
//							"- 노선 : 안성→서울 / 06시 35분, 06시 50분(월~금, 2회)\n" +
//							"- 요금할인 : 6,600원 -> 5,300원 (20% 할인)\n" +
//							"- 할인방법 : 대학생요금 선택하여 예매\n" +
//							"- 시행일자 : 6.3(월)\n" +
//							"※ 현장발권 적용 불가");
//				}
				
// 20240530 삭제
//				// 20200504
//				// 배방정류소337, 아산서부341, 천안아산역343 -> 서울010
//				if (
//						(deprCdCfm == "337" && arvlCdCfm == "010") || 
//						(deprCdCfm == "341" && arvlCdCfm == "010") || 
//						(deprCdCfm == "343" && arvlCdCfm == "010") ||
//						
//						// 20201029 yahan
//						//아산온양 <> 인천  중간정류장 탑승 안내 추가
//						(deprCdCfm == "340" && arvlCdCfm == "337") || (deprCdCfm == "337" && arvlCdCfm == "340") || 
//						(deprCdCfm == "340" && arvlCdCfm == "341") || (deprCdCfm == "341" && arvlCdCfm == "340") || 
//						(deprCdCfm == "340" && arvlCdCfm == "343") || (deprCdCfm == "343" && arvlCdCfm == "340") || 
//						(deprCdCfm == "340" && arvlCdCfm == "310") || (deprCdCfm == "310" && arvlCdCfm == "340") ||
//						
//						// 20240422 인천-천안-아산 정기권에 통합
//						//(deprCdCfm == "340" && arvlCdCfm == "100") || (deprCdCfm == "100" && arvlCdCfm == "340") ||
//						//(deprCdCfm == "337" && arvlCdCfm == "100") || (deprCdCfm == "100" && arvlCdCfm == "310") || 
//						//(deprCdCfm == "341" && arvlCdCfm == "100") || (deprCdCfm == "100" && arvlCdCfm == "337") ||
//						//(deprCdCfm == "310" && arvlCdCfm == "100") || (deprCdCfm == "100" && arvlCdCfm == "341") ||
//						(deprCdCfm == "343" && arvlCdCfm == "100") || (deprCdCfm == "100" && arvlCdCfm == "343")
//					) {
//					alert("※중간정류장 승차시 교통상황에 따라 예정된 출발시간이 다소 지연 될 수 있는점 양해 부탁드립니다.");
//				}
				
// 20250526 삭제
//				// 20200428
//				// 동광양525 -> 동서울030 032, 광양520 -> 동서울030 032, 동광양525 -> 센트럴020, 광양520 -> 센트럴020
//				// 4월30일 23시59분까지 
//				if (
//						yymmddD0 < 20200501 && 
//						(
//							(deprCdCfm == "525" && arvlCdCfm == "030") || (deprCdCfm == "525" && arvlCdCfm == "032") || (deprCdCfm == "525" && arvlCdCfm == "020") || 
//							(deprCdCfm == "520" && arvlCdCfm == "030") || (deprCdCfm == "520" && arvlCdCfm == "032") || (deprCdCfm == "520" && arvlCdCfm == "020")
//						)
//					) {
//					alert("저희 동광양터미널은 2020년 5월 1일자로 터미널운영사업자의 변경사유로 인해 " +
//							"5월 1일 이후 승차권의 인터넷, 모바일 예매를 일시 중지하게 되었습니다.\n" +
//							"고객님들께 불편을 끼쳐드리게 된 점 널리 양해하여 주시기 바랍니다. \n\n" +
//							"승차권 인터넷, 모바일 예매는 5월 1일 00시부터 가능하오니 많은 이용바랍니다.");
//				}
				
// 20220411 삭제
//				// yahan 20200401
//				// 인천공항 105, 117 -> 김해 735 / 김해 장유 736 / 양산 745 / 선산 812 813
//				if (
//						deprCdCfm == "105" || deprCdCfm == "117"
//					) {
//					alert("[인천공항 온라인 매표 금지안내]\n\n" +
//							"코로나19로 인하여 인천공항(T1,T2) 출발 노선은 해당 터미널 매표 창구에서만 가능합니다.");
//				}

// 20220718 삭제요청
//				// yahan 20200401
//				// 광주 500 -> 인천공항 105, 117 
//				if (
//						(deprCdCfm == "500" && arvlCdCfm == "105") ||
//						(deprCdCfm == "500" && arvlCdCfm == "117") 
//					) {
////					alert("[코로나19 관련 미운행노선 안내]\n\n" +
////							"코로나 19 예방과 차단을 위해 4월 1일부터 인천공항의 운행이 임시중단됩니다");
//					alert("인천공항 노선이 12월 20일부터 재 운행합니다.");
//				}
				
				// yahan 20200415
				// 세종연구단지 -> 서울, 세종연구단지 351 -> 죽전 118
				// 세종연구단지 정류장 위치 변경
				if (
						(deprCdCfm == "351" && arvlCdCfm == "010") || (deprCdCfm == "351" && arvlCdCfm == "118")
					) {
					alert("[세종연구단지 중간정류장 위치변경 안내]\n\n" +
							"변경전 : 세종국책연구단지 버스정류장(51-094)\n" +
							"변경후 : 수루배마을 1단지 103동 앞 간이 버스정류장\n" +
							"            (기존 정류장에서 300m 이내)"
							);
				}

// 20250226 삭제
//				// yahan 2020-03-25
//				// 서울～세종(연구단지노선) 경로변경 안내
//				if (
//						(deprCdCfm == "010" && arvlCdCfm == "352") || (deprCdCfm == "352" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "351") || (deprCdCfm == "351" && arvlCdCfm == "010")
//					) {
//					alert("[ 서울～세종(연구단지노선) 경로변경 안내 ]\n\n" +
//							"◦ 운송개시 : '20. 4. 1(수)\n" +
//							"◦ 노선경로 : 서울TR~죽전~국무조정실~세종연구단지~세종시청~세종TR");
//				}

				// yahan 20200826
				// 백암온천 등등 추가
				// yahan 20200317
				// 구인사-463, 영월-272, 영덕-843, 경북도청-852, 백암온천-856
//				if (
//						// 구인사
//						//(deprCdCfm == "463" || arvlCdCfm == "463") ||
//						
//						//20200422 yahan 영월, 경북도청 삭제
//						//(deprCdCfm == "852" || arvlCdCfm == "852") ||
//						//(deprCdCfm == "272" || arvlCdCfm == "272") ||
//						
//						//20200327 yahan 영덕노선 삭제
//						//(deprCdCfm == "843" || arvlCdCfm == "843") ||
//						
//						// 20200529 yahan 백암온천 삭제
//						//(deprCdCfm == "856" || arvlCdCfm == "856")
//						
//						// 20230311 삭제
//						//(deprCdCfm == "010" && arvlCdCfm == "460") || (deprCdCfm == "460" && arvlCdCfm == "010") || // 단양
//						
//						(deprCdCfm == "010" && arvlCdCfm == "463") || (deprCdCfm == "463" && arvlCdCfm == "010") || // 구인사
//						(deprCdCfm == "010" && arvlCdCfm == "844") || (deprCdCfm == "844" && arvlCdCfm == "010") || // 평해
//						(deprCdCfm == "010" && arvlCdCfm == "853") || (deprCdCfm == "853" && arvlCdCfm == "010") || // 울진
//						(deprCdCfm == "010" && arvlCdCfm == "854") || (deprCdCfm == "854" && arvlCdCfm == "010") || // 광비
//						(deprCdCfm == "010" && arvlCdCfm == "855") || (deprCdCfm == "855" && arvlCdCfm == "010") || // 삼근
//						(deprCdCfm == "010" && arvlCdCfm == "856") || (deprCdCfm == "856" && arvlCdCfm == "010") || // 백암온천
//						(deprCdCfm == "010" && arvlCdCfm == "857") || (deprCdCfm == "857" && arvlCdCfm == "010") || // 후포
//						(deprCdCfm == "010" && arvlCdCfm == "458") || (deprCdCfm == "458" && arvlCdCfm == "010") || // 평동
//						(deprCdCfm == "010" && arvlCdCfm == "459") || (deprCdCfm == "459" && arvlCdCfm == "010") || // 단양상진
//						(deprCdCfm == "010" && arvlCdCfm == "461") || (deprCdCfm == "461" && arvlCdCfm == "010") || // 사평리
//						(deprCdCfm == "010" && arvlCdCfm == "462") || (deprCdCfm == "462" && arvlCdCfm == "010")    // 영춘
//					) {
//					alert("[코로나19 관련 미운행노선 안내]\n\n" +
//							"현재 코로나19 장기화로 인하여 한시적으로 미운행을 하오니\n" +
//							"이용에 참고하시기 바랍니다.");
//							//"대상노선 : 구인사");
//							//"대상노선 : 구인사, 영월, 영덕, 경복도청, 백암온천");
//				}

				
				// yahan 2020-03-16
				if (
						// 인천-100, 속초-230 경유지추가-양양
						(deprCdCfm == "100" && arvlCdCfm == "230") || (deprCdCfm == "230" && arvlCdCfm == "100")
					) {
					alert("[인천-속초 노선 양양 경유 안내]\n\n" +
							"노선운행경로 : 인천-양양-속초\n" +
							"운송개시 : 2020.04.01(수)");
				}
				
// 20240530 삭제
//				// yahan 2020-01-21
//				// 아산서부(호서대) 출발시간 변경안내
//				if(deprCdCfm == "341"){
//					alert("[아산서부(호서대) 출발시간 변경안내]\n\n" +
//							  "기존 아산고속TR 출발시간 기준에서 정류소 출발시간으로 변경되어 " +
//							  "예매하신 시간은 아산서부 정류장 출발시간입니다. 출발시간을 다시 한번 확인 부탁드립니다.\n\n" +
//							  "적용일자 : 2020. 02. 01(토) 출발시간부터");
//				}

				
				// yahan 2020-01-17
				if(
						// 영통--> 횡성(휴)하행, 동해, 삼척 112 --> 238, 210, 220
						// 신갈시외 --> 횡성(휴)하행, 동해, 삼척 114 --> 238, 210, 220
						(deprCdCfm == "112" || deprCdCfm == "114") &&
						(arvlCdCfm == "238" || arvlCdCfm == "210" || arvlCdCfm == "220")
					){
					alert("[출발시간 지연안내]\n\n" +
							  "해당노선은 교통체증으로 인하여 출발 시간이 다소 늦어질 수 있습니다.\n" +
							  "양해 바랍니다.");
				}

				
				// 센트럴시티 - 충주 (yahan 2020-01-07)
				if(deprCdCfm == "020" && arvlCdCfm == "420" && yymmddD0 < 20200208){
					alert("< '충주' 노선 중간 정차지 운행>\n\n" +
							"1.정차지명 : 충주기업도시\n" +
							"2.운행횟수 : 1일/4회\n" +
							"3.운행시간 : 9:00 / 12:50 / 14:20 / 20:05\n\n" +
							"※상기 시간의 경우 '교통대' 중간 정차를 하지 않습니다.\n" +
							"  예매시 참고하시기 바랍니다.");
				}

// 2021-1020 삭제
//				// yahan 2019-12-26
//				if(
//						//서울(010)-아산온양(340),서울(010)-아산서부(341),서울(010)-천안아산(343)
//						(deprCdCfm == "010" && arvlCdCfm == "340") || (deprCdCfm == "340" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "341") || (deprCdCfm == "341" && arvlCdCfm == "010") ||
//						(deprCdCfm == "010" && arvlCdCfm == "343") || (deprCdCfm == "343" && arvlCdCfm == "010") ||
//						// 아산온양(340)→인천(100), 아산서부(341)→인천(100), 천안아산(343)→인천(100)
//						(deprCdCfm == "100" && arvlCdCfm == "340") || (deprCdCfm == "340" && arvlCdCfm == "100") ||
//						(deprCdCfm == "100" && arvlCdCfm == "341") || (deprCdCfm == "341" && arvlCdCfm == "100") ||
//						(deprCdCfm == "100" && arvlCdCfm == "343") || (deprCdCfm == "343" && arvlCdCfm == "100")
//					){
//					alert("[정류장 명칭 변경 안내]\n\n" +
//							  "2020. 1. 10(금)부로 정류장 명칭이 변경되오니 이용시 확인 부탁드립니다.\n" +
//							  "변경전 : 아산서부 → 변경후 : 아산서부(호서대)\n" +
//							  "※기존 정류장 위치 변동없음");
//				}
				
				
				if(deprCdCfm == "830" || deprCdCfm == "828") {
					//alert("2017년 6월 30일 부터\n\n <포항시청 앞 고속버스 간이 승차장 이용 일부 변경>\n\n1. 정류장 명칭 : 포항시청\n\n2. 정류장 코드 : 828\n\n3. 정류장 위치 : 포항시 남구 대이동 우체국 옆\n\n4. 분리 사유 : 인터넷 예매, 모바일 이용 편리\n\n5. 운행노선  : 포항시청 ↔ 서울경부\n\n                   포항시청 ↔ 대전복합\n\n                   포항시청 ↔ 광주전남\n\n                   포항시청 ↔ 선산휴게소 -운행중단(X)\n\n6. 출발시간  : 출발터미널 기준으로 약10 - 15분 후 승차\n\n7. 출발지 구분 안내\n\n   ┗ 포항       : 포항고속버스터미널(해도동)\n\n   ┗ 포항시청 : 포항시청 앞 간이 승차장\n\n8. 2016년 3월 31일 부\n\n   승차권 취소, 환불 약관 수수료 개정\n\n   ┗ 출발 2일전                 :         없음\n\n   ┗ 출발 1일전 ~ 1시간 전  :    5% 공제\n\n   ┗ 출발 전 1시간 이내      :   10% 공제\n\n   ┗ 출발 후 목적지 도작 전 :   30% 공제\n\n   ┗ 출발 후 목적지 도착 후 : 100% 공제");
					alert("[포항시청 앞 고속버스 간이 승차장 이용안내]\n\n" +
							"1. 간이 승차장 명칭 :  포항시청\n\n" +
							"2. 간이 승차장 코드 : 828\n\n" +
							"3. 운행노선\n" +
							"- 포항시청 → 서울경부\n" +
							"- 포항시청 → 대전복합\n" +
							"- 포항시청 → 전남광주\n" +
							"- 포항시청 → 낙동강(상)휴게소 / 환승\n" +
							"    환승지역 : 동서울, 인천, 용인, 성남, 청주\n\n" +
							"4. 포항시청 간이 승차장 위치 → 포항시 남구 대이동 우체국 옆\n\n" +
							"5. 승차권 구입방법\n- 차량 단말기의 교통신용카드 즉시 결재 승차\n" +
							"- 스마트폰 앱'고속버스모바일' → 조회, 구입, 취소 편리\n\n" +
							"6. 경로우대 20% 할인\n" +
							" - 포항→서울경부 / 포항시청→서울경부 우등에 한하며\n" +
							"- 모바일, 종이승차권→포항고속버스터미널→신분증 확인→할인매표\n\n" +
							"7. 승차시간\n" +
							"승차권의 출발시간은 출발 터미널 기준으로 약 10분 후 승차\n\n" +
							"8. 승차지 구분\n" +
							"- 포항고속버스터미널 출발지 승차권으로 간이 경유지 승차는 불가 \n" +
							"└> 출발지 : 포항 → 서울경부\n" +
							"└> 경유지 : 포항시청 → 서울경부는 구분 승차 됩니다.\n\n" +
							"9. 임시차는 포항고속버스터미널 만 승차되며 포항시청 앞 간이 승차장을 경유하지 않습니다.\n\n" +
							"10. 운송약관 요약\n" +
							"다음의 경우는 승차를 거절 할 수 있습니다.\n" +
							"가. 만취자 또는 신변이 불결한 자\n" +
							"나. 인화성 물질과 승객에게 불쾌감을 주는 물품 소지자\n" +
							"다. 중환자의 단독여행 또는 전염성 환자\n" +
							"라. 안전 운행을 위한 승무원 요구에 불응하는 자\n");
				}
				
//				if((deprCdCfm == "010" && arvlCdCfm == "400") || (deprCdCfm == "400" && arvlCdCfm == "010")){
//					alert("[공지]서울~청주 우등요금변경 안내\n\n\n◎변경일시 : 2017년 6월30일(금)\n\n◎변경(적용) 우등 요금\n   -변경전 : 주간 8,800원(정상요금11,200원의 21.4%할인) /\n               심야  9,800원(정상요금의22.0%할인)\n   -변경후 : 주간 9,800원(정상요금11,200원의 12.5%할인) /\n               심야 10,700원(정상요금의 13.0%할인)");
//				}
//				if((deprCdCfm == "010" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "010")){
//					alert("[서울-진주 우등형 할인율 조정 안내]\n2018.2.1(목)부로 현 고속업계는 운용비용 지속상승[인권비, 유류비]과\n고속열차[KTX, SRT]확대개통 등 전반적인 영업환경이 악화되어\n부득이하게 서울-진주 노선 우등형 할인요금 조정이 시행하게 되었습니다.\n이점 해량하여 주시기 바라며, 더 나은 고객서비스와 안전운행으로 보답하겠습니다.\n\n※ 인상내용(정상요금: 29,000원) ※\n- 할인율: 20%(변경 전) → 7% (변경후) \n- 할인요금: 23,000원(변경 전) → 27,000원(변경후)\n- 시행일자 : 2018.2.1 부터\n\n[서울-진주 프리미엄 요금 안내]\n프리미엄 버스에 대해서는 정상요금에서 주중, 주말 할인요금을 상시 적용하오니 많은 이용 부탁드립니다.\n프리미엄 : 주중, 주말 15% 상시 할인시행(2017.11.1 부터)\n- 주중 37,700원→29,000원\n- 주말 37,700원→32,000원​");
//				}
				if(
						(deprCdCfm == "312" && arvlCdCfm == "700") || (deprCdCfm == "388" && arvlCdCfm == "700") ||
						(deprCdCfm == "312" && arvlCdCfm == "020") || (deprCdCfm == "388" && arvlCdCfm == "020") ||	
						(deprCdCfm == "312" && arvlCdCfm == "716") || (deprCdCfm == "388" && arvlCdCfm == "716") ||
						(deprCdCfm == "312" && arvlCdCfm == "715") || (deprCdCfm == "388" && arvlCdCfm == "715") ||
						(deprCdCfm == "389" && arvlCdCfm == "020") || (deprCdCfm == "390" && arvlCdCfm == "020") ||
						(deprCdCfm == "398" && arvlCdCfm == "020") || (deprCdCfm == "399" && arvlCdCfm == "020") ||
						(deprCdCfm == "396" && arvlCdCfm == "020") || (deprCdCfm == "397" && arvlCdCfm == "020")
					){
					alert("[예매 시 주의사항]\n예매 승차권은 예매 시 출발지로 선택한 곳에서만 발권과 승차가 가능함을 알려드립니다.");
				}
				
				if((deprCdCfm == "010" && arvlCdCfm == "352") || (deprCdCfm == "352" && arvlCdCfm == "010") ||
				   (deprCdCfm == "010" && arvlCdCfm == "353") || (deprCdCfm == "353" && arvlCdCfm == "010")){
				//->	alert("* 서울-세종 요금할인율 조정 : 17% -> 9%\n  8.21(월)부터 시행\n* 정상요금(우등) : 12,100원\n  변경전 할인요금(17%) :10,000원\n  변경후 할인요금(9%) : 11,000원\n  심야 : 11,000원 -> 12,100원\n* 타 노선은 조정 없습니다.");
				}
				
				if((deprCdCfm == "150" && arvlCdCfm == "010") || (deprCdCfm == "149" && arvlCdCfm == "010")){
					if(deprDtmChk < 20180108){
						alert("[용인유림동 중간정류소 매표소 업무 중단 안내]\n" +
								"서울-용인 노선 중간정류소인 용인유림동 매표소 업무가 중단됨에 따라\n" +
								"모바일 승차권과 차량내 단말기를 이용한 발권과 탑승이 가능하오니\n" +
								"이용에 참조하시기 바랍니다.");
					}
				}
				
// 20230830 삭제
//				if((deprCdCfm == "020" && arvlCdCfm == "629") || (deprCdCfm == "629" && arvlCdCfm == "020") 
//					|| (deprCdCfm == "020" && arvlCdCfm == "630") || (deprCdCfm == "630" && arvlCdCfm == "020")
//					|| (deprCdCfm == "032" && arvlCdCfm == "629") || (deprCdCfm == "629" && arvlCdCfm == "032")
//					|| (deprCdCfm == "032" && arvlCdCfm == "630") || (deprCdCfm == "630" && arvlCdCfm == "032")){
////					alert("[공지] 정읍노선 요금할인 안내\n\n" +
////							"노선 : 서울-정읍, 동서울-정읍 / 태인포함\n" +
////							"대상 : 중.고.대학생, 경로(만65세이상) 20%\n" +
////							"시행일자 : 2018년 2월 1일부터\n" +
////							"할인 승차 시 신분증(학생증)을 제시하시기 바랍니다.");
//					
//					// yahan 2022-09-13 
//					// 동서울-정읍 삭제
//					// yahan 2020-01-21
//					// [중앙고속] 서울・동서울-정읍노선 할인대상 변경
//					alert("[공지] 정읍노선 할인대상 변경안내\n\n" +
//							"노선 : 서울-정읍 / 태인포함\n" +
//							"대상 : 중.고등학생 20%\n" +
//							"등급 : 일반고속\n" +
//							"시행일자 : 2020년 2월 1일부터\n" +
//							"할인 승차 시 신분증(학생증)을 제시하시기 바랍니다.");
//				}
				
//				// 서울경부 - 천안 (18.02.28)
//				if((deprCdCfm == "010" && arvlCdCfm == "310") || (deprCdCfm == "310" && arvlCdCfm == "010")){
//				//->	alert("[우등고속 추가 운행 안내]\n\n◎ 운행개시 : 2018.2.28(수)부터\n◎ 운행회수 : 일 19회 운행\n◎ 운임 : 7,100원(청소년,대학생 30%할인)\n◎ 운행업체 : 동양고속");
//				}
				
// 20240530 삭제
//				// 서울-아산탕정 (18.5.4)-18.12.18 변경
//				if((deprCdCfm == "342" && arvlCdCfm == "050") || (deprCdCfm == "342" && arvlCdCfm == "119") || (deprCdCfm == "342" && arvlCdCfm == "118") 
//						|| (deprCdCfm == "119" && arvlCdCfm == "342") || (deprCdCfm == "119" && arvlCdCfm == "347") || (deprCdCfm == "119" && arvlCdCfm == "346")
//						|| (deprCdCfm == "119" && arvlCdCfm == "343") || (deprCdCfm == "119" && arvlCdCfm == "349")
//						|| (deprCdCfm == "118" && arvlCdCfm == "342") || (deprCdCfm == "118" && arvlCdCfm == "347") || (deprCdCfm == "118" && arvlCdCfm == "346")
//						|| (deprCdCfm == "118" && arvlCdCfm == "349") || (deprCdCfm == "118" && arvlCdCfm == "343")
//						|| (deprCdCfm == "349" && arvlCdCfm == "050") || (deprCdCfm == "349" && arvlCdCfm == "119") || (deprCdCfm == "349" && arvlCdCfm == "118")
//						|| (deprCdCfm == "346" && arvlCdCfm == "050") || (deprCdCfm == "346" && arvlCdCfm == "119") || (deprCdCfm == "346" && arvlCdCfm == "118")
//						|| (deprCdCfm == "343" && arvlCdCfm == "050") || (deprCdCfm == "343" && arvlCdCfm == "119") || (deprCdCfm == "343" && arvlCdCfm == "118")
//						|| (deprCdCfm == "347" && arvlCdCfm == "050") || (deprCdCfm == "347" && arvlCdCfm == "119") || (deprCdCfm == "347" && arvlCdCfm == "118")){
//					//alert("[운행시간 변경안내]\n시간표가 아래와 같이 변경되오니 이용에 참고하시기 바랍니다.\n◎변경일자: 2018.5.18(금)\n◎변경시간: \n- 서울남부 출발(19:40 -> 20:00)\n- 아산탕정 출발(16:30 -> 17:00)");
//					alert("[중간정차 추가안내]\n" +
//							"중간정류장이 아래와 같이 추가되오니 이용에 참고하시기 바랍니다.\n" +
//							"변경일자 : 2018.12.27(목)\n" +
//							"변경내용 : 서울남부-죽전-신갈-천안3공단-천안아산역-선문대-아산탕정사무소-탕정삼성LCD");
//				}
				
// 20221104 삭제
//				// 센트럴시티 - 정읍(태인) (18.05.21)
//				if((deprCdCfm == "020" && arvlCdCfm == "630") || (deprCdCfm == "630" && arvlCdCfm == "020") || (deprCdCfm == "020" && arvlCdCfm == "629") || (deprCdCfm == "629" && arvlCdCfm == "020")){
//					alert("2018.6.11(월)부터 센트럴시티~정읍(태인) 노선의 운행시간이 일부 조정되오니 이용에 참고 부탁드립니다.\n○ 조정내용 : 첫차/막차 및 일부 배차시간 조정\n＊첫차 : 06:20 → 07:00\n＊막차 : 22:30 → 21:30 / 금,토,일(22:30 동일)");
//				}

// 20240627 임의삭제 - 너무오래 된듯
//				// 센트럴시티 - 영산포(나주) (18.05.21)
//				if((deprCdCfm == "020" && arvlCdCfm == "565") || (deprCdCfm == "565" && arvlCdCfm == "020") || (deprCdCfm == "020" && arvlCdCfm == "530") || (deprCdCfm == "530" && arvlCdCfm == "020")){
//					alert("2019.10.21(월)부터 센트럴시티~영산포(나주) 노선의 운행시간이 일부 조정되오니 이용에 참고 부탁드립니다. ");
//				}
//				
//				// 센트럴시티 - 영광 (18.05.21)
//				if((deprCdCfm == "020" && arvlCdCfm == "560") || (deprCdCfm == "560" && arvlCdCfm == "020")){
//					alert("2018.6.1(금)부터 센트럴시티~영광 노선의 운행시간이 일부 조정되오니 이용에 참고 부탁드립니다.");
//				}
//				
//				// 광주 <-> 마산내서 (18.08.09)
//				if(((deprCdCfm == "500" && arvlCdCfm == "706")||(deprCdCfm == "706" && arvlCdCfm == "500")) && yymmddD0 < 20180823){					
//					alert("2018.8.14(화)자로 마산내서 운행시간이 변경되오니, 이용에 차질이 없도록 변경된 시간을 확인하여 주시기 바랍니다.");
//				}
				
				// 고양백석 -> 동대구 (18.08.29)
//				if(deprCdCfm == "116" && arvlCdCfm == "801"){					
//					alert("2018.10.1 일자로 고양백석발 동대구행 노선이 \n- 홈페이지 : KOBUS -> Bustago\n- 모바일 : 고속버스모바일 -> 버스타고 로 변경됩니다.\n기존 이용승객들께서는 확인하시고 이용부탁드립니다.");
//				}
				
// 20240627 임의삭제 - 너무오래 된듯
//				// 부천 -> 동대구 (18.08.29)
//				if(deprCdCfm == "101" && arvlCdCfm == "801"){					
//					alert("2018.10.1 일자로 부천발 동대구행 노선이 \n- 홈페이지 : KOBUS -> Bustago\n- 모바일 : 고속버스모바일 -> 버스타고 로 변경됩니다.\n기존 이용승객들께서는 확인하시고 이용부탁드립니다.");
//				}
				
				// 동대구 -> 부천 (18.08.29)
//				if(deprCdCfm == "801" && arvlCdCfm == "101"){					
//					alert("2018.10.1 일자로 동대구발 부천행 노선이 \n- 홈페이지 : KOBUS -> Bustago\n- 모바일 : 고속버스모바일 -> 버스타고 로 변경됩니다.\n기존 이용승객들께서는 확인하시고 이용부탁드립니다.");
//				}
				
// 20240627 임의삭제 - 너무오래 된듯
//				// 동대구 -> 고양백석 (18.08.29)
//				if(deprCdCfm == "801" && arvlCdCfm == "116"){					
//					alert("2018.10.1 일자로 동대구발 고양백석행 노선이 \n- 홈페이지 : KOBUS -> Bustago\n- 모바일 : 고속버스모바일 -> 버스타고 로 변경됩니다.\n기존 이용승객들께서는 확인하시고 이용부탁드립니다.");
//				}
				
				// 동대구 -> 제천 (18.08.27)
//				if(deprCdCfm == "801" && arvlCdCfm == "450"){					
//					alert("2018.9.1 일자로 동대구발 제천행 노선이 \n- 홈페이지 : KOBUS -> Bustago\n- 모바일 : 고속버스모바일 -> 버스타고 로 변경됩니다.\n기존 이용승객들께서는 확인하시고 이용부탁드립니다.");
//				}
				
				// 부천 <-> 정안(휴)하행, 부천->논산, 부천->연무대 (18.08.29)
				if((deprCdCfm == "101" && arvlCdCfm == "315") || (deprCdCfm == "101" && arvlCdCfm == "370") || (deprCdCfm == "101" && arvlCdCfm == "380")){					
					alert("김포공항 출발차량의 도로사정에 따라 부천 출발시간이 지연될 수 있습니다.");
				}
				
				// 인천->익산, 센트럴 -> 익산 (18.09.21)
				if((deprCdCfm == "100" && arvlCdCfm == "615") || (deprCdCfm == "020" && arvlCdCfm == "615")){
					alert("익산공단에서 하차 불가하오니 이용에 참고하시기 바랍니다.");
				}
				
				// 인천-> 정안(휴)하행, 정안(휴)상행 -> 인천 (18.10.24)
				/*if((deprCdCfm == "100" && arvlCdCfm == "315") || (deprCdCfm == "316" && arvlCdCfm == "100")){					
					alert("해당 노선은 안산을 경유하여 추가 소요시간(30분 이상)이 발생하오니,\n확인 후 이용하시기 바랍니다.");
				}*/
				
				// 서울<->속초, 동서울<->강릉, 고양(화정,백석)<->강릉, 동서울<->속초, 인천<->속초 (18.11.15)
				if(
					//	(deprCdCfm == "010" && arvlCdCfm == "230") || (deprCdCfm == "230" && arvlCdCfm == "010")
					//	|| (deprCdCfm == "032" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "032")
						(deprCdCfm == "115" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "115")
						|| (deprCdCfm == "116" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "116")
					//	|| (deprCdCfm == "032" && arvlCdCfm == "230") || (deprCdCfm == "230" && arvlCdCfm == "032")
					//	|| (deprCdCfm == "100" && arvlCdCfm == "230") || (deprCdCfm == "230" && arvlCdCfm == "100")
					){					
					alert("■ 롯데렌터카 업무제휴(할인) 안내\n" +
							"동부고속, 중앙고속이 운행하는고속버스 노선을 이용 시\n" +
							"이용객에 한해 롯데렌터카를 할인가격으로 이용 하실 수 있으니\n" +
							"많은 이용 바랍니다.\n\n" +
							"○ 당일 이용승차권(종이,모바일) 제시 시 50% 할인\n" +
							"○ 롯데렌터카 할인 이용방법\n" +
							"   1. 롯데렌터카 예약매체(홈페이지, 모바일 앱)를 통해\n" +
							"      사전예약 후 지점 방문하면 할인율 제공\n" +
							"   2.예약 없이 당일 지점 방문하여 현장에서 대여 시에도\n" +
							"      할인율 제공\n" +
							"  (※ 보유차량이 모두 대여될 경우 대여가 불가하니 사전 예약 권장)\n" +
							"   3.롯데렌터카 강릉 또는 속초 지점 방문 시 대상노선 당일\n" +
							"    이용승차권(종이,모바일) 제시\n" +
							"○ 롯데렌터카 이용안내\n" +
							" - 강릉지점:033-642-8000│속초지점:033-632-8000");
				}
				
				// 서울 <-> 강릉 (18.12.18 변경)
				/*if((deprCdCfm == "010" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "010")){
					if(deprDtmChk < 20190101){
						alert("[서울-강릉 노선 해돋이 임시차 투입안내]\n- 일시 : 2019년 1월 1일 \n- 시간 : 00:05 ~ 02:00\n많은 이용 부탁드립니다.");
					}else{
						alert("■ 롯데렌터카 업무제휴(할인) 안내\n동부고속이 운행하는고속버스 노선을 이용 시 이용객에 한해 \n롯데렌터카를 할인가격으로 이용 하실 수 있으니 많은 이용 바랍니다.\n\n○ 당일 이용승차권(종이,모바일) 제시 시 50% 할인\n○ 롯데렌터카 할인 이용방법\n   1. 롯데렌터카 예약매체(홈페이지, 모바일 앱)를 통해 사전예약 후\n      지점 방문하면 할인율 제공\n   2.예약 없이 당일 지점 방문하여 현장에서 대여 시에도 할인율 제공\n      (※ 보유차량이 모두 대여될 경우 대여가 불가하니 사전 예약 권장)\n   3.롯데렌터카 강릉 또는 속초 지점 방문 시 대상노선 당일\n      이용승차권(종이,모바일) 제시\n○ 롯데렌터카 이용안내\n - 강릉지점:033-642-8000│속초지점:033-632-8000");
					}
				}*/
				
// 20240627 임의삭제 - 너무오래 된듯
//				// 센트럴시티-> 부안 (18.12.5)
//				if(deprCdCfm == "020" && arvlCdCfm == "640"){					
//					alert("[운행 변경 공지 안내]\n- 시행일자 : 2018.12.17(월)부터\n- 1일/16회 운행\n조정전 : 31석(9회), 41석(7회) 일반고속 운행\n조정후 : 41석 일반고속(7회), 28석 우등고속(9회)\n- 일반고속(41석) : 14,300(변경없음)\n- 우등고속(28석) : 19,500원(신규운행)");
//				}
				
				//서울- 동해, 동서울 - 동해(18.12.12)
				/*if((deprCdCfm == "010" && arvlCdCfm == "210") || (deprCdCfm == "210" && arvlCdCfm == "010") || (deprCdCfm == "032" && arvlCdCfm == "210") || (deprCdCfm == "210" && arvlCdCfm == "032")){
					alert("[동해고속버스터미널 통합 이전]\n○ 터미널 : 동해고속버스터미널(강원도 동해시 부곡로 1) \n    → 동해시종합버스터미널(강원도 동해시 동해대로 5443)\n○ 운행개시 : 2018.12.27(목)부터\n○ 노선문의 : 033-572-7444, 033-532-3800");
				}*/
				
// 20240627 임의삭제 - 너무오래 된듯
//				//동해-> 동서울, 삼척 -> 동서울(18.12.26)
//				if((deprCdCfm == "210" && arvlCdCfm == "032") || (deprCdCfm == "220" && arvlCdCfm == "032") || (deprCdCfm == "032" && arvlCdCfm == "210") || (deprCdCfm == "032" && arvlCdCfm == "220")){
//					alert("[운행공지]\n○ 내용 : 동서울 행 첫차 변경\n○ 시간 : 삼척-동서울 06:00 → 05:50\n           동해-동서울 06:25 → 06:15\n○ 변경일 : 2018.12.27\n○ 노선문의 : 033-531-3400");
//				}
				
// 20240530 삭제
//				//서울-평택-안중(18.12.27)
//				if((deprCdCfm == "010" && arvlCdCfm == "180") || (deprCdCfm == "180" && arvlCdCfm == "010") || (deprCdCfm == "010" && arvlCdCfm == "177") || (deprCdCfm == "177" && arvlCdCfm == "010") || (deprCdCfm == "180" && arvlCdCfm == "177") || (deprCdCfm == "177" && arvlCdCfm == "180")){
//					alert("[서울-평택 노선 종점연장 안내]\n" +
//							"○ 운행노선 : 서울-평택-안중\n" +
//							"○ 변경사항 : 안중TR 종점연장\n" +
//							"○ 운행개시 : 2019.1.2(수)부터\n" +
//							"○ 운행회수 : 일 8회 운행");
//				}
				
// 20240530 삭제
//				//평택용이동-서울, 평택대-서울(19.01.03)
//				if((deprCdCfm == "175" && arvlCdCfm == "010") || (deprCdCfm == "174" && arvlCdCfm == "010")){
//					//alert("[노선 운행 안내]\n안중출발 차량은 예매하신 시간 10분전에 평택터미널에서 출발 합니다.\n평택출발 차량은 예매하신 시간이 평택터미널 출발시간 입니다.");
//					alert("[노선 운행 안내]\n" +
//							"평택대, 용이동에서 예매하신 시간은 평택터미널 출발시간입니다.\n" +
//							"반영일자 : 2019.3.1 부터");
//				}
				
				//광주-인천공항 T1,T2, 부산사상(19.01.07)
				if((deprCdCfm == "500" && arvlCdCfm == "105") || (deprCdCfm == "500" && arvlCdCfm == "117") || (deprCdCfm == "500" && arvlCdCfm == "703") || (deprCdCfm == "703" && arvlCdCfm == "500")){
					alert("해당노선은 프리미엄 마일리지 적립 및 사용불가 노선입니다.");
				}
				
// 20240627 임의삭제 - 너무오래 된듯
//				//센트럴시티->청주(19.01.08) ~1/31 까지
//				if(deprCdCfm == "020" && arvlCdCfm == "401" && yymmddD0 < 20190201){
//					alert("노선: 센트럴시티(서울)→청주(센트럴)\n" +
//							"회사: 서울,새서울고속\n내용\n" +
//							"- 조정전: 1일/19회(월~일)\n" +
//							"- 조정후: 1일/24회(월~목)\n" +
//							"            1일/26회(금~일)\n" +
//							"* 일부 시간 조정 및 22:00 심야 운행\n" +
//							"일자: 2019.1.11(금)부터");
//				}
				
//				//여수
//				if(deprCdCfm == "510"){
//					alert("여수터미널 출발 승차권을 가지고 중간(여천)경유지 승차는 불가합니다.");
//				}
				// 20201103 yahan
				// 여수 -> 서부산, 섬진강, 수원노선 안내
				if(
						(deprCdCfm == "510" && arvlCdCfm == "703") ||  
						(deprCdCfm == "510" && arvlCdCfm == "528") || (deprCdCfm == "510" && arvlCdCfm == "529") ||
						(deprCdCfm == "510" && arvlCdCfm == "110")  
						){
						alert("[여수발 부산사상,섬진강,수원방면 안내]\n\n" +
								"여수터미널 출발 승차권을 구매한 경우 여천정류장에서 승차가 불가하오니 " +
								"확인하시고 이용부탁드립니다.");
				}
				
				//서울(010)<->청주(400) : 190329 삭제
				/*if((deprCdCfm == "010" && arvlCdCfm == "400") || (deprCdCfm == "400" && arvlCdCfm == "010")){
					alert("서울~청주 대학생 할인요금 제도를 3/1부로 종료됩니다.\n고속버스 업계에서는 타 할인 제도를 시행예정이오니, 양해하여 주시기 바랍니다.");
				}*/
				
				// 20200908 yahan 삭제
				//서울(010)-제천(450),서울(010)-제천하소(449) : 190314
				/*
				if((deprCdCfm == "010" && arvlCdCfm == "449") || (deprCdCfm == "449" && arvlCdCfm == "010") 
					|| (deprCdCfm == "010" && arvlCdCfm == "450") || (deprCdCfm == "450" && arvlCdCfm == "010")){
					alert("[제천 하소동 현장 발권 임시 중단]\n1) 중단기간 : 2019.3.14.(목) ~ 3.28(목) 15일간\n2) 내용 : 제천 하소동 현장 발권 임시 중단에 따라 고속버스 모바일 앱 또는 코버스 홈페이지에서 예매를 해주시기 바랍니다.\n3) 현장발권 : 2019.3.29.(금)부터 가능");
				}
				*/
				
				//동대구(801)-울산(715): 190314
				/*if((deprCdCfm == "801" && arvlCdCfm == "715") || (deprCdCfm == "715" && arvlCdCfm == "801")){
					alert("[공지사항]\n대구~울산 노선의 시간이 변경 되어 안내드리오니, 참고하시\n이용하여 주시기 바랍니다.\n1. 변경적용일자: 2019.3.15~\n2. 변경 내용\n- 22시 30분 -> 22시 20분 \n- 23시 30분 -> 23시 20분");
				}*/
				
//----------------------------------------
// 20221102 삭제 std
//				//서울(010)-구미(810) : 190314
//				if((deprCdCfm == "010" && arvlCdCfm == "810") || (deprCdCfm == "810" && arvlCdCfm == "010")){
//					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n우등 : 23,100원 → 22.000원(5% 할인요금 적용)");
//				}
//				
//				//서울(010)-진주(722) : 190314				
//				if((deprCdCfm == "010" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "010") || (deprCdCfm == "010" && arvlCdCfm == "723") || (deprCdCfm == "723" && arvlCdCfm == "010")){
//					alert("​2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n프리(주중) : 40,600원 → 34.000원(16% 할인요금 적용)");
//				}	
//				
//				//서울(010)-창원(710), 서울(010)-창원역(711) : 190314				
//				if((deprCdCfm == "010" && arvlCdCfm == "710") || (deprCdCfm == "710" && arvlCdCfm == "010")
//					|| (deprCdCfm == "010" && arvlCdCfm == "711") || (deprCdCfm == "711" && arvlCdCfm == "010")){
//					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n프리(주중) : 43,400원 → 36,900원(15% 할인요금 적용)\n프리(주말) : 43,400원 → 39,100원(10% 할인요금 적용)");
//				}
//				
//				//서울(010)-마산(706), 서울(010)-마산내서(706): 190314
//				if((deprCdCfm == "010" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "010")
//					|| (deprCdCfm == "010" && arvlCdCfm == "706") || (deprCdCfm == "706" && arvlCdCfm == "010")){
//					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n프리(주중) : 42,900원 → 36,500원(15% 할인요금 적용)\n프리(주말) : 42,900원 → 38,600원(10% 할인요금 적용)");
//				}
//				
//				//동서울(032)-진해(704) : 190314
//				if((deprCdCfm == "032" && arvlCdCfm == "704") || (deprCdCfm == "704" && arvlCdCfm == "032")){
//					alert("2019. 3. 8(금)부터 아래와 같이 할인요금을 적용합니다.\n프리(주중) : 44,700원 → 38.000원(15% 할인요금 적용)\n프리(주말) : 44,700원 → 40.000원(10% 할인요금 적용)");
//				}
//				
//				//동서울(032)-마산(705) : 190314
//				if((deprCdCfm == "032" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "032")
//					|| (deprCdCfm == "032" && arvlCdCfm == "706") || (deprCdCfm == "706" && arvlCdCfm == "032")){
//					alert("2019. 3. 8(금)부터 아래와 같이 할인요금을 적용합니다.\n프리(주중) : 43,600원 → 37.000원(15% 할인요금 적용)\n프리(주말) : 43,600원 → 39.000원(10% 할인요금 적용)");
//				}
//				
//				//인천(100)-진주(722) : 190314
//				if((deprCdCfm == "100" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "100") || (deprCdCfm == "100" && arvlCdCfm == "723") || (deprCdCfm == "723" && arvlCdCfm == "100")
//						 || (deprCdCfm == "100" && arvlCdCfm == "724") || (deprCdCfm == "724" && arvlCdCfm == "100")){
//					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n우등 : 33,000원 → 31,500원(4.5% 할인요금 적용)");
//				}
//				
//				//수원(110)-서부산(703) : 190314
//				if((deprCdCfm == "110" && arvlCdCfm == "703") || (deprCdCfm == "703" && arvlCdCfm == "110")){
//					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n우등 : 35,500원 → 33,800원(4.7% 할인요금 적용)");
//				}
//				
//				//고양화정(115)-진주(722), 고양백석(116)-진주(722) : 190314
//				if((deprCdCfm == "115" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "115")
//					|| (deprCdCfm == "116" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "116")){
//					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n우등 : 35,900원 → 33,000원(8% 할인요금 적용)");
//				}
//				
//				//전주(602)-부산(700) : 190314
//				if((deprCdCfm == "602" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "602")){
//					alert("우등 3.1(금)/프리미엄 3.11(월)부터 아래와 같이 할인요금을 적용합니다.\n우등 : 26,200원 → 24,900원(5% 할인요금 적용)\n프리(주중) : 32,300원 → 27,500원(15% 할인요금 적용)\n프리(주말) : 32,300원 → 29,100원(10% 할인요금 적용)");
//				}
				
				//동대구(801)-진해(704) : 190314
				if((deprCdCfm == "801" && arvlCdCfm == "704") || (deprCdCfm == "704" && arvlCdCfm == "801")){
					var ter_txt = ""; 
					if((deprCdCfm == "801")) ter_txt = "동대구터미널 출발 승차권을 가지고 중간경유지 승차는 불가합니다.\n\n"; 
					alert(	ter_txt + 
							"현재 할인요금을 적용중이나 운영의 어려움으로 3.1(금)부로 할인율을 조정하고 운수사업법 제8조에 의거 시외직행 우등요금을 적용합니다.\n" +
							// 20221102 삭제
							//"대구-진해(우등) : 13,500원 → 12,000원(11% 할인요금 적용)"
							"");
				}
				
				//동대구(801)-마산(705) : 190314
				if((deprCdCfm == "801" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "801")){
					var ter_txt = "마산터미널 출발 승차권을 가지고 중간경유지 승차는 불가합니다.\n\n";
					if((deprCdCfm == "801")) ter_txt = "동대구터미널 출발 승차권을 가지고 중간경유지 승차는 불가합니다.\n\n"; 
					alert(	ter_txt + 
							"현재 할인요금을 적용중이나 운영의 어려움으로 3.1(금)부로 할인율을 조정하고 운수사업법 제8조에 의거 시외직행 우등요금을 적용합니다.\n" +
							// 20221102 삭제
							//"대구-마산(우등) : 11,100원 → 10,500원(5.4% 할인요금 적용)"
							"");
				}
//// 20220411 삭제
////				//인천공항T1(105)-김해(735),인천공항T2(117)-김해(735) : 190314
////				if((deprCdCfm == "105" && arvlCdCfm == "735") || (deprCdCfm == "735" && arvlCdCfm == "105")
////					|| (deprCdCfm == "117" && arvlCdCfm == "735") || (deprCdCfm == "735" && arvlCdCfm == "117")){
////					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n프리(주중/주말) : 58,100원 → 52.300원(10% 상시할인요금 적용)");
////				}
//				
//				//인천(100)-김해(735) : 190314
//				if((deprCdCfm == "100" && arvlCdCfm == "735") || (deprCdCfm == "735" && arvlCdCfm == "100")){
//					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n프리(주중/주말) : 48,800원 → 43.900원(10% 상시할인요금 적용)");
//				}
//				
//				//서울(010)-아산온양(340),서울(010)-아산서부(341) : 190314
//				if((deprCdCfm == "010" && arvlCdCfm == "340") || (deprCdCfm == "340" && arvlCdCfm == "010")
//					|| (deprCdCfm == "010" && arvlCdCfm == "341") || (deprCdCfm == "341" && arvlCdCfm == "010")){
//					alert("2019. 3. 1(금)부터 아래와 같이 할인요금을 적용합니다.\n고속 : 8,200원 → 7,400원(9.8% 할인요금 적용)");
//				}
// 20221102 삭제 end
//---------------------------------
				
				//서대구(805) : 190329
				if(deprCdCfm == "805"){
					alert("해당시간은 동대구(기점) 출발시간입니다.\n서대구(중간정차지)에서는 약 10~20분 후 출발 예정입니다.\n도로사정에 따라 출발시간이 지연될 수 있습니다.");
				}
				
				//강릉(200), 속초(230), 동해(210), 삼척(220) : 190405
				/*if(arvlCdCfm == "200" || arvlCdCfm == "210" || arvlCdCfm == "220" || arvlCdCfm == "230"){
					alert("강원도 산불화재 관련하여 속초, 강릉, 동해, 삼척 고속버스노선 정상 운행 중입니다.");
				}*/

				/*
				 * 2020-03-06 yahan 동부고속 노선팝업 삭제
				//서울(010)-제천하소(449),서울(010)-제천(450),서울(010)-용인유림(149),서울(010)-용인(150),서울(010)-이천부발(신하리)(172),서울(010)-여주대(139),서울(010)-여주(140)
				if((deprCdCfm == "010" && arvlCdCfm == "449") || (deprCdCfm == "010" && arvlCdCfm == "450") || (deprCdCfm == "010" && arvlCdCfm == "149") 
						|| (deprCdCfm == "010" && arvlCdCfm == "150") || (deprCdCfm == "010" && arvlCdCfm == "172")
						|| (deprCdCfm == "010" && arvlCdCfm == "139") || (deprCdCfm == "010" && arvlCdCfm == "140")
						|| (deprCdCfm == "449" && arvlCdCfm == "010") || (deprCdCfm == "450" && arvlCdCfm == "010") || (deprCdCfm == "149" && arvlCdCfm == "010") 
						|| (deprCdCfm == "150" && arvlCdCfm == "010") || (deprCdCfm == "172" && arvlCdCfm == "010")
						|| (deprCdCfm == "139" && arvlCdCfm == "010") || (deprCdCfm == "140" && arvlCdCfm == "010")){
					alert("[레드캡렌터카 업무제휴]\n\n해당 노선 이용 시 레드캡 렌트비 90%할인!\n(어린이날 5월3일~5일 제외! | 85% 할인)\n일시: 2019년 4월 1일~ 5월 31일\n문의: 1544-4599(레드캡렌터카)\n\n많은 이용 바랍니다. 감사합니다.");
				}
				*/
				
				// 광주 <-> 마산내서 (18.08.09)
				if(((deprCdCfm == "801" && arvlCdCfm == "400")||(deprCdCfm == "805" && arvlCdCfm == "400")||(deprCdCfm == "700" && arvlCdCfm == "400")) && yymmddD0 < 20190501){					
					alert("[고속도로 낙석사고로 인한 환승지 임시 미경유 안내]\n1. 대상노선: \n   가) 대구(동대구, 서대구) → 청주고속터미널(상행)노선, 선산 미경유\n   나) 부산 → 청주고속터미널(상행)노선, 낙동강 미경유\n2. 기간 : 2019.04.29 ~ 30");
				}

// 20240530 삭제
//				//서울(010)-아산온양(340),서울(010)-아산둔포(344) : 190507
//				if((deprCdCfm == "010" && arvlCdCfm == "340") || (deprCdCfm == "010" && arvlCdCfm == "344") || (deprCdCfm == "340" && arvlCdCfm == "010") || (deprCdCfm == "344" && arvlCdCfm == "010")){
//					alert("[중간정류장 추가안내]\n- 운행노선 : 서울-아산테크노벨리-아산둔포-아산온양\n- 변경사항 : 아산테크노벨리 중간정차, 아산둔포 정류장 위치변경 (둔포파리바게트앞)\n- 운행개시 : 2019.05.20(월)부터\n- 운행회수 : 일 3회 운행");
//				}
				
				//청주(센트럴)(401)-센트럴시티(020) : 190513
				if((deprCdCfm == "020" && arvlCdCfm == "401") || (deprCdCfm == "401" && arvlCdCfm == "020")){
					alert("청주(센트럴)은 청주시외버스 터미널입니다. 착오 없으시길 바랍니다.");
				}
				
//				//서울(010)-공주(320) : 190517
//				if((deprCdCfm == "010" && arvlCdCfm == "320") || (deprCdCfm == "320" && arvlCdCfm == "010")){		//서울-공주
//					alert("* 할인율 조정 안내*\n\n서울~공주 노선의 우등요금이 10,800원에서 11,900원으로\n프리미엄 요금이 13,800원에서 14,700원(주중12,900원)으로\n'19.6.1일자로 조정되오니, 이용에 참고하여 주시기 바랍니다.");
//				}
				
				// 센트럴 -> 전주 (19.05.24)
				if((deprCdCfm == "020" && arvlCdCfm == "602") && yymmddD0 < 20190530){					
					alert("센트럴시티(서울)→전주 노선이 5월 27일 22시이후\n배차부터 승차홈이 변경되오니 이용에 참고하시기 바랍니다.\n* 기존: Gate9 →변경: Gate 8");
				}
				
				// 안성 -> 서울 (19.05.29)
//				if(deprCdCfm == "130" && arvlCdCfm == "010"){
//					alert("[출퇴근 고객 주중 할인 이벤트]\n\n출퇴근 이용객의 교통편의 증진을 위하여, 6월 3일부터 안성발 서울행 노선의 06시 40분과 07시 05분 차량의 요금을 아래와 같이 할인하오니, 많은 이용 바랍니다.\n- 노선 : 안성→서울 / 06시 40분, 07시 05분(월~금, 2회)\n- 요금할인 : 6,600원 -> 5,300원 (20% 할인)\n- 할인방법 : 대학생요금 선택하여 예매\n- 시행일자 : 6.3(월)\n※ 현장발권 적용 불가");
//				}
				
				// 서울->동해, 동서울->동해 (19.06.26)
				if((deprCdCfm == "010" && arvlCdCfm == "210" || deprCdCfm == "032" && arvlCdCfm == "210") && (deprDtmChk == 20190720 || deprDtmChk == 20190721)){
					alert("[그린플러그드2019 동해] 이용 고객은 동해그린으로 조회 후 예매해 주시길 바랍니다.");
				}
				
				// 서울->동해그린, 동서울->동해그린 (19.06.26)
				if((deprCdCfm == "010" && arvlCdCfm == "211" || deprCdCfm == "032" && arvlCdCfm == "211") && (deprDtmChk == 20190720 || deprDtmChk == 20190721)){
					alert("* 운행기간 : 2019년 7월 20일 ~ 21일\n해당 노선은 [그린플러그드2019 동해] 행사를 위한 임시 노선입니다.\n기존 동해 고객님서는 동해그린이 아닌 동해를 선택해 주시기 바랍니다.");
				}
				
				// 성남(120)-내서(706) : 190705
				if(((deprCdCfm == "120" && arvlCdCfm == "706")||(deprCdCfm == "706" && arvlCdCfm == "120")) && deprDtmChk >= 20190729){		//성남-내서
					alert("<노선안내>\n성남↔내서 구간은 2019년 7월 29일(월) 부로 운행이 종료되었으니\n기존 고객께서는 선산휴게소 환승을 이용하시기 바랍니다.");
				}
// 20221102 삭제
//				// 서울(010)-속초(230), 서울(010)-양양(270) : 190708
//				if((deprCdCfm == "010" && arvlCdCfm == "270") || (deprCdCfm == "010" && arvlCdCfm == "230") || (deprCdCfm == "270" && arvlCdCfm == "010") || (deprCdCfm == "230" && arvlCdCfm == "010")){
//					alert("[서울-속초 프리미엄버스 운행 개시]\n- 운송개시일: 2019년 7월 19일 금요일\n- 요금: 서울-양양 23,500원 | 서울-속초 26,300원\n프리미엄버스 신규 운행되오니 고객 여러분의 많은 이용 바랍니다.\n감사합니다.");	
//				}
				
				// 성남(120)-마산(705): 190715
				if((deprCdCfm == "120" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "120")){
					alert("[노선연장안내]\n- 변경사항: 성남-선산-마산-진해 연장운행\n- 운행일자: 2019.7.29(월)\n내서정류장은 미경유 하오니 착오없으시길 바라며 기존 성남-내서 구간 이용고객께서는 선산휴게소 환승을 이용하시기 바랍니다.");	
				}
				
				// 성남(120)-진해(704): 190715
				if((deprCdCfm == "120" && arvlCdCfm == "704") || (deprCdCfm == "704" && arvlCdCfm == "120")){
					alert("[노선연장안내]\n- 변경사항: 성남-선산-마산-진해 연장운행\n- 운행일자: 2019.7.29(월)\n내서정류장은 미경유 하오니 착오없으시길 바라며 기존 성남-내서 구간 이용고객께서는 선산휴게소 환승을 이용하시기 바랍니다.");	
				}
				
				// 성남(120)-진해(704): 190715
				if((deprCdCfm == "120" && arvlCdCfm == "706") || (deprCdCfm == "706" && arvlCdCfm == "120")){
					alert("[노선안내]\n성남-내서 구간은 2019년 7월 29일(월) 부로 운행이 종료되오니 기존 이용객께서는 성남-선산, 선산-내서 환승을 통하여 이용하시기 바랍니다.");	
				}
				
// 20240530 삭제
//				// 아산온양(340)→인천(100), 아산서부(341)→인천(100), 천안아산(343)→인천(100): 190716
//				if((deprCdCfm == "340" && arvlCdCfm == "100") || (deprCdCfm == "341" && arvlCdCfm == "100") || (deprCdCfm == "343" && arvlCdCfm == "100")){
//					alert("[정류장추가안내]\n- 변경사항 : 아산-아산서부-천안아산역-천안-인천\n- 운행일자 : 2019. 8. 5(월) \n아산서부, 천안아산역을 중간정차함에 따라 운행시간이 약 10분 추가소요 되오니 이점 양지하여 주시기 바랍니다.");	
//				}
				
				// 양양(270)→인천공항T1,T2(105,117): 190731
//				if((deprCdCfm == "270" && arvlCdCfm == "105") || (deprCdCfm == "270" && arvlCdCfm == "117") || (deprCdCfm == "105" && arvlCdCfm == "270") || (deprCdCfm == "117" && arvlCdCfm == "270")){
//					alert("인천공항 ↔ 양양노선을 이용하시는 고객님께 안내 말씀 드립니다.\n2019년 8월 26일부터 부득이한 사정으로 상기 노선을 운행중단 하오니 참고하시기 바라며, 그 동안 인천공항↔양양 노선을 이용해주신\n고객님께 감사의 말씀 드립니다.\n문의전화 : 중앙고속 02)3479～9528, 동부고속 02)3483～6113");	
//				}
				
//				// 20200602 yahan 수정
//				//센트럴시티->군산 (19.07.31)
//				if(deprCdCfm == "020" && arvlCdCfm == "610"){
//					alert("[동군산(대야) 경유시간 안내]\n" +
//							"아래 시간대에 한하여 동군산(대야)정류장에 경유하고 있으니 참고 바랍니다.\n\n" +
//							"- 센트럴시티(서울) → 군산 (총 3회) : 08:00 / 12:20 / 17:20\n" +
//							"- 운행고속사 : 금호, 중앙, 천일\n" +
//							"- 동군산(대야)정류장 경유 시 약 2시간 45분 소요");
//				}	
//				
//				// 20200602 yahan 수정
//				//군산->센트럴시티 (19.07.31)
//				if(deprCdCfm == "610" && arvlCdCfm == "020"){
//					alert("[동군산(대야) 경유시간 안내]\n" +
//							"아래 시간대에 한하여 동군산(대야)정류장에 경유하고 있으니 참고 바랍니다.\n\n" +
//							"- 군산 → 센트럴시티(서울) (총 3회) : 08:00 / 13:00 / 17:40\n" +
//							"- 운행고속사 : 금호, 중앙, 천일\n" +
//							"- 동군산(대야)정류장 경유 시 약 2시간 45분 소요");
//				}	
				
//				//서울->천안 (19.12.12)
//				if(deprCdCfm == "010" && arvlCdCfm == "310" && yymmddD0 < 20200128){
//					alert("설명절 특송기간 중 서울경부터미널의 승차홈이 변경되오니 참고하시기 바랍니다.\n기간 : 2020.1.23(목) ~ 27(월)\n변경 전 : 14, 15번 홈 -> 변경 후 : 14번");
//				}
//				
//				//서울->김해 (19.12.12)
//				if(deprCdCfm == "010" && arvlCdCfm == "735" && yymmddD0 < 20200128){
//					alert("설명절 특송기간 중 서울경부터미널의 승차홈이 변경되오니 참고하시기 바랍니다.\n기간 : 2020.1.23(목) ~ 27(월)\n변경 전 : 6번 홈 -> 변경 후 : 15번");
//				}
//				
//				//서울->통영 (19.12.12)
//				if(deprCdCfm == "010" && arvlCdCfm == "730" && yymmddD0 < 20200128){
//					alert("설명절 특송기간 중 서울경부터미널의 승차홈이 변경되오니 참고하시기 바랍니다.\n기간 : 2020.1.23(목) ~ 27(월)\n변경 전 : 6번 홈 -> 변경 후 : 15번");
//				}
				
// 20221102 삭제
//				//동서울->청주 (19.09.02)
//				if((deprCdCfm == "032" && arvlCdCfm == "400") || (deprCdCfm == "400" && arvlCdCfm == "032")){
//					alert("2019.09.01(일) 부터 아래와 같이 할인요금을 적용합니다.\n우등 : 11,700원 → 10,700원(1,000원 / 8.5% 할인요금 적용)");
//				}
				
// 20220425 yahan 삭제요청
//				//서울경부->이천 (19.11.14)
//				if((deprCdCfm == "010" && arvlCdCfm == "160") || (deprCdCfm == "160" && arvlCdCfm == "010")){
//					alert("[서울-이천 노선 첫차 시간 변경 안내]\n1) 변경 일시 : 2019년 12월 1일\n2) 화요일-금요일 첫차 시간 변경 : 06:00 → 06:30\n3) 월요일, 토요일-일요일 기존 시간 동일 ");
//				}
// 20220425 yahan 삭제요청
//				//서울경부->이천 (19.11.12)
//				if((deprCdCfm == "010" && arvlCdCfm == "160") || (deprCdCfm == "160" && arvlCdCfm == "010")){
//					alert("서울-마장택지지구 노선이 신규로 운행됩니다.\n마장택지지구로 가시는 고객께서는 서울-마장택지지구로 조회 바랍니다.");
//				}

// 20210218 yahan 삭제요청 
//				//센트럴시티->순천 (19.11.13)
//				if((deprCdCfm == "020" && arvlCdCfm == "515") || (deprCdCfm == "515" && arvlCdCfm == "020")){
//					alert("[\'순천\' 노선 중간 정차지 운행]\n- 정차지명 : 순천신대지구\n- 운행시간 : 10:10 / 17:05 (1일/2회)\n- 시행일자 : 12월2일(월)부터\n* 상기 시간의 경우 \'순천대\' 중간 정차를 하지 않습니다.");
//				}
				
//				//인천->순천 (19.11.15)
//				if((deprCdCfm == "100" && arvlCdCfm == "515") || (deprCdCfm == "515" && arvlCdCfm == "100")){
//					alert("[\'순천\' 노선 중간 정차지 운행]\n- 정차지명 : 순천신대지구\n- 운행시간 : 11:20 / 18:10 (1일/2회)\n- 시행일자 : 12월2일(월)부터\n* 상기 시간의 경우 \'순천대\' 중간 정차를 하지 않습니다.");
//				}
//				
//				//정안(휴)하행->순천 (19.11.19)
//				if((deprCdCfm == "315" && arvlCdCfm == "515") || (deprCdCfm == "515" && arvlCdCfm == "315")){
//					alert("[\'순천\' 노선 중간 정차지 운행]\n- 정차지명 : 순천신대지구\n- 운행시간 : 11:40, 13:00, 18:35, 19:50 배차\n- 시행일자 : 12월2일(월)부터\n* 상기 시간의 경우 \'순천대\' 중간 정차를 하지 않습니다.");
//				}
//				
//				// 센트럴시티 <-> 광주 (19.11.28)
//				if(((deprCdCfm == "020" && arvlCdCfm == "500")||(deprCdCfm == "500" && arvlCdCfm == "020")) && yymmddD0 < 20200101){					
//					alert("1. KT Super VR 서비스 이용 안내 \n - 서울~광주 금호고속 프리미엄 버스\n - [월~목] 서울발 11:00, 광주발 16:30\n - [금~일] 서울발 11:00, 광주발 17:30\n - 통신사 상관없이 누구나 무료로 이용 가능\n2. 이용 좌석\n - 6번, 9번, 10번, 11번, 12번, 13번, 14번, 15번, 18번, 21번 \n3. 시행일자\n - 2019.11.28(목) ~ 12.31(화)");
//				}
				
				//해돋이 팝업 (강릉,속초,동해,삼척) 
//				if(((deprCdCfm == "010" && arvlCdCfm == "200")||(deprCdCfm == "010" && arvlCdCfm == "230")||(deprCdCfm == "010" && arvlCdCfm == "210")||(deprCdCfm == "010" && arvlCdCfm == "220")) && yymmddD0 < 20200101){	
//					alert("서울-강릉/속초/동해/삼척 노선 해돋이 임시차 투입안내\n\n■ 일시 : 2020년 1월 1일\n■ 시간 : 00:05 ~ 01:00\n\n많은 이용 부탁드립니다.");
//				}
				//yahan
				//해돋이 팝업 (강릉,동해,삼척) 2019-12-31 속초삭제 
//				if((
//					(deprCdCfm == "010" && arvlCdCfm == "200")||
//					(deprCdCfm == "010" && arvlCdCfm == "210")||
//					(deprCdCfm == "010" && arvlCdCfm == "220")) && yymmddD0 < 20200101){	
//					alert("서울-강릉/동해/삼척 노선 해돋이 임시차 투입안내\n\n■ 일시 : 2020년 1월 1일\n■ 시간 : 00:05 ~ 01:00\n\n많은 이용 부탁드립니다.");
//				}
//				
//				//센트럴시티 -> 고창/흥덕 
//				if((deprCdCfm == "020" && arvlCdCfm == "634")||(deprCdCfm == "020" && arvlCdCfm == "635")){	
//					alert("[고창(흥덕)노선 우등고속 신설]\n- 운수회사 : 호남, 전북, 대한\n- 시행일자 : 2020년 1월 8일(수)\n* 2주간 일반 요금이 적용되며, 1월 22일(수)부터 정상 요금");
//				}

// 20210215 yahan 시외우등할인종료
//				//$("#rotInfFrm").submit();
//				var prmmDcYn = $("#prmmDcYn").val(); //Y:시외우등할인대상, N:비대상
//				if(prmmDcYn == "Y"){
//					//시외할인대상여부로 모달창체크
//					var popGradeinfo = $('[data-remodal-id=popGradeinfo]').remodal();
//					popGradeinfo.open();
//				}else{
//					fnRotAdPopup();
//				}
				fnRotAdPopup();

			}
			
					
			
			/*if(yymmddD0 < 20181206){
				var confirmMsg = "[프리미엄 고속버스 고객만족도 설문조사]\n- 기간 : 2018.11.28(수)~12.05(수)\n설문조사를 하시겠습니까?";
				//설문조사 팝업(신규)
				if((deprCdCfm == "010" && arvlCdCfm == "300") || (deprCdCfm == "300" && arvlCdCfm == "010")){			//서울-대전
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/yqDIXWWzvjHvYNrC2");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "815") || (deprCdCfm == "815" && arvlCdCfm == "010")){		//서울-경주
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/R8pqJZUCZX0wwlas2");
						return true;
					}	
				}else if((deprCdCfm == "010" && arvlCdCfm == "400") || (deprCdCfm == "400" && arvlCdCfm == "010")){		//서울-청주
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/psMthwc9xYBI7ZHM2");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "320") || (deprCdCfm == "320" && arvlCdCfm == "010")){		//서울-공주
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/ZnEQiNAvCZzNrDlQ2");
						return true;
					}
				}else if((deprCdCfm == "020" && arvlCdCfm == "615") || (deprCdCfm == "615" && arvlCdCfm == "020")){		//서울-익산
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/LhVFVTFbZIiSLjcU2");
						return true;
					}
				}else if((deprCdCfm == "700" && arvlCdCfm == "500") || (deprCdCfm == "500" && arvlCdCfm == "700")){		//부산-광주
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/wQRplEG8nIxYhTOD3");
						return true;
					}
				}else if((deprCdCfm == "602" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "602")){		//전주-부산
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/CVOpK6kiMxZkElc83");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "220") || (deprCdCfm == "220" && arvlCdCfm == "010")){		//서울-삼척
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/yYNglQ0o2bBhOby93");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "210") || (deprCdCfm == "210" && arvlCdCfm == "010")){		//서울-동해
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/0e98z44Lcer9tLJn1");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "703") || (deprCdCfm == "703" && arvlCdCfm == "010")){		//서울-서부산
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/zCaalx1NDJCqCG1o1");
						return true;
					}
				}else if((deprCdCfm == "032" && arvlCdCfm == "704") || (deprCdCfm == "704" && arvlCdCfm == "032")){		//동서울-진해
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/N6TQnRMMIXKcJIB52");
						return true;
					}
				}else if((deprCdCfm == "032" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "032")){		//동서울-마산
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/GZKtPLkZBc3PtBu52");
						return true;
					}
				}else if((deprCdCfm == "400" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "400")){		//청주-부산
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/ODGfkKPdFpKA7j5q1");
						return true;
					}
				}else if((deprCdCfm == "100" && arvlCdCfm == "700") || (deprCdCfm == "700" && arvlCdCfm == "100")){		//인천-부산
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/NvhLzVwwYh72swk82");
						return true;
					}
				}
				
				//설문조사 팝업(확대)
				if((deprCdCfm == "010" && arvlCdCfm == "705") || (deprCdCfm == "705" && arvlCdCfm == "010")){			//서울-마산
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/eS2dOGJIKsGMtLkB3");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "710") || (deprCdCfm == "710" && arvlCdCfm == "010")){		//서울-창원
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/pvkeOIi2fCpvIU0e2");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "722") || (deprCdCfm == "722" && arvlCdCfm == "010")){		//서울-진주
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/T91dReA2PbgmdUjX2");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "010")){		//서울-강릉
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/AMtJ73ad14UzivO13");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "352") || (deprCdCfm == "352" && arvlCdCfm == "010")){		//서울-세종
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/HUAd5JCCXmLwiaKX2");
						return true;
					}
				}else if((deprCdCfm == "010" && arvlCdCfm == "358") || (deprCdCfm == "358" && arvlCdCfm == "010")){		//서울-세종
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/HUAd5JCCXmLwiaKX2");
						return true;
					}
				}else if((deprCdCfm == "500" && arvlCdCfm == "801") || (deprCdCfm == "801" && arvlCdCfm == "500")){		//광주-동대구
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/RlGIeUBwFe46Hkrl1");
						return true;
					}
				}else if((deprCdCfm == "500" && arvlCdCfm == "805") || (deprCdCfm == "805" && arvlCdCfm == "500")){		//광주-서대구
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/RlGIeUBwFe46Hkrl1");
						return true;
					}
				}else if((deprCdCfm == "020" && arvlCdCfm == "610") || (deprCdCfm == "610" && arvlCdCfm == "020")){		//서울-군산				
					if(confirm(confirmMsg)){
						window.open("https://goo.gl/forms/Vr8VdIDRaxsQmwp92");
						return true;
					}
				}
			}*/
		}
	}else{
//		alert("예매하실 노선을 선택하세요.");
//		$("#readDeprInfoList").focus();
//		return;

		deprCd   = $("#deprCd").val();
		if (deprCd == ""){
			alert("출발지를 선택해 주세요.");
			$('#readDeprInfoList').focus();
			return;
		}
		
		arvlCd   = $("#arvlCd").val();
		if (arvlCd == ""){
			alert("도착지를 선택해 주세요.");
			$('#readArvlInfoList').focus();
			return;
		}

	}
}



function fnCloseGradePop(){
	$(document).off('closed').on('closed','.pop_gradeinfo',function(e){
		fnRotAdPopup();
	});
	
}



function fnBusClsCd(obj){
	$("#busClsCd").val(obj.value);
}



function fnRotAdPopup(){
	var deprCdCfm =  $("#deprCd").val();
	var arvlCdCfm =  $("#arvlCd").val();
	
	
	// 20200724 yahan 사업자및 터미널위치 변경으로 삭제요청
//	// 광양 임시터미널 안내
//	if(deprCdCfm == "520"){
//		var popTmpTml = $('[data-remodal-id=popTmpTml]').remodal();
//		popTmpTml.open();
//	}else
	{
		// 노선 조회 (제휴할인 레이어팝업 노출) 2019.02.27
		// 서울경부(010)-강릉(200)
		if(
				(deprCdCfm == "010" && arvlCdCfm == "200") || 
				(deprCdCfm == "032" && arvlCdCfm == "200") || 
				//(deprCdCfm == "200" && arvlCdCfm == "032") ||
				(deprCdCfm == "010" && arvlCdCfm == "270") || (deprCdCfm == "010" && arvlCdCfm == "230") || 
				(deprCdCfm == "032" && arvlCdCfm == "270") || (deprCdCfm == "032" && arvlCdCfm == "230") || 
				(deprCdCfm == "100" && arvlCdCfm == "230") || (deprCdCfm == "105" && arvlCdCfm == "270") || 
				(deprCdCfm == "117" && arvlCdCfm == "270") || (deprCdCfm == "110" && arvlCdCfm == "220") || 
				(deprCdCfm == "032" && arvlCdCfm == "210") || (deprCdCfm == "032" && arvlCdCfm == "220") || 
				(deprCdCfm == "010" && arvlCdCfm == "210") || (deprCdCfm == "010" && arvlCdCfm == "220") || 
				(deprCdCfm == "010" && arvlCdCfm == "240")){
			if(deprCdCfm == "010" && arvlCdCfm == "200"){
				var popRoute1 = $('[data-remodal-id=popRoute1]').remodal();
				popRoute1.open();
			}

			// 동서울(032)-강릉(200)
			// 20200706 yahan 상하행 모두적용
			if(
				(deprCdCfm == "032" && arvlCdCfm == "200") || (deprCdCfm == "200" && arvlCdCfm == "032")
				){
				if (deprCdCfm == "200") $('#popRoute2_txt').show(); else $('#popRoute2_txt').hide();

				var popRoute2 = $('[data-remodal-id=popRoute2]').remodal();
				popRoute2.open();
			}
			
			// 6개노선(서울(010)-양양(270), 서울(010)-속초(230), 동서울(032)-양양(270), 동서울(032)-속초(230), 인천(100)-속초(230), 인천공항T1(105)-양양(270), 인천공항T2(117)-양양(270))
			if(
					(deprCdCfm == "010" && arvlCdCfm == "270") || 
					(deprCdCfm == "010" && arvlCdCfm == "230") || 
					(deprCdCfm == "032" && arvlCdCfm == "270") || 
					(deprCdCfm == "032" && arvlCdCfm == "230") || 
					(deprCdCfm == "100" && arvlCdCfm == "230") || 
					(deprCdCfm == "105" && arvlCdCfm == "270") || 
					(deprCdCfm == "117" && arvlCdCfm == "270")){
					var popRoute5 = $('[data-remodal-id=popRoute5]').remodal();
					popRoute5.open();
			}
			
			// 수원(110)-삼척(220)
			if(deprCdCfm == "110" && arvlCdCfm == "220"){
				$("#arvlNmSpan3").html("삼척");
				var popRoute3 = $('[data-remodal-id=popRoute3]').remodal();
				popRoute3.open();
			}
			
			// 동서울(032)-동해(210)
			if(deprCdCfm == "032" && arvlCdCfm == "210"){
				$("#arvlNmSpan3").html("동해");
				var popRoute3 = $('[data-remodal-id=popRoute3]').remodal();
				popRoute3.open();
			}
			
			// 동서울(032)-삼척(220)
			if(deprCdCfm == "032" && arvlCdCfm == "220"){
				$("#arvlNmSpan3").html("삼척");	
				var popRoute3 = $('[data-remodal-id=popRoute3]').remodal();
				popRoute3.open();
			}
			
			// 서울경부(010)-동해(210)
			if(deprCdCfm == "010" && arvlCdCfm == "210"){
				$("#arvlNmSpan4").html("동해");	
				var popRoute4 = $('[data-remodal-id=popRoute4]').remodal();
				popRoute4.open();
			}
			
			// 서울경부(010)-삼척(220)
			if(deprCdCfm == "010" && arvlCdCfm == "220"){
				$("#arvlNmSpan4").html("삼척");			
				var popRoute4 = $('[data-remodal-id=popRoute4]').remodal();
				popRoute4.open();
			}
			
			// 서울경부 - 원주
			if(deprCdCfm == "010" && arvlCdCfm == "240"){
				var popRoute6 = $('[data-remodal-id=popRoute6]').remodal();
				popRoute6.open();
			}
			
		}else{
			fnRotVldChc();
		}
	}
}

function fnRotVldChc(){	
	var deprCdCfm =  $("#deprCd").val();
	var arvlCdCfm =  $("#arvlCd").val();
	
	var dt = new Date();		//오늘날짜 전체
	var yyyy  = dt.getFullYear();		//선택한 년도
	var mm    = dt.getMonth()+1;		//선택한 월
	var mm2Len = Number(mm) < 10 ? "0"+mm : mm;			// 선택월 ex:01 두글자로 변환
	var ddTo    = Number(dt.getDate()) < 10 ? "0"+dt.getDate() : dt.getDate(); 			// 숫자형
	var yymmddD0 = yyyy+""+mm2Len+""+ddTo;		//오늘날짜
	
	
	// 20210430 yahan
	if($("#mainYn").val() == null || $("#mainYn").val() == ""){
		if(confirm("승차권 예매에 따른 취소수수료 내용에 동의하십니까?")){
			$("#rotInfFrm").submit();
		}
	} else {
		$("#rotInfFrm").submit();
	}
	return;
	/*
	$("#loading").show();
	var rotInfFrm = $("form[name=rotInfFrm]").serialize() ;
	$.ajax({	
        url      : "/mrs/readAlcnSrch.ajax",
        type     : "post",
        data : rotInfFrm,
        dataType : "json",
        async    : true,
        success  : function(alcnInfMap){
        	if(alcnInfMap.pathDvsCd == "rtrp"){
        		if(alcnInfMap.rotVldChc == "N"){
        			//alert("배차정보가 없습니다. \n조회조건을 다시 확인하여 주시기 바랍니다.");
        			
        			//서울-세종 예매오픈일 공지 (190304)
	        		if(((deprCdCfm == "010" && arvlCdCfm == "352") || (deprCdCfm == "352" && arvlCdCfm == "010")
	        			|| (deprCdCfm == "010" && arvlCdCfm == "353") || (deprCdCfm == "353" && arvlCdCfm == "010")
	        			|| (deprCdCfm == "010" && arvlCdCfm == "358") || (deprCdCfm == "358" && arvlCdCfm == "010"))
	        			&& yymmddD0 < "20190306"){
	        			alert("서울~세종(청사) 3월 예매오픈! \n2019.3.5 17시 전후");
	        		}else{
	        			alert("조회되는 배차가 없습니다. \n배차정보에 관한 사항은 출발지 터미널로 문의하시기 바랍니다.");
	        		}
	        		
        			$("#loading").hide();
        			return;
        		}else if(alcnInfMap.rotVldChc1 == "N"){
        			//alert("오늘날 배차정보가 없습니다. \n조회조건을 다시 확인하여 주시기 바랍니다.");
        			//서울-세종 예매오픈일 공지 (190304)
        			if(((deprCdCfm == "010" && arvlCdCfm == "352") || (deprCdCfm == "352" && arvlCdCfm == "010")
    	        		|| (deprCdCfm == "010" && arvlCdCfm == "353") || (deprCdCfm == "353" && arvlCdCfm == "010")
    	        		|| (deprCdCfm == "010" && arvlCdCfm == "358") || (deprCdCfm == "358" && arvlCdCfm == "010"))
    	        		&& yymmddD0 < "20190306"){
	        			alert("서울~세종(청사) 3월 예매오픈! \n2019.3.5 17시 전후");
	        		}else{
	        			alert("오는날 조회되는 배차가 없습니다. \n배차정보에 관한 사항은 출발지 터미널로 문의하시기 바랍니다.");
	        		}
        			
        			$("#loading").hide();
        			return;
        		}else{
        			if($("#mainYn").val() == null || $("#mainYn").val() == ""){
        				if(confirm("승차권 예매에 따른 취소수수료 내용에 동의하십니까?")){
        					$("#loading").hide();
        					$("#rotInfFrm").submit();
        				} else {
            				$("#loading").hide();
        				}
        			} else {
        				$("#loading").hide();
       					$("#rotInfFrm").submit();
        			}
        		}
        	}else{
	        	if(alcnInfMap.rotVldChc == "N"){
	        		//alert("배차정보가 없습니다. \n조회조건을 다시 확인하여 주시기 바랍니다.");
	        		
	        		//서울-세종 예매오픈일 공지 (190304)
	        		if(((deprCdCfm == "010" && arvlCdCfm == "352") || (deprCdCfm == "352" && arvlCdCfm == "010")
		        		|| (deprCdCfm == "010" && arvlCdCfm == "353") || (deprCdCfm == "353" && arvlCdCfm == "010")
		        		|| (deprCdCfm == "010" && arvlCdCfm == "358") || (deprCdCfm == "358" && arvlCdCfm == "010"))
		        		&& yymmddD0 < "20190306"){
	        			alert("서울~세종(청사) 3월 예매오픈! \n2019.3.5 17시 전후");
	        		}else{
	        			alert("조회되는 배차가 없습니다. \n배차정보에 관한 사항은 출발지 터미널로 문의하시기 바랍니다.");
	        		}
	        		
	        		$("#loading").hide();
	        		return;
	        	}else{
	        		if($("#mainYn").val() == null || $("#mainYn").val() == ""){
        				if(confirm("승차권 예매에 따른 취소수수료 내용에 동의하십니까?")){
        					$("#loading").hide();
        					$("#rotInfFrm").submit();
        				} else {
            				$("#loading").hide();
        				}
        			} else {
        				$("#loading").hide();
       					$("#rotInfFrm").submit();
        			}
	        	}
        	}
        }
	});
	*/
}




function fnEmptyCssStup(){
	//empt css 추가
	if($("#readDeprInfoList").find('.val_txt').text() == ""){
		$("#readDeprInfoList").find('p').addClass('empty');
	}
	
	if($("#popDeprChc").find('.val_txt').text() == ""){
		$("#popDeprChc").find('p').addClass('empty');
	}
	
	if($("#readArvlInfoList").find('.val_txt').text() == ""){
		$("#readArvlInfoList").find('p').addClass('empty');
	}
	
	if($("#popArvlChc").find('.val_txt').text() == ""){
		$("#popArvlChc").find('p').addClass('empty');
	}
	
	//empt css 삭제
	if($("#readDeprInfoList").find('.val_txt').text() != ""){
		$("#readDeprInfoList").find('p').removeClass('empty');
	}
	
	if($("#popDeprChc").find('.val_txt').text() != ""){
		$("#popDeprChc").find('p').removeClass('empty');
	}
	
	if($("#readArvlInfoList").find('.val_txt').text() != ""){
		$("#readArvlInfoList").find('p').removeClass('empty');
	}
	
	if($("#popArvlChc").find('.val_txt').text() != ""){
		$("#popArvlChc").find('p').removeClass('empty');
	}
}
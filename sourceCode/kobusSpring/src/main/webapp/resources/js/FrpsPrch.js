console.log('FrpsPrch.js 파일이 정상적으로 실행됨');

var allDeprList       = []; // 출발지 리스트
var allRotInfAllList  = []; // 노선 전체 리스트
var allRotInfrLen     = 0;  // 노선 전체 데이터 건수
var allplen = 0; // tab 구분자
var allPrchAmt = 0; // 할부 개월수를 표시할지 말지
var clientAmount = 0;
$(document).ready(function() {
	$("#tmpPsbYN").css('display', 'none');		// 임시차 문구
	$("#divTermDesc").css('display', 'none');	// 사용기간 문구
	
	$("#payType1").prop("checked");
	
	
	/**
	 * 20200602 yahan 프리패스 할인구매는 6/15일 이후부터 사용가능
	 */
	var min = 0;
//	if ($("#frpsPrchGdEvent").val() == "Y"){
//		var dt = new Date();		//오늘날짜 전체
//		var yyyy  = dt.getFullYear();		//선택한 년도
//		var mm    = dt.getMonth()+1;		//선택한 월
//		var mm2Len = Number(mm) < 10 ? "0"+mm : mm;			// 선택ㅡㅜ?ㅌ월 ex:01 두글자로 변환
//		var ddTo    = Number(dt.getDate()) < 10 ? "0"+dt.getDate() : dt.getDate(); 			// 숫자형
//		var yymmdd = yyyy+""+mm2Len+""+ddTo;		//오늘날짜
//
//		if (yymmdd < 20200615) {
//			min = 15 - dt.getDate();
//		}
//	}
	var max = min+10;
	
	
	
	//사용시작일 	
	$('#datepickerItem').datepicker({
		showOn:"button",
		buttonImage:"/koBus/resources/images/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"사용시작일 선택 달력",
		minDate: min,
		maxDate: max,
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
		beforeShowDay: disableAllTheseDays
	});
	
	// 특정날짜들 배열
	var disabledDays = ["2019-4-18"];
	
	// 특정일 선택막기
	function disableAllTheseDays(date) {
		var m = date.getMonth(), d = date.getDate(), y = date.getFullYear();
		for (i = 0; i < disabledDays.length; i++) {
			if($.inArray(y + '-' +(m+1) + '-' + d,disabledDays) != -1) {
				return [false];
			}
		}
		return [true];
	}
	
	//오늘날짜
	var dtOp= new Date();	
	var yyyyOp = dtOp.getFullYear();
	var mmOp   = dtOp.getMonth()+1;
	var ddOp   = dtOp.getDate();
	var mm2LenOp = Number(mmOp) < 10 ? "0"+mmOp : mmOp;
	var dd2LenOp = Number(ddOp) < 10 ? "0"+ddOp : ddOp;
	
	var openDt = yyyyOp +""+ mm2LenOp +""+ dd2LenOp;
	
	var dt0 = new Date();
	var dt1 = new Date();
	var dt = new Date();	
	
	if(openDt == "20190417"){
		dt0.setDate(dt1.getDate()+2);
		dt1.setDate(dt1.getDate()+2);		
		dt.setDate(dt.getDate()+2);
	}else{
		/**
		 * 20200602 yahan
		 */
//		dt0.setDate(dt1.getDate()+1);
//		dt1.setDate(dt1.getDate()+1);		
//		dt.setDate(dt.getDate()+1);
		dt0.setDate(dt1.getDate()+min);
		dt1.setDate(dt1.getDate()+min);		
		dt.setDate(dt.getDate()+min);
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
	
	$(".text_date1").text(yyDtm);
	$("#exdtSttDt").val(yymmdd);
	
	$('#datepickerItem').on('change', function(){
		fnYyDtmStup($('#datepickerItem').val());
		$('.datepicker-active').focus();
		$('.datepicker-btn').removeClass('datepicker-active');
	});
	
	fnFrpsDtl();
	
	// fnSetCardCam();
	
	$("#goPrdprchFn").click(function () {
    // 이용약관
    if (!$("#agree1").is(":checked")) {
        $('#agree1').focus();
        alert("서비스 이용약관에 동의해 주세요.");
        return;
    }
    if (!$("#agree2").is(":checked")) {
        $('#agree2').focus();
        alert("운송 약관에 동의해 주세요.");
        return;
    }
    if (!$("#agree3").is(":checked")) {
        $('#agree3').focus();
        alert("개인정보 취급방침에 동의해 주세요.");
        return;
    }

    // 사용시작일 
    if ($("#exdtSttDt").val() == "") {
        $('#datepickerItem').focus();
        alert("사용시작일을 선택해 주세요. \n (사용시작일은 금일로부터 10일이내 선택이 가능합니다.)");
        return;
    }

    // 생년월일 유효성
    if ($("#mbrsBrdt").val().length != 6) {
        alert("구매자 생년월일 6자리를 입력해주세요.");
        $("#mbrsBrdt").focus();
        return;
    }

    // 구매옵션
    if ($("#selOption").val() == "0" || $("#selOption").val() == "") {
        alert("구매옵션을 선택해주세요.");
        $('#optSelectric').focus();
        return;
    }
    
    var selOption = $("#selOption").val();
    console.log("selOption 값:", selOption, "typeof:", typeof selOption);
    
    if (!selOption || typeof selOption !== "string" || selOption.indexOf("/") === -1) {
    alert("구매옵션 선택값이 잘못되었습니다. 다시 선택해주세요.");
    $('#optSelectric').focus();
    return;
	}

    // **여기서 adtn_prd_sno(PK) 추출**
    var parts = selOption.split("/");
    var adtn_prd_sno = parts[parts.length - 1];

    // 사용자가 볼 금액(화면의 금액, 또는 window.realAmount 등)
    var clientAmount = $("#goodsPrice").val();

    // 디버깅용 로그
    console.log("결제 검증 adtn_prd_sno:", adtn_prd_sno, "clientAmount:", clientAmount);

    // 결제 전 서버 금액 검증
    $.ajax({
        url: ctx + '/payment/fetchAmount.ajax', // 서버에서 금액 가져오는 핸들러
        type: 'POST',
        dataType: 'json', // ★★★ 반드시 추가!
        data: { adtn_prd_sno: adtn_prd_sno },
        async: false, // 금액 검증 후에만 결제창 열기 (권장: 동기처리)
        success: function (result) {
            var serverAmount = Number(result.amount); // 숫자 변환
       	 	console.log("서버 응답 금액(serverAmount):", serverAmount, "typeof:", typeof serverAmount);
            // 서버에서 받아온 실제 금액과 클라이언트 금액 비교
            if (serverAmount != clientAmount) {
                alert("금액 불일치! 결제를 중단합니다. 관리자에게 문의하세요.");
                return;
            } else {
                // 금액이 정상적으로 일치하면 결제창 실행
                requestPay();
            }
        },
        error: function () {
            alert("서버와 통신 오류가 발생했습니다. 관리자에게 문의하세요.");
            return;
        }
    });
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

// ① 금액 조회용 Ajax 함수
function fetchAmountFromServer(adtn_prd_sno) {
    return $.ajax({
        url: "/koBus/freepass/payment/fetchAmount.ajax", // ★ 금액조회용 별도 url
        type: "GET",
        data: { adtn_prd_sno: adtn_prd_sno }
    });
}
/*
// ② 옵션 변경시 금액 자동 조회
$(document).on("click", "#selOptionLi li a", function() {
    var selOption = $("#selOption").val();
    var parts = selOption.split("/");
    var adtn_prd_sno = parts[parts.length - 1]; // PK 추출!
    console.log("옵션 선택값(adtn_prd_sno):", adtn_prd_sno);

    fetchAmountFromServer(adtn_prd_sno).done(function(result) {
        realAmount = Number(result.amount); // 항상 숫자로 변환!
        console.log("fetchAmount ajax 콜백, 받은 amount:", result.amount, "realAmount:", realAmount);
        $("#pubAmt").text(result.amount.toLocaleString() + " 원");
        $("#amount").val(result.amount);
    });
});
*/
function requestPay() {
	var selectedOptionText = $("#selOptionText").val();
	var clientAmount = $("#goodsPrice").val();
	// 1. 시작일 원본 추출
	let rawStartDate = $("#datepickerItem").val().trim(); // 예: "2025. 6. 26. 목"
	
	// 2. 변환: "2025. 6. 26. 목" → "2025-06-26"
	let startDate = "";
	if (rawStartDate) {
	    let dateParts = rawStartDate.split(".");
	    let yyyy = dateParts[0].trim();
	    let mm = dateParts[1].trim().padStart(2, '0');
	    let dd = dateParts[2].trim().padStart(2, '0');
	    startDate = `${yyyy}-${mm}-${dd}`; // 결과: "2025-06-26"
	}

	console.log("변환된 시작일:", startDate);
	
    var IMP = window.IMP;
    IMP.init('imp31168041'); // 가맹점 식별코드

    IMP.request_pay({
        pg: 'html5_inicis.INIpayTest',
        pay_method: ['card', 'trans'],
        merchant_uid: 'ORD_TEST_' + new Date().getTime(),
        name: selectedOptionText, // 실제 상품명
        amount: clientAmount,
        // 기타 필요시 buyer 정보 등
    }, function (rsp) {
        if (rsp.success) {
            // ★★★ 여기서 필요한 값들 추가 ★★★
            $.ajax({
                url: ctx + '/payment/Freepass.do',
                type: 'POST',
                data: {
                    imp_uid: rsp.imp_uid,
                    merchant_uid: rsp.merchant_uid,
                    pay_method: rsp.pay_method,
                    amount: clientAmount,
                    pay_status: 'SUCCESS',
                    pg_tid: rsp.pg_tid,
                    paid_at: rsp.paid_at,
                    adtn_prd_sno: $("#adtnPrdSno").val(),   // ★ 프리패스 옵션 PK
                    user_id: $("#user_id").val(),           // ★ 로그인 회원ID
                    startDate: startDate 			        // ← 추가 (형식: yyyy-MM-dd)
                },
                success: function(data) {
                    alert('결제 정보가 서버에 저장되었습니다!');
                    // location.href = "/결제완료페이지.do";
                },
                error: function(xhr, status, error) {
                    alert('결제 정보 저장에 실패했습니다!');
                    console.error('결제 저장 오류:', error);
                }
            });
        } else {
            alert('결제에 실패했습니다: ' + rsp.error_msg);
        }
    });
}

//부가상품 상세 조회
function fnFrpsDtl(){
	var frpsPrchFrm = $("form[name=frpsPrchFrm]").serialize() ;
	$.ajax({	
	    url      : "/koBus/adtnprdnew/frps/readFrpsDtlInf.ajax",
	    type	 : "post",
	    data 	 : frpsPrchFrm,
	    dataType : "json",
	    success  : function(arrList){	
		console.log("🚀 Ajax 응답:", arrList);
	    	var allDtlInfAllList  = []; // 부가상품 전체 리스트
	    	var deprAll ="";
	     	allDtlrLen = arrList.len;
	    	for(var inx = 0 ; inx < allDtlrLen ; inx++){					//8.for문으로 return받은 map안의 list정보들을 빼와서 다시 이중배열에 넣기
	    		allDtlInfAllList[inx] = new Array();								//8.1 javascript에선 이중배열을 쓸수 없기 때문에 list생성후 배열을 뒤에 붙여야한다.
	    		allDtlInfAllList[inx][0] = arrList.adtnDtlList[inx].adtnPrdUseClsCd;	//부가상품사용등급코드
	    		allDtlInfAllList[inx][1] = arrList.adtnDtlList[inx].adtnPrdUseClsNm;	//부가상품사용등급명
	    		allDtlInfAllList[inx][2] = arrList.adtnDtlList[inx].adtnPrdUsePsbDno;	//부가상품사용가능일수
	    		allDtlInfAllList[inx][3] = arrList.adtnDtlList[inx].adtnPrdUseNtknCd;	//부가상품사용권종코드 
	    		allDtlInfAllList[inx][4] = arrList.adtnDtlList[inx].adtnPrdUseNtknNm;	//부가상품사용권종명
	    		allDtlInfAllList[inx][5] = arrList.adtnDtlList[inx].wkdWkeNtknCd;		//주중주말권종코드
	    		allDtlInfAllList[inx][6] = arrList.adtnDtlList[inx].wkdWkeNtknNm;		//주중주말권종명
	    		allDtlInfAllList[inx][7] = arrList.adtnDtlList[inx].tempAlcnTissuPsbYn;	//임시배차발권가능여부
	    		allDtlInfAllList[inx][8] = arrList.adtnDtlList[inx].adtnPrdSno;			//부가상품일련번호
	    		allDtlInfAllList[inx][9] = arrList.adtnDtlList[inx].adtnDcYn;			//할인부가상품여부
	    	}	
			

	    	/*var weekItem = "";
	    	var kindItem = "";
	    	var gradeItem = "";
	    	        	
	    	for(var inx=0; inx < allDtlrLen ; inx++){
	    		if(inx == 0 || (inx > 0 && allDtlInfAllList[inx][3] != allDtlInfAllList[inx-1][3])){
	    			kindItem += "<span class=\"custom_radio type3\"><input type=\"radio\" id=\"adtnPrdUseNtknCd"+inx+"\" name=\"adtnPrdUseNtknCd\" value="+allDtlInfAllList[inx][3]+" onclick=\"fnSelPrdKind('"+allDtlInfAllList[inx][4]+"')\"><label for=\"adtnPrdUseNtknCd"+inx+"\"><span>"+allDtlInfAllList[inx][4]+"</span></label></span>";
	    		}
	    		if(inx == 0 || (inx > 0 && allDtlInfAllList[inx][0] != allDtlInfAllList[inx-1][0])){
	    			gradeItem += "<span class=\"custom_radio type3\"><input type=\"radio\" id=\"adtnPrdUseClsCd"+inx+"\" name=\"adtnPrdUseClsCd\" value="+allDtlInfAllList[inx][0]+" onclick=\"fnSelPrdGrade('"+allDtlInfAllList[inx][1]+"')\"><label for=\"adtnPrdUseClsCd"+inx+"\"><span>"+allDtlInfAllList[inx][1]+"</span></label></span>";
	    		}        		
	    		if(inx == 0 || (inx > 0 && allDtlInfAllList[inx][5] != allDtlInfAllList[inx-1][5])){
	    			weekItem += "<span class=\"custom_radio type3\"><input type=\"radio\" id=\"wkdWkeNtknCd"+inx+"\" name=\"wkdWkeNtknCd\" value="+allDtlInfAllList[inx][5]+" onclick=\"fnSelPrdWeek('"+allDtlInfAllList[inx][6]+"')\"><label for=\"wkdWkeNtknCd"+inx+"\"><span>"+allDtlInfAllList[inx][6]+"</span></label></span>";
	    		}
	    	}
	    	*/
	    	
	    	
	    	// select
	    	if (is_select("selOption")){
		    	var blockItem = "<option value='0'>구매옵션을 선택하세요.</option>";
	        	var blockSubItem = "";
	        	var tmpAlcnYn = "";
	        	var saleAlcnYn = "";
	        	var itemNo = 1;
	        	
	        	console.log("🧩 이중배열 allDtlInfAllList:", allDtlInfAllList);
	        	
	        	for(var inx=0; inx < allDtlrLen ; inx++){
	        		if(allDtlInfAllList[inx][7] == "Y"){
	        			tmpAlcnYn = " / 임시";
	        		}else{
	        			tmpAlcnYn = "";
	        		}
	        		/**
	        		 * 20200520 yahan
	        		 */
	        		if(allDtlInfAllList[inx][9] == "Y"){
	        			saleAlcnYn = "할인 ";
	        		}else{
	        			saleAlcnYn = "";
	        		}
	        		
	        		/**
	        		 * 20200601 yahan
	        		 * 이벤트 일때는 할인권만 노출
	        		 */
	        		if ($("#frpsPrchGdEvent").val() == "Y" && allDtlInfAllList[inx][9] == "Y" ||
	        			$("#frpsPrchGdEvent").val() != "Y" && allDtlInfAllList[inx][9] != "Y" 	) {
	        			
	        			console.log("➡️ 옵션 항목", inx, ":", txt);
	        			
	        			blockItem += "<option value="+allDtlInfAllList[inx][3]+"/"+allDtlInfAllList[inx][0]+"/"+allDtlInfAllList[inx][5]+"/"+allDtlInfAllList[inx][2]+"/"+allDtlInfAllList[inx][7]+"/"+allDtlInfAllList[inx][8]+">" + saleAlcnYn + allDtlInfAllList[inx][2] + "일권 / " + allDtlInfAllList[inx][1] + " / " + allDtlInfAllList[inx][6] + " / " + allDtlInfAllList[inx][4]+tmpAlcnYn+"</option>";
	        		}
	        	}
				console.log("📦 최종 드롭다운 HTML:", blockItem);

	        	$("#selOption").html(blockItem);
	        	$("#selOption").selectric();
	    	}
	    	// input
	    	else{
		    	var blockItem = "<li><a href=\"javascript:void(0)\" onclick=\"onSelectChange(this,'0', 'selOption')\">구매옵션을 선택하세요</a></li>";
	        	var blockSubItem = "";
	        	var tmpAlcnYn = "";
	        	var saleAlcnYn = "";
	        	var itemNo = 1;
	        	
	        	for(var inx=0; inx < allDtlrLen ; inx++){
	        		if(allDtlInfAllList[inx][7] == "Y"){
	        			tmpAlcnYn = " / 임시";
	        		}else{
	        			tmpAlcnYn = "";
	        		}
	        		/**
	        		 * 20200520 yahan
	        		 */
	        		if(allDtlInfAllList[inx][9] == "Y"){
	        			saleAlcnYn = "할인 ";
	        		}else{
	        			saleAlcnYn = "";
	        		}
	        		
	        		/**
	        		 * 20200601 yahan
	        		 * 이벤트 일때는 할인권만 노출
	        		 */
	        		if (true) {
	        			
	        			var val = allDtlInfAllList[inx][3]+"/"+allDtlInfAllList[inx][0]+"/"+allDtlInfAllList[inx][5]+"/"+allDtlInfAllList[inx][2]+"/"+allDtlInfAllList[inx][7]+"/"+allDtlInfAllList[inx][8];
	        			var txt = saleAlcnYn + allDtlInfAllList[inx][2] + "일권 / " + allDtlInfAllList[inx][1] + " / " + allDtlInfAllList[inx][6] + " / " + allDtlInfAllList[inx][4]+tmpAlcnYn;
	        			blockItem += "<li><a href=\"javascript:void(0)\" onclick=\"onSelectChange(this,'"+ val +"', 'selOption')\">"+ txt +"</a></li>";
	        		}
	        	}
	        	
	        	$("#selOptionLi").html(blockItem);
	    	}
	    	/*$("#kindList").html(kindItem);
	    	$("#gradeList").html(gradeItem);
	    	$("#weekList").html(weekItem);*/
	    	
	    	$("#weekTd").html("");
	    	$("#kindTd").html("");
	    	$("#gradeTd").html("");
	    	$("#fulTermTd").html("");
	    	$("#pubAmt").html("0 원");
	    	$("#goodsPrice").val(0); // 20241010 간편결제 금액설정
	    	$("#divTermDesc").css('display', 'none');
	    },
	    error:function (e){
	        //alert("connection error");
	    }
	});
	console.log("📌 최종 selOptionText 값:", $("#selOptionText").val());
}

//이용권종 클릭시
function fnSelPrdKind(val){
	$("#kindTd").html(val);
}

//버스이용등급 클릭시
function fnSelPrdGrade(val){
	$("#gradeTd").html(val);
}

//상품종류 클릭시
function fnSelPrdWeek(val){
	if($("#mbrsBrdt").val() == ""){
		alert("생년월일을 입력해주세요.");
		$("input:radio[name='wkdWkeNtknCd']").prop("checked",false);
		$("#mbrsBrdt").focus();
		return;
	}
	if($("input:radio[name=adtnPrdUseNtknCd]:checked").length == 0){
		alert("이용권종을 선택해주세요.");
		$("input:radio[name='wkdWkeNtknCd']").prop("checked",false);
		return;
	}else{
		$("#kindTd").html();	
	}
	if($("input:radio[name=adtnPrdUseClsCd]:checked").length == 0){
		alert("버스이용등급을 선택해주세요.");
		$("input:radio[name='wkdWkeNtknCd']").prop("checked",false);
		return;
	}
	$("#weekTd").html(val);
	
	//사용 가능 일수 세팅
	if($("input:radio[name='wkdWkeNtknCd']:checked").val() == "1"){
		$("#adtnPrdUsePsbDno").val("7");	
	}else if($("input:radio[name='wkdWkeNtknCd']:checked").val() == "2"){
		$("#adtnPrdUsePsbDno").val("4");
	}else if($("input:radio[name='wkdWkeNtknCd']:checked").val() == "3"){
		$("#adtnPrdUsePsbDno").val("5");
	}	
	//유효기간 가져오기
	fnAdtnVldTerm();
}
/*
//옵션 선택시  
function fnSelOption(value){
	var optVal = value; 
	
	if(optVal == "0"){
		alert("구매옵션을 선택해주세요.");
		$("#tmpPsbYN").css('display', 'none');
		$("#divTermDesc").css('display', 'none');
		
		// 20200513 yahan
		$("#adtnPrdUseNtknCd").val('');
		$("#adtnPrdUseClsCd").val('');
		$("#wkdWkeNtknCd").val('');
		$("#adtnPrdUsePsbDno").val('');
		$("#adtnPrdSno").val('');
		
		return;
	}
	
	var opt = optVal.split("/");	
	$("#adtnPrdUseNtknCd").val(opt[0]);
	$("#adtnPrdUseClsCd").val(opt[1]);
	$("#wkdWkeNtknCd").val(opt[2]);
	$("#adtnPrdUsePsbDno").val(opt[3]);
	$("#adtnPrdSno").val(opt[5]);
	
	//var optTxt = obj.text();
	//var txt = $("#selOption option:checked").text().split("/");
	var txt = '';
	if (is_select("selOption")){
		txt = $("#selOption option:selected").text().split("/");
	} else{
		txt = $("#selOptionText").val().split("/");
	}

	$("#kindTd").html(txt[0]);
	$("#gradeTd").html(txt[1]);
	$("#weekTd").html(txt[2]);
	//$("#dayTd").html(txt[3]+"일권");
	
	//임시차 가능여부 문구 노출	
	if(opt[4] == "Y"){
		$("#tmpPsbYN").html("※ 해당 옵션은 임시차 배차도 사용 가능합니다.");
			
	}else{
		$("#tmpPsbYN").html("※ 해당 옵션은 임시차 배차는 사용 불가합니다.");		
	}
	$("#tmpPsbYN").css('display', 'block');
	
	//유효기간 가져오기
	fnAdtnVldTerm();
	$("#divTermDesc").css('display', 'block');
		
}
*/
function fnSelOption(value){
	console.log("🔽 [fnSelOption] 선택된 value:", value);

	var optVal = value; 
	
	if(optVal == "0"){
		console.warn("⚠️ 구매옵션 value가 '0'입니다. 선택되지 않음.");
		return;
	}
	
	var opt = optVal.split("/");
	console.log("📦 opt 배열:", opt);

	$("#adtnPrdUseNtknCd").val(opt[0]);
	$("#adtnPrdUseClsCd").val(opt[1]);
	$("#wkdWkeNtknCd").val(opt[2]);
	$("#adtnPrdUsePsbDno").val(opt[3]);
	$("#adtnPrdSno").val(opt[5]);

	console.log("🧪 hidden 값 설정 완료:");
	console.log("  - adtnPrdUseNtknCd:", opt[0]);
	console.log("  - adtnPrdUseClsCd:", opt[1]);
	console.log("  - wkdWkeNtknCd:", opt[2]);
	console.log("  - adtnPrdUsePsbDno:", opt[3]);
	console.log("  - adtnPrdSno:", opt[5]);

	// 텍스트 추출 확인
	var txt = '';
	if (is_select("selOption")){
		txt = $("#selOption option:selected").text().split("/");
	} else{
		txt = $("#selOptionText").val().split("/");
	}
	console.log("📄 txt 배열:", txt);

	$("#kindTd").html(txt[0]);
	$("#gradeTd").html(txt[1]);
	$("#weekTd").html(txt[2]);

	console.log("🖨️ 표시된 내용:");
	console.log("  - kindTd:", txt[0]);
	console.log("  - gradeTd:", txt[1]);
	console.log("  - weekTd:", txt[2]);

	if(opt[4] == "Y"){
		console.log("✅ 임시차 사용 가능");
		$("#tmpPsbYN").html("※ 해당 옵션은 임시차 배차도 사용 가능합니다.");
	}else{
		console.log("🚫 임시차 사용 불가");
		$("#tmpPsbYN").html("※ 해당 옵션은 임시차 배차는 사용 불가합니다.");
	}
	$("#tmpPsbYN").css('display', 'block');

	console.log("🚀 fnAdtnVldTerm 호출");
	fnAdtnVldTerm();

	$("#divTermDesc").css('display', 'block');
}


function setFrpsTermParamsToForm() {
    // 1. 시작일 가져오기
    let dateStr = $("label.text_date1").text().trim(); // 예: "2025. 6. 18. 수"
    if (!dateStr) return;

    let dateParts = dateStr.split(".");
    let yyyy = dateParts[0].trim();
    let mm = dateParts[1].trim().padStart(2, '0');
    let dd = dateParts[2].trim().padStart(2, '0');
    let startDate = yyyy + mm + dd;

    // 2. 기간 추출 (옵션 value에서 추출)
    let optVal = $("#selOption").val(); // 예: "1/3/1/5/Y/0026"
    let period = "0";
    if (optVal) {
        let parts = optVal.split("/");
        if (parts.length >= 4) {
            period = parts[3]; // 4번째 항목이 기간
        }
    }

    // 3. hidden input으로 form에 삽입
    const $form = $("form[name='frpsPrchFrm']");
    
    if ($form.find("input[name='startDate']").length === 0) {
        $form.append(`<input type="hidden" name="startDate" value="${startDate}">`);
    } else {
        $form.find("input[name='startDate']").val(startDate);
    }

    if ($form.find("input[name='period']").length === 0) {
        $form.append(`<input type="hidden" name="period" value="${period}">`);
    } else {
        $form.find("input[name='period']").val(period);
    }
    console.log("📌 startDate 추가됨?", $form.find("input[name='startDate']").length);
	console.log("📌 period 추가됨?", $form.find("input[name='period']").length);
	console.log("📌 form 내용:", $form.html());
}



//유효기간 가져오기
function fnAdtnVldTerm(){		
	setFrpsTermParamsToForm();
	console.log("📌 확인용", $("form[name='frpsPrchFrm']").html());
	var frpsPrchFrm = $("form[name=frpsPrchFrm]").serialize() ;
	$.ajax({	
        url      : "/koBus/adtnprdnew/frps/readFrpsVldTerm.ajax",
        type	 : "post",
        data 	 : frpsPrchFrm,
        dataType : "json",
        success  : function(termMap){	
        	
        	console.log("✅ 응답 성공", termMap);

			// 20200515 yahan
			if (termMap.adtnDupPrchYn == "Y" &&
				confirm("동일노선 사용일이 중복되는 프리패스가 있습니다.\n\n추가 구매하시겠습니까?") != true){
        		fnReset();
        		return;

			}
        	
        	if(termMap.rotAllCnt > 0){  
        		if(termMap.termSttDt != $("#exdtSttDt").val()){
        			alert("해당 상품은 선택하신 사용 시작일과 상품의 시작일이 일치 하지 않아 사용시작일이 변경적용 됩니다. ");
        			var getExdt = termMap.termSttDt;
            		var dt = new Date(Number(getExdt.substring(0,4)),Number(getExdt.substring(4,6))-1,Number(getExdt.substring(6,8)));
                	var yyyy = dt.getFullYear();
                	var mm   = dt.getMonth()+1;
                	var dd   = dt.getDate();
                	var week = new Array('일','월','화','수','목','금','토');
                	var wkdy = week[dt.getDay()];
                	var yyDtm = yyyy+". "+mm+". "+dd+". "+wkdy;
                	$(".text_date1").text(yyDtm);
                	$("#exdtSttDt").val(termMap.termSttDt);
        		}
        		var getExdt = termMap.timDte;
        		var dt = new Date(Number(getExdt.substring(0,4)),Number(getExdt.substring(4,6))-1,Number(getExdt.substring(6,8)));
            	var yyyy = dt.getFullYear();
            	var mm   = dt.getMonth()+1;
            	var dd   = dt.getDate();
            	var week = new Array('일','월','화','수','목','금','토');
            	var wkdy = week[dt.getDay()];
            	var yyDtm = yyyy+". "+mm+". "+dd+". ";//+wkdy;
            	
//            	$("#valTerm").text(yyDtm+wkdy);
        		$("#fulTermTd").html(termMap.fulTerm);
        		$("#fulTerm").val(termMap.fulTerm);
        		$("#spanTermDt").html(termMap.fulTerm);
        		
        		$("#pubAmtTop").html(comma(termMap.pubAmt));
        		$("#pubAmt").html(comma(termMap.pubAmt) + " 원");
        		
        		$("#goodsPrice").val(termMap.pubAmt); // 20241010 간편결제 금액설정
        		
        		var mm2Len = Number(mm) < 10 ? "0"+mm : mm;
        		var dd2Len = Number(dd) < 10 ? "0"+dd : dd;
        		$("#exdtEndDt").val(yyyy+""+mm2Len+""+dd2Len);
        		
        		allPrchAmt = termMap.pubAmt; // 예상 금액 설정
        		
        		if(Number(termMap.pubAmt) >= 50000){ // 할부 개월 콤보박스는 5만원으로 분기
        			$("#mipMmShow").css("display","block");
	        	}else{
	        		$("#mipMmShow").css("display","none");
	        	}
        	}else{
        		alert(termMap.rcvMsgNm);  
        		fnReset();
        		return;
        	}
        },
        error:function (e){
        	console.error("❌ Ajax 실패", e);
            //alert("connection error");
        }
    });
}

function fnReset(){
	//$("#weekList").html("");
	//$("#kindList").html("");
	//$("#gradeList").html("");
	//$("#dayList").html("");
	$("#rotTd").html("");
	$("#weekTd").html("");
	$("#kindTd").html("");
	$("#gradeTd").html("");
	$("#dayTd").html("");
	//$("#valTerm").text("사용 종료일은 상품종류에 따라 자동 설정 됩니다.");
	$("#fulTermTd").html("");
	$("#pubAmt").html("0 원");
	$("#goodsPrice").val(0); // 20241010 간편결제 금액설정	
	$("#pubAmtTop").html("0");
	$("input:radio[name='adtnPrdUseClsCd']").prop("checked",false);
	$("input:radio[name='adtnPrdUseNtknCd']").prop("checked",false);
	$("input:radio[name='wkdWkeNtknCd']").prop("checked",false);
	$("#tmpPsbYN").css('display', 'none');		// 임시차 문구
	$("#divTermDesc").css('display', 'none');	// 사용기간 문구
	if (is_select("selOption")){
		$("#selOption").val("0").prop("selected",true);
		$("#selOption").selectric();
	}
	else{
		$("#selOption").val('');
	}
}

function fnFrmSubmit(){
	$("#passPrchGdFrm").attr("action","/adtnprdnew/pass/passPrch.do");
	$("#passPrchGdFrm").submit();
}

function fnYyDtmStup(dtVal){ // 날짜 계산	
	var dtItem = dtVal.split(".");
	var dtBuf = dtItem[0].trim() + (dtItem[1].trim() < 10 ? "0" + dtItem[1].trim() : dtItem[1].trim()) + (dtItem[2].trim() < 10 ? "0" + dtItem[2].trim() : dtItem[2].trim());
	
	$(".text_date1").text(dtVal);
	$("#exdtSttDt").val(dtBuf);
	
	fnFrpsDtl();
}		
/*
function fnSetCardCam(){
	$.ajax({	
	    url      : "/mrs/cardCamList.ajax",
	    type     : "post",
	    dataType : "json",
	    success  : function(cardCamListMap){
	    	var listCnt = cardCamListMap.listCnt;
	    	var cardCdList = cardCamListMap.cardCdList;
	    	if(listCnt > 0){
	    		fnSetCardCd(listCnt,cardCdList);
	    	}else{
	    		alert("카드정보를 불러오는중 오류발생!");
	    	}
	    },
	    error : function(){
	    	alert("카드정보를 불러오는중 오류발생!");
	    }
	});
}
*/
function fnSelCardCam(){
	if($("#cardKndCd").val() != "0"){
		$("#cardKindList").find('.label').addClass('add');
	}else{
		$("#cardKindList").find('.label').removeClass('add');
	}
}

/*fn_PrdprchFn*/
function fnStplCfmPym(){
	$('.loading').show();

	// 결재 하기
	var frpsPrchFrm = $("form[id=frpsPrchFrm]").serialize();
	
	$.ajax({	
        url      : "/adtnprdnew/frps/addFrpsPrdprchFn.ajax",
        type	 : "post",
        data	 : frpsPrchFrm,
        dataType : "json",
        success  : function(prchResultMap){	
	        if(prchResultMap.MSG_CD == "S0000"){
				// 구매 완료 페이지로 이동
	        	$('#adtnCpnNo').val(prchResultMap.ADTN_CPN_NO);
				$('#adtnDeprNm').val(prchResultMap.adtnDeprNm);
				$('#adtnArvlNm').val(prchResultMap.adtnArvlNm);
				$('#adtnPrdUseClsNm').val(prchResultMap.adtnPrdUseClsNm);
				$('#adtnPrdUseNtknNm').val(prchResultMap.adtnPrdUseNtknNm);
				$('#wkdWkeNtknNm').val(prchResultMap.wkdWkeNtknNm);
				$('#adtnPrdUsePsbDno').val(prchResultMap.ADTN_PRD_USE_PSB_DNO);
				$('#timSttDte').val(prchResultMap.timSttDte);
				$('#timEndDte').val(prchResultMap.timEndDte);
				$('#prchAmt').val(prchResultMap.prchAmt);
				$('#mipMmNum').val(prchResultMap.mipMmNum);
				
				$("#frpsPrchFrm").attr({action:'/adtnprdnew/frps/frpsPrchFn.do', method:'post'}).submit(); //전송
			}else{
				if(prchResultMap.MSG_DTL_CTT != null && prchResultMap.MSG_DTL_CTT != ""){
					alert(prchResultMap.MSG_DTL_CTT);
				} else {
					alert("현재 시스템 장애로 인하여 결제가 불가합니다. 잠시 후 다시 시도해 주세요.1");
				}
			}
			$('#caPerson').focus();
			$('.loading').hide();
        }, complete:function() {
        	$('.loading').hide();
        }, error:function (e) {
        	if(prchResultMap.MSG_DTL_CTT != null && prchResultMap.MSG_DTL_CTT != ""){
				alert(prchResultMap.MSG_DTL_CTT);
			} else {
				alert("현재 시스템 장애로 인하여 결제가 불가합니다. 잠시 후 다시 시도해 주세요.1");
			}
			$('#caPerson').focus();
        	$('.loading').hide();
        }
    });
}

function fn_tab(obj, event, len, nextf){ // 자동 탭 이동 기능
	if(event == "down"){
		allplen = obj.value.length;
	}else if(event == "up"){
		if(obj.value.length != allplen){
			allplen = obj.value.length;
			if(allplen == len){
				//nextf.focus();
			}
		}
		fn_isNumber(obj);
	}
}

function fn_isNumber(obj){ // 숫자인가
	var chkNo = Number(obj.value); // 맨 앞이 0일수 있으므로.
	var testNo = obj.value + "";
	
	if(isNaN(testNo) || isNaN(chkNo)){
		alert("숫자를 입력해 주세요!");
		obj.value = "";
	}
}

function fn_chkMonth(obj, spt){ 
	
	if((spt == 1) && ($("#cardMonth").val().length == 2)){
		// 유효기간 월
		var chkItem = $("#cardMonth").val();
		if(chkItem < 1 || chkItem > 12){
			alert("올바른 카드 유효기간(월)을 입력해주세요.");
			$("#cardMonth").val("");
		}
	}
	if((spt == 2) && ($("#caBirth").val().length == 6)){
		// 생년월일
		var item = $("#caBirth").val();
		if (Number(item) < 200000) item = '20'+item; else item = '19'+item;
		var chkItem = new Date(item.substring(0,4), item.substring(4,6), item.substring(6,8));
		if(chkItem == "Invalid Date" || Number(item.substring(4,6)) < 1 || Number(item.substring(4,6)) > 12 || Number(item.substring(6,8)) < 1 || Number(item.substring(6,8)) > 32){
			alert("올바른 생년월일을 입력해주세요.");
			$("#caBirth").val("");
		}
	}
	if((spt == 3) && ($("#mbrsBrdt").val().length == 6)){
		// 생년월일
//		var item = $("#mbrsBrdt").val();
//		var chkItem = new Date(item.substring(0,4), item.substring(4,6), item.substring(6,8));
//		if(chkItem == "Invalid Date" || Number(item.substring(4,6)) < 1 || Number(item.substring(4,6)) > 12 || Number(item.substring(6,8)) < 1 || Number(item.substring(6,8)) > 32){
//			alert("올바른 생년월일을 입력해주세요.");
//			$("#mbrsBrdt").val("");
//		}
		/**
		 * 20200709 yahan
		 */
		if (isValidDate($("#mbrsBrdt").val()) == false){
			$("#mbrsBrdt").val('');
		}
	}
	fn_isNumber(obj); 
}

function fnCardKindSel(val){
	if(val == "indl"){
		$("#indlBrdtCard").css("display","block");
		$("#cprtBrnCard").css("display","none");
		$("#userDvsCd").val("1");
		if(allPrchAmt > 50000){
			$("#mipMmShow").css("display","block");
		}else{
			$("#mipMmShow").css("display","none");
		}
	}else if(val == "cprt"){
		$("#indlBrdtCard").css("display","none");
		$("#cprtBrnCard").css("display","block");
		$("#userDvsCd").val("2");
		$("#mipMmShow").css("display","none");
	}
}

function fnBrnChk(divVal){
	var getlist =new Array(10);
	var chkvalue =new Array("1","3","7","1","3","7","1","3","5");
	var brn = "";
	if(divVal == "card"){
		brn = $("#comNumCard").val(); //카드결제 사업자번호
	}
	/* else if(divVal == "acnt"){
		brn = $("#acComNum").val(); //계좌이체 사업자번호
	} */
	var sum = 0;
	var sidliy = 0;
	var sidchk = 0;
	
	if(brn.length != 10){
		alert("사업자번호를 정확하게 입력하시기 바랍니다.");
		return "N";
	}
	for (var i=0;i<10;i++){
		getlist[i] = brn.substring(i,i+1);
	}
	for (var i=0;i<9;i++){
		sum += getlist[i]*chkvalue[i];
	}
	sum = sum +parseInt((getlist[8]*5)/10) ;
	sidliy = sum%10;
	sidchk = 0;

	if ( sidliy != 0 ) {
		sidchk = 10 - sidliy;
	} else {
		sidchk = 0;
	}
	if ( sidchk != getlist[9] ) {
		alert("잘못된 사업자 등록번호 입니다. 다시 입력해주십시오.");
		if(divVal == "card"){
			$("#comNumCard").val("");
			$("#comNumCard").focus();
		}
		/* else if(divVal == "acnt"){
			$("#acComNum").val("");
			$("#acComNum").focus();
		} */
		return "N";
	}else{
		return "Y";
	}
}


function onSelectChange(obj, input_val, input_name){
	console.log("onSelectChange 실행: input_name =", input_name);
	$("#"+input_name).val(input_val);
	dropdown_process(obj);

	if (input_name == 'selOption'){
		$("#selOptionText").val($(obj).text());
		fnSelOption(input_val);
		console.log("selOptionText 값:", $("#selOptionText").val());

		// ★★★ 여기에서 금액 ajax 호출!
		var selOption = $("#selOption").val();
		var parts = selOption.split("/");
		var adtn_prd_sno = parts[parts.length - 1];

		console.log("🪙 [onSelectChange] 금액 조회용 PK:", adtn_prd_sno);

		fetchAmountFromServer(adtn_prd_sno).done(function(result) {
			realAmount = Number(result.amount);
			console.log("fetchAmount ajax 콜백, 받은 amount:", result.amount, "realAmount:", realAmount);
			$("#pubAmt").text(realAmount.toLocaleString() + " 원");
			$("#amount").val(realAmount);
		});
	}
}

function setMipMm(value){
	$('#mipMmNum').val(value);
}

var openDialog = function(closeCallback){
	var win = window.open("","pymPup","width=800,height=530,toolbar=no,menubar=no,resizable=yes");
	var payType = $("#pymType").val();//지불방법

	if (payType == "pay"){
		$("input:radio[name='pynDtlCd']").each(function(){
			if ($(this).is(":checked")){
				$("#payMethodCd").val( $(this).val() );
			}
		});
		
		$("#payDtaFrm").attr("action","/mrs/payCheckout.do");
		$("#payDtaFrm").attr("target","pymPup");
		$("#payDtaFrm").submit();
	}

	var interval = window.setInterval(function(){
		try {
			if (win == null || win.closed) {
				window.clearInterval(interval);
			}
		}
		catch(e){
			
		}
	}, 1000);
	return win;
};
/*
// 간편결제
function  fnPayPymWin(){
	openDialog(function(win){
		
	});
}
*/
/*
// 드롭다운 항목 클릭 시 안전하게 이벤트 바인딩
$(document).on("click", "#selOptionLi a", function () {
	console.log("🧪 드롭다운 클릭됨:", $(this).text());
    const val = $(this).attr("onclick").match(/'(.*?)'/g).map(v => v.replace(/'/g, ''));
    const input_val = val[0];
    const input_name = val[1];

    // 반드시 전역에 있는 onSelectChange()가 실행되도록
    if (typeof onSelectChange === "function") {
        onSelectChange(this, input_val, input_name);
    } else {
        console.error("❌ onSelectChange 함수가 로드되지 않았습니다.");
    }
});
*/
/*
$(document).on("click", "#selOptionLi a", function () {
	console.log("✅ 드롭다운 클릭됨:", $(this).text());
	let input_val = $(this).attr("onclick").match(/'(.*?)'/g)?.[0]?.replace(/'/g, '');
	let input_name = $(this).attr("onclick").match(/'(.*?)'/g)?.[1]?.replace(/'/g, '');

	console.log("  - input_val:", input_val);
	console.log("  - input_name:", input_name);

	if (typeof onSelectChange === "function") {
		onSelectChange(this, input_val, input_name);
	} else {
		console.error("❌ onSelectChange 함수가 정의되지 않았습니다.");
	}
});
*/

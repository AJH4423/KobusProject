<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- saved from url=(0037)https://www.kobus.co.kr/mrs/pymcfm.do -->
<html lang="ko" class="pc"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	
		
		
			<title>예매완료 | 고속버스예매 | 고속버스예매 | 고속버스통합예매</title>
		
		
		
		
		
	
	
	
	<link rel="shortcut icon" href="https://www.kobus.co.kr/images/favicon.ico">
	
		



<script type="text/javascript">
/*********************************************
 * 상수
 *********************************************/
</script>


<link rel="stylesheet" type="text/css" href="/koBus/css/common/ui.jqgrid.custom.css">

<script type="text/javascript" src="/koBus/js/common/jquery-1.12.4.min.js"></script>
<script type="text/javascript">
//쿠키 가져오기
function getCookie( name ) {
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length ) {
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie ) { 
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) {
				endOfCookie = document.cookie.length;
			}
			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 ) {
			break;
		}
	}
	return ""; 
}
//쿠키 넣기
function setCookie( name, value, expiredays ) {
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

// 상단 네비게이션, 모바일 좌측, 모바일 하단 언어선택 설정
var lngCdCookie = getCookie("LNG_CD");

lngCdCookie = (lngCdCookie != null && lngCdCookie != undefined && lngCdCookie != "") ? lngCdCookie : "";
var lngCd = (lngCdCookie == "EN" || lngCdCookie == "CN" || lngCdCookie == "JP" || lngCdCookie == "KO") ? lngCdCookie : "KO";
$(document).ready(function() {
	if (navigator.userAgent.toUpperCase().indexOf("MSIE 5") >= 0 || navigator.userAgent.toUpperCase().indexOf("MSIE 6") >= 0 || navigator.userAgent.toUpperCase().indexOf("MSIE 7") >= 0 || navigator.userAgent.toUpperCase().indexOf("MSIE 8") >= 0) {
		// IE 8 이하
		if (location.href.indexOf("/underIE8.do") < 0) {
			// IE 8 이하 페이지 아님
			location.href = "/underIE8.do";
			return false;
		}
	}
	if (window.innerWidth < 768) {
		setCookie("IS_MOBILE_YN_WIDTH","Y",365);
		if (lngCd == "KO" && location.href.indexOf("/cmn/") < 0 && 
				location.href.indexOf("/underIE8.do") < 0 && 
				location.href.indexOf("/mrs/mrsrecppub.do") < 0 && 
				location.href.indexOf("/mrs/mrsrecppub4.do") < 0 && 
				location.href.indexOf("/mrs/mrsmbltck.do") < 0 &&
				location.href.indexOf("/mrs/acntpympup.do") < 0 && 		// 계좌이체
				location.href.indexOf("/mrs/pay") < 0 && 				// 간편결제
				location.href.indexOf("/adtnprdnew/prchpt/adtnrecppubmbl.do") < 0 && 
				location.href.indexOf("/adtnprdnew/frps/frpsPrchGdMbl.do") < 0 &&
				location.href.indexOf("/mbrs/mbrsscsn.do") < 0) {
			location.href = "/mblIdx.do";
			return false;
		}
	} else {
		setCookie("IS_MOBILE_YN_WIDTH","N",365);
	}
	// 타이틀 수정
	if ($("h2").length > 0) {
		$("title").text($("title").text() + " - " + $("h2:eq(0)").text());
	}
	var $objBody = $("body");
	if (!($objBody.hasClass("KO") || $objBody.hasClass("EN") ||  $objBody.hasClass("CN") ||  $objBody.hasClass("JP"))) {
		$objBody.addClass(lngCd);
	}
	
	
	/* asis */
	$("#lng_cd_navi option[value='" + lngCd + "'],#lng_cd_foot option[value='" + lngCd + "']").attr("selected","selected");
	$("#lng_cd_navi,#lng_cd_foot").unbind("change").bind("change",function() {
		var tempCd = this.value;
		lngCd = (tempCd != null && tempCd != undefined && tempCd != "" && (tempCd == "EN" || tempCd == "CN" || tempCd == "JP" || tempCd == "KO")) ? tempCd : "KO";
		setCookie("LNG_CD",lngCd,1);
		lngCdCookie = lngCd;
		//document.location.reload();
		location.href = "/main.do";
	}); 
});


if (lngCd == "KO") {
	var dt = new Date();		//오늘날짜 전체
	var yyyy  = dt.getFullYear();		//선택한 년도
	var mm    = dt.getMonth()+1;		//선택한 월
	var mm2Len = Number(mm) < 10 ? "0"+mm : mm;			// 선택ㅡㅜ?ㅌ월 ex:01 두글자로 변환
	var ddTo    = Number(dt.getDate()) < 10 ? "0"+dt.getDate() : dt.getDate(); 			// 숫자형
	var yymmddD0 = yyyy+""+mm2Len+""+ddTo;		//오늘날짜
	
	var url = window.location.pathname;

	if (yymmddD0 < 20200128) {
		if (url == "/main.do")
			location.href="/mainExp.do";
	}
}

</script>
<script type="text/javascript" src="/koBus/js/common/ui.js"></script>
<script type="text/javascript" src="/koBus/js/common/plugin.js"></script>
<script type="text/javascript" src="/koBus/js/common/common.js"></script>

<script type="text/javascript" src="/koBus/js/common/jquery.number.js"></script>
<script type="text/javascript" src="/koBus/js/common/security.js"></script>
	
	
<link rel="stylesheet" type="text/css" href="/koBus/css/common/style.css"><script type="text/javascript" src="/koBus/js/common/new-kor-ui.js"></script></head>

<body class="KO">
<%@ include file="common/header.jsp" %>



<!-- 브레드크럼 -->
<nav id="new-kor-breadcrumb">
	<div class="container">
		
		<ol class="breadcrumb-list">
			<li><i class="ico ico-home"></i><span class="sr-only">홈</span></li>
			 
			<li>
				<div class="dropdown-wrap breadcrumb-select">
					
					
						
							<a href="javascript:void(0)" class="btn-dropdown" title="대메뉴 선택" aria-expanded="false">
								<span class="text">고속버스예매</span><i class="ico ico-dropdown-arrow"></i></a>
						
					
						
					
						
					
						
					
						
					
						
					
						
					
					
					<ul class="dropdown-list" style="display: none;">
						
							
							
							
							
								
								
								
							
							
							<li class="selected"><a href="javascript:void(0)" title="선택됨">고속버스예매</a></li>
						
							
							
							
							
							
							<li><a href="https://www.kobus.co.kr/oprninf/alcninqr/oprnAlcnPage.do">운행정보</a></li>
						
							
							
							
							
							
							<li><a href="https://www.kobus.co.kr/adtnprdnew/frps/frpsPrchGd.do">프리패스/정기권</a></li>
						
							
							
							
							
							
							<li><a href="https://www.kobus.co.kr/ugd/mrsgd/Mrsgd.do">이용안내</a></li>
						
							
							
							
							
							
							<li><a href="https://www.kobus.co.kr/cscn/ntcmttr/readNtcList.do">고객지원</a></li>
						
							
							
							
							
							
							<li><a href="https://www.kobus.co.kr/ugd/bustrop/Bustrop.do">전국고속버스운송사업조합</a></li>
						
							
							
							
							
							
							<li><a href="https://www.kobus.co.kr/ugd/trmlbizr/Trmlbizr.do">터미널사업자협회</a></li>
						
					</ul>
				</div>
			</li>
			
			<li>
				<div class="dropdown-wrap breadcrumb-select">
					
					
						
							<a href="javascript:void(0)" class="btn-dropdown" title="하위메뉴 선택" aria-expanded="false">
								<span class="text">고속버스예매</span><i class="ico ico-dropdown-arrow"></i></a>
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
						
					
					
					<ul class="dropdown-list" style="display: none;">
						
							
								
								
								
								
									
									
									
								
								
								<li class="selected"><a href="javascript:void(0)" title="선택됨">고속버스예매</a></li>
							
						
							
								
								
								
								
								
								<li><a href="https://www.kobus.co.kr/mrs/mrscfm.do">예매확인/취소/변경</a></li>
							
						
							
								
								
								
								
								
								<li><a href="https://www.kobus.co.kr/mrs/mrsrecplist.do">영수증발행</a></li>
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
							
						
					</ul>
				</div>
			</li>
		</ol>
		
	</div>
</nav>

		
		<article id="new-kor-content" class="full">
			












<script type="text/javascript" src="/koBus/js/MrsFnFail.js"></script>
<form name="mrsFnFailFrm" id="mrsFnFailFrm" method="post" action="https://www.kobus.co.kr/mrs/pymcfm.do">
	<input type="hidden" name="estmAmt" id="estmAmt" value="${amount}"><!-- 예매금액 -->
	<input type="hidden" name="dcAmt" id="dcAmt" value="0"><!-- 할인금액 -->
	<input type="hidden" name="tissuAmt" id="tissuAmt" value="${amount}"><!-- 결제금액 -->
	<input type="hidden" name="acmtMlg" id="acmtMlg" value="0"><!-- 적립마일리지 -->
	<input type="hidden" name="mblUtlzPsbYn" id="mblUtlzPsbYn" value="Y"><!-- 모바일발권여부 -->
	
	<!-- 홈티켓발권을 위한 데이터  -->
	<input type="hidden" name="mrsMrnpNoOrg" id="mrsMrnpNoOrg" value="20250620567677"><!-- 예매번호 -->
	<input type="hidden" name="mrsMrnpNo" id="mrsMrnpNo" value=""><!-- 예매번호 -->
	<input type="hidden" name="mrsMrnpSno" id="mrsMrnpSno" value=""><!-- 예매일련번호 -->
	<input type="hidden" name="recNcnt1" id="recNcnt1" value="1"><!-- 예매카운트 -->
	
	<!-- 환승지에서 도착지까지 가기위한 데이터 -->
	<input type="hidden" name="prmmDcDvsCd" id="prmmDcDvsCd" value="0"><!-- 할인코드 -->
	<input type="hidden" name="deprCd" id="deprCd" value="010"><!-- 출발지코드 -->
	<input type="hidden" name="deprNm" id="deprNm" value="서울경부"><!-- 출발지명 -->
	<input type="hidden" name="arvlCd" id="arvlCd" value="840"><!-- 도착지코드 -->
	<input type="hidden" name="arvlNm" id="arvlNm" value="안동"><!-- 도착지명 -->
	<input type="hidden" name="tfrCd" id="tfrCd" value=""><!-- 환승지코드 -->
	<input type="hidden" name="tfrNm" id="tfrNm" value=""><!-- 환승지명 -->
	<input type="hidden" name="tfrArvlFullNm" id="tfrArvlFullNm" value=""><!-- 환승지포함 도착지 명 -->
	<input type="hidden" name="pathDvs" id="pathDvs" value="sngl"><!-- 직통sngl,환승trtr,왕복rtrp -->
	<input type="hidden" name="pathStep" id="pathStep" value="1"><!-- 직통sngl,환승trtr,왕복rtrp -->
	<input type="hidden" name="pathStepRtn" id="pathStepRtn" value=""><!-- 직통sngl,환승trtr,왕복rtrp -->
	<input type="hidden" name="deprDtm" id="deprDtm" value="20250627"><!-- 가는날(편도,왕복) -->
	<input type="hidden" name="deprDtmAll" id="deprDtmAll" value="2025. 6. 27. 금"><!-- 가는날(편도,왕복) -->
	<input type="hidden" name="takeDrtmOrg" id="takeDrtmOrg" value="160"><!-- 소요시간 -->
	<input type="hidden" name="deprDt" id="deprDt" value="20250627"><!-- 출발일 -->
	<input type="hidden" name="deprTime" id="deprTime" value="190000"><!-- 출발시각 -->
	<input type="hidden" name="selAdltCnt" id="selAdltCnt" value="1"><!-- 어른수 -->
	<input type="hidden" name="selAdltDcCnt" id="selAdltDcCnt" value="0"><!-- 할인대상어른수 -->
	<input type="hidden" name="selChldCnt" id="selChldCnt" value="0"><!-- 초등생수 -->
	<input type="hidden" name="selTeenCnt" id="selTeenCnt" value="0"><!-- 중고생수 -->
	<input type="hidden" name="selUvsdCnt" id="selUvsdCnt" value="0"><!-- 대학생수 -->
	<input type="hidden" name="selSncnCnt" id="selSncnCnt" value="0"><!-- 경로수(권종추가-201906) -->
	<input type="hidden" name="selDsprCnt" id="selDsprCnt" value="0"><!-- 장애인수(권종추가-201906) -->
	
	<input type="hidden" name="selVtr3Cnt" id="selVtr3Cnt" value="0"><!-- 보훈수(권종추가-202100525) -->
	<input type="hidden" name="selVtr5Cnt" id="selVtr5Cnt" value="0"><!-- 보훈수(권종추가-202100525) -->
	<input type="hidden" name="selVtr7Cnt" id="selVtr7Cnt" value="0"><!-- 보훈수(권종추가-202100525) -->
	
	<input type="hidden" name="selDfptCnt" id="selDfptCnt" value="0"><!-- 후불 -->
	
	<input type="hidden" name="nonMbrsYn" id="nonMbrsYn" value="N"><!-- 비회원여부 Y:비회원, N:회원 -->
	<input type="hidden" name="rtrpDtl1" id="rtrpDtl1" value=""><!--  -->
	
	<!-- 발권 완료후 폼전송을 위한 데이터 -->
	<input type="hidden" name="tissuFnfailYn" id="tissuFnfailYn" value="N">
	<input type="hidden" name="tissuFnrtnMsgNm" id="tissuFnrtnMsgNm" value="&lt;span class=&quot;accent&quot;&gt;모바일티켓&lt;/span&gt; 예매가 &lt;span&gt;완료되었습니다.&lt;/span&gt;">
	<input type="hidden" name="tissuFnrtnDtlMsgNm" id="tissuFnrtnDtlMsgNm" value="고속버스 모바일앱의 &lt;strong&gt;예매확인&lt;/strong&gt; &lt;span&gt;메뉴에서 승차권 확인이 가능합니다.&lt;/span&gt;">
	<input type="hidden" name="tissuFndeprDtDtl1" id="tissuFndeprDtDtl1" value="2025.06.27(금)">
	<input type="hidden" name="tissuFndeprTimeDtl1" id="tissuFndeprTimeDtl1" value="19:00">
	<input type="hidden" name="tissuFnmrsMrnpNo1" id="tissuFnmrsMrnpNo1" value="20250620567677">
	<input type="hidden" name="tissuFndeprTrmlNm1" id="tissuFndeprTrmlNm1" value="서울경부">
	<input type="hidden" name="tissuFnarvlTrmlNm1" id="tissuFnarvlTrmlNm1" value="안동">
	<input type="hidden" name="tissuFntakeDrtm1" id="tissuFntakeDrtm1" value="2시간 40분 소요">
	<input type="hidden" name="tissuFncacmNm1" id="tissuFncacmNm1" value="(주)경기고속">
	<input type="hidden" name="tissuFncacmCss1" id="tissuFncacmCss1" value="gyeonggi">
	<input type="hidden" name="tissuFnbusClsNm1" id="tissuFnbusClsNm1" value="우등">
	<input type="hidden" name="tissuFnrotRdhmNo1" id="tissuFnrotRdhmNo1" value="31">
	<input type="hidden" name="tissuFnmrsNumAll1" id="tissuFnmrsNumAll1" value="일반 1명">
	<input type="hidden" name="tissuFnsatsNo1" id="tissuFnsatsNo1" value="21">
	<input type="hidden" name="tissuFndeprDtDtl2" id="tissuFndeprDtDtl2" value="">
	<input type="hidden" name="tissuFndeprTimeDtl2" id="tissuFndeprTimeDtl2" value="">
	<input type="hidden" name="tissuFnmrsMrnpNo2" id="tissuFnmrsMrnpNo2" value="">
	<input type="hidden" name="tissuFndeprTrmlNm2" id="tissuFndeprTrmlNm2" value="">
	<input type="hidden" name="tissuFnarvlTrmlNm2" id="tissuFnarvlTrmlNm2" value="">
	<input type="hidden" name="tissuFntakeDrtm2" id="tissuFntakeDrtm2" value="">
	<input type="hidden" name="tissuFncacmNm2" id="tissuFncacmNm2" value="">
	<input type="hidden" name="tissuFncacmCss2" id="tissuFncacmCss2" value="">
	<input type="hidden" name="tissuFnbusClsNm2" id="tissuFnbusClsNm2" value="">
	<input type="hidden" name="tissuFnrotRdhmNo2" id="tissuFnrotRdhmNo2" value="">
	<input type="hidden" name="tissuFnmrsNumAll2" id="tissuFnmrsNumAll2" value="">
	<input type="hidden" name="tissuFnsatsNo2" id="tissuFnsatsNo2" value="">
	<input type="hidden" name="tissuFnpymCfmTime" id="tissuFnpymCfmTime" value="2025.06.20 (금) 16:46">
	<input type="hidden" name="tissuFnpymType" id="tissuFnpymType" value="pay">
	<input type="hidden" name="tissuFnpynDtlCd" id="tissuFnpynDtlCd" value="s">
	<input type="hidden" name="tissuFnmblUtlzPsbYn" id="tissuFnmblUtlzPsbYn" value="Y">
	<input type="hidden" name="tissuFnpsrmCls" id="tissuFnpsrmCls" value="">
	<input type="hidden" name="tissuFnestmAmt" id="tissuFnestmAmt" value="24400">
	<input type="hidden" name="tissuFndcAmt" id="tissuFndcAmt" value="0">
	<input type="hidden" name="tissuFntissuAmt" id="tissuFntissuAmt" value="24400">
	<input type="hidden" name="tissuFnacmtMlg" id="tissuFnacmtMlg" value="0">
	<input type="hidden" name="tissuFnmrsMrnpNoOrg" id="tissuFnmrsMrnpNoOrg" value="20250620567677">
	<input type="hidden" name="tissuFnrecNcnt1" id="tissuFnrecNcnt1" value="1">
	
</form>
			<div class="title_wrap in_process route_chk ticketingT" style="display: none;">
				













	
	
	
	
	
	
	
	





<a href="https://www.kobus.co.kr/mrs/pymcfm.do#" class="back">back</a>
<a href="https://www.kobus.co.kr/mrs/pymcfm.do#" class="mo_toggle">메뉴</a>

 
				<h2>고속버스예매</h2>
				<ol class="process">
					<li>예매정보입력</li>
					<li>결제정보입력</li>
					<li class="active last">예매완료</li>
				</ol>
			</div>		
		
		
			<!-- 타이틀 -->
			<div class="content-header" data-page-title="예매완료 | 고속버스예매 | 고속버스예매 | 고속버스통합예매">
				<div class="container">
					<div class="title-area">
						<h2 class="page-title">고속버스예매</h2>
						<ol class="process">
							<li><span class="num">1</span> 예매정보입력</li>
							<li><span class="num">2</span> 결제정보입력</li>
							<li class="active" title="현재 단계"><span class="num">3</span> 예매완료</li>
						</ol>
					</div>
					<!-- 광고 배너 추후 추가 예정 -->
					<!-- <iframe src="/html/_ad-frame.html" title="광고 프레임" class="ad-frame ad-frame-title"></iframe> -->
				</div>
			</div>
		
			
			













	
	
	
	
	
	
	


			
			
				<div class="content-body ticket_finish depth3">
					<div class="container">
			
				<h3 class="hidden">예매완료</h3>
				<div class="noti_wrap N">
					<p class="noti" id="noticeMsgNm"><span class="accent">모바일티켓</span> 예매가 <span>완료되었습니다.</span></p>
					<p class="desc" id="noticeDtlMsgNm">고속버스 모바일앱의 <strong>예매확인</strong> <span>메뉴에서 승차권 확인이 가능합니다.</span></p>
				</div>

				<div class="box_detail_info">
					<div class="routeHead">
						<p class="date">${deprDtTimeFmt} 출발</p>
						<p class="ticket_number">
							예매번호<span class="num">${resId}</span>
						</p>
					</div>
					<div class="routeBody">
						<div class="routeArea route_wrap">
							<div class="inner">
								
								<dl class="roundBox departure kor">
									<dt>출발</dt>
									<dd>${deprNm}</dd>
								</dl>
								<dl class="roundBox arrive kor">
									<dt>도착</dt>
									<dd>${arvlNm}</dd>
								</dl>
							</div>
							<div class="detail_info">
								<span>${durationStr} 소요</span>
							</div>
						</div>
						<div class="routeArea route_wrap mob_route">
							<div class="tbl_type2">
								<table class="tbl_info">
									<caption>버스 정보에 대한 표이며 고속사, 등급, 승차홈, 매수, 좌석 정보 제공</caption>
									<colgroup>
										<col style="width:68px;">
										<col style="width:*;">
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">고속사</th>
											<td>${cacmNm}<span class="gyeonggi ico_bus">${cacmNm}</span></td>
										</tr>
										<tr>
											<th scope="row">등급</th>
											<td>${indVBusClsCd}</td>
										</tr>
										<tr>
											<th scope="row">승차홈</th>
											<td>31</td>
										</tr>
										<tr>
											<th scope="row">매수</th>
											<td>${buyerSummary}</td>
										</tr>
										<tr>
											<th scope="row">좌석</th>
											<td>${seatNos}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				

				<div class="box_detail_info bgGray">
					
						<div class="routeArea route_wrap mob_route">
							<div class="tbl_type3">
								<table>
									<caption>결제 정보에 대한 표이며 결제일시, 결제수단 정보 제공</caption>
									<colgroup>
										<col style="width:80px;">
										<col style="width:*;">
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">결제일시</th>
											<td>${paidAtStr}</td>
										</tr>
										<tr>
											<th scope="row">결제수단</th>
											<td>
												
												
													
														
														${payMethod}
														
													
												
												
												
												
												
												
												
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="routeArea route_wrap mob_route">
							<div class="tbl_type3">
								<table class="taR">
									<caption>결제 정보에 대한 표</caption>
									<colgroup>
										<col style="width:50%;">
										<col style="width:*;">
									</colgroup>
									<tbody>
										
										


<!-- 												<tr> -->
<!-- 													<th scope="row">예매금액</th> -->
<!-- 													<td><span id="estmAmtView">-</span></td> -->
<!-- 												</tr> -->
<!-- 												<tr> -->
<!-- 													<th scope="row"> -->










<!-- 													</th> -->
<!-- 													<td><span id="dcAmtView">-</span></td> -->
<!-- 												</tr> -->


											<tr>
												<th scope="row">결제금액</th>
												<td><strong><span id="tissuAmtView">${amount}</span></strong><span id="tissuAmtUntView">원</span></td>
											</tr>
										
										<!-- 프리미엄 회원에만 노출 -->
										
										<!-- //프리미엄 회원에만 노출 -->
									</tbody>
								</table>
							</div>
						</div>
					
				</div>
				
				
					
					
					
						<div class="section">
							<ul class="desc_list">
								<li>학생 정기권 이용 고객님은 차량 탑승 시 학생 신분증(학생증, 청소년증, 대학생증등)을 필히 지참하시기 바랍니다.</li> <!-- 191118 추가 -->
								<li>예매하신 승차권의 터미널 발권 시에는 <strong class="txt_puple">반드시 예매에 사용하신 신용카드를 지참</strong>하셔야 하며, 해당 터미널 매표현장에 제시하신 후 예매된 사항이 있다고 말씀하시면 예매하신 승차권을 발권해 드립니다.</li> <!-- 191118 수정 -->
								<li>모바일티켓 발권 혹은 홈티켓으로 발권 하시면 터미널에서 따로 발권하지 않으셔도 승차 가능합니다.</li>
								<li>E-Pass 단말기가 부착된 고속버스에서 단말기에 예매 시 사용한 카드(교통카드 기능이 있는 신용카드만 해당)를 태그하시면 영수증과 승차권을 한번에 발권하실 수 있습니다.</li>
								<li>모바일티켓으로 회원 예매하신 내역은 <strong class="txt_puple">고속버스 티머니 앱</strong>에서도 조회하실 수 있습니다.</li> <!-- 191118 수정 -->
								<li>모바일티켓 발권시 별도의 승차권 발급없이 바로 탑승 하실수 있습니다.</li>
								<li>홈티켓 발행시 PC화면을 휴대폰으로 사진 촬영한 승차권은 효력이 없습니다.</li>
								<li>예매사항을 확인하시려면 상단의 <strong class="txt_puple">예매확인/취소/변경</strong> 메뉴를 클릭하세요.</li> <!-- 191118 수정 -->
								<li>마일리지 승차권은 예매취소는 가능하나 시간변경은 불가합니다.</li>						
								<!-- 191120 수정 -->
								<li>마일리지 승차권 취소 시, 마일리지 수수료 정책에 따라 처리됩니다.
									<ul class="dash_list">
										<li>출발 시간 이전 취소 시 100% 마일리지 환급</li>
										<li>출발 시간 이후 취소 시 100% 마일리지 차감</li>
									</ul>
								</li>
								<!-- //191120 수정 -->
								<!-- 191118 추가 -->
								<li>고속버스 정기권을 이용한 승차권 예매, 취소 안내
									<ul class="dash_list">
										<li>정기권으로 예매한 승차권은 버스 출발 시간 전까지 취소 후 다시 승차권 예매가 가능합니다.</li> <!-- 191118 수정 -->
										<li><strong class="accent2">정기권으로 예매한 승차권을 취소하지 않고 출발 시간이 지났을 경우 해당일의 동일 방향(편도) 재이용이 불가합니다.</strong></li>
										<li>정기권을 이용한 승차권 예매 및 발권은 차량 좌석이 있는 경우에만 사용이 가능합니다.</li>
									</ul>
								</li>
								<!-- //191118 추가 -->
							</ul>
						</div>
					
				
				
				
					
					
					
					
						<p class="btns col1" id="mrsInqrTissu"> <!-- 홈티켓발행 버튼이 사용될때에 클래스명이 col1 에서 col2로 변경되어야 함  -->
							<a href="https://www.kobus.co.kr/mrs/mrscfm.do" class="btnL btn_cancel">예매 확인</a>
						</p>
					
					
				
			</div>			
			
				</div>
			
		
			<!-- 홈티켓 발권 -->
			
		</article>

		<!-- footer -->

<%@ include file="common/footer.jsp" %>
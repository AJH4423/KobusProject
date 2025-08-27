<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- saved from url=(0041)https://www.kobus.co.kr/mrs/stplcfmpym.do -->
<html lang="ko" class="pc"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	
		
		
			<title>결제정보입력 | 고속버스예매 | 고속버스예매 | 고속버스통합예매</title>
		
		
		
		
		
	
	
	
	
	<link rel="shortcut icon" type="image/x-icon" href="/koBus/media/favicon.ico">
		



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
			/* location.href = "/mblIdx.do"; */
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
	
	
<link rel="stylesheet" type="text/css" href="/koBus/css/common/style.css"><script type="text/javascript" src="/koBus/js/common/new-kor-ui.js"></script>
<script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"></script>
<script src="https://cdn.iamport.kr/v1/iamport.js"></script></head>


<body class="KO">
<%@ include file="common/header.jsp" %>


<!-- 브레드크럼 -->
<nav id="new-kor-breadcrumb">
	<div class="container">
		
		<ol class="breadcrumb-list">
			<li><i class="ico ico-home"></i><span class="sr-only">홈</span></li>

				<li>
					<div class="dropdown-wrap breadcrumb-select">

						<a href="javascript:void(0)" class="btn-dropdown" title="대메뉴 선택"
							aria-expanded="false"> <span class="text">고속버스예매</span><i
							class="ico ico-dropdown-arrow"></i></a>

						<ul class="dropdown-list" style="display: none;">


							<li class="selected"><a href="/koBus/region.do" title="선택됨">고속버스예매</a></li>

							<li><a href="/koBus/kobusSchedule.do">운행정보</a></li>

							<li><a href="/koBus/pageForward.do?page=freePass">프리패스/정기권</a></li>

							<li><a href="#">이용안내</a></li>

							<li><a href="/koBus/lossCenter/main.do">고객지원</a></li>

							<li><a href="#">전국고속버스운송사업조합</a></li>

							<li><a href="#">터미널사업자협회</a></li>

						</ul>
					</div>
				</li>

				<li>
					<div class="dropdown-wrap breadcrumb-select">

						<a href="javascript:void(0)" class="btn-dropdown" title="하위메뉴 선택"
							aria-expanded="false"> <span class="text">고속버스예매</span><i
							class="ico ico-dropdown-arrow"></i></a>

						<ul class="dropdown-list" style="display: none;">
							<li class="selected"><a href="/koBus/region.do" title="선택됨">고속버스예매</a></li>
							<li><a href="/koBus/manageReservations.do">예매확인/취소/변경</a></li>
							<li><a href="#">영수증발행</a></li>
						</ul>
					</div>
				</li>
			</ol>
		
	</div>
</nav>

		
		<article id="new-kor-content">


<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/StplCfmPym.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jsbn.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/prng4.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/rng.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/rsa.js"></script>

<!-- 20200617 yahan -->
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/transkey.js"></script><script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/TranskeyLibPack_op.js"></script><script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/rsa_oaep-min.js"></script><script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jsbn-min2.js"></script><script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/typedarray.js"></script><script type="text/javascript" src="${pageContext.request.contextPath}/resources/images/transkeyServlet"></script><script type="text/javascript" src="${pageContext.request.contextPath}/resources/images/transkeyServlet(1)"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/transkey.css"> 
<script>
	$(function(){ initTranskey(); });
</script>


<form name="stplCfmPymFrm" id="stplCfmPymFrm" method="post" action="/payment/buypay.do">
	<input type="hidden" name="deprCd" id="deprCd" value="032"><!-- 출발지코드 -->
	<input type="hidden" name="deprNm" id="deprNm" value="${deprNm}"><!-- 출발지명 -->
	<input type="hidden" name="arvlCd" id="arvlCd" value="823"><!-- 도착지코드 -->
	<input type="hidden" name="arvlNm" id="arvlNm" value="${arvlNm}"><!-- 도착지명 -->
	<input type="hidden" name="tfrCd" id="tfrCd" value=""><!-- 환승지코드 -->
	<input type="hidden" name="tfrNm" id="tfrNm" value=""><!-- 환승지명 -->
	<input type="hidden" name="tfrArvlFullNm" id="tfrArvlFullNm" value=""><!-- 환승지포함 도착지 명 -->
	<input type="hidden" name="pathDvs" id="pathDvs" value="sngl"><!-- 직통sngl,환승trtr,왕복rtrp -->
	<input type="hidden" name="pathStep" id="pathStep" value="1"><!-- 단계별로 1,2로 구분 -->
	<input type="hidden" name="deprDtm" id="deprDtm" value=""><!-- 가는날(편도,왕복) -->
	<input type="hidden" name="deprDtmAll" id="deprDtmAll" value=""><!-- 가는날(편도,왕복) -->
	<input type="hidden" name="arvlDtm" id="arvlDtm" value=""><!-- 오는날(왕복) -->
	<input type="hidden" name="arvlDtmAll" id="arvlDtmAll" value=""><!-- 오는날(왕복) -->
	<input type="hidden" name="indVBusClsCd" id="indVBusClsCd" value="${indVBusClsCd}"><!-- 버스등급 -->
	<input type="hidden" name="takeDrtmOrg" id="takeDrtmOrg" value="${takeDrtmOrg}"><!-- 소요시간 -->
	<input type="hidden" name="distOrg" id="distOrg" value="208.3"><!-- 거리 -->
	<input type="hidden" name="rtrpChc" id="rtrpChc" value="1"><!-- 왕편 복편 설정 -->
	<!-- 출발일자:deprDtm or arvlDtm, 출발터미널번호:deprCd, 도착터미널번호:arvlCd  -->
	<input type="hidden" name="deprDt" id="deprDt" value="${deprDt}"><!-- 출발일 -->
	<input type="hidden" name="deprTime" id="deprTime" value="${deprTime}"><!-- 출발시각 -->
	<input type="hidden" name="alcnDeprDt" id="alcnDeprDt" value=""><!-- 배차출발일 -->
	<input type="hidden" name="alcnDeprTime" id="alcnDeprTime" value="143000"><!-- 배차출발시각 -->
	<input type="hidden" name="alcnDeprTrmlNo" id="alcnDeprTrmlNo" value="032"><!-- 배차출발터미널 -->
	<input type="hidden" name="alcnArvlTrmlNo" id="alcnArvlTrmlNo" value="700"><!-- 배차도착터미널 -->
	<input type="hidden" name="cacmCd" id="cacmCd" value="06"><!-- 운수사코드 -->
	<input type="hidden" name="deprThruSeq" id="deprThruSeq" value="1"><!-- 출발경유순서 -->
	<input type="hidden" name="arvlThruSeq" id="arvlThruSeq" value="2"><!-- 도착경유순서 -->
	
	<input type="hidden" name="ctyPrmmDcYn" id="ctyPrmmDcYn" value="Y"><!-- 시외우등할인여부 -->
	<input type="hidden" name="prmmDcDvsCd" id="prmmDcDvsCd" value="0"><!-- 시외우등할인코드 -->
	<!-- 20200327 yahan	 -->
	<input type="hidden" name="dcDvsCd" id="dcDvsCd" value="0"><!-- 할인구분코드 -->
	
	<input type="hidden" name="busCode" id="busCode" value="${busCode}"><!-- 버스스케줄ID -->
	
	
	<input type="hidden" name="selSeatNum" id="selSeatNum" value="${selSeatNum}"><!-- 선택좌석번호 -->
	<input type="hidden" name="selSeatCnt" id="selSeatCnt" value="${selSeatCnt}"><!-- 선택좌석수 -->
	<input type="hidden" name="selAdltCnt" id="selAdltCnt" value="${selAdltCnt}"><!-- 어른수 -->
	<input type="hidden" name="selAdltDcCnt" id="selAdltDcCnt" value="0"><!-- 할인대상어른수 -->
	<input type="hidden" name="selChldCnt" id="selChldCnt" value="${selChldCnt}"><!-- 초등생수 -->
	<input type="hidden" name="selTeenCnt" id="selTeenCnt" value="${selTeenCnt}"><!-- 중고생수 -->
	<input type="hidden" name="selUvsdCnt" id="selUvsdCnt" value="0"><!-- 대학생수 -->
	<input type="hidden" name="selSncnCnt" id="selSncnCnt" value="0"><!-- 경로수(권종추가-201906) -->
	<input type="hidden" name="selDsprCnt" id="selDsprCnt" value="0"><!-- 장애인수(권종추가-201906) -->
	<input type="hidden" name="selVtr3Cnt" id="selVtr3Cnt" value="0"><!-- 보훈수(권종추가-20210525) -->
	<input type="hidden" name="selVtr5Cnt" id="selVtr5Cnt" value="0"><!-- 보훈수(권종추가-20210525) -->
	<input type="hidden" name="selVtr7Cnt" id="selVtr7Cnt" value="0"><!-- 보훈수(권종추가-20210525) -->
	<input type="hidden" name="selDfptCnt" id="selDfptCnt" value="0"><!-- 후불수(권종추가-20220722) -->


	<input type="hidden" name="seatNos" id="seatNos" value="${seatNos}"><!-- 각 좌석번호 -->
	<input type="hidden" name="resId" id="resId" value="${resId}">
	<input type="hidden" name="cacmNm" id="cacmNm" value="${cacmNm}">
	
	
	<!-- 예상금액 -->
	<input type="hidden" name="estmAmt" id="estmAmt" value="${estmAmt}"><!-- 예매금액 -->
	<input type="hidden" name="dcAmt" id="dcAmt" value="0"><!-- 할인금액 -->
	<input type="hidden" name="tissuAmt" id="tissuAmt" value="${tissuAmt}"><!-- 결제금액 -->
	<script>
    console.log("JSP에서 받은 tissuAmt:", "${tissuAmt}");
	</script>
	
	<input type="hidden" name="nonMbrsYn" id="nonMbrsYn" value="N"><!-- 비회원여부 Y:비회원, N:회원 -->
	<input type="hidden" name="pymType" id="pymType" value="card"><!-- 결제타입 card:카드,acnt:계좌이체, famt:정액권,perd:정기권,milage:마일리지   -->

	<!-- 20200709 yahan	 -->
	<input type="hidden" name="htckUseYn" id="htckUseYn" value="Y"><!-- 홈티켓가능여부   -->

	<input type="hidden" name="mblUtlzPsbYn" id="mblUtlzPsbYn" value="Y"><!-- 모바일발권여부   -->
	<input type="hidden" name="mblUtlzPsbYnOrg" id="mblUtlzPsbYnOrg" value="Y"><!-- 모바일발권여부   -->
	<input type="hidden" name="tlcnTrcnUtlzPsbYn" id="tlcnTrcnUtlzPsbYn" value="Y"><!-- 통합단말기유무   -->
	<input type="hidden" name="allCardNum" id="allCardNum" value=""><!-- cardnum   -->
	<input type="hidden" name="userDvsCd" id="userDvsCd" value="1"><!-- 사용자구분 1:개인 , 2:법인, 3:외국인   -->
	<input type="hidden" name="satsNoAll" id="satsNoAll" value="${selSeatNum}"><!-- 선택좌석번호전체   -->
	<input type="hidden" name="pcpyNoAll" id="pcpyNoAll" value="20250606956740"><!-- 선점번호전체   -->
	<input type="hidden" name="satsNoAll1" id="satsNoAll1" value=""><!-- 편도 or 왕편 선택좌석번호전체   -->
	<input type="hidden" name="pcpyNoAll1" id="pcpyNoAll1" value=""><!-- 편도 or 왕편 선점번호전체   -->
	<input type="hidden" name="rtrpDtl1" id="rtrpDtl1" value=""><!-- 왕복 왕편 데이터   -->
	<input type="hidden" name="satsNoAll2" id="satsNoAll2" value=""><!-- 복편 선택좌석번호전체   -->
	<input type="hidden" name="pcpyNoAll2" id="pcpyNoAll2" value=""><!-- 복편 선점번호전체   -->
	<input type="hidden" name="rtrpDtl2" id="rtrpDtl2" value=""><!-- 왕복 복편 데이터   -->
	
	<!-- 20201124 yahan -->
	<input type="hidden" name="chitUseDvs" id="chitUseDvs" value="0"><!-- 소득공제구분 0:소비자, 1:사업자, 2:자진발급-->
	
	<!-- 계좌이체 후 데이터 -->
	<input type="hidden" name="csrcNo" id="csrcNo" value=""><!-- 현금영수증번호(HP or CARD)   -->
	
	<!-- 부가상품 발권 데이터 -->
	<input type="hidden" name="adtnPrdPayType" id="adtnPrdPayType" value=""><!-- 부가상품 구분  -->
	<input type="hidden" name="adtnPrdVldCnt" id="adtnPrdVldCnt" value="0"><!-- 유효한 부가상품 데이터 수  -->
	<input type="hidden" name="adtnPrdErrYn" id="adtnPrdErrYn" value="Y"><!-- 부가상품 사용가능여부 N:불가, Y:가능  -->
	<input type="hidden" name="adtnPrdInpYn" id="adtnPrdInpYn" value="Y"><!-- 부가상품 데이터 직접입력여부 Y:직접입력, N:SELECT BOX  -->
	<input type="hidden" name="adtnPrdDvsCd" id="adtnPrdDvsCd" value=""><!-- 부가상품 종류코드: 정액권, 정기권 확인필요   -->
	<input type="hidden" name="adtnPrdBirth" id="adtnPrdBirth" value=""><!-- 부가상품 생년월일   -->
	<input type="hidden" name="adtnPrdPubChtkSno" id="adtnPrdPubChtkSno" value=""><!-- 부가상품일련번호   -->
	<input type="hidden" name="adtnPrdAutho" id="adtnPrdAutho" value=""><!-- 부가상품 인증번호   -->
	<input type="hidden" name="adtnPrdVldChkYn" id="adtnPrdVldChkYn" value="N"><!-- 부가상품 유효성검증여부   -->
	
	<input type="hidden" name="adtnCpnNo" id="adtnCpnNo" value=""><!-- 부가상품일련번호   -->
	<input type="hidden" name="passCnt" id="passCnt" value="0"><!-- 사용가능한 정기권 갯수 -->
	<input type="hidden" name="frpsCnt" id="frpsCnt" value="0"><!-- 사용가능한 프리패스 갯수 -->
	<input type="hidden" name="tckKndCd" id="tckKndCd" value=""><!-- 부가상품 권종 -->
	
	<input type="hidden" name="mileagePymYn" id="mileagePymYn" value="N"><!-- 마일리지결제가능여부 Y:가능, N:불가능   -->
	
	<input type="hidden" name="webScrnRnwl" id="webScrnRnwl" value="Y"><!-- 화면갱신을 위한 데이터 Y:새로고침, N:신규   -->

	<input type="hidden" name="unmnTerYn" id="unmnTerYn" value="N"><!-- 무인터미널여부 Y:무인, N:유인   -->
	<input type="hidden" name="rtrpYn" id="rtrpYn" value="N"><!-- 왕복여부 계좌이체 불가 안내문구용, Y:왕복,N:편도   -->
	
	<input type="hidden" name="tissuFn" id="tissuFn" value="N"><!-- 발권완료여부   -->
	<input type="hidden" name="tissuFnAllData" id="tissuFnAllData" value=""><!-- 발권완료여부   -->
	
<!-- 	2020-01-12 yahan 모바일티켓 오류수정 -->

	<input type="hidden" name="mblTissuYn" id="mblTissuYn" value="Y"><!-- 모바일발권여부   -->
	
	<input type="hidden" name="agrmYn" id="agrmYn" value="U"><!-- 국민차장제 동의 여부(Y:동의, N:거부, U:미대상)  -->
	
	<input type="hidden" name="RSAModulus" id="RSAModulus" value="bce99e2954d1181a7843b513281bc2e7e53915c7bb4c30348a6d9c198d0e1735c97af3744a85c897047baf447ee21e62d2ed9d778e965c617bff7189e1b4506d8f73447d2767415e4d25fbdbb4f35cf5aa2e19011a461d1bcb07e6a493595022a7de06b933313a709395677eecc74c3040e0c6ee5375f34bd49e693b50201b23">	<!-- 카드번호 암호화시 사용 -->
	<input type="hidden" name="RSAExponent" id="RSAExponent" value="10001"> <!-- 카드번호 암호화시 사용 -->
	
	
	<input type="hidden" name="extrComp" id="extrComp" value=""><!-- 거래처코드 -->
	<input type="hidden" name="DPC_NO" id="DPC_NO" value="">
	
	<input type="hidden" name="track2Data" id="track2Data" value=""><!-- 간편결제 -->
	<input type="hidden" name="authInf" id="authInf" value=""><!-- 간편결제 -->
	<input type="hidden" name="oderNo" id="oderNo" value=""><!-- 간편결제 -->
	<input type="hidden" name="trdNo" id="trdNo" value=""><!-- 간편결제 -->
	
	
	<!-- 발권 완료후 폼전송을 위한 데이터 -->
	<input type="hidden" name="tissuFnfailYn" id="tissuFnfailYn" value="">
	<input type="hidden" name="tissuFnrtnMsgNm" id="tissuFnrtnMsgNm" value="">
	<input type="hidden" name="tissuFnrtnDtlMsgNm" id="tissuFnrtnDtlMsgNm" value="">
	<input type="hidden" name="tissuFndeprDtDtl1" id="tissuFndeprDtDtl1" value="">
	<input type="hidden" name="tissuFndeprTimeDtl1" id="tissuFndeprTimeDtl1" value="">
	<input type="hidden" name="tissuFnmrsMrnpNo1" id="tissuFnmrsMrnpNo1" value="">
	<input type="hidden" name="tissuFndeprTrmlNm1" id="tissuFndeprTrmlNm1" value="">
	<input type="hidden" name="tissuFnarvlTrmlNm1" id="tissuFnarvlTrmlNm1" value="">
	<input type="hidden" name="tissuFntakeDrtm1" id="tissuFntakeDrtm1" value="">
	<input type="hidden" name="tissuFncacmNm1" id="tissuFncacmNm1" value="">
	<input type="hidden" name="tissuFncacmCss1" id="tissuFncacmCss1" value="">
	<input type="hidden" name="tissuFnbusClsNm1" id="tissuFnbusClsNm1" value="">
	<input type="hidden" name="tissuFnrotRdhmNo1" id="tissuFnrotRdhmNo1" value="">
	<input type="hidden" name="tissuFnmrsNumAll1" id="tissuFnmrsNumAll1" value="">
	<input type="hidden" name="tissuFnsatsNo1" id="tissuFnsatsNo1" value="">
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
	<input type="hidden" name="tissuFnpymCfmTime" id="tissuFnpymCfmTime" value="">
	<input type="hidden" name="tissuFnpymType" id="tissuFnpymType" value="">
	<input type="hidden" name="tissuFnpynDtlCd" id="tissuFnpynDtlCd" value="">
	<input type="hidden" name="tissuFnmblUtlzPsbYn" id="tissuFnmblUtlzPsbYn" value="">
	<input type="hidden" name="tissuFnpsrmCls" id="tissuFnpsrmCls" value="">
	<input type="hidden" name="tissuFnestmAmt" id="tissuFnestmAmt" value="">
	<input type="hidden" name="tissuFndcAmt" id="tissuFndcAmt" value="">
	<input type="hidden" name="tissuFntissuAmt" id="tissuFntissuAmt" value="">
	<input type="hidden" name="tissuFnacmtMlg" id="tissuFnacmtMlg" value="">
	<input type="hidden" name="tissuFnmrsMrnpNoOrg" id="tissuFnmrsMrnpNoOrg" value="">
	<input type="hidden" name="tissuFnrecNcnt1" id="tissuFnrecNcnt1" value="">
	<input type="hidden" name="tissuFntlcnTrcnUtlzPsbYn" id="tissuFntlcnTrcnUtlzPsbYn" value="">
	<input type="hidden" name="tissuHtckPsbYn" id="tissuHtckPsbYn" value="">
	
	<div class="loading" id="loading" style="height: 2410px; top: 180px; display: none;"><p class="load" style="margin-left: -53px;"><span class="sr-only">로딩중입니다</span></p></div>
	
			<div class="title_wrap in_process route_chk ticketingT" style="display: none;">
				













	
	
	
	
	
	
	
	





<a href="/payment/buypay.do" class="back">back</a>
<a href="/payment/buypay.do" class="mo_toggle">메뉴</a>

 
				<h2>고속버스예매</h2>
				<ol class="process">
					<!-- <li onclick="fnGoSatsChc();">예매정보입력</li> 예매정보입력으로 이동시 선점취소처리, 정책변경으로 이동 불가 -->
					<li>예매정보입력</li>
					<li class="active">결제정보입력</li>
					<li class="last">예매완료</li>
				</ol>
			</div>
		
		
			<!-- 타이틀 -->
			<div class="content-header" data-page-title="결제정보입력 | 고속버스예매 | 고속버스예매 | 고속버스통합예매">
				<div class="container">
					<div class="title-area">
						<h2 class="page-title">고속버스예매</h2>
						<ol class="process">
							<li><span class="num">1</span> 예매정보입력</li>
							<li class="active" title="현재 단계"><span class="num">2</span> 결제정보입력</li>
							<li><span class="num">3</span> 예매완료</li>
						</ol>
					</div>
					<!-- 광고 배너 추후 추가 예정 -->
					<!-- <iframe src="/html/_ad-frame.html" title="광고 프레임" class="ad-frame ad-frame-title"></iframe> -->
				</div>
			</div>
		
			
			













	
	
	
	
	
	
	


			
			
			
				<div class="content-body page_payment depth3">
					<div class="container">
			
				<h3 class="hidden">결제정보입력</h3>
				<div class="section">
					<div class="agreement_wrap">
						<div class="agreement_tit">
							<h4 class="first">서비스 이용약관 동의</h4>
						</div>
						<div class="agreement_cont scrollbar-inner">
							<iframe src="/koBus/cmn/SvcUtlzStplAgrm.do?type=서비스" frameborder="0" scrolling="no"  width="100%" title="서비스 이용약관 내용" onload="resize(this);"></iframe>
						</div>
						<span class="custom_check chk_blue">
							<input type="checkbox" id="agree1" onclick="fnChgCfmBtn();">
							<label for="agree1">동의</label>
						</span>
					</div>
					<div class="agreement_wrap">
						<div class="agreement_tit">
							<h4>운송약관 동의</h4>
						</div>
						<div class="agreement_cont scrollbar-inner">
							<iframe src="/koBus/cmn/TransitStplAgrm.do?type=운송" frameborder="0" scrolling="no" width="100%" height="100" title="운송약관 동의 내용" onload="resize(this);"></iframe>
						</div>
						<span class="custom_check chk_blue">
							<input type="checkbox" id="agree2" onclick="fnChgCfmBtn();">
							<label for="agree2">동의</label>
						</span>
					</div>
					<div class="agreement_wrap">
						<div class="agreement_tit">
							<h4>개인정보 수집 및 이용 동의</h4>
						</div>
						<div class="agreement_cont scrollbar-inner">
							<!-- iframe src="/cmn/IndlInfClcnUtlzAgrm.do" frameborder="0" scrolling="no" width="100%" height="130" title="개인정보 처리방침" onload="resize(this);"></iframe -->
							<div class="terms_wrap">
                                <h1>개인정보 수집 및 이용 동의</h1>
                                <dl>
                                    <dt><span class="emphasis">1. 개인정보를 제공받는 자</span></dt>
                                    <dd>
                                        <p>고속버스 승차권 온라인 예매 서비스의 제공</p>		
                                    </dd>
                                    <dt>2. 수집하는 항목</dt>
                                    <dd>
                                        <p>신용카드 번호ㆍ유효기간ㆍ신용카드 비밀번호 앞 2자리, 생년월일, 휴대전화번호</p>			
                                    </dd>
                                    <dt><span class="emphasis">3. 보유 및 이용 기간</span></dt><!-- 181121 수정 -->
                                    <dd>
                                        <p>5년 (근거: 전자상거래 등에서의 소비자 보호에 관한 법률)</p>			
                                    </dd>
                                    <dt>4. 개인정보 수집 및 이용 동의 거부 시 승차권 예매 하실 수 없습니다.</dt><!-- 181121 추가 -->
                                </dl>
                                <p>시행일자 : 2017년 5월 18일 </p>
                            </div>  
						</div>
						<span class="custom_check chk_blue">
							<input type="checkbox" id="agree3" onclick="fnChgCfmBtn();">
							<label for="agree3">동의</label>
						</span>
					</div>
					
					<div class="agreement_wrap">
						<div class="agreement_tit">
							<h4>개인정보 제3자 제공에 대한 동의(선택)</h4>
						</div>
						<div class="agreement_cont scrollbar-inner">
							<!-- iframe src="/cmn/IndlInfClcnUtlzAgrm.do" frameborder="0" scrolling="no" width="100%" height="130" title="개인정보 처리방침" onload="resize(this);"></iframe -->
							
                            <div class="terms_wrap">
                                <h1>개인정보 제3자 제공에 대한 동의</h1>
                                <dl>
                                    <dt>1. 개인정보를 제공받는자: 고속버스 터미널, 고속버스운수사</dt>
                                    <dd>
                                        <p>터미널: 서울경부 센트럴시티(서울) 동서울 상봉 파주문산 파주운정 서울남부 인천 부천 송내 김포 김포공항 인천공항T1 송도 호계금호 호계동 서수원 수원 용인신갈 영통 아주대 신갈시외 고양화정 고양백석 인천동항T2 죽전 신갈영덕 성남 광명 철산 오산 안성 안성중대 안성풍림 안성공도 안성한경 안양 평촌 안성대림 안성회관 여주대 여주 양지 오천 이천시외 부밭 능서 포천 신철원 철원 용인유림 용인 경기광주 둔전 삼계리 경방 초부리 모현 매산리 양벌리 이천 구리 의정부 이천마장 이천부발 평택용이 평택대 안중오거리 안중 평택시외 평택 운천 장현 안산 상록수역 시흥시화 강릉 동해 동해그린 강원대 삼척 속초 횡계 횡성 원주 횡성시외 홍천 낙산 원주혁신 원주문막 춘천 청평 가평 강촌 화천 양양 영월 고한 태백 대전복합 대전시외 대전청사 청사시외 대전도룡 천안IC 천안 당진 서산 정안 공주 인삼랜드 금산 금산추부 배방정류소 안산테크노밸리 아산(둔포) 아산온양 아산서부 아산탕정사무소 아산 KTX 아산둔포 아산 천안공단 선문대 세종시외 탕정삼성LCD 조치원 세종연구단지 세종시 세종청 홍대세종 고대세종 오송역 오송단지 세종시(연구) 유성 논산 연무대 여주종합 기지시 홍성 내포 청양 정산 태안 보령 안면도 창기리 예산 덕산스파 청주(고속) 청주(센트럴) 남청주 북청주 청주 항 속리산 보은 옥천 중앙탑면 충주 황간 제천하소 제천 증평 괴산 평동 단양상진 단양 사평리 영춘 구인사 대천욕장 명지대 동백 강남마을 세종리젠 새릉골 구성 연원마을 죽전보정 수지현대 현대타운 독바위 범계 안양(경) 산의초교 추풍령 태안 꽃지 광주(유ㆍ스퀘어) 광주비야 목포 여천 여수 엑스포 순천신대지구 순천대 순천 순천종합 순천만 구례 광양 동광양 섬진강 나주 강진 고 녹동 무안 해제 보성 벌교 영광 영산포 영암 완도 관산 회진 원동 노력항 장흥 함평 담양 장성 문장 지도 화순 능주 옥과 곡성 진도 삼호 남악 해남 전주 호남제일 전주시외 군산 군산대야 익산팔봉 완주 애통리 김제 전북혁신 자치인재원 남원 덕과 태인 정읍 흥덕 고창 부안 전북강진 순창 봉동 진안 안천 무주 부산 부산시외 부산사상 진해 마산 내서 창원 창원역 울산시외 울산 울산신복 진주 진주시외 진주 진주개양 진주혁신 통영 장승포 고현 김해 김해장유 장유인천 김해 항 양산 밀양 동대구 서대구 대구용계 대구혁신 구미 선산 경주 김천 김천혁신 낙동강 상주 포항 청 포항 풍기 영주 안동 영덕 평해 영천 영천망정동 점촌 예천 경북도청 울진 광비 삼근 백암온천 후포 온정 대구공항 영주장수 영주꽃동산 동래 석계 통도사 언양 인보 내남 경주 건천 대창 진량</p>
                                       
                                        <p>고속운수사: 금호고속㈜ ㈜동부고속 ㈜동양고속 ㈜삼화고속 금호속리산고속㈜ ㈜중앙고속 ㈜천일고속 ㈜한일고속 ㈜동양고속운수 ㈜경기고속 경일고속㈜ ㈜금남고속 ㈜대원고속 대한여객자동차㈜ ㈜아진고속 코리아와이드경북 전북고속 충주 호남고속 고려여객㈜-시외 고 여객자동차㈜ 천일여객㈜ 경원여객㈜ ㈜성남고속 ㈜천마고속 ㈜아성고속 경남여객(시외) 경남여객 서울고속㈜ 새서울고속 대한고속 금건 진흥고속 대원공항 코리아와이드대성 금강고속 강원고속㈜ 광신고속 ㈜경남고속 경남버스㈜-시외 ㈜중부고속 ㈜가야강남 ㈜진안고속 경원여객 ㈜충남고속 한양고속 ㈜삼흥고속</p>
                                    </dd>
                                    <dt>2. 개인정보를 제공받는 자의 개인정보 이용 목적 : 배차정보 변경, 감차, 사고 등 특수한 상황에서 터미널, 고속사가 고객에게 변경 정보를 고지할 필요가 있을 때 이용</dt>
                                    <dt>3. 제공하는 개인정보의 항목 : 휴대폰번호</dt>
                               		<dt>4. 개인정보를 제공받는 자의 개인정보 보유 및 이용 기간 : 제공목적 달성 후 즉시 파기</dt>
                                    <dt>5. 개인정보 제3자 제공 동시 거부 시 승차원 예매 하실 수 없습니다.</dt>
                                </dl>
                            </div>    
						</div>
						<span class="custom_check chk_blue">
							<input type="checkbox" id="agree4" onclick="fnChgCfmBtn();">
							<label for="agree4">동의</label>
						</span>
					</div>
					
					<p class="agree_all chk_bor">
						<span class="custom_check chk_purple">
							<input type="checkbox" id="agreeAll">
							<label for="agreeAll">전체 약관에 동의합니다.</label>
						</span>
					</p>
				</div>
					
				<!-- 무인터미널&E-PASS전용터미널 출발노선 예매일 경우에만 보임-->
				<div class="section" id="unmnTerView" style="display:none;">
					<div class="ticketing_noti noti_box">
						<p>
							선택하신 노선은 출발지가 무인 터미널입니다.<br>교통카드 기능이 있는 신용카드 결제만 가능하며 예매 완료 후 홈티켓 출력이 불가합니다.<br>
							모바일 티켓 발권 또는 일반 예매 후 차량에 설치된 통합단말기에서 발권하시기 바랍니다.
							<span style="color: #ff0000">※ 예매 시 사용한 신용카드를 소지하지 않을 경우 통합단말기 발권이 불가합니다.</span>
						</p>
						
					</div>
				</div>
				<!-- // 무인터미널&E-PASS전용터미널 출발노선 예매일 경우에만 보임-->
				<!-- 왕복시 계좌이체 불가-->
				<div class="section" id="rtrpTckYn" style="display:none;">
					<div class="ticketing_noti noti_box">
						<p>
							왕복 승차권 예매 시 카드 결제만 가능하며 계좌이체 기능이 지원되지 않습니다.<br>
							편도 승차권의 경우에도 일부 노선은 계좌 이체가 지원되지 않으니 계좌이체가 확인 되지 않는 경우 카드 결제를 이용해 주시기 <br>바랍니다.
						</p>
						
					</div>
				</div>
				<!-- // 왕복시 계좌이체 불가-->
				<!-- IE가아닌 다른 브라우저로 접속시 계좌이체 불가-->
				<div class="section" id="IEChcView" style="display:none;">
					<div class="ticketing_noti noti_box">
						<p>
							접속하신 브라우저 환경에서는 계좌이체 기능이 지원되지 않습니다.<br>
							계좌이체를 이용하시려면 Internet Explorer 브라우저로 접속하시기 바랍니다.
						</p>
						
					</div>
				</div>
				<!-- // IE가아닌 다른 브라우저로 접속시 계좌이체 불가-->
				<!-- 모바일발권이 불가능한노선-->
				<div class="section" id="noMobileTck" style="display:none;">
					<div class="ticketing_noti noti_box">
						<p>
							예매하시려는 노선은 모바일 티켓 발권이 불가합니다.<br>
							일반티켓으로 예매 후 홈티켓 발행 혹은 출발터미널에서 발권하시기 바랍니다.
						</p>
						
					</div>
				</div>
				<!-- // 모바일발권이 불가능한노선-->
				
				
<!-- 2020-01-12 yahan 모바일티켓 오류 수정 -->
<!-- 				<div id="mblTckYn"> -->

<!-- 						<h4 class="mo_page">발권 구분</h4> -->
<!-- 						<p class="ticket_chk mo_page"> -->


<!-- 									<span class="custom_radio" id="moTicketSpan"> -->
<!-- 										<input type="radio" id="moTicket" name="ticket" checked="checked" onclick="fnMblTck('CAN');"> -->
<!-- 										<label for="moTicket">모바일 티켓 발권</label> -->
<!-- 									</span> -->
<!-- 									<span class="custom_radio" id="nomoTicketSpan"> -->
<!-- 										<input type="radio" id="nomalTicket" name="ticket" onclick="fnMoticketYn();"> -->
<!-- 										<label for="nomalTicket">일반 티켓 발권(홈티켓, 계좌이체)</label> -->
<!-- 									</span> -->


<!-- 									<span class="custom_radio" id="moTicketSpan"> -->
<!-- 										<input type="radio" id="moTicket" name="ticket"  onclick="fnMblTck('CAN');"> -->
<!-- 										<label for="moTicket">모바일 티켓 발권</label> -->
<!-- 									</span> -->
<!-- 									<span class="custom_radio" id="nomoTicketSpan"> -->
<!-- 										<input type="radio" id="nomalTicket" name="ticket" checked="checked" onclick="fnMoticketYn();"> -->
<!-- 										<label for="nomalTicket">일반 티켓 발권(홈티켓, 계좌이체)</label> -->
<!-- 									</span> -->


<!-- 						</p> -->
<!-- 						<div class="app_info" id="mobileAppGd" style="display:block;"> -->
<!-- 							<p class="noti">고속버스 티머니 설치하시고 <span class="line_block">빠르고 편리한 모바일 티켓 이용하세요.</span> </p> -->
<!-- 							<p class="txt">홈페이지에서 모바일 티켓 발권 시 기존과 동일하게 창구, 무인기에서 예매한 카드로 발권이 가능합니다. 추가로 고속버스 티머니 내 모바일티켓을 통해서도 별도 발권 절차 없이 승차가 가능합니다.</p> -->
<!-- 							<p class="tip">아직 앱이 없으시다면 아래 버튼을 클릭하세요. <br><a href="http://www.epassmobile.co.kr" target="_blank">고속버스 모바일앱 설치</a></p> -->
<!-- 						</div> -->

<!-- 				</div> -->

<!-- 					//170206 수정 -->
<!-- 					<p class="bul" id="mobileAppInf" style="display:block;">모바일 티켓으로 예매하시면 홈페이지에서 예매 후 별도 발권절차 없이 <span class="txt_puple">고속버스 모바일앱을 통해서만 승차</span>가 가능합니다.</p> -->
<!-- 					<p class="bul" id="mobileAppInf" style="display:block;">홈페이지에서 모바일 티켓 발권 시 기존과 동일하게 창구, 무인기에서 예매한 카드로 발권이 가능합니다. 추가로 고속버스모바일 내 모바일티켓을 통해서도 별도 발권 절차 없이 승차가 가능합니다.</p> 20170603 추가 -->


				<div id="mblTckYn" style="display: block;">
					
						<h4 class="mo_page">발권 구분</h4>
						<p class="ticket_chk mo_page">
							
								
									<span class="custom_radio active" id="moTicketSpan">
										<input type="radio" id="moTicket" name="ticket" checked="checked" onclick="fnMblTck(&#39;CAN&#39;);">
										<label for="moTicket">모바일 티켓 발권</label>
									</span>
									<span class="custom_radio" id="nomoTicketSpan">
										<input type="radio" id="nomalTicket" name="ticket" onclick="fnMoticketYn();" aria-expanded="false">
										<label for="nomalTicket">일반 티켓 발권(홈티켓)</label>
									</span>
								
								
							
						</p>
						<div class="app_info" id="mobileAppGd" style="display:block;">
							<p class="noti">고속버스 티머니 설치하시고 <span class="line_block">빠르고 편리한 모바일 티켓 이용하세요.</span> </p>
							<p class="txt">홈페이지에서 모바일 티켓 발권 시 기존과 동일하게 창구, 무인기에서 예매한 카드로 발권이 가능합니다. 추가로 고속버스모바일 내 모바일티켓을 통해서도 별도 발권 절차 없이 승차가 가능합니다.</p>
							<p class="tip"><!-- 아직 앱이 없으시다면 아래 버튼을 클릭하세요. <br> -->고속버스 모바일앱 설치</p><!-- 1103 -->
						</div>
									
				</div>
				
					<!-- //170206 수정-->
					<!-- <p class="bul" id="mobileAppInf" style="display:block;">모바일 티켓으로 예매하시면 홈페이지에서 예매 후 별도 발권절차 없이 <span class="txt_puple">고속버스 모바일앱을 통해서만 승차</span>가 가능합니다.</p> -->
					<p class="bul" id="mobileAppInf" style="display:block;">홈페이지에서 모바일 티켓 발권 시 기존과 동일하게 창구, 무인기에서 예매한 카드로 발권이 가능합니다. 추가로 고속버스 티머니 내 모바일티켓을 통해서도 별도 발권 절차 없이 승차가 가능합니다.</p> <!-- 20170603 추가 -->
				
				
				<h4 class="mo_page">가는 편 승차권 정보</h4>
				<div class="box_detail_info">
					<div class="routeHead">
						<p class="date">${deprDtFmt}&nbsp;${deprTimeFmt} 출발 </p>
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
								<span id="takeDrtm"></span>
							</div>
						</div>
						<div class="routeArea route_wrap mob_route">
							<div class="tbl_type2">
								<table class="tbl_info">
									<caption>예매 정보 표이며 고속사, 등급, 매수, 좌석 정보 제공</caption>
									<colgroup>
										<col style="width:68px;">
										<col style="width:*;">
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">고속사</th>
											<td>
												<span>${cacmNm}</span>
												<!-- 동양고속 class="dyexpress" 삼화고속 class="samhwa" 중앙고속 class="jabus" 금호고속 class="kumho" 천일고속 class="chunil" 한일고속 class="hanil" 동부고속 class="dongbu" 금호속리산고속 class="songnisan" 코버스 class="kobus" -->
											</td>
										</tr>
										<tr>
											<th scope="row">등급</th>
											<td>${indVBusClsCd}</td>
										</tr>
										<tr>
											<th scope="row">매수</th>
											<td><span id="totSelCntView">일반 ${selAdltCnt}명, 중고생 ${selTeenCnt}명, 초등생 ${selChldCnt}명</span></td>
										</tr>
										<tr>
											<th scope="row">좌석</th>
											<td>${seatNos}번</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				
				
				<h4 class="mo_page">결제정보 입력</h4>
				<div class="custom_input clfix">
					<div class="tab_wrap inradio tab_type2" data-desc-id="tab-desc1"> <!-- 190109 수정 : data-desc-id 속성 추가 (값은 하단 설명 영역인 .tab_desc_wrap의 id와 매칭) -->
										
						<ul class="tabs clfix col5" id="payTyepAllUl">
							<li id="cardLi" class="active"><input type="radio" id="payType1" name="payType" onclick="fnPymType(this,&#39;card&#39;);" title="선택됨"><label for="payType1">카드/간편결제</label></li>
								
								
								
								<li class="pay_account" id="payTypeAcnt"><input type="radio" id="payType2" name="payType" onclick="fnPymType(this,&#39;acnt&#39;);"><label for="payType2">계좌이체</label></li>
							
							
								<li id="payTypePerd"><input type="radio" id="payType3" name="payType" onclick="fnPymType(this,&#39;perd&#39;);"><label for="payType3">정기권 <span id="passCntSp">(0)</span></label></li>
							
							
								<li id="payTypeFrps"><input type="radio" id="payType4" name="payType" onclick="fnPymType(this,&#39;frps&#39;);"><label for="payType4">프리패스 <span id="frpsCntSp">(0)</span></label></li>		
							
							
							
						</ul>
						
						<div class="tab_conts" id="tab1" style="display: block;">
						
						<ul class="desc_list" id="cardNotice"> 
									<li class="txt_puple">고속버스 탑승 시 결제에 사용된 카드(창구, 무인기 발권 시), 모바일티켓, 홈티켓 중 하나를 가져오셔야 됩니다.</li>
									<li>예매가 완료된 후 예매확인/취소/변경 메뉴를 통해 예매내역을 확인 하시기 바랍니다.</li>
									<li>고속버스에 설치된 통합단말기에 기 결제한 카드(교통카드 기능이 있는 신용카드만 해당)를 태그하시면 영수증과 승차권을 한번에 발권하실 수 있습니다.</li>
									<li>모든 결제정보는 암호화 처리 후 안전하게 전송됩니다.</li>
									<li>비밀번호 입력 오류가 3회 이상 발생할 경우 홈페이지에서 결제가 불가하니 카드사/은행을 방문하셔서 처리 후 다시 시도 바랍니다.</li>
								
								</ul>
							<!-- <div class="box_inputForm">
								<strong class="label">카드종류</strong>
								<span class="radio_wrap">
									<span class="custom_radio">
										<input type="radio" id="caPerson" name="payCard" checked="true" onclick="fnCardKindSel(&#39;indl&#39;)">
										<label for="caPerson">개인</label>
									</span>
									<span class="custom_radio">
										<input type="radio" id="caCompany" name="payCard" onclick="fnCardKindSel(&#39;cprt&#39;)">
										<label for="caCompany">법인</label>
									</span>
								</span>
							</div>
							<div class="box_inputForm click_box inselect">
								<strong class="label">카드 선택</strong>
								
								
								웹 접근성 개선 셀렉트 박스 UI
								
									<div class="dropdown-wrap select-default">
										<a href="javascript:void(0)" class="btn-dropdown" title="카드 선택" aria-expanded="false">
											<span class="text">카드를 선택하세요</span></a>
										<ul class="dropdown-list" id="cardKndCdLi" style="display: none;"><li><a href="javascript:void(0)" onclick="onSelectChange(this,&#39;0&#39;, &#39;cardKndCd&#39;)">카드를 선택하세요</a></li><li><a href="javascript:void(0)" onclick="onSelectChange(this,&#39;09&#39;, &#39;cardKndCd&#39;)">롯데</a></li><li><a href="javascript:void(0)" onclick="onSelectChange(this,&#39;24&#39;, &#39;cardKndCd&#39;)">하나</a></li><li><a href="javascript:void(0)" onclick="onSelectChange(this,&#39;02&#39;, &#39;cardKndCd&#39;)">국민</a></li><li><a href="javascript:void(0)" onclick="onSelectChange(this,&#39;01&#39;, &#39;cardKndCd&#39;)">BC</a></li><li><a href="javascript:void(0)" onclick="onSelectChange(this,&#39;05&#39;, &#39;cardKndCd&#39;)">신한</a></li><li><a href="javascript:void(0)" onclick="onSelectChange(this,&#39;04&#39;, &#39;cardKndCd&#39;)">삼성</a></li><li><a href="javascript:void(0)" onclick="onSelectChange(this,&#39;15&#39;, &#39;cardKndCd&#39;)">농협</a></li><li><a href="javascript:void(0)" onclick="onSelectChange(this,&#39;08&#39;, &#39;cardKndCd&#39;)">현대</a></li><li><a href="javascript:void(0)" onclick="onSelectChange(this,&#39;18&#39;, &#39;cardKndCd&#39;)">전북</a></li><li><a href="javascript:void(0)" onclick="onSelectChange(this,&#39;12&#39;, &#39;cardKndCd&#39;)">수협</a></li><li><a href="javascript:void(0)" onclick="onSelectChange(this,&#39;14&#39;, &#39;cardKndCd&#39;)">우리</a></li><li><a href="javascript:void(0)" onclick="onSelectChange(this,&#39;01&#39;, &#39;cardKndCd&#39;)">우체국</a></li><li><a href="javascript:void(0)" onclick="onSelectChange(this,&#39;17&#39;, &#39;cardKndCd&#39;)">광주</a></li><li><a href="javascript:void(0)" onclick="onSelectChange(this,&#39;26&#39;, &#39;cardKndCd&#39;)">씨티</a></li><li><a href="javascript:void(0)" onclick="onSelectChange(this,&#39;01&#39;, &#39;cardKndCd&#39;)">기타</a></li></ul>
										<input type="hidden" name="cardKndCd" id="cardKndCd" value="">
									</div>
								
							</div>
							<div class="box_inputForm card_num clfix">
								<strong class="label">카드번호</strong>
								<span class="box_label">
									<input type="text" name="cardNum1" id="cardNum1" placeholder="입력" title="카드번호 첫 번째 4자리 입력" class="input" maxlength="4" onkeydown="this.value = onlyNumPlus(this.value);" onkeyup="fnChkNext(this,&#39;cardNum2&#39;)">
								</span>
								<span class="box_label">
									<input type="text" name="cardNum2" id="cardNum2" placeholder="입력" title="카드번호 두 번째 4자리 입력" class="input" maxlength="4" onkeydown="this.value = onlyNumPlus(this.value);" onkeyup="fnChkNext(this,&#39;cardNum3&#39;)">
								</span>
								<span class="box_label">
									<input type="password" name="cardNum3" id="cardNum3" placeholder="입력" title="카드번호 세 번째 4자리 입력" class="input" maxlength="4" onkeydown="this.value = onlyNumPlus(this.value);" onkeyup="fnChkNext(this,&#39;cardNum4&#39;)">
								</span>
								<span class="box_label">
									<input type="password" name="cardNum4" id="cardNum4" placeholder="입력" title="카드번호 네 번째 4자리 입력" class="input" maxlength="4" onkeydown="this.value = onlyNumPlus(this.value);" onblur="fnChgCfmBtn();" data-tk-kbdtype="number">
								</span>
							</div>

							
							
							
							<div class="boxinput_wrap col2 clfix">
								<div class="box_inputForm">
									<label for="cardMonth" class="label">유효기간 월(MONTH)</label>
									<span class="box_label">
										<input type="text" name="cardMonth" placeholder="2자리 입력(MM)" id="cardMonth" class="input" maxlength="2" onkeydown="this.value = onlyNumPlus(this.value);" onblur="fnChgCfmBtn();">
									</span>
								</div>
								<div class="box_inputForm">
									<label for="cardYear" class="label">유효기간 년(YEAR)</label>
									<span class="box_label">
										<input type="text" name="cardYear" placeholder="2자리 입력(YY)" id="cardYear" class="input" maxlength="2" onkeydown="this.value = onlyNumPlus(this.value);" onblur="fnChgCfmBtn();">
									</span>
								</div>
							</div>
							<div class="boxinput_wrap col2 clfix">
								<div class="box_inputForm">
									<label for="cardPw" class="label">카드 비밀번호</label>
									<span class="box_label">
										<input type="password" name="cardPw" placeholder="**** 비밀번호 앞 2자리 입력" id="cardPw" class="input" maxlength="2" onkeydown="this.value = onlyNumPlus(this.value);" onblur="fnChgCfmBtn();" data-tk-kbdtype="number">
									</span>
								</div>
								
								
								
							</div>
							카드결제 : 개인
							<div class="box_inputForm" id="indlBrdtCard">
								<label for="caBirth" class="label">생년월일 6자리(YYMMDD)</label>
								<span class="box_label">
									<input type="text" name="caBirth" placeholder="예)1980년11월11일 → 801111" id="caBirth" class="input" maxlength="6" onkeydown="this.value = onlyNumPlus(this.value);" onkeyup="fnChgCfmBtn();">
								</span>
							</div>
							// 카드결제 : 개인
							카드결제 : 법인
							<div class="box_inputForm" id="cprtBrnCard" style="display:none;">
								<label for="comNumCard" class="label">사업자 등록번호</label>
								<span class="box_label">
									<input type="text" name="comNumCard" placeholder="(-)  없이 입력" id="comNumCard" class="input" maxlength="10" onkeydown="this.value = onlyNumPlus(this.value);" onkeyup="fnChgCfmBtn();">
								</span>
							</div>
							// 카드결제 
							<div class="box_inputForm click_box inselect" id="mipMmSel" style="display:none">
								<strong class="label">할부 개월수 (5만원 이상만 가능)</strong>
								
								
								웹 접근성 개선 셀렉트 박스 UI
								
									<div class="dropdown-wrap select-default">
										<a href="javascript:void(0)" class="btn-dropdown" title="할부 개월수 선택" aria-expanded="false" id="mipMmView">
											<span class="text">선택</span></a>
										<ul class="dropdown-list" style="display: none;">
											<li><a href="javascript:setMipMm(0)">일시불</a></li>
											
												<li><a href="javascript:setMipMm(2)">2 개월</a></li>
											
												<li><a href="javascript:setMipMm(3)">3 개월</a></li>
											
												<li><a href="javascript:setMipMm(4)">4 개월</a></li>
											
												<li><a href="javascript:setMipMm(5)">5 개월</a></li>
											
												<li><a href="javascript:setMipMm(6)">6 개월</a></li>
											
												<li><a href="javascript:setMipMm(7)">7 개월</a></li>
											
												<li><a href="javascript:setMipMm(8)">8 개월</a></li>
											
												<li><a href="javascript:setMipMm(9)">9 개월</a></li>
											
												<li><a href="javascript:setMipMm(10)">10 개월</a></li>
											
												<li><a href="javascript:setMipMm(11)">11 개월</a></li>
											
												<li><a href="javascript:setMipMm(12)">12 개월</a></li>
											
										</ul>
										<input type="hidden" name="mipMm" id="mipMm" value="0">
									</div>
								
							</div> -->
						</div>
						
						
							
							<div class="tab_conts" id="tab6" style="display: none;">
								<style>
									.box_inputForm.type3 {
									    height: auto;
									    padding: 12px;
									}
									.box_inputForm.type3 ul{font-size:12px}
									.box_inputForm.type3  ul li{list-style:disc;margin-left:15px;padding-top:5px;}
									.box_inputForm.type3  ul li::marker{color:red}
									.box_inputForm.type3 .custom_radio{width:auto;margin-right:20px;}
									.box_inputForm.type3 .custom_radio img{height:25px;}
									.box_inputForm.type3 .custom_radio input + label{padding-right:0;padding-left:17px;}
									.box_inputForm.type3 .custom_radio input:checked + label{background-position:left center}
									.box_inputForm.type3 .custom_radio input + label::after{content:"";width:10px;height:10px;background-color:#fff;border:1px solid #000;border-radius:6px;position:absolute;left: -2px;z-index: -1;top: 7px;}
								</style>
								<div class="box_inputForm">
									<!-- <strong id="payBirthText"></strong> -->
									<label for="bank">은행 선택 :</label>
											<select id="bank" name="bank">
											  <option value="">-- 선택하세요 --</option>
											  <option value="kb">국민</option>
											  <option value="shinhan">신한</option>
											  <option value="hana">하나</option>
											  <option value="woori">우리</option>
											</select>
								</div>
								<div class="box_inputForm type3">
									<p id="account">계좌번호: </p>
								</div>
								<div class="box_inputForm type3 intxt">
									<div class="box_inputForm type3 white intxt">
										<strong>계좌이체 관련 안내사항</strong>
										<ul>
											<li>계좌이체 예매(또는 취소)단계에서 회선장애, 기타 통신장애 또는 예매 오류시에도 예매(취소) 성공 여부를 꼭 확인하셔야 합니다.</li>
											<li>계좌이체 예매 후 승차권 터미널 발권 시 에는 예매당시 입력하신 휴대폰번호(회원의 경우 가입 시 입력한 휴대폰번호)와 생년월일(법인은 사업자 등록번호)가 필요합니다.</li>
											<li>예매는 실패하였으나 출금이 되었을때는 1시간이내로 결제취소 후 다시 입금이 되고 해당좌석은 최소 30분 후에 예매가능한 좌석이 됩니다.(경우에 따라 익일 아침에 입금 가능)</li>
											<li>계좌이체 예매취소시 즉시 예매당시의 출금계좌로 입금되나 장애 발생시 최대 한시간까지 입금이 지연될 수도 있습니다.</li>
											<li>최소 30분이내에 계좌이체 예매를 완료해야 합니다. (시간 경과시 계좌이체 예매 불가능)</li>
											<li>은행 이체를 통한 예매이므로 공인 인증서가 설치되어 있어야 합니다.</li>
										</ul>
									</div>
								</div>
							</div>
						
						
						
							
								<div class="tab_conts" id="tab2" style="display: none;">
									<!-- 계좌이체 : 개인계좌 -->
									<div class="box_inputForm">
										<!-- <strong id="acBirthText"></strong> -->
										<label for="acBirth" id="acBirthLabel" class="label">생년월일 6자리(YYMMDD)</label>
										<span class="box_label">
											<input type="text" name="acBirth" id="acBirth" placeholder="예)1980년11월11일 → 801111" class="input" maxlength="6" onkeydown="this.value = onlyNumPlus(this.value);" onblur="fnChgCfmBtn();">
										</span>
									</div>
									
									
									<!-- 20201124 yahan -->
									<div class="box_inputForm">
										<strong class="label">현금영수증 발급정보</strong>
										<span class="radio_wrap">
											<span class="custom_radio2">
												<input type="radio" id="receiptPerson" name="receiptType" checked="true" value="Person" onclick="fnAcntCsrcInf2(&#39;Person&#39;)">
												<label for="receiptPerson">개인소득공제용</label>
											</span>
											<span class="custom_radio2">
												<input type="radio" id="receiptBusiness" name="receiptType" value="Business" onclick="fnAcntCsrcInf2(&#39;Business&#39;)">
												<label for="receiptBusiness">사업자증빙용</label>
											</span>
											<span class="custom_radio2">
												<input type="radio" id="receiptNone" name="receiptType" value="" onclick="fnAcntCsrcInf2(&#39;None&#39;)">
												<label for="receiptNone">신청안함</label>
											</span>
										</span>
									</div>
									<div class="box_inputForm" style="margin-top:0;padding-bottom:10px;">
										<div class="payment2">
											
											
											<!-- 웹 접근성 개선 셀렉트 박스 UI -->
											
												<div class="dropdown-wrap select-default" id="acntCsrcPerson">
													<a href="javascript:void(0)" class="btn-dropdown" title="현금영수증 발급 방식 선택" aria-expanded="false">
														<span class="text">휴대폰번호</span></a>
													<ul class="dropdown-list" style="display: none;">
														<li><a href="javascript:fnAcntCsrcInf(&#39;Person&#39;,&#39;receiptPhone&#39;)">휴대폰번호</a></li>
														<li><a href="javascript:fnAcntCsrcInf(&#39;Person&#39;,&#39;receiptCard&#39;)">현금영수증 카드</a></li>
													</ul>
													<input type="hidden" name="receiptPersonSelect" id="receiptPersonSelect" value="receiptPhone">
												</div>
											
											
											
											
											<!-- 웹 접근성 개선 셀렉트 박스 UI -->
											
												<div class="dropdown-wrap select-default" style="display:none;" id="acntCsrcBusiness">
													<a href="javascript:void(0)" class="btn-dropdown" title="현금영수증 발급 방식 선택" aria-expanded="false">
														<span class="text">사업자등록번호</span></a>
													<ul class="dropdown-list" style="display: none;">
														<li><a href="javascript:fnAcntCsrcInf(&#39;Business&#39;,&#39;receiptBizn&#39;)">사업자등록번호</a></li>
														<li><a href="javascript:fnAcntCsrcInf(&#39;Business&#39;,&#39;receiptCard&#39;)">현금영수증 카드</a></li>
													</ul>
													<input type="hidden" name="receiptBusinessSelect" id="receiptBusinessSelect" value="receiptBizn">
												</div>
											
										</div>
									</div>
									<!-- 개인소득공제용 > 휴대폰번호 선택 -->
									<div class="box_inputForm" id="acntCsrcMbph" style="margin-top:0;padding-bottom:10px;">
										<label for="phoneNum2" class="label">휴대폰번호</label>
										<span class="box_label">
											<input type="text" name="" id="phoneNum2" placeholder="(-)없이 입력" class="input" maxlength="11" onkeydown="this.value = onlyNumPlus(this.value);" onkeyup="fnChgCfmBtn();">
										</span>
									</div>
									<!-- // 개인소득공제용 > 휴대폰번호 선택 -->
									<!-- 개인소득공제 and 사업자증빙 > 현금영수증카드 선택 -->
									<div class="box_inputForm card_num clfix" id="acntCsrcCard" style="margin-top:0;padding-bottom:10px;display:none;">
										<strong class="label">카드번호</strong>
										<span class="box_label">
											<input type="text" name="" id="reCardNum1" placeholder="입력" title="카드번호 첫 번째 4자리 입력" class="input" maxlength="4" onkeydown="this.value = onlyNumPlus(this.value);" onkeyup="fnChkNext(this,&#39;reCardNum2&#39;)">
										</span>
										<span class="box_label">
											<input type="text" name="" id="reCardNum2" placeholder="입력" title="카드번호 두 번째 4자리 입력" class="input" maxlength="4" onkeydown="this.value = onlyNumPlus(this.value);" onkeyup="fnChkNext(this,&#39;reCardNum3&#39;)">
										</span>
										<span class="box_label">
											<input type="password" name="" id="reCardNum3" placeholder="입력" title="카드번호 세 번째 4자리 입력" class="input" maxlength="4" onkeydown="this.value = onlyNumPlus(this.value);" onkeyup="fnChkNext(this,&#39;reCardNum4&#39;)">
										</span>
										<span class="box_label">
											<input type="text" name="" id="reCardNum4" placeholder="입력" title="카드번호 네 번째 4자리 입력" class="input" maxlength="6" onkeydown="this.value = onlyNumPlus(this.value);" onkeyup="fnChgCfmBtn();">
										</span>
									</div>
									<!-- // 개인소득공제 and 사업자증빙 > 현금영수증카드 선택 -->
									<!-- 사업자증빙용 > 사업자등록번호 선택 -->
									<div class="box_inputForm business_num clfix" id="acntCsrcBizn" style="margin-top:0;padding-bottom:10px;display:none;">
										<strong class="label">사업자등록번호</strong>
										<span class="box_label">
											<input type="text" name="" id="reBiznNum1" placeholder="입력" title="사업자등록번호 첫 번째 3자리 입력" class="input" maxlength="3" onkeydown="this.value = onlyNumPlus(this.value);" onkeyup="fnChkNext(this,&#39;reBiznNum2&#39;)">
										</span>
										<span class="box_label">
											<input type="text" name="" id="reBiznNum2" placeholder="입력" title="사업자등록번호 두 번째 2자리 입력" class="input" maxlength="2" onkeydown="this.value = onlyNumPlus(this.value);" onkeyup="fnChkNext(this,&#39;reBiznNum3&#39;)">
										</span>
										<span class="box_label">
											<input type="text" name="" id="reBiznNum3" placeholder="입력" title="사업자등록번호 세 번째 5자리 입력" class="input" maxlength="5" onkeydown="this.value = onlyNumPlus(this.value);" onkeyup="fnChgCfmBtn();">
										</span>
									</div>
									<!-- // 사업자증빙용 > 사업자등록번호 선택 -->
									<!-- // 계좌이체 : 개인계좌 -->

								</div>
							
						
						
						
							<!-- 정기권 -->
							<div class="tab_conts" id="tab3" style="display: none;">
								<div class="box_inputForm click_box inselect">
									<strong class="label"><span id="passBlank">정기권 번호</span></strong>
									
									
									<!-- 웹 접근성 개선 셀렉트 박스 UI -->
									
										<div class="dropdown-wrap select-default">
											<a href="javascript:void(0)" class="btn-dropdown" title="정기권 번호 선택" aria-expanded="false" id="perdNumList">
												<span class="text">선택</span></a>
											<ul class="dropdown-list" id="perdAdtnPrdListLi" style="display: none;">
												<!-- <li><a href="javascript:void(0)">옵션1</a></li>
												<li><a href="javascript:void(0)">옵션2</a></li> -->
											</ul>
											<input type="hidden" name="perdAdtnPrdList" id="perdAdtnPrdList" value="">
										</div>
									
								</div> <!-- 181218 wrapper 추가 -->
								<div class="box_inputForm type2 white intxt">
									<strong>이용권종/이용가능일수/버스이용등급/사용일</strong> <!-- 191120 수정 -->
									<span class="box_label" id="perdAdtnPrdInfo">정기권 번호를 선택해주세요.</span>
								</div>
								<div class="noti_box error_box show">
									<p id="perdAdtnPrdExdt">사용기간 중에만 사용이 가능합니다.</p>
								</div>
							</div>
							<!-- //정기권 -->
						

						
							<!-- 프리패스 -->
							<div class="tab_conts" id="tab4" style="display: none;">
								<div class="box_inputForm click_box inselect">
									<strong class="label">프리패스 번호</strong>
									
									
									<!-- 웹 접근성 개선 셀렉트 박스 UI -->
									
										<div class="dropdown-wrap select-default">
											<a href="javascript:void(0)" class="btn-dropdown" title="프리패스 번호 선택" aria-expanded="false" id="frpsNumList">
												<span class="text">선택</span></a>
											<ul class="dropdown-list" id="frpsAdtnPrdListLi" style="display: none;">
												<!-- <li><a href="javascript:void(0)">옵션1</a></li>
												<li><a href="javascript:void(0)">옵션2</a></li> -->
											</ul>
											<input type="hidden" name="frpsAdtnPrdList" id="frpsAdtnPrdList" value="">
										</div>
									
								</div>
								
								 <!-- 181218 wrapper 추가 -->
								<div class="box_inputForm type2 white intxt">
									<strong>상품 종류/사용일/등급</strong>
									<span class="box_label">
										<span class="useDate2" id="frpsAdtnPrdInfo">프리패스 번호를 선택해주세요.</span>
									</span>
								</div>
								<div class="box_inputForm type2 white intxt">
									<strong>사용일자</strong>
									<span class="box_label">
										<span class="useDate2" id="frpsAdtnPrdExdt">사용기간 중에만 사용이 가능합니다.</span>
									</span>
								</div>
							</div>
							<!-- //프리패스 -->
						
						
						
					
					
						
						 
					</div>
					<div class="payment_sum" style="height: 450px;">
						<div class="tbl_type3">
							<table class="taR">
								<caption>결제금액 정보</caption>
								<colgroup>
									<col style="width:50%;">
									<col style="width:*;">
								</colgroup>
								<tbody>
									<tr>
										<th scope="row" class="txt_black">예매금액</th>
										<td><strong id="estmAmtView">${estmAmt}원</strong></td>
									</tr>
									
									<tr>
										<th scope="row"><span id="adtnPrdNm">&nbsp;</span></th>
										<td><span id="adtnPrdCnt">&nbsp;</span></td>
									</tr>
									<tr class="total">
										<th scope="row" class="txt_black">총 결제금액</th>
										<td class="totalPrice"><span id="tissuAmtView">${tissuAmt}원</span></td>
									</tr>
								</tbody>
							</table>
						</div>
						<p class="btn bottom">
							<button type="button" id="stplCfmBtn" class="btnL btn_confirm ready" onclick="requestPay()">결제하기</button>
						</p>
					</div>
				</div>

				<div id="tab-desc1" class="section tab_desc_wrap"> <!-- 190109 수정 : tab_desc_wrap 클래스 및 id 추가 -->
					<!-- 카드결제 -->
								
					<!-- // 카드결제 -->
					<!-- 간편결제 -->
					<div class="tab_desc"></div>
					<!-- //간편결제 -->
				
					
					<!-- 계좌이체 -->
					<div class="tab_desc"> <!-- 190109 추가 : wrapper 추가 - tab_desc -->
						
					</div>
					<div class="account_agreement agreement_wrap noiframe" id="acntNotice2" style="display:none;">
						<div class="agreement_tit">
							<h4>계좌이체 약관</h4>
						</div>
						<div class="scroll-wrapper agreement_cont scrollbar-inner" style="position: relative;"><div class="agreement_cont scrollbar-inner scroll-content" style="height: 108px; margin-bottom: 0px; margin-right: 0px; max-height: none;">
							<ol>
								<li>1. 본 서비스의 이용과 관련하여 결제계좌 소유자의 정보는 “정보통신망이용촉진 및 정보보호등에 관한 법률” ,“신용정보의 이용 및 보호에 관한 법률”규정에 따라 타인에게 제공 또는 활용시에는 결제계좌 소유자 본인의 동의를 얻어야 하는 중요 정보임을 명백히 합니다.</li>
								<li>2. 인증확인서비스제공기관 및 제휴기관은 신청인 본인의 개인신용정보를 관계법령에 의해 철저히 관리, 보관합니다.</li>
								<li>3.본 신청인은 예매내역의 확인과 서비스 이용을 위하여 결제계좌 소유자의 성명,주민번호 등 개인의 정보를 당 서비스를 제공하는 업체(한국스마트카드)에 제공함으로써 원활한 서비스를 제공받는데 동의합니다.</li>
							</ol>
						</div><div class="scroll-element scroll-x"><div class="scroll-element_outer"><div class="scroll-element_size"></div><div class="scroll-element_track"></div><div class="scroll-bar"></div></div></div><div class="scroll-element scroll-y"><div class="scroll-element_outer"><div class="scroll-element_size"></div><div class="scroll-element_track"></div><div class="scroll-bar"></div></div></div></div>
					</div>
					<!-- // 계좌이체 -->
					
				
					<!-- 정기권 - 190109 수정 -->
					<div class="tab_desc">
						<ul class="desc_list">
							<li><strong>정기권 사용 사용기간 내에서의 출발 차량 예매 시에만 사용 가능합니다.</strong></li>
							<li><strong>고속버스 정기권 취소 및 환불 안내</strong></li>
						</ul>
						<div class="tbl_type1 marT10 fs12">
							<table>
								<caption>고속버스 정기권 취소 및 환불 안내</caption>
								<colgroup>
									<col style="width: 48%;">
									<col style="width: auto;">
								</colgroup>
								<thead>
									<tr>
										<th scope="col">구분</th>
										<th scope="col">내용</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">구매 취소 / 환불처</th>
										<td>
											<ul class="desc_list">
												<li>코버스 홈페이지 / 고속버스 티머니 앱</li>
											</ul>
										</td>
									</tr>
									<tr>
										<th scope="row">사용 기간 시작일 이전 취소 시</th>
										<td>
											<ul class="desc_list">
												<li>사용 시작 1일 전까지 취소 가능하며, 취소 시 전액(100%) 환불 됩니다.</li> <!-- 191118 수정 -->
											</ul>
										</td>
									</tr>
									<tr>
										<th scope="row">사용 기간 중 취소 시</th>
										<td>											
											<ul class="desc_list">
												<li>사용 시작일로부터 1일 왕복 금액 소멸.</li>
												<li>사용 1일 ∼ 19일까지 취소 시 잔여 금액의 '5% 취소 수수료 X 사용 기간 경과 일수' 공제 후 환불.</li> <!-- 191118 수정 -->
												<li>사용 20일부터는 환불 불가.</li>
											</ul>
											<!-- 191025 2차 수정 -->
											<p class="desc_add type02">※ 예시) 서울~천안/우등+심우 사용등급 정기권 금액 304,200원 구매하고, 사용 기간 3일 경과 후 환불 시</p> <!-- 191118 수정 -->
											<ol>
												<li>① 304,200원(정기권) – 30,420원(3일) = 273,780원</li>
												<li>② 273,780원 X 5% X 3 = 41,067원 (취소 수수료 5%, 사용 기간 3일 경과)</li> 
												<li>③ 환불 금액 : 232,713원</li>
											</ol>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<ul class="desc_list">
							<li><strong>고속버스 정기권을 이용한 승차권 예매, 취소 안내</strong>
								<ul class="dash_list">
									<li>정기권으로 예매한 승차권은 버스 출발 시간 전까지 취소 후 다시 승차권 예매가 가능합니다.</li> <!-- 191118 수정 -->
									<li><strong class="accent2">정기권으로 예매한 승차권을 취소하지 않고 출발 시간이 지났을 경우 해당일의 동일 방향(편도) 재이용이 불가합니다.</strong></li>
									<li>정기권을 이용한 승차권 예매 및 발권은 차량 좌석이 있는 경우에만 사용이 가능합니다.</li>
								</ul>
							</li>
						</ul>
						<!-- //191118 수정 -->
					</div>
					<!-- // 정기권 - 190109 수정 -->

					<!-- 프리패스 - 190109 추가 -->
					<div class="tab_desc">
						<ul class="desc_list">
							<li><strong>터미널 창구 예매 시 필히 프리패스 번호와 신분증(생년월일 확인)을 체출 하시기 바랍니다.</strong></li>
							<li>사용 기간 내 <span class="accent2">한번 사용한 노선은 해당 프리패스로 재사용 불가합니다.</span></li>
							<li>명절 특송 기간에는 사용 불가 합니다.</li> <!-- 190319 수정 -->
							<li>사용가능 노선과 터미널를 꼭 확인하세요.</li> <!-- //190319 수정 -->							
							<li>본 프리패스는 사용 개시 1일 경과 후 교환 및 환불이 불가합니다.</li>
							<li><strong>고속버스 프리패스 환불 정책</strong>
								<ul class="dash_list">
									<li>사용 시작일 이전 프리패스는 취소 가능합니다.</li>
									<li>사용 시작 1일 후까지 취소 가능하나, 승차권 발권 상태인 경우 취소 불가능합니다.</li>									
								</ul>
							</li>
							<li><span class="accent2">프리패스로 발권한 승차권은 해당 차량 출발전까지 취소가 가능하나 해당 차량 출발 후에는 취소가 불가합니다.</span></li>
							<li>차량출발전 취소가 안된 경우 해당 노선은 프리패스를 이용한 승차권 재구매 불가합니다.</li>
							<li>차량출발전 취소를 못하고 해당 노선을 이용하고자 하시면 프리패스가 아닌 현금이나 카드로 승차권을 구입하셔서 이용하셔야 합니다.</li>
						</ul>
					</div>
					<!-- // 프리패스 190109 추가 -->
					
					<!--마일리지 -->
					<div class="tab_desc"> <!-- 190109 추가 : wrapper 추가 - tab_desc -->
						<ul class="desc_list" id="milageNotice"> <!-- 190109 수정 : display none 스타일 삭제 --> 
							<li>마일리지 승차권은 예매취소는 가능하나 시간변경은 불가합니다.</li>						
							<li>마일리지 승차권 취소시, 마일리지 수수료 정책에 따라 처리됩니다.</li>
							<li>- 출발시간 이전 취소 시 100% 마일리지 환급</li>
							<li>- 출발시간 이후 취소 시 100% 마일리지 차감</li>
						</ul>
					</div>
					<!-- // 마일리지 -->
				</div>
			</div>
			
				</div>
			
		
		<!-- 모바일티켓 - 일반티켓 변경예매 -->
		
		<!-- 부가상품 구매시 할인권 적용불가 -->
		
		<!-- 마일리지결제시 취소반환되지 않음. -->
 		
<input type="hidden" id="hidfrmId" name="hidfrmId" value="stplCfmPymFrm"><input type="hidden" id="transkeyUuid_stplCfmPymFrm" name="transkeyUuid_stplCfmPymFrm" value="c3f09c69d4b7f6d31d840292f9c7d3daa0432b0d0ac3f5080c7d1e9ef9a4cee7"><input type="hidden" id="transkey_cardNum3_stplCfmPymFrm" name="transkey_cardNum3_stplCfmPymFrm" value=""><input type="hidden" id="transkey_HM_cardNum3_stplCfmPymFrm" name="transkey_HM_cardNum3_stplCfmPymFrm" value=""><input type="hidden" id="transkey_cardNum4_stplCfmPymFrm" name="transkey_cardNum4_stplCfmPymFrm" value=""><input type="hidden" id="transkey_HM_cardNum4_stplCfmPymFrm" name="transkey_HM_cardNum4_stplCfmPymFrm" value=""><input type="hidden" id="transkey_cardPw_stplCfmPymFrm" name="transkey_cardPw_stplCfmPymFrm" value=""><input type="hidden" id="transkey_HM_cardPw_stplCfmPymFrm" name="transkey_HM_cardPw_stplCfmPymFrm" value=""><input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" /></form>	
<!-- 비회원 로그인을 위한 데이터 FORM -->
<form name="nonMbrsLgnFrm" id="nonMbrsLgnFrm" method="post">
        <input type="hidden" name="returnUrl" id="returnUrl" value="">		<!-- 리턴페이지 -->
        <input type="hidden" name="nombrsid" id="nombrsid" value="">		<!-- 전화번호 -->
        <input type="hidden" name="nombrspass" id="nombrspass" value="">		<!-- 인증번호 -->
        <input type="hidden" name="mbrsDvsCd" id="mbrsDvsCd" value="1"><!-- 비회원 -->
        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
</form>

<form name="payDtaFrm" id="payDtaFrm" method="post"> <!-- 간편결제용 FORM  -->
	<input type="hidden" name="payMethodCd" id="payMethodCd" value="">
	
	<input type="hidden" name="goodsName" id="payGoodsName" value="(고속버스티머니)승차권">
	<input type="hidden" name="goodsCnt" id="payGoodsCnt" value="1">
	<input type="hidden" name="goodsPrice" id="payGoodsPrice" value="${tissuAmt}">
	<input type="hidden" name="popupStatus" id="popupStatus" value="">
	<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
</form>
<form name="acntDtaFrm" id="acntDtaFrm" method="post"> <!-- 계좌이체용 FORM  -->
	<input type="hidden" name="payMethod" id="payMethod" value="BANK">
	<input type="hidden" name="goodsName" id="goodsName" value="">
	<input type="hidden" name="goodsCnt" id="goodsCnt" value="1">
	<input type="hidden" name="amt" id="amt" value="">
	<input type="hidden" name="buyerName" id="buyerName" value="">
	<input type="hidden" name="buyerTel" id="buyerTel" value="">
	<input type="hidden" name="moid" id="moid" value="">
	<input type="hidden" name="mid" id="mid" value="">
	<input type="hidden" name="userIP" id="userIP" value="">		<!-- 회원사고객IP -->
	<input type="hidden" name="mallIP" id="mallIP" value="">		<!-- 상점서버IP -->

	<!-- 옵션 -->
	<input type="hidden" name="vExp" id="vExp" value="">		<!-- 가상계좌입금만료일 -->
	<input type="hidden" name="charSet" id="charSet" value="">		<!-- 인코딩 설정 -->
	<input type="hidden" name="buyerEmail" id="buyerEmail" value="">		<!-- 구매자 이메일 -->
	<input type="hidden" name="socketYN" id="socketYN" value="">		<!-- 소켓이용유무 -->
	<input type="hidden" name="goodsCl" id="goodsCl" value="1">		<!-- 상품구분(실물(1),컨텐츠(0)) -->
	<input type="hidden" name="transType" id="transType" value="0">		<!-- 일반(0)/에스크로(1) -->

	<!-- 변경 불가능 -->
	<input type="hidden" name="encodeParameters" id="encodeParameters" value="">		<!-- 암호화대상항목 -->
	<input type="hidden" name="ediDate" id="ediDate" value="">		<!-- 전문 생성일시 -->
	<input type="hidden" name="encryptData" id="encryptData" value="">		<!-- 해쉬값	-->
	<input type="hidden" name="trKey" id="trKey" value="">		<!-- 필드만 필요 -->
	<input type="hidden" name="optionList" id="optionList" value="no_receipt">
	<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
</form>
<form name="adtnPrdVldtFrm" id="adtnPrdVldtFrm" method="post"><!-- 부가상품 유효성 검사 -->
	<input type="hidden" name="adtnPrdDvsCdVldt" id="adtnPrdDvsCdVldt" value="">		<!-- 부가상품 종류코드: 정액권, 정기권 확인필요   -->
	<input type="hidden" name="pubChtkSnoVldt" id="pubChtkSnoVldt" value="">		<!-- 부가상품 일련번호   -->
	<input type="hidden" name="adtnAuthNo" id="adtnAuthNo" value="">		<!-- 부가상품 인증번호   -->
	<input type="hidden" name="adtnDeprCd" id="adtnDeprCd" value="">		<!-- 부가상품 출발지   -->
	<input type="hidden" name="adtnArvlCd" id="adtnArvlCd" value="">		<!-- 부가상품 도착지   -->
	<input type="hidden" name="adtnSelSeatCnt" id="adtnSelSeatCnt" value="">		<!-- 선택좌석수   -->
	<input type="hidden" name="adtnBusClsCd" id="adtnBusClsCd" value="">		<!-- 버스등급   -->
	<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
</form>
<form name="satsPcpyCancFrm" id="satsPcpyCancFrm" method="post"><!-- 선점취소용 -->
	<input type="hidden" name="cancPcpyNoAll" id="cancPcpyNoAll" value="">		<!-- 선점번호   -->
	<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
</form>
<form name="stplCfmPymPcFrm" id="stplCfmPymPcFrm" method="post"><!-- 평창연계용 -->
	<input type="hidden" name="token" id="token" value="">		<!-- 토큰   -->
	<input type="hidden" name="transport" id="transport" value="">		<!--  교통수단별 코드   -->
	<input type="hidden" name="code" id="code" value="">		<!-- 결제/취소 여부   -->
	<input type="hidden" name="date" id="date" value="">		<!-- 출발 시각   -->
	<input type="hidden" name="from" id="from" value="">		<!-- 출발지 명칭   -->
	<input type="hidden" name="to" id="to" value="">		<!-- 도착지 명칭   -->
	<input type="hidden" name="sn" id="sn" value="">		<!-- 데이터 키   -->
	<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
</form>
		</article>

		<!-- footer -->
		



<!-- 푸터 -->
<%@ include file="common/footer.jsp" %>
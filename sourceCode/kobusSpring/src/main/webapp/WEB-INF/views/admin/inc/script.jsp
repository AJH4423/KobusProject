<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- saved from url=(0041)https://www.kobus.co.kr/mrs/stplcfmpym.do -->
<html lang="ko" class="pc"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	
		
		
			<title>결제정보입력 | 고속버스예매 | 고속버스예매 | 고속버스통합예매</title>
		
		
		
	
	<link rel="shortcut icon" type="image/x-icon" href="${pageContext.request.contextPath}/resources/media/favicon.ico">
	
		


<script type="text/javascript">
/*********************************************
 * 상수
 *********************************************/
</script>


<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/cdn-main/common/ui.jqgrid.custom.css">

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/jquery-1.12.4.min.js"></script>
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
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/plugin.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/jquery.number.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/security.js"></script>


<link rel="stylesheet" type="text/css"
	href="/koBus/resources/cdn-main/common/style.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/js/common/new-kor-ui.js"></script>
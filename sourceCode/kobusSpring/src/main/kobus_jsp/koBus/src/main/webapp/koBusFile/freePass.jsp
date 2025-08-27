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
							aria-expanded="false"> <span class="text">프리패스/정기권</span><i
							class="ico ico-dropdown-arrow"></i></a>


						<ul class="dropdown-list" style="display: none;">

							<li><a href="/koBus/region.do">고속버스예매</a></li>

							<li><a href="/koBus/manageReservations.do">운행정보</a></li>

							<li class="selected"><a
								href="/koBus/pageForward.do?page=freePass" title="선택됨">프리패스/정기권</a></li>

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
							aria-expanded="false"> <span class="text">프리패스 여행권</span><i
							class="ico ico-dropdown-arrow"></i></a>

						<ul class="dropdown-list" style="display: none;">
							<li class="selected"><a
								href="/koBus/pageForward.do?page=freePass" title="선택됨">프리패스
									여행권</a></li>
							<li><a href="/koBus/pageForward.do?page=seasonTicket">정기권</a></li>

							<li><a href="/koBus/page/itemPurListPage.do">상품 구매내역</a></li>

						</ul>
					</div>
				</li>
			</ol>
		
	</div>
</nav>

		
		<article id="new-kor-content">
			


<script type="text/javascript" src="/koBus/js/FrpsPrch.js"></script>
<script type="text/javascript" src="/koBus/js/ReadLgnInf.js"></script>

<!-- 20200617 yahan -->
<script type="text/javascript" src="/koBus/js/transkey.js"></script><script type="text/javascript" src="/koBus/js/TranskeyLibPack_op.js"></script><script type="text/javascript" src="/koBus/js/rsa_oaep-min.js"></script><script type="text/javascript" src="/koBus/js/jsbn-min2.js"></script><script type="text/javascript" src="/koBus/js/typedarray.js"></script><script type="text/javascript" src="/koBus/images/transkeyServlet"></script><script type="text/javascript" src="/koBus/images/transkeyServlet(1)"></script>
<link rel="stylesheet" type="text/css" href="/koBus/css/transkey.css"> 
<script>
	$(function(){ initTranskey(); })
</script>


	<div class="title_wrap in_process freepassT" style="display: none;">
		

<a href="#" class="back">back</a>
<a href="#" class="mo_toggle">메뉴</a>


		<h2>고속버스 프리패스 여행권</h2>
		<ol class="process">
			<li> 구매정보안내</li>
			<li class="active">구매정보입력</li>
			<li class="last">구매완료</li>
		</ol>
	</div>
			
	
		<!-- 타이틀 -->
		<div class="content-header" data-page-title="프리패스 여행권(구매정보입력) | 프리패스/정기권 | 고속버스통합예매">
			<div class="container">
				<div class="title-area">
					<h2 class="page-title">프리패스 여행권</h2>
					<ol class="process">
						<li><span class="num">1</span> 구매정보안내</li>
						<li class="active" title="현재 단계"><span class="num">2</span> 구매정보입력</li>
						<li><span class="num">3</span> 구매완료</li>
					</ol>
				</div>
			</div>
		</div>
	
	
	
		<div class="content-body pass_ticket">
			<div class="container">
	

	<form name="frpsPrchFrm" id="frpsPrchFrm" method="post">
		<input type="hidden" id="exdtSttDt" name="exdtSttDt" value="20250611">
		<input type="hidden" id="exdtEndDt" name="exdtEndDt" value="">
		<input type="hidden" id="adtnDeprTrmlNo" name="adtnDeprTrmlNo" value="">
		<input type="hidden" id="adtnArvlTrmlNo" name="adtnArvlTrmlNo" value="">
		<input type="hidden" id="cardExdt" name="cardExdt" value="">
		<input type="hidden" id="cardNo" name="cardNo" value="">
		<input type="hidden" name="userDvsCd" id="userDvsCd" value="1"><!-- 사용자구분 1:개인 , 2:법인, 3:외국인   -->		
		
		<input type="hidden" id="adtnCpnNo" name="adtnCpnNo" value="">
		<input type="hidden" id="adtnDeprNm" name="adtnDeprNm" value="">
		<input type="hidden" id="adtnArvlNm" name="adtnArvlNm" value="">
		<input type="hidden" id="adtnPrdUseClsNm" name="adtnPrdUseClsNm" value="">
		<input type="hidden" id="adtnPrdUseNtknNm" name="adtnPrdUseNtknNm" value="">
		<input type="hidden" id="wkdWkeNtknNm" name="wkdWkeNtknNm" value="">
		<input type="hidden" id="timSttDte" name="timSttDte" value="">
		<input type="hidden" id="timEndDte" name="timEndDte" value="">
		<input type="hidden" id="prchAmt" name="prchAmt" value="">
		<input type="hidden" id="fulTerm" name="fulTerm" value="">
		
		<input type="hidden" id="adtnPrdUseClsCd" name="adtnPrdUseClsCd" value="">
		<input type="hidden" id="adtnPrdUseNtknCd" name="adtnPrdUseNtknCd" value="">
		<input type="hidden" id="wkdWkeNtknCd" name="wkdWkeNtknCd" value="">
		<input type="hidden" id="adtnPrdUsePsbDno" name="adtnPrdUsePsbDno" value="">
		<input type="hidden" id="adtnPrdSno" name="adtnPrdSno" value="${adtnPrdSno}">
		
		<input type="hidden" id="frpsPrchGdEvent" name="frpsPrchGdEvent" value="">
		
		<input type="hidden" name="pymType" id="pymType" value="card"><!-- 결제타입 card:카드,acnt:계좌이체, famt:정액권,perd:정기권,milage:마일리지   -->
		<input type="hidden" name="track2Data" id="track2Data" value=""><!-- 간편결제 -->
		<input type="hidden" name="authInf" id="authInf" value=""><!-- 간편결제 -->
		
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
                                <dt><span class="emphasis">1. 수집 및 이용의 목적</span></dt><!-- 181121 수정 -->
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
                                <dt>4. 개인정보 수집 및 이용 동의 거부 시 프리패스 구매 하실 수 없습니다.</dt><!-- 181121 추가 -->
                            </dl>
                            <p>시행일자 : 2017년 5월 18일 </p>
                            </div>  
						</div>
						<span class="custom_check chk_blue">
							<input type="checkbox" id="agree3" onclick="fnChgCfmBtn();">
							<label for="agree3">동의</label>
						</span>
					</div>	
					<p class="agree_all chk_bor">
						<span class="custom_check chk_purple">
							<input type="checkbox" id="agreeAll">
							<label for="agreeAll">전체 약관에 동의합니다.</label>
						</span>
					</p>
				</div>
			<!-- 181218 수정 -->
			<div class="section">
				<h4 class="first">구매 선택 사항</h4>
				<div class="custom_input type3">
					<div class="line_box">
						<div class="dl_tbl_wrap col2">
							<dl class="dl_tbl1">
								<dt><span>시작일자</span></dt>
								<dd>
									<div class="box_inputForm click_box date_picker_wrap">
										<strong class="label">사용시작일</strong>
										<p class="text">
											<input type="text" id="datepickerItem" tabindex="-1" readonly=""><button type="button" class="datepicker-btn"></button>
											<label for="datepickerItem" class="text_date text_date1"></label>										
											<!-- <span class="text_date text_date1"></span>
											<input type="text" id="datepickerItem" readonly> -->
										</p>
									</div>
								</dd>
							</dl>
							<dl class="dl_tbl1">
								<dt><span>생년월일</span></dt>
								<dd>
									<!-- 181219 수정 -->
									<div class="box_inputForm desc_wrap">
										<div class="box_inputForm intxt">
											<label for="mbrsBrdt" class="label">생년월일 6자리(YYMMDD)</label>
											<span class="box_label">
												<input type="text" name="mbrsBrdt" id="mbrsBrdt" placeholder="예)1980년11월11일 -&gt; 801111" class="input" maxlength="6" onkeyup="fn_chkMonth(this, 3)">
											</span>
										</div>
										<p class="desc">※ 주민등록증 생년월일로 기입 (승차권 결제 시 확인 필요)</p>
									</div>
									<!-- //181219 수정 -->
								</dd>
							</dl>
						</div>
					</div>
					<div class="line_box">
						<dl class="dl_tbl1">
							<dt><span>구매옵션</span></dt>
							<dd>
								<div class="boxinput_wrap col2 clfix">
									<div class="box_inputForm desc_wrap"> <!-- 190319 추가 - wrapper -->
										<div class="box_inputForm click_box inselect no-strong tooltip_wrap"> <!-- 190121 수정 : tooltip_wrap 클래스 추가 -->
											<!-- 190121 추가 -->
											<a href="javascript:void(0)" class="tip_click" aria-expanded="false"><span class="sr-only">옵션 안내</span></a>
											<div class="tooltip" style="display: none;">
												<p class="tit">옵션 안내</p>
												<ul class="desc_list">
													<li>이용권종 : 일반권(성인)</li>
													<li>버스이용등급 :
														<ul class="dash_list">
															<li>우등 : 우등고속, 심야우등(심우) 탑승 가능</li>
															<li>고속 : 일반고속, 심야고속(심고) 탑승 가능</li>
															<li>전체 : 우등, 고속 모두 탑승 가능</li>
														</ul>
													</li>
													<li>사용일 :
														<!-- 190319 수정 -->
														<ul class="dash_list">
															<li>3일권 : 금~일 포함</li>
															<li>4일권 : 금~일 제외</li>
															<li>5일권 : 금~일 포함</li>
															<li>7일권 : 금~일 포함</li>
														</ul>
														<!-- //190319 수정 -->
													</li>
												</ul>
												<a href="javascript:void(0)" class="close"><span class="sr-only">닫기</span></a>
											</div>
											
											
											<!-- 웹 접근성 개선 셀렉트 박스 UI -->
											
												<div class="dropdown-wrap select-default">
												    <a href="javascript:void(0)" class="btn-dropdown" title="구매옵션 선택" aria-expanded="false" id="optSelectric">
												        <span class="text">구매옵션을 선택하세요</span>
												    </a>
												    <ul class="dropdown-list" id="selOptionLi">
												        <c:forEach var="opt" items="${freePassOptionList}">
												            <li>
												                <a href="javascript:void(0)"
												                   onclick="onSelectChange(this, '${opt.adtnPrdSno}', 'selOption', '${opt.adtnPrdUseClsNm}/${opt.adtnPrdUseNtknNm}/${opt.wkdWkeNtknNm}')">
												                    ${opt.adtnPrdUseClsNm} / ${opt.adtnPrdUseNtknNm} / ${opt.wkdWkeNtknNm} (${opt.adtnPrdUsePsbDno}일)
												                </a>
												            </li>
												        </c:forEach>
												    </ul>
												    <input type="hidden" name="selOption" id="selOption" value="">
												    <input type="hidden" name="selOptionText" id="selOptionText" value="">
												</div>

											
											<!-- //190121 추가 -->
										</div>
										<p class="desc" id="tmpPsbYN" style="display: none;">※ 해당 옵션은 임시차 배차도 사용 가능합니다.</p> <!-- 190319 추가 -->
									</div>
									<!-- 190319 추가 -->
									<div class="box_inputForm intxt input_noti no-strong" id="divTermDesc" style="display: none;">
										<span class="box_label">해당 상품의 사용 기간은 <span id="spanTermDt"></span> 입니다.<br>해당 기간 중에만 사용이 가능합니다.</span>
									</div>
									<!-- //190319 추가 -->
								</div>
							</dd>
						</dl>
					</div>
					<!-- //190118 추가 : 구매옵션 -->
					<!-- <div class="line_box">
						<div class="dl_tbl_wrap col2">
							<dl class="dl_tbl1 h50">
								<dt><span>이용권종</span></dt>
								<dd>
									<div class="box_radioForm" id="kindList">
									</div>
								</dd>
							</dl>
							<dl class="dl_tbl1 h50">
								<dt><span>상품종류</span></dt>
								<dd>
									<div class="box_radioForm" id="weekList">
									</div>
								</dd>
							</dl>
						</div>
						<dl class="dl_tbl1 h50">
							<dt><span>버스<br>이용등급</span></dt>
							<dd>
								<div class="box_radioForm" id="gradeList">
								</div>
							</dd>
						</dl>
					</div> -->
					<div class="line_box">
						<ul class="desc_list marT10">
							<li>터미널 창구 방문 시 프리패스 번호+생년월일(터미널 창구 발권 시 신분증 제출)을 지참하셔야 승차권 발권이 가능합니다.</li>
							<li>사용기간 내 출발 차량 예매 시 부가상품 사용이 가능하며, 명절 특송 기간에는 사용 불가 합니다.</li>
							<li>구매 후 입력하신 휴대폰번호로 <span class="accent">프리패스 번호와 사용일자 정보가 발송</span>됩니다. 구매하시기 전 마이페이지에서 휴대폰 번호를 다시 한 번 확인해주세요.</li>
						</ul>
						<!-- 20190509 추가 -->
						<p class="tit marT10"><strong>취소수수료 안내</strong></p>
						<ul class="desc_list marT10">
							<li>고속버스 프리패스는 사용 시작 1일 후까지 취소가 가능하며, 취소 시 전액 환불 됩니다.</li>
							<li class="accent2"><strong>승차권이 발권상태일 경우에는 취소/변경/환불이 불가합니다.</strong></li>
						</ul>
						<p class="tit marT10"><strong>유의사항</strong></p>
						<ul class="desc_list marT10">
							<li>프리패스를 통한 승차권은&nbsp;본인에 한하여&nbsp;예매, 발권이 가능합니다. (상품 양도 불가)</li>
							<li class="accent2"><strong>사용 기간 내&nbsp;동일 노선의 중복 사용은 불가합니다. (편도기준)</strong></li>
							<li class="accent2"><strong>프리패스 노선 운행 회사(8개사)</strong><br>금호고속, 동부고속, 동양고속, 삼화고속, 속리산고속, 중앙고속, 천일고속, 한일고속<br>* 상기 8개사를 제외한 다른 회사 차량은 이용 불가</li>
							<li class="accent2"><strong>고속버스 프리패스로는 통학, 통근 등이 불가합니다.</strong></li>
							<li>프리패스 번호 미지참시 터미널에서 승차권 발행이 불가하니 분실하지 않도록 유의하시기 바랍니다.</li>
							<li>이용하시기 전에 사용 가능 노선을 반드시 확인하세요.</li>
							<li>명절 특송 기간에는 사용 불가하며, 본 프리패스는 사용 개시 1일 경과 후 교환 및 환불이 불가합니다.</li>
						</ul>
						<!-- //20190509 추가 -->
					</div>
				</div>
			</div>
			<!-- //181218 수정 -->

			<h4 class="mo_page">결제정보 입력</h4>
			<div class="custom_input clfix">
				<div class="tab_wrap inradio tab_type2">
					<ul class="tabs clfix col1" id="payTyepAllUl">
							<li id="cardLi" class="active"><input type="radio" id="payType1" name="payType" title="선택됨"><label for="payType1">카드결제</label></li>
							
					</ul>
				<ul class="desc_list">
					<li>모든 결제정보는 암호화 처리 후 안전하게 전송됩니다.</li>
					<li>구매가 완료된 후 구매 확인 메뉴를 통해 구매내역을 확인 하시기 바랍니다.</li>
					<li>비밀번호 입력 오류가 3회 이상 발생할 경우 홈페이지에서 결제가 불가하니 카드사/은행을 방문하셔서 처리 후 다시 시도 바랍니다.</li>
				</ul>
					
							
							
				</div>
				<div class="payment_sum" style="height: 382px;">
					<div class="tbl_type3">
						<table class="taR">
							<caption>결제 정보 표이며 이용권종, 상품종류, 버스이용등급, 사용일자, 결제금액 정보 제공</caption>
							<colgroup>
								<col style="width:105px;">
								<col style="width:*;">
							</colgroup>
							<tbody>
								<tr>
									<th scope="row">이용권종</th>
									<td id="kindTd"></td>
								</tr>
								<tr>
									<th scope="row">상품종류</th>
									<td id="weekTd"></td>
								</tr>
								<tr>
									<th scope="row">버스이용등급</th>
									<td id="gradeTd"></td>
								</tr>
								<tr><!-- 두 달에 걸쳐 있을 때 -->
									<th scope="row">사용일자</th>
									<td><span class="useDate" id="fulTermTd"></span></td>
								</tr>
								<tr class="total">
									<th scope="row" class="txt_black">결제금액</th>
									<td class="totalPrice" id="pubAmt">0 원</td>
								</tr>
							</tbody>
						</table>
					</div>
					<p class="btn bottom">
						<button type="button" class="btnL btn_confirm ready" id="goPrdprchFn">결제하기</button>
					</p>
				</div>
			</div>

			
		<input type="hidden" id="hidfrmId" name="hidfrmId" value="frpsPrchFrm"><input type="hidden" id="transkeyUuid_frpsPrchFrm" name="transkeyUuid_frpsPrchFrm" value="98d0e138207388f33c8beae202e2c7818f9cb8ade34dde37d6c3f3970d1c41d5"><input type="hidden" id="transkey_cardNum3_frpsPrchFrm" name="transkey_cardNum3_frpsPrchFrm" value=""><input type="hidden" id="transkey_HM_cardNum3_frpsPrchFrm" name="transkey_HM_cardNum3_frpsPrchFrm" value=""><input type="hidden" id="transkey_cardNum4_frpsPrchFrm" name="transkey_cardNum4_frpsPrchFrm" value=""><input type="hidden" id="transkey_HM_cardNum4_frpsPrchFrm" name="transkey_HM_cardNum4_frpsPrchFrm" value=""><input type="hidden" id="transkey_cardPwd_frpsPrchFrm" name="transkey_cardPwd_frpsPrchFrm" value=""><input type="hidden" id="transkey_HM_cardPwd_frpsPrchFrm" name="transkey_HM_cardPwd_frpsPrchFrm" value=""></form>	
	</div>

	</div>

<!-- 로그인! -->


<!-- 사용가능노선 팝업 -->


<!-- 고속버스 프리패스 사용가능 노선 안내 -->
	


<form name="payDtaFrm" id="payDtaFrm" method="post"> <!-- 간편결제용 FORM  -->
	<input type="hidden" name="payMethodCd" id="payMethodCd" value="">
	<input type="hidden" name="goodsName" id="goodsName" value="고속버스 프리패스 여행권">
	<input type="hidden" name="goodsCnt" id="goodsCnt" value="1">
	<input type="hidden" name="goodsPrice" id="goodsPrice" value="0">
</form>

		</article>

		<!-- footer -->
		













<!-- 푸터 -->
<%@ include file="common/footer.jsp" %>
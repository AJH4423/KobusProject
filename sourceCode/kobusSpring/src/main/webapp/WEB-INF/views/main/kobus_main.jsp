<%@ page trimDirectiveWhitespaces="true" language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<script>
	$(function () {
		$(".main-input-box main_box").tabs();
	});
</script>

		
<script>
$( function() {
	$( ".main-input-box main_box" ).tabs();

	$("#startdate_btn").click(function() {
		$("#datepicker1").datepicker("show");
	});

	$("#enddate_btn").click(function() {
		$("#datepicker2").datepicker("show");
	});


} );

function setRotInfFrmValues() {
    // 편도/왕복/환승 구분
    let pathDvs = "sngl";
    if ($("#rtrpRotAll").hasClass("active")) {
        pathDvs = "rtrp";
    } else if ($("#rtrpYnAll input[name='route']:checked").attr("id") === "r2") {
        pathDvs = "trtr";
    }
    $("#pathDvs").val(pathDvs);

    // 출발지/도착지 이름
    $("#deprNm").val($("#deprNmSpn").text().trim());
    $("#arvlNm").val($("#arvlNmSpn").text().trim());

    // 날짜: 가는날
	const deprLabel = $(".text_date1").text().trim();
	const deprValue = parseKoreanDateToYYYYMMDD(deprLabel);
	
	// 날짜: 오는날 (왕복일 경우)
    const arvlLabel = $(".text_date2").text().trim();
    const arvlValue = parseKoreanDateToYYYYMMDD(arvlLabel);
    
    
    $("#deprDtm").val(deprValue);
    $("#deprDtmAll").val(deprLabel);
    
    $("#arvlDtm").val(arvlValue);
    $("#arvlDtmAll").val(arvlLabel);
	
    
    // 버스 등급
    const busClsCd = $("input[name='busClsCdR']:checked").val();
    $("#busClsCd").val(busClsCd || "0");
}


function parseKoreanDateToYYYYMMDD(dateStr) {

	  // 숫자와 점(.)만 남기기
	  const onlyNumDot = dateStr.replace(/[^0-9.]/g, '');  // "2025.6.25"

	  
	  // 점(.)으로 분리
	  const parts = onlyNumDot.split('.');

	  if (parts.length < 3) throw new Error("날짜 형식 오류");

	  const year = parts[0];
	  let month = parts[1];
	  let day = parts[2];

	  // 월, 일이 한자리면 0 붙이기
	  if (month.length === 1) month = '0' + month;
	  if (day.length === 1) day = '0' + day;
	  
	  const format = year+month+day;

	  return format;
	}

</script>
	
	<style>
	#datepicker1, #datepicker2 {
		display:none;
	}
	</style>
	<style>
		.box_detail_info {
		    max-height: 200px; /* 원하는 높이로 조절 가능 */
		    overflow-y: auto;
		    padding-right: 10px; /* 스크롤바가 가려지는 것 방지 */
		}
	</style>
	
	
<script>
	$(document).ready(function () {
		var langCd = 'KO';
		var langLi = $(".dropdown-wrap.lang-select .dropdown-list li");
		
		$('.title_wrap').hide();
		
		var today = new Date();
	
	    var year = today.getFullYear();
	    var month = today.getMonth() + 1; // 0-based → 1-based
	    var date = today.getDate();
	    var dayNames = ["일", "월", "화", "수", "목", "금", "토"];
	    var day = dayNames[today.getDay()];
	
	    var formatted = year + ". " + month + ". " + date + ". " + day;
	
	    $("#deprDtmAll").val(formatted);
	    console.log("deprDtmAll 값:", formatted);
	});
</script>

		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/MainNew.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/Main.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/left.js"></script>

		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/RotInfPup.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/RotInf.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/MrsCfmLgn.js"></script>

		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/rsa_oaep-min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jsbn-min2.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/typedarray.js"></script>


		<!-- 출/도착지 선택 레이어팝업 -->

		<form name="rotInfFrm" id="rotInfFrm" method="post"
			action="/koBus/reservation2.do">
			<input type="hidden" name="sourcePage" value="kobus_main.jsp">
			<input type="hidden" name="deprCd" id="deprCd" value="">
			<!-- 출발지코드 -->
			<input type="hidden" name="deprNm" id="deprNm" value="">
			<!-- 출발지명 -->
			<input type="hidden" name="arvlCd" id="arvlCd" value="">
			<!-- 도착지코드 -->
			<input type="hidden" name="arvlNm" id="arvlNm" value="">
			<!-- 도착지명 -->
			<input type="hidden" name="tfrCd" id="tfrCd" value="">
			<!-- 환승지코드 -->
			<input type="hidden" name="tfrNm" id="tfrNm" value="">
			<!-- 환승지명 -->
			<input type="hidden" name="tfrArvlFullNm" id="tfrArvlFullNm" value="">
			<!-- 환승지포함 도착지 명 -->
			<input type="hidden" name="pathDvs" id="pathDvs" value="">
			<!-- 직통sngl,환승trtr,왕복rtrp -->
			<input type="hidden" name="pathStep" id="pathStep" value="1">
			<!-- 왕복,환승 가는편순번 -->
			<input type="hidden" name="crchDeprArvlYn" id="crchDeprArvlYn"
				value="N">
			<!-- 출도착지 스왑여부 -->
			<input type="hidden" name="deprDtm" id="deprDtm" value="20250607">
			<!-- 가는날(편도,왕복) -->
			<input type="hidden" name="deprDtmAll" id="deprDtmAll"
				value="2025. 6. 7. 토">
			<!-- 가는날(편도,왕복) -->
			<input type="hidden" name="arvlDtm" id="arvlDtm" value="20250607">
			<!-- 오는날(왕복) -->
			<input type="hidden" name="arvlDtmAll" id="arvlDtmAll"
				value="2025. 6. 7. 토">
			<!-- 오는날(왕복) -->
			<input type="hidden" name="busClsCd" id="busClsCd" value="0">
			<!-- 버스등급 -->
			<input type="hidden" name="abnrData" id="abnrData" value="">
			<!-- 결과값여부 -->
			<input type="hidden" name="prmmDcYn" id="prmmDcYn" value="N">
			<!-- 시외우등할인대상노선 -->
			<input type="hidden" name="mainYn" id="mainYn" value="Y">
			<!-- // 170110 수정 -->
			
			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
		</form>
		<div class="loading" id="loading"
			style="height: 1206px; top: 75px; display: none;">
			<p class="load" style="margin-left: -53px;"></p>
		</div>



		<article id="new-kor-content">
			<!-- 본문 영역 -->
			<h2 class="sr-only">메인 본문</h2>

			<!-- PC/Tablet -->
			<div class="d-up-md">
				<div class="keyvisual-area">
					<div class="container">
						<p class="slogan">즐거운 여행의 시작과 끝, 프리미엄 버스와 함께!</p>
						<div class="main-input-box main_box">
							<h3 class="sr-only">고속버스 예매 및 예매 확인</h3>
							<ul class="tab-menu-list">
								<li class="on"><a href="#tab-content1" title="선택됨"><span
										class="text">고속버스예매</span></a></li>
								<li id="lgnTab"><a href="#tab-content2"><span
										class="text">예매확인</span></a></li>
							</ul>
							<div class="tab-content">
								<div id="tab-content1" style="display: block;">
									<!-- as-is 마크업 구조 그대로 사용함 -->
									<div class="main_box">
										<div class="main_cont" style="display: block;">
											<div class="route_box">
												<div class="tab_wrap tab_type1" id="rtrpYnAll">
													<ul class="tabs col2">
														<li class="oneway active" id="snglRotAll"><a
															href="javascript:void(0)"
															onclick="fnPathDvsChk('snglRot');" title="선택됨">편도</a>
															<p class="radio_area">
																<span class="custom_radio"
																	onclick="fnPathDvsChk('sngl')"> <input
																	type="radio" id="r1" name="route" checked="checked">
																	<label for="r1">직통</label>
																</span> <span class="custom_radio"
																	onclick="fnPathDvsChk('trtr')"> <input
																	type="radio" id="r2" name="route"> <label
																	for="r2">환승</label>
																</span>
															</p></li>
														<li class="roundtrip" id="rtrpRotAll"><a
															href="javascript:void(0)" onclick="fnPathDvsChk('rtrp')">왕복</a>
														</li>
													</ul>
													<div class="tab_cont">
													<ul class="place">
														<li><a href="javascript:void(0)"
															id="readDeprInfoList"
															onclick="fnReadDeprInfoList(event);"> <span
																class="name">출발지</span>
																<p class="text empty">
																	<span class="empty_txt">선택</span><span class="val_txt"
																		id="deprNmSpn"></span>
																</p> <!-- 값이 있을경우 p에 'empty' class가 없음 -->
														</a>
															<p class="btn_change" onclick="fnCrchDeprArvl();" >출,도착지
																교체</p></li>
														<li><a href="javascript:void(0)"
															id="readArvlInfoList"
															onclick="fnReadArvlInfoList(event);"> <span
																class="name">도착지</span>
																<p class="text empty">
																	<span class="empty_txt">선택</span><span class="val_txt"
																		id="arvlNmSpn"></span>
																</p> <!-- 값이 없을경우 p에 'empty' class가 있음 -->
														</a></li>
													</ul>
													<ul class="date">
															<li>
																<div class="date_picker_wrap">
																	<span class="name">가는날</span> <input type="text"
																		id="datepicker1" tabindex="-1" title="가는날"
																		readonly="true">
																	<label for="datepicker1" class="text_date text_date1">2025. 6. 7. 토</label>
																	<span class="date_wrap"> <a
																		href="javascript:void(0)" id="deprThddChc"
																		class="active"
																		onclick="fnYyDtmStup(0,'text_date1','0');" title="선택됨">오늘</a>
																		<a href="javascript:void(0)" id="deprNxdChc"
																		onclick="fnYyDtmStup(1,'text_date1','0');">내일</a>
																	</span>
																</div>
															</li>
															<li class="return">
																<div class="date_picker_wrap">
																	<span class="name">오는날</span>
																	<!-- [2024 마크업 수정] -->
																	<input type="text" id="datepicker2" tabindex="-1"
																		title="오는날" readonly="">
																	<!-- <button type="button" class="datepicker-btn"
																		id="enddate_btn">
																		<img class="ui-datepicker-trigger"
																			src="/koBus/images/ico_calender.p/koBus/="오는날 선택 달력">
																	</button> -->
																	<label for="datepicker2" class="text_date text_date2">2025. 6. 26. 목</label>

																	<span class="date_wrap"> <a
																		href="javascript:void(0)" id="arvlThddChc"
																		class="active"
																		onclick="fnYyDtmStup(0,'text_date2','0');" title="선택됨">오늘</a>
																		<a href="javascript:void(0)" id="arvlNxdChc"
																		onclick="fnYyDtmStup(1,'text_date2','0');">내일</a>
																	</span>
																</div>
															</li>
														</ul>
														<div class="grade">
															<span class="name">등급</span>
															<p>
																<span class="custom_radio gradeAll"
																	style="margin-left: 11.3333px;"> <input
																	type="radio" id="busClsCd0" name="busClsCdR"
																	onclick="fnBusClsCd(this)" value="0" checked="checked">
																	<label for="busClsCd0">전체</label>
																</span> <span class="custom_radio grade1"
																	style="margin-left: 11.3333px;"> <input
																	type="radio" id="busClsCd7" name="busClsCdR"
																	onclick="fnBusClsCd(this)" value="7"> <label
																	for="busClsCd7">프리미엄</label>
																</span> <span class="custom_radio grade2"
																	style="margin-left: 11.3333px;"> <input
																	type="radio" id="busClsCd1" name="busClsCdR"
																	onclick="fnBusClsCd(this)" value="1"> <label
																	for="busClsCd1">우등</label>
																</span> <span class="custom_radio grade3"
																	style="margin-left: 11.3333px;"> <input
																	type="radio" id="busClsCd5" name="busClsCdR"
																	onclick="fnBusClsCd(this)" value="2"> <label
																	for="busClsCd5">일반</label>
																</span>
															</p>
														</div>
														<p class="check" id="alcnSrchBtn">
															<button type="button"
																class="btn_confirm ready btn_pop_focus"
																onclick="setRotInfFrmValues(); fnAlcnSrch();">조회하기</button>
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- // as-is 마크업 구조 그대로 사용함 -->
								</div>
								<div id="tab-content2" style="display: none;">

									<!-- 로그인 -->
									<c:choose>
									<c:when test="${empty auth}">
									<div class="main_box">
										<div class="ticket_login custom_input clfix">
											<form action="/koBus/login" method="POST" id="lgnFrm" name="lgnFrm">
											<input type="hidden" name="sourcePage" value="reservationCheck.jsp">
												<input type="hidden" id="returnUrl" name="returnUrl"
													value="/mrs/mrscfm.do?vltlCnt=Y"> <input
													type="hidden" id="popUpDvs" name="popUpDvs" value="N">
												<div class="member">
													<div class="login_title clfix tooltip_wrap">
														<h3>회원 로그인</h3>
														<p class="guide-text">고속버스모바일APP의 회원 아이디와 비밀번호로 이용이
															가능합니다.</p>
													</div>
													<div class="box_inputForm">
														<label for="usrId" class="label">아이디</label> <span
															class="box_label"> <input type="text" name="username"
															id="usrId" placeholder="아이디를 입력하세요" class="input">
														</span>
													</div>
													<div class="box_inputForm">
														<label for="usrPwd" class="label">비밀번호</label> <span
															class="box_label">
														 	<input type="password" name="password"
															placeholder="비밀번호를 입력하세요" id="usrPwd" tabindex="-1"
															class="input">
														</span>
													</div>


													<!-- <button type="button" class="btnL btn_confirm ready"
														id="usrLgnBtn" onclick="fnlogin();">로그인</button> -->
													<button type="button" class="btnL btn_confirm ready"
														id="usrLgnBtn">로그인</button>
													<!-- [2024 마크업 수정] -->
													<ul class="login_menu">
														<li><a
															href="/mbrs/lgn/lgnSearchId.do">아이디
																찾기</a></li>
														<li><a
															href="/mbrs/lgn/lgnSearchPwd.do">비밀번호찾기</a></li>
														<li><a
															href="/mbrs/mbrsjoin/mbrsJoin.do">회원가입</a></li>
													</ul>
													<!-- // [2024 마크업 수정] -->
												</div>
												<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />

											</form>
											<!-- 로그인 기능 -->
											<script>
												$("#usrLgnBtn").on("click", function(){
													$("#lgnFrm").submit();
												});
											</script>
											<form id="lgnNonUsrFrm" name="lgnNonUsrFrm">
												<div class="no_member">
													<div class="login_title clfix tooltip_wrap">
														<h3>비회원 예매확인</h3>
														<p class="guide-text">예매 시 입력하신 정보를 정확하게 입력해주세요.</p>
														<p></p>
													</div>
													<div class="box_bg_input">
														<!-- [2024 마크업 수정] -->
														<ul class="input_tab clearfix">
															<li class="on"><a href="javascript:void(0)"
																title="선택됨">휴대폰 번호로 찾기</a></li>
															<li class="find_card_num"><a
																href="javascript:void(0)">카드번호로 찾기</a></li>
														</ul>
														<!-- // [2024 마크업 수정] -->
														<div class="phone">
															<div class="send">
																<div class="box_inputForm_nonmember">
																	<label for="nonMbrsHp" class="label">휴대폰 번호</label> <span
																		class="box_label"> <input type="text"
																		name="nonMbrsHp" placeholder="휴대폰 번호를 입력하세요"
																		id="nonMbrsHp" class="input" maxlength="11"
																		onkeyup="fnNumCheck(this);">
																	</span>
																</div>
																<button type="button"
																	class="input_btn_nonmember send_btn">
																	인증번호<br>발송
																</button>
															</div>
															<div class="resend">
																<div class="box_inputForm_nonmember resend">
																	<strong class="send_txt">인증번호가 발송 완료되었습니다.</strong>
																</div>
																<button type="button"
																	class="input_btn_nonmember resend_btn">
																	인증번호<br>재발송
																</button>
															</div>
															<div class="phone_01">
																<div class="box_inputForm_nonmember">
																	<label for="nonMbrsAuthNo" class="label">수신된
																		인증번호</label> <span class="box_label"> <input
																		type="text" name="nonMbrsAuthNo"
																		placeholder="인증번호를 입력하세요" id="nonMbrsAuthNo"
																		maxlength="6" onkeyup="fnNumCheck(this);"
																		class="input">
																	</span>
																</div>
																<button type="button"
																	class="input_btn_nonmember check_phone">확인</button>


																<p
																	style="padding-left: 10px; text-align: left; display: inline-block;">
																	<input type="checkbox" name="sms_yn" id="sms_yn"
																		value="Y"> <label for="sms_yn">SMS로
																		인증번호 받기</label>
																</p>
															</div>


															<div class="phone_02">
																<div class="box_inputForm ph_complete ht21">
																	<strong class="ph_complete_txt ">인증이 완료되었습니다.</strong>
																	<input type="hidden" name="nonMbrsAuthYn"
																		id="nonMbrsAuthYn">
																</div>

																<!-- [2024 마크업 수정] -->
																<ul class="pay_tab clearfix pay_wrap01">
																	<li class="on"><a href="javascript:void(0)"
																		title="선택됨">신용카드 예매 티켓</a></li>
																	<li class="easy_tab01"><a
																		href="javascript:void(0)">간편결제 예매 티켓</a></li>
																</ul>
																<!-- // [2024 마크업 수정] -->
																<div class="credit">
																	<div class="box_inputForm ph_complete">
																		<label for="birthday1" class="label">생년월일(YYMMDD)</label>
																		<span class="box_label"> <input type="text"
																			name="birthday1" id="birthday1"
																			placeholder="생년월일 6자리를 입력하세요" maxlength="10"
																			onkeyup="fnNumCheck(this);" class="input">
																		</span>
																	</div>
																	<p class="notice_gray">
																		<span>※</span> 법인카드로 결제한 경우 사업자번호(10자리)를 입력하세요
																	</p>
																</div>
																<div class="easy_pay">
																	<div class="box_inputForm ph_complete">
																		<label for="start_date1" class="label">출발일(YYYYMMDD)</label>
																		<span class="box_label"> <input type="text"
																			name="start_date1" placeholder="출발일 8자리를 입력하세요"
																			id="start_date1" maxlength="8"
																			onkeyup="fnNumCheck(this);" class="input">
																		</span>
																	</div>
																	<p class="notice_gray">
																		<span>※</span> 스마일페이/티머니페이/페이코로 결제 한 경우 <br>
																		생년월일(6자리)대신 출발일(8자리)을 입력하세요.
																	</p>
																</div>
															</div>
														</div>
														<div class="card">
															<div class="phone_02">
																<div>
																	<div class="box_inputForm">
																		<strong class="send_txt label">카드번호</strong> <span
																			class="box_label clearfix"> <input type="text"
																			name="card_number01" id="card_number01"
																			title="카드번호 첫 번째 4자리 입력" class="input01"
																			maxlength="4"
																			onkeydown="this.value = onlyNumPlus(this.value);"
																			onkeyup="fnChkNext(this,'card_number02')"> <span
																			class="hyp">-</span> <input type="text"
																			name="card_number02" id="card_number02"
																			title="카드번호 두 번째 4자리 입력" class="input01"
																			maxlength="4"
																			onkeydown="this.value = onlyNumPlus(this.value);"
																			onkeyup="fnChkNext(this,'card_number03')"> <span
																			class="hyp">-</span>
																			<button type="button" class="transkey_btn number03"
																				data-id="card_number03" onclick="transkeyShow(this)">가상키패드</button>
																			<input type="password" name="card_number03"
																			id="card_number03" tabindex="-1"
																			title="카드번호 세 번째 4자리 입력" class="input01"
																			maxlength="4"
																			onkeydown="this.value = onlyNumPlus(this.value);"
																			onkeyup="fnChkNext(this,'card_number04')"
																			data-tk-kbdtype="number"
																			onfocus="setTranskey(this, 'lgnNonUsrFrm');">
																			<span class="hyp">-</span>
																			<button type="button" class="transkey_btn number04"
																				data-id="card_number04" onclick="transkeyShow(this)">가상키패드</button>
																			<input type="password" name="card_number04"
																			id="card_number04" tabindex="-1"
																			title="카드번호 네 번째 4자리 입력" class="input01"
																			maxlength="4"
																			onkeydown="this.value = onlyNumPlus(this.value);"
																			onblur="" data-tk-kbdtype="number"
																			onfocus="setTranskey(this, 'lgnNonUsrFrm');">
																		</span>
																	</div>


																</div>

																<!-- [2024 마크업 수정] -->
																<ul class="pay_tab clearfix pay_wrap02">
																	<li class="on"><a href="javascript:void(0)"
																		title="선택됨">신용카드 예매 티켓</a></li>
																	<li class="easy_tab02"><a
																		href="javascript:void(0)">간편결제 예매 티켓</a></li>
																</ul>
																<!-- // [2024 마크업 수정] -->

																<div class="credit">
																	<div class="box_inputForm">
																		<label for="birthday2" class="label">생년월일(YYMMDD)</label>
																		<span class="box_label"> <input type="text"
																			name="birthday2" placeholder="생년월일 6자리를 입력하세요"
																			id="birthday2" maxlength="10"
																			onkeyup="fnNumCheck(this);" class="input">
																		</span>
																	</div>
																	<p class="notice_gray">
																		<span>※</span> 법인카드로 결제한 경우 사업자번호(10자리)를 입력하세요
																	</p>
																</div>
																<div class="easy_pay">
																	<div class="box_inputForm">
																		<label for="start_date2" class="label">출발일(YYYYMMDD)</label>
																		<span class="box_label"> <input type="text"
																			name="start_date2" placeholder="출발일 8자리를 입력하세요"
																			id="start_date2" maxlength="8"
																			onkeyup="fnIcoCheck(this),fnNumCheck(this);"
																			class="input">
																		</span>
																	</div>
																	<p class="notice_gray">
																		<span>※</span> 스마일페이/티머니페이/페이코로 결제 한 경우 <br>
																		생년월일(6자리)대신 출발일(8자리)을 입력하세요.
																	</p>
																</div>
															</div>
														</div>

														<!-- 기존에 .box_bg_input 바깥에 위치, .box_bg_input 내부로 위치 이동 -->
														<div class="bottom_btn">
															<button type="button"
																onclick="javascript:fnNonUsr_Search();"
																class="btnL btn_confirm ready""="">조회하기</button>
														</div>
													</div>
												</div>
												<!-- 비회원예매폼 수정 -->

												<input type="hidden" id="popUpDvs2" name="popUpDvs"
													value="N"> <input type="hidden" id="returnUrl2"
													name="returnUrl" value="/mrs/mrscfm.do"> <input
													type="hidden" id="vltlCnt" name="vltlCnt" value="Y">
												<input type="hidden" id="cal_flg1" name="cal_flg1" value="0">
												<input type="hidden" id="cal_flg2" name="cal_flg2" value="1">
												
												<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
												
											</form>

											<script>
												/* 비회원 예매프로세스 휴대폰번호찾기 1-1  */
												$(".send_btn").on("click", function(){
													if ($("#nonMbrsHp").val().length < 10){
														alert("휴대폰 번호를 확인해주세요.");
														$('#nonMbrsHp').focus();
														return;
													}
													
													$("#loading").show();
													$("#nonMbrsAuthYn").val("N");
													
													var sms_yn = $("#sms_yn").prop("checked");
													
													$.ajax({	
												        url      : "/mbrs/lgn/askAuthNoNonUser.ajax",
												        type     : "post",
												        data     : {
												        	hp_no : $("#nonMbrsHp").val(),
												        	sms_yn : (sms_yn) ? 'Y' : 'N',
												        },
												        dataType : "json",
												        async    : true,
												        success  : function(lgnNonUsrMap){
												        	$("#loading").hide();
												        	
												        	if (lgnNonUsrMap.resultStatus == "Y"){
													        	alert("인증번호가 전송되었습니다.");
													        	$("#nonMbrsAuthNo").val('');
													        	$("#nonMbrsAuthNo").focus();
													        	$(".send_btn").html('인증번호<br>재발송');
													        	
												        	} else {
												        		alert("인증번호 전송에 실패하였습니다. \n\n잠시 후 다시 이용하여 주시기 바랍니다.");
												        	}
												        },
												        error : function (e){
												        	$("#loading").hide();
												            alert("잠시 후 다시 이용하여 주시기 바랍니다.");
												            return;
												        }
													});
													
												});
												/* 비회원 예매프로세스 휴대폰번호찾기 1-2  */
												$(".resend_btn").on("click", function(){
													$(".send").show(); //발송
													$(".resend").hide(); //재발송
												});
												/* 비회원 예매프로세스 휴대폰번호찾기 1-3 -> 2   */
												$(".check_phone").on("click", function(){
													
													if ($("#nonMbrsHp").val().length < 10){
														alert("휴대폰 번호를 확인해주세요.");
														$('#nonMbrsHp').focus();
														return;
													}
													if ($("#nonMbrsAuthNo").val().length < 6){
														alert("인증번호를 확인해주세요.");
														$('#nonMbrsAuthNo').focus();
														return;
													}
													
													$("#loading").show();
													$("#nonMbrsAuthYn").val("N");
													
													$.ajax({	
												        url      : "/mbrs/lgn/insertAuthNonUserInfo.ajax",
												        type     : "post",
												        data     : {
												        	hp_no : $("#nonMbrsHp").val(),
												        	aou_no : $("#nonMbrsAuthNo").val(),
												        	in_type : '1'
												        },
												        dataType : "json",
												        async    : true,
												        success  : function(lgnNonUsrMap){
												        	$("#loading").hide();
												        	
												        	if (lgnNonUsrMap.resultStatus == "Y"){
													        	alert("인증되었습니다.");
													        	
																$(".resend").hide(); //발송
																$(".send").hide(); //재발송
																$(".phone_01").hide(); 
																$(".phone_02").show();
																$(".ph_complete").show();
																$("#nonMbrsAuthYn").val("Y");
												        	} else {
												        		alert("인증에 실패하였습니다. \n\n인증번호를 확인하여 주시기 바랍니다.");
												        	}
												        },
												        error : function (e){
												        	$("#loading").hide();
												            alert("잠시 후 다시 이용하여 주시기 바랍니다.");
												            return;
												        }
													});
													
												});
												/* 비회원 예매프로세스  2-2, 3-2  */
												$(".pay_wrap01 p").on("click",function(){
													$(".pay_wrap01 p").removeClass("on");
													$(this).toggleClass("on");
													if($(".easy_tab01").hasClass("on")){
														$(".easy_pay").show();
														$(".credit").hide();
														$("#cal_flg2").val('2');
													}else{
														$(".credit").show();
														$(".easy_pay").hide();
														$("#cal_flg2").val('1');
													}
												});
												/* 비회원 예매프로세스  2-2, 3-2  */
												$(".input_tab  p").on("click",function(){
													$(".input_tab p").removeClass("on");
													$(this).toggleClass("on");
													if($(".find_card_num").hasClass("on")){
														$(".card").show();
														$(".phone").hide();
														$("#cal_flg1").val('2');
													}else{
														$(".phone").show();
														$(".card").hide();
														$("#cal_flg1").val('0');
													}
												});
												
												$(".pay_wrap02 p").on("click",function(){
													$(".pay_wrap02 p").removeClass("on");
													$(this).toggleClass("on");
													if($(".easy_tab02").hasClass("on")){
														$(".easy_pay").show();
														$(".credit").hide();
														$("#cal_flg2").val('2');
													}else{
														$(".credit").show();
														$(".easy_pay").hide();
														$("#cal_flg2").val('1');
													}
												});
												function fnChkNext(obj,nextFld){
													//if($(obj).val().length == 4){
													//	$("#"+nextFld).val('');
													//	$("#"+nextFld).focus();
													//}
												}
												function fnNonUsr_Search(){
													var cal_flg1 = Number($("#cal_flg1").val());
													var cal_flg2 = Number($("#cal_flg2").val());
													var card_number = $("#card_number01").val() +""+ $("#card_number02").val() +""+ $("#card_number03").val() +""+ $("#card_number04").val();
													if(cal_flg1 == 0 && $("#nonMbrsAuthYn").val() != "Y"){
														alert("비회원 인증이 필요합니다. 휴대폰 번호와 수신된 인증번호를 정확하게 입력해주세요.");
														$('#nonMbrsHp').focus();
														return;
													}
													if (cal_flg1 == 0 && $("#nonMbrsHp").val() == ''){
														alert('휴대폰 번호를 확인해주세요.');
														$('#nonMbrsHp').focus();
														return;
													}
													if (cal_flg1 == 0 && cal_flg2 == 1 && $("#birthday1").val().length != 6 && $("#birthday1").val().length != 10){
														alert('생년월일을 확인해주세요.');
														$("#birthday1").focus();
														return;
													}
													if (cal_flg1 == 0 && cal_flg2 == 2 && $("#start_date1").val().length != 8){
														alert('출발일을 확인해주세요.');
														$("#start_date1").focus();
														return;
													}
													if (cal_flg1 == 2 && card_number.length < 15){
														alert('카드번호 16자리를 정확하게 입력해주세요.');
														$("#card_number01").focus();
														return;
													}
													if (cal_flg1 == 2 && cal_flg2 == 1 && $("#birthday2").val().length != 6 && $("#birthday2").val().length != 10){
														alert('생년월일 6자리를 입력해주세요.');
														$("#birthday2").focus();
														return;
													}
													if (cal_flg1 == 2 && cal_flg2 == 2 && $("#start_date2").val().length != 8){
														alert('출발일 8자리를 입력해주세요.');
														$("#start_date2").focus();
														return;
													}
					
													if (cal_flg1 == 2){
														if (ajaxDecode('card_number03') == false) { return; }
														if (ajaxDecode('card_number04') == false) { return; }
													}
													
													var returnUrl = $('#lgnNonUsrFrm #returnUrl2').val();
													if(returnUrl != ""){
														$('#lgnNonUsrFrm').attr('method', 'post');
														$('#lgnNonUsrFrm').attr('action', returnUrl);
														$('#lgnNonUsrFrm').submit();
													 }else{
														location.href = "/main.do";
													 }
												}
											</script>

										</div>

									</div>
									</c:when>
									<c:otherwise>
										<!-- ajax로 예매테이블 정보가져오고 정보 잘 뿌려주기 -->
										<div class="box_detail_info">
    									<!-- AJAX로 채워짐 -->
										</div>	
										
										<script>
										$("#lgnTab").on("click", function(){
											$.ajax({
												url:"/koBus/mainPageResv.do",
												type:"GET",
												cache:false,
												dataType: "json",
												success: function(data){
													console.log(data);
													let list = $(".box_detail_info");
									                list.empty();

									                if (data.length === 0) {
									                    list.append(`
									                    		<div class="no-ticker-area">
																<p class="no_ticket_txt">예매내역이 없습니다.</p> <!-- 170215 추가 -->
																</div>
																`);
									                    // <li>탑승일: \${resv.rideDate.date.year}</li>
									                } else {
									                    data.forEach(function(resv){
									                    	
									                    	let durMin = resv.durMin;
									                        let hour = Math.floor(durMin / 60);
									                        let minute = durMin % 60;
									                        let durationText = `\${hour}시간 \${minute}분 소요`;
									                    	
									                        list.append(`

									                        		<div class="routeHead">
																	<p class="date">\${resv.rideDateStr} 출발</p>
																	<p class="ticketPrice"></p>
																</div>
																<div class="routeBody">
																	<div class="routeArea route_wrap">
																		<div class="inner">

																			<dl class="roundBox departure kor">
																				<dt>출발</dt>
																				<dd>\${resv.deprRegName }</dd>
																			</dl>
																			<dl class="roundBox arrive kor">
																				<dt>도착</dt>
																				<dd>\${resv.arrRegName }</dd>
																			</dl>
																		</div>
																		<div class="detail_info">
																		
																		<span>\${durationText}</span>

																		<!-- 예상소요시간 -->
																	</div>
																	</div>
																	<div class="routeArea route_wrap mob_route">
																		<div class="tbl_type2">
																			<table class="tbl_info">
																				<caption>버스 예매 정보에 대한 표이며 예매번호, 고속사, 등급, 승차홈, 매수
																					정보 제공</caption>
																				<colgroup>
																					<col style="width: 68px;">
																					<col style="width: *;">
																				</colgroup>
																				<tbody>
																					<tr>
																						<th scope="row">예매번호</th>
																						<td>\${resv.resId }</td>
																					</tr>
																					<tr>
																						<th scope="row">고속사</th>
																						<td>\${resv.comName }<span class="jabus ico_bus"></span> <!-- 동양고속 class="dyexpress" 삼화고속 class="samhwa" 중앙고속 class="jabus" 금호고속 class="kumho" 천일고속 class="chunil" 한일고속 class="hanil" 동부고속 class="dongbu" 금호속리산고속 class="songnisan" 코버스 class="kobus" -->
																						</td>
																					</tr>
																					<tr>
																						<th scope="row">등급</th>
																						<td>\${resv.busGrade }</td>
																					</tr>
																					<!-- <tr>
																						<th scope="row">승차홈</th>
																						<td>23</td>
																					</tr> -->
																					<tr>
																						<th scope="row">매수</th>
																						<td>\${resv.totalCount } <!-- 20210525 yahan -->

																						</td>

																					</tr>
																				</tbody>
																			</table>
																		</div>
																	</div>
																</div>
									                        `);
									                    });
									                }
												},
												error: function(){
													alert("AJAX 에러발생");
												} 
											});
										});
										</script>
										
									</c:otherwise>
									</c:choose>
									<!-- // 로그인 -->


								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="main-content">
					<div class="container">
						<!-- 광고 배너 추후 추가 예정 -->
						<div class="banner-group type-row-A">
							<!-- <iframe src="/koBus/images/_ad-tubebox-001A.html" title="프레임 (휴대폰안심 서비스)" class="ad-frame"></iframe> -->
						</div>

						<div class="content-row links-small">
							<a href="/adtnprdnew/frps/frpsPrchGd.do"
								class="item item-yellow"> <strong>프리패스 여행권 구매</strong>
								<p>대한민국 구석구석을 자유롭게</p> <img
								src="${pageContext.request.contextPath}/resources/images/img-links-small-item01.png" alt="">
							</a> <a href="/adtnprdnew/pass/passPrchGd.do"
								class="item item-yellow"> <strong>정기권 구매</strong>
								<p>매일 가는 목적지를 저렴하게</p> <img
								src="${pageContext.request.contextPath}/resources/images/img-links-small-item02.png" alt="">
							</a> <a href="/oprninf/arscgd/oprnArscGd.do"
								class="item item-blue"> <strong>도착시간 안내</strong>
								<p>운행중인 버스정보를 확인해요</p> <img
								src="${pageContext.request.contextPath}/resources/images/img-links-small-item03.png" alt="">
							</a> <a
								href="/oprninf/alcninqr/oprnAlcnPage.do"
								class="item item-blue"> <strong>시간표 조회</strong>
								<p>배차시간을 편리하게 확인해요</p> <img
								src="${pageContext.request.contextPath}/resources/images/img-links-small-item04.png" alt="">
							</a>
						</div>





						<div class="content-row links-big">

							<div class="item item-green">
								<span>프리미엄 골드 익스프레스</span> <strong>도로 위 비즈니스 클래스<br>
									프리미엄 고속버스
								</strong> <img src="${pageContext.request.contextPath}/resources/images/img-links-big-item01.png" alt="">
							</div>
							<a href="https://www.zerodayexpress.com/b2cpublic/main.page"
								target="_blank" title="새창" class="item item-blue"> <span>ZERODAY
									EXPRESS</span> <strong>고속버스 당일배송<br> 온라인 택배신청
							</strong> <img src="${pageContext.request.contextPath}/resources/images/img-links-big-item02.png" alt="">
							</a> <a
								href="/cscn/lossClnc/readLossClncList.do"
								target="_blank" title="새창" class="item item-purple"> <span>고객센터</span>
								<strong>유실물 센터</strong> <img
								src="${pageContext.request.contextPath}/resources/images/img-lost-article.png" alt="">
							</a>
						</div>



						<div class="banner-group type-row-C banner-and-lost-article">
							<!-- <iframe src="${pageContext.request.contextPath}/resources/images/banner-kumho-market.html" title="프레임 (금호팔도마켓 이벤트 새창 링크)" class="ad-frame"></iframe> -->
							<!-- <iframe src="${pageContext.request.contextPath}/resources/images/banner-hanil-modernprestige.html" title="프레임 (한일고속 회원전용 이벤트 새창 링크)" class="ad-frame"></iframe> -->
							<a href="/ugd/mlggd/Mlggd.do"
								class="item item-lost-article" target="_blank" title="새창"> <span>이용안내</span>
								<strong>프리미엄 마일리지</strong> <img
								src="${pageContext.request.contextPath}/resources/images/ico-premium-mileage.png" alt="">
							</a>
						</div>

						<div class="content-row">
							<div class="info-area">
								<h3>이용안내</h3>
								<ul class="info-list">
									<li><a href="/ugd/mrsgd/Mrsgd.do">
											<span>예매안내</span>
									</a></li>
									<li><a href="/ugd/trtrgd/Trtrgd.do">
											<span>환승안내</span>
									</a></li>
									<li><a href="/ugd/trmlgd/Trmlgd.do">
											<span>터미널 안내</span>
									</a></li>
								</ul>
							</div>
							<div class="notice-area">
								<h3>공지사항</h3>
								<div class="notice">
									<div class="bx-wrapper"
										style="max-width: 100%; margin: 0px auto;">
										<div class="bx-viewport"
											style="width: 100%; overflow: hidden; position: relative; height: 33px;">
											<ul class="bxslider" id="noticeViewNew"
												style="width: 1115%; position: relative; transition-duration: 1s; transform: translate3d(-2155px, 0px, 0px);">
												<li
													style="float: left; list-style: none; position: relative; width: 431px;"
													class="bx-clone"><a href="javascript:;"
													onclick="fnGoReadPage(20250314001);">
														<p class="title">심야 요금 요율 변경 안내</p> <span class="date">2025.03.14</span>
												</a></li>
												<li
													style="float: left; list-style: none; position: relative; width: 431px;">
													<a href="javascript:;" onclick="fnGoReadPage(20250321001);">
														<p class="title">개인정보 처리방침 약관 개정 안내</p> <span class="date">2025.03.21</span>
												</a>
												</li>
												<li
													style="float: left; list-style: none; position: relative; width: 431px;">
													<a href="javascript:;" onclick="fnGoReadPage(20250313001);">
														<p class="title">서비스 이용약관 약관 개정 안내</p> <span class="date">2025.03.13</span>
												</a>
												</li>
												<li
													style="float: left; list-style: none; position: relative; width: 431px;">
													<a href="javascript:;" onclick="fnGoReadPage(20240528001);">
														<p class="title">반려동물 동반탑승 안내</p> <span class="date">2024.05.28</span>
												</a>
												</li>
												<li
													style="float: left; list-style: none; position: relative; width: 431px;">
													<a href="javascript:;" onclick="fnGoReadPage(20191125001);">
														<p class="title">프리미엄 고속버스 마일리지 소멸 유효기간 안내</p> <span
														class="date">2019.11.22</span>
												</a>
												</li>
												<li
													style="float: left; list-style: none; position: relative; width: 431px;">
													<a href="javascript:;" onclick="fnGoReadPage(20190822001);">
														<p class="title">노쇼방지를 위한 동일카드 예매 횟수 변경 안내</p> <span
														class="date">2019.08.22</span>
												</a>
												</li>
												<li
													style="float: left; list-style: none; position: relative; width: 431px;">
													<a href="javascript:;" onclick="fnGoReadPage(20190809001);">
														<p class="title">■ 고객센터 점심시간 운영 안내</p> <span class="date">2019.08.09</span>
												</a>
												</li>
												<li
													style="float: left; list-style: none; position: relative; width: 431px;">
													<a href="javascript:;" onclick="fnGoReadPage(20250417001);">
														<p class="title">고속버스 취소수수료 변경 안내</p> <span class="date">2025.04.17</span>
												</a>
												</li>
												<li
													style="float: left; list-style: none; position: relative; width: 431px;">
													<a href="javascript:;" onclick="fnGoReadPage(20250404001);">
														<p class="title">전자금융거래 이용약관 개정 안내</p> <span class="date">2025.02.25</span>
												</a>
												</li>
												<li
													style="float: left; list-style: none; position: relative; width: 431px;">
													<a href="javascript:;" onclick="fnGoReadPage(20250314001);">
														<p class="title">심야 요금 요율 변경 안내</p> <span class="date">2025.03.14</span>
												</a>
												</li>
												<li
													style="float: left; list-style: none; position: relative; width: 431px;"
													class="bx-clone"><a href="javascript:;"
													onclick="fnGoReadPage(20250321001);">
														<p class="title">개인정보 처리방침 약관 개정 안내</p> <span class="date">2025.03.21</span>
												</a></li>
											</ul>
										</div>
									</div>
									<div class="slider-controls">
										<button type="button" id="prev" class="btn btn-prev">
											<i class="ico ico-slide-prev-gray"></i><span class="sr-only">이전</span>
										</button>
										<button type="button" id="toggle" class="btn btn-pause">
											<i class="ico ico-slide-pause-gray"></i><span class="sr-only">멈춤</span>
										</button>
										<button type="button" id="next" class="btn btn-next">
											<i class="ico ico-slide-next-gray"></i><span class="sr-only">다음</span>
										</button>
									</div>
								</div>
								<a href="/cscn/ntcmttr/readNtcList.do"
									class="btn-more">더보기 <i class="ico ico-more"></i></a>

								<form name="leftForm" id="leftForm">
									<input type="hidden" id="leftNtcNo" name="ntcNo">
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Mobile -->
			<div class="d-down-sm">
				<!-- as-is 마크업 구조 그대로 사용함 -->
				<div class="mo_menu_wrap">
					<div class="mo_menu">
						<ul>
							<li class="menu1"><a
								href="/mrs/rotinf.do">고속버스 예매</a></li>

							<li class="menu2"><a
								href="/mrs/mrscfmlgnchec.do">예매 확인 </a></li>

							<li class="menu3"><a
								href="/oprninf/arscgd/oprnArscGd.do">도착시간안내</a></li>
						</ul>
					</div>
					<div class="main">
						<p class="mo_util">
							<a
								href="${pageContext.request.contextPath}/resources/kobusSchedule.do"
								class="util1" style="width: 33.33%">시간표조회</a> <a
								href="/ugd/mrsgd/Mrsgd.do" class="util2"
								style="width: 33.33%">이용안내</a>
							<!-- <a href="/cscn/ntcmttr/readNtcList.do" class="util3" style="width:33.33%;">고객센터</a> -->
							<a href="/mbrs/mbrspage/myPageMain.do"
								class="util4" style="width: 33.33%">마이페이지</a>
						</p>
					</div>
				</div>

				<div class="bnr_box bnr3">
					<div class="main_bus">
						<a href="javascript:void(0)"> <span class="stit">프리미엄
								골드 익스프레스</span>
							<p>
								도로 위 비즈니스 클래스 프리미엄 고속버스<span class="block"></span>
							</p>
						</a>
					</div>
					<div class="main_molit">
						<a href="https://www.zerodayexpress.com/" target="_blank"> <span
							class="stit">ZERODAY EXPRESS</span>
							<p>
								고속버스 당일배송 온라인 택배신청<span class="block"></span>
							</p>
						</a>
					</div>
					<div class="main_app">
						<a
							href="https://www.shinhancard.com/conts/person/card_info/dream/credit/oil/1413166_46596.jsp?EntryLoc1=TM2876&amp;EntryLoc2=2867&amp;empSeq=4"
							target="_blank"> <span class="stit">All Pass 신한카드 출시</span>
							<p>
								고속/시외버스 앱 결제시 30% 할인<span class="block"></span>
							</p>
						</a>
					</div>

					<div class="main_info">
						<span class="stit">이용안내</span>
						<ul class="clifx">
							<li class="info1" style="width: 33.333%"><a
								href="/ugd/mrsgd/Mrsgd.do">예매안내</a></li>
							<li class="info2" style="width: 33.333%"><a
								href="/ugd/trtrgd/Trtrgd.do">환승안내</a></li>
							<li class="info4" style="width: 33.333%"><a
								href="/ugd/trmlgd/Trmlgd.do">터미널안내</a></li>
							<!-- <li class="info3"><a href="/ugd/cacmgd/CacmgdSale.do">할인안내</a></li> -->
						</ul>
					</div>
				</div>
				<!-- // as-is 마크업 구조 그대로 사용함 -->
			</div>

			<!-- // 본문 영역 -->
		</article>



		<!-- 취소수수료안내 팝업 -->



		<!-- // 공지팝업 -->
		<input type="hidden" id="pupListLen" name="pupListLen" value="4">


		<!-- // 공지팝업 -->


		<!-- 시외노선 우등형 할인 안내 -->



		<!-- 노선조회안내 팝업 - 서울~강릉 - 190227 추가 -->

		<!-- 노선조회안내 팝업 - 동서울~강릉 - 190227 추가 -->

		<!-- 노선조회안내 팝업 - 수원~삼척 - 190227 추가 -->

		<!-- 노선조회안내 팝업 - 서울경부~동해 - 190227 추가 -->

		<!-- 노선조회안내 팝업 속초 - 190227 추가 -->


		<!-- 노선조회안내 팝업 원주 - 190926 추가 -->


		<!-- 광양 임시터미널 안내 - 191031 추가 -->



	</div>


	<div
		style="left: -1000px; overflow: scroll; position: absolute; top: -1000px; border: none; box-sizing: content-box; height: 200px; margin: 0px; padding: 0px; width: 200px;">
		<div
			style="border: none; box-sizing: content-box; height: 200px; margin: 0px; padding: 0px; width: 200px;"></div>
	</div>
	<div class="remodal-overlay remodal-is-closed" style="display: none;"></div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal pop_place full remodal-is-initialized remodal-is-closed"
			data-remodal-id="popPlace" role="dialog" tabindex="-1">


			<div class="title">
				<h2 id="popTitle">출/도착지 선택</h2>
			</div>
			<div class="cont">
				<div class="search_wrap" style="display: none;">
					<p>
						<!--  class="focus" -->
					<div class="easy-autocomplete" style="width: 100px;">
						<input type="text" id="terminalSearch" title="터미널/지역 이름 검색"
							placeholder="터미널/지역 이름을 검색하세요" autocomplete="off">
						<div class="easy-autocomplete-container"
							id="eac-container-terminalSearch">
							<ul></ul>
						</div>
					</div>
					<span class="btn">검색</span>
					</p>
				</div>
				<div class="start_wrap" id="imptDepr" style="display: block;">
					<h3 class="stit">주요출발지</h3>
					<div class="tags">
			            <button type="button" onclick="fnDeprChc('REG002','서울 경부')" name="imptDeprNm" value="REG002">서울 경부</button>
			            <button type="button" onclick="fnDeprChc('REG003','센트럴시티(서울)')" name="imptDeprNm" value="REG003" class="over">센트럴시티(서울)</button>
			            <button type="button" onclick="fnDeprChc('REG139','광주(유·스퀘어)')" name="imptDeprNm" value="REG139">광주(유·스퀘어)</button> <!--  class="active" --> 
			            <button type="button" onclick="fnDeprChc('REG041','부산')" name="imptDeprNm" value="REG041">부산</button>
			            <button type="button" onclick="fnDeprChc('REG042','서부산')" name="imptDeprNm" value="REG042">서부산</button>
			            <button type="button" onclick="fnDeprChc('REG001','동서울')" name="imptDeprNm" value="REG001">동서울</button>
			            <button type="button" onclick="fnDeprChc('REG031','대전')" name="imptDeprNm" value="REG031">대전</button>
			            <button type="button" onclick="fnDeprChc('REG068','전주')" name="imptDeprNm" value="REG068">전주</button>
			            <button type="button" onclick="fnDeprChc('REG007','인천공항')" name="imptDeprNm" value="REG007">인천공항</button>
			            <button type="button" onclick="fnDeprChc('REG033','천안')" name="imptDeprNm" value="REG033">천안</button>
			            <button type="button" onclick="fnDeprChc('REG145','대구')" name="imptDeprNm" value="REG145">대구</button>
			            <button type="button" onclick="fnDeprChc('REG009','성남')" name="imptDeprNm" value="REG009">성남</button>
			        </div>
				</div>
				<div class="terminal_wrap">
					<h3 class="stit">지역별 터미널</h3>
					<div class="ternimal_box">
						<div class="scroll-wrapper area_scroll scrollbar-inner"
							style="position: relative;">
							<div class="area_scroll scrollbar-inner scroll-content"
								style="height: 420px; margin-bottom: 0px; margin-right: 0px; max-height: none;">
								<!-- <ul class="area_list">
								<li class="active" id="areaListAll"><span onclick="fnDeprArvlViewList('all');">전체</span></li>
								<li><span onclick="fnDeprArvlViewList('11');">서울</span></li>
								<li><span onclick="fnDeprArvlViewList('28');">인천/경기</span></li>
								<li><span onclick="fnDeprArvlViewList('42');">강원</span></li>
								<li><span onclick="fnDeprArvlViewList('30');">대전/충남</span></li>
								<li><span onclick="fnDeprArvlViewList('43');">충북</span></li>
								<li><span onclick="fnDeprArvlViewList('29');">광주/전남</span></li>
								<li><span onclick="fnDeprArvlViewList('45');">전북</span></li>
								<li><span onclick="fnDeprArvlViewList('26');">부산/경남</span></li>
								<li><span onclick="fnDeprArvlViewList('27');">대구/경북</span></li>
							</ul> -->
								<ul class="area_list">
									<li class="active" id="areaListAll"><button type="button"
											onclick="fnDeprArvlViewList('all');" title="선택됨">전체</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('11');">서울</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('28');">인천/경기</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('42');">강원</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('30');">대전/충남</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('43');">충북</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('29');">광주/전남</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('45');">전북</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('26');">부산/경남</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('27');">대구/경북</button></li>
								</ul>
							</div>
							<div class="scroll-element scroll-x">
								<div class="scroll-element_outer">
									<div class="scroll-element_size"></div>
									<div class="scroll-element_track"></div>
									<div class="scroll-bar"></div>
								</div>
							</div>
							<div class="scroll-element scroll-y">
								<div class="scroll-element_outer">
									<div class="scroll-element_size"></div>
									<div class="scroll-element_track"></div>
									<div class="scroll-bar"></div>
								</div>
							</div>
						</div>
						<div class="terminal_list" id="terminalList">
							<h4 class="sr-only">전체</h4>
							<div class="scroll-wrapper terminal_scroll scrollbar-inner"
								style="position: relative;">
								<div class="terminal_scroll scrollbar-inner scroll-content"
									style="height: 420px; margin-bottom: 0px; margin-right: 0px; max-height: none;">
									<ul class="clear" id="tableTrmList">
									</ul>
								</div>
								<div class="scroll-element scroll-x">
									<div class="scroll-element_outer">
										<div class="scroll-element_size"></div>
										<div class="scroll-element_track"></div>
										<div class="scroll-bar"></div>
									</div>
								</div>
								<div class="scroll-element scroll-y">
									<div class="scroll-element_outer">
										<div class="scroll-element_size"></div>
										<div class="scroll-element_track"></div>
										<div class="scroll-bar"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


				<div class="place">
					<!-- focus -->
					<ul>
						<li id="popDeprChc" class="focuson">
							<!--  class="focuson" -->
							<div class="start-title">
								<span class="stit">출발지</span>
								<p class="text empty">
									<span class="val_txt" id="popDeprNmSpn"></span>
								</p>
							</div>
						</li>
						<li id="popArvlChc">
							<div class="end-title">
								<span class="stit">도착지</span>
								<p class="text empty">
									<span class="val_txt" id="popArvlNmSpn"></span>
								</p>
							</div>
						</li>
					</ul>
					<!-- <button type="button" class="btn_change" onclick="fnCrchDeprArvl();" id="chgDeprArvl">
						<span class="sr-only">출발지, 도착지 교체</span>
					</button> -->
				</div>
			</div>
			<div class="btns">
				<button type="button" data-remodal-action="confirm"
					class="remodal-confirm ready" id="cfmBtn" onclick="fncfmBtnChc()">선택완료</button>
			</div>
			<button type="button" data-remodal-action="close"
				class="remodal-close">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div class="remodal pop_fee remodal-is-initialized remodal-is-closed"
			data-remodal-id="popFee" role="dialog" tabindex="-1">

			<script>
				$("#readDeprInfoList, #readArvlInfoList").on("click", function () {
					fnDeprArvlViewList('all');
					$("#areaListAll").addClass("active");
				})
				
				function fnDeprArvlViewList(regionCode) {

					$("#areaListAll").removeClass("active");
					$(this).addClass("active");
					
					getRotLinInf(regionCode);
				}
				
				let isSelectingDepr = true;

				$("#readDeprInfoList").on("click", function() {
					isSelectingDepr = true;
				});

				$("#readArvlInfoList").on("click", function() {
					isSelectingDepr = false;
				});


				let arvlCode = null;
				let arvlName = null;
				let deprCode = null;
				let deprName = null;

				function fnDeprChc(code, name) {
					let selectedCode = code;
					let selectedName = name;
					

					if (isSelectingDepr) {
						// 출발지 선택 시
						deprCode = code;
						deprName = name;

						$("#popDeprNmSpn").text(deprName);
						$("#deprCd").val(deprCode);
					} else {
						// 도착지 선택 시
						arvlCode = code;
						arvlName = name;

						$("#popArvlNmSpn").text(arvlName);
						$("#arvlCd").val(arvlCode);
					}


				}

			</script>


			<div class="title">
				<h2>취소수수료 안내</h2>
			</div>
			<div class="cont">
				<div class="tbl_type1">
					<table class="MsoNormalTable __se_tbl table_type2" border="0"
						cellspacing="0" cellpadding="0" _se2_tbl_template="14">
						<caption>승차권 취소수수료에 대한 정보 제공</caption>
						<colgroup>
							<col style="width: 40%;">
							<col style="width: 20%;">
							<col style="width: 20%;">
							<col style="width: 20%;">
						</colgroup>
						<thead>
							<tr>
								<th class=" undraggable" colspan="4" scope="col">
									<p align="center" class="MsoNormal">
										<b><span>개정(25.5.1일부터)</span></b>
									</p>
								</th>
							</tr>
							<tr>
								<th class=" undraggable" scope="col">
									<p align="center" class="MsoNormal">
										<b><span style="color: #000; font-size: 10pt;">구분</span></b>
									</p>
								</th>
								<th class=" undraggable" scope="col">
									<p align="center" class="MsoNormal">
										<b><span style="color: #000; font-size: 10pt;">월~목</span></b>
									</p>
								</th>
								<th class=" undraggable" scope="col">
									<p align="center" class="MsoNormal">
										<b><span style="color: #000; font-size: 10pt;">금~일<br>공휴일
										</span></b>
									</p>
								</th>
								<th class=" undraggable" scope="col">
									<p align="center" class="MsoNormal">
										<b><span style="color: #000; font-size: 10pt;">명절<br>(설,추석)
										</span></b>
									</p>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>2일전</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>0%</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>0%</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>0%</span>
										</p>
								</b></td>
							</tr>
							<tr>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>1일전 ~ 3시간 이전</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>5%</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>7.50%</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>10%</span>
										</p>
								</b></td>
							</tr>
							<tr class="type2">
								<td><b>
										<p align="center" class="MsoNormal">
											<span>3시간 미만 ~ 출발 전</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>10%</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>15%</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>20%</span>
										</p>
								</b></td>
							</tr>
							<tr>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>출발 후 ~ 도착예정시간 이전</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>25년: 50%<br>26년 : 60%<br>27년 : 70%
											</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>25년: 50%<br>26년 : 60%<br>27년 : 70%
											</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>25년: 50%<br>26년 : 60%<br>27년 : 70%
											</span>
										</p>
								</b></td>
							</tr>
							<tr>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>도착예정시간 초과</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>100%</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>100%</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>100%</span>
										</p>
								</b></td>
							</tr>
						</tbody>
					</table>
					<p style="font-size: 14px; color: #000; margin-top: 15px;">* 명절
						취소수수료 기준은 설/추석 전전일, 전일, 당일 및 다음날에 적용합니다.</p>
					<p style="font-size: 14px; color: #000;">* 출발 이후부터 도착예정시간까지의
						취소수수료 기준은 `25년 5월1일부터 `26년 4월30일까지는 50%, `26년 5월1일부터 `27년 4월30일까지는
						60%, `27년 5월1일부터는 70%를 적용한다.</p>
					<p style="font-size: 14px; color: #000;">* 지정차 출발 당일에 승차권을 발행한
						경우는 발행시점 기준 1시간 이내까지 취소수수료 미부과 (단, 지정차 출발 이후에는 승차권 발행시점과 상관없이
						취소수수료 부과)</p>
				</div>
				<ul class="desc_list">
					<li>당일출발 차량의 경우 출발시간 1시간 전까지 홈페이지 예매가 가능하며 1시간 미만 출발임박 차량의 예매를
						원하시면 <span class="txt_puple">[고속버스 모바일앱]</span>에서 예매하시기 바랍니다.
					</li>
					<li>1회 최대 예매 매수는 6매입니다.(일부 시외우등 노선에 한정하여 10매까지 예매가능)</li>
					<li>일반고속 청소년(중, 고등학생 등) 할인은 터미널 현장에서 신분확인 절차 시 학생증, 청소년증,
						주민등록증 이외 나이를 확인할 수 있는 증서(운전면허증, 여권 등)를 제시해야만 할인 적용을 받을 수 있으니 탑승시 꼭
						소지하여 주시기 바랍니다.</li>
					<li>할인 승차권 부정 사용 시 운임의 10배 부가운임을 요구할 수 있습니다.</li>
					<li>사용하지 않은 모든 승차권은 지정차 출발 후 도착예정시간이 지나면 환불하실 수 없습니다.</li>
					<li>취소수수료 산정은 날짜를 기준(시간 기준이 아님)으로 합니다.</li>
					<li>홈페이지 예매 후 창구에서 발권 시 예매에 사용한 신용카드를 반드시 지참하셔야 합니다.</li>
				</ul>
			</div>
			<div class="btns">
				<a href="javascript:void(0)" data-remodal-action="cancel"
					class="remodal-cancel">취소</a> <a href="javascript:void(0)"
					data-remodal-action="confirm" class="remodal-confirm"
					onclick="fnPopFeeAgrm();">동의</a>
			</div>
			<button type="button" data-remodal-action="close"
				class="remodal-close">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div id="ctyPrmmDcInf"
			class="remodal pop_gradeinfo remodal-is-initialized remodal-is-closed"
			data-remodal-id="popGradeinfo" role="dialog" tabindex="-1">
			<!--  -->
			<div class="title">
				<h2>시외노선 우등형 할인 안내</h2>
			</div>
			<div class="cont">
				<p class="tbl_desc">
					예매하시려는 노선은 우등 형 할인혜택이 제공되는 시외노선입니다.<br>우등등급에 한정하여 예매 시 할인이
					제공되며 상세조건은 아래와 같습니다.
				</p>
				<div class="tbl_type1">
					<table>
						<caption>시외노선 우등형 할인 안내</caption>
						<colgroup>
							<col style="width: 15%;">
							<col style="width: auto">
							<col style="width: 30%;">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">구분</th>
								<th scope="col">내용</th>
								<th scope="col">할인율</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">사전예매</th>
								<td>
									<ul class="desc_list">
										<li>차량 출발일 2일(48시간) 전까지 예매한 경우</li>
										<li>최대 예매 승차권수는 10매로 제한</li>
									</ul>
								</td>
								<td><span class="accent show_mo">할인율 : </span>우등버스 정상요금의
									10%</td>
							</tr>
							<tr>
								<th scope="row">단체예매</th>
								<td>
									<ul class="desc_list">
										<li>단체승객(5인 이상 10인 이하)이 승차권을 사전 예매한 경우</li>
										<li>최대 예매 승차권수는 10매로 제한</li>
									</ul>
								</td>
								<td><span class="accent show_mo">할인율 : </span>우등버스 정상요금의
									10%</td>
							</tr>
							<tr>
								<th scope="row">왕복예매</th>
								<td>
									<ul class="desc_list">
										<li>동일 노선/구간의 왕복 승차권을 예매한 경우</li>
										<li>왕복 각각 동일한 할인율을 적용</li>
										<li>최대 예매 승차권수는 10매로 제한</li>
									</ul>
								</td>
								<td><span class="accent show_mo">할인율 : </span>우등버스 정상요금의
									10%<span class="line_block">(편도 각 10%)</span></td>
							</tr>



						</tbody>
					</table>
				</div>
				<ul class="desc_list">
					<li>할인혜택은 성인 승차권 예매 기준입니다. (아동/중고생은 제외)</li>
					<li>사전에 홈페이지와 모바일앱 예매를 이용한 승객에게만 적용됩니다.(터미널 현장 발권은 대상제외. 단,
						뒷좌석 예매는 예외)</li>
					<li>명절 연휴 특송기간(설, 추석 등)은 할인이 적용되지 않습니다.</li>
					<li>할인 적용된 우등버스 요금이 일반ㆍ직행 버스 요금보다 낮을 경우, 일반ㆍ직행 버스 요금을 적용하게
						됩니다.</li>
					<li>왕복할인/단체할인을 적용하여 홈페이지 예매 완료 시 매수변경이 불가하니 유의하시기 바랍니다.</li>
					<li>할인 적용 시에는 신용카드결제만 가능합니다.</li>
				</ul>
			</div>
			<div class="btns">
				<button type="button" data-remodal-action="cancel"
					class="remodal-cancel">취소</button>
				<button type="button" class="remodal-confirm"
					data-remodal-action="confirm" onclick="fnRotAdPopup();">예매진행</button>
			</div>
			<button type="button" data-remodal-action="close"
				class="remodal-close">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal pop_route remodal-is-initialized remodal-is-closed"
			data-remodal-id="popRoute1" role="dialog" tabindex="-1">
			<div class="title">
				<h2>노선조회안내</h2>
			</div>
			<div class="cont">
				<ul class="txt">
					<!-- 			<li><strong>1. 요금할인</strong> -->
					<!-- 				<ul class="desc_list"> -->
					<!-- 					<li>요금인상 없이 종전 요금 이용</li> -->
					<!-- 				</ul> -->
					<!-- 			</li> -->
					<li><strong>1. 제휴할인 서비스</strong>
						<ul class="desc_list">
							<li>강릉지역 렌터카 및 맛집, 카페 등 이용할인</li>
							<li><a
								href="/cscn/ntcmttr/readNtc.do?ntcNo=20190226001"
								title="새창열림" target="_blank" class="accent">이용방법 및 업체 상세보기
									&gt;</a></li>
						</ul></li>
					<li><strong>2. 프리미엄 버스 확대 운행</strong>
						<ul class="desc_list">
							<li>월~목 10%, 금~일 5% 할인 시행 중</li>
							<!-- <li>주말 이용 시 마일리지 미 적립</li> -->
						</ul></li>
				</ul>
			</div>
			<div class="btns">
				<button type="button" data-remodal-action="confirm"
					class="remodal-confirm" onclick="fnRotVldChc();">확인</button>
			</div>
			<button type="button" data-remodal-action="close"
				class="remodal-close">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal pop_route remodal-is-initialized remodal-is-closed"
			data-remodal-id="popRoute2" role="dialog" tabindex="-1">
			<div class="title">
				<h2>노선조회안내</h2>
			</div>
			<div class="cont">
				<ul class="txt">
					<!-- 			<li><strong>1. 요금 변경 안내</strong> -->
					<!-- 				<ul class="desc_list"> -->
					<!-- 					<li>2020년 7월 10일부터 변경된 할인율 적용</li> -->
					<!-- 				</ul> -->
					<!-- 			</li> -->
					<!-- 			<li><strong>1. 요금할인</strong> -->
					<!-- 				<ul class="desc_list"> -->
					<!-- 					<li>평균 25% 요금할인으로 이용</li> -->
					<!-- 				</ul> -->
					<!-- 			</li> -->
					<li><strong>제휴할인 서비스</strong>
						<ul class="desc_list">
							<li>강릉지역 렌터카 및 맛집, 카페 등 이용할인</li>
							<li><a
								href="/cscn/ntcmttr/readNtc.do?ntcNo=20190226001"
								title="새창열림" target="_blank" class="accent">이용방법 및 업체 상세보기
									&gt;</a><br> '코버스' 홈페이지 공지사항<br> '강원도 노선업무 제휴 업체 리스트' 참조</li>
						</ul></li>
					<li id="popRoute2_txt" style="display: none;"><strong>롯데렌터카
							업무제휴</strong>
						<ul class="desc_list">
							<li>해당 노선 이용시 롯데렌터카 렌트비 50% 할인!<br>(2018년 11월 15일부터)
							</li>
							<li>문의 : 033) 642-8000(강릉), 033) 632-8000(속초)</li>
							<li>많은 이용 바랍니다. 감사합니다.</li>
						</ul></li>
				</ul>
			</div>
			<div class="btns">
				<button type="button" data-remodal-action="confirm"
					class="remodal-confirm" onclick="fnRotVldChc();">확인</button>
			</div>
			<button type="button" data-remodal-action="close"
				class="remodal-close">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal pop_route remodal-is-initialized remodal-is-closed"
			data-remodal-id="popRoute3" role="dialog" tabindex="-1">
			<div class="title">
				<h2>노선조회안내</h2>
			</div>
			<div class="cont">
				<ul class="txt">
					<li><strong>제휴할인 서비스</strong>
						<ul class="desc_list">
							<li><span id="arvlNmSpan3"></span>지역 렌터카 이용할인</li>
							<li><a
								href="/cscn/ntcmttr/readNtc.do?ntcNo=20190226001"
								title="새창열림" target="_blank" class="accent">이용방법 및 업체 상세보기
									&gt;</a></li>
						</ul></li>
				</ul>
			</div>
			<div class="btns">
				<button type="button" data-remodal-action="confirm"
					class="remodal-confirm" onclick="fnRotVldChc();">확인</button>
			</div>
			<button type="button" data-remodal-action="close"
				class="remodal-close">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal pop_route remodal-is-initialized remodal-is-closed"
			data-remodal-id="popRoute4" role="dialog" tabindex="-1">
			<div class="title">
				<h2>노선조회안내</h2>
			</div>
			<div class="cont">
				<ul class="txt">
					<li><strong>1. 프리미엄 버스 운행 개시</strong>
						<ul class="desc_list">
							<li>최고급 버스를 15% 할인된 금액으로 상시 이용 가능</li>
							<li>주말 이용 시 마일리지 미적립</li>
						</ul></li>
					<li><strong>2. 제휴할인 서비스</strong>
						<ul class="desc_list">
							<li><span id="arvlNmSpan4"></span>지역 렌터카 이용할인</li>
							<li><a
								href="/cscn/ntcmttr/readNtc.do?ntcNo=20190226001"
								title="새창열림" target="_blank" class="accent">이용방법 및 업체 상세보기
									&gt;</a></li>
						</ul></li>
				</ul>
			</div>
			<div class="btns">
				<button type="button" data-remodal-action="confirm"
					class="remodal-confirm" onclick="fnRotVldChc();">확인</button>
			</div>
			<button type="button" data-remodal-action="close"
				class="remodal-close">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal pop_route remodal-is-initialized remodal-is-closed"
			data-remodal-id="popRoute5" role="dialog" tabindex="-1">
			<div class="title">
				<h2>노선조회안내</h2>
			</div>
			<div class="cont">
				<ul class="txt">
					<li><strong>제휴할인 서비스</strong>
						<ul class="desc_list">
							<li>속초지역 렌터카 및 맛집, 카페 등 이용할인</li>
							<li><a
								href="/cscn/ntcmttr/readNtc.do?ntcNo=20190226001"
								title="새창열림" target="_blank" class="accent">이용방법 및 업체 상세보기
									&gt;</a></li>
						</ul></li>
					<li><strong>롯데렌터카 업무제휴</strong>
						<ul class="desc_list">
							<li>해당 노선 이용시 롯데렌터카 렌트비 50% 할인!<br>(2018년 11월 15일부터)
							</li>
							<li>문의 : 033) 642-8000(강릉), 033) 632-8000(속초)</li>
							<li>많은 이용 바랍니다. 감사합니다.</li>
						</ul></li>
				</ul>
			</div>
			<div class="btns">
				<button type="button" data-remodal-action="confirm"
					class="remodal-confirm" onclick="fnRotVldChc();">확인</button>
			</div>
			<button type="button" data-remodal-action="close"
				class="remodal-close">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal pop_route remodal-is-initialized remodal-is-closed"
			data-remodal-id="popRoute6" role="dialog" tabindex="-1">
			<div class="title">
				<h2>제휴할인 서비스</h2>
			</div>
			<div class="cont">
				<ul class="txt">
					<li><strong>제휴할인 서비스</strong>
						<ul class="desc_list">
							<li>원주지역 렌터카 및 영화, 식당 등 이용할인</li>
							<li><a
								href="/cscn/ntcmttr/readNtc.do?ntcNo=20190226001"
								title="새창열림" target="_blank" class="accent">이용방법 및 업체 상세보기
									&gt;</a></li>
						</ul></li>
				</ul>
			</div>
			<div class="btns">
				<button type="button" data-remodal-action="confirm"
					class="remodal-confirm" onclick="fnRotVldChc();">확인</button>
			</div>
			<button type="button" data-remodal-action="close"
				class="remodal-close">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal pop_route remodal-is-initialized remodal-is-closed"
			data-remodal-id="popTmpTml" role="dialog" tabindex="-1">
			<div class="title">
				<h2>광양 임시터미널 안내</h2>
			</div>
			<div class="cont">
				<ul class="txt">
					<li><strong>광양 임시터미널(인동숲 주차장) 안내</strong>
						<p style="margin-top: 10px;">
							<img src="${pageContext.request.contextPath}/resources/images/pop_img01.png"
								alt="광양임시터미널 - 타이어뱅크와 국민은행 사이 옆길 진입도" width="640">
						</p></li>
					<li><strong>광양 임시터미널 승차홈</strong>
						<p>
							<img src="${pageContext.request.contextPath}/resources/images/pop_img02.png"
								alt="광양임시터미널 승차홈별 지역(상세 다음 참고)" width="640">
						</p>
						<div class="sr-only">
							<ul>
								<li>1승차홈 : 서울(센트럴), 동서울, 대전, 청주, 통영</li>
								<li>2승차홈 : 광주, 목포, 인천공항</li>
								<li>3승차홈 : 동광양, 대구/부천, 성남/수원, 안산/안양, 인천/전주</li>
								<li>4승차홈 : 경주, 노포, 동래, 부산사상, 포항</li>
								<li>5승차홈 : 김해, 남해, 마산, 울산, 진교, 진주</li>
								<li>6승차홈 : 광영/녹동, 순천/여천, 여수/완도, 태인도, 해남</li>
							</ul>
						</div>
						<p></p></li>
				</ul>
			</div>
			<div class="btns">
				<button type="button" data-remodal-action="confirm"
					class="remodal-confirm" onclick="fnRotVldChc();">확인</button>
			</div>
			<button type="button" data-remodal-action="close"
				class="remodal-close">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
</body>
</html>
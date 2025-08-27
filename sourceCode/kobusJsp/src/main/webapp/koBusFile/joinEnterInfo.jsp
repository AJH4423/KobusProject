<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>

<html class="pc" lang="ko">
<head>
<meta charset="utf-8" />
<link rel="shortcut icon" type="image/x-icon"
	href="/koBus/media/favicon.ico">
<meta
	content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
	name="viewport" />
<meta content="IE=Edge" http-equiv="X-UA-Compatible" />
<title>회원가입(정보입력) | 고속버스통합예매</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<link href="/images/favicon.ico" rel="shortcut icon" />
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />

<link href="/koBus/css/common/ui.jqgrid.custom.css" rel="stylesheet"
	type="text/css" />







<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<link href="/koBus/css/common/style.css" rel="stylesheet" type="text/css" />
</head>
<%@ include file="common/header.jsp" %>
		<!-- breadcrumb -->
		<!-- 브레드크럼 -->
		<nav id="new-kor-breadcrumb">
			<div class="container"></div>
		</nav>
		<article id="new-kor-content">

			<!-- 20200617 yahan -->

			<link href="/transkey/transkey.css" rel="stylesheet" type="text/css" />

			<div class="loading" id="loading" style="height: 1056px; top: 180px;">
				<p class="load" style="margin-left: -53px;">
					<span class="sr-only">로딩중입니다</span>
				</p>
			</div>
			<div class="title_wrap in_process joinT" style="display: none;">
				<a class="back" href="#">back</a> <a class="mo_toggle" href="#">메뉴</a>
				<h2>회원가입</h2>
				<ol class="process step04">
					<li>약관동의</li>
					<li>본인인증</li>
					<li class="active">정보입력</li>
					<li class="last">가입완료</li>
				</ol>
			</div>
			<!-- 타이틀 -->
			<div class="content-header" data-page-title="회원가입(정보입력) | 고속버스통합예매">
				<div class="container">
					<div class="title-area">
						<h2 class="page-title">회원가입</h2>
						<ol class="process">
							<li><span class="num">1</span> 약관동의</li>
							<li><span class="num">2</span> 본인인증</li>
							<li class="active" title="현재 단계"><span class="num">3</span>
								정보입력</li>
							<li><span class="num">4</span> 가입완료</li>
						</ol>
					</div>
				</div>
			</div>
			<div class="content-body">
				<div class="container">
					<div class="noti_wrap mobNone">
						<p class="noti">회원정보를 입력해주세요.</p>
					</div>
					<form action="/koBus/joinOkEnterInfo.do" method="get" name="insertInfoForm" id="joinFormTag">
						<div class="border-box box_changeNum join-wrap">
							<div class="inner member-info-form">
								<div class="box_inputForm" id="idDiv">
									<label class="label" for="usrId">아이디</label>
									<div class="box_label" style="display: flex; align-items: center;">
										<input class="input" id="usrId" name="usrId"
											placeholder="아이디를 입력하세요" type="text" style="flex: 1;" />
										<button type="button" class="btn_check" id="idDupCheck" style="margin-left: 8px;">중복확인</button>
									</div>
									<span class="ico_complete" style="display: none;">가능</span>
								</div>
								<span class="noti_box" id="noti_box_idFail" style="display: none;">사용 불가한 아이디형식 입니다.</span>
								<span class="noti_box" id="noti_box_idOk" style="display: none;">사용가능한 아이디형식 입니다.중복확인을 진행하세요.</span>
								<span class="noti_box" id="noti_box_idOkMsg" style="display: none;">사용가능한 아이디 입니다.</span>
								<span class="noti_box" id="noti_box_idFailMsg" style="display: none;">사용이 불가한 아이디입니다, 다른 아이디를 입력하세요.</span>
								<div class="box_inputForm" id="telDiv">
									<label class="label" for="usrTel">전화번호</label>
									<div class="box_label">
										<input class="input" data-tk-kbdtype="qwerty" id="usrTel"
											name="usrTel" value="${param.phoneNum}" tabindex="-1"
											type="text" readonly />
									</div>
									<span class="ico_complete" style="display: none;">가능</span>
								</div>
								<div class="box_inputForm" id="pwdDiv">
									<label class="label" for="usrPwd">비밀번호</label>
									<div class="box_label">
										<input class="input" data-tk-kbdtype="qwerty" id="usrPwd"
											name="usrPwd" placeholder="8~16자 이상" tabindex="-1"
											type="password" />
									</div>
									<span class="ico_complete" style="display: none;">가능</span>
								</div>
								<span class="noti_box" id="noti_box_pwFail" style="display: none;">사용 불가한 비밀번호입니다.</span>
								<span class="noti_box" id="noti_box_pwOk" style="display: none;">사용가능한 비밀번호입니다.</span>
								<div class="box_inputForm" id="pwdCfmDiv">
									<label class="label" for="pwdCfmCheck">비밀번호 확인</label>
									<div class="box_label">
										<input class="input" data-tk-kbdtype="qwerty" id="pwdCfmCheck"
											name="pwdCfmCheck" placeholder="비밀번호를 재입력하세요" tabindex="-1"
											type="password" />
									</div>
									<span class="ico_complete" style="display: none;">가능</span>
								</div>
								<span class="noti_box" id="noti_box_rePwFail" style="display: none;">일치하지않습니다.</span>
								<span class="noti_box" id="noti_box_rePwOk" style="display: none;">비밀번호가 일치합니다.</span>
								<div class="box_inputForm" id="emiDiv">
									<label class="label" for="emi">이메일</label>
									<div class="box_label">
										<input class="input" id="emi" name="emi"
											placeholder="이메일 주소를 입력하세요" type="text" />
									</div>
									<span class="ico_complete" style="display: none;">가능</span>
								</div>
								<span class="noti_box" id="noti_box_emailFail" style="display: none;">올바른 형식의 이메일로 입력하세요.</span>
								<span class="noti_box" id="noti_box_emailOk" style="display: none;">사용가능한 이메일입니다.</span>
								<div class="box_inputForm click_box inselect">
									<!-- 직접입력 선택시 display: none; 처리 -->
									<strong class="label">출생년도</strong>
									<!-- 웹 접근성 개선 셀렉트 박스 UI -->
									<div class="dropdown-wrap select-default">
										<a aria-expanded="false" class="btn-dropdown" href="#"
											title="출생년도 선택"> <span class="text">선택하세요.</span></a>
										<ul class="dropdown-list" id="yearList"></ul>
										<input id="ageYear" name="ageYear" type="hidden" value="2011" />
									</div>
								</div>
								<div class="box_inputForm">
									<strong class="label">성별</strong> <span class="radio_wrap">
										<span class="custom_radio"> <input id="s_Gender01"
											name="s_Gender" type="radio" /> <label
											class="ico_gender female" for="s_Gender01">여자</label>
									</span> <span class="custom_radio"> <input id="s_Gender02"
											name="s_Gender" type="radio" /> <label
											class="ico_gender male" for="s_Gender02">남자</label>
									</span> <input id="sexCod" name="sexCod" type="hidden" /> <input
										id="hpNo" name="hpNo" type="hidden" value="" />
									</span>
								</div>
								<div class="agreement_wrap marT30">
									<div class="agreement_tit">
										<h4 class="first">
											개인정보 수집 및 이용동의<span class="txt_essential">(선택)</span>
										</h4>
									</div>
									<div class="scroll-wrapper agreement_cont scrollbar-inner"
										style="position: relative;">
										<div
											class="agreement_cont scrollbar-inner scroll-content scroll-scrolly_visible"
											style="height: auto; margin-bottom: 0px; margin-right: 0px; max-height: 118px;">
											<iframe frameborder="0" height="184" scrolling="no"
												
												title="개인정보 수집 및 이용동의" width="100%"></iframe>
										</div>
										<div class="scroll-element scroll-x scroll-scrolly_visible">
											<div class="scroll-element_outer">
												<div class="scroll-element_size"></div>
												<div class="scroll-element_track"></div>
												<div class="scroll-bar" style="width: 88px;"></div>
											</div>
										</div>
										<div class="scroll-element scroll-y scroll-scrolly_visible">
											<div class="scroll-element_outer">
												<div class="scroll-element_size"></div>
												<div class="scroll-element_track"></div>
												<div class="scroll-bar" style="height: 67px; top: 0px;"></div>
											</div>
										</div>
									</div>
									<span class="custom_check chk_blue"> <input id="agree1"
										type="checkbox" /> <label for="agree1">동의</label>
									</span>
								</div>
							</div>
						</div>
						<p class="btns col1">
							<a class="btnL btn_confirm ready" href="#" id="joinBtn">회원가입</a>
							<!-- ready class 있음 -->
						</p>
						
					</form>
					<script>
						// 유효성검사 확인 변수
						let isValidUserId = false; // 아이디 제대로 입력했는지
						let isValidUserPasswd = false; // 비밀번호 제대로 입력했는지
						let isValidUserCheckPasswd = false; // 비밀번호 재입력 제대로 했는지
						let isValidUserEmail = false; // 이메일 제대로 입력했는지
						let isValidUserBirth = false; // 출생년도 제대로 선택했는지
						let isValidUserGender = false; // 성별 제대로 선택했는지
						let isValidUserAgree = false; // 개인정보 수집 및 이용동의 선택했는지
						
						
						let checkedId="";
						
						// 아이디 유효성 검사 및 중복확인
						$("#usrId").on("propertychange change keyup paste input", function (){
							const currentVal = $(this).val();
						    const regExp = /^[0-9a-zA-Z]{4,10}$/; // 영문 + 숫자 4~10자리

						    if (!regExp.test(currentVal)) {
						        $("#noti_box_idOk").hide();
						        $("#noti_box_idFail").show();
						        setTimeout(function () {
						            $("#noti_box_idFail").hide();
						        }, 2000);
						        isValidUserId = false;
						    } else {
						        $("#noti_box_idFail").hide();
						        $("#noti_box_idOk").show();
						        setTimeout(function () {
						            $("#noti_box_idOk").hide();
						        }, 2000);
						        
						     // 이전에 중복확인했던 아이디와 현재 입력값이 다르면 다시 중복확인해야 함
						        if (currentVal !== checkedId) {
						            isValidUserId = false;
						        }
						    }
						        
						});
						
						// 아이디값 중복확인 ajax
						$("#idDupCheck").on("click", function (){
							let inputUserId = $("#usrId").val();
							let url = `/koBus/usrIdDupCheck.do?checkid=\${inputUserId}`;
							console.log("ajax url : " + url);
							$.ajax({
								url:url,
								type:"GET",
								cache:false,
								dataType:"text",
								success : function (data){
									if (data === "success") {
										console.log("아이디값 존재");
										alert("사용이 불가한 아이디입니다, 다른 아이디를 입력하세요.")
										$("#noti_box_idFailMsg").show();
										setTimeout(function() {
										    $("#noti_box_idFailMsg").hide();
										}, 2000);
										isValidUserId = false;
									} else {
										console.log("아이디 사용가능");
										alert("사용가능한 아이디 입니다.");
										$("#noti_box_idOkMsg").show();
										setTimeout(function() {
										    $("#noti_box_idOkMsg").hide();
										}, 2000);
										isValidUserId = true;
										checkedId = inputUserId;
									}	
								},
							error : function(){
								alert("AJAX 오류발생");
							}
							});
						});
						
						// 비밀번호 유효성 검사
						$("#usrPwd").on("propertychange change keyup paste input", function (){
							let checkPw = $("#usrPwd").val();
							let regExp = /^[a-zA-Z\d`~!@#$%^&*()-_=+]{8,16}$/; // 비밀번호 8~16자
							if (!regExp.test(checkPw)) {
								$("#noti_box_pwFail").show();
								setTimeout(function() {
								    $("#noti_box_pwFail").hide();
								}, 2000);
								isValidUserPasswd = false;
							} else {
								$("#noti_box_pwFail").hide();
								$("#noti_box_pwOk").show();
								setTimeout(function() {
								    $("#noti_box_pwOk").hide();
								}, 2000);
								isValidUserPasswd = true;
							}
						});
						// 비밀번호 확인 동일한지 검사
						$("#pwdCfmCheck").on("propertychange change keyup paste input", function (){
							let checkRePw = $("#pwdCfmCheck").val();
							if(checkRePw != $("#usrPwd").val()){
								$("#noti_box_rePwFail").show();
								setTimeout(function() {
								    $("#noti_box_rePwFail").hide();
								}, 2000);
								isValidUserCheckPasswd = false;
							} else {
								$("#noti_box_rePwFail").hide();
								$("#noti_box_rePwOk").show();
								setTimeout(function() {
								    $("#noti_box_rePwOk").hide();
								}, 2000);
								isValidUserCheckPasswd = true;
							}
						});
						
						// 이메일 유효성 검사
						$("#emi").on("propertychange change keyup paste input", function(){
							let checkEmail = $("#emi").val();
							let regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 이메일 정규표현식
							if (!regExp.test(checkEmail)) {
								$("#noti_box_emailOk").hide();
								$("#noti_box_emailFail").show();
								setTimeout(function() {
								    $("#noti_box_emailFail").hide();
								}, 2000);
								isValidUserEmail = false;
							} else {
								$("#noti_box_emailFail").hide();
								$("#noti_box_emailOk").show();
								isValidUserEmail = true;
							}
						});
						
						
					</script>
					<script>
						// 출생년도 선택하는 함수
						$(document).ready(function() {
						  const currentYear = new Date().getFullYear();
						  const endYear = currentYear - 120;
							
						  // for문으로 현재년도 ~ 현재년도-120까지 동적으로 표시
						  for (let year = currentYear; year >= endYear; year--) {
						    $("#yearList").append(`<li><a href="#">\${year}</a></li>`);
						  }
						
						  $(".btn-dropdown").on("click", function(e) {
						    e.preventDefault(); // a태그 url : # 으로가는거 막는 코드
						    $(this).next(".dropdown-list").toggle(); // 리스트 내리기
						  });
							
						  // 년도 선택한뒤 값 표시해주기
						  $("#yearList").on("click", "li a", function(e) {
						    e.preventDefault();
						    const selectedYear = $(this).text();
						    $("#new-kor-content > div.content-body > div > form > div > div > div.box_inputForm.click_box.inselect > div > a .text").text(selectedYear);
						    $("#ageYear").val(selectedYear);
						    $(".dropdown-list").hide();
						    console.log("선택한 년도 : " + $("#ageYear").val());
						    isValidUserBirth = true;
						  });
						
						  $(document).on("click", function(e) {
						    if (!$(e.target).closest(".dropdown-wrap").length) {
						      $(".dropdown-list").hide();
						    }
						  });
						});
					</script>
					<script>
						// 성별선택하는 함수
						$("input[name='s_Gender']").on("click", function () {
						    let selectedText = $("label[for='" + this.id + "']").text();
						    console.log("선택한 라벨 텍스트: " + selectedText);
						    
						    // text값 $("hpNo")의 val로 넘겨줄것.....
						    $("#hpNo").val(selectedText);
						    console.log("넘겨주는값: " + $("#hpNo").val());
						    isValidUserGender = true; 
						});
					</script>
					<script>
						// 이용동의 클릭 함수
						$("#agree1").on("click", function(){
							alert("동의완료 되었습니다.");
							isValidUserAgree = true;
						});
					</script>
					<script>
						// 회원가입 버튼 누르는 함수
						$("#joinBtn").on("click", function(event){
							if (
								isValidUserId === true&&
								isValidUserPasswd === true&&
								isValidUserCheckPasswd === true&&
								isValidUserEmail === true&&
								isValidUserBirth === true&&
								isValidUserGender === true
							) {
								alert("회원가입이 완료되었습니다.");
								// submit 시켜주는 코드 입력, form 액션태그에 .do매핑한 url적기
								$("#joinFormTag").submit();
							} else {
								event.preventDefault();
								alert("값을 모두 제대로 입력해주세요.");
							}
						})
						
					</script>
					
					<ul class="desc_list">
						<li>고객님의 이메일과 출생, 성별은 아이디와 비밀번호 분실 시 필요한 정보입니다.</li>
						<li>고객님의 출생과 성별은 더 나은 서비스를 위해 마케팅 정보로 활용됩니다.</li>
					</ul>
				</div>
			</div>
		</article>
		<!-- footer -->
		<!-- 푸터 -->
		<footer id="new-kor-footer">
			<div class="container">
				<div class="footer-top-cont">
					<ul class="express-bus-company-list">
						<li><a href="http://www.kumhobuslines.co.kr" target="_blank"
							title="새창"><img alt="금호고속"
								src="/koBus/images/kor/layout/logo-kumho-express.png" /></a></li>
						<li><a href="http://www.dongbubus.com" target="_blank"
							title="새창"><img alt="동부고속"
								src="/koBus/images/kor/layout/logo-dongbu-express.png" /></a></li>
						<li><a href="http://www.songnisanbuslines.co.kr"
							target="_blank" title="새창"><img alt="속리산고속"
								src="/koBus/images/kor/layout/logo-sokrisan-express.png" /></a></li>
						<li><a href="http://www.dyexpress.co.kr" target="_blank"
							title="새창"><img alt="동양고속"
								src="/koBus/images/kor/layout/logo-dongyang-express.png" /></a></li>
						<li><a href="http://www.samhwaexpress.co.kr" target="_blank"
							title="새창"><img alt="삼화고속"
								src="/koBus/images/kor/layout/logo-samhwa-express.png" /></a></li>
						<li><a href="http://www.jabus.co.kr" target="_blank"
							title="새창"><img alt="중앙고속"
								src="/koBus/images/kor/layout/logo-joongang-express.png" /></a></li>
						<li><a href="http://www.chunilexpress.co.kr" target="_blank"
							title="새창"><img alt="천일고속"
								src="/koBus/images/kor/layout/logo-chunil-express.png" /></a></li>
						<li><a href="http://www.hanilexpress.co.kr" target="_blank"
							title="새창"><img alt="한일고속"
								src="/koBus/images/kor/layout/logo-hanil-express.png" /></a></li>
					</ul>
					<!-- dropdown-top 클래스 추가 시, 드롭다운 목록 위로 노출 -->
					<div class="dropdown-wrap dropdown-top related-sites-select">
						<a aria-expanded="false" class="btn-dropdown" href="#"
							title="관련사이트 이동"><span class="text">관련사이트</span><i
							class="ico ico-arrow-down"></i></a>
						<ul class="dropdown-list">
							<li class="selected"><a href="/wchr/main.do" target="_blank"
								title="새창">장애인 휠체어 사이트</a></li>
							<li><a href="https://www.tago.go.kr" target="_blank"
								title="새창">국가대중교통정보센터</a></li>
							<li><a href="https://www.intis.or.kr" target="_blank"
								title="새창">인천장애인콜택시</a></li>
							<li><a href="http://www.shinsegaecentralcity.com"
								target="_blank" title="새창">센트럴시티터미널</a></li>
							<li><a href="https://txbus.t-money.co.kr" target="_blank"
								title="새창">시외버스 통합예매시스템</a></li>
						</ul>
					</div>
				</div>
				<div class="footer-bottom-cont">
					<address class="address">
						<ul class="policy-list">
							<li><a href="/etc/svcstpl/SvcStpl.do">서비스 이용약관</a></li>
							<li><a class="text-bold" href="/etc/indlstpl/IndlStpl.do">개인정보
									처리방침</a></li>
							<li><a href="/etc/busstpl/BusStpl.do">고속버스 운송약관</a></li>
							<li><a href="http://www.tmoney.co.kr" target="_blank"
								title="새창">티머니</a></li>
						</ul>
						<ul class="contact">
							<li>고객센터 : 1644-9030</li>
							<li>서울특별시 서초구 신반포로 194</li>
							<li>대표자 : 김용성</li>
							<li>통신판매업신고 : 2009-서울서초 0587호</li>
						</ul>
						<p class="copyright">COPYRIGHT© 2016. WWW.KOBUS.CO.KR . ALL
							RIGHT RESERVED</p>
					</address>
					<ul class="greeting-btn-list">
						<li><a
							href="http://www.wa.or.kr/board/list.asp?search=total&amp;SearchString=%B0%ED%BC%D3%B9%F6%BD%BA&amp;BoardID=0006"
							target="_blank" title="새창"><img
								alt="(사)한국장애인단체총연합회 한국웹접근성인증평가원 웹 접근성 우수사이트 인증마크(WA인증마크)"
								height="40"
								src="/koBus/images/kor/layout/logo-accessibility2.png" /></a></li>
						<li><a href="/ugd/bustrop/Bustrop.do" title="이사장 인사말 바로가기"><img
								alt="KOBUS 전국고속버스운송사업조합"
								src="/koBus/images/kor/layout/logo-kobus.png" /></a></li>
						<li><a href="/ugd/trmlbizr/Trmlbizr.do" title="협회장 인사말 바로가기"><img
								alt="전국여객자동차터미널사업자협회"
								src="/koBus/images/kor/layout/logo-npvtba-express.png" /></a></li>
					</ul>
				</div>
			</div>
		</footer>
	</div>
	<div
		style="left: -1000px; overflow: scroll; position: absolute; top: -1000px; border: none; box-sizing: content-box; height: 200px; margin: 0px; padding: 0px; width: 200px;">
		<div
			style="border: none; box-sizing: content-box; height: 200px; margin: 0px; padding: 0px; width: 200px;"></div>
	</div>
<!-- 	<div class="transkey_divLayout" id="usrPwd_layout">
		<div class="transkey_qwertyMainDiv" id="usrPwd_mainDiv">
			<div
				style="width: 560px; height: 28px; margin-left: 10px; margin-top: 2px;">
				<div class="transkey_qwertyDragDiv" id="usrPwd_dragDiv"></div>
			</div>
			<div class="transkey_div_2">
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" id="tk_del" role="button" tabindex="0"></div>
			</div>
			<div class="transkey_div_2">
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_3" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
			</div>
			<div class="transkey_div_2">
				<div class="transkey_div_2_2_2" role="button"
					style="margin-left: 40px;" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_3" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2_2" role="button" tabindex="0"></div>
			</div>
			<div class="transkey_div_2">
				<div class="transkey_q_l_enterKey" id="tk_enter_l" role="button"
					tabindex="0"></div>
				<div class="transkey_div_2_2" role="button"
					style="margin-left: 80px;" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_q_r_enterKey" id="tk_enter_r" role="button"
					tabindex="0"></div>
			</div>
			<div class="transkey_div_2">
				<div class="transkey_div_2_2" id="tk_cp_l" role="button"
					tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_4" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" id="tk_cp_r" role="button"
					tabindex="0"></div>
			</div>
			<div class="transkey_div_2"
				style="position: absolute; top: -3px; right: 4px; width: 30px;">
				<div id="tk_close" role="button"
					style="position: absolute; width: 30px; height: 30px; right: 0;"
					tabindex="0"></div>
			</div>
		</div>
		<div class="transkey_upper" id="usrPwd_layoutUpper">
			<iframe frameborder="10" id="usrPwd_block"
				style="z-index: -1; position: absolute; visibility: hidden; left: 0px; top: 0px; width: 100%; height: 100%;"
				title="가상키보드"></iframe>
		</div>
		<div class="transkey_lower" id="usrPwd_layoutLower">
			<iframe frameborder="10" id="usrPwd_block"
				style="z-index: -1; position: absolute; visibility: hidden; left: 0px; top: 0px; width: 100%; height: 100%;"
				title="가상키보드"></iframe>
		</div>
		<div class="transkey_q_p_spacekey" id="usrPwdq_p_space">
			<img alt="" src="/koBus/transkey/images/q_p_space.png" />
		</div>
		<div class="transkey_pKey" id="usrPwd_pKey">
			<img alt="" src="/koBus/transkey/images/p_key.png" />
		</div>
		<div class="transkey_pKey" id="usrPwdq_p_backKey">
			<img alt="" src="/koBus/transkey/images/q_p_backkey.png" />
		</div>
		<div class="transkey_pKey" id="usrPwdq_p_shiftkey_sp">
			<img alt="" src="/koBus/transkey/images/q_p_shiftkey_sp.png" />
		</div>
		<div class="transkey_q_p_enterKey" id="usrPwdq_p_enterKey_L">
			<img alt="" src="/koBus/transkey/images/q_p_enterkey_l.png" />
		</div>
		<div class="transkey_q_p_enterKey" id="usrPwdq_p_enterKey_R">
			<img alt="" src="/koBus/transkey/images/q_p_enterkey_r.png" />
		</div>
		<div class="transkey_q_p_shiftKey" id="usrPwdq_p_shiftKey_L">
			<img alt="" src="/koBus/transkey/images/q_p_shiftkey_l.png" />
		</div>
		<div class="transkey_q_p_shiftKey" id="usrPwdq_p_shiftKey_R">
			<img alt="" src="/koBus/transkey/images/q_p_shiftkey_r.png" />
		</div>
		<div class="transkey_fakeMouse" id="usrPwd_fakeMouseDiv">
			<img alt="" id="fakeMouseImg" src="/koBus/transkey/images/fake.gif" />
		</div>
		<div class="transkey_osMouse" id="usrPwd_osMouseDiv">
			<img =""="" alt="" id="osMouseImg"
				src="/koBus/transkey/images/fake.gif" />
		</div>
		<div aria-label="기본마우스를 사용합니다." class="transkey_qwertySingleMouseType"
			id="usrPwd_singleMouseTypeDiv" role="button" tabindex="0">
			<img alt="" id="slngleMouseTypeImg"
				src="/koBus/transkey/images/single.png" />
		</div>
		<div aria-label="마우스를 가운데로 이동 또는 클릭해주세요."
			class="transkey_qwertyBlankOver" id="usrPwd_blankOverDiv"
			tabindex="0">
			<img alt="마우스이동" id="blankOverImg"
				src="/koBus/transkey/images/blank_over.gif" />
		</div>
		<div
			aria-label="멀티마우스를 사용합니다. 사용하시려면 키보드 클릭 후 마우스를 가운데로 이동 또는 클릭해주세요."
			class="transkey_qwertyMultiMouseType" id="usrPwd_multiMouseTypeDiv"
			role="button">
			<img alt="멀티마우스" id="multiMouseTypeImg"
				src="/koBus/transkey/images/multi.png" />
		</div>
		<div class="transkey_qwertyBlank" id="usrPwd_blankDiv">
			<img alt="TOUCH EN transkey" id="blankImg"
				src="/koBus/transkey/images/blank.png" />
		</div>
	</div>
	<div class="transkey_divLayout" id="pwdCfmCheck_layout">
		<div class="transkey_qwertyMainDiv" id="pwdCfmCheck_mainDiv">
			<div
				style="width: 560px; height: 28px; margin-left: 10px; margin-top: 2px;">
				<div class="transkey_qwertyDragDiv" id="pwdCfmCheck_dragDiv"></div>
			</div>
			<div class="transkey_div_2">
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" id="tk_del" role="button" tabindex="0"></div>
			</div>
			<div class="transkey_div_2">
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_3" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
			</div>
			<div class="transkey_div_2">
				<div class="transkey_div_2_2_2" role="button"
					style="margin-left: 40px;" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_3" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2_2" role="button" tabindex="0"></div>
			</div>
			<div class="transkey_div_2">
				<div class="transkey_q_l_enterKey" id="tk_enter_l" role="button"
					tabindex="0"></div>
				<div class="transkey_div_2_2" role="button"
					style="margin-left: 80px;" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_q_r_enterKey" id="tk_enter_r" role="button"
					tabindex="0"></div>
			</div>
			<div class="transkey_div_2">
				<div class="transkey_div_2_2" id="tk_cp_l" role="button"
					tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_4" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" role="button" tabindex="0"></div>
				<div class="transkey_div_2_2" id="tk_cp_r" role="button"
					tabindex="0"></div>
			</div>
			<div class="transkey_div_2"
				style="position: absolute; top: -3px; right: 4px; width: 30px;">
				<div id="tk_close" role="button"
					style="position: absolute; width: 30px; height: 30px; right: 0;"
					tabindex="0"></div>
			</div>
		</div>
		<div class="transkey_upper" id="pwdCfmCheck_layoutUpper">
			<iframe frameborder="10" id="pwdCfmCheck_block"
				style="z-index: -1; position: absolute; visibility: hidden; left: 0px; top: 0px; width: 100%; height: 100%;"
				title="가상키보드"></iframe>
		</div>
		<div class="transkey_lower" id="pwdCfmCheck_layoutLower">
			<iframe frameborder="10" id="pwdCfmCheck_block"
				style="z-index: -1; position: absolute; visibility: hidden; left: 0px; top: 0px; width: 100%; height: 100%;"
				title="가상키보드"></iframe>
		</div>
		<div class="transkey_q_p_spacekey" id="pwdCfmCheckq_p_space">
			<img alt="" src="/koBus/transkey/images/q_p_space.png" />
		</div>
		<div class="transkey_pKey" id="pwdCfmCheck_pKey">
			<img alt="" src="/koBus/transkey/images/p_key.png" />
		</div>
		<div class="transkey_pKey" id="pwdCfmCheckq_p_backKey">
			<img alt="" src="/koBus/transkey/images/q_p_backkey.png" />
		</div>
		<div class="transkey_pKey" id="pwdCfmCheckq_p_shiftkey_sp">
			<img alt="" src="/koBus/transkey/images/q_p_shiftkey_sp.png" />
		</div>
		<div class="transkey_q_p_enterKey" id="pwdCfmCheckq_p_enterKey_L">
			<img alt="" src="/koBus/transkey/images/q_p_enterkey_l.png" />
		</div>
		<div class="transkey_q_p_enterKey" id="pwdCfmCheckq_p_enterKey_R">
			<img alt="" src="/koBus/transkey/images/q_p_enterkey_r.png" />
		</div>
		<div class="transkey_q_p_shiftKey" id="pwdCfmCheckq_p_shiftKey_L">
			<img alt="" src="/koBus/transkey/images/q_p_shiftkey_l.png" />
		</div>
		<div class="transkey_q_p_shiftKey" id="pwdCfmCheckq_p_shiftKey_R">
			<img alt="" src="/koBus/transkey/images/q_p_shiftkey_r.png" />
		</div>
		<div class="transkey_fakeMouse" id="pwdCfmCheck_fakeMouseDiv">
			<img alt="" id="fakeMouseImg" src="/koBus/transkey/images/fake.gif" />
		</div>
		<div class="transkey_osMouse" id="pwdCfmCheck_osMouseDiv">
			<img =""="" alt="" id="osMouseImg"
				src="/koBus/transkey/images/fake.gif" />
		</div>
		<div aria-label="기본마우스를 사용합니다." class="transkey_qwertySingleMouseType"
			id="pwdCfmCheck_singleMouseTypeDiv" role="button" tabindex="0">
			<img alt="" id="slngleMouseTypeImg"
				src="/koBus/transkey/images/single.png" />
		</div>
		<div aria-label="마우스를 가운데로 이동 또는 클릭해주세요."
			class="transkey_qwertyBlankOver" id="pwdCfmCheck_blankOverDiv"
			tabindex="0">
			<img alt="마우스이동" id="blankOverImg"
				src="/koBus/transkey/images/blank_over.gif" />
		</div>
		<div
			aria-label="멀티마우스를 사용합니다. 사용하시려면 키보드 클릭 후 마우스를 가운데로 이동 또는 클릭해주세요."
			class="transkey_qwertyMultiMouseType"
			id="pwdCfmCheck_multiMouseTypeDiv" role="button">
			<img alt="멀티마우스" id="multiMouseTypeImg"
				src="/koBus/transkey/images/multi.png" />
		</div>
		<div class="transkey_qwertyBlank" id="pwdCfmCheck_blankDiv">
			<img alt="TOUCH EN transkey" id="blankImg"
				src="/koBus/transkey/images/blank.png" />
		</div>
	</div> -->
</body>
</html>
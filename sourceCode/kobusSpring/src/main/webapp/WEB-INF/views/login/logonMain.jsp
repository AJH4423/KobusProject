<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<title>로그인 | 고속버스통합예매</title>
<!-- saved from url=(0045)https://www.kobus.co.kr/mbrs/lgn/loginMain.do -->

		<!-- breadcrumb -->
		<!-- 브레드크럼 -->
		<nav id="new-kor-breadcrumb">
			<div class="container"></div>
		</nav>
		<article id="new-kor-content">

			<!-- 20200617 yahan -->

			<div class="loading" id="loading" style="height: 691px; top: 180px;">
				<p class="load" style="margin-left: -53px;">
					<span class="sr-only">로딩중입니다</span>
				</p>
			</div>
			<div class="title_wrap joinT" style="display: none;">
				<a class="back" href="#">back</a> <a class="mo_toggle" href="#">메뉴</a>
				<h2>로그인</h2>
			</div>
			<!-- 타이틀 -->
			<div class="content-header" data-page-title="로그인 | 고속버스통합예매">
				<div class="container">
					<div class="title-area">
						<h2 class="page-title">로그인</h2>
					</div>
				</div>
			</div>
			<div class="content-body">
				<div class="container">
					<form action="/koBus/login" id="lgnUsrInfForm" method="POST" name="lgnUsrInfForm">
						<div class="login_wrap">
							<!-- 회원로그인 -->
							
							<div class="box_login">
								<h3 class="mob_h3">회원 로그인</h3>
								<p class="h3_desc">
									<span class="text_blue">고속버스 통합 예매 홈페이지</span>는 고속버스모바일앱의 회원
									아이디와 비밀번호로 이용이 가능합니다.
								</p>
								<div class="inner">
									<fieldset>
										<legend>회원로그인</legend>
										<ul class="loginList">
											<li>
												<div class="box_inputForm">
													<label class="label" for="usrId">아이디</label> <span
														class="box_label"> <input class="input" id="usrId"
														name="username" placeholder="아이디를 입력하세요" type="text" />
													</span>
												</div>
											</li>
											<li>
												<div class="box_inputForm">
													<label class="label" for="usrPwd">비밀번호</label> <span
														class="box_label"> <input class="input"
													 	id="usrPwd" name="password" placeholder="비밀번호를 입력하세요" tabindex="-1" type="password" />
													</span>
												</div>
											</li>
										</ul>
									</fieldset>
									<p class="btn_squareBox">
										<button class="btn_confirm ready" id="btn_confirm"
											type="submit">로그인</button>
									</p>
									<div class="box_searchId col2">
										<a href="/koBus/page/idSearch.do"><span
											class="ico_searchId">아이디찾기</span></a> <a
											href="/koBus/page/passwdSearch.do"><span
											class="ico_searchPW">비밀번호찾기</span></a>
									</div>
								</div>
							</div>							
							<div class="join_wrap">
								<p>
									<span>고속버스 통합회원으로 가입하시면 홈페이지와 모바일앱과의 예매내역 공유로 더욱 편리한
										고속버스 이용이 가능합니다.</span> <a class="btn_join"
										href="/koBus/page/joinMain.do">통합회원가입</a>
								</p>
							</div>				
						</div>
						<!-- <div class="bnr_app" >예매부터 탑승까지 원스탑 모바일 서비스! <strong>고속버스 모바일앱</strong></div> -->
						<!-- 광고 배너 추후 추가 예정 -->
						<div class="banner-group type-row-A" style="margin-top: 16px;">
							<iframe class="ad-frame" 
								title="프레임 (전화번호안심 로그인)"></iframe>
						</div>
						<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
					</form>
				</div>
			</div>
			
			<!-- 로그아웃시 띄워주는 알림창 -->
			<c:if test="${param.logout == 'ok'}">
				<script>
					alert("로그아웃이 완료되었습니다.");
				</script>
			</c:if>
			
			
			<!-- 로그인정보 입력 제대로 안했을때 알림띄워주기 -->
			<c:if test="${param.error == 'true'}">
				<script>
					alert("회원정보가 없습니다, 다시 로그인해 주세요.");
				</script>
			</c:if>
			<!-- 로그인 완료시 문구 띄우기 -->
			<%-- 
			<c:if test="${result == 1}">
				<script>
					alert(${auth} + "님 로그인 완료되었습니다");
				</script>
			</c:if> 
			--%>
			<script>
				$("#btn_confirm").on("click", function (event){
					let logonId = $("#usrId").val();
					let logonPasswd = $("#usrPwd").val();
					
					if (logonId=="" || logonPasswd=="") {
						alert("아이디와 비밀번호를 제대로 입력하세요");
						event.preventDefault();
					} 			
				});
			</script>

			<!-- 20200831 yahan -->

			<!-- 임시비밀번호 변경 -->
			<form name="lgnForm">
				<input id="returnUrl2" name="returnUrl" type="hidden" value="logout" />
			</form>
			<!-- 임시비밀번호/ 180일 경과 비밀번호 -->

			<!-- 190129 추가 - 휴면 회원 알림 안내 -->
			<!-- //190129 추가 - 휴면 회원 알림 안내 -->
			<!-- 190129 추가 - 휴면 회원 해제 -->
			<!-- //190129 추가 - 휴면 회원 해제 -->
			<!-- 휴면회원 -->
		</article>
		<!-- footer -->
		<!-- 푸터 -->
	
	</div>
	<div class="remodal-overlay remodal-is-closed" style="display: none;"></div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal pop_change_password remodal-is-initialized remodal-is-closed"
			data-remodal-id="popChangePassword"
			data-remodal-options="closeOnOutsideClick:false" role="dialog"
			tabindex="-1">
			<form id="pwdModLsapForm" method="post" name="pwdModLsapForm">
				<input id="mbr_mng_no" name="mbr_mng_no" type="hidden" value="" />
				<div class="title">비밀번호 변경</div>
				<div class="cont">
					<div id="oldPwdChgDiv" style="display: none;">
						<h3 class="pop_h3">고객님께서는 오랜 기간(180일) 비밀번호를 변경하지 않으셨습니다.</h3>
						<p class="desc">
							동일한 비밀번호를 장기간 사용할 경우 개인정보 도용 및 유출 등의 위험이 있습니다.<br /> 비밀번호를
							변경해주세요.
						</p>
					</div>
					<div id="tmpPwdChgDiv" style="display: none;">
						<h3 class="pop_h3">스스로 지키는 개인정보! 비밀번호를 변경해주세요.</h3>
						<p class="desc">
							현재 고객님께서는 <span class="txt_red">임시로 발급된 비밀번호</span>를 사용하고 계십니다.<br />
							고객님의 소중한 개인정보를 안전하게 지키기 위해 비밀번호를 변경해 주세요.<br />개인정보 도용을 최대한 방지하기
							위해 <span class="txt_red">비밀번호 변경절차</span>를 거치신 후에만 서비스 이용이 가능합니다.
						</p>
					</div>
					<p class="desc">
						<strong>[안전한 비밀번호 설정 방법] <span class="txt_red">영문,
								숫자 조합하여 8자리 이상</span></strong>
					</p>
					<div class="box_inputForm">
						<label class="label" for="usrOldPw">현재 비밀번호</label> <span
							class="box_label">
							<button class="transkey_btn" data-id="usrOldPw" type="button">가상키패드
								입력</button> <input class="input" data-tk-kbdtype="qwerty" id="usrOldPw"
							name="usrOldPw" placeholder="현재 비밀번호를 입력하세요" tabindex="-1"
							type="password" />
						</span> <span class="ico_complete" style="display: none;">가능</span>
						<!-- 사용가능 아이콘 -->
					</div> 
					<div class="box_inputForm" id="pwdDiv">
						<label class="label" for="usrNewPwd">새 비밀번호</label> <span
							class="box_label">
							<button class="transkey_btn" data-id="usrNewPwd" type="button">가상키패드
								입력</button> <input class="input" data-tk-kbdtype="qwerty" id="usrNewPwd"
							name="usrNewPwd" placeholder="영문,숫자 8자리 이상" tabindex="-1"
							type="password" />
						</span> <span class="ico_complete" style="display: none;">가능</span>
						<!-- 사용가능 아이콘 -->
					</div>
					<div class="box_inputForm" id="pwdCfmDiv">
						<label class="label" for="pwdCfmCheck">새 비밀번호 확인</label> <span
							class="box_label">
							<button class="transkey_btn" data-id="pwdCfmCheck" type="button">가상키패드
								입력</button> <input class="input" data-tk-kbdtype="qwerty"
							id="pwdCfmCheck" name="pwdCfmCheck" placeholder="새 비밀번호를 재입력하세요"
							tabindex="-1" type="password" />
						</span> <span class="ico_complete" style="display: none;">가능</span>
					</div>
					<ul>
						<li>비밀번호 변경 시 고속버스 모바일앱 에서도 동일하게 적용됩니다.</li>
					</ul>
					<p class="btn_squareBox" id="oldPwdChgP" style="display: none;">
						<button class="btn_confirm" type="button">변경하기</button>
						<button class="btn_normal" type="button">180일 뒤에 변경하기</button>
					</p>
					<p class="btn_squareBox" id="tmpPwdChgP" style="display: none;">
						<button class="btn_confirm" type="button">변경하기</button>
					</p>
					<div class="pop_banner_wrap">
						<span class="txt_banner">예매부터 탑승까지 원스탑 모바일 서비스!</span> <strong
							class="tit_ban">고속버스 모바일앱</strong> <span class="bg_ban mobileApp">고속버스
							모바일앱</span>
					</div>
				</div>
				<button class="remodal-close" data-remodal-action="close">
					<span class="sr-only">닫기</span>
				</button>
			</form>
		</div>
	</div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal pop_dormant_account remodal-is-initialized remodal-is-closed"
			data-remodal-id="popDormantMember"
			data-remodal-options="closeOnOutsideClick:false" role="dialog"
			tabindex="-1">
			<div class="title">
				휴면 회원 알림 안내
				<button aria-label="Close" class="remodal-close"
					data-remodal-action="close"></button>
			</div>
			<div class="cont">
				<p class="txt">정보통신망 이용 촉진 및 정보보호 등에 관한 법률 제29조 제2항의 개인정보 유효기간제에
					따라 장기간 동안 사용 이력이 없는 회원을 대상으로 휴면 정책이 적용 되고 있습니다.</p>
				<p class="txt">고객님께서는 1년 이상 접속하지 않으셨기 때문에 휴면 정책이 적용되어 서비스 이용이 불가
					합니다.</p>
				<p class="txt">하기 휴면 회원 해제 서비스를 통해 휴면 회원 해제를 진행하시기 바랍니다.</p>
			</div>
			<div class="btns">
				<button class="remodal-confirm">휴면 회원 해제하기</button>
				<button class="remodal-cancel">다음에 하기</button>
			</div>
		</div>
	</div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal pop_remove_dormant remodal-is-initialized remodal-is-closed"
			data-remodal-id="popRemoveDormant"
			data-remodal-options="closeOnOutsideClick:false" role="dialog"
			tabindex="-1">
			<div class="title type_blue">
				휴면 회원 해제
				<button aria-label="Close" class="remodal-close"
					data-remodal-action="close"></button>
			</div>
			<form method="post" name="dormantForm">
				<input id="mbrMngNo" name="mbrMngNo" type="hidden" value="" />
				<div class="cont">
					<div class="login_wrap pop">
						<div class="box_login">
							<p class="h3_desc">휴면 회원 해제를 위해 비밀번호를 입력하세요.</p>
							<div class="inner">
								<fieldset>
									<legend>휴면 회원 해제</legend>
									<ul class="loginList">
										<li>
											<div class="box_inputForm">
												<strong>비밀번호</strong> <span class="box_label"> <!-- <label for="s_ID02">영문,숫자 8자리 이상</label> -->
													<label for="pwd">영문,숫자 8자리 이상</label> <input class="input"
													id="pwd" name="pwd" type="password" />
												</span>
											</div>
										</li>
									</ul>
								</fieldset>
								<p class="btn_squareBox">
									<button class="btn_confirm" type="button">해제하기</button>
								</p>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
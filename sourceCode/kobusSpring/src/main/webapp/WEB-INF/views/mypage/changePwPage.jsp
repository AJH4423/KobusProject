<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <title>비밀번호 변경 | 마이페이지 | 고속버스통합예매</title>
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
		<!-- breadcrumb -->
		<!-- 브레드크럼 -->
		<nav id="new-kor-breadcrumb">
			<div class="container"></div>
		</nav>
		<article id="new-kor-content">

			<!-- 20200617 yahan -->

			<div class="loading" id="loading" style="height: 634px; top: 180px;">
				<p class="load" style="margin-left: -53px;">
					<span class="sr-only">로딩중입니다</span>
				</p>
			</div>
			<div class="title_wrap mypageT" style="display: none;">
				<a class="back"
					href="https://www.kobus.co.kr/mbrs/mbrspage/mbrsPwdMod.do#">back</a>
				<a class="mo_toggle"
					href="https://www.kobus.co.kr/mbrs/mbrspage/mbrsPwdMod.do#">메뉴</a>
				<h2>비밀번호 변경</h2>
			</div>
			<!-- 타이틀 -->
			<div class="content-header"
				data-page-title="비밀번호 변경 | 마이페이지 | 고속버스통합예매">
				<div class="container">
					<div class="title-area">
						<h2 class="page-title">비밀번호 변경</h2>
					</div>
				</div>
			</div>
			<div class="content-body">
				<div class="container">
					<form action="/koBus/changePw.do" method="post" name="pwdModLsapForm" id="pwdModLsapForm">
						<div class="noti_wrap taL">
							<p class="noti">
								안전한 고속버스 홈페이지 사용을 위하여 <br class="mobNone" />새로운 비밀번호로 교체하세요.
							</p>
						</div>
						<div class="border-box box_changeNum">
							<div class="inner">
								<div class="box_inputForm">
									<label class="label" for="usrOldPw">현재 비밀번호</label> <span
										class="box_label" style="display: flex; align-items: center;">
										<input class="input" data-tk-kbdtype="qwerty" id="usrOldPw"
										name="usrOldPw" placeholder="현재 비밀번호를 입력하세요"
										tabindex="-1" type="password" style="flex: 1;"/>
										<button type="button" class="btn_check" id="oldPwEqualCheck" style="margin-left: 8px;">확인</button>
									</span> <span class="ico_complete" style="display: none;">가능</span>
									<!-- 사용가능 아이콘 -->
								</div>
								<span class="noti_box" id="noti_box_OldpwOk" style="display: none;">확인이 완료되었습니다.</span>
								<span class="noti_box" id="noti_box_OldpwFail" style="display: none;">비밀번호가 일치하지 않습니다.</span>
								<div class="box_inputForm" id="pwdDiv">
									<label class="label" for="usrPwd">새 비밀번호</label> <span
										class="box_label">
										<input class="input" data-tk-kbdtype="qwerty" id="usrPwd"
										name="usrPwd" 
										placeholder="영문, 숫자 8자리 이상" tabindex="-1" type="password" />
									</span> <span class="ico_complete" style="display: none;">가능</span>
									<!-- 사용가능 아이콘 -->
								</div>
								<span class="noti_box" id="noti_box_pwEqualCheck" style="display: none;">현재 비밀번호와 같은 번호입니다, 다른번호로 입력하세요.</span>
								<span class="noti_box" id="noti_box_pwFail" style="display: none;">사용 불가한 비밀번호입니다.</span>
								<span class="noti_box" id="noti_box_pwOk" style="display: none;">사용가능한 비밀번호입니다.</span>
								<div class="box_inputForm" id="pwdCfmDiv">
									<label class="label" for="pwdCfmCheck">새 비밀번호 확인</label> <span
										class="box_label">
										<input class="input" data-tk-kbdtype="qwerty" id="pwdCfmCheck"
										name="pwdCfmCheck"
										placeholder="새 비밀번호를 재입력하세요" tabindex="-1" type="password" />
									</span>
									<!-- <a href="#none" class="ico_delete_gray">삭제</a> -->
									<!-- 삭제 아이콘 -->
									<span class="ico_complete" style="display: none;">가능</span>
								</div>
								<span class="noti_box" id="noti_box_rePwFail" style="display: none;">일치하지않습니다.</span>
								<span class="noti_box" id="noti_box_rePwOk" style="display: none;">비밀번호가 일치합니다.</span>
								<p class="bul mobNone marT10">비밀번호 변경 시 고속버스 모바일앱 에서도 동일하게
									적용됩니다.</p>
							</div>
						</div>
						<p class="btns col1">
							<a class="btnL btn_confirm ready"
								href="#" id="pwdChangeBtn">비밀번호 변경</a>
						</p>
						<p class="bul mobBlock marT10">비밀번호 변경 시 고속버스 모바일앱 에서도 동일하게
							적용됩니다.</p>
						<input id="hidfrmId" name="hidfrmId" type="hidden" value="" /><input
							id="transkeyUuid_" name="transkeyUuid_" type="hidden"
							value="7213f421c1becdd3a3d285a0d2067d48075420bb57df66425b706fc43161c347" /><input
							id="transkey_usrOldPw_" name="transkey_usrOldPw_" type="hidden"
							value="" /><input id="transkey_HM_usrOldPw_"
							name="transkey_HM_usrOldPw_" type="hidden" value="" /><input
							id="transkey_usrPwd_" name="transkey_usrPwd_" type="hidden"
							value="" /><input id="transkey_HM_usrPwd_"
							name="transkey_HM_usrPwd_" type="hidden" value="" /><input
							id="transkey_pwdCfmCheck_" name="transkey_pwdCfmCheck_"
							type="hidden" value="" /><input id="transkey_HM_pwdCfmCheck_"
							name="transkey_HM_pwdCfmCheck_" type="hidden" value="" />
							
							<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
							
					</form>
					<form name="lgnForm">
						<input id="returnUrl" name="returnUrl" type="hidden"
							value="logout" />
					</form>
				</div>
			</div>
		</article>
		
		<script>
			// 현재비밀번호 새비밀번호 같은지 확인
			// 현재비밀번호 입력 잘했는지 확인
			
			let isValidUserOldPasswd = false; // 현재 비밀번호 제대로 입력했는지
			let isValidUserPasswd = false; // 비밀번호 제대로 입력했는지
			let isValidUserCheckPasswd = false; // 비밀번호 재입력 제대로 했는지
			
			// 현재비밀번호 잘 입력했는지 확인 ajax
			$("#oldPwEqualCheck").on("click", function (){
				let inputPw = $("#usrOldPw").val();
				let url = `/koBus/oldPwCheckOk.do?checkPw=\${inputPw}`;
				console.log("ajax url : " + url);
				$.ajax({
					url:url,
					type:"GET",
					cache:false,
					dataType:"text",
					success : function (data){
						if (data === "success") {
							console.log("비밀번호 일치");
							alert("확인이 완료되었습니다.")
							$("#noti_box_OldpwOk").show();
							setTimeout(function() {
							    $("#noti_box_OldpwOk").hide();
							}, 2000);
							isValidUserOldPasswd = true;
						} else {
							console.log("비밀번호 불일치");
							alert("비밀번호가 일치하지 않습니다.");
							$("#noti_box_OldpwFail").show();
							setTimeout(function() {
							    $("#noti_box_OldpwFail").hide();
							}, 2000);
							isValidUserOldPasswd = false;
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
				} else if(checkPw === $("#usrOldPw").val()){
					$("#noti_box_pwEqualCheck").show();
					setTimeout(function() {
					    $("#noti_box_pwEqualCheck").hide();
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
			
			// 현재 비밀번호 일치확인 + 새비밀번호, 재입력 확인 완료 후 update
			$("#pwdChangeBtn").on("click", function(event){
				if (
						isValidUserOldPasswd === true &&
						isValidUserPasswd === true &&
						isValidUserCheckPasswd === true
				) {
					event.preventDefault();
					alert("비밀번호 변경이 완료되었습니다.");
					$("#pwdModLsapForm").submit();
				} else {
					event.preventDefault();
					alert("제대로 입력하세요");
				}
			});
		</script>


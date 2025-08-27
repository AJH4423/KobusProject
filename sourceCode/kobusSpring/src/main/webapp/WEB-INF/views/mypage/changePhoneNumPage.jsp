<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <title>휴대폰번호 변경 | 마이페이지 | 고속버스통합예매</title>
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
		<!-- breadcrumb -->
		<!-- 브레드크럼 -->
		<nav id="new-kor-breadcrumb">
			<div class="container"></div>
		</nav>
		<article id="new-kor-content">

			<!-- 20200617 yahan -->


			<div class="loading" style="height: 582px; top: 180px;">
				<p class="load" style="margin-left: -53px;"></p>
			</div>
			<div class="title_wrap mypageT" style="display: none;">
				<a class="back"
					href="https://www.kobus.co.kr/mbrs/mbrspage/mbrsHpMod.do#">back</a>
				<a class="mo_toggle"
					href="https://www.kobus.co.kr/mbrs/mbrspage/mbrsHpMod.do#">메뉴</a>
				<h2>휴대폰번호 변경</h2>
			</div>
			<!-- 타이틀 -->
			<div class="content-header"
				data-page-title="휴대폰번호 변경 | 마이페이지 | 고속버스통합예매">
				<div class="container">
					<div class="title-area">
						<h2 class="page-title">휴대폰번호 변경</h2>
					</div>
				</div>
			</div>
			<div class="content-body">
				<div class="container">
					<div class="noti_wrap taL">
						<p class="noti">현재 사이트에 등록된 비밀번호와 변경하실 새로운 휴대폰 번호를 입력하세요.</p>
					</div>
					<form action="/koBus/changePhoneNum.do" method="post" name="askAuthNoForm" id="askAuthNoForm">
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
								<div class="box_inputForm">
									<label class="label" for="usrHp">휴대폰번호</label> <span
										class="box_label"> <input class="input" id="usrHp"
										name="usrHp" 
										placeholder="휴대폰번호를 입력하세요" type="text" />
									</span>
								</div>
								<span class="noti_box" id="noti_box_newPhoneNumOk" style="display: none;">사용이 가능한 번호입니다.</span>
								<span class="noti_box" id="noti_box_newPhoneNumFail" style="display: none;">올바른 번호형식으로 입력해주세요.</span>
								<p class="bul mobNone marT10">휴대폰번호 변경 시 고속버스 티머니 앱 에서도 동일하게
									적용됩니다.</p>
							</div>
						</div>
						<p class="btns col1">
							<a class="btnL btn_confirm ready"
								href="#" id="btn_confirm">비밀번호 변경</a>
						</p>
						<!-- 			</form> -->
						<p class="bul mobBlock marT10">휴대폰번호 변경 시 고속버스 티머니 앱 에서도 동일하게
							적용됩니다.</p>
						<!-- 인증번호 발송 후 -->
						<!-- <div class="marT30" id="AuthNoFormId" style="display:none;">
												<form name="frmAuthNoForm" method="post" onsubmit="return false;">
													<input type="hidden" name="usrPwd" id="usrPwd" class="input">
							<div class="border-box box_changeNum">
								<div class="inner">
									<div class="box_inputForm">
										<label class="label" for="aouNo">인증번호</label> <span
											class="box_label"> <input class="input" id="aouNo"
											name="aouNo" onchange="fnHpAouBtn();"
											onkeyup="this.value = onlyNumPlus(this.value);fnHpAouBtn();"
											placeholder="인증번호를 입력하세요" type="text" /> <input class="input"
											id="s_ID03" name="usrNewHp" type="hidden" value="" />
										</span>
									</div>
									<div class="box_limit">
										<span class="txt_limit" id="countDown"></span> <input
											name="countDownHidden" type="hidden" />
										<button class="btnS btn_normal white mobNone"
											name="reAskAuthNo" onclick="javascript:askAuthNoReSend();"
											type="button">인증번호 재발송</button>
									</div>
								</div>
							</div>
							<p class="btns col1">
								<a class="btnL btn_confirm ready mobBlock"
									href="javascript:void(0)"
									onclick="javascript:askAuthNoReSend();">인증번호 재발송</a> <a
									class="btnL btn_confirm ready"
									href="javascript:askAuthNoCheck();" id="confirmBtn">확인</a>
							</p>
												</form>
						</div>
						//인증번호 발송 후
						<input id="hidfrmId" name="hidfrmId" type="hidden" value="" /><input
							id="transkeyUuid_" name="transkeyUuid_" type="hidden"
							value="191ebc53a00ad4552dae388ec3bc500c1b41920c95097ac92f8e6034b902ae9c" /><input
							id="transkey_usrPwd_" name="transkey_usrPwd_" type="hidden"
							value="" /><input id="transkey_HM_usrPwd_"
							name="transkey_HM_usrPwd_" type="hidden" value="" /> -->
							
							<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
							
					</form>
				</div>
			</div>
		</article>
		
		<script>
		
			let isValidUserOldPasswd = false;
			let isValidUserNewPhoneNum = false;
			
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
			
			// 휴대폰번호 유효성검사 완료하면 true로 변환
			$("#usrHp").on("propertychange change keyup paste input", function(){
				let inputPhoneNum = $("#usrHp").val();
				var regExp = /^01[0|1|6|7|8|9]-?\d{3,4}-?\d{4}$/; 
				
				if (!regExp.test(inputPhoneNum)) {
					$("#noti_box_newPhoneNumOk").hide();
					$("#noti_box_newPhoneNumFail").show();
					isValidUserNewPhoneNum = false;
				} else {
					$("#noti_box_newPhoneNumFail").hide();
					$("#noti_box_newPhoneNumOk").show();
					isValidUserNewPhoneNum = true;
				}	
			});
			
			// 비밀번호 변경 누르면(잘 입력했는지 확인하는 boolean형 변수 2개 전부 true일시) db에서 번호바꿔주기
			$("#btn_confirm").on("click", function(event){
				event.preventDefault();
				if (
						isValidUserOldPasswd == true&&
						isValidUserNewPhoneNum == true
				) {
					alert("번호변경이 완료되었습니다.");
					$("#askAuthNoForm").submit();
				} else {
					alert("입력값을 확인해주세요.");
				}
			})
		</script>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<title>회원가입(본인인증) | 고속버스통합예매</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
		<!-- breadcrumb -->
		<!-- 브레드크럼 -->
		<nav id="new-kor-breadcrumb">
			<div class="container"></div>
		</nav>
		<article id="new-kor-content">

			<div class="loading" style="height: 623px; top: 180px;">
				<p class="load" style="margin-left: -53px;"></p>
			</div>
			<div class="title_wrap in_process joinT" style="display: none;">
				<a class="back" href="#">back</a> <a class="mo_toggle" href="#">메뉴</a>
				<h2>회원가입</h2>
				<ol class="process step04">
					<li>약관동의</li>
					<li class="active">본인인증</li>
					<li>정보입력</li>
					<li class="last">가입완료</li>
				</ol>
			</div>
			<!-- 타이틀 -->
			<div class="content-header" data-page-title="회원가입(본인인증) | 고속버스통합예매">
				<div class="container">
					<div class="title-area">
						<h2 class="page-title">회원가입</h2>
						<ol class="process">
							<li><span class="num">1</span> 약관동의</li>
							<li class="active" title="현재 단계"><span class="num">2</span>
								본인인증</li>
							<li><span class="num">3</span> 정보입력</li>
							<li><span class="num">4</span> 가입완료</li>
						</ol>
					</div>
				</div>
			</div>
			<div class="content-body">
				<div class="container">
					<div class="noti_wrap taL">
						<p class="noti">본인인증을 위한 휴대폰번호를 입력해주세요.</p>
					</div>
					<form method="get" name="askAuthNoForm">
						<div class="border-box box_changeNum">
							<div class="inner">
								<div class="box_inputForm">
									<label class="label" for="usrHp">휴대폰번호</label> <span
										class="box_label"> <input class="input" id="usrHp"
										name="usrHp" placeholder="휴대폰번호를 입력하세요" type="text" />
									</span>		
								</div>
							</div>
						</div>
						<p class="btns col1">
							<button type="submit" id="submitBtn"><a class="btnL btn_confirm ready" href="" id="btn_confirm">인증번호 발송</a></button>						
							<!-- ready class 있음 -->
						</p>
						<br>
						<div>
							<p id="alert" style="text-align: center;"></p>
						</div>
					</form>
				
					<!-- 인증번호 발송 후 -->
					<div id="AuthNoFormId" style="display: none;">
						<div class="border-box box_changeNum marT30">
							<form method="post" name="frmAuthNoForm">
								<div class="inner">
									<div class="box_inputForm">
										<label class="label" for="aouNo">인증번호</label> <span
											class="box_label"> <input class="input" id="aouNo"
											name="aouNo" placeholder="인증번호를 입력하세요" type="text" /> <input
											class="input" id="s_ID03" name="usrNewHp" type="hidden" />
										</span>
									</div>
									<div class="box_limit">
										<span class="txt_limit" id="countDown"></span>
										<button class="btnS btn_normal white mobNone" name="reHpAouNo"
											type="button">인증번호 재발송</button>
									</div>
								</div>
							</form>
						</div>
						<p class="btns col1">
							<a class="btnL btn_confirm ready mobBlock" href="#">인증번호 재발송</a>
							<a class="btnL btn_confirm ready" href="#" id="confirmBtn">확인</a>
							<p id="numCheck" style="text-align: center;"></p>
							<!-- ready class 있음 -->
						</p>
					</div>
					
					<!-- 인증번호 발송 버튼 누르면 숨어있는 인증번호 입력하는 div태그 나오기 -->
					<!-- 전화번호 유효성 검사 완료후 인증번호 발송 누르면, 입력받은 휴대폰에 인증번호 보내기 -->
					<script>
						let CertificationOkCode = "";
						let inputPhoneNum="";
						let phoneNum="";
						$("#submitBtn").on("click", function (e){
							e.preventDefault(); // a링크 태그 새로고침 방지
							
							inputPhoneNum = $("#usrHp").val();
							phoneNum = inputPhoneNum.trim();
							console.log("입력번호: " + phoneNum);
							// 전화번호 유효성 검사 : '-' 없이 입력'
							var regExp = /^01[0|1|6|7|8|9]-?\d{3,4}-?\d{4}$/; 
							if (!regExp.test(inputPhoneNum)) {
								$("#alert").text("올바른 전화번호를 입력해 주세요").css("color", "red");
							}else{
								let url = `/koBus/telCertificationNum.do?phoneNum=\${phoneNum}`;
								$.ajax({
									url: url,
									type:"GET",
									cache:false,
									dataType:"text",
									success : function (data){
										if (data == "error") {
											console.log("값을 제대로 가져오지 못하였습니다.");
										} else {
											console.log("success!!");
											$("#alert").hide();
											$("#AuthNoFormId").show(); 
											CertificationOkCode = data;
										}	
									}	
								});
								console.log("인증번호: " + CertificationOkCode);
							}
						});
						
						// 확인버튼 눌렀을때 함수
						$("#confirmBtn").on("click", function (event){
							event.preventDefault(); // a링크 새로고침 방지
							console.log("다음페이지에 넘겨줄 입력번호 : " + phoneNum);
							
							// 확인버튼을 눌렀을때 휴대폰으로 전송한 인증번호와 입력한 인증번호가 맞는지 확인하는 코딩작성.....
							if($("#aouNo").val().length <= 0){
								alert("인증번호를 입력해 주세요");
								event.preventDefault();
							}
							else if($("#aouNo").val() === CertificationOkCode){
								alert("확인이 완료되었습니다.")
								location.href = `/koBus/page/joinEnterInfo.do?phoneNum=\${phoneNum}`;
							}
							else{
								alert("인증번호가 일치하지 않습니다. 확인해주시기 바랍니다.");
								event.preventDefault();
							}
						});
					</script>
					
					<!-- //인증번호 발송 후 -->
					<form name="hpAouIdForm">
						<input class="input" id="hpAouId" name="hpAouId" type="hidden"
							value="" />
					</form>
				</div>
			</div>
		</article>
	<div class="remodal-overlay remodal-is-closed" style="display: none;"></div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div class="remodal remodal-is-initialized remodal-is-closed"
			data-remodal-id="popConfirm"
			data-remodal-options="closeOnOutsideClick: false" role="dialog"
			tabindex="-1">
			<div class="cont">
				<p class="txt">
					<span class="accent">알림</span><br />
				</p>
			</div>
			<div class="btns">
				<!-- 버튼이 1개일경우 class="col1" 추가 -->
				<button class="remodal-confirm" data-remodal-action="confirm"
					type="button">로그인</button>
				<button class="remodal-confirm" data-remodal-action="confirm"
					type="button">신규회원가입</button>
			</div>
			<button class="remodal-close" data-remodal-action="close"
				type="button">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
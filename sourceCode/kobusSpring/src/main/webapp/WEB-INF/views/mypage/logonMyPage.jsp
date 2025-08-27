<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String reservationCount = request.getParameter("reservationCount");
	String couponCount = request.getParameter("couponCount");
	String tel = request.getParameter("tel");
%>
<title>마이페이지 | 고속버스통합예매</title>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<style>
	.myPage_list li .btnBox a {
		color: black;
	}
</style>
		<!-- breadcrumb -->
		<!-- 브레드크럼 -->
		<nav id="new-kor-breadcrumb">
			<div class="container"></div>
		</nav>
		<article id="new-kor-content">

			<!-- 20200617 yahan -->
			<div class="loading" id="loading" style="height: 587px; top: 180px;">
				<p class="load" style="margin-left: -53px;">
					<span class="sr-only">로딩중입니다</span>
				</p>
			</div>
			<div class="title_wrap mypage_title" style="display: none;">
				<a class="back"
					href="https://www.kobus.co.kr/mbrs/mbrspage/myPageMain.do#">back</a>
				<a class="mo_toggle"
					href="https://www.kobus.co.kr/mbrs/mbrspage/myPageMain.do#">메뉴</a>
				<h2>마이페이지</h2>
			</div>
			<!-- 타이틀 -->
			<div class="content-header" data-page-title="마이페이지 | 고속버스통합예매">
				<div class="container">
					<div class="title-area">
						<h2 class="page-title">마이페이지</h2>
					</div>
				</div>
			</div>
			<div class="content-body">
				<div class="container">
					<div class="mypage_inner">
						<ul class="myPage_list">
							<li class="history">
								<div class="row">
									<a class="txt_myMenu" href="/koBus/manageReservations.do"> <span>나의
											예매내역</span> <strong id="mrsCfmPT">${reservationCount}건</strong></a> 
								</div>
								<div class="btnBox">
									<a class="btn btn_sm_link_white" href="/koBus/manageReservations.do">예매확인/변경/취소</a>
								</div>
							</li>
							<li class="additional">
								<div class="row">
									<a class="txt_myMenu" href="/koBus/page/itemPurListPage.do"> <span>프리패스/정기권</span><strong
										id="adtnPrdPT">${couponCount}개</strong></a> 
								</div>
								<div class="btnBox">
									<a class="btn btn_sm_link_white" href="/koBus/page/itemPurListPage.do">구매내역
										확인</a>
								</div>
							</li>
							<li class="mileage">
								<div class="row">
									<a class="txt_myMenu" href="#"> <span>프리미엄
											마일리지<span class="ico_mileage">왕관</span>
									</span> <strong> </strong></a>
								</div>
								<div class="btnBox">
									<a class="btn btn_sm_link_white" href="#">프리미엄
										마일리지 조회</a>
								</div>
							</li>
							<li class="payment">
								<div class="row">
									<!-- <a href="javascript:PayMentPT();" class="txt_myMenu"> <span>최근 결제금액</span> <strong id="PayMentPT">원</strong></a> -->
									<a class="txt_myMenu" href="#"> <span>결제내역</span><strong> </strong></a>
								</div>
								<div class="btnBox">
									<a class="btn btn_sm_link_white" href="#">결제내역
										조회</a>
								</div>
							</li>
						</ul>
					</div>
					<!-- 나의 계정정보 -->
					<div class="myAccount">
						<ul>
							<li><strong>계정정보</strong> <span class="detail"
								id="mbrsEmail">${auth} </span>
								<div class="btnBox">
									<a class="btn btn_sm_link_blue" href="/koBus/page/changePwPage.do">비밀번호
										변경</a> <a class="btn btn_sm_link_blue btn_pop_focus"
										id="memberExit" href="#">회원탈퇴</a>
								</div></li>
							<li><strong>휴대폰번호</strong> <span class="detail" id="mbrsHp">${tel}</span>
								<div class="btnBox">
									<a class="btn btn_sm_link_blue" href="/koBus/page/changePhoneNumPage.do">휴대폰번호
										변경</a>
								</div></li>
						</ul>
					</div>
					<!-- //나의 계정정보 -->
				</div>
			</div>
		</article>
	<script>
		// 회원탈퇴 느르면 모달창 띄워주기
		  $("#memberExit").on("click", function(){
		    $("#overRemodal, #wrapRemodal")
		      .removeClass("remodal-is-closed")
		      .addClass("remodal-is-opened")
		      .css("display", "block");
		  });
	</script>	
	<div id="overRemodal" class="remodal-overlay remodal-is-closed" style="display: none;"></div>
	<div id="wrapRemodal" class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal pop_withdrawal remodal-is-initialized remodal-is-closed"
			data-remodal-id="popConfirm" role="dialog" tabindex="-1">
			<form action="/koBus/deleteUsr.do" method="post" name="scsnForm" id="scsnForm">
				<div class="cont">
					<p class="txt">
						<span class="accent">알림</span><br />
						<br />탈퇴하시려면 사이트에 등록된 비밀번호를 입력하신 후, <br />회원탈퇴 버튼을 클릭해주세요. <br />탈퇴하시면
						모든 데이터가 삭제됩니다.<br />고속버스 통합 회원을 탈퇴하시겠습니까?
					</p>
					<div class="border-box box_withdrawal">
						<div class="inner">
							<div class="box_inputForm">
								<label class="label" for="usrPw">비밀번호</label> <span
									class="box_label" style="display: flex; align-items: center;">
										<input class="input" data-tk-kbdtype="qwerty" id="usrPw"
										name="usrPw" placeholder="현재 비밀번호를 입력하세요"
										tabindex="-1" type="password" style="flex: 1;"/>
										<button type="button" class="btn_check" id="pwEqualCheck" style="margin-left: 8px;">확인</button>
								</span>
							</div>
							<span class="noti_box" id="noti_box_pwOk" style="display:none;">확인이 완료되었습니다.</span>
							<span class="noti_box" id="noti_box_pwFail" style="display: none;">비밀번호가 일치하지 않습니다.</span>
						</div>
					</div>
				</div>
				
				<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
				
			</form>
			<div class="btns">
				<!-- 버튼이 1개일경우 class="col1" 추가 -->
				<button class="remodal-cancel" data-remodal-action="cancel" id="memberExitCancel"
					type="button">취소</button>
				<button class="remodal-confirm" type="button" id="usrDeleteBtn">회원탈퇴</button>
			</div>
			<button class="remodal-close btn-gray" data-remodal-action="close"
				type="button">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
	<script>
	
	let isValidUserPasswd = false;
	
	// 현재비밀번호 잘 입력했는지 확인 ajax 
	$("#pwEqualCheck").on("click", function (){
		let inputPw = $("#usrPw").val();
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
					$("#noti_box_pwOk").show();
					setTimeout(function() {
					    $("#noti_box_pwOk").hide();
					}, 2000);
					isValidUserPasswd = true;
				} else {
					console.log("비밀번호 불일치");
					alert("비밀번호가 일치하지 않습니다.");
					$("#noti_box_pwFail").show();
					setTimeout(function() {
					    $("#noti_box_pwFail").hide();
					}, 2000);
					isValidUserPasswd = false;
				}	
			},
		error : function(){
			alert("AJAX 오류발생");
		}
		});
	});
	
	// 회원탈퇴 버튼누르기
	$("#usrDeleteBtn").on("click", function(event){
		event.preventDefault();
		if (isValidUserPasswd === true) {
			alert("회원탈퇴가 완료되었습니다.");
			$("#scsnForm").submit();
		} else {
			alert("비밀번호 확인을 다시 해주세요.");
		}
	});
	</script>
	<script>
		// 회원탈퇴의 취소버튼
		$("#memberExitCancel").on("click", function(){
			$(".remodal-overlay, .remodal-wrapper")
			  .removeClass("remodal-is-opened")
			  .addClass("remodal-is-closed")
			  .css("display", "none");
		})
	</script>
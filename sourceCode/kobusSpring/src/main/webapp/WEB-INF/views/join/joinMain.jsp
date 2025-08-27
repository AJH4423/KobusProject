<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<title>회원가입(약관동의) | 고속버스통합예매</title>
		<!-- breadcrumb -->
		<!-- 브레드크럼 -->
		<nav id="new-kor-breadcrumb">
			<div class="container"></div>
		</nav>
		<article id="new-kor-content">

			<div class="title_wrap in_process joinT" style="display: none;">
				<a class="back" href="#">back</a> <a class="mo_toggle" href="#">메뉴</a>
				<h2>회원가입</h2>
				<ol class="process step04">
					<li class="active">약관동의</li>
					<li>본인인증</li>
					<li>정보입력</li>
					<li class="last">가입완료</li>
				</ol>
			</div>
			<!-- 타이틀 -->
			<div class="content-header" data-page-title="회원가입(약관동의) | 고속버스통합예매">
				<div class="container">
					<div class="title-area">
						<h2 class="page-title">회원가입</h2>
						<ol class="process">
							<li class="active" title="현재 단계"><span class="num">1</span>
								약관동의</li>
							<li><span class="num">2</span> 본인인증</li>
							<li><span class="num">3</span> 정보입력</li>
							<li><span class="num">4</span> 가입완료</li>
						</ol>
					</div>
				</div>
			</div>
			<div class="content-body page_payment">
				<div class="container">
					<div class="noti_wrap taL">
						<p class="noti">
							고속버스 통합 예매 홈페이지에서 제공하는 다양한 서비스를 이용하기 위하여 <span class="pc_block">고객님의
								동의가 필요합니다.</span>
						</p>
						<p class="noti">
							<span style="color: red">본 서비스는 만 14세 이상만 이용이 가능하며,</span> 서비스 이용
							전 아래 사항을 <span class="pc_block">확인하시고 동의하여 주시기 바랍니다.</span>
						</p>
					</div>
					<div class="section">
						<div class="agreement_wrap">
							<div class="agreement_tit">
								<h4 class="first">
									개인정보 수집 및 이용동의<span class="txt_essential">(필수)</span>
								</h4>
							</div>
							<div class="scroll-wrapper agreement_cont scrollbar-inner"
								style="position: relative;">
								<div
									class="agreement_cont scrollbar-inner scroll-content scroll-scrolly_visible"
									style="height: auto; margin-bottom: 0px; margin-right: 0px; max-height: 118px;">
									<iframe frameborder="0" height="187" scrolling="no"
										
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
										<div class="scroll-bar" style="height: 66px; top: 0px;"></div>
									</div>
								</div>
							</div>
							<span class="custom_check chk_blue"> <input id="agree1"
								type="checkbox" /> <label for="agree1">동의</label>
							</span>
						</div>
						<div class="agreement_wrap">
							<div class="agreement_tit">
								<h4>
									서비스 이용약관 동의<span class="txt_essential">(필수)</span>
								</h4>
							</div>
							<div class="scroll-wrapper agreement_cont scrollbar-inner"
								style="position: relative;">
								<div
									class="agreement_cont scrollbar-inner scroll-content scroll-scrolly_visible"
									style="height: auto; margin-bottom: 0px; margin-right: 0px; max-height: 118px;">
									<iframe frameborder="0" height="2387" scrolling="no"
										title="서비스 이용약관 동의"
										width="100%"></iframe>
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
										<div class="scroll-bar" style="height: 5px; top: 0px;"></div>
									</div>
								</div>
							</div>
							<span class="custom_check chk_blue"> <input id="agree2"
								type="checkbox" /> <label for="agree2">동의</label>
							</span>
						</div>
						<p class="agree_all chk_bor">
							<span class="custom_check chk_purple"> <input
								id="checkAll" type="checkbox" /> <label for="checkAll">전체
									약관에 동의합니다.</label>
							</span>
						</p>
					</div>
					<p class="btns col2">
						<a class="btnL btn_confirm ready" id="dontAgree" href="/koBus/main.do;">동의하지않음</a> 
						<a class="btnL btn_confirm" id="finalAgree">동의함</a>
					</p>
				</div>
			</div>
		</article>
		<!-- footer -->
		
		<script>
			// [js]
			// agree1,2 누르면 체크버튼 생기게하기
			/*
			const ckbAll = document.querySelector("input[id=checkAll]");
			const ckbs = document.querySelectorAll(".section input[id^=agree]");
			
			ckbAll.onclick = function (){
				// console.log("all check");
				for (var i = 0; i < ckbs.length; i++) {
					ckbs[i].checked = this.checked;
				} // for
			}
			
			for (var i = 0; i < ckbs.length; i++) {
				ckbs[i].onclick = function (){
					let isckbsAllChecked = true;
					for (var i = 0; i < ckbs.length; i++) {
						isckbsAllChecked = ckbs[i].checked;
						if(!isckbsAllChecked) break;
					} // for
				}
			} // for
			*/
			// [jquery] - 동의하지 않음
			$("#dontAgree").on("click", function (event){
				alert("모두 동의를해야 회원가입이 가능합니다.");
				event.preventDefault();
			});
			
			// [jquery] - 동의함
			let wholeCkbs = $(":checkbox:not(#checkAll)").length;
			
			$("#checkAll").on("click", function() {
				$(":checkbox:not(#checkAll)").prop("checked", $(this).prop("checked"));
			});

			$(":checkbox:not(#checkAll)").on("click", function() {
				let ckbs = $(":checkbox:not(#checkAll):checked").length;
				console.log(ckbs);
				$("#checkAll").prop("checked", ckbs == wholeCkbs ? true : false);
			});
			
			$("#finalAgree").on("click", function (event){
				let ckbs = $(":checkbox:not(#checkAll):checked").length;
				if (wholeCkbs != ckbs) {
					alert("모두 동의해 주세요!");
					event.preventDefault();
				} else {
					alert("동의가 완료되었습니다.");
					location.href = "/koBus/page/joinVerification.do";
				}
			});
			
		</script>

	<div
		style="left: -1000px; overflow: scroll; position: absolute; top: -1000px; border: none; box-sizing: content-box; height: 200px; margin: 0px; padding: 0px; width: 200px;">
		<div
			style="border: none; box-sizing: content-box; height: 200px; margin: 0px; padding: 0px; width: 200px;"></div>
	</div>

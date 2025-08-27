<%@page import="java.util.List"%>
<%@ page trimDirectiveWhitespaces="true" language="java"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!-- 뒤로가기 눌렀을때 로그인 풀리는거 방지 : 캐시 무효화 코드, 모든 jsp파일에 추가해야함 -->
<%
String auth = (String) session.getAttribute("auth");
/* List<String> rolename = (List<String>) session.getAttribute("rolename"); */ 
%>
<%
response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
response.setHeader("Pragma", "no-cache"); // HTTP 1.0
response.setDateHeader("Expires", 0); // Proxies
%>

<!-- [리뉴얼] 페이지 개별 스크립트 신규 정의함 -->

<!-- [리뉴얼] 스킵 네비게이션 신규 정의 -->
<div class="pop_dimmed" style="display: none;"></div>
<div class="noti_pop_wrap" style="display: block;"></div>
<nav id="skip">
	<ul>
		<li><a href="#new-kor-content">본문 바로가기</a></li>
		<li><a href="#new-kor-gnb">주메뉴 바로가기</a></li>
		<li><a href="#new-kor-footer">푸터 바로가기</a></li>
	</ul>
</nav>

<!-- 메인 클래스 : wrapper-main -->
<div class="wrapper wrapper-kor wrapper-main full">


	<!-- header -->

	<script>
		$(document).ready(function() {
			var langCd = 'KO';
			var langLi = $(".dropdown-wrap.lang-select .dropdown-list li");

			$('.title_wrap').hide();
		});
	</script>

	<!-- 헤더 -->
	<header id="new-kor-header">
		<div class="top-menu-area">
			<div class="container">
				<h1 id="logo">
					<a href="${pageContext.request.contextPath}/main.do"> <img src="${pageContext.request.contextPath}/resources/images/logo.png"
						alt="KOBUS 전국고속버스운송사업조합">
					</a>
				</h1>
				<nav class="util-menus">
					<ul class="util-list">
					
						<c:choose>
							<c:when test="${empty auth}">
								<li><a class="login" href="${pageContext.request.contextPath}/page/logonMain.do">로그인</a></li>
								<li><a href="${pageContext.request.contextPath}/page/joinMain.do">회원가입</a></li>
								<li><a href="${pageContext.request.contextPath}/page/logonMyPage.do">마이페이지</a></li>
								<li><a href="#">결제내역조회</a></li>
								<li><a href="#">사이트맵</a></li>
							</c:when>
							<c:when test="${fn:contains(rolename, 'ROLE_ADMIN')}">
								<li>${auth}님, 환영합니다 |</li>
								<li>
									<form id="logoutForm" action="${pageContext.request.contextPath}/logOut.do" method="post" style="display:inline;">
										<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
										 <a href="#" onclick="document.getElementById('logoutForm').submit(); return false;">로그아웃</a>
									</form>
								</li>
								<li><a href="${pageContext.request.contextPath}/adminPage.do">관리자페이지</a></li>
								<li><a href="${pageContext.request.contextPath}/main.do">메인페이지</a></li>
							</c:when>
							<c:otherwise>
								<li>${auth}|</li> 
								<li>
								  <form id="logoutForm" action="${pageContext.request.contextPath}/logOut.do" method="post" style="display:inline;">
								      <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
								      <a href="#" onclick="document.getElementById('logoutForm').submit(); return false;">로그아웃</a>
								  </form>
								</li>
								<li><a href="${pageContext.request.contextPath}/page/logonMyPage.do">마이페이지</a></li>
								<li><a href="#">결제내역조회</a></li>
								<li><a href="#">사이트맵</a></li>
							</c:otherwise>
						</c:choose>
					</ul>

					<div class="dropdown-wrap lang-select">
						<a href="javascript:void(0)" class="btn-dropdown" title="언어선택"
							aria-expanded="false"> <span class="text">한국어</span><i
							class="ico ico-arrow-down"></i></a>
						<ul class="dropdown-list" style="display: none;">
							<li class="selected"><a href="javascript:void(0)"
								data-lang="KO" title="선택됨">한국어</a></li>
							<li><a href="javascript:void(0)" data-lang="EN">English</a></li>
							<li><a href="javascript:void(0)" data-lang="CN">中文</a></li>
							<li><a href="javascript:void(0)" data-lang="JP">日本語</a></li>
						</ul>
					</div>
				</nav>
			</div>
		</div>
		<nav class="gnb-menu-area">
			<div class="container">
				<div class="gnb-area">
					<ul id="new-kor-gnb">
						<li><a href="${pageContext.request.contextPath}/region.do">고속버스예매</a>
							<ul>
								<li><a href="${pageContext.request.contextPath}/region.do">고속버스 예매</a></li>
								<li><a href="${pageContext.request.contextPath}/manageReservations.do">예매확인/취소/변경</a></li>
								<li><a href="#">영수증발행</a></li>
							</ul></li>
						<li><a href="#">운행정보</a>
							<ul>
								<li><a href="${pageContext.request.contextPath}/kobusSchedule.do">시간표 조회</a></li>
								<li><a href="#">도착시간 안내</a></li>
							</ul></li>


						<li><a href="${pageContext.request.contextPath}/pageForward.do?page=freePass">프리패스/정기권</a>
							<ul>
								<li><a href="${pageContext.request.contextPath}/pageForward.do?page=freePass">프리패스 여행권</a></li>
								<li><a href="${pageContext.request.contextPath}/pageForward.do?page=seasonTicket">정기권</a></li>
								<li><a href="${pageContext.request.contextPath}/page/itemPurListPage.do">상품 구매내역</a></li>
							</ul></li>


						<li><a href="javascript:void(0)">이용안내</a>
							<ul>
								<li><a href="javascript:void(0);">예매 안내</a></li>
								<li><a href="javascript:void(0);">결제수단 안내</a></li>
								<li><a href="javascript:void(0);">승차권 환불안내</a></li>
								<li><a href="javascript:void(0);">프리미엄 마일리지</a></li>

								<li><a href="/ugd/trtrgd/Trtrgd.do">휴게소 환승안내</a></li>
								<li><a href="/ugd/trmlgd/Trmlgd.do">고속버스 터미널</a></li>
								<li><a href="/ugd/cacmgd/Cacmgd.do">고속버스 운송회사</a></li>
							</ul></li>
						<li><a href="${pageContext.request.contextPath}/main.do">고객지원</a>
							<ul>
								<li><a href="${pageContext.request.contextPath}/board/list.do">게시판</a></li>
								<li><a href="${pageContext.request.contextPath}/faq/list.do">자주찾는 질문</a></li>
								<li><a href="${pageContext.request.contextPath}/losscenter/lossmain.do">유실물 센터</a>
</li>
							</ul></li>
					</ul>
				</div>
				<div class="links">
					<!-- <a href="https://www.tmoney.co.kr" class="btn btn-tmoney" title="새창" target="_blank">

               <img src="/images/kor/layout/ico-tmoney-app.png" alt="" />고속버스 티머니
               <i class="ico ico-arrow-new-window"></i>
            </a> -->

					<a href="/cscn/jobmttr/readJobList.do" class="btn btn-job"
						title="새창" target="_blank"> <img
						src="${pageContext.request.contextPath}/resources/images/ico-job-offer.png" alt="">승무사원 모집 <i
						class="ico ico-arrow-new-window"></i>
					</a>
				</div>
				<div class="bg-layer">
					<a
						href="https://safeconnect.co.kr/sfconn/login/csc_pc?et=psn249R01&amp;ptrSvcSn=psn249"
						title="새창" class="gnb-baaner"> <img
						src="${pageContext.request.contextPath}/resources/images/003-GNB.png" alt="ID 찾을 필요 없이, 전화번호 로그인!">
						<!-- <iframe src="${pageContext.request.contextPath}/resources/images/_ad-tubebox-002GNB.html" title="프레임 (전화번호안심 로그인)" class="ad-frame"></iframe> -->
					</a>
				</div>
			</div>
		</nav>
	</header>
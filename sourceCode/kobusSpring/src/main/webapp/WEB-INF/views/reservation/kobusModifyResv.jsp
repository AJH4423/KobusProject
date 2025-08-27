<%@ page trimDirectiveWhitespaces="true" language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>


		<!-- breadcrumb -->

		<!-- 브레드크럼 -->
		<nav id="new-kor-breadcrumb">
			<div class="container">

				<ol class="breadcrumb-list">
					<li><i class="ico ico-home"></i><span class="sr-only">홈</span></li>

				<li>
					<div class="dropdown-wrap breadcrumb-select">
						<a href="javascript:void(0)" class="btn-dropdown" title="대메뉴 선택"
							aria-expanded="false"> <span class="text">고속버스예매</span><i
							class="ico ico-dropdown-arrow"></i></a>
						<ul class="dropdown-list" style="display: none;">
							<li class="selected"><a href="/koBus/region.do" title="선택됨">고속버스예매</a></li>
							<li><a href="/koBus/kobusSchedule.do">운행정보</a></li>
							<li><a href="/koBus/pageForward.do?page=freePass">프리패스/정기권</a></li>
							<li><a href="#">이용안내</a></li>
							<li><a href="/koBus/lossCenter/main.do">고객지원</a></li>
							<li><a href="#">전국고속버스운송사업조합</a></li>
							<li><a href="#">터미널사업자협회</a></li>
						</ul>
					</div>
				</li>

				<li>
					<div class="dropdown-wrap breadcrumb-select">
						<a href="javascript:void(0)" class="btn-dropdown"
							title="하위메뉴 선택" aria-expanded="false"> <span class="text">예매확인/취소/변경</span><i
							class="ico ico-dropdown-arrow"></i></a>
						<ul class="dropdown-list" style="display: none;">
							<li><a href="/koBus/region.do">고속버스예매</a></li>
							<li class="selected"><a href="/koBus/manageReservations.do"
								title="선택됨">예매확인/취소/변경</a></li>

							<li><a href="#">영수증발행</a></li>
						</ul>
					</div>
				</li>
			</ol>
			</div>
		</nav>


		<article id="new-kor-content">
			<script type="text/javascript"
				src="${pageContext.request.contextPath}/resources/js/MrsChangeTimeStep1.js"></script>
			<div class="title_wrap in_process checkTicketingT"
				style="display: none;">

				<a href="/koBus/modifyResvSch.do"
					class="back">back</a> <a
					href="/koBus/modifyResvSch.do"
					class="mo_toggle">메뉴</a>


				<h2>예매확인/취소/변경</h2>
				<ol class="process">
					<li class="active">예매정보변경</li>
					<li>결제정보입력</li>
					<li class="last">변경완료</li>
				</ol>
			</div>


			<!-- 타이틀 -->
			<div class="content-header"
				data-page-title="예매정보변경(시간/등급 변경) | 예매확인/취소/변경 | 고속버스예매 | 고속버스통합예매">
				<div class="container">
					<div class="title-area">
						<h2 class="page-title">예매확인/취소/변경</h2>
						<ol class="process">
							<li class="active" title="현재 단계"><span class="num">1</span>
								예매정보변경</li>
							<li><span class="num">2</span> 결제정보입력</li>
							<li><span class="num">3</span> 변경완료</li>
						</ol>
					</div>
					<!-- 광고 배너 추후 추가 예정 -->
					<!-- <iframe src="/html/_ad-frame.html" title="광고 프레임" class="ad-frame ad-frame-title"></iframe> -->
				</div>
			</div>
			<div class="content-body">
				<div class="container">

					<h3>시간/등급 변경</h3>
					<div class="change_wrap custom_input">
					<c:set var="resv" value="${resvInfoList[0]}" />
						<form name="mrschangefrm" id="mrschangefrm" method="post"
							action="/koBus/modifyResvSch.do">
							<input type="hidden" name="resId" value="${resv.resId }">
								<input type="hidden" name="mrsMrnpSno" value="01"> 
								<input
									type="hidden" name="deprRegName" value="${resv.deprRegName }">
								<!-- 출발지 -->
								<input type="hidden" name="arrRegName" value="${resv.arrRegName }">
								<!-- 도착지 -->
								<input type="hidden" name="durMin" value="${resv.durMin }">
								<!-- 소요시간 -->
								<input type="hidden" name="deprRegCode" value="${resv.deprRegCode }">
								<!-- 출발지코드 -->
								<input type="hidden" name="arrRegCode" value="${resv.arrRegCode }">
								<!-- 도착지코드 -->
								<input type="hidden" name="alcnDeprnCd" value="010">
								<!-- 배차출발지코드 -->
								<input type="hidden" name="alcnArvlCd" value="200">
								<!-- 배차도착지코드 -->
								<input type="hidden" name="busGrade" value="전체">
								<!-- 등급 -->
								<input type="hidden" name="aduCount" value="${resv.aduCount }">
								<!-- 일반매수 -->
								<input type="hidden" name="stuCount" value="${resv.stuCount }">
								<!-- 초등매수 -->
								<input type="hidden" name="chdCount" value="${resv.chdCount }">
								<!-- 중고매수 -->
								<input type="hidden" name="rideDateStr" value="${fn:substringBefore(resv.rideDateStr, ' ')}">
								<!-- 출발날짜 -->
								<input type="hidden" name="rideTimeStr" value="${fn:substringAfter(resv.rideDateStr, ' ')}">
								<!-- 출발시간 -->
							

							<div class="routeBody clfix">
								<div class="routeArea route_wrap">
									<p class="date">
										<span>가는편</span>${resv.rideDateStr }
									</p>
									<div class="inner">

										<dl class="roundBox departure kor">
											<dt>출발</dt>
											<dd>${resv.deprRegName }</dd>
										</dl>
										<dl class="roundBox arrive kor">
											<dt>도착</dt>
											<dd>${resv.arrRegName }</dd>
										</dl>
									</div>
								</div>
								<div class="routeArea route_select">
									<div class="box_inputForm click_box inselect">
										<strong class="label">시간</strong>


										<!-- 웹 접근성 개선 셀렉트 박스 UI -->

										<div class="dropdown-wrap select-default">
											<a href="javascript:void(0)" class="btn-dropdown"
												title="시간 선택" aria-expanded="false"> <span class="text">15:00</span></a>
											<ul class="dropdown-list" style="top: 32px; display: none;">

												<c:forEach var="time" items="${busTimeList}">
													<li><a href="javascript:fnTimeChoice('${time}');">${time}</a></li>
												</c:forEach>
											</ul>
										</div>

									</div>
									<div class="box_inputForm click_box inselect">
										<strong class="label">등급</strong>


										<!-- 웹 접근성 개선 셀렉트 박스 UI -->

										<div class="dropdown-wrap select-default">
											<a href="javascript:void(0)" class="btn-dropdown"
												title="등급 선택" aria-expanded="false"> <span class="text">우등</span>
											</a>
											<ul class="dropdown-list" style="display: none;">


												<li><a href="javascript:fnBusCldChoice(&#39;0&#39;);">전체등급</a></li>
												<li><a href="javascript:fnBusCldChoice(&#39;5&#39;);">일반</a></li>
												<li><a href="javascript:fnBusCldChoice(&#39;1&#39;);">우등</a></li>
												<li><a href="javascript:fnBusCldChoice(&#39;7&#39;);">프리미엄</a></li>
											</ul>
										</div>

									</div>
								</div>
							</div>
							
							<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
							
						</form>
					</div>
					<p class="btns col1">
						<a href="javascript:void(0)" onclick="fnSearch()"
							class="btnL btn_confirm">조회하기</a>
					</p>
					<div class="section">
						<ul class="desc_list">
							<li>시간 변경은 1회만 가능하며 출발시간, 등급, 매수 및 좌석선택 변경이 가능합니다.</li>
							<li>기존에 선택하셨던 출발시간으로는 변경이 불가합니다.</li>
							<li>출발날짜는 변경이 불가합니다.</li>
							<!-- 지불 구분 코드가 마일리지 아닌 경우에만 노출 -->
							<li>예매 변경을 하게 되면 기존에 예매한 사항은 취소되며, 다시 한 번 카드결제가 이루어집니다.</li>

						</ul>
					</div>
				</div>

			</div>

		</article>

		<!-- footer -->


	</div>
</body>
</html>
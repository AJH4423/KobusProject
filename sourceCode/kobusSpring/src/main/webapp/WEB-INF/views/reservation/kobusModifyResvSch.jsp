<%@ page trimDirectiveWhitespaces="true" language="java"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/OprnAlcnInqr.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/OprnAlcnInqrPup.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/SatsChc.js"></script>

<script>
$(document).ready(function() {
	  $(".schedule-row").on("click", function() {
	    // 클릭한 p 태그의 data-* 속성값 읽기
	    var deprDtm = $(this).data("deprdtm");
	    var comName = $(this).data("comname");
	    var busGrade = $(this).data("busclscd");
	    var adultFare = $(this).data("adute");
	    var remainSeats = $(this).data("seats");

	    // 숨은 input에 값 세팅
	    $("#deprDtm").val(deprDtm);
	    $("#comName").val(comName);
	    $("#busGrade").val(busGrade);
	    $("#adultFare").val(adultFare);
	    $("#remainSeats").val(remainSeats);

	    // 폼 전송
	    $("#rotInfFrm").submit();
	  });
	});



</script>
<!-- [리뉴얼] 페이지 개별 스크립트 신규 정의함 -->
	
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

						<a href="javascript:void(0)" class="btn-dropdown" title="하위메뉴 선택"
							aria-expanded="false"> <span class="text">예매확인/취소/변경</span><i
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
			<!-- <script type="text/javascript"
				src="/koBus/js/MrsChangeTimeStep2.js"></script> -->

			<c:set var="resv" value="${resvInfoList[0]}" />
			<form name="rotInfFrm" id="rotInfFrm" method="post"
			      action="/koBus/modifyResvSeat.do">
			  
			  <input type="hidden" name="sourcePage" value="kobusModifyResvSch.jsp">
			  <input type="hidden" name="resId" value="${resv.resId }">
			  <input type="hidden" name="mrsMrnpSno" value="01"> 
			  
			  <input type="hidden" name="deprRegName" value="${resv.deprRegName }">
			  <!-- 출발지 -->
			  
			  <input type="hidden" name="arrRegName" value="${resv.arrRegName }">
			  <!-- 도착지 -->
			  
			  <input type="hidden" name="durMin" value="${resv.durMin }">
			  <!-- 소요시간 -->
			  
			  <input type="hidden" name="deprRegCode" value="${resv.deprRegCode }">
			  <!-- 출발지코드 -->
			  
			  <input type="hidden" name="arrRegCode" value="${resv.arrRegCode }">
			  <!-- 도착지코드 -->
			  
			  <input type="hidden" name="busGrade" value="">
			  <!-- 등급 -->
			  
			  <input type="hidden" name="aduCount" value="${resv.aduCount }">
			  <!-- 일반매수 -->
			  
			  <input type="hidden" name="stuCount" value="${resv.stuCount }">
			  <!-- 초등매수 -->
			  
			  <input type="hidden" name="chdCount" value="${resv.chdCount }">
			  <!-- 중고매수 -->
			  
			  <!-- p 태그 data-* 에서 받아올 추가 input들 -->
			  <input type="hidden" name="comName" id="comName" value="">
			  <input type="hidden" name="adultFare" id="adultFare" value="">
			  <input type="hidden" name="remainSeats" id="remainSeats" value="">
			  <input type="hidden" name="deprDtm" id="deprDtm" value="">
			  <input type="hidden" name="busClsCd" id="busClsCd" value="">
			
			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
			
			</form>
			
			<div class="title_wrap in_process checkTicketingT"
				style="display: none;">
				<a href="/koBus/modifyResvSch.do"
					class="back">back</a> <a
					href="/koBus/modifyResvSch.do"
					class="mo_toggle">메뉴</a>


				<h2>예매 확인/취소/변경</h2>
				<ol class="process">
					<li class="active">예매정보입력</li>
					<li>결제정보입력</li>
					<li class="last">예매완료</li>
				</ol>
			</div>
			<!-- 타이틀 -->
			<div class="content-header"
				data-page-title="예매정보변경(배차조회) | 예매확인/취소/변경 | 고속버스예매 | 고속버스통합예매">
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

					<h3>배차조회</h3>
					<div class="buscheck_wrap clfix">
						<!-- 좌측 infoBox -->
						<div class="infoBox">
							<p class="date" id="alcnDeprDtm">${resv.rideDateStr}</p>
							<div class="route_wrap">
								<div class="inner">
									<dl class="roundBox departure kor">
										<dt>출발</dt>
										<dd id="alcnDeprTmlNm">${resv.deprRegName }</dd>
									</dl>
									<dl class="roundBox arrive kor">
										<dt>도착</dt>
										<dd id="alcnArvlTmlNm">${resv.arrRegName }</dd>
									</dl>
								</div>
								<div class="detail_info">
								<c:set var="durMin" value="${resv.durMin}" />
								<c:set var="hour" value="${durMin div 60}" />
								<c:set var="minute" value="${durMin mod 60}" />
								<span id="takeDrtm"> 
										<fmt:formatNumber value="${hour}"
										type="number" maxFractionDigits="0" />시간 
										<fmt:formatNumber
										value="${minute}" type="number" maxFractionDigits="0" />분 소요
								</span>

							</div>
								<!-- <div class="btn_r">
								<a href="javascript:void(0)" class="btn btn_modify white" onclick="fnUpdRot()">수정</a>
							</div> -->
							</div>
							<a href="javascript:void(0)" class="btn_price">요금보기</a>

							<div class="price_info bottom" id="alcnPriceInf">
								<p class="stit">
									요금정보<span>(일반요금)</span>
								</p>


								<dl>
									<dt class="">우등</dt>
									<dd>22,300 원</dd>
									<dt class="">고속</dt>
									<dd>17,200 원</dd>
									<dt class="">심야우등</dt>
									<dd>26,700 원</dd>
									<dt class="">심야고속</dt>
									<dd>20,600 원</dd>
									<dt class="">프리미엄</dt>
									<dd>28,900 원</dd>
									<dt class="">심야프리미엄</dt>
									<dd>34,600 원</dd>
								</dl>
							</div>


						</div>
						<!-- //좌측 infoBox -->
						<!-- 우측 detailBox -->
						
						<div class="detailBox">
							<div class="detailBox_head col" style="min-height: 70px;">
								<div class="box_refresh">
									<button type="button" class="btn btn_refresh" id="reloadBtn">
										<span class="ico_refresh"><span class="sr-only">새로고침</span></span>
									</button>
								</div>
								<div class="head_date">
									<span class="date_cont" id="rideDate">${resv.rideDateStr }</span>
								</div>
							</div>
							<div class="detailBox_body clfix">
								<ul class="time">


									<li class="night" onclick="fnTimeChcList(this);"><a
										href="javascript:void(0)" class="" data-time="01">1</a></li>

									<li class="night" onclick="fnTimeChcList(this);"><a
										href="javascript:void(0)" class="" data-time="03">3</a></li>

									<li class="night" onclick="fnTimeChcList(this);"><a
										href="javascript:void(0)" class="" data-time="05">5</a></li>

									<li class="daytime" onclick="fnTimeChcList(this);"><a
										href="javascript:void(0)" class="" data-time="07">7</a></li>

									<li class="daytime" onclick="fnTimeChcList(this);"><a
										href="javascript:void(0)" class="" data-time="09">9</a></li>

									<li class="daytime" onclick="fnTimeChcList(this);"><a
										href="javascript:void(0)" class="" data-time="11">11</a></li>

									<li class="daytime" onclick="fnTimeChcList(this);"><a
										href="javascript:void(0)" class="" data-time="13">13</a></li>

									<li class="daytime" onclick="fnTimeChcList(this);"><a
										href="javascript:void(0)" class="" data-time="15">15</a></li>

									<li class="daytime" onclick="fnTimeChcList(this);"><a
										href="javascript:void(0)" class="" data-time="17">17</a></li>

									<li class="daytime" onclick="fnTimeChcList(this);"><a
										href="javascript:void(0)" class="" data-time="19">19</a></li>

									<li class="night" onclick="fnTimeChcList(this);"><a
										href="javascript:void(0)" class="" data-time="21">21</a></li>

									<li class="night" onclick="fnTimeChcList(this);"><a
										href="javascript:void(0)" class="" data-time="23">23</a></li>



								</ul>

								<div class="bustime_wrap" role="table"
									aria-label="배차조회에 대한 목록이며 출발, 고속사, 등급, 할인, 잔여석, 상태 정보 제공">
									<p class="bustime_head" role="row">
										<span id="start_time_header" class="start_time"
											role="columnheader">출발</span> <span id="bus_info_header"
											class="bus_info" role="columnheader">고속사/등급</span>
										<!-- tablet / mobile 사이즈에서 보임 -->
										<span id="bus_com_header" class="bus_com" role="columnheader">고속사</span>
										<!-- pc 사이즈에서만 보임 -->
										<span id="grade_header" class="grade" role="columnheader">등급</span>
										<!-- pc 사이즈에서만 보임 -->
										<span id="temp_header" class="temp" role="columnheader">할인</span>
										<span id="remain_header" class="remain" role="columnheader">잔여석</span>
										<span id="status_header" class="status" role="columnheader"><span
											class="sr-only">상태</span></span>
									</p>
									
									<div class="bus_time" role="row" aria-rowindex="1">
									<c:forEach var="change" items="${changeList}" varStatus="status">
									  <p class="schedule-row"
									     data-deprDtm="${change.departureDate}"
									     data-comname="${change.comName}"
									     data-busClsCd="${change.busGrade}"
									     data-adute="${change.adultFare}"
									     data-seats="${change.remainSeats}"
									     role="row">
									
									      <span class="start_time" role="cell" aria-labelledby="start_time_header">
									        ${change.departureDate}
									      </span>
									
									      <span class="bus_info" role="cell" aria-labelledby="bus_info_header">
									        <span class="">${change.comName}</span>
									        <span class="grade_mo">${change.busGrade}</span>
									      </span>
									
									      <span class="bus_com" role="cell" aria-labelledby="bus_com_header">
									        <span class="">${change.comName}</span>
									      </span>
									
									      <span class="grade" role="cell" aria-labelledby="grade_header">
									        ${change.busGrade}
									      </span>
									
									      <span class="temp" role="cell" aria-labelledby="temp_header">
									        ${change.adultFare}원
									      </span>
									
									      <span class="remain" role="cell" aria-labelledby="remain_header">
									        ${change.remainSeats}좌석
									      </span>
									
									      <span class="status" role="cell" aria-labelledby="status_header">
									        <c:choose>
									          <c:when test="${fn:trim(alcnDeprDtm) eq fn:trim(rideDate)}">
									            예매
									          </c:when>
									          <c:otherwise>
												  <input type="submit"
												         value="선택"
												         class="accent btn_arrow"
												         form="rotInfFrm"
												         formaction="/koBus/modifyResvSeat.do"
												         tabindex="-1">
												</c:otherwise>
									        </c:choose>
									      </span>   
									
									  </p>
									</c:forEach>

									<!-- 동양고속 class="dyexpress" 삼화고속 class="samhwa" 중앙고속 class="jabus" 금호고속 class="kumho" 천일고속 class="chunil" 한일고속 class="hanil" 동부고속 class="dongbu" 금호속리산고속 class="songnisan" 코버스 class="kobus" -->
									
									
									</div>
								</div>
							</div>
						</div>
						<!-- //우측 detailBox -->
					</div>
					<div class="section">
						<ul class="desc_list">
							<!-- 지불 구분 코드가 마일리지 아닌 경우에만 노출 -->
							<li>심야 고속ㆍ우등ㆍ프리미엄의 요금은 당일 22:00부터 익일 04:00사이 출발차량</li>
							<li>시간 변경은 1회만 가능하며 출발시간, 등급, 매수 및 좌석선택 변경이 가능합니다.</li>
							<li>기존에 선택하셨던 출발시간으로는 변경이 불가합니다.</li>
							<li>출발날짜는 변경이 불가합니다.</li>
							<li>예매 변경을 하게 되면 기존에 예매한 사항은 취소되며, 다시 한 번 카드결제가 이루어집니다.</li>


							<li>프리미엄 노선 중 유아 카시트 장착이 가능한 차량은 해당 아이콘( <img
								src="/koBus/images/ico_child_on.png"
								alt="" style="width: 13px"> )으로 표시되어 있습니다. (본인 소유의 유아 카시트
								준비)
							</li>
							<!-- 190925 추가 -->
							<li>휠체어 좌석 가능( <img
								src="/koBus/images/ico_wheel_on.png"
								alt="" style="width: 13px"> ) 표시된 차량에만 휠체어 장착 가능 (전동식 휠체어만
								장착 가능)
							</li>
							<li>휠체어 좌석 예매는 wkobus 사이트에서 예매 가능하며, 휠체어 좌석 예매는 출발일로 부터
								3일전까지만 가능<br>(*휠체어 좌석 예매가 없을 시 출발일 이틀 전부터 일반석 예매 가능)
							</li>
							<!-- // 190925 추가 -->
						</ul>
					</div>

				</div>


			</div>
		</article>

		<!-- footer -->

	</div>

</body>
</html>
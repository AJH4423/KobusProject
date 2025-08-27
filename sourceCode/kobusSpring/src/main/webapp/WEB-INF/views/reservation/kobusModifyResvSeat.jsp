<%@ page language="java" trimDirectiveWhitespaces="true" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<style>
.txt_red {
	font-weight: bold;
	text-decoration: underline;
	color: #e64c2e;
}

.txt_bold {
	font-weight: bold;
	text-decoration: underline;
}
</style>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/js/SatsChc.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/ReadLgnInf.js"></script>

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/rsa_oaep-min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jsbn-min2.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/typedarray.js"></script>

<!-- 20200831 yahan -->
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/rsa_oaep-min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jsbn-min2.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/typedarray.js"></script>

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
							aria-expanded="false"> <span class="text">고속버스예매</span><i
							class="ico ico-dropdown-arrow"></i></a>
						<ul class="dropdown-list" style="display: none;">
							<li class="selected"><a href="/koBus/region.do" title="선택됨">고속버스예매</a></li>

							<li><a href="/koBus/manageReservations.do">예매확인/취소/변경</a></li>

							<li><a href="#">영수증발행</a></li>
						</ul>
					</div>
				</li>
			</ol>

			</div>
		</nav>


		<article id="new-kor-content" class="full">

			<script>
	var feeList = [];
	
		var tck = '1';
		var dc  = '0';
		var fee = '31900';

		feeList[tck+'_'+dc] = fee;
	
		var tck = '1';
		var dc  = 'b';
		var fee = '30300';

		feeList[tck+'_'+dc] = fee;
	
		var tck = '2';
		var dc  = '0';
		var fee = '16000';

		feeList[tck+'_'+dc] = fee;
	
		var tck = '6';
		var dc  = '0';
		var fee = '31900';

		feeList[tck+'_'+dc] = fee;
	
		var tck = '6';
		var dc  = 'b';
		var fee = '30300';

		feeList[tck+'_'+dc] = fee;
	
		var tck = '9';
		var dc  = '0';
		var fee = '25500';

		feeList[tck+'_'+dc] = fee;
	
</script>

			<c:set var="bus" value="${busList[0]}" />
			<c:set var="change" value="${changeSeatList[0]}" />
			
			<%-- 어른 : ${change.rideDateStr } <br>
			학생 : ${change.busGrade } <br>
			아이 : ${bus.childFare } <br> --%>
			
			<form name="satsChcFrm" id="satsChcFrm" method="post"
				action="/koBus/setPcpy.ajax">
				<input type="hidden" name="deprCd" id="deprCd" value="${change.deprRegCode }">
				<!-- 출발지코드 -->
				<input type="hidden" name="deprNm" id="deprNm" value="${change.deprRegName }">
				<!-- 출발지명 -->
				<input type="hidden" name="arvlCd" id="arvlCd" value="${change.arrRegCode }">
				<!-- 도착지코드 -->
				<input type="hidden" name="arvlNm" id="arvlNm" value="${change.arrRegName }">
				<!-- 도착지명 -->
				<input type="hidden" name="tfrCd" id="tfrCd" value="">
				<!-- 환승지코드 -->
				<input type="hidden" name="tfrNm" id="tfrNm" value="">
				<!-- 환승지명 -->
				<input type="hidden" name="tfrArvlFullNm" id="tfrArvlFullNm"
					value="">
				<!-- 환승지포함 도착지 명 -->
				<input type="hidden" name="pathDvs" id="pathDvs" value="sngl">
				<!-- 직통sngl,환승trtr,왕복rtrp -->
				<input type="hidden" name="pathStep" id="pathStep" value="1">
				<!-- 왕편 복편 설정 -->
				<input type="hidden" name="deprDtm" id="deprDtm" value="${change.rideDateStr }">
				<!-- 가는날(편도,왕복) -->
				<input type="hidden" name="deprDtmAll" id="deprDtmAll"
					value="${change.rideDateStr }">
				<!-- 가는날(편도,왕복) -->
				<input type="hidden" name="arvlDtm" id="arvlDtm" value="${change.rideDateStr }">
				<!-- 오는날(왕복) -->
				<input type="hidden" name="arvlDtmAll" id="arvlDtmAll"
					value="2025. 6. 21. 토">
				<!-- 오는날(왕복) -->
				<input type="hidden" name="busClsCd" id="busClsCd" value="${bus.busGrade }">
				<!-- 버스등급 -->
				<input type="hidden" name="takeDrtmOrg" id="takeDrtmOrg" value="${change.durMin }">
				<!-- 소요시간 -->
				<input type="hidden" name="distOrg" id="distOrg" value="">
				<!-- 거리 -->
				<!-- 출발일자:deprDtm or arvlDtm, 출발터미널번호:deprCd, 도착터미널번호:arvlCd  -->
				<input type="hidden" name="deprDt" id="deprDt" value="${change.rideDateStr }">
				<!-- 출발일 -->
				<input type="hidden" name="deprTime" id="deprTime" value="${change.rideTimeStr }">
				<!-- 출발시각 -->
				<input type="hidden" name="alcnDeprDt" id="alcnDeprDt" value="">
				<!-- 배차출발일 -->
				<input type="hidden" name="alcnDeprTime" id="alcnDeprTime"
					value="">
				<!-- 배차출발시각 -->
				<input type="hidden" name="alcnDeprTrmlNo" id="alcnDeprTrmlNo"
					value="010">
				<!-- 배차출발터미널 -->
				<input type="hidden" name="alcnArvlTrmlNo" id="alcnArvlTrmlNo"
					value="200">
				<!-- 배차도착터미널 -->
				<input type="hidden" name="indVBusClsCd" id="indVBusClsCd" value="7">
				<!-- 선택한버스등급 -->
				<input type="hidden" name="cacmCd" id="cacmCd" value="02">
				<!-- 운수사코드 -->
				<input type="hidden" name="cacmNm" id="cacmNm" value="${bus.comName }">
				<!-- 운수사이름 -->
				<input type="hidden" name="deprThruSeq" id="deprThruSeq" value="1">
				<!-- 출발경유순서 -->
				<input type="hidden" name="arvlThruSeq" id="arvlThruSeq" value="4">
				<!-- 도착경유순서 -->
				
				<input type="hidden" name="bshId" id="bshId" value="${bus.bshId }">

				<input type="hidden" name="adltFee" id="adltFee" value="${bus.adultFare }">
				<!-- 일반금액 -->
				<input type="hidden" name="chldFee" id="chldFee" value="${bus.childFare }">
				<!-- 초등생금액 -->
				<input type="hidden" name="teenFee" id="teenFee" value="${bus.stuFare }">
				<!-- 중고생금액 -->
				<input type="hidden" name="uvsdFee" id="uvsdFee" value="">
				<!-- 대학생금액 -->
				<input type="hidden" name="sncnFee" id="sncnFee" value="">
				<!-- 경로금액 -->
				<input type="hidden" name="dsprFee" id="dsprFee" value="">
				<!-- 장애인금액 -->

				<input type="hidden" name="vtr3Fee" id="vtr3Fee" value="">
				<!-- 보훈금액30 -->
				<input type="hidden" name="vtr5Fee" id="vtr5Fee" value="">
				<!-- 보훈금액50 -->
				<input type="hidden" name="vtr7Fee" id="vtr7Fee" value="">
				<!-- 보훈금액70 -->
				<input type="hidden" name="dfptFee" id="dfptFee" value="31900">
				<!-- 후불금액 -->
				<!-- 할인금액 -->
				<input type="hidden" name="ctyDcFee1" id="ctyDcFee1" value="">
				<!-- 사전예매 -->
				<input type="hidden" name="ctyDcFee2" id="ctyDcFee2" value="">
				<!-- 단체예매5인 -->
				<input type="hidden" name="ctyDcFee3" id="ctyDcFee3" value="">
				<!-- 뒷좌석예매 -->
				<input type="hidden" name="ctyDcFee4" id="ctyDcFee4" value="">
				<!-- 왕복예매 -->
				<input type="hidden" name="ctyDcFee5" id="ctyDcFee5" value="">
				<!-- 단체예매4인 -->


				<input type="hidden" name="ctyDcFee3Cnt" id="ctyDcFee3Cnt" value="0">
				<!-- 뒷좌석예매 -->

				<input type="hidden" name="dcDvsCd" id="dcDvsCd" value="0">
				<!-- 할인구분코드 -->

				<!-- 20200623 yahan	 -->
				<input type="hidden" name="mrsPsbYn" id="mrsPsbYn" value="Y">
				<!-- 예매가능여부 -->
				<!-- 20200709 yahan	 -->
				<input type="hidden" name="htckUseYn" id="htckUseYn" value="Y">
				<!-- 홈티켓가능여부 -->

				<input type="hidden" name="ctyPrmmDcYn" id="ctyPrmmDcYn" value="Y">
				<!-- 시외우등할인여부 -->
				<input type="hidden" name="prmmDcDvsCd" id="prmmDcDvsCd" value="">
				<!-- 클릭한 우등형할인코드 -->
				<input type="hidden" name="mblUtlzPsbYn" id="mblUtlzPsbYn" value="Y">
				<!-- 모바일발권가능여부 : Y:가능, N:불가능 -->
				<input type="hidden" name="tlcnTrcnUtlzPsbYn" id="tlcnTrcnUtlzPsbYn"
					value="Y">
				<!-- 통합단말기여부  Y:존재, N:없음 -->

				<input type="hidden" name="chkDeprDt" id="chkDeprDt"
					value="${change.rideDateStr }">
				<!-- 2일 후 시간체크 -->
				<input type="hidden" name="chkDeprTime" id="chkDeprTime"
					value="072000">
				<!-- 2일 후 시간체크 -->
				<input type="hidden" name="prsTimeAll" id="prsTimeAll"
					value="20250613140651">
				<!-- 2일 후 시간체크 -->

				<input type="hidden" name="rmnSatsNum" id="rmnSatsNum" value="${bus.remainSeats }">
				<!-- 잔여좌석수 -->
				<input type="hidden" name="totSatsNum" id="totSatsNum" value="${bus.busSeats }">
				<!-- 총좌석수 -->
				<input type="hidden" name="selSeatNum" id="selSeatNum" value="">
				<!-- 선택좌석번호 -->
				<input type="hidden" name="selSeatCnt" id="selSeatCnt" value="0">
				<!-- 선택좌석수 -->
				<input type="hidden" id="selectedSeatIds" name="selectedSeatIds" value="">
				<!-- 좌석배열 -->
				
				<input type="hidden" name="selAdltCnt" id="selAdltCnt" value="${change.aduCount }">
				<!-- 어른수 -->
				<input type="hidden" name="selAdltDcCnt" id="selAdltDcCnt" value="0">
				<!-- 할인대상어른수 -->
				<input type="hidden" name="selChldCnt" id="selChldCnt" value="${change.chdCount }">
				<!-- 초등생수 -->
				<input type="hidden" name="selTeenCnt" id="selTeenCnt" value="${change.stuCount }">
				<!-- 중고생수 -->
				<input type="hidden" name="selUvsdCnt" id="selUvsdCnt" value="0">
				<!-- 대학생수 -->
				<input type="hidden" name="selSncnCnt" id="selSncnCnt" value="0">
				<!-- 경로수(권종추가-201906) -->
				<input type="hidden" name="selDsprCnt" id="selDsprCnt" value="0">
				<!-- 장애인수(권종추가-201906) -->
				<input type="hidden" name="selVtr3Cnt" id="selVtr3Cnt" value="0">
				<!-- 보훈수(권종추가-20210525) -->
				<input type="hidden" name="selVtr5Cnt" id="selVtr5Cnt" value="0">
				<!-- 보훈수(권종추가-20210525) -->
				<input type="hidden" name="selVtr7Cnt" id="selVtr7Cnt" value="0">
				<!-- 보훈수(권종추가-20210525) -->
				<input type="hidden" name="selDfptCnt" id="selDfptCnt" value="0">
				<!-- 후불수(권종추가-20220722) -->


				<input type="hidden" name="nonMbrsYn" id="nonMbrsYn" value="Y">
				<!-- 비회원예매Y:비회원, N:회원 테스트용으로 Y고정 -->
				<!-- 선점데이터 -->
				<input type="hidden" name="satsNoAll" id="satsNoAll" value="">
				<!-- 선택좌석번호전체   -->
				<input type="hidden" name="pcpyNoAll" id="pcpyNoAll" value="">
				<!-- 선점번호전체   -->
				<input type="hidden" name="satsNoAll1" id="satsNoAll1" value="">
				<!-- 왕복시 왕편 선택좌석번호전체   -->
				<input type="hidden" name="pcpyNoAll1" id="pcpyNoAll1" value="">
				<!-- 왕복시 왕편 선점번호전체   -->
				<input type="hidden" name="alcnTrmlNoInfo" id="alcnTrmlNoInfo"
					value="">
				<!-- 왕편출도착지 터미널코드 -->
				<input type="hidden" name="satsNoAll2" id="satsNoAll2" value="">
				<!-- 왕복시 복편 선택좌석번호전체   -->
				<input type="hidden" name="pcpyNoAll2" id="pcpyNoAll2" value="">
				<!-- 왕복시 복편 선점번호전체   -->

				<input type="hidden" name="rtSelAdltCnt" id="rtSelAdltCnt" value="${change.aduCount }">
				<!-- 어른수   -->
				<input type="hidden" name="rtSelChldCnt" id="rtSelChldCnt" value="${change.chdCount }">
				<!-- 초등생수   -->
				<input type="hidden" name="rtSelUvsdCnt" id="rtSelUvsdCnt" value="">
				<!-- 대학생수   -->
				<input type="hidden" name="rtSelTeenCnt" id="rtSelTeenCnt" value="${change.stuCount }">
				<!-- 중고생수   -->
				<input type="hidden" name="rtSelSncnCnt" id="rtSelSncnCnt" value="">
				<!-- 경로수(권종추가-201906) -->
				<input type="hidden" name="rtSelDsprCnt" id="rtSelDsprCnt" value="">
				<!-- 장애인수(권종추가-201906) -->
				<input type="hidden" name="rtSelVtr3Cnt" id="rtSelVtr3Cnt" value="">
				<!-- 보훈수(권종추가-20210525) -->
				<input type="hidden" name="rtSelVtr5Cnt" id="rtSelVtr5Cnt" value="">
				<!-- 보훈수(권종추가-20210525) -->
				<input type="hidden" name="rtSelVtr7Cnt" id="rtSelVtr7Cnt" value="">
				<!-- 보훈수(권종추가-20210525) -->
				<input type="hidden" name="rtSelDfptCnt" id="rtSelDfptCnt" value="">
				<!-- 보훈수(권종추가-20210525) -->

				<!-- 예상금액 -->
				<input type="hidden" name="estmAmt" id="estmAmt" value="">
				<!-- 예매금액 -->
				<input type="hidden" name="dcAmt" id="dcAmt" value="">
				<!-- 할인금액 -->
				<input type="hidden" name="tissuAmt" id="tissuAmt" value="">
				<!-- 결제금액 -->
				
				<input type="hidden" name="adltTotPrice" id="adltTotPrice" value="${bus.adultFare }">
				<!-- 일반금액 -->
				
				<input type="hidden" name="chldTotPrice" id="chldTotPrice" value="${bus.stuFare }">
				<!-- 중고생금액 -->
				
				<input type="hidden" name="teenTotPrice" id="teenTotPrice" value="${bus.childFare }">
				<!-- 초등생금액 -->
				
				<input type="hidden" name="allTotAmtPrice" id="allTotAmtPrice" value="">
				<!-- 결제금액 -->
				

				<input type="hidden" name="rtrpDtl1" id="rtrpDtl1" value="">
				<!-- 왕복시 왕편데이터중 선점을 제외한 나머지 데이터 입력매수,일반인할인매수,일반인,중고생,초등생,대학생,시외우등형할인구분,예매금액,할인금액,결제금액,출발일,출발시간 순으로':'로 구분 -->
				<input type="hidden" name="rtrpDtl2" id="rtrpDtl2" value="">
				<!-- 왕복시 복편데이터중 선점을 제외한 나머지 데이터 입력매수,일반인할인매수,일반인,중고생,초등생,대학생,시외우등형할인구분,예매금액,할인금액,결제금액,출발일,출발시간 순으로':'로 구분 -->


				<input type="hidden" name="webScrnRnwl" id="webScrnRnwl" value="N">
				<!-- 화면갱신을 위한 데이터  Y:새로고침, N:신규 -->
				<input type="hidden" name="teenFeeNCntY" id="teenFeeNCntY" value="">
				<!-- 왕편 청소년 선택 후 복편 배차 청소년 좌석 없는 경우-->
				<input type="hidden" name="uvsdFeeNCntY" id="uvsdFeeNCntY" value="">
				<!-- 왕편 대학생 선택 후 복편 배차 대학생 좌석 없는 경우 -->
				<input type="hidden" name="sncnFeeNCntY" id="sncnFeeNCntY" value="">
				<!-- 왕편 경로 선택 후 복편 배차 경로 좌석 없는 경우 -->
				<input type="hidden" name="dsprFeeNCntY" id="dsprFeeNCntY" value="">
				<!-- 왕편 장애인 선택 후 복편 배차 장애인 좌석 없는 경우 -->
				<input type="hidden" name="vtr3FeeNCntY" id="vtr3FeeNCntY" value="">
				<!-- 왕편 보훈 선택 후 복편 배차 보훈 좌석 없는 경우 -->
				<input type="hidden" name="vtr5FeeNCntY" id="vtr5FeeNCntY" value="">
				<!-- 왕편 보훈 선택 후 복편 배차 보훈 좌석 없는 경우 -->
				<input type="hidden" name="vtr7FeeNCntY" id="vtr7FeeNCntY" value="">
				<!-- 왕편 보훈 선택 후 복편 배차 보훈 좌석 없는 경우 -->
				<input type="hidden" name="dfptFeeNCntY" id="dfptFeeNCntY" value="">
				<!-- 왕편 후불 선택 후 복편 배차 후불 좌석 없는 경우 -->

				<input type="hidden" name="prvtBbizEmpAcmtRt" id="prvtBbizEmpAcmtRt"
					value="N">
				<!-- 국민차장제 대상 여부 (Y/N)-->
				<input type="hidden" name="agrmYn" id="agrmYn" value="U">
				<!-- 국민차장제 동의 여부 (Y/N/U) -->

				<input type="hidden" name="extrComp" id="extrComp" value="">
				<!-- 거래처코드 -->
				<input type="hidden" name="stdDtm" id="stdDtm" value=""> <input
					type="hidden" name="endDtm" id="endDtm" value="">
					
					
				<input type="hidden" name="changeResId" id="changeResId" value="${change.resId }">
				<!-- 결제금액 -->
				
				<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />

			</form>

			<div class="loading" id="loading" style="height: 1293px; top: 180px;">
				<p class="load" style="margin-left: -53px;">
					<span class="sr-only">로딩중입니다</span>
				</p>
			</div>

			<div class="title_wrap in_process ticketingT" style="display: none;">

				<a href="#" class="back">back</a>
				<a href="#" class="mo_toggle">메뉴</a>

				<h2>고속버스예매</h2>
				<ol class="process">
					<li class="active">예매정보입력</li>
					<li>결제정보입력</li>
					<li class="last">예매완료</li>
				</ol>
			</div>


			<!-- 타이틀 -->
			<div class="content-header"
				data-page-title="예매정보입력(매수 및 좌석선택) | 고속버스예매 | 고속버스예매 | 고속버스통합예매">
				<div class="container">
					<div class="title-area">
						<h2 class="page-title">고속버스예매</h2>
						<ol class="process">
							<li class="active" title="현재 단계"><span class="num">1</span>
								예매정보입력</li>
							<li><span class="num">2</span> 결제정보입력</li>
							<li><span class="num">3</span> 예매완료</li>
						</ol>
					</div>
					<!-- 광고 배너 추후 추가 예정 -->
					<!-- <iframe
						src="${pageContext.request.contextPath}/resources/html/_ad-tubebox-002TITLE.html"
						title="프레임 (전화번호안심 로그인)" class="ad-frame ad-frame-title"></iframe> -->
				</div>
			</div>

			<div class="content-body" id="seatChcPage">
				<div class="container">

					<h3>매수 및 좌석선택</h3>

					<div class="selectSeat_wrap">
						<!-- compareBox -->
						<div class="compare_wrap">
							<!-- 좌측 infoBox -->
							<div class="infoBox">

								<p class="date" id="satsDeprDtm"></p>
								<div class="route_wrap" id="satsRotInfo">
									<div class="inner">

										<dl class="roundBox departure kor">
											<dt>출발</dt>
											<dd id="satsDeprTmlNm"></dd>
										</dl>
										<dl class="roundBox arrive kor">
											<dt>도착</dt>
											<dd id="satsArvlTmlNm"></dd>
										</dl>
									</div>
									<div class="detail_info">
										<span id="satsTakeDrtm"></span> 
										<span id="satsDist"></span>
									</div>
									<div class="btn_r">
										<a href="javascript:void(0)" class="btn btn_modify white"
											onclick="fnUpdRot();" title="노선조회 화면으로 이동">수정</a>
									</div>
								</div>



								<div class="route_wrap">
									<div class="tbl_type2">
										<table>
											<caption>버스 정보 표이며 고속사, 등급, 출발 정보 제공</caption>
											<colgroup>
												<col style="width: 66px;">
												<col>
											</colgroup>
											<tbody>
												<tr>
													<th scope="row">고속사</th>
													<td>${bus.comName }</td>
												</tr>
												<tr>
													<th scope="row">등급</th>
													<td>${bus.busGrade }</td>
												</tr>
												<tr>
													<th scope="row">출발</th>
													<td>${bus.departureDate }</td>
												</tr>
											</tbody>
										</table>
										<div class="btn_r mob_pad">
											<a href="javascript:void(0)" class="btn btn_modify white"
												onclick="fnUpdAlcn();" title="배차조회 화면으로 이동">수정</a>
										</div>
									</div>
								</div>

							</div>
							<!-- //좌측 infoBox -->

							<!-- 우측 detailBox -->
							<div class="detailBox">
								<!-- mobile 매수 선택 -->
								<div class="ticketBox mobileBox">
									<ul class="sel_list col3" id="mobileSelCnt">

										<li>
											<div class="countBox">
												<p class="division">
													<em>일반</em> <span class="text_num count" id="adltCntMob">0</span>


												</p>
												<div class="btn_wrap">
													<ul>


														<li><button type="button" class="btn btn_add">
																<span class="ico_plus"><span class="sr-only">증가</span></span>
															</button></li>
														<li><button type="button" class="btn btn_add">
																<span class="ico_minus"><span class="sr-only">감소</span></span>
															</button></li>
													</ul>
												</div>
											</div>
										</li>
										<li>
											<div class="countBox">
												<p class="division">
													<em>초등생</em> <span class="text_num count" id="chldCntMob">0</span>
												</p>
												<div class="btn_wrap">
													<ul>


														<li><button type="button" class="btn btn_add">
																<span class="ico_plus"><span class="sr-only">증가</span></span>
															</button></li>
														<li><button type="button" class="btn btn_add">
																<span class="ico_minus"><span class="sr-only">감소</span></span>
															</button></li>
													</ul>
												</div>
											</div>
										</li>

										<li>
											<div class="countBox">
												<p class="division">
													<em>중고생</em> <span class="text_num count" id="teenCntMob">0</span>


												</p>
												<div class="btn_wrap">
													<ul>
														<li><button type="button" class="btn btn_add">
																<span class="ico_plus"><span class="sr-only">증가</span></span>
															</button></li>
														<li><button type="button" class="btn btn_add">
																<span class="ico_minus"><span class="sr-only">감소</span></span>
															</button></li>
													</ul>
												</div>
											</div>
										</li>

									</ul>
								</div>
								<!-- //mobile 매수 선택 -->
								<div class="detailBox_head" style="height: 63px;">
									<div class="box_refresh">
										<button type="button" class="btn btn_refresh"
											onclick="fnReload();">
											<span class="ico_refresh"><span class="sr-only">새로고침</span></span>
										</button>
									</div>
									<div class="count_seat">
										<div class="inner">
											<div class="box_count">
											
												<span class="count_num">잔여 ${bus.remainSeats}석 / 전체 ${bus.busSeats}석</span> <span
													class="count_desc"> <span class="ico_square orange">여성/노약자
														우선</span> <!-- 20200724 yahan 뒷좌석 할인 노출조건변경 -->
												</span>
											</div>
										</div>
									</div>
								</div>
								<div class="detailBox_body">
									<!-- 매수선택 -->
									<div class="ticketBox ">
										<ul class="sel_list">

											<li>
												<div class="countBox">
													<p class="division">
														<em>일반</em> <span class="text_num count" id="adltCnt">0</span>

													</p>
													<div class="btn_wrap">
														<ul>

															<li><button type="button" class="btn btn_add">
																	<span class="ico_plus"><span class="sr-only">증가</span></span>
																</button></li>
															<li><button type="button" class="btn btn_add">
																	<span class="ico_minus"><span class="sr-only">감소</span></span>
																</button></li>
														</ul>
													</div>
												</div>
											</li>

											<li>
												<div class="countBox">
													<p class="division">
														<em>초등생</em> <span class="text_num count" id="chldCnt">0</span>


													</p>
													<div class="btn_wrap">
														<ul>


															<li><button type="button" class="btn btn_add">
																	<span class="ico_plus"><span class="sr-only">증가</span></span>
																</button></li>
															<li><button type="button" class="btn btn_add">
																	<span class="ico_minus"><span class="sr-only">감소</span></span>
																</button></li>

														</ul>
													</div>
												</div>
											</li>

											<li>
												<div class="countBox">
													<p class="division">
														<em>중고생</em> <span class="text_num count" id="teenCnt">0</span>
													</p>
													<div class="btn_wrap">
														<ul>


															<li><button type="button" class="btn btn_add">
																	<span class="ico_plus"><span class="sr-only">증가</span></span>
																</button></li>
															<li><button type="button" class="btn btn_add">
																	<span class="ico_minus"><span class="sr-only">감소</span></span>
																</button></li>
														</ul>
													</div>
												</div>
											</li>

										</ul>
									</div>
									<!-- //매수선택 -->
									<!-- 좌석선택 -->

									<!-- 21석 클래스 seat21 -->

									<div class="selectSeat_box">
										<div class="bg_seatBox seat21" style="display: block;">
											<div class="bg_bus_img">
												<img
													src="${pageContext.request.contextPath}/resources/images/bg_bus21.png"
													alt="버스 내부 도면으로 버스의 전방 좌측에는 운전석, 전방 우측에는 출입구가 위치하고 있습니다. 운전석 뒤로는 1,2번 좌석이 있고, 1,2번 좌석 뒤로 두 개의 좌석씩 4,5,7,8,10,11,13,14,16,17,19,20번 좌석이 있습니다. 출입구 뒤에는 3번 좌석이 있으며, 3번 뒤로 6,9,12,15,18,21번 좌석이 있습니다. 2번과 3번 좌석 사이에는 통로가 있으며, 전체적으로 통로를 중심으로 좌측에 2개 좌석, 우측에 1개 좌석이 위치하며 한 줄에 3개의 좌석씩 7줄로 배치되어 있습니다. 총 21개의 좌석이 있으며 좌석 번호는 왼쪽부터 오른쪽으로 증가합니다.">
											</div>
											<div class="seatList">
											
											  <c:forEach var="seatList" items="${seatList}">
											    <span class="seatBox ${seatList.seatAble eq 'N' ? 'disabled' : ''}">
												  
												  <input type="checkbox"
											       name="seatBoxDtl"
											       id="seatNum_${seatList.seatNo}"
											       value="${seatList.seatNo}"
											       onclick="fnSeatChc(this, 'seatNum_${seatList.seatId}');"
											       ${seatList.seatAble eq 'N' ? 'disabled="disabled" title="예매 완료된 좌석" tabindex="-1"' : ''}
											       class="${seatList.seatAble eq 'N' ? 'disabled-input' : ''}">
												  
												  
												  
												  <label for="seatNum_${seatList.seatNo}">${seatList.seatNo}</label>
												</span>


											  </c:forEach>
											</div>
										</div>
									</div>
									<!-- //좌석선택 -->
								</div>
							</div>
							<!-- //우측 detailBox -->
						</div>
						<!-- //compareBox -->
						<!-- 선택좌석 상세보기 -->
						<div class="selectSeat_detail">
							<div class="box_tbl">
								<!-- 선택좌석 -->
								<section class="box_detail">
									<div class="box_title">
										<strong class="txt_tit">선택좌석</strong>
									</div>
									<div class="sel_seatNum">
										<span class="txt_selSeat" style="display: none;">좌석을
											선택해주세요</span> <span class="txt_selSeat selected" id="selSeatView">좌석을
											선택해주세요</span>
										<!-- 좌석번호 선택시 class="selected" 추가 -->
									</div>
								</section>
								<!-- //선택좌석 -->
								<!-- 탑승인원 및 요금 -->
								<section class="box_detail">
									<div class="tbl_type3">
										<table class="taR">
											<caption>탑승 인원에 따른 요금 정보 표</caption>
											<colgroup>
												<col style="width: 115px;">
												<col>
											</colgroup>
											<tbody>
												<tr>
													<th scope="row" class="txt_black">탑승인원 및 요금</th>
													<td id="allTotAmtLocU">0원</td>
												</tr>
												<tr>
													<th scope="row">일반 <span id="adltSeatCnt">0</span></th>
													<td id="adltTotAmt">0원</td>
												</tr>
												<tr>
													<th scope="row">초등생 <span id="chldSeatCnt">0</span></th>
													<td id="chldTotAmt">0원</td>
												</tr>
												<tr>
													<th scope="row">중고생 <span id="teenSeatCnt">0</span></th>
													<td id="teenTotAmt">0원</td>
												</tr>
											</tbody>
										</table>
									</div>
								</section>
								<!-- //탑승인원 및 요금 -->
							</div>
							<!-- 할인선택 -->
							<div class="box_tbl">

								<section class="box_detail">
									<div class="box_title">
										<strong class="txt_tit">할인선택</strong>
									</div>
									<ul class="checkList">


										<!-- 오늘 요일(월=1, ... 일=7) 구하기 -->
										<fmt:formatDate var="todayDay" value="${now}" pattern="u" />
										
										<c:choose>
										  <c:when test="${todayDay == 6 || todayDay == 7}">
										    <li><input type="radio" name="salesInfo" id="salesInfo_b"
											onclick="fnCtyPrmmDC(b,this);" value="b"> <label
											for="salesInfo_b">주말 할인<span class="price"
												id="holiMrsDc">0원</span></label></li>
										  </c:when>
										  <c:otherwise>
										    <li><input type="radio" name="salesInfo" id="salesInfo_a"
											onclick="fnCtyPrmmDC(a,this);" value="a"> <label
											for="salesInfo_a">주중 할인<span class="price"
												id="dayMrsDc">0원</span></label></li>
										  </c:otherwise>
										</c:choose>
										<!-- 왕복이 아닐겨우 단체,사전,뒷좌석할인 적용  -->
										


										<li style="font-size: 11px;">- 가장 높은 할인율이 자동 적용됩니다.
											(중복불가)</li>
									</ul>
								</section>

								<!-- //할인선택 -->
								<!-- 총 결제금액 -->
								<section class="box_detail total_price">
									<!-- 총 결재금액일 시 class="total_price" 추가 -->
									<div class="box_title">
										<strong class="txt_tit">총 결제금액</strong> <span
											class="sel_price" id="allTotAmtLocD">0원</span>
									</div>
								</section>
								<!-- //총 결제금액 -->
							</div>
						</div>
						<!-- //선택좌석 상세보기 -->
						<div class="btns btn_selectSeat">
							<a href="javascript:void(0)" id="satsChcCfmBtn"
								class="btnL btn_confirm ready btn_pop_focus"
								onclick="fnSatsChcCfm(event);">선택완료</a>
						</div>

					</div>

					<!-- 상세설명 -->
					<ul class="desc_list">

						<li>심야 시간대 출발차량의 1번부터 9번 좌석까지는 여성고객 및 노약자를 위한 좌석으로 운영되고 있습니다.
							교통 약자를 위해 배려해 주시기 바랍니다.</li>
						<li><span class="ico_square orange">색상표기 좌석</span>은 여성고객 및
							노약자를 위한 좌석입니다. 배려해 주시기 바랍니다.</li>



						<!--  <li>할인적용시에는 신용카드 결제만 가능합니다.</li> -->
						<!-- 
						<li>할인대상 노선입니다. 편도의 경우 최대10매, 왕복일경우 최대 5매까지 선택 가능합니다.</li>
						<li>중복할인이 적용되지 않으며, 할인조건에서 하나를 직접 선택하여 적용해야 합니다.</li>
						<li>할인은 성인에게만 적용됩니다.</li>
						<li>단체할인은 5~10명 사이를 선택할 경우에 적용됩니다.</li>
						<li>뒷좌석을 선택하시면, "뒷좌석 할인"이 적용될 수 있습니다.</li> 
						-->

						<li>일부 버스의 경우 실제 좌석배치와 다를 수 있습니다.</li>

					</ul>
					<!-- //상세설명 -->
				</div>

			</div>

			
				
			<input type="hidden" name="locInf" id="locInf" value="sats">
			<!-- 페이지위치 -->
			<input type="hidden" name="adtnflag" id="adtnflag" value="N">
			<!-- 페이지위치 -->
			

			<!-- 임시비밀번호 변경 -->

			<form name="lgnForm">
				<input type="hidden" id="returnUrl2" name="returnUrl" value="logout">
			</form>



		<!-- footer -->

	</div>








	<div class="remodal-overlay remodal-is-closed" style="display: none;"></div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div class="remodal remodal-is-initialized remodal-is-closed"
			data-remodal-id="modal03" role="dialog"
			data-remodal-options="closeOnOutsideClick: false"
			aria-labelledby="modal1Title" aria-describedby="modal1Desc"
			tabindex="-1">
			<div class="cont">
				<h2>왕복예매할인 안내</h2>
				<p class="txt">
					<span class="accent">왕복예매할인</span> 적용 시 예매 완료 후 승차권 매수변경이 불가합니다.<br>예매
					후 변경을 원하시면 취소 후 다시 예매 하셔야 합니다.
				</p>
				<p class="txt">왕복예매 할인을 적용하시겠습니까?</p>
			</div>
			<div class="btns">
				<button type="button" data-remodal-action="cancel"
					class="remodal-cancel" onclick="fnFeeCanc(&#39;3&#39;);">취소</button>
				<button type="button" data-remodal-action="confirm"
					class="remodal-confirm" onclick="fnFeeOk(&#39;3&#39;);">적용</button>
			</div>
			<button type="button" data-remodal-action="close"
				class="remodal-close btn-gray" onclick="fnFeeCanc(&#39;3&#39;);">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div class="remodal remodal-is-initialized remodal-is-closed"
			data-remodal-id="modal02" role="dialog"
			data-remodal-options="closeOnOutsideClick: false"
			aria-labelledby="modal1Title" aria-describedby="modal1Desc"
			tabindex="-1">
			<div class="cont">
				<h2>단체예매할인 안내</h2>
				<p class="txt">
					<span class="accent">단체예매할인</span> 적용 시 예매 완료 후 승차권 매수변경이 불가합니다.<br>예매
					후 변경을 원하시면 취소 후 다시 예매 하셔야 합니다.
				</p>
				<p class="txt">단체예매 할인을 적용하시겠습니까?</p>
			</div>
			<div class="btns">
				<button type="button" data-remodal-action="cancel"
					class="remodal-cancel" onclick="fnFeeCanc(&#39;2&#39;);">취소</button>
				<button type="button" data-remodal-action="confirm"
					class="remodal-confirm" onclick="fnFeeOk(&#39;2&#39;);">적용</button>
			</div>
			<button type="button" data-remodal-action="close"
				class="remodal-close btn-gray" onclick="fnFeeCanc(&#39;2&#39;);">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div class="remodal crew remodal-is-initialized remodal-is-closed"
			data-remodal-id="popCrew1" role="dialog" tabindex="-1">
			<!--  data-remodal-options="closeOnConfirm: false" -->
			<div class="title">
				<h2>국민안전 승무원제 시범운영 안내</h2>
			</div>
			<div class="cont">
				<img
					src="${pageContext.request.contextPath}/resources/images/img_crew_info1.jpg"
					alt="" class="crew_info">
				<div class="alt">
					<h4>국민안전 승무원이 되어 보시겠습니까?</h4>
					<p>
						국민안전 승무원 좌석을 예매하시는 고객께서는 행동요령을 숙지하여<br>유사시 도와주시기 바랍니다.
					</p>
					<ol>
						<li>1. 교통사고나 화재 등 비상상황 발생시 운전기사를 도와 승객 대피</li>
						<li>2. 승객 대피 유도시 운전기사를 도와 탈출로 확보 _ 승강구 수동사용, 비상망치</li>
						<li>3. 소화기 위치 및 사용방법</li>
						<li>4. 버스 이상 운행 및 이상 징후 포착시 운전기사에게 알림</li>
					</ol>
					<h4>혜택</h4>
					<p>고속버스 통합 홈페이지 (www.kobus.co.kr) 또는 모바일 앱 회원으로 가입후 해당 노선의 프리미엄
						고속버스 3번 좌석을 예매하였을 경우 요금의 5% 마일리지 적립 및 추가로 1% 마일리지가 적립됩니다.</p>
					<p>온라인 예매시 국민안전 승무원 좌석의 동의 여부를 확인 후 동의 시에만 마일리지 추가 적립되며 터미널
						매표소에서 예매하신 승차권은 적용되지 않습니다.</p>
				</div>
				<!--
            <p class="tit"><span class="txt_blue">국민안전 승무원이</span> 되어 보시겠습니까?</p>
            <p class="desc">국민안전 승무원 좌석을 예매하시는 고객께서는 행동요령을 숙지하여<br/>유사시 도와주시기 바랍니다.</p>
            <div class="box marT30">
                <ol>
                    <li>
                        <p class="subject"><span class="num">1</span>교통사고나 화재 등 비상상황 발생시 운전기사를 도와 승객 대피</p>
                    </li>
                    <li>
                        <p class="subject"><span class="num">2</span>승객 대피 유도시 운전기사를 도와 탈출로 확보 _ 승강구 수동사용, 비상망치</p>
                    </li>
                    <li>
                        <p class="subject"><span class="num">3</span>소화기 위치 및 사용방법</p>
                    </li>
                    <li>
                        <p class="subject"><span class="num">4</span>버스 이상 운행 및 이상 징후 포착시 운전기사에게 알림</p>
                    </li>
                </ol>
            </div>
            <h4>혜택</h4>
            <p>고속버스 통합 홈페이지 (www.kobus.co.kr) 또는 모바일 앱 회원으로 가입후 해당 노선의 프리미엄 <span class="txt_blue">고속버스 3번 좌석</span>을 예매하였을 경우 <span class="txt_blue">요금의 5% 마일리지 적립 및 추가로 1% 마일리지가 적립</span>됩니다.</p>
            <ul class="desc_list">
                <li>온라인 예매시 국민안전 승무원 좌석의 동의 여부를 확인 후 동의 시에만 마일리지 추가 적립되며 <span class="txt_black">터미널 매표소에서 예매하신 승차권은 적용되지 않습니다.</span></li>
            </ul>
            <div class="btns" style="border-top:0">
                <button data-remodal-action="cancel" class="remodal-cancel">거부</button>
                <button class="remodal-confirm" onclick="popCrewOpen(2);">동의</button>
            </div>
-->
			</div>
			<div class="btn_wrap1">
				<a href="javascript:void(0)" onclick="popCrewOpen(2, &#39;Y&#39;);">동의</a>
				<a href="javascript:void(0)" data-remodal-action="cancel"
					onclick="popCrewClose(1, &#39;N&#39;);">거부</a>
			</div>
		</div>
	</div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div class="remodal crew remodal-is-initialized remodal-is-closed"
			data-remodal-id="popCrew2" role="dialog" tabindex="-1">
			<!--  data-remodal-options="closeOnConfirm: false" -->
			<div class="title">
				<h2>국민안전 승무원제 시범운영 안내</h2>
			</div>
			<div class="cont">
				<img
					src="${pageContext.request.contextPath}/resources/images/img_crew_info2.jpg"
					alt="" class="crew_info">

				<!-- 대체텍스트 -->
				<ul class="alt">
					<li><span>1. 교통사고나 화재 등 비상상황 발생시 운전기사를 도와 승객 대피</span>
						<ul>
							<li><span>1. 교통사고나 화재 등 비상상황 발생</span></li>
							<li><span>2. 운전기사를 도와 안전지대로 승객 대피 유도</span></li>
						</ul></li>
					<li><span>2. 승객 대피 유도시 운전기사를 도와 탈출로 확보 _ 승강구 수동사용, 비상망치</span>
						<ul>
							<li><span>승강구 수동사용</span>
								<ul>
									<li><span>1. 우측으로 돌려서 사용</span></li>
									<li><span>2. 승강구를 밀어 탈출</span></li>
								</ul></li>
							<li><span>비상망치</span>
								<ul>
									<li><span>1. 버스양옆에 위치</span></li>
									<li><span>2. 창문의 가장자리를 가격</span></li>
								</ul></li>
						</ul></li>
					<li><span>3. 소화기 위치 및 사용방법</span>
						<ul>
							<li><span>1. 운전석 뒤, 맨 뒷자석 뒤에 위치</span></li>
							<li><span>2. 안전핀 제거</span></li>
							<li><span>3. 화재방향으로 빗자루 쓸듯이 분사</span></li>
						</ul></li>
					<li><span>4. 버스 이상 운행 및 이상 징후 포착시 운전기사에게 알림</span>
						<ul>
							<li><span>1. 이상 운행 및 이상 징후 포착</span></li>
							<li><span>2. 운전기사에게 통지하여 사고 예방</span></li>
						</ul></li>
				</ul>
				<!--
            <ol>
                <li>
                    <p class="subject"><span class="num">1</span>교통사고나 화재 등 비상상황 발생시 운전기사를 도와 승객 대피</p>
                    <img src="/images/page/img_crew1.jpg" alt="">
                    <ul>
                        <li class="w50">
                            <img src="/images/page/img_m_crew1.jpg" alt="" class="m"> 1. 교통사고나 화재 등 비상상황 발생
                        </li>
                        <li class="w50">
                            <img src="/images/page/img_m_crew2.jpg" alt="" class="m"> 2. 운전기사를 도와 안전지대로 승객 대피 유도
                        </li>
                    </ul>
                </li>
                <li>
                    <p class="subject"><span class="num">2</span>승객 대피 유도시 운전기사를 도와 탈출로 확보 _ <span class="gray">승강구 수동사용, 비상망치</span></p>
                    <ul>
                        <li class="w50">
                            <p>승강구 수동사용</p>
                            <img src="/images/page/img_crew2.jpg" alt="">
                            <img src="/images/page/img_m_crew3.jpg" alt="" class="m">
                            <ul>
                                <li class="w50">1. 우측으로 돌려서 사용</li>
                                <li class="w50">2. 승강구를 밀어 탈출</li>
                            </ul>
                        </li>
                        <li class="w50">
                            <p>비상망치</p>
                            <img src="/images/page/img_crew3.jpg" alt="">
                            <img src="/images/page/img_m_crew4.jpg" alt="" class="m">
                            <ul>
                                <li class="w50">1. 버스양옆에 위치</li>
                                <li class="w50">2. 창문의 가장자리를 가격</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <p class="subject"><span class="num">3</span>소화기 위치 및 사용방법</p>
                    <img src="/images/page/img_crew4.jpg" alt="">
                    <ul>
                        <li class="w50">
                            <img src="/images/page/img_m_crew5.jpg" alt="" class="m"> 1. 운전석 뒤, 맨 뒷자석 뒤에 위치
                            <img src="/images/page/img_m_crew6.jpg" alt="" class="m">
                        </li>
                        <li class="w25">2. 안전핀 제거</li>
                        <li class="w25">3. 화재방향으로 빗자루 쓸듯이 분사</li>
                    </ul>
                </li>
                <li>
                    <p class="subject"><span class="num">4</span>버스 이상 운행 및 이상 징후 포착시 운전기사에게 알림</p>
                    <img src="/images/page/img_crew5.jpg" alt="">
                    <ul class="mb10">
                        <li class="w50">
                            <img src="/images/page/img_m_crew7.jpg" alt="" class="m"> 1. 이상 운행 및 이상 징후 포착
                        </li>
                        <li class="w50">
                            <img src="/images/page/img_m_crew8.jpg" alt="" class="m"> 2. 운전기사에게 통지하여 사고 예방
                        </li>
                    </ul>
                </li>
            </ol>
            -->
				<!--
            <div class="btns" style="border-top:0">
                <button data-remodal-action="cancel" class="remodal-cancel" onclick="alert('당신은 국민안전 승무원이 되셨습니다.')">닫기</button>
            </div>
-->
			</div>
			<div class="btn_wrap2">
				<a href="javascript:void(0)" id="closeCrew"
					data-remodal-action="cancel"
					onclick="popCrewClose(2, &#39;Y&#39;);">닫기</a>
			</div>
		</div>
	</div>
	<div class="remodal-wrapper plogin remodal-is-closed"
		style="display: none;">
		<div
			class="remodal w590 popLogin full remodal-is-initialized plogin remodal-is-closed"
			data-remodal-id="popLogin"
			data-remodal-options="closeOnOutsideClick: false, modifier: plogin"
			role="dialog" tabindex="-1">
			<div class="loading pop" id="loading"
				style="height: 1293px; top: 180px;">
				<p class="load" style="margin-left: -53px;">
					<span class="sr-only">로딩중입니다</span>
				</p>
			</div>
			<div class="title type_blue">로그인</div>
			<form id="lgnUsrInfForm" name="lgnUsrInfForm">
				<div class="cont">
					<div class="login_wrap pop">
						<div class="box_login">
							<h3 class="pop_h3 mob_h3">회원 로그인</h3>
							<p class="h3_desc">회원으로 예매하시면 예매 후 아이디/비밀번호로 간편하게 조회가 가능합니다.</p>
							<div class="inner">
								<fieldset>
									<legend>회원로그인</legend>
									<ul class="loginList">
										<li>
											<div class="box_inputForm">
												<label for="usrId" class="label">아이디</label> <span
													class="box_label"> <input type="text" name="usrId"
													placeholder="아이디를 입력하세요" id="usrId" class="input"
													onkeyup="fnIcoCheck(this);">
												</span>
											</div>
										</li>
										<li>
											<div class="box_inputForm">
												<label for="usrPwd" class="label">비밀번호</label> <span
													class="box_label">
													<button type="button" class="transkey_btn" data-id="usrPwd"
														onclick="transkeyShow(this)">가상키패드 입력</button> <input
													type="password" name="usrPwd" id="usrPwd" tabindex="-1"
													placeholder="비밀번호를 입력하세요" class="input"
													onkeyup="fnIcoCheck(this);" data-tk-kbdtype="qwerty"
													onfocus="tk.onKeyboard(this);">
												</span>
											</div>
										</li>
									</ul>
								</fieldset>
								<input type="hidden" id="popUpDvs" name="popUpDvs" value="Y">
								<p class="btn_squareBox">
									<button type="button" class="btn_confirm ready"
										id="btn_confirm" onclick="fnMngChkCfm(this);">로그인</button>
								</p>



								<div class="box_searchId col2">
									<a href="javascript:lgnSearchId();"><span
										class="ico_searchId">아이디찾기</span></a> <a
										href="javascript:lgnSearchPwd();"><span
										class="ico_searchPW">비밀번호찾기</span></a>
								</div>
							</div>
						</div>
						<div class="box_login non-member">
							<div class="inner">
								<h3 class="pop_h3 mob_h3">비회원 예매</h3>
								<p class="h3_desc">비회원 예매 시 일부 서비스 이용이 제한됩니다.</p>
								<p class="btn_squareBox">
									<button type="button" class="btn_normal"
										onclick="javascript:fnNonUsrMrs();">비회원 예매</button>
								</p>
								<!--fnNonUsrMrs() 각 페이지의 해당 함수의 기능제어 요망  -->
							</div>
						</div>
						<div class="bg_grayBox">
							<p class="txt_desc">고속버스 통합회원으로 가입하시면 홈페이지와 모바일앱과의 예매내역 공유로더욱
								편리한 고속버스 이용이 가능합니다.</p>
							<div class="box_joinUs">
								<a href="javascript:mbrsJoin();" class="btn_joinUs"><span
									class="ico_joinUs">통합회원가입</span></a>
							</div>
						</div>
					</div>
				</div>
				<input type="hidden" id="hidfrmId" name="hidfrmId"
					value="lgnUsrInfForm"><input type="hidden"
					id="transkeyUuid_lgnUsrInfForm" name="transkeyUuid_lgnUsrInfForm"
					value="9df453f5f197a4018e245e89cfab701e6ab26138f18b947641710bec47c943dd"><input
					type="hidden" id="transkey_usrPwd_lgnUsrInfForm"
					name="transkey_usrPwd_lgnUsrInfForm" value=""><input
					type="hidden" id="transkey_HM_usrPwd_lgnUsrInfForm"
					name="transkey_HM_usrPwd_lgnUsrInfForm" value="">
			</form>
			<div class="pop_banner_wrap">
				<span class="txt_banner">예매부터 탑승까지 원스탑 모바일 서비스!</span> <strong
					class="tit_ban">고속버스 모바일앱</strong> <span class="bg_ban mobileApp">고속버스
					모바일앱</span>
			</div>
			<button type="button" data-remodal-action="close"
				class="remodal-close">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal pop_change_password remodal-is-initialized remodal-is-closed"
			data-remodal-id="popChangePassword" role="dialog"
			data-remodal-options="closeOnOutsideClick:false" tabindex="-1">
			<form name="pwdModLsapForm" id="pwdModLsapForm" method="post"
				onsubmit="return false;">
				<input type="hidden" name="mbr_mng_no" id="mbr_mng_no" value="">
				<div class="title">비밀번호 변경</div>
				<div class="cont">
					<div id="oldPwdChgDiv" style="display: none;">
						<h3 class="pop_h3">고객님께서는 오랜 기간(180일) 비밀번호를 변경하지 않으셨습니다.</h3>
						<p class="desc">
							동일한 비밀번호를 장기간 사용할 경우 개인정보 도용 및 유출 등의 위험이 있습니다.<br> 비밀번호를
							변경해주세요.
						</p>
					</div>
					<div id="tmpPwdChgDiv" style="display: none;">
						<h3 class="pop_h3">스스로 지키는 개인정보! 비밀번호를 변경해주세요.</h3>
						<p class="desc">
							현재 고객님께서는 <span class="txt_red">임시로 발급된 비밀번호</span>를 사용하고 계십니다.<br>
							고객님의 소중한 개인정보를 안전하게 지키기 위해 비밀번호를 변경해 주세요.<br>개인정보 도용을 최대한
							방지하기 위해 <span class="txt_red">비밀번호 변경절차</span>를 거치신 후에만 서비스 이용이
							가능합니다.
						</p>
					</div>
					<p class="desc">
						<strong>[안전한 비밀번호 설정 방법] <span class="txt_red">영문,
								숫자 조합하여 8자리 이상</span></strong>
					</p>
					<div class="box_inputForm">
						<label for="usrOldPw" class="label">현재 비밀번호</label> <span
							class="box_label">
							<button type="button" class="transkey_btn" data-id="usrOldPw"
								onclick="transkeyShow(this)">가상키패드 입력</button> <input
							type="password" name="usrOldPw" id="usrOldPw" tabindex="-1"
							placeholder="현재 비밀번호를 입력하세요" class="input"
							onkeyup="fnIcoCheck();" data-tk-kbdtype="qwerty"
							onfocus="tk.onKeyboard(this);">
						</span> <span class="ico_complete" style="display: none;">가능</span>
						<!-- 사용가능 아이콘 -->
					</div>




					<div class="box_inputForm" id="pwdDiv">
						<label for="usrNewPwd" class="label">새 비밀번호</label> <span
							class="box_label">
							<button type="button" class="transkey_btn" data-id="usrNewPwd"
								onclick="transkeyShow(this)">가상키패드 입력</button> <input
							type="password" name="usrNewPwd" id="usrNewPwd" tabindex="-1"
							placeholder="영문,숫자 8자리 이상" class="input"
							onkeyup="fnPwdLenCheck(this);" onblur="fnPwdVldtCheck(this);"
							data-tk-kbdtype="qwerty" onfocus="tk.onKeyboard(this);">
						</span> <span class="ico_complete" style="display: none;">가능</span>
						<!-- 사용가능 아이콘 -->
					</div>




					<div class="box_inputForm" id="pwdCfmDiv">
						<label for="pwdCfmCheck" class="label">새 비밀번호 확인</label> <span
							class="box_label">
							<button type="button" class="transkey_btn" data-id="pwdCfmCheck"
								onclick="transkeyShow(this)">가상키패드 입력</button> <input
							type="password" name="pwdCfmCheck" id="pwdCfmCheck" tabindex="-1"
							placeholder="새 비밀번호를 재입력하세요" class="input"
							onkeyup="fnPwdCfmCheck(this);" onblur="fnPwdCfmCheck(this);"
							data-tk-kbdtype="qwerty" onfocus="tk.onKeyboard(this);">
						</span> <span class="ico_complete" style="display: none;">가능</span>
					</div>




					<ul>
						<li>비밀번호 변경 시 고속버스 모바일앱 에서도 동일하게 적용됩니다.</li>
					</ul>
					<p class="btn_squareBox" id="oldPwdChgP" style="display: none;">
						<button type="button" class="btn_confirm" onclick="fnUpdatePwd();">변경하기</button>
						<button type="button" class="btn_normal" onclick="nextChgPwd();">180일
							뒤에 변경하기</button>
					</p>
					<p class="btn_squareBox" id="tmpPwdChgP" style="display: none;">
						<button type="button" class="btn_confirm" onclick="fnUpdatePwd();">변경하기</button>
					</p>
					<div class="pop_banner_wrap">
						<span class="txt_banner">예매부터 탑승까지 원스탑 모바일 서비스!</span> <strong
							class="tit_ban">고속버스 모바일앱</strong> <span class="bg_ban mobileApp">고속버스
							모바일앱</span>
					</div>
				</div>
				<button data-remodal-action="close" class="remodal-close"
					onclick="logoutLgn();">
					<span class="sr-only">닫기</span>
				</button>
				<input type="hidden" id="hidfrmId" name="hidfrmId"
					value="pwdModLsapForm"><input type="hidden"
					id="transkeyUuid_pwdModLsapForm" name="transkeyUuid_pwdModLsapForm"
					value="9df453f5f197a4018e245e89cfab701e6ab26138f18b947641710bec47c943dd"><input
					type="hidden" id="transkey_usrOldPw_pwdModLsapForm"
					name="transkey_usrOldPw_pwdModLsapForm" value=""><input
					type="hidden" id="transkey_HM_usrOldPw_pwdModLsapForm"
					name="transkey_HM_usrOldPw_pwdModLsapForm" value=""><input
					type="hidden" id="transkey_usrNewPwd_pwdModLsapForm"
					name="transkey_usrNewPwd_pwdModLsapForm" value=""><input
					type="hidden" id="transkey_HM_usrNewPwd_pwdModLsapForm"
					name="transkey_HM_usrNewPwd_pwdModLsapForm" value=""><input
					type="hidden" id="transkey_pwdCfmCheck_pwdModLsapForm"
					name="transkey_pwdCfmCheck_pwdModLsapForm" value=""><input
					type="hidden" id="transkey_HM_pwdCfmCheck_pwdModLsapForm"
					name="transkey_HM_pwdCfmCheck_pwdModLsapForm" value="">
			</form>
		</div>
	</div>
	<div class="remodal-wrapper plogin remodal-is-closed"
		style="display: none;">
		<div class="remodal remodal-is-initialized plogin remodal-is-closed"
			data-remodal-id="popBohun1"
			data-remodal-options="closeOnOutsideClick: false, modifier: plogin"
			role="dialog" tabindex="-1">
			<div class="nation">
				<h2 class="nation_tit">보훈정보 입력</h2>
				<form name="bohnCheckForm" id="bohnCheckForm" class="nation_wrap">
					<input type="hidden" name="express" id="express" value="">
					<input type="hidden" name="bohnDeprCd" id="bohnDeprCd" value="010">
					<!-- 출발지코드 -->
					<input type="hidden" name="bohndDeprNm" id="bohnDeprNm"
						value="서울경부">
					<!-- 출발지명 -->
					<input type="hidden" name="bohnArvlCd" id="bohnArvlCd" value="200">
					<!-- 도착지코드 -->
					<input type="hidden" name="bohnArvlNm" id="bohnArvlNm" value="강릉">
					<!-- 도착지명 -->
					<input type="hidden" name="bohnDeprDt" id="bohnDeprDt"
						value="20250621">
					<!-- 출발일 -->
					<input type="hidden" name="bohnDeprTime" id="bohnDeprTime"
						value="072000">
					<!-- 출발시각 -->


					<table class="nation_table">
						<colgroup>
							<col class="first">
							<col class="second">
						</colgroup>
						<tbody>
							<tr>
								<td class=" t_border" bgcolor="#eeeeee" scope=""
									style="width: 160px"><label for="number">보훈번호</label></td>
								<td class=" t_border" colspan="3"
									style="width: 630px; text-align: left; padding-left: 20px;">
									<input type="text" name="number" id="number" maxlength="20"
									required="" placeholder="보훈번호를 입력해주세요" size="50">
								</td>

							</tr>
							<tr>
								<td class=" t_border" bgcolor="#eeeeee" scope=""><label
									for="birth">생년월일</label></td>
								<td class=" t_border" colspan="3"
									style="text-align: left; padding-left: 20px;"><input
									type="text" name="birth" id="birth" maxlength="8" required=""
									placeholder="생년월일을 입력해주세요" size="30"> <span
									class="input_txt"> * 생년월일 8자리 (예 : 19910831)</span></td>
							</tr>
							<tr>
								<td class=" t_border" bgcolor="#eeeeee" scope=""
									style="width: 160px"><label for="hpnumber">휴대폰 번호</label></td>
								<td class=" t_border" colspan="3"
									style="text-align: left; padding-left: 20px;"><input
									type="text" name="hpnumber" id="hpnumber" maxlength="13"
									required="" placeholder="휴대폰번호를 입력하세요" size="30"
									style="width: 200px"> <span class="input_txt"> *
										휴대폰번호 11자리, 숫자만 입력 하세요 (예 : 01012345678)</span></td>
							</tr>
							<tr>
								<td class=" t_border" bgcolor="#eeeeee" scope=""><label>동반자
										여부</label></td>
								<td class=" t_border" colspan="3"
									style="text-align: left; height: 30px; padding-left: 20px;">
									<input type="radio" value="N" name="companion_check"
									required="" id="check_N"><label for="check_N"><span
										class="input_txt">동반자 미포함</span></label> <input type="radio" value="Y"
									name="companion_check" required="" id="check_Y"
									style="margin-left: 20px;"><label for="check_Y"><span
										class="input_txt">동반자 포함</span></label>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="nation_infor">
						<ul>
							<li><span style="color: #000; font-size: 12px">•</span> 보훈번호
								인증 후 유공할인 및 무임을 사용하실 수 있습니다.</li>
							<li><span style="color: #000; font-size: 12px">•</span> 동반자
								할인은 '애국지사', '1급상이(장해)자' 보훈자에 한해 제공하며, 대상 권종과 같은 할인혜택을 받으실수 있습니다.
							</li>
							<li><span style="color: #000; font-size: 12px">•</span> 승차 시
								반드시 국가유공자 확인증을 지참하여 주시기 바랍니다.(확인 요청 시 제시)</li>
						</ul>
					</div>
					<div class="Qualification">
						<p>
							<input type="checkbox" name="agree1" id="agree1" value="Y"
								required=""> <label for="agree1"><strong
								style="vertical-align: top; font-size: 14px">운임 할인을 위한
									국가유공자 자격정보 수집/활용 동의(필수)</strong></label>
						</p>
					</div>
					<table class="nation_table agree">
						<tbody>
							<tr>
								<td bgcolor="#eeeeee" class=" t_border" colspan="2" scope="col"
									width="20%" style="font-weight: bold">수집항목</td>
								<td bgcolor="#eeeeee" class=" t_border" colspan="2" scope="col"
									width="20%" style="font-weight: bold">제공목적</td>
								<td bgcolor="#eeeeee" class=" t_border" colspan="2" scope="col"
									width="20%" style="font-weight: bold">이용기간</td>
							</tr>
							<tr>
								<td class=" t_border" colspan="2">생년월일, 보훈번호</td>
								<td class=" t_border" colspan="2">운임할인 적용(할인율 적용)</td>
								<td class=" t_border" colspan="2">목적 달성 후 즉시 파기</td>
							</tr>
						</tbody>
					</table>
					<div class="Qualification Qualification2">
						<p>
							<input type="checkbox" name="agree2" id="agree2" value="Y"
								required=""> <label for="agree2"><strong
								style="vertical-align: top; font-size: 14px">자격정보 제3자
									제공 동의(필수)</strong></label>
						</p>
					</div>
					<table class="nation_table agree">
						<tbody>
							<tr>
								<td bgcolor="#eeeeee" class=" t_border" colspan="2" scope="col"
									width="12%" style="font-weight: bold">제공항목</td>
								<td bgcolor="#eeeeee" class=" t_border" colspan="2" scope="col"
									width="12%" style="font-weight: bold">제공받는자</td>
								<td bgcolor="#eeeeee" class=" t_border" colspan="2" scope="col"
									width="18%" style="font-weight: bold">제공목적</td>
								<td bgcolor="#eeeeee" class=" t_border" colspan="2" scope="col"
									width="15%" style="font-weight: bold">이용기간</td>
							</tr>
							<tr>
								<td class=" t_border" colspan="2">생년월일, 보훈번호</td>
								<td class=" t_border" colspan="2">국가보훈처</td>
								<td class=" t_border" colspan="2">운임할인 적용(할인율 적용)</td>
								<td class=" t_border" colspan="2">목적 달성 후 즉시 파기</td>
							</tr>
						</tbody>
					</table>

					<p class="submit">
						<button class="cancel" value="취소" name="cancel"
							onclick="fnBohnCan()">취소</button>
						<button type="button" value="확인" name="submit"
							onclick="fnBohnOk()">확인</button>
					</p>
				</form>
				<div class="close" onclick="fnBohnCan()">
					<span class="close1"></span> <span class="close2"></span>
				</div>
			</div>
		</div>
	</div>
	<div class="remodal-wrapper plogin remodal-is-closed"
		style="display: none;">
		<div class="remodal remodal-is-initialized plogin remodal-is-closed"
			data-remodal-id="popNhis1"
			data-remodal-options="closeOnOutsideClick: false, modifier: plogin"
			role="dialog" tabindex="-1">
			<div class="nation">
				<h2 class="nation_tit">사원 정보 입력</h2>
				<form name="nhisCheckForm" id="nhisCheckForm" class="nation_wrap">

					<table class="nation_table">
						<colgroup>
							<col class="first">
							<col class="second">
						</colgroup>
						<tbody>
							<tr>
								<td class=" t_border" bgcolor="#eeeeee" scope=""
									style="width: 160px"><label for="nhis_number">사원번호</label></td>
								<td class=" t_border" colspan="3"
									style="width: 630px; text-align: left; padding-left: 20px;">
									<input type="text" name="number" id="nhis_number" maxlength="6"
									required="" placeholder="6자리로 입력해주세요 (예 : 123456)" size="50"
									style="width: 300px">
								</td>

							</tr>
							<tr>
								<td class=" t_border" bgcolor="#eeeeee" scope=""
									style="width: 160px"><label for="nhis_hpnumber">휴대폰
										번호</label></td>
								<td class=" t_border" colspan="3"
									style="width: 630px; text-align: left; padding-left: 20px;">
									<input type="text" name="hpnumber" id="nhis_hpnumber"
									maxlength="13" required="" placeholder="휴대폰번호를 입력하세요" size="30"
									style="width: 200px">
								</td>
							</tr>
						</tbody>
					</table>
					<div class="nation_infor">
						<ul>
							<li><span style="color: #000; font-size: 12px">•</span> 건보공단
								할인을 받기 위해서는 사원 번호 인증이 필요합니다.</li>
							<li><span style="color: #000; font-size: 12px">•</span> 승차 시
								반드시 사원증을 지참하여 주시기 바랍니다.(확인 요청 시 제시)</li>
						</ul>
					</div>
					<div class="Qualification">
						<p>
							<input type="checkbox" name="nhis_agree1" id="nhis_agree1"
								value="Y" required=""> <label for="nhis_agree1"><strong
								style="vertical-align: top; font-size: 14px">운임 할인을 위한
									건강보험공단 사원정보 수집/활용 동의(필수)</strong></label>
						</p>
					</div>
					<table class="nation_table agree">
						<tbody>
							<tr>
								<td bgcolor="#eeeeee" class=" t_border" colspan="2" scope="col"
									width="20%" style="font-weight: bold">수집항목</td>
								<td bgcolor="#eeeeee" class=" t_border" colspan="2" scope="col"
									width="20%" style="font-weight: bold">제공목적</td>
								<td bgcolor="#eeeeee" class=" t_border" colspan="2" scope="col"
									width="20%" style="font-weight: bold">이용기간</td>
							</tr>
							<tr>
								<td class=" t_border" colspan="2">사원번호, 휴대폰 번호</td>
								<td class=" t_border" colspan="2">운임할인 적용(할인율 적용)</td>
								<td class=" t_border" colspan="2">목적 달성 후 즉시 파기</td>
							</tr>
						</tbody>
					</table>
					<div class="Qualification Qualification2">
						<p>
							<input type="checkbox" name="nhis_agree2" id="nhis_agree2"
								value="Y" required=""> <label for="nhis_agree2"><strong
								style="vertical-align: top; font-size: 14px">사원정보 제3자
									제공 동의(필수)</strong></label>
						</p>
					</div>
					<table class="nation_table agree">
						<tbody>
							<tr>
								<td bgcolor="#eeeeee" class=" t_border" colspan="2" scope="col"
									width="12%" style="font-weight: bold">제공항목</td>
								<td bgcolor="#eeeeee" class=" t_border" colspan="2" scope="col"
									width="12%" style="font-weight: bold">제공받는자</td>
								<td bgcolor="#eeeeee" class=" t_border" colspan="2" scope="col"
									width="18%" style="font-weight: bold">제공목적</td>
								<td bgcolor="#eeeeee" class=" t_border" colspan="2" scope="col"
									width="15%" style="font-weight: bold">이용기간</td>
							</tr>
							<tr>
								<td class=" t_border" colspan="2">사원번호, 휴대폰 번호</td>
								<td class=" t_border" colspan="2">건강보험공단</td>
								<td class=" t_border" colspan="2">운임할인 적용(할인율 적용)</td>
								<td class=" t_border" colspan="2">목적 달성 후 즉시 파기</td>
							</tr>
						</tbody>
					</table>

					<p class="submit">
						<button class="cancel" value="취소" name="cancel"
							onclick="fnNhisCan()">취소</button>
						<button type="button" value="확인" name="submit"
							onclick="fnNhisOk()">확인</button>
					</p>
				</form>

				<div class="close" onclick="fnNhisCan()">
					<span class="close1"></span> <span class="close2"></span>
				</div>
			</div>
		</div>
	</div>

</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/js/MrsCfmInf.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/js/qrcode.js"></script>
	<script type="text/javascript"
	src="${pageContext.request.contextPath}/resources/js/jquery.qrcode.js"></script>
<script>
  $(function() {
	  const qrText = $("#qrText");
      const qrImg = $("#qrImg");
      const qrImgBox = $("#qrImgBox");
  
      // Error 보여주기
      const showError = () => {
          qrText.addClass("error-input error");
      };
  
      // Error 제거하기
      const removeError = () => {
          qrText.removeClass("error-input error");
      };
  
      // QR 코드 생성 함수
      const generateQRCode = () => {
          if (qrText.val().length > 0) {
          qrImg.attr("src", `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=\${qrText.val()}`);
          qrImgBox.addClass("showImg");
          removeError();
          } else {
          showError();
          }
      };
  
      // input 입력 시 에러 제거
      qrText.on("input", () => {
          if (qrText.val().length > 0) {
          removeError();
          }
      });

      generateQRCode();
  });
</script>
<style>
.com_pop_wrap {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-family: 'CJONLYONENEW';
    z-index: 100
}

.com_pop_fog {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000
}

.com_pop {
    display: none;
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: #fff;
    box-shadow: 0 0 24px 8px rgba(0, 0, 0, 0.3);
    z-index: 99
}

.com_pop_header {
    position: relative;
    height: 60px;
    padding-left: 20px;
    line-height: 60px;
    font-weight: 500;
    font-size: 20px;
    text-align: left;
    color: #fff;
    vertical-align: middle;
    background-color: #000;
    z-index: 98
}

.com_pop_header span {
    position: relative;
    top: 1px
}

.com_pop_btn_close {
    position: absolute;
    right: 24px;
    top: 20px;
    display: block;
    width: 20px;
    height: 20px;
    font-size: 0;
    background: transparent url('./../../images/giftstore/common/bg_popup_close.png') left top scroll no-repeat
}

.com_pop_container {
    padding: 20px;
    background-color: #fff
}

.com_pop_olist {
    position: relative;
    margin-top: 10px;
    padding-left: 14px;
    padding-bottom: 5px;
    font-weight: 300;
    font-size: 14px;
    color: #6a6f77;
    line-height: 18px
}

.com_pop_olist:before {
    content: '';
    position: absolute;
    left: 4px;
    top: 6px;
    width: 5px;
    height: 5px;
    background-color: #9197a3;
    border-radius: 50%
}


</style>
<style>
.seat_detail > ul li .txt_blue {
	width: 55px;
}
</style>

<script>
$("#recpCanFrm > button").on("click", function () {
	
})

</script>



		<!-- breadcrumb -->

		<nav id="new-kor-breadcrumb">
			<div class="container">

				<ol class="breadcrumb-list">
					<li><i class="ico ico-home"></i><span class="sr-only">홈</span></li>

				<li>
					<div class="dropdown-wrap breadcrumb-select">



						<a href="javascript:void(0)" class="btn-dropdown" title="대메뉴 선택"
							aria-expanded="false"> <span class="text">고속버스예매</span><i
							class="ico ico-dropdown-arrow"></i></a>


						<ul class="dropdown-list">

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

						<ul class="dropdown-list">
							<li><a href="/koBus/region.do">고속버스예매</a></li>
							<li class="selected"><a href="javascript:void(0)"
								title="선택됨">예매확인/취소/변경</a></li>
							<li><a href="#">영수증발행</a></li>
						</ul>
					</div>
				</li>
			</ol>

			</div>
		</nav>


		<article id="new-kor-content" class="full">

			

			

			<div class="title_wrap checkTicketingT" style="display: none;">



				<a href="https://www.kobus.co.kr/mrs/mrscfm.do#" class="back">back</a>
				<a href="https://www.kobus.co.kr/mrs/mrscfm.do#" class="mo_toggle">메뉴</a>


				<h2>예매확인/취소/변경</h2>
			</div>


			<!-- 타이틀 -->
			<div class="content-header"
				data-page-title="예매확인/취소/변경 | 고속버스예매 | 고속버스통합예매">
				<div class="container">
					<div class="title-area">
						<h2 class="page-title">예매확인/취소/변경</h2>
					</div>
					<!-- 광고 배너 추후 추가 예정 -->
					<!-- <iframe src="/html/_ad-frame.html" title="광고 프레임" class="ad-frame ad-frame-title"></iframe> -->
				</div>
			</div>

			<div class="content-body">
				<div class="container">
					<!-- 광고 배너 추후 추가 예정 -->
					<div class="banner-group type-row-A" style="margin-bottom: 16px;">
						<div class="bnr_app bnr_pc">
						모바일에서도 언제 어디서나 도착시간 조회! <strong>고속버스 모바일앱</strong>
					</div>
					</div>

					<div class="tab_wrap tab_type1">
						<ul class="tabs col2 blue">
							<li class="active"><a href="javascript:void(0)" onclick=""
								title="선택됨">예매내역</a></li>
							<li><a href="javascript:void(0)" onclick="">취소내역</a></li>
						</ul>
						<!-- 예매내역 -->
						<div class="tab_conts" style="display: block;">
							<h3 class="sr-only">예매내역</h3>
							<input type="hidden" name="extrComp" id="extrComp" value="">
							<!-- 거래처코드 -->

							<div class="box_detail_info noData" style="display: ${empty resvList ? 'block' : 'none'};">
								<p>예매내역이 존재하지 않습니다.</p>
							</div>

			
						<c:forEach var="resv" items="${resvList}">
						
							<!-- 홈티켓 form -->
							<form id="mrsCfmInfolistFrm0" name="mrsCfmInfolistFrm0"
								action="https://www.kobus.co.kr/mrs/mrshtckpub.ajax">

								<input type="hidden" name="nonMbrsNo" value="">
								<!-- 비회원 회원번호 -->


								<input type="hidden" name="mrsMrnpNo" value="20250619418950">
								<input type="hidden" name="mrsMrnpSno" value="01"> <input
									type="hidden" name="prmmDcDvsCd" value="0"> <input
									type="hidden" name="rtrpMrsYn" value="N"> <input
									type="hidden" name="pynDvsCd" value="2"> <input
									type="hidden" name="pynDtlCd" value="s"> <input
									type="hidden" name="payNm" value="네이버페이"> <input
									type="hidden" name="recNcnt1" value="1"> <input
									type="hidden" name="satsNo" id="satsNo" value="05">
								<!-- 예매단위 좌석 -->


								<input type="hidden" name="mrsMrnpNoEnc1" id="mrsMrnpNoEnc1"
									value=""
									style="width: 100%"> <input type="hidden"
									name="mrsMrnpNoEnc2" id="mrsMrnpNoEnc2" value=""
									style="width: 100%">
									
									
									<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
							</form>
							<!-- 시간변경 form -->
							
							
							<form id="mrsTmznlistFrm0" name="mrsTmznlistFrm0"
								action="/modifyReservations.do" method="post">
								<input type="hidden" name="nonMbrsNo" value="">
								<!-- 비회원 회원번호 -->

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
								<input type="hidden" name="alcnDeprCd" value="010">
								<!-- 배차출발지코드 -->
								<input type="hidden" name="alcnArvlCd" value="200">
								<!-- 배차도착지코드 -->
								<input type="hidden" name="busGrade" value="${resv.busGrade }">
								<!-- 등급 -->
								<input type="hidden" name="aduCount" value="${resv.aduCount }">
								<!-- 일반매수 -->
								<input type="hidden" name="chdCount" value="${resv.chdCount }">
								<!-- 초등매수 -->
								<input type="hidden" name="stuCount" value="${resv.stuCount }">
								<!-- 중고매수 -->
								<input type="hidden" name="rideDateStr" value="${fn:substringBefore(resv.rideDateStr, ' ')}">
								<!-- 출발날짜 -->
								<input type="hidden" name="rideTimeStr" value="${fn:substringAfter(resv.rideDateStr, ' ')}">
								<!-- 출발시간 -->


								<input type="hidden" name="amount" value="${resv.amount }">
								<!-- 결제금액-->
								<input type="hidden" name="payMethod" value="${resv.payMethod }">
								<!-- 지불구분코드 : 마일리지 추가 -->
								<input type="hidden" name="tissuStaCd" value="6"> <input
									type="hidden" name="pynDtlCd" value="s"> <input
									type="hidden" name="adtnPrdUseClsCd" value="3"> <input
									type="hidden" name="adtnCpnNo" value=" "> <input
									type="hidden" name="satsNo" id="satsNo" value="05">
								<!-- 예매단위 좌석 -->
								<!-- 20210618 비회원 예매휴대폰번호 yahan -->
								<input type="hidden" name="mrspMbphNo" id="mrspMbphNo" value="">
								
								<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
								
							</form>
							<!-- 예매취소 form -->
							<form id="recpCanFrm" name="recpCanFrm">

								<%-- <input type="hidden" name="nonMbrsNo" id="nonMbrsNo" value="${resv.nonMbrsNo}"> --%>
								<input type="hidden" name="mrsMrnpno" id="mrsMrnpno" value="${resv.resId}">
								<input type="hidden" name="type" id="type" value="">
								<input type="hidden" name="mrsMrnpsno" id="mrsMrnpsno" value="${resv.arrRegCode}">
								<input type="hidden" name="alcnDeprDt" id="alcnDeprDt" value="${fn:substringBefore(resv.rideDateStr, ' ')}">
								<input type="hidden" name="alcnDeprTime" id="alcnDeprTime" value="${fn:substringAfter(resv.rideDateStr, ' ')}">
								<input type="hidden" name="deprnNm" id="deprnNm" value="${resv.deprRegName}">
								<input type="hidden" name="arvlNm" id="arvlNm" value="${resv.arrRegName}">
								<input type="hidden" name="deprnCd" id="deprnCd" value="${resv.deprRegCode}">
								<input type="hidden" name="deprCd" id="deprCd" value="${resv.deprRegCode}">
								<input type="hidden" name="arvlCd" id="arvlCd" value="${resv.arrRegCode}">
								<input type="hidden" name="takeDrtm" id="takeDrtm" value="${resv.durMin}">
								<input type="hidden" name="cacmCd" id="cacmCd" value="06">
								<input type="hidden" name="cacmNm" id="cacmNm" value="${resv.comName}">
								<input type="hidden" name="deprNm" id="deprNm" value="${resv.busGrade}">
								<input type="hidden" name="adltNum" id="adltNum" value="${resv.aduCount}">
								<input type="hidden" name="chldNum" id="chldNum" value="${resv.chdCount}">
								<input type="hidden" name="teenNum" id="teenNum" value="${resv.stuCount}">
								<input type="hidden" name="payNm" id="payNm" value="${resv.payMethod}">
								<input type="hidden" name="TRD_DTM" id="TRD_DTM" value="${resv.resvDateStr}">
								<input type="hidden" name="seatNo" id="seatNo" value="${resv.seatNo}">
								<input type="hidden" name="BRKP_AMT_CMM" id="BRKP_AMT_CMM" value="1500">
								
								<input type="hidden" name="pynDvsCd" id="pynDvsCd" value="3">
								<input type="hidden" name="pynDtlCd" id="pynDtlCd" value="7">
								<input type="hidden" name="prmmDcDvsCd" ID="prmmDcDvsCd" value="4">
								<input type="hidden" name="rtrpMrsYn" id="rtrpMrsYn" value="N">
								<input type="hidden" name="tckSeqList" id="tckSeqList" value="20250619994950192">
							
							<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
								
							</form>
							
							<form id="recpCanOkFrm" name="recpCanOkFrm">

								<%-- <input type="hidden" name="nonMbrsNo" id="nonMbrsNo" value="${resv.nonMbrsNo}"> --%>
								<input type="hidden" name="mrsMrnpno" id="mrsMrnpno" value="${resv.resId}">
								<input type="hidden" name="type" id="type" value="cancel">
								<input type="hidden" name="mrsMrnpsno" id="mrsMrnpsno" value="${resv.arrRegCode}">
								<input type="hidden" name="alcnDeprDt" id="alcnDeprDt" value="${fn:substringBefore(resv.rideDateStr, ' ')}">
								<input type="hidden" name="alcnDeprTime" id="alcnDeprTime" value="${fn:substringAfter(resv.rideDateStr, ' ')}">
								<input type="hidden" name="deprnNm" id="deprnNm" value="${resv.deprRegName}">
								<input type="hidden" name="arvlNm" id="arvlNm" value="${resv.arrRegName}">
								<input type="hidden" name="deprnCd" id="deprnCd" value="${resv.deprRegCode}">
								<input type="hidden" name="deprCd" id="deprCd" value="${resv.deprRegCode}">
								<input type="hidden" name="arvlCd" id="arvlCd" value="${resv.arrRegCode}">
								<input type="hidden" name="takeDrtm" id="takeDrtm" value="${resv.durMin}">
								<input type="hidden" name="cacmCd" id="cacmCd" value="06">
								<input type="hidden" name="cacmNm" id="cacmNm" value="${resv.comName}">
								<input type="hidden" name="deprNm" id="deprNm" value="${resv.busGrade}">
								<input type="hidden" name="adltNum" id="adltNum" value="${resv.aduCount}">
								<input type="hidden" name="chldNum" id="chldNum" value="${resv.chdCount}">
								<input type="hidden" name="teenNum" id="teenNum" value="${resv.stuCount}">
								<input type="hidden" name="payNm" id="payNm" value="${resv.payMethod}">
								<input type="hidden" name="TRD_DTM" id="TRD_DTM" value="${resv.resvDateStr}">
								<input type="hidden" name="seatNo" id="seatNo" value="${resv.seatNo}">
								<input type="hidden" name="BRKP_AMT_CMM" id="BRKP_AMT_CMM" value="1500">
								
								<input type="hidden" name="pynDvsCd" id="pynDvsCd" value="3">
								<input type="hidden" name="pynDtlCd" id="pynDtlCd" value="7">
								<input type="hidden" name="prmmDcDvsCd" ID="prmmDcDvsCd" value="4">
								<input type="hidden" name="rtrpMrsYn" id="rtrpMrsYn" value="N">
								<input type="hidden" name="tckSeqList" id="tckSeqList" value="20250619994950192">
							
								<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
								
							</form>
							<!-- 편도 시작 -->





							<!-- 현장발권 class="ontheSpot", 홈티켓 class="homeTicket", 모바일티겟 class="mobileTicket", 미발행 class="unissued" -->
							<!-- 도착예정시간이 경과되었습니다. class="timeOver" 추가-->
							<!-- 모바일 발권 인 경우 -->

						<section class="detail_info_wrap newMobileTicket marT30 " style="display: ${empty resvList ? 'none' : 'block'};">
							<div class="ticketInfo">
								<div class="type">
									<span class="mobile">${resv.resvType }</span> 
								</div>
								<div class="typeDetail">
									<sapn></sapn>
									<span class="desc">결제수단</span> <span>${resv.payMethod}</span>



								</div>
							</div>

							<!-- 모바일 발권 아닌 경우 -->

							<!-- 현장발권 class="ontheSpot", 홈티켓 class="homeTicket", 모바일티켓 class="mobileTicket", 미발행 class="unissued" -->
							<span class="ticket-type"><span class="sr-only"></span></span>
							<div class="box_detail_info">
								<div class="routeHead">
									<p class="date">출발 ${resv.rideDateStr}</p>
									<p class="ticketPrice"></p>
								</div>
								<div class="routeBody">
									<div class="routeArea route_wrap">
										<div class="inner">

											<dl class="roundBox departure kor">
												<dt>출발</dt>
												<dd>${resv.deprRegName}</dd>
											</dl>
											<dl class="roundBox arrive kor">
												<dt>도착</dt>
												<dd>${resv.arrRegName}</dd>
											</dl>
										</div>
										<div class="detail_info">
										
											<c:set var="durMin" value="${resv.durMin}" />
											<c:set var="hour" value="${durMin div 60}" />
											<c:set var="minute" value="${durMin mod 60}" />
											<span>
											  <fmt:formatNumber value="${hour}" type="number" maxFractionDigits="0" />시간
											  <fmt:formatNumber value="${minute}" type="number" maxFractionDigits="0" />분 소요
											</span>

											<!-- 예상소요시간 -->
										</div>
									</div>
									<div class="routeArea route_wrap mob_route">
										<div class="tbl_type2">
											<table class="tbl_info">
												<caption>버스 예매 정보에 대한 표이며 예매번호, 고속사, 등급, 승차홈, 매수
													정보 제공</caption>
												<colgroup>
													<col style="width: 68px;">
													<col style="width: *;">
												</colgroup>
												<tbody>
													<tr>
														<th scope="row">예매번호</th>
														<td>${resv.resId }</td>
													</tr>
													<tr>
														<th scope="row">고속사</th>
														<td>${resv.comName }<span class="jabus ico_bus"></span>
														</td>
													</tr>
													<tr>
														<th scope="row">등급</th>
														<td>${resv.busGrade }</td>
													</tr>
													<!-- <tr>
														<th scope="row">승차홈</th>
														<td>23</td>
													</tr> -->
													<tr>
														<th scope="row">매수</th>
														<td>${resv.totalCount}</td>

													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<!-- 좌석상세내역 -->
							<!-- 
												전체검표완료 시 class="check_com" 추가
											-->
							<div class="seat_detail">
								<ul>

									<form id="mrsCfmDtllistFrm50619994950192"
										name="mrsCfmDtllistFrm50619994950192"
										action="https://www.kobus.co.kr/mrs/mrsrehtckpub.do">
										<input type="hidden" name="nonMbrsNo" value="">
										<!-- 비회원 회원번호 -->

										<input type="hidden" name="tckNo" value="20250619994950192">
										<input type="hidden" name="tckKndCd" value="1">
										<!-- 티켓종류코드(일반,초등,고등,대학)-->
										<input type="hidden" name="satsNo" value="05">
										<!-- 좌석 -->
										<input type="hidden" name="mrsMrnpNo" value="20250619418950">
										<!-- 예매번호 -->
										<input type="hidden" name="mrsMrnpSno" value="01">
										<!-- 예매일련번호 -->
										<input type="hidden" name="alcnDeprDt"
											value="2025. 07. 16 (수)">
										<!-- 출발일 -->
										<input type="hidden" name="alcnDeprTime" value="09:00">
										<!-- 출발시간 -->
										<input type="hidden" name="deprnNm" value="서울경부">
										<!-- 출발지 -->
										<input type="hidden" name="arvlNm" value="강릉">
										<!-- 도착지 -->
										<input type="hidden" name="takeDrtm" value="2시간 50분">
										<!-- 소요시간 -->
										<input type="hidden" name="cacmCd" value="">
										<!-- 고속사코드 -->
										<input type="hidden" name="cacmNm" value="(주)중앙고속">
										<!-- 고속사명 -->
										<input type="hidden" name="cacmCss" value="jabus">
										<!-- 고속사CSS -->
										<input type="hidden" name="deprNm" value="고속">
										<!-- 등급 -->
										<input type="hidden" name="adltNum" value="">
										<!-- 일반매수 -->
										<input type="hidden" name="chldNum" value="">
										<!-- 초등매수 -->
										<input type="hidden" name="teenNum" value="">
										<!-- 중고매수 -->
										<input type="hidden" name="uvsdNum" value="">
										<!-- 대학매수 -->
										<input type="hidden" name="sncnNum" value="">
										<!-- 경로매수 -->
										<input type="hidden" name="dsprNum" value="">
										<!-- 장애인매수 -->

										<input type="hidden" name="vtr3Num" value="">
										<!-- 보훈매수 -->
										<input type="hidden" name="vtr5Num" value="">
										<!-- 보훈매수 -->
										<input type="hidden" name="vtr7Num" value="">
										<!-- 보훈매수 -->

										<input type="hidden" name="dfptNum" value="">
										<!-- 후불매수 -->

										<input type="hidden" name="rtrpMrsYn" value="">
										<!-- 왕복 예매 여부 -->
										<input type="hidden" name="prmmDcDvsCd" value="4">
										<!-- 우등형할인코드 -->
										<input type="hidden" name="pynDvsCd" value="2">
										<!-- 지불구분코드 -->
										<input type="hidden" name="pynDtlCd" value="s">
										<!-- 지불상세코드 -->
										<input type="hidden" name="payNm" value="네이버페이">
										<!-- 결제 수단 -->

										<!-- 검표상태에 따른 div 설정 -->
										<li class="" style="border-top: none;">
											<!-- 부분검표완료 시 li tag에 check_com 추가 --> <strong
											class="seat-title">좌석</strong> 

											<span class="box_ticketNum"> <span class="ticketNum">${resv.seatNo}</span>
												<!-- <span class="ticketNum2">01020005</span> -->
										</span>
											<div class="btnBox">

												<!-- 예매한 승차가 1건일땐 승차권 안보여줌 -->

											</div>
										</li>




									</form>

								</ul>
							</div>
							<!-- //좌석상세내역 -->
							<p class="btns multi clfix col3">
								<a href="javascript:void(0);"
									onclick="fnmrsChangeTime(0);"
									class="btnL btn_cancel first">시간변경</a> <a
									href="javascript:void(0);" id="btnGenerateQr"
									class="btnL btn_cancel" title="새창">탑승권 확인</a>
								<!-- <a href="javascript:void(0)" onclick="fnmrsRecpPub(0);" 
								class="btnL btn_cancel" title="새창">탑승권 확인</a>  -->

								<a href="javascript:void(0)" onclick="fnRecpCanInfo(0,'all');"
									class="btnL btn_cancel btn_pop_focus last">예매취소</a>
							</p>
						</section>

						<!-- //왕복 끝 -->

						


						<div class="com_pop_wrap" id="theaterPopup" style="display: none;">
							<div class="com_pop_fog" style="opacity: 0;"></div>
							<div class="com_pop pop_product_cgv"
								style="display: none; margin-left: -275px; margin-top: -310px; z-index: 999;">
								<div class="com_pop_header">
									<span>탑승권 QRCode</span><a href="javascript:void(0);"
										class="sprite com_pop_btn_close">닫기</a>
								</div>
								<div class="com_pop_container" id="divAvailableCgv">
									<input type="hidden" id="qrText" value="${resv.qrCode }">
									<div id="qrImgBox" class="imgContainer">
										<img id="qrImg" src="" alt="qr img" aria-label="QR 이미지 입니다."
											draggable="false">
										<p class="qr_title">탑승을 위한 QRCode</p>
										<p>
											열차를 탑승할때, 이 QRCode를 역무원에게 <br>보여주시길 바랍니다.
										</p>
									</div>

									<button id="btnPickUp" style="margin-right: 10px;">탑승
										완료</button>
									<button id="btnPickUpClose">닫기</button>
								</div>
							</div>
						</div>


						<script>

				        $("#btnGenerateQr").on("click", function () {
				        	
				            const wrap = $(".com_pop_wrap");
				            wrap.show();
				
				            const pop = wrap.find(".com_pop.pop_product_cgv");
				            const fog = wrap.find(".com_pop_fog");
				
				            fog.css("opacity", 0);
				            pop.css({
				                "display": "block",
				                "margin-left": "-275px",
				                "margin-top": "-310px"
				            });
				
				            pop.show();
				        });
				
				
				        $("btnPickUp, #btnPickUpClose, #theaterPopup > div.com_pop.pop_product_cgv > div.com_pop_header > a").on("click", function () {
				            const wrap = $(".com_pop_wrap");
				            wrap.hide();
				
				            const pop = wrap.find(".com_pop.pop_product_cgv");
				            pop.hide();
				        });
				
				    </script>

					</c:forEach>


					<ul class="desc_list marT30">
								<!-- 191118 수정 -->
								<li>과거 예매 내역은 출발일 날짜 기준 당일까지, 예매 취소 내역은 과거 3개월까지 조회 가능합니다.</li>
								<li><strong class="txt_puple">홈티켓으로 발권된 내역은 변경이 불가</strong>하니
									변경을 원하시면 취소 후 다시 예매를 진행하시기 바랍니다.</li>
								<li>마일리지 구매 승차권은 시간변경이 불가하니 변경을 원하시면 취소 후 다시 예매를 진행하시기
									바랍니다.</li>
								<li>마일리지 승차권 취소 시, 마일리지 수수료 정책에 따라 처리됩니다. <!-- 191120 수정 -->
									<ul class="dash_list">
										<li>출발 시간 이전 취소 시 100% 마일리지 환급</li>
										<!-- 191120 수정 -->
										<li>출발 시간 이후 취소 시 100% 마일리지 차감</li>
										<!-- 191120 수정 -->
									</ul>
								</li>
								<li>신용카드 예매 취소 또는 변경 시 일주일 내로 예매했던 카드로 청구 취소 처리가 되면서 반환됩니다.</li>
								<li><strong class="txt_puple">시간변경은 취소 위약금을 부과하지
										않습니다.</strong></li>
								<li>모바일앱에서 예매하신 내역의 변경을 원하시면 고속버스 티머니 앱으로 접속하셔서 시도하시기 바랍니다.</li>
								<li>모바일 환경에서는 홈티켓 발행 및 재발행 기능이 지원되지 않으니 PC로 접속하셔서 이용하시기
									바랍니다.</li>
								<!-- 190319_부가상품_문구_수정 - 추가 -->
								<!-- <li>정기권의 경우, 사용기간 전·후 취소가 가능하며 지난 날짜와 환불 수수료를 제외하고 지급됩니다. </li> -->
								<li>프리패스의 경우, 사용 시작일 이전 취소가 가능하며 구매금액의 100%가 지급됩니다.<br>
									프리패스 사용 시작 1일 후까지 취소 가능하나, 승차권 발권 상태인 경우 취소 불가능합니다.
								</li>
								<!-- //190319_부가상품_문구_수정 - 추가 -->
								<!-- 191118 추가 -->
								<li>고속버스 정기권을 이용한 승차권 예매, 취소 안내
									<ul class="dash_list">
										<li>정기권으로 예매한 승차권은 버스 출발 시간 전까지 취소 후 다시 승차권 예매가 가능합니다.</li>
										<li><strong class="accent2">정기권으로 예매한 승차권을 취소하지
												않고 출발 시간이 지났을 경우 해당일의 동일 방향(편도) 재이용이 불가합니다.</strong></li>
										<li>정기권을 이용한 승차권 예매 및 발권은 차량 좌석이 있는 경우에만 사용이 가능합니다.</li>
									</ul>
								</li>
							</ul>


						</div>
						<!-- //예매내역 -->
						<!-- 취소내역 -->
						<!-- 취소내역 -->
						<!-- 취소내역 -->
						<!-- 취소내역 -->
						<!-- 취소내역 -->
						<!-- 취소내역 -->
						<!-- 취소내역 -->
						<!-- 취소내역 -->
						<div class="tab_conts" style="display: none;">
							<h3 class="sr-only">취소내역</h3>
							
							
							<c:if test="${empty cancelList}">
							<div class="box_detail_info noData">
								<p>취소내역이 존재하지 않습니다.</p>
							</div>
						</c:if>
							
							<c:forEach var="cancel" items="${cancelList}">
							<section class="detail_info_wrap kor mobileTicket marT30" style="display: ${empty cancelList ? 'none' : 'block'};">
								<!-- 현장발권 class="ontheSpot", 홈티켓 class="homeTicket", 모바일티켓 class="mobileTicket", 미발행 class="unissued" -->
								<span class="ticket-type"><span class="sr-only">모바일</span></span>
							
										<div class="box_detail_info">
											<div class="routeHead">
												<p class="date txt_black">탑승일자 ${cancel.rideDateStr }</p>
												<p class="ticketPrice cancel">
													취소일시 
													<span class="txt_cancelDate">2025. 06. 24(화)15:07</span>
												</p>
											</div>
											<div class="routeBody">
												<div class="routeArea route_wrap cancel_com">
													<div class="inner">
														
														<dl class="roundBox departure kor">
															<dt>출발</dt>
															<dd>${cancel.deprRegName }</dd>
														</dl>
														<dl class="roundBox arrive kor">
															<dt>도착</dt>
															<dd>${cancel.arrRegName }</dd>
														</dl>
														<span class="img-area"><img src="${pageContext.request.contextPath}/resources/images/bg_cancelTicket_com.png" alt="취소완료"></span>
													</div>
													<div class="detail_info">
													<c:set var="durMin" value="${cancel.durMin}" />
														<c:set var="hour" value="${durMin div 60}" />
														<c:set var="minute" value="${durMin mod 60}" />
														<span>
														  <fmt:formatNumber value="${hour}" type="number" maxFractionDigits="0" />시간
														  <fmt:formatNumber value="${minute}" type="number" maxFractionDigits="0" />분 소요
														</span>
													</div>
												</div>
												
															<div class="routeArea route_wrap mob_route">
																<div class="tbl_type2">
																	<table class="taR">
																		<caption>취소 정보 표이며 결제금, 취소 위약금, 총 반환 금액 정보 제공</caption>
																		<colgroup>
																			<col style="width:100px;">
																			<col style="width:*;">
																		</colgroup>
																		
																		<tbody>
																		
																			<tr>
																				<th scope="row">결제금</th>
																				<td>${cancel.amount } 원</td>
																			</tr>
																			<tr>
																				<th scope="row">취소 위약금</th>
																				<td>1500원</td>
																			</tr>
																			<tr>
																			<c:set var="amount" value="${cancel.amount - 1500}" />
																				<th scope="row">총 반환 금액</th>
																				<td><strong>${amount }원</strong></td>
																			</tr>
																		
																	</tbody>
																</table>
															</div>
														</div>
													
												
											
										</div>
									</div>	
							</section>
							</c:forEach>
						<!-- //취소내역 -->
					</div>
				</div>

			</div>

		</article>
		
	
		<!-- footer -->




<!-- 	<div
		style="left: -1000px; overflow: scroll; position: absolute; top: -1000px; border: none; box-sizing: content-box; height: 200px; margin: 0px; padding: 0px; width: 200px;">
		<div
			style="border: none; box-sizing: content-box; height: 200px; margin: 0px; padding: 0px; width: 200px;"></div>
	</div>
	<div class="remodal-overlay remodal-is-closed" style="display: none;"></div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal pop_ticket full remodal-is-initialized remodal-is-closed"
			id="homepopTicket" role="dialog" tabindex="-1">
			
			<div class="title type_blue">
				<h2>고속버스 홈티켓 발행</h2>
			</div>
			<div class="cont">
				<div class="agreement_wrap noiframe">
					<div class="agreement_tit">
						<h4 class="first">홈티켓 이용약관</h4>
					</div>
					<div class="scroll-wrapper agreement_cont scrollbar-inner"
						style="position: relative;">
						<div class="agreement_cont scrollbar-inner scroll-content"
							style="height: 108px; margin-bottom: 0px; margin-right: 0px; max-height: none;">
							<ol>
								<li>
									<p>1. 홈티켓취소</p> 차량 출발 후 도착예정시간까지 : 홈페이지 취소 가능, 출발지, 도착지 터미널에서
									가능
								</li>
								<li>
									<p>2. 홈티켓 출력</p> 1)무인발매기 재발행 불가<br>2)차량 출발 전까지 : 홈페이지,
									출발지터미널, 도착지터미널에서 가능
								</li>
								<li>3. 출력된 홈티켓의 위 변조 및 부정 사용하여 적발될 경우 형사처벌 됩니다.</li>
							</ol>
						</div>
						<div class="scroll-element scroll-x">
							<div class="scroll-element_outer">
								<div class="scroll-element_size"></div>
								<div class="scroll-element_track"></div>
								<div class="scroll-bar"></div>
							</div>
						</div>
						<div class="scroll-element scroll-y">
							<div class="scroll-element_outer">
								<div class="scroll-element_size"></div>
								<div class="scroll-element_track"></div>
								<div class="scroll-bar"></div>
							</div>
						</div>
					</div>
					<span class="custom_check chk_blue"> <input type="checkbox"
						id="agree1"> <label for="agree1">동의</label>
					</span>
				</div>
				<ul class="desc_list">
					<li>홈티켓 발행 후 인쇄한 홈티켓을 탑승 시 제시해야합니다.</li>
					<li>홈티켓 인쇄 시 QR코드가 정상적으로 출력되어야 차량 검표가 가능합니다.</li>
					<li>고속버스 홈티켓은 발행 뒤 시간/매수 변경이 불가합니다. 변경을 원하시면 홈티켓을 취소하고 다시 예매
						하시기 바랍니다.</li>
					<li>만약 고속버스 홈티켓 발행이 불가할 경우(프린터 고장 등) 예매에 사용하신 카드 또는
						예매정보(휴대폰번호/생년월일)를 지참하시고 해당 출발지 터미널 매표현장에서 고속버스 홈티켓을 발행 받으시기
						바랍니다.(무인발매기 홈티켓 출력 불가)</li>
				</ul>
			</div>
			<div class="btns col1">
				<button type="button" id="mrsHtckPub" data-remodal-action="confirm"
					class="remodal-confirm">홈티켓발행</button>
			</div>
			<button type="button" data-remodal-action="close"
				class="remodal-close">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div> -->
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal w680 popTicket_cancel remodal-is-initialized remodal-is-closed"
			id="popTicketCancel" role="dialog" tabindex="-1">

		</div>
	</div>
<!-- 	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal pop_price remodal-is-initialized remodal-is-closed"
			data-remodal-id="homeTckMbl" role="dialog" tabindex="-1">
			<div class="print_body" style="background: #ffffff">
				<div class="ticketArea" style="float: none; width: auto; margin: 0;">
					<strong class="receipt_tit"> 고속버스 홈티켓 </strong><br>
					<div class="box_section sec02">
						<span class="qrCode" id="qrcodeTableMbl"></span>
						<div class="qr_area">
							<img src="https://www.kobus.co.kr/mrs/mrscfm.do" width="100%"
								alt="">
							<span class="" id="qrcodeTableMbl_base"></span>
							<span class="qrCode" id="qrcodeTableMbl"></span>
						</div>
						<span class="qrCodeNum" id="qrTckNo"></span>
					</div>
					<div class="box_section sec02">
						<span class="sub_title">화면밝기를 최대로 설정해 주시기 바랍니다.</span> <span
							class="sub_title">다크모드에서는 QR코드가 인식되지 않을수 있습니다.<br>
						<b>일반모드를 사용해주세요.</b></span> <span>고객센터 1644-9030</span>
					</div>
					<br>


				</div>
			</div>
			<div class="btns">
				<button type="button" data-remodal-action="cancel"
					class="btnL btn_close">닫기</button>
			</div>
		</div>
	</div> -->
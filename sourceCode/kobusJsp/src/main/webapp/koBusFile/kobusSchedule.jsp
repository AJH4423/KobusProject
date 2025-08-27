<%@ page trimDirectiveWhitespaces="true" language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<!-- saved from url=(0031)/main.do -->
<html lang="ko" class="pc">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="shortcut icon" type="image/x-icon"
	href="/koBus/media/favicon.ico">
<meta name="viewport"
	content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">

<title>고속버스통합예매</title>

<link rel="shortcut icon" href="/images/favicon.ico">
<link rel="stylesheet" type="text/css"
	href="/koBus/css/common/ui.jqgrid.custom.css">
<link rel="stylesheet"
	href="https://code.jquery.com/ui/1.14.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
<script src="https://code.jquery.com/ui/1.14.1/jquery-ui.js"></script>
<script>
	$(function() {

		$("#startdate_btn").click(function() {
			$("#datepicker1").datepicker("show");
		});

		$("#enddate_btn").click(function() {
			$("#datepicker2").datepicker("show");
		});

	});
</script>

<style>
#datepicker1, #datepicker2 {
	display: none;
}
</style>


<script type="text/javascript" src="/koBus/js/common/ui.js"></script>
<script type="text/javascript" src="/koBus/js/common/plugin.js"></script>
<script type="text/javascript" src="/koBus/js/common/common.js"></script>

<script type="text/javascript" src="/koBus/js/common/jquery.number.js"></script>
<script type="text/javascript" src="/koBus/js/common/security.js"></script>


<link rel="stylesheet" type="text/css"
	href="/koBus/css/common/style.css">
<script type="text/javascript" src="/koBus/js/common/new-kor-ui.js"></script>

<script type="text/javascript" src="/koBus/js/common/RotInfPup.js"></script>
<script type="text/javascript" src="/koBus/js/common/RotInf.js"></script>
<script type="text/javascript" src="/koBus/js/MrsCfmLgn.js"></script>
<script type="text/javascript" src="/koBus/js/OprnAlcnInqr.js"></script>
<script type="text/javascript" src="/koBus/js/OprnAlcnInqrPup.js"></script>

</head>
<%@ include file="common/header.jsp" %>

		<!-- breadcrumb -->

		<nav id="new-kor-breadcrumb">
			<div class="container">

				<ol class="breadcrumb-list">
					<li><i class="ico ico-home"></i><span class="sr-only">홈</span></li>

					<li>
						<div class="dropdown-wrap breadcrumb-select">





							<a href="javascript:void(0)" class="btn-dropdown" title="대메뉴 선택"
								aria-expanded="false"> <span class="text">운행정보</span><i
								class="ico ico-dropdown-arrow"></i></a>













							<ul class="dropdown-list" style="display: none;">






								<li><a href="https://www.kobus.co.kr/mrs/rotinf.do">고속버스예매</a></li>










								<li class="selected"><a href="javascript:void(0)"
									title="선택됨">운행정보</a></li>






								<li><a
									href="https://www.kobus.co.kr/adtnprdnew/frps/frpsPrchGd.do">프리패스/정기권</a></li>






								<li><a href="https://www.kobus.co.kr/ugd/mrsgd/Mrsgd.do">이용안내</a></li>

								<li><a
									href="https://www.kobus.co.kr/cscn/ntcmttr/readNtcList.do">고객지원</a></li>
								<li><a
									href="https://www.kobus.co.kr/ugd/bustrop/Bustrop.do">전국고속버스운송사업조합</a></li>
								<li><a
									href="https://www.kobus.co.kr/ugd/trmlbizr/Trmlbizr.do">터미널사업자협회</a></li>

							</ul>
						</div>
					</li>

					<li>
						<div class="dropdown-wrap breadcrumb-select">
							<a href="javascript:void(0)" class="btn-dropdown" title="하위메뉴 선택"
								aria-expanded="false"> <span class="text">시간표 조회</span><i
								class="ico ico-dropdown-arrow"></i></a>
							<ul class="dropdown-list" style="display: none;">
								<li class="selected"><a href="javascript:void(0)"
									title="선택됨">시간표 조회</a></li>
								<li><a
									href="#">도착시간
										안내</a></li>
							</ul>
						</div>
					</li>
				</ol>

			</div>
		</nav>


		<article id="new-kor-content" class="full">

			

			<!-- 출/도착지 선택 레이어팝업 -->


			<form name="rotInfFrm" id="rotInfFrm" method="post"
				action="/koBus/kobusSchedule.do">
				<input type="hidden" name="sourcePage" value="kobusSchedule.jsp">
				<input type="hidden" name="deprCd" id="deprCd" value="">
				<!-- 출발지코드 -->
				<input type="hidden" name="deprNm" id="deprNm" value="">
				<!-- 출발지명 -->
				<input type="hidden" name="arvlCd" id="arvlCd" value="">
				<!-- 도착지코드 -->
				<input type="hidden" name="arvlNm" id="arvlNm" value="">
				<!-- 도착지명 -->
				<input type="hidden" name="crchDeprArvlYn" id="crchDeprArvlYn"
					value="N">
				<!-- 출도착지 스왑여부 -->
				<input type="hidden" name="deprDtm" id="deprDtm" value="20250616">
				<!-- 가는날(편도,왕복) -->
				<input type="hidden" name="busClsCd" id="busClsCd" value="0">
				<!-- 버스등급 -->
				<input type="hidden" name="prmmDcYn" id="prmmDcYn" value="N">
				<!-- 시외우등할인대상노선 -->
			</form>
			<div class="title_wrap drivingInfoT" style="display: none;">

				<a href="#"
					class="back">back</a> <a
					href="#"
					class="mo_toggle">메뉴</a>


				<h2>시간표조회</h2>
			</div>


			<!-- 타이틀 -->
			<div class="content-header" data-page-title="시간표조회 | 운행정보 | 고속버스통합예매">
				<div class="container">
					<div class="title-area">
						<h2 class="page-title">시간표조회</h2>
					</div>
				</div>
			</div>

			<div class="content-body time_table">
				<div class="container">

					<!-- <a href="javascript:void(0)"  class="bnr_app bnr_pc">모바일에서도 언제 어디서나 도착시간 조회! <strong>고속버스 모바일앱</strong></a> -->
					<div class="bnr_app bnr_pc">
						모바일에서도 언제 어디서나 도착시간 조회! <strong>고속버스 모바일앱</strong>
					</div>
					<div class="route_box clfix">
						<ul class="place">
							<li><a href="javascript:void(0)" id="readDeprInfoList"
								onclick="fnReadDeprInfoList(event);"> <span class="name">출발지</span>
									<p class="text empty">
										<span class="empty_txt">선택</span><span class="val_txt"
											id="deprNmSpn"></span>
									</p> <!-- 값이 있을경우 p에 'empty' class가 없음 -->
							</a>
								<p class="btn_change" onclick="fnCrchDeprArvl();">출,도착지 교체</p></li>
							<li><a href="javascript:void(0)" id="readArvlInfoList"
								onclick="fnReadArvlInfoList(event);"> <span class="name">도착지</span>
									<p class="text empty">
										<span class="empty_txt">선택</span><span class="val_txt"
											id="arvlNmSpn"></span>
									</p> <!-- 값이 없을경우 p에 'empty' class가 있음 -->
							</a></li>
						</ul>
						<ul class="date">
							<li>
								<div class="date_picker_wrap">
									<span class="name">가는날</span> <input type="text"
										id="datepicker1" tabindex="-1" title="가는날"
										readonly="true">
									<!-- <button type="button" class="datepicker-btn"
										id="startdate_btn">
										<img class="ui-datepicker-trigger"
											src="/koBus/images/ico_calender.png" alt="가는날 선택 달력">
									</button> -->
									<label for="datepicker1" class="text_date text_date1">2025. 6. 7. 토</label>
									<span class="date_wrap"> <a
										href="javascript:void(0)" id="deprThddChc"
										class="active"
										onclick="fnYyDtmStup(0,'text_date1','0');" title="선택됨">오늘</a>
										<a href="javascript:void(0)" id="deprNxdChc"
										onclick="fnYyDtmStup(1,'text_date1','0');">내일</a>
									</span>
								</div>
							</li>
						</ul>
						<div class="box_inputForm click_box inselect">
							<strong class="name">등급</strong>
							<!-- 170117 class명 추가 -->


							<!-- 웹 접근성 개선 셀렉트 박스 UI -->

							<div class="dropdown-wrap select-default">
								<a href="javascript:void(0)" class="btn-dropdown"
									title="출발터미널 선택" aria-expanded="false"> <span class="text">전체등급</span></a>
								<ul class="dropdown-list" style="display: none;">
									<li><a href="javascript:fnBusClsCd(&#39;0&#39;)">전체등급</a></li>
									<li><a href="javascript:fnBusClsCd(&#39;7&#39;)">프리미엄</a></li>
									<li><a href="javascript:fnBusClsCd(&#39;1&#39;)">우등</a></li>
									<li><a href="javascript:fnBusClsCd(&#39;2&#39;)">일반</a></li>
								</ul>
							</div>

						</div>
						<p class="check" id="alcnSrchBtn">
							<button type="button" class="btn_confirm ready"
								onclick="fnAlcnSrch();">조회하기</button>
						</p>
					</div>

					<!-- 조회결과 -->
					<div class="drive_info_wrap" name="readAlcnInqr" id="readAlcnInqr"
						style="display: none;">
						<p class="drive_info accent" id="takeDrtm"></p>
						<div class="detailBox">
							<div class="detailBox_body clfix">
								<ul class="time" id="timelistChk">
								</ul>
								<div class="bustime_wrap" role="table"
											aria-label="시간표조회에 대한 목록이며 출발, 고속사, 등급, 어른요금, 초등생요금, 중고생요금, 잔여석/총좌석 정보 제공">
									<p class="bustime_head" role="row">
										<span id="start_time_header" class="start_time"
											role="columnheader">출발시각</span>
										<!-- 170119 텍스트수정 -->
										<span id="bus_info_header" class="bus_info" role="columnheader">고속사/등급</span>
										<!-- tablet / mobile 사이즈에서 보임 -->
										<span id="bus_com_header" class="bus_com" role="columnheader">고속사</span>
										<!-- pc 사이즈에서만 보임 -->
										<span id="grade_header" class="grade" role="columnheader">등급</span>
										<!-- pc 사이즈에서만 보임 -->
										<span id="adult_haeder" class="adult" role="columnheader">어른요금</span>
										<span id="youth_header" class="youth" role="columnheader">
											중고생요금</span> 
										<span id="child_header" class="child" role="columnheader">초등생요금</span>
											<span id="remain_header" class="remain"
											role="columnheader">잔여석 <span class="total_seat">/
												총 좌석</span></span>
									</p>
		
									<div class="bus_time" id="alcnList" role="row"
										aria-rowindex="1">
										<!-- 동양고속 class="dyexpress" 삼화고속 class="samhwa" 중앙고속 class="jabus" 금호고속 class="kumho" 천일고속 class="chunil" 한일고속 class="hanil" 동부고속 class="dongbu" 금호속리산고속 class="songnisan" 코버스 class="kobus" -->
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- // 조회결과 -->
					<div class="section">
						<ul class="desc_list">
							<li>실시간 운행상태 조회를 위해서는 <a
								href="https://www.kobus.co.kr/oprninf/arscgd/oprnArscGd.do"
								class="accent">도착시간 안내 메뉴</a>를 이용하시기 바랍니다.
							</li>
							<li>심야 고속ㆍ우등ㆍ프리미엄의 요금은 당일 22:00부터 익일 04:00사이 출발차량</li>
						</ul>
					</div>
					<!-- <a href="javascript:void(0)" class="bnr_app bnr_mo">모바일에서도 언제 어디서나 도착시간 조회! <strong>고속버스 모바일앱</strong></a> -->
					<!-- 1103 -->
					<div class="bnr_app bnr_mo">
						모바일에서도 언제 어디서나 도착시간 조회! <strong>고속버스 모바일앱</strong>
					</div>
				</div>

			</div>

		</article>

		<!-- footer -->




		<!-- 푸터 -->
		<footer id="new-kor-footer">
			<div class="container">
				<div class="footer-top-cont">
					<ul class="express-bus-company-list">
						<li><a href="http://www.kumhobuslines.co.kr/" target="_blank"
							title="새창"><img src="/koBus/images/logo-kumho-express.png"
								alt="금호고속"></a></li>
						<li><a href="http://www.dongbubus.com/" target="_blank"
							title="새창"><img src="/koBus/images/logo-dongbu-express.png"
								alt="동부고속"></a></li>
						<li><a href="http://www.songnisanbuslines.co.kr/"
							target="_blank" title="새창"><img
								src="/koBus/images/logo-sokrisan-express.png" alt="속리산고속"></a>
						</li>
						<li><a href="http://www.dyexpress.co.kr/" target="_blank"
							title="새창"><img src="/koBus/images/logo-dongyang-express.png"
								alt="동양고속"></a></li>
						<li><a href="http://www.samhwaexpress.co.kr/" target="_blank"
							title="새창"><img src="/koBus/images/logo-samhwa-express.png"
								alt="삼화고속"></a></li>
						<li><a href="http://www.jabus.co.kr/" target="_blank"
							title="새창"><img src="/koBus/images/logo-joongang-express.png"
								alt="중앙고속"></a></li>
						<li><a href="http://www.chunilexpress.co.kr/" target="_blank"
							title="새창"><img src="/koBus/images/logo-chunil-express.png"
								alt="천일고속"></a></li>
						<li><a href="http://www.hanilexpress.co.kr/" target="_blank"
							title="새창"><img src="/koBus/images/logo-hanil-express.png"
								alt="한일고속"></a></li>
					</ul>
					<!-- dropdown-top 클래스 추가 시, 드롭다운 목록 위로 노출 -->
					<div class="dropdown-wrap dropdown-top related-sites-select">
						<a href="javascript:void(0)" class="btn-dropdown" title="관련사이트 이동"
							aria-expanded="false"><span class="text">관련사이트</span><i
							class="ico ico-arrow-down"></i></a>
						<ul class="dropdown-list" style="display: none;">
							<li class="selected"><a
								href="/wchr/main.do" target="_blank"
								title="새창">장애인 휠체어 사이트</a></li>
							<li><a href="https://www.tago.go.kr/" target="_blank"
								title="새창">국가대중교통정보센터</a></li>
							<li><a href="https://www.intis.or.kr/" target="_blank"
								title="새창">인천장애인콜택시</a></li>
							<li><a href="http://www.shinsegaecentralcity.com/"
								target="_blank" title="새창">센트럴시티터미널</a></li>
							<li><a href="https://txbus.t-money.co.kr/" target="_blank"
								title="새창">시외버스 통합예매시스템</a></li>
						</ul>
					</div>
				</div>
				<div class="footer-bottom-cont">
					<address class="address">
						<ul class="policy-list">
							<li><a href="/etc/svcstpl/SvcStpl.do">서비스
									이용약관</a></li>
							<li><a
								href="/etc/indlstpl/IndlStpl.do"
								class="text-bold">개인정보 처리방침</a></li>
							<li><a href="/etc/busstpl/BusStpl.do">고속버스
									운송약관</a></li>
							<li><a href="http://www.tmoney.co.kr/" target="_blank"
								title="새창">티머니</a></li>
						</ul>
						<ul class="contact">
							<li>고객센터 : 1644-9030</li>
							<li>서울특별시 서초구 신반포로 194</li>
							<li>대표자 : 김용성</li>
							<li>통신판매업신고 : 2009-서울서초 0587호</li>
						</ul>
						<p class="copyright">COPYRIGHT© 2016. WWW.KOBUS.CO.KR . ALL
							RIGHT RESERVED</p>
					</address>
					<ul class="greeting-btn-list">
						<li><a
							href="http://www.wa.or.kr/board/list.asp?search=total&amp;SearchString=%B0%ED%BC%D3%B9%F6%BD%BA&amp;BoardID=0006"
							target="_blank" title="새창"><img
								src="/koBus/images/logo-accessibility2.png"
								alt="(사)한국장애인단체총연합회 한국웹접근성인증평가원 웹 접근성 우수사이트 인증마크(WA인증마크)"
								height="40"></a></li>
						<li><a href="/ugd/bustrop/Bustrop.do"
							title="이사장 인사말 바로가기"><img src="/koBus/images/logo-kobus.png"
								alt="KOBUS 전국고속버스운송사업조합"></a></li>
						<li><a
							href="/ugd/trmlbizr/Trmlbizr.do"
							title="협회장 인사말 바로가기"><img
								src="/koBus/images/logo-npvtba-express.png" alt="전국여객자동차터미널사업자협회"></a>
						</li>
					</ul>
				</div>
			</div>
		</footer>

	</div>

	<div
		style="left: -1000px; overflow: scroll; position: absolute; top: -1000px; border: none; box-sizing: content-box; height: 200px; margin: 0px; padding: 0px; width: 200px;">
		<div
			style="border: none; box-sizing: content-box; height: 200px; margin: 0px; padding: 0px; width: 200px;"></div>
	</div>
	<div class="remodal-overlay remodal-is-closed" style="display: none;"></div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal pop_place full remodal-is-initialized remodal-is-closed"
			data-remodal-id="popPlace" role="dialog" tabindex="-1">


			<div class="title">
				<h2 id="popTitle">출/도착지 선택</h2>
			</div>
			<div class="cont">
				<div class="search_wrap" style="display: none;">
					<p>
						<!--  class="focus" -->
					<div class="easy-autocomplete" style="width: 100px;">
						<input type="text" id="terminalSearch" title="터미널/지역 이름 검색"
							placeholder="터미널/지역 이름을 검색하세요" autocomplete="off">
						<div class="easy-autocomplete-container"
							id="eac-container-terminalSearch">
							<ul></ul>
						</div>
					</div>
					<span class="btn">검색</span>
					</p>
				</div>
				<div class="start_wrap" id="imptDepr" style="display: block;">
					<h3 class="stit">주요출발지</h3>
					<div class="tags">
			            <button type="button" onclick="fnDeprChc('REG002','서울 경부')" name="imptDeprNm" value="REG002">서울 경부</button>
			            <button type="button" onclick="fnDeprChc('REG003','센트럴시티(서울)')" name="imptDeprNm" value="REG003" class="over">센트럴시티(서울)</button>
			            <button type="button" onclick="fnDeprChc('REG139','광주(유·스퀘어)')" name="imptDeprNm" value="REG139">광주(유·스퀘어)</button> <!--  class="active" --> 
			            <button type="button" onclick="fnDeprChc('REG041','부산')" name="imptDeprNm" value="REG041">부산</button>
			            <button type="button" onclick="fnDeprChc('REG042','서부산')" name="imptDeprNm" value="REG042">서부산</button>
			            <button type="button" onclick="fnDeprChc('REG001','동서울')" name="imptDeprNm" value="REG001">동서울</button>
			            <button type="button" onclick="fnDeprChc('REG031','대전')" name="imptDeprNm" value="REG031">대전</button>
			            <button type="button" onclick="fnDeprChc('REG068','전주')" name="imptDeprNm" value="REG068">전주</button>
			            <button type="button" onclick="fnDeprChc('REG007','인천공항')" name="imptDeprNm" value="REG007">인천공항</button>
			            <button type="button" onclick="fnDeprChc('REG033','천안')" name="imptDeprNm" value="REG033">천안</button>
			            <button type="button" onclick="fnDeprChc('REG145','대구')" name="imptDeprNm" value="REG145">대구</button>
			            <button type="button" onclick="fnDeprChc('REG009','성남')" name="imptDeprNm" value="REG009">성남</button>
			        </div>
				</div>
				<div class="terminal_wrap">
					<h3 class="stit">지역별 터미널</h3>
					<div class="ternimal_box">
						<div class="scroll-wrapper area_scroll scrollbar-inner"
							style="position: relative;">
							<div class="area_scroll scrollbar-inner scroll-content"
								style="height: 420px; margin-bottom: 0px; margin-right: 0px; max-height: none;">
								<ul class="area_list">
									<li class="active" id="areaListAll"><button type="button"
											onclick="fnDeprArvlViewList('all');" title="선택됨">전체</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('11');">서울</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('28');">인천/경기</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('42');">강원</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('30');">대전/충남</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('43');">충북</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('29');">광주/전남</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('45');">전북</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('26');">부산/경남</button></li>
									<li><button type="button"
											onclick="fnDeprArvlViewList('27');">대구/경북</button></li>
								</ul>
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
						<div class="terminal_list" id="terminalList">
							<h4 class="sr-only">전체</h4>
							<div class="scroll-wrapper terminal_scroll scrollbar-inner"
								style="position: relative;">
								<div class="terminal_scroll scrollbar-inner scroll-content"
									style="height: 420px; margin-bottom: 0px; margin-right: 0px; max-height: none;">
									<ul class="clear" id="tableTrmList">
									</ul>
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
						</div>
					</div>
				</div>


				<div class="place">
					<!-- focus -->
					<ul>
						<li id="popDeprChc" class="focuson">
							<!--  class="focuson" -->
							<div class="start-title">
								<span class="stit">출발지</span>
								<p class="text empty">
									<span class="val_txt" id="popDeprNmSpn"></span>
								</p>
							</div>
						</li>
						<li id="popArvlChc">
							<div class="end-title">
								<span class="stit">도착지</span>
								<p class="text empty">
									<span class="val_txt" id="popArvlNmSpn"></span>
								</p>
							</div>
						</li>
					</ul>
					<!-- <button type="button" class="btn_change" onclick="fnCrchDeprArvl();" id="chgDeprArvl">
						<span class="sr-only">출발지, 도착지 교체</span>
					</button> -->
				</div>
			</div>
			<div class="btns">
				<button type="button" data-remodal-action="confirm"
					class="remodal-confirm ready" id="cfmBtn" onclick="fncfmBtnChc()">선택완료</button>
			</div>
			<button type="button" data-remodal-action="close"
				class="remodal-close">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div class="remodal pop_fee remodal-is-initialized remodal-is-closed"
			data-remodal-id="popFee" role="dialog" tabindex="-1">

			<script>
				$("#readDeprInfoList, #readArvlInfoList").on("click", function () {
					fnDeprArvlViewList('all');
					$("#areaListAll").addClass("active");
				})
				
				function fnDeprArvlViewList(regionCode) {

					$("#areaListAll").removeClass("active");
					$(this).addClass("active");
					
					getRotLinInf(regionCode);
					

				}
				
				let isSelectingDepr = true;

				$("#readDeprInfoList").on("click", function() {
					isSelectingDepr = true;
				});

				$("#readArvlInfoList").on("click", function() {
					isSelectingDepr = false;
				});


				let arvlCode = null;
				let arvlName = null;
				let deprCode = null;
				let deprName = null;

				function fnDeprChc(code, name) {
					let selectedCode = code;
					let selectedName = name;
					

					if (isSelectingDepr) {
						// 출발지 선택 시
						deprCode = code;
						deprName = name;

						$("#popDeprNmSpn").text(deprName);
						$("#deprCd").val(deprCode);
					} else {
						// 도착지 선택 시
						arvlCode = code;
						arvlName = name;

						$("#popArvlNmSpn").text(arvlName);
						$("#arvlCd").val(arvlCode);
					}


				}

			</script>


			<div class="title">
				<h2>취소수수료 안내</h2>
			</div>
			<div class="cont">
				<div class="tbl_type1">
					<table class="MsoNormalTable __se_tbl table_type2" border="0"
						cellspacing="0" cellpadding="0" _se2_tbl_template="14">
						<caption>승차권 취소수수료에 대한 정보 제공</caption>
						<colgroup>
							<col style="width: 40%;">
							<col style="width: 20%;">
							<col style="width: 20%;">
							<col style="width: 20%;">
						</colgroup>
						<thead>
							<tr>
								<th class=" undraggable" colspan="4" scope="col">
									<p align="center" class="MsoNormal">
										<b><span>개정(25.5.1일부터)</span></b>
									</p>
								</th>
							</tr>
							<tr>
								<th class=" undraggable" scope="col">
									<p align="center" class="MsoNormal">
										<b><span style="color: #000; font-size: 10pt;">구분</span></b>
									</p>
								</th>
								<th class=" undraggable" scope="col">
									<p align="center" class="MsoNormal">
										<b><span style="color: #000; font-size: 10pt;">월~목</span></b>
									</p>
								</th>
								<th class=" undraggable" scope="col">
									<p align="center" class="MsoNormal">
										<b><span style="color: #000; font-size: 10pt;">금~일<br>공휴일
										</span></b>
									</p>
								</th>
								<th class=" undraggable" scope="col">
									<p align="center" class="MsoNormal">
										<b><span style="color: #000; font-size: 10pt;">명절<br>(설,추석)
										</span></b>
									</p>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>2일전</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>0%</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>0%</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>0%</span>
										</p>
								</b></td>
							</tr>
							<tr>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>1일전 ~ 3시간 이전</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>5%</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>7.50%</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>10%</span>
										</p>
								</b></td>
							</tr>
							<tr class="type2">
								<td><b>
										<p align="center" class="MsoNormal">
											<span>3시간 미만 ~ 출발 전</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>10%</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>15%</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>20%</span>
										</p>
								</b></td>
							</tr>
							<tr>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>출발 후 ~ 도착예정시간 이전</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>25년: 50%<br>26년 : 60%<br>27년 : 70%
											</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>25년: 50%<br>26년 : 60%<br>27년 : 70%
											</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>25년: 50%<br>26년 : 60%<br>27년 : 70%
											</span>
										</p>
								</b></td>
							</tr>
							<tr>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>도착예정시간 초과</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>100%</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>100%</span>
										</p>
								</b></td>
								<td><b>
										<p align="center" class="MsoNormal">
											<span>100%</span>
										</p>
								</b></td>
							</tr>
						</tbody>
					</table>
					<p style="font-size: 14px; color: #000; margin-top: 15px;">* 명절
						취소수수료 기준은 설/추석 전전일, 전일, 당일 및 다음날에 적용합니다.</p>
					<p style="font-size: 14px; color: #000;">* 출발 이후부터 도착예정시간까지의
						취소수수료 기준은 `25년 5월1일부터 `26년 4월30일까지는 50%, `26년 5월1일부터 `27년 4월30일까지는
						60%, `27년 5월1일부터는 70%를 적용한다.</p>
					<p style="font-size: 14px; color: #000;">* 지정차 출발 당일에 승차권을 발행한
						경우는 발행시점 기준 1시간 이내까지 취소수수료 미부과 (단, 지정차 출발 이후에는 승차권 발행시점과 상관없이
						취소수수료 부과)</p>
				</div>
				<ul class="desc_list">
					<li>당일출발 차량의 경우 출발시간 1시간 전까지 홈페이지 예매가 가능하며 1시간 미만 출발임박 차량의 예매를
						원하시면 <span class="txt_puple">[고속버스 모바일앱]</span>에서 예매하시기 바랍니다.
					</li>
					<li>1회 최대 예매 매수는 6매입니다.(일부 시외우등 노선에 한정하여 10매까지 예매가능)</li>
					<li>일반고속 청소년(중, 고등학생 등) 할인은 터미널 현장에서 신분확인 절차 시 학생증, 청소년증,
						주민등록증 이외 나이를 확인할 수 있는 증서(운전면허증, 여권 등)를 제시해야만 할인 적용을 받을 수 있으니 탑승시 꼭
						소지하여 주시기 바랍니다.</li>
					<li>할인 승차권 부정 사용 시 운임의 10배 부가운임을 요구할 수 있습니다.</li>
					<li>사용하지 않은 모든 승차권은 지정차 출발 후 도착예정시간이 지나면 환불하실 수 없습니다.</li>
					<li>취소수수료 산정은 날짜를 기준(시간 기준이 아님)으로 합니다.</li>
					<li>홈페이지 예매 후 창구에서 발권 시 예매에 사용한 신용카드를 반드시 지참하셔야 합니다.</li>
				</ul>
			</div>
			<div class="btns">
				<a href="javascript:void(0)" data-remodal-action="cancel"
					class="remodal-cancel">취소</a> <a href="javascript:void(0)"
					data-remodal-action="confirm" class="remodal-confirm"
					onclick="fnPopFeeAgrm();">동의</a>
			</div>
			<button type="button" data-remodal-action="close"
				class="remodal-close">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
</body>
</html>
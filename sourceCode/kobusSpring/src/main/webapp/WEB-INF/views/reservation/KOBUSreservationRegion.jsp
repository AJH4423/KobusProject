<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<title>예매정보입력(노선조회) | 고속버스예매 | 고속버스예매 | 고속버스통합예매</title>

<link rel="stylesheet" href="https://code.jquery.com/ui/1.14.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
<script src="https://code.jquery.com/ui/1.14.1/jquery-ui.js"></script>
<style>
   #datepicker1, #datepicker2 {
      display:none;
   }
   .remodal.pop_place.full {
    max-height: 90vh;
    height: auto !important;
    overflow-y: auto;
}
</style>
<!-- <html lang="ko" class="pc"> -->
<head>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">


<link rel="shortcut icon" href="/koBus/resources/images/favicon.ico">



<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- <script type="text/javascript" src="/koBus/js/jquery-1.12.4.min.js"></script> -->
<script type="text/javascript">
/*********************************************
 * 상수K
 *********************************************/
</script>


<link rel="stylesheet" type="text/css"
	href="/koBus/resources/cdn-main/ui.jqgrid.custom.css">

<script>
     $( function() {
     $("#startdate_btn").click(function(){
		 $("#datepicker1").datepicker("show");
	});

	 $("#enddate_btn").click(function(){
		 $("#datepicker2").datepicker("show");
	});
 });
</script>

<script type="text/javascript" src="/koBus/resources/js/common/ui.js"></script>
<script type="text/javascript" src="/koBus/resources/js/plugin.js"></script>
<script type="text/javascript" src="/koBus/resources/js/common.js"></script>

<script type="text/javascript" src="/koBus/resources/js/jquery/jquery.number.js"></script>
<script type="text/javascript" src="/koBus/resources/js/security.js"></script>


<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="/koBus/resources/cdn-main/common/style.css">
<script type="text/javascript"
	src="/koBus/js/kor/new-kor-ui.js?v=0102.0"></script>
</head>



<script>
	$(document).ready(function() {
		var langCd = 'KO';
		var langLi = $(".dropdown-wrap.lang-select .dropdown-list li");
		$.each(langLi, function(ix, el) {
			var langItem = $(el).children('a');
			var lang = langItem.data('lang');
			if (langCd == lang) {
				dropdown_process(langItem);
			}
		});

		$('.title_wrap').hide();
	});
</script>



<!-- <body class="main KO" style=""> -->
	


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

							<li class="selected"><a href="/reservation3.do" title="선택됨">고속버스예매</a></li>

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

							<li class="selected"><a href="/reservation3.do" title="선택됨">고속버스예매</a></li>

							<li><a href="/koBus/manageReservations.do">예매확인/취소/변경</a></li>

							<li><a href="#">영수증발행</a></li>


						</ul>
					</div>
				</li>
			</ol>
		
	</div>
</nav>

		
		<article id="new-kor-content" class="full">
			

<!-- 
	노선조회팝업화면 호출시 RotInfPup.js와 RotInfPup.jsp를 호출해준다.
	RotInfPup.js 에서 fnEmptyCssStup() 를 호출한다. 부모페이지에서 해당 function 생성해서 해당page에 맞는 내용으로 변경해준다.
 -->
<script type="text/javascript" src="/koBus/resources/js/common/RotInfPup.js"></script>
		<script type="text/javascript" src="/koBus/resources/js/common/RotInf.js"></script>
		<script type="text/javascript" src="/koBus/resources/js/MrsCfmLgn.js"></script>
<style>
.oneway { width:100%; }

@media screen and (max-width: 767px){
   .route_box .oneway .radio_area { 
        position: absolute; 
        top: 5px; 
        font-size: 15px; 
        width: 50%; 
        max-width: 100px; 
        left: calc(50% - 100px); 
        bottom: auto; 
    }
   .route_box .tabs.mobile_tabs { 
        margin-bottom: 0px; 
    }
} 
</style>

<form name="rotInfFrm" id="rotInfFrm" method="post" action="/koBus/reservation2.do"> 
	<input type="hidden" name="sourcePage" value="KOBUSreservationRegion.jsp">
	<input type="hidden" name="deprCd" id="deprCd" value=""><!-- 출발지코드 -->
	<input type="hidden" name="deprNm" id="deprNm" value=""><!-- 출발지명 -->
	<input type="hidden" name="arvlCd" id="arvlCd" value=""><!-- 도착지코드 -->
	<input type="hidden" name="arvlNm" id="arvlNm" value=""><!-- 도착지명 -->
	<input type="hidden" name="tfrCd" id="tfrCd" value=""><!-- 환승지코드 -->
	<input type="hidden" name="tfrNm" id="tfrNm" value=""><!-- 환승지명 -->
	<input type="hidden" name="tfrArvlFullNm" id="tfrArvlFullNm" value=""><!-- 환승지포함 도착지 명 -->
	<input type="hidden" name="pathDvs" id="pathDvs" value=""><!-- 직통sngl,환승trtr,왕복rtrp -->
	<input type="hidden" name="pathStep" id="pathStep" value=""><!-- 왕복,환승 가는편순번 -->
	<input type="hidden" name="pathStepRtn" id="pathStepRtn" value=""><!-- 왕복,환승 가는편순번 -->
	<input type="hidden" name="crchDeprArvlYn" id="crchDeprArvlYn" value="N"><!-- 출도착지 스왑여부 -->
	<input type="hidden" name="deprDtm" id="deprDtm" value=""><!-- 가는날(편도,왕복) -->
	<!-- <input type="hidden" name="deprDtmAll" id="deprDtmAll" value="2025. 6. 7. 토"> -->
	<input type="hidden" name="deprDtmAll" id="deprDtmAll" value=""><!-- 가는날(편도,왕복) -->
	<!-- <input type="hidden" name="arvlDtm" id="arvlDtm" value="20250607"> -->
	<input type="hidden" name="arvlDtm" id="arvlDtm" value=""><!-- 오는날(왕복) -->
	<input type="hidden" name="arvlDtmAll" id="arvlDtmAll" value=""><!-- 오는날(왕복) -->
	<input type="hidden" name="busClsCd" id="busClsCd" value=""><!-- 버스등급 -->
	<input type="hidden" name="abnrData" id="abnrData" value=""><!-- 결과값여부 -->
	<input type="hidden" name="prmmDcYn" id="prmmDcYn" value="N"><!-- 시외우등할인대상노선 -->
	<input type="hidden" name="takeTime" id="takeTime" value="0"><!-- 시외우등할인대상노선 --
	>
	
	<input type="hidden" name="extrComp" id="extrComp" value=""><!-- 거래처코드 -->
	<input type="hidden" name="stdDtm" id="stdDtm" value="">
	<input type="hidden" name="endDtm" id="endDtm" value="">
	<input type="hidden" name="queryTime" id="queryTime" value="">
	<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
</form>

			<div class="loading" id="loading" style="height: 1553px; top: 180px; display: none;"><p class="load" style="margin-left: -53px;"><span class="sr-only">로딩중입니다</span></p></div>
	
			<div class="title_wrap in_process route_chk ticketingT" style="display: none;">
				



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
				<div class="content-header" data-page-title="예매정보입력(노선조회) | 고속버스예매 | 고속버스예매 | 고속버스통합예매">
					<div class="container">
						<div class="title-area">
							<h2 class="page-title">고속버스예매</h2>
							<ol class="process">
								<li class="active" title="현재 단계"><span class="num">1</span> 예매정보입력</li>
								<li><span class="num">2</span> 결제정보입력</li>
								<li><span class="num">3</span> 예매완료</li>
							</ol>
						</div>
						<!-- 광고 배너 추후 추가 예정 -->
						<!-- <iframe src="/html/_ad-frame.html" title="광고 프레임" class="ad-frame ad-frame-title"></iframe> -->
					</div>
				</div>
						
			

		
		
		
			<div class="content-body">
				<div class="container">
		
			
				<h3>노선조회</h3>
				<div class="route_box">
					<div class="tab_wrap" id="rtrpYnAll">
						<ul class="tabs col2 clear">
							<li class="oneway active" id="snglRotAll">
								<a href="javascript:void(0)" onclick="fnPathDvsChk('snglRot');" title="선택됨">편도</a>
								<p class="radio_area">
									<span class="custom_radio" onclick="fnPathDvsChk('sngl')">
										<input type="radio" id="r1" name="route" checked="checked">
										<label for="r1">직통</label>
									</span>
									
									
										<span class="custom_radio" onclick="fnPathDvsChk('trtr')">
											<input type="radio" id="r2" name="route">
											<label for="r2">환승</label>
										</span>
									
								</p>
							</li>
							
								<li class="roundtrip" id="rtrpRotAll"><a href="javascript:void(0)" onclick="fnPathDvsChk('rtrp')">왕복</a></li>
							
						</ul>
						 <div class="tab_cont clear">
							<ul class="place">
								
									<li>
										<!-- a href="#"-->
										<a href="javascript:void(0)" id="readDeprInfoList" class="btn_pop_focus" onclick="fnReadDeprInfoList(event);">
											<span class="name">출발지</span>
											<p class="text empty"> <!-- 값이 있을경우 'empty' class가 없음 -->
												<span class="empty_txt">선택</span><span class="val_txt" id="deprNmSpn"></span>
											</p>
											<!-- 값이 있을경우 'empty' class가 없음 -->
										</a>
										<button type="button" class="btn_change" onclick="fnCrchDeprArvl();" id="chgDeprArvl" style="display: block;">
											<span class="sr-only">출발지, 도착지 교체</span>
										</button>
									</li>
									<li>
										<a href="javascript:void(0)" id="readArvlInfoList" class="btn_pop_focus" onclick="fnReadArvlInfoList(event);">
											<span class="name">도착지</span> 
											<p class="text empty">
												<span class="empty_txt">선택</span><span class="val_txt" id="arvlNmSpn"></span>
											</p>
											<!-- 값이 없을경우 'empty' class가 있음 -->
										</a>
									</li>
								
								
							</ul>
							
							<ul class="date">
                                             <li>
                                                <div class="date_picker_wrap">
                                                   <span class="name">가는날</span> <input type="text"
                                                      id="datepicker1" tabindex="-1" title="가는날"
                                                      readonly="true">

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
                                             <li class="return">
                                                <div class="date_picker_wrap">
                                                   <span class="name">오는날</span>
                                                   <!-- [2024 마크업 수정] -->
                                                   <input type="text" id="datepicker2" tabindex="-1"
                                                      title="오는날" readonly="true">

                                                   <label for="datepicker2" class="text_date text_date2">2025. 6. 26. 목</label>
                                                   <span class="date_wrap"> <a
                                                      href="javascript:void(0)" id="arvlThddChc"
                                                      class="active"
                                                      onclick="fnYyDtmStup(0,'text_date2','0');" title="선택됨">오늘</a>
                                                      <a href="javascript:void(0)" id="arvlNxdChc"
                                                      onclick="fnYyDtmStup(1,'text_date2','0');">내일</a>
                                                   </span>
                                                </div>
                                             </li>
                                 </ul>
                                 

								<div class="grade">
								<span class="name">등급</span>
								<p>
									<span class="custom_radio custom_radio_area gradeAll" style="margin-left: 45.3333px;">
										<input type="radio" id="busClsCd0" name="busClsCdR" onclick="fnBusClsCd(this)" value="0">
										<label for="busClsCd0">전체</label>
									</span>
									<span class="custom_radio custom_radio_area grade1" style="margin-left: 45.3333px;">
										<input type="radio" id="busClsCd7" name="busClsCdR" onclick="fnBusClsCd(this)" value="7">
										<label for="busClsCd7">프리미엄</label>
									</span>
									<span class="custom_radio custom_radio_area grade2" style="margin-left: 45.3333px;">
										<input type="radio" id="busClsCd1" name="busClsCdR" onclick="fnBusClsCd(this)" value="1">
										<label for="busClsCd1">우등</label>
									</span>
									<span class="custom_radio custom_radio_area grade3" style="margin-left: 45.3333px;">
										<input type="radio" id="busClsCd5" name="busClsCdR" onclick="fnBusClsCd(this)" value="2">
										<label for="busClsCd5">일반</label>
									</span>
								</p>
							</div>
							<p class="check" id="alcnSrchBtn">
								<button type="button" class="btn_confirm ready noHover btn_pop_focus" onclick="fnAlcnSrch();">조회하기</button>
							</p>
						 </div>
					</div>
				</div>

					<div class="section">
							<ul class="desc_list">
								<li>당일출발 차량의 경우 출발시간 1시간 전까지 홈페이지 예매가 가능하며 1시간 미만 출발임박 차량의 예매를 원하시면 고속버스 모바일앱에서 예매하시기 바랍니다.</li>
								<li>1회 최대 예매 매수는 6매입니다. (일부 시외우등 노선에 한정하여 10매까지 예매가능)</li>
								<li>마일리지 구매 승차권은 프리미엄/편도 노선에 한정하여 각 1매씩 예매 가능합니다.(*회원대상)</li>
								<li>일반고속 청소년(중, 고등학생) 할인은 터미널 현장에서 학생증 및 청소년증을 제시 해야만 할인이 적용되며 탑승 시 소지가 꼭 필요합니다.</li>
								<li>할인 승차권 부정 사용 시 운임의 10배 부가운임을 요구할 수 있습니다.</li>
							</ul>
						</div>				
						<div class="section">
							<h4>취소수수료</h4>
							<div class="tbl_type1">
								<table class="MsoNormalTable __se_tbl table_type2" border="0" cellspacing="0" cellpadding="0" _se2_tbl_template="14">
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
								                    <b><span style="color: #000;font-size: 10pt;">구분</span></b>
								                </p>
								            </th>
								            <th class=" undraggable" scope="col">
								                <p align="center" class="MsoNormal">
								                    <b><span style="color: #000;font-size: 10pt;">월~목</span></b>
								                </p>
								            </th>
								            <th class=" undraggable" scope="col">
								                <p align="center" class="MsoNormal">
								                    <b><span style="color: #000;font-size: 10pt;">금~일<br>공휴일</span></b>
								                </p>
								            </th>
								            <th class=" undraggable" scope="col">
								                <p align="center" class="MsoNormal">
								                    <b><span style="color: #000;font-size: 10pt;">명절<br>(설,추석)</span></b>
								                </p>
								            </th>
								        </tr>
								    </thead>
								    <tbody>
								        <tr>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>2일전</span>
								                    </p>
								                </b>
								            </td>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>0%</span>
								                    </p>
								                </b>
								            </td>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>0%</span>
								                    </p>
								                </b>
								            </td>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>0%</span>
								                    </p>
								                </b>
								            </td>
								        </tr>
								        <tr>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>1일전 ~ 3시간 이전</span>
								                    </p>
								                </b>
								            </td>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>5%</span>
								                    </p>
								                </b>
								            </td>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>7.50%</span>
								                    </p>
								                </b>
								            </td>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>10%</span>
								                    </p>
								                </b>
								            </td>
								        </tr>
								        <tr class="type2">
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>3시간 미만 ~ 출발 전</span>
								                    </p>
								                </b>
								                
								            </td>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>10%</span>
								                    </p>
								                </b>
								            </td>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>15%</span>
								                    </p>
								                </b>
								            </td>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>20%</span>
								                    </p>
								                </b>
								            </td>
								        </tr>
								        <tr>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>출발 후 ~ 도착예정시간 이전</span>
								                    </p>
								                </b>
								            </td>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>25년: 50%<br>26년 : 60%<br>27년 : 70%</span>
								                    </p>
								                </b>
								            </td>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>25년: 50%<br>26년 : 60%<br>27년 : 70%</span>
								                    </p>
								                </b>
								            </td>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>25년: 50%<br>26년 : 60%<br>27년 : 70%</span>
								                    </p>
								                </b>
								            </td>
								        </tr>
								        <tr>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>도착예정시간 초과</span>
								                    </p>
								                </b>
								            </td>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>100%</span>
								                    </p>
								                </b>
								            </td>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>100%</span>
								                    </p>
								                </b>
								            </td>
								            <td>
								                <b>
								                    <p align="center" class="MsoNormal">
								                        <span>100%</span>
								                    </p>
								                </b>
								            </td>
								        </tr>
								    </tbody>
								</table>
								<p style="font-size:14px;color:#000;margin-top:15px;">* 명절 취소수수료 기준은 설/추석 전전일, 전일, 당일 및 다음날에 적용합니다.</p>
								<p style="font-size:14px;color:#000;">* 출발 이후부터 도착예정시간까지의 취소수수료 기준은 `25년 5월1일부터 `26년 4월30일까지는 50%, `26년 5월1일부터 `27년 4월30일까지는 60%, `27년 5월1일부터는 70%를 적용한다.</p>
								<p style="font-size:14px;color:#000;">* 지정차 출발 당일에 승차권을 발행한 경우는 발행시점 기준 1시간 이내까지 취소수수료 미부과 (단, 지정차 출발 이후에는 승차권 발행시점과 상관없이 취소수수료 부과)</p>
							</div>
							<ul class="desc_list">
								<li>사용하지 않은 모든 승차권은 지정차 출발 후 도착예정시간이 지나면 환불하실 수 없습니다.</li>
								<li>취소수수료 산정은 날짜를 기준(시간 기준이 아님)으로 합니다.<br>홈페이지 예매 후 창구에서 발권 시 예매에 사용한 신용카드를 반드시 지참하셔야 합니다. 현행법상 신용카드는 타인에게 대여, 양도 할 수 없습니다.</li>
								<li>홈티켓 발권 시 반드시 인쇄하신 홈티켓을 소지 하시고 차량에 탑승하시기 바랍니다. 홈티켓 분실 시  <a href="/mrs/mrscfmlgnchec.do" class="accent">[예매 확인/취소/변경]</a> 메뉴 혹은 출발지 터미널 창구에서 재발행 받으셔야 합니다.</li>
								<li>모바일 티켓으로 예매하시면 [고속버스 모바일앱]의 [예매확인] 메뉴에서 승차권을 확인할 수 있습니다. 스마트폰에 고속버스 모바일앱을 설치 하여 승차권을 확인하시고 차량에 탑승하시기 바랍니다.</li><!-- 1103 -->
								<li>본 홈페이지를 통한 승차권 예매는 실시간 온라인 처리가 되므로 회원장애나 기타 통신장애로 인하여 예매 성공여부를 확인하지 못한 경우에는 반드시 예매 확인/취소/변경 메뉴를 통하여 성공여부를 확인하시기 바랍니다.</li>
								<li>출발시간이 지난 후에는 승차권을 발권받을 수 없습니다. 출발 당일 터미널 혼잡에 대비하여 출발시간보다 여유있게 터미널에 도착하셔서 발권 받으시기 바랍니다.</li>
								<li>계좌이체를 이용할 경우 왕복 승차권 예매가 불가하오니 신용카드 결제 혹은 편도 승차권 예매를 이용하시기 바랍니다.</li>
							</ul>
						</div>
					
				

				<div class="section">
					<div class="customer_box">
						<p class="desc">노선안내 및 좌석여부 기타사항은 각 출발지 터미널 안내센터를 이용해 주시기 바랍니다. </p>
						<!-- <div class="info_tel">
							<span>고속버스 홈페이지 고객센터</span>
							<p><strong>1644-9030</strong>(전국 국번없이)</p>
						</div> -->
					</div>
				</div>
			</div>
			
			
			
				</div>
			

		<script type="text/javascript">
		$(document).ready(function(){
			cookiedata = document.cookie;
		     if (cookiedata.indexOf("mobileInfoPup=done") < 0){
// 20210621 yahan 팝업삭제
// 				var popTmoney =  $('[data-remodal-id=popTmoney]').remodal();
// 				popTmoney.open();
		     }
		});		
		</script>

		



		<!-- 출/도착지 선택 레이어팝업 -->
		

		<!-- 161228 팝업수정 -->
		<!-- 모바일티머니 고속버스 예매안내 팝업 -->
		
		<!-- //161228 팝업수정 -->


		<!-- 시외노선 우등형 할인 안내 -->
		


<!-- 노선조회안내 팝업 - 서울~강릉 - 190227 추가 -->

<!-- 노선조회안내 팝업 - 동서울~강릉 - 190227 추가 -->

<!-- 노선조회안내 팝업 - 수원~삼척 - 190227 추가 -->

<!-- 노선조회안내 팝업 - 서울경부~동해 - 190227 추가 -->

<!-- 노선조회안내 팝업 속초 - 190227 추가 -->


<!-- 노선조회안내 팝업 원주 - 190926 추가 -->


<!-- 광양 임시터미널 안내 - 191031 추가 -->




		</article>



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
						<button type="button" onclick="fnDeprChc('REG002','서울 경부')"
							name="imptDeprNm" value="REG002">서울 경부</button>
						<button type="button" onclick="fnDeprChc('REG003','센트럴시티(서울)')"
							name="imptDeprNm" value="REG003" class="over">센트럴시티(서울)</button>
						<button type="button" onclick="fnDeprChc('REG139','광주(유·스퀘어)')"
							name="imptDeprNm" value="REG139">광주(유·스퀘어)</button>
						<!--  class="active" -->
						<button type="button" onclick="fnDeprChc('REG041','부산')"
							name="imptDeprNm" value="REG041">부산</button>
						<button type="button" onclick="fnDeprChc('REG042','서부산')"
							name="imptDeprNm" value="REG042">서부산</button>
						<button type="button" onclick="fnDeprChc('REG001','동서울')"
							name="imptDeprNm" value="REG001">동서울</button>
						<button type="button" onclick="fnDeprChc('REG031','대전')"
							name="imptDeprNm" value="REG031">대전</button>
						<button type="button" onclick="fnDeprChc('REG068','전주')"
							name="imptDeprNm" value="REG068">전주</button>
						<button type="button" onclick="fnDeprChc('REG007','인천공항')"
							name="imptDeprNm" value="REG007">인천공항</button>
						<button type="button" onclick="fnDeprChc('REG033','천안')"
							name="imptDeprNm" value="REG033">천안</button>
						<button type="button" onclick="fnDeprChc('REG145','대구')"
							name="imptDeprNm" value="REG145">대구</button>
						<button type="button" onclick="fnDeprChc('REG009','성남')"
							name="imptDeprNm" value="REG009">성남</button>
					</div>
				</div>
				<!-- 지역별 터미널 모달창 연동 JSP 코드 -->
				<div class="terminal_wrap">
					<h3 class="stit">지역별 터미널</h3>
					<div class="ternimal_box">
						<div class="area_scroll scrollbar-inner">
							<ul class="area_list">
								<li class="active" id="areaListAll">
									<button type="button" onclick="fnDeprArvlViewList('all');"
										title="선택됨">전체</button>
								</li>
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

						<!-- 터미널 리스트 출력 -->
						<div class="terminal_list" id="terminalList">
							<h4 class="sr-only">지역별 터미널 목록</h4>
							<div class="terminal_scroll scrollbar-inner" style="position: relative;">
								<div class="terminal_scroll scrollbar-inner scroll-content"
									style="height: 420px; margin-bottom: 0px; margin-right: 0px; max-height: none;">
								<ul class="clear" id="tableTrmList">
									<!-- JS에서 동적으로 터미널 버튼 삽입 -->
								</ul>
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


				

				<script>
					cmdType = "";
					//let lastSidoCode = null;
					let sidoCode = "all";
				
					  $(document).ready(function () {
						    console.log("페이지 로딩 완료");

						    // 출발지 클릭 시
						    $("#readDeprInfoList").on("click", function () {
						      cmdType = "depr";
						      console.log("전송할 sidoCode:", sidoCode);
						      fnDeprArvlViewList("all");
						    });

						    // 도착지 클릭 시
						    $("#readArvlInfoList").on("click", function () {
						      cmdType = "arvl";
						      fnDeprArvlViewList("all");
						    });
						    
						
						  });
				
					// 지역 선택 → 터미널 목록 조회
					function fnDeprArvlViewList(sidoCode) {
					    console.log("▶ 터미널 요청:", sidoCode, cmdType);

					    $.ajax({
					      <%-- url: "<%=request.getContextPath()%>/getTerminals.do", --%>
					      url: "<%= request.getContextPath() %>/getTerminals.do",
					      method: "GET",
					      data: { sidoCode: sidoCode },
					      dataType: "json",
					      success: function(terminals) {
					        

					        const $list = $("#tableTrmList").empty();
					        terminals.forEach(function(t) {
					        	  const funcName = (cmdType === "arvl") ? "fnArvlChc" : "fnDeprChc";
					        	  const button = `<li><button type="button" onclick="\${funcName}('\${t.regID}', '\${t.regName}')">\${t.regName}</button></li>`;
					        	  $list.append(button);
					        	});
					      },
					      error: function(xhr, status, error) {
					        alert("❌ 터미널 목록 실패");
					        console.error(status, error);
					      }
					    });
					  }
				
					// 출발지 선택
					function fnDeprChc(regID, regName) {
						console.log("선택된 출발지:", regID, regName);
						$("#popDeprNmSpn").text(regName);
						$("#deprCd").val(regID);
						$("#deprNm").val(regName);
					}
				
					// 도착지 선택
					function fnArvlChc(regID, regName) {
						console.log("선택된 도착지:", regID, regName);
						$("#popArvlNmSpn").text(regName);
						$("#arvlCd").val(regID);
						$("#arvlNm").val(regName);
				
						// 도착지 선택 시 확인 버튼 활성화
						$("#cfmBtn").removeAttr("disabled").addClass("active");
						$("#cfmBtn").css({
							"background-color": "#003087",
							"color": "#fff"
						});
					}
		</script>


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
	<div id="mobileInfoPup" class="remodal pop_tmoney remodal-is-initialized remodal-is-closed" data-remodal-id="popTmoney" role="dialog" tabindex="-1">
			<div class="title">
				<h2>모바일티머니 <span>고속버스</span> 예매안내</h2>
			</div>
			<div class="cont">
				<p class="txt">
					<strong>모바일티머니 사용하신다면? 지금 바로</strong><strong class="accent">고속버스 모바일앱</strong><strong>접속하세요.</strong><br>
					<span>아직도 카드번호 입력하세요? 언제 어디서나 간편하게 결제하는 고속버스 티머니 예매!</span>
				</p>
				<p class="txt">※ 안드로이드 단말기만 지원되며 모바일티머니APP 설치가 필요합니다.</p>
				<div class="phone_wrap clfix">
					<p class="phone1">
						<strong>터치한번으로</strong>
						<img src="/koBus/resources/images/page/tmoney_phone1.png" alt="모바일티머니 결제화면"><!-- 1103 -->
					</p>
					<p class="phone2">
						<strong>결제완료!</strong>
						<img src="/koBus/resources/images/page/tmoney_phone2.png" alt="모바일티머니 결제완료화면">
					</p>
				</div>
			</div>
			<div class="btns">
				<button type="button" data-remodal-action="cancel" class="remodal-cancel" onclick="closeWinAt00('mobileInfoPup', 1);">오늘 하루 보지 않기</button>
				<!-- <button type="button" data-remodal-action="confirm" class="remodal-confirm" onclick="window.open('http://www.epassmobile.co.kr','','');">모바일티머니 예매하기</button> --><!-- 1103 -->
			</div>
			<button type="button" data-remodal-action="close" class="remodal-close"><span class="sr-only">닫기</span></button>
		</div></div><div class="remodal-wrapper remodal-is-closed" style="display: none;"><div id="ctyPrmmDcInf" class="remodal pop_gradeinfo remodal-is-initialized remodal-is-closed" data-remodal-id="popGradeinfo" role="dialog" tabindex="-1"> <!--  -->
			<div class="title">
				<h2>시외노선 우등형 할인 안내</h2>
			</div>
			<div class="cont">
				<p class="tbl_desc">예매하시려는 노선은 우등 형 할인혜택이 제공되는 시외노선입니다.<br>우등등급에 한정하여 예매 시 할인이 제공되며 상세조건은 아래와 같습니다.</p>
				<div class="tbl_type1">
					<table>
						<caption>시외노선 우등형 할인 안내</caption>
						<colgroup>
							<col style="width: 15%;">
							<col style="width: auto">
							<col style="width: 30%;">
						</colgroup>
						<thead>
							<tr>
								<th scope="col">구분</th>
								<th scope="col">내용</th>
								<th scope="col">할인율</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">사전예매</th>
								<td>
									<ul class="desc_list">
										<li>차량 출발일 2일(48시간) 전까지 예매한 경우</li>
										<li>최대 예매 승차권수는 10매로 제한</li>
									</ul>
								</td>
								<td><span class="accent show_mo">할인율 : </span>우등버스 정상요금의 10%</td>
							</tr>
							<tr>
								<th scope="row">단체예매</th>
								<td>
									<ul class="desc_list">
										<li>단체승객(5인 이상 10인 이하)이 승차권을 사전 예매한 경우</li>
										<li>최대 예매 승차권수는 10매로 제한</li>
									</ul>
								</td>
								<td><span class="accent show_mo">할인율 : </span>우등버스 정상요금의 10%</td>
							</tr>
							<tr>
								<th scope="row">왕복예매</th>
								<td>
									<ul class="desc_list">
										<li>동일 노선/구간의  왕복 승차권을 예매한 경우</li>
										<li>왕복 각각 동일한 할인율을 적용</li>
										<li>최대 예매 승차권수는 10매로 제한</li>
									</ul>
								</td>
								<td><span class="accent show_mo">할인율 : </span>우등버스 정상요금의 10%<span class="line_block">(편도 각 10%)</span></td>
							</tr>
							
							
							
							
						</tbody>
					</table>
				</div>
				<ul class="desc_list">
					<li>할인혜택은 성인 승차권 예매 기준입니다. (아동/중고생은 제외)</li>
					<li>사전에 홈페이지와 모바일앱 예매를 이용한 승객에게만 적용됩니다.(터미널 현장 발권은 대상제외. 단, 뒷좌석 예매는 예외)</li>
					<li>명절 연휴 특송기간(설, 추석 등)은 할인이 적용되지 않습니다.</li>
					<li>할인 적용된 우등버스 요금이 일반ㆍ직행 버스 요금보다 낮을 경우, 일반ㆍ직행 버스 요금을 적용하게 됩니다.</li>
					<li>왕복할인/단체할인을 적용하여 홈페이지 예매 완료 시 매수변경이 불가하니 유의하시기 바랍니다.</li>
					<li>할인 적용 시에는 신용카드결제만 가능합니다.</li>
				</ul>
			</div>
			<div class="btns">
				<button data-remodal-action="cancel" class="remodal-cancel">취소</button>
				<button class="remodal-confirm" data-remodal-action="confirm" onclick="fnCloseGradePop();">예매진행</button>
			</div>
			<button data-remodal-action="close" class="remodal-close"><span class="sr-only">닫기</span></button>
		</div></div><div class="remodal-wrapper remodal-is-closed" style="display: none;"><div class="remodal pop_route remodal-is-initialized remodal-is-closed" data-remodal-id="popRoute1" role="dialog" tabindex="-1">
	<div class="title">
		<h2>노선조회안내</h2>
	</div>
	<div class="cont">
		<ul class="txt">
<!-- 			<li><strong>1. 요금할인</strong> -->
<!-- 				<ul class="desc_list"> -->
<!-- 					<li>요금인상 없이 종전 요금 이용</li> -->
<!-- 				</ul> -->
<!-- 			</li> -->
			<li><strong>1. 제휴할인 서비스</strong>
				<ul class="desc_list">
					<li>강릉지역 렌터카 및 맛집, 카페 등 이용할인</li>
					<li><a href="https://www.kobus.co.kr/cscn/ntcmttr/readNtc.do?ntcNo=20190226001" title="새창" target="_blank" class="accent">이용방법 및 업체 상세보기 &gt;</a></li>
				</ul>
			</li>
			<li><strong>2. 프리미엄 버스 확대 운행</strong>
				<ul class="desc_list">
					<li>월~목 10%, 금~일 5% 할인 시행 중</li>
					<!-- <li>주말 이용 시 마일리지 미 적립</li> -->
				</ul>
			</li>
		</ul>
	</div>
	<div class="btns">
		<button data-remodal-action="confirm" class="remodal-confirm" onclick="fnRotVldChc();">확인</button>
	</div>
	<button data-remodal-action="close" class="remodal-close"><span class="sr-only">닫기</span></button>
</div></div><div class="remodal-wrapper remodal-is-closed" style="display: none;"><div class="remodal pop_route remodal-is-initialized remodal-is-closed" data-remodal-id="popRoute2" role="dialog" tabindex="-1">
	<div class="title">
		<h2>노선조회안내</h2>
	</div>
	<div class="cont">
		<ul class="txt">
<!-- 			<li><strong>1. 요금 변경 안내</strong> -->
<!-- 				<ul class="desc_list"> -->
<!-- 					<li>2020년 7월 10일부터 변경된 할인율 적용</li> -->
<!-- 				</ul> -->
<!-- 			</li> -->
<!-- 			<li><strong>1. 요금할인</strong> -->
<!-- 				<ul class="desc_list"> -->
<!-- 					<li>평균 25% 요금할인으로 이용</li> -->
<!-- 				</ul> -->
<!-- 			</li> -->
			<li><strong>제휴할인 서비스</strong>
				<ul class="desc_list">
					<li>강릉지역 렌터카 및 맛집, 카페 등 이용할인</li>
					<li><a href="https://www.kobus.co.kr/cscn/ntcmttr/readNtc.do?ntcNo=20190226001" title="새창" target="_blank" class="accent">이용방법 및 업체 상세보기 &gt;</a><br>
						'코버스' 홈페이지 공지사항<br>
						'강원도 노선업무 제휴 업체 리스트' 참조</li>
				</ul>
			</li>
			<li id="popRoute2_txt" style="display:none;">
				<strong>롯데렌터카 업무제휴</strong>
				<ul class="desc_list">
					<li>해당 노선 이용시 롯데렌터카 렌트비 50% 할인!<br>(2018년 11월 15일부터)</li>
					<li>문의 : 033) 642-8000(강릉), 033) 632-8000(속초)</li>
					<li>많은 이용 바랍니다. 감사합니다.</li>
				</ul>
			</li>
		</ul>
	</div>
	<div class="btns">
		<button data-remodal-action="confirm" class="remodal-confirm" onclick="fnRotVldChc();">확인</button>
	</div>
	<button data-remodal-action="close" class="remodal-close"><span class="sr-only">닫기</span></button>
</div></div><div class="remodal-wrapper remodal-is-closed" style="display: none;"><div class="remodal pop_route remodal-is-initialized remodal-is-closed" data-remodal-id="popRoute3" role="dialog" tabindex="-1">
	<div class="title">
		<h2>노선조회안내</h2>
	</div>
	<div class="cont">
		<ul class="txt">
			<li><strong>제휴할인 서비스</strong>
				<ul class="desc_list">
					<li><span id="arvlNmSpan3"></span>지역 렌터카 이용할인</li>
					<li><a href="https://www.kobus.co.kr/cscn/ntcmttr/readNtc.do?ntcNo=20190226001" title="새창" target="_blank" class="accent">이용방법 및 업체 상세보기 &gt;</a></li>
				</ul>
			</li>
		</ul>
	</div>
	<div class="btns">
		<button data-remodal-action="confirm" class="remodal-confirm" onclick="fnRotVldChc();">확인</button>
	</div>
	<button data-remodal-action="close" class="remodal-close"><span class="sr-only">닫기</span></button>
</div></div><div class="remodal-wrapper remodal-is-closed" style="display: none;"><div class="remodal pop_route remodal-is-initialized remodal-is-closed" data-remodal-id="popRoute4" role="dialog" tabindex="-1">
	<div class="title">
		<h2>노선조회안내</h2>
	</div>
	<div class="cont">
		<ul class="txt">
			<li><strong>1. 프리미엄 버스 운행 개시</strong>
				<ul class="desc_list">
					<li>최고급 버스를 15% 할인된 금액으로 상시 이용 가능</li>
					<li>주말 이용 시 마일리지 미적립</li>
				</ul>
			</li>
			<li><strong>2. 제휴할인 서비스</strong>
				<ul class="desc_list">
					<li><span id="arvlNmSpan4"></span>지역 렌터카 이용할인</li>
					<li><a href="https://www.kobus.co.kr/cscn/ntcmttr/readNtc.do?ntcNo=20190226001" title="새창" target="_blank" class="accent">이용방법 및 업체 상세보기 &gt;</a></li>
				</ul>
			</li>
		</ul>
	</div>
	<div class="btns">
		<button data-remodal-action="confirm" class="remodal-confirm" onclick="fnRotVldChc();">확인</button>
	</div>
	<button data-remodal-action="close" class="remodal-close"><span class="sr-only">닫기</span></button>
</div></div><div class="remodal-wrapper remodal-is-closed" style="display: none;"><div class="remodal pop_route remodal-is-initialized remodal-is-closed" data-remodal-id="popRoute5" role="dialog" tabindex="-1">
	<div class="title">
		<h2>노선조회안내</h2>
	</div>
	<div class="cont">
		<ul class="txt">
			<li><strong>제휴할인 서비스</strong>
				<ul class="desc_list">
					<li>속초지역 렌터카 및 맛집, 카페 등 이용할인</li>
					<li><a href="https://www.kobus.co.kr/cscn/ntcmttr/readNtc.do?ntcNo=20190226001" title="새창" target="_blank" class="accent">이용방법 및 업체 상세보기 &gt;</a></li>
				</ul>
			</li>
			<li>
				<strong>롯데렌터카 업무제휴</strong>
				<ul class="desc_list">
					<li>해당 노선 이용시 롯데렌터카 렌트비 50% 할인!<br>(2018년 11월 15일부터)</li>
					<li>문의 : 033) 642-8000(강릉), 033) 632-8000(속초)</li>
					<li>많은 이용 바랍니다. 감사합니다.</li>
				</ul>
			</li>
		</ul>
	</div>
	<div class="btns">
		<button data-remodal-action="confirm" class="remodal-confirm" onclick="fnRotVldChc();">확인</button>
	</div>
	<button data-remodal-action="close" class="remodal-close"><span class="sr-only">닫기</span></button>
</div></div><div class="remodal-wrapper remodal-is-closed" style="display: none;"><div class="remodal pop_route remodal-is-initialized remodal-is-closed" data-remodal-id="popRoute6" role="dialog" tabindex="-1">
	<div class="title">
		<h2>제휴할인 서비스</h2>
	</div>
	<div class="cont">
		<ul class="txt">
			<li><strong>제휴할인 서비스</strong>
				<ul class="desc_list">
					<li>원주지역 렌터카 및 영화, 식당 등 이용할인</li>
					<li><a href="https://www.kobus.co.kr/cscn/ntcmttr/readNtc.do?ntcNo=20190226001" title="새창" target="_blank" class="accent">이용방법 및 업체 상세보기 &gt;</a></li>
				</ul>
			</li>
		</ul>
	</div>
	<div class="btns">
		<button data-remodal-action="confirm" class="remodal-confirm" onclick="fnRotVldChc();">확인</button>
	</div>
	<button data-remodal-action="close" class="remodal-close"><span class="sr-only">닫기</span></button>
</div></div>
	<div class="remodal-wrapper remodal-is-closed" style="display: none;">
		<div
			class="remodal pop_route remodal-is-initialized remodal-is-closed"
			data-remodal-id="popTmpTml" role="dialog" tabindex="-1">
			<div class="title">
				<h2>광양 임시터미널 안내</h2>
			</div>
			<div class="cont">
				<ul class="txt">
					<li><strong>광양 임시터미널(인동숲 주차장) 안내</strong>
						<p style="margin-top: 10px;">
							<img src="/koBus/resources/images/page/pop_img01.png"
								alt="광양임시터미널 - 타이어뱅크와 국민은행 사이 옆길 진입도" width="640">
						</p></li>
					<li><strong>광양 임시터미널 승차홈</strong>
						<p>
							<img src="/koBus/resources/images/page/pop_img02.png"
								alt="광양임시터미널 승차홈별 지역(상세 다음 참고)" width="640">
						</p>
						<div class="sr-only">
							<ul>
								<li>1승차홈 : 서울(센트럴), 동서울, 대전, 청주, 통영</li>
								<li>2승차홈 : 광주, 목포, 인천공항</li>
								<li>3승차홈 : 동광양, 대구/부천, 성남/수원, 안산/안양, 인천/전주</li>
								<li>4승차홈 : 경주, 노포, 동래, 부산사상, 포항</li>
								<li>5승차홈 : 김해, 남해, 마산, 울산, 진교, 진주</li>
								<li>6승차홈 : 광영/녹동, 순천/여천, 여수/완도, 태인도, 해남</li>
							</ul>
						</div>
						<p></p></li>
				</ul>
			</div>
			<div class="btns">
				<button data-remodal-action="confirm" class="remodal-confirm"
					onclick="fnRotVldChc();">확인</button>
			</div>
			<button data-remodal-action="close" class="remodal-close">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
<!-- </body></html> -->
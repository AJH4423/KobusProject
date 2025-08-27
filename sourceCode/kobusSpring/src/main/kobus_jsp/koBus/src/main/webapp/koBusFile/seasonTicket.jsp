<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" class="pc">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta name="viewport"
	content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">

<title>결제정보입력 | 고속버스예매 | 고속버스예매 | 고속버스통합예매</title>

<link rel="shortcut icon" type="image/x-icon" href="/koBus/media/favicon.ico">

<script type="text/javascript">
	/*********************************************
	 * 상수
	 *********************************************/
</script>


<link rel="stylesheet" type="text/css"
	href="/koBus/css/common/ui.jqgrid.custom.css">

<script type="text/javascript"
	src="/koBus/js/common/jquery-1.12.4.min.js"></script>
<script type="text/javascript">
	//쿠키 가져오기
	function getCookie(name) {
		var nameOfCookie = name + "=";
		var x = 0;
		while (x <= document.cookie.length) {
			var y = (x + nameOfCookie.length);
			if (document.cookie.substring(x, y) == nameOfCookie) {
				if ((endOfCookie = document.cookie.indexOf(";", y)) == -1) {
					endOfCookie = document.cookie.length;
				}
				return unescape(document.cookie.substring(y, endOfCookie));
			}
			x = document.cookie.indexOf(" ", x) + 1;
			if (x == 0) {
				break;
			}
		}
		return "";
	}
	//쿠키 넣기
	function setCookie(name, value, expiredays) {
		var todayDate = new Date();
		todayDate.setDate(todayDate.getDate() + expiredays);
		document.cookie = name + "=" + escape(value) + "; path=/; expires="
				+ todayDate.toGMTString() + ";"
	}

	// 상단 네비게이션, 모바일 좌측, 모바일 하단 언어선택 설정
	var lngCdCookie = getCookie("LNG_CD");

	lngCdCookie = (lngCdCookie != null && lngCdCookie != undefined && lngCdCookie != "") ? lngCdCookie
			: "";
	var lngCd = (lngCdCookie == "EN" || lngCdCookie == "CN"
			|| lngCdCookie == "JP" || lngCdCookie == "KO") ? lngCdCookie : "KO";
	$(document)
			.ready(
					function() {
						if (navigator.userAgent.toUpperCase().indexOf("MSIE 5") >= 0
								|| navigator.userAgent.toUpperCase().indexOf(
										"MSIE 6") >= 0
								|| navigator.userAgent.toUpperCase().indexOf(
										"MSIE 7") >= 0
								|| navigator.userAgent.toUpperCase().indexOf(
										"MSIE 8") >= 0) {
							// IE 8 이하
							if (location.href.indexOf("/underIE8.do") < 0) {
								// IE 8 이하 페이지 아님
								location.href = "/underIE8.do";
								return false;
							}
						}
						if (window.innerWidth < 768) {
							setCookie("IS_MOBILE_YN_WIDTH", "Y", 365);
							if (lngCd == "KO"
									&& location.href.indexOf("/cmn/") < 0
									&& location.href.indexOf("/underIE8.do") < 0
									&& location.href
											.indexOf("/mrs/mrsrecppub.do") < 0
									&& location.href
											.indexOf("/mrs/mrsrecppub4.do") < 0
									&& location.href
											.indexOf("/mrs/mrsmbltck.do") < 0
									&& location.href
											.indexOf("/mrs/acntpympup.do") < 0
									&& // 계좌이체
									location.href.indexOf("/mrs/pay") < 0
									&& // 간편결제
									location.href
											.indexOf("/adtnprdnew/prchpt/adtnrecppubmbl.do") < 0
									&& location.href
											.indexOf("/adtnprdnew/frps/frpsPrchGdMbl.do") < 0
									&& location.href
											.indexOf("/mbrs/mbrsscsn.do") < 0) {
								/* location.href = "/mblIdx.do"; */
								return false;
							}
						} else {
							setCookie("IS_MOBILE_YN_WIDTH", "N", 365);
						}
						// 타이틀 수정
						if ($("h2").length > 0) {
							$("title").text(
									$("title").text() + " - "
											+ $("h2:eq(0)").text());
						}
						var $objBody = $("body");
						if (!($objBody.hasClass("KO")
								|| $objBody.hasClass("EN")
								|| $objBody.hasClass("CN") || $objBody
								.hasClass("JP"))) {
							$objBody.addClass(lngCd);
						}

						/* asis */
						$(
								"#lng_cd_navi option[value='" + lngCd
										+ "'],#lng_cd_foot option[value='"
										+ lngCd + "']").attr("selected",
								"selected");
						$("#lng_cd_navi,#lng_cd_foot")
								.unbind("change")
								.bind(
										"change",
										function() {
											var tempCd = this.value;
											lngCd = (tempCd != null
													&& tempCd != undefined
													&& tempCd != "" && (tempCd == "EN"
													|| tempCd == "CN"
													|| tempCd == "JP" || tempCd == "KO")) ? tempCd
													: "KO";
											setCookie("LNG_CD", lngCd, 1);
											lngCdCookie = lngCd;
											//document.location.reload();
											location.href = "/main.do";
										});
					});

	if (lngCd == "KO") {
		var dt = new Date(); //오늘날짜 전체
		var yyyy = dt.getFullYear(); //선택한 년도
		var mm = dt.getMonth() + 1; //선택한 월
		var mm2Len = Number(mm) < 10 ? "0" + mm : mm; // 선택ㅡㅜ?ㅌ월 ex:01 두글자로 변환
		var ddTo = Number(dt.getDate()) < 10 ? "0" + dt.getDate() : dt
				.getDate(); // 숫자형
		var yymmddD0 = yyyy + "" + mm2Len + "" + ddTo; //오늘날짜

		var url = window.location.pathname;

		if (yymmddD0 < 20200128) {
			if (url == "/main.do")
				location.href = "/mainExp.do";
		}
	}
</script>
<script type="text/javascript" src="/koBus/js/common/ui.js"></script>
<script type="text/javascript" src="/koBus/js/common/plugin.js"></script>
<script type="text/javascript" src="/koBus/js/common/common.js"></script>

<script type="text/javascript" src="/koBus/js/common/jquery.number.js"></script>
<script type="text/javascript" src="/koBus/js/common/security.js"></script>


<link rel="stylesheet" type="text/css"
	href="/koBus/css/common/style.css">
<script type="text/javascript" src="/koBus/js/common/new-kor-ui.js"></script>
<script type="text/javascript"
	src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"></script>
<script src="https://cdn.iamport.kr/v1/iamport.js"></script>
<link rel="stylesheet" type="text/css" href="/koBus/css/transkey.css">
</head>


<body class="KO">
	<%@ include file="common/header.jsp"%>

	<nav id="new-kor-breadcrumb">
		<div class="container">

			<ol class="breadcrumb-list">
				<li><i class="ico ico-home"></i><span class="sr-only">홈</span></li>

				<li>
					<div class="dropdown-wrap breadcrumb-select">

						<a href="javascript:void(0)" class="btn-dropdown" title="대메뉴 선택"
							aria-expanded="false"> <span class="text">프리패스/정기권</span><i
							class="ico ico-dropdown-arrow"></i></a>

						<ul class="dropdown-list" style="display: none;">

							<li><a href="/koBus/region.do">고속버스예매</a></li>

							<li><a href="/koBus/kobusSchedule.do">운행정보</a></li>

							<li class="selected"><a href="/koBus/kobusSchedule.do"
								title="선택됨">프리패스/정기권</a></li>
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
							aria-expanded="false"> <span class="text">정기권</span><i
							class="ico ico-dropdown-arrow"></i></a>
						<ul class="dropdown-list" style="display: none;">
							<li><a href="/koBus/kobusSchedule.do">프리패스 여행권</a></li>
							<li class="selected"><a
								href="/koBus/koBusFile/seasonTicket.jsp" title="선택됨">정기권</a></li>
							<li><a href="/koBus/page/itemPurListPage.do">상품 구매내역</a></li>

						</ul>
					</div>
				</li>
			</ol>

		</div>
	</nav>
	<article id="new-kor-content">
		<script type="text/javascript" src="/koBus/js/PassPrch.js"></script>

		<!-- 20200617 yahan -->
		<script type="text/javascript" src="/koBus/js/transkey.js"></script>
		<script type="text/javascript" src="/koBus/js/TranskeyLibPack_op.js"></script>
		<script type="text/javascript" src="/koBus/js/rsa_oaep-min.js"></script>
		<script type="text/javascript" src="/koBus/js/jsbn-min2.js"></script>
		<script type="text/javascript" src="/koBus/js/typedarray.js"></script>
		<script type="text/javascript" src="/koBus/images/transkeyServlet"></script>
		<script type="text/javascript" src="/koBus/images/transkeyServlet(1)"></script>
		<script>
			$(function() {
				initTranskey();
			})
		</script>

		<div class="title_wrap in_process seasonTicketT"
			style="display: none;">

			<a
				href="https://www.kobus.co.kr/adtnprdnew/pass/passPrch.do?prdprchVal=1#"
				class="back">back</a> <a
				href="https://www.kobus.co.kr/adtnprdnew/pass/passPrch.do?prdprchVal=1#"
				class="mo_toggle">메뉴</a>


			<h2>고속버스 정기권</h2>
			<ol class="process">
				<li>구매정보안내</li>
				<li class="active">구매정보입력</li>
				<li class="last">구매완료</li>
			</ol>
		</div>

		<div class="content-header"
			data-page-title="정기권(구매정보입력) | 프리패스/정기권 | 고속버스통합예매">
			<div class="container">
				<div class="title-area">
					<h2 class="page-title">정기권</h2>
					<ol class="process">
						<li><span class="num">1</span> 구매정보안내</li>
						<li class="active" title="현재 단계"><span class="num">2</span>
							구매정보입력</li>
						<li><span class="num">3</span> 구매완료</li>
					</ol>
				</div>
			</div>
		</div>

		<div class="content-body pass_ticket">
			<div class="container">
				<form name="passPrchFrm" id="passPrchFrm" method="post">
					<input type="hidden" id="exdtSttDt" name="exdtSttDt" value="">
					<input type="hidden" id="exdtEndDt" name="exdtEndDt" value="">
					<input type="hidden" id="adtnDeprTrmlNo" name="adtnDeprTrmlNo"
						value=""> <input type="hidden" id="adtnArvlTrmlNo"
						name="adtnArvlTrmlNo" value=""> <input type="hidden"
						id="cardExdt" name="cardExdt" value=""> <input
						type="hidden" id="cardNo" name="cardNo" value=""> <input
						type="hidden" name="userDvsCd" id="userDvsCd" value="1"> <input
						type="hidden" id="adtnCpnNo" name="adtnCpnNo" value=""> <input
						type="hidden" id="adtnDeprNm" name="adtnDeprNm" value="">
					<input type="hidden" id="adtnArvlNm" name="adtnArvlNm" value="">
					<input type="hidden" id="adtnPrdUseClsNm" name="adtnPrdUseClsNm"
						value=""> <input type="hidden" id="adtnPrdUseNtknNm"
						name="adtnPrdUseNtknNm" value=""> <input type="hidden"
						id="wkdWkeNtknNm" name="wkdWkeNtknNm" value=""> <input
						type="hidden" id="timSttDte" name="timSttDte" value=""> <input
						type="hidden" id="timEndDte" name="timEndDte" value=""> <input
						type="hidden" id="prchAmt" name="prchAmt" value=""> <input
						type="hidden" name="goodsPrice" id="goodsPrice" value="">

					<input type="hidden" id="adtnPrdUseClsCd" name="adtnPrdUseClsCd"
						value=""> <input type="hidden" id="adtnPrdUseNtknCd"
						name="adtnPrdUseNtknCd" value=""> <input type="hidden"
						id="wkdWkeNtknCd" name="wkdWkeNtknCd" value=""> <input
						type="hidden" id="adtnPrdUsePsbDno" name="adtnPrdUsePsbDno"
						value=""> <input type="hidden" id="adtnPrdSno"
						name="adtnPrdSno" value="${adtnPrdSno}"> <input type="hidden"
						name="pymType" id="pymType" value="card"> <input
						type="hidden" name="track2Data" id="track2Data" value="">

					<input type="hidden" name="authInf" id="authInf" value="">

					<div class="section">
						<div class="agreement_wrap">
							<div class="agreement_tit">
								<h4 class="first">서비스 이용약관 동의</h4>
							</div>
							<div class="agreement_cont scrollbar-inner">
								<iframe src="/koBus/cmn/SvcUtlzStplAgrm.do?type=서비스"
									frameborder="0" scrolling="no" width="100%" title="서비스 이용약관 내용"
									onload="resize(this);"></iframe>
							</div>
							<span class="custom_check chk_blue"> <input
								type="checkbox" id="agree1" onclick="fnChgCfmBtn();"> <label
								for="agree1">동의</label>
							</span>
						</div>
						<div class="agreement_wrap">
							<div class="agreement_tit">
								<h4>운송약관 동의</h4>
							</div>
							<div class="agreement_cont scrollbar-inner">
								<iframe src="/koBus/cmn/TransitStplAgrm.do?type=운송"
									frameborder="0" scrolling="no" width="100%" height="100"
									title="운송약관 동의 내용" onload="resize(this);"></iframe>
							</div>
							<span class="custom_check chk_blue"> <input
								type="checkbox" id="agree2" onclick="fnChgCfmBtn();"> <label
								for="agree2">동의</label>
							</span>
						</div>
						<div class="agreement_wrap">
							<div class="agreement_tit">
								<h4>개인정보 수집 및 이용 동의</h4>
							</div>
							<div class="agreement_cont scrollbar-inner">
								<div class="terms_wrap">
									<h1>개인정보 수집 및 이용 동의</h1>
									<dl>
										<dt>
											<span class="emphasis">1. 수집 및 이용의 목적</span>
										</dt>
										<!-- 181121 수정 -->
										<dd>
											<p>고속버스 승차권 온라인 예매 서비스의 제공</p>
										</dd>
										<dt>2. 수집하는 항목</dt>
										<dd>
											<p>신용카드 번호ㆍ유효기간ㆍ신용카드 비밀번호 앞 2자리, 생년월일, 휴대전화번호</p>
										</dd>
										<dt>
											<span class="emphasis">3. 보유 및 이용 기간</span>
										</dt>
										<!-- 181121 수정 -->
										<dd>
											<p>5년 (근거: 전자상거래 등에서의 소비자 보호에 관한 법률)</p>
										</dd>
										<dt>4. 개인정보 수집 및 이용 동의 거부 시 프리패스 구매 하실 수 없습니다.</dt>
										<!-- 181121 추가 -->
									</dl>
									<p>시행일자 : 2017년 5월 18일</p>
								</div>
							</div>
							<span class="custom_check chk_blue"> <input
								type="checkbox" id="agree3" onclick="fnChgCfmBtn();"> <label
								for="agree3">동의</label>
							</span>
						</div>
						<p class="agree_all chk_bor">
							<span class="custom_check chk_purple"> <input
								type="checkbox" id="agreeAll"> <label for="agreeAll">전체
									약관에 동의합니다.</label>
							</span>
						</p>
					</div>
					<div class="section">
						<h4 class="first">구매 선택 사항</h4>
						<div class="custom_input type3">
							<div class="line_box">
								<dl class="dl_tbl1">
									<dt>
										<span>이용노선</span>
									</dt>
									<dd>
										<div class="boxinput_wrap col2 clfix">
											<div class="box_inputForm click_box inselect no-strong">


												<!-- 웹 접근성 개선 셀렉트 박스 UI -->

												<div class="dropdown-wrap select-default">
													<a href="javascript:void(0)"
														class="btn-dropdown btn_pop_focus" title="이용노선 선택"
														aria-expanded="false" id="rotSelectric"> <span
														class="text">이용노선을 선택하세요</span>
													</a>
													<ul class="dropdown-list" id="selUseRotLi">
														<c:forEach var="route" items="${routeList}">
															<li><a href="javascript:void(0)"
																onclick="onSelectChange(this, '${route.routeId}', 'selUseRot')">
																	${route.startName} ↔ ${route.endName} </a></li>
														</c:forEach>
													</ul>
													<input type="hidden" name="selUseRot" id="selUseRot"
														value="">
												</div>


											</div>
										</div>
										<ul class="via_list" id="useRotDtl" style="display: none;">
											<c:forEach var="station" items="${selectedRoute.viaList}">
												<li>${station}</li>
											</c:forEach>
										</ul>
										<p class="txt_gray" id="useRotDtlDsc" style="display: none;"></p>
									</dd>
								</dl>
							</div>
							<!-- 181218 수정 -->
							<div class="line_box">
								<div class="dl_tbl_wrap col2">
									<dl class="dl_tbl1">
										<dt>
											<span>사용시작일</span>
										</dt>
										<dd>
											<div class="box_inputForm desc_wrap">
												<div class="box_inputForm click_box date_picker_wrap">
													<strong class="label">사용시작일</strong>
													<!-- <span class="text_date text_date1" id="datepickerView"></span>
											<input type="text" id="datepickerItem" name="sttDt" readonly> -->
													<p class="text">
														<input type="text" id="datepickerItem" name="sttDt"
															tabindex="-1" readonly=""> <label
															for="datepickerItem" id="datepickerView"
															class="text_date text_date1"></label>
													</p>
												</div>
												<p class="desc">※ 이용노선 선택 후 사용시작일 선택 가능</p>
											</div>
										</dd>
									</dl>
									<dl class="dl_tbl1">
										<dt>
											<span>생년월일</span>
										</dt>
										<dd>
											<!-- 181219 수정 -->
											<div class="box_inputForm desc_wrap">
												<div class="box_inputForm intxt">
													<label for="mbrsBrdt" class="label">생년월일
														6자리(YYMMDD)</label> <span class="box_label"> <input
														type="text" name="mbrsBrdt" id="mbrsBrdt"
														placeholder="예)1980년11월11일 -&gt; 801111" class="input"
														maxlength="6" onkeyup="fn_chkMonth(this, 3)">
													</span>
												</div>
												<p class="desc">※ 주민등록증 생년월일로 기입 (승차권 결제 시 확인 필요)</p>
											</div>
											<!-- //181219 수정 -->
										</dd>
									</dl>
								</div>
							</div>

							<div class="line_box">
								<dl class="dl_tbl1">
									<dt>
										<span>구매옵션</span>
									</dt>
									<dd>
										<div class="boxinput_wrap col2 clfix">
											<div class="box_inputForm desc_wrap">

												<div
													class="box_inputForm click_box inselect no-strong tooltip_wrap">

													<a href="javascript:void(0)" class="tip_click"
														aria-expanded="false"><span class="sr-only">옵션
															안내</span></a>
													<div class="tooltip" style="display: none;">
														<p class="tit">옵션 안내</p>
														<ul class="desc_list">
															<!-- 191118 수정 -->
															<li>이용권종 :
																<ul class="dash_list">
																	<li>일반 정기권 : 성인</li>
																	<li>학생 정기권 : 학생, 청소년, 대학생</li>
																</ul>
															</li>
															<!-- //191118 수정 -->
															<li>버스이용등급 :
																<ul class="dash_list">
																	<li>우등 : 우등고속, 심야우등(심우) 탑승 가능</li>
																	<li>고속 : 일반고속, 심야고속(심고) 탑승 가능</li>
																	<li>전체 : 우등, 고속 모두 탑승 가능</li>
																</ul>
															</li>
															<li>사용일 :
																<ul class="dash_list">
																	<li>전일권 : 월~일 사용 가능</li>
																	<!-- 191118 수정 -->
																	<li>평일권 : 월~금 사용 가능</li>
																	<!-- 20200909 yahan -->
																</ul>
															</li>
														</ul>
														<a href="javascript:void(0)" class="close"><span
															class="sr-only">닫기</span></a>
													</div>


													<!-- 웹 접근성 개선 셀렉트 박스 UI -->

													<div class="dropdown-wrap select-default">
														<a href="javascript:void(0)" class="btn-dropdown"
															title="구매옵션 선택" aria-expanded="false" id="optSelectric">
															<span class="text">구매옵션을 선택하세요</span>
														</a>
														<ul class="dropdown-list" id="selOptionLi"
															style="display: none;">
															<c:forEach var="opt" items="${optionList}">
																<li><a href="javascript:void(0)"
																	onclick="onSelectChange(this, '${opt.optionId}', 'selOption', '${opt.useClsNm}/${opt.periodNm}/${opt.busGradeNm}')">
																		<!-- 옵션명 구성 (예시) --> ${opt.useClsNm} / ${opt.periodNm}
																		/ ${opt.busGradeNm} (${opt.useDays}일)
																</a></li>
															</c:forEach>
														</ul>
														<input type="hidden" name="selOption" id="selOption"
															value=""> <input type="hidden"
															name="selOptionText" id="selOptionText" value="">
													</div>


													<!-- //190121 추가 -->
												</div>
												<p class="desc" id="tmpPsbYN" style="display: none;">※
													해당 옵션은 임시차 배차도 사용 가능합니다.</p>
												<!-- 190319 추가 -->
											</div>
											<!-- 190319 추가 -->
											<div class="box_inputForm intxt input_noti no-strong"
												id="divTermDesc" style="display: none;">
												<span class="box_label">해당 상품의 사용 기간은 <span
													id="spanTermDt"></span> 입니다.<br> <span id="label_week">주말,(임시)공휴일
														사용 가능합니다.</span> <span id="label_holi" style="color: red">주말,(임시)공휴일
														사용 불가합니다.</span> <!--
											// 20200909 yahan 
											<span id='label_spexp' style='color:red'>9월 29일은 특송기간인 관계로 사용 불가합니다.</span>
											-->
												</span>
											</div>
											<!-- //190319 추가 -->
										</div>
									</dd>
								</dl>
							</div>

						</div>
					</div>

					<h4 class="mo_page">결제정보 입력</h4>
					<div class="custom_input clfix">
						<div class="tab_wrap inradio tab_type2">
							<ul class="tabs clfix col1" id="payTyepAllUl">
								<li id="cardLi" class="active"><input type="radio"
									id="payType1" name="payType" title="선택됨"><label
									for="payType1">카드결제</label></li>

							</ul>

							<ul class="desc_list">
								<li>모든 결제정보는 암호화 처리 후 안전하게 전송됩니다.</li>
								<li>구매가 완료된 후 구매 확인 메뉴를 통해 구매내역을 확인 하시기 바랍니다.</li>
								<li>비밀번호 입력 오류가 3회 이상 발생할 경우 홈페이지에서 결제가 불가하니 카드사/은행을 방문하셔서
									처리 후 다시 시도 바랍니다.</li>
							</ul>





						</div>
						<div class="payment_sum" style="height: 382px;">
							<div class="tbl_type3">
								<table class="taR">
									<caption>결제 정보 표이며 이용노선, 이용권종, 사용일, 버스이용등급, 이용가능일수,
										사용기간, 결제금액 정보 제공</caption>
									<colgroup>
										<col style="width: 115px;">
										<col style="width: *;">
									</colgroup>
									<tbody>
										<tr>
											<th scope="row">이용노선</th>
											<td class="ticketRoute" id="rotTd">출발지 ↔ 목적지</td>
										</tr>
										<tr>
											<th scope="row">이용권종</th>
											<td id="kindTd"></td>
										</tr>
										<tr>
											<th scope="row">사용일</th>
											<td id="weekTd"></td>
										</tr>
										<tr>
											<th scope="row">버스이용등급</th>
											<td id="gradeTd"></td>
										</tr>
										<tr>
											<th scope="row">이용가능일수</th>
											<td id="dayTd"></td>
										</tr>
										<tr>
											<th scope="row">사용기간</th>
											<td id="fulTermTd"></td>
										</tr>
										<tr class="total">
											<th scope="row" class="txt_black">결제금액</th>
											<td class="totalPrice" id="pubAmt">0 원</td>
										</tr>
									</tbody>
								</table>
							</div>
							<p class="btn bottom">
								<button type="button" class="btnL btn_confirm ready"
									id="goPrdprchFn">결제하기</button>
							</p>
						</div>
					</div>


					<input type="hidden" id="hidfrmId" name="hidfrmId"
						value="passPrchFrm"><input type="hidden"
						id="transkeyUuid_passPrchFrm" name="transkeyUuid_passPrchFrm"
						value="6e90439343e12022daaceed98b4520f329b46378091aec26f1d410b0a8c7d703"><input
						type="hidden" id="transkey_cardNum3_passPrchFrm"
						name="transkey_cardNum3_passPrchFrm" value=""><input
						type="hidden" id="transkey_HM_cardNum3_passPrchFrm"
						name="transkey_HM_cardNum3_passPrchFrm" value=""><input
						type="hidden" id="transkey_cardNum4_passPrchFrm"
						name="transkey_cardNum4_passPrchFrm" value=""><input
						type="hidden" id="transkey_HM_cardNum4_passPrchFrm"
						name="transkey_HM_cardNum4_passPrchFrm" value=""><input
						type="hidden" id="transkey_cardPwd_passPrchFrm"
						name="transkey_cardPwd_passPrchFrm" value=""><input
						type="hidden" id="transkey_HM_cardPwd_passPrchFrm"
						name="transkey_HM_cardPwd_passPrchFrm" value="">
				</form>
			</div>

		</div>

	</article>


	<!-- 푸터 -->
	<%@ include file="common/footer.jsp"%>
</body>
</html>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>

<html class="pc" lang="ko">
<head>
<meta charset="utf-8" />
<link rel="shortcut icon" type="image/x-icon"
	href="/koBus/media/favicon.ico">
<meta
	content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
	name="viewport" />
<meta content="IE=Edge" http-equiv="X-UA-Compatible" />
<title>아이디 찾기 | 고속버스통합예매</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />

<link href="/koBus/css/common/ui.jqgrid.custom.css" rel="stylesheet"
	type="text/css" />







<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<link href="/koBus/css/common/style.css" rel="stylesheet" type="text/css" />
</head>
<body class="KO" style="">

		<!-- breadcrumb -->
		<!-- 브레드크럼 -->
		<nav id="new-kor-breadcrumb">
			<div class="container"></div>
		</nav>
		<article id="new-kor-content">

			<div class="loading" id="loading" style="height: 587px; top: 180px;">
				<p class="load" style="margin-left: -53px;">
					<span class="sr-only">로딩중입니다</span>
				</p>
			</div>
			<div class="title_wrap joinT" style="display: none;">
				<a class="back" href="#">back</a> <a class="mo_toggle" href="#">메뉴</a>
				<h2>아이디 찾기</h2>
			</div>
			<!-- 타이틀 -->
			<div class="content-header" data-page-title="아이디 찾기 | 고속버스통합예매">
				<div class="container">
					<div class="title-area">
						<h2 class="page-title">아이디 찾기</h2>
					</div>
				</div>
			</div>
			<div class="content-body login_find">
				<div class="container">
					<form method="post" name="SrchIdInqrFrm" onsubmit="return false;">
						<div class="noti_wrap">
							<p class="noti">회원가입 시 입력한 휴대폰번호를 입력하세요.</p>
						</div>
						<div class="find_wrap id_find">
							<div class="find_box">
								<div class="find_input clfix">
									<div class="box_inputForm">
										<label class="label" for="hpNo">휴대폰번호</label> <span
											class="box_label"> <input class="input" id="hpNo"
											name="hpNo" onchange="fnIcoCheck();"
											onkeyup="this.value = onlyNumPlus(this.value);fnIcoCheck();"
											placeholder="휴대폰번호를 입력하세요" type="text" />
										</span>
									</div>
									<button class="btnL btn_confirm ready" id="btn_confirm"
										name="btn_confirm" onclick="srchHpCheck();" type="button">확인</button>
								</div>
							</div>
							<!-- 조회결과 -->
							<div class="find_result" id="findResult" style="display: none;">
								<div class="find_list">
									<p class="desc">회원님의 아이디는 다음과 같습니다.</p>
									<ul id="InqrId">
									</ul>
									<p class="bul">개인정보 보호를 위하여 일부 글자가 *로 표시됩니다.</p>
								</div>
							</div>
							<!-- // 조회결과 -->
						</div>
						<!-- 조회결과가 있을경우에만 노출 -->
						<p class="btns col2" id="btnsCol2" style="display: none;">
							<a class="btnL btn_confirm" href="javascript:lgnSearchPwd();">비밀번호
								찾기</a> <a class="btnL btn_confirm" href="javascript:loginMain();">로그인</a>
						</p>
						<!-- // 조회결과가 있을경우에만 노출 -->
					</form>
					<form name="lgnForm">
						<input id="returnUrl" name="returnUrl" type="hidden"
							value="/mbrs/mbrspage/myPageMain.do" />
					</form>
				</div>
			</div>
		</article>
		<!-- footer -->
		<!-- 푸터 -->
		<footer id="new-kor-footer">
			<div class="container">
				<div class="footer-top-cont">
					<ul class="express-bus-company-list">
						<li><a href="http://www.kumhobuslines.co.kr" target="_blank"
							title="새창"><img alt="금호고속"
								src="/koBus/images/kor/layout/logo-kumho-express.png" /></a></li>
						<li><a href="http://www.dongbubus.com" target="_blank"
							title="새창"><img alt="동부고속"
								src="/koBus/images/kor/layout/logo-dongbu-express.png" /></a></li>
						<li><a href="http://www.songnisanbuslines.co.kr"
							target="_blank" title="새창"><img alt="속리산고속"
								src="/koBus/images/kor/layout/logo-sokrisan-express.png" /></a></li>
						<li><a href="http://www.dyexpress.co.kr" target="_blank"
							title="새창"><img alt="동양고속"
								src="/koBus/images/kor/layout/logo-dongyang-express.png" /></a></li>
						<li><a href="http://www.samhwaexpress.co.kr" target="_blank"
							title="새창"><img alt="삼화고속"
								src="/koBus/images/kor/layout/logo-samhwa-express.png" /></a></li>
						<li><a href="http://www.jabus.co.kr" target="_blank"
							title="새창"><img alt="중앙고속"
								src="/koBus/images/kor/layout/logo-joongang-express.png" /></a></li>
						<li><a href="http://www.chunilexpress.co.kr" target="_blank"
							title="새창"><img alt="천일고속"
								src="/koBus/images/kor/layout/logo-chunil-express.png" /></a></li>
						<li><a href="http://www.hanilexpress.co.kr" target="_blank"
							title="새창"><img alt="한일고속"
								src="/koBus/images/kor/layout/logo-hanil-express.png" /></a></li>
					</ul>
					<!-- dropdown-top 클래스 추가 시, 드롭다운 목록 위로 노출 -->
					<div class="dropdown-wrap dropdown-top related-sites-select">
						<a aria-expanded="false" class="btn-dropdown"
							href="javascript:void(0)" title="관련사이트 이동"><span class="text">관련사이트</span><i
							class="ico ico-arrow-down"></i></a>
						<ul class="dropdown-list">
							<li class="selected"><a href="/wchr/main.do" target="_blank"
								title="새창">장애인 휠체어 사이트</a></li>
							<li><a href="https://www.tago.go.kr" target="_blank"
								title="새창">국가대중교통정보센터</a></li>
							<li><a href="https://www.intis.or.kr" target="_blank"
								title="새창">인천장애인콜택시</a></li>
							<li><a href="http://www.shinsegaecentralcity.com"
								target="_blank" title="새창">센트럴시티터미널</a></li>
							<li><a href="https://txbus.t-money.co.kr" target="_blank"
								title="새창">시외버스 통합예매시스템</a></li>
						</ul>
					</div>
				</div>
				<div class="footer-bottom-cont">
					<address class="address">
						<ul class="policy-list">
							<li><a href="/etc/svcstpl/SvcStpl.do">서비스 이용약관</a></li>
							<li><a class="text-bold" href="/etc/indlstpl/IndlStpl.do">개인정보
									처리방침</a></li>
							<li><a href="/etc/busstpl/BusStpl.do">고속버스 운송약관</a></li>
							<li><a href="http://www.tmoney.co.kr" target="_blank"
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
								alt="(사)한국장애인단체총연합회 한국웹접근성인증평가원 웹 접근성 우수사이트 인증마크(WA인증마크)"
								height="40"
								src="/koBus/images/kor/layout/logo-accessibility2.png" /></a></li>
						<li><a href="/ugd/bustrop/Bustrop.do" title="이사장 인사말 바로가기"><img
								alt="KOBUS 전국고속버스운송사업조합"
								src="/koBus/images/kor/layout/logo-kobus.png" /></a></li>
						<li><a href="/ugd/trmlbizr/Trmlbizr.do" title="협회장 인사말 바로가기"><img
								alt="전국여객자동차터미널사업자협회"
								src="/koBus/images/kor/layout/logo-npvtba-express.png" /></a></li>
					</ul>
				</div>
			</div>
		</footer>
	</div>
</body>
</html>
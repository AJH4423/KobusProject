<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="shortcut icon" type="image/x-icon"
	href="${pageContext.request.contextPath}/resources/media/favicon.ico">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/media/style.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/media/ui.jqgrid.custom.css">
<title>유실물센터 안내(상세) | 고객지원 | 고속버스통합예매</title>
<style>
:root {
	/* 컬러 변수 싹 제거함 */
	
}

/* ▼ 드롭다운 화살표 아이콘 */
.ico-dropdown-arrow {
	display: inline-block;
	width: 20px;
	height: 20px;
	background-image: url("/koBus/resources/media/ico-dropdown-arrow@2x.png");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	text-indent: -9999px;
	vertical-align: middle;
	transform: rotate(180deg);
	transition: transform 0.3s ease;
}

.btn-dropdown.open .ico-dropdown-arrow {
	transform: rotate(0deg);
}

/* breadcrumb */
.breadcrumb-list>li {
	position: relative;
	display: inline-flex;
	align-items: center;
	gap: 8px;
}

.btn-dropdown {
	font-size: 16px;
	background: none;
	border: none;
	cursor: pointer;
	padding: 4px 8px;
	display: inline-flex;
	align-items: center;
	gap: 6px;
	font-family: "Pretendard", sans-serif;
}

.dropdown-list {
	position: absolute;
	top: 100%;
	left: 0;
	margin-top: 5px;
	background: white;
	border: 1px solid transparent;
	display: none;
	flex-direction: column;
	z-index: 100;
	box-shadow: none;
}

.dropdown-list li.selected>a {
	font-weight: bold;
}

.dropdown-list li>a {
	display: flex;
	align-items: center;
	height: 40px;
	padding: 0 12px;
	text-decoration: none;
	box-sizing: border-box;
	font-size: 14px;
	font-family: "Pretendard", sans-serif;
	line-height: 1.4;
}

.dropdown-list li>a:hover {
	background: none;
}

/* 유실물 안내 박스 */
.com_info.clfix {
	line-height: 1.4;
	margin: 0 auto 25px;
	zoom: 1;
	display: table;
	width: 100%;
	padding: 20px;
	border: 1px solid transparent;
	box-sizing: border-box;
	font-family: "Pretendard", sans-serif;
	font-size: 15px;
	line-height: 1.6;
	border-radius: 6px;
	max-width: 1080px;
}

/* 가운데 정렬된 표 */
.tbl_type1.responsive.col3 {
	-webkit-text-size-adjust: none;
	font-size: 16px;
	letter-spacing: 0;
	font-family: "Pretendard GOV Variable", "Pretendard GOV", sans-serif;
	line-height: 1.4;
	box-sizing: border-box;
	margin: 0 auto;
	padding: 40px 20px 60px;
	border-top: 1px solid transparent;
	min-height: calc(100vh - 399px);
	max-width: 1080px;
}

.tbl_type1.responsive.col3 table {
	width: 100%;
	border-collapse: collapse;
	background: white;
}

.tbl_type1.responsive.col3 caption {
	padding: 10px 0;
	font-weight: 600;
	text-align: left;
}

.tbl_type1.responsive.col3 th, .tbl_type1.responsive.col3 td {
	padding: 14px 10px;
	text-align: left;
	font-size: 15px;
	line-height: 1.5;
	word-break: keep-all;
}

.tbl_type1.responsive.col3 th {
	font-weight: 600;
}
</style>

</head>
<body>
	

	<nav id="new-kor-breadcrumb">
		<div class="container">

			<ol class="breadcrumb-list">
				<li><i class="ico ico-home"></i><span class="sr-only">홈</span></li>

				<li>
					<div class="dropdown-wrap breadcrumb-select">


						<a href="javascript:void(0)" class="btn-dropdown" title="대메뉴 선택"
							aria-expanded="false"> <span class="text">고객지원</span><i
							class="ico ico-dropdown-arrow"></i></a>



						<ul class="dropdown-list" style="display: none;">

							<li><a href="/mrs/rotinf.do">고속버스예매</a></li>

							<li><a href="/oprninf/alcninqr/oprnAlcnPage.do">운행정보</a></li>

							<li><a href="/adtnprdnew/frps/frpsPrchGd.do">프리패스/정기권</a></li>

							<li><a href="/ugd/mrsgd/Mrsgd.do">이용안내</a></li>



							<li class="selected"><a href="javascript:void(0)"
								title="선택됨">고객지원</a></li>

							<li><a href="/ugd/bustrop/Bustrop.do">전국고속버스운송사업조합</a></li>

							<li><a href="/ugd/trmlbizr/Trmlbizr.do">터미널사업자협회</a></li>

						</ul>
					</div>
				</li>

				<li>
					<div class="dropdown-wrap breadcrumb-select">


						<a href="javascript:void(0)" class="btn-dropdown" title="하위메뉴 선택"
							aria-expanded="false"> <span class="text">유실물센터 안내</span><i
							class="ico ico-dropdown-arrow"></i></a>


						<ul class="dropdown-list" style="display: none;">


							<li><a href="${pageContext.request.contextPath}/board/list.do">게시판</a></li>

							<li><a href="${pageContext.request.contextPath}/faq/list.do">자주찾는 질문</a></li>

							<li class="selected"><a href="${pageContext.request.contextPath}/losscenter/lossmain.do">유실물센터 안내</a></li>


						</ul>
					</div>
				</li>
			</ol>

		</div>
	</nav>
	<div class="com_info clfix">
		<p class="img">
			<img src="${pageContext.request.contextPath}/resources/media/lost_com4_s.png" alt="중앙고속" class="hide_mo">
			<!-- 170227 수정 -->
			<img src="${pageContext.request.contextPath}/resources/media/lost_comL4.png" alt="중앙고속" class="show_mo">
			<!-- 170227 수정 -->
		</p>
		<p class="info">경기도 화성시 풀무골로 1</p>
	</div>
	<div class="tbl_type1 responsive col3">
			<table>
				<caption>유실물 센터 목록이며 영업소, 주소, 전화번호 정보 제공</caption>
				<colgroup>
					<col style="width: 20%;">
					<col style="width: 40%;">
					<col style="width: auto">
				</colgroup>
				<thead>
					<tr>
						<th scope="col">영업소</th>
						<th scope="col">주소</th>
						<th scope="col">전화번호</th>
					</tr>
				</thead>
				<tbody>
					<!-- 191025 수정 -->
					<tr>
						<td class="branch">서울(경부선)</td>
						<td class="addr"> 서울특별시 서초구 신반포로 194 서울고속터미널 7층 46호 </td>
						<td class="tel"> 02-3479-9584~5 </td>
					</tr>
					<tr>
						<td class="branch">서울(호남선)</td>
						<td class="addr"> 서울특별시 서초구 신반포로 194 서울고속터미널 7층 46호 </td>
						<td class="tel">02-594-0634~5 </td>
					</tr>
					<tr>
						<td class="branch">동서울</td>
						<td class="addr">서울특별시 광진구 강변역로 50</td>
						<td class="tel">02-446-1950~1</td>
					</tr>
					<tr>
						<td class="branch">강릉</td>
						<td class="addr">강원도 강릉시 하슬라로 15</td>
						<td class="tel"> 033-648-5897 </td>
					</tr>
					<tr>
						<td class="branch">강진</td>
						<td class="addr">전라남도 강진군 강진읍 영랑로 35</td>
						<td class="tel">062-367-7085</td>
					</tr>
					<tr>
						<td class="branch">고양</td>
						<td class="addr">경기도 고양시 일산동구 중앙로 1036</td>
						<td class="tel">031-973-8572</td>
					</tr>
					<tr>
						<td class="branch">광명</td>
						<td class="addr">경기도 광명시 광명역로 51</td>
						<td class="tel">031-486-7745</td>
					</tr>
					<tr>
						<td class="branch">광주</td>
						<td class="addr">광주광역시 서구 무진대로 904</td>
						<td class="tel">062-367-7085</td>
					</tr>
					<tr>
						<td class="branch">구미</td>
						<td class="addr">경상북도 구미시 송원동로 72</td>
						<td class="tel">054-453-0484</td>
					</tr>
					<tr>
						<td class="branch">군산</td>
						<td class="addr">전라북도 군산시 해망로 30</td>
						<td class="tel">063-445-2202</td>
					</tr>
					<tr>
						<td class="branch">나주</td>
						<td class="addr">전라남도 나주시 예향로 3803</td>
						<td class="tel">062-367-7085</td>
					</tr>
					<tr>
						<td class="branch">담양</td>
						<td class="addr">전라남도 담양군 담양읍 중앙로 24-1</td>
						<td class="tel">062-367-7085</td>
					</tr>
					<tr>
						<td class="branch">대구</td>
						<td class="addr">대구광역시 동구 효신로 88, 2층</td>
						<td class="tel">053-743-2601</td>
					</tr>
					<tr>
						<td class="branch">대전</td>
						<td class="addr">대전광역시 동구 동서대로 1695번길 30</td>
						<td class="tel">042-624-0118</td>
					</tr>
					<tr>
						<td class="branch">동광양</td>
						<td class="addr">전라남도 광양시 공영로 91</td>
						<td class="tel">055-752-5167</td>
					</tr>
					<tr>
						<td class="branch">마산</td>
						<td class="addr">경상남도 마산시 마산회원구 합포로 290</td>
						<td class="tel">055-288-3355</td>
					</tr>
					<tr>
						<td class="branch">부산(노포) </td>
						<td class="addr">부산광역시 금정구 중앙대로 2238</td>
						<td class="tel"> 051-508-8850 </td>
					</tr>
					<tr>
						<td class="branch">부산사상</td>
						<td class="addr">부산광역시 사상구 사상로 201</td>
						<td class="tel">051-508-8850</td>
					</tr>
					<tr>
						<td class="branch">상봉</td>
						<td class="addr">서울특별시 중랑구 상봉로 117</td>
						<td class="tel"> 02-446-1950~1 </td>
					</tr>
					<tr>
						<td class="branch">세종시 </td>
						<td class="addr">세종특별자치시 갈매로 37-12</td>
						<td class="tel">042-624-0118</td>
					</tr>
					<tr>
						<td class="branch">속초</td>
						<td class="addr">강원도 속초시 동해대로 3988</td>
						<td class="tel">033-648-5897</td>
					</tr>
					<tr>
						<td class="branch">시흥</td>
						<td class="addr">경기도 시흥시 옥구공원로 225</td>
						<td class="tel">031-486-7745</td>
					</tr>
					<tr>
						<td class="branch">안산</td>
						<td class="addr">경기도 안산시 상록구 항가울로 410</td>
						<td class="tel">031-486-7745</td>
					</tr>
					<tr>
						<td class="branch">영광</td>
						<td class="addr">전라남도 영광군 영광읍 신남로 180</td>
						<td class="tel">062-367-7085</td>
					</tr>
					<tr>
						<td class="branch">원주</td>
						<td class="addr">강원도 원주시 서원대로 181</td>
						<td class="tel">033-744-2290</td>
					</tr>
					<tr>
						<td class="branch">익산</td>
						<td class="addr">전라북도 익산시 익산대로 52</td>
						<td class="tel">063-445-2202</td>
					</tr>
					<tr>
						<td class="branch">인천</td>
						<td class="addr">인천광역시 미추홀구 연남로 35, 1층 13호</td>
						<td class="tel"> 031-486-7745 </td>
					</tr>
					<tr>
						<td class="branch">전주</td>
						<td class="addr">전라북도 전주시 덕진구 가리내로 70</td>
						<td class="tel">063-251-1177</td>
					</tr>
					<tr>
						<td class="branch">정읍</td>
						<td class="addr">전라북도 정읍시 연지1길 46-4</td>
						<td class="tel">063-535-4240</td>
					</tr>
					<tr>
						<td class="branch">조치원</td>
						<td class="addr">세종특별자치시 조치원읍 조치원로 54</td>
						<td class="tel">043-233-5501</td>
					</tr>
					<tr>
						<td class="branch">진주</td>
						<td class="addr">경상남도 진주시 동진로 16</td>
						<td class="tel">055-752-5167</td>
					</tr>
					<tr>
						<td class="branch">창원</td>
						<td class="addr">경상남도 창원시 의창구 창원대로 371</td>
						<td class="tel">055-288-3355</td>
					</tr>
					<tr>
						<td class="branch">청주</td>
						<td class="addr">충청북도 청주시 흥덕구 2순환로 1229</td>
						<td class="tel">043-233-5501</td>
					</tr>
					<tr>
						<td class="branch">춘천</td>
						<td class="addr">강원도 춘천시 터미널길 14번길 15</td>
						<td class="tel"> 033-744-2290 </td>
					</tr>
					<tr>
						<td class="branch">충주</td>
						<td class="addr">강원도 충주시 봉계1길 49</td>
						<td class="tel">033-744-2290</td>
					</tr>
					<!-- //191025 수정 -->
				</tbody>
			</table>
		</div>
	<script>
  document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn-dropdown");

    buttons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        const dropdown = btn.closest(".breadcrumb-select").querySelector(".dropdown-list");

        // 모든 드롭다운 닫기
        document.querySelectorAll(".dropdown-list").forEach((list) => {
          if (list !== dropdown) list.style.display = "none";
        });

        document.querySelectorAll(".btn-dropdown").forEach((b) => {
          if (b !== btn) b.classList.remove("open");
        });

        // toggle 현재 메뉴
        const isOpen = dropdown.style.display === "block";
        dropdown.style.display = isOpen ? "none" : "block";
        btn.classList.toggle("open", !isOpen);
      });
    });

    // 외부 클릭 시 닫기
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".breadcrumb-select")) {
        document.querySelectorAll(".dropdown-list").forEach((list) => {
          list.style.display = "none";
        });
        document.querySelectorAll(".btn-dropdown").forEach((btn) => {
          btn.classList.remove("open");
        });
      }
    });
  });
</script>


</body>

</html>
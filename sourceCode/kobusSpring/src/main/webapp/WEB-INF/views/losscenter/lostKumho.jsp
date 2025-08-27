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
.breadcrumb-list > li {
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

.dropdown-list li.selected > a {
  font-weight: bold;
}

.dropdown-list li > a {
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

.dropdown-list li > a:hover {
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

.tbl_type1.responsive.col3 th,
.tbl_type1.responsive.col3 td {
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
			<img src="${pageContext.request.contextPath}/resources/media/lost_com1_s.png" alt="금호고속" class="hide_mo">
			<!-- 170227 수정 -->
			<img src="${pageContext.request.contextPath}/resources/media/lost_comL1.png" alt="금호고속" class="show_mo">
			<!-- 170227 수정 -->
		</p>
		<p class="info">전라남도 나주시 송월동 1095-4번지</p>
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
				<tr>
					<td class="branch">강진</td>
					<td class="addr">전남 강진군 강진읍 영랑로 35</td>
					<td class="tel"><span>061-434-4371</span></td>
				</tr>
				<tr>
					<td class="branch">지도</td>
					<td class="addr">전남 신안군 지도읍 해제지도로 1240</td>
					<td class="tel"><span>061-275-0582</span></td>
				</tr>
				<tr>
					<td class="branch">경주</td>
					<td class="addr">경북 경주시 태종로 685번길 2</td>
					<td class="tel"><span>054-772-4445</span></td>
				</tr>
				<tr>
					<td class="branch">고흥</td>
					<td class="addr">전남 고흥군 고흥읍 터미널길 25</td>
					<td class="tel"><span>061-835-3560</span></td>
				</tr>
				<tr>
					<td class="branch">공주</td>
					<td class="addr">충남 공주시 신관로 74</td>
					<td class="tel"><span>041-855-2319</span></td>
				</tr>
				<tr>
					<td class="branch">광양</td>
					<td class="addr">전남 광양시 광양읍 순광로 688</td>
					<td class="tel"><span>061-761-2355</span></td>
				</tr>
				<tr>
					<td class="branch">광주</td>
					<td class="addr">광주 서구 무진대로 904</td>
					<td class="tel"><span>062-360-8715(고속)</span><span>062-360-8755(직행)</span></td>
				</tr>
				<tr>
					<td class="branch">군산</td>
					<td class="addr">전북 군산시 해망로 30</td>
					<td class="tel"><span>063-443-1928</span></td>
				</tr>
				<tr>
					<td class="branch">김제</td>
					<td class="addr">전북 김제시 동서로 241</td>
					<td class="tel"><span>02-530-6311</span></td>
				</tr>
				<tr>
					<td class="branch">나주</td>
					<td class="addr">전남 나주시 나주로 190</td>
					<td class="tel"><span>061-333-5522</span></td>
				</tr>
				<tr>
					<td class="branch">녹동</td>
					<td class="addr">전남 고흥군 도양읍 천마로 57</td>
					<td class="tel"><span>061-844-1423</span></td>
				</tr>
				<tr>
					<td class="branch">논산</td>
					<td class="addr">충남 논산시 계백로 973</td>
					<td class="tel"><span>041-735-3677</span><span>041-735-3678</span></td>
				</tr>
				<tr>
					<td class="branch">대구</td>
					<td class="addr">대구광역시 동구 동부로 149</td>
					<td class="tel"><span>053-743-4787</span></td>
				</tr>
				<tr>
					<td class="branch">대전</td>
					<td class="addr">대전광역시 동구 동서대로 1689</td>
					<td class="tel"><span>02-530-6311</span></td>
				</tr>
				<tr>
					<td class="branch">목포</td>
					<td class="addr">전남 목포시 영산로 525</td>
					<td class="tel"><span>061-276-0220</span></td>
				</tr>
				<tr>
					<td class="branch">무안</td>
					<td class="addr">전남 무안군 무안읍 무안로 497-1</td>
					<td class="tel"><span>061-453-0156</span></td>
				</tr>
				<tr>
					<td class="branch">벌교</td>
					<td class="addr">전남 보성군 벌교읍 조정래길 2-8</td>
					<td class="tel"><span>061-857-6313</span></td>
				</tr>
				<tr>
					<td class="branch">부산</td>
					<td class="addr">부산광역시 금정구 중앙대로 2238</td>
					<td class="tel"><span>051-508-8881~2</span></td>
				</tr>
				<tr>
					<td class="branch">부산(사상)</td>
					<td class="addr">부산광역시 사상구 201 부산서부버스터미널 별관 3동 3층</td>
					<td class="tel"><span>051-323-3158</span></td>
				</tr>
				<tr>
					<td class="branch">서울(경부선)</td>
					<td class="addr">서울 서초구 신반포로 194 강남고속버스터미널</td>
					<td class="tel"><span>02-530-6311</span></td>
				</tr>
				<tr>
					<td class="branch">서울(동서울)</td>
					<td class="addr">서울 광진구 강변역로 50 동서울터미널</td>
					<td class="tel"><span>02-530-6311</span></td>
				</tr>
				<tr>
					<td class="branch">서울(상봉)</td>
					<td class="addr">서울 중랑구 상봉로 117</td>
					<td class="tel"><span>02-530-6311</span></td>
				</tr>
				<tr>
					<td class="branch">서울(호남선)</td>
					<td class="addr">서울 서초구 신반포로 190 센트럴시티터미널</td>
					<td class="tel"><span>02-530-6311</span></td>
				</tr>
				<tr>
					<td class="branch">수원</td>
					<td class="addr">경기도 수원시 권선구 경수대로 270</td>
					<td class="tel"><span>031-267-7760</span></td>
				</tr>
				<tr>
					<td class="branch">안성</td>
					<td class="addr">경기 안성시 비봉로 85</td>
					<td class="tel"><span>031-677-6789</span></td>
				</tr>
				<tr>
					<td class="branch">순천</td>
					<td class="addr">전남 순천시 장천3길 13</td>
					<td class="tel"><span>031-746-2862</span></td>
				</tr>
				<tr>
					<td class="branch">안산</td>
					<td class="addr">경기도 안산시 상록구 항가울로 410</td>
					<td class="tel"><span>031-486-1818</span></td>
				</tr>
				<tr>
					<td class="branch">의정부</td>
					<td class="addr">경기도 의정부시 동일로 640</td>
					<td class="tel"><span>031-856-3652</span></td>
				</tr>
				<tr>
					<td class="branch">여수</td>
					<td class="addr">전남 여수시 좌수영로 268</td>
					<td class="tel"><span>061-652-6977</span></td>
				</tr>
				<tr>
					<td class="branch">연무대</td>
					<td class="addr">충남 논산시 연무읍 안심로 143</td>
					<td class="tel"><span>041-735-3677</span><span>041-735-3678</span></td>
				</tr>
				<tr>
					<td class="branch">영광</td>
					<td class="addr">전남 영광군 영광읍 신남로 180</td>
					<td class="tel"><span>061-353-0040</span></td>
				</tr>
				<tr>
					<td class="branch">영암</td>
					<td class="addr">전남 영광군 영광읍 신남로 180</td>
					<td class="tel"><span>061-473-4183</span></td>
				</tr>
				<tr>
					<td class="branch">완도</td>
					<td class="addr">전남 완도군 완도읍 개포로 130번길 20</td>
					<td class="tel"><span>061-554-2602</span></td>
				</tr>
				<tr>
					<td class="branch">울산</td>
					<td class="addr">울산광역시 남구 삼산로 288</td>
					<td class="tel"><span>052-272-3594</span></td>
				</tr>
				<tr>
					<td class="branch">유성</td>
					<td class="addr">대전광역시 유성구 장대로 50</td>
					<td class="tel"><span>042-822-0386</span></td>
				</tr>
				<tr>
					<td class="branch">인천</td>
					<td class="addr">인천 미추홀구 연남로 35</td>
					<td class="tel"><span>032-421-2543</span></td>
				</tr>
				<tr>
					<td class="branch">장성</td>
					<td class="addr">전남 장성군 장성읍 영천로 125</td>
					<td class="tel"><span>061-393-2660</span></td>
				</tr>
				<tr>
					<td class="branch">장흥</td>
					<td class="addr">전남 장흥군 장흥읍 중앙로1길 8</td>
					<td class="tel"><span>061-862-7091</span></td>
				</tr>
				<tr>
					<td class="branch">전주</td>
					<td class="addr">전북 전주시 덕진구 가리내로 70</td>
					<td class="tel"><span>063-272-5117</span></td>
				</tr>
				<tr>
					<td class="branch">중마(동양광)</td>
					<td class="addr">전남 광양시 공영로 91</td>
					<td class="tel"><span>061-792-8684</span></td>
				</tr>
				<tr>
					<td class="branch">진도</td>
					<td class="addr">전남 진도군 진도읍 남문길 5</td>
					<td class="tel"><span>061-543-5053</span></td>
				</tr>
				<tr>
					<td class="branch">함평</td>
					<td class="addr">전남 함평군 함평읍 중앙길 46</td>
					<td class="tel"><span>061-324-0123</span></td>
				</tr>
				<tr>
					<td class="branch">해남</td>
					<td class="addr">전남 해남군 해남읍 해남로 8</td>
					<td class="tel"><span>061-534-0882</span></td>
				</tr>
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
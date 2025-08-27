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
.tbl_type1.responsive.col7 {
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

.tbl_type1.responsive.col7 table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.tbl_type1.responsive.col7 caption {
  padding: 10px 0;
  font-weight: 600;
  text-align: left;
}

.tbl_type1.responsive.col7 th,
.tbl_type1.responsive.col7 td {
  padding: 14px 10px;
  text-align: left;
  font-size: 15px;
  line-height: 1.5;
  word-break: keep-all;
}

.tbl_type1.responsive.col7 th {
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
			<img src="${pageContext.request.contextPath}/resources/media/lost_com7_s.png" alt="CHUNIL EXPRESS" class="hide_mo">
			<!-- 170227 수정 -->
			<img src="${pageContext.request.contextPath}/resources/media/lost_comL7.png" alt="CHUNIL EXPRESS" class="show_mo">
			<!-- 170227 수정 -->
		</p>
		<p class="info">서울시 서초구 반포동 19-4</p>
	</div>
	<div class="tbl_type1 responsive col7">
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
						<td class="branch">본사</td>
						<td class="addr">서울시 서초구 반포동 19-4</td>
						<td class="tel"><span>02-535-2101~6</span></td>
					</tr>
					<tr>
						<td class="branch">기술부</td>
						<td class="addr">서울시 용산구 한남동 99-1</td>
						<td class="tel"><span>02-794-9110~2</span></td>
					</tr>
					<tr>
						<td class="branch">서울</td>
						<td class="addr">서울시 서초구 반포동 19-4</td>
						<td class="tel"><span>02-535-2107,2111</span></td>
					</tr>
					<tr>
						<td class="branch">대전</td>
						<td class="addr">대전광역시 동구 용전동 63-3</td>
						<td class="tel"><span>042-622-9636</span></td>
					</tr>
					<tr>
						<td class="branch">김천</td>
						<td class="addr">경북 김천시 성내동 38-1</td>
						<td class="tel"><span>054-430-1001</span></td>
					</tr>
					<tr>
						<td class="branch">상주</td>
						<td class="addr">경북 상주시 무양동 291</td>
						<td class="tel"><span>054-535-3008</span></td>
					</tr>
					<tr>
						<td class="branch">대구</td>
						<td class="addr">대구광역시 동구 신천동 329-3</td>
						<td class="tel"><span>053-755-6314</span></td>
					</tr>
					<tr>
						<td class="branch">경주</td>
						<td class="addr">경주시 노서동 243-5</td>
						<td class="tel"><span>054-772-2886</span></td>
					</tr>
					<tr>
						<td class="branch">포항</td>
						<td class="addr">포항시 해도동 33-14</td>
						<td class="tel"><span>054-272-3194</span></td>
					</tr>
					<tr>
						<td class="branch">울산</td>
						<td class="addr">울산시 남구 삼산동 1480-1</td>
						<td class="tel"><span>052-272-2767</span></td>
					</tr>
					<tr>
						<td class="branch">부산</td>
						<td class="addr">부산광역시 금정구 노포동 133</td>
						<td class="tel"><span>051-508-8891~3</span></td>
					</tr>
					<tr>
						<td class="branch">동서울</td>
						<td class="addr">서울시 광진구 구의동 546-1</td>
						<td class="tel"><span>02-457-6264</span></td>
					</tr>
					<tr>
						<td class="branch">동광양</td>
						<td class="addr">전남 동광양시 중동 36블럭 1651</td>
						<td class="tel"><span>061-792-0512</span></td>
					</tr>
					<tr>
						<td class="branch">광주</td>
						<td class="addr">광주광역시 서구 광천동 49-1</td>
						<td class="tel"><span>062-362-3116</span></td>
					</tr>
					<tr>
						<td class="branch">인천</td>
						<td class="addr">인천광역시 남구 관교동 15</td>
						<td class="tel"><span>032-426-8321</span></td>
					</tr>
					<tr>
						<td class="branch">순천</td>
						<td class="addr">순천시 매곡동 475-1</td>
						<td class="tel"><span>061-252-2863</span></td>
					</tr>
					<tr>
						<td class="branch">청주</td>
						<td class="addr">청주시 홍덕구 가경동 1416</td>
						<td class="tel"><span>043-232-3750</span></td>
					</tr>
					<tr>
						<td class="branch">춘천</td>
						<td class="addr">춘천시 온의동 154-1</td>
						<td class="tel"><span>033-256-1571~3</span></td>
					</tr>
					<tr>
						<td class="branch">안산</td>
						<td class="addr">안산시 성포동 590</td>
						<td class="tel"><span>031-409-3092</span></td>
					</tr>
					<tr>
						<td class="branch">속초</td>
						<td class="addr">속초시 조양동 1418</td>
						<td class="tel"><span>033-633-4017</span></td>
					</tr>
					<tr>
						<td class="branch">완도선박</td>
						<td class="addr">완도군 완도읍 항동리 1255</td>
						<td class="tel"><span>061-554-8000</span></td>
					</tr>
					<tr>
						<td class="branch">제주선박</td>
						<td class="addr">제주도 제주시 건입동 918-30</td>
						<td class="tel"><span>064-751-5050</span></td>
					</tr>
				</tbody>
			</table>
		</div>	<script>
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
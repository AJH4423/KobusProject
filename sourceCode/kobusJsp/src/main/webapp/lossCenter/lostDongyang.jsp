<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="shortcut icon" type="image/x-icon"
	href="/koBus/media/favicon.ico">
<link rel="stylesheet" href="/koBus/media/style.css">
<link rel="stylesheet" href="/koBus/media/ui.jqgrid.custom.css">
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css" />

<title>유실물센터 안내(상세) | 고객지원 | 고속버스통합예매</title>
<style>

.ico-dropdown-arrow {
	display: inline-block;
	width: 20px;
	height: 20px;
	background-image: url("/koBus/media/ico-dropdown-arrow@2x.png");
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
	<%@ include file="../koBusFile/common/header.jsp"%>

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


							<li><a href="/koBus/html/boardList.do">게시판</a></li>

							<li><a href="/koBus/html/goBusFaq.do">자주찾는 질문</a></li>

							<li class="selected"><a href="javascript:void(0)"
								title="선택됨">유실물센터 안내</a></li>


						</ul>
					</div>
				</li>
			</ol>

		</div>
	</nav>
	<div class="com_info clfix">
		<p class="img">
			<img src="/koBus/media/lost_com3_s.png" alt="동양고속" class="hide_mo">
			<!-- 170227 수정 -->
			<img src="/koBus/media/lost_comL3.png" alt="동양고속" class="show_mo">
			<!-- 170227 수정 -->
		</p>
		<p class="info">경기도 안양시 동안면 호계리 1029-9</p>
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
					<td class="branch">주사무소</td>
					<td class="addr">서울특별시 서초구 신반포로 194 915호, 931호</td>
					<td class="tel"><span> 02-535-3111~7 </span></td>
				</tr>
				<tr>
					<td class="branch">서울사업소</td>
					<td class="addr">서울특별시 서초구 신반포로 194 부속상가 2층 34호</td>
					<td class="tel"><span>02-535-3111~7</span></td>
				</tr>
				<tr>
					<td class="branch">동서울사업소</td>
					<td class="addr">서울특별시 광진구 강변역로 50</td>
					<td class="tel"><span> 02-446-0513 </span></td>
				</tr>
				<tr>
					<td class="branch">평택사업소</td>
					<td class="addr">경기도 평택시 평택로39번길 40</td>
					<td class="tel"><span> 031-655-2453 </span></td>
				</tr>
				<tr>
					<td class="branch">천안사업소</td>
					<td class="addr">충청남도 천안시 만남로 43</td>
					<td class="tel"><span> 041-551-7212 </span></td>
				</tr>
				<tr>
					<td class="branch">아산사업소</td>
					<td class="addr">충청남도 아산시 번영로 223</td>
					<td class="tel"><span> 041-544-4880 </span></td>
				</tr>
				<tr>
					<td class="branch">대전사업소</td>
					<td class="addr">대전광역시 동구 동서대로 1689</td>
					<td class="tel"><span> 042-623-1359 </span></td>
				</tr>
				<tr>
					<td class="branch">전주사업소</td>
					<td class="addr">전라북도 전주시 덕진구 가리내로 70</td>
					<td class="tel"><span> 063-254-1590 </span></td>
				</tr>
				<tr>
					<td class="branch">대구사업소</td>
					<td class="addr">대구광역시 동구 동부로 149</td>
					<td class="tel"><span> 053-743-3800 </span></td>
				</tr>
				<tr>
					<td class="branch">부산사업소</td>
					<td class="addr">부산광역시 금정구 중앙대로 2238</td>
					<td class="tel"><span> 051-508-8911 </span></td>
				</tr>
				<tr>
					<td class="branch">수원사업소</td>
					<td class="addr">경기도 수원시 권선구 경수대로 270</td>
					<td class="tel"><span> 031-890-7779 </span></td>
				</tr>
				<tr>
					<td class="branch">마산사업소</td>
					<td class="addr">경상남도 창원시 마산회원구 합포로 290</td>
					<td class="tel"><span> 055-296-6785 </span></td>
				</tr>
				<tr>
					<td class="branch">진주사업소</td>
					<td class="addr">경상남도 진주시 동진로 16</td>
					<td class="tel"><span> 055-758-3111 </span></td>
				</tr>
				<tr>
					<td class="branch">인천사업소</td>
					<td class="addr">인천광역시 미추홀구 연남로35</td>
					<td class="tel"><span> 032-425-8312 </span></td>
				</tr>
				<tr>
					<td class="branch">창원사업소</td>
					<td class="addr">경상남도 창원시 의창구 창원대로 371</td>
					<td class="tel"><span> 055-277-6785 </span></td>
				</tr>
				<tr>
					<td class="branch">포항사업소</td>
					<td class="addr">경상북도 포항시 남구 중앙로 166</td>
					<td class="tel"><span> 054-272-1417 </span></td>
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
<%@ include file="../koBusFile/common/footer.jsp"%>
</html>
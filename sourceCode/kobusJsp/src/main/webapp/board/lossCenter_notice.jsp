<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>유실물센터 안내 | 고객지원 | 고속버스통합예매</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- 스타일 시트 경로 정리 -->
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/media/style.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/media/ui.jqgrid.custom.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/media/PretendardGOVVariable.woff">

<link rel="shortcut icon" type="image/x-icon"
	href="/koBus/media/favicon.ico">

<script
	src="${pageContext.request.contextPath}/media/jquery-1.12.4.min.js"></script>
<script src="${pageContext.request.contextPath}/media/common.js"></script>
<script src="${pageContext.request.contextPath}/media/ui.js"></script>
<script src="${pageContext.request.contextPath}/media/plugin.js"></script>
<script src="${pageContext.request.contextPath}/media/jquery.number.js"></script>
<script src="${pageContext.request.contextPath}/media/security.js"></script>


<style>

.lost_com.clfix {
	display: grid;
	grid-template-columns: repeat(3, 1fr); /* 3열 고정 */
	gap: 16px; /* 박스 간격 균형 있게 */
	justify-items: center; /* 가운데 정렬 */
	align-items: center;
	margin: 30px auto;
	padding: 0;
	list-style: none;
	max-width: 960px;
}

.lost_com.clfix li {
  position: relative;
  text-align: center;
}

.lost_com.clfix li img {
	height: 50px;
	object-fit: contain;
	margin-bottom: 8px;
}


.lost_com.clfix li:hover {
	background-color: #1e1e1e;
	transform: scale(1.02);
}

.lost_com.clfix li::after {
  content: attr(alt);
  position: absolute;
  top: 8px; /* 이미지 위에 표시 */
  left: 50%;
  transform: translateX(-50%);
  font-size: 13px;
  color: #ccc;
  background-color: transparent;
}
</style>
</head>
<body>
	<%@ include file="../koBusFile/common/header.jsp"%>
	<div class="wrapper wrapper-kor wrapper-sub">
		<article id="new-kor-content">
			<div class="content-header">
				<div class="container">
					<div class="title-area">
						<h2 class="page-title">유실물센터 안내</h2>
					</div>
				</div>
			</div>

<ul class="lost_com clfix">
    <li>
        <a href="${pageContext.request.contextPath}/lossCenter/kumho.do">
            <img src="${pageContext.request.contextPath}/media/lost_com1_s.png" alt="금호고속">
        </a>
    </li>
    <li>
        <a href="${pageContext.request.contextPath}/lossCenter/dongbu.do">
            <img src="${pageContext.request.contextPath}/media/lost_com2_s.png" alt="동부고속">
        </a>
    </li>
    <li>
        <a href="${pageContext.request.contextPath}/lossCenter/dongyang.do">
            <img src="${pageContext.request.contextPath}/media/lost_com3_s.png" alt="동양고속">
        </a>
    </li>
    <li>
        <a href="${pageContext.request.contextPath}/lossCenter/jungang.do">
            <img src="${pageContext.request.contextPath}/media/lost_com4_s.png" alt="(주)중앙고속">
        </a>
    </li>
    <li>
        <a href="${pageContext.request.contextPath}/lossCenter/chunil.do">
            <img src="${pageContext.request.contextPath}/media/lost_com5_s.png" alt="CHUNIL EXPRESS">
        </a>
    </li>
    <li>
        <a href="${pageContext.request.contextPath}/lossCenter/samhwa.do">
            <img src="${pageContext.request.contextPath}/media/lost_com6_s.png" alt="SAMHWA EXPRESS">
        </a>
    </li>
    <li>
        <a href="${pageContext.request.contextPath}/lossCenter/hanil.do">
            <img src="${pageContext.request.contextPath}/media/lost_com7_s.png" alt="HANIL EXPRESS">
        </a>
    </li>
    <li>
        <a href="${pageContext.request.contextPath}/lossCenter/sokrisan.do">
            <img src="${pageContext.request.contextPath}/media/lost_com8_s.png" alt="속리산고속">
        </a>
    </li>
</ul>

		</article>
	</div>
</body>
<%@ include file="../koBusFile/common/footer.jsp" %>
</html>

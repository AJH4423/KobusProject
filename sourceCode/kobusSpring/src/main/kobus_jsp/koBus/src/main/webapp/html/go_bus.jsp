%@page import="com.util.ConnectionProvider"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%-- <%
ServletContext context = request.getServletContext();
String realPath = context.getRealPath("/");
out.print(realPath);
%> --%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport"
	content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<title>공지사항(목록) | 고객지원 | 고속버스통합예매</title>

<!-- CSS -->
<link rel="shortcut icon" type="image/x-icon"
	href="/koBus/media/favicon.ico">
<link rel="stylesheet" href="/koBus/media/style.css">
<link rel="stylesheet" href="/koBus/media/ui.jqgrid.custom.css">
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css" />

<!-- JS -->
<script src="/koBus/media/jquery-1.12.4.min.js"></script>
<script src="/koBus/media/jquery-ui.min.js"></script>
<script src="/koBus/media/jquery.jqGrid.min.js"></script>

<script src="/koBus/media/common.js"></script>
<script src="/koBus/media/ui.js"></script>
<script src="/koBus/media/plugin.js"></script>
<script src="/koBus/media/security.js"></script>
<script src="/koBus/media/jquery.number.js"></script>
<script src="/koBus/media/new-kor-ui.js"></script>
<!-- <script src="../media/ReadNtcList.js"></script> -->

<style>
.btn-wrap {
	display: flex;
	justify-content: flex-end;
	gap: 10px;
}

.btn {
	padding: 6px 14px;
	background: #114397;
	color: white;
	border-radius: 4px;
	text-decoration: none;
}

body {
	font-family: 'Pretendard GOV Variable', sans-serif;
}

.notice-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px 16px;
	border-bottom: 1px solid #333;
	/* color: #fff; */
}

.notice-icon {
	margin-right: 10px;
	color: #f06; /* 강조 색 */
	font-size: 16px;
}

.notice-title {
	flex: 1;
	text-decoration: none;
	/* 	color: #fff; */
	font-weight: 500;
}

.notice-date {
	min-width: 100px;
	text-align: right;
	color: #aaa;
	font-size: 14px;
}

* {
	margin: 0;
	padding: 0;
	user-select: none
}

#content {
	display: grid;
	grid-template-rows: 40px calc(100% - 55px) 15px;
	height: 100%;
	grid-template-columns: 100%;
	box-sizing: border-box
}

#header {
	overflow: hidden;
	z-index: 2000;
	height: 40px;
	margin-bottom: -1px;
	font-family: Helvetica, sans-serif;
	font-size: 12px;
	line-height: 1.25em;
	box-sizing: border-box;
	cursor: move
}

#header h1 {
	margin-left: 10px;
	height: 39px;
	font-weight: normal;
	color: #878481;
	position: relative;
	display: inline-block;
	white-space: nowrap;
	box-sizing: border-box;
	padding: 14px 5px;
	font-size: 12px;
	letter-spacing: -0.05em;
	font-weight: normal;
	align-content: center
}

#header #opacity-bar {
	-webkit-appearance: none;
	position: absolute;
	right: 35px;
	top: 18px;
	width: 50px;
	margin-right: 10px
}

#header #opacity-bar:focus {
	outline: none
}

#header #opacity-bar::-webkit-slider-runnable-track {
	width: 100%;
	height: 3px;
	cursor: pointer;
	border-radius: 2px;
	background: #878481
}

#header #opacity-bar::-webkit-slider-thumb {
	border: 0px;
	border-radius: 100%;
	height: 10px;
	width: 10px;
	background: #c3c2c0;
	cursor: pointer;
	-webkit-appearance: none;
	margin-top: -3px
}

.window-close {
	position: absolute;
	right: 0;
	top: 0;
	padding: 10px;
	cursor: pointer
}

.window-close:hover {
	filter: brightness(0%)
}

#header:active::before {
	position: fixed;
	content: "";
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0)
}

table#main {
	overflow: hidden;
	width: 100%;
	height: 100%;
	min-height: 44px;
	grid-template-rows: 30px calc(100% - 30px);
	box-sizing: border-box;
	display: grid;
	border-spacing: 2px;
	position: relative
}

table#main thead {
	border-bottom: 1px solid #eee;
	margin: 0 5px
}

table#main thead tr {
	display: grid;
	grid-template-columns: auto 75px 65px 75px;
	font-size: 12px;
	line-height: 1.7em;
	font-family: sans-serif
}

table#main thead tr th {
	clip: auto;
	height: 34px;
	line-height: 34px;
	font-size: 12px;
	color: #878481;
	position: static !important;
	font-weight: normal
}

table#main tbody {
	overflow-y: scroll;
	height: 100%;
	text-align: center
}

table#main tbody::-webkit-scrollbar {
	width: 5px
}

table#main tbody::-webkit-scrollbar-thumb {
	background-color: rgba(135, 132, 129, .4);
	border-radius: 5px
}

table#main tbody tr {
	display: grid;
	height: 22px;
	grid-template-columns: auto 75px 65px 75px;
	font-size: 12px;
	line-height: 1.7em;
	font-family: sans-serif
}

table#main tbody tr td {
	padding-top: 2px;
	font-size: 12px;
	line-height: 1.7em;
	font-family: sans-serif;
	color: #666;
	border-bottom: 1px solid #eee
}

table#main tbody tr td:first-child {
	text-align: left;
	padding-left: 15px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-left: 5px
}

table#main tbody tr td:nth-child(2) {
	text-align: right;
	font-size: 11px
}

table#main tbody tr td:nth-child(3) {
	text-align: right;
	font-size: 11px
}

table#main tbody tr td:nth-child(3).lower-stock {
	color: #017eff
}

table#main tbody tr td:nth-child(3).upper-stock {
	color: #e12301
}

table#main tbody tr td:nth-child(4) {
	font-family: sans-serif;
	position: relative
}

table#main tbody tr td:nth-child(4) span {
	position: absolute;
	width: 55px;
	height: 22px;
	right: 15px;
	text-align: right;
	font-size: 11px
}

table#main tbody tr td:nth-child(4) span.lower-stock {
	color: #017eff
}

table#main tbody tr td:nth-child(4) span.upper-stock {
	color: #e12301
}

.icon {
	width: 8px;
	margin-right: 3px;
	display: inline-block;
	vertical-align: middle;
	overflow: hidden
}

*::-webkit-scrollbar:not(tbody) {
	width: 0
}
</style>

</head>

<!-- 타이틀 -->

<div class="content-body customer">
	<div class="container">

		<form id="inqrForm" name="inqrForm" method="post">
			<input type="hidden" id="ntcNo" name="ntcNo"> <input
				type="hidden" id="pageIdx" name="pageIdx" value="1">
			<div class="noti_wrap hide_mo">
				<p class="noti">고속버스 홈페이지의 새로운 소식을 확인하세요.</p>
			</div>
			<div class="search_wrap type2">
				<form action="boardList.do" method="get">
					<p class="search_box">
						<input type="text" name="search" value="${param.search}"
							placeholder="검색어를 입력하세요" title="검색어">
						<button type="submit">검색</button>
					</p>
				</form>
			</div>
			<div class="board_list">
				<ul>

					<!-- 작업 -->
					<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

					<div class="btn-wrap">
						<a id="list" href="boardList.do" class="btn">List</a> <a
							id="write" href="boardWrite.do" class="btn">글쓰기</a>
					</div>
					<!-- 작업  -->
					<c:forEach var="dto" items="${list}">
						<li class="notice-row"><span class="notice-icon"> <img
								src="/koBus/media/label_notice.png"
								style="width: 16px; height: 16px;">
						</span> <a href="boardView.do?brdID=${dto.brdID}" class="notice-title">${dto.brdTitle}</a>
							<span class="notice-date">${dto.brdDate}</span></li>
					</c:forEach>




				</ul>
			</div>
		</form>

	</div>

</div>


<!-- footer -->


</body>
<whale-quicksearch translate="no" style="visibility: visible;">
<template shadowrootmode="closed">
	<style></style>
	<div class="anchor"></div>
	<div class="quicksearch" data-version="a704a9c"></div>
</template>
</whale-quicksearch>

<widget-window
	style="opacity: 1; background-color: rgb(255, 255, 255); border: 1px solid rgb(135, 132, 129); width: auto; height: auto; display: none;">
<template shadowrootmode="open">



	<div id="content">
		<div id="header">
			<h1 id="widget-title">undefined</h1>
			<input id="opacity-bar" type="range" min="1" max="100"
				style="opacity: 0.31;"> <span class="window-close"
				style="opacity: 0.31;"><img alt="미니위젯 닫기"
				class="window-close"
				src="chrome-extension://loboidpmlojcalnkgelcncghllmkiico/img/close.svg"
				width="20" height="20" style="opacity: 0.31;"></span>
		</div>
		<table id="main">
			<thead>
				<tr>
					<th>종목</th>
					<th>시세</th>
					<th>전일비</th>
					<th>등락률</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
		<div id="footer"></div>
	</div>
</template>

</widget-window>

</html>
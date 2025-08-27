<%@page import="java.util.List"%>
<%@ page trimDirectiveWhitespaces="true" language="java"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!-- 뒤로가기 눌렀을때 로그인 풀리는거 방지 : 캐시 무효화 코드, 모든 jsp파일에 추가해야함 -->
<%
String auth = (String) session.getAttribute("auth");
/* List<String> rolename = (List<String>) session.getAttribute("rolename"); */ 
%>
<%
response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
response.setHeader("Pragma", "no-cache"); // HTTP 1.0
response.setDateHeader("Expires", 0); // Proxies
%>
<style>
	.sidebar {
	  position: relative;
	  z-index: auto;
	}
	.panel-widget {
	  position: relative;
	  z-index: 1;
	}
</style>
<nav class="navbar navbar-inverse navbar-fixed-top">
	<div class="container-fluid">
		<div class="navbar-header">
			<a class="navbar-brand" href="${pageContext.request.contextPath}/adminPage.do">${auth} 관리자</a>
		</div>
		<ul class="nav navbar-nav navbar-right">
			<li style="color: white">${auth}님,환영합니다 |</li>
			<li>
				<form id="logoutForm"
					action="${pageContext.request.contextPath}/logOut.do" method="post"
					style="display: inline; color: white">
					<input type="hidden" name="${_csrf.parameterName}"
						value="${_csrf.token}" /> <a href="#"
						onclick="document.getElementById('logoutForm').submit(); return false;">로그아웃</a>
				</form>
			</li>
			<li><a href="${pageContext.request.contextPath}/adminPage.do">관리자페이지</a></li>
			<li><a href="${pageContext.request.contextPath}/main.do">메인페이지</a></li>
		</ul>
	</div>
</nav>

    <!-- sidebar div -->
<div class="col-sm-3 col-lg-2 sidebar">
  <ul class="nav menu">
    <li class="active"><a href="#"><svg class="glyph stroked dashboard-dial"><use xlink:href="#stroked-dashboard-dial"/></svg> 대시보드</a></li>
    <li><a href="${pageContext.request.contextPath}/adminPage.do">Home</a></li>
    <li><a href="${pageContext.request.contextPath}/memberEditPage.do">회원 관리</a></li>
    <li><a href="#">결제 내역</a></li>
    <li><a href="#">공지사항</a></li>
  </ul>
</div>

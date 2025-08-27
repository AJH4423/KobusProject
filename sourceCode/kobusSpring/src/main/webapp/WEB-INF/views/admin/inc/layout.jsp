<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>

<!DOCTYPE html>
<html lang="ko">
<head>
	<meta name="_csrf" content="${_csrf.token}"/>
	<meta name="_csrf_header" content="${_csrf.headerName}"/>
	<title>관리자 페이지</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/admin/css/bootstrap.min.css">
	<%-- <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/custom.css"> --%>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/admin/css/lumino.css">
	
	<tiles:insertAttribute name="script" />
	<tiles:insertAttribute name="pageScript" />

</head>

<body class="KO">
	<tiles:insertAttribute name="header" />
	<div class="container-fluid">
	     <div class="row">
	         <tiles:insertAttribute name="content" />
	      </div>
	</div>
	
	<tiles:insertAttribute name="footer" />
	
	<%-- <script src="${pageContext.request.contextPath}/resources/admin/js/jquery.min.js"></script> --%>
	<script src="${pageContext.request.contextPath}/resources/admin/js/bootstrap.min.js"></script>
	<script src="${pageContext.request.contextPath}/resources/admin/js/chart.min.js"></script>
</body>
</html>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>${terms.title}</title>
    <link rel="stylesheet" href="/koBus/css/common/layout.css">
    <link rel="stylesheet" href="/koBus/css/common/reset.css">
	<link rel="stylesheet" href="/koBus/css/common/renewal_kor.css">
</head>
<body>
    <div class="terms_wrap">
        <div class="terms_content">
            <c:out value="${terms.content}" escapeXml="false"/>
        </div>
    </div>
</body>
</html>

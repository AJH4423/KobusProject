<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="shortcut icon" type="image/x-icon" href="/koBus/media/favicon.ico">
<title>공지사항 삭제 완료</title>
<style>
  body { font-family: sans-serif; text-align: center; padding-top: 100px; }
  .message-box { display: inline-block; padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
  a.button {
    display: inline-block; margin-top: 20px; padding: 10px 20px;
    background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;
  }
  a.button:hover { background-color: #0056b3; }
</style>
</head>
<body>
  <div class="message-box">
    <h2>게시글이 성공적으로 삭제되었습니다.</h2>
    <a href="${pageContext.request.contextPath}/html/boardList.do" class="button">공지사항 목록으로 이동</a>

  </div>
</body>
<%@ include file="../koBusFile/common/footer.jsp" %>
</html>

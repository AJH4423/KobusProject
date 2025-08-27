<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>게시글 작성 | 고객지원 | 고속버스통합예매</title>
<link rel="shortcut icon" type="image/x-icon" href="/koBus/media/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/media/style.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/media/ui.jqgrid.custom.css">
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css" />
	
<style>
.board-form-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}
.board-form-group {
  margin-bottom: 20px;
}
.board-form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.board-form-group textarea {
  resize: vertical;
  min-height: 200px;
}
.board-form-actions {
  text-align: right;
  margin-top: 30px;
}
.board-form-actions .btn {
  display: inline-block;
  padding: 10px 22px;
  background-color: #114397;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin-left: 10px;
}
.board-form-actions .btn:hover {
  background-color: #0d326f;
  transform: translateY(-2px);
}
.board-form-actions .btn.cancel {
  background-color: #6c757d;
}
.board-form-actions .btn.cancel:hover {
  background-color: #5a6268;
}
</style>

</head>
<body class="main KO">


<div class="content-body customer">
	<div class="container board-form-container">
		<h2>게시글 작성</h2>
		<form action="${pageContext.request.contextPath}/board/write.do" method="post">

			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
			
			<div class="board-form-group">
				<label for="brdTitle">제목</label>
				<input type="text" id="brdTitle" name="brdTitle" required>
			</div>
			<div class="board-form-group">
				<label for="brdContent">내용</label>
				<textarea id="brdContent" name="brdContent" required></textarea>
			</div>
			<div class="board-form-actions">
				<button type="submit" class="btn">작성</button>
				<a href="boardList.do" class="btn cancel">취소</a>
			</div>
		</form>
	</div>
</div>
</body>

</html>
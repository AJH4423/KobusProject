<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!-- 댓글 CSS 적용  -->
<style>
.comment-write {
	margin-top: 30px;
	padding: 16px;
	background-color: #f9f9f9;
	border: 1px solid #ccc;
	border-radius: 8px;
}

.comment-write textarea {
	width: 100%;
	height: 100px;
	padding: 10px;
	resize: vertical;
	border: 1px solid #ddd;
	border-radius: 4px;
	font-family: inherit;
	font-size: 14px;
}

.comment-write button {
	margin-top: 10px;
	padding: 8px 16px;
	background-color: #114397;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.comment-write button:hover {
	background-color: #0d356f;
}

.comment-item {
	padding: 10px 12px;
	border-bottom: 1px solid #ddd;
	font-size: 14px;
	position: relative;
}

.comment-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.comment-user {
	font-weight: bold;
	color: #114397;
}

.comment-content {
	margin-left: 5px;
	flex: 1;
	word-break: break-word;
}

.comment-date {
	font-size: 12px;
	color: #888;
	white-space: nowrap;
	margin-left: 10px;
}

.comment-content-edit {
	width: 100%;
	min-height: 40px;
	resize: none;
	overflow: auto;
	font-size: 14px;
	padding: 6px 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	line-height: 1.4;
	box-sizing: border-box;
	background-color: #fff;
	color: #222;
	font-family: inherit;
}
</style>

<c:forEach var="comment" items="${commentList}">
	<div class="comment-item" data-bcmid="${comment.bcmID}">
		<div class="comment-header">
			<!-- 유저 ID -->
			<span class="comment-user"><strong>${comment.kusID}</strong></span>

			<!-- 댓글 내용 -->
			<c:choose>
				<c:when test="${auth eq comment.kusID}">
					<span class="comment-content-text">${comment.content}</span>
					<textarea class="comment-content-edit" style="display: none;">${comment.content}</textarea>
				</c:when>
				<c:otherwise>
					<span class="comment-content-text">${comment.content}</span>
				</c:otherwise>
			</c:choose>

			<!-- 수정/저장 버튼은 날짜 왼쪽으로 이동 -->
			<span class="comment-buttons"> </span>

			<!-- 날짜 -->
			<span class="comment-date"> <c:if
					test="${auth eq comment.kusID}">
					<button class="edit-toggle-btn">[ 수정 ]</button>
					<button class="save-btn" style="display: none;">수정 완료</button>
					<button class="deleteReplyBtn" data-bcmid="${comment.bcmID}">[
						삭제 ]</button>
					<!-- 🔥 추가 -->
				</c:if> <fmt:formatDate value="${comment.cmtDate}"
					pattern="yyyy-MM-dd HH:mm:ss" />
			</span>
		</div>
	</div>
</c:forEach>



<c:if test="${empty commentList}">
	<p>등록된 댓글이 없습니다.</p>
</c:if>
<script>
	$(document).on('keydown', '.comment-content-edit', function(e) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault(); // 기본 Enter 줄바꿈 막기

			const $commentItem = $(this).closest('.comment-item');
			$commentItem.find('.save-btn').trigger('click'); // 수정 완료 버튼 강제 클릭
		}
	});

	$(document)
			.ready(
					function() {

						// "수정" 버튼 클릭 → textarea 보이기
						$(document).on(
								'click',
								'.edit-toggle-btn',
								function() {
									const $commentItem = $(this).closest(
											'.comment-item');
									const $textarea = $commentItem
											.find('.comment-content-edit');

									$commentItem.find('.comment-content-text')
											.hide();
									$textarea.show().trigger('input'); // textarea 자동 높이 적용
									$(this).hide(); // [수정] 버튼 숨김
									$commentItem.find('.save-btn').show(); // [수정 완료] 버튼 표시
								});

						// "수정 완료" 버튼 클릭 → 서버에 저장 요청
						$(document)
								.on(
										'click',
										'.save-btn',
										function() {
											const $commentItem = $(this)
													.closest('.comment-item');
											const bcmID = $commentItem
													.data('bcmid');
											const newContent = $commentItem
													.find(
															'.comment-content-edit')
													.val();

											$
													.ajax({
														url : '/koBus/replyEdit.do',
														method : 'POST',
														data : {
															bcmID : bcmID,
															content : newContent
														},
														success : function(res) {
															if (res.trim() === 'success') {
																// 저장 성공 → 화면 갱신
																$commentItem
																		.find(
																				'.comment-content-text')
																		.text(
																				newContent)
																		.show();
																$commentItem
																		.find(
																				'.comment-content-edit')
																		.hide();
																$commentItem
																		.find(
																				'.save-btn')
																		.hide();
																$commentItem
																		.find(
																				'.edit-toggle-btn')
																		.show();
															} else {
																alert('댓글 수정 실패');
															}
														},
														error : function() {
															alert('서버 오류 발생');
														}
													});
										});

						// textarea 자동 높이 조절
						$(document).on(
								'input',
								'.comment-content-edit',
								function() {
									this.style.height = 'auto';
									this.style.height = this.scrollHeight
											+ 'px';
								});

					});
</script>
<script>
//기존 이벤트 제거 후 재등록
$(document).off('click', '.deleteReplyBtn').on('click', '.deleteReplyBtn', function () {
    if (!confirm('댓글을 삭제하시겠습니까?')) return;

    const bcmID = $(this).data('bcmid');

    $.ajax({
        url: '/koBus/replyDelete.do',
        method: 'POST',
        data: { bcmID },
        success: function (res) {
            const result = res.trim();

            if (result === 'success') {
                location.reload(); // ✅ 삭제 후 즉시 새로고침 (alert 제거)
            } else if (result === 'unauthorized') {
                alert('로그인 후 이용 가능합니다.');
            } else if (result === 'forbidden') {
                alert('본인의 댓글만 삭제할 수 있습니다.');
            } else {
                alert('댓글 삭제 실패');
            }
        },
        error: function () {
            alert('서버 오류 발생');
        }
    });
});

</script>

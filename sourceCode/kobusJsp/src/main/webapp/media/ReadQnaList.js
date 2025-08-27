var bltnCtgCd = "0"; // 카테고리 구분 코드
var qnaAllList = []; // 자주하는 질문 전체 리스트

$(document).ready(function() {
	if (qnaAllList.length == 0){
		fnReadQnaList(bltnCtgCd);
	}
	
	$("#bltnCtgCd").on("change", function(){
		fnQnaListSet($(this).val());
	});
	setTimeout(function() {
		$('.faq dt button').attr('aria-expanded', 'false');
	}, 500);
	
	/* faq */
	fCurrent = -1;
	$('.faq').on('click', 'dt', function(){
		var idx = $(this).index();
		var answer = $(this).next('dd');
		if (  fCurrent != idx ) {
			$('.faq dt').removeClass('active');
			$('.faq dt button').attr('aria-expanded', 'false');
			$('.faq dd').hide();
			$(this).addClass('active');
			$(this).find('button').attr('aria-expanded', 'true');
			answer.show().addClass('active')
			fCurrent = idx;
		} else {
			$(this).toggleClass('active');
			answer.toggle().toggleClass('active');
			
			if($(this).hasClass('active')) {
				$(this).find('button').attr('aria-expanded', 'true');
			} else {
				$(this).find('button').attr('aria-expanded', 'false');
			}
		}
	});
});

function fnReadQnaList(bltnCtgCd){
	$.post("/cscn/qna/readQnaList.ajax"
			,{"bltnCtgCd":bltnCtgCd}
			,function(result){
				if(typeof(result.resultList) == "object"){
					$.each(result.resultList, function (inx, strValue) {
						var thisData = result.resultList[inx];
						qnaAllList[inx] = new Array();
						qnaAllList[inx][0] = thisData.bltnCtgCd;
						qnaAllList[inx][1] = thisData.qstnCtt;
						qnaAllList[inx][2] = thisData.answCtt;
						qnaAllList[inx][3] = thisData.qnaNo;
					});
					fnQnaListSet("0");
				}
			}, "json");
	
	return;
}

function fnQnaListSet(bltnCtgCd){
	var listLen = qnaAllList.length;
	
//	$(".faq").empty();
//	var html = "";
//	for(var inx=0; inx < listLen; inx++){
//		if(bltnCtgCd == "0"){
//			/*html += "<dt><span class=\"q\">"+qnaAllList[inx][1]+"</dt>";*/
//			html += '<dt><button type="button">'
//				   + '<span class="q">Q</span>' +qnaAllList[inx][1]+ '</button></dt>';
//			/*html += "<dd><div class=\"answer\">";*/
//			html += '<dd><span class="a">A</span><div class=\"answer\">';
//			html += "<p>"+qnaAllList[inx][2].split("\n").join("<br>")+"</p></div></dd>";
//		} else {
//			if(qnaAllList[inx][0] == bltnCtgCd){
//				/*html += "<dt>"+qnaAllList[inx][1]+"</dt>";*/
//				html += '<dt><button type="button">'
//					   + '<span class="q">Q</span>' +qnaAllList[inx][1]+ '</button></dt>';
//				/*html += "<dd><div class=\"answer\">";*/
//				html += '<dd><span class="a">A</span><div class=\"answer\">';
//				html += "<p>"+qnaAllList[inx][2].split("\n").join("<br>")+"</p></div></dd>";
//			}
//		}
//	}
//	$(".faq").append(html).trigger("create");
//	$('.faq dd').hide();
	
	
	var html = "";
	for(var inx=0; inx < listLen; inx++){
		if(bltnCtgCd != "0" && qnaAllList[inx][0] != bltnCtgCd) continue;

		html += '<dt><button type="button">'
			   + '<span class="q">Q</span>' +qnaAllList[inx][1]+ '</button></dt>';
		html += '<dd><span class="a">A</span><div class=\"answer\">';
		
		// 20250417 html허용
		var answCtt = qnaAllList[inx][2].split("\n").join("<br>");
		if (qnaAllList[inx][3] == "20250416001" || qnaAllList[inx][3] == "20250429001") {
			const temp = document.createElement("div");
			temp.innerHTML = qnaAllList[inx][2];
			answCtt = temp.textContent;
		}
		html += "<p>"+answCtt+"</p></div></dd>";
	}
	
	$(".faq").html(html);
	text = $(".faq").html();
//	text = text.replace("<br><br><br><br><br><br><br><br>", "");
	
	$(".faq").html(text);
	$('.faq dd').hide();
	
}
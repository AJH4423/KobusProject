function setLeftNtcList(result) {
	var orprResultList = result.orprResultList;
	var resultList = result.resultList;
	var newNtcCnt = result.newNtcCnt;
	var htmlText = "";
	var htmlTextNew = "";
	if (orprResultList) {
		if(orprResultList.length > 0) {
			$.each(orprResultList, function (intIndex, strValue) {
				var thisData = orprResultList[intIndex];
				htmlText += "<li>";
				htmlText += "<p>NOTICE</p>";
				htmlText += "<a href=\"javascript:fnGoReadPage("+thisData.ntcNo+");\"><span class=\"news ellipsis\">";
				htmlText += thisData.ntcTlNm;
				htmlText += "</span> <span class=\"date\">"+fnStrToDt(thisData.rgtDtm)+"</span>";
				htmlText += "</a></li>";
				
				htmlTextNew += "<li>";
				htmlTextNew += "	<a href='javascript:;' onclick='fnGoReadPage("+thisData.ntcNo+");'>";
				htmlTextNew += "		<p class='title'>"+ thisData.ntcTlNm +"</p>";
				htmlTextNew += "		<span class='date'>"+ fnStrToDt(thisData.rgtDtm) +"</span>";
				htmlTextNew += "	</a>";
				htmlTextNew += "</li>";
			});
		}
	}
	if (resultList) {
		if(resultList.length > 0) {
			$.each(resultList, function (intIndex, strValue) {
				var thisData = resultList[intIndex];
				htmlText += "<li>";
				htmlText += "<p>NOTICE</p>";
				htmlText += "<a href=\"javascript:fnGoReadPage("+thisData.ntcNo+");\"><span class=\"news ellipsis\">";
				htmlText += thisData.ntcTlNm;
				htmlText += "</span> <span class=\"date\">"+fnStrToDt(thisData.rgtDtm)+"</span>";
				htmlText += "</a></li>";
				
				htmlTextNew += "<li>";
				htmlTextNew += "	<a href='javascript:;' onclick='fnGoReadPage("+thisData.ntcNo+");'>";
				htmlTextNew += "		<p class='title'>"+ thisData.ntcTlNm +"</p>";
				htmlTextNew += "		<span class='date'>"+ fnStrToDt(thisData.rgtDtm) +"</span>";
				htmlTextNew += "	</a>";
				htmlTextNew += "</li>";
			});
		}
	}
	if(newNtcCnt > 0){
		$(".noti_cnt").text(newNtcCnt);
	} else {
		$(".noti_cnt").remove();
	}
	if(htmlText != ""){
		$("#noticeView").empty();
		$("#noticeView").html(htmlText);
		setLeftNtcListSlide();
	}
	
	if(htmlTextNew != ""){
		$("#noticeViewNew").empty();
		$("#noticeViewNew").html(htmlTextNew);
		// 공지사항 슬라이더
		bxsliderInit();
	}
}
//공지사항 슬라이더
function bxsliderInit(){
	// 공지사항
	var $bxSlider = $(".bxslider").bxSlider({
		auto: true,
		pause: 7000,
		autoHover: true,
		controls: false,
		pager: false,
		speed: 1000
	});
	
	$("#prev").on("click", function () {
		$bxSlider.goToPrevSlide();
	});

	$("#next").on("click", function () {
		$bxSlider.goToNextSlide();
	});

	$("#toggle").on("click", function () {
		if ($(this).hasClass("btn-pause")) {
			$bxSlider.stopAuto();
			$(this).removeClass("btn-pause").addClass("btn-play");
			$(this).html('<span class="sr-only">재생</span>');
		} else {
			$bxSlider.startAuto();
			$(this).removeClass("btn-play").addClass("btn-pause");
			$(this).html('<span class="sr-only">멈춤</span>');
		}
	});
	function updateToggleButton() {
		var $toggleBtn = $("#toggle");
		if ($bxSlider.is("auto")) {
			$toggleBtn.removeClass("btn-play").addClass("btn-pause");
			$toggleBtn.html('<span class="sr-only">멈춤</span>');
		} else {
			$toggleBtn.removeClass("btn-pause").addClass("btn-play");
			$toggleBtn.html('<span class="sr-only">재생</span>');
		}
	}
	
	// 공지사항 키보드 포커싱
	$(".info-list li:last a").on("keydown", function (e) {
		var keyCode = e.keyCode || e.which;
		if (keyCode === 9) {
			e.preventDefault();

			var currentIndex = $bxSlider.getCurrentSlide();
			var nextIndex = currentIndex + 1;
			if (nextIndex >= $bxSlider.getSlideCount()) {
				nextIndex = 0;
			}
			var $nextSlideLink = $(".bxslider li").eq(nextIndex).find("a");
			$nextSlideLink.focus();

			$nextSlideLink.on("keydown", function (e) {
				var nextKeyCode = e.keyCode || e.which;
				if (nextKeyCode === 9) {
					e.preventDefault();
					$(".slider-controls .btn-prev").focus();
				}
			});

			$(".bxslider li a").on("keydown", function (e) {
				var keyCode = e.keyCode || e.which;
				if (keyCode === 9 && e.shiftKey) {
					e.preventDefault();
					$(".info-list li:last a").focus();
				}
			});
		}

		if (keyCode === 9 && e.shiftKey) {
			e.preventDefault();
			$(".info-list li:eq(1) a").focus();
		}
	});
}

function setLeftNtcListSlide() {
	// notice slide
	var noticeSlide = $('.slide_notice').bxSlider({
		prevSelector : '.notice_btns .prev',
		nextSelector : '.notice_btns .next',
		auto : false,
		pager : false,
		infiniteLoop : false,
		hideControlOnEnd : true
	});
}
function setCookieMinutes( name, value, expireminutes ) { 
	 var todayDate = new Date(); 
	 todayDate.setMinutes( todayDate.getMinutes() + expireminutes ); 
	 document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
}
$(document).ready(function(){
//	// 공지사항을 10분에 한번씩만 받아오도록 수정 localStorage사용
//	var setMinute = 10; // 분 (초기값:10분)
//	var blnStorageVal = false;
//	var readMainNtcList = "";
//	var resultStorage = null;
//	try {
//		var readMainNtcListChk = getCookie("readMainNtcListChk");
//		if (readMainNtcListChk != null && readMainNtcListChk != undefined && readMainNtcListChk == "Y") {
//			if (window.localStorage) {
//				readMainNtcList = window.localStorage.getItem("readMainNtcList");
//				if (readMainNtcList != null && readMainNtcList != undefined && readMainNtcList != "") {
//					resultStorage = JSON.parse(readMainNtcList);
//					blnStorageVal = true;
//				}
//			}
//		}
//		
//		var readMainNtcListLngCd = getCookie("readMainNtcListLngCd");
//		if(lngCd != readMainNtcListLngCd){
//			blnStorageVal = false;
//		}
//	} catch (e) {
//		blnStorageVal = false;
//	}
//	if (blnStorageVal) {
//		setLeftNtcList(resultStorage);
//	} else {
//		$.post("/readMainNtcList.ajax"
//			,{}
//			,function(result){
//				try {
//					if (window.localStorage) {
//						window.localStorage.setItem("readMainNtcList",JSON.stringify(result));
//						setCookieMinutes("readMainNtcListChk","Y",setMinute);
//						setCookie("readMainNtcListLngCd",lngCd);
//					}
//				} catch (e) {
//				}
//				setLeftNtcList(result);
//			}
//			, "json"
//		);
//	}

	readMainNtcList();
});

function readMainNtcList(){
/*	$.post("/readMainNtcList.ajax"
		,{}
		,function(result){
			setLeftNtcList(result);
		}
		, "json"
	);*/
}

function fnStrToDt(str){
	var secDate = str.substr(0,8);
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = secDate.substr(6,2);
	var parseStr = year + "." + month + "." + day;
	
	return parseStr;
}

function fnStrLen(str){
	var returnStr = str;
	if(str.length > 11){
		returnStr = str.substr(0,11) + "...";
	}
	
	return returnStr;
}

function fnGoReadPage(ntcNo){ // 상세 정보 조회 / 수정 페이지
	$("#leftNtcNo").val(ntcNo);
	$("form[name=leftForm]").attr({"action" : "/cscn/ntcmttr/readNtc.do", "method" : "post", "target" : "_self"}).submit();
}

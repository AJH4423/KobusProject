$(document).ready(function() {
});

/**
 * 페이지 Click
 * @param pageNo
 */
function paginationClick(pageNo) {
	$("#pageIdx").val(pageNo);
	$("form[name=inqrForm]").attr({"action" : "/cscn/ntcmttr/readNtcList.do", "method" : "post", "target" : "_self"}).submit();
	
}

function fnSrchBtnClick(){ // 검색버튼 클릭
	$("input[name=pageIdx]").val(1);
	$("form[name=inqrForm]").attr({"action" : "/cscn/ntcmttr/readNtcList.do", "method" : "post", "target" : "_self"}).submit();
}

function fnGoReadPage(ntcNo){ // 상세 정보 조회 / 수정 페이지
	$("#ntcNo").val(ntcNo);
	$("form[name=inqrForm]").attr({"action" : "/cscn/ntcmttr/readNtc.do", "method" : "post", "target" : "_self"}).submit();
}

function fnSubmit(){
	if(event.keyCode == 13){
		fnSrchBtnClick();
	}
}
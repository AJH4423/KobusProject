﻿﻿﻿﻿$(document).ready(function() {
	
});
// 영수증 발행
function fnmrsRecpPub(idx) {
	var satsNo = document.forms["mrsCfmInfolistFrm"+idx].elements['satsNo'].value;
	 
	if(satsNo.indexOf("W1") > -1 || satsNo.indexOf("W2") > -1){
		$("form[name=mrsCfmInfolistFrm"+idx+"]").attr({"action" : "/wchr/mrs/mrsrecppub.do", "method" : "post", "target" : "_blank"}).submit(); // 영수증 출력.do
	}else{
		$("form[name=mrsCfmInfolistFrm"+idx+"]").attr({"action" : "/mrs/mrsrecppub.do", "method" : "post", "target" : "_blank"}).submit(); // 영수증 출력.do
	}
};

// 홈티켓[최초]발행 레이어팝업 및 홈티켓[최초] 발행 진행
function fnmrsHtcklayer(idx) {
	
	if(confirm("발권수단을 홈티켓으로 변경하시겠습니까?") == true){
		$("#homepopTicket").remodal().open();
		$("#mrsHtckPub").click(function(){
			
			if($("input:checkbox[id='agree1']").is(":checked") == false) {
				alert("이용약관에 동의하셔야 홈티켓 발행이 가능합니다.");
				return false;
			}
			
			var mrsCfmInfolistFrm = $("form[name=mrsCfmInfolistFrm"+idx+"]").serialize();
			
			$.ajax({
		  		type:"post"		
				,url:"/mrs/mrshtckpub.ajax"
				,data:mrsCfmInfolistFrm // input 값 세팅 
				,dataType:"json"
				,success:function(data){
					alert("fnmrsHtcklayer " + data.MSG_DTL_CTT);
					location.href ="/mrs/mrscfm.do?vltlCnt=Y";
				}
			    ,error:function(e) {	// 이곳의 ajax에서 에러가 나면 얼럿창으로 에러 메시지 출력
			    	alert("fnmrsRecpPub ajax 오류");
			    }
			});
			
		 });
		
	} else {
		return;
	}
}

// 홈티켓 재발행(조회) 시
function fnmrsReHtckPub(idx){
	console.log(idx);
	$("form[name=mrsCfmDtllistFrm"+idx+"]").attr({
		"action" : "/mrs/mrsrehtckpub.do", 
		"method" : "post", 
		"target" : "_blank"}
	).submit(); // 홈티켓 재발행.do
}


//홈티켓 모바일 시
function fnmrsReHtckMblYn(tckNo,terNo){
	var qrTckNo = tckNo.replace(/-/g,'') + terNo;
//	
//	jQuery('#qrcodeTableMbl_base').qrcode({
//		width	: 200,
//		height	: 200,
//		text	: ''
//	});	
	$('.qr_area > img').attr('src', '/images/blank.jpg');
	
	//fnmrsReHtckMbl(idx);
	$("#qrcodeTableMbl").html("");
	jQuery('#qrcodeTableMbl').qrcode({
		width	: 150,
		height	: 150,
		text	: qrTckNo
	});	
	jQuery('#qrcodeCanvas').qrcode({
		text	: qrTckNo
	});	
	var qrTckNoTxt = tckNo.replace(/-/g,'')+"<br>"+terNo;
	$("#qrTckNo").html(qrTckNoTxt);
	$('[data-remodal-id=homeTckMbl]').remodal().open();
}


//예매취소 금액정보 조회 [레이어 팝업]

//예매취소 금액정보 조회 [레이어 팝업]
function fnRecpCanInfo(idx , type) {
	//var satsNo = document.forms["recpCanFrm"+idx].elements['satsNo'].value;
	var satsNo = $("#recpCanFrm"+idx+" #satsNo").val()
	
		var recpCanInfoFrm = $("form[name=recpCanFrm]").serialize();
		$.ajax({
			 type:"post"
			,url: "/koBus/kobusResvCancel.ajax?ajaxType=search"
			,data:recpCanInfoFrm // input 값 세팅 
			,dataType:"json"
			,success:function(recpListMap){
				/*if (data.MSG_CD != 'S0000'){
					alert(data.MSG_DTL_CTT+'\n※취소불가 합니다.');
					return;
				}
*/
		    	//20240608 건보공단
				var nhisText = '대학생';
		    	if (recpListMap.deprnCd == '246' || recpListMap.arvlCd == '246' || recpListMap.deprnCd == '244' || recpListMap.arvlCd == '244'){
		    		nhisText = '건보공단';
		    	}

				// 편도일 때
			    var html ='';
			    html +='<form id="recpCanFrm" name="recpCanFrm" method="POST" tabindex="-1" action="/koBus/manageReservations.do">';
	    		html +='<input type="hidden" name="nonMbrsNo" id="nonMbrsNo" tabindex="-1" value="'+recpListMap.nonMbrsNo+'">';
	    		
	    		
		    	if(recpListMap.prmmDcDvsCd != '4' || recpListMap.rtrpMrsYn != 'Y') {
		    		html +='<input type="hidden" name="mrsMrnpNo" id="mrsMrnpNo" tabindex="-1" value="'+recpListMap.mrsMrnpno+'">';
			    	html +='<input type="hidden" name="mrsMrnpSno" id="mrsMrnpSno" tabindex="-1" value="'+recpListMap.mrsMrnpSno+'">';
			    	html +='<input type="hidden" name="prmmDcDvsCd" id="prmmDcDvsCd" tabindex="-1" value="'+recpListMap.prmmDcDvsCd+'">';
			    	html +='<input type="hidden" name="rtrpMrsYn" id="rtrpMrsYn" tabindex="-1" value="'+recpListMap.rtrpMrsYn+'">';
			    	html +='<input type="hidden" name="type" id="type" tabindex="-1" value="search">';
			    	html +='<input type="hidden" name="brkpAmtCmm" id="brkpAmtCmm" tabindex="-1" value="'+recpListMap.BRKP_AMT_CMM+'">';
			    	html +='<input type="hidden" name="pynDvsCd" id="pynDvsCd" tabindex="-1" value="'+recpListMap.pynDvsCd+'">';
			    	html +='<input type="hidden" name="pynDtlCd" id="pynDtlCd" tabindex="-1" value="'+recpListMap.pynDtlCd+'">';
			    	html +='<input type="hidden" name="tckSeqList" id="tckSeqList" tabindex="-1" value="'+recpListMap.tckSeqList+'">';
			    	html +='<input type="hidden" name="cancCnt" id="cancCnt" tabindex="-1" value="9">'; //취소할 승차권이 여러개라는 표시
		    	} else if(recpListMap.prmmDcDvsCd == '4' && recpListMap.rtrpMrsYn == 'Y') {
		    		if(type =='all'){
		    			html +='<input type="hidden" name="mrsMrnpNo" id="mrsMrnpNo" tabindex="-1" value="'+recpListMap.mrsMrnpno+":"+recpListMap.mrsMrnpno2+'">';
				    	html +='<input type="hidden" name="mrsMrnpSno" id="mrsMrnpSno" tabindex="-1" value="'+recpListMap.mrsMrnpSno+":"+recpListMap.mrsMrnpSno2+'">';
				    	html +='<input type="hidden" name="prmmDcDvsCd" id="prmmDcDvsCd" tabindex="-1" value="'+recpListMap.prmmDcDvsCd+'">';
				    	html +='<input type="hidden" name="rtrpMrsYn" id="rtrpMrsYn" tabindex="-1" value="'+recpListMap.rtrpMrsYn+'">';
				    	html +='<input type="hidden" name="type" id="type" tabindex="-1" value="search">';
				    	html +='<input type="hidden" name="brkpAmtCmm" id="brkpAmtCmm" tabindex="-1" value="'+recpListMap.BRKP_AMT_CMM+'">';
				    	html +='<input type="hidden" name="pynDvsCd" id="pynDvsCd" tabindex="-1" value="'+recpListMap.pynDvsCd+'">';
				    	html +='<input type="hidden" name="pynDtlCd" id="pynDtlCd" tabindex="-1" value="'+recpListMap.pynDtlCd+'">';
				    	html +='<input type="hidden" name="type" id="type" tabindex="-1" value="'+type+'">';
		    		} else if(type =='go'){
		    			html +='<input type="hidden" name="mrsMrnpNo" id="mrsMrnpNo" tabindex="-1" value="'+recpListMap.mrsMrnpno+'">';
				    	html +='<input type="hidden" name="mrsMrnpSno" id="mrsMrnpSno" tabindex="-1" value="'+recpListMap.mrsMrnpSno+'">';
				    	html +='<input type="hidden" name="prmmDcDvsCd" id="prmmDcDvsCd" tabindex="-1" value="'+recpListMap.prmmDcDvsCd+'">';
				    	html +='<input type="hidden" name="rtrpMrsYn" id="rtrpMrsYn" tabindex="-1" value="'+recpListMap.rtrpMrsYn+'">';
				    	html +='<input type="hidden" name="brkpAmtCmm" id="brkpAmtCmm" tabindex="-1" value="'+recpListMap.BRKP_AMT_CMM+'">';
				    	html +='<input type="hidden" name="type" id="type" tabindex="-1" value="search">';
				    	html +='<input type="hidden" name="pynDvsCd" id="pynDvsCd" tabindex="-1" value="'+recpListMap.pynDvsCd+'">';
				    	html +='<input type="hidden" name="pynDtlCd" id="pynDtlCd" tabindex="-1" value="'+recpListMap.pynDtlCd+'">';
				    	html +='<input type="hidden" name="type" id="type" tabindex="-1" value="'+type+'">';
				    	html +='<input type="hidden" name="tckSeqList" id="tckSeqList" tabindex="-1" value="'+recpListMap.tckSeqList+'">';
				    	html +='<input type="hidden" name="cancCnt" id="cancCnt" tabindex="-1" value="9">'; //취소할 승차권이 여러개라는 표시
		    		} else if(type =='come'){
		    			html +='<input type="hidden" name="mrsMrnpNo2" id="mrsMrnpNo" tabindex="-1" value="'+recpListMap.mrsMrnpno2+'">';
				    	html +='<input type="hidden" name="mrsMrnpSno2" id="mrsMrnpSno" tabindex="-1" value="'+recpListMap.mrsMrnpSno2+'">';
				    	html +='<input type="hidden" name="prmmDcDvsCd" id="prmmDcDvsCd" tabindex="-1" value="'+recpListMap.prmmDcDvsCd+'">';
				    	html +='<input type="hidden" name="rtrpMrsYn" id="rtrpMrsYn" tabindex="-1" value="'+recpListMap.rtrpMrsYn+'">';
				    	html +='<input type="hidden" name="brkpAmtCmm" id="brkpAmtCmm" tabindex="-1" value="'+recpListMap.BRKP_AMT_CMM+'">';
				    	html +='<input type="hidden" name="pynDvsCd" id="pynDvsCd" tabindex="-1" value="'+recpListMap.pynDvsCd+'">';
				    	html +='<input type="hidden" name="pynDtlCd" id="pynDtlCd" tabindex="-1" value="'+recpListMap.pynDtlCd+'">';
				    	html +='<input type="hidden" name="type" id="type" tabindex="-1" value="'+type+'">';
				    	html +='<input type="hidden" name="tckSeqList2" id="tckSeqList2" tabindex="-1" value="'+recpListMap.tckSeqList2+'">';
				    	html +='<input type="hidden" name="cancCnt2" id="cancCnt2" tabindex="-1" value="9">'; //취소할 승차권이 여러개라는 표시
		    		} else if(type =='come2'){
		    			html +='<input type="hidden" name="mrsMrnpNo" id="mrsMrnpNo" tabindex="-1" value="'+recpListMap.mrsMrnpno+'">';
				    	html +='<input type="hidden" name="mrsMrnpSno" id="mrsMrnpSno" tabindex="-1" value="'+recpListMap.mrsMrnpSno+'">';
				    	html +='<input type="hidden" name="prmmDcDvsCd" id="prmmDcDvsCd" tabindex="-1" value="'+recpListMap.prmmDcDvsCd+'">';
				    	html +='<input type="hidden" name="rtrpMrsYn" id="rtrpMrsYn" tabindex="-1" value="'+recpListMap.rtrpMrsYn+'">';
				    	html +='<input type="hidden" name="type" id="type" tabindex="-1" value="search">';
				    	html +='<input type="hidden" name="brkpAmtCmm" id="brkpAmtCmm" tabindex="-1" value="'+recpListMap.BRKP_AMT_CMM+'">';
				    	html +='<input type="hidden" name="pynDvsCd" id="pynDvsCd" tabindex="-1" value="'+recpListMap.pynDvsCd+'">';
				    	html +='<input type="hidden" name="pynDtlCd" id="pynDtlCd" tabindex="-1" value="'+recpListMap.pynDtlCd+'">';
				    	html +='<input type="hidden" name="type" id="type" tabindex="-1" value="'+type+'">';
				    	html +='<input type="hidden" name="tckSeqList" id="tckSeqList" tabindex="-1" value="'+recpListMap.tckSeqList+'">';
				    	html +='<input type="hidden" name="cancCnt" id="cancCnt" tabindex="-1" value="9">'; //취소할 승차권이 여러개라는 표시
		    		}
		    	}
		    	// 계좌이체 취소 파라미터 값
		    	html +='<input type="hidden" name="trnTrdId" id="trnTrdId" tabindex="-1" value="'+recpListMap.TRN_TRD_ID+'">';
		    	html +='<input type="hidden" name="pgBrkpAmtCmm" id="pgBrkpAmtCmm" tabindex="-1" value="'+recpListMap.BRKP_AMT_CMM+'">';
		    	html +='<input type="hidden" name="ryAmt" id="ryAmt" tabindex="-1" value="'+recpListMap.RY_AMT+'">';
		    	html +='<input type="hidden" name="tissuAmt" id="tissuAmt" tabindex="-1" value="'+recpListMap.TISSU_AMT+'">';
		    	// 계좌이체 취소 파라미터 값
		    	html +='<input type="hidden" name="resultCode" id="resultCode" tabindex="-1" value="'+recpListMap.ResultCode+'">';
		    	html +='<input type="hidden" name="resultMsg" id="resultMsg" tabindex="-1" value="'+recpListMap.ResultMsg+'">';
		    	html +='<input type="hidden" name="cancelAmt" id="cancelAmt" tabindex="-1" value="'+recpListMap.CancelAmt+'">';
		    	html +='<input type="hidden" name="cancelDate" id="cancelDate" tabindex="-1" value="'+recpListMap.CancelDate+'">';
		    	html +='<input type="hidden" name="cancelTime" id="cancelTime" tabindex="-1" value="'+recpListMap.CancelTime+'">';
		    	html +='<input type="hidden" name="cancelNum" id="cancelNum" tabindex="-1" value="'+recpListMap.CancelNum+'">';
		    	html +='<input type="hidden" name="payMethod" id="payMethod" tabindex="-1" value="'+recpListMap.PayMethod+'">';
		    	html +='<input type="hidden" name="mid" id="mid" tabindex="-1" value="'+recpListMap.MID+'">';
			    html +='<div class="title type_blue"><h2>'+'예매취소'+'</h2></div>';
			    html +='<div class="cont">';
			    if(recpListMap.prmmDcDvsCd != '4' || recpListMap.rtrpMrsYn != 'Y') {
				alert
			    	html +='<div class="box_detail_info">';
				    html +='<div class="routeHead">' + '<p class="date">'+recpListMap.alcnDeprDt+' '+recpListMap.alcnDeprTime+'</p>' +'</div>';	// 출발시간
				    html +='<div class="routeBody">';
				    html +='<div class="routeArea route_wrap"><div class="inner"><dl class="roundBox departure kor"><dt>'+'출발'+'</dt><dd>'+recpListMap.deprnNm+'</dd></dl>' +	//출발지
		    		'<dl class="roundBox arrive kor"><dt>'+'도착'+'</dt><dd>'+recpListMap.arvlNm+'</dd></dl></div>';			// 도착지
				    html +='<div class="detail_info"><span>'+recpListMap.takeDrtm+' 소요</span></div></div>';	// 소요시간
				    html +='<div class="routeArea route_wrap mob_route">';
				    html +='<div class="tbl_type2">';
				    html +='<table>';
				    html +='<caption>'+'버스 예매 정보에 대한 표이며 고속사, 등급, 매수, 좌석 정보 제공'+'</caption>';
				    html +='<colgroup><col style="width:68px;"><col style="width:*;"></colgroup>';
				    html +='<tbody>';
				    html +='<tr>';
				    html +='<th scope="row">'+'고속사'+'</th>';
				    html +='<td>'+recpListMap.cacmNm+'</td>';
				    html +='</tr>';
			    	html +='<tr>';
				    html +='<th scope="row">'+'등급'+'</th>';
				    html +='<td>'+recpListMap.deprNm+'</td>';
				    html +='</tr>';
			    	html +='<tr>';
				    html +='<th scope="row">'+'매수'+'</th>';
				    html +='<td>';
				    if(recpListMap.adltNum != 0){
				    	html +='일반'+recpListMap.adltNum+'명 ';
				    }
				    if(recpListMap.chldNum != 0){
				    	html +='초등생'+recpListMap.chldNum+'명 ';
				    }
				    if(recpListMap.teenNum != 0){
				    	html +='중고생'+recpListMap.teenNum+'명 ';
				    }
/*				    if(recpListMap.uvsdNum != 0){
				    	//20240608 건보공단
			    		html += nhisText+recpListMap.uvsdNum+'명 ';
				    }
				    if(recpListMap.sncnNum != 0){
				    	html +='경로'+recpListMap.sncnNum+'명 ';
				    }
				    if(recpListMap.dsprNum != 0){
				    	html +='장애인'+recpListMap.dsprNum+'명';
				    }
				    if(recpListMap.vtr3Num != 0){
				    	html +='보훈30 '+recpListMap.vtr3Num+'명';
				    }
				    if(recpListMap.vtr5Num != 0){
				    	html +='보훈50 '+recpListMap.vtr5Num+'명';
				    }
				    if(recpListMap.vtr7Num != 0){
				    	html +='보훈70 '+recpListMap.vtr7Num+'명';
				    }
				    if(recpListMap.dfptNum != 0){
				    	html +='후불'+recpListMap.dfptNum+'명';
				    }*/
				    
				    html +='</td>';
				    html +='</tr>';
			    	html +='<tr>';
				    html +='<th scope="row">'+'좌석'+'</th>';
			    	html +='<td>'+recpListMap.setsList+'</td>';
				    html +='</tr>';
				    html +='</tbody>';
			    	html +='</table>';
				    html +='</div>';
				    html +='</div>';
			    	html +='</div>';
				    html +='</div>';
			    } else if (recpListMap.prmmDcDvsCd == '4' && recpListMap.rtrpMrsYn == 'Y') {
			    	if(type == 'all'){
			    		// 가는편
				    	html +='<div class="box_detail_info">';
					    html +='<div class="routeHead">' + '<p class="date">'+recpListMap.alcnDeprDt+' '+recpListMap.alcnDeprTime+'</p>' +'</div>';	// 출발시간
					    html +='<div class="routeBody">';
					    html +='<div class="routeArea route_wrap"><div class="inner"><dl class="roundBox departure kor"><dt>'+'출발'+'</dt><dd>'+recpListMap.deprnNm+'</dd></dl>' +	//출발지
			    		'<dl class="roundBox arrive kor"><dt>'+'도착'+'</dt><dd>'+recpListMap.arvlNm+'</dd></dl></div>';			// 도착지
					    html +='<div class="detail_info"><span>'+recpListMap.takeDrtm+' 소요</span></div></div>';	// 소요시간
					    html +='<div class="routeArea route_wrap mob_route">';
					    html +='<div class="tbl_type2">';
					    html +='<table>';
					    html +='<caption>'+'버스 예매 정보에 대한 표이며 고속사, 등급, 매수, 좌석 정보 제공'+'</caption>';
					    html +='<colgroup><col style="width:68px;"><col style="width:*;"></colgroup>';
					    html +='<tbody>';
					    html +='<tr>';
					    html +='<th scope="row">'+'고속사'+'</th>';
					    html +='<td>'+recpListMap.cacmNm+'</td>';
					    html +='</tr>';
				    	html +='<tr>';
					    html +='<th scope="row">'+'등급'+'</th>';
					    html +='<td>'+recpListMap.deprNm+'</td>';
					    html +='</tr>';
				    	html +='<tr>';
					    html +='<th scope="row">'+'매수'+'</th>';
					    html +='<td>';
					    if(recpListMap.adltNum != 0){
					    	html +='일반'+recpListMap.adltNum+'명 ';
					    }
					    if(recpListMap.chldNum != 0){
					    	html +='초등생'+recpListMap.chldNum+'명 ';
					    }
					    if(recpListMap.teenNum != 0){
					    	html +='중고생'+recpListMap.teenNum+'명 ';
					    }
/*					    if(recpListMap.uvsdNum != 0){
					    	//20240608 건보공단
				    		html += nhisText+recpListMap.uvsdNum+'명 ';
					    }
					    if(recpListMap.sncnNum != 0){
					    	html +='경로'+recpListMap.sncnNum+'명 ';
					    }
					    if(recpListMap.dsprNum != 0){
					    	html +='장애인'+recpListMap.dsprNum+'명';
					    }
					    if(recpListMap.vtr3Num != 0){
					    	html +='보훈30 '+recpListMap.vtr3Num+'명';
					    }
					    if(recpListMap.vtr5Num != 0){
					    	html +='보훈50 '+recpListMap.vtr5Num+'명';
					    }
					    if(recpListMap.vtr7Num != 0){
					    	html +='보훈70 '+recpListMap.vtr7Num+'명';
					    }
					    if(recpListMap.dfptNum != 0){
					    	html +='후불'+recpListMap.dfptNum+'명';
					    }*/
					    
					    html +='</td>';
					    html +='</tr>';
				    	html +='<tr>';
					    html +='<th scope="row">'+'좌석'+'</th>';
				    	html +='<td>'+recpListMap.satsNo+'</td>';
					    html +='</tr>';
					    html +='</tbody>';
				    	html +='</table>';
					    html +='</div>';
					    html +='</div>';
				    	html +='</div>';
					    html +='</div>';
					    // 오는 편
				    	html +='<div class="box_detail_info">';
					    html +='<div class="routeHead">' + '<p class="date">'+recpListMap.alcnDeprDt2+' '+recpListMap.alcnDeprTime2+'</p>' +'</div>';	// 출발시간
					    html +='<div class="routeBody">';
					    html +='<div class="routeArea route_wrap"><div class="inner"><dl class="roundBox departure kor"><dt>'+'출발'+'</dt><dd>'+recpListMap.deprnNm2+'</dd></dl>' +	//출발지
			    		'<dl class="roundBox arrive kor"><dt>'+'도착'+'</dt><dd>'+recpListMap.arvlNm2+'</dd></dl></div>';			// 도착지
					    html +='<div class="detail_info"><span>'+recpListMap.takeDrtm2+' 소요</span></div></div>';	// 소요시간
					    html +='<div class="routeArea route_wrap mob_route">';
					    html +='<div class="tbl_type2">';
					    html +='<table>';
					    html +='<caption>'+'버스 예매 정보에 대한 표이며 고속사, 등급, 매수, 좌석 정보 제공'+'</caption>';
					    html +='<colgroup><col style="width:68px;"><col style="width:*;"></colgroup>';
					    html +='<tbody>';
					    html +='<tr>';
					    html +='<th scope="row">'+'고속사'+'</th>';
					    html +='<td>'+recpListMap.cacmNm2+'</td>';
					    html +='</tr>';
				    	html +='<tr>';
					    html +='<th scope="row">'+'등급'+'</th>';
					    html +='<td>'+recpListMap.deprNm2+'</td>';
					    html +='</tr>';
				    	html +='<tr>';
					    html +='<th scope="row">'+'매수'+'</th>';
					    html +='<td>';
					    if(recpListMap.adltNum2 != 0){
					    	html +='일반'+recpListMap.adltNum2+'명 ';
					    }
					    if(recpListMap.chldNum2 != 0){
					    	html +='초등생'+recpListMap.chldNum2+'명 ';
					    }
					    if(recpListMap.teenNum2 != 0){
					    	html +='중고생'+recpListMap.teenNum2+'명 ';
					    }
/*					    if(recpListMap.uvsdNum2 != 0){
					    	//20240608 건보공단
				    		html += nhisText+recpListMap.uvsdNum2+'명 ';
					    }
					    if(recpListMap.sncnNum2 != 0){
					    	html +='경로'+recpListMap.sncnNum2+'명 ';
					    }
					    if(recpListMap.dsprNum2 != 0){
					    	html +='장애인'+recpListMap.dsprNum2+'명';
					    }
					    if(recpListMap.vtr3Num2 != 0){
					    	html +='보훈30 '+recpListMap.vtr3Num2+'명';
					    }
					    if(recpListMap.vtr5Num2 != 0){
					    	html +='보훈50 '+recpListMap.vtr5Num2+'명';
					    }
					    if(recpListMap.vtr7Num2 != 0){
					    	html +='보훈70 '+recpListMap.vtr7Num2+'명';
					    }
					    if(recpListMap.dfptNum2 != 0){
					    	html +='후불'+recpListMap.dfptNum2+'명';
					    }*/
					    
					    html +='</td>';
					    html +='</tr>';
				    	html +='<tr>';
					    html +='<th scope="row">'+'좌석'+'</th>';
				    	html +='<td>'+recpListMap.satsNo2+'</td>';
					    html +='</tr>';
					    html +='</tbody>';
				    	html +='</table>';
					    html +='</div>';
					    html +='</div>';
				    	html +='</div>';
					    html +='</div>';
				    } else if(type =='go' || type =='come2'){
			    		// 가는편
				    	html +='<div class="box_detail_info">';
					    html +='<div class="routeHead">' + '<p class="date">'+recpListMap.alcnDeprDt+' '+recpListMap.alcnDeprTime+'</p>' +'</div>';	// 출발시간
					    html +='<div class="routeBody">';
					    html +='<div class="routeArea route_wrap"><div class="inner"><dl class="roundBox departure kor"><dt>'+'출발'+'</dt><dd>'+recpListMap.deprnNm+'</dd></dl>' +	//출발지
			    		'<dl class="roundBox arrive kor"><dt>'+'도착'+'</dt><dd>'+recpListMap.arvlNm+'</dd></dl></div>';			// 도착지
					    html +='<div class="detail_info"><span>'+recpListMap.takeDrtm+' 소요</span></div></div>';	// 소요시간
					    html +='<div class="routeArea route_wrap mob_route">';
					    html +='<div class="tbl_type2">';
					    html +='<table>';
					    html +='<caption>'+'버스 예매 정보에 대한 표이며 고속사, 등급, 매수, 좌석 정보 제공'+'</caption>';
					    html +='<colgroup><col style="width:68px;"><col style="width:*;"></colgroup>';
					    html +='<tbody>';
					    html +='<tr>';
					    html +='<th scope="row">'+'고속사'+'</th>';
					    html +='<td>'+recpListMap.cacmNm+'</td>';
					    html +='</tr>';
				    	html +='<tr>';
					    html +='<th scope="row">'+'등급'+'</th>';
					    html +='<td>'+recpListMap.deprNm+'</td>';
					    html +='</tr>';
				    	html +='<tr>';
					    html +='<th scope="row">'+'매수'+'</th>';
					    html +='<td>';
					    if(recpListMap.adltNum != 0){
					    	html +='일반'+recpListMap.adltNum+'명 ';
					    }
					    if(recpListMap.chldNum != 0){
					    	html +='초등생'+recpListMap.chldNum+'명 ';
					    }
					    if(recpListMap.teenNum != 0){
					    	html +='중고생'+recpListMap.teenNum+'명 ';
					    }
/*					    if(recpListMap.uvsdNum != 0){
					    	//20240608 건보공단
				    		html += nhisText+recpListMap.uvsdNum+'명 ';
					    }
					    if(recpListMap.sncnNum != 0){
					    	html +='경로'+recpListMap.sncnNum+'명 ';
					    }
					    if(recpListMap.dsprNum != 0){
					    	html +='장애인'+recpListMap.dsprNum+'명';
					    }
					    if(recpListMap.vtr3Num != 0){
					    	html +='보훈30 '+recpListMap.vtr3Num+'명';
					    }
					    if(recpListMap.vtr5Num != 0){
					    	html +='보훈50 '+recpListMap.vtr5Num+'명';
					    }
					    if(recpListMap.vtr7Num != 0){
					    	html +='보훈70 '+recpListMap.vtr7Num+'명';
					    }
					    if(recpListMap.dfptNum != 0){
					    	html +='후불'+recpListMap.dfptNum+'명';
					    }*/
					    
					    html +='</td>';
					    html +='</tr>';
				    	html +='<tr>';
					    html +='<th scope="row">'+'좌석'+'</th>';
				    	html +='<td>'+recpListMap.satsNo+'</td>';
					    html +='</tr>';
					    html +='</tbody>';
				    	html +='</table>';
					    html +='</div>';
					    html +='</div>';
				    	html +='</div>';
					    html +='</div>';
			    	} else if(type =='come'){
			    		// 오는 편
				    	html +='<div class="box_detail_info">';
					    html +='<div class="routeHead">' + '<p class="date">'+recpListMap.alcnDeprDt2+' '+recpListMap.alcnDeprTime2+'</p>' +'</div>';	// 출발시간
					    html +='<div class="routeBody">';
					    html +='<div class="routeArea route_wrap"><div class="inner"><dl class="roundBox departure kor"><dt>'+'출발'+'</dt><dd> '+recpListMap.deprnNm2+'</dd></dl>' +	//출발지
					    		'<dl class="roundBox arrive kor"><dt>'+'도착'+'</dt><dd>'+recpListMap.arvlNm2+'</dd></dl></div>';			// 도착지
					    html +='<div class="detail_info"><span>'+recpListMap.takeDrtm2+' 소요</span></div></div>';	// 소요시간
					    html +='<div class="routeArea route_wrap mob_route">';
					    html +='<div class="tbl_type2">';
					    html +='<table>';
					    html +='<caption>'+'버스 예매 정보에 대한 표이며 고속사, 등급, 매수, 좌석 정보 제공'+'</caption>';
					    html +='<colgroup><col style="width:68px;"><col style="width:*;"></colgroup>';
					    html +='<tbody>';
					    html +='<tr>';
					    html +='<th scope="row">'+'고속사'+'</th>';
					    html +='<td>'+recpListMap.cacmNm2+'</td>';
					    html +='</tr>';
				    	html +='<tr>';
					    html +='<th scope="row">'+'등급'+'</th>';
					    html +='<td>'+recpListMap.deprNm2+'</td>';
					    html +='</tr>';
				    	html +='<tr>';
					    html +='<th scope="row">'+'매수'+'</th>';
					    html +='<td>';
					    if(recpListMap.adltNum2 != 0){
					    	html +='일반'+recpListMap.adltNum2+'명 ';
					    }
					    if(recpListMap.chldNum2 != 0){
					    	html +='초등생'+recpListMap.chldNum2+'명 ';
					    }
					    if(recpListMap.teenNum2 != 0){
					    	html +='중고생'+recpListMap.teenNum2+'명 ';
					    }
/*					    if(recpListMap.uvsdNum2 != 0){
					    	//20240608 건보공단
				    		html += nhisText+recpListMap.uvsdNum2+'명 ';
					    }
					    if(recpListMap.sncnNum2 != 0){
					    	html +='경로'+recpListMap.sncnNum2+'명';
					    }
					    if(recpListMap.dsprNum2 != 0){
					    	html +='장애인'+recpListMap.dsprNum2+'명';
					    }
					    if(recpListMap.vtr3Num2 != 0){
					    	html +='보훈30 '+recpListMap.vtr3Num2+'명';
					    }
					    if(recpListMap.vtr5Num2 != 0){
					    	html +='보훈50 '+recpListMap.vtr5Num2+'명';
					    }
					    if(recpListMap.vtr7Num2 != 0){
					    	html +='보훈70 '+recpListMap.vtr7Num2+'명';
					    }
					    if(recpListMap.dfptNum2 != 0){
					    	html +='후불'+recpListMap.dfptNum2+'명';
					    }
					    */
					    html +='</td>';
					    html +='</tr>';
				    	html +='<tr>';
					    html +='<th scope="row">'+'좌석'+'</th>';
				    	html +='<td>'+recpListMap.satsNo2+'</td>';
					    html +='</tr>';
					    html +='</tbody>';
				    	html +='</table>';
					    html +='</div>';
					    html +='</div>';
				    	html +='</div>';
					    html +='</div>';
			    	}
			    }
			    // 결제정보
			    html +='<div class="box_detail_info bgGray">';
			    html +='<div class="routeArea route_wrap mob_route">';
			    html +='<div class="tbl_type3">';
			    html +='<table>';
			    html +='<caption>'+'결제 정보에 대한 표이며 결제일시, 결제수단 정보 제공'+'</caption>';
			    html +='<colgroup><col style="width:80px;"><col style="width:*;"></colgroup>';	
		    	html +='<tbody>';
			    html +='<tr>';
			    html +='<th scope="row">'+'결제일시'+'</th>';
			    if(recpListMap.TRD_DTM == null){
			    	html +='<td>'+''+'</td>';
			    } else {
			    	html +='<td>'+recpListMap.TRD_DTM+'</td>';
			    }
			    html +='</tr>';
		    	html +='<tr>';
		    	if(recpListMap.pynDtlCd != '7' && recpListMap.pynDtlCd != '8' && recpListMap.pynDtlCd != '9') {
		    		html +='<th scope="row">'+'결제수단'+'</th>';		    
		    		html +='<td>'+recpListMap.payNm+'</td>';
		    	}
			    html +='</tr>';
			    html +='</tbody>';
			    html +='</table>';
			    html +='</div>';
			    html +='</div>';
			    html +='<div class="routeArea route_wrap mob_route">';
			    html +='<div class="tbl_type3">';
			    html +='<table class="taR">';
			    html +='<caption>'+'결제 정보에 대한 표이며 결제금액, 취소 수수료(예상), 반환금액 정보 제공'+'</caption>';
		    	html +='<colgroup><col style="width:135px;"><col style="width:*;"></colgroup>';	
		    	html +='<tbody>';
			    html +='<tr>';
			    if(recpListMap.pynDvsCd != '3'){
			    	if(recpListMap.pynDtlCd == '7' || recpListMap.pynDtlCd == '8' || recpListMap.pynDtlCd == '9') {
			    		html +='<th scope="row">'+'결제수단'+'</th>';
			    		if(recpListMap.pynDtlCd == '7') {
					    	html +='<td>';
					    	if(recpListMap.adltNum != 0 || recpListMap.adltNum2 != 0){
					    		html +='일반 ';
					    	}else if(recpListMap.teenNum != 0 || recpListMap.teenNum2 != 0 || recpListMap.uvsdNum != 0 || recpListMap.uvsdNum2 != 0){
					    		html +='학생 ';
					    	}
					    	html +='정기권</td>';				    
					    } else if(recpListMap.pynDtlCd == '9') {
					    	html +='<td>프리패스</td>';
					    }
			    	} else {
			    		html +='<th scope="row">'+'결제금액'+'</th>';
					    if(recpListMap.TISSU_AMT != null){
					    	html +='<td>'+comma(recpListMap.TISSU_AMT)+'원</td>';
					    } else {
					    	html +='<td>원</td>';
					    }
					    html +='</tr>';
				    	html +='<tr>';
					    html +='<th scope="row">'+'취소 수수료(예상)'+'</th>';
					    if(recpListMap.BRKP_AMT_CMM != null){
					    	if(recpListMap.BRKP_AMT_CMM != "0"){
					    		html +='<td>-'+comma(recpListMap.BRKP_AMT_CMM)+'원</td>';
					    	} else {
					    		html +='<td>'+comma(recpListMap.BRKP_AMT_CMM)+'원</td>';
					    	}
					    } else {
					    	html +='<td>원</td>';
					    }
					    html +='</tr>';
				    	html +='<tr>';
					    html +='<th scope="row">'+'반환금액'+'</th>';
					    if(recpListMap.RY_AMT != null){
					    	html +='<td>'+comma(recpListMap.RY_AMT)+'원</td>';
					    } else {
					    	html +='<td>원</td>';
					    }
			    	} 
			    }else{
			    	html +='<th scope="row"> </th>';
				    html +='<td> </td>';
			    }
			    html +='</tr>';
			    html +='</tbody>';
			    html +='</table>';
			    html +='</div>';
			    html +='</div>';
			    html +='</div>';
			    // 취소 수수료정보
			    if(recpListMap.pynDvsCd != '3'){
			    	if(recpListMap.pynDtlCd == '7') {
			    		html +='<div class="mob_pad marT30"><h3 class="pop_h3 mob_h3">취소 안내</h3><p class="bul">정기권으로 예매한 승차권은 출발 시간 전까지 취소 후 다시 승차권 예매가 가능합니다.</p>'
			    			+'<p class="bul"><strong class="accent2">정기권으로 예매한 승차권을 취소하지 않고 출발 시간이 지났을 경우 해당일의 동일 방향(편도) 재이용이 불가합니다.</strong></p></div>';
			    	}else if(recpListMap.pynDtlCd == '9') {
			    		html +='<div class="mob_pad marT30"><h3 class="pop_h3 mob_h3">취소 안내</h3><p class="bul">프리패스의 경우, 사용 시작일 이전 취소가 가능하며 구매금액의 100%가 지급 됩니다.</p>'
			    			+'<p class="bul">프리패스 사용 시작 1일 후까지 취소 가능하나, 승차권 발권 상태인 경우 취소 불가능합니다.</p></div>';		    		
			    	}else if($('#extrComp').val() == 'ARMY'){
			    		html +='<div class="mob_pad marT30"><h4 style="border-bottom: 1px solid black;">'+'취소안내'+'</h4>'+'<ul class="desc_list"><li>'+'가. 예매차량 출발 전까지 취소 가능 (취소 수수료 없음)'+'<br />'+
						'<span style="color:#ff0422">'+'(나라사랑포털을 통해서만 취소 가능함. 터미널매표창구 및 고속버스 티머니 등 타 매체에서 취소 불가)'+'</span>'+'</li>'
					    +'<li>'+'<span style="color:#ff0422">'+'나. 예매차량 출발시각 이후 취소 불가 (동일 후급번호로 재 예매 불가)'+'</span>'+'</li>'
					    +'</ul></div>';			    		
			    	}else {
			    		html +='<div class="mob_pad marT30"><h3 class="pop_h3 mob_h3">'+'취소수수료'+'</h3>'+'<div class="tbl_type1">'+'<table class="MsoNormalTable __se_tbl table_type2" border="0" cellspacing="0" cellpadding="0" _se2_tbl_template="14"><caption>'+'승차권 취소수수료에 대한 정보 제공'+'</caption>'
			    		+'<colgroup><col style="width: 40%;"><col style="width: 20%;"><col style="width: 20%;"><col style="width: 20%;"></colgroup><thead><tr><th class=" undraggable" colspan="4" scope="col">'
			    		+'<p align="center" class="MsoNormal"><b><span>'+'개정(25.5.1일부터)'+'</span></b></p></th></tr><tr><th class=" undraggable" scope="col">'
			    		+'<p align="center" class="MsoNormal"><b><span style="color: #000;font-size: 10pt;">'+'구분'+'</span></b></p></th><th class=" undraggable" scope="col">'
			    		+'<p align="center" class="MsoNormal"><b><span style="color: #000;font-size: 10pt;">'+'월~목'+'</span></b></p></th><th class=" undraggable" scope="col">'
			    		+'<p align="center" class="MsoNormal"><b><span style="color: #000;font-size: 10pt;">'+'금~일'+'<br>공휴일</span></b></p></th><th class=" undraggable" scope="col">'
			    		+'<p align="center" class="MsoNormal"><b><span style="color: #000;font-size: 10pt;">'+'명절<br>(설,추석)'+'</span></b></p></th></tr></thead>'
			    		+'<tbody><tr><td><b><p align="center" class="MsoNormal"><span>'+'2일전'+'</span></p></b></td>'
			    		+'<td><b><p align="center" class="MsoNormal"><span>'+'0%'+'</span></p></b></td>'
			    		+'<td><b><p align="center" class="MsoNormal"><span>'+'0%'+'</span></p></b></td>'
			    		+'<td><b><p align="center" class="MsoNormal"><span>'+'0%'+'</span></p></b></td></tr>'
			    		+'<tr><td><b><p align="center" class="MsoNormal"><span>'+'1일전 ~ 3시간 이전'+'</span></p></b></td>'
			    		+'<td><b><p align="center" class="MsoNormal"><span>'+'5%'+'</span></p></b></td>'
			    		+'<td><b><p align="center" class="MsoNormal"><span>'+'7.50%'+'</span</p></b></td>'
			    		+'<td><b><p align="center" class="MsoNormal"><span>'+'10%'+'</span></p></b></td></tr>'
			    		+'<tr class="type2"><td><b><p align="center" class="MsoNormal"><span>'+'3시간 미만 ~ 출발 전'+'</span></p></b></td>'
			    		+'<td><b><p align="center" class="MsoNormal"><span>'+'10%'+'</span></p></b></td>'
			    		+'<td><b><p align="center" class="MsoNormal"><span>'+'15%'+'</span></p></b></td>'
			    		+'<td><b><p align="center" class="MsoNormal"><span>'+'20%'+'</span></p></b></td></tr>'
			    		+'<tr><td><b><p align="center" class="MsoNormal"><span>'+'출발 후 ~ 도착예정시간 이전'+'</span></p></b></td>'
			    		+'<td><b><p align="center" class="MsoNormal"><span>25년: 50%<br>26년 : 60%<br>27년 : 70%</span></p></b></td>'
			    		+'<td><b><p align="center" class="MsoNormal"><span>'+'25년: 50%<br>26년 : 60%<br>27년 : 70%'+'</span></p></b></td>'
			    		+'<td><b><p align="center" class="MsoNormal"><span>'+'25년: 50%<br>26년 : 60%<br>27년 : 70%'+'</span></p></b></td></tr>'
			    		+'<tr><td><b><p align="center" class="MsoNormal"><span>'+'도착예정시간 초과'+'</span></p></b></td>'
			    		+'<td><b><p align="center" class="MsoNormal"><span>'+'100%'+'</span></p></b></td>'
			    		+'<td><b><p align="center" class="MsoNormal"><span>'+'100%'+'</span></p></b></td>'
			    		+'<td><b><p align="center" class="MsoNormal"><span>'+'100%'+'</span></p></b></td></tr></tbody></table>'
			    		+'<p style="font-size:14px;color:#000;margin-top:15px;">* 명절 취소수수료 기준은 설/추석 전전일, 전일, 당일 및 다음날에 적용합니다.</p>'
			    		+'<p style="font-size:14px;color:#000;">* 출발 이후부터 도착예정시간까지의 취소수수료 기준은 `25년 5월1일부터 `26년 4월30일까지는 50%, `26년 5월1일부터 `27년 4월30일까지는 60%, `27년 5월1일부터는 70%를 적용한다.</p>'
			    		+'<p style="font-size:14px;color:#000;">* 지정차 출발 당일에 승차권을 발행한 경우는 발행시점 기준 1시간 이내까지 취소수수료 미부과 (단, 지정차 출발 이후에는 승차권 발행시점과 상관없이 취소수수료 부과)</p>'
			    		+'</div><ul class="desc_list"><li>'+'취소수수료 산정은 날짜를 기준(시간 기준이 아님)으로 합니다.'+'</li>'
					    +'<li>'+'사용하지 않은 모든 승차권은 지정차 출발 후 도착 예정시간이 지나면 환불하실 수 없습니다.'+'</li>'
					    +'<li>'+'취소 수수료는 취소가 완료되는 시점을 기준으로 발행하니 유의하시기 바랍니다.'+'</li>'
			    		+'<li>'+'신용(체크)카드 환불은 카드사 정책에 따라 평일(은행영업일)기준 3~5일 소요될 수 있습니다.'+'</li></ul></div>';
					    
			    	}
			    }else{
			    	html +='<div class="mob_pad marT30"><h3 class="pop_h3 mob_h3">취소 안내</h3><p class="bul">마일리지(프리미엄) 예매 건은 <span class="accent2">취소 시 사용 마일리지 반환이 불가</span>하오니 유의하시기 바랍니다.</p></div>';
			    }
			    html +='</div>';
			    html +='<div class="btns col1"><button recpListMap-remodal-action="confirm" onclick="fnRecpCan();" class="btnL btn_orange">'+'예매취소'+'</button></div>';
			    html += '<button type="button" recpListMap-remodal-action="close" class="remodal-close"><span class="sr-only">'+'닫기'+'</span></button>'
			    html +='</div>';
			    html +='</form>';
			    // 왕복일 때
			    //
			    //
			    $("#popTicketCancel").html(html);
			    $("#popTicketCancel").remodal().open();
			    
					 // args.recpListMap[idx] : args 는 function(args)의 인자. data는 controller.java에서 json객체에 넣어준 key(여기서는 list가 값이 된다). [idx]는 list의 몇번쨰 데이터를 가져올지 배열을 나타냄
			}
		    ,error:function(e) {	// 이곳의 ajax에서 에러가 나면 얼럿창으로 에러 메시지 출력
			alert("fnRecpCanInfo ajax 오류");
		    }
		});
	 
};

/*//예매취소(승차권) 금액정보 조회 [레이어 팝업]
function fnTckCanInfo(idx) {
	
	
	var tckCanInfoFrm = $("form[name=mrsCfmDtllistFrm"+idx+"]").serialize();	// 홈티켓 재발행도 승차권 단위여서 폼 그대로 씀
	
	var satsNo = document.forms["mrsCfmDtllistFrm"+idx].elements['satsNo'].value;
	 
	if(satsNo == "W1" ||  satsNo == "W2"){
		if(confirm("휠체어 예매 취소는 휠체어 예매 사이트에서 가능합니다.\n휠체어 예매 사이트로 이동 하시겠습니까?")){
			location.href ="/wchr/mrs/mrscfm.do";
		}else{
			return;
		}
	}else{
		$.ajax({
			 type:"post"		
			,url: "/koBus/kobusResvCancel.ajax?ajax=true&type=search"  
			,data:tckCanInfoFrm // input 값 세팅 
			,dataType:"json"
			,success:function(data){
				 var html ='';
				    html +='<form id="mrsTckCanFrm" name="mrsTckCanFrm" action="/mrs/tckcan.ajax">';
				    html +='<input type="hidden" name="nonMbrsNo" id="nonMbrsNo" value="'+data.nonMbrsNo+'">';
				    
			    	html +='<input type="hidden" name="mrsMrnpSno" id="mrsMrnpSno" value="'+data.mrsMrnpSno+'">';
			    	html +='<input type="hidden" name="brkpAmtCmm" id="brkpAmtCmm" value="'+data.BRKP_AMT_CMM+'">';
			    	html +='<input type="hidden" name="pynDvsCd" id="pynDvsCd" value="'+data.pynDvsCd+'">';
			    	html +='<input type="hidden" name="alcnDeprDt" id="alcnDeprDt" value="'+data.alcnDeprDt+'">';
			    	html +='<input type="hidden" name="alcnDeprTime" id="alcnDeprTime" value="'+data.alcnDeprTime+'">';
			    	html +='<input type="hidden" name="deprnNm" id="deprnNm" value="'+data.deprnNm+'">';
			    	html +='<input type="hidden" name="arvlNm" id="arvlNm" value="'+data.arvlNm+'">';
			    	html +='<input type="hidden" name="cancCnt" id="cancCnt" value="1">';
				    html +='<div class="title type_blue"><h2>'+'예매취소'+'</h2></div>';
				    html +='<div class="cont">';
				    html +='<div class="box_detail_info">';
				    html +='<div class="routeHead">' + '<p class="date">'+data.alcnDeprDt+' '+data.alcnDeprTime+'</p>' +'</div>';	// 출발시간
				    html +='<div class="routeBody">';
				    html +='<div class="routeArea route_wrap"><div class="inner"><dl class="roundBox departure kor"><dt>'+'출발'+'</dt><dd>'+data.deprnNm+'</dd></dl>' +	//출발지
				    '<dl class="roundBox arrive kor"><dt>'+'도착'+'</dt><dd>'+data.arvlNm+'</dd></dl></div>';	// 도착지
				    html +='<div class="detail_info"><span>'+data.takeDrtm+' 소요</span></div></div>';	// 소요시간
				    html +='<div class="routeArea route_wrap mob_route">';
				    html +='<div class="tbl_type2">';
				    html +='<table>';
				    html +='<caption>'+'버스 예매 정보에 대한 표이며 고속사, 등급, 매수, 좌석 정보 제공'+'</caption>';
				    html +='<colgroup><col style="width:68px;"><col style="width:*;"></colgroup>';
				    html +='<tbody>';
				    html +='<tr>';
				    html +='<th scope="row">'+'고속사'+'</th>';
				    html +='<td>'+data.cacmNm+'</td>';
				    html +='</tr>';
			    	html +='<tr>';
				    html +='<th scope="row">'+'등급'+'</th>';
				    html +='<td>'+data.deprNm+'</td>';
				    html +='</tr>';
			    	html +='<tr>';
				    html +='<th scope="row">'+'매수'+'</th>';
//				    if(data.tckKndCd == '1'){
//				    	html +='<td>'+'일반 1명'+'</td>';
//				    } else if(data.tckKndCd == '2'){
//				    	html +='<td>'+'초등생 1명'+'</td>';
//				    } else if(data.tckKndCd == '9'){
//				    	html +='<td>'+'중고생 1명'+'</td>';
//				    } else if(data.tckKndCd == '8'){
//				    	html +='<td>'+'대학생 1명'+'</td>';
//				    } else if(data.tckKndCd == 'o'){
//				    	html +='<td>'+'경로 1명'+'</td>';
//				    } else if(data.tckKndCd == 'd'){
//				    	html +='<td>'+'장애인 1명'+'</td>';
//				    } 
				    	html +='<td>';
				    	html +=data.tckKndTxt+ ' 1명';
				    	html +='</td>';
				    html +='</tr>';
			    	html +='<tr>';
				    html +='<th scope="row">'+'좌석'+'</th>';
				    html +='<td>'+data.satsNo+'</td>';
				    html +='</tr>';
				    html +='</tbody>';
			    	html +='</table>';
				    html +='</div>';
				    html +='</div>';
			    	html +='</div>';
				    html +='</div>';
				    // 결제정보
				    html +='<div class="box_detail_info bgGray">';
				    html +='<div class="routeArea route_wrap mob_route">';
				    html +='<div class="tbl_type3">';
				    html +='<table>';
				    html +='<caption>'+'결제 정보에 대한 표이며 결제일시, 결제수단 정보 제공'+'</caption>';
				    html +='<colgroup><col style="width:80px;"><col style="width:*;"></colgroup>';	
			    	html +='<tbody>';
				    html +='<tr>';
				    html +='<th scope="row">'+'결제일시'+'</th>';
				    if(data.TRD_DTM == null){
				    	html +='<td>'+''+'</td>';
				    } else {
				    	html +='<td>'+data.TRD_DTM+'</td>';
				    }
				    html +='</tr>';
			    	html +='<tr>';
				    html +='<th scope="row">'+'결제수단'+'</th>';
				    html +='<td>'+data.payNm+'</td>';
				    html +='</tr>';
				    html +='</tbody>';
				    html +='</table>';
				    html +='</div>';
				    html +='</div>';
				    html +='<div class="routeArea route_wrap mob_route">';
				    html +='<div class="tbl_type3">';
				    html +='<table class="taR">';
				    html +='<caption>'+'결제 정보에 대한 표이며 결제금액, 취소 수수료(예상), 반환금액 정보 제공'+'</caption>';
			    	html +='<colgroup><col style="width:135px;"><col style="width:*;"></colgroup>';	
			    	html +='<tbody>';
				    html +='<tr>';
				    if(data.pynDvsCd != '3'){
					    html +='<th scope="row">'+'결제금액'+'</th>';
					    if(data.TISSU_AMT != null){
					    	html +='<td>'+comma(data.TISSU_AMT)+'원</td>';
					    } else {
					    	html +='<td>원</td>';
					    }
					    html +='</tr>';
				    	html +='<tr>';
					    html +='<th scope="row">'+'취소 수수료(예상)'+'</th>';
					    if(data.BRKP_AMT_CMM != null){
					    	if(data.BRKP_AMT_CMM != "0"){
					    		html +='<td>-'+comma(data.BRKP_AMT_CMM)+'원</td>';
					    	} else {
					    		html +='<td>'+comma(data.BRKP_AMT_CMM)+'원</td>';
					    	}
					    } else {
					    	html +='<td>원</td>';
					    }
					    html +='</tr>';
				    	html +='<tr>';
					    html +='<th scope="row">'+'반환금액'+'</th>';
					    if(data.RY_AMT != null){
					    	html +='<td>'+comma(data.RY_AMT)+'원</td>';
					    } else {
					    	html +='<td>원</td>';
					    }
				    }else{
				    	html +='<th scope="row"> </th>';
				    	tml +='<td> </td>';
				    }
				    html +='</tr>';
				    html +='</tbody>';
				    html +='</table>';
				    html +='</div>';
				    html +='</div>';
				    html +='</div>';
				    // 취소 수수료정보
				    if(data.pynDvsCd != '3'){
					    html +='<div class="mob_pad marT30"><h3 class="pop_h3 mob_h3">'+'취소수수료'+'</h3>'+'<div class="tbl_type1">'+'<table class="MsoNormalTable __se_tbl table_type2" border="0" cellspacing="0" cellpadding="0" _se2_tbl_template="14"><caption>'+'승차권 취소수수료에 대한 정보 제공'+'</caption>'
					    		+'<colgroup><col style="width: 40%;"><col style="width: 20%;"><col style="width: 20%;"><col style="width: 20%;"></colgroup><thead><tr><th class=" undraggable" colspan="4" scope="col">'
					    		+'<p align="center" class="MsoNormal"><b><span>'+'개정(25.5.1일부터)'+'</span></b></p></th></tr><tr><th class=" undraggable" scope="col">'
					    		+'<p align="center" class="MsoNormal"><b><span style="color: #000;font-size: 10pt;">'+'구분'+'</span></b></p></th><th class=" undraggable" scope="col">'
					    		+'<p align="center" class="MsoNormal"><b><span style="color: #000;font-size: 10pt;">'+'월~목'+'</span></b></p></th><th class=" undraggable" scope="col">'
					    		+'<p align="center" class="MsoNormal"><b><span style="color: #000;font-size: 10pt;">'+'금~일'+'<br>공휴일</span></b></p></th><th class=" undraggable" scope="col">'
					    		+'<p align="center" class="MsoNormal"><b><span style="color: #000;font-size: 10pt;">'+'명절<br>(설,추석)'+'</span></b></p></th></tr></thead>'
					    		+'<tbody><tr><td><b><p align="center" class="MsoNormal"><span>'+'2일전'+'</span></p></b></td>'
					    		+'<td><b><p align="center" class="MsoNormal"><span>'+'0%'+'</span></p></b></td>'
					    		+'<td><b><p align="center" class="MsoNormal"><span>'+'0%'+'</span></p></b></td>'
					    		+'<td><b><p align="center" class="MsoNormal"><span>'+'0%'+'</span></p></b></td></tr>'
					    		+'<tr><td><b><p align="center" class="MsoNormal"><span>'+'1일전 ~ 3시간 이전'+'</span></p></b></td>'
					    		+'<td><b><p align="center" class="MsoNormal"><span>'+'5%'+'</span></p></b></td>'
					    		+'<td><b><p align="center" class="MsoNormal"><span>'+'7.50%'+'</span</p></b></td>'
					    		+'<td><b><p align="center" class="MsoNormal"><span>'+'10%'+'</span></p></b></td></tr>'
					    		+'<tr class="type2"><td><b><p align="center" class="MsoNormal"><span>'+'3시간 미만 ~ 출발 전'+'</span></p></b></td>'
					    		+'<td><b><p align="center" class="MsoNormal"><span>'+'10%'+'</span></p></b></td>'
					    		+'<td><b><p align="center" class="MsoNormal"><span>'+'15%'+'</span></p></b></td>'
					    		+'<td><b><p align="center" class="MsoNormal"><span>'+'20%'+'</span></p></b></td></tr>'
					    		+'<tr><td><b><p align="center" class="MsoNormal"><span>'+'출발 후 ~ 도착예정시간 이전'+'</span></p></b></td>'
					    		+'<td><b><p align="center" class="MsoNormal"><span>25년: 50%<br>26년 : 60%<br>27년 : 70%</span></p></b></td>'
					    		+'<td><b><p align="center" class="MsoNormal"><span>'+'25년: 50%<br>26년 : 60%<br>27년 : 70%'+'</span></p></b></td>'
					    		+'<td><b><p align="center" class="MsoNormal"><span>'+'25년: 50%<br>26년 : 60%<br>27년 : 70%'+'</span></p></b></td></tr>'
					    		+'<tr><td><b><p align="center" class="MsoNormal"><span>'+'도착예정시간 초과'+'</span></p></b></td>'
					    		+'<td><b><p align="center" class="MsoNormal"><span>'+'100%'+'</span></p></b></td>'
					    		+'<td><b><p align="center" class="MsoNormal"><span>'+'100%'+'</span></p></b></td>'
					    		+'<td><b><p align="center" class="MsoNormal"><span>'+'100%'+'</span></p></b></td></tr></tbody></table>'
					    		+'<p style="font-size:14px;color:#000;margin-top:15px;">* 명절 취소수수료 기준은 설/추석 전전일, 전일, 당일 및 다음날에 적용합니다.</p>'
					    		+'<p style="font-size:14px;color:#000;">* 출발 이후부터 도착예정시간까지의 취소수수료 기준은 `25년 5월1일부터 `26년 4월30일까지는 50%, `26년 5월1일부터 `27년 4월30일까지는 60%, `27년 5월1일부터는 70%를 적용한다.</p>'
					    		+'<p style="font-size:14px;color:#000;">* 지정차 출발 당일에 승차권을 발행한 경우는 발행시점 기준 1시간 이내까지 취소수수료 미부과 (단, 지정차 출발 이후에는 승차권 발행시점과 상관없이 취소수수료 부과)</p>'
					    		+'</div><ul class="desc_list"><li>'+'취소수수료 산정은 날짜를 기준(시간 기준이 아님)으로 합니다.'+'</li>'
							    +'<li>'+'사용하지 않은 모든 승차권은 지정차 출발 후 도착 예정시간이 지나면 환불하실 수 없습니다.'+'</li>'
							    +'<li>'+'취소 수수료는 취소가 완료되는 시점을 기준으로 발행하니 유의하시기 바랍니다.'+'</li>'
					    		+'<li>'+'신용(체크)카드 환불은 카드사 정책에 따라 평일(은행영업일)기준 3~5일 소요될 수 있습니다.'+'</li></ul></div>';
				    }else{
				    	html +='<div class="mob_pad marT30"><h3 class="pop_h3 mob_h3">취소 안내</h3><p class="bul">마일리지(프리미엄) 예매 건은 <span class="accent2">취소 시 사용 마일리지 반환이 불가</span>하오니 유의하시기 바랍니다.</p></div>';
				    }
				    html +='<div class="btns col1"><button data-remodal-action="confirm" onclick="fnRecpCan();" class="btnL btn_orange">'+'예매취소'+'</button></div>';
				    html +='</div>';
				    html += '<button data-remodal-action="close" class="remodal-close"><span class="sr-only">'+'닫기'+'</span></button>';
				    html +='</form>';
				    // 왕복일 때
				    //
				    //
			    	$("#popTicketCancel").html(html);
				    $("#popTicketCancel").remodal().open();
	
			}
		    ,error:function(e) {
			alert("fnTckCanInfo ajax 오류");
		    }
		});
	}
};
*/
// 예매단위 취소
function fnRecpCan() {
	var mrsRecpCanFrm = $("form[name=recpCanFrm]").serialize(); 

// 변경된 폼 상태를 다시 serialize 해서 최신 값 가져오기
	var updatedFormData = $("form[name=recpCanOkFrm]").serialize();
	
	if(confirm("예매취소 하시겠습니까?") == true){
				$.ajax({
			  		type:"post"		
					,url:"/koBus/kobusResvCancel.ajax?ajaxType=cancel"
					,data:updatedFormData // input 값 세팅 
					,dataType:"json"
					,success:function(data){
						location.href ="/koBus/manageReservations.do";
					}
				    ,error:function(e) {
				    	alert("fnRecpCan ajax 오류");
				    }
				});
		} else {
			return false;
		}
		
		var cancDesc="";
		if(document.getElementById("brkpAmtCmm").value != null || document.getElementById("brkpAmtCmm").value != undefined) {
			cancDesc = "취소 수수료"+comma(document.getElementById("brkpAmtCmm").value)+"원이 차감됩니다. 예매취소 하시겠습니까?";
			
		}else{
			cancDesc = "별도의 취소수수료가 부과되지 않습니다. 예매취소 하시겠습니까?";
		}
		if(confirm(cancDesc) == true) {
			var prmmRtrp = false;
			if(document.mrsRecpCanFrm.prmmDcDvsCd.value == '4' && document.mrsRecpCanFrm.rtrpMrsYn.value == 'Y'){
				prmmRtrp = true;
			}
			
			$.ajax({
			  		type:"post"		
					,url:"/koBus/kobusResvCancel.ajax?ajax=true"
					,data:updatedFormData // input 값 세팅 
					,dataType:"json"
					,success:function(data){
						alert("fnRecpCan "+ data.MSG_DTL_CTT);
						if(data.tkn != null && data.tkn != ""){
			        		$("#token").val(data.token);
			        		$("#type").val("cancel");
			        		$("#transport").val("04");
			        		$("#code").val("02");		// 01:결제, 02:취소, 99: 오류
			        		$("#date").val($("#alcnDeprDt").val()+$("#alcnDeprTime").val());
			        		$("#from").val($("#deprnNm").val());
			        		$("#to").val($("#arvlNm").val());
			        		$("#sn").val();
			        		fnTckCanPc();
			        	}else{
			        		location.href ="/koBus/manageReservations.do";
			        	}							
					}
				    ,error:function(e) {	// 이곳의 ajax에서 에러가 나면 얼럿창으로 에러 메시지 출력
				    	alert("fnRecpCan ajax 오류");
				    }
				});
			if(document.mrsRecpCanFrm.pynDvsCd.value == '2' && !prmmRtrp ||
					$('#extrComp').val() == 'ARMY'){
				
			}else{
				$.ajax({
			  		type:"post"		
					,url:"/koBus/kobusResvCancel.ajax?ajax=true"
					,data:updatedFormData // input 값 세팅 
					,dataType:"json"
					,success:function(data){
						alert("fnRecpCan " + data.MSG_DTL_CTT);
						location.href ="/koBus/manageReservations.do";
					}
				    ,error:function(e) {
				    	alert("fnRecpCan ajax 오류");
				    }
				});
			}
		}else {
			return false;
		}

}
/*
// 승차권단위 취소
function fnTckCan() {
	
	var mrsTckCanFrm = $("form[name=mrsTckCanFrm]").serialize();
	if(document.getElementById("brkpAmtCmm").value != null || document.getElementById("brkpAmtCmm").value != undefined) {
		if(confirm("취소 수수료"+comma(document.getElementById("brkpAmtCmm").value)+"원이 차감됩니다. 예매취소 하시겠습니까?") == true) {
			$.ajax({
		  		type:"post"		
				,url:"/mrs/tckcan.ajax"
				,data:mrsTckCanFrm // input 값 세팅 
				,dataType:"json"
				,success:function(data){
					alert("fnTckCan" + data.MSG_DTL_CTT);
					if(data.tkn != null && data.tkn != ""){
		        		$("#token").val(data.token);
		        		$("#transport").val("04");
		        		$("#code").val("02");		// 01:결제, 02:취소, 99: 오류
		        		$("#date").val($("#alcnDeprDt").val()+$("#alcnDeprTime").val());
		        		$("#from").val($("#deprnNm").val());
		        		$("#to").val($("#arvlNm").val());
		        		$("#sn").val();
		        		fnTckCanPc();
		        	}else{
		        		location.href ="/mrs/mrscfm.do?vltlCnt=Y";
		        	}		
				}
			    ,error:function(e) {	// 이곳의 ajax에서 에러가 나면 얼럿창으로 에러 메시지 출력
			    	alert("fnTckCan ajax 오류");
			    }
			});
		} else {
			return false;
		} 
	} else {
		if(confirm("별도의 취소수수료가 부과되지 않습니다. 예매취소 하시겠습니까?") == true){
			$.ajax({
		  		type:"post"		
				,url:"/mrs/tckcan.ajax"
				,data:mrsTckCanFrm // input 값 세팅 
				,dataType:"json"
				,success:function(data){
					alert("fnTckCan " + data.MSG_DTL_CTT);
					if(data.tkn != null && data.tkn != ""){
		        		$("#token").val(data.token);
		        		$("#transport").val("04");
		        		$("#code").val("02");		// 01:결제, 02:취소, 99: 오류
		        		$("#date").val($("#alcnDeprDt").val()+$("#alcnDeprTime").val());
		        		$("#from").val($("#deprnNm").val());
		        		$("#to").val($("#arvlNm").val());
		        		$("#sn").val();
		        		fnTckCanPc();
		        	}else{
		        		location.href ="/mrs/mrscfm.do?vltlCnt=Y";
		        	}
				}
			    ,error:function(e) {	// 이곳의 ajax에서 에러가 나면 얼럿창으로 에러 메시지 출력
			    	alert("fnTckCan ajax 오류");
			    }
			});
		} else {
			return false;
		}
	}
}*/

function fnlogoutMain(){
	location.href = "/mbrs/lgn/logoutMain.do";
	
}

function fnmbrsMyInfo(){
	
	location.href = "/mbrs/mbrspage/myPageMain.do";
	
}

function fnmbrsJoin(){ // 회원가입 버튼 클릭
	location.href = "/mbrs/mbrsjoin/mbrsJoin.do";
}
function fnPayMentPT(){
	location.href = "/mbrs/trprinqr/pymPtInqr.do";
}

// 시간변경
function fnmrsChangeTime(idx) {
	//var satsNo = document.forms["mrsTmznlistFrm"+idx].elements['satsNo'].value;
	var satsNo = $("#mrsTmznlistFrm"+idx+" #satsNo").val()
	 
	if(satsNo.indexOf("W1") > -1 || satsNo.indexOf("W2") > -1){
		if(confirm("휠체어 예매 시간변경은 휠체어 예매 사이트에서 가능합니다.\n휠체어 예매 사이트로 이동 하시겠습니까?")){
			location.href ="/wchr/mrs/mrscfm.do";
		}else{
			return;
		}
	}else{
		$("form[name=mrsTmznlistFrm"+idx+"]").attr({"action" : "/koBus/modifyReservations.do", "method" : "post", "target" : "_self"}).submit(); // 시간변경.do
	}
}


$(document).ready(function() {
	$(document).on('keydown', '.remodal-close', function(e) {
		if (e.key === 'Tab' && !e.shiftKey) {
			e.preventDefault();

			$('.btn_orange').focus();
		}
	});
});
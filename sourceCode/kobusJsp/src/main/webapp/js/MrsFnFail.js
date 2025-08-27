	$(document).ready(function() {
		var estmAmt = $("#estmAmt").val();
		var dcAmt = $("#dcAmt").val();
		var tissuAmt = $("#tissuAmt").val();
		var acmtMlg = $("#acmtMlg").val();
		
		var tissuFnpymType = $("#tissuFnpymType").val();
		if(tissuFnpymType != "famt" && tissuFnpymType != "perd"){
			var commaEstmAmt = "";
			var commaDcAmt = "";
			var commaTissuAmt = "";
			var commaAcmtMlg = "";
			var pymUnt = "원";
			/*if(tissuFnpymType == "mileage"){
				pymUnt = "M";
			}*/
			if(Number(estmAmt) > 0){
				commaEstmAmt = comma(estmAmt)+pymUnt;
			}else{
				commaEstmAmt = "0"+pymUnt;
			}
			
			if(Number(dcAmt) > 0){
				commaDcAmt = "-"+comma(dcAmt)+pymUnt;
			}else{
				commaDcAmt = "0"+pymUnt;
			}
			
			if(Number(tissuAmt) > 0){
				commaTissuAmt = comma(tissuAmt);
			}else{
				commaTissuAmt = "0";
			}
			if(Number(acmtMlg) > 0){
				commaAcmtMlg = comma(acmtMlg)+"M";
			}else{
				commaAcmtMlg = "0M";
			}
			if($("#prmmDcDvsCd").val() != "0"){
				$("#estmAmtView").text(commaEstmAmt);
				$("#dcAmtView").text(commaDcAmt);
			}
			$("#tissuAmtView").text(commaTissuAmt);
			$("#tissuAmtUntView").text(pymUnt);
			$("#acmtMlgView").text(commaAcmtMlg);
		}
		
		if($("#mblUtlzPsbYn").val() != "Y"){
			$("#mrsInqrTissu").removeClass("col1");
			$("#mrsInqrTissu").addClass("col2");
		}else{
			$("#mrsInqrTissu").addClass("col1");
			$("#mrsInqrTissu").removeClass("col2");
		}
		$("#noticeMsgNm").html($("#tissuFnrtnMsgNm").val());
		$("#noticeDtlMsgNm").html($("#tissuFnrtnDtlMsgNm").val());
		if($("#deprCd").val() == "828" || $("#deprCd").val() == "605" ){
			$("#noticeDtlMsgNm").css("display","none");
		}
		
	});
	
	
	
	function fnHomeTickCfm(){
		if(confirm("발권수단을 홈티켓으로 변경하시겠습니까?")){
			$('[data-remodal-id=popTicket]').remodal().open();
			$("#mrsHtckPub").click(function(){
				if($("input:checkbox[id='agree1']").is(":checked") == false) {
					alert("이용약관에 동의하셔야 홈티켓 발행이 가능합니다.");
					return false;
				}
				
				if($("#recNcnt1").val() == "1"){
					$("#mrsMrnpNo").val($("#mrsMrnpNoOrg").val());
					$("#mrsMrnpSno").val("01");
				}else if($("#recNcnt1").val() == "2"){
					var mrsMrnpNo = $("#mrsMrnpNoOrg").val()+":"+$("#mrsMrnpNoOrg").val();
					var mrsMrnpSno = "01:02";
					$("#mrsMrnpNo").val(mrsMrnpNo);
					$("#mrsMrnpSno").val(mrsMrnpSno);
				}
				var mrsFnFailFrm = $("form[name=mrsFnFailFrm]").serialize();
				$.ajax({
			  		type:"post"		
					,url:"/mrs/mrshtckpub.ajax"
					,data:mrsFnFailFrm // input 값 세팅 
					,dataType:"json"
					,success:function(data){
						if(data.MSG_CD == "S0000"){
							alert("홈티켓 발권이 완료되었습니다. 예매 확인/취소/변경 메뉴에서 출력 가능합니다.");
							// 홈티켓 발행 후 버튼 hide
							$("#homeTickBtn").hide();
						}else{
							alert(data.MSG_DTL_CTT);
						}
						//location.href ="/mrs/mrscfm.do"
					}
				    ,error:function(e) {	// 이곳의 ajax에서 에러가 나면 얼럿창으로 에러 메시지 출력
				    	alert(e.responseText);
				    }
				});
			});
		}
	}
	
	
	
	function fnTrtrStep2(){
		$("#pathStep").val("2");
		var adtlCntAll = Number($("#selAdltCnt").val()) + Number($("#selAdltDcCnt").val());
		adtlCntAll = adtlCntAll > 0 ? adtlCntAll:0;
		var chldCntAll = Number($("#selChldCnt").val());
		chldCntAll = chldCntAll > 0 ? chldCntAll:0;
		var teenCntAll = Number($("#selTeenCnt").val());
		teenCntAll = teenCntAll > 0 ? teenCntAll:0;
		var uvsdCntAll = Number($("#selUvsdCnt").val());
		uvsdCntAll = uvsdCntAll > 0 ? uvsdCntAll:0;
		
		// 20201029 yahan
		var sncnCntAll = Number($("#selSncnCnt").val());
		sncnCntAll = sncnCntAll > 0 ? sncnCntAll:0;
		var dsprCntAll = Number($("#selDsprCnt").val());
		dsprCntAll = dsprCntAll > 0 ? dsprCntAll:0;
		
		// 20221026 환승에러처리
		var vtr3CntAll = Number($("#selVtr3Cnt").val());
		vtr3CntAll = vtr3CntAll > 0 ? vtr3CntAll:0;
		var vtr5CntAll = Number($("#selVtr5Cnt").val());
		vtr5CntAll = vtr5CntAll > 0 ? vtr5CntAll:0;
		var vtr7CntAll = Number($("#selVtr7Cnt").val());
		vtr7CntAll = vtr7CntAll > 0 ? vtr7CntAll:0;

		var dfptCntAll = Number($("#selDfptCnt").val());
		dfptCntAll = dfptCntAll > 0 ? dfptCntAll:0;
		
		
		var selSeatAllDt = adtlCntAll+":"+chldCntAll+":"+teenCntAll+":"+uvsdCntAll+":"+sncnCntAll+":"+dsprCntAll+
							":"+vtr3CntAll+":"+vtr5CntAll+":"+vtr7CntAll+":"+dfptCntAll;
		
		$("#rtrpDtl1").val(selSeatAllDt);
		$("#mrsFnFailFrm").attr("action","/mrs/alcnSrch.do");
		$("#mrsFnFailFrm").submit();
	}
	
	
	
	function fnRtrpMrs(){//오는편 예매
		var deprTmlNo = $("#deprCd").val();
		var deprTmlNm = $("#deprNm").val();
		var arvlTmlNo = $("#arvlCd").val();
		var arvlTmlNm = $("#arvlNm").val();
		$("#deprCd").val(arvlTmlNo);
		$("#deprNm").val(arvlTmlNm);
		$("#arvlCd").val(deprTmlNo);
		$("#arvlNm").val(deprTmlNm);
		
		//alert($("#deprCd").val()+" <> "+$("#deprNm").val());
		//alert($("#arvlCd").val()+" <> "+$("#arvlNm").val());
		
		$("#pathStep").val("1");
		$("#pathStepRtn").val("2");
		$("#mrsFnFailFrm").attr("action","/mrs/rotinf.do");
		$("#mrsFnFailFrm").submit();
	}
	
	
	
	function fnReturnRotInfo(){
		$("#mrsFnFailFrm").attr("action","/mrs/rotinf.do");
		$("#mrsFnFailFrm").submit();
	}	
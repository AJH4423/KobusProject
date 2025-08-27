/* 전역변수 : 모든 전역변수에 접두사로 all 사용
 * 최종확인변수 : 모든 변수에 접미사 cfm 사용 
 */

$(document).ready(function() {
	//alert($("#deprCd").val()+" <> "+$("#deprNm").val());
	//alert($("#arvlCd").val()+" <> "+$("#arvlNm").val());
	if($("#abnrData").val() == "abnr"){
		alert("조회되는 배차가 없습니다. 배차정보에 관한 상항은 출발지 터미널로 문의하시기 바랍니다.");
		return;
	}
	if($("#pathDvs").val() != "" && $("#pathDvs").val() != null){
		fnPathDvsChk($("#pathDvs").val());
	} else{
		fnPathDvsChk("sngl");
	}
	if($("#deprDtmAll").val() != "" && $("#deprDtmAll").val() != null){
		fnYyDtmStup(2,'text_date1',$("#deprDtmAll").val());
	}else{
		fnYyDtmStup(0,'text_date1','0');
	}
	if($("#arvlDtmAll").val() != "" && $("#arvlDtmAll").val() != null){
		fnYyDtmStup(2,'text_date2',$("#arvlDtmAll").val());
	}else{
		fnYyDtmStup(0,'text_date2','0');
	}
	if($("#deprCd").val() != "" && $("#deprCd").val() != null){
		$("#deprNmSpn").text($("#deprNm").val());
	} 
	if($("#arvlCd").val() != "" && $("#arvlCd").val() != null){
		$("#arvlNmSpn").text($("#arvlNm").val());
		fnEmptyCssStup();
		$("#alcnSrchBtn .btn_confirm").removeClass("ready");
	} 
	
	//$("#oGradeAll").attr("checked",true);//버스등급 설정
	$("input[name=busClsCdR]").change(function() {
		$("#busClsCd").val(this.value);
	});
	if($("#busClsCd").val() != "" && $("#busClsCd").val() != null){
		$("input[name=busClsCdR][value=" + $("#busClsCd").val() + "]").trigger("click");
	} else {
		$("input[name=busClsCdR][value=0]").trigger("click");
	}
	

});



function fnYyDtmStup(ddChk,txtFld,dtVal){
	var dt0 = new Date();
	var dt1 = new Date();
	dt1.setDate(dt1.getDate()+1);
	var dt = new Date();
	if(ddChk < 2){
		dt.setDate(dt.getDate()+ddChk);
	}
	var yyyy = dt.getFullYear();
	var mm   = dt.getMonth()+1;
	var week = new Array('일','월','화','수','목','금','토');
	var dd   = dt.getDate();
	var wkdy = week[dt.getDay()];
	var yyDtm = yyyy+". "+mm+". "+dd+". "+wkdy;
	var mm2Len = Number(mm) < 10 ? "0"+mm : mm;
	var dd2Len = Number(dd) < 10 ? "0"+dd : dd;
	var dd0    = Number(dt0.getDate()) < 10 ? "0"+dt0.getDate() : dt0.getDate();
	var dd1    = Number(dt.getDate()) < 10 ? "0"+(dt.getDate()) : (dt.getDate());
	
	var yymmdd = yyyy+""+mm2Len+""+dd2Len;
	var yymmddD0 = yyyy+""+mm2Len+""+dd0;
	if(ddChk == 2){//datepicker를 통해서 들어온 데이터인지 화면에서 자동설정된 데이터인지 구분
		var yyDtmDvs = dtVal.split(".");  //.substring(dtVal.length-3,dtVal.length);
		yyDtm = dtVal;
		mm2Len = (Number(yyDtmDvs[1].trim()) < 10?"0"+yyDtmDvs[1].trim():yyDtmDvs[1].trim());
		dd1 = (Number(yyDtmDvs[2].trim()) < 10 ? "0"+yyDtmDvs[2].trim():yyDtmDvs[2].trim());
		yymmdd = yyDtmDvs[0].trim()+""+mm2Len+""+dd1;
	}
	var yymmddD1 = yyyy+""+mm2Len+""+dd1;
	var bscYymmddD1 = dt1.getFullYear()+(Number(dt1.getMonth()+1) < 10 ? "0"+(dt1.getMonth()+1):(dt1.getMonth()+1))+(Number(dt1.getDate()) < 10 ? "0"+(dt1.getDate()) : (dt1.getDate()));
	
	if(txtFld == 'text_date1'){
		
		$('.'+txtFld).text(yyDtm);
		$("#deprDtm").val(yymmdd);
		$("#deprDtmAll").val(yyDtm);
		
		
		if(Number(yymmdd) > Number($("#arvlDtm").val())){
			fnYyDtmStup(ddChk,'text_date2',dtVal);
		}
		if(Number(yymmdd) <= Number(bscYymmddD1)){
			if(yymmdd == yymmddD0){
				$("#deprThddChc").addClass("active");
				$("#deprNxdChc").removeClass("active").removeAttr('title');
			}else if(yymmdd == yymmddD1){
				$("#deprThddChc").removeClass("active").removeAttr('title');
				$("#deprNxdChc").addClass("active");
			}else{
				$("#deprThddChc").removeClass("active").removeAttr('title');
				$("#deprNxdChc").removeClass("active").removeAttr('title');
			}
		}else{
			$("#deprThddChc").removeClass("active").removeAttr('title');
			$("#deprNxdChc").removeClass("active").removeAttr('title');
		}
		if(ddChk < 2){
			$("#datepicker1").datepicker().datepicker('setDate',dt);
		}
	}else if(txtFld == 'text_date2'){
		
		if(Number($("#deprDtm").val()) <= Number(yymmdd)){
			
			$('.'+txtFld).text(yyDtm);
			$("#arvlDtm").val(yymmdd);
			$("#arvlDtmAll").val(yyDtm);
		
			if(Number(yymmdd) <= Number(bscYymmddD1)){
				if(yymmdd == yymmddD0){
					$("#arvlThddChc").addClass("active");
					$("#arvlNxdChc").removeClass("active").removeAttr('title');
				}else if(yymmdd == yymmddD1){
					$("#arvlThddChc").removeClass("active").removeAttr('title');
					$("#arvlNxdChc").addClass("active");
				}else{
					$("#arvlThddChc").removeClass("active").removeAttr('title');
					$("#arvlNxdChc").removeClass("active").removeAttr('title');
				}
			}else{
				$("#arvlThddChc").removeClass("active").removeAttr('title');
				$("#arvlNxdChc").removeClass("active").removeAttr('title');
			}
			
			if(ddChk < 2){
				$("#datepicker2").datepicker().datepicker('setDate',dt);
			}else{
				var dpChk1 = $("#datepicker1").datepicker().datepicker('getDate');
				$("#datepicker2").datepicker().datepicker('setDate',dpChk1);
			}
		}else{
			
			if(Number($("#deprDtm").val()) > Number(yymmdd)){
				$(this).removeClass("active").removeAttr('title');
				var dpChk1 = $("#datepicker1").datepicker().datepicker('getDate');
				$("#datepicker2").datepicker().datepicker('setDate',dpChk1);
			}
		}
	}
}






function fnPathDvsChk(Dvs){ //메인화면에서 탭클릭시
	$("#pathDvs").val(Dvs);
	
	if( Dvs == "rtrp"){
		$("#rtrpYnAll").addClass("round");
		$("#snglRotAll").removeClass("active").removeAttr('title');
		$("#rtrpRotAll").addClass("active");
		if($("#deprNmSpn").text().length > 0 && $("#arvlNmSpn").text().length > 0){ // 기존 출도착지가 모두 선택되어 있을경우
			
			var arvlCd = $("#arvlCd").val();
			fnDerpListArvlYn(arvlCd); //변경된 출발지에 기존 도착지 정보가 있는지 확인값
		}
		$("#chgDeprArvl").css("display","block");
		$("#imptDepr").css("display","block");
	}else{
		$("#rtrpYnAll").removeClass("round");
		$("#snglRotAll").addClass("active");
		$("#rtrpRotAll").removeClass("active").removeAttr('title');
		if(Dvs == "sngl"){
			$("#r1").prop("checked",true);
			$("#r2").prop("checked",false);
			$("#chgDeprArvl").css("display","block");
			$("#imptDepr").css("display","block");
		}else if(Dvs == "trtr"){
			$("#r1").prop("checked",false);
			$("#r2").prop("checked",true);
			$("#chgDeprArvl").css("display","none");
			if($("#pathStepRtn").val() != "2"){
			fnDeprInfDlt();//출발지 초기화
	 		fnArvlInfDlt();//도착지 초기화
			}
	 		//$("#imptDepr").css("display","none");
		}else{
			$("#pathDvs").val("sngl");
			$("#r1").prop("checked",true);
			$("#r2").prop("checked",false);
			$("#chgDeprArvl").css("display","block");
			//$("#imptDepr").css("display","block");
		}
	}
}





function fnAlcnSrch(){ //배차목록 조회하기 최종확인변수:모든 변수에 접미사cfm 
	
	if(!$("#alcnSrchBtn .btn_confirm").hasClass("ready")){
		var crchDeprArvlYnCfm = $("#crchDeprArvlYn").val(); // 스왑버튼이 클릭이 된 경우가 있는지 확인
		var deprCdCfm =  $("#deprCd").val();
		var arvlCdCfm =  $("#arvlCd").val();
		var deprCdChcCfm = "N";
		
		if(crchDeprArvlYnCfm == "Y"){ // 스왑이 있었을 경우 출도착지 정보가 전체 출발지에 있는지 확인. 없으면 실패 리턴
			for(var inx = 0 ; inx < allDeprList.length ; inx++){ 
				if(deprCdCfm == allDeprList[inx][0]){
					deprCdChcCfm = "Y";
				}
			}
		}else{
			deprCdChcCfm = "Y";
		}
		
		if(deprCdChcCfm != "Y"){
			alert("해당 노선은 예매 불가한 노선입니다.");
			fnRotIntz();
			$("#alcnSrchBtn .btn_confirm").addClass("ready");
			
			fnEmptyCssStup();
			
		}else{
			fnRotVldChc();
		}
	}else{
//		alert("예매하실 노선을 선택하세요.");
//		$("#readDeprInfoList").focus();
//		return;

		deprCd   = $("#deprCd").val();
		if (deprCd == ""){
			alert("출발지를 선택해 주세요.");
			$('#readDeprInfoList').focus();
			return;
		}
		
		arvlCd   = $("#arvlCd").val();
		if (arvlCd == ""){
			alert("도착지를 선택해 주세요.");
			$('#readArvlInfoList').focus();
			return;
		}
		$("#rotInfFrm").submit();
	}
	
}



function fnBusClsCd(value){
		$("#busClsCd").val(value);
}



function fnRotVldChc(){
	$("#loading").show();
	var rotInfFrm = $("form[name=rotInfFrm]").serialize() + "&ajax=true&ajaxType=searchSch";
	
	alert(rotInfFrm);
	
	$.ajax({	
        url      : "/koBus/searchSchedule/readAlcnSrch.ajax",
        type     : "post",
        data : rotInfFrm,
        dataType : "json",
        success  : function(alcnListMap){
        	if(alcnListMap.rotVldChc == "N"){
        		alert("배차정보가 없습니다. \n조회조건을 다시 확인하여 주시기 바랍니다.");
        		$("#readAlcnInqr").hide();
        		return;
        	}else{
        		$("#readAlcnInqr").show();
        		var timeListChk ="";
        		var alcnList = "";
        		if(alcnListMap.alcnAllList != null){
        			for(var inx  = 0 ; inx <= alcnListMap.alcnAllList.length ; inx++){
        				timeListChk += "<li class='daytime'>"+"<a href='#none'>"+inx+"</a></li>";
        			}
        		}else{
        			timeListChk += "<li><a href='#none'>00</a></li>";
        		}
    			$("#timelistChk").html(timeListChk);
    			$('#timelistChk a[href="#none"]').on('click',function(event){
    				try {event.preventDefault();} catch (e) {};
    			});
        		
        		if(alcnListMap.alcnAllList != null){
					let takeDrtm = parseInt(alcnListMap.alcnCmnMap.takeDrtm/60)+"시간 "+(alcnListMap.alcnCmnMap.takeDrtm%60)+"분 소요";
        			$("#takeDrtm").text(takeDrtm);
        			for(var inx  = 0 ; inx < alcnListMap.alcnAllList.length ; inx++){
        				alcnList +="<p class='"+alcnListMap.alcnAllList[inx].BUS_CLS_CD_CSS+"' data-time='"+alcnListMap.alcnAllList[inx].TIME_CHC+"' role='row' tabindex='0'>";
        				alcnList +="<span class='start_time' role='cell' aria-labelledby='start_time_header'>"+alcnListMap.alcnAllList[inx].DEPR_TIME_DVS+"</span>";
        				alcnList +="<span class='bus_info' role='cell' aria-labelledby='bus_info_header'><span class='"+alcnListMap.alcnAllList[inx].CACM_CSS+"'>"+alcnListMap.alcnAllList[inx].CACM_MN+"</span><span class='grade_mo'>"+alcnListMap.alcnAllList[inx].BUS_CLS_NM+"</span></span>";
        				alcnList +="<span class='bus_com' role='cell' aria-labelledby='bus_com_header'><span class='"+alcnListMap.alcnAllList[inx].CACM_CSS+"'>"+alcnListMap.alcnAllList[inx].CACM_MN+"</span></span>";
        				alcnList +="<span class='grade' role='cell' aria-labelledby='grade_header'>"+alcnListMap.alcnAllList[inx].BUS_CLS_NM+"</span>";
        				alcnList +="<span class='adult' role='cell' aria-labelledby='adult_haeder'>"+comma(alcnListMap.alcnAllList[inx].ADLT_FEE)+"원</span>";
        				alcnList +="<span class='child' role='cell' aria-labelledby='child_header'>"+comma(alcnListMap.alcnAllList[inx].CHLD_FEE)+"원</span>";
        				if(alcnListMap.alcnAllList[inx].TEEN_FEE!=0){
        					alcnList +="<span class='youth' role='cell' aria-labelledby='youth_header'>"+comma(alcnListMap.alcnAllList[inx].TEEN_FEE)+"원</span>";
        				}else{
        					alcnList +="<span class='youth' role='cell' aria-labelledby='youth_header'></span>";
        				}
        				alcnList +="<span class='remain' role='cell' aria-labelledby='remain_header'>"+alcnListMap.alcnAllList[inx].RMN_SATS_NUM+" <span class='total_seat'>/ "+alcnListMap.alcnAllList[inx].TOT_SATS_NUM+"</span></span></p>";
        			}
        			$("#alcnList").html(alcnList);
        			//$(".time li a").unbind("click").bind("click", function(){
        			$("#timelistChk li a").unbind("click").bind("click", function(){
        				clickLeftTime(this);
        			});
        			$("#alcnList").scrollTop(0);
        		}
        		
        	}
//        	for (var i  = 0 ; i < alcnListMap.timeChcList.length ; i++) {
//        		<li ></li>
//        	}
//        	$(alcnListMap.timeChcList).each(function(index) {
//        		<li ></li> this.mdntChc
//        	});
    	},
    	error :function(){
    		alert("faile");
    	}
        
	});
}




function fnEmptyCssStup(){
	//empt css 추가
	if($("#readDeprInfoList").find('.val_txt').text() == ""){
		$("#readDeprInfoList").find('p').addClass('empty');
	}
	
	if($("#popDeprChc").find('.val_txt').text() == ""){
		$("#popDeprChc").find('p').addClass('empty');
	}
	
	if($("#readArvlInfoList").find('.val_txt').text() == ""){
		$("#readArvlInfoList").find('p').addClass('empty');
	}
	
	if($("#popArvlChc").find('.val_txt').text() == ""){
		$("#popArvlChc").find('p').addClass('empty');
	}
	
	//empt css 삭제
	if($("#readDeprInfoList").find('.val_txt').text() != ""){
		$("#readDeprInfoList").find('p').removeClass('empty');
	}
	
	if($("#popDeprChc").find('.val_txt').text() != ""){
		$("#popDeprChc").find('p').removeClass('empty');
	}
	
	if($("#readArvlInfoList").find('.val_txt').text() != ""){
		$("#readArvlInfoList").find('p').removeClass('empty');
	}
	
	if($("#popArvlChc").find('.val_txt').text() != ""){
		$("#popArvlChc").find('p').removeClass('empty');
	}
}
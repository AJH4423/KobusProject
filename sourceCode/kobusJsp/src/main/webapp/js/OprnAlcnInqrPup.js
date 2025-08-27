//일반배차
var allDeprList       = []; // 출발지 리스트
var allRotInfAllList  = []; // 노선 전체 리스트
var allRotInfrLen     = 0;  // 노선 전체 데이터 건수
//환승
var tfrAllDeprList   = []; //환승 출발지
var tfrAllRotInfList = []; //환승지 전체 노선
var tfrAllRotInfLen  = 0;  //환승지 전체 건수

var arvlList       = []; //도착지 공통 
var cmdType = ""; 		// 출,도착지 클릭 구분

$(document).ready(function() {
/*	
var agent = fnUserAgent();
	if(!($("#mainYn").val() == "Y" && agent == "mobile")){
		$("#loading").show();
		$.ajax({																//2. main 화면으로 이동하면 모든 노선 리스트업 하기위한 ajax
	        url      : "/oprninf/alcninqr/oprnAlcnInqr.ajax",
	        type     : "post",
	        dataType : "json",
	        async    : true,
	        success  : function(rotLinInfMap){									//7.리턴받은 값이 있을때 성공함수
	        	//alert("sel="+rotLinInfMap);
	        	//alert(rotLinInfMap.codeYn+"<>"+rotLinInfMap.len);
	         	allRotInfrLen = rotLinInfMap.len;
	         	tfrAllRotInfLen = rotLinInfMap.tfrLen;
	         	
	        	for(var inx = 0 ; inx < allRotInfrLen ; inx++){					//8.for문으로 return받은 map안의 list정보들을 빼와서 다시 이중배열에 넣기
	        		allRotInfAllList[inx] = new Array();								//8.1 javascript에선 이중배열을 쓸수 없기 때문에 list생성후 배열을 뒤에 붙여야한다.
	       			allRotInfAllList[inx][0] = rotLinInfMap.rotInfList[inx].deprCd;
	       			allRotInfAllList[inx][1] = rotLinInfMap.rotInfList[inx].deprNm;
	       			allRotInfAllList[inx][2] = rotLinInfMap.rotInfList[inx].deprArea;
	       			allRotInfAllList[inx][3] = rotLinInfMap.rotInfList[inx].arvlCd;
	       			allRotInfAllList[inx][4] = rotLinInfMap.rotInfList[inx].arvlNm;
	       			allRotInfAllList[inx][5] = rotLinInfMap.rotInfList[inx].arvlArea; 
	       			allRotInfAllList[inx][6] = rotLinInfMap.rotInfList[inx].prmmDcYn; //시외우등할인여부
	       			allRotInfAllList[inx][7] = rotLinInfMap.rotInfList[inx].takeTime; //소요시간
	        	}
	        	
	        	for(var jnx = 0 ; jnx < tfrAllRotInfLen ; jnx++){
	        		tfrAllRotInfList[jnx] = new Array();
	        		tfrAllRotInfList[jnx][0] = rotLinInfMap.tfrInfList[jnx].deprCd;
	        		tfrAllRotInfList[jnx][1] = rotLinInfMap.tfrInfList[jnx].deprNm;
	        		tfrAllRotInfList[jnx][2] = rotLinInfMap.tfrInfList[jnx].deprArea;
	        		tfrAllRotInfList[jnx][3] = rotLinInfMap.tfrInfList[jnx].tfrCd;
	        		tfrAllRotInfList[jnx][4] = rotLinInfMap.tfrInfList[jnx].tfrNm; 
	        		tfrAllRotInfList[jnx][5] = rotLinInfMap.tfrInfList[jnx].tfrArea;
	        		tfrAllRotInfList[jnx][6] = rotLinInfMap.tfrInfList[jnx].arvlCd; 
	        		tfrAllRotInfList[jnx][7] = rotLinInfMap.tfrInfList[jnx].arvlNm;
	        		tfrAllRotInfList[jnx][8] = rotLinInfMap.tfrInfList[jnx].arvlArea; 
	        		tfrAllRotInfList[jnx][9] = rotLinInfMap.tfrInfList[jnx].arvlNmAll;
	        	}
	        	allRotInfAllList.sort(function (a,b){								//9.출발지코드를 기준으로 sort해준다
	        		var keyA = a[0].toString().toLowerCase();
	        		var keyB = b[0].toString().toLowerCase();
	        		return (keyA<keyB)?-1:((keyA>keyB)?1:0);
	        	});
	        	tfrAllRotInfList.sort(function (a,b){								//9.출발지코드를 기준으로 sort해준다
	        		var keyA = a[0].toString().toLowerCase();
	        		var keyB = b[0].toString().toLowerCase();
	        		return (keyA<keyB)?-1:((keyA>keyB)?1:0);
	        	});
					$("#loading").hide();
	        },
	        error:function (e){
	            alert("connection error");
					$("#loading").hide();
	        }
	    });
	}
	
	/*$("#popDeprChc").on("click",(function() {							// popup 화면에서 출발지 클릭시
		fnDeprArvlChg(); // 출발지나 도착지 선택시 시작은 지역별 전체가 포커싱
		fnDerpList("Y","all");
	}));
	
	*/
	

	/*
	$("#popArvlChc").on("click",(function() {
		fnDeprArvlChg(); // 출발지나 도착지 선택시 시작은 지역별 전체가 포커싱
		var deprCd = $("#deprCd").val(); 
		if(deprCd.length > 0){
			fnArvlList(deprCd,"all");
		}else{
			$("#popDeprChc").addClass('focuson');    // 출발지 항목 포커스
			$("#popArvlChc").removeClass('focuson'); // 도착지 항목 포커스 삭제
		}
	}));
	
	
	// 닫기버튼 클릭시 초기화
	$(".pop_place .remodal-close").on("click",(function() {
		fnRotIntz('N');
	}));
	*/
});



function fnReadDeprInfoList(e){	//10.출발지목록보기를 jsp에서 클릭했을시
	cmdType = "depr";
	$('#popTitle').text('출발지 선택');
	try{e.preventDefault();}catch(e){}

	fnDerpList("N","all");
}



function fnReadArvlInfoList(e){
	deprCd   = $("#deprCd").val();
	if (deprCd == ""){
		alert("출발지를 먼저 선택해 주세요.");
		$('#readDeprInfoList').focus();
		return;
	}

	cmdType = "arvl";
	$('#popTitle').text('도착지 선택');
	try{e.preventDefault();}catch(e){}
//	fnDerpList("N","all"); // 출.도착지 클릭시 항상 출도착지에 대한 모든 데이터 초기화 후 호출
	
	arvlList = [];
	fnArvlList(deprCd,"all", "N"); //도착지 목록으로 변경처리

}


function fnDerpList(popYn,areaCd){ //출발지 리스트
	$("#alcnSrchBtn .btn_confirm").addClass("ready");
	fnDeprArvlChg(); // 출발지나 도착지 선택시 시작은 지역별 전체가 포커싱
	
	if(popYn == "N"){ //본화면에서 pop호출시

		if (fnRotIntz('Y') == true){ //출도착 팝업 호출시 기존 선택했던 데이터 초기화
			var popPlace = $('[data-remodal-id=popPlace]').remodal();
			popPlace.open();
		}
	}
	
	$(".start_wrap").find('span').removeClass("active"); //주요출발지 class 삭제
	
	
	var deprCd ;
	var deprSrchList   = []; // 검색 자동완성을 위한 리스트
	var pathDvsCd = $("#pathDvs").val();  // sngl:편도, trtr:환승, rtrp:왕복
	
	if(pathDvsCd == "trtr"){ //환승시
		var knx = 0;
		for(var inx = 0 ; inx < tfrAllRotInfLen ; inx++){						//11.출발지목록만을 보기위해선 전체노선정보에서 중복되는 라인과 중복되는 출발지를 나눠줘야하기때문에 다시 list+배열 에 담는다
	
			if(deprCd != tfrAllRotInfList[inx][0]){							//11.1 출발지코드기준으로 중복제거해주는부분
				tfrAllDeprList[knx] = new Array();
				tfrAllDeprList[knx][0] = tfrAllRotInfList[inx][0];
				tfrAllDeprList[knx][1] = tfrAllRotInfList[inx][1];
				tfrAllDeprList[knx][2] = tfrAllRotInfList[inx][2];
				deprCd = tfrAllRotInfList[inx][0];
				
				var deprInfo = new Object();
				deprInfo.code = tfrAllRotInfList[inx][0];
				deprInfo.name = tfrAllRotInfList[inx][1];
				deprSrchList.push(deprInfo);
				knx++;

			}
		}
		tfrAllDeprList.sort(function (a,b){										//12. 중복제거된 출발지목록에서 출발지코드는 다르지만 출발지명이 같은 곳들을 출발지명으로 재배열
			var nameA = a[1].toString().toLowerCase();
			var nameB = b[1].toString().toLowerCase();
			return (nameA<nameB)?-1:((nameA>nameB)?1:0);					//13. 출발지코드는 다르지만 출발지명이 다른건 asis에서 jsp페이지에서 직접 하드코딩으로 명칭들을 바꿔서기입해줬지만 앞으로 받아올껀 구분되어오는지 안되어오는지 아직미정
		});
		
		// 출발지가 없을 경우 주요출발지에서 보여주지 않도록 하기
		$("#imptDepr").hide();
		$("span[name='imptDeprNm']").hide();
		$("span[name='imptDeprNm']").each(function(index) {
		    var $objThis = $(this);
		    var imptDeprVal = $objThis.attr("value");
		    $(tfrAllDeprList).each(function(index) {
		        if (imptDeprVal == this[0]) {
		            $("#imptDepr").show();
		            $objThis.show();
		            return false;
		        }
		    });
		});
	}else{ //편도, 왕복시
		var jnx = 0;
	for(var inx = 0 ; inx < allRotInfrLen ; inx++){						//11.출발지목록만을 보기위해선 전체노선정보에서 중복되는 라인과 중복되는 출발지를 나눠줘야하기때문에 다시 list+배열 에 담는다

		if(deprCd != allRotInfAllList[inx][0]){							//11.1 출발지코드기준으로 중복제거해주는부분
			allDeprList[jnx] = new Array();
			allDeprList[jnx][0] = allRotInfAllList[inx][0];
			allDeprList[jnx][1] = allRotInfAllList[inx][1];
			allDeprList[jnx][2] = allRotInfAllList[inx][2];
			deprCd = allRotInfAllList[inx][0];
			
			var deprInfo = new Object();
			deprInfo.code = allRotInfAllList[inx][0];
			deprInfo.name = allRotInfAllList[inx][1];
			deprSrchList.push(deprInfo);
			
			jnx++;
		}
	}
	allDeprList.sort(function (a,b){										//12. 중복제거된 출발지목록에서 출발지코드는 다르지만 출발지명이 같은 곳들을 출발지명으로 재배열
		var nameA = a[1].toString().toLowerCase();
		var nameB = b[1].toString().toLowerCase();
		return (nameA<nameB)?-1:((nameA>nameB)?1:0);					//13. 출발지코드는 다르지만 출발지명이 다른건 asis에서 jsp페이지에서 직접 하드코딩으로 명칭들을 바꿔서기입해줬지만 앞으로 받아올껀 구분되어오는지 안되어오는지 아직미정
	});
	
	// 출발지가 없을 경우 주요출발지에서 보여주지 않도록 하기
	$("#imptDepr").hide();
	$("span[name='imptDeprNm']").hide();
	$("span[name='imptDeprNm']").each(function(index) {
	    var $objThis = $(this);
	    var imptDeprVal = $objThis.attr("value");
	    $(allDeprList).each(function(index) {
	        if (imptDeprVal == this[0]) {
	            $("#imptDepr").show();
	            $objThis.show();
	            return false;
	        }
	    });
	});
	}
	//자동완성	
	fnListAutoSrch(deprSrchList,"popDeprNmSpn","terminalSearch",fnDeprChc,"dep"); //( 조회데이터,선택된 이름 리턴할 필드, 선택된 코드값 리턴할 필드, 검색어 입력할 필드)

	fnDeprViewList("all"); //출발지 리스트 화면상 출력
	
	$("#popDeprChc").addClass('focuson');    // 출발지 항목 포커스
	$("#popArvlChc").removeClass('focuson'); // 도착지 항목 포커스 삭제
	
}



function fnRotIntz(ask){ //출도착 팝업 호출시 기존 선택했던 데이터 초기화
/*	
	$("#deprNmSpn").text("").trigger("change");
	$("#popDeprNmSpn").text("").trigger("change");
	$("#deprCd").val("");
	$("#arvlNmSpn").text("").trigger("change");
	$("#popArvlNmSpn").text("").trigger("change");
	$("#arvlCd").val("");
*/

	if (cmdType == "depr"){ // 출발지클릭

		if (ask == 'Y'){
			if ($("#deprCd").val() != "" && $("#arvlCd").val() != ""){
				if (confirm("출발지와 도착지가 초기화 됩니다.\n터미널을 변경 하시겠습니까?") == false){
					return false;
				}
			}
			else{
				if ($("#deprCd").val() != ""){
					if (confirm("출발지가 초기화 됩니다.\n터미널을 변경 하시겠습니까?") == false){
						return false;
					}
				}
			}
		}
		
		fnDeprInfDlt();//출발지 초기화
		fnArvlInfDlt();//도착지 초기화
	}
	
	if (cmdType == "arvl"){ // 도착지클릭

		if (ask == 'Y'){
			if ($("#arvlCd").val() != ""){
				if (confirm("도착지가 초기화 됩니다.\n터미널을 변경 하시겠습니까?") == false){
					return false;
				}
			}
		}
		
		fnArvlInfDlt();//도착지 초기화
	}
	
	
	$(".tags").find('button').removeClass('active');
	$(".tags").find('button').removeAttr("title");
	
	return true;
}


function fnDeprArvlViewList(areaCd){
	if($("#popDeprChc").hasClass('focuson')){
		fnDeprViewList(areaCd);
	}else if($("#popArvlChc").hasClass('focuson')){
		fnArvlViewList(areaCd);
	}
}



function fnDeprViewList(areaCd){ //출발지 도착코드별 설정
	var pathDvs = $("#pathDvs").val();
	if(pathDvs == "trtr"){
		$("#imptDepr").css("display","none");//주요터미널 항목 보여짐
	}else{
	$("#imptDepr").css("display","block");//주요터미널 항목 보여짐
	}
	
	//fnCfmBtnActv(); // 선택완료버튼 활성화
	fnEmptyCssStup();
	
	$("#terminalList").removeClass("type2");
	
	var deprListLen = 0;
	var deprTblList = "st";
	var pathDvsCd = $("#pathDvs").val();  // sngl:편도, trtr:환승, rtrp:왕복
	if(pathDvsCd =="trtr"){
		deprListLen = tfrAllDeprList.length;
		for(var jnx = 0 ; jnx < deprListLen ; jnx++){
			if(areaCd == "all"){
				deprTblList = fnDeprTblListSet(deprTblList,jnx,pathDvsCd);
			}else if(areaCd == "11" && tfrAllDeprList[jnx][2] == "11"){
				deprTblList = fnDeprTblListSet(deprTblList,jnx,pathDvsCd);
			}else if(areaCd == "28" && (tfrAllDeprList[jnx][2] == "28" || tfrAllDeprList[jnx][2] == "41")){
				deprTblList = fnDeprTblListSet(deprTblList,jnx,pathDvsCd);
			}else if(areaCd == "42" && tfrAllDeprList[jnx][2] == "42"){
				deprTblList = fnDeprTblListSet(deprTblList,jnx,pathDvsCd);
			}else if(areaCd == "30" && (tfrAllDeprList[jnx][2] == "30" || tfrAllDeprList[jnx][2] == "44" || tfrAllDeprList[jnx][2] == "36")){
				deprTblList = fnDeprTblListSet(deprTblList,jnx,pathDvsCd);
			}else if(areaCd == "43" && tfrAllDeprList[jnx][2] == "43"){
				deprTblList = fnDeprTblListSet(deprTblList,jnx,pathDvsCd);
			}else if(areaCd == "29" && (tfrAllDeprList[jnx][2] == "29" || tfrAllDeprList[jnx][2] == "46")){
				deprTblList = fnDeprTblListSet(deprTblList,jnx,pathDvsCd);
			}else if(areaCd == "45" && tfrAllDeprList[jnx][2] == "45"){
				deprTblList = fnDeprTblListSet(deprTblList,jnx,pathDvsCd);
			}else if(areaCd == "26" && (tfrAllDeprList[jnx][2] == "26" || tfrAllDeprList[jnx][2] == "48" || tfrAllDeprList[jnx][2] == "31")){
				deprTblList = fnDeprTblListSet(deprTblList,jnx,pathDvsCd);
			}else if(areaCd == "27" && (tfrAllDeprList[jnx][2] == "27" || tfrAllDeprList[jnx][2] == "47")){
				deprTblList = fnDeprTblListSet(deprTblList,jnx,pathDvsCd);
			}
		}
	}else{
		deprListLen = allDeprList.length;
	for(var inx = 0 ; inx < deprListLen ; inx++){
		if(areaCd == "all"){
				deprTblList = fnDeprTblListSet(deprTblList,inx,pathDvsCd);
		}else if(areaCd == "11" && allDeprList[inx][2] == "11"){
				deprTblList = fnDeprTblListSet(deprTblList,inx,pathDvsCd);
		}else if(areaCd == "28" && (allDeprList[inx][2] == "28" || allDeprList[inx][2] == "41")){
				deprTblList = fnDeprTblListSet(deprTblList,inx,pathDvsCd);
		}else if(areaCd == "42" && allDeprList[inx][2] == "42"){
				deprTblList = fnDeprTblListSet(deprTblList,inx,pathDvsCd);
		}else if(areaCd == "30" && (allDeprList[inx][2] == "30" || allDeprList[inx][2] == "44" || allDeprList[inx][2] == "36")){
				deprTblList = fnDeprTblListSet(deprTblList,inx,pathDvsCd);
		}else if(areaCd == "43" && allDeprList[inx][2] == "43"){
				deprTblList = fnDeprTblListSet(deprTblList,inx,pathDvsCd);
		}else if(areaCd == "29" && (allDeprList[inx][2] == "29" || allDeprList[inx][2] == "46")){
				deprTblList = fnDeprTblListSet(deprTblList,inx,pathDvsCd);
		}else if(areaCd == "45" && allDeprList[inx][2] == "45"){
				deprTblList = fnDeprTblListSet(deprTblList,inx,pathDvsCd);
		}else if(areaCd == "26" && (allDeprList[inx][2] == "26" || allDeprList[inx][2] == "48" || allDeprList[inx][2] == "31")){
				deprTblList = fnDeprTblListSet(deprTblList,inx,pathDvsCd);
		}else if(areaCd == "27" && (allDeprList[inx][2] == "27" || allDeprList[inx][2] == "47")){
				deprTblList = fnDeprTblListSet(deprTblList,inx,pathDvsCd);
			}
		}
	}
	if(deprTblList == "st"){
		deprTblList = "";
	}
	$("#tableTrmList").html(deprTblList);
}



function fnDeprTblListSet(deprTblList,num,pathDvsCd){
	if(pathDvsCd == "trtr"){
		if(deprTblList == "st"){
			//deprTblList = "<li class=\"over\"><span onclick=\"fnDeprChc(\'"+tfrAllDeprList[num][0]+"\',\'"+tfrAllDeprList[num][1]+"\');\">"+tfrAllDeprList[num][1]+"</span></li>";
			deprTblList = "<li class=\"over\"><button type='button' onclick=\"fnDeprChc(\'"+tfrAllDeprList[num][0]+"\',\'"+tfrAllDeprList[num][1]+"\');\">"+tfrAllDeprList[num][1]+"</button></li>";
		}else{
			//deprTblList += "<li><span onclick=\"fnDeprChc(\'"+tfrAllDeprList[num][0]+"\',\'"+tfrAllDeprList[num][1]+"\');\">"+tfrAllDeprList[num][1]+"</span></li>";
			deprTblList += "<li><button type='button' onclick=\"fnDeprChc(\'"+tfrAllDeprList[num][0]+"\',\'"+tfrAllDeprList[num][1]+"\');\">"+tfrAllDeprList[num][1]+"</button></li>";
		}
	}else{
		if(deprTblList == "st"){
			//deprTblList = "<li class=\"over\"><span onclick=\"fnDeprChc(\'"+allDeprList[num][0]+"\',\'"+allDeprList[num][1]+"\');\">"+allDeprList[num][1]+"</span></li>";
			deprTblList = "<li class=\"over\"><button type='button' onclick=\"fnDeprChc(\'"+allDeprList[num][0]+"\',\'"+allDeprList[num][1]+"\');\">"+allDeprList[num][1]+"</button></li>";
			
		}else{
			//deprTblList += "<li><span onclick=\"fnDeprChc(\'"+allDeprList[num][0]+"\',\'"+allDeprList[num][1]+"\');\">"+allDeprList[num][1]+"</span></li>";
			deprTblList += "<li><button type='button' onclick=\"fnDeprChc(\'"+allDeprList[num][0]+"\',\'"+allDeprList[num][1]+"\');\">"+allDeprList[num][1]+"</button></li>";
		}
	}
	
	return deprTblList; 
}



function fnDeprChc(deprCd,deprNm){ //출발지 선택시 동작
	//$("#deprNmSpn").text(deprNm).trigger("change");
	$("#popDeprNmSpn").text(deprNm).trigger("change");
	$("#deprCd").val(deprCd);
	$("#deprNm").val(deprNm);
	
	$("#terminalSearch").val(deprNm);
	
	//empt css 삭제
	fnEmptyCssStup();

	$("#cfmBtn").removeClass('ready');

/*
	arvlList       = [];
	//alert($("#deprCd").val()+"<>"+$("#terminalSearch").val());
	fnArvlList(deprCd,"all"); //도착지 목록으로 변경처리
*/	
}



function fnArvlList(deprCd,areaCd, popYn="Y"){ //도착지 리스트 만들기
	fnDeprArvlChg(); // 출발지나 도착지 선택시 시작은 지역별 전체가 포커싱
	$("#imptDepr").css("display","none"); //주요터미널 항목 숨기기
	$("#popDeprChc").removeClass('focuson'); //출발지 포커스 삭제
	$("#popArvlChc").addClass('focuson'); // 도착지 항목 포커스
	
	
	if(popYn == "N"){ //본화면에서 pop호출시
	
		if (fnRotIntz('Y') == true){ //출도착 팝업 호출시 기존 선택했던 데이터 초기화
			var popPlace = $('[data-remodal-id=popPlace]').remodal();
			popPlace.open();
		}
	}

	//var arvlList       = []; // 도착지 리스트, 출발지가 변경이 될때마다 도착지가 바뀌어야 해서 전역변수로 사용하지 않음.
	var pathDvs = $("#pathDvs").val(); //왕복 선택시 도착지정보가 출발지에도 있어야 함. rtrp
	var jnx = 0;
	var arvlSrchList   = []; // 검색 자동완성을 위한 리스트
	var arvlPcpyCd = $("#arvlCd").val(); //기존 선택된 도착지 코드값
	var arvlCdExsnYn = "N"; //변경된 출발지에 기존 도착지 정보가 있는지 확인값
	
	if(pathDvs == "trtr"){//환승
		
 		for(var inx = 0 ; inx < tfrAllRotInfLen ; inx++){
 			
			if(deprCd == tfrAllRotInfList[inx][0]){

				arvlList[jnx] = new Array();
				arvlList[jnx][0] = tfrAllRotInfList[inx][6]; //도착지코드
				arvlList[jnx][1] = tfrAllRotInfList[inx][9]; //도착지명(환승지포함)
				arvlList[jnx][2] = tfrAllRotInfList[inx][8]; //도착지 지역코드
				arvlList[jnx][3] = 'N'; //시외우등할인여부 환승에서는 받지않음.
				arvlList[jnx][4] = tfrAllRotInfList[inx][7]; //도착지명(환승지미포함)
				arvlList[jnx][5] = tfrAllRotInfList[inx][3]; //환승지 코드
				arvlList[jnx][6] = tfrAllRotInfList[inx][4]; //환승지 명
				
				var arvlInfo = new Object();
				arvlInfo.code = tfrAllRotInfList[inx][6];
				arvlInfo.name = tfrAllRotInfList[inx][9];
				arvlInfo.prmmClsYn = 'N';
				arvlInfo.tfrCd = tfrAllRotInfList[inx][3];
				arvlInfo.tfrNm = tfrAllRotInfList[inx][4];
				arvlInfo.takeTime = '0';
				arvlSrchList.push(arvlInfo);
				
				if(arvlPcpyCd == tfrAllRotInfList[inx][6]){
					arvlCdExsnYn="Y";
				}
				
				jnx++;
			}
 		}
	}else if(pathDvs == "rtrp"){ //왕복선택시
		
		for(var inx = 0 ; inx < allRotInfrLen ; inx++){
			
			if(deprCd == allRotInfAllList[inx][0]){
				var chkYn = "N";
				
/*				for(var knx = 0 ; knx < allDeprList.length ; knx++){ //왕복이기 때문에 도착지가 출발지에도 있는지 확인
					if(allRotInfAllList[inx][3] == allDeprList[knx][0]){
						chkYn="Y";
					}
				}*/
				for(var knx = 0 ; knx < allRotInfrLen ; knx++){ //왕복이기 때문에 도착지가 출발지에도 있는지 확인
					if(allRotInfAllList[inx][3] == allRotInfAllList[knx][0] && allRotInfAllList[knx][3] == deprCd){
						chkYn="Y";
					}
				}
				
				if(chkYn == "Y"){
					arvlList[jnx] = new Array();
					arvlList[jnx][0] = allRotInfAllList[inx][3];
					arvlList[jnx][1] = allRotInfAllList[inx][4];
					arvlList[jnx][2] = allRotInfAllList[inx][5];
					arvlList[jnx][3] = allRotInfAllList[inx][6];
					arvlList[jnx][4] = allRotInfAllList[inx][7];
					
					var arvlInfo = new Object();
					arvlInfo.code = allRotInfAllList[inx][3];
					arvlInfo.name = allRotInfAllList[inx][4];
					arvlInfo.prmmClsYn = allRotInfAllList[inx][6];
					arvlInfo.tfrCd = "";
					arvlInfo.tfrNm = "";
					arvlInfo.takeTime = allRotInfAllList[inx][7];
					arvlSrchList.push(arvlInfo);
					
					if(arvlPcpyCd == allRotInfAllList[inx][3]){
						arvlCdExsnYn="Y";
					}
					
					jnx++;
				}
			}
		}
	}else{ //편도
		for(var inx = 0 ; inx < allRotInfrLen ; inx++){
 			
			if(deprCd == allRotInfAllList[inx][0]){

				arvlList[jnx] = new Array();
				arvlList[jnx][0] = allRotInfAllList[inx][3];
				arvlList[jnx][1] = allRotInfAllList[inx][4];
				arvlList[jnx][2] = allRotInfAllList[inx][5];
				arvlList[jnx][3] = allRotInfAllList[inx][6];
				arvlList[jnx][4] = allRotInfAllList[inx][7];
				
				var arvlInfo = new Object();
				arvlInfo.code = allRotInfAllList[inx][3];
				arvlInfo.name = allRotInfAllList[inx][4];
				arvlInfo.prmmClsYn = allRotInfAllList[inx][6];
				arvlInfo.tfrCd = "";
				arvlInfo.tfrNm = "";
				arvlInfo.takeTime = allRotInfAllList[inx][7];
				arvlSrchList.push(arvlInfo);
				
				if(arvlPcpyCd == allRotInfAllList[inx][3]){
					arvlCdExsnYn="Y";
				}
				
				jnx++;
			}
 		}
	}
 	arvlList.sort(function (a,b){										
		var nameA = a[1].toString().toLowerCase();
		var nameB = b[1].toString().toLowerCase();
		return (nameA<nameB)?-1:((nameA>nameB)?1:0);					
	});
	
 	if(arvlCdExsnYn == "N"){//변경된 출발지에 기존도착지가 없으면 도착지 초기화
 		fnArvlInfDlt();
 	}
	fnListAutoSrch(arvlSrchList,"popArvlNmSpn","terminalSearch",fnArvlChc,"arv");
	
 	fnArvlViewList(areaCd);	
}
	
	
	
function fnArvlViewList(areaCd){ //도착지 지역코드별 설정

	//fnCfmBtnActv(); // 선택완료버튼 활성화
	fnEmptyCssStup();
	//alert($("#pathDvs").val());
	if($("#pathDvs").val() == "trtr"){
		$("#terminalList").addClass("type2");
	}else{
		$("#terminalList").removeClass("type2");
	}
	var arvlListLen = arvlList.length;
	var arvlTblList = "st";
	for(var inx = 0 ; inx < arvlListLen ; inx++){
		if(areaCd == "all"){
			arvlTblList = fnArvlTblListSet(arvlTblList,inx);
		}else if(areaCd == "11" && arvlList[inx][2] == "11"){
			arvlTblList = fnArvlTblListSet(arvlTblList,inx);
		}else if(areaCd == "28" && (arvlList[inx][2] == "28" || arvlList[inx][2] == "41")){
			arvlTblList = fnArvlTblListSet(arvlTblList,inx);
		}else if(areaCd == "42" && arvlList[inx][2] == "42"){
			arvlTblList = fnArvlTblListSet(arvlTblList,inx);
		}else if(areaCd == "30" && (arvlList[inx][2] == "30" || arvlList[inx][2] == "44" || arvlList[inx][2] == "36")){
			arvlTblList = fnArvlTblListSet(arvlTblList,inx);
		}else if(areaCd == "43" && arvlList[inx][2] == "43"){
			arvlTblList = fnArvlTblListSet(arvlTblList,inx);
		}else if(areaCd == "29" && (arvlList[inx][2] == "29" || arvlList[inx][2] == "46")){
			arvlTblList = fnArvlTblListSet(arvlTblList,inx);
		}else if(areaCd == "45" && arvlList[inx][2] == "45"){
			arvlTblList = fnArvlTblListSet(arvlTblList,inx);
		}else if(areaCd == "26" && (arvlList[inx][2] == "26" || arvlList[inx][2] == "48" || arvlList[inx][2] == "31")){
			arvlTblList = fnArvlTblListSet(arvlTblList,inx);
		}else if(areaCd == "27" && (arvlList[inx][2] == "27" || arvlList[inx][2] == "47")){
			arvlTblList =fnArvlTblListSet(arvlTblList,inx);
		}
	}
	if(arvlTblList == "st"){
		arvlTblList = "";
	}
	$("#tableTrmList").html(arvlTblList);
}



function fnArvlTblListSet(arvlTblList,inx){
	if($("#pathDvs").val() == "trtr"){
		if(arvlTblList == "st"){
			//arvlTblList = "<li class=\"over\"><span onclick=\"fnArvlChc(\'"+arvlList[inx][0]+"\',\'"+arvlList[inx][1]+"\','N',\'"+arvlList[inx][5]+"\',\'"+arvlList[inx][6]+"\','0');\">"+arvlList[inx][1]+"</span></li>";
			arvlTblList = "<li class=\"over\"><button type='button' onclick=\"fnArvlChc(\'"+arvlList[inx][0]+"\',\'"+arvlList[inx][1]+"\','N',\'"+arvlList[inx][5]+"\',\'"+arvlList[inx][6]+"\','0');\">"+arvlList[inx][1]+"</button></li>";
		}else{
			//arvlTblList += "<li><span onclick=\"fnArvlChc(\'"+arvlList[inx][0]+"\',\'"+arvlList[inx][1]+"\','N',\'"+arvlList[inx][5]+"\',\'"+arvlList[inx][6]+"\','0');\">"+arvlList[inx][1]+"</span></li>";
			arvlTblList += "<li><button type='button' onclick=\"fnArvlChc(\'"+arvlList[inx][0]+"\',\'"+arvlList[inx][1]+"\','N',\'"+arvlList[inx][5]+"\',\'"+arvlList[inx][6]+"\','0');\">"+arvlList[inx][1]+"</button></li>";
		}
	}else{
		if(arvlTblList == "st"){
			//arvlTblList = "<li class=\"over\"><span onclick=\"fnArvlChc(\'"+arvlList[inx][0]+"\',\'"+arvlList[inx][1]+"\',\'"+arvlList[inx][3]+"\','','',\'"+arvlList[inx][4]+"\');\">"+arvlList[inx][1]+"</span></li>";
			arvlTblList = "<li class=\"over\"><button type='button' onclick=\"fnArvlChc(\'"+arvlList[inx][0]+"\',\'"+arvlList[inx][1]+"\',\'"+arvlList[inx][3]+"\','','',\'"+arvlList[inx][4]+"\');\">"+arvlList[inx][1]+"</button></li>";
		}else{
			//arvlTblList += "<li><span onclick=\"fnArvlChc(\'"+arvlList[inx][0]+"\',\'"+arvlList[inx][1]+"\',\'"+arvlList[inx][3]+"\','','',\'"+arvlList[inx][4]+"\');\">"+arvlList[inx][1]+"</span></li>";
			arvlTblList += "<li><button type='button' onclick=\"fnArvlChc(\'"+arvlList[inx][0]+"\',\'"+arvlList[inx][1]+"\',\'"+arvlList[inx][3]+"\','','',\'"+arvlList[inx][4]+"\');\">"+arvlList[inx][1]+"</button></li>";
		}
	}
	return arvlTblList;
}


function fnArvlChc(arvlCd,arvlNm,prmmDcYn,tfrCd,tfrNm,takeTime){ //도착지 선택시 동작
	//$("#arvlNmSpn").text(arvlNm).trigger("change");
	$("#popArvlNmSpn").text(arvlNm).trigger("change");
	
	if( prmmDcYn == 'undefined'){
		prmmDcYn = "N";
	}
	$("#arvlCd").val(arvlCd);
	$("#prmmDcYn").val(prmmDcYn);
	$("#takeTime").val(takeTime);
	var pathDvs = $("#pathDvs").val();
	//alert(arvlCd+" <> "+arvlNm+" <> "+tfrCd+" <> "+tfrNm);
	if(pathDvs == "trtr"){
		$("#tfrArvlFullNm").val(arvlNm);
		var cutArvlNm = arvlNm.substring(0,arvlNm.indexOf("("))
		$("#arvlNm").val(cutArvlNm); //환승지명
		$("#tfrCd").val(tfrCd); //환승지코드
		$("#tfrNm").val(tfrNm); //환승지명
		
		$("#terminalSearch").val(tfrNm);
	}else{
		$("#arvlNm").val(arvlNm);
		$("#tfrArvlFullNm").val("");
		$("#tfrCd").val(""); //환승지코드
		$("#tfrNm").val(""); //환승지명
	
		$("#terminalSearch").val(arvlNm);
	}
	fnEmptyCssStup();
	
	
	//fnCfmBtnActv(); // 선택완료버튼 활성화
	$("#cfmBtn").removeClass('ready');
	
	$("#popArvlChc").addClass('focuson'); // 도착지 항목 포커스 유지
	if($("#deprCd").val().length > 0 && $("#arvlCd").val().length > 0 && $("#popDeprNmSpn").text().length > 0 && $("#popArvlNmSpn").text().length > 0){
//		fncfmBtnChc();
	}
}



function fnDeprArvlChg(){
	/* 지역별터미널 지역선택 */
	var placeList = $('.pop_place .start_wrap span, .pop_place .area_list li')
	placeList.siblings().removeClass('active');
	$("#areaListAll").addClass('active');	
}



function fnCrchDeprArvl(){ // 스왑 클릭시
	var orglDeprCd = $("#deprCd").val();     //원본 출발지코드
	var orglDeprNm = $("#deprNmSpn").text(); //원본 출발지명
	var orglArvlCd = $("#arvlCd").val();     //원본 도착지코드
	var orglArvlNm = $("#arvlNmSpn").text(); //원본 도착지명
	var crchDeprArvlYn = $("#crchDeprArvlYn").val(); //스왑여부체크
	//var chkDerpCd = "N"; //출발지 리스트에 원본 도착지코드가 있는지 여부
	//var chkArvlCd = "N"; //도착지 리스트에 원본 출발지코드가 있는지 여부
	
	if(orglDeprNm.length <=0 || orglArvlNm.length <= 0){
		return false;
	}else{
		$("#deprCd").val(orglArvlCd);
		$("#deprNm").val(orglArvlNm);
		$("#deprNmSpn").text(orglArvlNm);
		$("#popDeprNmSpn").text(orglArvlNm);
		$("#arvlCd").val(orglDeprCd);
		$("#arvlNm").val(orglDeprNm);
		$("#arvlNmSpn").text(orglDeprNm);
		$("#popArvlNmSpn").text(orglDeprNm);
		if(crchDeprArvlYn == "N"){
			$("#crchDeprArvlYn").val("Y"); //스왑버튼 클릭여부
		}else if (crchDeprArvlYn == "Y"){
			$("#crchDeprArvlYn").val("N"); //스왑버튼 클릭여부
		}
	} 
}



function fnDerpListArvlYn(deprCd,arvlCd){//변경된 출발지에 기존 도착지 정보가 있는지 확인값

	var arvlCdExsnYn = "N"; //변경된 출발지에 기존 도착지 정보가 있는지 확인값
	
	for(var knx = 0 ; knx < allRotInfrLen ; knx++){ //왕복이기 때문에 도착지가 출발지에도 있는지 확인
		if(allRotInfAllList[knx][0] == arvlCd && allRotInfAllList[knx][3] == deprCd){
			arvlCdExsnYn="Y";
		}
	}
	
	if(arvlCdExsnYn == "N"){//변경된 출발지에 기존도착지가 없으면 출.도착지 초기화
		fnDeprInfDlt();//출발지 초기화
 		fnArvlInfDlt();//도착지 초기화
 	}
}



function fnDeprInfDlt(){ //출발정보 초기화
	
	$("#deprCd").val("");
	$("#deprNm").val("");
	$("#deprNmSpn").text("").trigger("change");
	$("#popDeprNmSpn").text("").trigger("change");
	fnEmptyCssStup();
}



function fnArvlInfDlt(){ //도착정보 초기화
	
	$("#arvlCd").val("");
	$("#arvlNm").val("");
	$("#arvlNmSpn").text("").trigger("change");
	$("#popArvlNmSpn").text("").trigger("change");
	fnEmptyCssStup();
}



/*function fnCfmBtnActv(){
	if($("#deprCd").val().length > 0 && $("#arvlCd").val().length > 0 && $("#popDeprNmSpn").text().length > 0 && $("#popArvlNmSpn").text().length > 0){
		$("#cfmBtn").removeClass('ready');
	}else{
		$("#cfmBtn").addClass('ready');
	}
	
	fnEmptyCssStup();
}*/



function fncfmBtnChc(){ //노선 선택 완료 클릭시
	
	//if(!$("#cfmBtn").hasClass("ready")){
	
		var deprNmVal = $("#popDeprNmSpn").text();
		var arvlNmVal = $("#popArvlNmSpn").text();
		
		if($("#pathDvs").val() == "trtr"){
			arvlNmVal = arvlNmVal.substring(0,arvlNmVal.lastIndexOf("("));
		}
		$("#deprNmSpn").text(deprNmVal).trigger("change");
		$("#arvlNmSpn").text(arvlNmVal).trigger("change");
		
		$("#terminalSearch").val("");
		fnPrmmDcYnSet($("#deprCd").val(),$("#arvlCd").val());//선택완료시 시외우등할인대상여부체크
		
		fnEmptyCssStup();
		
		if($("#deprCd").val().length > 0 && $("#arvlCd").val().length > 0 && $("#popDeprNmSpn").text().length > 0 && $("#popArvlNmSpn").text().length > 0){
			$("#alcnSrchBtn .btn_confirm").removeClass("ready");
		}
		
		if ($("#cardNum5").length > 0 && $("#cardNum6").length > 0 && $("#cardNum7").length > 0 && $("#cardNum8").length > 0 && $("#deprNm").length > 0 && $("#arvlNm").length > 0 && $("#arriveTime").length > 0) {
			if($("#cardNum5").val().length > 4 && $("#cardNum6").val().length > 4 && $("#cardNum7").val().length > 4 && $("#cardNum8").val().length != 0 && $("#deprNm").val() != ""
				|| $("#arvlNm").val() != "" && $("#arriveTime").val() != ""){
				$("#tckSearchBtn").removeClass("ready");
			}
		}
		
		/*$(".pop_place .remodal-close").trigger("click");*/
	//}else{
	//	return;
	//}
}



function fnPrmmDcYnSet(deprCd,arvlCd){
	for(var inx = 0 ; inx < allRotInfrLen ; inx++){
		if(deprCd == allRotInfAllList[inx][0]){
			if(arvlCd == allRotInfAllList[inx][3]){
				$("#prmmDcYn").val(allRotInfAllList[inx][6]);
			}
		}
	}
}

function fnUserAgent(){
	var sAgent = navigator.userAgent;
	var agent = "pc";
	if (sAgent.match(/iPhone|UP.Browser|Android|BlackBerry|Windows CE|Nokia|webOS|Opera Mini|SonyEricsson|opera mobi|Windows Phone|IEMobile|POLARIS/) != null){
		agent ="mobile";
	}else if(sAgent.match(/tablet|iPad/) != null){
		agent = "tablet";
	}else{
		agent = "pc";
	}
	
	return agent;
}
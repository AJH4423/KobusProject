/* 전역변수 : 모든 전역변수에 접두사로 all 사용
 * 최종확인변수 : 모든 변수에 접미사 cfm 사용 
 */
var allResultList  = []; // 회원 전체정보
var allResultListLen = 0;  // 
 $(document).ready(function() {
	 if($("#usrId").val()!=""){
		 $("#usrId").prev().attr("class","empty");
	 }
	 if($("#usrPwd").val()!=""){
		 $("#usrPwd").prev().attr("class","empty");
	 }
	 if($("#nombrsid").val()!=""){
		 $("#nombrsid").prev().attr("class","empty");
	 }
	 if($("#nombrspass").val()!=""){
		 $("#nombrspass").prev().attr("class","empty");
	 }
	 
	 
	 $("#usrPwd").keypress(function(e){
		 if(e.keyCode == 13)
		 {
			 fnMngChkCfm();
		 }
	 });
	 
	 $("#nombrspass").keypress(function(e){
		 if(e.keyCode == 13)
		 {
			 NonUsrCheck();
		 }
	 });
});

function fnNumCheck(obj) {
	/*
	var form	= document.lgnNonUsrFrm;
	var number = /[^0-9]/; //숫자만 허용
   	if ( form.nombrsid.value.search(number)!=-1){
		alert("숫자만 입력하실 수 있습니다.");
		$("#nombrsid").val('');
		form.nombrsid.focus();
		return false;
  	}else{
  		return true;
  	}
  	*/
	
	var number = /[^0-9]/; //숫자만 허용
   	if ( $(obj).val() != '' && $(obj).val().search(number) != -1){
		alert("숫자만 입력하실 수 있습니다.");
		$(obj).val('');
		$(obj).focus();
		return false;
  	}else{
  		return true;
  	}
}

function fnPassNumCheck() {
	var form	= document.lgnNonUsrFrm;
	var number = /[^0-9]/; //숫자만 허용
   	if ( form.nombrspass.value.search(number)!=-1){
		alert("숫자만 입력하실 수 있습니다.2");
		$("#nombrspass").val('');
		form.nombrspass.focus();
		return false;
  	}else if(form.nombrspass.value.length > 4){
  		alert("4자리까지 입력가능합니다.");
  		var $sub = $("#nombrspass").val().substr(0,4);
  		$("#nombrspass").val($sub);
		form.nombrspass.focus();
		return false;
  	}else{
  		return true;
  	}

}

function NonUsrInsert(){
	 $('.loading').show();
	 $.ajax({
	        url      : "/mbrs/lgn/NonUsrInsert.ajax",
	        type     : "post",
	        data	 : $("form[name=lgnNonUsrFrm]").serialize(),
	        dataType : "json",
	        async    : true,
	        success  : function(resultMap){	
	        	$("#loading").hide();
	        	if(resultMap.resultStatus=="Y"){
	        			NonUsrCheck();
				}else{
					fnCancPcpy("lgn");						//선점취소함수
					alert("비회원등록에 실패 하였습니다. 잠시 후 다시 시도해주세요.");
					//location.href="/mbrs/lgn/loginMain.do";
				}
	        },
	        error:function (e){
	        	$('.loading').hide();
	            alert("정보를 가져오는 중에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
	        }
	    });
}

var check = 0;
function NonUsrCheck(obj){	
	$('.loading').show();
	if(check == 0){
		check++;
		if(!$(obj).hasClass("noHover")){
			
			/**
			 * 20200617 yahan
			 */
			if (ajaxDecode('nombrspass') == false) { check=0; return; }
			
//			if(fnNumCheck()&&fnPassNumCheck()){
			if(fnNumCheck()){
				$("#mbrsDvsCd").attr("value","1");
				$.ajax({
			        url      : "/mbrs/lgn/lgnNonUsrInqr.ajax",
			        type     : "post",
			        data	 : $("form[name=lgnNonUsrFrm]").serialize(),
			        dataType : "json",
			        async    : true,
			        success  : function(resultMap){	
			        	$("#loading").hide();
						 if(resultMap.resultStatus == "Y"){
								if(resultMap.popUpDvs == "Y"){
									$('[data-remodal-id=popLogin]').remodal().close();
									 if($("#locInf").val() == "sats"){
										 $("#nonMbrsYn").val("N");
										 fnSatsSubmit();
									 }
								}else{
									if(resultMap.returnUrl != ""){
										location.href=resultMap.returnUrl;
									 }else{
										location.href = "/main.do";
									 }
								}
							 }else{
								 if(resultMap.connection == "F"){
									 if(resultMap.popUpDvs == "Y"){
											 fnCancPcpy("lgn");					//선점취소함수
									 }
									 alert("정보를 가져오는 중에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
								 }else {
									// if(uf_isEmail()==false){
									//	 alert("아이디는 이메일 주소만 사용 가능합니다. 이메일 형식에 맞게 입력해주세요."); 
									// }else{
										 alert("아이디와 비밀번호가 정확하지 않습니다.");
										 $("#nombrsid").val("");
										 $("#nombrspass").val("");
										 check = 0;
										 $('input#usrId').focus();
									// }
								 }
							 }
			        	},
				        error:function (e){
				        	$('.loading').hide();
				            alert("정보를 가져오는 중에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
				        }
				    });
				}else{
					alert("휴대폰번호와 비밀번호가 정확하지 않습니다.");
			}
			
			check = 0;
		}
	}
}

 
function mbrsJoin(){ // 회원가입 버튼 클릭
	location.href = "/mbrs/mbrsjoin/mbrsJoin.do";
}

function mbrsMyInfo(){
	
	location.href = "/mbrs/mbrspage/myPageMain.do";
	
}

function logoutMain(){
	location.href = "/mbrs/lgn/logoutMain.do";
	
}

function loginMain(){
	location.href = "/mbrs/lgn/loginMain.do";	
}

function loginOutMain(){
	//returnUrl 회원가입완료화면에있는 걸 login.do로 가져가야됨
	$("form[name=lgnForm]").attr("action", "/mbrs/lgn/loginMain.do");
	$("form[name=lgnForm]").submit();
}

function lgnSearchId(){
	location.href = "/mbrs/lgn/lgnSearchId.do";
}

function lgnSearchPwd(){
	location.href = "/mbrs/lgn/lgnSearchPwd.do";
}
function PayMentPT(){
	location.href = "/mbrs/trprinqr/pymPtInqr.do";
};

/**
 * 페이지 Click
 * @param pageNo
 */
function paginationClick(pageNo) {
	$("input[name=currentPage]").val(pageNo);
	$("form[name=srchForm]").attr("action", "/mngr/mainBnrMng.do");
	$("form[name=srchForm]").submit();
	
}

function doPage(thisForm, url){
    var form = $("form[name=lgnUsrInfForm]").serializeArray();
    var FormName = new Array(); // 폼태그의 name 속성에 기록된 정보를 알려줌 ==> 배열
    var FormValue = new Array();
   
    for (i = 0; i < form.elements.length; i++){
           var selName = form.elements[i].name;
           var selValue = form.elements[i].value;
          
           FormName[i] = selName;
           FormValue[i] = selValue;
    }
    form.method = "POST";
    form.action = url;
    form.submit();
}


//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : strValue				(문자열)
//결    과	: Boolean
//목    적 : 이메일주소 체크
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : if ( uf_isEmail( form.email.value ) == false ) alert("잘못된 형식의 이메일");
//주의사항 : 
//			  1. 아이디부분 = 영문+숫자만+언더바+하이픈 허용 / 최소 3자리 이상 최대 15자리 까지 허용 {3,15}
//** ---------------------------------------------------------------------------
function uf_isEmail(){
	var strValue = $("#usrId").val();
	var pwdValue = $("#usrPwd").val();
	
	//대채가능패턴모음
	//var pattern = /[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+(\.[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+)*@[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+(\.[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+)*/;
	//var pattern = /^([A-Za-z0-9_-]{4,15})(@{1})([A-Za-z0-9_-]{1,15})(.{1})([A-Za-z0-9]{2,10})(.{1}[A-Za-z]{2,10})?(.{1}[A-Za-z]{2,10})?$/;
	//var pattern = /(^[a-zA-Z0-9]+@[a-zA-Z0-9]+[a-zA-Z0-9\-]+[a-zA-Z0-9]+\.[a-zA-Z]+$)/;
	//var pattern = /^(\w+)@(\w+)[.](\w+)[.](\w+)$/;
	//var pattern = /^(\w+(?:\.\w+)*)@((?:\w+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	//var pattern = /^([A-Za-z0-9]{4,15})(@{1})([A-Za-z0-9_-]{1,15})(.{1})([A-Za-z0-9]{2,4})(.{1}[A-Za-z]{2,4})?(.{1}[A-Za-z]{2,4})?$/;

	var pattern;

	//var pattern = /^([A-Za-z0-9_\-~]{1,})(@{1})([A-Za-z0-9_\-]{1,})(.{1})([A-Za-z0-9]{2,})(.{1}[A-Za-z]{2,})?(.{1}[A-Za-z]{1,})?$/;
	//var pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	var pattern = /^([A-Za-z0-9-_.]{1,})@([A-Za-z0-9-_.]{1,})$/i;

	if(strValue.length != 0){
		if((!pattern.test(strValue))){
			return false;
		}else{
			if(strValue.length >= 50){
				return false;
			}else{
				return true;
			}
		}
	}else{
		return false;
	}
	
	
}

//회원 비밀번호 유효성 체크
function fnPwdVldtCheck(){
// 20210513 yahan	
//	var pwdValue = $("#usrNewPwd").val();
	var pwdValue = ajaxDecode_value('usrNewPwd');
	if(pwdValue != ""){	//값이 있는지없는지 체크 - 값이 있을때
		if(uf_isLength(pwdValue, 6, 12 ) == false){	//최소 길이제한
			return false;
		 }else{	//최소 길이맞음
			 if(usr_isMix_String(pwdValue) == false){	//숫자+영문 조합 제한
				 return false;
			 }else{//특수+숫자+영문 조합 맞음
				 return true;
			 }
		 }
	 }else{		//값이 있는지없는지 체크 - 값이 없을때
		 return false;
	 }
}

function fnIcoCheck(obj){
	var blnCheck = false;
	var $lgnBtn = $(obj).parents("form").find("button");
	$(obj).parents("ul.loginList").find("input").each(function(index){
		if (this.value == "") {
			blnCheck = true;
		}
	});
	if(blnCheck){
		$lgnBtn.addClass("ready");
	}else{
		$lgnBtn.removeClass("ready");
	}
}

//회원 로그인 판별
var check = 0;
function fnMngChkCfm(obj){
	if(check == 0){
		check++;
		if(!$(obj).hasClass("noHover")){
			if(uf_isEmail()){
				
				/**
				 * 20200617 yahan
				 */
				if (ajaxDecode('usrPwd', '비밀번호를') == false) { check=0; return; }

				
				$("#mbrsDvsCd").attr("value","2");
				$("#loading").show();
				 $.ajax({
					 url      : "/mbrs/lgn/lgnUsrInqr.ajax",
					 type     : "post",
					 data	 : $("form[name=lgnUsrInfForm]").serialize(),
					 dataType : "json",
					 async    : true,
					 success  : function(resultMap){
						 $("#loading").hide();
						 if(resultMap.resultStatus == "Y"){
							if(resultMap.popUpDvs == "Y"){
								$('[data-remodal-id=popLogin]').remodal().close();
								if($("#adtnflag").val()=="N"){
									if($("#locInf").val() == "sats"){
										 if(resultMap.pwdIntzYn == "Y"){ 		//패스워드 초기화
//											 $("#redText").text("임시로 발급된 비밀번호");
											 $("#tmpPwdChgDiv").attr("style","display:block;");
						        			 $("#tmpPwdChgP").attr("style","display:block;");
											 $("#oldPwdChgDiv").attr("style","display:none;");
											 $("#oldPwdChgP").attr("style","display:none;");
											 $('[data-remodal-id=popChangePassword]').remodal().open();
											 initTranskey('pwdModLsapForm');
										 }else if(resultMap.exceYn == "Y"){ 	//180일 초과
											 $("#oldPwdChgDiv").attr("style","display:block;");
											 $("#oldPwdChgP").attr("style","display:block;");
											 $("#tmpPwdChgDiv").attr("style","display:none;");
											 $("#tmpPwdChgP").attr("style","display:none;");
											 $("#mbr_mng_no").val(resultMap.mbr_mng_no);
											 $('[data-remodal-id=popChangePassword]').remodal().open();
											 initTranskey('pwdModLsapForm');
										 }else{
											$("#nonMbrsYn").val("N");
											fnSatsSubmit(); 
										 }
									}
								}else if($("#adtnflag").val()=="P"){
									$("#passPrchGdFrm").attr({action:'/adtnprdnew/pass/passPrch.do', method:'post'}).submit(); // 로그인에 성공했으므로 옵션으로 ㄱㄱ
								}else if($("#adtnflag").val()=="F"){
									$("#frpsPrchGdFrm").attr({action:'/adtnprdnew/frps/frpsPrch.do', method:'post'}).submit(); // 로그인에 성공했으므로 옵션으로 ㄱㄱ
								}
							}else{
							     if(resultMap.pwdIntzYn == "Y"){ 	//패스워드 초기화
//									 $("#redText").text("임시로 발급된 비밀번호");
							    	 $("#tmpPwdChgDiv").attr("style","display:block;");
				        			 $("#tmpPwdChgP").attr("style","display:block;");
									 $("#oldPwdChgDiv").attr("style","display:none;");
									 $("#oldPwdChgP").attr("style","display:none;");
									 $('[data-remodal-id=popChangePassword]').remodal().open();
									 initTranskey('pwdModLsapForm');
								 }else if(resultMap.exceYn == "Y"){ 	//180일 초과
									 $("#oldPwdChgDiv").attr("style","display:block;");
									 $("#oldPwdChgP").attr("style","display:block;");
									 $("#tmpPwdChgDiv").attr("style","display:none;");
									 $("#tmpPwdChgP").attr("style","display:none;");
									 $("#mbr_mng_no").val(resultMap.mbr_mng_no);
									 $('[data-remodal-id=popChangePassword]').remodal().open();
									 initTranskey('pwdModLsapForm');
								 }else{
									 if(resultMap.returnUrl != ""){
										location.href=resultMap.returnUrl;
									 }else{
										location.href = "/main.do";
									 }
								 }
							}
						 }else if(resultMap.resultStatus == "N"){
							 if(resultMap.popUpDvs == "Y"){
								 if($("#adtnflag").val()=="N"){
//									 alert("선점취소");
									 fnCancPcpy("lgn");					//선점취소함수
								 }
							 }
							 if(resultMap.slpYn == "Y"){ 		//휴면회원
								 $("#mbrMngNo").val(resultMap.mbr_mng_no);
								 $('[data-remodal-id=popDormantMember]').remodal().open();
							 }else{
								 if(resultMap.pwdLockYn == "N"){
									 if(resultMap.pwdErrFcnt > 0 && resultMap.pwdErrFcnt <= 3){ 		// 비밀번호 오류 3번이하
										 alert("아이디와 비밀번호가 정확하지 않습니다.\n(총 5회 중 "+resultMap.pwdErrFcnt+"회 실패)");
										 $('input#usrId').focus();
									 }else if(resultMap.pwdErrFcnt == 4){ 		// 비밀번호 오류 4회~5회
										 alert("비밀번호 잠금 안내(총 5회 중 4회 실패) 5회 이상 실패시 계정이 잠기오니 유의하시기 바랍니다.\n* 계정이 잠길 경우 비밀번호 찾기 기능을 통해 신규 비밀번호로 변경 하시기 바랍니다.");
									 }else{
										 alert("아이디와 비밀번호가 정확하지 않습니다.");
										 $('input#usrId').focus();
									 }
									 if(resultMap.popUpDvs != "Y"){
										 window.location.reload();
									 }else{
										 $("#usrId").val("");
										 $("#usrPwd").val("");
										 check = 0;
									 }								 
								 }else if(resultMap.pwdLockYn == "Y"){
									 alert("비밀번호 잠금 안내 (총 5회 중 5회 실패)\n계정이 잠겨있는 상태입니다.\n[비밀번호 찾기]를 통해 비밀번호를 변경하시기 바랍니다.");
									 location.href="/mbrs/lgn/lgnSearchPwd.do";
								 }else{
									 alert("아이디와 비밀번호가 정확하지 않습니다.");
									 $('input#usrId').focus();
									 if(resultMap.popUpDvs != "Y"){
										 window.location.reload();
									 }else{
										 $("#usrId").val("");
										 $("#usrPwd").val("");
										 check = 0;
									 }
								 }
							 }
						 }else{
							 if(resultMap.connection == "F"){
								 if(resultMap.popUpDvs == "Y"){
									 if($("#adtnflag").val()=="N"){
										 fnCancPcpy("lgn");					//선점취소함수
									 }
								 }
								 alert("정보를 가져오는 중에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
							 }
							 // 20200617 yahan
							 else{
								 alert(resultMap.err_msg);
							 }
							 window.location.reload();
						 }
					 },
					 error:function (e){
					 	//setTimeout(function(){$("#loading").hide();},2000);
						 $("#loading").hide();	
						 alert("정보를 가져오는 중에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
						 window.location.reload();
					 }
				 });
			 }else{//이메일형식 체크
				// if(uf_isEmail()==false){
				//	 alert("아이디는 이메일 주소만 사용 가능합니다. 이메일 형식에 맞게 입력해주세요."); 
				// }else{
					 alert("아이디를 입력해주세요.");
//					 window.location.reload();
					 $("#usrId").val("");
					 $("#usrPwd").val("");
					 check = 0;
					 $('input#usrId').focus();
				// }
			 }
		}
	}
}


function fnIcoCheck(){
	// 20210513 yahan	
	var usrOldPw = ajaxDecode_value('usrOldPw');
	
	if(usrOldPw!=""&&$("#pwdDiv").children("span[class=ico_complete]").css("display")=="block"&&$("#pwdCfmDiv").children("span[class=ico_complete]").css("display")=="block"){
		$("#pwdChangeBtn").removeClass("ready");
	}else{
		$("#pwdChangeBtn").addClass("ready");
	}
}

/**
 * 	비밀번호 유효성검사  onblur일때
 **/
function fnPwdVldtCheck(obj){
	// 20210513 yahan
	//var val = $(obj).val();
	var getid = $(obj).attr('id');
	var val = ajaxDecode_value(getid);

	var	$pwd = $(obj).parent().parent();
		if(val != ""){	//값이 있는지없는지 체크 - 값이 있을때
			if(uf_isLength(val, 8, 12 ) == false){	//최소 길이제한
				$pwd.next(".noti_box").remove();
				$pwd.after("<span class='noti_box'>비밀번호는 8~12자의 숫자, 영문, 특수문자만 사용 가능합니다.</span>");
			 }else{	//최소 길이맞음
				 if(usr_isMix_String(val) == false){	
					 $pwd.next(".noti_box").remove();
					 $pwd.after("<span class='noti_box'>비밀번호는 8~12자의 숫자, 영문, 특수문자만 사용 가능합니다.</span>");
				 }else{
						 $pwd.next(".noti_box").remove();
						 $pwd.children("span[class=ico_complete]").attr("style","display:block;");
						 fnPwdCfmCheck($pwd.next().find("input")[0]);
						 fnIcoCheck();
						 return val;
				 }
			 }
			fnPwdCfmCheck($pwd.next().find("input")[0]);
		 }else{		//값이 있는지없는지 체크 - 값이 없을때
			 $pwd.next(".noti_box").remove();
			 $pwd.children("span[class=ico_complete]").attr("style","display:none;");
		 }
}

/**
 *	비밀번호 확인 유효성검사   onblur일때
 **/
function fnPwdCfmCheck(obj){
	// 20210513 yahan
	//var val = $(obj).val();
	var getid = $(obj).attr('id');
	var val = ajaxDecode_value(getid);

	var	$pwd = $(obj).parent().parent();
//	obj.value = obj.value.replace(/ /g,"");
	
	// 20210513 yahan	
	var usrNewPwd = ajaxDecode_value('usrNewPwd');
	
	if(val!=""){
		if(val!=usrNewPwd){
			$pwd .children("span[class=ico_complete]").attr("style","display:none;");
			$pwd .next(".noti_box").remove();
			$pwd .after("<span class='noti_box'>비밀번호가 일치하지 않습니다.</span>");
			fnIcoCheck();
		}else{
			$pwd .next(".noti_box").remove();
			$pwd .children("span[class=ico_complete]").attr("style","display:block;");
			fnIcoCheck();
		}
	}else{
		$pwd .next(".noti_box").remove();
		$pwd .children("span[class=ico_complete]").attr("style","display:none;");
	}
}

/**
 * 	비밀번호 길이만 유효성검사 onkeyup,down 할때
 **/
function fnPwdLenCheck(obj){
	// 20210513 yahan
	//var val = $(obj).val();
	var getid = $(obj).attr('id');
	var val = ajaxDecode_value(getid);
	
	var $pwd = $(obj).parent().parent(); 
//	obj.value = obj.value.replace(/ /g,"");
	 
	if(val != ""){	//값이 있는지없는지 체크 - 값이 있을때
		if(uf_isLength(val, 8, 12 ) == false){	//최소 길이제한
			$pwd.next(".noti_box").remove();
			$pwd.after("<span class='noti_box'>비밀번호는 8~12자의 숫자, 영문, 특수문자만 사용 가능합니다.</span>");
			$pwd.children("span[class=ico_complete]").attr("style","display:none;");
			fnIcoCheck();
		 }else{	//최소 길이맞음
			 $pwd.next(".noti_box").remove();
			 $pwd.children("span[class=ico_complete]").attr("style","display:none;");
			 fnIcoCheck();
			 
		 }
	 }else{		//값이 있는지없는지 체크 - 값이 없을때
		 $pwd.next(".noti_box").remove();
		 $pwd.children("span[class=ico_complete]").attr("style","display:none;");
	 }
}

function fnUpdatePwd(){
	/**
	 * 20200831 yahan
	 */
	if (ajaxDecode('usrOldPw') == false) { return; }
	if (ajaxDecode('usrNewPwd') == false) { return; }
	if (ajaxDecode('pwdCfmCheck') == false) { return; }
	
	fnPwdLenCheck($('#usrNewPwd'));
	fnPwdVldtCheck($('#usrNewPwd'));
	fnPwdCfmCheck($('#pwdCfmCheck'));
	
	
	// 20210513 yahan	
	var usrOldPw = ajaxDecode_value('usrOldPw');
	var usrNewPwd = ajaxDecode_value('usrNewPwd');
	
	 if(usrOldPw!=""&&$("#pwdDiv").children("span[class=ico_complete]").css("display")=="block"&&$("#pwdCfmDiv").children("span[class=ico_complete]").css("display")=="block"){
		if(usrOldPw!=usrNewPwd){
			$('.loading').show();
			 $.ajax({
			        url      : "/mbrs/infmod/PwdModCheck.ajax",
			        type     : "post",
			        data	 : $("form[name=pwdModLsapForm]").serialize(),
			        dataType : "json",
			        async    : true,
			        success  : function(resultMap){
			        	$('.loading').hide();
			        	if(resultMap.resultStatus=="Y"){
			        		alert("비밀번호 변경이 완료되었습니다. 다시 로그인 하여 이용하시기 바랍니다.");
			        		loginOutMain();
			        	}else{
			        		if(resultMap.connection == "F"){
								 alert("정보를 가져오는 중에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.1");
							 }else{
								 alert("현재 비밀번호가 맞지 않습니다. 정확한 비밀번호를 입력해주세요.");
							 }
			        	}
			        },
			        error:function (e){
			        	$('.loading').hide();
			            alert("정보를 가져오는 중에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.2");
			        	if(document.referrer){
			        		history.back();
			        	}else{
			        		location.href="/mbrs/mbrspage/myPageMain.do"
			        	}
			        }
			    });
				
		}else{
			alert("기존 비밀번호와 새 비밀번호가 동일합니다. 새 비밀번호를 다시 작성해주세요.");
		}
	 }else{
		if($("#pwdDiv").children("span[class=ico_complete]").css("display")=="none"){
			alert("비밀번호를 입력해주세요.");
		}else if($("#pwdCfmDiv").children("span[class=ico_complete]").css("display")=="none"){
			alert("비밀번호 확인을 입력해주세요.");
		}
	 }
}

//휴면해제 다음에하기
function fnPass(){
	if(confirm("휴면 해제를 하지 않으시면 정보통신망 이용 촉진 및\n정보보호 등에 관한 법률 제29조 제2항에 의거하여\n서비스 이용이 불가하므로 로그아웃을 진행합니다.\n계속하시겠습니까?")){
		logoutLgn();
	}
}

/* 190129 추가 - 휴면 회원 해제 팝업 노출 */
function popRemoveDormantShow(){
	$('[data-remodal-id=popRemoveDormant]').remodal().open();
}

function logoutLgn(){
	location.href = "/mbrs/lgn/loginMain.do?returnUrl=logout";
}

// 180일 뒤에 변경하기
function nextChgPwd(){
	$('.loading').show();
	 $.ajax({
	        url      : "/mbrs/lgn/chgPwdDate.ajax",
	        type     : "post",
	        data	 : $("form[name=pwdModLsapForm]").serialize(),
	        dataType : "json",
	        async    : true,
	        success  : function(resultMap){	
	        	$("#loading").hide();
	        	if(resultMap.resultStatus=="Y"){
	        		if(resultMap.returnUrl != ""){
						location.href=resultMap.returnUrl;
					 }else{
						location.href = "/main.do";
					 }
				}else{
					alert(resultMap.err_msg);
					logoutLgn();
				}
	        },
	        error:function (e){
	        	$('.loading').hide();
	            alert("정보를 가져오는 중에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
	        }
	    });
}

//휴면 해제하기
function fnDormantClear(){
	if($("#pwd").val() == ""){
		alert("비밀번호를 입력해주세요.");
		return;
	}
	$('.loading').show();
	 $.ajax({
	        url      : "/mbrs/lgn/awkSlpUser.ajax",
	        type     : "post",
	        data	 : $("form[name=dormantForm]").serialize(),
	        dataType : "json",
	        async    : true,
	        success  : function(resultMap){	
	        	$("#loading").hide();
	        	if(resultMap.resultStatus=="Y"){
	        		alert("휴면 회원이 해제되었습니다.");
	        		if(resultMap.returnUrl != ""){
						location.href=resultMap.returnUrl;
					 }else{
						location.href = "/main.do";
					 }
				}else{
					alert("정보를 가져오는 중에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
					logoutLgn();
				}
	        },
	        error:function (e){
	        	$('.loading').hide();
	            alert("정보를 가져오는 중에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
	        }
	    });
}

var allResultList  = [];
var allResultListLen = 0;
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
});

function fnReadMrsCfm() {
	$("form[name=lgnNonUsrFrm]").attr("action","javacript:NonUsrInsert(this);");
	$("form[name=lgnNonUsrFrm]").submit(); // 예매확인 .do
};
function fnlogin(obj) {
	if(!$(obj).hasClass("noHover")){
		
		
		if($("#usrId").val() == "") { alert('아이디를 입력해주세요.'); $("#usrId").focus(); return; }
		/**
		 * 20200617 yahan
		 */
		if (ajaxDecode('usrPwd', '비밀번호를') == false) { return; }
		
		$('.loading').show();
		$.ajax({
	        url      : "/mbrs/lgn/lgnUsrInqr.ajax",
	        type     : "post",
	        data	 : $("form[name=lgnFrm]").serialize(),
	        dataType : "json",
	        success  : function(resultMap){
	        	
	        	if(resultMap.resultStatus == "Y"){
	        		if(resultMap.returnUrl != null){
	        			location.href=resultMap.returnUrl;
	        		}
				}else{
					$('.loading').hide();
					alert(resultMap.err_msg);
					location.href="/mbrs/lgn/loginMain.do"
				}
	        },
	        error:function (e){
	        	$('.loading').hide();
	            alert("connection error");
	        	if(document.referrer){
	        		history.back();
	        	}else{
	        		location.href="/mbrs/mbrspage/myPageMain.do"
	        	}
	        }
	    });
	}
//	$("form[name=lgnFrm]").attr({"action" : "/mbrs/lgn/lgnUsrInqr.do", "method" : "post", "target" : "_self"}).submit(); // 로그인 .do
}

function fnNumCheck(obj) {
	/*
	var form	= document.lgnNonUsrFrm;
	var number = /[^0-9]/; //숫자만 허용
   	if (form.nombrsid.value != '' &&
   		form.nombrsid.value.search(number)!=-1){
		alert("숫자만 입력하실 수 있습니다.");
		$("#nombrsid").val('');
		form.nombrsid.focus();
		return false;
  	}
   	return true;
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
   	if (form.nombrspass.value != '' &&
   		form.nombrspass.value.search(number)!=-1){
		alert("숫자만 입력하실 수 있습니다.");
		$("#nombrspass").val('');
		form.nombrspass.focus();
		return false;
  	}
   	return true;

}


function NonUsrInsert(obj){
	$('.loading').show();
	if(!$(obj).hasClass("noHover")){
		
		/**
		 * 20200617 yahan
		 */
		if (ajaxDecode('nombrspass') == false) { return; }
		
		$.ajax({
	        url      : "/mbrs/lgn/lgnNonUsrInqr.ajax",
	        type     : "post",
	        data	 : $("form[name=lgnNonUsrFrm]").serialize(),
	        dataType : "json",
	        success  : function(resultMap){
	        	if(resultMap.resultStatus=="Y"){
	        		if(resultMap.returnUrl!=null){
	        			location.href=resultMap.returnUrl;
	        		}
				}else{
					$('.loading').hide();
					alert(resultMap.err_msg);
					//location.href="/mbrs/lgn/loginMain.do";
				}
	        },
	        error:function (e){
	        	$('.loading').hide();
	            alert("connection error");
	        }
	    });
	}
}

function NonUsrCheck(){
	$.ajax({
       url      : "/mbrs/lgn/lgnNonUsrInqr.do",
       type     : "post",
       data	 	: $("form[name=lgnNonUsrFrm]").serialize(),
       dataType : "json",
       success  : function(resultMap){
	       	if(resultMap.resultStatus=="Y"){
	       		if(resultMap.returnUrl!=null){
	       			location.href=resultMap.returnUrl;
	       		}
			}else{
				alert("로그인 실패하였습니다. 다시 로그인 해주세요.");
				location.href="/mrs/mrscfmlgnchec.do"
			}
       },
       error:function (e){
           alert("connection error");
       }
   });

}

function logoutMain(){
	location.href = "/mbrs/lgn/logoutMain.do";
	
}

function mbrsMyInfo(){
	
	location.href = "/mbrs/mbrspage/myPageMain.do";
	
}

function mbrsJoin(){ // 회원가입 버튼 클릭
	location.href = "/mbrs/mbrsjoin/mbrsJoin.do";
}
function PayMentPT(){
	location.href = "/mbrs/trprinqr/pymPtInqr.do";
}


function lgnSearchId(){
	location.href = "/mbrs/lgn/lgnSearchId.do";
}

function lgnSearchPwd(){
	location.href = "/mbrs/lgn/lgnSearchPwd.do";
}
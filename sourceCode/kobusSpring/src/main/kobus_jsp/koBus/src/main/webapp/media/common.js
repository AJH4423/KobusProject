

//** ---------------------------------------------------------------------------
// 목    적 : 함수정의표
// 생 성 일 : 
// 수    정 :
//** ---------------------------------------------------------------------------	
/*
(체크)입력허용길이 체크													IsLength( strValue, intMin, intMax )
*/

//** ---------------------------------------------------------------------------
// 목    적 : 공통으로 쓰는 변수 정의
// 생 성 일 : 
// 수    정 :
//** ---------------------------------------------------------------------------	

/* 노선조회 출/도착지 선택 팝업 자동검색기능 */
function fnListAutoSrch(srchList,selNm,srchFld,rtrnFn,depArv){
	var value="";
	var valuecd="";
	var prmmClsYn="";
	var tfrCd="";
	var tfrNm="";
	var takeTime="";
	var options = {
		data:srchList, 
		getValue: "name",
		list: { 
			match: { enabled: true},
			onSelectItemEvent: function() {
				value = $("#"+srchFld).getSelectedItemData().name;
				$("#"+selNm).text(value).trigger("change");
				valuecd = $("#"+srchFld).getSelectedItemData().code;
				if(depArv == "arv"){
					prmmClsYn = $("#"+srchFld).getSelectedItemData().prmmClsYn;
					tfrCd = $("#"+srchFld).getSelectedItemData().tfrCd;
					tfrNm = $("#"+srchFld).getSelectedItemData().tfrNm;
					takeTime = $("#"+srchFld).getSelectedItemData().takeTime;
				}
			},
			onClickEvent: function(){
				if(depArv == "dep"){
					rtrnFn(valuecd,value);
				}else if(depArv == "arv"){
					rtrnFn(valuecd,value,prmmClsYn,tfrCd,tfrNm,takeTime);
				}
			},
			onKeyEnterEvent: function(){
				if(depArv == "dep"){
					rtrnFn(valuecd,value);
				}else if(depArv == "arv"){
					rtrnFn(valuecd,value,prmmClsYn,tfrCd,tfrNm,takeTime);
				}
				
				
				// 20250102 yahan 자동완성 영역을 강제로 숨김
				// $('#eac-container-terminalSearch').hide();
			},
			onChooseEvent: function(){
				if(depArv == "dep"){
					rtrnFn(valuecd,value);
				}else if(depArv == "arv"){
					rtrnFn(valuecd,value,prmmClsYn,tfrCd,tfrNm,takeTime);
				}
			}
		},
		highlightPhrase: true
	};
	$("#"+srchFld).unbind("keydown").bind("keydown", function(e) {
		if(e.keyCode == 13 && $(this).next().find("li.selected").length == 0){
			$(this).next().find("li:first div").trigger("click");
		}
	});
	$("#"+srchFld).easyAutocomplete(options);  
}



//00:00 시 기준 쿠키 설정하기  
//expiredays 의 새벽  00:00:00 까지 쿠키 설정  
function setCookieAt00( name, value, expiredays ) {   
	 var todayDate = new Date();   
	 todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);  
	 if ( todayDate > new Date() )  
	 {  
	 expiredays = expiredays - 1;  
	 }  
	 todayDate.setDate( todayDate.getDate() + expiredays );   
  document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"   
}

function setCookieHours( name, value, expirehours ) { 
	 var todayDate = new Date(); 
	 todayDate.setHours( todayDate.getHours() + expirehours ); 
	 document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
}

//오늘하루 창열지않기
function closeWinAt00(winName, expiredays) {   
   setCookieAt00( winName, "done" , expiredays);   
   var obj = eval( "window." + winName );  
   obj.style.display = "none";  
}

// 쿠키 넣기
function setCookie( name, value, expiredays ) {
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

// 쿠키 가져오기
function getCookie( name ) {
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length ) {
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie ) { 
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) {
				endOfCookie = document.cookie.length;
			}
			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 ) {
			break;
		}
	}
	return ""; 
}



//콤마찍기
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}



//콤마풀기
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

/**
 * 20230501 maxlangth 체크
 */
function lengthCheck(obj){
	if (obj.value.length > obj.maxLength){
		obj.value = obj.value.slice(0, obj.maxLength);
	}
}

function onlyNumPlus(str){
	//var str = obj.value;
	var val = "";
	str = "" + str;
	if (str == null || str == "") return val;

	for (var i = 0; i < str.length; i++)
	{
		// 음수일 경우도 가져온다. 소수점도 포함
		if (isOnlyNumberic(str.charAt(i)))
		{
			val += str.charAt(i);
		}
	}
	return val;
}



function onlyNumNs(str){
	var val = "";
	str = "" + str;
	if (str == null || str == "") return val;
	
	for (var i = 0; i < str.length; i++)
	{
		// 음수일 경우도 가져온다. 소수점도 포함
		if (isOnlyNumberic(str.charAt(i)) || (i == 0 && str.charAt(i) == "-"))
		{
			val += str.charAt(i);
		}
	}
	return val;
}



//숫자만 있는지를 검색한다.
function isOnlyNumberic(string)
{
	var regExp 	= /[^\d]/i;
	var isVaild	= !(regExp.test(string));
	return isVaild;
}


//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : strValue				(문자열)
//결    과	: Boolean
//목    적 : 입력허용길이 체크
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : if ( uf_isLength( form.title.value, 2, 10 ) == false ) alert("입력길이 오류");
//주의사항 :
//** ---------------------------------------------------------------------------
function uf_isLength(strValue,intMin,intMax )
{
	var nTotalByte;

	nTotalByte = uf_getStringByte( strValue );

	if ( nTotalByte < intMin || nTotalByte > intMax )
	{
		return false;
	}

	return true;
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : strValue			(문자열)
//결    과	: Number
//목    적 : 바이트 수 구하기
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : var cResult = uf_getStringByte( form.title.value );
//주의사항 :
//** ---------------------------------------------------------------------------	
function uf_getStringByte(strValue)
{
	var nTotalByte;
	var cOneChar;

	nTotalByte = 0;
	cOneChar = "";

	if ( strValue.length == 0 )
	{
		return nTotalByte;
	}
	
	for( var i=0; i < strValue.length; i++ )
	{
		cOneChar = strValue.charAt(i);

		if ( escape(cOneChar).length > 4 )
		{
			nTotalByte += 2;
		}
		else
		{
			nTotalByte ++;
		}
	}

	return nTotalByte;
}


//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : strValue				(문자열)
//			: strCheckType			(체크 타입)
//결    과	: Boolean
//목    적 : 입력가능한 문자인지 체크
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : if ( uf_isValueType( form.title.value ) == false ) alert("허용되지 않은 문자열 포함");
//주의사항 :
//			  1. 이 함수는 극히 제한적으로 사용하고자 할때
//			  2. 특정 정규식을 추가하여 사용하면 좋을듯 함.
//** ---------------------------------------------------------------------------
function uf_isValueType(strValue,strCheckType)
{
	if ( strValue.length == 0 )
	{
		return false;
	}

	switch ( strCheckType.toUpperCase() )
	{
		case "PWD" :	// 영문+숫자+특문( ~!@#$%^&*()\? )		
			
			if ( strValue.search(/[^A-Za-z0-9~!@#$%^&*()]/) != -1 )
			{							  
				return false;
			}
			
			break;
			
		case "E" :	// 영문
			
			if ( strValue.search(/[^A-Za-z]/) != -1 )
			{
				return false;
			}

			break;

		case "N" :	// 숫자
			
			if ( strValue.search(/[^0-9]/) != -1 )
			{
				return false;
			}
			
			break;
			
		case "SP" :	// 특문( ~!@#$%^&*()\? )
			
			if ( strValue.search(/[^~!@#$%^&*()-\?]/) != -1 )
			{
				return false;
			}
			
			break;
			
		default :
			
			return false;
			
			break;
	}

	return true;
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : strValue				(문자열)
//			: bSpecialChar			(특수문자체크여부)
//결    과	: Boolean
//목    적 : 혼합문자 체크
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : if ( usr_isMix_String( form.id.value ) == false ) alert("아이디는 영문과 숫자를 혼합하여 사용해야 함");
//주의사항 :
//** ---------------------------------------------------------------------------
function usr_isMix_String(strValue)
{
/*	var onlyEng;
	var onlyNum;
	var onlySp;
	
	onlyEng = uf_isValueType(strValue, "E");
	onlyNum = uf_isValueType(strValue, "N");
	onlySp = uf_isValueType(strValue, "SP");*/
			if ( uf_isValueType(strValue, "PWD") )
			{
				return true;
			}else{
				return false;
			}
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : strValue				(문자열)
//			: nCheckCount			(반복체크할 수)
//결    과	: Boolean
//목    적 : 연속문자 체크
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : if ( uf_isRepeat( form.id.value, 3 ) == true ) alert("연속적임");
//주의사항 :
//** ---------------------------------------------------------------------------
function uf_isRepeat(strValue,nCheckCount)
{
	var bResult;
	var chkRepeat;	// 반복되는 형태 (예: aaaa)
	var chkAsc;		// 연속된 오름차순 형태 (예: abcd, 1234)
	var chkDesc;	// 연속된 내림차순 형태 (예: dcba, 4321)

	bResult = false;
	chkRepeat = "";
	chkAsc = "";
	chkDesc = "";

	for(var k=1; k<nCheckCount; k++)
	{
		chkRepeat += "strValue.charAt(i) == strValue.charAt(i + " + k + ")";
		chkAsc += "(strValue.charCodeAt(i) + " + k + ") == strValue.charCodeAt(i + " + k + ")";
		chkDesc += "(strValue.charCodeAt(i) - " + k + ") == strValue.charCodeAt(i + " + k + ")";

		if (k < nCheckCount - 1)
		{
			chkRepeat += " && ";
			chkAsc += " && ";
			chkDesc += " && ";
		}
	}

	for( var i=0; i<strValue.length-3; i++)
	{
		if ( eval(chkRepeat) || eval(chkAsc) || eval(chkDesc) )
		{
			bResult = true;
		}
	}

	return bResult;
}

//** ---------------------------------------------------------------------------
//함 수 명 : 
//인    자 : strValue		(문자열)
//			  strTrimType	(공백제거형식)
//결    과	: String
//목    적 : 공백제거
//플 로 우 : 
//검    수 :
//생 성 일 : 
//수    정 :
//사용예제 : var strResult = uf_getTrim( form.title.value, 'B');
//주의사항 :
//** ---------------------------------------------------------------------------
function uf_getTrim(strValue)
{
	var strReturn;
	strReturn = "";
	strReturn = strValue.replace(/\s+/g,"");
	return strReturn;
}



(function($){
    $.hangul = {
        item: function(sType, nIndex) {
            var oItem = {
                cho: ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'],
                jung: ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'],
                jong: [' ','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ']
            }
            return oItem[sType][nIndex];
        },
        broken: function(sText, bCho) {
            if(!sText) { return; }
            var arrStr = sText.split('')
            ,nCode = 0
            ,sName = ''
            ,sReturnStr = '';
            for(var i=0, len=arrStr.length; i<len; i++) {
                var sName = arrStr[i];                
                if(sName.charCodeAt() < 44032 || sName.charCodeAt() > 55203) {
                    sReturnStr += sName;
                } else {
                    nCode = sName.charCodeAt() - 0xAC00;
                    sReturnStr += this.item('cho', parseInt(nCode / (28 * 21)));
                    if(!bCho) {
                        sReturnStr += this.item('jung', parseInt(nCode / 28) % 21);
                        sReturnStr += this.item('jong', nCode % 28);
                    }
                }
            }
            return sReturnStr;
        },
        choseong: function(sText) {
            return this.broken(sText, true);            
        }
    }
})(jQuery);


/**
 * 20200709 yahan
 * 생년월일 유효성 체크
 */
function isValidDate(dateStr) {
	if (dateStr.length == 6){
		if (Number(dateStr) < 200000) dateStr = '20'+dateStr; else dateStr = '19'+dateStr;
	}
			
     var year = Number(dateStr.substr(0,4)); 
     var month = Number(dateStr.substr(4,2));
     var day = Number(dateStr.substr(6,2));
     var today = new Date(); // 날자 변수 선언
     var yearNow = today.getFullYear();
     
     var adlt      = 0; // 성인구분 - 이용가능한 나이를 입력한다.
     var adultYear = yearNow-adlt;
  
     if (year > adultYear){
         alert("년도를 확인하세요. "+adultYear+"년 이전만 입력 가능합니다.");
         return false;
    }
     if (year < 1900 ){
         alert("년도를 확인하세요. 1900년 이후만 입력 가능합니다.");
         return false;
    }
     if (month < 1 || month > 12) { 
          alert("월은 1월부터 12월까지 입력 가능합니다.");
          return false;
     }
    if (day < 1 || day > 31) {
          alert("날자는 1일부터 31일까지 입력가능합니다.");
          return false;
     }
     if ((month==4 || month==6 || month==9 || month==11) && day==31) {
          alert(month+"월은 31일이 존재하지 않습니다.");
          return false;
     }
     if (month == 2) {
          var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
          if (day>29 || (day==29 && !isleap)) {
               alert(year + "년 2월은  " + day + "일이 없습니다.");
               return false;
          }
     }
     return true;
     
     
}

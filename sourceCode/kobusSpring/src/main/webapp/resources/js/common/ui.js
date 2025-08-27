var winW = 0;
var winH = 0;
var selectDate = [null,null,null,null];

$(document).ready(function() {
	
	checkUserAgent();

	/* skip */
	// [리뉴얼] 주석 처리
	// $('body').prepend('<a href="#contents" class="skip">본문 바로가기</a>');
	
	winW = $(window).width();
	winH = $(window).height();	
	
	/* gnb, 메인 컨텐츠화면 높이 */
	if ( winH < 910 ){
		$('.main #gnb, .main #contents').height(910);
	} else {
		$('.main #gnb, .main #contents').height(winH);	
	}

	/* gnb */
	$('a[href="#"], a[href="#none"]').on('click',function(event){
		try {event.preventDefault();} catch (e) {};
	});
	
	// depth1
	var menu = 	$('#gnb .menu');
	var mCurrent = -1;
	var gnbPC = $('#gnb.gnb_pc .depth1 > li > a');
	var gnbTablet = $('#gnb.gnb_tablet .depth1 > li > a');
	gnbPC.bind('click',function(){
		var idx = $(this).parent().index();
		if ( mCurrent != idx ){
			$('.gnb_pc .depth1 > li').removeClass('active');
			$(this).parent().addClass('active');
			mCurrent = idx;
		} else {
			$(this).parent().toggleClass('active');
		}
		var sub = $(this).next('.depth2');
		var subH = $(this).next('.depth2:visible').height();
		if ( $(this).next('.depth2').size() > 0){
			if ( $(this).parent().hasClass('active') ){
				subH = $(this).next('.depth2').height();
			} else {
				subH = 0;
			}
			$('.main #gnb').height(winH + subH);
			$('#wrap, .main #contents').height($('.main #gnb').height());
			if ( winH < 910 ){
				$('#wrap, .main #gnb, .main #contents').css('height',910 + subH);
			} else {
				$('#wrap, .main #gnb, .main #contents').css('height',winH + subH);
			}
		} else {
			if ( winH < 910 ){
				$('#wrap, .main #gnb, .main #contents').css('height',910);
			} else {
				$('#wrap, .main #gnb, .main #contents').css('height',winH);
			}
		}
	});

	//tablet gnb
	$('#gnb.gnb_tablet .menu_toggle').bind('click',function(){
		var toggle = $(this);
		var chkMenu = $(this).next('.menu');
		if ( menu.hasClass('open') ){
			chkMenu.removeClass('open');
			toggle.removeClass('close').addClass('view');
			$('#contentWrap .dimmed').hide(); 
			chkMenu.find('.active').removeClass('active');
			chkMenu.find('.temp').removeClass('temp').addClass('current');
		} else {
			toggle.removeClass('view').addClass('close');
			chkMenu.addClass('open');
			
			/* 메뉴높이 */
			if ( winH < 910 ){
				menu.height(680);
			} else {
				menu.height(winH - 230);
		}
			$('#contentWrap .dimmed').show();
		}

		return false;
	});
	
	gnbTablet.bind('click',function(){
		var toggle =$('#gnb.gnb_tablet .menu_toggle');
		var chkMenu = $('#gnb.gnb_tablet .menu_toggle').next('.menu');
		$('.gnb_tablet .depth1').children('.current').addClass('temp');
		$('.gnb_tablet .depth1 > li').removeClass('current');
		
		if ( !menu.hasClass('open') ){
			toggle.removeClass('view').addClass('close');
			chkMenu.addClass('open');
			$('#contentWrap .dimmed').show();
		}
	
		/* 메뉴높이 */
		if ( winH < 910 ){
			if ( $('body').hasClass('EN') ){
				menu.height(680);
			} else {
				menu.height(660);
			}
		} else {
			menu.height(winH - 230);
		}

		if ( $(this).parents('.menu').hasClass('open') ){
			var idx = $(this).parent().index();
			if ( mCurrent != idx ){
				$('.gnb_tablet .depth1 > li').removeClass('active');
				$(this).parent().addClass('active');
				mCurrent = idx;
			} else {
				$(this).parent().toggleClass('active');
			}
		}
	});

	//mobile gnb
	$('#gnb.gnb_mobile').width(winW - 60);
	$('.sub .mo_toggle').bind('click',function(){
		$(this).parents('#wrap').toggleClass('view');
		$('#contentWrap .dimmed').show();
				
		var gnbH = $('#gnb.gnb_mobile').height();
		$('#gnb.gnb_mobile').height(winH);
		$('#contentWrap').height(winH);
		$('#contentWrap').css('overflow','hidden');
	});
	
	$('#gnb.gnb_mobile .depth1 > li > a').bind('click',function(){
			var idx = $(this).parent().index();
			if ( mCurrent != idx ){
				$('.gnb_mobile .depth1 > li').removeClass('active');
				$(this).parent().addClass('active');
				mCurrent = idx;
			} else {
				$(this).parent().toggleClass('active');
			}
	});
	
	$('#gnb.gnb_mobile').next('.close').bind('click',function(){
		$(this).parents('#wrap').removeClass('view');
		$('#contentWrap .dimmed').hide();
		$('#contentWrap').height(winH);
		$('#contentWrap').css('overflow','inherit');
	});
	
	if ( window.innerWidth < 768){
		var titH = $('#contents .title_wrap').height();
		//titH = titH + 7;
		$('#contents').css('padding-top',titH);
		$('.dimmed').on('click',function(){
			$('#gnb.gnb_mobile').next('.close').click();
		});
		
	} else {
		$('#contents').css('padding-top',0);
	}

	/* tab */	
	$('.tab_wrap').each(function(){
		var tabConts = $(this).find('.tab_conts');
		var tabList = $(this).find('.tabs').children('li');
		var tabClick = $(this).find('.tabs').children('a');
		tabConts.hide();
		tabConts.eq(0).show();
		tabList.eq(0).addClass('active');

		/* 190109 추가 */
		if($(this).attr('data-desc-id')) {
			$('#'+$(this).attr('data-desc-id')).find('.tab_desc').eq(0).addClass('active');
		}
	});
	$('.tab_wrap.tab_type1 .tabs.col4').addClass('active-1'); /* 181204 추가 */
	
	$('.tab_wrap .tabs a').on('click',function(){
		var idx= $(this).parent().index();
		$(this).parents('ul').siblings('.tab_conts').hide().eq(idx).show();
		$(this).parents('ul').find('li').removeClass('active');
		$(this).parent().addClass('active')

		/* 181204 추가 */
		if( $(this).parents('.tab_wrap').hasClass('tab_type1') && $(this).parents('.tabs').hasClass('col4') ) {
			$(this).parents('.tabs').attr('class', function(i, c){
				return c.replace(/(^|\s)active-\S+/g, '');
			});
			$(this).parents('ul').addClass('active-'+(idx+1));
		}

		return false;
	});	
	
	/* title_wrap process */
	$('.title_wrap .process li:last-child').addClass('last');
	
//	/* 노선조회 */
//	// 출/도착지 선택팝업 호출
//	$('.place li > a').on('click',function(){
//		var popPlace =  $('[data-remodal-id=popPlace]').remodal();
//		popPlace.open();
//	});

	// 노선조회 편도/왕복 - 날짜영역
	$('.route_box .tabs > li a').on('click',function(){
		if ( $(this).parent().hasClass('roundtrip') ){
			$(this).parents('.tab_wrap').addClass('round');
		} else {
			$(this).parents('.tab_wrap').removeClass('round');
		}
	});

	// mobile 노선조회 직통/환승 영역
	if ( winW < 768 ){
		$('.route_box .tabs').addClass('mobile_tabs');
		$('.route_box .oneway a').on('click',function(){
			$(this).parents('.tabs').addClass('mobile_tabs');
		});
		$('.route_box .roundtrip a').on('click',function(){
			$('.route_box .tabs').removeClass('mobile_tabs');
		});
	} else {
		$('.route_box .tabs').removeClass('mobile_tabs');
	}

	// 노선조회 datepicker
	$('#datepicker1').datepicker({
		showOn:"button",
		buttonImage:"/resources/images/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"가는날 선택 달력",
		minDate: 0,
		beforeShow: function(){
			var date_offset = $(this).parents('.date_picker_wrap').offset();
			var date_width  = $(this).parents('.date_picker_wrap').outerWidth();
			var date_height = $(this).parents('.date_picker_wrap').outerHeight();
			var picker_width = $('#ui-datepicker-div').outerWidth();
			if($('body').width() == 320){
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : 0
					});
				});
			}else {
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : (date_offset.left + date_width) - picker_width
					});
				});
			}
		}
	});
	$('#datepicker1').on('change', function(){
		fnYyDtmStup(2,'text_date1',$('#datepicker1').val());
		$('.datepicker-active').focus();
		$('.datepicker-btn').removeClass('datepicker-active');
	});
	
	$('#datepicker2').datepicker({
		showOn:"button",
		buttonImage:"/resources/images/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"오는날 선택 달력",
		minDate: 0,
		beforeShow: function(){
			var date_offset = $(this).parents('.date_picker_wrap').offset();
			var date_width  = $(this).parents('.date_picker_wrap').outerWidth();
			var date_height = $(this).parents('.date_picker_wrap').outerHeight();
			var picker_width = $('#ui-datepicker-div').outerWidth();
			if($('body').width() == 320){
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : 0
					});
				});
			}else {
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : (date_offset.left + date_width) - picker_width
					});
				});
			}
		}
	});
	$('#datepicker2').on('change', function(){
		fnYyDtmStup(2,'text_date2',$('#datepicker2').val());
		$('.datepicker-active').focus();
		$('.datepicker-btn').removeClass('datepicker-active');
	});

	/* 190319 추가 - 금토일 제외 */
	$('#datepicker9').datepicker({
		showOn:"button",
		buttonImage:"/resources/images/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"달력",
		minDate: 0,
		beforeShow: function(){
			var date_offset = $(this).parents('.date_picker_wrap').offset();
			var date_width  = $(this).parents('.date_picker_wrap').outerWidth();
			var date_height = $(this).parents('.date_picker_wrap').outerHeight();
			var picker_width = $('#ui-datepicker-div').outerWidth();
			if($('body').width() == 320){
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : 0
					});
				});
			}else {
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : (date_offset.left + date_width) - picker_width
					});
				});
			}
		},
		beforeShowDay: function noWeekendsOrHolidays(date) { // 금,토,일 체크
			if($(this).hasClass('NoFriday_NoWeekend')) {
				var noWeekend = $.datepicker.noWeekends(date);
				return noWeekend[0] ? [date.getDay() != 5, ''] : noWeekend;
			} else {
				return [true, ''];
			}
		}
	});
	$('#datepicker9').on('change', function(){
		fnYyDtmStup(2,'text_date1',$('#datepicker9').val());
		$('.datepicker-active').focus();
		$('.datepicker-btn').removeClass('datepicker-active');
	});
	/* //190319 추가 - 금토일 제외 */

	$('#datepicker3').datepicker({
		showOn:"button",
		buttonImage:"/resources/images/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"조회시작일 선택 달력",
		minDate: -90,
		maxDate: 0,
		beforeShow: function(){
			var date_offset = $(this).parents('.date_picker_wrap').offset();
			var date_width  = $(this).parents('.date_picker_wrap').outerWidth();
			var date_height = $(this).parents('.date_picker_wrap').outerHeight();
			var picker_width = $('#ui-datepicker-div').outerWidth();
			if($('body').width() == 320){
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : 0
					});
				});
			}else {
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : (date_offset.left + date_width) - picker_width
					});
				});
			}
		}
	});
	$('#datepicker3').on('change', function(){
		fnYyDtmStup(2,'text_date1',$('#datepicker3').val());
		$('.datepicker-active').focus();
		$('.datepicker-btn').removeClass('datepicker-active');
	});
	
	$('#datepicker4').datepicker({
		showOn:"button",
		buttonImage:"/resources/images/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"조회종료일 선택 달력",
		minDate: -90,
		maxDate: 0,
		beforeShow: function(){
			var date_offset = $(this).parents('.date_picker_wrap').offset();
			var date_width  = $(this).parents('.date_picker_wrap').outerWidth();
			var date_height = $(this).parents('.date_picker_wrap').outerHeight();
			var picker_width = $('#ui-datepicker-div').outerWidth();
			if($('body').width() == 320){
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : 0
					});
				});
			}else {
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : (date_offset.left + date_width) - picker_width
					});
				});
			}
		}
	});
	$('#datepickerE').datepicker({
		showOn:"button",
		buttonImage:"/resources/images/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"달력",
		minDate: -90,
		maxDate: 0,
		beforeShow: function(){
			var date_offset = $(this).parents('.date_picker_wrap').offset();
			var date_width  = $(this).parents('.date_picker_wrap').outerWidth();
			var date_height = $(this).parents('.date_picker_wrap').outerHeight();
			var picker_width = $('#ui-datepicker-div').outerWidth();
			if($('body').width() == 320){
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : 0
					});
				});
			}else {
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : (date_offset.left + date_width) - picker_width
					});
				});
			}
		}
	});
	$('#datepicker4, #datepickerE').on('change', function(){
		fnYyDtmStup(2,'text_date2',$('#datepicker4, #datepickerE').val());
		$('.datepicker-active').focus();
		$('.datepicker-btn').removeClass('datepicker-active');
	});
	
	
	$('#datepicker5').datepicker({
		showOn:"button",
		buttonImage:"/resources/images/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"달력",
		minDate: -90,
		maxDate: 0,
		beforeShow: function(){
			var date_offset = $(this).parents('.date_picker_wrap').offset();
			var date_width  = $(this).parents('.date_picker_wrap').outerWidth();
			var date_height = $(this).parents('.date_picker_wrap').outerHeight();
			var picker_width = $('#ui-datepicker-div').outerWidth();
			if($('body').width() == 320){
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : 0
					});
				});
			}else {
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : (date_offset.left + date_width) - picker_width
					});
				});
			}
		}
	});
	$('#datepicker5').on('change', function(){
		fnYyDtmStup(2,'text_date1',$('#datepicker5').val());
		$('.datepicker-active').focus();
		$('.datepicker-btn').removeClass('datepicker-active');
	});
	
	$('#datepicker6').datepicker({
		showOn:"button",
		buttonImage:"/resources/images/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"달력",
		minDate: -90,
		maxDate: 0,
		beforeShow: function(){
			var date_offset = $(this).parents('.date_picker_wrap').offset();
			var date_width  = $(this).parents('.date_picker_wrap').outerWidth();
			var date_height = $(this).parents('.date_picker_wrap').outerHeight();
			var picker_width = $('#ui-datepicker-div').outerWidth();
			if($('body').width() == 320){
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : 0
					});
				});
			}else {
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : (date_offset.left + date_width) - picker_width
					});
				});
			}
		}
	});
	$('#datepicker6').on('change', function(){
		fnYyDtmStup(2,'text_date2',$('#datepicker6').val());
		$('.datepicker-active').focus();
		$('.datepicker-btn').removeClass('datepicker-active');
	});
	
	$('#frpsDatepicker1').datepicker({
		showOn:"button",
		buttonImage:"/resources/images/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"조회시작일 선택 달력",
		minDate: -90,
		maxDate: 0,
		beforeShow: function(){
			var date_offset = $(this).parents('.date_picker_wrap').offset();
			var date_width  = $(this).parents('.date_picker_wrap').outerWidth();
			var date_height = $(this).parents('.date_picker_wrap').outerHeight();
			var picker_width = $('#ui-datepicker-div').outerWidth();
			if($('body').width() == 320){
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : 0
					});
				});
			}else {
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : (date_offset.left + date_width) - picker_width
					});
				});
			}
		}
	});

	$('#frpsDatepicker1').on('change', function(){
		fnYyDtmStup(2,'text_date1',$('#frpsDatepicker1').val());
		$('.datepicker-active').focus();
		$('.datepicker-btn').removeClass('datepicker-active');
	}); 
	
	$('#frpsDatepicker2').datepicker({
		showOn:"button",
		buttonImage:"/resources/images/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"조회종료일 선택 달력",
		minDate: -90,
		maxDate: 0,
		beforeShow: function(){
			var date_offset = $(this).parents('.date_picker_wrap').offset();
			var date_width  = $(this).parents('.date_picker_wrap').outerWidth();
			var date_height = $(this).parents('.date_picker_wrap').outerHeight();
			var picker_width = $('#ui-datepicker-div').outerWidth();
			if($('body').width() == 320){
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : 0
					});
				});
			}else {
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : (date_offset.left + date_width) - picker_width
					});
				});
			}
		}
	});
	
	$('#frpsDatepicker2').on('change', function(){
		fnYyDtmStup(2,'text_date2',$('#frpsDatepicker2').val());
		$('.datepicker-active').focus();
		$('.datepicker-btn').removeClass('datepicker-active');
	});
	
	// 영수증 발행 리스트 달력
	$('#datepicker7').datepicker({
		showOn:"button",
		buttonImage:"/resources/images/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"예매/승차일 선택 달력",
		maxDate: 90,
		minDate: -90,
		beforeShow: function(){
			var date_offset = $(this).parents('.date_picker_wrap').offset();
			var date_width  = $(this).parents('.date_picker_wrap').outerWidth();
			var date_height = $(this).parents('.date_picker_wrap').outerHeight();
			var picker_width = $('#ui-datepicker-div').outerWidth();
			if($('body').width() == 320){
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : 0
					});
				});
			}else {
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : (date_offset.left + date_width) - picker_width
					});
				});
			}
		}
	});
	$('#datepicker7').on('change', function(){
		fnYyDtmStup(2,'text_date1',$('#datepicker7').val());
		$('.datepicker-active').focus();
		$('.datepicker-btn').removeClass('datepicker-active');
	});
	
	// 영수증 발행 승차정보 리스트 달력
	$('#datepicker8').datepicker({
		showOn:"button",
		buttonImage:"/resources/images/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"출발일 선택 달력",
		maxDate: 90,
		minDate: -90,
		beforeShow: function(){
			var date_offset = $(this).parents('.date_picker_wrap').offset();
			var date_width  = $(this).parents('.date_picker_wrap').outerWidth();
			var date_height = $(this).parents('.date_picker_wrap').outerHeight();
			var picker_width = $('#ui-datepicker-div').outerWidth();
			if($('body').width() == 320){
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : 0
					});
				});
			}else {
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : (date_offset.left + date_width) - picker_width
					});
				});
			}
		}
	});
	$('#datepicker8').on('change', function(){
		fnYyDtmStup(2,'text_date2',$('#datepicker8').val());
		$('.datepicker-active').focus();
		$('.datepicker-btn').removeClass('datepicker-active');
	});
	
	/* 노선조회 레이어팝업*/
	$('.remodal').each(function(){
		if( $(this).hasClass('full')){
			//$('.remodal').parents('.remodal-wrapper').addClass('full');
			$(this).parent().addClass('full');
		}
	});	
		
	// focus
	/*$('.pop_place .place li').on('click',function(){
		$('.pop_place .place li').removeClass('focuson');
		$(this).addClass('focuson').parents('place').addClass('focus');
		//$(this).find('.val_txt').text('');
	});*/

	$('.pop_place .place .text').each(function(){
		if ( $(this).find('.val_txt').text() == "" ){
			$(this).addClass('empty');
		}
	});
	
	/* 자동검색 */
	var serchInput = $('.pop_place .search_wrap input');
	serchInput.focusin(function(){
		$(this).parents('p').addClass('focus');
	});
	serchInput.focusout(function(){
		$(this).parents('p').removeClass('focus');
	});

	/* 지역별터미널 지역선택 */
	var placeList = $('.pop_place .start_wrap span, .pop_place .area_list li')
	placeList.on('click',function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});

	/* 스크롤 */
	if ( $('html').hasClass('pc') ){
		$('.pop_place .area_scroll').scrollbar();
		$('.pop_place .terminal_scroll').scrollbar();
		$('.agreement_cont').scrollbar();
		//$('.bus_time').scrollbar();
		$('.main_box .shuttle').scrollbar();
		$('.pop_cont_wrap').scrollbar();
		$('.popTicket_history .cont').scrollbar();
		$('.popPay_detail .cont').scrollbar();
		$('.pop_use_route .cont.scrollbar-inner').scrollbar(); /* 190121 수정 : .pop_pass_route .cont → .pop_use_route .cont.scrollbar-inner */
		$('.pop_pass_history .cont.scrollbar-inner').scrollbar(); /* 181206 추가 */
	}

	/** 170207 최하경 수정
	 * Ajax로 데이터를 가져와서 새로 뿌려주면 작동하지 않아서
	 * Ajax 동작 후 선언하도록 수정
	 * **/
	// notice slide
/*	var noticeSlide = $('.slide_notice').bxSlider({
		prevSelector : '.notice_btns .prev',
		nextSelector : '.notice_btns .next',
		auto : false,
		pager : false,
		infiniteLoop : false,
		hideControlOnEnd : true
	});*/

	var footSlide = $('.foot_slide').bxSlider({
		minSlides: 3,
		maxSlides: 8,
		moveSlides: 1,
		slideWidth: 76,
		slideMargin: 20,
		auto : false,
		pager : false,
		infiniteLoop : false,
		responsive: true,
		controls: true,
		hideControlOnEnd : true
	});

	/** 170217 최하경 수정
	 * 게시물 개수에 따라 bxSlider 적용 옵션이 달라짐
	 * **/
	if($('.ticket_slide').children('li').length > 1){
		var footSlide = $('.ticket_slide').bxSlider({
			mode :'fade',
			minSlides: 2,
			moveSlides: 1,
			auto : false,
			//pager : false,
			infiniteLoop : false,
			responsive: true,
			controls: true,
			hideControlOnEnd : true
		});
	} else {
		var footSlide = $('.ticket_slide').bxSlider({
			mode :'fade',
			minSlides: 2,
			moveSlides: 1,
			auto : false,
			pager : false,
			infiniteLoop : false,
			responsive: true,
			controls: true,
			hideControlOnEnd : true
		});
	}

	// selectbox 
	$('.select-box select').selectric({
		maxHeight: 500
	});
	
	//프리패스 노선조회 팝업
	$('.pop_pass_route .select-box select').selectric({
		maxHeight: 350
	});
	if ( winW < 1280 && winW > 767 ) {
		$('.select-box select').selectric({
			disableOnMobile: false
		});
		$('.remodal-wrapper.freeRoute').height(winH);
	} else if (winW >= 1280 && (!chkUserAgentPCYN())) {
		$('.select-box select').selectric({
			disableOnMobile: false
		});
		$('.remodal-wrapper.freeRoute').height(winH);
	}


	/* 배차조회*/
	$('#busDate').datepicker({
		showOn:"button",
		buttonImage:"/resources/images/ico_calender.png",
		buttonImageOnly:true,
		buttonText:"달력",
		minDate: 0,
		beforeShow: function(){
			var date_offset = $('.detailBox_head ').offset();
			var date_width  = $('.detailBox_head ').outerWidth();
			var date_height = $('.detailBox_head ').outerHeight();
			var picker_width = $('#ui-datepicker-div').outerWidth();
			if($('body').width() == 320){
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : 0
					});
				});
			}else {
				setTimeout(function(){
					$('#ui-datepicker-div').css({
						"top" : date_offset.top + date_height ,
						"left" : (date_offset.left + date_width) - picker_width
					});
				});
			}
		}
	});
	$('#busDate').on('change', function(){
		//$('.date_cont').text($('#busDate').val());
		fnAlcnYyDtmStup(2,$('#busDate').val());
	});
	
	if ( $('body').hasClass('EN') ){
		$(".hasDatepicker").datepicker("option",$.datepicker.regional["en-GB"]);
	} else if ( $('body').hasClass('CN') ){
		$(".hasDatepicker").datepicker("option",$.datepicker.regional["zh-CN"]);
	} else if ( $('body').hasClass('JP') ){
		$(".hasDatepicker").datepicker("option",$.datepicker.regional.ja);
	} else {
		$(".hasDatepicker").datepicker("option",$.datepicker.regional["ko"]);
	}

	// return false : .noselect a , .date_wrap a
	$('.bustime_wrap .noselect a, .date_wrap a').on('click',function(){
		return false;
	});

	//input[type=text]에 공백만 들어갔을 시 공백 삭제
	function trim(str){
		if(str == null || typeof str == 'undefined') return "";
		return str.replace(/^\s+|\s+$/g, "");
	}
	var inputSelector = $('input[type=text], input[type=password]');
	inputSelector.on('focusout', function(){
		var val = $(this).val(),
			Val = trim(val);
		$(this).val(Val);
	});

	//placeholder
	$('.box_label').each(function(){
		$('.input').on({
			'click' : function(){
				$(this).prev('label').addClass('empty');
			},
			'focus' : function(){
				$(this).prev('label').addClass('empty');
			},
			'focusout' : function(){
				if(!$(this).val() == ''){
					return false;
				}else{
					$(this).prev('label').removeClass('empty');
				}
			}
		});
	});

	// 모바일티켓발권 체크해제시 팝업
	$('.ticket_chk input').each(function(){
		if( $(this).is(":checked") ){
			$(this).parent('.custom_radio').addClass('active');
		}
	});

	var tCurrent= -1;
	$('.ticket_chk input').on('click',function(){
		var idx = $('.ticket_chk input').index(this);
		if ( tCurrent != idx ){
			$('.ticket_chk .custom_radio').removeClass('active');
			$(this).parent('.custom_radio').addClass('active');
		} else {
			$(this).parent('.custom_radio').removeClass('active');
		}
/*		if ( idx == 1 ){
			$('[data-remodal-id=popTchange]').remodal().open();
		}*/
	});
	$('.remodal-wrapper.tchange').on('click',function(){
		$(this).find('.remodal-cancel').click();
	});
	
	$('.remodal-wrapper.plogin').on('click',function(){
		$(this).find('.remodal-close').click();
	});

	payH();

	/* 결제정보입력 tab */
	$('.inradio .tabs').each(function(){
		var tabCnt = $(this).find('li:visible').size();
		var agent = navigator.userAgent.toLowerCase();
		if ( (navigator.userAgent.search('Trident') <= 0) && (agent.indexOf('MSIE') <= 0 ) ){
			// 20240527 크롬 계좌이체 허용
//			 //$(this).find('.pay_account').hide();
//			 if ( winW > 767) {
//				 if($("#rtrpYn").val() == "N"){
//					// tabCnt = tabCnt -1;
//				 }
//			 }
		}
		$(this).addClass('col'+tabCnt);
	});

	$('.tab_wrap.inradio .tabs > li').on('click',function(){
		var idx= $(this).index();
		$(this).parent('.tabs').siblings('.tab_conts').hide().eq(idx).show();
		$('.tab_wrap.inradio .tabs > li').removeClass('active');
		$(this).addClass('active');
		payH();

		/* 190109 추가 */
		var tab_desc_id = $(this).closest('.tab_wrap').attr('data-desc-id');
		if(tab_desc_id) {
			$('#'+tab_desc_id).find('.tab_desc').eq(idx).addClass('active').siblings('.tab_desc').removeClass('active');
		}
	});
	
	/* 이용약관 전체체크 */
	$("#agreeAll").on('click',function(){
		if($(this).is(":checked")){
			$(".agreement_wrap input[type=checkbox]").each(function(){
				$(this).prop("checked", true);
			});
		} else {
			$(".agreement_wrap input[type=checkbox]").each(function(){
				$(this).prop("checked", false);
			});
		}
	});
	$(".agreement_wrap input[type=checkbox]").on('click',function(){
		var all = true;		
		$(".agreement_wrap input[type=checkbox]").each(function(){
			if(!$(this).is(":checked")) {
				all = false;
				return all;
			}
		});
		$("#agreeAll").prop("checked", all);

		var allcnt = $(".agreement_wrap input[type=checkbox]").length;
		var chkcnt = $(".agreement_wrap input[type=checkbox]:checked").length;

		if ( allcnt == chkcnt ) {
			$('.agree_all').addClass('active');
		} else {
			$('.agree_all').removeClass('active');
		}
	});

	$('.chk_bor input').on('click',function(){
		if ( $(this).is(":checked") ){
			$(this).parents('.chk_bor').addClass('active');
		} else {
			$(this).parents('.chk_bor').removeClass('active');
		}
	});

	/* faq */
	fCurrent = -1;
	$('.faq dt').on('click',function(){
		var idx = $(this).index();
		var answer = $(this).next('dd');
		if (  fCurrent != idx ) {
			$('.faq dt').removeClass('active');
			$('.faq dd').hide();
			$(this).addClass('active');
			answer.show().addClass('active');
			fCurrent = idx;
		} else {
			$(this).toggleClass('active');
			answer.toggle().toggleClass('active');
		}
	});

	// 고속사별 유실물센터 리스트 테이블
	$('.tbl_type1.responsive.col3 tbody td:first-child').addClass('branch');
	$('.tbl_type1.responsive.col3 tbody td:nth-child(2)').addClass('addr');
	$('.tbl_type1.responsive.col3 tbody td:nth-child(3)').addClass('tel');

	$('.tbl_type1.responsive.col2 tbody td:first-child').addClass('branch');
	$('.tbl_type1.responsive.col2 tbody td:nth-child(2)').addClass('tel');
	
	// 정액권 정기권 사용내역 리스트 테이블
	$('.popTicket_history .responsive tbody td:first-child').addClass('date');
	$('.popTicket_history .responsive tbody td:nth-child(2)').addClass('group');
	$('.popTicket_history .responsive tbody td:nth-child(3)').addClass('from');
	$('.popTicket_history .responsive tbody td:nth-child(4)').addClass('to');
	$('.popTicket_history .responsive tbody td:nth-child(5)').addClass('bus_info');
	
	// 마이페이지 결제내역 상세 리스트테이블
	$('.popPay_detail .responsive tbody td:first-child').addClass('grade');
	$('.popPay_detail .responsive tbody td:nth-child(2)').addClass('from');
	$('.popPay_detail .responsive tbody td:nth-child(3)').addClass('to');
	$('.popPay_detail .responsive tbody td:nth-child(4)').addClass('ticket_num');
	$('.popPay_detail .responsive tbody td:nth-child(5)').addClass('seat_num');
	$('.popPay_detail .responsive tbody td:nth-child(6)').addClass('ticket_type');
	$('.popPay_detail .responsive tbody td:nth-child(7)').addClass('ticket_status');

	/* 상품구매-정액권 tooltip */
	$('.tooltip').hide();
	var tipClick = $('.tip_click, .login_title .main_tip');
	tipClick.on('click',function(){
		$(this).next('.tooltip').show();
		$(this).attr('aria-expanded', 'true');
		return false;
	});
	$('.tooltip .close').on('click',function(){
		$(this).parent().hide();
		$(this).parent('.tooltip').prev().attr('aria-expanded', 'false');
		return false;
	});

	$('.box_inputForm').each(function(){
		$(this).find('strong').on('click',function(){
			$(this).next().find('label').click();
		});
	});

//	$('.date_picker_wrap').each(function(){
//		$(this).on('click',function(){
//			$(this).toggleClass('show_date');
//			if ( $(this).hasClass('show_date') ){
//				$(this).find('img').click();
//			}
//		});
//	});

	/* 모바일 back */
	$('.title_wrap .back').on('click',function(event){
		try {event.preventDefault();} catch (e) {};
		history.back(1);
	});

	/* 메인 메뉴 탭 */
	$('.main .main_cont').hide();
	$('.main .main_cont').eq(0).show();
	var mainCurrent = -1;
	$('.main_tab a').on('click',function(){
		var idx = $(this).index();
		// ST : 20190509 수정
		if(idx == 3 || idx == 4){
			return false;
		} else {
			$('.main_tab a').removeClass('on');
			$(this).addClass('on');
			$('.main .main_cont').hide();
			$('.main .main_cont').eq(idx).show();
		}
		// ED : 20190509 수정
	});

	// 메인 공지팝업
	if ( $('body.main .noti_pop').length > 0){
		$('.pop_dimmed').show();
		mainPop();
	}

	// .btn.multi
	$('.btns.multi').each(function(){
		var btnCnt = $(this).find('a:visible').size();
		$(this).addClass('col'+btnCnt);
		btnCnt = btnCnt -1;
		$(this).find('a:visible').eq(0).addClass('first');
		$(this).find('a:visible').eq(btnCnt).addClass('last');
	});

	// 모바일 인덱스 height
	$('.mobile_index').height(winH);
	
	//로딩
	$('.remodal .loading').addClass('pop');
	
	var loadT = 0;
	var loadH = 0;
	var loadHNewKor = 0;
	var loadL = $('.load').width()/2;
	
	if ( winW < 768 ) {
		loadT = $('.title_wrap').height()+7;
		loadH = $('#contents').height();
		loadHNewKor = $('#new-kor-content').height();

		$('.remodal .loading p').css('top', winH/2);
	} else {
		loadT = $('.title_wrap').height()+75;
		loadH = $('#contents').height() - loadT;
		loadHNewKor = $('#new-kor-content').height() - loadT;
		loadL = loadL - ($('#gnb').width()/2);
	}
	
	
	if ($('#new-kor-content').length > 0) {
		$('.loading').height(loadHNewKor);
	} else {
		$('.loading').height(loadH);
	}
	
	$('.loading').css('top',loadT);
	$('.loading p').css('margin-left',-loadL);

	//좌석선택 페이지에서 사용 url : /KOR/ticketing/select_seat.html
		
	//dimm 화면 버튼 클릭시 dimm 삭제
	$('.dimm .btnS').on('click',function(){
		$('.dimm').hide();
	});
	
	//예매 수량 선택
	$('.countBox').each(function(){
		$(this).find('.btn_add').on('click', function(){
			fnSeatCnt(this,"add");
		});
		$(this).find('.btn_minus').on('click', function(){
			fnSeatCnt(this,"min");
		});
	});//좌석선택 페이지에서 사용 끝
	
	//배차조회에서 사용 url : /KOR/ticketing/search_result.html
	$('.time li a').on('click', function(){
		clickLeftTime(this);
	});	
	
	//터미널 안내
	$('.sel_terminal select').on('change', function(){
		var val = $(this).val();
		var arr = new Array();
		for(var i = 0; i < $('.sel_terminal select option').length ; i++){
			arr[i] = $('.sel_terminal select option').eq(i).val();
			if(val == '전체' || val == 'Nationwide' || val == '全国'){
				$('.sort table tbody tr').show();
			}else if(val == arr[i]){
				$('.sort table tbody tr').hide();
				$('.sort table tbody tr[data-label='+ arr[i] + ']').show();
			}
		}
	});
	
	// 요금보기팝업
	$('.btn_price').on('click',function(){
		$('[data-remodal-id=popPrice]').remodal().open();
	});
	
	// 노선조회 등급
	var gradeL = ($('.grade').width() - ( $('.grade .gradeAll').width() + $('.grade .grade1').width() + $('.grade .grade2').width() + $('.grade .grade3').width() + 33 ))/3;
	gradeL = gradeL < 0 ? 0 : gradeL;
	$('.route_box .grade .custom_radio').css('margin-left',  gradeL);
	
	// 좌석번호 border-top
	$('.seat_detail').each(function(){
		$(this).find('li').eq(0).css('border-top','none');
	});
	
	if ( winW < 768 ){
		 $('#arriveIframe').height($(window).height() - $('.title_wrap').height());
	 } else if( winW < 828 ) {
		$('#arriveIframe').height( $(window).height() - ($('.title_wrap').height()+49) );
	 } else if( winW < 1280 ) {
		 $('#arriveIframe').height(1278);
	 } else {
		 $('#arriveIframe').height(1149);
	 }
	
	// 프리패스 시작일설정
	// 달력 컨트롤러 생성 및 초기화 (선택divID,주중주말선택)
	var calendar = new calController("calendarDiv","A");
	calendar.init();

	$("#dateSelectStyle").bind("change",function() {
		$("#calendarVal").html("");
		calendar = new calController("calendarDiv",this.value);
		calendar.init();
	});
	
}); //$(document).ready();

//배차조회에서 사용 url : /KOR/ticketing/search_result.html
var ctrl = true;
var $target = null;
var $targetNum = null;
var pos = null;
function clickLeftTime(thisObj) {
	var dataNum = $(thisObj).data('time');
	var currentScrollTop = $('.bus_time').scrollTop();
	$('.time li').removeClass('active');
	$(thisObj).parent().addClass('active');
	$target = $('.bus_time p[data-time='+ dataNum + ']');
	var chkOk = false;
	var tmpTimeOk = null;
	var $targetOk = null;
	$('.bus_time p').each(function(index) {
		var tmpTime = $(this).data("time");
		if (tmpTime != null && tmpTime != undefined && tmpTime != "") {
			tmpTimeOk = tmpTime;
			$targetOk = $(this);
			if (tmpTime >= dataNum) {
				dataNum = tmpTimeOk;
				$target = $targetOk;
				chkOk = true;
				return false;
			}
		}
	});
	if ((!chkOk) && tmpTimeOk != null && $targetOk != null) {
		dataNum = tmpTimeOk;
		$target = $targetOk;
	}
	$targetNum = $target.data('time');
	if(Number(dataNum) < Number($("#timeLinkMin").val())){
		dataNum = $("#timeLinkMin").val();
	}
	if(Number(dataNum) > Number($("#timeLinkMax").val())){
		dataNum = $("#timeLinkMax").val();
	}
	if(ctrl){
		ctrl = false;
		if(dataNum == $targetNum){
			pos = $target.position().top;
			$('.bus_time').stop().animate({scrollTop : pos + currentScrollTop},300, function(){
				ctrl=true;	
				// yahan
//				$($target).children('a').focus();
				var $childAnchor = $target.children('a');
				if ($childAnchor.length) {
					$childAnchor.focus();
				} else {
					$target.focus();
				}
			});
		}else{
			ctrl = true;
			return false;
		}
	}//배차조회에서 사용 끝
}

// 운행정보 도착시간안내 iframe height
function resize(i){
	var height = i.contentWindow.document.body.scrollHeight;
	i.height = height+20;
}

// 결제정보입력 - 결제금액박스 height
function payH() {
	if ( winW >= 1280) { // 181130 수정
		var paymentH = $('.custom_input .tab_wrap').height();
		paymentH = paymentH - 30;
		if ( $('.custom_input').length ){
			if (  paymentH > 250 ) {
				$('.payment_sum').height(paymentH);
				$('.payment_sum .btn').addClass('bottom');
			} else {
				$('.payment_sum').height('auto');
				$('.payment_sum .btn').removeClass('bottom');
			}
		}
	}
}

 // 메인공지팝업
 function mainPop() {
	$('.noti_pop_wrap').show();
	var totalCnt = $('.noti_pop').length;
	var wrapW = $('#contentWrap').width();
	var firstCnt = parseInt(wrapW / 320);		 
	var top, left, enter, index, type;	
	var contMax = $('.main #contents').height() - ($('.main #footer').height() + 60) - ($('.noti_pop .pop_top').height() + $('.noti_pop .btns').height() + 46);
	$('.noti_pop .pop_cont_wrap').css('max-height',contMax);

	 if ( $(window).width() > 767){
		 for ( var i = 0; i < totalCnt ; i++) {
			index = 920+(i*10);
			$('.noti_pop').eq(i).css('z-index',index);		
			 enter = parseInt( i / firstCnt );
			 left =(i%firstCnt)*320;
			$('.noti_pop').eq(i).css('left',left);
			 if ( !i < firstCnt ){
				for ( var j = 0; j < firstCnt; j++ ){
					top = j * enter * 10;
					$('.noti_pop').eq(i).css('top',top);
					$('.noti_pop').eq(i).find('.pop_cont_wrap').css('max-height',contMax - top);
				 }
			 }
		 }
	 } else {
		$('.noti_pop').css('left',0);
		var winH = $(window).height();		
		var otherH = $('.noti_pop .pop_top').height() + $('.noti_pop .btns').height() + 46;
		var conH = winH - otherH;
		for ( var i = 0; i < totalCnt ; i++) {
			index = 920+(i*10);
			$('.noti_pop').eq(i).css('z-index',index);
			top = i*10;
			$('.noti_pop').eq(i).css('top',top);
			$('.noti_pop .pop_cont_wrap').eq(i).height(conH-40-top);
		}
	 }

	 $('.noti_pop .pop_close').on('click',function(){
		 $(this).parents('.noti_pop').hide();
		 if ( $('.noti_pop:visible').size() == 0){
			$('.pop_dimmed').hide();
			$('.noti_pop_wrap').hide();
		 }
	 });

	 for ( i=0; i < totalCnt; i++){
		 if ( i < 4){
			 type = i + 1;
			 $('.noti_pop').eq(i).addClass('type'+type);
		 } else {
			 type =  (i%4)+1;
			 $('.noti_pop').eq(i).addClass('type'+type);
		 }
	 }

	 $('.pop_dimmed').on('click',function(){
		$('.pop_dimmed').hide();
		$('.noti_pop_wrap').hide();
		$('.noti_pop').hide();
	 });

 }

 // 프리패스 시작일설정
 // 달력 컨트롤러
function calController(target,dateStyle) {

	// 달력 스타일 ["A":주중선택,"B":주말선택]
	if (dateStyle == "A") {
		selectDate = [null,null,null,null];
	} else {
		selectDate = [null,null,null];
	}
	var that = this;
	var m_oMonth = new Date();
	m_oMonth.setDate(1);

	this.init = function() {
		that.renderCalendar();
		that.initEvent();
	}

	// 달력 UI 생성
	this.renderCalendar = function() {
		var toDayDt = new Date();
		if(m_oMonth.yyyymmdd().substring(0,6) > toDayDt.yyyymmdd().substring(0,6)) {
			$("#btnPrev").removeClass("no-click");
		} else {
			$("#btnPrev").addClass("no-click");
		}
		var arrTable = [];

		arrTable.push("<table><colgroup>");
		for(var i = 0 ; i < 7 ; i++) {
			arrTable.push("<col width='14%'>");
		}
		arrTable.push("</colgroup><thead><tr>");

		var arrWeek = new Array();
		if(typeof lngCdCookie != "undefined"){
			if (lngCdCookie == "EN"){
				arrWeek = "Su|Mo|Tu|We|Th|Fr|Sa".split("|");
			} else if (lngCdCookie == "CN"){
				arrWeek = "日一二三四五六".split("");
			} else if (lngCdCookie == "JP"){
				arrWeek = "日月火水木金土".split("");
			} else {
				arrWeek = "일월화수목금토".split("");
			}
		}

		for(var i = 0, len = arrWeek.length ; i < len ; i++) {
			var sClass = "";
			var chkMod = i % 7;
			if (dateStyle == "A") {
				sClass += chkMod == 0 || chkMod == 5 || chkMod == 6 ? "no-select " : "";
			} else {
				sClass += 1 <= chkMod && chkMod <= 4 ? "no-select " : "";
			}
			sClass += chkMod == 0 ? "sun " : "";
			sClass += chkMod == 6 ? "sat " : "";
			arrTable.push("<th class='" + sClass + "'>" + arrWeek[i] + "</th>");
		}
		arrTable.push("</tr></thead>");
		arrTable.push("<tbody>");

		var oStartDt = new Date(m_oMonth.getTime());
		// 1일에서 1일의 요일을 빼면 그 주 첫번째 날이 나온다.
		oStartDt.setDate(oStartDt.getDate() - oStartDt.getDay());

		for(var i = 0 ; i < 100 ; i++) {
			var chkMod = i % 7;
			if(chkMod == 0) {
				arrTable.push("<tr>");
			}

			var sClass = "date-cell ";
			sClass += m_oMonth.getMonth() != oStartDt.getMonth() ? "not-this-month " : "";
			if (dateStyle == "A") {
				sClass += chkMod == 0 || chkMod == 5 || chkMod == 6 ? "no-select " : "";
			} else {
				sClass += chkMod >= 1 && chkMod <= 4 ? "no-select " : "";
			}
			sClass += chkMod == 0 ? "sun " : "";
			sClass += chkMod == 6 ? "sat " : "";
			sClass += oStartDt.yyyymmdd("") == toDayDt.yyyymmdd("") ? "today-date " : "";

			var aTag = oStartDt.getDate();
			if ((dateStyle == "A" && 1 <= chkMod && chkMod <= 4) || (dateStyle == "B" && (chkMod == 0 || chkMod == 5 || chkMod == 6))) {
				if (oStartDt.yyyymmdd("") < toDayDt.yyyymmdd("")) {
					sClass += sClass.indexOf("no-select") < 0 ? "no-select " : "";
				} else {
					aTag = "<a href='#' data-date='" + oStartDt.yyyymmdd("-") + "'>" + oStartDt.getDate() + "</a>";
				}

				if (selectDate) {
					if (selectDate[selectDate.length - 1] != null) {
						for (var ii = 0 ; ii < selectDate.length ; ii++) {
							if (selectDate[ii] == oStartDt.yyyymmdd("-")) {
								sClass += "select-date ";
								break;
							}
						}
					}
				}
			}

			arrTable.push("<td class='" + sClass + "'>" + aTag + "</td>");
			oStartDt.setDate(oStartDt.getDate() + 1);

			if(chkMod == 6) {
				arrTable.push("</tr>");
				if(m_oMonth.getMonth() != oStartDt.getMonth()) {
					break;
				}
			}
		}
		arrTable.push("</tbody></table>");

		$("#" + target).html(arrTable.join(""));

		$("#" + target + " a").click(that.onClickA);
		that.changeMonth();
	}

	// Next, Prev 버튼 이벤트
	this.initEvent = function() {
		$("#btnPrev").unbind("click").click(that.onPrevCalendar);
		$("#btnNext").unbind("click").click(that.onNextCalendar);
	}

	// A 날짜 링크 클릭
	this.onClickA = function(event) {
		try {event.preventDefault();} catch(e) {}
		var this_date = $(this).data("date");
		var intChk = selectDate.length;
		var overDate = null;
		var $targetA = $("#" + target + " a");

		$targetA.parent().removeClass("select-date");
		$targetA.each(function(index) {
			if ($(this).data("date") == this_date) {
				intChk = 0;
			}
			if (intChk < selectDate.length) {
				$(this).parent().addClass("select-date");
				selectDate[intChk] = $(this).data("date");
				overDate = new Date($(this).data("date"));
				intChk++;
			}
		});
		if (intChk < selectDate.length) {
			if (dateStyle == "A") {
				for (var ii = 0 ; ii < 100 ; ii++) {
					overDate.setDate(overDate.getDate() + 1);
					var chkMod = overDate.getDay();
					if (1 <= chkMod && chkMod <= 4) {
						selectDate[intChk] = overDate.yyyymmdd("-");
						intChk++;
						if (intChk >= selectDate.length) {
							break;
						}
					}
				}
			} else {
				for (var ii = 0 ; ii < 100 ; ii++) {
					overDate.setDate(overDate.getDate() + 1);
					var chkMod = overDate.getDay();
					if (chkMod == 0 || chkMod == 5 || chkMod == 6) {
						selectDate[intChk] = overDate.yyyymmdd("-");
						intChk++;
						if (intChk >= selectDate.length) {
							break;
						}
					}
				}
			}
		}

		that.viewDate();
	}

	// 값 확인하기
	this.viewDate = function() {
		var strVal = "";
		var strVal2 = "";
		var tmpMon = null;
		var dateFullStr = ""; 
		for (var i = 0 ; i < selectDate.length ; i++) {
			var setDate = new Date(selectDate[i]);
			var strSetDate = setDate.yyyymmdd(".");
			if(i != selectDate.length - 1){
				dateFullStr += setDate.yyyymmdd();
				dateFullStr += "|";
			} else {
				dateFullStr += setDate.yyyymmdd();
			}
			strVal += "<p>" + setDate.yyyymmdd("-") + "</p>";
			if (tmpMon != setDate.getMonth()) {
				tmpMon = setDate.getMonth();
				if (strVal2 != "") {
					strVal2 += ",&nbsp;"
				}
				strVal2 += strSetDate.substring(0,7) + ".<strong class='accent'>" + strSetDate.substring(8,10) + "</strong>";
			} else {
				strVal2 += "/<strong class='accent'>" + strSetDate.substring(8,10) + "</strong>";
			}
		}
		//$("#calendarVal").html(strVal + "<br>" + strVal2);
		$("#dateFullStr").val(dateFullStr);
		$("#calendarVal").html(strVal2);
	}

	// 이전 달력
	this.onPrevCalendar = function() {
		var toDayDt = new Date();
		if(m_oMonth.yyyymmdd().substring(0,6) > toDayDt.yyyymmdd().substring(0,6)) {
			m_oMonth.setMonth(m_oMonth.getMonth() - 1);
			that.renderCalendar();
		}
	}

	// 다음 달력
	this.onNextCalendar = function() {
		m_oMonth.setMonth(m_oMonth.getMonth() + 1);
		that.renderCalendar();
	}

	// 달력 이동되면 상단에 현재 년 월 다시 표시
	this.changeMonth = function() {
		$("#currentDate").text(that.getYearMonth(m_oMonth).substr(0,9));
	}

	// 날짜 객체를 년 월 문자 형식으로 변환
	this.getYearMonth = function(oDate) {
		return oDate.getFullYear() + ". " + (oDate.getMonth() + 1);
	}

	// 날짜 format 가져오기 (new Date()).yyyymmdd("-") -> 2017-03-20
	Date.prototype.yyyymmdd = function(str) {
		var delimit = (str != null || str != undefined) ? str : "";
		var mm = this.getMonth() + 1; // getMonth() is zero-based
		var dd = this.getDate();

		return [this.getFullYear(),
			(mm>9 ? '' : '0') + mm,
			(dd>9 ? '' : '0') + dd
		].join(delimit);
	};
}

 /* mobile / tablet / pc 체크 */
 function checkUserAgent(){
 	var sAgent = navigator.userAgent;
 	if (navigator.userAgent.match(/iPhone|Mobile|UP.Browser|Android|BlackBerry|Windows CE|Nokia|webOS|Opera Mini|SonyEricsson|opera mobi|Windows Phone|IEMobile|POLARIS/) != null){
 		$("html").removeClass("pc").removeClass("tablet").addClass("mobile");
 	}else if(navigator.userAgent.match(/tablet|iPad/) != null){
 		$("html").removeClass("pc").removeClass("mobile").addClass("tablet");
 	}else{
 		$("html").removeClass("tablet").removeClass("mobile").addClass("pc");
 	}
 }
 
function chkUserAgentPCYN() {
	if (navigator.userAgent.match(/iPhone|Mobile|UP.Browser|Android|BlackBerry|Windows CE|Nokia|webOS|Opera Mini|SonyEricsson|opera mobi|Windows Phone|IEMobile|POLARIS|tablet|iPad/) != null){
		return false;
	} else {
		return true;
	}
}
 
// select 태그이면 true
function is_select(id){
	if ($("#"+id).prop("tagName") == "SELECT"){
		return true;
	} else {
		return false;
	}
}
/* window resize */
$(window).resize(function(){
	winW = $(window).width();
	winH = $(window).height();	
	
	if ( winH < 910 ){
		$('.main #gnb, .main #contents').height(910);
	} else {
		$('.main #gnb, .main #contents').height(winH);	
	}
	
	//mobile gnb
	$('#gnb.gnb_mobile').width(winW - 60);
	var menu = 	$('#gnb .menu');
	
	if (  winW > 1280 ){
		$('#gnb.gnb_tablet .menu_toggle').removeClass('close').addClass('view');
		menu.removeClass('open');
		$('#contentWrap .dimmed').hide();
	}

	if ( window.innerWidth  < 767){
		var titH = $('#contents .title_wrap').height();
		//titH = titH + 7;
		$('#contents').css('padding-top',titH);

		$('#contentWrap .dimmed').on('click',function(){
			$('#gnb.gnb_mobile').next('.close').click();
		});
	} else {
		$('#contents').css('padding-top',0);
	}

	// mobile 노선조회 직통/환승 영역
	if ( winW < 768 ){
		$('.route_box .tabs').addClass('mobile_tabs');
		$('.route_box .oneway a').on('click',function(){
			$(this).parents('.tabs').addClass('mobile_tabs');
		});
		$('.route_box .roundtrip a').on('click',function(){
			$('.route_box .tabs').removeClass('mobile_tabs');
		});
	} else {
		$('.route_box .tabs').removeClass('mobile_tabs');
	}

	/* 결제정보입력 tab */
	$('.inradio .tabs').each(function(){
		var tabCnt = $(this).find('li:visible').size();
		$(this).removeClass('col'+tabCnt);

		$(this).addClass('col'+tabCnt);		
	});

	// 메인 공지팝업
	if ( $('body.main .noti_pop').length > 0){
		mainPop();
	}
	
	// 노선조회 등급
	var gradeL = ($('.grade').width() - ( $('.grade .gradeAll').width() + $('.grade .grade1').width() + $('.grade .grade2').width() + $('.grade .grade3').width() + 33 ))/3;
	gradeL = gradeL < 0 ? 0 : gradeL;
	$('.route_box .grade .custom_radio').css('margin-left',  gradeL);
	
	if ( winW < 768 ){
		 $('#arriveIframe').height($(window).height() - $('.title_wrap').height());
	 } else if( winW < 828 ) {
		$('#arriveIframe').height( $(window).height() - ($('.title_wrap').height()+49) );
	 } else if( winW < 1280 ) {
		 $('#arriveIframe').height(1278);
	 } else {
		 $('#arriveIframe').height(1149);
	 }
	
	 // 프리패스 노선조회 팝업
	if ( winW < 1280 && winW > 767 ) {
		$('.remodal-wrapper.freeRoute').height(winH);
	}
 }); //$(window).resize();

/* window scroll */
$(window).scroll(function(){
	// 프리패스 노선조회 팝업
	if ( winW < 1280 && winW > 767 ) {
		$('.remodal-wrapper.freeRoute').height(winH);
	}
}); //$(window).scroll();
	
 /* window load function() */
 $(window).load(function(){
	// 결제정보입력 셀렉박스 label color값
	 $('.inselect .select-box').each(function(){
		var txt = $(this).find('.label').text();
		if ( txt == "선택" || txt == "카드를 선택하세요" || txt == "선택하세요." || txt == "이용노선을 선택하세요." || txt == "구매옵션을 선택하세요." || // 190319 수정
				txt == "选择" || txt == "请选择卡种类。" || txt == "Selection" || txt == "Please select a card type." || txt == "Select" || 
				txt == "選択" || txt == "カード種類を選択してください。") {
			$(this).addClass('default_txt');
		} else {
			$(this).find('.label').addClass('add');
		}
	});
	
	$('.select-box.default_txt').each(function(){
		$(this).find('select').change(function(){
			var txt = $(this).find('option:selected').text();
			var label = $(this).parents('.select-box').find('.label');
			
			if ( txt == "선택" || txt == "카드를 선택하세요" || txt == "선택하세요." || txt == "이용노선을 선택하세요." || txt == "구매옵션을 선택하세요." || // 190319 수정
					txt != "选择" || txt != "请选择卡种类。" || txt != "Selection" || txt != "Please select a card type." || 
					txt != "選択" || txt != "カード種類を選択してください。") {
				label.addClass('add');
			}

			if ( $(this).prop('selectedIndex') == 0) {
				label.removeClass('add');
			}

		});
	});
	 
 });
 

/**
 * 버튼클릭 후 가상키보드 실행
 */
function transkeyShow(obj){
	var target = $(obj).data("id");
	$("#"+target).trigger("focus");
}

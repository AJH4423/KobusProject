// new-kor-ui.js

// Skip Nav
$(document).on("click", "#skip a", function (e) {
	setTimeout(function() {
		var tg = $(this).attr("href");
		$(tg).attr("tabindex", "0").focus();
		e.preventDefault();
	}, 100);
});
$(document).ready(function() {
	$('#skip a[href="#new-kor-content"]').click(function(e) {
		e.preventDefault();
		var targetOffset = $('#new-kor-content').offset().top - 184;
		
		$('html, body').animate({
			scrollTop: targetOffset
		}, 5, function() {
			setTimeout(function() {
				$('#new-kor-content').attr('tabindex', '0').focus();
			}, 100);
		});
	});
});

$(document).ready(function () {
	$('.main-input-box #tab-content2').css('display', 'none');
//	var $gnbMenuArea = $(".gnb-menu-area");
//	var iframeContentWindow = $(".ad-frame")[0].contentWindow;
	
	// 광고 프레임 포커싱 외곽선 처리
	$(".ad-frame").each(function () {
		var $iframe = $(this);

		$iframe.on("load", function () {
			var iframeContent = $iframe[0].contentWindow;

			$(iframeContent).on("focus", function () {
				$iframe.addClass("focused");
			});

			$(iframeContent).on("blur", function () {
				$iframe.removeClass("focused");
			});
			
//			$(iframeContentWindow).on("focus", function() {
//				if ($gnbMenuArea.length) {
//					$gnbMenuArea.addClass("opened");
//				}
//			});
//			$(iframeContentWindow).on("blur", function() {
//				if ($gnbMenuArea.length) {
//					$gnbMenuArea.removeClass("opened");
//				}
//			});
		});
	});

	// 퀵메뉴 스크롤 이벤트 처리
	$(window).on("scroll", function () {
		var scrollTop = $(this).scrollTop();
		var $quickMenu = $("#new-kor-quickmenu");

		if (scrollTop >= 294 - 160) {
			$quickMenu.addClass("fixed");
		} else {
			$quickMenu.removeClass("fixed");
		}
	});

	// 퀵메뉴 맨 위로 스크롤
	$("#new-kor-quickmenu .to-top a").on("click", function (e) {
		e.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, "fast");	
		$('#skip').focus();
	});

	// 드롭다운
	$(".dropdown-wrap .btn-dropdown").click(function (event) {
		var $btnSelect = $(this);
		var $dropdownWrap = $btnSelect.closest(".dropdown-wrap");
		var $dropdownList = $btnSelect.next(".dropdown-list");

		$(".dropdown-wrap .dropdown-list").not($dropdownList).hide();
		$(".dropdown-wrap .btn-dropdown").not($btnSelect).attr("aria-expanded", "false");

		// 드롭다운 버튼 높이 값 계산
		var btnHeight = $btnSelect.outerHeight();
		if ($dropdownWrap.hasClass("dropdown-top")) {
			var dropdownHeight = $dropdownList.outerHeight();
			$dropdownList.css("top", -dropdownHeight + "px");
		} else {
			$dropdownList.css("top", btnHeight + "px");
		}

		$dropdownList.toggle();
		if ($dropdownList.is(":visible")) {
			$btnSelect.attr("aria-expanded", "true");
		} else {
			$btnSelect.attr("aria-expanded", "false");
		}

		event.stopPropagation();
	});
	
	//	푸터 관련사이트 드롭다운 접근성 개선
	$(".btn-dropdown").on("click", function() {
		var $dropdownWrap = $(this).closest('.dropdown-wrap');
		var hasNewWindowTitle = $dropdownWrap.find('.dropdown-list a[title="새창"]').length > 0;
		
		if(hasNewWindowTitle) {
			$dropdownWrap.find('.dropdown-list li').removeClass();
		}
	});

	// 드롭다운 목록 클릭 이벤트 (키보드 포커싱)
	$(".dropdown-wrap .dropdown-list a").on("click keydown", function (event) {
		if (event.type === "click" || (event.type === "keydown" && event.key === "Enter")) {
//			var $clickedItem = $(this).parent();
//			var $dropdownList = $clickedItem.parent();
//			var $btnSelect = $dropdownList.prev(".btn-dropdown");
//			var selectedLanguage = $(this).text();
//
//			$dropdownList.find("li").removeClass("selected");
//			$clickedItem.addClass("selected");
//
//			$dropdownList.hide();
//			$btnSelect.attr("aria-expanded", "false");
//
//			// 푸터 관련사이트 이동 드롭다운 제외 적용
//			if (!$dropdownList.parents(".dropdown-wrap").hasClass("related-sites-select")) {
//				$dropdownList.find("a").removeAttr("title");
//				$(this).attr("title", "선택됨");
//				$btnSelect.find(".text").html(selectedLanguage);
//			}
			// yahan 함수분리
			dropdown_process(this);

			// yahan 불필요함 삭제 -> 240909 키보드 포커싱 로직 다시 활성화 처리
			if (event.type === "keydown" && event.key === "Enter") {
				var href = $(this).attr("href");
				var target = $(this).attr("target");

				if (target === "_blank") {
					window.open(href, "_blank");
				} else {
					window.location.href = href;
				}
			}

			// yahan 언어선택 추가
			var langCd = $(this).data("lang");
			if (langCd != null && langCd != ""){
				setCookie("LNG_CD",langCd,1);
				window.location.href = '/main.do';
			}

			event.stopPropagation();
		}
	});
	
	// dropdown 영역 외 클릭 시 dropdown-list 숨기기
	$(document).click(function () {
		var $dropdownList = $(".dropdown-wrap .dropdown-list");
		var $btnSelect = $(".dropdown-wrap .btn-dropdown");

		$dropdownList.hide();
		$btnSelect.attr("aria-expanded", "false");
	});
	$(".dropdown-wrap").click(function (event) {
		event.stopPropagation();
	});

	// 드롭다운 키보드 포커싱
	$(".dropdown-wrap .dropdown-list a").keydown(function (event) {
		var $dropdownList = $(this).parents(".dropdown-list");
		var $btnSelect = $dropdownList.prev(".btn-dropdown");
		var $items = $dropdownList.find("li");
		var currentIndex = $items.index($(this).parent());

		switch (event.key) {
			case "Tab":
				if (event.shiftKey) {
					currentIndex = currentIndex === 0 ? $items.length - 1 : currentIndex - 1;
				} else {
					currentIndex = currentIndex === $items.length - 1 ? 0 : currentIndex + 1;
				}
				$items.eq(currentIndex).find("a").focus();
				event.preventDefault();
				break;
			case "Enter":
				$btnSelect.focus();
				event.preventDefault();
				break;
			case "Escape":
				$btnSelect.focus();
				$dropdownList.attr("aria-expanded", "false");
				$dropdownList.hide();
				event.preventDefault();
				break;
		}
	});

	console.log("inseq : 접근성 스크립트 실행 완료");
});

// yahan 함수분리
function dropdown_process(obj){
	var $clickedItem = $(obj).parent();
	var $dropdownList = $clickedItem.parent();
	var $btnSelect = $dropdownList.prev(".btn-dropdown");
	var selectedLanguage = $(obj).text();

	$dropdownList.find("li").removeClass("selected");
	$clickedItem.addClass("selected");

	$dropdownList.hide();
	$btnSelect.attr("aria-expanded", "false");

	// 푸터 관련사이트 이동 드롭다운 제외 적용
	if (!$dropdownList.parents(".dropdown-wrap").hasClass("related-sites-select")) {
		$dropdownList.find("a").removeAttr("title");
		$(obj).attr("title", "선택됨");
		$btnSelect.find(".text").html(selectedLanguage);
	}
}

$(document).ready(function() {
//	출/도착지 선택 팝업 접근성 포커싱
	var clickedBtn = null;
	
	$('a[onclick="fnReadDeprInfoList(event);"], a[onclick="javascript:fnReadDeprInfoList(event);"]').on('click', function(event) {
		event.preventDefault();
		clickedBtn = $(this);

		setTimeout(function() {
			$('.cont .place #popArvlChc').hide();
			$('.cont .place #popDeprChc').show();
		}, 50);
		
		// 클릭이벤트 중복되어 삭제 20241231 yahan
		// fnReadDeprInfoList(event);
		
//		focusFirstElement();
	})
	$('a[onclick="fnReadArvlInfoList(event);"], a[onclick="javascript:fnReadArvlInfoList(event);"]').on('click', function(event) {
		event.preventDefault();
		clickedBtn = $(this);

		setTimeout(function() {
			$('.cont .place #popDeprChc').hide();
			$('.cont .place #popArvlChc').show();
		}, 50);
		
		// 클릭이벤트 중복되어 삭제 20241231 yahan
		// fnReadArvlInfoList(event);
		
//		focusFirstElement();
	})
	
	$('.remodal-close').on('click', function() {
		if(clickedBtn) {
			clickedBtn.focus();
		}
	})
	$('.remodal-confirm').on('click', function() {
		const currentWrapper = $(this).closest('.remodal-wrapper');
		
		setTimeout(function() {
			const otherWrapperHasOpened = $('.remodal-wrapper').not(currentWrapper).hasClass('remodal-is-opened');
			if (otherWrapperHasOpened) {
				return;
			}
			
			if(clickedBtn) {
				clickedBtn.focus();	
			}
		}, 500);
	})
	
//	출/도착지 선택 팝업 내 포커스 이동
	function focusFirstElement() {
		var focusableElements = $('.remodal').find('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
		if (focusableElements.length > 0) {
			focusableElements.first().focus();
		}
	}	
	$(".remodal-close").on('keydown', function(event) {
		if (event.key === 'Tab' || event.keyCode === 9) {
			if (!event.shiftKey) {
				event.preventDefault();
				focusFirstElement();
			}
		}
	});
	
	$(".start-title").on("keydown", function(event) {
		if (event.shiftKey && event.key === 'Tab') {
			event.preventDefault();
			$(".remodal-close").focus();			
		}
	});
	
	// 노선조회 tab 웹 접근성 개선
	$(".tabs li a").on('click', function(e) {
		e.preventDefault();
		
		var $ul = $(this).closest('ul');
		$ul.find('a').removeAttr('title');
		$(this).attr('title', '선택됨');
	});
	
	// 캘린더 키보드 포커싱
	setTimeout(function() {
		$("#ui-datepicker-div").attr("tabindex", "0");
		$('.ui-datepicker-trigger').removeAttr('title');

		var $img = $('.ui-datepicker-trigger');
		var $button = $('<button type="button" class="datepicker-btn"></button>');
		$img.wrap($button);
	}, 10);
	$(".date_picker_wrap .hasDatepicker").on("click", function() {
		setTimeout(function() {
			$(".ui-datepicker-prev, .ui-datepicker-next").attr("href", "javascript:void(0)")
		}, 10);
	});
	
	$(".date_picker_wrap p.text").on("click", function (event) {
		$(this).addClass('datepicker-active');
		$(this).find("img").click();

		$("#ui-datepicker-div").focus();
		$(".ui-state-disabled").attr("tabindex", "-1");
		$(".ui-datepicker-prev, .ui-datepicker-next").attr("href", "javascript:void(0)");
	});
	$(document).on('keydown', '#ui-datepicker-div', function(e) {
		if (document.activeElement.id === 'ui-datepicker-div') {
			if (e.key === 'Tab' && e.shiftKey) {
				e.preventDefault();
				
				var lastFocusableLink = $('#ui-datepicker-div .ui-datepicker-calendar a').last();
				lastFocusableLink.focus();
			};
		}		
	});
	$(document).on('keydown', '#ui-datepicker-div .ui-datepicker-calendar a', function(e) {
		var lastFocusableLink = $('#ui-datepicker-div .ui-datepicker-calendar a').last();
		if (document.activeElement === lastFocusableLink[0] && e.key === 'Tab' && !e.shiftKey) {
			e.preventDefault();
			$("#ui-datepicker-div").focus();
		}
	});
	$(document).on('click', '#ui-datepicker-div .ui-datepicker-calendar a', function(e) {
		setTimeout(function() {
			e.preventDefault();
			$('.datepicker-active').focus();
			$('.datepicker-btn').removeClass('datepicker-active');
			
		}, 0);
	});
	$(document).on('click', '.ui-datepicker-header .ui-datepicker-prev', function(e) {
		e.preventDefault();
//		$(this).click();
		$(".ui-datepicker-prev, .ui-datepicker-next").attr("href", "javascript:void(0)");
		$(".ui-state-disabled").attr("tabindex", "-1");
		$('.ui-datepicker-prev').focus();
	});
	$(document).on('click', '.ui-datepicker-header .ui-datepicker-next', function(e) {
		e.preventDefault();
//		$(this).click();
		$(".ui-datepicker-prev, .ui-datepicker-next").attr("href", "javascript:void(0)");
		$(".ui-state-disabled").attr("tabindex", "-1");
		$('.ui-datepicker-next').focus();
	});

	// dimm 확인 버튼 키보드 포커싱
	$('.btnS').on('click', function(event) {
		$('.dimm').hide();
		$(this).closest('.dimm').siblings('.detailBox_head').find('.btn_refresh').focus();
	});
	$(document).on("keydown", function(event) {
		if ($('.dimm.dimm_custom .btnS').is(':focus')) {
			if (event.key === 'Tab') {
				event.preventDefault();
				if (alert('확인 버튼을 클릭해 주세요.')) {
					$(this).focus();
				}
			}
		};
	});
	
	$('#reloadBtn').on('keydown', function(e) {
		if (e.key === 'Enter') {
			$(this).click();
		}
	});
	
	// 고속버스 예매 - 배차조회 비활성화 시간 키보드 포커싱 제한
	$(".noselect").attr("tabindex", "-1");
	
	// 고속버스 예매 - 매수 및 좌석선택 색상표기 좌석 title 제공
	$(".selectSeat_box .seatList .seatBox").each(function() {
		var $this = $(this);
		var $input = $this.find('input');
		
		if ($this.hasClass('child')) {
			$input.attr('title', '유아 카시트 가능 좌석');
		} else if ($this.hasClass('parent')) {
			$input.attr('title', '유아 카시트 보호자용 좌석');
		} else if ($this.hasClass('disabled')) {
			$input.attr('title', '예매 완료된 좌석');
		} else if ($this.hasClass('handi')) {
			$input.attr('title', '여성, 노약자 우선 좌석');
		} else if ($this.hasClass('wheel')) {
			$input.attr('title', '휠체어 우선 좌석');
		}
	});
	
	// 고속버스 예매 - 매수 및 좌석선택 버스 이미지 변경
	var viewportWidth = $(window).width();
	
	if (viewportWidth >= 768) {
		$('.bg_seatBox').each(function() {
			var className = $(this).attr('class');
			var match = className.match(/seat(\d+)/);
			if (match) {
				var seatNumber = parseInt(match[1], 10);
				var seatAltText = "";
				
				if (seatNumber === 41) {
					seatNumber = 40;
				}
				if (seatNumber === 27) {
					seatNumber = 28;
				}
				
				
				if (className.includes("seat21")) {
					seatAltText = "버스 내부 도면으로 버스의 전방 좌측에는 운전석, 전방 우측에는 출입구가 위치하고 있습니다. 운전석 뒤로는 1,2번 좌석이 있고, 1,2번 좌석 뒤로 두 개의 좌석씩 4,5,7,8,10,11,13,14,16,17,19,20번 좌석이 있습니다. 출입구 뒤에는 3번 좌석이 있으며, 3번 뒤로 6,9,12,15,18,21번 좌석이 있습니다. 2번과 3번 좌석 사이에는 통로가 있으며, 전체적으로 통로를 중심으로 좌측에 2개 좌석, 우측에 1개 좌석이 위치하며 한 줄에 3개의 좌석씩 7줄로 배치되어 있습니다. 총 21개의 좌석이 있으며 좌석 번호는 왼쪽부터 오른쪽으로 증가합니다."
				} else if (className.includes("seat28")) {
					if (className.includes("seatWheel")) {
						if ($(this).find('.seatList').find('.wheel_r')) {
							seatAltText = "버스 내부 좌석 배치를 보여주는 도면으로 상단 좌측에는 운전석, 우측에는 출입구가 위치하고 있습니다. 좌석 번호는 왼쪽부터 오른쪽으로 증가하며 한 줄에는 좌석이 3개씩, 마지막 줄에만 4개의 좌석이 있습니다. W1 좌석은 휠체어 사용자 전용으로 4번째 줄 오른쪽에 위치하고 있으며, 통로를 중심으로 좌측에 2개, 우측에 1개 좌석이 배치되어 있습니다."
						}
					} else {
						seatAltText = "버스 내부 도면으로 버스의 전방 좌측에는 운전석, 전방 우측에는 출입구가 위치하고 있습니다. 운전석 뒤로는 1,2번 좌석이 있고, 1,2번 좌석 뒤로 두 개의 좌석씩 4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26번 좌석이 있습니다. 출입구 뒤로는 3번 좌석이 있으며, 3번 뒤로 6,9,12,15,18,21,24,28번 좌석이 있습니다. 2번과 3번 좌석 사이에는 통로가 있으며, 전체적으로 통로를 중심으로 좌측에 2개 좌석, 우측에 1개 좌석이 위치하며 한 줄에 3개의 좌석씩 9줄로 배치되어 있습니다. 단, 마지막줄에는 통로 없이 4개의 좌석이 배치되어 있어, 총 28개의 좌석이 있으며 좌석 번호는 왼쪽부터 오른쪽으로 증가합니다."
					}
				} else if (className.includes("seat40")) {
					seatAltText = "버스 내부 도면으로 버스의 전방 좌측에는 운전석, 전방 우측에는 출입구가 위치하고 있습니다. 운전석 뒤로는 1,2번 좌석이 있고, 1,2번 좌석 뒤로 두 개의 좌석씩 5,6,9,10,13,14,17,18,21,22,25,26,29,30,33,34,37,38번 좌석이 있습니다. 출입구 뒤로는 3,4번 좌석이 있으며, 3,4번 좌석 뒤로 두 개의 좌석씩 7,8,11,12,15,16,19,20,23,24,27,28,31,32,35,36,39,40번 좌석이 있습니다. 2번과 3번 좌석 사이에는 통로가 있으며, 전체적으로 통로를 중심으로 좌측에 2개, 우측에 2개 좌석이 위치하며 한 줄에 4개씩 10줄로 배치되어 있습니다. 총 40개의 좌석이 있으며 좌석 번호는 왼쪽부터 오른쪽으로 증가합니다."
				} else if (className.includes("seat45")) {
					seatAltText = "버스 내부 도면으로 버스의 전방 좌측에는 운전석, 전방 우측에는 출입구가 위치하고 있습니다. 운전석 뒤로는 1,2번 좌석이 있고, 1,2번 좌석 뒤로 두 개의 좌석씩 5,6,9,10,13,14,17,18,21,22,25,26,29,30,33,34,37,38,41,42번 좌석이 있습니다. 출입구 뒤로는 3,4번 좌석이 있으며, 3,4번 좌석 뒤로 두 개의 좌석씩 7,8,11,12,15,16,19,20,23,24,27,28,31,32,35,36,39,40,44,45번 좌석이 있습니다. 2번과 3번 좌석 사이에는 통로가 있으며, 전체적으로 통로를 중심으로 좌측에 2개, 우측에 2개 좌석이 위치하며 한 줄에 4개씩 11줄로 배치되어 있습니다. 단, 마지막 줄에는 통로없이 5개의 좌석이 배치되어 있습니다. 총 45개의 좌석이 있으며 좌석 번호는 왼쪽부터 오른쪽으로 증가합니다."
				} else if (className.includes("seat27")) {
					seatAltText = "버스 내부 좌석 배치를 보여주는 도면으로 상단 좌측에는 운전석, 우측에는 출입구가 위치하고 있습니다. 좌석 번호는 왼쪽부터 오른쪽으로 증가하며 한 줄에는 좌석이 3개씩, 첫 번째 줄에만 2개의 좌석이 있습니다. 또한, 통로를 중심으로 좌측에 2개, 우측에 1개 좌석이 배치되어 있습니다."
				} else {
					seatAltText = "버스 내부 좌석 배치를 보여주는 도면으로 상단 좌측에는 운전석, 우측에는 출입구가 위치하고 있으며, 좌석 번호는 왼쪽부터 오른쪽으로 증가합니다."
				}
				
				var imgElement = $('<img>', {
					'src': '/images/kor/common/bg_bus' + seatNumber +'.png',
					'alt': seatAltText
				});
				
				$(this).find('.bg_bus_img').append(imgElement);
			}
		});
	}
	
	// 고속버스 예매 - 매수 및 좌석선택 좌석 키보드 포커싱
	$('.seatBox input').on('keydown', function(e) {
		if (e.which === 13) {
			e.preventDefault();
			$(this).click();
		}
	});
	
	var $generalTicketPopup = $('[data-remodal-id="popTchange"]');
	var $cancelBtn = $generalTicketPopup.find('.remodal-cancel');
	var $confirmBtn = $generalTicketPopup.find('.remodal-confirm');
	
	$confirmBtn.on('keydown', function(e) {
		if (e.key === 'Tab' && !e.shiftKey) {
			e.preventDefault();
			$cancelBtn.focus();
		}
		
		if (e.key === 'Enter') {
			var $generalTicketBtn = $(".ticket_chk.mo_page #nomalTicket");  
			$confirmBtn.click();
			$generalTicketBtn.focus();
			setTimeout(function() {
				$generalTicketBtn[0].scrollIntoView({ behavior: 'smooth', block: 'center'});
			}, 400);
		}
	});
	$cancelBtn.on('keydown', function(e) {
		if (e.key === 'Tab' && e.shiftKey) {
			e.preventDefault();
			$confirmBtn.focus();
		}		
		if (e.key === 'Enter') {
			$generalTicketPopup.parent(".remodal-wrapper").hide();
			$generalTicketPopup.parent(".remodal-wrapper").removeClass('remodal-is-opened').addClass('remodal-is-closed');
			$(".remodal-overlay").removeClass('remodal-is-opened').addClass('remodal-is-closed');
			$(".remodal-overlay").hide();
			$(".ticket_chk.mo_page #moTicket").focus();
			$(".ticket_chk.mo_page #moTicket").click();
			$('#nomalTicket').attr('aria-expanded', 'false');
		}
	});
	$cancelBtn.on('click', function() {
		$('#nomalTicket').attr('aria-expanded', 'false');
	});
	
	$('input[name="ticket"]').on('change', function() {
		if ($('#nomalTicket').is(':checked')) {
			$('#nomalTicket').attr('aria-expanded', 'true');
		} else {
			$('#nomalTicket').attr('aria-expanded', 'false');
		}
	});
	
	// 예매확인/취소/변경 - 취소내역 티켓 타입 체크하여 텍스트 추가
	$('.detail_info_wrap').each(function() {
		var $this = $(this);
		
		var contentBody = $this.closest('.content-body');
		var contentHeader = contentBody.prev('.content-header[data-page-title="예매확인/취소/변경 | 고속버스예매 | 고속버스통합예매"]');
		
		if (contentHeader.length > 0) {
			var text = '';
		
			if ($this.hasClass('ontheSpot')) {
				text = '현장발권';
			} else if ($this.hasClass('homeTicket')) {
				text = '홈티켓';
			} else if ($this.hasClass('mobileTicket')) {
				text = '모바일';
			} else if ($this.hasClass('unissued')) {
				text = '미발행';
			}
			
			$this.find('.sr-only').text(text);	
		}
	});
	
	$(document).on('classChange', function() {
		if ($('.remodal-wrapper.freeRoute').hasClass('remodal-is-opened')) {
			setTimeout(function() {
				$('.remodal-wrapper.freeRoute .remodal').attr('tabindex', '0');
			}, 1000);
		}
	});
	
	// 프리패스 여행권, 정기권 - 툴팁 초점 이동 개선
	var $tooltipClose = $('.tooltip .close');
	var $tipClick = $('.tip_click');
	
	$tipClick.on('keydown', function(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			$(this).next('.tooltip').show();
			$(this).next('.tooltip').find('.close').focus();
			$(this).attr('aria-expanded', 'true');
		}
	});
	$tooltipClose.on('keydown', function(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			$(this).parent('.tooltip').hide();
			$(this).parent('.tooltip').prev('.tip_click').focus();
			$(this).parent('.tooltip').prev('.tip_click').attr('aria-expanded', 'false');
		};
		if (e.key === 'Tab') {
			e.preventDefault();
			$(this).focus();
		};
	});

	// 고속버스 예매 - 왕복 배차조회 텍스트 변경
	$(window).on('load', function() {	
		if($('.route_wrap').hasClass('around')) {
			$('.route_wrap .roundBox.departure.kor dt').text('왕복');
			$('.route_wrap .roundBox.arrive.kor dt').text('왕복');
		}
	});
	

	// 배차조회 프리미엄, 고속할인 라벨 추가
	$('.premium, .premium2').prepend('<span class="label"><span class="sr-only">프리미엄</span></span>');
	$('.express').prepend('<span class="label"><span class="sr-only">고속할인</span></span>');
	
	// 페이지 타이틀	
	var $contentHeader = $('.content-header');
	if ($contentHeader.length && $contentHeader.data('pageTitle')) {
		var pageTitle = $contentHeader.data('pageTitle');
		
		document.title = pageTitle;
	} else {
		document.title = "고속버스통합예매";
	};
	
	// 결제정보 입력 탭 상태값 추가
	function updateInputTitle() {
		$('.tab_wrap.inradio li').each(function() {
			var $input = $(this).find('input');
			
			if ($(this).hasClass('active')) {
				$input.attr('title', '선택됨');
			} else {
				$input.removeAttr('title');
			}
		});
	};
	updateInputTitle();
	
	$('.tab_wrap.inradio li').on('click', function() {
		if ($(this).hasClass('active')) {
			$('.tab_wrap.inradio li').find('input').removeAttr('title');
			$(this).find('input').attr('title', '선택됨');
		};
	});
	
	// 노선선택 오늘/내일 선택 정보 제공
	setTimeout(function() {
		$('.date_wrap').each(function() {
			$(this).find('a[onclick*="fnYyDtmStup"]').first().addClass('active').attr('title', '선택됨')
		});
	}, 1000);
	$('.date_wrap a[onclick*="fnYyDtmStup"]').on('click', function(event) {
		event.preventDefault();
		
		var $parentWrap = $(this).closest('.date_wrap');
		$parentWrap.find('a[onclick*="fnYyDtmStup"]').removeClass('active').removeAttr('title');
		$(this).addClass('active').attr('title', '선택됨');
	});
	
	// 출/도착지 선택 팝업 버튼 선택 정보 제공
	$('.remodal .start_wrap .tags button.active').attr('title', '선택됨');
	$('.remodal .start_wrap .tags button').click(function(event) {
		event.preventDefault();
		
		$('.remodal .start_wrap .tags button').removeClass('active').removeAttr('title');
		$(this).addClass('active').attr('title', '선택됨');

		$('.remodal #tableTrmList li').removeClass('active');
		$('.remodal #tableTrmList button').removeAttr('title');
	});
	$('.remodal .area_list li.active button').attr('title', '선택됨');
	$('.remodal .area_list li button').click(function(event) {
		event.preventDefault();
		
		$('.remodal .area_list li button').removeAttr('title');
		$(this).attr('title', '선택됨');
		
		const buttonText = $(this).text();
		$('.terminal_list h4.sr-only').text(buttonText);
	});
	
	$(document).on('click keydown', '.remodal', function(e) {
		const $target = $(e.target);
		if (e.type === 'keydown' && e.key !== 'Enter') {
			return;
		}
		if ($target.closest('.start_wrap button').length) {
			return;
		}
		$('.start_wrap button').removeAttr('title');
		$('.start_wrap button').removeClass('active');
	});
	
	function applyButtonClickHandler() {
		$('#tableTrmList button').off('click');
		
		$('#tableTrmList button').on('click',function() {
			$('#tableTrmList li').removeClass('active');
			$('#tableTrmList button').removeAttr('title');
			
			$(this).closest('li').addClass('active');
			$(this).attr('title', '선택됨');
		});
	}
	
	const startWrap = document.querySelector('.start_wrap');
	
	if (startWrap) {
		const observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutations) {
				if (mutations.attributeName === 'style') {
					$('.remodal .area_list li button').removeAttr('title');
					$('.remodal .area_list li.active button').attr('title', '선택됨');
					$('#tableTrmList li.active button').attr('title', '선택됨');
					$('.terminal_list h4.sr-only').text('전체');
					
					const modalTitleText = $('#popTitle').text();
					if (modalTitleText === '출발지 선택') {
						$('.terminal_wrap').css('margin-top','20px');
						
						if($('.start_wrap').css('display') === 'none') {
							$('.terminal_wrap').css('margin-top','100px');
						} else {
							$('.terminal_wrap').css('margin-top','20px');
						}
					}
					if (modalTitleText === '도착지 선택') {
						$('.terminal_wrap').css('margin-top','100px');
					}
					applyButtonClickHandler();
				}
			})
		});
		observer.observe(startWrap, { attributes: true, attributeFilter: ['style'] });
	}
	
	$('.terminal_wrap').on('click keydown', function(event) {
		if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
			applyButtonClickHandler();
		}
	})
	
	// 노선조회 출/도착지 선택하지 않고 조회하기 버튼 클릭 시 포커스 이동
	$('.route_box ul.place li a').on('focus', function() {
		$(this).addClass('focus');
	}).on('blur', function() {
		$(this).removeClass('focus');
	});
	
	$("#cfmBtn").on('keydown', function(e) {
		if (e.key === 'Enter') {
			$(this).click();
			$("#readDeprInfoList").focus();
		}
	})
});

// 레이어 팝업 초점 이동 개선
$(document).ready(function() {
	var lastFocusedBtn;
	$(".btn_pop_focus").on('click', function() {
		lastFocusedBtn = $(this);
	});
	
	$('.remodal-close').on('click', function(e) {
		e.preventDefault();
		
		const currentWrapper = $(this).closest('.remodal-wrapper.remodal-is-opened');
		const otherWrappersWithClass = $('.remodal-wrapper.remodal-is-opened').not(currentWrapper);
		
		if (lastFocusedBtn && otherWrappersWithClass.length === 0) {
			lastFocusedBtn.focus();
		}
	});
	$('.remodal-cancel').on('click', function(e) {
		e.preventDefault();
		
		const currentWrapper = $(this).closest('.remodal-wrapper.remodal-is-opened');
		const otherWrappersWithClass = $('.remodal-wrapper.remodal-is-opened').not(currentWrapper);
		
		if (lastFocusedBtn && otherWrappersWithClass.length === 0) {
			lastFocusedBtn.focus();
		}
	});
	
	$('.remodal-close').on('keydown', function(e) {
		if (e.key === 'Tab') {
			e.preventDefault();
			var $remodal = $(this).closest('.remodal');
			const focusableElement = $(this).closest('.remodal').find('a, button, input, [tabindex]:not([tabindex="-1"])').filter(function() {
				const $element = $(this);
				return $element.css('display') !== 'none' && $element.attr('tabindex') !== '-1' && $element.closest('[style*="display: none"]').length === 0;
			})
			var firstFocusable = focusableElement.first();
			var lastFocusable = focusableElement.eq(-2);
			
//			console.log('처음 초점', firstFocusable.attr('class'));
//			console.log('마지막 초점', lastFocusable.attr('class'));
			
			if (firstFocusable.is(lastFocusable)) {
				setTimeout(function() {
					lastFocusable.focus();
				}, 100);
			} else {
				firstFocusable.focus();
			}
			
			if (e.shiftKey) {
				e.preventDefault();
				var lastFocusable = $(this).closest('.remodal').find('a, button, input, [tabindex]:not([tabindex="-1"])').eq(-2);
				setTimeout(function() {
					lastFocusable.focus();
				}, 100);
			} 
		};
	});
	
	$(document).on('keydown', function(e) {
		if (e.shiftKey && e.key === 'Tab') {
			const activeRemodal = $('.remodal-wrapper.remodal-is-opened');
			const focusedElement = $(document.activeElement);
			const focusableElement = activeRemodal.find('a, button, input, [tabindex]:not([tabindex="-1"])').filter(function() {
				const $element = $(this);
				return $element.css('display') !== 'none' && $element.attr('tabindex') !== '-1' && $element.closest('[style*="display: none"]').length === 0;
			});
			const firstFocusableElement = focusableElement.first();
			if (focusedElement.is(firstFocusableElement)) {
				e.preventDefault();
				activeRemodal.find('.remodal-close').focus();
			}
		}
	});	

	// 레이어 팝업 열고 닫힘 상태 체크 초점 이동
	const $overlay = $('.remodal-overlay');
	var $triggerButton = null;
	
	$(document).on('click', function(e) {
		$clickedElement = $(e.target);
		
		if ($clickedElement.hasClass('btn_pop_focus')) {
			$triggerButton = $clickedElement;
//			console.log($triggerButton.attr('class'));
		}
	});
	
	if ($overlay.length) {
		const observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutations) {
				if (mutations.attributeName === 'class') {
					if ($overlay.hasClass('remodal-is-opened')) {
						
						setTimeout(function() {
							const $focusableElements = $overlay.find('a[href], input:not([disabled]), button:not([disabled]), [tabindex="0"]');
							$focusableElements.first().focus();
						}, 0);
					} else if ($overlay.hasClass('remodal-is-closed')) {
						if ($triggerButton) {
							$triggerButton.focus();
						}
					}
				}
			})
		});
		
		observer.observe($overlay[0], {
			attributes: true,
			attributeFilter: ['class']
		});
	}
});

$(document).ready(function() {
	// 캘린더 오늘 텍스트 추가
	$("#ui-datepicker-div").datepicker({
		beforeShowDay: function(date) {
			const today = new Date();
			
			if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
				return [true, "ui-datepicker-today", "오늘"];
			}
			return [true, ""];
		},
//		onSelect: function() {
//			addTodaySpan();
//		}
	});
	
	$(".ui-datepicker-trigger").on("click", function() {
		setTimeout(addTodaySpan, 50);
		$(this).parent().addClass('datepicker-active');
		$("#ui-datepicker-div").focus();
		$(".ui-state-disabled").attr("tabindex", "-1");
		$(".ui-datepicker-prev, .ui-datepicker-next").attr("href", "javascript:void(0)");
	});
	$(".ui-corner-all").on("click", function() {
		setTimeout(addTodaySpan, 50);
		$("#ui-datepicker-div").focus();
		$(".ui-state-disabled").attr("tabindex", "-1");
		$(".ui-datepicker-prev, .ui-datepicker-next").attr("href", "javascript:void(0)");
	});
	
	function addTodaySpan() {
		const $todayTd = $('td.ui-datepicker-today');
		const $activeLink = $('td.ui-datepicker-current-day a');		
		
		if ($todayTd.length && !$todayTd.find('.today').length) {
			$todayTd.append('<span class="today">오늘</span>');
		}
		
		if ($activeLink) {
			$activeLink.attr('title', '선택됨');
		}
	}
	

	// 매수 및 좌석선택 키보드 포커싱 제한 설정
	var seatInput = $("input:checkbox[name=seatBoxDtl]");
	if ($('.ticketBox .btn_add').length) {
		seatInput.attr('tabindex', '-1');
		seatInput.addClass('disabled-input')
	}
	
	$('.ticketBox').on('click', '.btn_add', function() {
		const hasNonZeroCount = $('.ticketBox .text_num.count').toArray().some(function(element) {
			return parseInt($(element).text(), 10) !== 0;
		});
		
		if (hasNonZeroCount) {
			$(seatInput).removeAttr('tabindex');
			$(seatInput).removeClass('disabled-input');
		}
	});
	
	// 가상키보드 키보드 포커싱
	// 쿼티 키보드	
	var currentFocusedInput1 = null;
	var isVirtualKeyboardOpen1 = false;
	
	function initializeVirtualKeyboardEvent1(inputElement) {	
		var inputId = $(inputElement).attr('id');
		var currentLayout = $('#' + inputId + '_layout');

		$(document).off('keydown');
		$(document).on('keydown', function(e) {	
			if ($(document.activeElement).is(currentLayout.find('.transkey_qwertyMainDiv')) && e.key === 'Tab' && e.shiftKey) {
				e.preventDefault();
				currentLayout.find('#tk_close').focus();
			};
			
			if ($(document.activeElement).is(currentLayout.find('#tk_close')) && e.key === 'Tab' && !e.shiftKey) {
				e.preventDefault();
				currentLayout.find('.transkey_qwertyMainDiv').focus();
			}
		});

		$(document).on('keydown', currentLayout.find('.transkey_qwertyMainDiv'), function(e) {
			if (e.key === 'Enter') {
				e.preventDefault();
				$(e.target).click();
			};
		});
	}
	
	$('input[data-tk-kbdtype="qwerty"]').on('blur', function() {
		currentFocusedInput1 =$(this);
		isVirtualKeyboardOpen1 = false;
		currentFocusedInput1.attr('onfocus', 'tk.onKeyboard(this);');
		currentFocusedInput1.removeAttr('onclick');
		currentFocusedInput1.attr('disabled', false);
	});
	
	$(document).on('click', function(e) {
		var inputId = currentFocusedInput1 ? currentFocusedInput1.attr('id') : null;
		var currentLayout = $('#' + inputId + '_layout');
		
		if (currentLayout.length > 0 && 
			(currentLayout.find('#tk_enter_l').is(e.target) || 
			currentLayout.find('#tk_enter_r').is(e.target) || 
			currentLayout.find('#tk_close').is(e.target))) {
				
				isVirtualKeyboardOpen1 = false;
				currentFocusedInput1.focus();
				currentFocusedInput1.attr('disabled', true);
			}
	});

	$('input[data-tk-kbdtype="qwerty"]').on('focus', function() {
		currentFocusedInput1 = $(this);
		isVirtualKeyboardOpen1 = true;
		
		var inputId = currentFocusedInput1.attr('id');
		var transkeyQwertyMainDiv = $('#' +  inputId + '_layout .transkey_qwertyMainDiv').attr("tabindex", "0");
		
		setTimeout(function() {
			transkeyQwertyMainDiv.attr('aria-label', '가상키보드');
			transkeyQwertyMainDiv.focus();
			if (transkeyQwertyMainDiv.is(':focus')) {
				currentFocusedInput1.attr('onclick', 'tk.onKeyboard(this);').removeAttr('onfocus');
			}
		}, 100);
		
		initializeVirtualKeyboardEvent1(currentFocusedInput1);
	});
	
	
	// 숫자 키보드	
	var currentFocusedInput2 = null;
	var isVirtualKeyboardOpen2 = false;
	
	function initializeVirtualKeyboardEvent2(inputElement) {	
		var inputId = $(inputElement).attr('id');
		var currentLayout = $('#' + inputId + '_layout');

		$(document).off('keydown');
		$(document).on('keydown', function(e) {	
			if ($(document.activeElement).is(currentLayout.find('.transkey_numberMainDiv')) && e.key === 'Tab' && e.shiftKey) {
				e.preventDefault();
				currentLayout.find('#tk_close').focus();
			};
			
			if ($(document.activeElement).is(currentLayout.find('#tk_close')) && e.key === 'Tab' && !e.shiftKey) {
				e.preventDefault();
				currentLayout.find('.transkey_numberMainDiv').focus();
			}
		});

		$(document).on('keydown', currentLayout.find('.transkey_numberMainDiv'), function(e) {
			if (e.key === 'Enter') {
				e.preventDefault();
				$(e.target).click();
			};
		});
	}
	
	$('input[data-tk-kbdtype="number"]').on('blur', function() {
		currentFocusedInput2 =$(this);
		isVirtualKeyboardOpen2 = false;
		currentFocusedInput2.attr('onfocus', 'tk.onKeyboard(this);');
		currentFocusedInput2.removeAttr('onclick');
		currentFocusedInput2.attr('disabled', false);
	});
	
	$(document).on('click', function(e) {
		var inputId = currentFocusedInput2 ? currentFocusedInput2.attr('id') : null;
		var currentLayout = $('#' + inputId + '_layout');
		
		if (currentLayout.length > 0 && 
			(currentLayout.find('#tk_enter_l').is(e.target) || 
			currentLayout.find('#tk_enter_r').is(e.target) || 
			currentLayout.find('#tk_close').is(e.target))) {
				
				isVirtualKeyboardOpen2 = false;
				currentFocusedInput2.focus();
				currentFocusedInput2.attr('disabled', true);
			}
	});

	$('input[data-tk-kbdtype="number"]').on('focus', function() {
		currentFocusedInput2 = $(this);
		isVirtualKeyboardOpen2 = true;
		
		var inputId = currentFocusedInput2.attr('id');
		var transkeyNumberMainDiv = $('#' +  inputId + '_layout .transkey_numberMainDiv').attr("tabindex", "0");
		
		setTimeout(function() {
			transkeyNumberMainDiv.attr('aria-label', '가상키보드');
			transkeyNumberMainDiv.focus();
			if (transkeyNumberMainDiv.is(':focus')) {
				currentFocusedInput2.attr('onclick', 'tk.onKeyboard(this);').removeAttr('onfocus');
			}
		}, 100);
		
		initializeVirtualKeyboardEvent2(currentFocusedInput2);
	});
	
	// 메인공지팝업
	var scrollPosition = 0;
	function mainPop() {
		scrollPosition = $(window).scrollTop();
		$('body').css({
			'position': 'fixed',
			'top': '- " + scrollPosition + "px',
			'width': '100%',
			'overflow': 'hidden'
		});
		
		$('.pop_dimmed').show();
		$('.noti_pop_wrap').show();
		
		$('body.main').css('overflow', 'hidden');
		
		$('#skip').before($('.pop_dimmed'));
		$('#skip').before($('.noti_pop_wrap'));
		
		updatePopupPosition();
		 
//		 $('.noti_pop iframe').on('load', function() {
//			try {
//				var iframeBody = this.contentDocument || this.contentWindow.document;
//				var popTitle = $(this).closest('.noti_pop').find('.pop_tit').text();
//				iframeBody.body.setAttribute('tabindex', '0');
//				
//				$(iframeBody.body).css('outline', 'none');
//				$(iframeBody.body).on('focus', function() {
//					$(this).css({
//						'outline': '2px solid black',
//						'outline-offset': '1px'
//					});
//				}).on('blur', function() {
//					$(this).css('outline', 'none');
//				});
//				
//				this.title = popTitle;
//			} catch (error) {
//				console.error('iframe에 접근할 수 없습니다', error);
//			}
//		 });

		 $('.noti_pop .pop_close').on('click',function(){
			$(this).parents('.noti_pop').hide();
			if ( $('.noti_pop:visible').length == 0){
				$('.pop_dimmed').hide();
				$('.noti_pop_wrap').hide();
				$('body.main').css('overflow-y', 'scroll');

				$('body').css({
					'position': '',
					'top': '',
					'width': '',
					'overflow': '',
				});
			}
			
			
			// 오늘하루 보지않기
			var popId = $(this).data('id');
			var chked = $('#chk_'+popId).prop('checked');
			if (chked == true){
				closeWinAt00(popId, 1);
			}
		 });

		 $('.pop_dimmed').on('click',function(){
			$('.pop_dimmed').hide();
			$('.noti_pop_wrap').hide();
			$('.noti_pop').hide();
			$('body.main').css('overflow-y', 'scroll');

			$('body').css({
				'position': '',
				'top': '',
				'width': '',
				'overflow': ''
			});
		 });
		 
		 $('.noti_pop').on('keydown', function(e) {
				var $popup = $(this);
				var $iframeBody = $popup.find('iframe').contents().find('body');
				var $iframeFocusable = $iframeBody.find('button, [href], input, [tabindex="0"]').not('[disabled]');
				var $focusableElement = $popup.find('button, [href], input, [tabindex="0"]').not('[disabled]');
				var $firstElement = $iframeFocusable.length > 0 ? $iframeFocusable.first() : $focusableElement.first();
				var $lastElement = $focusableElement.last();
				var $closeButton = $popup.find('.pop_close');
				var $btnTodayHidden = $popup.find('.btn-today-hidden');
				
				if (e.key === 'Tab') {
					if (e.shiftKey) {
						if (document.activeElement === $firstElement[0]) {
							e.preventDefault();
							$lastElement.focus();
						}
					} else {
						if (document.activeElement === $lastElement[0]) {
							e.preventDefault();
							if ($iframeFocusable.length > 0) {
								$iframeFocusable.first().focus();
							} else {
								$btnTodayHidden.focus();
							}
						}
					}
				}
				
				$firstElement.on('keydown', function(e) {
					 if (e.key === 'Tab' && e.shiftKey) {
							e.preventDefault();
							$closeButton.focus();
					 }
				 });
				$closeButton.on('keydown', function(e) {
					if (e.key === 'Tab' && !e.shiftKey) {
						e.preventDefault();
						if ($iframeFocusable.length > 0) {
							$iframeFocusable.first().focus();
						} else {
							$btnTodayHidden.focus();
						}
					}
				});
				$btnTodayHidden.on('keydown', function(e) {
					if (e.key === 'Tab' && e.shiftKey) {
						e.preventDefault();
						if ($iframeFocusable.length > 0) {
							$iframeFocusable.last().focus();
						} else {
							$closeButton.focus();
						}
					}
				});
			 });
		 
		 $(window).on('resize', updatePopupPosition);
	}
	
	function updatePopupPosition() {
		var totalCnt = $('.noti_pop').length;
		var wrapW = $('.wrapper-main').width();
		var firstCnt = parseInt(wrapW / 320);		 
		var top, left, enter, index, type;	
		var contMax = $('.main .wrapper-main').height() - ($('.main #new-kor-footer').height() + 60) - ($('.noti_pop .pop_top').height() + $('.noti_pop .btns').height() + 46);
		$('.noti_pop .pop_cont_wrap').css('max-height',contMax);
		
		 if ( $(window).width() > 767){
			 for ( var i = 0; i < totalCnt ; i++) {
				index = 920 + ((totalCnt - i - 1) * 10);
				 $('.noti_pop').eq(i).css('z-index',index);		
				 enter = parseInt( i / firstCnt );
				 left =(i%firstCnt)*320;
				 $('.noti_pop').eq(i).css('left',left);
				 
				 if ( !i < firstCnt ){
					top = (enter * 10);
					$('.noti_pop').eq(i).css('top',top);
					$('.noti_pop').eq(i).find('.pop_cont_wrap').css('max-height',contMax - top);
				 } else {
						$('.noti_pop').eq(i).css('top', 0);
				 }
			 }
		 } else {
			$('.noti_pop').css('left',0);
			var winH = $(window).height();		
			var otherH = $('.noti_pop .pop_top').height() + $('.noti_pop .btns').height() + 46;
			var conH = winH - otherH;
			for ( var i = 0; i < totalCnt ; i++) {
				index = 920 + ((totalCnt - i - 1) * 10);
				$('.noti_pop').eq(i).css('z-index',index);
				top = i*10;
				$('.noti_pop').eq(i).css('top',top);
				$('.noti_pop .pop_cont_wrap').eq(i).height(conH-40-top);
			}
		 }

		 for ( i=0; i < totalCnt; i++){
			 if ( i < 4){
				 type = i + 1;
				 $('.noti_pop').eq(i).addClass('type'+type);
			 } else {
				 type =  (i%4)+1;
				 $('.noti_pop').eq(i).addClass('type'+type);
			 }
		 }
	}

	if ( $('body.main .noti_pop').length > 0){
		mainPop();
	}
	
	// 프리미엄 마일리지 대체 텍스트 제공
	$("table.tbl_mileage").each(function() {
		var $tr = $(this);
		var $state = $tr.find('td.txt_mileage .state .sr-only');
		
		if ($tr.hasClass('used')) {
			$state.text('사용');
		} else if ($tr.hasClass('valid')) {
			$state.text('소멸');
		} else {
			$state.text('적립');
		}
	});
	
	/*$(document).on('focus', '*:focus', function() {
		var focusedElement = $(this);
		var classes = focusedElement.attr('class');
		var ides = focusedElement.attr('id');
		
		console.log('ID값 : ', ides, 'class값 : ', classes);
	});*/
	
	/*const originalAlert = window.alert;
	window.alert = function(msg) {
		if (msg === undefined) {
			console.log('알럿 메세지', undefined);
		} else if (msg === null) {
			console.log('알럿 메세지', null);
		} else if (msg === "") {
			console.log('알럿 메세지 텍스트 없음');
		} else {
			console.log('알럿 메세지', msg);
		}
		console.trace('알럿 trace');
		originalAlert(msg);
	}*/
});
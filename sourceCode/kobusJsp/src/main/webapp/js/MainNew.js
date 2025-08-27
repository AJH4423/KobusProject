$(document).ready(function () {
	// 이곳에 정의

	// 탭 메뉴
	$(".tab-menu-list li a").on("click", function (e) {
		e.preventDefault();

		$(".tab-menu-list li").each(function () {
			var $li = $(this);
			var $a = $li.find("a");

			if ($a.is(e.target)) {
				$li.addClass("on");
				$a.attr("title", "선택됨");
			} else {
				$li.removeClass("on");
				$a.removeAttr("title");
			}
		});

		if ($(this).parent().is(":last-child")) {
			if ($('#tab-content2').find('.no-ticker-area').length > 0 || $('#tab-content2').find('.bx-wrapper').length > 0) {
				$(".main-content").css("padding-top", "48px");
				
			} else {
				$(".main-content").css("padding-top", "77px");

				if ($(".find_card_num").hasClass("on")) {
					$(".main-content").css("padding-top", "110px");
				}
			}
		} else {
			$(".main-content").css("padding-top", "48px");
		}

		$(".tab-content > div").hide();
		$($(this).attr("href")).show();
	});
	$(".tab-content > div").hide();
	$(".tab-content > div:first").show();
	$(".tab-menu-list li:first").addClass("on");
	$(".tab-menu-list li:first a").attr("title", "선택됨");

	$(".tab-menu-list li a").on("keydown", function (e) {
		if (e.key === "Enter") {
			e.preventDefault();
			$(this).click();
			var targetId = $(this).attr("href");
			$(targetId).attr("tabindex", "-1").focus();
		}
	});


	/* [기존코드 그대로 사용] 비회원 예매프로세스  2-2, 3-2 */
	$(".input_tab li").on("click", function () {
		$(".input_tab li").removeClass("on");
		$(this).toggleClass("on");
		if ($(".find_card_num").hasClass("on")) {
			$(".card").show();
			$(".phone").hide();
			$("#cal_flg1").val("2");
			$(".main-content").css("padding-top", "110px");
			$(".input_tab li a").removeAttr("title");
			$(".find_card_num a").attr("title", "선택됨");
		} else {
			$(".phone").show();
			$(".card").hide();
			$("#cal_flg1").val("0");
			$(".main-content").css("padding-top", "77px");
			$(".input_tab li a").removeAttr("title");
			$(".input_tab li:first a").attr("title", "선택됨");
		}
	});
	$(".pay_wrap02 li").on("click", function () {
		$(".pay_wrap02 li").removeClass("on");
		$(this).toggleClass("on");
		if ($(".easy_tab02").hasClass("on")) {
			$(".easy_pay").show();
			$(".credit").hide();
			$("#cal_flg2").val("2");
			$(".main-content").css("padding-top", "126px");
			$(".pay_wrap02 li a").removeAttr("title");
			$(".easy_tab02 a").attr("title", "선택됨");
		} else {
			$(".credit").show();
			$(".easy_pay").hide();
			$("#cal_flg1").val("1");
			$(".main-content").css("padding-top", "110px");
			$(".pay_wrap02 li a").removeAttr("title");
			$(".pay_wrap02 li:first a").attr("title", "선택됨");
		}
	});

	$(".tab_type1 .tabs > li a").on("click", function () {
		$(".tab_type1 .tabs > li").each(function () {
			if ($(this).hasClass("active")) {
				$(this).find("a").attr("title", "선택됨");
			} else {
				$(this).find("a").removeAttr("title");
			}
		});
	});
	
	// 메인 예매확인 슬라이드
	$('.ticket_slide').each(function () {
		var $bxWrapper = $(this).closest('.bx-wrapper');
		
		$bxWrapper.find(".bx-controls-direction .bx-prev").html('<span class="sr-only">이전</span>').attr('href', 'javascript:void(0)');
		$bxWrapper.find(".bx-controls-direction .bx-next").html('<span class="sr-only">다음</span>').attr('href', 'javascript:void(0)');
		$bxWrapper.find(".bx-pager-link").attr('href', 'javascript:void(0)');
		
		var $totalSlides =$(this).children().length;
		
		$bxWrapper.find('.bx-pager-link').each(function() {
			var $pagerLink = $(this);
			var slideIndex = $pagerLink.data('slide-index') + 1;
			
			$pagerLink.attr('aria-label', '현재 슬라이드 :' + slideIndex + ', 전체 슬라이드 :' + $totalSlides);
			if ($pagerLink.hasClass('active')) {
				$pagerLink.attr('aria-selected', 'true');
			} else {
				$pagerLink.attr('aria-selected', 'false');
			}
		});

		$bxWrapper.on('click', '.bx-pager-link, .bx-prev, .bx-next', function() {
			updateAriaSelected($bxWrapper);
		});
		
		function updateAriaSelected($bxWrapper) {
			var activeIndex = $bxWrapper.find('.bx-pager-link.active').data('slide-index');
			
			$bxWrapper.find('.bx-pager-link').each(function() {
				var $pagerLink = $(this);
				var isActive = $pagerLink.data('slide-index') === activeIndex;
				
				$pagerLink.attr('aria-selected', isActive ? 'true' : 'false');
			})
		}
	});

	var ticketTextMap = {
		// 현장발권 class="ontheSpot", 홈티켓 class="homeTicket", 모바일티켓 class="mobileTicket", 미발행 class="unissued"
		'ontheSpot' : '현장발권',
		'homeTicket' : '홈티켓',
		'mobileTicket' : '모바일',
		'unissued' : '미발행'
	};
	
	$('.ticket_slide li').each(function() {
		var $detailInfoWrap = $(this).find('.detail_info_wrap');
		var sectionClass = Object.keys(ticketTextMap).find(function(className) {
			return $detailInfoWrap.hasClass(className)
		});
		
		if (sectionClass) {
			$detailInfoWrap.find('.sr-only').text(ticketTextMap[sectionClass]);
		}
	});
});

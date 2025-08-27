<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<title>상품 구매내역 | 프리패스/정기권 | 고속버스통합예매</title>
<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
<style>
/* 테이블 스타일 */
.noti_table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Segoe UI', sans-serif;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.noti_table th {
    background-color: #007BFF;
    color: white;
    padding: 12px;
    text-align: center;
}

.noti_table td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.noti_table tr:hover {
    background-color: #f1f9ff;
}

/* 취소 버튼 스타일 */
.cancel-btn {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.cancel-btn:hover {
    background-color: #0056b3;
}

.dropdown-wrap {
    position: relative; /* 기준 요소 설정 */
}

.dropdown-list {
    position: absolute;
    top: 100%;  /* 버튼 아래에 위치하도록 */
    left: 0;
    z-index: 1000;
    display: none;
    background-color: white; /* 어두운 배경 (예시) */
    padding: 5px 0;
    min-width: 180px;
    border: 1px solid #666;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
}

.dropdown-list li {
    padding: 10px 15px;
    color: black;
    cursor: pointer;
}

.dropdown-list li:hover { 
    background-color: #444;
}

</style>
		<!-- breadcrumb -->
		<!-- 브레드크럼 -->
		<nav id="new-kor-breadcrumb">
			<div class="container">
				<ol class="breadcrumb-list">
					<li><i class="ico ico-home"></i><span class="sr-only">홈</span></li>
					<li>
						<div class="dropdown-wrap breadcrumb-select">
							<a aria-expanded="false" class="btn-dropdown"
								href="/koBus/page/itemPurListPage.do" title="대메뉴 선택"> <span class="text">프리패스/정기권</span><i
								class="ico ico-dropdown-arrow"></i></a>
							<ul class="dropdown-list" style="display: none;">
								<li><a href="/koBus/region.do">고속버스예매</a></li>
								<li><a
									href="/koBus/kobusSchedule.do">운행정보</a></li>
								<li class="selected"><a href="/koBus/page/itemPurListPage.do"
									title="선택됨">프리패스/정기권</a></li>
								<li><a href="#">이용안내</a></li>
								<li><a
									href="#">고객지원</a></li>
								<li><a
									href="#">전국고속버스운송사업조합</a></li>
								<li><a
									href="#">터미널사업자협회</a></li>
							</ul>
						</div>
					</li>
					<li>
						<div class="dropdown-wrap breadcrumb-select">
							<a aria-expanded="false" class="btn-dropdown"
								href="/koBus/page/itemPurListPage.do" title="하위메뉴 선택"> <span
								class="text">상품 구매내역</span><i class="ico ico-dropdown-arrow"></i></a>
							<ul class="dropdown-list" style="display: none;">
								<li><a
									href="/koBus/page/itemPurListPage.do">프리패스
										여행권</a></li>
								<li><a
									href="/koBus/page/itemPurListPage.do">정기권</a></li>
								<li class="selected"><a href="/koBus/page/itemPurListPage.do"
									title="선택됨">상품 구매내역</a></li>
							</ul>
						</div>
					</li>
				</ol>
			</div>
		</nav>
		<script>
			$(document).ready(function(){
			    $(".btn-dropdown").on("click", function(e){
			        e.preventDefault();
			
			        const $wrap = $(this).closest(".dropdown-wrap");
			        const $list = $wrap.find(".dropdown-list");
			
			        // 다른 드롭다운은 닫기
			        $(".dropdown-list").not($list).slideUp("fast");
			
			        // 현재 클릭한 드롭다운은 토글
			        $list.stop(true, true).slideToggle("fast");
			    });
			
			    // 바깥 클릭 시 닫기
			    $(document).on("click", function(e){
			        if (!$(e.target).closest(".dropdown-wrap").length) {
			            $(".dropdown-list").slideUp("fast");
			        }
			    });
			});
		</script>

		<article id="new-kor-content">



			<div class="title_wrap in_process freepassT" style="display: none;">
				<a class="back"
					href="https://www.kobus.co.kr/adtnprdnew/prchpt/prdPrchPt.do#">back</a>
				<a class="mo_toggle"
					href="https://www.kobus.co.kr/adtnprdnew/prchpt/prdPrchPt.do#">메뉴</a>
				<h2>상품 구매내역</h2>
			</div>
			<!-- 타이틀 -->
			<div class="content-header"
				data-page-title="상품 구매내역 | 프리패스/정기권 | 고속버스통합예매">
				<div class="container">
					<div class="title-area">
						<h2 class="page-title">상품 구매내역</h2>
					</div>
				</div>
			</div>
			<div class="content-body">
				<div class="container">
					<div class="tab_wrap tab_type1">
						<ul class="tabs col3 blue">
							<li class="active"><a href="javascript:void(0)" title="선택됨">사용가능</a></li>
							<li><a href="javascript:void(0)">사용완료</a></li>
							<li><a href="javascript:void(0)">취소완료</a></li>
						</ul>
						<div class="tab_conts" id="tab_conts1" style="display: block;">
							<!-- 사용가능 -->
							<h3 class="sr-only" id="sr-only1">사용가능</h3>
							<!-- 구매내역이 없을 때 -->
							<div class="noti_wrap">
							    <c:choose>
							        <c:when test="${empty popItemList and empty freeItemList}">
							            <p class="noti noData">사용가능 내역이 존재하지 않습니다.</p>
							        </c:when>
							        <c:otherwise>
							            <!-- ✅ form은 table 밖에 위치해야 함 -->
							            <form action="/koBus/deleteItemPurList.do" id="couponCancle" name="couponCancle">
							                <table class="noti_table">
							                    <thead>
							                        <tr>
							                            <th>쿠폰명</th>
							                            <th>결제상태</th>
							                            <th>시작일</th>
							                            <th>금액</th>
							                            <th>취소</th>
							                        </tr>
							                    </thead>
							                    <tbody>
							                        <c:forEach var="popItem" items="${popItemList}">
							                            <tr class="popTr">
							                                <td class="pop-td" data-coupon-id="${popItem.couponID}">${popItem.couponName}</td>
							                                <td>${popItem.payStatus}</td>
							                                <td>${popItem.startDate}</td>
							                                <td>${popItem.amount}</td>
							                                <td>
							                                    <button type="button" class="cancel-popbtn">취소</button>
							                                </td>
							                                
							                            </tr>
							                        </c:forEach>
							
							                        <c:forEach var="freeItem" items="${freeItemList}">
							                            <tr class="freeTr">
							                                <td class="free-td" data-coupon-id="${freeItem.couponID}">${freeItem.couponName}</td>
							                                <td>${freeItem.payStatus}</td>
							                                <td>${freeItem.startDate}</td>
							                                <td>${freeItem.amount}</td>
							                                <td>
							                                    <button type="button" class="cancel-freebtn">취소</button>
							                                </td>
							                                
							                            </tr>
							                        </c:forEach>
							                    </tbody>
							                </table>
							                <input type="hidden" class="pop-hidden" name="popItemId" value="" />
							                <input type="hidden" class="free-hidden" name="freeItemId" value=""  />
							            </form>
							        </c:otherwise>
							    </c:choose>
							</div>

							<script>
							$(".cancel-popbtn").on("click", function(e){
							    e.preventDefault(); // 폼 제출 방지
							    const $row = $(this).closest(".popTr");
							    const couponId = $row.find(".pop-td").data("coupon-id");
							    $(".pop-hidden").val(couponId);
							
							 	// 확인 알림창
							    if (confirm("정기권을 정말로 취소하시겠습니까?")) {
							        console.log("넘겨줄 값(정기권) : " + $(".pop-hidden").val());
							        $("#couponCancle").submit();
							    }
							});
							
							$(".cancel-freebtn").on("click", function(e){
							    e.preventDefault(); // 폼 제출 방지
							    const $row = $(this).closest(".freeTr");
							    const couponId = $row.find(".free-td").data("coupon-id");
							    $(".free-hidden").val(couponId);
							
							 	// 확인 알림창
							    if (confirm("프리패스를 정말로 취소하시겠습니까?")) {
							        console.log("넘겨줄 값(프리패스) : " + $(".free-hidden").val());
							        $("#couponCancle").submit();
							    }
							});
							
							</script>
							

							<!-- <script>
								$(".cancel-popbtn").on("click", function(){
									$("#popTr").each(function(){
										const couponId = $(this).find(".pop-td").data("coupon-id");  // "pop-123" 같은 값
								        $(this).find(".pop-hidden").val(couponId); 
									})
									console.log("넘겨줄 값 : " + $('input[name="popItemId1"]').val());
								})
							</script> -->
							<!-- 구매내역이 있을 때 -->
							<ul class="desc_list marT30">
								<li>현재일 기준 3개월 전까지의 구매내역이 조회됩니다.</li>
								<li>정기권의 경우, 취소 가능일 이전까지 취소가 가능하며 지난 날짜와 환불 수수료를 제외하고
									지급됩니다.</li>
								<li>프리패스의 경우, 사용 시작 1일 후까지 취소 가능하나 승차권 발권 상태인 경우 취소 불가능합니다.</li>
							</ul>
						</div>
						<div class="tab_conts" id="tab_conts2" style="display: none;">
							<!-- 사용완료 -->
							<h3 class="sr-only" id="sr-only2">사용완료</h3>
							<!-- 사용내역이 없을 때 -->
							<div class="noti_wrap">
								<p class="noti noData">사용완료 내역이 존재하지 않습니다.</p>
							</div>
							<!-- 사용내역이 있을 때 -->
						</div>
						<div class="tab_conts" id="tab_conts3" style="display: none;">
							<!-- 환불 -->
							<h3 class="sr-only" id="sr-only3">취소완료</h3>
							<!-- 취소내역이 없을 때 -->
							<div class="noti_wrap">
							    <c:choose>
							        <c:when test="${empty popCancleItemList and empty freeCancleItemList}">
							            <p class="noti noData">취소완료 내역이 존재하지 않습니다.</p>
							        </c:when>
							        <c:otherwise>
							            <!-- ✅ form은 table 밖에 위치해야 함 -->
							            <!-- <form action="/koBus/deleteItemPurList.do" id="couponCancle" name="couponCancle"> -->
							                <table class="noti_table">
							                    <thead>
							                        <tr>
							                            <th>쿠폰명</th>
							                            <th>결제상태</th>
							                            <th>시작일</th>
							                            <th>금액</th>					
							                        </tr>
							                    </thead>
							                    <tbody>
							                        <c:forEach var="popCancleItem" items="${popCancleItemList}">
							                            <tr class="popTr">
							                                <td class="pop-td" data-coupon-id="${popCancleItem.couponID}">${popCancleItem.couponName}</td>
							                                <td>${popCancleItem.payStatus}</td>
							                                <td>${popCancleItem.startDate}</td>
							                                <td>${popCancleItem.amount}</td>     
							                            </tr>
							                        </c:forEach>
							
							                        <c:forEach var="freeCancleItem" items="${freeCancleItemList}">
							                            <tr class="freeTr">
							                                <td class="free-td" data-coupon-id="${freeCancleItem.couponID}">${freeCancleItem.couponName}</td>
							                                <td>${freeCancleItem.payStatus}</td>
							                                <td>${freeCancleItem.startDate}</td>
							                                <td>${freeCancleItem.amount}</td>     
							                            </tr>
							                        </c:forEach>
							                    </tbody>
							                </table>
							                <!-- <input type="hidden" class="pop-hidden" name="popItemId" value="" />
							                <input type="hidden" class="free-hidden" name="freeItemId" value=""  /> -->
							            <!-- </form> -->
							        </c:otherwise>
							    </c:choose>
							</div>
							<!-- 취소내역이 있을 때 -->
						</div>
					</div>
				</div>
			</div>
			<script>
			
				$(document).ready(function(){
				    $(".tabs li").on("click", function(){
				        $(".tabs li").removeClass("active"); // 모두 비활성화
				        $(this).addClass("active");          // 클릭한 항목만 활성화
				    });
				});
			
				$(".tabs li").eq(0).on("click", function(){
					$("#tab_conts2").hide();
					$("#tab_conts3").hide();
					$("#tab_conts1").show();
				});
				$(".tabs li").eq(1).on("click", function(){
					console.log("클릭");
					$("#tab_conts1").hide();
					$("#tab_conts3").hide();
					$("#tab_conts2").show();
				});
				$(".tabs li").eq(2).on("click", function(){
					$("#tab_conts1").hide();
					$("#tab_conts2").hide();
					$("#tab_conts3").show();
				});
			</script>
			<!-- 정기권 취소 레이어 팝업 -->
			<!-- 고속버스 정기권 취소하기 팝업 - 취소내역확인 -->
			<!-- 프리패스 취소 레이어 팝업 -->
			<!-- 고속버스 프리패스 취소하기 팝업 - 취소내역확인 -->
			<!-- 정기권 취소결과 레이어 팝업 -->
			<!-- 고속버스 정기권 취소하기 팝업 - 취소완료 -->
			<!-- 프리패스 취소결과 레이어 팝업 -->
			<!-- 고속버스 정기권 취소하기 팝업 - 취소완료 -->
			<!-- 정기권 사용내역 레이어 팝업 -->
			<!-- 고속버스 정기권 사용내역 팝업 -->
			<!-- 프리패스 사용내역 레이어 팝업 -->
			<!-- 고속버스 프리패스 사용내역 팝업 -->
		</article>
	<div
		style="left: -1000px; overflow: scroll; position: absolute; top: -1000px; border: none; box-sizing: content-box; height: 200px; margin: 0px; padding: 0px; width: 200px;">
		<div
			style="border: none; box-sizing: content-box; height: 200px; margin: 0px; padding: 0px; width: 200px;"></div>
	</div>
	<div class="remodal-overlay remodal-is-closed" style="display:none;"></div>
	<!-- 정기권 취소 모달창 :확정 -->
	<div class="remodal-wrapper remodal-is-closed" style="display:none;">
		<div
			class="remodal pop_pass_history remodal-is-initialized remodal-is-closed"
			data-remodal-id="popRefundSeasonTicket_step1" id="popPassRefund"
			role="dialog" tabindex="-1">
			<div class="title type_blue">
				<h2>취소하기</h2>
			</div>
			<form id="adtnCanTranFrm" name="adtnCanTranFrm">
				<input id="adtnCpnNoH" name="adtnCpnNoH" type="hidden" value="" /> <input
					id="adtnPrdKndCdH" name="adtnPrdKndCdH" type="hidden" value="" />
			</form>
			<div class="cont">
				<div class="cont_inner">
					<ol class="process">
						<li aria-current="true" class="active">취소내역확인</li>
						<li>취소완료</li>
					</ol>
					<!-- 취소내역 -->
					<div class="box_detail_info">
						<div class="routeHead">
							<p class="date txt_black">취소내역</p>
							<p class="ticket_number">
								<span>정기권</span> 일련번호<strong class="num" id="adtnCpnNoP"></strong>
							</p>
						</div>
						<div class="routeBody page_payment add_com">
							<div class="routeArea route_wrap">
								<div class="inner">
									<!-- <span class="roundBox departure" id="adtnDeprNmP"></span>
							<span class="roundBox arrive" id="adtnArvlNmP"></span> -->
									<dl class="roundBox departure kor">
										<dt>출발</dt>
										<dd id="adtnDeprNmP">
											<!-- 출발지 -->
										</dd>
									</dl>
									<dl class="roundBox arrive kor">
										<dt>도착</dt>
										<dd id="adtnArvlNmP">
											<!-- 도착지 -->
										</dd>
									</dl>
								</div>
							</div>
							<div class="routeArea route_wrap mob_route">
								<div class="tbl_type2">
									<table class="tbl_info">
										<caption>정기권 정보 표이며 이용권종, 버스이용등급, 사용기간, 이용가능일수, 사용일
											정보 제공</caption>
										<colgroup>
											<col style="width: 140px;" />
											<!-- 191118 수정 -->
											<col style="width: *;" />
										</colgroup>
										<tbody>
											<tr>
												<th scope="row">이용권종</th>
												<td id="adtnPrdUseNtknNmP"></td>
											</tr>
											<tr>
												<th scope="row">버스이용등급 <!-- 190319 추가 - 툴팁 -->
													<div class="tooltip_wrap_inbl">
														<a class="tip_click" href="javascript:void(0)"><span
															class="sr-only">버스이용등급 안내</span></a>
														<div class="tooltip" style="width: 310px; display: none;">
															<p class="tit">버스이용등급 안내</p>
															<ul class="desc_list">
																<li>우등 : 우등고속, 심야우등(심우) 탑승 가능</li>
																<li>고속 : 일반고속, 심야고속(심고) 탑승 가능</li>
																<li>전체 : 우등, 고속 모두 탑승 가능</li>
															</ul>
															<a class="close" href="javascript:void(0)"><span
																class="sr-only">닫기</span></a>
														</div>
													</div> <!-- //190319 추가 - 툴팁 -->
												</th>
												<td id="adtnPrdUseClsNmP"></td>
											</tr>
											<tr>
												<th scope="row">사용기간</th>
												<td><span id="exdtSttDtP"></span> ~ <span
													id="exdtEndDtP"></span></td>
											</tr>
											<tr>
												<th scope="row">이용가능일수</th>
												<td><span id="adtnPrdUsePsbDnoP"></span>일</td>
											</tr>
											<tr>
												<th scope="row">사용일</th>
												<td id="wkdWkeNtknNmP"></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<!-- //취소내역 -->
					<!-- 결제정보 -->
					<div class="bgGray pdBox blue mob_route">
						<div class="tbl_type3">
							<table class="taR">
								<caption>결제 및 취소 정보에 대한 표이며 결제금액, 사용금액, 취소위약금, 총 환불금액
									정보 제공</caption>
								<colgroup>
									<col style="width: 65%;" />
									<!-- 191118 수정 -->
									<col style="width: *;" />
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">결제금액</th>
										<td id="pubAmtP"></td>
									</tr>
									<tr>
										<th scope="row">사용금액 : 1회 요금(<span id="onceFeeP"></span>원)
											× 2회 × 유효기간경과일수(<span id="elpsDnoUP"></span>일)
										</th>
										<!-- 191118 수정 -->
										<td id="acmtDdctAmtP"></td>
									</tr>
									<tr>
										<th scope="row">취소위약금 : (결제금액-사용금액) × 일별환불율(<span
											id="brdRyBrkpAmtRtP"></span>%) × 유효기간경과일수(<span
											id="elpsDnoCP"></span>일)
										</th>
										<!-- 191118 수정 -->
										<td id="brkpAmtCmmP"></td>
									</tr>
									<tr>
										<th scope="row">총 환불금액</th>
										<td><strong id="ryAmtP"></strong>원</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<!-- //결제정보 -->
					<!-- 취소수수료 -->
					<div class="mob_pad marT30">
						<h3 class="pop_h3 mob_h3">취소수수료</h3>
						<div class="tbl_type1 row">
							<table>
								<caption>취소수수료 정보 제공 표</caption>
								<colgroup>
									<col style="width: 37%;" />
									<col style="width: 8%" />
									<col style="width: auto" />
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">시작 사용일 이전 취소 시</th>
										<td colspan="3">사용기간 시작일 이전에만 취소 가능. (미 사용시)<br /> ※ 고속버스
											정기권 금액 100% 환불.
										</td>
										<!-- 191025 수정 -->
									</tr>
									<tr>
										<!-- 191025 수정 -->
										<th rowspan="11" scope="row">사용 기간 중 취소 시</th>
										<!-- 191101 수정 -->
										<td colspan="3">
											<ul class="desc_list">
												<li>사용 시작일로부터 1일 왕복 금액 소멸.</li>
												<!-- 191101 수정 -->
											</ul>
										</td>
										<!-- //191025 수정 -->
									</tr>
									<tr>
										<th rowspan="6" style="color: #333;">평일권</th>
										<th rowspan="2" style="width: 8%; color: #333;">5일권</th>
										<td>
											<ul class="desc_list">
												<li>사용 1일 ~ 3일(사용가능일 기준) 까지 취소 시 잔여 금액의 25% 취소 수수료 x 사용
													기간 경과일 수 공제 후 환불.</li>
											</ul>
										</td>
									</tr>
									<tr>
										<td>
											<ul class="desc_list">
												<li>사용 4일(사용가능일 기준) 부터는 환불 불가</li>
											</ul>
										</td>
									</tr>
									<tr>
										<th rowspan="2" style="width: 8%; color: #333;">20일권</th>
										<td>
											<ul class="desc_list">
												<li>사용 1일 ~ 9일(사용가능일 기준) 까지 취소 시 잔여 금액의 10% 취소 수수료 x 사용
													기간 경과일 수 공제 후 환불.</li>
											</ul>
										</td>
									</tr>
									<tr>
										<td>
											<ul class="desc_list">
												<li>사용 10일(사용가능일 기준) 부터는 환불 불가</li>
											</ul>
										</td>
									</tr>
									<tr>
										<th rowspan="2" style="width: 8%; color: #333;">30일권</th>
										<td>
											<ul class="desc_list">
												<li>사용 1일 ~ 19일(사용가능일 기준) 까지 취소 시 잔여 금액의 5% 취소 수수료 x 사용
													기간 경과일 수 공제 후 환불.</li>
											</ul>
										</td>
									</tr>
									<tr>
										<td>
											<ul class="desc_list">
												<li>사용 20일(사용가능일 기준) 부터는 환불 불가</li>
											</ul>
										</td>
									</tr>
									<!-- <tr>
								<th rowspan="2">평일권</th>
								<td>
									<ul class="desc_list">
										<li>사용 1일 ~ 9일 까지 취소 시 잔여 금액의 `10% 취소 수수료 x 사용 기간 경과일 수' 공제
											후 환불.</li>
										191101 수정
									</ul>
								</td>
							</tr>
							<tr>
								<td>
									<ul class="desc_list">
										<li>사용 10일부터는 환불 불가</li>
										191101 수정
									</ul>
								</td>
							</tr> -->
									<tr>
										<th rowspan="4" style="color: #333;">전일권</th>
										<th rowspan="2" style="color: #333;">5일권</th>
										<td colspan="3">
											<ul class="desc_list">
												<li>사용 1일 ~ 3일까지 취소 시 잔여 금액의 25% 취소 수수료 X 사용 기간 경과 일수
													공제 후 환불.</li>
												<!-- 191101 수정 -->
											</ul>
										</td>
									</tr>
									<tr>
										<td colspan="3">
											<ul class="desc_list">
												<li>사용 4일(사용가능일 기준)부터는 환불 불가</li>
												<!-- 191101 수정 -->
											</ul>
										</td>
									</tr>
									<tr>
										<th rowspan="2" style="color: #333;">30일권</th>
										<td colspan="3">
											<ul class="desc_list">
												<li>사용 1일 ~ 19일까지 취소 시 잔여 금액의 5% 취소 수수료 X 사용 기간 경과 일수
													공제 후 환불.</li>
												<!-- 191101 수정 -->
											</ul>
											<p class="desc_add type02">※ 예시) 서울~천안/우등+심우 사용등급 정기권 금액
												304,200원 구매하고, 사용 기간 3일 경과 후 환불 시</p>
											<ol>
												<li>① 304,200원(정기권) – 30,420원(3일) = 273,780원</li>
												<li>② 273,780원 X 5% X 3 = 41,067원 (취소 수수료 5%, 사용 기간 3일
													경과)</li>
												<li>③ 환불 금액 : 232,713원</li>
											</ol>
										</td>
									</tr>
									<tr>
										<td colspan="3">
											<ul class="desc_list">
												<li>사용 20일(사용가능일 기준)부터는 환불 불가</li>
												<!-- 191101 수정 -->
											</ul>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<!-- //취소수수료 -->
					</div>
					<!-- //취소수수료 -->
					<!-- 20210318 프리패스 old -->
					<div class="btns col1">
						<button class="btnL btn_orange" data-remodal-action="confirm"
							type="button" id="closeRemodal">닫기</button>
						<button class="btnL btn_orange" data-remodal-action="confirm"
							onclick="fnAdtnCanTran();" type="button" id="cancleRefund">취소환불하기</button>
					</div>
				</div>
			</div>
			<button class="remodal-close" data-remodal-action="close"
				type="button" id="closeRemodal">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
	<!-- 정기권 프리패스 취소완료 모달창 -->
	<div class="remodal-wrapper remodal-is-closed" style="display:none;" id="remodal-freePassWrapper">
		<div
			class="remodal pop_pass_history remodal-is-initialized remodal-is-closed"
			data-remodal-id="popRefundSeasonTicket_step2" id="popPassRefundRst"
			role="dialog" tabindex="-1">
			<div class="title type_blue">
				<h2>취소하기</h2>
			</div>
			<div class="cont">
				<div class="cont_inner">
					<ol class="process">
						<li>취소내역확인</li>
						<li aria-current="true" class="active">취소완료</li>
					</ol>
					<!-- 결제정보 -->
					<div class="bgGray pdBox blue mob_route">
						<div class="tbl_type3">
							<table class="taR">
								<caption>결제 취소 정보에 대한 표이며 결제금액, 사용금액, 취소위약금, 총 환불금액 정보
									제공</caption>
								<colgroup>
									<col style="width: 115px;" />
									<col style="width: *;" />
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">결제금액</th>
										<td id="pubAmtPr"></td>
									</tr>
									<tr>
										<th scope="row">사용금액</th>
										<td id="acmtDdctAmtPr"></td>
									</tr>
									<tr>
										<th scope="row">취소위약금</th>
										<td id="brkpAmtCmmPr">0</td>
									</tr>
									<tr>
										<th scope="row">총 환불금액</th>
										<td><strong id="ryAmtPr"></strong>원</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<!-- //결제정보 -->
					<div class="btns col1">
						<button class="btnL btn_orange"
							type="button" id="closeRemodal">닫기</button>
					</div>
				</div>
			</div>
			<button class="remodal-close" data-remodal-action="close"
				type="button" id="closeRemodal">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
	
	<!-- 프리패스 취소 모달창 -->
		<div class="remodal-wrapper remodal-is-closed" style="display:none;">
		<div
			class="remodal pop_pass_history remodal-is-initialized remodal-is-closed"
			data-remodal-id="popRefundFreepass_step1" id="popFrpsRefund"
			role="dialog" tabindex="-1">
			<div class="title type_blue">
				<h2>취소하기</h2>
			</div>
			<div class="cont">
				<div class="cont_inner">
					<ol class="process">
						<li aria-current="true" class="active">취소내역확인</li>
						<li>취소완료</li>
					</ol>
					<!-- 취소내역 -->
					<div class="box_detail_info">
						<div class="routeHead">
							<p class="date txt_black">취소내역</p>
							<p class="ticket_number">
								프리패스 일련번호<strong class="num" id="adtnCpnNoF"></strong>
							</p>
						</div>
						<div class="routeBody page_payment add_com">
							<div class="routeArea">
								<p class="freepass_name" id="adtnPrdUsePsbDnoF"></p>
							</div>
							<div class="routeArea route_wrap mob_route">
								<div class="tbl_type2">
									<table class="tbl_info">
										<caption>프리패스 여행권 정보 표이며 이용권종, 버스이용등급, 사용일자, 승차권별 정보
											제공</caption>
										<colgroup>
											<col style="width: 125px;" />
											<col style="width: *;" />
										</colgroup>
										<tbody>
											<tr>
												<th scope="row">이용권종</th>
												<td id="adtnPrdUseNtknNmF"></td>
											</tr>
											<tr>
												<th scope="row">버스이용등급 <!-- 190319 추가 - 툴팁 -->
													<div class="tooltip_wrap_inbl">
														<a class="tip_click" href="javascript:void(0)"><span
															class="sr-only">버스이용등급 안내</span></a>
														<div class="tooltip" style="width: 310px; display: none;">
															<p class="tit">버스이용등급 안내</p>
															<ul class="desc_list">
																<li>우등 : 우등고속, 심야우등(심우) 탑승 가능</li>
																<li>고속 : 일반고속, 심야고속(심고) 탑승 가능</li>
																<li>전체 : 우등, 고속 모두 탑승 가능</li>
															</ul>
															<a class="close" href="javascript:void(0)"><span
																class="sr-only">닫기</span></a>
														</div>
													</div> <!-- //190319 추가 - 툴팁 -->
												</th>
												<td id="adtnPrdUseClsNmF"></td>
											</tr>
											<tr>
												<th scope="row">사용일자</th>
												<td><span class="useDate" id="fulTermF"></span></td>
											</tr>
											<tr>
												<th scope="row">승차권별</th>
												<td id="wkdWkeNtknNmF"></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<!-- //취소내역 -->
					<!-- 결제정보 -->
					<div class="bgGray pdBox blue mob_route">
						<div class="tbl_type3">
							<table class="taR">
								<caption>결제 및 취소 정보에 대한 표이며 결제금액, 사용금액, 취소위약금, 총 취소금액
									정보 제공</caption>
								<colgroup>
									<col style="width: 330px;" />
									<col style="width: *;" />
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">결제금액</th>
										<td id="pubAmtF"></td>
									</tr>
									<tr>
										<th scope="row">사용금액</th>
										<td id="acmtDdctAmtF"></td>
									</tr>
									<tr>
										<th scope="row">취소위약금</th>
										<td id="brkpAmtCmmF"></td>
									</tr>
									<tr>
										<th scope="row">총 취소금액</th>
										<td><strong id="ryAmtF"></strong>원</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<!-- //결제정보 -->
					<!-- 취소수수료 -->
					<div class="mob_pad marT30">
						<h3 class="pop_h3 mob_h3">취소수수료</h3>
						<div class="tbl_type1 row">
							<table>
								<caption>취소수수료 정보 제공 표</caption>
								<colgroup>
									<col style="width: 50%;" />
									<col style="width: auto" />
								</colgroup>
								<tbody>
									<tr>
										<th scope="row">사용 시작일 1일 후 취소 시</th>
										<td>사용 시작일 1일 후 취소가능<br /> 승차권 금액 100% 환불
										</td>
									</tr>
									<tr>
										<th scope="row">승차권 발권 상태인 경우</th>
										<td>취소/환불 불가</td>
									</tr>
								</tbody>
							</table>
						</div>
						<!-- //취소수수료 -->
					</div>
					<!-- //취소수수료 -->
					<div class="btns col1">
						<button class="btnL btn_orange" data-remodal-action="confirm"
							type="button" id="closeRemodal">닫기</button>
						<button class="btnL btn_orange" data-remodal-action="confirm"
							onclick="fnAdtnCanTran();" type="button">취소환불하기</button>
					</div>
				</div>
			</div>
			<button class="remodal-close" data-remodal-action="close"
				type="button" id="closeRemodal">
				<span class="sr-only">닫기</span>
			</button>
		</div>
	</div>
	<script>
		$("[id^='close']").on("click", function(){
			$(".remodal-wrapper").hide();
		});
	</script>

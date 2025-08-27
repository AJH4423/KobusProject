<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="col-sm-9 col-lg-10 main">
	<h1 class="page-header">관리자 대시보드</h1>

	<!-- 카드 통계 영역 (2행 2열) -->
	<div class="row" style="margin-bottom: 30px;">
		<!-- 왼쪽: 회원 도넛 차트 -->
		<div class="col-md-4">
			<div class="panel panel-blue panel-widget">
				<div class="text-center" style="padding: 20px;">
					<h4>회원 분포 차트</h4>
					<canvas id="userChart" width="50" height="50" style="max-width: 100%; margin-top: 20px;"></canvas>
				</div>
			</div>
		</div>

		<!-- 오른쪽: 통계 카드 2x2 -->
		<div class="col-md-8">
			<div class="row">
				<!-- 관리자 수 -->
				<div class="col-sm-6">
					<div class="panel panel-blue panel-widget text-center" style="padding: 20px 10px;">
						<em class="fa fa-user-shield fa-3x"></em>
						<div class="large" style="margin-top: 10px;">${adminCount}</div>
						<div class="text-muted">총 관리자 수</div>
					</div>
				</div>b  

				<!-- 일반 회원 수 -->
				<div class="col-sm-6">
					<div class="panel panel-blue panel-widget text-center" style="padding: 20px 10px;">
						<em class="fa fa-user fa-3x"></em>
						<div class="large" style="margin-top: 10px;">${memberCount}</div>
						<div class="text-muted">총 일반 회원</div>
					</div>
				</div>

				<!-- 총 예매 수 -->
				<div class="col-sm-6">
					<div class="panel panel-orange panel-widget text-center" style="padding: 20px 10px;">
						<em class="fa fa-ticket fa-3x"></em>
						<div class="large" style="margin-top: 10px;">${reservationCount}</div>
						<div class="text-muted">총 예매 수</div>
					</div>
				</div>

				<!-- 총 매출 -->
				<div class="col-sm-6">
					<div class="panel panel-teal panel-widget text-center" style="padding: 20px 10px;">
						<em class="fa fa-credit-card fa-3x"></em>
						<div class="large" style="margin-top: 10px;">${totalRevenue}</div>
						<div class="text-muted">총 매출 (원)</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 쿠폰 구매 내역 바 차트 -->
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-default">
				<div class="panel-heading">쿠폰 판매량</div>
				<div class="panel-body text-center">
					<canvas id="ticketBarChart" width="800" height="350" style="max-width: 100%;"></canvas>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Chart.js 스크립트 -->
<script>
	// 서버에서 전달된 값
	var adminCount = ${adminCount};
	var memberCount = ${memberCount};
	var seasonCount = ${seasonTicketCount};
	var freePassCount = ${freeTicketCount};
	var totalCount = ${totalTicketCount};

	window.onload = function () {
		// 회원 분포 도넛 차트
		var userCtx = document.getElementById("userChart").getContext("2d");
		var userDonutData = [
			{
				value: adminCount,
				color: "#30a5ff",
				highlight: "#62b9fb",
				label: "관리자"
			},
			{
				value: memberCount,
				color: "#ffb53e",
				highlight: "#fac878",
				label: "회원"
			}
		];
		new Chart(userCtx).Doughnut(userDonutData, {
			responsive: true,
			percentageInnerCutout: 50
		});

		// 쿠폰 바 차트
		var ticketCtx = document.getElementById("ticketBarChart").getContext("2d");
		var ticketBarChartData = {
			labels: ["시즌권", "프리패스", "전체"],
			datasets: [
				{
					label: "티켓 수",
					fillColor: "rgba(48, 164, 255, 0.5)",
					strokeColor: "rgba(48, 164, 255, 0.8)",
					highlightFill: "rgba(48, 164, 255, 0.75)",
					highlightStroke: "rgba(48, 164, 255, 1)",
					data: [seasonCount, freePassCount, totalCount]
				}
			]
		};
		new Chart(ticketCtx).Bar(ticketBarChartData, {
			responsive: true
		});
	};
</script>

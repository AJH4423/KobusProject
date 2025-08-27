<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="col-sm-9 col-lg-10 main">
  <h1 class="page-header">관리자 대시보드</h1>
	
  <div class="row">
    <div class="col-xs-6 col-md-3">
      <div class="panel panel-blue panel-widget">
        <div class="row no-padding">
          <div class="col-sm-3 widget-left">
            <svg class="glyph stroked empty-message"><use xlink:href="#stroked-empty-message"/></svg>
          </div>
          <div class="col-sm-9 widget-right"><br />
          	<h3>회원 분포 차트</h3>
			<canvas id="userChart" width="400" height="300"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
	var adminCount = ${adminCount};
	var memberCount = ${memberCount};

	var userDonutData = [
		{
			value: adminCount,
			color:"#30a5ff",
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

	  
	// 또는 tooltipTemplate 제거

	window.onload = function(){
		var ctx = document.getElementById("userChart").getContext("2d");
		window.myDoughnut = new Chart(ctx).Doughnut(userDonutData, {
			responsive: true,
			percentageInnerCutout: 50
			// tooltipTemplate 제거 또는 JS파일에서 선언
		});
	};
</script>



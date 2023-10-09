import { Component, OnInit } from '@angular/core';
import { DataPoints } from 'src/app/interfaces/data-points';
import { DataStorageService } from 'src/app/service/dataservice/data-storage.service';
@Component({
  selector: 'app-porfolio-report',
  templateUrl: './porfolio-report.component.html',
  styleUrls: ['./porfolio-report.component.css']
})
export class PorfolioReportComponent implements OnInit{
	constructor(private dataService:DataStorageService){}
	benchMarkDataPoints: DataPoints[]=[];
	impactDataPoints:DataPoints[]=[];
	tempData:any;
	ngOnInit() {
		 this.tempData=this.dataService.portfolioImpact;
		for(let i=0;i<this.tempData.length;i++){
		  const newDataPointImpact: DataPoints = {
			x: new Date(this.tempData[i].reportingYear,1,1),
			y: this.tempData[i].totalCarbonFootprint// You can replace this with your actual data calculation
		 };
		 const newDataPointBenchMark: DataPoints = {
			x: new Date(this.tempData[i].reportingYear,1,1),
			y: this.tempData[i].benchMarkFootprint// You can replace this with your actual data calculation
		 };
		 this.benchMarkDataPoints.push(newDataPointBenchMark);
		 this.impactDataPoints.push(newDataPointImpact);
		}
	  }
  chart: any;
	chartOptions = {
	  animationEnabled: true,
	  theme: "dark1",
	  title:{
		text: "Carbon Footprint Impact vs Benchmark"
	  },
	  axisX:{
		valueFormatString: "YYYY"
	  },
	  axisY: {
		title: "Impact in $"
	  },
	  toolTip: {
		shared: true
	  },
	  legend: {
		cursor: "pointer",
		itemclick: function (e: any) {
			if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
				e.dataSeries.visible = false;
			} else {
				e.dataSeries.visible = true;
			} 
			e.chart.render();
		}
	  },
	  data: [{
		type: "line",
		showInLegend: true,
		name: "Benchmark",
		xValueFormatString: "YYYY",
		xValueType: "dateTime",
		dataPoints:this.benchMarkDataPoints
		//  [
		// 	{ x: new Date(2019, 1, 1), y: 6800},
		// 	{ x: new Date(2020, 1, 1), y: 6800 },
		// 	{ x: new Date(2021, 1, 1), y: 6800},
			// { x: new Date(2021, 8, 4), y: 70 },
			// { x: new Date(2021, 8, 5), y: 71 },
			// { x: new Date(2021, 8, 6), y: 65 },
			// { x: new Date(2021, 8, 7), y: 73 },
			// { x: new Date(2021, 8, 8), y: 86 },
			// { x: new Date(2021, 8, 9), y: 74 },
			// { x: new Date(2021, 8, 10), y: 75 },
			// { x: new Date(2021, 8, 11), y: 76 },
			// { x: new Date(2021, 8, 12), y: 84 },
			// { x: new Date(2021, 8, 13), y: 87 },
			// { x: new Date(2021, 8, 14), y: 76 },
			// { x: new Date(2021, 8, 15), y: 79 }
		//]
	  }, {
		type: "line",
		showInLegend: true,
		name: "Impact",
		dataPoints: this.impactDataPoints
		// [
		// 	{ x: new Date(2019, 1, 1), y: 79899.61666158545},
		// 	{ x: new Date(2020, 1, 1), y: 93782.0239996903 },
		// 	{ x: new Date(2021, 1, 1), y: 118256.18927917063 }
			// { x: new Date(2021, 8, 4), y: 56 },
			// { x: new Date(2021, 8, 5), y: 54 },
			// { x: new Date(2021, 8, 6), y: 55 },
			// { x: new Date(2021, 8, 7), y: 54 },
			// { x: new Date(2021, 8, 8), y: 69 },
			// { x: new Date(2021, 8, 9), y: 65 },
			// { x: new Date(2021, 8, 10), y: 66 },
			// { x: new Date(2021, 8, 11), y: 63 },
			// { x: new Date(2021, 8, 12), y: 67 },
			// { x: new Date(2021, 8, 13), y: 66 },
			// { x: new Date(2021, 8, 14), y: 56 },
			// { x: new Date(2021, 8, 15), y: 64 }
		//]
	  }]
	}	
}

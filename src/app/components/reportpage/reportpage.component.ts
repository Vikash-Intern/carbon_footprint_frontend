import { Component, OnInit } from '@angular/core';
import { CanvasJS, CanvasJSChart } from '@canvasjs/angular-charts';
import { DataPoints } from 'src/app/interfaces/data-points';
import { DataStorageService } from 'src/app/service/dataservice/data-storage.service';


@Component({
  selector: 'app-reportpage',
  templateUrl: './reportpage.component.html',
  styleUrls: ['./reportpage.component.css']
})

export class ReportpageComponent implements OnInit{

  constructor(private dataStorage:DataStorageService){}
  dataPoints: DataPoints[]=[];
  tempData:any=this.dataStorage.singleCompanyCarbonFootprint;
  ngOnInit() {
    const tempData:any=this.dataStorage.singleCompanyCarbonFootprint;
    // this.companyName=tempData[0].companyName;
    for(let i=0;i<tempData.length;i++){
      const newDataPoint: DataPoints = {
        x: new Date(tempData[i].reportingYear,1,1),
        y: tempData[i].carbonFootprint// You can replace this with your actual data calculation
     };
     this.dataPoints.push(newDataPoint);
    }
  }

 
//Loop to add data points

  chart: any;
	chartOptions = {
		theme: "dark1",
		animationEnabled: true,
		zoomEnabled: true,
    dataPointWidth: 5,
    backgroundColor: "#000000",
    toolTip: {
      fontColor: "Yellow",
   },
		title: {
			text: "Carbon footprint trend for "+this.tempData[0].companyName
		},
		axisY: [
      {
        title: "GHG Impact In $"
      }
		],
    axisX: [
      {
      xValueType: "dateTime",
      title :"Year",
      xValueFormatString: "YYYY",
      }],
		data: [{
      //type: "area",
			type: "line",
      lineThickness: 3,
      lineColor: "#2ae8c6",
			yValueFormatString: "$#,###.##",
      xValueType: "dateTime",
			dataPoints:this.dataPoints
      }	
	]
	}	
}                   



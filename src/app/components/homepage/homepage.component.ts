import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/service/dataservice/data-storage.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
 constructor(private globalService:GlobalService,private dataStorage:DataStorageService,private router: Router){}
   characters:any;
   hideList=false;
  request={
    companyName:'',
    investmentAmount:''
  };

  ngOnInit() {
   this.globalService.getCompaniesList().subscribe(
    (data)=>{
      this.characters=data;
      console.log("Suceess");
    },
    (error)=>{
      console.log("error while calling api");
    }
   )
    }
  

 calculateFootprint(){
  this.globalService.calculateforsinglecompany(this.request).subscribe(
    (data) => {
      this.dataStorage.singleCompanyCarbonFootprint=data;
      this.router.navigate(['/report']);
     console.log(data);
    },
    (error)=>{
      console.log(error);
    }
  );
 
 }
 selectCompany(companyName:string){
  this.request.companyName=companyName;
  this.hideList=true;
 }

 navigateToPortfolio(){
  this.router.navigate(['/portfolio']);
 }

}

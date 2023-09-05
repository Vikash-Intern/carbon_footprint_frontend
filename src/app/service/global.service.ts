import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) {    }

public calculateforsinglecompany(request:any){
  return this.http.post(`http://localhost:8080/companyInfo`,request);
  }

public getCompaniesList(){
  return this.http.get(`http://localhost:8080/getCompanies`);
}  

public calculatePortfolioImpcat(request:any){
  return this.http.post(`http://localhost:8080/portfolioInfo`,request);
}

}

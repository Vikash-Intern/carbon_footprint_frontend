import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { GlobalService } from '../../service/global.service';
import { DataStorageService } from '../../service/dataservice/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  constructor(private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private dataService: DataStorageService,
    private router: Router) {
    this.companyForm = this.formBuilder.group({
      companies: this.formBuilder.array([]),
    });
  }
  characters:any;
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
   
  companyForm: FormGroup;
  companiesArray: FormArray | null = null; // Declare it as a FormArray
  filteredCompanies: string[] = [];
  showDropdown:boolean[] =[]; // To control the visibility of the dropdown list
  selectedCompanyIndex: number | null = null; // To track the selected company index
  get companyControls() {
    return (this.companyForm.get('companies') as FormArray).controls;
  }
  addCompany() {
    const companiesArray = this.companyForm.get('companies') as FormArray;
    console.log(companiesArray.value);
    companiesArray.push(
      this.formBuilder.group({
        companyName: ['', Validators.required],
        investmentAmount: [0, Validators.min(0)]
      })
    );
    // Assign the form array to this.companiesArray
    this.companiesArray = companiesArray;
    console.log(this.companiesArray);
  }
  getCompanyNameControl(index: number): string {
    // Use optional chaining to access the property safely
    const companyName = this.companiesArray?.at(index)?.get('companyName')?.value;
    if (companyName !== undefined) {
      const companyGroup = this.companiesArray?.at(index) as FormGroup;
      const companyNameControl = companyGroup?.get('companyName') as FormControl;
      if (companyNameControl !== undefined) {
        console.log(companyNameControl.value as string);
        return companyNameControl.value as string;
      }
    }
    return '';
  }
    removeCompany(index: number) {
      const companiesArray = this.companyForm.get('companies') as FormArray;
      companiesArray.removeAt(index);
    }
    calculateImpact(){
     const companiesArray = this.companyForm.get('companies') as FormArray;
     console.log(companiesArray.value);
    //  this.companiesArray=companiesArray.value;
     this.globalService.calculatePortfolioImpcat(companiesArray.value).subscribe(
      (data)=>{
        this.dataService.portfolioImpact=data;
        console.log(data);
        this.router.navigate(['/portfolio-report']);
      },
      (error)=>{
        console.log(error);
      }
     )
    //  console.log(this.companiesArray);
    }
    // Handle the selection of a company from the dropdown
    onCompanyNameInput(event: any,i:number) {
      const searchText = event.target.value.toLowerCase();
      // Filter the companies based on user input
      this.filteredCompanies = this.characters.filter((company:string) =>
        company.toLowerCase().includes(searchText)
      );
      // Show/hide the dropdown list based on whether there are filtered results
      this.showDropdown[i] =true;
    }
    // Handle the selection of a company from the dropdown
    selectCompany(companyName: string,index:number) {
      // Ensure that a company was selected and a valid index is set
      if (this.selectedCompanyIndex !== null) {
        // Access the FormArray and set the value for the selected company
        const companiesArray = this.companyForm.get('companies') as FormArray;
        const control = companiesArray.at(this.selectedCompanyIndex).get('companyName');
        control?.setValue(companyName);
        // Hide the dropdown list
        this.showDropdown[index] =false;
      }
    }
    // ...
    // Add a method to set the selected company index
    setSelectedCompanyIndex(index: number) {
      this.selectedCompanyIndex = index;
    }
  }
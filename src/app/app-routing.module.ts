import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ReportpageComponent } from './components/reportpage/reportpage.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PorfolioReportComponent } from './components/porfolio-report/porfolio-report.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch:"full"
  },
  {
    path: 'report',
    component: ReportpageComponent,
    pathMatch:"full"
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    pathMatch:"full"
  },
  {
    path: 'portfolio-report',
    component: PorfolioReportComponent,
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

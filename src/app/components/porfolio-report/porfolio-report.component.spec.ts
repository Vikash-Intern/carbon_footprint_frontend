import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorfolioReportComponent } from './porfolio-report.component';

describe('PorfolioReportComponent', () => {
  let component: PorfolioReportComponent;
  let fixture: ComponentFixture<PorfolioReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorfolioReportComponent]
    });
    fixture = TestBed.createComponent(PorfolioReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportpageComponent } from './reportpage.component';

describe('ReportpageComponent', () => {
  let component: ReportpageComponent;
  let fixture: ComponentFixture<ReportpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportpageComponent]
    });
    fixture = TestBed.createComponent(ReportpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

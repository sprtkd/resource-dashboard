import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditReportExportComponent } from './audit-report-export.component';

describe('AuditReportExportComponent', () => {
  let component: AuditReportExportComponent;
  let fixture: ComponentFixture<AuditReportExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditReportExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditReportExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

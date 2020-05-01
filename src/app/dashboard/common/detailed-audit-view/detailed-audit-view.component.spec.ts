import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedAuditViewComponent } from './detailed-audit-view.component';

describe('DetailedAuditViewComponent', () => {
  let component: DetailedAuditViewComponent;
  let fixture: ComponentFixture<DetailedAuditViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedAuditViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedAuditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTableCommonviewComponent } from './customer-table-commonview.component';

describe('CustomerTableCommonviewComponent', () => {
  let component: CustomerTableCommonviewComponent;
  let fixture: ComponentFixture<CustomerTableCommonviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTableCommonviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTableCommonviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

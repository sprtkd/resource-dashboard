import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportRepresentativeComponent } from './support-representative.component';

describe('SupportRepresentativeComponent', () => {
  let component: SupportRepresentativeComponent;
  let fixture: ComponentFixture<SupportRepresentativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportRepresentativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit, Input } from '@angular/core';
import { CustomerUiBasicModel, CustomerStatus } from 'src/app/models/ui/customer.ui.details.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-customer-detailed-view',
  templateUrl: './customer-detailed-view.component.html',
  styleUrls: ['./customer-detailed-view.component.css']
})
export class CustomerDetailedViewComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  listOfStages: { stepName: String, stepFormName: FormGroup }[] =
    [{ stepName: "Initiated", stepFormName: this.firstFormGroup },
    { stepName: "Customer Response", stepFormName: this.secondFormGroup },
    { stepName: "Pending for Approval", stepFormName: null },
    { stepName: "Closed", stepFormName: null }];
  @Input() selectedCustomer: CustomerUiBasicModel;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({

      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  getCurrentStatus(): String {
    return CustomerStatus[this.selectedCustomer.status];
  }

}

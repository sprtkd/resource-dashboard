import { Component, OnInit, Input } from '@angular/core';
import { CustomerUiBasicModel, CustomerStatus } from 'src/app/models/ui/customer.ui.details.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { CustomerUiDetailedStepperModel } from 'src/app/models/ui/customer.ui.detailed.stepper.model';

@Component({
  selector: 'app-customer-detailed-view',
  templateUrl: './customer-detailed-view.component.html',
  styleUrls: ['./customer-detailed-view.component.css']
})
export class CustomerDetailedViewComponent implements OnInit {

  listOfStages: CustomerUiDetailedStepperModel[] = [];
  currentStage = 3;
  oldTickets =["Jay", "Robin"];
  @Input() selectedCustomer: CustomerUiBasicModel;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.listOfStages = CustomerUiDetailedStepperModel.buildBasicStepper();
    this.initStepperValue();
  }

  getCurrentStatus(): String {
    return CustomerStatus[this.selectedCustomer.status];
  }

  initStepperValue() {
    for (let key = 0; key < this.listOfStages.length; key++) {
      if (key < this.currentStage) {
        this.listOfStages[key].completed = true;
      }
      else {
        this.listOfStages[key].completed = false;
      }

    }
  }

  tryingToContact(){
    
  }

}

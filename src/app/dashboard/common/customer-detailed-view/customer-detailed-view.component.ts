import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CustomerUiBasicModel, CustomerStatus, CustomerExtraDetails } from 'src/app/models/ui/customer.ui.details.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { CustomerUiDetailedStepperModel } from 'src/app/models/ui/customer.ui.detailed.stepper.model';
import { CommonsService } from 'src/app/services/commons.service';
import { MatStepper } from '@angular/material/stepper';
import { TicketService } from 'src/app/services/ticket.service';
import { NavbarComponent } from 'src/app/common/navbar/navbar.component';

@Component({
  selector: 'app-customer-detailed-view',
  templateUrl: './customer-detailed-view.component.html',
  styleUrls: ['./customer-detailed-view.component.css'],
  providers: [TicketService]
})
export class CustomerDetailedViewComponent implements OnInit {

  listOfStages: CustomerUiDetailedStepperModel[] = [];
  currentStage = 0;
  responsetypeSelected: String;
  @Input() selectedCustomer: CustomerUiBasicModel;
  @ViewChild('stepper') private myStepper: MatStepper;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver, private _formBuilder: FormBuilder,
    private ticketService: TicketService, private commonsService: CommonsService, private navbar: NavbarComponent) { }

  ngOnInit(): void {
    this.listOfStages = CustomerUiDetailedStepperModel.buildBasicStepper();
    this.initStepperValue();
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

  tryingToContact() {
    this.commonsService.openSnackBar("Trying to Contact", "Cancel", null);
  }

  tryingToMail() {
    let mailBody = "Hi " + this.selectedCustomer.name + ", %0D%0AThis is to inform you that we are initiating dormant account closure for your account: " +
      this.selectedCustomer.accountNumber + ".%0D%0AOur representative will contact you shortly.%0D%0ARegards,%0D%0AABC Bank";
    let mailText = "mailto:" + this.selectedCustomer.moreDetails.emailId + "?subject=Dormant Account Closure&body=" + mailBody;
    window.location.href = mailText;
  }

  connectedToCustomer() {
    this.currentStage = 1;
    this.initStepperValue();
    this.myStepper.linear = false;
    this.myStepper.next();
    this.myStepper.linear = true;

  }

  onResponseSubmit() {
    this.currentStage = 2;
    this.initStepperValue();
    this.myStepper.linear = false;
    this.myStepper.next();
    this.myStepper.linear = true;
  }
  onSubmissionCancel() {

  }

  initiateTicket() {
    this.selectedCustomer.moreDetails = new CustomerExtraDetails();
    this.navbar.spinnerStart();
    this.ticketService.initiateCustomer(this.selectedCustomer.accountNumber, this.commonsService.getLoggedIn().username).subscribe(
      (data) => {
        this.selectedCustomer.moreDetails.ticketRaised = data;
      }, error => {
        this.commonsService.openSnackBar(error, "Try Again", null);
      }).add(() => {
        this.navbar.spinnerStop();
      });


  }

}

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
  userRole: String;
  otherComment: String;
  pendingActionComment: String;
  customerKnewDormant: Boolean;
  customerAgreedTransaction: Boolean;
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
    this.decideCurrentStage();
    this.initStepperValue();

    if (this.commonsService.getLoggedIn()) {
      this.userRole = this.commonsService.getLoggedIn().role;
    }
  }
  decideCurrentStage() {
    if (this.selectedCustomer.status == CustomerStatus.INACTIVE) {
      this.currentStage = 0;
    } else if (this.selectedCustomer.status == CustomerStatus.INITIATED || this.selectedCustomer.status == CustomerStatus.CUSTOMER_CONNECT) {
      this.currentStage = 0;
    } else if (this.selectedCustomer.status == CustomerStatus.CUST_RESP) {
      this.currentStage = 1;
    } else if (this.selectedCustomer.status == CustomerStatus.PENDING_APPROVAL) {
      this.currentStage = 2;
    } else if (this.selectedCustomer.status == CustomerStatus.MARKED_AS_ACTIVE || this.selectedCustomer.status == CustomerStatus.MARKED_AS_CLOSED) {
      this.currentStage = 3;
    }
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

  tryingToContactPhone() {
    this.commonsService.openSnackBar("Trying to Call", "Cancel", null);
    this.triedConnectingCustomer("Contacted By Call.");
  }

  tryingToContactMessage() {
    this.commonsService.openSnackBar("Trying to Message", "Cancel", null);
    this.triedConnectingCustomer("Contacted By Message(SMS).");
  }

  tryingToMail() {
    let mailBody = "Hi " + this.selectedCustomer.name + ", %0D%0AThis is to inform you that we are initiating dormant account closure for your account: " +
      this.selectedCustomer.accountNumber + ".%0D%0AOur representative will contact you shortly.%0D%0ARegards,%0D%0AABC Bank";
    let mailText = "mailto:" + this.selectedCustomer.moreDetails.emailId + "?subject=Dormant Account Closure&body=" + mailBody;
    window.location.href = mailText;
    this.triedConnectingCustomer("Contacted By Mail");
  }

  connectedToCustomer() {
    this.updateTicket("CUST_RESP", "Successfully Connected with Customer.", () => {
      this.decideCurrentStage();
      this.initStepperValue();
      this.myStepper.linear = false;
      this.myStepper.next();
      this.myStepper.linear = true;
    })
  }

  onResponseSubmit() {
    this.updateTicket("PENDING_APPROVAL", this.getSubmitDescription(), () => {
      this.decideCurrentStage();
      this.initStepperValue();
      this.myStepper.linear = false;
      this.myStepper.next();
      this.myStepper.linear = true;
    })
  }

  getSubmitDescription(): string {
    let submitDesc: string = "";
    submitDesc = submitDesc + "Customer Response Recorded successfully. \n\n";
    submitDesc = submitDesc + "Response: " + this.getSubmitType(this.responsetypeSelected) + "\n";
    if (this.responsetypeSelected == 'comment') {
      submitDesc = submitDesc + "Comment: " + this.otherComment + "\n";
    }
    submitDesc = submitDesc + "Customer knew Dormancy?: " + (this.customerKnewDormant ? "Yes" : "No") + "\n";
    submitDesc = submitDesc + "Customer agreed to Transact:? " + (this.customerAgreedTransaction ? "Yes" : "No") + "\n\n";
    return submitDesc;
  }

  getSubmitType(key: String) {
    switch (key) {
      case "agreeClose":
        return "Customer Agreed to Close Account";
        break;
      case "agreeActivate":
        return "Customer Agreed to Activate";
        break;
      case "requestDelay":
        return "Customer Requested Delay";
        break;
      case "declinedToComment":
        return "Customer Requested Delay";
        break;

      default: return key;
        break;
    }
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

  triedConnectingCustomer(byType: string) {
    this.updateTicket("CUSTOMER_CONNECT", byType, null);
  }

  updateTicket(status: string, description: string, onsuccess) {
    this.navbar.spinnerStart();
    this.ticketService.updateTicketByHistory(this.selectedCustomer.moreDetails.ticketNumber.toString(),
      this.commonsService.getLoggedIn().username.toString(),
      status, description).subscribe(
        (data) => {
          onsuccess()
        }, error => {
          this.commonsService.openSnackBar(error, "Try Again", null);
        }).add(() => {
          this.navbar.spinnerStop();
        });
  }

  approveTicket(status: string, description: string, onsuccess) {
    this.navbar.spinnerStart();
    this.ticketService.approveTicket(this.selectedCustomer.moreDetails.ticketNumber.toString(),
      this.commonsService.getLoggedIn().username.toString(),
      status, description).subscribe(
        (data) => {
          onsuccess()
        }, error => {
          this.commonsService.openSnackBar(error, "Try Again", null);
        }).add(() => {
          this.navbar.spinnerStop();
        });
  }

  onConnectFailed() {
    this.updateTicket("PENDING_APPROVAL", "Connect with customer failed.", () => {
      this.decideCurrentStage();
      this.initStepperValue();
      this.myStepper.linear = false;
      this.myStepper.next();
      this.myStepper.next();
      this.myStepper.linear = true;
    })

  }

  approveActivation() {
    this.approveTicket("MARKED_AS_ACTIVE", this.getDescriptionForApproval("MARKED_AS_ACTIVE"), () => {
      this.decideCurrentStage();
      this.initStepperValue();
      this.myStepper.linear = false;
      this.myStepper.next();
      this.myStepper.linear = true;
    })
  }

  approveClosure() {
    this.approveTicket("MARKED_AS_CLOSED", this.getDescriptionForApproval("MARKED_AS_CLOSED"), () => {
      this.decideCurrentStage();
      this.initStepperValue();
      this.myStepper.linear = false;
      this.myStepper.next();
      this.myStepper.linear = true;
    })
  }

  getDescriptionForApproval(type: string): string {
    let approvalDesc: string = "";
    approvalDesc += "This ticket has been approved.\n"
    if (type == "MARKED_AS_CLOSED") {
      approvalDesc += "Account has been marked for closure.\n";
    }
    else {
      approvalDesc += "Account has been marked for activation.\n";
    }
    approvalDesc += "Additional feedback: \n";
    approvalDesc += this.pendingActionComment ? this.pendingActionComment : "None";
    return approvalDesc;
  }

  rejectPendingRequest() {

  }

  refreshCurrentTicket() {
    this.navbar.spinnerStart();
    this.ticketService.getTicketById(this.selectedCustomer.moreDetails.ticketNumber.toString()).subscribe(
      (data) => {
        this.selectedCustomer.moreDetails.ticketRaised = data;
      }, error => {
        this.commonsService.openSnackBar(error, "Try Again", null);
      }).add(() => {
        this.navbar.spinnerStop();
      });
  }

}

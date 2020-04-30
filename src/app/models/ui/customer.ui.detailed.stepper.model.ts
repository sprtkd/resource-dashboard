export class CustomerUiDetailedStepperModel {
    stepName: String;
    completed: Boolean;
    stepViewName: String;
    stepDescriptionOps: String;
    stepDescriptionReviewer: String;

    static buildBasicStepper(): CustomerUiDetailedStepperModel[] {
        let customerUiDetailedStepperModelArray: CustomerUiDetailedStepperModel[] = [];
        let stepNames: String[] = ["Initiated", "Customer Response", "Pending for Approval", "Closed"];
        let stepViewNames: String[] = ["init", "custResp", "approve", "closed"];
        let stepDescriptionsOps: String[] = [
            "Dormant Account Closure Ticket has been assigned to you for this customer. An initiation mail has been sent to customer.",
            "Please record Customer Response. If customer connect failed, you can retry now or later.",
            "Thanks. Response has been recorded. Its pending for Reviewer to approve.",
            "This ticket has been closed by Reviewer."
        ];
        let stepDescriptionsReviewer: String[] = [
            "A Support Representative has been assigned to this customer. An initiation mail has been sent to customer.",
            "Support Representative has contacted customer.",
            "Customer Response has been recorded. Please take action against the ticket. Its pending for you.",
            "You have closed this ticket."
        ];
        for (var [key, stepName] of stepNames.entries()) {
            let customerUiDetailedStepperModel: CustomerUiDetailedStepperModel = new CustomerUiDetailedStepperModel();
            customerUiDetailedStepperModel.stepName = stepName;
            customerUiDetailedStepperModel.completed = false;
            customerUiDetailedStepperModel.stepViewName = stepViewNames[key];
            customerUiDetailedStepperModel.stepDescriptionOps = stepDescriptionsOps[key];
            customerUiDetailedStepperModel.stepDescriptionReviewer = stepDescriptionsReviewer[key];
            customerUiDetailedStepperModelArray.push(customerUiDetailedStepperModel);
        }
        return customerUiDetailedStepperModelArray;

    }
}


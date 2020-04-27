export class CustomerUiDetailedStepperModel {
    stepName: String;
    completed: Boolean;
    stepViewName: String;
    stepDescription: String

    static buildBasicStepper(): CustomerUiDetailedStepperModel[] {
        let customerUiDetailedStepperModelArray: CustomerUiDetailedStepperModel[] = [];
        let stepNames: String[] = ["Initiated", "Customer Response", "Pending for Approval", "Closed"];
        let stepViewNames: String[] = ["init", "custResp", "approve", "closed"];
        let stepDescriptions: String[] = [
            "Dormant Ticket Closure Ticket has been assigned to you for this customer. An initiation mail has been sent to customer.",
            "Please record Customer Response. If customer connect failed, you can retry now or later.",
            "Thanks. Response has been recorded. Its pending for admin to approve.",
            "This ticket has been closed."
        ];
        for (var [key, stepName] of stepNames.entries()) {
            let customerUiDetailedStepperModel: CustomerUiDetailedStepperModel = new CustomerUiDetailedStepperModel();
            customerUiDetailedStepperModel.stepName = stepName;
            customerUiDetailedStepperModel.completed = false;
            customerUiDetailedStepperModel.stepViewName = stepViewNames[key];
            customerUiDetailedStepperModel.stepDescription = stepDescriptions[key];
            customerUiDetailedStepperModelArray.push(customerUiDetailedStepperModel);
        }
        return customerUiDetailedStepperModelArray;

    }
}


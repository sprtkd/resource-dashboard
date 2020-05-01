import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup ,Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   userForm: FormGroup;
   message: String;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      UserName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      Password: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      Contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  onSubmit(){
    if(this.userForm.valid){
      this.message ='User Registraction Form is Valid!! Submitted to Reviewer';
    } else {
      this.message='User form is not valid!!';
    }
  }

}

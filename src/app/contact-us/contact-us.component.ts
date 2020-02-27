import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
// import { ContactService } from "./contact.service";
import { ValidationService, } from "../shared/validation.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactUsForms: FormGroup;
  public contactValidationMessages: any;
  submitted: boolean = false
  isChecked: boolean = false
  constructor(private fb: FormBuilder) { }


  ngOnInit() {
    const emailRegex = /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    const name = /^[A-Za-z0-9_@./#&+-]*$/;
    this.contactUsForms = this.fb.group({
      userName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        ValidationService.characterValidate,
      ])],
      emailId: ['', Validators.compose([
        Validators.required,
        Validators.pattern(emailRegex),
        ValidationService.emptyValidate,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])],
      message: ['', Validators.compose([
        Validators.required,
        ValidationService.characterValidate,
        Validators.minLength(3),
        Validators.maxLength(200),
      ])]
    }, { updateOn: "blur" })

    this.contactValidationMessages = {
      'userName': [
        { type: 'required', message: 'Please enter the name' },
        { type: 'validateFirstCharacter', message: 'The first character of the name should be an alphabet' },
        { type: 'minlength', message: 'name cannot be less than 3 characters' },
        { type: 'maxlength', message: 'name cannot be more than 20 characters long' },
      ],
      'emailId': [
        { type: 'required', message: 'Please enter email address' },
        { type: 'pattern', message: 'Please enter vaild email' },
        { type: 'maxlength', message: 'Email cannot be more than 30 characters long' },
      ],
      'message': [
        { type: 'required', message: 'Please enter the message' },
        { type: 'validateFirstCharacter', message: 'The first character of the message should be an alphabet' },
        { type: 'minlength', message: 'message cannot be less than 3 characters' },
        { type: 'maxlength', message: 'message cannot be more than 200 characters long' },
      ],
    }


  }

  public validation(formControlName: any) {
    for (var i = 0; i < this.contactValidationMessages[formControlName].length; i++) {
      if (this.contactUsForms.controls[formControlName].hasError(this.contactValidationMessages[formControlName][i].type) == true) {
        return this.contactValidationMessages[formControlName][i].message;
      }
    }
  }
  public onSubmit(values: any) {
    this.submitted = true
    if (this.contactUsForms.valid) {
      console.log("values", values)
    }
  }
}

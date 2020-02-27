import { Component, OnInit } from '@angular/core';
// import { FormGroup,FormControl } from '@angular/forms'
import { FormBuilder, Validator, Validators, FormGroup, FormArray } from '@angular/forms'
import { forbiddenNameValidator } from '../shared/validation'
import { passwordValidator } from '../shared/passwordValidator'

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  registrationForm: FormGroup;
  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
      subscribe: [false],
      email: [''],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.fb.array([])
    }, { validator: passwordValidator })
    this.registrationForm.get('subscribe').valueChanges.subscribe(
      checkvalue => {
        const email = this.registrationForm.get('email')
        if (checkvalue) {
          email.setValidators(Validators.required)
        } else {
          email.clearValidators()
        }
        email.updateValueAndValidity()
      }
    )
  }

  get userName() {
    return this.registrationForm.get('userName')
  }
  get email() {
    return this.registrationForm.get('email')
  }
  constructor(private fb: FormBuilder) { }
  get alternativeEmails() {
    return this.registrationForm.get('alternativeEmails') as FormArray;
  }
  addAlternativeEmails() {
    this.alternativeEmails.push(this.fb.control(''))
  }
  loadApiData() {
    this.registrationForm.patchValue({
      userName: 'vikas',
      password: 'abcd',
      confirmPassword: 'abcd',
      // address:{
      //   city:'chandigarh',
      //   state:'india',
      //   postalCode:160101
      // }
    })
  }
  //  registrationForm = new FormGroup({
  //    userName: new FormControl(),
  //    password: new FormControl(),
  //    confirmPassword: new FormControl(),
  //    address: new FormGroup({
  //      city:new FormControl(),
  //      state:new FormControl(),
  //      postalCode:new FormControl()
  //    })
  //  });
  //  loadApiData(){
  //    this.registrationForm.setValue({
  //     userName:'vikas',
  //     password:'abcd',
  //     confirmPassword:'abcd',
  //     address:{
  //       city:'chandigarh',
  //       state:'india',
  //       postalCode:160101
  //     }
  //    })
  //  }

}

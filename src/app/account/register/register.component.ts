import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup , FormBuilder, FormControl } from '@angular/forms';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 
  registerForm!: FormGroup;

 

  submitted = false;

  constructor(private fb: FormBuilder,  private customValidator: CustomvalidationService) { 
    
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: this.customValidator.matchPassword('password', 'confirmPassword'),
      }
    );
  }


  get registerFormControl() {
    return this.registerForm.controls;
  }


/**
 * 
 * @returns 
 */
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (this.registerForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.registerForm.value); // OR
      console.log(JSON.stringify(this.registerForm.value, null, 2));
    }
  }

/**
 * 
 */
  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }

}

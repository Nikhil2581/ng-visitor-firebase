import { NgLocalization } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup , FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultAppConfig } from 'src/app/config/visitor-config';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 
  registerForm!: FormGroup;
  email='';
  password='';
 

  submitted = false;

  constructor(private fb: FormBuilder,  private customValidator: CustomvalidationService,
    private _fbauthService: FirebaseauthService, private _router: Router,
    private route: ActivatedRoute ) { 
      // Allow regsitration by Admin user only 
      if(_fbauthService.User.email != defaultAppConfig.login?.adminEmail) {
        this._router.navigateByUrl('/'); 
      }
    
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

  signUp() {
    return this._fbauthService.signUp(
      this.registerForm.value.email, this.registerForm.value.password, 'admin');
    location.reload();
  }

/**
 * 
 */
  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }

}

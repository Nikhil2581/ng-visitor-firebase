import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  return = '';

  email = '';
  password = '';
  error = '';
  loading = false;
  
  constructor(private _fbauthService: FirebaseauthService, private _router: Router,
    private _authService: AuthService, private route: ActivatedRoute ) { 
      if(_fbauthService.isLoggedIn) {
        this._router.navigate(['home']);
      }
    }

  ngOnInit(): void {
    this.route.queryParams
         .subscribe(params => this.return = params['return'] || '/home');
  }
  
// this is for non firebase login
onSubmit(): void {
    this.loading = true;
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Make sure to fill everything ;)';
      console.log('error');
    } else {
      this._authService
        .login({ email: this.email, password: this.password }) // passing email and password
        .subscribe(
          (res) => {
            console.log(res);
            this.loading = false;
            this._router.navigate(['/home']);
          },
          (err) => {
            console.log(err);
            this.error = err.error.message;
            this.loading = false;
          }
        );
    }
  }

// firebase login with google
 loginGoogle() {
    this._fbauthService.googleAuth();
 }

 //firebase login
 loginEmail() {
  this._fbauthService.login(this.email, this.password);
 }
 
 
  canSubmit(): boolean {
    return this.email.length > 0 && this.password.length > 0;
  }
  }





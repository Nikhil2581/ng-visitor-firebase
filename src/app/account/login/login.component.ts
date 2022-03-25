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
        this._router.navigateByUrl('/'); 
      }
    }

  ngOnInit(): void {
    this.route.queryParams
         .subscribe(params => this.return = params['return'] || '/home');
  }

// firebase login with google
 loginGoogle() {
    this._fbauthService.googleAuth()
    .then((result) => {
     location.reload(); // Reload to reroute after successfull login
    }).catch((error) => {
      window.alert(error);
    });;
 }

 //firebase email login
 loginEmail() {
  this._fbauthService.login(this.email, this.password).then((result) => {
    location.reload(); // Reload to reroute after successfull login
   }).catch((error) => {
     window.alert(error);
   });;;
 }
 
canSubmit(): boolean {
    return this.email.length > 0 && this.password.length > 0;
}
}





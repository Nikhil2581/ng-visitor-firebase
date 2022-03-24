import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';


@Component({
  selector: 'app-hnav',
  templateUrl: './hnav.component.html',
  styleUrls: ['./hnav.component.scss']
})
export class HnavComponent implements OnInit {

  isLoggedIn=false;

  constructor(private _auth: AuthService, private _authfb: FirebaseauthService,
    private _router:Router) { 
      this.isLoggedIn=this._authfb.isLoggedIn;
      console.log('login'+this.isLoggedIn)
    }

  ngOnInit(): void {
    this.isLoggedIn=this._authfb.isLoggedIn;
    console.log('login'+this.isLoggedIn)
  }


  logout() {
    this._authfb.SignOut();
    this.isLoggedIn=false;
  }

}

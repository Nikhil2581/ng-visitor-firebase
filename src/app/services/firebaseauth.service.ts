import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NgLocalization } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public _router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData) || '{}');
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', '');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    });
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (!this.isEmptyObject(user)) ? true : false;
  }

  isEmptyObject(obj: {}) {
    return (obj && (Object.keys(obj).length === 0));
  }

  googleAuth() {
    return this.authLogin(new GoogleAuthProvider());
  }

  authLogin(provider: firebase.default.auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this._router.navigate(['visitors']); ;
    }).catch((error) => {
      window.alert(error);
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this._router.navigate(['login']);
    });
  }
}

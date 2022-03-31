import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider} from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { RoleService } from './role.service';
import { User } from '../model/User';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {
  userData: any;
  //user$: Observable<User>;
  
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public _router: Router,
    public ngZone: NgZone,
    public _roleService:RoleService
  ) {

    /*this.user$ = this.afAuth.authState
    .switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
      } else {
        return Observable.of(null)
      }
    })*/

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData) || '{}');
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', '');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    })
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string, role: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {    
      this._router.navigate(['/']);
    }).catch((error) => {
      window.alert(error);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (!this.isEmptyObject(user)) ? true : false;
  }

  get User(): any {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (!this.isEmptyObject(user)) ?  user : {};
  }

  googleAuth() {
    return this.authLogin(new GoogleAuthProvider());
  }

  authLogin(provider: firebase.default.auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider);
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this._router.navigate(['login']);
    });
  }

  private isEmptyObject(obj: {}) {
    return (obj && (Object.keys(obj).length === 0));
  }

  private updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        subscriber: true
      }
    }
    return userRef.set(data, { merge: true })
  }
}

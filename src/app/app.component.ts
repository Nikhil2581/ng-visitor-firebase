import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

export interface Visitor { name: string; mobile: number; premise:string }



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Visitor App';

      
       constructor() {
    
        }
    
}

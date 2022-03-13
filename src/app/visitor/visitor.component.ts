import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Visitor } from '../model/Visitor';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss']
})
export class VisitorComponent implements OnInit {

  items: Observable<any[]>;
  private visitorCollection: AngularFirestoreCollection<Visitor>;
 
  visitorForm = this.formBuilder.group({
   name: '',
   mobile: '',
   premise:''
  });

  constructor(private firestore: AngularFirestore,  private formBuilder: FormBuilder) {
        this.visitorCollection = firestore.collection<Visitor>('Visitor');
      
        this.items = firestore.collection('Visitor').valueChanges();

        }

  ngOnInit(): void {
  }


  onSubmit(): void {
    this.visitorCollection.add(this.visitorForm.value);
    console.warn('Your order has been submitted', this.visitorForm.value);
    this.visitorForm.reset();
  }

  addVisitor() {
    // TODO add rule
    this.visitorCollection.add({
      name: 'test1',
      mobile: 1233333,
      premise:'G455',
      //time: firebase.firestore.FieldValue.serverTimestamp(),
    });
    //this.visitorCollection.add(visitor);
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
 
  visitorForm!: FormGroup;
  submitted = false;

 /* visitorForm = this.formBuilder.group({
   name: '',
   mobile: '',
   premise:''
  });*/

  constructor(private fb: FormBuilder,private firestore: AngularFirestore,  private formBuilder: FormBuilder) {
        this.visitorCollection = firestore.collection<Visitor>('Visitor');
      
        this.items = firestore.collection('Visitor').valueChanges();

        }

  ngOnInit(): void {
    this.visitorForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      premise: ['', [Validators.required]],      
    }
    );
  }

  /**
   * Only numbers are allowed
   * @param event 
   * @returns 
   */
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  /**
   * 
   * @returns 
   */
  onSubmit(): void {
    this.submitted = true;
    if (this.visitorForm.invalid) {
      return;
    } else {
    console.log("Inside OnSubmit");
    this.visitorCollection.add(this.visitorForm.value);
    console.warn('Your order has been submitted', this.visitorForm.value);
    this.visitorForm.reset();
    }
  }

  
  get visitorFormControl() {
    return this.visitorForm.controls;
  }

  
   onReset(): void {
    this.submitted = false;
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

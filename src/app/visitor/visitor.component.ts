import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Visitor } from '../model/Visitor';
import { VisitorService } from '../services/visitor.service';

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

  constructor(private fb: FormBuilder,private visitorService: VisitorService,  private formBuilder: FormBuilder) {   
        //this.visitorCollection = firestore.collection<Visitor>('Visitor',ref => ref.orderBy('timeIn'));
        this.visitorCollection=visitorService.getAll();
        this.items = this.visitorCollection.valueChanges();  
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
    const newVisitor = this.visitorForm.value;
   // newVisitor.id='v'+new Date().valueOf();
    newVisitor.timeIn=new Date().valueOf();
    newVisitor.timeOut='';
    console.log("Inside OnSubmit");
    this.visitorService.create(newVisitor);
    console.warn('Your visitor has been submitted', this.visitorForm.value);
    this.visitorForm.reset();
    this.submitted = false;
    }
  }

  
  get visitorFormControl() {
    return this.visitorForm.controls;
  }

  
   onReset(): void {
    this.submitted = false;
    this.visitorForm.reset();
  }

}

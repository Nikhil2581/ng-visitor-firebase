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
  title = 'ng-arshopify';

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
      /*  saveAsExcelFile(buffer: any, fileName: string): void {
          import("file-saver").then(FileSaver => { 
            let EXCEL_TYPE =
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            let EXCEL_EXTENSION = ".xlsx";
            const data: Blob = new Blob([buffer], {
              type: EXCEL_TYPE
            });
            FileSaver.saveAs(
              data,
              fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
            );
          });
        }*/
    
}

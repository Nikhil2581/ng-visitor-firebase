import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Visitor } from '../model/Visitor';


@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {
  items: Observable<any[]>;
  private visitorCollection: AngularFirestoreCollection<Visitor>;
 

  constructor(private firestore: AngularFirestore) {
    this.visitorCollection = firestore.collection<Visitor>('Visitor');
    this.items = firestore.collection('Visitor').valueChanges();
    }
  
  ngOnInit() {
     
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
    alert('todo');
    });
  }
  

}

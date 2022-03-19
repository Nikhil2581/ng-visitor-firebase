import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Visitor } from '../model/Visitor';
import { VisitorService } from '../services/visitor.service';


@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {
  items: any;
  //private visitorCollection: AngularFirestoreCollection<Visitor>;
  message = '';
  currentIndex = -1;

  constructor(private visitorService: VisitorService) {
  
    }
  
  ngOnInit() {
    this.retrieveVisitors();
  }

  retrieveVisitors(): void  {
  this.visitorService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.items = data;
    }); 
  }

  /**
   * Transform Firebase TimeStamp to 
   * Java Util Data
   * @param d 
   * @returns 
   */
  toDate(timestamp:any): Date {    
    return new Date(timestamp);
  }

  getOut(item:string) {
    const visitor = {
      timeOut: new Date().getTime()
    };
    console.log(item);
     this.visitorService.update(item,visitor).then(() => this.message = 'The visitor is out successfully!')
     .catch(err => console.log(err));;
  }

  onDelete(item:string){
    console.log(item);
    this.visitorService.delete(item).then(() => {  
      this.message = 'The visitor is deleted successfully!';
      this.refreshList();
    }).catch(err => console.log(err));
    
  }

  refreshList(): void {
    this.items = null;
    this.currentIndex = -1;
    this.retrieveVisitors();
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
    alert('todo');
    });
  }
  

}

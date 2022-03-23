import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Params } from '@angular/router';
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
  message = '';
  currentIndex = -1;
  dtOptions: any = {};
  dataTableLoaded=false;
  @Input() hideAddVisitor: any;
  visitorName:any;
  
  dataTable:any;
  constructor(private visitorService: VisitorService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => this.visitorName = params['caller']);
  }
  
  ngOnInit() {
    this.retrieveVisitors();
  }

  ngAfterViewInit() {
    console.log('item'+this.items);
    
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
      if(!this.dataTable) {
      setTimeout(()=>{          
        this.dataTable =  $('#datatableexample').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          lengthMenu : [10, 20, 30],                  
      } );
      }, 1); 
      }
      }, error => console.error(error));
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
    // this.refreshList();
  }

  onDelete(item:string){
    console.log(item);
    this.visitorService.delete(item).then(() => {  
      this.message = 'The visitor is deleted successfully!';
    //  this.refreshList();
    }).catch(err => console.log(err));
    
  }

  refreshList(): void {
   // this.items = null;
   // this.currentIndex = -1;
   //$('#datatableexample').DataTable().clear();
    //$('#datatableexample').DataTable().reload(this.visitorService.getAll(), true);
    //this.retrieveVisitors();
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
    alert('todo');
    });
  }
}

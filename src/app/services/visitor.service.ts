import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {Visitor} from '../model/Visitor';

/**
 * 
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Visitor Firebase Service fror CRUD operations
 */
export class VisitorService {
  private dbPath = '/Visitor';
  visitorsRef: AngularFirestoreCollection<Visitor>;
  constructor(private db: AngularFirestore) {
    this.visitorsRef = db.collection(this.dbPath,ref => ref.orderBy('timeIn', 'desc'));
  }
  getAll(): AngularFirestoreCollection<Visitor> {
    return this.visitorsRef;
  }
  create(visitor: Visitor): any {
    return this.visitorsRef.add({ ...visitor });
  }
  update(id: string, data: any): Promise<void> {
    return this.visitorsRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.visitorsRef.doc(id).delete();
  }
}
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Profiler } from 'inspector';
import { Role } from '../model/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private dbPath = '/Roles';
  rolesRef: AngularFirestoreCollection<Role>;
  constructor(private db: AngularFirestore) {
    this.rolesRef = db.collection(this.dbPath,ref => ref.orderBy('timeIn', 'desc'));
  }
  getAllRoles(): AngularFirestoreCollection<Role> {
    return this.rolesRef;
  }
  getRole (email:string) {
    return this.db.collection(this.dbPath,ref => ref.where('email', '==', email));
  }
  create(role: Role): any {
    return this.rolesRef.add({ ...role });
  }
  update(id: string, data: any): Promise<void> {
    return this.rolesRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.rolesRef.doc(id).delete();
  }
}

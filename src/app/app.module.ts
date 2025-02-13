import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat'; 
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { SearchTableComponent } from './search-table/search-table.component';
import { BaseLayoutComponent } from './layput/base-layout/base-layout.component';
import { FooterComponent } from './layput/footer/footer.component';
import { HeaderComponent } from './layput/header/header.component';
import { HnavComponent } from './layput/hnav/hnav.component';
import { AccountModule } from './account/account.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './layput/home/home.component';
import { VisitorComponent } from './visitor/visitor.component';
import {DataTablesModule} from 'angular-datatables';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import 'firebase/auth';
import { ContactusComponent } from './contactus/contactus.component'

@NgModule({
  declarations: [
    AppComponent,
    SearchTableComponent,
    BaseLayoutComponent,
    FooterComponent,
    HeaderComponent,
     HnavComponent,
    HomeComponent,
    VisitorComponent,
    ContactusComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, "angular-auth-firebase"),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AccountModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

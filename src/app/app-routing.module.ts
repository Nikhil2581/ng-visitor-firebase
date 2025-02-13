import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AppComponent } from './app.component';
import { ContactusComponent } from './contactus/contactus.component';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { BaseLayoutComponent } from './layput/base-layout/base-layout.component';
import { HomeComponent } from './layput/home/home.component';
import { SearchTableComponent } from './search-table/search-table.component';
import { VisitorComponent } from './visitor/visitor.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent}, 
  { path: 'visitors/:caller', component: SearchTableComponent, canActivate:[IsAuthenticatedGuard] }, 
  { path: 'visitors', component: SearchTableComponent, canActivate:[IsAuthenticatedGuard] }, 
 { path: 'register', component: RegisterComponent, canActivate:[IsAuthenticatedGuard] },
 { path: 'add', component: VisitorComponent, canActivate:[IsAuthenticatedGuard] },
 { path: 'contactus', component: ContactusComponent },
 { path: '', component: SearchTableComponent,canActivate:[IsAuthenticatedGuard]  },
 { path: 'home', component: SearchTableComponent,canActivate:[IsAuthenticatedGuard]  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

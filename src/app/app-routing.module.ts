import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { BaseLayoutComponent } from './layput/base-layout/base-layout.component';
import { VisitorComponent } from './visitor/visitor.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'visitor', component: VisitorComponent, canActivate:[IsAuthenticatedGuard] }, 
 { path: 'register', component: RegisterComponent, canActivate:[IsAuthenticatedGuard] },
 { path: '', component: BaseLayoutComponent, canActivate:[IsAuthenticatedGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

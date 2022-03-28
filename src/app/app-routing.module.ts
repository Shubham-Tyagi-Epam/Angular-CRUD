import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuardService } from './auth-guard.service';
import { ContactComponent } from './contact/contact.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"about",component:AboutComponent,canActivate:[AuthGuardService]},
  {path:"home",component:HomeComponent,canActivate:[AuthGuardService]},
  {path:"contact",component:ContactComponent,canActivate:[AuthGuardService]},
  {path:"products",component:ProductComponent,canActivate:[AuthGuardService]},
  {path:"employee",component:EmployeeComponent,canActivate:[AuthGuardService]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  { path: 'Product1', loadChildren: () => import('./product1/product1.module').then(m => m.Product1Module) },
  {path:"**",component:NoPageFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

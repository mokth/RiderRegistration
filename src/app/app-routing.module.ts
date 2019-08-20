import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiderRegisterComponent } from './registration/rider-register/rider-register.component';
import { SuccessRegComponent } from './registration/success-reg/success-reg.component';
import { RegisterAdminComponent } from './registration/register-admin/register-admin.component';
import { RiderInfoComponent } from './registration/rider-info/rider-info.component';
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './services/AuthguardService';

const routes: Routes = [
  { path: "", redirectTo: "/register", pathMatch: "full" },
  { path: "register", component: RiderRegisterComponent, pathMatch: "full"  },
  
  {
    path: 'login', component:LoginComponent     
  },
  { path: "admin",canActivate: [AuthguardService], component: RegisterAdminComponent, pathMatch: "full"  },
  { path: "success",canActivate: [AuthguardService], component: SuccessRegComponent, pathMatch: "full"  },
  { path: "rider", canActivate: [AuthguardService],component: RiderInfoComponent, pathMatch: "full"  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

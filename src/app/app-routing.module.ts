import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiderRegisterComponent } from './registration/rider-register/rider-register.component';
import { SuccessRegComponent } from './registration/success-reg/success-reg.component';
import { RegisterAdminComponent } from './registration/register-admin/register-admin.component';
import { RiderInfoComponent } from './registration/rider-info/rider-info.component';
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './services/AuthguardService';

const routes: Routes = [
  { path: "",  component: RiderRegisterComponent  },
  { path: "register", component: RiderRegisterComponent  },
  { path: "success", component: SuccessRegComponent  },
  {
    path: 'login', component:LoginComponent,    
  },
  { path: "admin",canActivate: [AuthguardService], component: RegisterAdminComponent  },
 
  { path: "rider", canActivate: [AuthguardService],component: RiderInfoComponent  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

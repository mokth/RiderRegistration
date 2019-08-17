import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiderRegisterComponent } from './registration/rider-register/rider-register.component';
import { SuccessRegComponent } from './registration/success-reg/success-reg.component';
import { RegisterAdminComponent } from './registration/register-admin/register-admin.component';
import { RiderInfoComponent } from './registration/rider-info/rider-info.component';

const routes: Routes = [
  { path: "", redirectTo: "/register", pathMatch: "full" },
  { path: "register", component: RiderRegisterComponent, pathMatch: "full"  },
  
  { path: "admin", component: RegisterAdminComponent, pathMatch: "full"  },
  { path: "success", component: SuccessRegComponent, pathMatch: "full"  },
  { path: "rider", component: RiderInfoComponent, pathMatch: "full"  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { DxDataGridModule } from 'devextreme-angular';
import { DxFileUploaderModule } from "devextreme-angular";
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule, MatNativeDateModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgxMaskModule, IConfig} from 'ngx-mask'
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RiderRegisterComponent } from './registration/rider-register/rider-register.component';
import { environment } from 'src/environments/environment';
import { APP_BASE_HREF } from '@angular/common';
import { ApiService } from './api/api-services';
import { ToastrModule } from 'ngx-toastr';
import { SuccessRegComponent } from './registration/success-reg/success-reg.component';
import { RegisterAdminComponent } from './registration/register-admin/register-admin.component';
import { RiderInfoComponent } from './registration/rider-info/rider-info.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthguardService } from './services/AuthguardService';
import { CanDeactivateGuard } from './services/CanDeactivateGuard';

@NgModule({
  declarations: [
    AppComponent,
    RiderRegisterComponent,
    SuccessRegComponent,
    RegisterAdminComponent,
    RiderInfoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule ,
    HttpClientModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    DxDataGridModule,
    DxFileUploaderModule,
    BrowserAnimationsModule,
    NgxMatIntlTelInputModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    ApiService,
    AuthService,
    AuthguardService,
    CanDeactivateGuard,  
    MatDatepickerModule, 
    {provide: APP_BASE_HREF, useValue: `${environment.BASE_URL}` },
    {provide:'API_URL',useValue: `${environment.apiUrl}`}, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


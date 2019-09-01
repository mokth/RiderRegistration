import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { ApiService } from '../../api/api-services';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {
  dataSource: any;
  isSmallScreen:boolean;

  constructor(private api: ApiService,
              private auth: AuthService,
              private router: Router,
              public breakpointObserver: BreakpointObserver) {
    //const token=this.auth.getAuthToken();
    let serviceUrl = api.apiUrl + 'rider/registrations'
    this.dataSource = createStore({
      key: "uid",
      loadUrl: serviceUrl,   
      onBeforeSend:(r,s)=>this.onBeforeSend(r,s,auth),
      errorHandler:(e)=>{console.log(e)}  
    })
  }

  ngOnInit() {
    this.breakpointObserver
    .observe(['(min-width: 560px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        console.log('Viewport is 500px or over!');
        this.isSmallScreen = false;
      } else {
        console.log('Viewport is getting smaller!');
        this.isSmallScreen = true;
      }
    });
  }
  
  logOut(){
    this.auth.logOut();
    this.router.navigate(['/login']);
  }
  onBeforeSend(r, s,auth:any) {
    const token=this.auth.getAuthToken();
    
    s.headers = { 
      'Content-Type':'application/json',
      'Authorization': token
    };
  }

  onEdit(d) {
    console.log(d.data);
    this.router.navigate(['/rider'], { state: { data: d.data } });
  }
}

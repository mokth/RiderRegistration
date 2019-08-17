import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { ApiService } from 'src/app/api/api-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {
  dataSource: any;

  constructor(private api:ApiService,
    private router:Router) {
    let serviceUrl= api.apiUrl+'rider/registrations'
    this.dataSource = createStore({
      key: "uid",
      loadUrl: serviceUrl 
  })
  }

  ngOnInit() {
  }
  
  onEdit(d){
    console.log(d.data);
    this.router.navigate(['/rider'], {state: {data: d.data}});
  }
}

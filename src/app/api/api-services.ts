import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Register } from '../model';
import { RegisterData } from '../model/register-data';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient,
        private router: Router,
        private auth:AuthService,
        @Inject('API_URL') public apiUrl: string,
    ) {
    }
   
    getBanks() {       
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.apiUrl + 'Registration/banks',
             { headers: headers });
    }

    getRefTables() {       
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.apiUrl + 'Registration/reftables',
             { headers: headers });
    }

    getAreas() {       
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(this.apiUrl + 'Registration/areas',
             { headers: headers });
    }

    postRegistration(reg: Register) {
        let body = JSON.stringify(reg);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.apiUrl + 'Registration/registration',
            body, { headers: headers });
    }

    postRegistrationEx(data: FormData) {
        console.log(data);
        //let body = JSON.stringify(data); //'Content-Type': undefined
        let headers = new HttpHeaders().set('Content-Type', 'multi-part/form data');
        return this.http.post(this.apiUrl + 'Registration/registrationex',
            data);
    }

    postRegConfirm(reg: Register) {
        let body = JSON.stringify(reg);
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', this.auth.getAuthToken());
        return this.http.post(this.apiUrl + 'Registration/regconfirm',
            body, { headers: headers });
    }
}
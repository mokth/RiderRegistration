import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Register } from '../model';
import { RegisterData } from '../model/register-data';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient,
        private router: Router,
        @Inject('API_URL') public apiUrl: string,
    ) {
    }

    postRegistration(reg: Register) {
        let body = JSON.stringify(reg);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.apiUrl + 'rider/registration',
            body, { headers: headers });
    }

    postRegistrationEx(data: FormData) {
        console.log(data);
        //let body = JSON.stringify(data); //'Content-Type': undefined
        let headers = new HttpHeaders().set('Content-Type', 'multi-part/form data');
        return this.http.post(this.apiUrl + 'rider/registrationex',
            data);
    }

    postRegConfirm(reg: Register) {
        let body = JSON.stringify(reg);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.apiUrl + 'rider/regconfirm',
            body, { headers: headers });
    }
}
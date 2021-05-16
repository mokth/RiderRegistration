import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { from } from 'rxjs'; 
import { groupBy, mergeMap, reduce, toArray } from 'rxjs/operators';

import { Register } from 'src/app/model';
import { ApiService } from 'src/app/api/api-services';
import { RegisterData } from 'src/app/model/register-data';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/services/format-datepicker';
import * as moment from 'moment';
import { Area } from '../../model/area';
@Component({
  selector: 'app-rider-register',
  templateUrl: './rider-register.component.html',
  styleUrls: ['./rider-register.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class RiderRegisterComponent implements OnInit {
  register: Register;
  isSubmiting: boolean;
  fileCompress = false;
  fileCompress2 = false;
  fileCompress3 = false;
  fileCompress4 = false;
  fileCompress5 = false;
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    nickname: new FormControl('', Validators.required),
    icno: new FormControl('', Validators.required),
    nationality: new FormControl('Malaysia', Validators.required),
    dob: new FormControl(null, Validators.required),
    gender: new FormControl('Male', Validators.required),
    mobil1: new FormControl('', Validators.required),
    mobil2: new FormControl('', Validators.required),
    emergency: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    vehicle: new FormControl('', Validators.required),
    licenseExp: new FormControl('', Validators.required),
    working1: new FormControl(''),
    working2: new FormControl(''),
    bankAccount: new FormControl('', Validators.required),
    bankName: new FormControl('', Validators.required),
    stardate: new FormControl(null, Validators.required),
    area: new FormControl('', Validators.required),
    state: new FormControl('Johor', Validators.required),
    city: new FormControl('', Validators.required),
    // remark: new FormControl('')
  });

  itemImgUrl: any;
  itemImgUrl2: any;
  itemImgUrl3: any;
  itemImgUrl4: any;
  itemImgUrl5: any;
  isLocal: boolean;
  file1: any;
  file2: any;
  file3: any;
  file4: any;
  file5: any;
  banks: any;
  areas: Area[]=[];
  states:any;
  cities:any;
  territory:any;
  isMobileResolution: boolean;
  
  constructor(private api: ApiService,
    private router: Router,
    private ng2ImgMax: Ng2ImgMaxService,
    private toastr: ToastrService) { 
      if (window.innerWidth < 768) {
        this.isMobileResolution = true;
      } else {
        this.isMobileResolution = false;
      } 
    }

  ngOnInit() {
    this.isLocal = true;
    this.isSubmiting = false;
    this.api.getRefTables()
      .subscribe((data:any) =>{
        this.banks = data.banks;
        this.cities = data.city;
        this.states = data.state;
        //this.areas = data.areas;
      } );
      this.api.getAreas()
      .subscribe((data:any) =>{
        this.areas = data;
       
      } );
  }

  onFaq() {

  }

  onNationalityChange() {
    console.log(this.profileForm.value.nationality);
    this.isLocal = this.profileForm.value.nationality == "Malaysia"
  }

  saveReg() {
    if (this.file1 == null) {
      this.toastr.error("Image Font Page IC not found...");
      return;
    }
    if (this.file2 == null) {
      this.toastr.error("Image Back Page IC not found...");
      return;
    }
    if (this.file3 == null) {
      this.toastr.error("Image Front Page Motor License not found...");
      return;
    }
    if (this.file4 == null) {
      this.toastr.error("Image Back Page Motor License not found...");
      return;
    }
    if (this.file5 == null) {
      this.toastr.error("Image selfie not found...");
      return;
    }
    this.isSubmiting = true;
    this.populateData();
    console.log(JSON.stringify(this.register));
    let data = new FormData();
    const blob = new Blob([JSON.stringify(this.register)], { type: 'application/json' });

    data.append("file", blob);
    data.append("file", this.file1);
    data.append("file", this.file2);
    data.append("file", this.file3);
    data.append("file", this.file4);
    data.append("file", this.file5);


    // localStorage.setItem('user', JSON.stringify(this.register));
    //this.toastr.success('Successfully Registered.', 'Message');
    // this.router.navigate(['/success']);
    this.api.postRegistrationEx(data)
      .subscribe((resp: any) => {
        if (resp.ok == "yes") {
          this.router.navigate(['/success'], { state: { data: this.register } });
        } else {
          this.isSubmiting = false;
          this.toastr.error('Fail to Register, ' + resp.errmsg, 'Error', {
            timeOut: 4000
          });
        }
      },(e)=>{
        this.isSubmiting = false;
          this.toastr.error('Fail to Connect to Server...' , 'Error', {
            timeOut: 4000});
      });
  
  }

  populateData() {
    this.register = new Register();
    this.register.fullname = this.profileForm.controls["name"].value;
    this.register.nickname = this.profileForm.value.nickname;
    this.register.noic = this.profileForm.value.icno;
    this.register.nationality = this.profileForm.value.nationality;
    this.register.gender = this.profileForm.value.gender;
    this.register.dob = this.profileForm.controls["dob"].value;
    this.register.mobile1 = this.profileForm.value.mobil1;
    this.register.mobile2 = this.profileForm.value.mobil2;
    this.register.contact = this.profileForm.value.contact;
    this.register.address = this.profileForm.value.address;
    this.register.emergency = this.profileForm.value.emergency;
    this.register.vehicleno = this.profileForm.value.vehicle;
    this.register.licenseExp = this.profileForm.value.licenseExp;
    this.register.workexp1 = this.profileForm.value.working1;
    this.register.workexp2 = this.profileForm.value.working2;
    this.register.startwork = this.profileForm.controls["stardate"].value;
    this.register.remark = "";//this.profileForm.value.remark;
    this.register.bankAccount = this.profileForm.value.bankAccount;
    this.register.bankName = this.profileForm.value.bankName;
    this.register.area = this.profileForm.value.area;
    this.register.state = this.profileForm.value.state;
    this.register.city = this.profileForm.value.city;
    this.register.mobile1 = this.register.mobile1.replace('+', '');
    this.register.mobile2 = this.register.mobile2.replace('+', '');
    this.register.emergency = this.register.emergency.replace('+', '');
    console.log(this.register);
  }

  OnItemFileChange(e) {
    console.log(e);
    this.fileCompress = true;
    this.file1 = null;
    if (e.value) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.itemImgUrl = event.target.result;
      }
      reader.readAsDataURL(e.value[0]);
      // this.file1=e.value[0]; 
      this.ng2ImgMax.compressImage(e.value[0], 1)
        .subscribe(
          result => {
            console.log('resize ');
            this.file1 = result;
            console.log(this.file1);
            this.fileCompress = false;
          },
          error => {
            console.log('resize error!', error);
            this.fileCompress = false;
          }
        );
    }
  }

  OnItemFileChange2(e) {
    console.log(e);
    this.file2 = null;
    this.fileCompress2 = true;
    if (e.value) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.itemImgUrl2 = event.target.result;
      }
      reader.readAsDataURL(e.value[0]);
      //this.file2=e.value[0];   
      this.ng2ImgMax.compressImage(e.value[0], 1)
        .subscribe(
          result => {
            console.log('resize ');
            this.file2 = result;
            console.log(this.file2);
            this.fileCompress2 = false;
          },
          error => {
            console.log('resize error!', error);
            this.fileCompress2 = false;
          }
        );
    }
  }

  OnItemFileChange3(e) {
    console.log(e);
    this.fileCompress3 = true;
    this.file3 = null;
    if (e.value) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.itemImgUrl3 = event.target.result;
      }
      reader.readAsDataURL(e.value[0]);
      //this.file3=e.value[0]; 
      this.ng2ImgMax.compressImage(e.value[0], 1)
        .subscribe(
          result => {
            console.log('resize ');
            this.file3 = result;
            console.log(this.file3);
            this.fileCompress3 = false;
          },
          error => {
            console.log('resize error!', error);
            this.fileCompress3 = false;
          }
        );
    }
  }

  OnItemFileChange4(e) {
    console.log(e);
    this.fileCompress4 = true;
    this.file4 = null;
    if (e.value) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.itemImgUrl4 = event.target.result;
      }
      reader.readAsDataURL(e.value[0]);
      //this.file4=e.value[0];  
      this.ng2ImgMax.compressImage(e.value[0], 1)
        .subscribe(
          result => {
            console.log('resize ');
            this.file4 = result;
            console.log(this.file4);
            this.fileCompress4 = false;
          },
          error => {
            console.log('resize error!', error);
            this.fileCompress4 = false;
          }
        );
    }
  }

  OnItemFileChange5(e) {
    console.log(e);
    this.fileCompress5 = true;
    this.file5 = null;
    if (e.value) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.itemImgUrl5 = event.target.result;
      }
      reader.readAsDataURL(e.value[0]);
      //this.file4=e.value[0];  
      this.ng2ImgMax.compressImage(e.value[0], 1)
        .subscribe(
          result => {
            console.log('resize ');
            this.file5 = result;
            console.log(this.file5);
            this.fileCompress5 = false;
          },
          error => {
            console.log('resize error!', error);
            this.fileCompress5 = false;
          }
        );
    }
  }

  onStateChange(e){
   this.territory =[...this.areas.filter(x=>x.state==e.value)];
  }

  onCityChange(e){
    let selectedState = this.profileForm.value.state;
    this.territory =
        [...this.areas
           .filter(x=>x.state==selectedState && 
                      x.city ==e.value)
        ];
  }
}

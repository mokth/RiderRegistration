import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/app/model';
import { ApiService } from 'src/app/api/api-services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-rider-register',
  templateUrl: './rider-register.component.html',
  styleUrls: ['./rider-register.component.css']
})
export class RiderRegisterComponent implements OnInit {
  register :Register;
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    nickname: new FormControl('', Validators.required),
    icno: new FormControl('', Validators.required),
    nationality: new FormControl('Malaysia', Validators.required),
    dob: new FormControl(null, Validators.required),
    gender: new FormControl('Male', Validators.required),
    mobil1: new FormControl('', Validators.required),
    mobil2: new FormControl(''),
    ermecency: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    vehicle: new FormControl('', Validators.required),
    driving: new FormControl('', Validators.required),
    working1: new FormControl(''),
    working2: new FormControl(''),
    stardate: new FormControl(null, Validators.required),
    remark: new FormControl('')
  });
  isLocal:boolean;
  constructor(private api:ApiService,
              private router:Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.isLocal = true;
  }

  onFaq() {

  }

  onNationalityChange(){
   console.log(this.profileForm.value.nationality);
   this.isLocal= this.profileForm.value.nationality=="Malaysia"
  }

  saveReg(){
    this.populateDate();
    localStorage.setItem('user', JSON.stringify(this.register));
            //this.toastr.success('Successfully Registered.', 'Message');
            this.router.navigate(['/success']);
    // this.api.postRegistration(this.register)
    //     .subscribe((resp:any)=>{
    //       console.log(resp);
    //       if (resp.ok=="yes"){
    //         localStorage.setItem('user', JSON.stringify(this.register));
    //         //this.toastr.success('Successfully Registered.', 'Message');
    //         this.router.navigate(['/success']);
    //       }else {
    //         this.toastr.error('Fail to Register, '+resp.errmsg, 'Error', {
    //           timeOut: 3000
    //         });
      
    //       }
    //     });
  }

  populateDate(){
    this.register = new Register();
    this.register.fullname = this.profileForm.value.name;
    this.register.noic = this.profileForm.value.icno;
    this.register.nationality = this.profileForm.value.nationality;
    this.register.gender = this.profileForm.value.gender;
    this.register.dob = this.profileForm.value.dob;
    this.register.mobile1 = this.profileForm.value.mobil1;
    this.register.mobile2 = this.profileForm.value.mobil2;
    this.register.contact = this.profileForm.value.contact;
    this.register.vehicleno = this.profileForm.value.vehicle;
    this.register.drivingno = this.profileForm.value.driving;
    this.register.workexp1 = this.profileForm.value.working1;
    this.register.workexp2 = this.profileForm.value.working2;
    this.register.startwork = this.profileForm.value.stardate;
    this.register.remark = this.profileForm.value.remark;


    console.log(this.register);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/app/model';
import { ApiService } from 'src/app/api/api-services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rider-info',
  templateUrl: './rider-info.component.html',
  styleUrls: ['./rider-info.component.css']
})
export class RiderInfoComponent implements OnInit {

  register :Register;
  data:any;
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    nickname: new FormControl('', Validators.required),
    icno: new FormControl('', Validators.required),
    nationality: new FormControl('Malaysia', Validators.required),
    dob: new FormControl(null, Validators.required),
    gender: new FormControl('Male', Validators.required),
    mobil1: new FormControl('', Validators.required),
    mobil2: new FormControl(''),
    emergency: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    vehicle: new FormControl('', Validators.required),
    driving: new FormControl('', Validators.required),
    working1: new FormControl(''),
    working2: new FormControl(''),
    stardate: new FormControl(null, Validators.required),
    remark: new FormControl(''),
    status: new FormControl(null, Validators.required),
    joindate: new FormControl(null, Validators.required),
  });
  isLocal:boolean;
  constructor(private api:ApiService,
              private router:Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.isLocal = true;
    console.log(history.state.data);
    if (history.state.data!=null){
      this.data = history.state.data;
      this.displayData();
    }
   
  }
  displayData(){
    this.profileForm.get('name').setValue(this.data.fullname);
    this.profileForm.get('nickname').setValue(this.data.nickname);
    this.profileForm.get('icno').setValue(this.data.noic);
    this.profileForm.get('dob').setValue(this.data.dob);
    this.profileForm.get('nationality').setValue(this.data.nationality);
    this.profileForm.get('gender').setValue(this.data.gender);
    this.profileForm.get('mobil1').setValue(this.data.mobile1);
    this.profileForm.get('mobil2').setValue(this.data.mobile2);
    this.profileForm.get('emergency').setValue(this.data.emergency);
    this.profileForm.get('contact').setValue(this.data.contact);
    this.profileForm.get('vehicle').setValue(this.data.vehicleno);
    this.profileForm.get('driving').setValue(this.data.drivingno);
    this.profileForm.get('working1').setValue(this.data.workexp1);
    this.profileForm.get('working2').setValue(this.data.workexp2);
    this.profileForm.get('stardate').setValue(this.data.startwork);
    this.profileForm.get('remark').setValue(this.data.remark);
    this.profileForm.get('status').setValue(this.data.status);
    this.profileForm.get('joindate').setValue(this.data.joindate);
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
           // this.router.navigate(['/success']);
    this.api.postRegConfirm(this.register)
        .subscribe((resp:any)=>{
          console.log(resp);
          if (resp.ok=="yes"){
            this.toastr.success('Successfully Registered.', 'Message',{ closeButton: true,disableTimeOut:true })
               .onTap.subscribe((action) => this.router.navigate(['/admin']));
               //this.router.navigate(['/success']);

          }else {
            this.toastr.error('Fail to Register, '+resp.errmsg, 'Error', {
              timeOut: 3000
            });
      
          }
        });
  }

  populateDate(){
    this.register = new Register();
    this.register.fullname = this.profileForm.value.name;
    this.register.nickname = this.profileForm.value.nickname;
    this.register.noic = this.profileForm.value.icno;
    this.register.nationality = this.profileForm.value.nationality;
    this.register.gender = this.profileForm.value.gender;
    this.register.dob = this.profileForm.value.dob;
    this.register.mobile1 = this.profileForm.value.mobil1;
    this.register.mobile2 = this.profileForm.value.mobil2;
    this.register.contact = this.profileForm.value.contact;
    this.register.emergency = this.profileForm.value.emergency;
    this.register.vehicleno = this.profileForm.value.vehicle;
    this.register.drivingno = this.profileForm.value.driving;
    this.register.workexp1 = this.profileForm.value.working1;
    this.register.workexp2 = this.profileForm.value.working2;
    this.register.startwork = this.profileForm.value.stardate;
    this.register.remark = this.profileForm.value.remark;
    this.register.status = this.profileForm.value.status;
    this.register.joindate = this.profileForm.value.joindate;
    this.register.uid = this.data.uid;

    console.log(this.register);
  }

}

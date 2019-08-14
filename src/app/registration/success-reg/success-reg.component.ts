import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/model';

@Component({
  selector: 'app-success-reg',
  templateUrl: './success-reg.component.html',
  styleUrls: ['./success-reg.component.css']
})
export class SuccessRegComponent implements OnInit {
  register :Register;
  constructor() { }

  ngOnInit() {
    
    this.register = JSON.parse(localStorage.getItem('user'));
  }

}

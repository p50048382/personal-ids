import { Component,OnInit,ViewChild } from '@angular/core';
import { AadharService } from 'src/app/shared/aadhar.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgForm } from "@angular/forms";
export class AADHAR{
  Dob:""
  Idnum:""
  Othrflg: ""
  Pernr: ""
  Uidflg: ""
  Uidnm: ""
  gender: ""
}
@Component({
  selector: 'app-aadhar',
  templateUrl: './aadhar.component.html',
  styleUrls: ['./aadhar.component.css']
})
export class AadharComponent implements OnInit {
  user_aadhar:AADHAR;
  formDisabled:boolean=true;
  @ViewChild('aadharForm', { static: true })aadharForm: NgForm;
  constructor( private aadharService:AadharService,private spinner: NgxSpinnerService){}
  ngOnInit(): void {
    this.spinner.show()
    this.aadharService.getAadhar().subscribe(res=>{
      this.user_aadhar = res.body.d;
      this.spinner.hide();
    })
    // console.log(this.aadharForm);
    this.aadharForm
  }
  onSubmit(){ 
    console.log(this.aadharForm);
  }
  onEdit(){
    this.formDisabled= false; 
    Object.keys(this.aadharForm.controls).forEach(key=>{
      this.aadharForm.controls[key].enable();
    })  
  }
  disableControls(){
    this.formDisabled= true; 
    Object.keys(this.aadharForm.controls).forEach(key=>{
      this.aadharForm.controls[key].disable();
    })  
  }
}

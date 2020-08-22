import { Component ,ViewChild} from '@angular/core';
import { PassportService } from 'src/app/shared/passport.service';
import { NgForm } from "@angular/forms";
export class Passport{
  BEGDA: ""
  ENDDA: ""
  EvUname: ""
  ExpDate: ""
  Filekey: ""
  INFTY: ""
  IssDate: ""
  Key: ""
  PERNR: ""
  PassNum: ""
  PlaceOfIss: ""
}

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.css']
})
export class PassportComponent {
  user_passport:Passport;
  formDisabled:boolean=true;
  @ViewChild('passportForm', { static: true })passportForm: NgForm;
  constructor(private passportService: PassportService){

  }
  ngOnInit(): void {
    this.passportService.getPassportDetails().subscribe(res=>{
      // console.log(res.body.d);
      this.user_passport = res.body.d;
    })
  }
  onSubmit(){

  }
  onEdit(){
    this.formDisabled= false; 
    Object.keys(this.passportForm.controls).forEach(key=>{
      this.passportForm.controls[key].enable();
    })  
  }
  disableControls(){
    this.formDisabled= true; 
    Object.keys(this.passportForm.controls).forEach(key=>{
      this.passportForm.controls[key].disable();
    })  
  }
}

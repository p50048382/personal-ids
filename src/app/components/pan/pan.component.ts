import { Component ,ViewChild, OnInit} from '@angular/core';
import { PanService } from 'src/app/shared/pan.service';
import { NgForm } from "@angular/forms";

export class PanCard{
  IdNum:''
  Nmid:''

}

@Component({
  selector: 'app-pan',
  templateUrl: './pan.component.html',
  styleUrls: ['./pan.component.css']
})
export class PanComponent implements OnInit {
  user_pancard:PanCard;
  formDisabled:boolean=true;
  @ViewChild('panForm', { static: true })panForm: NgForm;
  constructor(private panService: PanService){
  }

  ngOnInit(){
    this.panService.getPersonalIdDetails().subscribe(res=>{
      console.log(res);
      this.user_pancard = res.body.d.results[0]; 
    })
  }
  onSubmit(){

  }
  onEdit(){
    this.formDisabled= false; 
    Object.keys(this.panForm.controls).forEach(key=>{
      this.panForm.controls[key].enable();
    })  
  }
  disableControls(){
    this.formDisabled= true; 
    Object.keys(this.panForm.controls).forEach(key=>{
      this.panForm.controls[key].disable();
    })  
  }
}

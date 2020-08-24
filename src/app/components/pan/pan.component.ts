import { Component ,ViewChild, OnInit} from '@angular/core';
import { PanService } from 'src/app/shared/pan.service';
import { NgForm } from "@angular/forms";
import { FileUploadService } from 'src/app/shared/fileUpload.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/shared/notification.service';

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
  uploadedFiles=[];
  claimNo;
  fileSubtype;
  DocCat;
  ClmTyp=' '
  @ViewChild('panForm', { static: true })panForm: NgForm;
  constructor(
    private panService: PanService,
    private spinner: NgxSpinnerService,
    private fileUploadService: FileUploadService,
    private notificationService: NotificationService){
  }

  ngOnInit(){
    this.spinner.show('panCard');
    this.gePanCardData();
  }
  gePanCardData(){
    this.panService.getPersonalIdDetails().subscribe(res=>{
      this.user_pancard = res.body.d.results[0];
      this.fileSubtype = res.body.d.results[0].Subty;
      this.claimNo =res.body.d.results[0].Key;
      this.getDocData()
    },(err)=>{
      this.spinner.hide('panCard');
      this.notificationService.warn("Error in getting Data from Server!!");
    })
  }
  getDocData(){
    this.fileUploadService.getDocumentCategory(this.fileSubtype).subscribe(doc=>{
      this.DocCat=doc.body.d.DocTyp;
      this.getFileData();
    },
    (err)=>{
      this.spinner.hide('panCard');
      this.notificationService.warn("Error in getting Data from Server!!");
    })
  }
  getFileData(){
    this.fileUploadService.getUploadedFiles(this.claimNo,this.DocCat,this.ClmTyp).subscribe(file=>{
      this.uploadedFiles.push(...file.d.results);
      this.uploadedFiles.forEach(file2=>{
        file2['FileUrl']=`/sap/opu/odata/sap/ZHR_FILEUPLOADER_JIO1_SRV/AttachmentSet(ArchvId='${file2.ArchvId}',FileName='${file2.FileName}')/$value`
      });
      this.spinner.hide('panCard');
      },
      err=>{
      this.spinner.hide('panCard');
      this.notificationService.warn("Error in getting Data from Server!!");
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

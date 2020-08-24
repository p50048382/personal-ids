import { Component,OnInit,ViewChild } from '@angular/core';
import { AadharService } from 'src/app/shared/aadhar.service';
import { FileUploadService } from 'src/app/shared/fileUpload.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgForm } from "@angular/forms";
import { NotificationService } from 'src/app/shared/notification.service';
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
  uploadedFiles=[];
  claimNo;
  fileSubtype;
  DocCat;
  ClmTyp=' ';
  @ViewChild('aadharForm', { static: true })aadharForm: NgForm;
  constructor( 
    private aadharService:AadharService,
    private spinner: NgxSpinnerService,
    private fileUploadService: FileUploadService,
    private notificationService: NotificationService
    ){}
  ngOnInit(): void {    
    this.spinner.show('aadhar')
    this.getAadharData();
  }
  getAadharData(){
    this.aadharService.getAadhar().subscribe(aadharDetails=>{
      this.user_aadhar = aadharDetails.body.d;
      this.fileSubtype = aadharDetails.body.d.Subty;
      this.claimNo = aadharDetails.body.d.Key;
      this.getDocData()
    },err=>{
      this.spinner.hide('aadhar');
      this.notificationService.warn("Error in getting Data from Server!!");
    })
  }
  getDocData(){
    this.fileUploadService.getDocumentCategory(this.fileSubtype).subscribe(doc=>{
      this.DocCat=doc.body.d.DocTyp;
      this.getFileData()
    },err=>{
      this.spinner.hide('aadhar');
      this.notificationService.warn("Error in getting Data from Server!!");
    })
  }
  getFileData(){
    this.fileUploadService.getUploadedFiles(this.claimNo,this.DocCat,this.ClmTyp).subscribe(file=>{
      this.uploadedFiles.push(...file.d.results);
      this.uploadedFiles.forEach(file2=>{
        file2['FileUrl']=`/sap/opu/odata/sap/ZHR_FILEUPLOADER_JIO1_SRV/AttachmentSet(ArchvId='${file2.ArchvId}',FileName='${file2.FileName}')/$value`
      });
      this.spinner.hide('aadhar');
      },
      err=>{
      this.spinner.hide('aadhar');
      this.notificationService.warn("Error in getting Data from Server!!");
      })
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

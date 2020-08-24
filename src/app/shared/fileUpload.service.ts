import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';

const newHttpOptions  = {
    headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Basic ' + btoa('P50002103:1q1q1q'))
        .set('X-CSRF-Token' , 'fetch'),
    observe: 'response' as 'body'
  };

@Injectable({
  providedIn: 'root',
})
export class FileUploadService{
    constructor(private http: HttpClient){}
  
    getDocumentCategory(subType){
      return this.http.get<any>(`/sap/opu/odata/sap/ZHR_PERSONAL_ID_JIO_SRV/GetDocCategorySet('${subType}')`,newHttpOptions)
    }

    getUploadedFiles(ClaimNo,DocCat,ClmTyp ){
      const opts = { params: new HttpParams({fromString:`$filter= ClaimNo eq '${ClaimNo}' and DocCat eq '${DocCat}' and ClmTyp eq '${ClmTyp}'` }),newHttpOptions }
      let url =  `/sap/opu/odata/sap/ZHR_FILEUPLOADER_JIO1_SRV/UploadedFileSet`;
      return this.http.get<any>(url,opts);
  }

  uploadFile(csrf_token,data){
    return this.http.post('/sap/opu/odata/sap/ZHR_FILEUPLOADER_JIO1_SRV/AttachmentSet',data)
  }
}
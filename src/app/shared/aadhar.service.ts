import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

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
export class AadharService{
    private PHONE_URL = "/sap/opu/odata/sap/ZLSA_SPA_SRV/MobileNumberSet?$filter eq ''";
    private aadhar_url = "/sap/opu/odata/sap/ZHR_PERSONAL_ID_JIO_SRV/UIDDetails_GetSet('')"
    constructor(private http: HttpClient){}
  
    getAadhar(){
        return this.http.get<any>(this.aadhar_url,newHttpOptions);
    }
}
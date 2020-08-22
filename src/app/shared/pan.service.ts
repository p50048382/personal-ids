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
export class PanService{
    private pan_url = "/sap/opu/odata/sap/ZHR_PERSONAL_ID_JIO_SRV/EmpPersonalIdsSet"
    constructor(private http: HttpClient){}
  
    getPersonalIdDetails(){
        return this.http.get<any>(this.pan_url,newHttpOptions);
    }
}
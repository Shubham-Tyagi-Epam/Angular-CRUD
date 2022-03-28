import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './Product';
import { Employee } from './Employee';

@Injectable({
  providedIn: 'root'
})
export class RestEmployeeService {
  url = "http://localhost:4000/employees";
  
  constructor(private http:HttpClient) { }
  
  getAllEmployee():Observable<any>{
    return this.http.get(this.url); 
  }

  deleteEmployee(iEmployeeId:string):Observable<any>{
    let deleteURL = this.url + "/" + iEmployeeId;
    return this.http.delete(deleteURL);
  }

  updateEmployee(empObj:Employee):Observable<any>{
    let updateURL = this.url + "/" + empObj.id;
    return this.http.put(updateURL,empObj);
  }

  insertEmployee(empObj:Employee):Observable<any>{
    let header = {'content-type':'application/json'};
    let body = JSON.stringify(empObj);
    return this.http.post(this.url,body,{'headers' : header});
  }
}

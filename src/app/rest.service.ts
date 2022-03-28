import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  
  url = "http://localhost:3000/products";
  
  constructor(private http:HttpClient) { }
  
  getAllProducts():Observable<any>{
    return this.http.get(this.url); 
  }

  deleteProduct(iProductId:string):Observable<any>{
    let deleteURL = this.url + "/" + iProductId;
    return this.http.delete(deleteURL);
  }

  updateProduct(proObj:Product):Observable<any>{
    let updateURL = this.url + "/" + proObj.id;
    return this.http.put(updateURL,proObj);
  }

  insertProduct(proObj:Product):Observable<any>{
    let header = {'content-type':'application/json'};
    let body = JSON.stringify(proObj);
    return this.http.post(this.url,body,{'headers' : header});
  }
}

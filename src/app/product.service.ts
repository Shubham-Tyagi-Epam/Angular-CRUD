import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Product } from './Product';
import { RestService } from './rest.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private restService:RestService) { }
  
  // productsList:Product[] = [
  //   {id:"Ph123",name:"Samsung B30",releaseTimeInYears:0.5,cost:10000,description:"Google android Phone with 3GB ram"},
  //   {id:"TV12",name:"One Plus txr",releaseTimeInYears:1,cost:30000,description:"Full HD Google android TV"},
  //   {id:"LAP21",name:"Dell inspiron12",releaseTimeInYears:2,cost:50000,description:"Windows 11 Laptop"},
  //   {id:"Ph211",name:"Samsung Z12",releaseTimeInYears:1,cost:20000,description:"Google android phone with 4Db ram"},
  //   {id:"TV31",name:"Sony X23",releaseTimeInYears:2,cost:60000,description:"4K Android TV with triluminous display"}
  // ]
  productsList:Product[] = []
  getAllProductsFromRestService(){
    this.restService.getAllProducts().subscribe(
      (data)=>{
        this.productsList = data;
      },
      (error) => console.log("Error is :" + error)
    )
  }

  getProductsList():Product[]{
    this.getAllProductsFromRestService();
    return this.productsList;
  }
  filter(pId:string,pName:string):Product[]{
    return this.productsList.filter((proObj)=>{
      if((pId!="" && proObj.id.toLowerCase().startsWith(pId.toLowerCase())) || (pName!="" && proObj.name.toLowerCase().startsWith(pName.toLowerCase())))
        return proObj;
      return false;
    });
  }
  remove(pId:string):Product[]{
    this.restService.deleteProduct(pId).subscribe(
      (data) => {
        this.getAllProductsFromRestService();
      },
      (error) => console.log("Error is : "+ error)
    )
    return this.productsList;
  }

  addData(id:string,name:string,releaseTimeInYears:number,cost:number,desc:string){
    console.log(cost);
    if(!this.checkAddData(id,name,releaseTimeInYears,cost,desc)){
      alert('Enter All Details correctly');
      return;
    }
    for(let proObj of this.productsList){
      if(proObj.id == id){
        alert('Sorry! ID not available');
        return;
      }
    }
    // this.productsList.push({"name":name,"empId":id,"age":age,"designation":desig,"location":place})
    let newProduct:Product = new Product(id,name,releaseTimeInYears,cost,desc);
    this.restService.insertProduct(newProduct).subscribe(
      (data) => {
        this.getAllProductsFromRestService();
      },
      (error) => console.log(error)
    )
  }

  editData(id:string,name:string,releaseTimeInYears:number,cost:number,desc:string){
    if(!this.checkEditData(name,releaseTimeInYears,cost,desc)){
      alert('Enter All Details correctly');
      return;
    }
    let editedProObj:Product = new Product(id,name,releaseTimeInYears,cost,desc) ;
    // for(let proObj of this.productsList){
    //   if(proObj.id == id){
    //     editedProObj.id = id;
    //     editedProObj.name = name;
    //     editedProObj.releaseTimeInYears = releaseTimeInYears;
    //     editedProObj.cost = cost;
    //     editedProObj.description = desc;
    //   }
    // }
    this.restService.updateProduct(editedProObj).subscribe(
      (data)=>{
        this.getAllProductsFromRestService();
      },
      (error) => console.log(error)
    )
  }
  checkAddData(id:string,name:string,releaseTimeInYears:number,cost:number,desc:string){
    if(this.checkProductId(id) || this.checkProductCost(cost) || this.checkProductName(name) || this.checkProductRTY(releaseTimeInYears) || this.checkProductDesc(desc))
      return false;
    return true;
  }

  checkEditData(name:string,releaseTimeInYears:number,cost:number,desc:string){
    if(this.checkProductCost(cost) || this.checkProductName(name) || this.checkProductRTY(releaseTimeInYears) || this.checkProductDesc(desc))
      return false;
    return true;
  }

  checkProductId(id:string){
    if(id==""){
      return true;
    }
    for(let proObj of this.productsList){
      if(proObj.id == id){
        return true;
      }
    }
    return false;
  }
  checkProductName(name:String){
    if(name.length<5)
      return true;
    return false;
  }
  checkProductRTY(rty:number){
    if(rty<0 || rty == 0)
      return true;
    return false;
  }
  checkProductDesc(desc:string){
    if(desc.length<5)
      return true;
    return false;
  }
  checkProductCost(cost:number){
    if(cost<10)
      return true;
    return false;
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ProductService } from '../product.service';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productObjArray!:Product[];
  productObjArrayDup!:Product[];

  currentlyEditingId = "";
  currentlyEditingName = "";
  currentlyEditingRTY = -1;
  currentlyEditingCost = -1;
  currentlyEditingDesc = "";

  constructor(private productService:ProductService,private restService:RestService) { }

  ngOnInit(): void {
  }
  
  setCurrentlyEditing(id:string,name:string,rty:number,desc:string,cost:number){
    this.currentlyEditingId = id;
    this.currentlyEditingName = name;
    this.currentlyEditingRTY = rty;
    this.currentlyEditingCost = cost;
    this.currentlyEditingDesc = desc;
  }

  getAllProductsFromProductService(){
    this.restService.getAllProducts().subscribe(
      (data) => {
        this.productObjArrayDup = data;
      },
      (err)=>{
        console.log("Error is :" + err)
      }
    )
    this.productObjArrayDup = this.productObjArray;
  }
  filter(pId:string,pName:string){
    this.productObjArrayDup = this.productService.filter(pId,pName);
  }
  remove(pId:string){
    this.productObjArrayDup = this.productService.remove(pId);
  }
  edit(name:string,releaseTimeInYears:string,desc:string,cost:string){
    this.productService.editData(this.currentlyEditingId,name,Number(releaseTimeInYears),Number(cost),desc);
    this.clearForm();
  }
  add(id:string,name:string,releaseTimeInYears:string,desc:string,cost:string){
    this.productService.addData(id,name,Number(releaseTimeInYears),Number(cost),desc);
  }
  clearForm(){
    this.currentlyEditingId = "";
    this.currentlyEditingName = "";
    this.currentlyEditingRTY = -1;
    this.currentlyEditingDesc = "";
    this.currentlyEditingCost = -1;
  }
  checkProductId(id:string){
    if(this.productService.checkProductId(id))
      alert("ID can't be empty or ID already exists");
  }
  checkProductName(name:String){
    if(this.productService.checkProductName(name) == true)
      alert('name length cannot be less than 5');

  }
  checkProductRTY(rty:string){
    if(this.productService.checkProductRTY(Number(rty)) == true)
      alert('Release Time value can not be less than 0');
  }
  checkProductDesc(desc:string){
    if(this.productService.checkProductDesc(desc)==true)
    alert('Description length cannot be less than 5');
  }
  checkProductCost(cost:string){
    if(this.productService.checkProductCost(Number(cost)) == true)
    alert('cost could not be less than 10 rs');
  }
}

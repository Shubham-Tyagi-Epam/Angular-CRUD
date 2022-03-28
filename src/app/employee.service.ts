import { Injectable } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { Employee } from './Employee';
import { RestEmployeeService } from './rest-employee.service';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private restService:RestEmployeeService) { }
  employeeList:Employee[] = []
  getAllEmployeeFromRestService(){
    this.restService.getAllEmployee().subscribe(
      (data)=>{
        this.employeeList = data;
      },
      (error) => console.log("Error is :" + error)
    )
  }

  getEmployeeList():Employee[]{
    this.getAllEmployeeFromRestService();
    return this.employeeList;
  }
  filter(eId:string,eName:string):Employee[]{
    return this.employeeList.filter((empObj)=>{
      if((eId!="" && empObj.id.toLowerCase().startsWith(eId.toLowerCase())) || (eName!="" && empObj.name.toLowerCase().startsWith(eName.toLowerCase())))
        return empObj;
      return false;
    });
  }
  filterData(eId:string,eName:string,empArray:Employee[]):Employee[]{
    console.log(empArray);
    return empArray.filter((empObj)=>{
      if((eId!="" && empObj.id.toLowerCase().startsWith(eId.toLowerCase())) || (eName!="" && empObj.name.toLowerCase().startsWith(eName.toLowerCase())))
        return empObj;
      return false;
    });
  }
  remove(eId:string):Employee[]{
    this.restService.deleteEmployee(eId).subscribe(
      (data) => {
        this.getAllEmployeeFromRestService();
      },
      (error) => console.log("Error is : "+ error)
    )
    return this.employeeList;
  }

  addData(id:string,name:string,location:string,email:string,designation:string,pwd:string){
 
    for(let empObj of this.employeeList){
      if(empObj.id == id){
        alert('Sorry! ID not available');
        return;
      }
    }
    // this.productsList.push({"name":name,"empId":id,"age":age,"designation":desig,"location":place})
    let newEmployee:Employee = new Employee(id,name,location,email,designation,pwd);
    this.restService.insertEmployee(newEmployee).subscribe(
      (data) => {
        this.getAllEmployeeFromRestService();
      },
      (error) => console.log(error)
    )
  }

  editData(id:string,name:string,location:string,email:string,designation:string){
    let pwd:string="";
    for(let e of this.employeeList){
      if(id == e.id){
        pwd = e.pwd;
        break;
      }
    }
    let editedEmpObj:Employee = new Employee(id,name,location,email,designation,pwd) ;
    this.restService.updateEmployee(editedEmpObj).subscribe(
      (data)=>{
        this.getAllEmployeeFromRestService();
      },
      (error) => console.log(error)
    )
  }
  
}

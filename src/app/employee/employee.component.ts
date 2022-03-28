import { Component, OnInit } from '@angular/core';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';
import { RestEmployeeService } from '../rest-employee.service';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeObjArray!:Employee[];
  employeeObjArrayDup!:Employee[];

  currentlyEditingId = "";
  currentlyEditingName = "";
  currentlyEditingLocation = "";
  currentlyEditingEmail = "";
  currentlyEditingDesignation = "";

  constructor(private employeeService:EmployeeService, private restService:RestEmployeeService) { }

  ngOnInit(): void {
  }
  
  setCurrentlyEditing(id:string,name:string,loc:string,email:string,desig:string){
    this.currentlyEditingId = id;
    this.currentlyEditingName = name;
    this.currentlyEditingLocation = loc;
    this.currentlyEditingEmail = email;
    this.currentlyEditingDesignation = desig;
  }

  getAllEmployeesFromEmployeeService(){
    this.restService.getAllEmployee().subscribe(
      {next:(data)=>{
        this.employeeObjArrayDup = data;
        this.employeeObjArray = this.employeeObjArrayDup;
      },
      error: (err)=>{
        console.log(err);
      }
    }
    );
   
  }
  // filter(eId:string,eName:string){
  //   this.employeeObjArrayDup = this.employeeService.filter(eId,eName);
  // }
  filter(eId:string,eName:string){
    this.employeeObjArrayDup = this.employeeService.filterData(eId,eName,this.employeeObjArray);
  }
  remove(eId:string){
    // this.employeeObjArrayDup = this.employeeService.remove(eId);
    this.restService.deleteEmployee(eId).subscribe(
      (data) => {
        this.getAllEmployeesFromEmployeeService();
      },
      (error) => console.log("Error is : "+ error)
    )
  }
  edit(name:string,location:string,email:string,designation:string){
    let id = this.currentlyEditingId;
    // this.employeeService.editData(this.currentlyEditingId,name,location,email,designation);
    this.clearForm();
    let pwd:string="";
    for(let e of this.employeeObjArray){
      if(id == e.id){
        pwd = e.pwd;
        break;
      }
    }
    let editedEmpObj:Employee = new Employee(id,name,location,email,designation,pwd) ;
    this.restService.updateEmployee(editedEmpObj).subscribe(
      (data)=>{
        this.getAllEmployeesFromEmployeeService();
      },
      (error) => console.log(error)
    )
  }
  add(id:string,name:string,location:string,email:string,designation:string,pwd:string){
    // this.employeeService.addData(id,name,location,email,designation,pwd);
    for(let empObj of this.employeeObjArray){
      if(empObj.id == id){
        alert('Sorry! ID not available');
        return;
      }
    }
    // this.productsList.push({"name":name,"empId":id,"age":age,"designation":desig,"location":place})
    let newEmployee:Employee = new Employee(id,name,location,email,designation,pwd);
    this.restService.insertEmployee(newEmployee).subscribe(
      (data) => {
        this.getAllEmployeesFromEmployeeService();
      },
      (error) => console.log(error)
    )
  }
  clearForm(){
    this.currentlyEditingId = "";
    this.currentlyEditingName = "";
    this.currentlyEditingEmail = "";
    this.currentlyEditingLocation = "";
    this.currentlyEditingDesignation = "";
  }
  
}

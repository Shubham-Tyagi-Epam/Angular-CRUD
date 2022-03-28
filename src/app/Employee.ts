export class Employee{
    id! : string;
    name!: string;
    location!: string;
    email!: string;
    designation!:string;
    pwd!:string;

    constructor(id:string,name:string,location:string,email:string,designation:string,pwd:string){
        this.id = id;
        this.name = name;
        this.location = location;
        this.email = email;
        this.designation = designation;
        this.pwd = pwd;
    }
}
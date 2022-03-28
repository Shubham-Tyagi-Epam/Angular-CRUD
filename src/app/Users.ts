export class User{
    id:string = "";
    name:string = "";
    pwd:string = "";
    age:string = "";
    email: string ="";

    constructor(id:string,name:string,pwd:string,age:string,email:string){
        this.id = id;
        this.name = name;
        this.pwd = pwd;
        this.age = age;
        this.email = email;
    }
}
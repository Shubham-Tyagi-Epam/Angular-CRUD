export class Product{
    id!:string;
    name!:string;
    releaseTimeInYears!:number;
    cost!:number;
    description!:string;

    constructor(id:string,name:string,rty:number,cost:number,desc:string){
        this.id = id;
        this.name = name;
        this.releaseTimeInYears = rty;
        this.cost = cost;
        this.description = desc;
    }
}
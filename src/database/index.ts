export class Database {
    private static instance: Database
    
    private constructor(
        private database:string[]
    ){}

    public static getInstance(instanceConnection:string[]):Database {
        if(!Database.instance){
            Database.instance = new Database(instanceConnection)
        }
        return this.instance 
    }

    get_data(){
        return this.database
    }

}
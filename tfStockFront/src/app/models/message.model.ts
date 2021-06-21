import { User } from "./user.model";

export interface Message{
    id:number,
    message:string,
    user:User,
    done:boolean
}
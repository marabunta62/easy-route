import { Driver } from "@/models/Driver";
import { Passenger } from "@/models/Passenger";

export interface UserModel {
    userId: number;
    name?: string;
    email: string;
    password: string;
    driver?: Driver;
    passenger?: Passenger;
}

export interface UserAPiNest {
    statusCode: number,
    message: string,
    error: string
}

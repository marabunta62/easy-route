import { Driver } from "@/models/Driver";
import { PickUpModel } from "@/models/PickUp";
import { UserModel } from "@/models/User";

export interface Passenger {
    id: string;
    user: UserModel;
    requestDriversForPickUp: Driver[];
    pickUp: PickUpModel;
    isRejected?: boolean;
}


export interface PassengerList {
    userId: string;
    name: string;
    isRejected: boolean;
}

export interface UpdatePassenger {
    id: string;
    isRejected: boolean;
    pickUp: null;
    requestPickUp?: null
}

export interface UpdateAcceptPassenger {
    id: string;
    isRejected: boolean;
    requestPickUpId: null
}

export interface passengerIsUser {
    findPassengerUser: UserModel,
    currPickUp?: PickUpModel,
    reqPickUp?: PickUpModel[]
}

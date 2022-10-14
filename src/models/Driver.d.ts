import { PickUpModel } from "@/models/PickUp";
import { Passenger } from "@/models/Passenger";
import { UserModel } from "@/models/User";

//Nota faudra mapper l'id du passenger avec driver pour prodil/rejeter/messagerie
export interface Driver {
    id: number;
    pickUp: PickUpModel;
    passengersRequestForPickUp: Passenger[];
    passengers: Passenger[];
}


export interface HolidaysDates {
    from: 'toto';
    to: string;
}

import { Passenger } from "@/models/Passenger";
import { Driver } from "@/models/Driver";

export interface PickUpModelOulet {
  driver: string;
  passenger: [];
  placeIn: string;
  placeOut: string;
  car: string;
  placeLeft: number;
}


export interface PickUpModel {
  id: string;
  driver: Driver;
  //driverName: string;
  departureCityName: string;
  arrivalCityName: string;
  departureHour?: string;
  arrivalHour?: string;
  description?: string;
  isInHoliday?: boolean;
  wantPassengers?: boolean;
  departureCoordinates: Coordinates[];
  arrivalCoordinates: Coordinates[];
  pickUpCar?: Car;
  passengers: Passenger[];
}

export interface Car {
  model?: string;
  color: string;
  totalSlots: number;
  takenSlots: number;
  availableSlots: number;
}

export type Coordinates = {
  lng: number;
  lat: number;
}

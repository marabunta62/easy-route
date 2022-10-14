import { Passenger } from "@/models/Passenger";
import { Driver } from "@/models/Driver";

export interface holidayDates {
  from: string;
  to: string
}


export interface PickUpModel {
  id: string;
  driver?: Driver;
  //driverName: string;
  departureCityName: string;
  arrivalCityName: string;
  departureHour?: string;
  arrivalHour?: string;
  description?: string;
  isInHoliday?: boolean;
  holidaysDateRange: string;
  wantPassengers: boolean;
  departureCoordinates: Coordinates[];
  arrivalCoordinates: Coordinates[];
  pickUpCar: Car;
  passengers: Passenger[];
}

export interface Car {
  id: number;
  brand?: string
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

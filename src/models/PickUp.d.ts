export interface PickUpModel {
  driver: string;
  passenger: [];
  placeIn: string;
  placeOut: string;
  car: string;
  placeLeft: number;
}


export interface PickUpModel2 {
  name: string;
  car: string;
  model?: string;
  slots: number;
  departureCityName: string;
  arrivalCityName: string;
  departureCoordinates: Coordinates[];
  arrivalCoordinates: Coordinates[];
}

export type Coordinates = {
  lat: number;
  lng: number;
} | null

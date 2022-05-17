import { PickUpSvc as PickUpServiceImpl } from "@/services/PickUpSvc";
import { CityCoordinatesSvc as CityCoordinatesImpl } from "@/services/CityCoordinatesSvc";

export const PickUpService = new PickUpServiceImpl();
export const CityCoordinatesService = new CityCoordinatesImpl();

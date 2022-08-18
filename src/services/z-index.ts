import { PickUpSvc as PickUpServiceImpl } from "@/services/PickUpSvc";
import { CityCoordinatesSvc as CityCoordinatesImpl } from "@/services/CityCoordinatesSvc";
import { UsersSvc as UserSvcImp } from "@/services/UsersSvc";
import { DriverSvc as DriverSvcImpl } from "@/services/DriverSvc";

export const PickUpService = new PickUpServiceImpl();
export const CityCoordinatesService = new CityCoordinatesImpl();
export const UserService = new UserSvcImp();
export const DriverService = new DriverSvcImpl();

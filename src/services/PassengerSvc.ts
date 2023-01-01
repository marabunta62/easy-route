import { Passenger, UpdatePassenger } from "@/models/Passenger";
import { axios, AxiosResponse } from "@/config/axios";

export class PassengerSvc {

    async patchPassengerByDriver(passengerUpdte: UpdatePassenger): Promise<UpdatePassenger> {
        const response: AxiosResponse = await axios.patch(`/passenger/pickup-infos`, passengerUpdte);
        return response.data as UpdatePassenger;
    }

    async fetchPassengerPickUpData(id: number): Promise<Passenger> {
        const response: AxiosResponse = await axios.get(`/passenger/infos/${id}`);
        console.log("passenger response return ", response.data);
        return response.data as Passenger;
    }
}

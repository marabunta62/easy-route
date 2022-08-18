import { axios, AxiosResponse } from "@/config/axios";
import { PickUpModel } from "@/models/PickUp";

export class DriverSvc {

    async getDriverPickUpData(userId: number): Promise<PickUpModel> {
        const response: AxiosResponse = await axios.get(`/driver/pickup-infos/${userId}`);
        console.log("driver response return ", response.data);
        return response.data as PickUpModel;
    }
}

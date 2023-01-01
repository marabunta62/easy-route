import { axios, AxiosResponse } from "@/config/axios";
import { Driver } from "@/models/Driver";

export class DriverSvc {

    async getDriverPickUpData(userId: number): Promise<Driver> {
        const response: AxiosResponse = await axios.get(`/driver/pickup-infos/${userId}`);
        return response.data as Driver;
    }

    async postDriverInfosPickUpData(driverInfo: any): Promise<Driver> {
        //console.log("driver response return ", driverInfo);
        const response: AxiosResponse = await axios.patch(`/driver/pickup-infos/${driverInfo.id}`, driverInfo);
        console.log("driver response return ", response.data);
        return response.data as Driver;
    }
}

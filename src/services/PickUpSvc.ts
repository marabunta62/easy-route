import { PickUpModel, PickUpModel2 } from "@/models/PickUp";
import { axios, AxiosResponse } from "@/config/axios";

export class PickUpSvc {
  async getPickUp(): Promise<PickUpModel> {
    const response: AxiosResponse = await axios.get("/pick-up");
    return response.data as PickUpModel;
  }

  async getAllPickUp(): Promise<PickUpModel2[]> {
    const response: AxiosResponse = await axios.get("/pick-up/all");
    return response.data as PickUpModel2[];
  }
}

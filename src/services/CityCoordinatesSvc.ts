import { axios, AxiosResponse } from "@/config/axios";
import { City } from "@/models/City";

export class CityCoordinatesSvc {
  async getCityCoordinates(city: string): Promise<City> {
    //console.log("param svc ", city);
    const response: AxiosResponse = await axios.get("/location-map", {
      params: {
        cityName: city,
      },
    });
    const cityCoordinate = {
      city: city,
      type: response.data.type,
      coordinates: response.data.coordinates,
    } as City;
    console.log("city coordinates return ", cityCoordinate);

    return cityCoordinate;
  }

  async fetchCityAutoCompletionList(city: string | null): Promise<[] | null> {
    //console.log("param svc ", city);
    const response: AxiosResponse = await axios.get("/location-map/ac", {
      params: {
        cityName: city,
      },
    });
    //console.log("param return ", cityCoordinate);
    //console.log("svc response", response.data);

    return response.data as [];
  }
}

import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { CityCompletion } from "@/models/City";

@Module({
  namespaced: true,
})
export default class CityCoordinatesMd extends VuexModule {
  private coordinatesCity: CityCompletion | null = null;

  get coordinatesCityMd(): CityCompletion | null {
    return this.coordinatesCity;
  }

  @Mutation
  setCoordinatesCity(coordinatesCity: CityCompletion | null): void {
    this.coordinatesCity = coordinatesCity;
  }

  @Action({ rawError: true })
  async fetchCityCoordinates(cityName: CityCompletion): Promise<void> {
    try {
      //const setCoordinatesCityData =
        //await CityCoordinatesService.getCityCoordinates(cityName);
      console.log("new location", cityName)

      this.context.commit("setCoordinatesCity", cityName);
    } catch (err) {
      this.context.commit("setCoordinatesCity", null);
      throw err;
    }
  }
}

import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { CityCompletion } from "@/models/City";
import { convertProxyInJson } from "@/store";

@Module({
  namespaced: true,
})
export default class CityCoordinatesMd extends VuexModule {
  private coordinatesCity: string | null = null;

  get coordinatesCityMd(): string | null {
    return convertProxyInJson(this.coordinatesCity);
  }

  @Mutation
  setCoordinatesCity(coordinatesCity: string | null): void {
    this.coordinatesCity = coordinatesCity;
  }

  @Action({ rawError: true })
  async fetchCityCoordinates(cityName: string): Promise<void> {
    try {
      this.context.commit("setCoordinatesCity", cityName);
    } catch (err) {
      this.context.commit("setCoordinatesCity", null);
      throw err;
    }
  }
}

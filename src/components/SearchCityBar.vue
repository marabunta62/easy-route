<template>
      <div class="q-gutter-md">
        <QSelect
          dense
          filled
          v-model="inputDepartureCity"
          use-input
          hide-selected
          fill-input
          input-debounce="2"
          map-options
          emit-value
          clearable
          v-model:label="inputLabel"
          option-label="showCompletion"
          option-value="optionsAutoCompletion"
          :options="optionsAutoCompletion"
          @filter="autoCompletionCities"
          @input-value="getSelectedCityFromAC"
          @update:model-value="getSelectedValue"
          hint="Minimum 2 caractères pour chercher une ville"
          style="width: 100%; padding-bottom: 32px"
        >
          <template v-slot:prepend>
            <QIcon name="place" />
          </template>
          <template v-slot:no-option>
            <QItem>
              <QItemSection class="text-grey"> No results </QItemSection>
            </QItem>
          </template>
        </QSelect>
      </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "s-vuex-class";
import { City, CityCompletion } from "@/models/City";
import { CityCoordinatesService } from "@/services/z-index";
import { Prop } from "vue-property-decorator";

const cityCoordinatesMd = namespace("CityCoordinatesMd");

@Options({
  name: "SearchCityBar",
})
export default class SearchCityBar extends Vue {
  private inputDepartureCity: CityCompletion | null = null;
  private departureCity = "";

  private inputArrivalCity = "";
  private arrivalCity = "";

  private citiesList: any = null;

  private isLoading = false;
  private timerAutoCompletion: ReturnType<typeof setTimeout> | null = null;

  @Prop({ default: "Selectionnez une Ville pour Zoomer", type: String})
  readonly inputLabel!: string;

  @cityCoordinatesMd.Getter
  private coordinatesCityMd!: City | null;

  @cityCoordinatesMd.Action
  private fetchCityCoordinates!: (inputDepartureCity: CityCompletion | null) => Promise<void>;

  /*mounted() {
    this.inputCity();
  }*/
  get optionsAutoCompletion(): [] {
    if (this.citiesList === null) {
      return [];
    }
    return this.citiesList.map((element: any) =>
      Object.assign({
        city: element["city"],
        showCompletion: element["country"] + " - " + element["city"],
        coordinates: element["coordinates"],
      })
    );
  }

  async getSelectedCityFromAC(selectedCity: string) {
    console.log("v model", this.inputDepartureCity);
    console.log("v model param", selectedCity);
    await this.getInputDepartureCityCoordinates()
    //this.inputDepartureCity = selectedCity;
  }

  async autoCompletionCities(cityInput: string | null, update: (arg0: () => void) => void, abort: () => void): Promise<void> {
    if (cityInput != null && cityInput.length >= 3) {
      //LOwerCase city INput
      try {
        setTimeout(async () => {
          const response = await CityCoordinatesService.fetchCityAutoCompletionList(cityInput);
          update(() => {
            this.citiesList = response;
          });
        }, 500);
      } catch (err) {
        this.$log.error(err);
      }
    } else {
      abort();
    }
  }

  async getSelectedValue(val: string) {
    await this.getInputDepartureCityCoordinates();
  }

  async getInputDepartureCityCoordinates(): Promise<void> {
    this.isLoading = true;
    try {
      //inputDepartureCity: CityCompletion | null
      //const convertCityFromAc = this.inputDepartureCity.match(/([^- ])*$/g)?.[0] || null;
      console.log("here object", this.inputDepartureCity);
      //.log("here converted", convertCityFromAc);
      //send coordinates into store for map component
      await this.fetchCityCoordinates(this.inputDepartureCity);
      this.isLoading = false;
    } catch (err) {
      this.$log.error(err);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<style scoped lang="scss"></style>

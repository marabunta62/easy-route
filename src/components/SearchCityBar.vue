<template>
      <div class="q-gutter-md">
        <QSelect
          :dense="dense"
          :filled="filled"
          :square="square"
          :outlined="outlined"
          :bottom-slots="bottomSlots"
          v-model="inputWriteCity2"
          use-input
          hide-selected
          fill-input
          input-debounce="2"
          map-options
          emit-value
          clearable
          @clear="clearInput"
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
            <QIcon :name="icon" />
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
import { ModelSync, Prop, PropSync } from "vue-property-decorator";

const cityCoordinatesMd = namespace("CityCoordinatesMd");

@Options({
  name: "SearchCityBar",
})
export default class SearchCityBar extends Vue {

  private inputWriteCity: CityCompletion | null = null;
  private inputWriteCity2 = '';

  private citiesList: any = null;

  private isLoading = false;

  @Prop({ default: "Selectionnez une Ville pour Zoomer", type: String})
  readonly inputLabel!: string;

  @Prop({ default: "pin_drop", type: String})
  readonly icon!: string;

  @Prop({ default: true, type: Boolean})
  readonly flate!: boolean;

  @Prop({ default: false, type: Boolean})
  readonly square!: boolean;

  @Prop({ default: true, type: Boolean})
  readonly outlined!: boolean;

  @Prop({ default: true, type: Boolean})
  readonly dense!: boolean;

  @Prop({ default: false, type: Boolean})
  readonly bottomSlots!: boolean;

  @Prop({ default: false, type: Boolean})
  readonly filled!: boolean;

  @PropSync('cityNameInput')
  inputCity!: CityCompletion;

  @cityCoordinatesMd.Getter
  private coordinatesCityMd!: City | null;

  @cityCoordinatesMd.Action
  private fetchCityCoordinates!: (inputDepartureCity: string | null) => Promise<void>;

  //private departureCityName!: CityCompletion;

  created() {
    if(this.inputCity) {
      console.log('enter in condition')
      console.log('enter in condition infos', this.inputCity)
      this.inputWriteCity2 = this.inputCity.showCompletion;
    }
  }

  clearInput() {
    console.log('clear')
    this.inputCity.showCompletion = '';
  }

  /*
  * Selected Value in AutoCompletion should update coordinates module
  */
  async getSelectedCityFromAC() {
    await this.getInputDepartureCityCoordinates()
  }

  /*
  * Selected Value should update input model and update coordinates module
  */
  async getSelectedValue() {
    await this.getInputDepartureCityCoordinates();
  }

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
  };

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

  async getInputDepartureCityCoordinates(): Promise<void> {
    this.isLoading = true;
    try {
      /*
      * Selected Value should update coordinates module for mapView Component
      */
      await this.fetchCityCoordinates(this.inputWriteCity2);
      this.isLoading = false;
    } catch (err) {
      this.$log.error(err);
    } finally {
      this.isLoading = false;
      this.$emit('update-city', this.inputWriteCity2)

    }
  }
}
</script>

<style scoped lang="scss"></style>

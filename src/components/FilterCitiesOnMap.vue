<template>
  <div class="row justify-around">
    <search-city-bar :input-label="'Filtrer Ville Départ'"></search-city-bar>
    <search-city-bar :input-label="'Filtrer Ville Arrivé'"></search-city-bar>
    <label class="q-ma-xs filter__label">
      <q-checkbox v-model="isSlotAvailable"></q-checkbox>
      Afficher uniquement les trajets avec des places disponibles
    </label>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SearchCityBar from "@/components/SearchCityBar.vue";

@Options({
  name: "FilterCitiesOnMap",
  components: { SearchCityBar }
})
export default class FilterCitiesOnMap extends Vue {

  private isSlotAvailable = false;

}
</script>
<style lang="scss">

.filter {

  &__label {
    font-size: smaller;
  }
}

</style>

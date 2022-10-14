<template>
  <div class="home q-mt-lg">
    <AccountCreateLogin/>
    <SearchCityBar class="q-px-md" :icon="'location_searching'"/>
    <FilterCitiesOnMap />
    <MapView />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import SearchCityBar from "@/components/SearchCityBar.vue";
import MapView from "@/components/MapView.vue";

import { Options, Vue } from "vue-class-component";
import AccountCreateLogin from "@/components/AccountCreateLogin.vue";
import FilterCitiesOnMap from "@/components/FilterCitiesOnMap.vue";

@Options({
  components: {
    FilterCitiesOnMap,
    MapView,
    SearchCityBar,
    AccountCreateLogin
  },
})
export default class HomeView extends Vue {}
</script>

<template>
  <div class="home">
    <SearchCityBar />
    <MapView />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import SearchCityBar from "@/components/SearchCityBar.vue";
import MapView from "@/components/MapView.vue";

import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    MapView,
    SearchCityBar,
  },
})
export default class HomeView extends Vue {}
</script>

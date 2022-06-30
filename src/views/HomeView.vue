<template>
  <div class="home">
    <AccountCreateLogin/>
    <SearchCityBar />
    <MapView />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import SearchCityBar from "@/components/SearchCityBar.vue";
import MapView from "@/components/MapView.vue";

import { Options, Vue } from "vue-class-component";
import AccountCreateLogin from "@/components/AccountCreateLogin.vue";

@Options({
  components: {
    MapView,
    SearchCityBar,
    AccountCreateLogin
  },
})
export default class HomeView extends Vue {}
</script>

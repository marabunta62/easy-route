<template>
  <QPage class="flex flex-center">
    <div id="map" ref="mapRef"></div>
  </QPage>
</template>

<style></style>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import tt, { LngLatLike } from "@tomtom-international/web-sdk-maps";
import { Inject, Watch } from "vue-property-decorator";
import { namespace } from "s-vuex-class";
import { CityCompletion } from "@/models/City";
import { Coordinates, PickUpModel2 } from "@/models/PickUp";
import PickUpMd from "@/store/modules/PickUpMd";

const cityCoordinatesMd = namespace("CityCoordinatesMd");
const pickUpMd = namespace("PickUpMd");

@Options({
  name: "MapView",
})
export default class MapView extends Vue {
  @cityCoordinatesMd.Getter
  private coordinatesCityMd!: CityCompletion | null;

  @pickUpMd.Getter
  private pickUpList!: PickUpModel2[] | null;

  @pickUpMd.Action
  private fetchPickUpList!: () => Promise<void>;

  @Inject("TOM_TOM_API_KEY")
  private tomTomAPiKey!: string;

  private loading = false;
  public window: any = window.tt;
  public map: any;
  public marker: any = new this.window.Marker();

  mounted() {
    this.initMap();
    this.addMarkers();
  }

  initMap(): any {
    this.map = this.window.map({
      key: this.tomTomAPiKey,
      container: "map",
      style: "tomtom://vector/1/basic-main",
    });
    this.map.addControl(new tt.FullscreenControl());
    this.map.addControl(new tt.NavigationControl());
    return this.map;
  }

  addMarker(): any | null {
    const newLocation = {
      lng: this.coordinatesCityMd?.coordinates.at(0),
      lat: this.coordinatesCityMd?.coordinates.at(1),
    } as unknown as LngLatLike;
    //console.log("new location", newLocation)
    this.marker.setLngLat(newLocation).addTo(this.map);
    return;
  }

  async addMarkers(): Promise<any> {
    this.loading = true;
    try {
      await this.fetchPickUpList()
    } catch (err) {
      this.$log.error(err);
    } finally {
      this.loading = false;
    }
    if (this.pickUpList) {
      this.transformPickUpDepartureIntoMap().forEach((child) => {
        let departureMarkersDiv = document.createElement('div')
        departureMarkersDiv.className = 'departureMarkers'
        console.log("child", child)
        new this.window.Marker({element: departureMarkersDiv, anchor: 'center'}).setLngLat(child).addTo(this.map)
      });

      this.transformPickUpArrivalsIntoMap().forEach((child) => {
        let arrivalMarkersDiv = document.createElement('div')
        arrivalMarkersDiv.className = 'arrivalMarkers'
        console.log("child", child)
        new this.window.Marker({element: arrivalMarkersDiv, anchor: 'center'}).setLngLat(child).addTo(this.map)
      });
    }
  }

  transformPickUpDepartureIntoMap(): Coordinates[] {
    return this.pickUpList
        ?.map((element) =>
          element.departureCoordinates && element.departureCoordinates.length > 0 ?
              Object.assign({
                lat: element["departureCoordinates"][1],
                lng: element["departureCoordinates"][0],
              }) : [] as Coordinates[])
        .filter(e => e.lat || e.lng === "undefined") as Coordinates[];
  }

  transformPickUpArrivalsIntoMap(): Coordinates[] {
    return this.pickUpList
        ?.map((element) =>
            element.arrivalCoordinates && element.arrivalCoordinates.length > 0 ?
                Object.assign({
                  lat: element["arrivalCoordinates"][1],
                  lng: element["arrivalCoordinates"][0],
                }) : [] as Coordinates[])
        .filter(e => e.lat || e.lng === "undefined") as Coordinates[];
  }

  removeMarker(): any | null {
    this.marker.remove();
    return;
  }

  @Watch("coordinatesCityMd", { immediate: true }) onItemChanged() {
    this.$nextTick(() => {
      this.removeMarker();
      this.addMarker();
    });
  }
}
</script>
<style lang="scss">
#map {
  height: 60vh;
  width: 60vw;
}

.departureMarkers {
  background-image: url('@/assets/departure.svg');
  background-size: cover;
  height: 45px;
  width: 45px;

  & svg {
    height: 45px;
    width: 45px;
  }
}


.arrivalMarkers {
  background-image: url('@/assets/arrival.svg');
  background-size: cover;
  height: 45px;
  width: 45px;

  & svg {
    height: 45px;
    width: 45px;
  }
}

</style>

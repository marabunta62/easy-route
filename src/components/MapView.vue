<template>
  <QPage class="flex flex-center">
    <div id="map" ref="mapRef"></div>
  </QPage>
</template>

<style></style>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import tt, { LngLatLike } from "@tomtom-international/web-sdk-maps";
import tts from "@tomtom-international/web-sdk-services";
import { Inject, Watch } from "vue-property-decorator";
import { namespace } from "s-vuex-class";
import { CityCompletion } from "@/models/City";
import { PickUpModel2 } from "@/models/PickUp";
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

  @pickUpMd.Getter
  private selectedPickUp!: PickUpModel2 | null;

  @pickUpMd.Action
  private fetchPickUpList!: () => Promise<void>;

  @pickUpMd.Action
  private selectedCurrentPickUpModel!: (selectedCurrentPickUpModel: PickUpModel2) => Promise<void>;

  @Inject("TOM_TOM_API_KEY")
  private tomTomAPiKey!: string;

  public window: any = window.tt;
  public map: any;
  public marker: any = new this.window.Marker();
  public routeId: string | undefined;

  mounted() {
    this.initMap();
    this.addMarkers();
  }

  initMap(): any {
    this.map = this.window.map({
      key: this.tomTomAPiKey,
      container: "map",
      style: "tomtom://vector/1/basic-main",
      center: {lng: 2.209667, lat: 46.232193},
      zoom: 5
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
    this.marker.setLngLat(newLocation).addTo(this.map);
    return;
  }

  async addMarkers(): Promise<any> {
    try {
      await this.fetchPickUpList()
    } catch (err) {
      this.$log.error(err);
    }
    if (this.pickUpList) {
      //enrichir transform fn ?? then 2nd forEach pour child and 1st forEach for popUp dont html variabiliser par interpolation string .setDOMContent??
      this.mapPickUpDepartureData().forEach((element, index) => {
        let departureMarkersDiv = document.createElement('div');
        departureMarkersDiv.className = 'departureMarkers';
        let arrivalMarkersDiv = document.createElement('div')
        arrivalMarkersDiv.className = 'arrivalMarkers'

        const departureCityName = element.departureCityName;
        const departureCoordinates = element.departureCoordinates;
        const arrivalCityName = element.arrivalCityName;
        const arrivalsCoordinates = element.arrivalCoordinates;

        const name = element.name;
        const car = element.car;
        const slots = element.slots;

        const popIn = `<div class="pop">
                          <h6 class="pop__title">Trajet de ${departureCityName} vers ${arrivalCityName}</h5>
                          <div>Par ${name} - Rank</div>
                          <div class="pop__list">
                              <ul>
                                  <li>Horaires départ Lens: 8h00</li>
                                  <li>Horaires départ Vermelles: 18h00</li>
                                  <li>Temps trajet estimé: 30min</li>
                                  <li>Nombre de KM: 30km</li>
                                  <li class="pop__list__car">${car} - Serie 3</li>
                                  <li>Places : ${slots}</li>
                                  <li>Places disponibles: 3</li>
                              </ul>
                          </div>
                          <div class="pop__end">
                              <button class="pop__button" type="button">Rejoindre ce trajet!</button>
                          </div>
                      </div>`

        new this.window.Marker({element: departureMarkersDiv, anchor: 'center'})
            .setLngLat(departureCoordinates)
            .setPopup(new this.window.Popup({offset: 35, anchor: 'left'})
            .setHTML(popIn))
            .addTo(this.map)
            .getElement().addEventListener('click', () => {
              if(typeof this.routeId !== "undefined") {
                this.clearRoute(this.routeId)
              }
              this.traceRoute(element, index)
        })

        new this.window.Marker({element: arrivalMarkersDiv, anchor: 'center'})
            .setLngLat(arrivalsCoordinates)
            .addTo(this.map)
      });

     /* this.transformPickUpArrivalsIntoMap().forEach((child) => {
        let arrivalMarkersDiv = document.createElement('div')
        arrivalMarkersDiv.className = 'arrivalMarkers'
        new this.window.Marker({element: arrivalMarkersDiv, anchor: 'center'}).setLngLat(child).setPopup(new this.window.Popup({offset: 35}).setHTML('Hello World')).addTo(this.map)
      });*/
    }
  };

  mapPickUpDepartureData(): PickUpModel2[] {
    return this.pickUpList
        ? this.pickUpList
            // Filter Response without coordinates properties and empty coordinates to avoid tomtom map crash with lng/lat props!
            // eslint-disable-next-line no-prototype-builtins
            .filter((element) =>  element.hasOwnProperty('departureCoordinates') && element.hasOwnProperty('arrivalCoordinates'))
            .filter((element) => element["departureCoordinates"].length > 0 && element["arrivalCoordinates"].length > 0)
           /* .map((element: PickUpModel2) => {
                element.departureCoordinates = Object.assign([{ lng: element["departureCoordinates"][1], lat: element["departureCoordinates"][0] }])
                element.arrivalCoordinates = Object.assign([{ lng: element["arrivalCoordinates"][1], lat: element["arrivalCoordinates"][0] }])*/
              //console.log('map', element)
          //return element;
        //})
        : [] as PickUpModel2[];
  }

  async traceRoute(currentPickModel: PickUpModel2, index: any) {
    await this.selectedCurrentPickUpModel(currentPickModel)
    this.makeRoute(index)
  }

  buildStyle(id: string|undefined, data: any, color: string, width: number) {
    return {
      'id': id,
      'type': 'line',
      'source': {
        'type': 'geojson',
        'data': data
      },
      'paint': {
        'line-color': color,
        'line-width': width
      },
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      }
    }
  }

  makeRoute(index: any) {
    const routeBackgroundWeight = 5
    tts.services.calculateRoute({
      key: this.tomTomAPiKey,
      locations: this.selectedPickUp?.departureCoordinates.toString() + ':' + this.selectedPickUp?.arrivalCoordinates.toString(),
      travelMode: 'car',
    }).then(routeData => {
      const routeGeoJson = routeData.toGeoJson()
      this.routeId = 'route_background_' + index;
      this.map.addLayer(this.buildStyle(this.routeId, routeGeoJson, 'black', routeBackgroundWeight))
    })
  }

  clearRoute(route: any) {
    this.map.removeLayer(route)
    this.map.removeSource(route)
  }


  /*transformPickUpDepartureIntoMap(): Coordinates[] {
    return this.pickUpList
        ?.map((element) =>
          element.departureCoordinates && element.departureCoordinates.length > 0 ?
              Object.assign({
                lat: element["departureCoordinates"][1],
                lng: element["departureCoordinates"][0],
              }) : [] as Coordinates[])
        .filter(e => e.lat || e.lng === "undefined") as Coordinates[];
  }*/

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
  height: 100vh;
  width: 100vw;
  //height: 100%;
  //width: 100%;
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

.pop {
  //border: .150rem solid blueviolet;

  &__title {
      font-size: .800rem;
      margin-block-start: .333em;
      margin-block-end: .333em;
      border-bottom: .150rem solid blueviolet;
      font-weight: bold;
  }

  &__list {
      &__car {
        list-style: url('@/assets/car-hatchback.svg')
      }
  }

  &__end {
    display: flex;
    justify-content: center;
  }

  &__button {
    border: none;
    color: white;
    background-color: #008CBA;
    padding: .350rem 1rem;
    text-align: center;
    text-decoration: none;
    font-size: .850rem;
    margin: 4px 2px;
    cursor: pointer;
  }
}

</style>

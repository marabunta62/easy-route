<template>
  <div class="driver q-pa-md">
    <h5 class="q-pa-xs q-my-sm">Conducteur</h5>
    <q-separator class="q-ml-sm"></q-separator>
    <p class="q-pa-sm">Editer mes informations de trajets et gérer mes passagers</p>
    <div class="row wrap">
      <div class="col-md-6 col-xs-12 q-pa-sm">
      <div class="col-md-3 col-xs-12 q-pa-sm">
        <MapView :arrival-coordinates="driverPickUpData?.pickUp.arrivalCoordinates"
                 :departure-coordinates="driverPickUpData?.pickUp.departureCoordinates"
                 class="driver__map"/>
      </div>
      <div class="col-md-3 col-xs-12 q-pa-sm">
        <q-table style="width: 100%"
                 class="my-sticky-header-table"
                 title="Votre liste de passagers en cours"
                 no-data-label="Vous n'avez pas encore de passagers avec vous.. :'("
                 :dense="$q.screen.lt.md"
                 :rows="driverCurrentPassengers"
                 :columns="currentPassengers"
                 row-key="name"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  class="text-italic text-purple"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body-cell-profile="props">
            <q-td :props="props">
              <q-btn icon="account_box" color="purple" @click="goToProfile(props)"></q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-messenger="props">
            <q-td :props="props">
              <q-btn icon="chat" color="blue" @click="goToTchat(props)"></q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-cancel="props">
            <q-td :props="props">
              <q-btn icon="cancel" color="red" @click="dropPassenger(props)"></q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
        <confirm-pop-in
            :label-pop="` Etes-vous certain de vouloir retirer ${passengerName} de vos passagers ?`"
            :pop-in-state="popInStatePassenger"
            :loading-action="loading"
            @confirm="confirmDeletePassenger()"
            @exit="exitPopIn"
        ></confirm-pop-in>
        <confirm-pop-in
            :label-pop="` Etes-vous certain de vouloir rejeter ${passengerName} de vos demandes de passengers ?`"
            :pop-in-state="popInStateRejectPassenger"
            @confirm="confirmDeletePassenger()"
            @exit="exitPopIn"
        ></confirm-pop-in>
        <confirm-pop-in
            :label-pop="` Etes-vous certain de vouloir ajouter ${passengerName} à la liste de vos passagers ?`"
            :pop-in-state="popInStateAcceptPassenger"
            @confirm="confirmAcceptPassenger()"
            @exit="exitPopIn"
        ></confirm-pop-in>
      </div>
    <div class="col-md-6 col-xs-12 q-pa-sm">
      <q-card class="my-card">
        <q-card-section class="bg-purple text-white">
          <div class="text-h6">Editer mes informations Trajet</div>
        </q-card-section>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon color="red" name="merge" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Trajet</q-item-label>
              <q-card-actions align="between">
                <q-item-label flat caption>Lieu Départ: <strong> {{ driverPickUpData?.pickUp.departureCityName }} </strong></q-item-label>

                <SearchCityBar :input-label="'Editer Départ'"
                               :icon="'pin_drop'"
                               :dense="true"
                               :flate="true"
                               :square="true"
                               :outlined="true"
                               :bottom-slots="true"
                               :cityNameInput="driverCityDepartureCompletion"
                               @update-city="departureCityEE($event)"


                ></SearchCityBar>

              </q-card-actions>
              <q-card-actions align="between">
                <q-item-label caption>Lieu Arrivé: <strong> {{ driverPickUpData?.pickUp.arrivalCityName }} </strong></q-item-label>

                <SearchCityBar :input-label="'Editer Arrivé'"
                               :icon="'where_to_vote'"
                               :dense="true"
                               :flate="true"
                               :square="true"
                               :outlined="true"
                               :bottom-slots="true"
                               :cityNameInput="driverCityArrivalCompletion"
                               @update-city="arrivalCityEE($event)"

                ></SearchCityBar>

              </q-card-actions>
              <q-card-actions align="between">
                <q-item-label caption>Horaires lieu départ: <strong> {{ driverPickUpData?.pickUp.departureHour }} </strong></q-item-label>
                  <q-input flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="departureHour" label="Editer Horaire Départ" clearable>
                    <template v-slot:prepend>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-time v-model="departureHour" mask="HH:mm" format24h>
                            <div class="row items-center justify-start">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
              </q-card-actions>
              <q-card-actions align="between">
              <q-item-label caption>Horaires lieu arrivé: <strong> {{ driverPickUpData?.pickUp.arrivalHour }} </strong></q-item-label>
                <q-input flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="arrivalHour" label="Editer Horaire Arrivé" clearable>
                  <template v-slot:prepend>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="arrivalHour" mask="HH:mm" format24h>
                          <div class="row items-center justify-start">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </q-card-actions>
              <q-card-actions align="between">
                <div class="col-auto">
                  <q-item-label caption>Description: </q-item-label>
                  <q-input class="q-pt-lg q-pt-xs" standout disable readonly :dense="true" v-model="description" autogrow></q-input>
                </div>
                   <q-input flat square outlined bottom-slots label="Editer Description" autogrow :rules="[ val => val.length <= 200 || 'Max 200 caractères' ]" :maxlength="400" v-model="description" >
                    <template v-slot:prepend>
                      <q-icon name="article" />
                    </template>
                  </q-input>
              </q-card-actions>
              <q-card-actions align="between">
                <q-item-label caption>Congés/ Indisponibilités:  <strong> {{ isInHolidays }} </strong></q-item-label>
                <q-input flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="holidaysRange" label="Editer Congés" clearable>
                  <template v-slot:prepend>
                    <q-icon name="edit_calendar" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="holidayDates" range />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </q-card-actions>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="directions_car" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Voiture: </q-item-label>

              <q-card-actions align="between">
                <q-item-label caption>Marque: <strong> {{ driverPickUpData?.pickUp.pickUpCar.brand }} </strong></q-item-label>
                <q-input flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="brand"
                         label="Editer Marque" clearable>
                  <template v-slot:prepend>
                    <q-icon name="format_bold"/>
                  </template>
                </q-input>
              </q-card-actions>

              <q-card-actions align="between">
                <q-item-label caption>Modèle: <strong> {{ driverPickUpData?.pickUp.pickUpCar.model }} </strong></q-item-label>
                <q-input flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="model"
                         label="Editer Modèle" clearable>
                  <template v-slot:prepend>
                    <q-icon name="toys"/>
                  </template>
                </q-input>
              </q-card-actions>

              <q-card-actions align="between">
                <q-item-label caption>Couleur: <strong> {{ driverPickUpData?.pickUp.pickUpCar.color }} </strong></q-item-label>
                <q-input flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="color"
                         label="Editer Couleur" clearable>
                  <template v-slot:prepend>
                    <q-icon name="colorize"/>
                  </template>
                </q-input>
              </q-card-actions>

              <q-card-actions align="between">
                <q-item-label caption>Nombre de places: <strong> {{ driverPickUpData?.pickUp.pickUpCar.totalSlots }} </strong></q-item-label>
                <q-select flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="totalSlots"
                          :options="carSlots" :input-style="{ backgroundColor: 'black' }" label="Editer Places Total">
                  <template v-slot:prepend>
                    <q-icon name="done"/>
                  </template>
                </q-select>
              </q-card-actions>

              <q-card-actions align="between">
                <q-item-label caption>Places prises: <strong> {{ driverPickUpData?.pickUp.pickUpCar.takenSlots }} </strong></q-item-label>
                <q-select flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="takenSlots"
                          :options="carSlots"  label="Editer Places Prises">
                  <template v-slot:prepend>
                    <q-icon name="block"/>
                  </template>
                </q-select>
              </q-card-actions>

              <q-card-actions align="between">
                <q-item-label caption>Places disponibles: <strong> {{ driverPickUpData?.pickUp.pickUpCar.availableSlots }} </strong></q-item-label>
                <q-select flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="availableSlots"
                          :options="carSlots" label="Editer Place Disponibles" clearable>
                  <template v-slot:prepend>
                    <q-icon name="priority_high"/>
                  </template>
                </q-select>
              </q-card-actions>

            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="amber" name="groups" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Prendre des Passagers: <strong> {{ passengersWanted }}</strong></q-item-label>
            </q-item-section>
            <q-card-actions align="between">
              <q-btn-toggle
                  v-model="wantPassengers"
                  class="my-custom-toggle"
                  :readonly="false"
                  :clearable="false"
                  no-caps
                  aria-label="Prendre des passagers"
                  rounded
                  unelevated
                  toggle-color="primary"
                  color="white"
                  text-color="primary"
                  :options="[
                      {label: 'Oui', value: true },
                      {label: 'Non', value: false }
              ]"
              />
            </q-card-actions>
          </q-item>

              <div class="q-pa-md q-gutter-sm row reverse">
                <q-btn color="primary" label="Mettre à jour mes infos trajet" @click="openConfirmPopIn"/>
              </div>
              <confirm-pop-in
                :label-pop="' Mettre à jour vos informations de trajet ?'"
                :pop-in-state="popInStateConfirmUpdateInfos"
                @confirm="confirmUpdateDriverInfos"
                @exit="exitPopIn"
              ></confirm-pop-in>

        </q-list>
      </q-card>
    </div>
      <div class="row q-pa-sm col-12 q-pa-sm">
        <q-table style="width: 100%"
                 title="Liste de demandes de passagers"
                 :rows="driverRequestCurrentPassengers"
                 :columns="passengerRequestColmuns"
                 row-key="name"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  class="text-italic text-purple"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body-cell-profile="props">
            <q-td :props="props">
              <q-btn icon="account_box" color="purple" @click="goToProfile(props)"></q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-messenger="props">
            <q-td :props="props">
              <q-btn icon="chat" color="blue" @click="goToTchat(props)"></q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-accept="props">
            <q-td :props="props">
              <q-btn icon="check_circle" color="green" @click="acceptPassenger(props)"></q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-cancel="props">
            <q-td :props="props">
              <q-btn icon="cancel" color="red" @click="rejectPassenger(props)"></q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
  </div>

  </div>
</template>
<script lang="ts">

import { Options, Vue } from "vue-class-component";
import { namespace } from "s-vuex-class";
import MapView from "@/components/MapView.vue";
import ConfirmPopIn from "@/components/ConfirmPopIn.vue";
import SearchCityBar from "@/components/SearchCityBar.vue";
import { UserModel } from "@/models/User";
import { Driver, HolidaysDates } from "@/models/Driver";
import { Coordinates, holidayDates, PickUpModel } from "@/models/PickUp";
import moment from "moment";
import { CityCompletion } from "@/models/City";
import { convertProxyInJson } from "@/store";
import { Model } from "vue-property-decorator";
import { Passenger, PassengerList, UpdateAcceptPassenger, UpdatePassenger } from "@/models/Passenger";

const userMd = namespace("UserMd");
const driverMd = namespace("DriverMd");
//Probleme POP 2 cases s'ouvre scinder le use case
const popInMd = namespace("PopInMd");
const passengerMd = namespace("PassengerMd");

@Options({
  name: 'UserDriver',
  components: {
    MapView,
    SearchCityBar,
    ConfirmPopIn
  }
})
export default class UserDriver extends Vue {

  @userMd.Getter
  private userAuthData!: UserModel;

  @driverMd.Getter
  private driverCityArrivalCompletion!: CityCompletion;

  @driverMd.Getter
  private driverCityDepartureCompletion!: CityCompletion;

  @driverMd.Getter
  private driverPickUpData!: Driver;

  @driverMd.Getter
  private driverCurrentPassengers!: PassengerList[];

  @driverMd.Getter
  private driverRequestCurrentPassengers!: PassengerList[];

  @passengerMd.Getter
  private passengerIds!: number;

  @driverMd.Action
  private fetchDriverPickUpData!: (userId: number) => Promise<void>;

  @driverMd.Action
  private postDriverInfosData!: (driverPickInfos: any ) => Promise<void>;

  @passengerMd.Action
  private patchPassengerDriver!: (passengerUpdte: UpdatePassenger) => Promise<void>;

  @passengerMd.Action
  private passengerIdUpdate!: (passengerId: number) => Promise<void>;

  /*
  *  Come from SearchCityInput Event for update Driver PickUp
  */
  private departuresCoordinatesEE!: Coordinates[];
  private arrivalCoordinatesEE!:  Coordinates[];

  private citiesCompletion: CityCompletion | null = null;

  private departureCityName = '';
  private arrivalCityName = '';
  private departureHour = '';
  private arrivalHour = '';
  private description = '';
  private holidayDates: HolidaysDates | string = '';

  private brand = '';
  private model = '';
  private color = '';
  private totalSlots = 0;
  private takenSlots = 0;
  private availableSlots = 1;
  private carSlots = [0, 1, 2, 3, 4, 5, 6];

  private wantPassengers = true;
 /* private departuresCoordinates!: Coordinates[];
  private arrivalCoordinates!:  Coordinates[];*/

  private tableData!: Passenger[];
  private passengerName = '';
  private userId = '';
  private passengerId = '';

  private loading = false;
  private popInStateConfirmUpdateInfos = false;
  private popInStatePassenger = false;
  private popInStateAcceptPassenger = false;
  private popInStateRejectPassenger = false;

  created() {
    this.driverInfosAndPickUpData();

    setTimeout(() => {
      /*
      * Manage initial Travel properties values
      */
      //this.driverPickUpData.pickUp.departureCityName ? this.departureCityName = this.driverPickUpData.pickUp.departureCityName : '';
      //this.driverPickUpData.pickUp.arrivalCityName ? this.arrivalCityName = this.driverPickUpData.pickUp.arrivalCityName : '';
      this.driverPickUpData.pickUp.departureHour ? this.departureHour = this.driverPickUpData.pickUp.departureHour : '';
      this.driverPickUpData.pickUp.arrivalHour ? this.arrivalHour = this.driverPickUpData.pickUp.arrivalHour : '';
      this.driverPickUpData.pickUp.description ? this.description = this.driverPickUpData.pickUp.description : '';
      this.driverPickUpData.pickUp.holidaysDateRange ? this.holidaysRange = this.driverPickUpData.pickUp.holidaysDateRange : '';

      /*
      * Manage initial Car properties values
      */
      this.driverPickUpData.pickUp.pickUpCar.brand ? this.brand = this.driverPickUpData.pickUp.pickUpCar.brand : '';
      this.driverPickUpData.pickUp.pickUpCar.model ? this.model = this.driverPickUpData.pickUp.pickUpCar.model : '';
      this.driverPickUpData.pickUp.pickUpCar.color ? this.color = this.driverPickUpData.pickUp.pickUpCar.color : '';
      this.driverPickUpData.pickUp.pickUpCar.totalSlots ? this.totalSlots = this.driverPickUpData.pickUp.pickUpCar.totalSlots : 0;
      this.driverPickUpData.pickUp.pickUpCar.takenSlots ? this.takenSlots = this.driverPickUpData.pickUp.pickUpCar.takenSlots : 0;
      this.driverPickUpData.pickUp.pickUpCar.availableSlots ? this.availableSlots = this.driverPickUpData.pickUp.pickUpCar.availableSlots : 1;
    }, 1200)
  }

  get isInHolidays() {
    return this.driverPickUpData?.pickUp.isInHoliday === true ? 'Oui' : 'Non';
  }

  get holidaysRange(): HolidaysDates | string {
    if (!this.holidayDates) {
      return '';
    } else if (typeof this.holidayDates === 'string') {
      return moment(this.holidayDates).format('DD/MM/YYYY');
    } else if (typeof this.holidayDates === 'object') {
      const from = moment(this.holidayDates.from).format('DD/MM/YYYY');
      const to = moment(this.holidayDates.to).format('DD/MM/YYYY');
      return  `${from} - ${to}`;
    } else return '';
  }

  set holidaysRange(value) {
    this.holidayDates = value;
  }

  get passengersWanted() {
    return this.driverPickUpData.pickUp.wantPassengers ? 'Oui' : 'Non';
  }

  async driverInfosAndPickUpData(): Promise<void> {
    try {
      await this.fetchDriverPickUpData(this.userAuthData.userId);
      if(this.driverPickUpData.passengers) {
        this.tableData = this.driverPickUpData?.passengers;
      };
      console.log('usefull', this.driverPickUpData);
    } catch (err) {
      this.$log.error(err);
    }
  }

  openConfirmPopIn() {
    this.popInStateConfirmUpdateInfos = true;
  }

  exitPopIn() {
    this.popInStateConfirmUpdateInfos = false;
    this.popInStatePassenger = false;
    this.popInStateAcceptPassenger = false;
    this.popInStateRejectPassenger = false;
  }

  async departureCityEE(value: CityCompletion) {
    const valueConvert = convertProxyInJson(value);
    console.log('value', value)
    this.departureCityName = await valueConvert.city;
    this.departuresCoordinatesEE = await valueConvert.coordinates;
  }

  async arrivalCityEE(value: CityCompletion) {
    const valueConvert = convertProxyInJson(value)
    this.arrivalCityName = valueConvert.city;
    this.arrivalCoordinatesEE = valueConvert.coordinates;
  }

  async confirmUpdateDriverInfos(): Promise<void> {
    this.loading = true;
    const carUpdate = {
      id: this.driverPickUpData.pickUp.pickUpCar.id,
      brand: this.brand,
      model: this.model,
      color: this.color,
      totalSlots: this.totalSlots,
      takenSlots: this.takenSlots,
      availableSlots: this.availableSlots,

  }
    const pickUpUpdate = {
      id: this.driverPickUpData.pickUp.id,
      departureCityName: this.departureCityName,
      arrivalCityName: this.arrivalCityName,
      departureHour: this.departureHour,
      arrivalHour: this.arrivalHour,
      description: this.description,
      holidaysDateRange: this.holidayDates,
      wantPassengers: this.wantPassengers,
      departureCoordinates: this.departuresCoordinatesEE,
      arrivalCoordinates: this.arrivalCoordinatesEE,
      pickUpCar: carUpdate,
    }
    const updateDriver = {
      id: this.driverPickUpData.id,
      pickUp: pickUpUpdate,
      passengersRequestForPickUp: [],
      passengers: this.driverCurrentPassengers,
    }
    try {
      await this.postDriverInfosData(updateDriver);
      await this.fetchDriverPickUpData(this.userAuthData.userId);
    } catch (err) {
      this.$log.error(err);
    } finally {
      this.loading = false;
      this.popInStateConfirmUpdateInfos = false;
    }
  }

  /*
  *  Look up for 1st instance of map component because didn't find map id and crash driver page 1st instance
  */

  async dropPassenger($props: any) {
    this.popInStatePassenger = true;
    this.passengerName = $props.row.name;
    this.passengerId = $props.row.passengerId;
  }

  async rejectPassenger($props: any) {
    this.popInStateRejectPassenger = true;
    this.passengerName = $props.row.name;
    this.passengerId = $props.row.passengerId;
  }

  async acceptPassenger($props: any) {
    this.popInStateAcceptPassenger = true;
    this.passengerName = $props.row.name;
    this.passengerId = $props.row.passengerId;
  }

  async confirmDeletePassenger(): Promise<void> {
    const passengerIsRejected = {
      id: this.passengerId,
      isRejected: true,
      pickUp: null,
      requestPickUp: null,
    } as UpdatePassenger;
    try {
      await this.patchPassengerDriver(passengerIsRejected);
      await this.fetchDriverPickUpData(this.userAuthData.userId);
    } catch (err) {
      this.$log.error(err);
    } finally {
      this.popInStatePassenger = false;
      this.popInStateRejectPassenger = false;
    }
  }

  async confirmAcceptPassenger(): Promise<void> {
    const passengerIsAccepted = {
      id: this.passengerId,
      isRejected: false,
      pickUp: this.driverPickUpData.pickUp.id,
      requestPickUp: null
    } as unknown as UpdatePassenger;
    try {
      console.log('passenger accept', passengerIsAccepted)
      await this.patchPassengerDriver(passengerIsAccepted);
      await this.fetchDriverPickUpData(this.userAuthData.userId);
    } catch (err) {
      this.$log.error(err);
    } finally {
      this.popInStateAcceptPassenger = false;
    }
  };

  async goToTchat($props: any) {
    this.userId = $props.row.userId;
    await this.$router.push({ name: 'messengerView', params: { id: this.userId } });
  };

  async goToProfile($props: any) {
    this.userId = $props.row.userId;
    await this.$router.push({ name: 'publicUserProfile', params: { id: this.userId } });
  };

  private currentPassengers = [
    { name: 'name', label: 'Nom', field: 'name', sortable: true , align: 'center'},
    { name: 'profile', label: 'Profil', field: 'id', sortable: true, align: 'center' },
    { name: 'messenger', label: 'Messagerie', field: 'id', sortable: true, align: 'center' },
    { name: 'cancel', label: 'Rejeter passager', field: 'id', sortable: true, align: 'center' },
  ];

  private passengerRequestColmuns = [
    { name: 'name', label: 'Nom', field: 'name', sortable: true , align: 'center'},
    { name: 'date', label: 'Date demande', field: 'date', sortable: true , align: 'center'},
    { name: 'profile', label: 'Profil', field: 'profile', sortable: true, align: 'center' },
    { name: 'messenger', label: 'Messagerie', field: 'messenger', sortable: true, align: 'center' },
    { name: 'accept', label: 'Accepter passager', field: 'accept', sortable: true, align: 'center' },
    { name: 'cancel', label: 'Rejeter passager', field: 'reject', sortable: true, align: 'center' },
  ];
}
</script>
<style lang="scss">

.driver {

  &__map {
    height: 835px;
    min-height: unset !important;
    overflow: hidden;
  }
}

.q-field__control {
  width: 235px;
}
.my-sticky-header-table {
  /* height or max-height is important */
  //height: 310px;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: #c1f4cd
  }
}



</style>

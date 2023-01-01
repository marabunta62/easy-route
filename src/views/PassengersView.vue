<template>
  <div class="driver q-pa-md">
    <h5 class="q-pa-xs q-my-sm">Passager</h5>
    <q-separator class="q-ml-sm"></q-separator>
    <p class="q-pa-sm">Gérer mes demandes en tant que passagers sur des trajets</p>
    <div class="row wrap">
      <div class="row q-pa-sm col-12">
        <q-banner class="bg-primary text-white" style="width: 100%">
          <p>Votre conducteur en cours est : <strong> {{ currDriverName }} </strong> pour trajet : <strong>{{ currentRoute }}</strong> </p>
          <template v-slot:action>
            <q-btn flat icon="account_box" color="white" label="Voir Profil" @click="currDriverProfile" />
            <q-btn flat icon="chat" color="white" label="Messagerie" @click="currDriverMessenger" />
            <q-btn flat icon="cancel" color="white" label="Cesser co-voiturage" @click="currDriverStop" />
          </template>
        </q-banner>
        <q-table style="width: 100%"
                 title="Conducteurs demandés pour être passager"
                 no-data-label="Vous n'avez pas encore demander de conducteur :'("
                 :rows="requestedPickUp"
                 :columns="columnsHeaders"
        >
<!--
Pour driver Name
POur PLaces Dispo depuis carsReq
Manquera côté BDD conducteur rejeter la demande
Remplacer les true false par des ptits logos sympas

<template v-slot:body="props">
            <q-tr :props="props">
              <q-td
                  :props="props"
                  class="text-italic text-purple"
              >
                {{ props.row.departureCityName }}
              </q-td>
            </q-tr>
          </template>-->
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
              <q-btn icon="account_box" color="purple" @click="onEdit(props.row)"></q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-messenger="props">
            <q-td :props="props">
              <q-btn icon="chat" color="blue" @click="onEdit(props.row)"></q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-cancel="props">
            <q-td :props="props">
              <q-btn icon="cancel" color="red" @click="onEdit(props.row)"></q-btn>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
    <confirm-pop-in
        :label-pop="` Etes-vous certain de vouloir cesser de co-voiturer avec ${currDriverName} comme conducteur ?`"
        :pop-in-state="popInStateCurrDriverStop"
        @confirm="confirmPassengerStopDriver"
        @exit="exitPopIn"
    ></confirm-pop-in>
  </div>
</template>
<script lang="ts">

import { Options, Vue } from "vue-class-component";
import MapView from "@/components/MapView.vue";
import { namespace } from "s-vuex-class";
import { Passenger, passengerIsUser } from "@/models/Passenger";
import { UserModel } from "@/models/User";
import ConfirmPopIn from "@/components/ConfirmPopIn.vue";
import { PickUpModel } from "@/models/PickUp";

const passengerMd = namespace("PassengerMd");
const userMd = namespace("UserMd");

@Options({
  name: 'UserPassengers',
  components: {
    MapView,
    ConfirmPopIn
  }
})
export default class UserPassengers extends Vue {

  @userMd.Getter
  private userAuthData!: UserModel;

  @passengerMd.Getter
  private passengerInfos!: passengerIsUser;

  @passengerMd.Action
  private fetchPassengerPickUpData!: (userId: number) => Promise<void>;

  private popInStateCurrDriverMsg = true;
  private popInStateCurrDriverProfile = true;
  private popInStateCurrDriverStop = false;
  private currDriverName = '';
  private currDriverId = '';
  private requestedPickUp: PickUpModel[] = [];

  private tableData!: Passenger[];

  get currentRoute(): string {
    const departureCityName = this.passengerInfos.currPickUp?.departureCityName;
    const arrivalCityName = this.passengerInfos.currPickUp?.arrivalCityName;
    if (!departureCityName || !arrivalCityName) {
      return '';
    }
    return `${departureCityName} - ${arrivalCityName}`
  }

  created() {
    this.passengerInfosAndPickUpData();
    this.passengerInfos?.currPickUp?.driverCurr?.name ? this.currDriverName = this.passengerInfos?.currPickUp?.driverCurr?.name : ''
    this.passengerInfos?.currPickUp?.driverCurr?.userId  ? this.currDriverId = this.passengerInfos?.currPickUp?.driverCurr?.userId : '';
    this.passengerInfos?.reqPickUp ? this.requestedPickUp = this.passengerInfos?.reqPickUp : [];
  }

  async passengerInfosAndPickUpData(): Promise<void> {
    try {
      await this.fetchPassengerPickUpData(this.userAuthData.userId);
      //console.log('usefull', this.passengerInfos);
    } catch (err) {
      this.$log.error(err);
    }
  };

  async currDriverProfile() {
    await this.$router.push({ name: 'publicUserProfile', params: { id: this.currDriverId } });
  };

  async currDriverMessenger() {
    await this.$router.push({ name: 'messengerView', params: { id: this.currDriverId } });
  };

  currDriverStop() {
    this.popInStateCurrDriverStop = true;
  };

  exitPopIn() {
    this.popInStateCurrDriverStop = false;
  };

  async confirmPassengerStopDriver() {
    try {
      console.log('passenger name :: ', this.currDriverName)
      //to create
      //await this.patchPassengeStopDriver(this.userAuthData.userId);
      //await this.fetchPassengerPickUpData(this.userAuthData.userId);
    } catch (err) {
      this.$log.error(err);
    } finally {
      this.popInStateCurrDriverStop = false;
    }
  };

  /**
   * @private field is the mapper with received Array
   */
  private columnsHeaders = [
      { name: 'name', label: 'Nom', field: 'driverReq', sortable: true , align: 'center'},
      { name: 'departureCityName', label: 'Départ', field: 'departureCityName', sortable: true, align: 'center' },
      { name: 'destination', label: 'Arrivé', field: 'arrivalCityName', sortable: true, align: 'center' },
      { name: 'slotsAvailable', label: 'Places disponibles', field: 'slotsAvailable', sortable: true, align: 'center' },
      { name: 'isInHolidays', label: 'Conducteur en congés', field: 'isInHoliday', sortable: true, align: 'center' },
      { name: 'wantPassengers', label: 'Conducteur prends des passagers', field: 'wantPassengers', sortable: true, align: 'center' },
      { name: 'rejectRequest', label: 'Conducteur a rejeter la demande', field: 'rejectRequest', sortable: true, align: 'center' },
      { name: 'profile', label: 'Profil', field: 'fat', sortable: true, align: 'center' },
      { name: 'messenger', label: 'Messagerie', field: 'fat', sortable: true, align: 'center' },
      { name: 'cancel', label: 'Annuler Demande', field: 'fat', sortable: true, align: 'center' },
    ]

   /* private tableData = [
      {
        name: 'josiane',
        departure: 'Arras à 7h35',
        destination: 'Lens à 8h',
        slotsAvailable: '2',
        isInHolidays: 'oui',
        wantPassengers: 'non',
        rejectRequest: 'non',
      },
      {
        name: 'juliette',
        departure: 'Lens à 6h30',
        destination: 'Lille à 7h30',
        slotsAvailable: '1',
        isInHolidays: 'non',
        wantPassengers: 'oui',
        rejectRequest: 'non',
      },
      {
        name: 'sé pa konduir',
        departure: 'Lille à 8h',
        destination: 'Vendin-le-Vieil à 8h20',
        slotsAvailable: '4',
        isInHolidays: 'oui',
        wantPassengers: 'non',
        rejectRequest: 'non',
      },
    ]*/


}
</script>
<style lang="scss" scoped>
</style>

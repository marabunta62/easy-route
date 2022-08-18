<template>
  <div class="driver q-pa-md">
    <h5 class="q-pa-xs q-my-sm">Conducteur</h5>
    <q-separator class="q-ml-sm"></q-separator>
    <p class="q-pa-sm">Editer mes informations de trajets et gérer mes passagers</p>
    <div class="row wrap">
    <div class="col-md-6 col-xs-12 q-pa-sm">
      <MapView class="driver__map"/>
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
                <q-item-label flat caption>Lieu Départ: <strong> {{ driverPickUpData.pickUp.departureCityName }} </strong></q-item-label>
                <q-input flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="text" label="Editer Départ" clearable>
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </q-card-actions>
              <q-card-actions align="between">
                <q-item-label caption>Lieu Arrivé: <strong> {{ driverPickUpData.pickUp.arrivalCityName }} </strong></q-item-label>
                  <q-input flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="text" label="Editer Arrivé" clearable>
                    <template v-slot:prepend>
                      <q-icon name="where_to_vote" />
                    </template>
                  </q-input>
              </q-card-actions>
              <q-card-actions align="between">
                <q-item-label caption>Horaires lieu départ: <strong> {{ driverPickUpData.pickUp.departureHour }} </strong></q-item-label>
                  <q-input flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="text" label="Editer Horaire Départ" clearable>
                    <template v-slot:prepend>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-time v-model="date" mask="HH:mm" format24h>
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
              <q-item-label caption>Horaires lieu arrivé: <strong> {{ driverPickUpData.pickUp.arrivalHour }} </strong></q-item-label>
                <q-input flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="date" label="Editer Horaire Arrivé" clearable>
                  <template v-slot:prepend>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="date" mask="HH:mm" format24h>
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
                  <q-input class="q-pt-lg q-pt-xs" standout disable readonly :dense="true" v-model="driverPickUpData.pickUp.description" autogrow></q-input>
                </div>
                   <q-input flat square outlined bottom-slots label="Editer Description" clearable autogrow :rules="[val => val.length <= 400 || 'Max 400 caractères']" :maxlength="400" v-model="text" >
                    <template v-slot:prepend>
                      <q-icon name="article" />
                    </template>
                  </q-input>
              </q-card-actions>
              <q-card-actions align="between">
                <q-item-label caption>Congés/ Indisponibilités:  <strong> {{ isInHolidays }} </strong></q-item-label>
                <q-input flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="holidayDates" label="Editer Congés" clearable>
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
                <q-item-label caption>Modèle: <strong> {{ driverPickUpData.pickUp.pickUpCar.model }} </strong></q-item-label>
                <q-input flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="text"
                         label="Editer Modèle" clearable>
                  <template v-slot:prepend>
                    <q-icon name="toys"/>
                  </template>
                </q-input>
              </q-card-actions>

              <q-card-actions align="between">
                <q-item-label caption>Couleur: <strong> {{ driverPickUpData.pickUp.pickUpCar.color }} </strong></q-item-label>
                <q-input flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="text"
                         label="Editer Couleur" clearable>
                  <template v-slot:prepend>
                    <q-icon name="colorize"/>
                  </template>
                </q-input>
              </q-card-actions>

              <q-card-actions align="between">
                <q-item-label caption>Nombre de places: <strong> {{ driverPickUpData.pickUp.pickUpCar.totalSlots }} </strong></q-item-label>
                <q-select flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="text"
                          :options="carSlots" :input-style="{ backgroundColor: 'black' }" label="Editer Places Total">
                  <template v-slot:prepend>
                    <q-icon name="done"/>
                  </template>
                </q-select>
              </q-card-actions>

              <q-card-actions align="between">
                <q-item-label caption>Places prises: <strong> {{ driverPickUpData.pickUp.pickUpCar.takenSlots }} </strong></q-item-label>
                <q-select flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="text"
                          :options="carSlots"  label="Editer Places Prises">
                  <template v-slot:prepend>
                    <q-icon name="block"/>
                  </template>
                </q-select>
              </q-card-actions>

              <q-card-actions align="between">
                <q-item-label caption>Places disponibles: <strong> {{ driverPickUpData.pickUp.pickUpCar.availableSlots }} </strong></q-item-label>
                <q-select flat square outlined :dense="true" :hide-bottom-space="true" bottom-slots v-model="text"
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
              <q-item-label>Passagers: </q-item-label>
            </q-item-section>
            <q-card-actions align="between">
              <q-toggle
                  v-model="wantPassengers"
                  label="Prendre des passagers"
                  left-label
              />
            </q-card-actions>
          </q-item>

              <div class="q-pa-md q-gutter-sm row reverse">
                <q-btn color="primary" label="Mettre à jour mes infos trajet" />
              </div>


        </q-list>
      </q-card>
    </div>
    <div class="row q-pa-sm col-12 q-pa-sm">
      <q-table style="width: 100%"
               title="Votre liste de passagers en cours"
               :rows="tableData"
               :columns="columns"
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
      <div class="row q-pa-sm col-12 q-pa-sm">
        <q-table style="width: 100%"
                 title="Liste de demandes de passagers"
                 :rows="passengerRequestTableData"
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

  </div>
</template>
<script lang="ts">

import { Options, Vue } from "vue-class-component";
import MapView from "@/components/MapView.vue";
import { namespace } from "s-vuex-class";
import { UserModel } from "@/models/User";
import { Driver } from "@/models/Driver";
import { Watch } from "vue-property-decorator";

const userMd = namespace("UserMd");
const driverMd = namespace("DriverMd");

@Options({
  name: 'UserDriver',
  components: {
    MapView
  }
})
export default class UserDriver extends Vue {

  @userMd.Getter
  private userAuthData!: UserModel;

  @driverMd.Getter
  private driverPickUpData!: Driver | null;

  @driverMd.Action
  private fetchDriverPickUpData!: (userId: number) => Promise<void>;

  private wanntPassengers!: boolean | undefined;

  mounted() {
    this.driverInfosAndPickUpData();
    console.log('in comp', this.driverPickUpData)
  }

  get isInHolidays() {
    return this.driverPickUpData?.pickUp.isInHoliday === true ? 'Oui' : 'Non';
  }

  get wantPassengers() {
    return this.driverPickUpData?.pickUp.wantPassengers === true;
  }

/*
  set wantPassengers(value: boolean|undefined) {
    console.log("passengers" , this.wantPassengers)

    console.log("passengers" , this.wanntPassengers)

    this.wanntPassengers = value;
  }
*/

  async driverInfosAndPickUpData(): Promise<void> {
    try {
      await this.fetchDriverPickUpData(this.userAuthData.userId)
    } catch (err) {
      this.$log.error(err);
    }
  }

  /*driverPassengersWanted() {
    this.wantPassengers === !this.wantPassengers;
  }*/

 /* @Watch("wantPassengers", { immediate: true }) onItemChanged() {
    this.$nextTick(() => {
      this.wantPassengers === !this.wantPassengers;
    });
  }*/
  private columns = [
    { name: 'name', label: 'Nom', field: 'name', sortable: true , align: 'center'},
    { name: 'profile', label: 'Profil', field: 'fat', sortable: true, align: 'center' },
    { name: 'messenger', label: 'Messagerie', field: 'fat', sortable: true, align: 'center' },
    { name: 'cancel', label: 'Rejeter passager', field: 'fat', sortable: true, align: 'center' },
  ]

  private tableData = [
    {
      name: 'josiane',
      departure: 'Arras à 7h35',
      destination: 'Lens à 8h',
      slotsAvailable: '2'
    },
    {
      name: 'juliette',
      departure: 'Lens à 6h30',
      destination: 'Lille à 7h30',
      slotsAvailable: '1'
    },
    {
      name: 'sé pa konduir',
      departure: 'Lille à 8h',
      destination: 'Vendin-le-Vieil à 8h20',
      slotsAvailable: '4'
    },
  ]

  private passengerRequestColmuns = [
    { name: 'name', label: 'Nom', field: 'name', sortable: true , align: 'center'},
    { name: 'date', label: 'Date demande', field: 'date', sortable: true , align: 'center'},
    { name: 'profile', label: 'Profil', field: 'fat', sortable: true, align: 'center' },
    { name: 'messenger', label: 'Messagerie', field: 'fat', sortable: true, align: 'center' },
    { name: 'cancel', label: 'Rejeter passager', field: 'fat', sortable: true, align: 'center' },
  ]

  private passengerRequestTableData = [
    {
      name: 'josiane',
      date: '15/08/2022',
      departure: 'Arras à 7h35',
      destination: 'Lens à 8h',
      slotsAvailable: '2'
    },
    {
      name: 'juliette',
      date: '07/08/2022',
      departure: 'Lens à 6h30',
      destination: 'Lille à 7h30',
      slotsAvailable: '1'
    },
    {
      name: 'sé pa konduir',
      date: '06/07/2022',
      departure: 'Lille à 8h',
      destination: 'Vendin-le-Vieil à 8h20',
      slotsAvailable: '4'
    },
  ]

  private date = '';
  private holidayDates = '';

  private carSlots = [1, 2, 3, 4, 5, 6];

  private model = null;
  //1 appel ou 2
    //1 -> UserInfos avec trajets -> si coordinates => pass props to mapView sinon
    //2 -> une fois recu userInfos trajet => appel cityCoordinates
}
</script>
<style lang="scss">

.driver {

  &__map {
    height: 861.5px;
    min-height: unset !important;
    overflow: hidden;
  }
}

.q-field__control {
  width: 235px;
}

</style>

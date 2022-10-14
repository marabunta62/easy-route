<template>
  <div class="driver q-pa-md">
    <h5 class="q-pa-xs q-my-sm">Passager</h5>
    <q-separator class="q-ml-sm"></q-separator>
    <p class="q-pa-sm">Gérer mes demandes en tant que passagers sur des trajets</p>
    <div class="row wrap">
      <div class="row q-pa-sm col-12">
        <q-banner class="bg-primary text-white" style="width: 100%">
          <p>Votre conducteur en cours est :  TOTO pour trajet : X-Y</p>
          <template v-slot:action>
            <q-btn flat icon="account_box" color="white" label="Voir Profil" />
            <q-btn flat icon="chat" color="white" label="Messagerie" />
            <q-btn flat icon="cancel" color="white" label="Cesser co-voiturage" />
          </template>
        </q-banner>
        <q-table style="width: 100%"
                 title="Conducteurs"
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
    </div>

  </div>
</template>
<script lang="ts">

import { Options, Vue } from "vue-class-component";
import MapView from "@/components/MapView.vue";

@Options({
  name: 'UserPassengers',
  components: {
    MapView
  }
})
export default class UserPassengers extends Vue {

    private columns = [
      { name: 'name', label: 'Nom', field: 'name', sortable: true , align: 'center'},
      { name: 'departure', label: 'Départ', field: 'departure', sortable: true, align: 'center' },
      { name: 'destination', label: 'Arrivé', field: 'destination', sortable: true, align: 'center' },
      { name: 'slotsAvailable', label: 'Places disponibles', field: 'slotsAvailable', sortable: true, align: 'center' },
      { name: 'isInHolidays', label: 'Conducteur en congés', field: 'isInHolidays', sortable: true, align: 'center' },
      { name: 'wantPassengers', label: 'Conducteur prends des passagers', field: 'wantPassengers', sortable: true, align: 'center' },
      { name: 'rejectRequest', label: 'Conducteur a rejeter la demande', field: 'rejectRequest', sortable: true, align: 'center' },
      { name: 'profile', label: 'Profil', field: 'fat', sortable: true, align: 'center' },
      { name: 'messenger', label: 'Messagerie', field: 'fat', sortable: true, align: 'center' },
      { name: 'cancel', label: 'Annuler Demande', field: 'fat', sortable: true, align: 'center' },
    ]

    private tableData = [
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
    ]


}
</script>
<style lang="scss" scoped>
</style>

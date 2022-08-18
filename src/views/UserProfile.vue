<template>
  <div class="profile q-pa-md column wrap justify-center">
    <h5 class="q-pa-sm q-my-sm">Profil de {{ name }}</h5>
    <q-separator class="q-ml-sm"></q-separator>
    <p class="q-pa-sm">Editer vos informations personnelles</p>
    <div class="row">

    <div class="col-md-6 col-xs-12 q-pa-sm">
      <q-card class="my-card q-pt-sm">
        <q-card-section class="bg-purple text-white">
          <div class="text-h6">Informations Compte</div>
        </q-card-section>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon color="black" name="account_box" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Nom Prénom: </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon color="black" name="email" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Email: </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>

    <div class="col-md-6 col-xs-12 q-pa-sm">
        <div class="q-pt-sm"  style="max-width: 100%">
          <q-input color="teal" outlined label="Nom Prénom" stack-label v-model="name">
          </q-input>
        </div>
        <div class="q-pt-sm"  style="max-width: 100%">
          <q-input color="teal" outlined label="Nouveau Email" stack-label v-model="name">
          </q-input>
        </div>
      <div class="q-pt-sm"  style="max-width: 100%">
        <q-input color="teal" outlined label="Confirmez Nouveau Email" stack-label v-model="name">
        </q-input>
      </div>
        <div class="q-pt-sm" style="max-width: 100%">
          <q-input color="teal" outlined label="Nouveau Mot de Passe" stack-label v-model="name">
          </q-input>
        </div>
        <div class="q-pt-sm" style="max-width: 100%">
          <q-input color="teal" outlined label="Confirmez Nouveau Mot de Passe" stack-label v-model="name">
          </q-input>
        </div>
        <q-toggle class="q-pa-sm q-py-md"
                  v-model="emailMe"
                  color="pink"
                  icon="mail"
                  label="Recevoir des emails de l'activité du compte"
        />
        <div class="q-pa-md q-gutter-sm">
          <q-btn color="primary" label="Enregistrer" />
        </div>
        <div class="q-pa-md q-gutter-sm">
          <q-btn color="red" label="Supprimer le compte" />
        </div>
      </div>
      </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  name: 'UserProfile',
})
export default class UserProfile extends Vue {

  private name = 'toto';
  private email!: string;
  private emailMe = true;
}
</script>
<style lang="scss">

</style>

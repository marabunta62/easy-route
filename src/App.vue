<template>
  <q-layout view="lHh Lpr lFf">

    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>
        <q-btn-dropdown v-if="isUserAuthenticated" class="header__connexion" icon="account_circle" :label="`Bienvenu ${userAuthData.email}`">
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="account_box" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Mon profil</q-item-label>
                  <q-item-label caption>Gérer mes informations personelles</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="directions_car" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Conducteur</q-item-label>
                  <q-item-label caption>Gérer mon trajet et intéragir avec mes passagers</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="sync_alt" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Passager</q-item-label>
                  <q-item-label caption>Gérer mes demandes de trajets et intéragir avec les conducteurs</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section @click="disConnexion()">
                  <q-item-label>Deconnexion</q-item-label>
                </q-item-section>
              </q-item>
            </q-item-section>
          </q-item>
        </q-btn-dropdown>
        <q-btn v-else class="header__connexion" @click="connexion()">Connexion</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered class="bg-grey-2">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://github.com/quasarframework/"
        >
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Mon profil</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://chat.quasar.dev"
        >
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Mon Profil</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://forum.quasar.dev"
        >
          <q-item-section avatar>
            <q-icon name="forum" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Conducteur (trajet, demandes de pass, infos slts)</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://twitter.com/quasarframework"
        >
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Passager (demandes aux conduc(profils, messages)</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <HomeView />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
//import MapView from "@/components/MapView.vue";
import HomeView from "@/views/HomeView.vue";
import AccountCreateLogin from "@/components/AccountCreateLogin.vue";
import { Options, Vue } from "vue-class-component";
import { namespace } from "s-vuex-class";
import { UserModel } from "@/models/User";

const userMd = namespace("UserMd");

@Options({
  components: {
    HomeView,
    AccountCreateLogin
  },
})
export default class LayoutDefault extends Vue {
  @userMd.Getter
  private userAuthData!: UserModel | null;

  @userMd.Getter
  private isUserAuthenticated!: boolean | null;

  @userMd.Getter
  private connexionPopIn!: boolean;

  @userMd.Action
  private connexionPopInAction!: (value: boolean) => void;

  @userMd.Action
  private disConnexionAction!: (value: boolean) => void;

  //show-if-above QDrawer template??
  private leftDrawerOpen = false;

  connexion() {
    this.connexionPopInAction(true);
  }

  disConnexion() {
    this.disConnexionAction(true);
  }



}
</script>
<style lang="scss">

   .header__connexion > span.q-btn__content.text-center.col.items-center.q-anchor--skip.justify-center.row > i {
     padding-right: .352rem;
   }

</style>

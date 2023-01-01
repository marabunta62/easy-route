<template>
  <div class="profile q-pa-md column wrap justify-center">
    <div class="row">
      <div class="col-md-12 col-xs-12 q-pa-sm">
        <q-card class="my-card q-mb-md">

          <q-card-section class="bg-purple text-white row">
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
              </q-avatar>
            </q-item-section>
            <div class="text-h6 q-pa-md">Profile de {{ name }}</div>
            <q-item-section>
              <q-rating
                  v-model="ratingModel"
                  size="2.5em"
                  color="green-5"
                  icon="star_border"
                  icon-selected="star"
              />
            </q-item-section>
          </q-card-section>

          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon color="black" name="account_box" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Nom Prénom : </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="black" name="article" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Description : </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="black" name="event" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Est en vacances : </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="black" name="directions_car" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Est en route avec : </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="black" name="merge" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Pour un trajet de : SANS vers : SANS </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
        <q-scroll-area style="height: 360px" class="custom__line__chat">

          <q-card
              class="my-card text-white"
              style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
          >
            <q-card-section>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              {{ lorem }}
            </q-card-section>
          </q-card>

        </q-scroll-area>

        <q-input bottom-slots v-model="text" label="Label" counter maxlength="12" :dense="dense" class="q-pa-md">
            <template v-slot:before>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar5.jpg">
              </q-avatar>
            </template>

            <template v-slot:hint>
              Field hint
            </template>

            <template v-slot:after>
              <q-btn round dense flat icon="send" />
            </template>
          </q-input>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "s-vuex-class";

@Options({
  name: 'publicUserProfile',
})
export default class PublicUserProfile extends Vue {

  private name = 'toto';
  private lorem = 'ceci est un commentaire';
  private email!: string;
  private emailMe = true;
  private ratingModel = 3;
}
</script>
<style lang="scss">

</style>

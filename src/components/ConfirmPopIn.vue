<template>
  <q-dialog v-model="popInState" persistent>
    <q-card>
      <q-card-section class="bg-purple text-white customPopUp__header">
        <div class="text-h6">Confirmez</div>
        <q-icon name="close" :size="'1.8rem'" class="customPopUp__header__icon" @click="closePopIn()"/>
      </q-card-section>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">{{ labelPop }} </span>
      </q-card-section>

      <q-card-actions align="right" class="customPopUp__customChildButtons">
        <q-btn flat label="Oui" color="primary" :loading="loadingAction" v-close-popup @click="executeConfirm()"/>
        <q-btn flat label="Non" color="primary" :loading="loadingAction" v-close-popup @click="closePopIn()"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { namespace } from "s-vuex-class";

const popInMd = namespace("PopInMd");

@Options({
  name: "ConfirmPopIn",
})
export default class ConfirmPopIn extends Vue {

  @Prop({ default: 'Voulez-vous confimer ?', type: String})
  readonly labelPop!: string;

  @Prop({ default: false, type: Boolean})
  readonly loadingAction!: boolean;

  @popInMd.Getter
  private popInState!: boolean;

  @popInMd.Action
  private popInChangeState!: (popInState: boolean) => void;

  executeConfirm() {
    //this.executeConfirmPop(this.actionToDo);
    this.$emit('confirm');
    this.popInChangeState(false);
  }

  closePopIn() {
    this.popInChangeState(false);
  }
}
</script>
<style lang="scss">

.customPopUp {
  max-width: 560px;
  width: 80%;

  &__header {
    display: flex;
    justify-content: space-between;

    &__icon {
      cursor: pointer;
    }
  }

  &__customChildButtons {
    display: flex;
    justify-content: center;
  }
}
</style>

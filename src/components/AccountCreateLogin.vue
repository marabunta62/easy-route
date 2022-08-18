<template>
  <div>

    <q-dialog v-model="connexionPopIn">
      <q-card class="customPopUp">
        <q-card-section class="bg-purple text-white customPopUp__header">
          <div class="text-h6">Connexion</div>
          <q-icon name="close" @click="onCloseConnexionPopUp()" :size="'1.8rem'" class="customPopUp__header__icon"/>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pt-lg">
          <div class="q-px-md-q-pt-md" style="max-width: 100%">

            <q-form
                @submit="onSubmitConnexion()"
                @reset="onReset"
                class="q-gutter-md"
            >
              <q-input
                  filled
                  v-model="mail"
                  label="E-Mail *"
                  hint="E-Mail"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <q-input
                  filled
                  v-model="password"
                  label="Mot de Passe *"
                  hint="Mot de Passe"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <div class="customPopUp__errorMessage" v-if="messageApi">{{ message }}</div>

              <q-card-actions align="center" class="customPopUp__customChildButtons">
                <q-btn label="Envoyer" type="submit" color="primary" flat class="q-ma-sm-auto" :size="'.780rem'"/>
                <q-btn label="Mot de Passe Oublié" type="reset" color="pink-6" flat class="q-ma-sm-auto"
                       :size="'.780rem'"
                        @click="openLostPwdPopIn()"
                />
                <q-btn label="Effacer" type="reset" color="pink-6" flat class="q-mx-sm-auto" :size="'.780rem'"/>
              </q-card-actions>

            </q-form>

          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="center" class="text-primary">
          <q-btn label="Inscription" color="purple" flat @click="openRegisterPopIn()" :size="'.750rem'"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="passwordPopUp">
      <q-card class="customPopUp">
        <q-card-section class="bg-purple text-white customPopUp__header">
          <div class="text-h6">Mot de Passe Oublié</div>
          <q-icon name="close" @click="closeLostPwdPopIn()" :size="'1.8rem'" class="customPopUp__header__icon"/>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pt-lg">
          <div class="q-px-md-q-pt-md" style="max-width: 100%">

            <q-form
                @submit="onSubmit"
                class="q-gutter-md"
            >
              <q-input
                  filled
                  v-model="mail"
                  label="E-Mail *"
                  hint="E-Mail"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
              />

              <div class="customPopUp__customChildButtons">
                <q-btn label="Envoyer" type="submit" color="primary" flat class="q-mx-sm-auto" :size="'.780rem'"/>
              </div>
            </q-form>

          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="registerPopIn" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white registerCustomPopUp" >
        <q-card-section class="bg-purple text-white registerCustomPopUp__header">
          <div class="text-h6">Creation compte</div>
          <q-icon name="close" @click="onCloseRegisterPopUp()" :size="'1.8rem'" class="registerCustomPopUp__header__icon"/>
        </q-card-section>

        <q-separator />

          <q-card-section class="q-pt-lg registerCustomPopUp__body">
            <div class="q-px-md-q-pt-md" style="max-width: 100%">
              <q-form
                  @submit="onSubmitRegister()"
                  class="q-gutter-md"
              >
                <q-input
                    filled
                    v-model="name"
                    label="Nom *"
                    hint="E-Mail"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                    filled
                    v-model="mail"
                    label="E-Mail *"
                    hint="E-Mail"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                    filled
                    v-model="mail"
                    label="Confirmez E-Mail *"
                    hint="E-Mail"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                    filled
                    v-model="password"
                    label="Mot de Passe *"
                    hint="Mot de Passe"
                    lazy-rules
                    :rules="[
                val => val !== null && val !== '' || 'Please type your age',
                val => val > 0 && val < 100 || 'Please type a real age'
              ]"
                />

                <q-input
                    filled
                    v-model="password"
                    label="Confirmez Mot de Passe *"
                    hint="Confirmez Mot de Passe"
                    lazy-rules
                    :rules="[
                val => val !== null && val !== '' || 'Please type your age',
                val => val > 0 && val < 100 || 'Please type a real age'
              ]"
                />

                <div class="customPopUp__customChildButtons">
                  <q-btn label="Inscription" type="submit" color="primary" class="q-mx-sm-auto" :size="'.780rem'"/>
                </div>

              </q-form>
            </div>
          </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "s-vuex-class";
import { UserAPiNest, UserModel } from "@/models/User";
import { isAllowedToAccess } from "@/config/guard";

const userMd = namespace("UserMd");

@Options({
  name: "AccountCreateLogin"
})
export default class AccountCreateLogin extends Vue {
  @userMd.Getter
  private userAuthData!: UserModel | null;

  @userMd.Getter
  private isUserAuthenticated!: boolean | null;

  @userMd.Getter
  private messageApi!: UserAPiNest | null;

  @userMd.Getter
  private connexionPopIn!: boolean;

  @userMd.Action
  private connexionPopInAction!: (value: boolean) => void;

  @userMd.Action
  private fetchAuthenticatedUser!: (user: UserModel) => void;

  private registerPopIn = false;
  private passwordPopUp = false;

  private mail = '';
  private name = null;
  private password = '';
  private message = '';

  onReset() {
    this.mail = '';
    this.password = '';
  }

  async onSubmitConnexion(): Promise<void> {
    try {
      const userInfo = {
        email: this.mail,
        password: this.password
      } as UserModel;
      await this.fetchAuthenticatedUser(userInfo);
      if(this.isUserAuthenticated) {
        this.connexionPopInAction(false);
      } else {
        this.connexionPopInAction(true);
        if (this.messageApi?.message === "Unauthorized") {
          this.message = 'Mot de passe incorrect'
        } else if (this.messageApi?.message === `User with ${this.mail} not found`) {
          this.message = `Utilisateur avec ${this.mail} inconnu`
        }
      }
    } catch (err) {
      this.$log.error(err)
    }
  }

  onCloseConnexionPopUp() {
    this.connexionPopInAction(false);
  }

  openRegisterPopIn() {
    this.registerPopIn = true;
  }

  onCloseRegisterPopUp() {
    this.registerPopIn = false;
  }

  onSubmitRegister() {
    console.log("POST: créer un booby")
    //then router push to profil
  }

  openLostPwdPopIn() {
    this.passwordPopUp = true;
    this.connexionPopInAction(false);
  }

  closeLostPwdPopIn() {
    this.passwordPopUp = false;
    this.connexionPopInAction(true);
  }
}
</script>

<style scoped lang="scss">

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

  &__errorMessage {
    display: flex;
    justify-content: center;
  }

  &__customChildButtons {
    display: flex;
    justify-content: center;
  }
}

.registerCustomPopUp {
  max-width: 600px;
  width: 85%;

  &__header {
    display: flex;
    justify-content: space-between;

    &__icon {
      cursor: pointer;
    }
  }

  &__body {
    background-color: white;
  }
}

</style>

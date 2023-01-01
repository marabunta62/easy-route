<template>
  <div class="profile q-pa-md column wrap justify-center">
    <h5 class="q-pa-sm q-my-sm">Profil de {{ userProfileData.name }}</h5>
    <q-separator class="q-ml-sm"></q-separator>
    <p class="q-pa-sm">Editer vos informations personnelles</p>
    <div class="row">

    <div class="col-md-6 col-xs-12 q-pa-sm">
      <q-card class="my-card q-pt-sm">
        <q-card-section class="bg-purple text-white row">
          <q-item-section avatar @click="openUpdateImgPopIn()" style="cursor: pointer">
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
              </q-avatar>
          </q-item-section>
          <div class="text-h6 q-pa-md">Informations Compte</div>
          <q-item-section>
            <q-icon color="black" name="star_rate" />
          </q-item-section>
        </q-card-section>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon color="black" name="account_box" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Nom Prénom:  <strong> {{ userProfileData.name }} </strong> </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon color="black" name="email" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Email: <strong> {{ userProfileData.email }} </strong></q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon color="black" name="article" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Description: <strong> {{ userProfileData.description }} </strong> </q-item-label>
            </q-item-section>

          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon color="black" name="double_arrow" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Email Activité Compte: <strong> {{ emailingMe }} </strong> </q-item-label>
            </q-item-section>

          </q-item>
        </q-list>
      </q-card>
    </div>

    <div class="col-md-6 col-xs-12 q-pa-sm">
        <div class="q-pt-sm"  style="max-width: 100%">
          <q-input color="teal" outlined label="Nom Prénom" stack-label v-model="updateName">
          </q-input>
        </div>
      <div class="q-pt-sm" style="max-width: 100%">
        <q-input color="teal" outlined label="Description" autogrow :rules="[ val => val.length <= 200 || 'Max 200 caractères' ]" :maxlength="400" stack-label v-model="updateDescription">
        </q-input>
      </div>
        <div class="q-pt-sm"  style="max-width: 100%">
          <q-input color="teal" outlined label="Nouveau Email" stack-label v-model="updateEmail">
          </q-input>
        </div>
      <div class="q-pt-sm"  style="max-width: 100%">
        <q-input color="teal" outlined label="Confirmez Nouveau Email" stack-label v-model="updateConfirmEmail">
        </q-input>
      </div>
        <div class="q-pt-sm" style="max-width: 100%">
          <q-input color="teal" outlined label="Nouveau Mot de Passe" stack-label v-model="updatePassword">
          </q-input>
        </div>
        <div class="q-pt-sm" style="max-width: 100%">
          <q-input color="teal" outlined label="Confirmez Nouveau Mot de Passe" stack-label v-model="updateConfirmPassword">
          </q-input>
        </div>
        <q-toggle class="q-pa-sm q-py-md"
                  v-model="updateEmailMe"
                  color="pink"
                  icon="mail"
                  label="Recevoir des emails de l'activité du compte"
        />
        <div class="q-pa-md q-gutter-sm">
          <q-btn color="primary" label="Enregistrer" @click="openConfirmPopIn()"/>
        </div>
        <div class="q-pa-md q-gutter-sm">
          <q-btn color="red" label="Supprimer le compte" @click="openConfirmDeleteUserPopIn()" />
        </div>
      </div>
      </div>
  </div>
  <q-dialog v-model="popInStateUpdateImg" persistent>
    <q-card class="q-pa-md">
      <q-card-section align="center">
        <span class="q-ml-sm">Changez photo profil</span>
      </q-card-section>

      <q-file outlined v-model="updateUserImg">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>

      <q-card-actions align="center">
        <q-btn flat label="Confirmer" color="primary" v-close-popup />
        <q-btn flat label="Annuler" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <confirm-pop-in
      :label-pop="' Mettre à jour vos informations d\'utilisateur ?'"
      :pop-in-state="popInStateUserData"
      :loading-action="isLoading"
      @confirm="confirmPatchUserProfile"
      @exit="exitPopIn"
  ></confirm-pop-in>
  <confirm-pop-in
      :label-pop="' Etes-vous certain de vouloir supprimer définitivement votre compte ?'"
      :pop-in-state="popInStateUserDelete"
      :loading-action="isLoading"
      @confirm="confirmDeleteUserProfile"
      @exit="exitPopIn"
  ></confirm-pop-in>
  <q-dialog v-model="errorPopIn" :position="'top'">
    <q-card style="width: 350px">

      <q-card-section class="row items-center no-wrap">
        <div>
          <div class="text-weight-bold">{{ popInMsg }}</div>
        </div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { UpdateUserData, UserAPiNest, UserModel } from "@/models/User";
import { namespace } from "s-vuex-class";
import ConfirmPopIn from "@/components/ConfirmPopIn.vue";
import { UserService } from "@/services/z-index";

const userMd = namespace("UserMd");

@Options({
  name: 'UserProfile',
  components: {
    ConfirmPopIn
  }
})
export default class UserProfile extends Vue {

  @userMd.Getter
  private userAuthData!: UserModel;

  @userMd.Getter
  private isUserAuthenticated!: boolean;

  @userMd.Getter
  private userProfileData!: UpdateUserData;

  @userMd.Getter
  private messageApi!: UserAPiNest | null | string;

  @userMd.Action
  private fetchUserProfileData!: (userId: number) => Promise<UpdateUserData>;

  @userMd.Action
  private patchUserProfileData!: (updateUserData: UpdateUserData) => Promise<void>;

  @userMd.Action
  private disConnexionAction!: (isAuth: boolean) => Promise<void>;

  private updateUserImg = '';
  private updateName = '';
  private updateEmail = '';
  private updatePassword = '';
  private updateConfirmPassword = '';
  private updateDescription = '';
  private updateConfirmEmail = '';
  private updateEmailMe = true;

  private popInStateUpdateImg = false;
  private popInStateUserData = false;
  private popInStateUserDelete = false;

  private errorPopIn = false;
  private popInMsg = '';

  private isLoading = false;

  created() {
    console.log('user', this.userAuthData);
    this.fetchUserProfileData(this.userAuthData.userId);
  }

 /* async fetchUserProfileData(id: number): Promise<void> {
    try {
        const response = await UserService.getUserPrivateProfile(id);
        console.log("user", response)
          this.name = response.data?.name;
          this.email = response.data?.email;
          this.password = response.data?.password;
          this.description = response.data?.description;
    } catch (err) {
      this.$log.error(err);
    }
  }*/

  get emailingMe() {
    return this.userProfileData.emailMe ? 'Oui' : 'Non';
  }

  //PASSER PAR LE STORE POUR SAUVEGARDER LA REPONSE DU UPDATE + GERER LES MDP/EMAILS DIFFERENTS
  async confirmPatchUserProfile(): Promise<void> {
    try {
        const updateUserInfos = {
          id: this.userAuthData.userId,
          name: this.updateName,
          description: this.updateDescription,
          email: this.updateEmail,
          confirmEmail: this.updateConfirmEmail,
          password: this.updatePassword,
          confirmPassword: this.updateConfirmPassword,
          emailMe: this.updateEmailMe,
        };
        console.log("toto 3 ", updateUserInfos)
        await this.patchUserProfileData(updateUserInfos);
        if(this.messageApi) {
          this.errorPopIn = true;
          if(this.messageApi === 'password should be identical') {
            this.popInMsg = 'Les mots de passes doivent être identiques'
          } else if (this.messageApi === 'email should be identical') {
            this.popInMsg = 'Les emails doivent être identiques'
          }
        }
        await this.fetchUserProfileData(this.userAuthData.userId);
        console.log('enter2 ', this.messageApi);
    } catch (err) {
      this.$log.error(err);
    } finally {
      this.popInStateUserData = false;
    }
  }

  async confirmDeleteUserProfile() {
    try {
      await UserService.deleteUserAccount(this.userAuthData.userId);
    } catch(err) {
      this.$log.error(err);
    } finally {
      this.isLoading = false;
      this.popInStateUserDelete = false;
      await this.disConnexionAction(false);
      await this.$router.push({name: 'home'});
    }
  }

  openUpdateImgPopIn() {
    this.popInStateUpdateImg = true;
  }

  openConfirmPopIn() {
    this.popInStateUserData = true;
  }

  openConfirmDeleteUserPopIn() {
    this.popInStateUserDelete = true;
  }

  exitPopIn() {
    this.popInStateUserData = false;
    this.popInStateUserDelete = false;
  }


}
</script>
<style lang="scss">

</style>

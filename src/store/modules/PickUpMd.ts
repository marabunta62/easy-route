import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { PickUpModel, PickUpModel2 } from "@/models/PickUp";
import { PickUpService } from "@/services/z-index";
import { convertProxyInJson } from "@/store";

@Module({
  namespaced: true,
})
export default class PickUpMd extends VuexModule {
  private pickUpModel: PickUpModel | null = null;
  private pickUpModelList: PickUpModel2[] | null = null;
  private selectedPickUpModel: PickUpModel2 | null = null;

  get pickUp(): PickUpModel | null {
    return this.pickUpModel;
  }

  get pickUpList(): PickUpModel2[] | null {
    return convertProxyInJson(this.pickUpModelList);
  }

  get selectedPickUp(): PickUpModel2 | null {
    return convertProxyInJson(this.selectedPickUpModel);
  }

  @Mutation
  setPickUpModel(pickUpModel: PickUpModel | null): void {
    this.pickUpModel = pickUpModel;
  }

  @Mutation
  setPickUpModelList(pickUpModel: PickUpModel2[] | null): void {
    this.pickUpModelList = pickUpModel;
  }

  @Mutation
  setSelectedPickUpModel(selectedPickUpModel: PickUpModel2 | null): void {
    this.selectedPickUpModel = selectedPickUpModel;
  }

  @Action({ rawError: true })
  async fetchPickUpModel(): Promise<void> {
    try {
      const pickUpData = await PickUpService.getPickUp();
      this.context.commit("setPickUpModel", pickUpData);
    } catch (err) {
      this.context.commit("setPickUpModel", null);
      throw err;
    }
  }

  @Action({ rawError: true })
  async fetchPickUpList(): Promise<void> {
    try {
      const pickUpDataList = await PickUpService.getAllPickUp();
      this.context.commit("setPickUpModelList", pickUpDataList);
      //console.log("module", pickUpDataList);
    } catch (err) {
      this.context.commit("setPickUpModelList", null);
      throw err;
    }
  }

  @Action({ rawError: true })
  async selectedCurrentPickUpModel(selectedPickUp: PickUpModel2): Promise<void> {
    try {
      this.context.commit("setSelectedPickUpModel", selectedPickUp);
    } catch (err) {
      this.context.commit("setPickUpModel", null);
      throw err;
    }
  }
}

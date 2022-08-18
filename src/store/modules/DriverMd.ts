import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { PickUpModel } from "@/models/PickUp";
import { DriverService } from "@/services/z-index";
import { convertProxyInJson } from "@/store";

@Module({
    namespaced: true,
})
export default class DriverMd extends VuexModule {
    private driverPickUp: PickUpModel | null = null;

    get driverPickUpData(): PickUpModel | null {
        return convertProxyInJson(this.driverPickUp);
    }

    @Mutation
    setDriverPickUpData(driverPickUp: PickUpModel | null): void {
        this.driverPickUp = driverPickUp;
    }

    @Action({ rawError: true })
    async fetchDriverPickUpData(userId: number): Promise<void> {
        try {
            console.log("driver call params", userId)
            const driverPickUpResponse = await DriverService.getDriverPickUpData(userId);
            console.log("driver  infos", driverPickUpResponse)
            this.context.commit("setDriverPickUpData", driverPickUpResponse);
        } catch (err) {
            this.context.commit("setDriverPickUpData", null);
            throw err;
        }
    }
}

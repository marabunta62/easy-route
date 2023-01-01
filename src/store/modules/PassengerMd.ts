import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { PickUpModel } from "@/models/PickUp";
import { PassengerService } from "@/services/z-index";
import { convertProxyInJson } from "@/store";
import { Passenger, passengerIsUser, UpdatePassenger } from "@/models/Passenger";

@Module({
    namespaced: true,
})
export default class PassengerMd extends VuexModule {
    private passenger: UpdatePassenger | null = null;
    private passengerId: number | null = null;
    private passengerData: passengerIsUser | null = null;

    get passengerUpdte(): PickUpModel | null {
        return convertProxyInJson(this.passenger);
    }

    get passengerIds(): number | null {
        return convertProxyInJson(this.passengerId);
    }

    get passengerInfos(): number | null {
        return convertProxyInJson(this.passengerData);
    }

    @Mutation
    setPassengerUpdte(passengerUpdte: UpdatePassenger | null): void {
        this.passenger = passengerUpdte;
    }

    @Mutation
    setPassengerId(passengerId: number | null): void {
        this.passengerId = passengerId;
    }

    @Mutation
    setPassengerData(passenger: passengerIsUser | null): void {
        this.passengerData = passenger;
    }

    @Action({ rawError: true })
    async patchPassengerDriver(passengerUpdte: UpdatePassenger): Promise<void> {
        // eslint-disable-next-line no-useless-catch
        try {
            await PassengerService.patchPassengerByDriver(passengerUpdte);
        } catch (err) {
            throw err;
        }
    }

    @Action({ rawError: true })
    async passengerIdUpdate(passengerId: number): Promise<void> {
        await this.context.commit("setPassengerId", passengerId);
    }

    @Action({ rawError: true })
    async fetchPassengerPickUpData(userId: number): Promise<void> {
        console.log('pass here', userId);
        const response = await PassengerService.fetchPassengerPickUpData(userId);
        await this.context.commit("setPassengerData", response);
    }

}

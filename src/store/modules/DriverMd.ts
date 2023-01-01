import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { PickUpModel } from "@/models/PickUp";
import { DriverService } from "@/services/z-index";
import { convertProxyInJson } from "@/store";
import { CityCompletion } from "@/models/City";
import { Passenger, PassengerList } from "@/models/Passenger";

@Module({
    namespaced: true,
})
export default class DriverMd extends VuexModule {
    private driverPickUp: PickUpModel | null = null;
    private currentPassengers: PassengerList[] | null = null;
    private currentRequestPassengers: PassengerList[] | null = null;
    private cityDepartureCompletion: CityCompletion | null = null;
    private cityArrivalCompletion: CityCompletion | null = null;

    get driverPickUpData(): PickUpModel | null {
        return convertProxyInJson(this.driverPickUp);
    }

    get driverCurrentPassengers(): PassengerList[] | null {
        return convertProxyInJson(this.currentPassengers);
    }

    get driverRequestCurrentPassengers(): PassengerList[] | null {
        return convertProxyInJson(this.currentRequestPassengers);
    }

    get driverCityArrivalCompletion(): CityCompletion | null {
        return convertProxyInJson(this.cityArrivalCompletion);
    }

    get driverCityDepartureCompletion(): CityCompletion | null {
        return convertProxyInJson(this.cityDepartureCompletion);
    }

    @Mutation
    setDriverPickUpData(driverPickUp: PickUpModel | null): void {
        this.driverPickUp = driverPickUp;
    }

    @Mutation
    setDriverCurrentPassengers(driverPickUpPassenger: PassengerList[] | null): void {
        this.currentPassengers = driverPickUpPassenger;
    }

    @Mutation
    setDriverRequestCurrentPassengers(driverPickUpCurrentPassenger: PassengerList[] | null): void {
        this.currentRequestPassengers = driverPickUpCurrentPassenger;
    }

    @Mutation
    setDriverCityArrivalCompletion(cityCompletion: CityCompletion | null): void {
        this.cityArrivalCompletion = cityCompletion;
    }

    @Mutation
    setDriverCityDepartureCompletion(cityCompletion: CityCompletion | null): void {
        this.cityDepartureCompletion = cityCompletion;
    }

    @Action({ rawError: true })
    async fetchDriverPickUpData(userId: number): Promise<void> {
        try {
            const driverPickUpResponse = await DriverService.getDriverPickUpData(userId);
            this.context.commit("setDriverPickUpData", driverPickUpResponse);
            const driverCityArrivalCompletion = {
                city: '',
                showCompletion: driverPickUpResponse.pickUp.arrivalCityName,
                coordinates: driverPickUpResponse.pickUp.arrivalCoordinates,
            };
            const driverCityDepartureCompletion = {
                city: '',
                showCompletion: driverPickUpResponse.pickUp.departureCityName,
                coordinates: driverPickUpResponse.pickUp.departureCityName,
            };

            console.log("driver  infos", driverPickUpResponse)

            this.context.commit("setDriverCityArrivalCompletion", driverCityArrivalCompletion);
            this.context.commit("setDriverCityDepartureCompletion", driverCityDepartureCompletion);
            this.context.commit("setDriverCurrentPassengers", driverPickUpResponse.passengers);
            this.context.commit("setDriverRequestCurrentPassengers", driverPickUpResponse.passengersRequestForPickUps);
        } catch (err) {
            this.context.commit("setDriverPickUpData", null);
            throw err;
        }
    }

    @Action({ rawError: true })
    async postDriverInfosData(driverInfo: any): Promise<void> {
        // eslint-disable-next-line no-useless-catch
        try {
            await DriverService.postDriverInfosPickUpData(driverInfo);
            //console.log("driver  infos", userId)
            //this.context.dispatch("fetchDriverPickUpData", userId);
        } catch (err) {
            //this.context.commit("setDriverPickUpData", null);
            throw err;
        }
    }

}

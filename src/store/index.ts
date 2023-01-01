import VuexPersistence from "vuex-persist";
import Vuex, { StoreOptions } from "vuex";
import CityCoordinatesMd from "@/store/modules/CityCoordinatesMd";
import PickUpMd from "@/store/modules/PickUpMd";
import UserMd from "@/store/modules/UserMd";
import DriverMd from "@/store/modules/DriverMd";
import PopInMd from "@/store/modules/PopInMd";
import PassengerMd from "@/store/modules/PassengerMd";

/* eslint-disable @typescript-eslint/no-empty-interface */
interface RootState {}

//Imports Modules

//Save Store in LocalStorage
const vuexLocal = new VuexPersistence<RootState>({
  storage: window.sessionStorage,
});

export const convertProxyInJson = (getter: any) => {
  return JSON.parse(JSON.stringify(getter));
}

//VuexBinding - This Use to type component using mappers from Vuex see vuex/pull/1121
//export interface VuexBindings {}

//List these Module
const storeOptions: StoreOptions<RootState> = {
  strict: true,
  state: {},
  modules: {
    CityCoordinatesMd,
    PickUpMd,
    UserMd,
    DriverMd,
    PopInMd,
    PassengerMd
  },
  plugins: [vuexLocal.plugin],
};
export const store = new Vuex.Store<RootState>(storeOptions);

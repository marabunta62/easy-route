import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
import router from "./router";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import { configEnv } from "@/config/config";
import VueLogger from "vuejs3-logger";

/*
VueJS-Logger Config
*/
const isProduction = process.env.NODE_ENV === "production";
const logOptions = {
  isEnabled: true,
  logLevel: isProduction ? "error" : "debug",
  stringifyArguments: true,
  showLogLevel: true,
  showMethodName: true,
  separator: "|",
  showConsoleColors: true,
};

createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(router)
  .use(store)
  .use(VueLogger, logOptions)
  .provide("TOM_TOM_API_KEY", configEnv.TOM_TOM_API_KEY)
  .mount("#app");

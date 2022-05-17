const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["quasar", "configEnv"],

  pluginOptions: {
    quasar: {
      importStrategy: "combined",
      rtlSupport: false,
    },
    webpack: {
      dir: ["./webpack"],
    },
  },

  runtimeCompiler: true,
});

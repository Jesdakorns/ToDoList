// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: true, pages: true },
  // import styles
  css: ["vuetify/styles", "assets/main.scss"],
  vite: {
    // @ts-ignore
    // curently this will lead to a type error, but hopefully will be fixed soon #justBetaThings
    ssr: {
      noExternal: ["vuetify"], // add the vuetify vite plugin
    },
  },
  plugins: [
    // Other plugins
    // { src: "plugins/vee-validate.js", ssr: true },
  ],
  build: { transpile: ["vuetify"] },
  modules: [
    [
      "@vee-validate/nuxt",
      {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
          Form: "VeeForm",
          Field: "VeeField",
          FieldArray: "VeeFieldArray",
          ErrorMessage: "VeeErrorMessage",
        },
      },
    ],
    "@kevinmarrec/nuxt-pwa",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        // @ts-ignore
        config.plugins.push(vuetify())
      );
    },
  ],
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },
  app: {
    head: {
      title: "To Do List",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      meta: [
        { name: "description", content: "To Do List" },
        { name: "msapplication-TileColor", content: "#e9f4ff" },
        { name: "theme-color", content: "#ffffff" },
        {
          name: "viewport",
          content:
            "minimum-scale=1, initial-scale=1.0, width=device-width , viewport-fit=cover",
        },
      ],
    },
  },
});

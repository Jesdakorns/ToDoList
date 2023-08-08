// plugins/vuetify.ts

import { createVuetify } from "vuetify";
import { aliases, fa } from "vuetify/iconsets/fa";
import { mdi } from "vuetify/iconsets/mdi";
import { md } from "vuetify/iconsets/md";

import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import "@fortawesome/fontawesome-free/css/all.css";
export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    // your config will come here
    icons: {
      defaultSet: "fa",
      aliases: {
        ...aliases,
      },
      sets: {
        fa,
        mdi,
        md,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});

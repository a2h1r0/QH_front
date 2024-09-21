// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VCalendar } from 'vuetify/labs/VCalendar';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VCalendar,
    },
  });
  app.vueApp.use(vuetify);
});

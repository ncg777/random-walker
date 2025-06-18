import { createApp } from 'vue'
import App from './App.vue'

import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  icons: {
    iconfont: 'mdi', // Use Material Design Icons
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          primary: "#00FF00"  // Set primary color to pure green
        }
      }
    }
  }
})

createApp(App)
  .use(vuetify)
  .mount('#app')


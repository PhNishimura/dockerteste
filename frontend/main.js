import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './src/App.vue'
import router from './src/router/index.js'
import './assets/base.css'

// Adicionar ícones à biblioteca
library.add(faShoppingCart, faTrash, faPlus, faMinus, faFacebook, faInstagram, faLinkedin, faXTwitter)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
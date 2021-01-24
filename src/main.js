import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from '@/utils/message.plugin'
import 'materialize-css/dist/js/materialize.min.js'
import { firebaseConfig } from './configs/firebase.config'

import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

import Vue from 'vue'
import App from './App.vue'
/* 
El símbolo "@" es un atajo que
me proporciona webpak y Vue para
hacer referencia de manera relativa
al directorio "src"

Si muevo esta linea de codigo a 
  cualquier otro archivo
  no necesitaré modificar 
  la ruta porque es relativa
*/
import '@/assets/css/tailwind.css'
import router from '@/router'
import { dollarFilter, percentFilter } from '@/filters'

Vue.filter('dollar', dollarFilter)
Vue.filter('percent', percentFilter)
Vue.config.productionTip = false

new Vue({
    router: router,
    render: (h) => h(App),
}).$mount('#app')
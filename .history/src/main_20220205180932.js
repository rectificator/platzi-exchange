import Vue from "vue";
import App from "./App.vue";
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
import "@/assets/css/tailwind.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

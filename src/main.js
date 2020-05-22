import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueHtml2Canvas from 'vue-html2canvas'

Vue.config.productionTip = false
// Vue.use(VueHtml2Canvas)

new Vue({
  vuetify,
  VueHtml2Canvas,
  render: h => h(App)
}).$mount('#app')

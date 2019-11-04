import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: function(gimme_a_component){
    return gimme_a_component(App);
  }
}).$mount('#app') 
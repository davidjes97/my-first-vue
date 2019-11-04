import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,

  render: function(gimme_a_component){
    return gimme_a_component(App);
  }
}).$mount('#app') 
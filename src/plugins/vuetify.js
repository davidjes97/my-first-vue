import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme:{
    themes:{
      light:{
        primary: '#009688',
        accent: '#9E9E9E',
        error: '#9E9E9E',
        info: '#9E9E9E',
        success: '#9E9E9E',
        warning: '#9E9E9E',
      }
    }
  }
});
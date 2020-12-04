import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
// import axios from 'axios'
import App from './App.vue';
import '../public/reset.css'

Vue.use(ElementUI);
Vue.use(Element, { size: 'small', zIndex: 3000 });


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

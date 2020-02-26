import Vue from 'vue'
import store from './store'
import VueRouter from 'vue-router'

import App from './components/App.vue'
import router from './router'
import 'normalize.css';
import './less/style.less';

Vue.use(VueRouter);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount("#app");


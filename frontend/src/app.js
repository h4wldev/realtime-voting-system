/**
 * @Project vue-boilerplate
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 8. 22..
 */

import 'moment-timezone';
import './utils/prototypes';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueSocketio from 'vue-socket.io';

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';

import config from '@/config';
import routes from '@/routes';

import App from '@/App.vue';


Vue.use(VueRouter);
Vue.use(ElementUI, { locale });
Vue.use(VueSocketio, config.socket_server);

const router = new VueRouter({ routes });

Vue.config.productionTip = false;

export const vue = new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

/**
 * @Project vue-boilerplate
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 8. 22..
 */

import config from '@/config';


export default [
    {
        path: '/',
        name: 'Index',
        component: require('@/views/index.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: require('@/views/login.vue')
    },
    {
        path: '/screen',
        name: 'Screen',
        component: require('@/views/screen.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: require('@/views/admin.vue')
    }
];

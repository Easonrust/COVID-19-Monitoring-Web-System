import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/globe',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Globe.vue'),
                    meta: { title: '3D地球数据' }
                },
                {
                    path: '/world',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/WorldData.vue'),
                    meta: { title: '世界数据' }
                },
                {
                    path: '/predict',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Prediction.vue'),
                    meta: { title: '疫情预测' }
                },








            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

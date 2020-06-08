import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import {
    i18n
} from './plugins/i18n';
import Highcharts from 'highcharts';
import mapInit from 'highcharts/modules/map'
import HighchartsVue from 'highcharts-vue';
import addUKMap from "./js/ukmap";
import addUSMap from "./js/usmap";
import addWorldMap from "./js/worldmap";
import scrollSpy, {
    Easing
} from 'vue2-scrollspy';
import vueXlsxTable from 'vue-xlsx-table'
Vue.use(vueXlsxTable, {rABS: false})

Vue.use(scrollSpy, {
    easing: Easing.Quartic.InOut
});
Vue.use(ElementUI, {
    size: 'small'
});
mapInit(Highcharts);
addUKMap(Highcharts);
addUSMap(Highcharts);
addWorldMap(Highcharts);
Vue.use(HighchartsVue);

Vue.config.productionTip = false;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
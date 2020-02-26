import VueRouter from 'vue-router'
import Restaurant from "../components/Restaurant";
import MainPage from "../components/Main";

const NotFoundComponent = {
    template: `<div>404</div>`
}
export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/restaurant/:code', component: Restaurant, name: 'restorant'
        },
        {
            path: '/', component: MainPage, name: 'main',
        },
        {
            path: '*', component: NotFoundComponent
        }
    ],
    scrollBehavior: function(to, from, savedPosition) {
        if (to.hash) {
            return {selector: to.hash}
        } else {
            return { x: 0, y: 0 }
        }
    },
})
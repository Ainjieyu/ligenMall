import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const home = () =>
    import ('../views/home/home.vue')
const category = () =>
    import ('../views/category/category.vue')
const profile = () =>
    import ('../views/profile/profile.vue')
const cart = () =>
    import ('../views/cart/cart.vue')
const detail = () =>
    import ('../views/detail/Detail.vue')

const routes = [
    { path: '', redirect: '/home' },
    { path: '/home', component: home },
    { path: '/profile', component: profile },
    { path: '/cart', component: cart },
    { path: '/category', component: category },
    { path: '/detail/:iid', component: detail },
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
import { createRouter , createWebHistory } from 'vue-router'

//import all pages

import Home from '../pages/index.vue'
import Signup from '../pages/signup.vue'
import Signin from '../pages/signin.vue'
import Dashboard from '../pages/dashboard.vue'
import Movies from '../pages/movies.vue'


//define the routr

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/signin',
        name: 'Signin',
        component: Signin
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta:{requiresAuth: true}
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },

    {
        path: '/movies',
        name: 'Movies',
        component: Movies // Replace YourMovieComponent with the actual component
    },
];

// register route

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.

    const isAuthenticated = !!localStorage.getItem('token');
    if (to.meta.requiresAuth && ! isAuthenticated) {
        next('/signin');
    } else {
        next();
    }

});


export default router
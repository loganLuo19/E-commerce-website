import Vue from 'vue';
import Router from 'vue-router';
import Dashborad from '@/components/Dashborad';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashborad',
      component: Dashborad,
      children:[
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        }
      ]
    },
  ]
})

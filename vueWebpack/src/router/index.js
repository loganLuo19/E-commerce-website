import Vue from 'vue';
import Router from 'vue-router';
import Dashborad from '@/components/Dashborad';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import Orders from '@/components/pages/Orders';
import CustomerOrders from '@/components/pages/CustomerOrders';
import Coupon from '@/components/pages/Coupons';



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
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          meta: { requiresAuth: true },
        }
      ]
    },
    {
      path: '/',
      name: 'Dashborad',
      component: Dashborad,
      children:[
        {
          path: 'customer_orders',
          name: 'CustomerOrders',
          component: CustomerOrders,

        },
      ]
    },
  ]
})

import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Home from '@/components/pages/Home';
import ProductPage from '@/components/pages/ProductPage';
import ShoppingCart from '@/components/pages/ShoppingCart';
import Dashborad from '@/components/Dashborad';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import Orders from '@/components/pages/Orders';
import Coupon from '@/components/pages/Coupons';
import CustomerOrders from '@/components/pages/CustomerOrders';
import CustomerCheckout from '@/components/pages/CustomerCheckout';


Vue.use(Router);
export default new Router({
  linkActiveClass:'active',
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
      path: '/',
      name: 'Index',
      component: Index,
      children:[
        {
          path: 'customer_orders',
          name: 'CustomerOrders',
          component: CustomerOrders,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        },
        {
          path: 'st.19_shop',
          name: 'Home',
          component: Home
        },
        {
          path: 'product_page',
          name: 'ProductPage',
          component: ProductPage
        },
        {
          path: 'shopping_cart',
          name: 'ShoppingCart',
          component: ShoppingCart
        },
      ]
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
    }
  ]
})

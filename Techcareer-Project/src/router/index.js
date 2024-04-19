import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/views/HomePage.vue";
import ShoppingCart from "@/views/ShpCart.vue";
import CheckoutPage from "@/views/CheckoutPage.vue";
import LoginPage from "@/views/Login.vue";
import RegisterPage from "@/views/Register.vue";
import ProductDetails from "@/views/DetailPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "products",
      component: ProductList,
      props: (route) => ({ query: route.query.search })
    },
    {
      path: '/product/:id', // Define a dynamic route parameter to pass product id
      name: 'ProductDetails',
      component: ProductDetails,
      props: true // Pass route params as props to ProductDetails component
    },
    
    {
      path: "/cart",
      name: "shopping-cart",
      component: ShoppingCart,
    },
    {
      path: "/checkout",
      name: "checkout-page",
      component: CheckoutPage,
    },
    {
      path: "/login",
      name: "login-page",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "register-page",
      component: RegisterPage,
    },
    
  ],

  
});


export default router;


import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import("@/views/Layout")
const Home = () => import("@/views/home")
const GoodsPage = ()=>import("@/views/goods")
const TopCategory = ()=>import("@/views/category")

const routes = [{
  path: '/',
  component: Layout,
  children: [
    { path: '/', component: Home },
    { path:'/product/:id', component:GoodsPage },
    { path:'/category/:id', component:TopCategory },
  ]
}]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

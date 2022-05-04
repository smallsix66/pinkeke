import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
const Layout = () => import("@/views/Layout")
const AdminLayout = () => import("@/views/AdminLayout")
const Home = () => import("@/views/home")
const GoodsPage = () => import("@/views/goods")
const TopCategory = () => import("@/views/category")
const LoginsPage = () => import("@/views/login")
const CartPage = () => import("@/views/cart")
const MemberLayout = () => import('@/views/member/Layout')
const MemberHome = () => import('@/views/member/home')
const PayCheckoutPage = () => import("@/views/member/pay/checkout")
const PayPage = () => import("@/views/member/pay")
const MemberOrder = () => import("@/views/member/order")
const MemberOrderDetail = () => import("@/views/member/order/components/order-detail")
const AdminOrder = () => import("@/views/admin/admin-order")
const AdminProduct = () => import("@/views/admin/admin-product")
const AdminSystem = () => import("@/views/admin/admin-system")
const AdminTrend = () => import("@/views/admin/admin-trend")
const AdminUser = () => import("@/views/admin/admin-user")

const routes = [{
  path: '/',
  component: Layout,
  children: [
    { path: '/', component: Home },
    { path: '/product/:id', component: GoodsPage },
    { path: '/category/:id', component: TopCategory },
  ]
}, {
  path: '/login',
  component: LoginsPage
}, {
  path: '/cart',
  component: CartPage,
}, {
  path: '/member',
  component: MemberLayout,
  children: [
    {
      path:'/member',
      component: MemberHome
    },
    {
      path: '/member/checkout',
      component: PayCheckoutPage
    },
    {
      path: '/member/pay',
      component: PayPage
    },
    {
      path: '/member/order',
      // vue3.0 需要有嵌套关系才能模糊匹配
      component: MemberOrder,
      children: [
        { path: '', component: MemberOrder },
        { path: ':id', component: MemberOrderDetail }
      ]
    },
  ]
}, {
  path: '/admin',
  component: AdminLayout,
  children: [
    { path: '/admin', component: AdminProduct },
    { path: '/admin/order', component: AdminOrder },
    { path: '/admin/product', component: AdminProduct },
    { path: '/admin/system', component: AdminSystem },
    { path: '/admin/trend', component: AdminTrend },
    { path: '/admin/user', component: AdminUser },
  ]
}]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 用户信息
  const { u_id } = store.state.user.user
  // 跳转去member开头的地址却没有登录
  if (to.path.startsWith('/member') && !u_id) {
    next({ path: '/login', query: { redirectUrl: to.fullPath } })
  }
  next()
})

export default router

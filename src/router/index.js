import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('@/views/index/index'),
      meta: { title: '首页', icon: 'el-icon-house' }
    }]
  },

  {
    path: '/user',
    component: Layout,
    name: 'User',
    redirect: '/user/index',
    meta: { title: '用户管理', icon: 'el-icon-monitor' },
    alwaysShow: true,
    children: [{
      path: 'index',
      name: 'User-index',
      component: () => import('@/views/user/index'),
      meta: { title: '用户列表' }
    }]
  },


  {
    path: '/task',
    component: Layout,
    name: 'Task',
    redirect: '/task/index',
    meta: { title: '任务管理', icon: 'el-icon-monitor' },
    alwaysShow: true,
    children: [{
      path: 'index',
      name: 'Task-index',
      component: () => import('@/views/task/index'),
      meta: { title: '任务列表' }
    },{
      path: 'child',
      name: 'Task-child',
      component: () => import('@/views/task/child'),
      meta: { title: '子任务列表' }
    },{
      path: 'sendrecord',
      name: 'Task-sendrecord',
      component: () => import('@/views/task/sendrecord'),
      meta: { title: '发送记录' }
    }]
  },

  {
    path: '/finance',
    component: Layout,
    name: 'Finance',
    redirect: '/finance/index',
    meta: { title: '财务管理', icon: 'el-icon-wallet' },
    alwaysShow: true,
    children: [{
      path: 'record',
      name: 'Finance-record',
      component: () => import('@/views/finance/record'),
      meta: { title: '充值记录' }
    },{
      path: 'consume',
      name: 'Finance-consume',
      component: () => import('@/views/finance/consume'),
      meta: { title: '消费记录' }
    }]
  },

  {
    path: '/pass',
    component: Layout,
    name: 'Pass',
    redirect: '/pass/index',
    meta: { title: '通道管理', icon: 'el-icon-wallet' },
    alwaysShow: true,
    children: [{
      path: 'index',
      name: 'pass-index',
      component: () => import('@/views/pass/index'),
      meta: { title: '通道列表' }
    }]
  },


  {
    path: '/account',
    component: Layout,
    name: 'Account',
    redirect: '/account/index',
    meta: { title: '账户管理', icon: 'el-icon-setting' },
    alwaysShow: true,
    children: [{
      path: 'index',
      name: 'Account-index',
      component: () => import('@/views/account/index'),
      meta: { title: '基本信息' }
    },
  ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

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

export const asyncRouterMap = [
  {
    path: '/project',
    component: Layout,
    name: 'project',
    redirect: '/project/index',
    meta: { title: '项目管理', icon: 'el-icon-monitor',role: ['admin']  },
    alwaysShow: true,
    children: [{
      path: 'index',
      name: 'project-index',
      component: () => import('@/views/project/index'),
      meta: { title: '项目列表',role: ['admin'] }
    }]
  },

  {
    path: '/member',
    component: Layout,
    name: 'member',
    redirect: '/member/index',
    meta: { title: '会员管理', icon: 'el-icon-monitor',role: ['admin','agent','sale']  },
    alwaysShow: true,
    children: [{
      path: 'index',
      name: 'member-index',
      component: () => import('@/views/member/index'),
      meta: { title: '会员列表',role: ['admin','agent','sale'] }
    },{
      path: 'earn',
      name: 'member-earn',
      component: () => import('@/views/member/earn'),
      meta: { title: '会员挖矿收益',role: ['admin','agent','sale'] }
    }]
  },

  {
    path: '/earnrule',
    component: Layout,
    name: 'earnrule',
    redirect: '/earnrule/index',
    meta: { title: '收益管理', icon: 'el-icon-monitor',role: ['admin','agent']  },
    alwaysShow: true,
    children: [{
      path: 'index',
      name: 'earnrule-index',
      component: () => import('@/views/earnrule/index'),
      meta: { title: '收益规则',role: ['admin'] }
    },{
      path: 'transfer',
      name: 'earnrule-transfer',
      component: () => import('@/views/transfer/index'),
      meta: { title: '划转记录',role: ['admin','agent'] }
    }]
  },

  {
    path: '/pool',
    component: Layout,
    name: 'pool',
    redirect: '/pool/index',
    meta: { title: '矿池管理', icon: 'el-icon-monitor',role: ['admin']  },
    alwaysShow: true,
    children: [{
      path: 'index',
      name: 'pool-index',
      component: () => import('@/views/pool/index'),
      meta: { title: '矿池列表',role: ['admin'] }
    }]
  },

  {
    path: '/agent',
    component: Layout,
    name: 'agent',
    redirect: '/agent/index',
    meta: { title: '代理-业务员管理', icon: 'el-icon-monitor',role: ['admin','agent']  },
    alwaysShow: true,
    children: [{
      path: 'index',
      name: 'agent-index',
      component: () => import('@/views/agent/index'),
      meta: { title: '人员列表',role: ['admin','agent'] }
    }]
  },

  {
    path: '/configure',
    component: Layout,
    name: 'configure',
    redirect: '/configure/index',
    meta: { title: '配置管理', icon: 'el-icon-monitor',role: ['admin']  },
    alwaysShow: true,
    children: [{
      path: 'index',
      name: 'configure-index',
      component: () => import('@/views/configure/index'),
      meta: { title: '配置列表',role: ['admin'] }
    }]
  },
  
  {
    path: '/log',
    component: Layout,
    name: 'Log',
    redirect: '/log/index',
    meta: { title: '日志管理', icon: 'el-icon-monitor',role: ['admin'] },
    alwaysShow: true,
    children: [{
      path: 'index',
      name: 'Log-index',
      component: () => import('@/views/log/index'),
      meta: { title: '日志',role: ['admin'] }
    }]
  },


  

  // {
  //   path: '/permission',
  //   component: Layout,
  //   name: '权限测试',
  //   meta: { title: '用户管理', icon: 'el-icon-monitor',role: ['admin'] }, //页面需要的权限
  //   children: [
  //   { 
  //     path: 'index',
  //     component: Permission,
  //     name: '权限测试页',
  //     meta: { role: ['admin','super_editor'] }  //页面需要的权限
  //   }]
  // },
  { path: '*', redirect: '/404', hidden: true }
];

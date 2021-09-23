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
    path: '/company',
    component: Layout,
    name: 'Company',
    redirect: '/company/index',
    meta: { title: '公司管理', icon: 'el-icon-monitor' },
    alwaysShow: true,
    children: [{
      path: 'index',
      name: 'Company-index',
      component: () => import('@/views/company/index'),
      meta: { title: '公司列表' }
    },{
      path: 'white',
      name: 'Company-white',
      component: () => import('@/views/company/white'),
      meta: { title: '白名单列表' }
    }]
  },

  {
    path: '/number',
    component: Layout,
    name: 'Number',
    redirect: '/number/index',
    meta: { title: '小号管理', icon: 'el-icon-monitor' },
    alwaysShow: true,
    children: [{
      path: 'index',
      name: 'Number-index',
      component: () => import('@/views/number/index'),
      meta: { title: '小号申请列表' }
    },{
      path: 'list',
      name: 'Number-list',
      component: () => import('@/views/number/list'),
      meta: { title: '小号通过列表' }
    },{
      path: 'self',
      name: 'Number-self',
      component: () => import('@/views/number/self'),
      meta: { title: '自有小号列表' }
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
    path: '/administrator',
    component: Layout,
    name: 'Administrator',
    redirect: '/administrator/index',
    meta: { title: '管理员管理', icon: 'el-icon-monitor' },
    alwaysShow: true,
    children: [{
      path: 'index',
      name: 'Administrator-index',
      component: () => import('@/views/administrator/index'),
      meta: { title: '代理列表' }
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
    // {
    //   path: 'password',
    //   name: 'Account-password',
    //   component: () => import('@/views/account/password'),
    //   meta: { title: '修改密码' }
    // },
    // {
    //   path: 'warning',
    //   name: 'Account-warning',
    //   component: () => import('@/views/account/warning'),
    //   meta: { title: '告警配置' }
    // }
  ]
  },

  {
    path: '/message',
    component: Layout,
    name: 'Message',
    redirect: '/message/index',
    meta: { title: '消息中心', icon: 'el-icon-wallet' },
    // alwaysShow: true,
    hidden:true,
    children: [{
      path: 'index',
      name: 'Message-index',
      component: () => import('@/views/message/index'),
      meta: { title: '消息列表' }
    }]
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'Dashboard', icon: 'dashboard' }
  //   }]
  // },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

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

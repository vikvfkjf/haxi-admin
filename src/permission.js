import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {

  // start progress bar
  // console.log('to',to)
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // if(this.router)
  // determine whether the user has logged in
  const hasToken = getToken()
  
  if (hasToken) {
    
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      console.log(store.getters)
      if (hasGetUserInfo) {
        console.log('nihao')
        next()
      } else {
        try {
          
          // get user info
          await store.dispatch('user/getInfo').then(res=>{
            // console.log(res);
            let roles = null;
            if(res.role==1) {
              roles = 'admin';
            }else if(res.role==2) {
              roles = 'agent';
            }else if(res.role==3) {
              roles = 'sale';
            }
            store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
              console.log('store.getters',store.getters.addRouters);
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              // router.options.routes=store.getters.routers;
              // console.log(router);
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          })

          // next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    console.log(whiteList);
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
      // next()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

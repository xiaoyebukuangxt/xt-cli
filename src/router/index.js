import Vue from 'vue'
import Router from 'vue-router'


//懒加载组件

const homepage = () => import('views/About/About');


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: homepage,
      children: [
        {
          path: '/menu1',
          component: homepage,
          meta: {
            name: '菜单2'  //顶部导航显示的文字，必须配置
          },
        },
        {
          path: '/menu2',
          component: homepage,
          meta: {
            name: '菜单3'  //顶部导航显示的文字，必须配置
          },
        },
        {
          path: '/menu3',
          component: homepage,
          meta: {
            name: '菜单4'  //顶部导航显示的文字，必须配置
          },
        },
      ]
    }
  ]
})


export default router;

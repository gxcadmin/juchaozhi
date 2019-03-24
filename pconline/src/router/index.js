import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import FaXian from '@/components/Home/FaXian/FaXian'
import JingXuan from '@/components/Home/JingXuan/JingXuan'
import YouHui from '@/components/Home/YouHui/YouHui'
import HaiTao from '@/components/Home/HaiTao/HaiTao'
import YuanChuang from '@/components/Home/YuanChuang/YuanChuang'

import Profile from '@/components/Profile/Profile'
import Category from '@/components/Category/Category'
import SearchView from '@/components/Category/SearchView'
import SearchResultView from '@/components/Category/SearchResultView'
import MallListView from '@/components/Category/MallListView'
import ForeignMallView from '@/components/Category/ForeignMallView'
import NativeMallView from '@/components/Category/NativeMallView'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      path: '/Home',
      component: Home,
      name: "Home",
      children: [
        {
          path: 'JingXuan',
          component: JingXuan,
          name:'JingXuan'
        },
        {
          path: 'YouHui',
          component:YouHui,
          name: 'YouHui'
        },
        {
          path: 'HaiTao',
          component:HaiTao,
          name: 'HaiTao'
        },
        {
          path: 'FaXian',
          component: FaXian,
          name: 'FaXian'
        },
        {
          path: 'YuanChuang',
          component: YuanChuang,
          name: 'YuanChuang'
        }
      ]
    },
    {
      path: '/Profile',
      component: Profile,
      name: 'Profile'
    },
    {
      path: '/Category',
      component: Category,
      name:'Category',
      children: [
        {path: 'SearchView',component: SearchView,name: 'searchView'},
        {path: 'SearchResultView',component: SearchResultView,name: 'SearchResultView'},
        // {path: 'ForeignMallView',component: ForeignMallView,name:"ForeignMallView"},
        // {path: 'NativeMallView',component: NativeMallView,name:"NativeMallView"},
        // {path: 'MallListView',component: MallListView,name:"MallListView"}
        {
          path: 'mallList',
          components : {
             default: MallListView,
             foreign: ForeignMallView,
             navtive: NativeMallView
          }
        }
      ]
    }
  ]
})

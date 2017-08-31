import Vue from 'vue'
import Router from 'vue-router'
import Sample1 from '@/components/Sample1'
import Sample2 from '@/components/Sample2'
import AddNoti from '@/components/AddNoti'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sample1',
      name: 'Sample1',
      component: Sample1
    },
    {
      path: '/sample2',
      name: 'Sample2',
      component: Sample2
    },
    {
      path: '/',
      name: 'AddNoti',
      component: AddNoti
    }
  ]
})

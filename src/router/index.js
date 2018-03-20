import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Person from '@/components/Person'
import Publish from '@/components/Publish'
import Msg from '@/components/Msg'
import Content from '@/components/Content'
import Other from '@/components/Other'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/person',
      name: 'person',
      component: Person
    },
    {
      path: '/msg',
      name: 'msg',
      component: Msg
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish
    },
    {
      path: '/content',
      name: 'content',
      component: Content
    },
    {
      path: '/other',
      name: 'other',
      component: Other
    },
  ]
})

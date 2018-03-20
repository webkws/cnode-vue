import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
// import Person from '@/components/Person'
// import Publish from '@/components/Publish'
// import Msg from '@/components/Msg'
// import Content from '@/components/Content'
// import Other from '@/components/Other'

const Home = r => require.ensure([], () => r(require('@/components/home')), 'home')
const Person = r => require.ensure([], () => r(require('@/components/Person')), 'Person')
const Publish = r => require.ensure([], () => r(require('@/components/Publish')), 'Publish')
const Msg = r => require.ensure([], () => r(require('@/components/Msg')), 'Msg')
const Content = r => require.ensure([], () => r(require('@/components/Content')), 'Content')
const Other = r => require.ensure([], () => r(require('@/components/Other')), 'Other')

Vue.use(Router)

export default new Router({
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
    } else {
        return { x: 0, y: 0 }
    }
  },
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

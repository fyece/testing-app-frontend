import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import ProfileView from '@/views/ProfileView.vue'
import GroupView from '@/views/GroupView.vue'
import GroupsListView from '@/views/GroupsListView.vue'
import TestView from '@/views/TestView.vue'
import TestsListView from '@/views/TestsListView.vue'
import CreateTestView from '@/views/CreateTestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/tests'
    },
    {
      path: '/tests',
      name: 'tests',
      component: TestsListView
    },
    {
      path: '/tests/new',
      name: 'create-test',
      component: CreateTestView
    },
    {
      path: '/tests/:id',
      name: 'test',
      component: TestView
    },
    {
      path: '/groups',
      name: 'groups',
      component: GroupsListView
    },
    {
      path: '/groups/:id',
      name: 'group',
      component: GroupView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { hideSidebar: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      meta: { hideSidebar: true }
    }
  ]
})

export default router

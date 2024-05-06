import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import StatsView from '@/views/StatsView.vue'
import GroupInfoView from '@/views/GroupInfoView.vue'
import GroupsListView from '@/views/GroupsListView.vue'
import TestView from '@/views/TestView.vue'
import TestsListView from '@/views/TestsListView.vue'
import UsersListView from '@/views/UsersListView.vue'
import TestEditorView from '@/views/TestEditorView.vue'
import UserInfoView from '@/views/UserInfoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/tests',
      meta: {
        title: 'Тестирование работников'
      }
    },
    {
      path: '/tests',
      name: 'tests',
      component: TestsListView,
      meta: {
        title: 'Тесты'
      }
    },
    {
      path: '/tests/:id',
      name: 'test-info',
      component: TestEditorView,
      meta: {
        title: 'Тест'
      }
    },
    {
      path: '/tests/new',
      name: 'create-test',
      component: TestEditorView,
      meta: {
        title: 'Создание теста'
      }
    },
    {
      path: '/tests/:id',
      name: 'test',
      component: TestView,
      meta: {
        title: 'Тест'
      }
    },
    {
      path: '/users',
      name: 'users',
      component: UsersListView,
      meta: {
        title: 'Сотрудники'
      }
    },
    {
      path: '/users/:id',
      name: 'user-info',
      component: UserInfoView,
      meta: {
        title: 'Сотрудник'
      }
    },
    {
      path: '/groups',
      name: 'groups',
      component: GroupsListView,
      meta: {
        title: 'Группы'
      }
    },
    {
      path: '/groups/:id',
      name: 'group-info',
      component: GroupInfoView,
      meta: {
        title: 'Группа'
      }
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView,
      meta: {
        title: 'Статистика'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Войти',
        hideSidebar: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router

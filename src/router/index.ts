import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import StatsView from '@/views/StatsView.vue'
import GroupInfoView from '@/views/GroupInfoView.vue'
import GroupsListView from '@/views/GroupsListView.vue'
import TestsListView from '@/views/TestsListView.vue'
import UsersListView from '@/views/UsersListView.vue'
import TestEditorView from '@/views/TestEditorView.vue'
import UserInfoView from '@/views/UserInfoView.vue'
import UserTestsListView from '@/views/UserTestsListView.vue'
import TestInfoView from '@/views/TestInfoView.vue'
import TestView from '@/views/TestView.vue'
import StatsUserView from '@/views/StatsUserView.vue'
import ResultsView from '@/views/ResultsView.vue'

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
      component: () => {
        if (localStorage.getItem('role') === 'ADMIN') {
          return TestsListView
        }
        return UserTestsListView
      },
      meta: {
        title: 'Тесты'
      }
    },
    {
      path: '/tests/:id',
      name: 'test-info',
      component: () => {
        if (localStorage.getItem('role') === 'ADMIN') {
          return TestInfoView
        }
        return TestView
      },
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
      component: () => {
        if (localStorage.getItem('role') === 'ADMIN') {
          return StatsView
        }
        return StatsUserView
      },
      meta: {
        title: 'Статистика'
      }
    },
    {
      path: '/results',
      name: 'results',
      component: ResultsView,
      meta: {
        title: 'Результаты'
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

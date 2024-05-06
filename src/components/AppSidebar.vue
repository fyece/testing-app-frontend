<template>
  <aside
    v-if="showSidebar"
    class="flex-shrink-0 overflow-y-auto w-60 bg-white p-8 border-r border-gray-200"
  >
    <div class="mb-8">
      <img src="../assets/logo.svg" alt="logo" />
    </div>
    <nav>
      <ul class="text-lg space-y-2 font-semibold text-gray-500">
        <li v-for="route in navRoutes" :key="route.path">
          <RouterLink :to="route.path" class="text-md font-semibold" activeClass="text-gray-800">{{
            route.name
          }}</RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const ADMIN_ROUTES = [
  {
    name: 'Статистика',
    path: '/stats'
  },
  {
    name: 'Тесты',
    path: '/tests'
  },
  {
    name: 'Сотрудники',
    path: '/users'
  },
  {
    name: 'Группы',
    path: '/groups'
  },
  {
    name: 'Выход',
    path: '/login'
  }
]

const USER_ROUTES = [
  {
    name: 'Тесты',
    path: '/tests'
  },
  {
    name: 'Статистика',
    path: '/stats'
  },
  {
    name: 'Выход',
    path: '/login'
  }
]

const userRole = 'admin'
const navRoutes = computed(() => (userRole === 'admin' ? ADMIN_ROUTES : USER_ROUTES))

const route = useRoute()
const showSidebar = computed(() => {
  return !route.meta.hideSidebar
})
</script>

<style scoped></style>

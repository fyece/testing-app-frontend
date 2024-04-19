<template>
  <div class="h-screen flex">
    <aside
      v-if="showSidebar"
      class="flex-shrink-0 overflow-y-auto w-60 bg-white p-8 border-r border-gray-200"
    >
      <p class="mb-8 text-lg font-semibold text-green-600">Logo Name</p>
      <nav>
        <ul class="text-lg font-semibold text-gray-500">
          <li>
            <RouterLink to="/tests" class="text-md font-semibold" activeClass="text-gray-800"
              >Тесты</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/groups" class="text-md font-semibold" activeClass="text-gray-800"
              >Группы</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/profile" class="text-md font-semibold" activeClass="text-gray-800"
              >Профиль</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/login" class="text-md font-semibold" activeClass="text-gray-800"
              >Выход</RouterLink
            >
          </li>
        </ul>
      </nav>
    </aside>
    <main class="flex-1 overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const showSidebar = computed(() => {
  console.log(route.meta)
  return !route.meta.hideSidebar
})
</script>

<style scoped></style>

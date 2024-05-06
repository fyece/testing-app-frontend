<template>
  <div class="flex flex-col">
    <div class="table-header flex h-20 text-gray-400 border-b">
      <div class="flex items-center p-5 w-6/12 h-full font-semibold">Пользователь</div>
      <div class="flex items-center p-5 w-3/12 h-full font-semibold">Пройдено тестов</div>
      <div class="flex items-center p-5 w-3/12 h-full font-semibold">Средний результат</div>
    </div>
    <div class="table-content flex flex-col">
      <div v-for="user in props.users" :key="user.id" class="flex border-b">
        <div class="p-5 w-6/12 items-center text-left font-medium text-blue-500">
          <RouterLink :to="{ name: 'user-info', params: { id: user.id } }">
            {{ user.fullName }}
          </RouterLink>
        </div>

        <div class="p-5 w-3/12 items-center text-left font-medium">
          {{ user.testsPassed }} из {{ user.testsTotal }}
        </div>
        <div class="p-5 w-3/12 items-center text-left font-medium">
          {{ user.averageResultPercent }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  users: any[]
}

const props = defineProps<Props>()
</script>

<style scoped></style>

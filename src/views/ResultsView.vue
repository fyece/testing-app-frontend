<script setup lang="ts"></script>

<template>
  <section class="p-4 flex flex-col items-center h-full rounded-xl bg-white">
    <h2 class="text-4xl mb-5 font-semibold">Результаты тестирования</h2>
    <div class="flex gap-4 mb-8">
      <div class="flex items-center bg-gray-100 py-2 px-4 rounded-md">
        <span class="inline-block mr-2 text-gray-500">Пользователь: </span>
        <span class="inline-block text-gray-500 font-semibold">Имя Фамилия</span>
      </div>
      <div class="flex items-center bg-gray-100 py-2 px-4 rounded-md">
        <span class="inline-block mr-2 text-gray-500">Тест: </span>
        <span class="inline-block text-gray-500 font-semibold"
          >Тест для сотрудников отдела продаж</span
        >
      </div>
    </div>

    <div class="flex gap-4 mb-8">
      <div class="flex flex-col gap-2 justify-center border p-6 w-56 h-36 rounded-md">
        <p class="text-md font-medium text-gray-500">Статус</p>
        <p class="text-3xl font-semibold text-gray-900">Пройден</p>
      </div>
      <div class="flex flex-col gap-2 justify-center border p-6 w-56 h-36 rounded-md">
        <p class="text-md font-medium text-gray-500">Набрано балов</p>
        <p class="text-3xl font-semibold text-gray-900">27 / 30</p>
      </div>
      <div class="flex flex-col gap-2 justify-center border p-6 w-56 h-36 rounded-md">
        <p class="text-md font-medium text-gray-500">Результат</p>
        <p class="text-3xl font-semibold text-gray-900">90 %</p>
      </div>
    </div>
    <div>
      <button class="h-10 py-2 px-12 bg-slate-50 border rounded-md font-semibold text-gray-700">
        Вернуться к тестам
      </button>
    </div>
  </section>
</template>

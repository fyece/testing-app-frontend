<template>
  <div class="relative">
    <button
      id="dropdownDefaultButton"
      data-dropdown-toggle="dropdown"
      class="text-black bg-white border hover:bg-neutral-50 focus:outline-none font-medium rounded-lg text-xs px-5 py-2 h-8 text-center inline-flex items-center"
      type="button"
      @click="toggleShowOptions()"
    >
      <slot></slot>
      <svg
        class="w-2.5 h-2.5 ms-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div
      v-if="isShowOptions"
      id="dropdown"
      class="absolute z-10 mt-1 bg-white border divide-y divide-gray-100 rounded-lg shadow w-44"
      @click="toggleShowOptions()"
    >
      <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
        <slot name="dropdown"></slot>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isShowOptions = ref(false)

const toggleShowOptions = () => {
  isShowOptions.value = !isShowOptions.value
}
</script>

<style scoped></style>

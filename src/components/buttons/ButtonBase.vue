<template>
  <button
    :type="type"
    class="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center"
    :class="{
      'bg-blue-700 hover:bg-blue-800': color === 'blue',
      'bg-gray-700 hover:bg-gray-800': color === 'gray',
      'bg-green-700 hover:bg-green-800': color === 'green',
      'px-4 py-2 text-xs': size === 'xs',
      'px-5 py-2 text-sm': size === 'sm',
      'px-6 py-2.5 text-base': size === 'md',
      'px-6 py-3 text-base': size === 'lg',
      'px-8 py-3.5 text-base': size === 'xl',
      'w-full': width === 'full',
      'w-fit': width === 'fit'
    }"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset'
  color?: 'blue' | 'gray' | 'green'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  width?: 'full' | 'fit'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  color: 'gray',
  size: 'sm',
  width: 'fit'
})
</script>

<style scoped></style>

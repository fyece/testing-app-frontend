<template>
  <div >
    <div v-for="(option, index) in options" :key="option.value" @click="selectOption(index)">
      <input
        type="radio"
        :id="option.name"
        :name="option.name"
        :value="option.value"
        v-model="picked"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500focus:ring-2"
      />
      <label class="ms-2 text-sm font-medium text-gray-900" :for="option.name">{{
        option.text
      }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Option {
  name: string
  text: string
  value: any
}

interface Props {
  options: Option[]
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const picked = defineModel<Option | null>('picked')


    const selectOption = (index: number) => {
      if (picked.value === props.options[index]) {
        picked.value = null;
      } else {
        picked.value = props.options[index];
      }
    };
</script>

<style scoped></style>

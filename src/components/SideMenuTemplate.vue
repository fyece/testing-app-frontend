<template>
  <div class="p-4 flex gap-3 h-full">
    <section class="p-4 w-96 shrink-0 overflow-hidden rounded-xl bg-white">
      <slot name="aside"></slot>
    </section>
    <section class="p-4 flex flex-col gap-4 rounded-xl w-full rounded-x bg-white">
      <slot name="main"></slot>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

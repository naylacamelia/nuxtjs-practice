<template>
  <div
    class="mb-10 flex items-center gap-8 border-b border-gray-200 dark:border-gray-800"
  >
    <button
      v-for="tab in tabs"
      :key="tab"
      class="border-b-2 py-4 text-sm transition"
      :class="
        modelValue === tab
          ? 'border-black font-semibold text-black dark:border-white dark:text-white'
          : 'border-transparent text-gray-500 hover:text-black dark:hover:text-white'
      "
      @click="$emit('update:modelValue', tab)"
    >
      {{ tab }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits([
  'update:modelValue'
])

const tabs = [
  'All',
  'Boards'
]
</script>
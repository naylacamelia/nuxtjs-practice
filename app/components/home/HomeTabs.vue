<template>
  <nav class="flex items-center gap-2 rounded-full bg-gray-100 p-1.5 dark:bg-gray-900">
    <!-- Tab list: pill style -->
    <button
      v-for="tab in tabs"
      :key="tab"
      type="button"
      class="relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300"
      :class="
        modelValue === tab
          ? 'bg-gray-900 text-white shadow-sm dark:bg-white dark:text-gray-900'
          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/60 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700'
      "
      @click="$emit('update:modelValue', tab)"
    >
      <span>{{ tab }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [tab: string]
}>()

const tabs = [
  'For You',
  'Featured',
  'Trending',
  'Latest'
]
</script>
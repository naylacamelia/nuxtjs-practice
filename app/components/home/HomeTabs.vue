<template>
  <nav class="mb-8 border-b border-gray-200 dark:border-gray-800">
    <div class="flex gap-8">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="border-b-2 pb-3 text-sm transition"
        :class="
          modelValue === tab
            ? 'border-black font-medium text-black dark:border-white dark:text-white'
            : 'border-transparent text-gray-500 hover:text-black dark:hover:text-white'
        "
        @click="$emit('update:modelValue', tab)"
      >
        {{ tab }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits(['update:modelValue'])

const tabs = [
  'For You',
  'Following'
]
</script>
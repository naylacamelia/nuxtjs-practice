<template>
  <div class="mb-8 flex items-center justify-between border-b border-[#CBD5E1]/80 dark:border-[#334155]/80">
    <div class="flex gap-6">
      <button
        v-for="tab in tabs"
        :key="tab"
        type="button"
        class="relative py-3.5 text-sm font-medium transition-colors"
        :class="
          modelValue === tab
            ? 'text-[#334155] dark:text-[#F1F5F9] font-semibold'
            : 'text-[#64748B] hover:text-[#334155] dark:text-[#94A3B8] dark:hover:text-[#F1F5F9]'
        "
        @click="$emit('update:modelValue', tab)"
      >
        <span>{{ tab }}</span>
        <span
          v-if="modelValue === tab"
          class="absolute inset-x-0 bottom-0 h-0.5 bg-[#5B8C9C] dark:bg-[#7BAAB9]"
        />
      </button>
    </div>

    <span class="hidden font-mono text-xs text-[#94A3B8] sm:inline">
      Personal Archive
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [tab: string]
}>()

const tabs = [
  'All Dispatches',
  'Curated Collections'
]
</script>
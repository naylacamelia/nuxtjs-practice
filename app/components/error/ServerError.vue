<template>
  <div class="text-center py-12">
    <div class="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
      <UIcon
        name="i-lucide-server-crash"
        class="size-7"
      />
    </div>

    <h1 class="font-sans text-3xl font-bold text-[#334155] dark:text-[#F1F5F9]">
      Server communication issue
    </h1>

    <p class="mx-auto mt-2 max-w-sm text-sm text-[#64748B] dark:text-[#94A3B8]">
      {{ error?.statusMessage || 'An unexpected error occurred while processing the request.' }}
    </p>

    <button
      type="button"
      class="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#5B8C9C] px-5 py-2.5 font-mono text-xs font-semibold text-white shadow-2xs transition hover:bg-[#4A7685] active:scale-[0.98]"
      @click="reloadNuxtApp()"
    >
      <UIcon name="i-lucide-rotate-cw" class="size-4" />
      <span>Retry Operation</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error?: NuxtError | any
}>()
</script>
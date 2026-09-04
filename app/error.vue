<template>
  <div class="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6 dark:bg-[#0F172A]">
    <div class="w-full max-w-md rounded-2xl border border-[#CBD5E1] bg-white p-8 shadow-soft dark:border-[#334155] dark:bg-[#1E293B]">
      <ErrorNotFound
        v-if="props.error?.statusCode === 404"
      />

      <ErrorServerError
        v-else
        :error="props.error"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()
</script>
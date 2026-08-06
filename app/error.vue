<template>
  <div class="flex min-h-screen items-center justify-center bg-white px-6 dark:bg-gray-950">
    <ErrorNotFound
      v-if="props.error.statusCode === 404"
    />

    <ErrorServerError
      v-else
      :error="props.error"
    />

    <div class="fixed bottom-8 left-1/2 -translate-x-1/2">
      <UButton
        icon="i-lucide-house"
        size="lg"
        @click="handleError"
      >
        Back to Home
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const handleError = () => {
  clearError({
    redirect: '/'
  })
}
</script>
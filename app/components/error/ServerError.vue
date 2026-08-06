<template>
  <div class="text-center">
    <UIcon
      name="i-lucide-server-crash"
      class="mx-auto size-20 text-red-400"
    />

    <h1 class="mt-6 text-3xl font-bold">
      Something went wrong
    </h1>

    <p class="mt-3 text-gray-500">
      {{ error.statusMessage }}
    </p>

    <UButton
      class="mt-8"
      @click="reloadNuxtApp()"
    >
      Reload
    </UButton>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()
</script>
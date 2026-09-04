<template>
  <div
    v-if="mode === 'page'"
    class="flex flex-col items-center justify-center py-24 px-4 text-center"
  >
    <span class="rounded-full bg-gray-100 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-gray-700 dark:bg-gray-800 dark:text-gray-300">
      Feature In Development
    </span>

    <h2 class="mt-6 font-sans text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
      {{ title }}
    </h2>

    <p class="mt-4 max-w-lg text-base text-gray-500 dark:text-gray-400 leading-relaxed">
      {{ description }}
    </p>

    <div v-if="showBack" class="mt-8">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-2.5 font-sans text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 hover:scale-105 active:scale-[0.98]"
      >
        <UIcon name="i-lucide-arrow-left" class="size-4" />
        <span>Return Home</span>
      </NuxtLink>
    </div>
  </div>

  <!-- Modal / Dialog Mode -->
  <UModal v-model:open="isOpen" :ui="{ wrapper: 'rounded-3xl' }">
    <template #content>
      <div class="p-8 text-center">
        <div
          class="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
        >
          <UIcon :name="icon" class="size-6" />
        </div>

        <h3 class="font-sans text-xl font-bold text-gray-900 dark:text-gray-50">
          {{ title }}
        </h3>

        <p class="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {{ description }}
        </p>

        <div class="mt-8 flex justify-center">
          <button
            type="button"
            class="rounded-full bg-gray-900 px-8 py-2.5 font-sans text-sm font-semibold text-white transition hover:bg-gray-800 hover:scale-105 active:scale-[0.98]"
            @click="isOpen = false"
          >
            Understood
          </button>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    mode?: 'page' | 'modal'
    title?: string
    description?: string
    icon?: string
    showBack?: boolean
  }>(),
  {
    mode: 'modal',
    title: 'Feature in Development',
    description: 'We are crafting this capability for the best editorial experience. Stay tuned for updates!',
    icon: 'i-lucide-sparkles',
    showBack: false
  }
)

const isOpen = defineModel<boolean>('open', { default: false })
</script>
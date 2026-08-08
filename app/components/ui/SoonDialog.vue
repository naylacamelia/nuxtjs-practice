<template>
  <div
    v-if="mode === 'page'"
    class="flex flex-col items-center justify-center py-20 px-4 text-center"
  >

    <UBadge
      color="neutral"
      variant="soft"
      class="mb-3 rounded-full px-3 py-1 text-xs font-medium"
    >
      Coming Soon
    </UBadge>

    <h2 class="mt-8  xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
      {{ title }}
    </h2>

    <p class="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
      {{ description }}
    </p>

    <div v-if="showBack" class="mt-6">
<UButton
class="mt-8"
to="/"
>
Back Home
</UButton>

    </div>
  </div>

  <!-- Modal / Dialog Mode -->
  <UModal v-else v-model:open="isOpen">
    <template #content>
      <div class="p-6 text-center">
        <div
          class="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
        >
          <UIcon :name="icon" class="size-6 text-gray-700 dark:text-gray-300" />
        </div>

        <UBadge
          color="neutral"
          variant="soft"
          class="mb-2 rounded-full px-2.5 py-0.5 text-xs font-medium"
        >
          Coming Soon
        </UBadge>

        <h3 class="text-lg font-bold text-gray-900 dark:text-white">
          {{ title }}
        </h3>

        <p class="mt-2 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          {{ description }}
        </p>

        <div class="mt-6 flex justify-center">
          <UButton
            color="neutral"
            variant="solid"
            class="rounded-full px-6 text-xs font-medium"
            @click="isOpen = false"
          >
            Oke
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    mode?: 'page' | 'modal'
    title?: string
    description?: string
    icon?: string
    showBack?: boolean
  }>(),
  {
    mode: 'modal',
    title: 'Fitur Segera Hadir',
    description: 'Kami sedang menyiapkan fitur ini untuk pengalaman terbaikmu. Nantikan pembaruannya!',
    icon: 'i-lucide-sparkles',
    showBack: false
  }
)

const isOpen = defineModel<boolean>('open', { default: false })
</script>
<template>
  <UButton
    v-bind="$attrs"
    class="px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition font-normal border-none shadow-none ring-0 focus:ring-0"
  >
    <slot />
  </UButton>
</template>
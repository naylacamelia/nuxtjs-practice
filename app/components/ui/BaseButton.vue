<template>
  <button
    v-bind="$attrs"
    type="button"
    class="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-2.5 font-sans text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 hover:scale-105 active:scale-[0.98] disabled:opacity-50"
  >
    <slot />
  </button>
</template>
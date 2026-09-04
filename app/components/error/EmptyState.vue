<template>
  <div class="mx-auto flex max-w-md flex-col items-center justify-center rounded-2xl border border-dashed border-[#CBD5E1] bg-white/70 p-8 text-center dark:border-[#334155] dark:bg-[#1E293B]/40">
    <div class="mb-4 flex size-12 items-center justify-center rounded-2xl bg-[#E2E8F0] text-[#5B8C9C] dark:bg-[#0F172A] dark:text-[#7BAAB9]">
      <UIcon
        name="i-lucide-file-text"
        class="size-6"
      />
    </div>

    <h2 class="font-sans text-lg font-bold text-[#334155] dark:text-[#F1F5F9]">
      {{ title }}
    </h2>

    <p class="mt-1.5 text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed max-w-xs">
      {{ description }}
    </p>

    <div class="mt-5">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "No dispatches found"
  },
  description: {
    type: String,
    default: "Nothing to display at this time."
  }
})
</script>
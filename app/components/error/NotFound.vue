<template>
  <div class="text-center py-12">
    <div class="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#E2E8F0] text-[#5B8C9C] dark:bg-[#1E293B] dark:text-[#7BAAB9]">
      <UIcon
        name="i-lucide-file-question"
        class="size-7"
      />
    </div>

    <span class="font-mono text-xs uppercase tracking-widest text-[#5B8C9C] dark:text-[#7BAAB9]">404 Error</span>

    <h1 class="mt-2 font-sans text-3xl font-bold text-[#334155] dark:text-[#F1F5F9] sm:text-4xl">
      Dispatch not found
    </h1>

    <p class="mx-auto mt-2 max-w-sm text-sm text-[#64748B] dark:text-[#94A3B8]">
      The story or collection you are looking for does not exist or has been moved.
    </p>

    <NuxtLink
      to="/"
      class="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#5B8C9C] px-5 py-2.5 font-mono text-xs font-semibold text-white shadow-2xs transition hover:bg-[#4A7685] active:scale-[0.98]"
    >
      <UIcon name="i-lucide-arrow-left" class="size-4" />
      <span>Return to Dispatches</span>
    </NuxtLink>
  </div>
</template>
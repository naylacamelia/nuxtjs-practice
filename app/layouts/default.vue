<script setup lang="ts">
const mobileOpen = useState('sidebarMobile', () => false)
</script>

<template>
  <div class="flex min-h-screen bg-[#F8FAFC] text-[#334155] selection:bg-[#E2E8F0] selection:text-[#334155] dark:bg-[#0F172A] dark:text-[#F1F5F9]">
    <!-- Sidebar Navigation -->
    <LayoutSidebar />

    <!-- Main Content Stream -->
    <div class="flex min-w-0 flex-1 flex-col">
      <!-- Mobile Topbar / Masthead Header -->
      <header class="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#CBD5E1]/70 bg-[#F8FAFC]/90 px-4 backdrop-blur-md dark:border-[#334155]/70 dark:bg-[#0F172A]/90 sm:px-6 lg:hidden">
        <button
          type="button"
          class="flex size-9 items-center justify-center rounded-lg border border-[#CBD5E1] bg-white text-[#334155] shadow-2xs transition hover:bg-[#E2E8F0] dark:border-[#334155] dark:bg-[#1E293B] dark:text-[#F1F5F9] dark:hover:bg-[#334155]"
          aria-label="Open sidebar navigation"
          @click="mobileOpen = true"
        >
          <UIcon name="i-lucide-menu" class="size-5" />
        </button>

        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="flex size-7 items-center justify-center rounded-md bg-[#5B8C9C] text-white">
            <span class="font-sans text-xs font-bold tracking-tight">TB</span>
          </div>
          <span class="font-sans text-base font-bold tracking-tight text-[#334155] dark:text-[#F1F5F9]">Tech Blog</span>
        </NuxtLink>

        <UColorModeButton
          variant="ghost"
          color="neutral"
          square
          size="sm"
        />
      </header>

      <!-- Page Canvas -->
      <main class="min-w-0 flex-1 overflow-x-hidden">
        <slot />
      </main>
    </div>
  </div>
</template>
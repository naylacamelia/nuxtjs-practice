<script setup lang="ts">
const mobileOpen = useState('sidebarMobile', () => false)
</script>

<template>
  <div class="flex min-h-screen">
    <LayoutSidebar />

    <div class="flex min-w-0 flex-1 flex-col">
      <!-- Topbar: cuma muncul di mobile -->
      <header class="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800 lg:hidden">
        <UButton
          icon="i-lucide-menu"
          variant="ghost"
          color="neutral"
          square
          @click="mobileOpen = true"
        />

        <span class="text-lg font-bold">Tech Blog</span>

        <div class="w-8" />
      </header>

      <main class="min-w-0 flex-1 overflow-x-hidden">
        <slot />
      </main>
    </div>
  </div>
</template>
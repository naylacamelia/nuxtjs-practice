<template>
  <div
    v-if="mobileOpen"
    class="fixed inset-0 z-40 bg-black/40 lg:hidden"
    @click="mobileOpen = false"
  />

  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-gray-200 bg-white transition-transform duration-300 dark:border-gray-800 dark:bg-gray-950',
      'lg:sticky lg:top-0 lg:z-auto lg:translate-x-0 lg:transition-[width]',
      mobileOpen ? 'translate-x-0' : '-translate-x-full',
      collapsed ? 'lg:w-20' : 'lg:w-72'
    ]"
  >
    <div class="flex items-center justify-between border-b border-gray-200 px-5 py-5 dark:border-gray-800">
      <NuxtLink to="/" class="overflow-hidden" @click="mobileOpen = false">
        <span v-show="!collapsed" class="text-xl font-bold">
          Tech Blog
        </span>
      </NuxtLink>

      <UButton
        :icon="collapsed ? 'i-lucide-panel-left-open' : 'i-lucide-panel-left-close'"
        variant="ghost"
        color="neutral"
        square
        class="hidden lg:inline-flex"
        @click="collapsed = !collapsed"
      />

      <UButton
        icon="i-lucide-x"
        variant="ghost"
        color="neutral"
        square
        class="lg:hidden"
        @click="mobileOpen = false"
      />
    </div>

    <nav class="flex-1 overflow-y-auto px-4 py-6">
      <ul class="space-y-2">
        <li v-for="item in navigation" :key="item.label">
          <NuxtLink
            :to="item.to"
            class="flex items-center rounded-xl px-4 py-3 transition"
            active-class="bg-gray-100 dark:bg-gray-900"
            @click="mobileOpen = false"
          >
            <UIcon
              :name="item.icon"
              class="size-5 shrink-0"
            />

            <Transition name="fade">
              <span
                v-if="!collapsed"
                class="ml-3"
              >
                {{ item.label }}
              </span>
            </Transition>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="border-t border-gray-200 p-4 dark:border-gray-800">
      <UColorModeButton
        :label="collapsed ? '' : 'Theme'"
        block
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
const collapsed = useState('sidebar', () => false)
const mobileOpen = useState('sidebarMobile', () => false)

const navigation = [
  { label: 'Home', to: '/', icon: 'i-lucide-house' },
  { label: 'Library', to: '/library', icon: 'i-lucide-library' },
  { label: 'Explore', to: '/explore', icon: 'i-lucide-compass' },
  { label: 'About', to: '/about', icon: 'i-lucide-info' }
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: .15s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-6px);
}
</style>
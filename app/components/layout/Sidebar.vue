<template>
  <!-- Mobile Overlay -->
  <Transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="mobileOpen"
      class="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
      @click="mobileOpen = false"
    />
  </Transition>

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-800 dark:bg-gray-950',
      'lg:sticky lg:top-0 lg:z-auto lg:translate-x-0',
      mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full',
      collapsed ? 'lg:w-20' : 'w-72 lg:w-64 xl:w-72'
    ]"
  >
    <!-- Header / Brand -->
    <div class="flex h-24 items-center justify-between border-b border-gray-200 px-6 dark:border-gray-800">
      <NuxtLink to="/" class="group flex items-center gap-3 overflow-hidden" @click="mobileOpen = false">
        <div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white shadow-sm dark:bg-white dark:text-gray-900 transition-transform group-hover:scale-105">
          <UIcon name="i-lucide-square-terminal" class="size-5" />
        </div>

        <div v-show="!collapsed" class="flex flex-col">
          <span class="font-sans text-lg font-bold tracking-tight text-gray-900 transition-colors dark:text-white">
            Tech Blog
          </span>
          <span class="text-[10px] font-mono uppercase tracking-widest text-gray-500">
            The Tech Dispatch
          </span>
        </div>
      </NuxtLink>

      <!-- Desktop Collapse Toggle -->
      <button
        type="button"
        class="hidden size-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white lg:flex active:scale-[0.98]"
        :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="collapsed = !collapsed"
      >
        <UIcon
          :name="collapsed ? 'i-lucide-panel-left-open' : 'i-lucide-panel-left-close'"
          class="size-4.5"
        />
      </button>

      <!-- Mobile Close -->
      <button
        type="button"
        class="flex size-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white lg:hidden active:scale-[0.98]"
        @click="mobileOpen = false"
      >
        <UIcon name="i-lucide-x" class="size-5" />
      </button>
    </div>

    <!-- Navigation List -->
    <nav class="flex-1 overflow-y-auto px-4 py-8">
      <div v-if="!collapsed" class="mb-3 px-3 text-[11px] font-sans font-bold uppercase tracking-widest text-gray-400">
        Menu
      </div>

      <ul class="space-y-1.5">
        <li v-for="item in navigation" :key="item.label">
          <NuxtLink
            :to="item.to"
            class="group relative flex items-center rounded-full px-4 py-2.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            active-class="!bg-gray-900 !text-white dark:!bg-white dark:!text-gray-900 shadow-sm"
            @click="mobileOpen = false"
          >
            <UIcon
              :name="item.icon"
              class="size-5 shrink-0 transition-transform group-hover:scale-110"
            />

            <span
              v-if="!collapsed"
              class="ml-3 truncate tracking-tight font-sans"
            >
              {{ item.label }}
            </span>

            <span
              v-if="!collapsed && item.badge"
              class="ml-auto rounded-full bg-gray-200 px-2.5 py-0.5 text-[10px] font-sans font-semibold text-gray-900 dark:bg-gray-700 dark:text-white"
            >
              {{ item.badge }}
            </span>
          </NuxtLink>
        </li>
      </ul>

      <!-- Quick Topics Section -->
      <div v-if="!collapsed" class="mt-10">
        <div class="mb-3 px-3 text-[11px] font-sans font-bold uppercase tracking-widest text-gray-400">
          Topics
        </div>
        <ul class="space-y-1">
          <li v-for="topic in quickTopics" :key="topic.label">
            <NuxtLink
              :to="topic.to"
              class="group flex items-center justify-between rounded-full px-4 py-2 text-sm text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              @click="mobileOpen = false"
            >
              <span class="truncate">{{ topic.label }}</span>
              <span class="rounded-full bg-gray-100 px-2 py-0.5 font-sans text-[10px] font-medium text-gray-500 group-hover:bg-white dark:bg-gray-800 dark:text-gray-400 dark:group-hover:bg-gray-700">{{ topic.count }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Footer Controls -->
    <div class="border-t border-gray-200 p-6 dark:border-gray-800">
      <div class="flex items-center justify-between">
        <UColorModeButton
          :label="collapsed ? '' : 'Toggle Theme'"
          variant="ghost"
          color="neutral"
          class="w-full justify-start rounded-full px-4 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-all"
        />
      </div>

      <div v-if="!collapsed" class="mt-4 flex items-center justify-between px-4 text-xs font-sans text-gray-400">
        <span>© 2026 Tech Blog</span>
        <span class="inline-flex size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" title="System Online" />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
interface NavItem {
  label: string
  to: string
  icon: string
  badge?: string
}

const collapsed = useState('sidebar', () => false)
const mobileOpen = useState('sidebarMobile', () => false)

const navigation: NavItem[] = [
  { label: 'Home Feed', to: '/', icon: 'i-lucide-newspaper' },
  { label: 'Explore Topics', to: '/explore', icon: 'i-lucide-compass' },
  { label: 'My Library', to: '/library', icon: 'i-lucide-bookmark' },
  { label: 'About Journal', to: '/about', icon: 'i-lucide-book-open' }
]

const quickTopics = [
  { label: 'Artificial Intelligence', to: '/explore', count: '16' },
  { label: 'Frontend Engineering', to: '/explore', count: '12' },
  { label: 'Nuxt Ecosystem', to: '/explore', count: '08' },
  { label: 'Career & Tech Life', to: '/explore', count: '05' }
]
</script>
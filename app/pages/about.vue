<template>
  <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 w-full overflow-x-hidden">
    <!-- Editorial About Header -->
    <header class="about-hero mb-24 text-center">
      <div class="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <span>Our Manifesto</span>
      </div>
      <h1 class="mt-6 font-sans text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
        About Tech Blog<br>& The Tech Dispatch
      </h1>
      <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
        An independent digital publication and knowledge platform crafted for engineers, software architects, and tech enthusiasts.
      </p>
    </header>

    <!-- Mission & Core Values Section -->
    <section class="about-section space-y-20">
      <!-- Bento Trio -->
      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="(value, i) in coreValues"
          :key="value.title"
          class="about-card group rounded-3xl border border-gray-100 bg-gray-50 p-10 transition-all duration-500 hover:bg-gray-100 hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:bg-gray-800"
        >
          <div
            class="mb-6 flex size-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
            :class="i === 1 ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'"
          >
            <UIcon :name="value.icon" class="size-6" />
          </div>
          <h2 class="font-sans text-xl font-bold text-gray-900 dark:text-white">
            {{ value.title }}
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {{ value.description }}
          </p>
        </div>
      </div>

      <!-- Extended Prose -->
      <div class="about-prose rounded-3xl border border-gray-100 bg-gray-50 p-12 dark:border-gray-800 dark:bg-gray-900/50">
        <h2 class="font-sans text-3xl font-bold text-gray-900 dark:text-white">
          The Purpose Behind The Publication
        </h2>
        <div class="mt-6 space-y-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
          <p>
            We created this platform to cut through the noise of algorithmically generated content. By blending refined editorial aesthetics with the technical rigor demanded by senior engineers, we aim to provide an inspiring home for high-quality software writing.
          </p>
          <p>
            Whether you are exploring cutting-edge AI architectures, deep-diving into Vue 3 & Nuxt reactivity, or refining your career trajectory, every dispatch here is structured for clarity, actionable depth, and typographic beauty.
          </p>
        </div>
      </div>

      <!-- Featured Authors -->
      <div class="about-authors">
        <div class="mb-10 flex items-center justify-between border-b border-gray-200 pb-6 dark:border-gray-800">
          <h2 class="font-sans text-3xl font-bold text-gray-900 dark:text-white">
            Featured Contributors
          </h2>
          <span class="rounded-full bg-gray-100 px-4 py-1.5 font-sans text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">Core Writers</span>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="author in authors"
            :key="author.name"
            class="author-card group rounded-3xl border border-gray-100 bg-gray-50 p-8 text-center transition-all duration-500 hover:bg-gray-100 hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:bg-gray-800"
          >
            <UAvatar
              :src="author.avatar"
              :alt="author.name"
              size="xl"
              class="mx-auto mb-5 ring-4 ring-white shadow-sm dark:ring-gray-900"
            />
            <h3 class="font-sans text-base font-bold text-gray-900 dark:text-white">
              {{ author.name }}
            </h3>
            <p class="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              {{ author.role }}
            </p>
            <span class="mt-3 inline-flex rounded-full bg-gray-200 px-3 py-1 font-sans text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              {{ author.articles }} articles
            </span>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="about-cta rounded-3xl bg-gray-900 p-16 text-center dark:bg-white">
        <h2 class="font-sans text-4xl font-bold text-white dark:text-gray-900">
          Ready to explore?
        </h2>
        <p class="mx-auto mt-4 max-w-lg text-base text-gray-400 dark:text-gray-600">
          Browse our curated collection of articles and start your engineering journey today.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <NuxtLink
            to="/explore"
            class="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-sans text-sm font-semibold text-gray-900 transition hover:bg-gray-100 hover:scale-105 active:scale-[0.98] dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
          >
            Explore Topics <UIcon name="i-lucide-arrow-up-right" class="size-4" />
          </NuxtLink>
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-sans text-sm font-semibold text-white transition hover:bg-white/10 hover:scale-105 active:scale-[0.98] dark:border-gray-900/20 dark:text-gray-900 dark:hover:bg-gray-900/10"
          >
            Back to Home
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const coreValues = [
  {
    title: 'Distraction-Free',
    icon: 'i-lucide-book-open',
    description: 'Clean typography, deliberate whitespace, and minimal UI elements so you can focus entirely on technical insights.'
  },
  {
    title: 'Engineered with Nuxt',
    icon: 'i-lucide-code-xml',
    description: 'Powered by Nuxt 4, Nitro server engine, Cloudflare D1 SQL, and Drizzle ORM for lightning-fast edge performance.'
  },
  {
    title: 'Open Knowledge',
    icon: 'i-lucide-users',
    description: 'Empowering developers to exchange constructive perspectives via interactive discussions and curated collections.'
  }
]

const authors = [
  {
    name: 'Dina Arisandi',
    role: 'Lead Frontend Architect',
    articles: '24',
    avatar: 'https://i.pravatar.cc/120?img=5'
  },
  {
    name: 'Budi Santoso',
    role: 'Principal Systems Engineer',
    articles: '18',
    avatar: 'https://i.pravatar.cc/120?img=12'
  },
  {
    name: 'Sarah Jenkins',
    role: 'Director of AI Research',
    articles: '15',
    avatar: 'https://i.pravatar.cc/120?img=9'
  },
  {
    name: 'Alex Rivera',
    role: 'Cloud & Infrastructure',
    articles: '11',
    avatar: 'https://i.pravatar.cc/120?img=3'
  }
]

useSeoMeta({
  title: 'About the Journal · Tech Blog',
  description: 'Learn more about the mission, architecture, and editorial team behind Tech Blog.'
})

onMounted(() => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger)

    // Hero Entry
    const heroTl = gsap.timeline()
    heroTl.fromTo('.about-hero > *',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
    )

    // Core Values stagger
    gsap.fromTo('.about-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-card',
          start: 'top 85%'
        }
      }
    )

    // Prose reveal
    gsap.fromTo('.about-prose',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-prose',
          start: 'top 85%'
        }
      }
    )

    // Authors stagger
    gsap.fromTo('.author-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.author-card',
          start: 'top 85%'
        }
      }
    )

    // CTA reveal
    gsap.fromTo('.about-cta',
      { opacity: 0, scale: 0.97 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-cta',
          start: 'top 85%'
        }
      }
    )
  }
})
</script>
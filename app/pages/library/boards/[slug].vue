<template>
  <main
    class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8"
  >
 

    <!-- Header -->

    <div class="mt-8 flex flex-col gap-6 md:flex-row md:items-center">

      <NuxtImg
        :src="board.cover"
        class="h-36 w-full rounded-2xl object-cover md:w-64"
      />

      <div>

        <h1 class="text-4xl font-bold">
          {{ board.name }}
        </h1>

        <p class="mt-3 text-gray-500">
          {{ board.description }}
        </p>

        <div
          class="mt-5 flex items-center gap-4"
        >
          <UBadge
            color="neutral"
            variant="soft"
          >
            {{ board.articles.length }} Articles
          </UBadge>

          <span class="text-sm text-gray-500">
            Updated today
          </span>

        </div>

      </div>

    </div>

    <!-- Divider -->

    <UDivider class="my-10" />

    <!-- Articles -->

    <section>

      <ArticleListItem
        v-for="post in board.articles"
        :key="post.id"
        :post="post"
      />

    </section>

  </main>
</template>

<script setup lang="ts">
interface Post{
  id:number
  userId:number
  title:string
  body:string
}

const route = useRoute()

const { data } = await useFetch<Post[]>(
'https://jsonplaceholder.typicode.com/posts',
{
    default:()=>[],
    transform:data=>data.slice(0,10)
}
)

const boards = {
    frontend:{
        name:'Frontend',
        cover:'https://picsum.photos/seed/frontend/1200/500',
        description:'Articles about Vue, React, CSS and UI Engineering.'
    },

    nuxt:{
        name:'Nuxt',
        cover:'https://picsum.photos/seed/nuxt/1200/500',
        description:'Everything related to Nuxt ecosystem.'
    },

    ai:{
        name:'Artificial Intelligence',
        cover:'https://picsum.photos/seed/ai/1200/500',
        description:'Machine Learning and Generative AI.'
    },

    career:{
        name:'Career',
        cover:'https://picsum.photos/seed/career/1200/500',
        description:'Career tips and software engineering.'
    }
}



const current =
boards[
route.params.slug as keyof typeof boards
]

const board = {
    ...current,
    articles:data.value
}

useSeoMeta({
title:`${board.name} Board`
})

if(!board){

throw createError({

statusCode:404,

statusMessage:"Board not found."

})

}
</script>
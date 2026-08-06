<template>
<div
class="py-24 text-center"
>

<UIcon
name="i-lucide-folder-open"
class="mx-auto size-16 text-gray-300"
/>

<h2
class="mt-5 text-xl font-semibold"
>
{{ title }}
</h2>

<p
class="mt-2 text-gray-500"
>
{{ description }}
</p>

</div>
</template>

<script setup lang="ts">

defineProps({

title:{
type:String,
default:"No data"
},

description:{
type:String,
default:"Nothing here yet."
}

})

</script>
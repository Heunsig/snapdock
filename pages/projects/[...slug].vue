<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('projects').path(route.path).first()
})

useSeoMeta({
  title: `${page.value?.name} | SnapDock`,
  description: page.value?.description
})
</script>

<template>
  <div
    v-if="page"
    class="grid grid-cols-1 md:grid-cols-[70%_1fr] xl:grid-cols-[75%_1fr] gap-y-10 md:gap-y-8 md:gap-x-8"
  >
    <header class="row-start-1">
      <div class="grid grid-cols-[1.75rem_auto] md:grid-cols-[3rem_auto] items-center gap-x-3 gap-y-1 md:gap-x-5 md:gap-y-0">
        <NuxtImg
          :src="page.logo"
          :alt="`${page.name} logo`"
          class="md:row-span-2"
          width="48"
        />
        <h1 class="text-lg font-bold">{{ page.name }}</h1>
        <p class="col-span-2 md:col-span-1 md:col-start-2 text-sm dark:text-gray-300">{{ page.description }}</p>
        <div class="col-span-2 md:col-span-1 md:col-start-2 flex flex-wrap gap-2 mt-3">
          <span
            v-for="tag in page.tags"
            :key="tag"
            class="text-xs bg-gray-100 dark:bg-gray-800 rounded-md px-2 py-1"
          >
            #{{ tag }}
          </span>
        </div>
      </div>
    </header>
    <main class="row-start-3 md:row-start-2 prose dark:prose-invert max-w-none md:mt-8">
      <ContentRenderer 
        :value="page"
      />
    </main>
    <nav class="col-start-1 md:col-start-2 row-start-2 md:row-start-1 md:row-span-2 flex flex-wrap flex-row md:flex-col items-center md:items-start gap-1 md:gap-3 -ml-2 md:ml-0">
      <NuxtLink
        v-if="page.meta.homepage"
        :to="page.meta.homepage"
        target="_blank"
      >
        <UButton
          color="gray" 
          variant="link"
          icon="i-mdi-globe"
        >
          Homepage

          <template #trailing>
            <UIcon name="i-mdi-external-link" class="w-4 h-4"/>
          </template>
        </UButton>
      </NuxtLink>
      <NuxtLink
        v-if="page.meta.docker"
        :to="page.meta.docker"
        target="_blank"
      >
        <UButton
          color="gray" 
          variant="link"
          icon="i-mdi-docker"
        >
          Docker Guide

          <template #trailing>
            <UIcon name="i-mdi-external-link" class="w-4 h-4"/>
          </template>
        </UButton>
      </NuxtLink>
      <NuxtLink
        v-if="page.meta.github"
        :to="page.meta.github"
        target="_blank"
      >
        <UButton 
          color="gray" 
          variant="link"
          icon="i-mdi-github"
        >
          Github

          <template #trailing>
            <UIcon name="i-mdi-external-link" class="w-4 h-4"/>
          </template>
        </UButton>
      </NuxtLink>
      <NuxtLink
        v-if="page.meta.demo"
        :to="page.meta.demo"
        target="_blank"
      >
        <UButton 
          color="gray" 
          variant="link"
          icon="i-mdi-play-circle"
        >
          Live Demo

          <template #trailing>
            <UIcon name="i-mdi-external-link" class="w-4 h-4"/>
          </template>
        </UButton>
      </NuxtLink>
    </nav>
  </div>
  <div v-else>Home not found</div>
</template>
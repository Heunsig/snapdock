<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('projects').path(route.path).first()
})

useSeoMeta({
  title: `${page.value?.name} | SnapDock`,
  description: page.value?.description
})

const screenshots = computed(() => page.value?.screenshots ?? [])
const isOpen = ref(false)
const expandedImage = ref('')

function zoom(image: string) {
  isOpen.value = true
  expandedImage.value = image
}


const target = useTemplateRef('target')
onClickOutside(target, () => {
  expandedImage.value = ''
}, {
  ignore: ['.zoom-modal']
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
        <h1 class="text-lg font-bold" translate="no">{{ page.name }}</h1>
        <p class="col-span-2 md:col-span-1 md:col-start-2 text-sm dark:text-gray-300">{{ page.description }}</p>
        <div 
          v-if="page.tags && page.tags.length > 0 || page.demo"
          class="col-span-2 md:col-span-1 md:col-start-2 flex flex-wrap gap-2 mt-3"
        >
          <span
            v-for="tag in page.tags"
            :key="tag"
            class="text-xs bg-gray-100 dark:bg-gray-800 rounded-md px-2 py-1"
            translate="no"
          >
            #{{ tag }}
          </span>
          <span
            v-if="page.demo"
            class="text-xs bg-gray-100 dark:bg-gray-800 rounded-md px-2 py-1"
            translate="no"
          >
            #Live Demo
          </span>
          <span
            v-if="page.screenshots && page.screenshots.length > 0"
            class="text-xs bg-gray-100 dark:bg-gray-800 rounded-md px-2 py-1"
            translate="no"
          >
            #Screenshots
          </span>
        </div>
      </div>
    </header>
    <main class="row-start-3 md:row-start-2 prose dark:prose-invert max-w-none md:mt-8">
      <ContentRenderer 
        :value="page"
      />
    </main>
    <div class="col-start-1 md:col-start-2 row-start-2 md:row-start-1 md:row-span-2">
      <nav class="flex flex-wrap flex-row md:flex-col items-center md:items-start gap-1 md:gap-3 -ml-2 md:ml-0">
        <NuxtLink
          v-if="page.meta.homepage"
          :to="page.meta.homepage"
          target="_blank"
          translate="no"
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
          translate="no"
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
          translate="no"
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
          v-if="page.demo"
          :to="page.demo"
          target="_blank"
          translate="no"
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
      <div class="mt-4 md:ml-3" v-if="screenshots && screenshots.length > 0">
        <h2 class="text-base font-semibold mb-2">Screenshots ({{ screenshots.length }})</h2>
        <UCarousel 
          v-slot="{ item }" 
          :items="screenshots" 
          :ui="{ 
            container: 'gap-1',
            item: 'snap-align-none'
          }">
          <div class="p-1">
            <button
              ref="target"
              type="button"
              class="rounded-lg overflow-hidden outline-none hover:ring-2 ring-offset-2 ring-yellow-500 dark:ring-offset-gray-900 focus:ring-2"
              :class="{
                'ring-2': expandedImage === item
              }"
              @click="zoom(item)"
            >
              <NuxtImg
                :src="item" 
                class="w-full cursor-zoom-in" 
                sizes="110"
                draggable="false"
              />
            </button>
          </div>
        </UCarousel>
      </div>
    </div>
    
    <UModal 
      v-model="isOpen"
      :ui="{
        wrapper: 'zoom-modal',
        width: 'w-full sm:max-w-[600px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1200px]'
      }"
    >
      <NuxtImg
        :src="expandedImage"
        class="rounded-lg w-full"
        sizes="400px sm:600px md:1200px"
        loading="lazy"
      />
    </UModal>
  </div>
  <div v-else>Home not found</div>
</template>
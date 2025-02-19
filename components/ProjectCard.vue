<script setup lang="ts">
import WordHighlighter from "vue-word-highlighter";
defineProps<{
  query: string,
  project: {
    id: string,
    name: string,
    description: string,
    path: string,
    logo?: string,
    tags?: string[]
  }
}>()
</script>
<template>
  <article 
    class="relative dark:bg-gray-800 ring-1 dark:ring-gray-900 rounded-lg p-4 pb-5 border-t dark:border-gray-700 hover:dark:bg-slate-800 transition-all duration-150"
  >
    <div class="pb-4 flex items-center gap-3">
      <NuxtImg v-if="project.logo" :src="project.logo" :alt="`${project.name} logo`" width="28" />
      <h3 class="text-lg font-semibold text-gray-100" translate="no">
        <!-- inset makes the link full with and height to the card -->
        <NuxtLink :to="project.path" class="absolute inset-0"></NuxtLink>
        <WordHighlighter :query="query" translate="no">
        {{ project.name }}
        </WordHighlighter>
      </h3>
    </div>
    <div class="pt-0">
      <p class="dark:text-gray-300">
        <!-- 
          TODO: 
          "[Vue warn]: Extraneous non-props attributes (data-v-inspector) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes."
          Error is occured when using WordHighlighter in a component.
         -->
        <WordHighlighter :query="query">
          {{ project.description }}
        </WordHighlighter>
      </p>
    </div>
    
    <div 
      v-if="project.tags"
      class="pt-4 flex flex-wrap items-center gap-2"
    >
      <span class="text-sm dark:text-gray-400" v-for="tag in project.tags" translate="no">
        <WordHighlighter :query="query">
          #{{ tag }}
        </WordHighlighter>
      </span>
      
    </div>
  </article>
</template>

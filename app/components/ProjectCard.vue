<script setup lang="ts">
import WordHighlighter from "vue-word-highlighter";
import dayjs from "dayjs";

defineProps<{
  query: string,
  project: {
    id: string,
    name: string,
    description: string,
    path: string,
    logo?: string,
    tags?: string[],
    createdAt?: string,
    updatedAt?: string
  }
}>()

</script>
<template>
  <article 
    class="
      flex
      flex-col
      p-4
      pb-5
      relative
      bg-neutral-100
      dark:bg-gray-800
      ring-1
      ring-neutral-200
      dark:ring-gray-900
      border-t
      border-neutral-200
      dark:border-gray-700
      hover:bg-neutral-200
      hover:dark:bg-slate-800
      transition-all
      rounded-lg
      duration-150
    "
  >
    <div class="pb-4 flex items-center gap-3">
      <NuxtImg v-if="project.logo" :src="project.logo" :alt="`${project.name} logo`" width="28" />
      <h3 class="text-lg font-semibold text-neutral-800 dark:text-gray-100" translate="no">
        <!-- inset makes the link full with and height to the card -->
        <NuxtLink :to="project.path" class="absolute inset-0"></NuxtLink>
        <UPopover
          class="absolute top-3 right-2"
        >
          <UButton
            color="gray"
            variant="link"
            icon="i-mdi-information-outline"
          />

          <template #panel>
            <div 
              v-if="project.createdAt || project.updatedAt"
              class="p-2 space-y-1"
            >
              <div class="text-xs text-neutral-800 dark:text-gray-300 font-light" v-if="project.updatedAt">Updated At: {{ dayjs(project.updatedAt).format('YYYY/MM/DD') }}</div>
              <div class="text-xs text-neutral-800 dark:text-gray-300 font-light" v-if="project.createdAt">Created At: {{ dayjs(project.createdAt).format('YYYY/MM/DD') }}</div>
            </div>
            <div 
              v-else
              class="p-2 text-xs text-neutral-800 dark:text-gray-300"
            >
              No information available
            </div>
          </template>
        </UPopover>
       

        <WordHighlighter :query="query">
          {{ project.name }}
        </WordHighlighter>
      </h3>
    </div>
    <div class="pt-0">
      <p class="text-neutral-800 dark:text-gray-300">
        <WordHighlighter :query="query">
          {{ project.description }}
        </WordHighlighter>
      </p>
    </div>
    
    <div 
      v-if="project.tags && project.tags.length > 0" 
      class="pt-4 flex flex-wrap items-center gap-2"
    >
      <span class="text-sm text-neutral-600 dark:text-gray-400" v-for="tag in project.tags" translate="no">
        <WordHighlighter :query="query">
          #{{ tag }}
        </WordHighlighter>
      </span>
    </div>
  </article>
</template>


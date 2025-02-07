<script setup lang="ts">
  const props = defineProps<{
    project: {
      id: string,
      name: string,
      description: string,
      logo?: string
    }
  }>()
</script>
<template>
  <UCard
    :ui="{
      background: 'dark:bg-gray-800',
      header: {
         padding: 'px-4 py-4 pb-1'
      },
      body: {
        padding: 'px-4 py-4 pt-1'
      },
    }"
  >
  <template #header>
    <h2 class="text-base font-semibold">
      {{ project.name }}
    </h2>
  </template>

  <div>
    {{ project.description }}
  </div>
</UCard>
</template>

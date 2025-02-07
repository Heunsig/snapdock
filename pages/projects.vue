<script setup lang="ts">
const searchKeyword = ref('')
</script>

<template>
  <div>
    <div>
      <UInput 
        v-model="searchKeyword"
        icon="i-heroicons-magnifying-glass"
        placeholder="Search a project"
        color="gray"
        :ui="{
          rounded: 'rounded-sm',
          color: {
            gray: {
              outline: 'dark:focus:ring-yellow-500'
            },
          }
        }"
      />
    </div>
    <div class="grid grid-cols-1 gap-4 mt-4">
      <ProjectCard 
        :project="{
          id: '1',
          name: 'Project 1',
          description: 'This is a project description',
          logo: 'https://via.placeholder.com/150'
        }"
      />
    </div>
  </div>
</template>

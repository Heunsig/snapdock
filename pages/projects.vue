<script setup lang="ts">
const searchKeyword = ref('')
</script>

<template>
  <div>
    <div class="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
      <UInput 
        v-model="searchKeyword"
        icon="i-heroicons-magnifying-glass"
        placeholder="Search a project"
        color="gray"
        :ui="{
          icon: {
            leading: {
              padding: {
                '2xs': 'ps-4',
                xs: 'ps-4',
                sm: 'ps-4',
                md: 'ps-4',
                lg: 'ps-4',
                xl: 'ps-4'
              }
            }
          },
          leading: {
            padding: {
              '2xs': 'ps-12',
              xs: 'ps-12',
              sm: 'ps-12',
              md: 'ps-12',
              lg: 'ps-12',
              xl: 'ps-12'
            }
          },
          padding: {
            '2xs': 'py-3',
            xs: 'py-3',
            sm: 'py-3',
            md: 'py-3',
            lg: 'py-3',
            xl: 'py-3'
          },
          rounded: 'rounded-lg',
          color: {
            gray: {
              outline: 'dark:focus:ring-yellow-500'
            },
          }
        }"
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mt-8">
      <ProjectCard 
        :project="{
          id: '1',
          name: 'audiobookshelf',
          description: 'This is a project description',
          logo: '/assets/images/logos/audiobookshelf.png',
          tags: ['monitoring']
        }"
      />
      <ProjectCard 
        :project="{
          id: '2',
          name: 'Dozzle',
          description: 'This is a project description',
          logo: '/assets/images/logos/dozzle.svg',
          tags: ['self-hosted', 'cozy', 'book']
        }"
      />
      <ProjectCard 
        :project="{
          id: '3',
          name: 'Vikunja',
          description: 'This is a project description',
          logo: '/assets/images/logos/vikunja.svg',
          tags: ['greenish']
        }"
      />
    </div>
  </div>
</template>

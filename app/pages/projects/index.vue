<script setup lang="ts">
import dayjs from 'dayjs'
import githubStarsReport from '#shared/data/github-stars-report.json'

const { data } = await useAsyncData('navigation', async () => {
  const data = await queryCollection('projects').where('published', '=', true).all()

  const projects = data.map((project: any) => {
    const githubStars = githubStarsReport.projects.find((p) => p.file === `${project.path.split('/').pop()}.md`)
    return {
      ...project,
      stars: githubStars?.stars ?? 0
    }
  })

  return projects
})

const projects = computed(() => data.value ?? [])
const search = useRouteQuery('q', '', {
  route: useRoute()
})
const orderBy = useRouteQuery<string>('orderBy', 'updatedAt', { route: useRoute() })
const order = useRouteQuery<string>('order', 'desc', { route: useRoute() })

// TODO: remove this once we have a better way to get the tags
function getTags(project: any) {
  return [...(project.tags || []), project.demo ? 'Live Demo' : null, project.screenshots && project.screenshots.length > 0 ? 'Screenshots' : null].filter(Boolean)
}

const filteredProjects = computed(() => projects.value.filter((project: any) => {
  const searchTerm = search.value.toLowerCase()
  const tags = getTags(project)
  return project.name.toLowerCase().includes(searchTerm) || 
         (project.description && project.description.toLowerCase().includes(searchTerm)) ||
         (tags && tags.some((tag: string) => `#${tag.toLowerCase()}`.includes(searchTerm)))
}))

const sortedProjects = computed(() => {
  return filteredProjects.value.sort((a: any, b: any) => {
    if (orderBy.value === 'createdAt' || orderBy.value === 'updatedAt' || orderBy.value === 'stars') {
      return order.value === 'asc' ? dayjs(a[orderBy.value]).diff(dayjs(b[orderBy.value])) : dayjs(b[orderBy.value]).diff(dayjs(a[orderBy.value]))
    }

    return order.value === 'asc' ? a[orderBy.value].localeCompare(b[orderBy.value]) : b[orderBy.value].localeCompare(a[orderBy.value])
  })
})

function toggleOrder() {
  order.value = order.value === 'asc' ? 'desc' : 'asc'
}

const options = ref([{
  label: 'Name',
  value: 'name'
}, {
  label: 'Created At',
  value: 'createdAt'
}, {
  label: 'Updated At',
  value: 'updatedAt'
}, {
  label: 'Stars',
  value: 'stars'
}])

const isOpen = ref(false)

function openModal() {
  isOpen.value = true
}

function reset() {
  search.value = ''
  orderBy.value = 'updatedAt'
  order.value = 'desc'
}
</script>

<template>
  <div>
    <div class="text-sm mb-3 dark:text-gray-400">
      {{ filteredProjects.length }} / {{ projects.length }} projects
    </div>
    <div class="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
      <div class="flex items-center md:block">
        <UInput 
          v-model="search"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search a project"
          size="xl"
          variant="subtle"
          class="w-full"
          :ui="{
            leadingIcon: 'w-5 h-5'
          }"
        />
        <UButton 
          @click="() => openModal()"
          icon="i-heroicons-adjustments-horizontal-16-solid"
          color="neutral"
          variant="subtle"
          class="ml-2 md:hidden"
          square
          size="xl"
          :ui="{
            leadingIcon: 'w-5 h-5'
          }"
        />
          
        <UModal v-model:open="isOpen">
          <template #content>
            <UCard>
              <UButtonGroup 
                orientation="horizontal"
              >
                <UButton 
                  @click="() => toggleOrder()"
                  :icon="order === 'asc' ? 'i-heroicons-solid-sort-ascending' : 'i-heroicons-solid-sort-descending'"
                  color="neutral"
                  variant="subtle"
                  square
                  size="xl"
                  :ui="{
                    leadingIcon: 'w-5 h-5'
                  }"
                />
                
                <USelect 
                  v-model="orderBy" 
                  :items="options"
                  value-key="value"
                  label-key="label"
                  variant="subtle"
                  :ui="{
                    base: 'min-w-32',
                  }"
                  size="xl"
                >
                </USelect>
              </UButtonGroup>

              <template #footer>
                <div class="flex justify-end">
                  <UButton 
                    variant="ghost"
                    @click="() => reset()"
                    color="neutral"
                  >
                    Reset
                  </UButton>
                  <UButton 
                    variant="ghost"
                    @click="() => { isOpen = false }"
                    color="neutral"
                  >
                    Close
                  </UButton>
                </div>
              </template>
            </UCard>
          </template>
        </UModal>
      </div>
      <div class="hidden md:flex justify-end lg:col-span-2">
        <UButtonGroup 
          orientation="horizontal"
        >
          <UButton 
            @click="() => toggleOrder()"
            :icon="order === 'asc' ? 'i-heroicons-solid-sort-ascending' : 'i-heroicons-solid-sort-descending'"
            color="neutral"
            variant="subtle"
            size="xl"
            square
            :ui="{
              base: 'px-2.5',
              leadingIcon: 'w-5 h-5'
            }"
          />
          <USelect
            v-model="orderBy" 
            :items="options"
            value-key="value"
            label-key="label"
            :ui="{
              base: 'min-w-32',
            }"
            size="xl"
            variant="subtle"
          >
          </USelect>
        </UButtonGroup>
        <UButton 
          @click="() => reset()"
          icon="i-heroicons-solid-refresh"
          color="neutral"
          variant="subtle"
          class="ml-2"
          size="xl"
          :ui="{
            base: 'px-2.5',
            leadingIcon: 'w-5 h-5'
          }"
        />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mt-8">
      <ProjectCard 
        v-for="project in sortedProjects" 
        :key="project.path"
        :query="search"
        :project="{
          id: project.path,
          name: project.name,
          description: project.description,
          path: project.path,
          logo: project.logo,
          tags: getTags(project),
          stars: project.stars,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const { data } = await useAsyncData('navigation', () => queryCollectionNavigation('projects', ['name', 'description', 'logo', 'tags', 'demo', 'screenshots', 'createdAt', 'updatedAt']).where('published', '=', true))

const projects = computed(() => data.value?.[0]?.children ?? [])
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
    if (orderBy.value === 'createdAt' || orderBy.value === 'updatedAt') {
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
        <UButton 
          @click="() => openModal()"
          icon="i-heroicons-adjustments-horizontal-16-solid"
          color="gray"
          square
          :ui="{
            square: {
              '2xs': 'p-3',
              xs: 'p-3',
              sm: 'p-3',
              md: 'p-3',
              lg: 'p-3',
              xl: 'p-3'
            }
          }"
          class="ml-2 md:hidden"
        />
          
        <UModal v-model="isOpen">
          <UCard>
            <UButtonGroup 
              orientation="horizontal"
            >
              <UButton 
                @click="() => toggleOrder()"
                :icon="order === 'asc' ? 'i-heroicons-solid-sort-ascending' : 'i-heroicons-solid-sort-descending'"
                color="gray"
                square
                :ui="{
                  square: {
                    '2xs': 'p-3',
                    xs: 'p-3',
                    sm: 'p-3',
                    md: 'p-3',
                    lg: 'p-3',
                    xl: 'p-3'
                  },
                }"
              />
              <USelectMenu 
                v-model="orderBy" 
                :options="options"
                color="gray"
                value-attribute="value"
                option-attribute="label"
                :ui="{
                  base: 'min-w-32',
                  padding: {
                    '2xs': 'py-3',
                    xs: 'py-3',
                    sm: 'py-3',
                    md: 'py-3',
                    lg: 'py-3',
                    xl: 'py-3'
                  },
                }"
              >
                <template #label>
                  <span class="capitalize">{{ orderBy }}</span>
                </template>
                <template #option="{ option }">
                  <span class="capitalize">{{ option.label }}</span>
                </template>
              </USelectMenu>
            </UButtonGroup>

            <template #footer>
              <div class="flex justify-end">
                <UButton 
                  color="gray"
                  variant="ghost"
                  @click="() => reset()"
                >
                  Reset
                </UButton>
                <UButton 
                  color="gray"
                  variant="ghost"
                  @click="() => isOpen = false"
                >
                  Close
                </UButton>
              </div>
            </template>
          </UCard>
        </UModal>
      </div>
      <div class="hidden md:flex justify-end lg:col-span-2">
        <UButtonGroup 
          orientation="horizontal"
        >
          <UButton 
            @click="() => toggleOrder()"
            :icon="order === 'asc' ? 'i-heroicons-solid-sort-ascending' : 'i-heroicons-solid-sort-descending'"
            color="gray"
            square
            :ui="{
              square: {
                '2xs': 'p-3',
                xs: 'p-3',
                sm: 'p-3',
                md: 'p-3',
                lg: 'p-3',
                xl: 'p-3'
              },
            }"
          />
          <USelectMenu 
            v-model="orderBy" 
            :options="options"
            color="gray"
            value-attribute="value"
            option-attribute="label"
            :ui="{
              base: 'min-w-32',
              padding: {
                '2xs': 'py-3',
                xs: 'py-3',
                sm: 'py-3',
                md: 'py-3',
                lg: 'py-3',
                xl: 'py-3'
              },
            }"
          >
            <template #label>
              <span class="capitalize">{{ orderBy }}</span>
            </template>
            <template #option="{ option }">
              <span class="capitalize">{{ option.label }}</span>
            </template>
          </USelectMenu>
        </UButtonGroup>
        <UButton 
          @click="() => reset()"
          icon="i-heroicons-solid-refresh"
          color="gray"
          square
          :ui="{
            square: {
              '2xs': 'p-3',
              xs: 'p-3',
              sm: 'p-3',
              md: 'p-3',
              lg: 'p-3',
              xl: 'p-3'
            }
          }"
          class="ml-2"
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
          createdAt: project.createdAt,
          updatedAt: project.updatedAt
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('navigation', () => queryCollectionNavigation('projects', ['name', 'description', 'logo', 'tags']).where('published', '=', true))

const projects = computed(() => data.value?.[0]?.children ?? [])
const search = useRouteQuery('q', '')
const orderBy = useRouteQuery('orderBy', 'name')
const order = useRouteQuery<string>('order', 'asc')

const filteredProjects = computed(() => projects.value.filter((project: any) => {
  return project.name.toLowerCase().includes(search.value.toLowerCase())
}))

const sortedProjects = computed(() => {
  return filteredProjects.value.sort((a: any, b: any) => {
    return order.value === 'asc' ? a[orderBy.value].localeCompare(b[orderBy.value]) : b[orderBy.value].localeCompare(a[orderBy.value])
  })
})

function toggleOrder() {
  order.value = order.value === 'asc' ? 'desc' : 'asc'
}

const options = ['name']

const selected = ref(options[0])

const isOpen = ref(false)

function openModal() {
  isOpen.value = true
}

function reset() {
  search.value = ''
  orderBy.value = 'name'
  order.value = 'asc'
}
</script>

<template>
  <div>
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
                v-model="selected" 
                :options="options"
                color="gray"
                :ui="{
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
                  <span class="capitalize">{{ selected }}</span>
                </template>
                <template #option="{ option }">
                  <span class="capitalize">{{ option }}</span>
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
            v-model="selected" 
            :options="options"
            color="gray"
            :ui="{
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
              <span class="capitalize">{{ selected }}</span>
            </template>
            <template #option="{ option }">
              <span class="capitalize">{{ option }}</span>
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
        :project="{
          id: project.path,
          name: project.name,
          description: project.description,
          path: project.path,
          logo: project.logo,
          tags: project.tags
        }"
      />
    </div>
  </div>
</template>

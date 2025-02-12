
<template>
  <div class="flex flex-col min-h-screen dark:bg-gray-900">
    <header 
      class="px-4 py-3 flex items-center justify-between border-b dark:border-gray-800"
    >
      <div class="container mx-auto xl:max-w-7xl">
        <NuxtLink to="/projects" class="inline-flex items-center gap-2">
          <NuxtImg src="/assets/images/logo.png" alt="SnapDock" width="48"/>
          <h1 class="text-xl font-bold dark:text-gray-50">SnapDock</h1>
        </NuxtLink>
      </div>
    </header>
    <main 
      class="grid flex-1 px-4"
    >
      <div class="py-8 md:py-10 container mx-auto xl:max-w-7xl">
        <slot />
      </div>
    </main>
    <footer class="p-4 py-20 border-t dark:border-gray-800">
      <div class="container mx-auto xl:max-w-7xl">
        <div class="grid md:grid-cols-2 gap-y-6 gap-x-12 md:gap-x-25">
          <div class="flex flex-col gap-6 max-w-sm">
            <NuxtLink to="/projects" class="inline-flex items-center gap-2">
              <NuxtImg src="/assets/images/logo.png" alt="SnapDock" width="48"/>
              <h1 class="text-lg font-bold dark:text-gray-50">SnapDock</h1>
            </NuxtLink>
            <p class="max-w-lg text-sm md:text-base text-gray-500 dark:text-gray-400 italic pl-1.5">
              SnapDock is a collection of tools and guides to help you get started with Docker.
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

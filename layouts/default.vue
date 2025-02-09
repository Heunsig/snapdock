<template>
  <div class="flex flex-col min-h-screen dark:bg-gray-900">
    <header 
      class="px-4 py-3 flex items-center justify-between border-b dark:border-gray-800"
    >
      <div class="container mx-auto xl:max-w-7xl">
        <NuxtLink to="/projects">
          <h1 class="text-lg font-bold dark:text-gray-50">SnapDock</h1>
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
    <footer class="p-4 py-3 border-t dark:border-gray-800">
      <div class="container mx-auto xl:max-w-7xl">
        <NuxtLink to="/projects">
          <h1 class="text-lg font-bold dark:text-gray-50">SnapDock</h1>
        </NuxtLink>
      </div>
    </footer>
  </div>
</template>

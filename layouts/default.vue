<template>
  <div class="flex flex-col min-h-screen dark:bg-gray-900">
    <header class="flex items-center justify-between p-3 border-b dark:border-gray-800">
      <NuxtLink to="/">
        <h1 class="text-lg font-bold dark:text-gray-50">SaaS Explorer</h1>
      </NuxtLink>
    </header>
    <main class="grid flex-1">
      <div class="p-4">
        <slot />
      </div>
    </main>
    <footer>
      <h1 class="text-2xl">footer</h1>
    </footer>
  </div>
</template>

<template>
  <div class="flex flex-col min-h-screen bg-gray-900">
    <header class="flex items-center justify-between p-3 border-b border-gray-800">
      <NuxtLink to="/">
        <h1 class="text-lg font-bold text-gray-50">SaaS Explorer</h1>
      </NuxtLink>
    </header>
    <main class="grid flex-1">
      <div>
        <slot />
      </div>
    </main>
    <footer>
      <h1 class="text-2xl">footer</h1>
    </footer>
  </div>
</template>

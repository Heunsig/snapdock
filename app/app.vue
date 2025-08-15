<script setup lang="ts">
useHead({
  title: 'SnapDock',
  meta: [
    { name: 'description', content: 'SnapDock is a collection of tools and guides to help you get started with Docker.' }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator 
      color="#eab308"
      class="top-0 left-0 right-0 absolute"
      :height="2"
    />
    <NuxtPage />
  </NuxtLayout>
</template>

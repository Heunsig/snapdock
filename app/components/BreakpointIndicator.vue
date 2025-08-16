<template>
  <Teleport to="body">
    <div class="fixed bottom-2 right-2 bg-black text-white text-xs p-1 rounded z-50 pointer-events-none">
      <span class="block sm:hidden">xs</span>
      <span class="hidden sm:block md:hidden">sm</span>
      <span class="hidden md:block lg:hidden">md</span>
      <span class="hidden lg:block xl:hidden">lg</span>
      <span class="hidden xl:block 2xl:hidden">xl</span>
      <span class="hidden 2xl:block">2xl</span>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  }
})


const isCopied = ref(false)
function copyCode() {
  navigator.clipboard.writeText(props.code)
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 500)
}

</script>

<template>
  <div 
    class="my-4"
  >
    <div 
      v-if="filename" 
      class="flex items-center justify-between px-2 pb-2"
    >
      <span 
        class="text-sm dark:text-[hsla(0,0%,100%,.6)]"
        translate="no"
      >
        {{ filename }}
      </span>
    </div>
    <div class="relative">
      <pre
        :class="$props.class"
        class="my-0 pr-12 sm:pr-0"
        translate="no"
      ><slot /></pre>

      <div class="absolute top-2 right-2">
        <UButton
          variant="link"
          color="gray"
          size="sm"
          :icon="isCopied ? 'i-mdi-check' : 'i-mdi-content-copy'"
          @click="() => copyCode()"
        />
      </div>
    </div>
  </div>
</template>
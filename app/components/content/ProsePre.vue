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

const preRef = useTemplateRef('pre')
const isOverflowing = ref(false)
const isExpanded = ref(false)

function checkOverflow() {
  if (!preRef.value) {
    return;
  }
  if (preRef.value.offsetHeight > 500) {
    isOverflowing.value = true
  }
}

function expandContent() {
  isExpanded.value = true
}

function collapseContent() {
  isExpanded.value = false
}

watch(preRef, () => {
  checkOverflow()
})
</script>

<template>
  <div 
    :class="cn('my-4 max-h-[500px] overflow-y-clip relative', {
      'max-h-none': isExpanded
    })"
  >
    <div 
      v-if="filename" 
      class="flex items-center justify-between px-2 pb-2"
    >
      <span 
        class="text-sm text-neutral-400 dark:text-[hsla(0,0%,100%,.6)]"
        translate="no"
      >
        {{ filename }}
      </span>
    </div>
    <div class="relative">
      <pre
        ref="pre"
        :class="$props.class"
        class="my-0 pr-12 sm:pr-0 bg-neutral-100 dark:bg-gray-950 text-neutral-900 dark:text-gray-100"
        translate="no"
      ><slot /></pre>

      <div class="absolute top-2 right-2">
        <UButton
          v-if="isOverflowing"
          variant="link"
          color="gray"
          size="sm"
          :icon="isExpanded ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down'"
          @click="() => isExpanded ? collapseContent() : expandContent()"
          :title="isExpanded ? 'Collapse' : 'Expand'"
        />
        <UButton
          variant="link"
          color="gray"
          size="sm"
          :icon="isCopied ? 'i-mdi-check' : 'i-mdi-content-copy'"
          @click="() => copyCode()"
          title="Copy"
        />
      </div>
    </div>

    <div
      v-if="isOverflowing && !isExpanded"
      class="flex items-end justify-center absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-neutral-100 dark:to-black"
    >
      <UButton 
        label="Expand" 
        color="gray"
        variant="link"
        size="sm"
        class="mb-2"
        @click="() => expandContent()"
      />
    </div>
  </div>
</template>
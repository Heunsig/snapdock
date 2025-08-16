export default defineAppConfig({
  ui: {
    colors: {
      primary: 'yellow',
      neutral: 'gray',
    },
    button: {
      slots: {
        base: 'focus-visible:ring-red-500',
      },
      compoundVariants: [
        {
          color: 'neutral',
          variant: 'subtle',
          class: 'focus-visible:ring-primary'
        },
        {
          color: 'neutral',
          variant: 'link',
          class: 'focus-visible:ring-primary'
        },
      ]
    }
  }
})
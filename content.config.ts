import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        name: z.string(),
        description: z.string(),
        logo: z.string(),
        tags: z.array(z.string()).optional(),
        published: z.boolean().optional()
      })
    })
  }
})
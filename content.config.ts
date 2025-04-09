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
        published: z.boolean().optional(),
        demo: z.string().optional(),
        screenshots: z.array(z.string()).optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional()
      })
    })
  }
})
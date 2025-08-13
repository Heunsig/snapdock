import githubStarsReport from '#shared/data/github-stars-report.json'

export default defineEventHandler((event) => {
  const { project } = event.context.params as { project: string }

  const projectData = githubStarsReport.projects.find((p) => p.file === `${project}.md`)


  // https://github.com/nuxt/nuxt/issues/28920#issuecomment-3092272605
  if (!projectData) {
    setResponseStatus(event, 204)
    return
  }

  return projectData
})
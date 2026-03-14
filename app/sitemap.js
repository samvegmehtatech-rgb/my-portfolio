export default function sitemap() {
  return [
    {
      url:          'https://samvegmehta.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority:     1,
    },
    {
      url:          'https://samvegmehta.vercel.app/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority:     0.8,
    },
  ]
}

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow:     '/',
      disallow:  '/admin/',
    },
    sitemap: 'https://samvegmehta.vercel.app/sitemap.xml',
  }
}

import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://moodpaper.art/',
            lastModified: new Date(),
        }
    ]
}
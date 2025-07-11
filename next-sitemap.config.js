const BLOG = require('./blog.config')

/**
 * 优化的sitemap配置 - AdSense友好
 */
module.exports = {
  siteUrl: BLOG.LINK,
  changefreq: 'weekly',
  priority: 0.8,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  generateIndexSitemap: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/static/']
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 1
      }
    ],
    additionalSitemaps: [
      `${BLOG.LINK}/sitemap.xml`,
      `${BLOG.LINK}/server-sitemap.xml`
    ]
  },
  // 自定义转换器 - 提高页面质量分数
  transform: async (config, path) => {
    // 为不同类型的页面设置不同的优先级和更新频率
    let priority = 0.7
    let changefreq = 'weekly'
    
    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path.includes('/article/')) {
      priority = 0.9
      changefreq = 'monthly'
    } else if (path.includes('/category/')) {
      priority = 0.8
      changefreq = 'weekly'
    } else if (path.includes('/tag/')) {
      priority = 0.6
      changefreq = 'monthly'
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString()
    }
  }
}

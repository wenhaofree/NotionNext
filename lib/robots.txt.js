import fs from 'fs'

export function generateRobotsTxt(props) {
  const { siteInfo } = props
  const LINK = siteInfo?.link
  const content = `# robots.txt generated at ${new Date().toISOString()}
# https://www.robotstxt.org/robotstxt.html
  
User-agent: *
Allow: /
Disallow: /_next/static/
Disallow: /api/
Disallow: /auth/

# 对百度搜索引擎更友好
User-agent: Baiduspider
Allow: /
Crawl-delay: 2

# 对谷歌搜索引擎更友好
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# 对必应搜索引擎更友好  
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# 对搜狗搜索引擎更友好
User-agent: Sogou web spider
Allow: /
Crawl-delay: 2

# 对360搜索引擎更友好
User-agent: 360Spider
Allow: /
Crawl-delay: 2

# Host
Host: ${LINK}

# Sitemaps
Sitemap: ${LINK}/sitemap.xml
`
  try {
    fs.mkdirSync('./public', { recursive: true })
    fs.writeFileSync('./public/robots.txt', content)
  } catch (error) {
    // 在vercel运行环境是只读的，这里会报错；
    // 但在vercel编译阶段、或VPS等其他平台这行代码会成功执行
  }
}

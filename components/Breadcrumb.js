import Link from 'next/link'
import { useRouter } from 'next/router'
import { siteConfig } from '@/lib/config'

/**
 * 面包屑导航组件
 * @param {*} props 
 * @returns 
 */
const Breadcrumb = ({ post, category, tag, className = '' }) => {
  const router = useRouter()
  const TITLE = siteConfig('TITLE')
  
  // 生成面包屑路径
  const getBreadcrumbItems = () => {
    const items = [
      { name: '首页', href: '/', current: false }
    ]

    // 根据不同页面类型生成面包屑
    switch (router.pathname) {
      case '/':
        items[0].current = true
        break
        
      case '/archive':
        items.push({ name: '归档', href: '/archive', current: true })
        break
        
      case '/category':
        items.push({ name: '分类', href: '/category', current: true })
        break
        
      case '/category/[category]':
        items.push({ name: '分类', href: '/category', current: false })
        items.push({ name: category, href: `/category/${category}`, current: true })
        break
        
      case '/tag':
        items.push({ name: '标签', href: '/tag', current: true })
        break
        
      case '/tag/[tag]':
        items.push({ name: '标签', href: '/tag', current: false })
        items.push({ name: tag, href: `/tag/${tag}`, current: true })
        break
        
      case '/search':
        items.push({ name: '搜索', href: '/search', current: true })
        break
        
      case '/about':
        items.push({ name: '关于我们', href: '/about', current: true })
        break
        
      case '/contact':
        items.push({ name: '联系我们', href: '/contact', current: true })
        break
        
      case '/privacy':
        items.push({ name: '隐私政策', href: '/privacy', current: true })
        break
        
      case '/terms':
        items.push({ name: '使用条款', href: '/terms', current: true })
        break
        
      case '/disclaimer':
        items.push({ name: '免责声明', href: '/disclaimer', current: true })
        break
        
      default:
        // 文章页面
        if (post) {
          if (post.category && post.category[0]) {
            items.push({ 
              name: '分类', 
              href: '/category', 
              current: false 
            })
            items.push({ 
              name: post.category[0], 
              href: `/category/${post.category[0]}`, 
              current: false 
            })
          }
          items.push({ 
            name: post.title, 
            href: `/${post.slug}`, 
            current: true 
          })
        }
        break
    }

    return items
  }

  const breadcrumbItems = getBreadcrumbItems()

  // 如果只有首页，不显示面包屑
  if (breadcrumbItems.length <= 1) {
    return null
  }

  return (
    <nav 
      className={`flex ${className}`} 
      aria-label="面包屑导航"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <svg
                className="w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            )}
            
            {item.current ? (
              <span 
                className="text-sm font-medium text-gray-500 dark:text-gray-400"
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                {index === 0 && (
                  <svg
                    className="w-3 h-3 mr-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                )}
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb

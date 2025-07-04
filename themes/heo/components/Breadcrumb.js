import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useRouter } from 'next/router'

/**
 * 面包屑导航组件 - AdSense 优化
 * @param {*} props 
 * @returns 
 */
const Breadcrumb = ({ post, category, tag, currentPage }) => {
  const router = useRouter()
  const { locale } = useGlobal()
  const SITE_TITLE = siteConfig('TITLE')

  // 构建面包屑路径
  const buildBreadcrumbs = () => {
    const breadcrumbs = [
      {
        name: locale.NAV.INDEX || '首页',
        href: '/',
        current: false
      }
    ]

    // 根据不同页面类型添加面包屑
    switch (router.route) {
      case '/[prefix]':
      case '/[prefix]/[slug]':
        // 文章页面
        if (post) {
          if (post.category) {
            breadcrumbs.push({
              name: post.category,
              href: `/category/${post.category}`,
              current: false
            })
          }
          breadcrumbs.push({
            name: post.title,
            href: `/${post.slug}`,
            current: true
          })
        }
        break

      case '/category':
        breadcrumbs.push({
          name: locale.COMMON.CATEGORY || '分类',
          href: '/category',
          current: true
        })
        break

      case '/category/[category]':
      case '/category/[category]/page/[page]':
        breadcrumbs.push({
          name: locale.COMMON.CATEGORY || '分类',
          href: '/category',
          current: false
        })
        if (category) {
          breadcrumbs.push({
            name: category,
            href: `/category/${category}`,
            current: !currentPage
          })
          if (currentPage && currentPage > 1) {
            breadcrumbs.push({
              name: `第 ${currentPage} 页`,
              href: `/category/${category}/page/${currentPage}`,
              current: true
            })
          }
        }
        break

      case '/tag':
        breadcrumbs.push({
          name: locale.COMMON.TAGS || '标签',
          href: '/tag',
          current: true
        })
        break

      case '/tag/[tag]':
      case '/tag/[tag]/page/[page]':
        breadcrumbs.push({
          name: locale.COMMON.TAGS || '标签',
          href: '/tag',
          current: false
        })
        if (tag) {
          breadcrumbs.push({
            name: tag,
            href: `/tag/${tag}`,
            current: !currentPage
          })
          if (currentPage && currentPage > 1) {
            breadcrumbs.push({
              name: `第 ${currentPage} 页`,
              href: `/tag/${tag}/page/${currentPage}`,
              current: true
            })
          }
        }
        break

      case '/archive':
        breadcrumbs.push({
          name: locale.NAV.ARCHIVE || '归档',
          href: '/archive',
          current: true
        })
        break

      case '/search':
      case '/search/[keyword]':
        breadcrumbs.push({
          name: locale.NAV.SEARCH || '搜索',
          href: '/search',
          current: true
        })
        break

      case '/about':
        breadcrumbs.push({
          name: '关于我们',
          href: '/about',
          current: true
        })
        break

      case '/contact':
        breadcrumbs.push({
          name: '联系我们',
          href: '/contact',
          current: true
        })
        break

      case '/privacy':
        breadcrumbs.push({
          name: '隐私政策',
          href: '/privacy',
          current: true
        })
        break

      case '/terms':
        breadcrumbs.push({
          name: '使用条款',
          href: '/terms',
          current: true
        })
        break

      case '/disclaimer':
        breadcrumbs.push({
          name: '免责声明',
          href: '/disclaimer',
          current: true
        })
        break

      default:
        // 其他页面保持默认
        break
    }

    return breadcrumbs
  }

  const breadcrumbs = buildBreadcrumbs()

  // 如果只有首页，不显示面包屑
  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <nav 
      className="flex mb-4 px-5 md:px-0" 
      aria-label="面包屑导航"
      itemScope 
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm text-gray-500 dark:text-gray-400">
        {breadcrumbs.map((crumb, index) => (
          <li 
            key={index} 
            className="inline-flex items-center"
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            {index > 0 && (
              <svg
                className="w-3 h-3 mx-1 text-gray-400"
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
            
            {crumb.current ? (
              <span 
                className="text-gray-700 dark:text-gray-300 font-medium"
                itemProp="name"
                aria-current="page"
              >
                {crumb.name}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="inline-flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{crumb.name}</span>
              </Link>
            )}
            
            <meta itemProp="position" content={index + 1} />
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb

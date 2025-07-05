import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'

/**
 * 导航增强组件
 * 确保所有重要页面都有适当的导航链接，提升 AdSense 审核通过率
 */
export default function NavigationEnhancer() {
  return (
    <>
      <LegalPagesFooter />
      <SiteMapLink />
    </>
  )
}

/**
 * 法律页面页脚链接
 * 在页脚显示所有法律相关页面的链接
 */
export function LegalPagesFooter({ className = '' }) {
  const { locale } = useGlobal()
  
  const legalPages = [
    { href: '/privacy', label: '隐私政策', icon: '🔒' },
    { href: '/terms', label: '使用条款', icon: '📋' },
    { href: '/disclaimer', label: '免责声明', icon: '⚠️' },
    { href: '/about', label: '关于我们', icon: 'ℹ️' },
    { href: '/contact', label: '联系我们', icon: '📧' }
  ]

  return (
    <div className={`legal-pages-footer bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center mb-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            网站信息
          </h3>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
          {legalPages.map((page, index) => (
            <Link
              key={page.href}
              href={page.href}
              className="flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              <span className="mr-1">{page.icon}</span>
              {page.label}
            </Link>
          ))}
        </div>
        
        {/* 版权信息 */}
        <div className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} {siteConfig('AUTHOR')}. 保留所有权利。
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            本站致力于提供高质量的原创内容，遵循相关法律法规。
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * 网站地图链接组件
 */
export function SiteMapLink({ className = '' }) {
  return (
    <div className={`sitemap-link text-center py-4 ${className}`}>
      <Link
        href="/sitemap.xml"
        className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        📄 网站地图
      </Link>
    </div>
  )
}

/**
 * 主导航菜单增强组件
 */
export function EnhancedMainNavigation({ className = '' }) {
  const { locale } = useGlobal()
  
  const mainNavItems = [
    { href: '/', label: locale.NAV.INDEX || '首页', icon: '🏠' },
    { href: '/archive', label: locale.NAV.ARCHIVE || '归档', icon: '📚' },
    { href: '/category', label: locale.COMMON.CATEGORY || '分类', icon: '📂' },
    { href: '/tag', label: locale.COMMON.TAGS || '标签', icon: '🏷️' },
    { href: '/search', label: locale.NAV.SEARCH || '搜索', icon: '🔍' },
    { href: '/about', label: '关于', icon: 'ℹ️' }
  ]

  return (
    <nav className={`enhanced-main-navigation ${className}`} aria-label="主导航">
      <ul className="flex flex-wrap justify-center items-center space-x-6">
        {mainNavItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * 面包屑导航增强组件
 */
export function EnhancedBreadcrumb({ items = [], className = '' }) {
  if (!items || items.length <= 1) return null

  return (
    <nav 
      className={`enhanced-breadcrumb ${className}`}
      aria-label="面包屑导航"
      itemScope 
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        {items.map((item, index) => (
          <li 
            key={index}
            className="flex items-center"
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            {index > 0 && (
              <svg
                className="w-4 h-4 mx-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            
            {item.current ? (
              <span 
                className="font-medium text-gray-700 dark:text-gray-300"
                itemProp="name"
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{item.name}</span>
              </Link>
            )}
            
            <meta itemProp="position" content={index + 1} />
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * 侧边栏导航组件
 */
export function SidebarNavigation({ className = '' }) {
  const quickLinks = [
    { href: '/archive', label: '文章归档', icon: '📚', description: '按时间浏览所有文章' },
    { href: '/category', label: '分类目录', icon: '📂', description: '按主题分类浏览' },
    { href: '/tag', label: '标签云', icon: '🏷️', description: '按标签查找相关内容' },
    { href: '/search', label: '站内搜索', icon: '🔍', description: '快速找到您需要的内容' }
  ]

  return (
    <div className={`sidebar-navigation bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <span className="mr-2">🧭</span>
        快速导航
      </h3>
      
      <ul className="space-y-3">
        {quickLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
            >
              <div className="flex items-start">
                <span className="text-xl mr-3 group-hover:scale-110 transition-transform">
                  {link.icon}
                </span>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {link.label}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {link.description}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * 移动端导航菜单
 */
export function MobileNavigationMenu({ isOpen, onClose, className = '' }) {
  const { locale } = useGlobal()
  
  const mobileNavItems = [
    { href: '/', label: locale.NAV.INDEX || '首页', icon: '🏠' },
    { href: '/archive', label: locale.NAV.ARCHIVE || '归档', icon: '📚' },
    { href: '/category', label: locale.COMMON.CATEGORY || '分类', icon: '📂' },
    { href: '/tag', label: locale.COMMON.TAGS || '标签', icon: '🏷️' },
    { href: '/search', label: locale.NAV.SEARCH || '搜索', icon: '🔍' },
    { href: '/about', label: '关于', icon: 'ℹ️' },
    { href: '/contact', label: '联系', icon: '📧' }
  ]

  if (!isOpen) return null

  return (
    <div className={`mobile-navigation-menu ${className}`}>
      {/* 遮罩层 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* 菜单内容 */}
      <div className="fixed top-0 right-0 h-full w-80 max-w-full bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              导航菜单
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav>
            <ul className="space-y-2">
              {mobileNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={onClose}
                  >
                    <span className="text-xl mr-3">{item.icon}</span>
                    <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

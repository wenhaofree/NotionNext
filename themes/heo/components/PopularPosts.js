import LazyImage from '@/components/LazyImage'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'

/**
 * 热门文章组件
 * @param {*} props
 * @returns
 */
export default function PopularPosts({ posts, siteInfo }) {
  const { locale } = useGlobal()

  if (!posts || posts.length === 0) {
    return <></>
  }

  // 取前6篇文章作为热门文章
  const popularPosts = posts.slice(0, 6)

  return (
    <div className='bg-white dark:bg-[#1e1e1e] rounded-xl p-6 shadow-md'>
      <h3 className='text-lg font-bold text-gray-800 dark:text-gray-200 mb-4'>
        <i className='fas fa-fire mr-2 text-red-500' />
        {locale.COMMON.POPULAR_POSTS || '热门文章'}
      </h3>
      
      <div className='space-y-4'>
        {popularPosts.map((post, index) => {
          const headerImage = post?.pageCoverThumbnail || siteInfo?.pageCover
          
          return (
            <Link
              key={post.id}
              href={post.href}
              className='flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group'>
              
              {/* 排名数字 */}
              <div className={`
                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${index < 3 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                }
              `}>
                {index + 1}
              </div>
              
              {/* 文章封面 */}
              {headerImage && (
                <div className='flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden'>
                  <LazyImage
                    src={headerImage}
                    alt={post.title}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-200'
                  />
                </div>
              )}
              
              {/* 文章信息 */}
              <div className='flex-1 min-w-0'>
                <h4 className='text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors'>
                  {post.title}
                </h4>
                
                <div className='flex items-center space-x-2 mt-1 text-xs text-gray-500 dark:text-gray-400'>
                  {post.publishDay && (
                    <span>
                      <i className='far fa-calendar-alt mr-1' />
                      {post.publishDay}
                    </span>
                  )}
                  
                  {post.category && (
                    <span>
                      <i className='fas fa-folder mr-1' />
                      {post.category}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      
      <div className='mt-4 text-center'>
        <Link
          href='/archive'
          className='text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors'>
          查看更多文章 →
        </Link>
      </div>
    </div>
  )
}

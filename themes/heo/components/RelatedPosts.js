import Link from 'next/link'
import LazyImage from '@/components/LazyImage'
import { formatDateFmt } from '@/lib/utils/formatDate'

/**
 * 相关文章推荐组件
 * 基于标签和分类推荐相关文章，提升用户停留时间
 */
const RelatedPosts = ({ currentPost, allPosts, siteInfo }) => {
  if (!currentPost || !allPosts) return null

  // 获取相关文章
  const getRelatedPosts = () => {
    const related = []
    const currentTags = currentPost.tags || []
    const currentCategory = currentPost.category

    // 按相关度评分排序
    const scoredPosts = allPosts
      .filter(post => post.id !== currentPost.id && post.type === 'Post')
      .map(post => {
        let score = 0
        
        // 相同分类加分
        if (post.category === currentCategory) {
          score += 3
        }
        
        // 相同标签加分
        const commonTags = (post.tags || []).filter(tag => 
          currentTags.includes(tag)
        )
        score += commonTags.length * 2
        
        // 发布时间越近加分越高
        const daysDiff = Math.abs(
          new Date(post.publishDate) - new Date(currentPost.publishDate)
        ) / (1000 * 60 * 60 * 24)
        if (daysDiff < 30) score += 1
        if (daysDiff < 7) score += 1
        
        return { ...post, score }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6) // 取前6篇

    return scoredPosts
  }

  const relatedPosts = getRelatedPosts()

  if (relatedPosts.length === 0) {
    // 如果没有相关文章，显示最新文章
    const latestPosts = allPosts
      .filter(post => post.id !== currentPost.id && post.type === 'Post')
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, 6)
    
    if (latestPosts.length === 0) return null
    
    return (
      <div className='related-posts bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6'>
        <div className='flex items-center mb-6'>
          <i className='fas fa-newspaper text-blue-500 text-xl mr-3'></i>
          <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
            最新文章推荐
          </h3>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {latestPosts.map((post, index) => (
            <RelatedPostCard key={post.id} post={post} siteInfo={siteInfo} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='related-posts bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center'>
          <i className='fas fa-link text-blue-500 text-xl mr-3'></i>
          <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
            相关文章推荐
          </h3>
        </div>
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          基于标签和分类智能推荐
        </span>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {relatedPosts.map((post, index) => (
          <RelatedPostCard 
            key={post.id} 
            post={post} 
            siteInfo={siteInfo}
            showScore={true}
            score={post.score}
          />
        ))}
      </div>
      
      {/* 推荐算法说明 */}
      <div className='mt-6 pt-4 border-t border-gray-200 dark:border-gray-700'>
        <div className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
          <i className='fas fa-info-circle mr-2'></i>
          推荐基于文章标签、分类和发布时间的智能算法
        </div>
      </div>
    </div>
  )
}

/**
 * 相关文章卡片组件
 */
const RelatedPostCard = ({ post, siteInfo, showScore = false, score = 0 }) => {
  const defaultCover = siteInfo?.pageCover || '/images/default-cover.jpg'
  
  return (
    <Link href={`/${post.slug}`} className='group block'>
      <div className='bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1'>
        {/* 文章封面 */}
        <div className='relative h-32 overflow-hidden'>
          <LazyImage
            src={post.pageCoverThumbnail || post.pageCover || defaultCover}
            alt={post.title}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          />
          
          {/* 相关度评分 */}
          {showScore && score > 0 && (
            <div className='absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full'>
              匹配度: {score}
            </div>
          )}
          
          {/* 文章分类标签 */}
          {post.category && (
            <div className='absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded'>
              {post.category}
            </div>
          )}
        </div>
        
        {/* 文章信息 */}
        <div className='p-4'>
          <h4 className='font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2'>
            {post.title}
          </h4>
          
          {post.summary && (
            <p className='text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3'>
              {post.summary}
            </p>
          )}
          
          {/* 文章元信息 */}
          <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400'>
            <div className='flex items-center'>
              <i className='fas fa-calendar-alt mr-1'></i>
              {formatDateFmt(post.publishDate, 'MM-dd')}
            </div>
            
            <div className='flex items-center'>
              <i className='fas fa-eye mr-1'></i>
              <span>推荐阅读</span>
            </div>
          </div>
          
          {/* 文章标签 */}
          {post.tags && post.tags.length > 0 && (
            <div className='flex flex-wrap gap-1 mt-3'>
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className='inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded'
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className='text-xs text-gray-500 dark:text-gray-400'>
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default RelatedPosts

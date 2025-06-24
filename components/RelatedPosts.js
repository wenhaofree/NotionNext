import Link from 'next/link'
import { useState, useEffect } from 'react'
import { siteConfig } from '@/lib/config'

/**
 * 相关文章推荐组件
 * @param {*} props 
 * @returns 
 */
const RelatedPosts = ({ currentPost, allPosts, maxPosts = 6 }) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    if (!currentPost || !allPosts) return

    // 计算相关度的算法
    const calculateRelevance = (post) => {
      let score = 0
      
      // 相同分类加分
      if (currentPost.category && post.category) {
        const currentCategories = Array.isArray(currentPost.category) 
          ? currentPost.category 
          : [currentPost.category]
        const postCategories = Array.isArray(post.category) 
          ? post.category 
          : [post.category]
        
        const categoryMatch = currentCategories.some(cat => 
          postCategories.includes(cat)
        )
        if (categoryMatch) score += 10
      }
      
      // 相同标签加分
      if (currentPost.tags && post.tags) {
        const currentTags = Array.isArray(currentPost.tags) 
          ? currentPost.tags 
          : [currentPost.tags]
        const postTags = Array.isArray(post.tags) 
          ? post.tags 
          : [post.tags]
        
        const commonTags = currentTags.filter(tag => 
          postTags.includes(tag)
        ).length
        score += commonTags * 3
      }
      
      // 标题相似度加分
      if (currentPost.title && post.title) {
        const titleSimilarity = calculateTitleSimilarity(
          currentPost.title, 
          post.title
        )
        score += titleSimilarity * 2
      }
      
      // 发布时间相近加分
      if (currentPost.publishDay && post.publishDay) {
        const timeDiff = Math.abs(
          new Date(currentPost.publishDay) - new Date(post.publishDay)
        )
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24)
        if (daysDiff < 30) score += 2
        if (daysDiff < 7) score += 3
      }
      
      return score
    }

    // 过滤并排序相关文章
    const related = allPosts
      .filter(post => 
        post.id !== currentPost.id && 
        post.status === 'Published' &&
        post.type === 'Post'
      )
      .map(post => ({
        ...post,
        relevanceScore: calculateRelevance(post)
      }))
      .filter(post => post.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, maxPosts)

    setRelatedPosts(related)
  }, [currentPost, allPosts, maxPosts])

  // 计算标题相似度
  const calculateTitleSimilarity = (title1, title2) => {
    const words1 = title1.toLowerCase().split(/\s+/)
    const words2 = title2.toLowerCase().split(/\s+/)
    
    const commonWords = words1.filter(word => 
      words2.includes(word) && word.length > 2
    ).length
    
    return commonWords / Math.max(words1.length, words2.length) * 10
  }

  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // 截取摘要
  const truncateSummary = (summary, maxLength = 100) => {
    if (!summary) return ''
    return summary.length > maxLength 
      ? summary.substring(0, maxLength) + '...' 
      : summary
  }

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
        <svg 
          className="w-5 h-5 mr-2 text-blue-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        相关推荐
      </h3>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post, index) => (
          <article 
            key={post.id} 
            className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* 文章封面 */}
            {post.pageCoverThumbnail && (
              <div className="mb-3">
                <Link href={`/${post.slug}`}>
                  <img
                    src={post.pageCoverThumbnail}
                    alt={post.title}
                    className="w-full h-32 object-cover rounded-lg hover:opacity-90 transition-opacity"
                    loading="lazy"
                  />
                </Link>
              </div>
            )}
            
            {/* 文章标题 */}
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
              <Link 
                href={`/${post.slug}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {post.title}
              </Link>
            </h4>
            
            {/* 文章摘要 */}
            {post.summary && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                {truncateSummary(post.summary)}
              </p>
            )}
            
            {/* 文章元信息 */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                {/* 发布日期 */}
                <span className="flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(post.publishDay)}
                </span>
                
                {/* 分类 */}
                {post.category && post.category[0] && (
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <Link 
                      href={`/category/${post.category[0]}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {post.category[0]}
                    </Link>
                  </span>
                )}
              </div>
              
              {/* 相关度指示器 */}
              <div className="flex items-center">
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                  相关度: {Math.round(post.relevanceScore)}
                </span>
              </div>
            </div>
            
            {/* 标签 */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((tag, tagIndex) => (
                  <Link
                    key={tagIndex}
                    href={`/tag/${tag}`}
                    className="inline-block px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
      
      {/* 查看更多链接 */}
      <div className="mt-6 text-center">
        <Link
          href="/archive"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          查看更多文章
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default RelatedPosts

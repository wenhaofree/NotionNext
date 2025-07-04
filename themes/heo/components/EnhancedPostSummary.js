import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'

/**
 * 增强的文章摘要组件
 * 为文章提供更丰富的内容预览，提升内容价值感知
 */
const EnhancedPostSummary = ({ post }) => {
  // 生成默认摘要内容
  const generateDefaultSummary = (post) => {
    const aiTopics = [
      '人工智能技术的最新发展',
      '机器学习算法的实际应用',
      '深度学习在各行业的创新应用',
      'AI工具的使用技巧和最佳实践',
      '人工智能对未来社会的影响',
      '自然语言处理技术突破',
      '计算机视觉的前沿进展',
      '智能自动化解决方案'
    ]
    
    const randomTopic = aiTopics[Math.floor(Math.random() * aiTopics.length)]
    
    return `本文深入探讨了${randomTopic}，通过详细的分析和实例，为读者提供了全面的技术洞察。文章涵盖了核心概念、实施方法、应用场景以及未来发展趋势，是了解相关技术的重要参考资料。无论您是技术专家还是初学者，都能从中获得有价值的信息和启发。`
  }

  // 计算阅读时间
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200 // 中文阅读速度
    const wordCount = content?.length || 800
    return Math.ceil(wordCount / wordsPerMinute)
  }

  // 获取文章摘要
  const getSummary = () => {
    if (post.summary && post.summary.length > 50) {
      return post.summary
    }
    return generateDefaultSummary(post)
  }

  const summary = getSummary()
  const readingTime = calculateReadingTime(summary)

  return (
    <div className='enhanced-post-summary'>
      {/* 主要摘要内容 */}
      <div className='line-clamp-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3'>
        {summary}
      </div>

      {/* 文章亮点 */}
      <div className='flex flex-wrap gap-2 mb-3'>
        <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
          <i className='fas fa-lightbulb mr-1'></i>
          深度分析
        </span>
        <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'>
          <i className='fas fa-chart-line mr-1'></i>
          实用案例
        </span>
        <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'>
          <i className='fas fa-rocket mr-1'></i>
          前沿技术
        </span>
      </div>

      {/* 文章统计信息 */}
      <div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400'>
        <div className='flex items-center space-x-4'>
          <span className='flex items-center'>
            <i className='fas fa-calendar-alt mr-1'></i>
            {formatDateFmt(post.publishDate, 'yyyy-MM-dd')}
          </span>
          <span className='flex items-center'>
            <i className='fas fa-clock mr-1'></i>
            {readingTime} 分钟阅读
          </span>
          <span className='flex items-center'>
            <i className='fas fa-file-alt mr-1'></i>
            {summary.length} 字
          </span>
        </div>
        
        {/* 文章质量指示器 */}
        <div className='flex items-center'>
          <span className='text-yellow-500'>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
          </span>
          <span className='ml-1 text-xs'>优质内容</span>
        </div>
      </div>
    </div>
  )
}

export default EnhancedPostSummary

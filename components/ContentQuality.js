import { siteConfig } from '@/lib/config'
import { useEffect, useState } from 'react'

/**
 * 内容质量检测和展示组件
 * 用于提升内容价值感知，帮助通过 AdSense 审核
 */
export const ContentQualityIndicator = ({ post }) => {
  const [contentStats, setContentStats] = useState({
    wordCount: 0,
    readingTime: 0,
    qualityScore: 0
  })

  useEffect(() => {
    if (post?.blockMap) {
      const stats = calculateContentStats(post)
      setContentStats(stats)
    }
  }, [post])

  if (!post || contentStats.wordCount < 100) return null

  return (
    <div className="content-quality-indicator bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {contentStats.wordCount} 字
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            约 {contentStats.readingTime} 分钟阅读
          </span>
          <QualityBadge score={contentStats.qualityScore} />
        </div>
        <LastUpdated date={post.lastEditedTime || post.publishTime} />
      </div>
    </div>
  )
}

/**
 * 计算内容统计信息
 */
function calculateContentStats(post) {
  let wordCount = 0
  let imageCount = 0
  let codeBlockCount = 0
  let headingCount = 0

  if (post.blockMap) {
    Object.values(post.blockMap.block).forEach(block => {
      const blockValue = block?.value
      if (!blockValue) return

      const blockType = blockValue.type
      const properties = blockValue.properties

      switch (blockType) {
        case 'text':
        case 'bulleted_list':
        case 'numbered_list':
        case 'quote':
          if (properties?.title) {
            wordCount += countChineseWords(properties.title[0][0])
          }
          break
        case 'header':
        case 'sub_header':
        case 'sub_sub_header':
          headingCount++
          if (properties?.title) {
            wordCount += countChineseWords(properties.title[0][0])
          }
          break
        case 'image':
          imageCount++
          break
        case 'code':
          codeBlockCount++
          if (properties?.title) {
            wordCount += countChineseWords(properties.title[0][0]) * 0.5 // 代码权重降低
          }
          break
      }
    })
  }

  const readingTime = Math.max(1, Math.ceil(wordCount / 300)) // 中文阅读速度约300字/分钟
  const qualityScore = calculateQualityScore(wordCount, imageCount, codeBlockCount, headingCount)

  return {
    wordCount,
    readingTime,
    qualityScore,
    imageCount,
    codeBlockCount,
    headingCount
  }
}

/**
 * 计算中文字数（包含英文单词）
 */
function countChineseWords(text) {
  if (!text) return 0
  
  // 移除HTML标签
  const cleanText = text.replace(/<[^>]*>/g, '')
  
  // 计算中文字符
  const chineseChars = (cleanText.match(/[\u4e00-\u9fa5]/g) || []).length
  
  // 计算英文单词
  const englishWords = (cleanText.match(/[a-zA-Z]+/g) || []).length
  
  return chineseChars + englishWords
}

/**
 * 计算内容质量分数
 */
function calculateQualityScore(wordCount, imageCount, codeBlockCount, headingCount) {
  let score = 0
  
  // 字数评分 (40%)
  if (wordCount >= 2000) score += 40
  else if (wordCount >= 1500) score += 35
  else if (wordCount >= 1000) score += 30
  else if (wordCount >= 800) score += 25
  else if (wordCount >= 500) score += 20
  else score += 10
  
  // 结构评分 (30%)
  if (headingCount >= 5) score += 30
  else if (headingCount >= 3) score += 25
  else if (headingCount >= 2) score += 20
  else score += 10
  
  // 媒体内容评分 (20%)
  if (imageCount >= 3) score += 20
  else if (imageCount >= 2) score += 15
  else if (imageCount >= 1) score += 10
  
  // 技术内容评分 (10%)
  if (codeBlockCount >= 2) score += 10
  else if (codeBlockCount >= 1) score += 5
  
  return Math.min(100, score)
}

/**
 * 质量徽章组件
 */
function QualityBadge({ score }) {
  let badgeClass = 'px-2 py-1 rounded-full text-xs font-medium '
  let label = ''
  
  if (score >= 90) {
    badgeClass += 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    label = '优质内容'
  } else if (score >= 75) {
    badgeClass += 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    label = '良好内容'
  } else if (score >= 60) {
    badgeClass += 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    label = '标准内容'
  } else {
    badgeClass += 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    label = '基础内容'
  }
  
  return (
    <span className={badgeClass}>
      {label} ({score})
    </span>
  )
}

/**
 * 最后更新时间组件
 */
function LastUpdated({ date }) {
  if (!date) return null
  
  const updateDate = new Date(date)
  const now = new Date()
  const diffDays = Math.floor((now - updateDate) / (1000 * 60 * 60 * 24))
  
  let timeText = ''
  if (diffDays === 0) {
    timeText = '今天更新'
  } else if (diffDays === 1) {
    timeText = '昨天更新'
  } else if (diffDays < 7) {
    timeText = `${diffDays}天前更新`
  } else if (diffDays < 30) {
    timeText = `${Math.floor(diffDays / 7)}周前更新`
  } else {
    timeText = updateDate.toLocaleDateString()
  }
  
  return (
    <span className="text-xs text-gray-500">
      {timeText}
    </span>
  )
}

export default ContentQualityIndicator

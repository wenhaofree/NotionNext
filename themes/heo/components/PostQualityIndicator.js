import { analyzePostContent, getQualityLevel } from '@/lib/contentQuality'
import { useEffect, useState } from 'react'

/**
 * 文章质量指示器组件 - Heo 主题专用
 * 用于提升内容价值感知，帮助通过 AdSense 审核
 */
export default function PostQualityIndicator({ post, className = '' }) {
  const [contentAnalysis, setContentAnalysis] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (post?.blockMap) {
      const analysis = analyzePostContent(post)
      setContentAnalysis(analysis)
      // 只有当内容达到一定质量时才显示
      setIsVisible(analysis.wordCount > 100)
    }
  }, [post])

  if (!isVisible || !contentAnalysis) return null

  const qualityLevel = getQualityLevel(contentAnalysis.qualityScore)

  return (
    <div className={`post-quality-indicator ${className}`}>
      {/* 主要质量指标 */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
            <QualityIcon level={qualityLevel.level} />
            <span className="ml-2">内容质量</span>
          </h4>
          <QualityBadge level={qualityLevel} score={contentAnalysis.qualityScore} />
        </div>

        {/* 内容统计 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <StatItem
            icon="📝"
            label="字数"
            value={`${contentAnalysis.wordCount} 字`}
            isGood={contentAnalysis.wordCount >= 800}
          />
          <StatItem
            icon="⏱️"
            label="阅读时间"
            value={`${contentAnalysis.readingTime} 分钟`}
            isGood={contentAnalysis.readingTime >= 3}
          />
          <StatItem
            icon="📋"
            label="结构层级"
            value={`${contentAnalysis.headingCount} 个标题`}
            isGood={contentAnalysis.headingCount >= 3}
          />
          <StatItem
            icon="🖼️"
            label="图片"
            value={`${contentAnalysis.imageCount} 张`}
            isGood={contentAnalysis.imageCount >= 1}
          />
        </div>

        {/* 质量提示 */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {qualityLevel.description}
          </p>
        </div>
      </div>

      {/* 详细分析（可展开） */}
      <DetailedAnalysis analysis={contentAnalysis} />
    </div>
  )
}

/**
 * 质量图标组件
 */
function QualityIcon({ level }) {
  const icons = {
    excellent: '🏆',
    good: '✅',
    fair: '⚠️',
    poor: '❌'
  }
  
  return <span className="text-lg">{icons[level] || '📊'}</span>
}

/**
 * 质量徽章组件
 */
function QualityBadge({ level, score }) {
  const colorClasses = {
    excellent: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    good: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    fair: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    poor: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses[level.level]}`}>
      {level.label} ({score})
    </span>
  )
}

/**
 * 统计项组件
 */
function StatItem({ icon, label, value, isGood }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-1">
        <span className="mr-1">{icon}</span>
        <span className={`text-xs ${isGood ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
          {label}
        </span>
      </div>
      <div className={`font-medium text-xs ${isGood ? 'text-green-700 dark:text-green-300' : 'text-gray-600 dark:text-gray-400'}`}>
        {value}
      </div>
    </div>
  )
}

/**
 * 详细分析组件
 */
function DetailedAnalysis({ analysis }) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!analysis.suggestions || analysis.suggestions.length === 0) return null

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded"
      >
        <span>查看详细分析</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded text-xs">
          <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">优化建议：</h5>
          <ul className="space-y-1">
            {analysis.suggestions.map((suggestion, index) => (
              <li key={index} className="text-gray-600 dark:text-gray-400 flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>

          {/* 额外统计信息 */}
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
              <div>代码块: {analysis.codeBlockCount}</div>
              <div>列表: {analysis.listCount}</div>
              <div>链接: {analysis.linkCount}</div>
              <div>引用: {analysis.quoteCount}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * 简化版质量指示器（用于文章列表）
 */
export function PostQualityBadge({ post, className = '' }) {
  const [qualityScore, setQualityScore] = useState(0)

  useEffect(() => {
    if (post?.blockMap) {
      const analysis = analyzePostContent(post)
      setQualityScore(analysis.qualityScore)
    }
  }, [post])

  if (qualityScore < 50) return null

  const level = getQualityLevel(qualityScore)

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
      level.level === 'excellent' ? 'bg-green-100 text-green-800' :
      level.level === 'good' ? 'bg-blue-100 text-blue-800' :
      level.level === 'fair' ? 'bg-yellow-100 text-yellow-800' :
      'bg-gray-100 text-gray-800'
    } ${className}`}>
      <QualityIcon level={level.level} />
      <span className="ml-1">{level.label}</span>
    </span>
  )
}

/**
 * 内容价值提示组件
 */
export function ContentValueTip({ className = '' }) {
  return (
    <div className={`content-value-tip bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
            高质量内容标准
          </h4>
          <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
            我们致力于提供有价值的原创内容，每篇文章都经过精心编写，确保为读者带来实用的知识和见解。
          </p>
        </div>
      </div>
    </div>
  )
}

import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useState } from 'react'

/**
 * 标签云组件
 * @param {*} props
 * @returns
 */
export default function TagCloud({ tagOptions, currentTag }) {
  const { locale } = useGlobal()
  const [showAll, setShowAll] = useState(false)

  if (!tagOptions || tagOptions.length === 0) {
    return <></>
  }

  // 按文章数量排序标签
  const sortedTags = tagOptions.sort((a, b) => b.count - a.count)
  
  // 显示的标签数量
  const displayTags = showAll ? sortedTags : sortedTags.slice(0, 20)

  // 计算标签字体大小
  const getTagSize = (count) => {
    const maxCount = Math.max(...tagOptions.map(tag => tag.count))
    const minCount = Math.min(...tagOptions.map(tag => tag.count))
    const ratio = (count - minCount) / (maxCount - minCount)
    return Math.max(0.8, Math.min(1.5, 0.8 + ratio * 0.7))
  }

  // 生成随机颜色
  const getTagColor = (index) => {
    const colors = [
      'text-blue-500 hover:text-blue-700',
      'text-green-500 hover:text-green-700',
      'text-purple-500 hover:text-purple-700',
      'text-red-500 hover:text-red-700',
      'text-yellow-500 hover:text-yellow-700',
      'text-indigo-500 hover:text-indigo-700',
      'text-pink-500 hover:text-pink-700',
      'text-teal-500 hover:text-teal-700'
    ]
    return colors[index % colors.length]
  }

  return (
    <div className='bg-white dark:bg-[#1e1e1e] rounded-xl p-6 shadow-md'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-bold text-gray-800 dark:text-gray-200'>
          <i className='fas fa-tags mr-2' />
          {locale.COMMON.TAGS || '标签云'}
        </h3>
        {sortedTags.length > 20 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className='text-sm text-blue-500 hover:text-blue-700 transition-colors'>
            {showAll ? '收起' : '展开全部'}
          </button>
        )}
      </div>
      
      <div className='flex flex-wrap gap-2'>
        {displayTags.map((tag, index) => {
          const isActive = currentTag === tag.name
          const fontSize = getTagSize(tag.count)
          const colorClass = getTagColor(index)
          
          return (
            <Link
              key={tag.name}
              href={`/tag/${tag.name}`}
              className={`
                inline-block px-3 py-1 rounded-full text-sm font-medium
                transition-all duration-200 hover:scale-105
                ${isActive 
                  ? 'bg-blue-500 text-white' 
                  : `bg-gray-100 dark:bg-gray-700 ${colorClass} dark:text-gray-300`
                }
              `}
              style={{ fontSize: `${fontSize}em` }}
              title={`${tag.name} (${tag.count} 篇文章)`}>
              {tag.name}
              <span className='ml-1 text-xs opacity-70'>
                {tag.count}
              </span>
            </Link>
          )
        })}
      </div>
      
      {showAll && sortedTags.length > 20 && (
        <div className='mt-4 text-center'>
          <button
            onClick={() => setShowAll(false)}
            className='text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'>
            收起标签
          </button>
        </div>
      )}
    </div>
  )
}

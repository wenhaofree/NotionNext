import { useEffect } from 'react'
import { siteConfig } from '@/lib/config'

/**
 * 内部链接优化组件
 * 自动为文章内容添加内部链接，提升 SEO 和用户体验
 */
export default function InternalLinkOptimizer({ allPosts, currentPost }) {
  useEffect(() => {
    if (!allPosts || !currentPost || typeof window === 'undefined') return

    // 延迟执行，确保页面内容已加载
    const timer = setTimeout(() => {
      optimizeInternalLinks(allPosts, currentPost)
    }, 1000)

    return () => clearTimeout(timer)
  }, [allPosts, currentPost])

  return null // 这是一个功能性组件，不渲染任何内容
}

/**
 * 优化内部链接
 * @param {Array} allPosts 所有文章
 * @param {Object} currentPost 当前文章
 */
function optimizeInternalLinks(allPosts, currentPost) {
  const articleContent = document.querySelector('#notion-article')
  if (!articleContent) return

  // 获取相关文章（排除当前文章）
  const relatedPosts = allPosts
    .filter(post => 
      post.id !== currentPost.id && 
      post.status === 'Published' &&
      post.type === 'Post'
    )
    .slice(0, 20) // 限制数量，避免过度链接

  // 创建关键词映射
  const keywordMap = createKeywordMap(relatedPosts)

  // 处理文本节点
  processTextNodes(articleContent, keywordMap, currentPost.slug)
}

/**
 * 创建关键词到文章的映射
 * @param {Array} posts 文章列表
 * @returns {Map} 关键词映射
 */
function createKeywordMap(posts) {
  const keywordMap = new Map()

  posts.forEach(post => {
    // 添加标题关键词
    if (post.title) {
      const titleWords = extractKeywords(post.title)
      titleWords.forEach(word => {
        if (word.length >= 2) { // 只处理长度>=2的词
          if (!keywordMap.has(word)) {
            keywordMap.set(word, [])
          }
          keywordMap.get(word).push({
            title: post.title,
            slug: post.slug,
            category: post.category?.[0],
            priority: 3 // 标题关键词优先级最高
          })
        }
      })
    }

    // 添加分类关键词
    if (post.category && post.category[0]) {
      const category = post.category[0]
      if (!keywordMap.has(category)) {
        keywordMap.set(category, [])
      }
      keywordMap.get(category).push({
        title: post.title,
        slug: post.slug,
        category: category,
        priority: 2
      })
    }

    // 添加标签关键词
    if (post.tags) {
      post.tags.forEach(tag => {
        if (!keywordMap.has(tag)) {
          keywordMap.set(tag, [])
        }
        keywordMap.get(tag).push({
          title: post.title,
          slug: post.slug,
          category: post.category?.[0],
          priority: 1
        })
      })
    }
  })

  return keywordMap
}

/**
 * 提取关键词
 * @param {string} text 文本
 * @returns {Array} 关键词数组
 */
function extractKeywords(text) {
  if (!text) return []

  // 移除标点符号，分割成词
  const words = text
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length >= 2)

  // 对于中文，也尝试提取2-4字的词组
  const chineseWords = []
  for (let i = 0; i < text.length - 1; i++) {
    for (let len = 2; len <= 4 && i + len <= text.length; len++) {
      const word = text.substr(i, len)
      if (/^[\u4e00-\u9fa5]+$/.test(word)) {
        chineseWords.push(word)
      }
    }
  }

  return [...words, ...chineseWords]
}

/**
 * 处理文本节点，添加内部链接
 * @param {Element} container 容器元素
 * @param {Map} keywordMap 关键词映射
 * @param {string} currentSlug 当前文章slug
 */
function processTextNodes(container, keywordMap, currentSlug) {
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        // 跳过已经在链接内的文本
        if (node.parentElement.tagName === 'A') {
          return NodeFilter.FILTER_REJECT
        }
        // 跳过代码块内的文本
        if (node.parentElement.tagName === 'CODE' || 
            node.parentElement.className.includes('code')) {
          return NodeFilter.FILTER_REJECT
        }
        return NodeFilter.FILTER_ACCEPT
      }
    }
  )

  const textNodes = []
  let node
  while (node = walker.nextNode()) {
    textNodes.push(node)
  }

  // 记录已添加的链接，避免重复
  const addedLinks = new Set()
  let linkCount = 0
  const maxLinks = 5 // 限制每篇文章最多添加5个内部链接

  textNodes.forEach(textNode => {
    if (linkCount >= maxLinks) return

    let text = textNode.textContent
    let hasReplacement = false
    let newHTML = text

    // 按优先级排序关键词
    const sortedKeywords = Array.from(keywordMap.entries())
      .sort((a, b) => {
        const aPriority = Math.max(...a[1].map(item => item.priority))
        const bPriority = Math.max(...b[1].map(item => item.priority))
        return bPriority - aPriority
      })

    for (const [keyword, posts] of sortedKeywords) {
      if (linkCount >= maxLinks) break
      if (addedLinks.has(keyword)) continue

      // 选择最佳匹配的文章
      const bestPost = posts
        .sort((a, b) => b.priority - a.priority)[0]

      if (bestPost.slug === currentSlug) continue

      // 查找关键词在文本中的位置
      const regex = new RegExp(`\\b${escapeRegExp(keyword)}\\b`, 'i')
      if (regex.test(text)) {
        const linkHTML = `<a href="${siteConfig('SUB_PATH', '')}/${bestPost.slug}" class="internal-link text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline" title="${bestPost.title}">${keyword}</a>`
        newHTML = newHTML.replace(regex, linkHTML)
        hasReplacement = true
        addedLinks.add(keyword)
        linkCount++
        break // 每个文本节点只添加一个链接
      }
    }

    // 如果有替换，更新DOM
    if (hasReplacement) {
      const wrapper = document.createElement('span')
      wrapper.innerHTML = newHTML
      textNode.parentNode.replaceChild(wrapper, textNode)
      
      // 将wrapper的内容移到父节点，移除wrapper
      while (wrapper.firstChild) {
        wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper)
      }
      wrapper.parentNode.removeChild(wrapper)
    }
  })
}

/**
 * 转义正则表达式特殊字符
 * @param {string} string 字符串
 * @returns {string} 转义后的字符串
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * 内部链接样式组件
 * 为自动添加的内部链接提供样式
 */
export function InternalLinkStyles() {
  return (
    <style jsx global>{`
      .internal-link {
        position: relative;
        text-decoration: underline;
        text-decoration-color: rgba(59, 130, 246, 0.5);
        text-underline-offset: 2px;
        transition: all 0.2s ease;
      }
      
      .internal-link:hover {
        text-decoration-color: rgba(59, 130, 246, 1);
        text-underline-offset: 3px;
      }
      
      .internal-link::after {
        content: '🔗';
        font-size: 0.7em;
        margin-left: 2px;
        opacity: 0.6;
      }
      
      .dark .internal-link {
        text-decoration-color: rgba(96, 165, 250, 0.5);
      }
      
      .dark .internal-link:hover {
        text-decoration-color: rgba(96, 165, 250, 1);
      }
    `}</style>
  )
}

/**
 * 相关文章建议组件
 * 在文章末尾显示相关文章建议
 */
export function RelatedPostsSuggestion({ currentPost, allPosts, maxSuggestions = 3 }) {
  if (!currentPost || !allPosts) return null

  const relatedPosts = allPosts
    .filter(post => 
      post.id !== currentPost.id && 
      post.status === 'Published' &&
      post.type === 'Post'
    )
    .slice(0, maxSuggestions)

  if (relatedPosts.length === 0) return null

  return (
    <div className="related-posts-suggestion bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mt-8">
      <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        您可能还感兴趣
      </h3>
      
      <div className="space-y-3">
        {relatedPosts.map((post, index) => (
          <a
            key={post.id}
            href={`${siteConfig('SUB_PATH', '')}/${post.slug}`}
            className="block p-3 bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
          >
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
              {post.title}
            </h4>
            {post.summary && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {post.summary}
              </p>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}

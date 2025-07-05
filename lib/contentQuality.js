/**
 * 内容质量检测工具
 * 用于 Google AdSense 优化，提升内容价值
 */

/**
 * 计算文章字数（中英文混合）
 * @param {string} text 文本内容
 * @returns {number} 字数
 */
export function countWords(text) {
  if (!text) return 0
  
  // 移除HTML标签
  const cleanText = text.replace(/<[^>]*>/g, '')
  
  // 计算中文字符
  const chineseChars = (cleanText.match(/[\u4e00-\u9fa5]/g) || []).length
  
  // 计算英文单词
  const englishWords = (cleanText.match(/[a-zA-Z]+/g) || []).length
  
  // 计算数字
  const numbers = (cleanText.match(/\d+/g) || []).length
  
  return chineseChars + englishWords + numbers
}

/**
 * 计算阅读时间（分钟）
 * @param {number} wordCount 字数
 * @param {string} lang 语言
 * @returns {number} 阅读时间（分钟）
 */
export function calculateReadingTime(wordCount, lang = 'zh') {
  // 中文阅读速度约300字/分钟，英文约200词/分钟
  const wordsPerMinute = lang.startsWith('zh') ? 300 : 200
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

/**
 * 分析文章内容结构
 * @param {object} post Notion文章对象
 * @returns {object} 内容分析结果
 */
export function analyzePostContent(post) {
  if (!post?.blockMap) {
    return {
      wordCount: 0,
      readingTime: 0,
      headingCount: 0,
      imageCount: 0,
      codeBlockCount: 0,
      listCount: 0,
      qualityScore: 0,
      suggestions: ['无法分析内容结构']
    }
  }

  let wordCount = 0
  let headingCount = 0
  let imageCount = 0
  let codeBlockCount = 0
  let listCount = 0
  let linkCount = 0
  let quoteCount = 0

  // 遍历所有块
  Object.values(post.blockMap.block).forEach(block => {
    const blockValue = block?.value
    if (!blockValue) return

    const blockType = blockValue.type
    const properties = blockValue.properties

    switch (blockType) {
      case 'text':
        if (properties?.title) {
          wordCount += countWords(properties.title[0][0])
          // 检测链接
          if (properties.title[0][1]) {
            linkCount += properties.title[0][1].filter(item => item[0] === 'a').length
          }
        }
        break
      
      case 'header':
      case 'sub_header':
      case 'sub_sub_header':
        headingCount++
        if (properties?.title) {
          wordCount += countWords(properties.title[0][0])
        }
        break
      
      case 'bulleted_list':
      case 'numbered_list':
        listCount++
        if (properties?.title) {
          wordCount += countWords(properties.title[0][0])
        }
        break
      
      case 'quote':
        quoteCount++
        if (properties?.title) {
          wordCount += countWords(properties.title[0][0])
        }
        break
      
      case 'image':
        imageCount++
        break
      
      case 'code':
        codeBlockCount++
        if (properties?.title) {
          wordCount += countWords(properties.title[0][0]) * 0.5 // 代码权重降低
        }
        break
    }
  })

  const readingTime = calculateReadingTime(wordCount)
  const qualityScore = calculateQualityScore({
    wordCount,
    headingCount,
    imageCount,
    codeBlockCount,
    listCount,
    linkCount,
    quoteCount
  })

  const suggestions = generateQualitySuggestions({
    wordCount,
    headingCount,
    imageCount,
    codeBlockCount,
    listCount,
    linkCount,
    qualityScore
  })

  return {
    wordCount,
    readingTime,
    headingCount,
    imageCount,
    codeBlockCount,
    listCount,
    linkCount,
    quoteCount,
    qualityScore,
    suggestions
  }
}

/**
 * 计算内容质量分数
 * @param {object} stats 内容统计
 * @returns {number} 质量分数 (0-100)
 */
export function calculateQualityScore(stats) {
  const { wordCount, headingCount, imageCount, codeBlockCount, listCount, linkCount } = stats
  let score = 0

  // 字数评分 (40%)
  if (wordCount >= 2000) score += 40
  else if (wordCount >= 1500) score += 35
  else if (wordCount >= 1200) score += 30
  else if (wordCount >= 1000) score += 25
  else if (wordCount >= 800) score += 20
  else if (wordCount >= 500) score += 15
  else if (wordCount >= 300) score += 10
  else score += 5

  // 结构评分 (25%)
  if (headingCount >= 6) score += 25
  else if (headingCount >= 4) score += 20
  else if (headingCount >= 3) score += 15
  else if (headingCount >= 2) score += 10
  else if (headingCount >= 1) score += 5

  // 媒体内容评分 (15%)
  if (imageCount >= 5) score += 15
  else if (imageCount >= 3) score += 12
  else if (imageCount >= 2) score += 8
  else if (imageCount >= 1) score += 5

  // 技术内容评分 (10%)
  if (codeBlockCount >= 3) score += 10
  else if (codeBlockCount >= 2) score += 7
  else if (codeBlockCount >= 1) score += 5

  // 列表和组织评分 (5%)
  if (listCount >= 3) score += 5
  else if (listCount >= 2) score += 3
  else if (listCount >= 1) score += 2

  // 链接评分 (5%)
  if (linkCount >= 5) score += 5
  else if (linkCount >= 3) score += 3
  else if (linkCount >= 1) score += 2

  return Math.min(100, Math.max(0, score))
}

/**
 * 生成质量改进建议
 * @param {object} stats 内容统计
 * @returns {array} 建议列表
 */
export function generateQualitySuggestions(stats) {
  const { wordCount, headingCount, imageCount, linkCount, qualityScore } = stats
  const suggestions = []

  if (wordCount < 800) {
    suggestions.push('建议增加文章长度至800字以上，提供更深入的内容')
  }

  if (wordCount < 1200) {
    suggestions.push('考虑扩展内容至1200字以上，这是 AdSense 偏好的文章长度')
  }

  if (headingCount < 3) {
    suggestions.push('添加更多标题层级，改善文章结构和可读性')
  }

  if (imageCount === 0) {
    suggestions.push('添加相关图片或图表，提升内容的视觉吸引力')
  }

  if (imageCount < 2) {
    suggestions.push('考虑添加更多图片，平均每500字配一张图片')
  }

  if (linkCount < 3) {
    suggestions.push('添加更多内部链接，提升网站内容的关联性')
  }

  if (qualityScore < 60) {
    suggestions.push('内容质量需要提升，建议增加实用性和深度')
  }

  if (qualityScore < 80) {
    suggestions.push('内容质量良好，可通过增加案例和实例进一步提升')
  }

  if (suggestions.length === 0) {
    suggestions.push('内容质量优秀，符合高质量内容标准')
  }

  return suggestions
}

/**
 * 获取内容质量等级
 * @param {number} score 质量分数
 * @returns {object} 等级信息
 */
export function getQualityLevel(score) {
  if (score >= 90) {
    return {
      level: 'excellent',
      label: '优秀',
      color: 'green',
      description: '内容质量优秀，完全符合 AdSense 要求'
    }
  } else if (score >= 75) {
    return {
      level: 'good',
      label: '良好',
      color: 'blue',
      description: '内容质量良好，基本符合 AdSense 要求'
    }
  } else if (score >= 60) {
    return {
      level: 'fair',
      label: '一般',
      color: 'yellow',
      description: '内容质量一般，建议进一步优化'
    }
  } else {
    return {
      level: 'poor',
      label: '待改进',
      color: 'red',
      description: '内容质量需要大幅提升'
    }
  }
}

/**
 * 检查是否符合 AdSense 内容要求
 * @param {object} stats 内容统计
 * @returns {object} 检查结果
 */
export function checkAdSenseCompliance(stats) {
  const { wordCount, qualityScore } = stats
  const issues = []
  const passed = []

  // 字数检查
  if (wordCount >= 800) {
    passed.push('✅ 文章长度符合要求 (≥800字)')
  } else {
    issues.push('❌ 文章长度不足，建议至少800字')
  }

  // 质量分数检查
  if (qualityScore >= 70) {
    passed.push('✅ 内容质量评分达标')
  } else {
    issues.push('❌ 内容质量评分偏低，需要提升')
  }

  // 结构检查
  if (stats.headingCount >= 2) {
    passed.push('✅ 文章结构清晰')
  } else {
    issues.push('❌ 缺少标题层级，影响可读性')
  }

  return {
    compliant: issues.length === 0,
    score: qualityScore,
    issues,
    passed
  }
}

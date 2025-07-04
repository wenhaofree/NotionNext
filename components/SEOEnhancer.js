import Head from 'next/head'
import { siteConfig } from '@/lib/config'

/**
 * SEO增强组件
 * 为网站添加结构化数据和高级SEO优化
 */
const SEOEnhancer = ({ post, meta, siteInfo }) => {
  const siteName = siteConfig('TITLE')
  const siteUrl = siteConfig('LINK')
  const author = siteConfig('AUTHOR')
  
  // 生成结构化数据
  const generateStructuredData = () => {
    const baseStructuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        // 网站信息
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: siteUrl,
          name: siteName,
          description: siteConfig('BIO'),
          publisher: {
            '@id': `${siteUrl}/#organization`
          },
          potentialAction: [
            {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteUrl}/search?q={search_term_string}`
              },
              'query-input': 'required name=search_term_string'
            }
          ],
          inLanguage: 'zh-CN'
        },
        // 组织信息
        {
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
          name: siteName,
          url: siteUrl,
          logo: {
            '@type': 'ImageObject',
            inLanguage: 'zh-CN',
            '@id': `${siteUrl}/#/schema/logo/image/`,
            url: `${siteUrl}/favicon.ico`,
            contentUrl: `${siteUrl}/favicon.ico`,
            width: 512,
            height: 512,
            caption: siteName
          },
          image: {
            '@id': `${siteUrl}/#/schema/logo/image/`
          },
          sameAs: [
            siteConfig('CONTACT_GITHUB') || '',
            siteConfig('CONTACT_TWITTER') || '',
            siteConfig('CONTACT_LINKEDIN') || ''
          ].filter(Boolean)
        }
      ]
    }

    // 如果是文章页面，添加文章结构化数据
    if (post && post.type === 'Post') {
      baseStructuredData['@graph'].push({
        '@type': 'Article',
        '@id': `${siteUrl}/${post.slug}/#article`,
        isPartOf: {
          '@id': `${siteUrl}/${post.slug}/#webpage`
        },
        author: {
          '@type': 'Person',
          name: author,
          '@id': `${siteUrl}/#/schema/person/`
        },
        headline: post.title,
        datePublished: post.publishDate,
        dateModified: post.lastEditedDate || post.publishDate,
        mainEntityOfPage: {
          '@id': `${siteUrl}/${post.slug}/#webpage`
        },
        wordCount: post.summary?.length || 800,
        commentCount: 0,
        publisher: {
          '@id': `${siteUrl}/#organization`
        },
        image: post.pageCover ? {
          '@type': 'ImageObject',
          inLanguage: 'zh-CN',
          '@id': `${siteUrl}/${post.slug}/#primaryimage`,
          url: post.pageCover,
          contentUrl: post.pageCover,
          caption: post.title
        } : undefined,
        thumbnailUrl: post.pageCoverThumbnail,
        keywords: post.tags?.join(',') || 'AI技术,人工智能',
        articleSection: post.category || 'AI技术',
        inLanguage: 'zh-CN',
        potentialAction: [
          {
            '@type': 'CommentAction',
            name: 'Comment',
            target: [`${siteUrl}/${post.slug}/#respond`]
          }
        ]
      })

      // 添加网页结构化数据
      baseStructuredData['@graph'].push({
        '@type': 'WebPage',
        '@id': `${siteUrl}/${post.slug}/#webpage`,
        url: `${siteUrl}/${post.slug}`,
        name: post.title,
        isPartOf: {
          '@id': `${siteUrl}/#website`
        },
        primaryImageOfPage: post.pageCover ? {
          '@id': `${siteUrl}/${post.slug}/#primaryimage`
        } : undefined,
        image: post.pageCover ? {
          '@id': `${siteUrl}/${post.slug}/#primaryimage`
        } : undefined,
        thumbnailUrl: post.pageCoverThumbnail,
        datePublished: post.publishDate,
        dateModified: post.lastEditedDate || post.publishDate,
        description: post.summary,
        breadcrumb: {
          '@id': `${siteUrl}/${post.slug}/#breadcrumb`
        },
        inLanguage: 'zh-CN',
        potentialAction: [
          {
            '@type': 'ReadAction',
            target: [`${siteUrl}/${post.slug}`]
          }
        ]
      })

      // 添加面包屑导航
      baseStructuredData['@graph'].push({
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/${post.slug}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: '首页',
            item: siteUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: post.category || 'AI技术',
            item: `${siteUrl}/category/${post.category || 'ai'}`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title
          }
        ]
      })
    }

    return baseStructuredData
  }

  const structuredData = generateStructuredData()

  return (
    <Head>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* 增强的Meta标签 */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* 文章特定的Meta标签 */}
      {post && post.type === 'Post' && (
        <>
          <meta property="article:published_time" content={post.publishDate} />
          <meta property="article:modified_time" content={post.lastEditedDate || post.publishDate} />
          <meta property="article:author" content={author} />
          <meta property="article:section" content={post.category || 'AI技术'} />
          {post.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* 网站验证 */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="msvalidate.01" content="your-bing-verification-code" />
      
      {/* 额外的SEO标签 */}
      <meta name="theme-color" content="#0060e0" />
      <meta name="msapplication-TileColor" content="#0060e0" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* RSS Feed */}
      <link rel="alternate" type="application/rss+xml" title={`${siteName} RSS Feed`} href={`${siteUrl}/rss.xml`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={post ? `${siteUrl}/${post.slug}` : siteUrl} />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
    </Head>
  )
}

export default SEOEnhancer

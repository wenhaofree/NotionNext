// eslint-disable-next-line @next/next/no-document-import-in-page
import BLOG from '@/blog.config'
import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang={BLOG.LANG}>
        <Head>
          {/* 预加载字体 */}
          {BLOG.FONT_AWESOME && (
            <>
              <link
                rel='preload'
                href={BLOG.FONT_AWESOME}
                as='style'
                crossOrigin='anonymous'
              />
              <link
                rel='stylesheet'
                href={BLOG.FONT_AWESOME}
                crossOrigin='anonymous'
                referrerPolicy='no-referrer'
              />
            </>
          )}
          
          {/* 添加SEO优化标签 */}
          <meta name="robots" content={BLOG.SEO_TOBOTS_TAG || 'all'} />
          <meta name="author" content={BLOG.AUTHOR} />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          
          {/* 添加结构化数据，告诉搜索引擎这是一个文章网站 */}
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "${BLOG.TITLE || '一兆资源网'}",
                "description": "${BLOG.BIO || '您的数字宝藏收藏夹📂'}",
                "url": "${BLOG.LINK || 'https://yzzzzy.com'}"
              }
            `}
          </script>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

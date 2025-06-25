import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { getLayoutByTheme } from '@/themes/theme'
import { useRouter } from 'next/router'

/**
 * 使用条款页面
 * @param {*} props
 * @returns
 */
const Terms = props => {
  // 根据页面路径加载不同Layout文件
  const Layout = getLayoutByTheme({
    theme: siteConfig('THEME'),
    router: useRouter()
  })

  // 创建使用条款页面的内容
  const termsContent = {
    id: 'terms-page',
    type: 'Page',
    title: '使用条款',
    slug: 'terms',
    status: 'Published',
    summary: '使用本网站前请仔细阅读以下使用条款和服务协议',
    publishDay: new Date().toISOString().split('T')[0],
    lastEditedDay: new Date().toISOString().split('T')[0],
    blockMap: {
      block: {
        'terms-content': {
          value: {
            id: 'terms-content',
            type: 'page',
            properties: {
              title: [['使用条款']]
            }
          }
        }
      }
    }
  }

  // 将使用条款内容添加到props中
  const termsProps = {
    ...props,
    post: termsContent,
    meta: {
      title: '使用条款 - 文浩的技术博客',
      description: '文浩技术博客的使用条款和服务协议，包括网站使用规则、内容版权、免责声明等重要条款。',
      type: 'Page',
      slug: 'terms',
      publishDay: new Date().toISOString().split('T')[0],
      lastEditedDay: new Date().toISOString().split('T')[0]
    }
  }

  return <Layout {...termsProps} />
}

export async function getStaticProps({ locale }) {
  const props = await getGlobalData({ from: 'terms-page', locale })
  
  delete props.allPages
  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          86400, // 24小时更新一次
          props.NOTION_CONFIG
        )
  }
}

export default Terms

import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { getLayoutByTheme } from '@/themes/theme'
import { useRouter } from 'next/router'

/**
 * 隐私政策页面
 * @param {*} props
 * @returns
 */
const Privacy = props => {
  // 根据页面路径加载不同Layout文件
  const Layout = getLayoutByTheme({
    theme: siteConfig('THEME'),
    router: useRouter()
  })

  // 创建隐私政策页面的内容
  const privacyContent = {
    id: 'privacy-page',
    type: 'Page',
    title: '隐私政策',
    slug: 'privacy',
    status: 'Published',
    summary: '了解我们如何收集、使用和保护您的个人信息',
    publishDay: new Date().toISOString().split('T')[0],
    lastEditedDay: new Date().toISOString().split('T')[0],
    blockMap: {
      block: {
        'privacy-content': {
          value: {
            id: 'privacy-content',
            type: 'page',
            properties: {
              title: [['隐私政策']]
            }
          }
        }
      }
    }
  }

  // 将隐私政策内容添加到props中
  const privacyProps = {
    ...props,
    post: privacyContent,
    meta: {
      title: '隐私政策 - 文浩的技术博客',
      description: '了解文浩技术博客的隐私政策，包括信息收集、使用方式、数据保护措施等重要内容。',
      type: 'Page',
      slug: 'privacy',
      publishDay: new Date().toISOString().split('T')[0],
      lastEditedDay: new Date().toISOString().split('T')[0]
    }
  }

  return <Layout {...privacyProps} />
}

export async function getStaticProps({ locale }) {
  const props = await getGlobalData({ from: 'privacy-page', locale })
  
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

export default Privacy

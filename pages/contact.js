import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { getLayoutByTheme } from '@/themes/theme'
import { useRouter } from 'next/router'

/**
 * 联系我们页面
 * @param {*} props
 * @returns
 */
const Contact = props => {
  // 根据页面路径加载不同Layout文件
  const Layout = getLayoutByTheme({
    theme: siteConfig('THEME'),
    router: useRouter()
  })

  // 创建联系页面的内容
  const contactContent = {
    id: 'contact-page',
    type: 'Page',
    title: '联系我',
    slug: 'contact',
    status: 'Published',
    summary: '通过多种方式与我取得联系，欢迎技术交流与合作',
    publishDay: new Date().toISOString().split('T')[0],
    lastEditedDay: new Date().toISOString().split('T')[0],
    blockMap: {
      block: {
        'contact-content': {
          value: {
            id: 'contact-content',
            type: 'page',
            properties: {
              title: [['联系我']]
            }
          }
        }
      }
    }
  }

  // 将联系页面内容添加到props中
  const contactProps = {
    ...props,
    post: contactContent,
    meta: {
      title: '联系我 - 文浩的技术博客',
      description: '通过邮箱、GitHub等多种方式与文浩取得联系，欢迎技术交流、合作洽谈和问题咨询。',
      type: 'Page',
      slug: 'contact',
      publishDay: new Date().toISOString().split('T')[0],
      lastEditedDay: new Date().toISOString().split('T')[0]
    }
  }

  return <Layout {...contactProps} />
}

export async function getStaticProps({ locale }) {
  const props = await getGlobalData({ from: 'contact-page', locale })
  
  delete props.allPages
  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          3600, // 1小时更新一次
          props.NOTION_CONFIG
        )
  }
}

export default Contact

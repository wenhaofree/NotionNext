import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { getLayoutByTheme } from '@/themes/theme'
import { useRouter } from 'next/router'

/**
 * 关于页面
 * @param {*} props
 * @returns
 */
const About = props => {
  // 根据页面路径加载不同Layout文件
  const Layout = getLayoutByTheme({
    theme: siteConfig('THEME'),
    router: useRouter()
  })

  // 创建关于页面的内容
  const aboutContent = {
    id: 'about-page',
    type: 'Page',
    title: '关于我',
    slug: 'about',
    status: 'Published',
    summary: '了解更多关于文浩和这个技术博客的信息',
    blockMap: {
      block: {
        'about-content': {
          value: {
            id: 'about-content',
            type: 'page',
            properties: {
              title: [['关于我']]
            },
            content: [
              'intro-block',
              'skills-block',
              'experience-block',
              'contact-block'
            ]
          }
        },
        'intro-block': {
          value: {
            id: 'intro-block',
            type: 'text',
            properties: {
              title: [['👋 你好，我是文浩']]
            },
            format: {
              block_color: 'default'
            }
          }
        }
      }
    }
  }

  // 将关于页面内容添加到props中
  const aboutProps = {
    ...props,
    post: aboutContent,
    meta: {
      title: '关于我 - 文浩的技术博客',
      description: '了解更多关于文浩和这个技术博客的信息，包括技术背景、专业技能、工作经验和联系方式。',
      type: 'Page',
      slug: 'about'
    }
  }

  return <Layout {...aboutProps} />
}

export async function getStaticProps({ locale }) {
  const props = await getGlobalData({ from: 'about-page', locale })
  
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

export default About

import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { getLayoutByTheme } from '@/themes/theme'
import { useRouter } from 'next/router'

/**
 * 关于我们页面
 * 提供详细的网站介绍、团队信息、使命愿景等内容
 */
const About = props => {
  // 根据页面路径加载不同Layout文件
  const Layout = getLayoutByTheme({
    theme: siteConfig('THEME'),
    router: useRouter()
  })

  // 创建关于页面的丰富内容
  const aboutContent = {
    id: 'about-page',
    type: 'Page',
    title: '关于 AIGPTGOD',
    slug: 'about',
    status: 'Published',
    summary: '了解 AIGPTGOD - 专业的AI技术资讯平台，致力于为用户提供最新、最有价值的人工智能内容',
    blockMap: {
      block: {
        'about-content': {
          value: {
            id: 'about-content',
            type: 'page',
            properties: {
              title: [['关于 AIGPTGOD']]
            },
            content: [
              'mission-block',
              'values-block',
              'features-block',
              'team-block',
              'contact-block'
            ]
          }
        },
        'mission-block': {
          value: {
            id: 'mission-block',
            type: 'text',
            properties: {
              title: [['🚀 我们的使命']]
            },
            format: {
              block_color: 'blue'
            }
          }
        },
        'values-block': {
          value: {
            id: 'values-block',
            type: 'text',
            properties: {
              title: [['💎 核心价值']]
            },
            format: {
              block_color: 'green'
            }
          }
        },
        'features-block': {
          value: {
            id: 'features-block',
            type: 'text',
            properties: {
              title: [['⭐ 内容特色']]
            },
            format: {
              block_color: 'purple'
            }
          }
        },
        'team-block': {
          value: {
            id: 'team-block',
            type: 'text',
            properties: {
              title: [['👥 我们的团队']]
            },
            format: {
              block_color: 'orange'
            }
          }
        },
        'contact-block': {
          value: {
            id: 'contact-block',
            type: 'text',
            properties: {
              title: [['📧 联系我们']]
            },
            format: {
              block_color: 'red'
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
      title: '关于我们 - AIGPTGOD | 专业AI技术资讯平台',
      description: '了解 AIGPTGOD - 专业的AI技术资讯平台，致力于为用户提供最新、最有价值的人工智能内容。我们专注于AI技术分析、工具评测、行业趋势和实用教程。',
      type: 'Page',
      slug: 'about',
      keywords: 'AIGPTGOD, 关于我们, AI技术, 人工智能, 技术博客, AI资讯, 机器学习, 深度学习'
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

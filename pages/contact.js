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
    title: '联系我们',
    slug: 'contact',
    status: 'Published',
    summary: '与 AIGPTGOD 团队取得联系，我们重视每一位用户的反馈和建议，提供多种联系方式',
    publishDay: new Date().toISOString().split('T')[0],
    lastEditedDay: new Date().toISOString().split('T')[0],
    blockMap: {
      block: {
        'contact-content': {
          value: {
            id: 'contact-content',
            type: 'page',
            properties: {
              title: [['联系我们 - AIGPTGOD']]
            },
            content: [
              'intro-block',
              'email-block',
              'social-block',
              'feedback-block',
              'business-block',
              'response-block'
            ]
          }
        },
        'intro-block': {
          value: {
            id: 'intro-block',
            type: 'text',
            properties: {
              title: [['📞 我们重视您的每一条反馈']]
            },
            format: {
              block_color: 'blue'
            }
          }
        },
        'email-block': {
          value: {
            id: 'email-block',
            type: 'text',
            properties: {
              title: [['📧 邮件联系：contact@aigptgod.com']]
            },
            format: {
              block_color: 'green'
            }
          }
        },
        'social-block': {
          value: {
            id: 'social-block',
            type: 'text',
            properties: {
              title: [['🌐 关注我们的社交媒体获取最新资讯']]
            },
            format: {
              block_color: 'purple'
            }
          }
        },
        'feedback-block': {
          value: {
            id: 'feedback-block',
            type: 'text',
            properties: {
              title: [['💬 用户反馈和建议']]
            },
            format: {
              block_color: 'orange'
            }
          }
        },
        'business-block': {
          value: {
            id: 'business-block',
            type: 'text',
            properties: {
              title: [['🤝 商务合作与技术交流']]
            },
            format: {
              block_color: 'red'
            }
          }
        },
        'response-block': {
          value: {
            id: 'response-block',
            type: 'text',
            properties: {
              title: [['⏰ 我们通常在24小时内回复']]
            },
            format: {
              block_color: 'gray'
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
      title: '联系我们 - AIGPTGOD | 专业AI技术资讯平台',
      description: '与 AIGPTGOD 团队取得联系，我们重视每一位用户的反馈和建议。提供邮件、社交媒体等多种联系方式，欢迎商务合作、技术交流和用户反馈。',
      type: 'Page',
      slug: 'contact',
      keywords: '联系我们, AIGPTGOD, AI技术, 商务合作, 用户反馈, 技术交流, 人工智能',
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

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
    summary: 'AIGPTGOD 隐私政策 - 详细说明我们如何收集、使用和保护您的个人信息，确保用户隐私安全',
    publishDay: new Date().toISOString().split('T')[0],
    lastEditedDay: new Date().toISOString().split('T')[0],
    blockMap: {
      block: {
        'privacy-content': {
          value: {
            id: 'privacy-content',
            type: 'page',
            properties: {
              title: [['AIGPTGOD 隐私政策']]
            },
            content: [
              'intro-block',
              'collection-block',
              'usage-block',
              'protection-block',
              'cookies-block',
              'rights-block',
              'contact-block',
              'updates-block'
            ]
          }
        },
        'intro-block': {
          value: {
            id: 'intro-block',
            type: 'text',
            properties: {
              title: [['🔒 隐私保护承诺']]
            },
            format: {
              block_color: 'blue'
            }
          }
        },
        'collection-block': {
          value: {
            id: 'collection-block',
            type: 'text',
            properties: {
              title: [['📊 信息收集范围']]
            },
            format: {
              block_color: 'green'
            }
          }
        },
        'usage-block': {
          value: {
            id: 'usage-block',
            type: 'text',
            properties: {
              title: [['🎯 信息使用目的']]
            },
            format: {
              block_color: 'purple'
            }
          }
        },
        'protection-block': {
          value: {
            id: 'protection-block',
            type: 'text',
            properties: {
              title: [['🛡️ 数据安全措施']]
            },
            format: {
              block_color: 'orange'
            }
          }
        },
        'cookies-block': {
          value: {
            id: 'cookies-block',
            type: 'text',
            properties: {
              title: [['🍪 Cookie 和追踪技术']]
            },
            format: {
              block_color: 'red'
            }
          }
        },
        'rights-block': {
          value: {
            id: 'rights-block',
            type: 'text',
            properties: {
              title: [['⚖️ 用户权利和选择']]
            },
            format: {
              block_color: 'gray'
            }
          }
        },
        'contact-block': {
          value: {
            id: 'contact-block',
            type: 'text',
            properties: {
              title: [['📧 隐私问题联系方式']]
            },
            format: {
              block_color: 'yellow'
            }
          }
        },
        'updates-block': {
          value: {
            id: 'updates-block',
            type: 'text',
            properties: {
              title: [['🔄 政策更新通知']]
            },
            format: {
              block_color: 'teal'
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
      title: '隐私政策 - AIGPTGOD | 专业AI技术资讯平台',
      description: 'AIGPTGOD 隐私政策详细说明我们如何收集、使用和保护您的个人信息。我们承诺保护用户隐私，采用先进的安全措施，遵守相关法律法规。',
      type: 'Page',
      slug: 'privacy',
      keywords: '隐私政策, AIGPTGOD, 个人信息保护, 数据安全, Cookie政策, 用户权利',
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

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
    summary: 'AIGPTGOD 使用条款 - 详细规定网站使用规则、用户行为规范和服务协议，保护用户和平台权益',
    publishDay: new Date().toISOString().split('T')[0],
    lastEditedDay: new Date().toISOString().split('T')[0],
    blockMap: {
      block: {
        'terms-content': {
          value: {
            id: 'terms-content',
            type: 'page',
            properties: {
              title: [['AIGPTGOD 使用条款']]
            },
            content: [
              'intro-block',
              'acceptance-block',
              'services-block',
              'user-conduct-block',
              'content-block',
              'intellectual-property-block',
              'disclaimer-block',
              'limitation-block',
              'termination-block',
              'changes-block',
              'contact-block'
            ]
          }
        },
        'intro-block': {
          value: {
            id: 'intro-block',
            type: 'text',
            properties: {
              title: [['📋 服务条款概述']]
            },
            format: {
              block_color: 'blue'
            }
          }
        },
        'acceptance-block': {
          value: {
            id: 'acceptance-block',
            type: 'text',
            properties: {
              title: [['✅ 条款接受和生效']]
            },
            format: {
              block_color: 'green'
            }
          }
        },
        'services-block': {
          value: {
            id: 'services-block',
            type: 'text',
            properties: {
              title: [['🌐 服务内容和范围']]
            },
            format: {
              block_color: 'purple'
            }
          }
        },
        'user-conduct-block': {
          value: {
            id: 'user-conduct-block',
            type: 'text',
            properties: {
              title: [['👤 用户行为规范']]
            },
            format: {
              block_color: 'orange'
            }
          }
        },
        'content-block': {
          value: {
            id: 'content-block',
            type: 'text',
            properties: {
              title: [['📝 内容使用和版权']]
            },
            format: {
              block_color: 'red'
            }
          }
        },
        'intellectual-property-block': {
          value: {
            id: 'intellectual-property-block',
            type: 'text',
            properties: {
              title: [['©️ 知识产权保护']]
            },
            format: {
              block_color: 'gray'
            }
          }
        },
        'disclaimer-block': {
          value: {
            id: 'disclaimer-block',
            type: 'text',
            properties: {
              title: [['⚠️ 免责声明']]
            },
            format: {
              block_color: 'yellow'
            }
          }
        },
        'limitation-block': {
          value: {
            id: 'limitation-block',
            type: 'text',
            properties: {
              title: [['🚫 责任限制']]
            },
            format: {
              block_color: 'teal'
            }
          }
        },
        'termination-block': {
          value: {
            id: 'termination-block',
            type: 'text',
            properties: {
              title: [['🔚 服务终止条件']]
            },
            format: {
              block_color: 'pink'
            }
          }
        },
        'changes-block': {
          value: {
            id: 'changes-block',
            type: 'text',
            properties: {
              title: [['🔄 条款修改通知']]
            },
            format: {
              block_color: 'indigo'
            }
          }
        },
        'contact-block': {
          value: {
            id: 'contact-block',
            type: 'text',
            properties: {
              title: [['📧 法律事务联系']]
            },
            format: {
              block_color: 'brown'
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
      title: '使用条款 - AIGPTGOD | 专业AI技术资讯平台',
      description: 'AIGPTGOD 使用条款详细规定了网站的使用规则、用户行为规范、知识产权保护、免责声明等重要内容。使用本网站即表示您同意遵守这些条款。',
      type: 'Page',
      slug: 'terms',
      keywords: '使用条款, AIGPTGOD, 服务协议, 用户协议, 知识产权, 免责声明, 法律条款',
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

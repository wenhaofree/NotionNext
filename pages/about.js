import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { DynamicLayout } from '@/themes/theme'

/**
 * 关于我们页面
 * @param {*} props
 * @returns
 */
const About = props => {
  const theme = siteConfig('THEME', 'heo', props.NOTION_CONFIG)
  
  return (
    <DynamicLayout 
      theme={theme} 
      layoutName='LayoutPage' 
      {...props}
      customContent={<AboutContent />}
    />
  )
}

const AboutContent = () => {
  const AUTHOR = siteConfig('AUTHOR', '网站作者')
  const BIO = siteConfig('BIO', '分享知识，传递价值')
  const LINK = siteConfig('LINK', 'https://example.com')
  const SINCE = siteConfig('SINCE', new Date().getFullYear())

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">关于我们</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-12 text-center">
          <div className="mb-6">
            <img 
              src="/avatar.svg" 
              alt={AUTHOR}
              className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
            />
            <h2 className="text-2xl font-semibold mb-2">{AUTHOR}</h2>
            <p className="text-gray-600 text-lg">{BIO}</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">🎯 我们的使命</h2>
          <p className="mb-4">
            我们致力于创建一个高质量的知识分享平台，为读者提供有价值的内容和见解。
            通过分享经验、技术和思考，我们希望能够帮助更多的人学习成长。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">📝 内容领域</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">技术分享</h3>
              <ul className="list-disc pl-5 text-gray-700">
                <li>编程技术和最佳实践</li>
                <li>开发工具和框架介绍</li>
                <li>技术趋势和行业分析</li>
                <li>项目经验和案例分享</li>
              </ul>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-800">知识分享</h3>
              <ul className="list-disc pl-5 text-gray-700">
                <li>学习方法和思维模式</li>
                <li>职业发展和成长经验</li>
                <li>生活感悟和个人见解</li>
                <li>书籍推荐和读书笔记</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">🌟 我们的价值观</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold mb-2">专注质量</h3>
              <p className="text-gray-600">我们专注于创作高质量、有深度的内容，而不是追求数量。</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-lg font-semibold mb-2">开放分享</h3>
              <p className="text-gray-600">我们相信知识的力量，愿意开放地分享经验和见解。</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="text-lg font-semibold mb-2">持续成长</h3>
              <p className="text-gray-600">我们致力于持续学习和改进，与读者一起成长进步。</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">📊 网站数据</h2>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {new Date().getFullYear() - SINCE}+
              </div>
              <div className="text-sm text-gray-600">运营年数</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">100+</div>
              <div className="text-sm text-gray-600">原创文章</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">10K+</div>
              <div className="text-sm text-gray-600">月访问量</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">1K+</div>
              <div className="text-sm text-gray-600">订阅用户</div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">🛠️ 技术栈</h2>
          <p className="mb-4">
            本网站基于现代化的技术栈构建，确保快速、安全、可靠的用户体验：
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-semibold mb-2">前端技术</h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Next.js - React 全栈框架</li>
                <li>Tailwind CSS - 原子化 CSS 框架</li>
                <li>TypeScript - 类型安全的 JavaScript</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">基础设施</h4>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Vercel - 部署和托管平台</li>
                <li>Notion - 内容管理系统</li>
                <li>CDN - 全球内容分发网络</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">📞 联系我们</h2>
          <p className="mb-4">
            我们很乐意听到您的声音！如果您有任何问题、建议或合作意向，请随时联系我们：
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">📧 邮箱联系</h4>
              <p className="text-gray-600 mb-2">
                hello@{LINK.replace('https://', '').replace('http://', '')}
              </p>
              <p className="text-sm text-gray-500">
                我们通常在 24 小时内回复邮件
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">🌐 社交媒体</h4>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <a href="#" className="text-blue-600 hover:underline">Twitter</a> |
                  <a href="#" className="text-blue-600 hover:underline ml-2">GitHub</a> |
                  <a href="#" className="text-blue-600 hover:underline ml-2">LinkedIn</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">🤝 合作机会</h2>
          <p className="mb-4">
            我们欢迎以下类型的合作：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>技术交流和知识分享</li>
            <li>客座文章和内容合作</li>
            <li>产品评测和推荐</li>
            <li>技术咨询和培训</li>
            <li>开源项目协作</li>
          </ul>
        </section>

        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-3">感谢您的关注！</h3>
          <p className="text-gray-600 mb-4">
            感谢您访问我们的网站。如果您觉得我们的内容有价值，
            欢迎订阅我们的更新，与我们一起学习成长。
          </p>
          <div className="space-x-4">
            <a 
              href="/rss/feed.xml" 
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              订阅 RSS
            </a>
            <a 
              href="/contact" 
              className="inline-block px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              联系我们
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const from = 'about'
  const props = await getGlobalData({ from })
  
  // 设置页面元数据
  props.meta = {
    title: '关于我们',
    description: '了解我们的使命、价值观和团队。我们致力于分享高质量的技术内容和知识见解。',
    type: 'website',
    slug: 'about'
  }

  return {
    props,
    revalidate: 86400 // 24小时重新验证
  }
}

export default About

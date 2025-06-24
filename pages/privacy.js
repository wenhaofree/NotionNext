import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { DynamicLayout } from '@/themes/theme'
import { useRouter } from 'next/router'

/**
 * 隐私政策页面
 * @param {*} props
 * @returns
 */
const Privacy = props => {
  const router = useRouter()
  const theme = siteConfig('THEME', 'heo', props.NOTION_CONFIG)
  
  return (
    <DynamicLayout 
      theme={theme} 
      layoutName='LayoutPage' 
      {...props}
      customContent={<PrivacyContent />}
    />
  )
}

const PrivacyContent = () => {
  const AUTHOR = siteConfig('AUTHOR', '网站所有者')
  const LINK = siteConfig('LINK', 'https://example.com')
  const currentDate = new Date().toLocaleDateString('zh-CN')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">隐私政策</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">
          最后更新日期：{currentDate}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. 信息收集</h2>
          <p className="mb-4">
            我们可能收集以下类型的信息：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>您主动提供的信息（如评论、联系表单）</li>
            <li>自动收集的信息（如 IP 地址、浏览器类型、访问时间）</li>
            <li>Cookie 和类似技术收集的信息</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. 信息使用</h2>
          <p className="mb-4">
            我们使用收集的信息用于：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>提供和改进我们的服务</li>
            <li>回应您的询问和请求</li>
            <li>发送重要通知和更新</li>
            <li>分析网站使用情况以改善用户体验</li>
            <li>防止欺诈和滥用</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. 信息共享</h2>
          <p className="mb-4">
            我们不会出售、交易或转让您的个人信息给第三方，除非：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>获得您的明确同意</li>
            <li>法律要求或政府机关要求</li>
            <li>保护我们的权利、财产或安全</li>
            <li>与可信的第三方服务提供商合作（如分析服务）</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Cookie 使用</h2>
          <p className="mb-4">
            我们使用 Cookie 来：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>记住您的偏好设置</li>
            <li>分析网站流量和使用模式</li>
            <li>提供个性化内容</li>
            <li>改善网站功能和性能</li>
          </ul>
          <p className="mb-4">
            您可以通过浏览器设置控制 Cookie 的使用。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. 第三方服务</h2>
          <p className="mb-4">
            我们的网站可能使用以下第三方服务：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Google Analytics</strong>：用于网站分析</li>
            <li><strong>Google AdSense</strong>：用于展示广告</li>
            <li><strong>评论系统</strong>：用于用户互动</li>
            <li><strong>CDN 服务</strong>：用于内容分发</li>
          </ul>
          <p className="mb-4">
            这些服务有自己的隐私政策，我们建议您查阅相关政策。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. 数据安全</h2>
          <p className="mb-4">
            我们采取适当的安全措施来保护您的个人信息：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>使用 HTTPS 加密传输</li>
            <li>定期更新安全措施</li>
            <li>限制对个人信息的访问</li>
            <li>监控异常活动</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. 您的权利</h2>
          <p className="mb-4">
            您有权：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>访问我们持有的关于您的信息</li>
            <li>要求更正不准确的信息</li>
            <li>要求删除您的个人信息</li>
            <li>反对处理您的个人信息</li>
            <li>数据可携带权</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. 儿童隐私</h2>
          <p className="mb-4">
            我们的服务不面向 13 岁以下的儿童。我们不会故意收集 13 岁以下儿童的个人信息。
            如果我们发现收集了此类信息，我们将立即删除。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. 政策更新</h2>
          <p className="mb-4">
            我们可能会不时更新此隐私政策。重大变更将通过网站通知或电子邮件通知您。
            建议您定期查看此页面以了解最新信息。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. 联系我们</h2>
          <p className="mb-4">
            如果您对此隐私政策有任何问题或疑虑，请通过以下方式联系我们：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>网站：<a href={LINK} className="text-blue-600 hover:underline">{LINK}</a></li>
            <li>邮箱：privacy@{LINK.replace('https://', '').replace('http://', '')}</li>
          </ul>
        </section>

        <div className="mt-12 p-6 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            本隐私政策适用于 {AUTHOR} 运营的网站 {LINK}。
            通过使用我们的网站，您同意本隐私政策的条款。
          </p>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const from = 'privacy'
  const props = await getGlobalData({ from })
  
  // 设置页面元数据
  props.meta = {
    title: '隐私政策',
    description: '了解我们如何收集、使用和保护您的个人信息。我们致力于保护您的隐私权。',
    type: 'website',
    slug: 'privacy'
  }

  return {
    props,
    revalidate: 86400 // 24小时重新验证
  }
}

export default Privacy

import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { DynamicLayout } from '@/themes/theme'

/**
 * 免责声明页面
 * @param {*} props
 * @returns
 */
const Disclaimer = props => {
  const theme = siteConfig('THEME', 'heo', props.NOTION_CONFIG)
  
  return (
    <DynamicLayout 
      theme={theme} 
      layoutName='LayoutPage' 
      {...props}
      customContent={<DisclaimerContent />}
    />
  )
}

const DisclaimerContent = () => {
  const AUTHOR = siteConfig('AUTHOR', '网站所有者')
  const LINK = siteConfig('LINK', 'https://example.com')
  const currentDate = new Date().toLocaleDateString('zh-CN')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">免责声明</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">
          最后更新日期：{currentDate}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. 一般免责声明</h2>
          <p className="mb-4">
            本网站（{LINK}）上的信息仅供一般参考之用。我们努力保持信息的准确性和及时性，
            但不对信息的准确性、完整性、可靠性、适用性或可用性做出任何明示或暗示的保证。
          </p>
          <p className="mb-4">
            您对本网站信息的任何依赖都是严格自担风险的。在任何情况下，
            我们都不对因使用本网站信息而导致的任何损失或损害承担责任。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. 内容准确性</h2>
          <p className="mb-4">
            本网站包含的信息可能包含技术错误、印刷错误或其他错误。我们保留随时更改、
            修正或删除网站上任何信息的权利，恕不另行通知。
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>技术教程和代码示例仅供学习参考</li>
            <li>产品评测基于个人经验和观点</li>
            <li>行业分析反映特定时间点的情况</li>
            <li>第三方信息的准确性无法保证</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. 技术内容免责</h2>
          <p className="mb-4">
            本网站提供的技术内容、代码示例和教程：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>仅供教育和学习目的使用</li>
            <li>可能不适用于所有环境或情况</li>
            <li>使用前应进行充分测试</li>
            <li>我们不对因使用这些内容而导致的任何问题负责</li>
            <li>建议在生产环境中使用前咨询专业人士</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. 外部链接</h2>
          <p className="mb-4">
            本网站可能包含指向外部网站的链接。这些链接仅为方便用户提供，
            我们不对外部网站的内容、准确性、可用性或隐私政策负责。
          </p>
          <p className="mb-4">
            包含外部链接并不意味着我们认可或推荐该网站或其内容。
            访问外部链接的风险由用户自行承担。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. 投资和财务建议</h2>
          <p className="mb-4">
            本网站可能包含与投资、财务或商业相关的信息。这些信息：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>不构成专业的投资或财务建议</li>
            <li>仅供一般信息和教育目的</li>
            <li>不应作为投资决策的唯一依据</li>
            <li>投资有风险，决策需谨慎</li>
            <li>建议咨询专业的财务顾问</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. 产品推荐</h2>
          <p className="mb-4">
            本网站可能包含产品推荐或评测。请注意：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>推荐基于个人经验和观点</li>
            <li>可能存在联盟营销关系</li>
            <li>产品适用性因人而异</li>
            <li>价格和功能可能发生变化</li>
            <li>购买前请自行研究和比较</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. 用户生成内容</h2>
          <p className="mb-4">
            用户在本网站发布的评论、反馈或其他内容：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>代表用户个人观点，不代表我们的立场</li>
            <li>我们不对用户内容的准确性负责</li>
            <li>我们保留删除不当内容的权利</li>
            <li>用户对其发布的内容承担全部责任</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. 服务可用性</h2>
          <p className="mb-4">
            我们努力确保网站的持续可用性，但不能保证：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>网站将始终可访问</li>
            <li>服务不会中断</li>
            <li>所有功能都能正常工作</li>
            <li>数据不会丢失</li>
          </ul>
          <p className="mb-4">
            我们不对因网站不可用或功能故障而导致的任何损失承担责任。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. 知识产权</h2>
          <p className="mb-4">
            本网站尊重知识产权。如果您认为我们的内容侵犯了您的权利，
            请及时联系我们。我们会认真处理相关投诉。
          </p>
          <p className="mb-4">
            同时，我们的原创内容受版权保护。未经授权，请勿复制或商业使用。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. 法律管辖</h2>
          <p className="mb-4">
            本免责声明受中华人民共和国法律管辖。如有争议，
            应通过友好协商解决；协商不成的，提交有管辖权的人民法院解决。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. 声明更新</h2>
          <p className="mb-4">
            我们保留随时修改本免责声明的权利。修改后的声明将在网站上发布，
            并在发布时生效。建议您定期查看本页面。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. 联系方式</h2>
          <p className="mb-4">
            如果您对本免责声明有任何问题，请联系我们：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>网站：<a href={LINK} className="text-blue-600 hover:underline">{LINK}</a></li>
            <li>邮箱：legal@{LINK.replace('https://', '').replace('http://', '')}</li>
          </ul>
        </section>

        <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-yellow-800">⚠️ 重要提醒</h3>
          <p className="text-yellow-700 mb-2">
            使用本网站即表示您已阅读、理解并同意本免责声明的所有条款。
          </p>
          <p className="text-yellow-700">
            如果您不同意任何条款，请立即停止使用本网站。
          </p>
        </div>

        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            本免责声明适用于 {AUTHOR} 运营的网站 {LINK} 及其所有相关服务。
          </p>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const from = 'disclaimer'
  const props = await getGlobalData({ from })
  
  // 设置页面元数据
  props.meta = {
    title: '免责声明',
    description: '了解我们网站的免责声明和使用限制。请在使用我们的服务前仔细阅读。',
    type: 'website',
    slug: 'disclaimer'
  }

  return {
    props,
    revalidate: 86400 // 24小时重新验证
  }
}

export default Disclaimer

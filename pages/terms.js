import { siteConfig } from '@/lib/config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { DynamicLayout } from '@/themes/theme'

/**
 * 使用条款页面
 * @param {*} props
 * @returns
 */
const Terms = props => {
  const theme = siteConfig('THEME', 'heo', props.NOTION_CONFIG)
  
  return (
    <DynamicLayout 
      theme={theme} 
      layoutName='LayoutPage' 
      {...props}
      customContent={<TermsContent />}
    />
  )
}

const TermsContent = () => {
  const AUTHOR = siteConfig('AUTHOR', '网站所有者')
  const LINK = siteConfig('LINK', 'https://example.com')
  const currentDate = new Date().toLocaleDateString('zh-CN')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">使用条款</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">
          最后更新日期：{currentDate}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. 接受条款</h2>
          <p className="mb-4">
            欢迎使用我们的网站。通过访问和使用本网站，您同意遵守以下使用条款。
            如果您不同意这些条款，请不要使用本网站。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. 网站使用</h2>
          <p className="mb-4">
            您可以出于以下目的使用本网站：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>浏览和阅读内容</li>
            <li>分享和评论文章</li>
            <li>订阅我们的服务</li>
            <li>与我们联系</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. 禁止行为</h2>
          <p className="mb-4">
            在使用本网站时，您不得：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>发布非法、有害、威胁、辱骂、骚扰、诽谤、粗俗、淫秽或其他令人反感的内容</li>
            <li>侵犯他人的知识产权或其他权利</li>
            <li>传播病毒、恶意软件或其他有害代码</li>
            <li>尝试未经授权访问网站或其他用户的账户</li>
            <li>干扰网站的正常运行</li>
            <li>进行商业广告或垃圾信息传播</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. 内容所有权</h2>
          <p className="mb-4">
            本网站的所有内容，包括但不限于文本、图片、视频、音频、设计、代码等，
            均受版权法和其他知识产权法保护。未经明确授权，您不得：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>复制、修改、分发或展示网站内容</li>
            <li>将内容用于商业目的</li>
            <li>创建衍生作品</li>
            <li>逆向工程或反编译网站代码</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. 用户生成内容</h2>
          <p className="mb-4">
            当您在网站上发布内容（如评论、反馈等）时：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>您保证拥有发布该内容的权利</li>
            <li>您授予我们使用、修改、展示该内容的权利</li>
            <li>您对内容的准确性和合法性负责</li>
            <li>我们有权删除不当内容</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. 免责声明</h2>
          <p className="mb-4">
            本网站按"现状"提供，我们不对以下内容做出保证：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>网站内容的准确性、完整性或及时性</li>
            <li>网站的持续可用性</li>
            <li>网站不含病毒或其他有害组件</li>
            <li>使用网站不会侵犯第三方权利</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. 责任限制</h2>
          <p className="mb-4">
            在法律允许的最大范围内，我们不对以下损失承担责任：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>直接、间接、偶然或后果性损失</li>
            <li>利润损失或业务中断</li>
            <li>数据丢失或损坏</li>
            <li>第三方行为造成的损失</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. 第三方链接</h2>
          <p className="mb-4">
            本网站可能包含指向第三方网站的链接。这些链接仅为方便用户提供，
            我们不对第三方网站的内容、隐私政策或做法负责。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. 服务终止</h2>
          <p className="mb-4">
            我们保留在任何时候，出于任何原因，暂停或终止您对网站访问的权利。
            终止后，您必须停止使用网站并删除任何下载的内容。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. 条款修改</h2>
          <p className="mb-4">
            我们可能会不时修改这些使用条款。修改后的条款将在网站上发布，
            并在发布时生效。继续使用网站即表示您接受修改后的条款。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. 适用法律</h2>
          <p className="mb-4">
            这些使用条款受中华人民共和国法律管辖。任何争议应通过友好协商解决，
            如协商不成，应提交有管辖权的人民法院解决。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. 联系信息</h2>
          <p className="mb-4">
            如果您对这些使用条款有任何问题，请联系我们：
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>网站：<a href={LINK} className="text-blue-600 hover:underline">{LINK}</a></li>
            <li>邮箱：legal@{LINK.replace('https://', '').replace('http://', '')}</li>
          </ul>
        </section>

        <div className="mt-12 p-6 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            本使用条款构成您与 {AUTHOR} 之间关于使用网站 {LINK} 的完整协议。
          </p>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const from = 'terms'
  const props = await getGlobalData({ from })
  
  // 设置页面元数据
  props.meta = {
    title: '使用条款',
    description: '了解使用我们网站的条款和条件。请仔细阅读这些重要的法律条款。',
    type: 'website',
    slug: 'terms'
  }

  return {
    props,
    revalidate: 86400 // 24小时重新验证
  }
}

export default Terms

import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect } from 'react'

/**
 * 请求广告元素
 * 调用后，实际只有当广告单元在页面中可见时才会真正获取
 */
function requestAd(ads) {
  if (!ads || ads.length === 0) {
    return
  }

  const adsbygoogle = window.adsbygoogle
  if (adsbygoogle && ads.length > 0) {
    const observerOptions = {
      root: null, // use the viewport as the root
      threshold: 0.5 // element is considered visible when 50% visible
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const adStatus = entry.target.getAttribute('data-adsbygoogle-status')
          if (!adStatus || adStatus !== 'done') {
            adsbygoogle.push(entry.target)
            observer.unobserve(entry.target) // stop observing once ad is loaded
          }
        }
      })
    }, observerOptions)

    ads.forEach(ad => {
      observer.observe(ad)
    })
  }
}

// 获取节点或其子节点中包含 adsbygoogle 类的节点
function getNodesWithAdsByGoogleClass(node) {
  const adsNodes = []

  // 检查节点及其子节点是否包含 adsbygoogle 类
  function checkNodeForAds(node) {
    if (node.tagName === 'INS' && node.classList.contains('adsbygoogle')) {
      adsNodes.push(node)
    } else {
      // 递归检查子节点
      for (let i = 0; i < node.childNodes.length; i++) {
        checkNodeForAds(node.childNodes[i])
      }
    }
  }

  checkNodeForAds(node)
  return adsNodes
}

/**
 * 初始化谷歌广告
 * @returns
 */
export const initGoogleAdsense = async ADSENSE_GOOGLE_ID => {
  console.log('Load Adsense')
  loadExternalResource(
    `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_GOOGLE_ID}`,
    'js'
  ).then(url => {
    setTimeout(() => {
      // 页面加载完成后加载一次广告
      const ads = document.querySelectorAll('ins.adsbygoogle')
      if (window.adsbygoogle && ads.length > 0) {
        requestAd(Array.from(ads))
      }

      // 创建一个 MutationObserver 实例，监听页面上新出现的广告单元
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          // 检查每个添加到DOM中的节点
          mutation.addedNodes.forEach(node => {
            // 如果节点是adsbygoogle元素，则请求广告
            if (node.nodeType === Node.ELEMENT_NODE) {
              const adsNodes = getNodesWithAdsByGoogleClass(node)
              if (adsNodes.length > 0) {
                requestAd(adsNodes)
              }
            }
          })
        })
      })

      // 配置 MutationObserver 监听特定类型的 DOM 变化
      const observerConfig = {
        childList: true, // 观察目标子节点的变化
        subtree: true // 包括目标节点的所有后代节点
      }

      // 启动 MutationObserver
      observer.observe(
        document.querySelector('#article-wrapper #notion-article') ||
          document.body,
        observerConfig
      )
    }, 100)
  })
}

/**
 * 文章内嵌广告单元 - AdSense 政策优化版本
 * 请在GoogleAdsense后台配置创建对应广告，并且获取相应代码
 * 修改下面广告单元中的 data-ad-slot data-ad-format data-ad-layout-key(如果有)
 * 添加 可以在本地调试
 */
const AdSlot = ({ type = 'show', className = '', style = {} }) => {
  const ADSENSE_GOOGLE_ID = siteConfig('ADSENSE_GOOGLE_ID')
  const ADSENSE_GOOGLE_TEST = siteConfig('ADSENSE_GOOGLE_TEST')

  if (!ADSENSE_GOOGLE_ID) {
    return null
  }

  // 添加广告标识，符合 AdSense 政策要求
  const adLabel = (
    <div className="ad-label text-xs text-gray-500 text-center mb-2">
      广告
    </div>
  )
  // 文章内嵌广告
  if (type === 'in-article') {
    return (
      <div className={`ad-container in-article-ad ${className}`} style={style}>
        {adLabel}
        <ins
          className='adsbygoogle'
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-layout='in-article'
          data-ad-format='fluid'
          data-adtest={ADSENSE_GOOGLE_TEST ? 'on' : 'off'}
          data-ad-client={ADSENSE_GOOGLE_ID}
          data-ad-slot={siteConfig('ADSENSE_GOOGLE_SLOT_IN_ARTICLE')}></ins>
      </div>
    )
  }

  // 信息流广告
  if (type === 'flow') {
    return (
      <div className={`ad-container flow-ad ${className}`} style={style}>
        {adLabel}
        <ins
          className='adsbygoogle'
          data-ad-format='fluid'
          data-ad-layout-key='-5j+cz+30-f7+bf'
          style={{ display: 'block' }}
          data-adtest={ADSENSE_GOOGLE_TEST ? 'on' : 'off'}
          data-ad-client={ADSENSE_GOOGLE_ID}
          data-ad-slot={siteConfig('ADSENSE_GOOGLE_SLOT_FLOW')}></ins>
      </div>
    )
  }

  // 原生广告
  if (type === 'native') {
    return (
      <div className={`ad-container native-ad ${className}`} style={style}>
        {adLabel}
        <ins
          className='adsbygoogle'
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-format='autorelaxed'
          data-adtest={ADSENSE_GOOGLE_TEST ? 'on' : 'off'}
          data-ad-client={ADSENSE_GOOGLE_ID}
          data-ad-slot={siteConfig('ADSENSE_GOOGLE_SLOT_NATIVE')}></ins>
      </div>
    )
  }

  //  展示广告
  return (
    <div className={`ad-container display-ad ${className}`} style={style}>
      {adLabel}
      <ins
        className='adsbygoogle'
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_GOOGLE_ID}
        data-adtest={ADSENSE_GOOGLE_TEST ? 'on' : 'off'}
        data-ad-slot={siteConfig('ADSENSE_GOOGLE_SLOT_AUTO')}
        data-ad-format='auto'
        data-full-width-responsive='true'></ins>
    </div>
  )
}

/**
 * 嵌入到文章内部的广告单元
 * 检测文本内容 出现<ins/> 关键词时自动替换为广告
 * @param {*} props
 */
const AdEmbed = () => {
  const ADSENSE_GOOGLE_ID = siteConfig('ADSENSE_GOOGLE_ID')
  const ADSENSE_GOOGLE_TEST = siteConfig('ADSENSE_GOOGLE_TEST')
  const ADSENSE_GOOGLE_SLOT_AUTO = siteConfig('ADSENSE_GOOGLE_SLOT_AUTO')
  useEffect(() => {
    setTimeout(() => {
      // 找到所有 class 为 notion-text 且内容为 '<ins/>' 的 div 元素
      const notionTextElements = document.querySelectorAll(
        '#article-wrapper #notion-article div.notion-text'
      )
      // 遍历找到的元素
      notionTextElements?.forEach(element => {
        // 检查元素的内容是否为 '<ins/>'
        if (element.textContent.trim() === '<ins/>') {
          // 创建新的 <ins> 元素
          const newInsElement = document.createElement('ins')
          newInsElement.className = 'adsbygoogle w-full py-1'
          newInsElement.style.display = 'block'
          newInsElement.setAttribute('data-ad-client', ADSENSE_GOOGLE_ID)
          newInsElement.setAttribute(
            'data-adtest',
            ADSENSE_GOOGLE_TEST ? 'on' : 'off'
          )
          newInsElement.setAttribute('data-ad-slot', ADSENSE_GOOGLE_SLOT_AUTO)
          newInsElement.setAttribute('data-ad-format', 'auto')
          newInsElement.setAttribute('data-full-width-responsive', 'true')

          // 用新创建的 <ins> 元素替换掉原来的 div 元素
          element?.parentNode?.replaceChild(newInsElement, element)
        }
      })
    }, 1000)
  }, [])
  return <></>
}

/**
 * AdSense 政策合规组件
 * 确保广告展示符合 Google AdSense 政策
 */
export const AdSenseCompliance = () => {
  return (
    <>
      {/* 广告样式 */}
      <style jsx global>{`
        .ad-container {
          margin: 20px 0;
          padding: 10px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background-color: #fafafa;
          position: relative;
        }

        .dark .ad-container {
          border-color: #374151;
          background-color: #1f2937;
        }

        .ad-label {
          font-size: 11px;
          color: #6b7280;
          text-align: center;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .dark .ad-label {
          color: #9ca3af;
        }

        /* 确保广告不会影响页面布局 */
        .adsbygoogle {
          min-height: 100px;
          display: block !important;
        }

        /* 移动端优化 */
        @media (max-width: 768px) {
          .ad-container {
            margin: 15px 0;
            padding: 8px;
          }
        }

        /* 防止广告屏蔽器误判 */
        .ad-container:not(.adsbygoogle) {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </>
  )
}

/**
 * 广告密度控制组件
 * 确保广告密度符合 AdSense 政策
 */
export const AdDensityController = ({ children, maxAdsPerPage = 3 }) => {
  const [adCount, setAdCount] = useState(0)

  useEffect(() => {
    // 统计页面中的广告数量
    const ads = document.querySelectorAll('.adsbygoogle')
    setAdCount(ads.length)

    // 如果广告过多，隐藏多余的广告
    if (ads.length > maxAdsPerPage) {
      for (let i = maxAdsPerPage; i < ads.length; i++) {
        ads[i].style.display = 'none'
      }
    }
  }, [maxAdsPerPage])

  return (
    <>
      {children}
      {adCount > maxAdsPerPage && (
        <div className="ad-density-warning text-xs text-yellow-600 dark:text-yellow-400 text-center mt-2">
          ⚠️ 为了更好的用户体验，部分广告已被隐藏
        </div>
      )}
    </>
  )
}

export { AdEmbed, AdSlot }

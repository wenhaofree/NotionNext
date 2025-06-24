import { useEffect, useRef } from 'react'
import { siteConfig } from '@/lib/config'

/**
 * Google AdSense 广告组件
 * @param {*} props 
 * @returns 
 */
const AdSense = ({
  adSlot,
  adFormat = 'auto',
  adLayout = '',
  adLayoutKey = '',
  style = {},
  className = '',
  responsive = true,
  type = 'display' // display, in-article, in-feed
}) => {
  const adRef = useRef(null)
  const ADSENSE_PUBLISHER_ID = siteConfig('ADSENSE_PUBLISHER_ID')
  const ADSENSE_ENABLED = siteConfig('ADSENSE_ENABLED', false)

  useEffect(() => {
    if (!ADSENSE_ENABLED || !ADSENSE_PUBLISHER_ID || !adSlot) {
      return
    }

    try {
      // 确保 adsbygoogle 数组存在
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || []
        
        // 推送广告配置
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('AdSense 加载错误:', error)
    }
  }, [ADSENSE_ENABLED, ADSENSE_PUBLISHER_ID, adSlot])

  // 如果 AdSense 未启用，不渲染
  if (!ADSENSE_ENABLED || !ADSENSE_PUBLISHER_ID || !adSlot) {
    return null
  }

  // 根据广告类型设置默认样式
  const getDefaultStyle = () => {
    const baseStyle = {
      display: 'block',
      textAlign: 'center',
      ...style
    }

    switch (type) {
      case 'in-article':
        return {
          ...baseStyle,
          minHeight: '250px',
          margin: '20px 0'
        }
      case 'in-feed':
        return {
          ...baseStyle,
          minHeight: '200px',
          margin: '15px 0'
        }
      default:
        return {
          ...baseStyle,
          minHeight: '280px',
          margin: '20px 0'
        }
    }
  }

  return (
    <div className={`adsense-container ${className}`}>
      {/* 广告标识 */}
      <div className="text-xs text-gray-500 text-center mb-2">
        广告
      </div>
      
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={getDefaultStyle()}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-ad-layout-key={adLayoutKey}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}

/**
 * 文章顶部广告
 */
export const AdSenseTop = ({ className = '' }) => {
  const adSlot = siteConfig('ADSENSE_SLOT_TOP')
  
  return (
    <AdSense
      adSlot={adSlot}
      type="display"
      className={`adsense-top ${className}`}
      style={{ marginBottom: '30px' }}
    />
  )
}

/**
 * 文章中间广告
 */
export const AdSenseInArticle = ({ className = '' }) => {
  const adSlot = siteConfig('ADSENSE_SLOT_IN_ARTICLE')
  
  return (
    <AdSense
      adSlot={adSlot}
      type="in-article"
      adFormat="fluid"
      adLayout="in-article"
      className={`adsense-in-article ${className}`}
    />
  )
}

/**
 * 文章底部广告
 */
export const AdSenseBottom = ({ className = '' }) => {
  const adSlot = siteConfig('ADSENSE_SLOT_BOTTOM')
  
  return (
    <AdSense
      adSlot={adSlot}
      type="display"
      className={`adsense-bottom ${className}`}
      style={{ marginTop: '30px' }}
    />
  )
}

/**
 * 侧边栏广告
 */
export const AdSenseSidebar = ({ className = '' }) => {
  const adSlot = siteConfig('ADSENSE_SLOT_SIDEBAR')
  
  return (
    <AdSense
      adSlot={adSlot}
      type="display"
      adFormat="vertical"
      className={`adsense-sidebar ${className}`}
      style={{ 
        width: '100%',
        maxWidth: '300px',
        minHeight: '600px'
      }}
    />
  )
}

/**
 * 信息流广告
 */
export const AdSenseInFeed = ({ className = '' }) => {
  const adSlot = siteConfig('ADSENSE_SLOT_IN_FEED')
  
  return (
    <AdSense
      adSlot={adSlot}
      type="in-feed"
      adFormat="fluid"
      adLayout="in-feed"
      className={`adsense-in-feed ${className}`}
    />
  )
}

/**
 * 移动端横幅广告
 */
export const AdSenseMobileBanner = ({ className = '' }) => {
  const adSlot = siteConfig('ADSENSE_SLOT_MOBILE_BANNER')
  
  return (
    <div className={`block md:hidden ${className}`}>
      <AdSense
        adSlot={adSlot}
        type="display"
        adFormat="banner"
        className="adsense-mobile-banner"
        style={{
          width: '100%',
          height: '100px'
        }}
      />
    </div>
  )
}

/**
 * 桌面端横幅广告
 */
export const AdSenseDesktopBanner = ({ className = '' }) => {
  const adSlot = siteConfig('ADSENSE_SLOT_DESKTOP_BANNER')
  
  return (
    <div className={`hidden md:block ${className}`}>
      <AdSense
        adSlot={adSlot}
        type="display"
        adFormat="leaderboard"
        className="adsense-desktop-banner"
        style={{
          width: '728px',
          height: '90px',
          margin: '0 auto'
        }}
      />
    </div>
  )
}

/**
 * AdSense 脚本加载器
 */
export const AdSenseScript = () => {
  const ADSENSE_PUBLISHER_ID = siteConfig('ADSENSE_PUBLISHER_ID')
  const ADSENSE_ENABLED = siteConfig('ADSENSE_ENABLED', false)

  if (!ADSENSE_ENABLED || !ADSENSE_PUBLISHER_ID) {
    return null
  }

  return (
    <>
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
        crossOrigin="anonymous"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "${ADSENSE_PUBLISHER_ID}",
              enable_page_level_ads: true
            });
          `
        }}
      />
    </>
  )
}

export default AdSense

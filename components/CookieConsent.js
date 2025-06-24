import { useState, useEffect } from 'react'
import { siteConfig } from '@/lib/config'

/**
 * Cookie 同意横幅组件
 * @returns 
 */
const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // 必要 Cookie 始终启用
    analytics: false,
    advertising: false,
    functional: false
  })
  const [showDetails, setShowDetails] = useState(false)

  const COOKIE_CONSENT_KEY = 'cookie-consent'
  const COOKIE_PREFERENCES_KEY = 'cookie-preferences'

  useEffect(() => {
    // 检查用户是否已经做出选择
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)

    if (!consent) {
      setShowBanner(true)
    } else if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences))
    }
  }, [])

  // 接受所有 Cookie
  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      advertising: true,
      functional: true
    }
    
    setPreferences(allAccepted)
    saveConsent(allAccepted)
    setShowBanner(false)
  }

  // 拒绝非必要 Cookie
  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      advertising: false,
      functional: false
    }
    
    setPreferences(onlyNecessary)
    saveConsent(onlyNecessary)
    setShowBanner(false)
  }

  // 保存自定义偏好
  const savePreferences = () => {
    saveConsent(preferences)
    setShowBanner(false)
    setShowDetails(false)
  }

  // 保存同意状态
  const saveConsent = (prefs) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs))
    
    // 触发 Cookie 偏好变更事件
    window.dispatchEvent(new CustomEvent('cookiePreferencesChanged', {
      detail: prefs
    }))
  }

  // 更新偏好设置
  const updatePreference = (type, value) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }))
  }

  if (!showBanner) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto p-4">
        {!showDetails ? (
          // 简化视图
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                🍪 Cookie 使用通知
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                我们使用 Cookie 来改善您的浏览体验、提供个性化内容和分析网站流量。
                通过继续使用我们的网站，您同意我们使用 Cookie。
                <a 
                  href="/privacy" 
                  className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  了解更多
                </a>
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                自定义设置
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                仅必要
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                接受全部
              </button>
            </div>
          </div>
        ) : (
          // 详细设置视图
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Cookie 偏好设置
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              {/* 必要 Cookie */}
              <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">必要 Cookie</h4>
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  这些 Cookie 对网站功能至关重要，无法禁用。
                </p>
              </div>

              {/* 分析 Cookie */}
              <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">分析 Cookie</h4>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => updatePreference('analytics', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  帮助我们了解访客如何使用网站，以改善用户体验。
                </p>
              </div>

              {/* 广告 Cookie */}
              <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">广告 Cookie</h4>
                  <input
                    type="checkbox"
                    checked={preferences.advertising}
                    onChange={(e) => updatePreference('advertising', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  用于显示相关广告和衡量广告效果。
                </p>
              </div>

              {/* 功能 Cookie */}
              <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">功能 Cookie</h4>
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) => updatePreference('functional', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  记住您的偏好设置，提供个性化功能。
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                仅必要
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                接受全部
              </button>
              <button
                onClick={savePreferences}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                保存设置
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Cookie 偏好管理器 Hook
 */
export const useCookiePreferences = () => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    advertising: false,
    functional: false
  })

  useEffect(() => {
    // 读取保存的偏好
    const savedPreferences = localStorage.getItem('cookie-preferences')
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences))
    }

    // 监听偏好变更事件
    const handlePreferencesChange = (event) => {
      setPreferences(event.detail)
    }

    window.addEventListener('cookiePreferencesChanged', handlePreferencesChange)

    return () => {
      window.removeEventListener('cookiePreferencesChanged', handlePreferencesChange)
    }
  }, [])

  return preferences
}

export default CookieConsent

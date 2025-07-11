/**
 * Cookie 同意横幅组件 - 已禁用
 * 根据用户要求，Cookie 使用通知功能已被注释掉
 *
 * 原功能包括：
 * - Cookie 使用通知横幅
 * - 用户同意/拒绝选项
 * - 详细的 Cookie 偏好设置
 * - 本地存储管理
 *
 * 现在返回 null，不显示任何 Cookie 相关的通知
 * @returns {null}
 */
const CookieConsent = () => {
  // Cookie 通知功能已被禁用，返回 null
  return null
}


/**
 * Cookie 偏好管理器 Hook - 已禁用
 * 返回默认的空偏好设置，不执行任何 Cookie 相关操作
 */
export const useCookiePreferences = () => {
  return {
    necessary: true,
    analytics: false,
    advertising: false,
    functional: false
  }
}

export default CookieConsent

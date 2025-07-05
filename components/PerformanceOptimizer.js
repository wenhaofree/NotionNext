import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/config'

/**
 * 页面性能优化组件
 * 提升 Core Web Vitals 指标，改善用户体验
 */
export default function PerformanceOptimizer() {
  const [metrics, setMetrics] = useState({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 只在开发环境或调试模式下显示性能指标
    const showMetrics = siteConfig('DEBUG') || process.env.NODE_ENV === 'development'
    setIsVisible(showMetrics)

    if (typeof window !== 'undefined') {
      // 初始化性能监控
      initPerformanceMonitoring()
      
      // 优化图片加载
      optimizeImageLoading()
      
      // 预加载关键资源
      preloadCriticalResources()
      
      // 监听性能指标
      if (showMetrics) {
        monitorWebVitals(setMetrics)
      }
    }
  }, [])

  return (
    <>
      {/* 性能优化脚本 */}
      <PerformanceScripts />
      
      {/* 开发环境性能指标显示 */}
      {isVisible && <PerformanceMetrics metrics={metrics} />}
    </>
  )
}

/**
 * 初始化性能监控
 */
function initPerformanceMonitoring() {
  // 监控长任务
  if ('PerformanceObserver' in window) {
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('Long task detected:', entry.duration + 'ms')
          }
        }
      })
      longTaskObserver.observe({ entryTypes: ['longtask'] })
    } catch (e) {
      // 忽略不支持的浏览器
    }
  }

  // 监控布局偏移
  if ('PerformanceObserver' in window) {
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput && entry.value > 0.1) {
            console.warn('Layout shift detected:', entry.value)
          }
        }
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    } catch (e) {
      // 忽略不支持的浏览器
    }
  }
}

/**
 * 优化图片加载
 */
function optimizeImageLoading() {
  // 为所有图片添加 loading="lazy"
  const images = document.querySelectorAll('img:not([loading])')
  images.forEach(img => {
    img.loading = 'lazy'
  })

  // 使用 Intersection Observer 优化图片加载
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute('data-src')
            imageObserver.unobserve(img)
          }
        }
      })
    }, {
      rootMargin: '50px 0px'
    })

    // 观察所有带有 data-src 的图片
    const lazyImages = document.querySelectorAll('img[data-src]')
    lazyImages.forEach(img => imageObserver.observe(img))
  }
}

/**
 * 预加载关键资源
 */
function preloadCriticalResources() {
  // 预加载关键字体
  const fontUrls = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
  ]

  fontUrls.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'style'
    link.href = url
    document.head.appendChild(link)
  })

  // 预连接到外部域名
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com',
    'https://pagead2.googlesyndication.com'
  ]

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = domain
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

/**
 * 监控 Web Vitals 指标
 */
function monitorWebVitals(setMetrics) {
  // 动态导入 web-vitals 库
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS((metric) => {
      setMetrics(prev => ({ ...prev, cls: metric.value }))
    })

    getFID((metric) => {
      setMetrics(prev => ({ ...prev, fid: metric.value }))
    })

    getFCP((metric) => {
      setMetrics(prev => ({ ...prev, fcp: metric.value }))
    })

    getLCP((metric) => {
      setMetrics(prev => ({ ...prev, lcp: metric.value }))
    })

    getTTFB((metric) => {
      setMetrics(prev => ({ ...prev, ttfb: metric.value }))
    })
  }).catch(() => {
    // web-vitals 库不可用时的降级处理
    console.log('Web Vitals monitoring not available')
  })
}

/**
 * 性能优化脚本组件
 */
function PerformanceScripts() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          // 关键渲染路径优化
          (function() {
            // 预加载关键CSS
            var criticalCSS = document.querySelector('style[data-critical]');
            if (criticalCSS) {
              criticalCSS.media = 'all';
            }

            // 延迟加载非关键CSS
            var nonCriticalCSS = document.querySelectorAll('link[rel="preload"][as="style"]');
            nonCriticalCSS.forEach(function(link) {
              link.onload = function() {
                this.rel = 'stylesheet';
              };
            });

            // 优化滚动性能
            var supportsPassive = false;
            try {
              var opts = Object.defineProperty({}, 'passive', {
                get: function() {
                  supportsPassive = true;
                }
              });
              window.addEventListener('testPassive', null, opts);
              window.removeEventListener('testPassive', null, opts);
            } catch (e) {}

            // 使用 passive 事件监听器
            if (supportsPassive) {
              document.addEventListener('touchstart', function() {}, { passive: true });
              document.addEventListener('touchmove', function() {}, { passive: true });
            }

            // 减少重绘和回流
            var rafId;
            function optimizedResize() {
              if (rafId) return;
              rafId = requestAnimationFrame(function() {
                // 处理窗口大小变化
                window.dispatchEvent(new Event('optimizedResize'));
                rafId = null;
              });
            }
            window.addEventListener('resize', optimizedResize);

            // 预加载下一页内容（如果是分页）
            var nextPageLink = document.querySelector('a[rel="next"]');
            if (nextPageLink && 'requestIdleCallback' in window) {
              requestIdleCallback(function() {
                var link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = nextPageLink.href;
                document.head.appendChild(link);
              });
            }
          })();
        `
      }}
    />
  )
}

/**
 * 性能指标显示组件（仅开发环境）
 */
function PerformanceMetrics({ metrics }) {
  if (Object.keys(metrics).length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded-lg text-xs font-mono z-50">
      <div className="font-bold mb-2">Performance Metrics</div>
      {metrics.lcp && (
        <div className={`mb-1 ${metrics.lcp > 2500 ? 'text-red-400' : metrics.lcp > 1200 ? 'text-yellow-400' : 'text-green-400'}`}>
          LCP: {Math.round(metrics.lcp)}ms
        </div>
      )}
      {metrics.fid && (
        <div className={`mb-1 ${metrics.fid > 100 ? 'text-red-400' : metrics.fid > 50 ? 'text-yellow-400' : 'text-green-400'}`}>
          FID: {Math.round(metrics.fid)}ms
        </div>
      )}
      {metrics.cls && (
        <div className={`mb-1 ${metrics.cls > 0.25 ? 'text-red-400' : metrics.cls > 0.1 ? 'text-yellow-400' : 'text-green-400'}`}>
          CLS: {metrics.cls.toFixed(3)}
        </div>
      )}
      {metrics.fcp && (
        <div className="mb-1 text-gray-300">
          FCP: {Math.round(metrics.fcp)}ms
        </div>
      )}
      {metrics.ttfb && (
        <div className="text-gray-300">
          TTFB: {Math.round(metrics.ttfb)}ms
        </div>
      )}
    </div>
  )
}

/**
 * 移动端优化组件
 */
export function MobileOptimizer() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // 检测移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (isMobile) {
      // 移动端特定优化
      optimizeForMobile()
    }
  }, [])

  return null
}

/**
 * 移动端优化函数
 */
function optimizeForMobile() {
  // 禁用iOS的自动缩放
  const viewport = document.querySelector('meta[name="viewport"]')
  if (viewport) {
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
  }

  // 优化触摸响应
  document.body.style.touchAction = 'manipulation'

  // 减少移动端的动画
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms')
  }

  // 优化滚动性能
  document.documentElement.style.setProperty('-webkit-overflow-scrolling', 'touch')
}

/**
 * 资源提示组件
 * 添加各种资源提示来优化加载性能
 */
export function ResourceHints() {
  return (
    <>
      {/* DNS 预解析 */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />

      {/* 预连接关键第三方域名 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* 预加载关键资源 */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </>
  )
}

/**
 * 用户体验增强组件
 */
export function UserExperienceEnhancer() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // 添加阅读进度指示器
    addReadingProgress()

    // 优化表单体验
    enhanceFormExperience()

    // 添加键盘导航支持
    addKeyboardNavigation()

    // 优化焦点管理
    improveFocusManagement()

  }, [])

  return null
}

/**
 * 添加阅读进度指示器
 */
function addReadingProgress() {
  const article = document.querySelector('#notion-article')
  if (!article) return

  const progressBar = document.createElement('div')
  progressBar.className = 'reading-progress'
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #06b6d4);
    z-index: 9999;
    transition: width 0.1s ease;
  `
  document.body.appendChild(progressBar)

  function updateProgress() {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    progressBar.style.width = Math.min(scrollPercent, 100) + '%'
  }

  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
}

/**
 * 增强表单体验
 */
function enhanceFormExperience() {
  const forms = document.querySelectorAll('form')

  forms.forEach(form => {
    // 添加实时验证
    const inputs = form.querySelectorAll('input, textarea')
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this)
      })

      input.addEventListener('input', function() {
        clearFieldError(this)
      })
    })
  })
}

/**
 * 字段验证
 */
function validateField(field) {
  const value = field.value.trim()
  const type = field.type
  let isValid = true
  let message = ''

  if (field.required && !value) {
    isValid = false
    message = '此字段为必填项'
  } else if (type === 'email' && value && !isValidEmail(value)) {
    isValid = false
    message = '请输入有效的邮箱地址'
  }

  if (!isValid) {
    showFieldError(field, message)
  } else {
    clearFieldError(field)
  }

  return isValid
}

/**
 * 显示字段错误
 */
function showFieldError(field, message) {
  clearFieldError(field)

  field.classList.add('error')
  const errorDiv = document.createElement('div')
  errorDiv.className = 'field-error'
  errorDiv.textContent = message
  errorDiv.style.cssText = `
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  `

  field.parentNode.appendChild(errorDiv)
}

/**
 * 清除字段错误
 */
function clearFieldError(field) {
  field.classList.remove('error')
  const errorDiv = field.parentNode.querySelector('.field-error')
  if (errorDiv) {
    errorDiv.remove()
  }
}

/**
 * 验证邮箱格式
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 添加键盘导航支持
 */
function addKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    // Esc 键关闭模态框
    if (e.key === 'Escape') {
      const modals = document.querySelectorAll('.modal, .overlay')
      modals.forEach(modal => {
        if (modal.style.display !== 'none') {
          modal.style.display = 'none'
        }
      })
    }

    // 空格键暂停/播放视频
    if (e.key === ' ' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      const videos = document.querySelectorAll('video')
      videos.forEach(video => {
        if (video.paused) {
          video.play()
        } else {
          video.pause()
        }
      })
      e.preventDefault()
    }
  })
}

/**
 * 改善焦点管理
 */
function improveFocusManagement() {
  // 为所有交互元素添加焦点样式
  const style = document.createElement('style')
  style.textContent = `
    *:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    .skip-link {
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 10000;
    }

    .skip-link:focus {
      top: 6px;
    }
  `
  document.head.appendChild(style)

  // 添加跳转链接
  const skipLink = document.createElement('a')
  skipLink.href = '#main-content'
  skipLink.className = 'skip-link'
  skipLink.textContent = '跳转到主要内容'
  document.body.insertBefore(skipLink, document.body.firstChild)
}

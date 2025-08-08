import { siteConfig } from '@/lib/config'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

/**
 * 图片懒加载
 * @param {*} param0
 * @returns
 */
export default function LazyImage({
  priority,
  id,
  src,
  alt,
  placeholderSrc,
  className,
  width,
  height,
  title,
  onLoad,
  onClick,
  style
}) {
  const maxWidth = siteConfig('IMAGE_COMPRESS_WIDTH')
  const defaultPlaceholderSrc = siteConfig('IMG_LAZY_LOAD_PLACEHOLDER')
  const imageRef = useRef(null)
  const [currentSrc, setCurrentSrc] = useState(
    placeholderSrc || defaultPlaceholderSrc
  )
  const [hasError, setHasError] = useState(false)

  /**
   * 占位图加载成功
   */
  const handleThumbnailLoaded = () => {
    if (typeof onLoad === 'function') {
      // onLoad() // 触发传递的onLoad回调函数
    }
  }
  // 原图加载完成
  const handleImageLoaded = img => {
    if (typeof onLoad === 'function') {
      onLoad() // 触发传递的onLoad回调函数
    }
    // 移除占位符类名
    if (imageRef.current) {
      imageRef.current.classList.remove('lazy-image-placeholder')
    }
  }
  /**
   * 图片加载失败回调
   */
  const handleImageError = () => {
    setHasError(true)
    if (imageRef.current) {
      // 移除占位符类名
      imageRef.current.classList.remove('lazy-image-placeholder')
    }
  }

  useEffect(() => {
    const adjustedImageSrc =
      adjustImgSize(src, maxWidth) || defaultPlaceholderSrc

    // 如果设置了优先级，立即加载图片
    if (priority) {
      const img = new Image()
      img.src = adjustedImageSrc
      img.onload = () => {
        setCurrentSrc(adjustedImageSrc)
        handleImageLoaded(adjustedImageSrc)
      }
      img.onerror = handleImageError
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 拉取图片
            const img = new Image()
            img.src = adjustedImageSrc
            img.onload = () => {
              setCurrentSrc(adjustedImageSrc)
              handleImageLoaded(adjustedImageSrc)
            }
            img.onerror = handleImageError

            observer.unobserve(entry.target)
          }
        })
      },
      { 
        rootMargin: '100px 0px',  // 增加预加载距离
        threshold: 0.1 
      }
    )
    
    if (imageRef.current) {
      observer.observe(imageRef.current)
    }
    
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current)
      }
    }
  }, [src, maxWidth, priority])

  // 动态添加width、height和className属性，仅在它们为有效值时添加
  const imgProps = {
    ref: imageRef,
    src: currentSrc,
    'data-src': src, // 存储原始图片地址
    alt: alt || '', // 装饰性图片默认不朗读，调用方如需语义请传入alt
    onLoad: handleThumbnailLoaded,
    onError: handleImageError,
    className: `${className || ''} lazy-image-placeholder`,
    style,
    width: width || 'auto',
    height: height || 'auto',
    fetchpriority: priority ? 'high' : undefined,
    decoding: 'async',
    loading: priority ? 'eager' : 'lazy',
    onClick
  }

  if (id) imgProps.id = id
  if (title) imgProps.title = title

  if (!src) {
    return null
  }

  // 如果图片加载失败，显示错误占位符
  // if (hasError) {
  //   return (
  //     <div
  //       className={`lazy-image-error ${className || ''}`}
  //       style={{ width: width || 'auto', height: height || 'auto', ...style }}
  //       title="图片加载失败"
  //     >
  //       <span>⚠️</span>
  //     </div>
  //   )
  // }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...imgProps} />
      {/* 预加载 */}
      {priority && (
        <Head>
          <link rel='preload' as='image' href={adjustImgSize(src, maxWidth)} />
        </Head>
      )}

    </>
  )
}

/**
 * 根据窗口尺寸决定压缩图片宽度
 * @param {*} src
 * @param {*} maxWidth
 * @returns
 */
const adjustImgSize = (src, maxWidth) => {
  if (!src) {
    return null
  }
  const screenWidth =
    (typeof window !== 'undefined' && window?.screen?.width) || maxWidth

  // 屏幕尺寸大于默认图片尺寸，没必要再压缩
  if (screenWidth > maxWidth) {
    return src
  }

  // 正则表达式，用于匹配 URL 中的 width 参数
  const widthRegex = /width=\d+/
  // 正则表达式，用于匹配 URL 中的 w 参数
  const wRegex = /w=\d+/

  // 使用正则表达式替换 width/w 参数
  return src
    .replace(widthRegex, `width=${screenWidth}`)
    .replace(wRegex, `w=${screenWidth}`)
}

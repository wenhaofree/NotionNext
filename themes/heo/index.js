/**
 *   HEO 主题说明
 *  > 主题设计者 [张洪](https://zhheo.com/)
 *  > 主题开发者 [tangly1024](https://github.com/tangly1024)
 *  1. 开启方式 在blog.config.js 将主题配置为 `HEO`
 *  2. 更多说明参考此[文档](https://docs.tangly1024.com/article/notionnext-heo)
 */

import Comment from '@/components/Comment'
import { AdSlot } from '@/components/GoogleAdsense'
import { HashTag } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import LoadingCover from '@/components/LoadingCover'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import WWAds from '@/components/WWAds'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadWowJS } from '@/lib/plugins/wow'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BlogPostArchive from './components/BlogPostArchive'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import Breadcrumb from './components/Breadcrumb'
import CategoryBar from './components/CategoryBar'
import FloatTocButton from './components/FloatTocButton'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import LatestPostsGroup from './components/LatestPostsGroup'
import { NoticeBar } from './components/NoticeBar'
import PostAdjacent from './components/PostAdjacent'
import PostCopyright from './components/PostCopyright'
import PostHeader from './components/PostHeader'
import { PostLock } from './components/PostLock'
import PostRecommend from './components/PostRecommend'
import SearchNav from './components/SearchNav'
import SideRight from './components/SideRight'
import CONFIG from './config'
import { Style } from './style'
import AISummary from '@/components/AISummary'

/**
 * 基础布局 采用上中下布局，移动端使用顶部侧边导航栏
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, slotTop, className } = props

  // 全屏模式下的最大宽度
  const { fullWidth, isDarkMode } = useGlobal()
  const router = useRouter()

  const headerSlot = (
    <header>
      {/* 顶部导航 */}
      <Header {...props} />

      {/* 通知横幅 */}
      {router.route === '/' ? (
        <>
          <NoticeBar />
          <Hero {...props} />
        </>
      ) : null}
      {fullWidth ? null : <PostHeader {...props} isDarkMode={isDarkMode} />}
    </header>
  )

  // 右侧栏 用户信息+标签列表
  const slotRight =
    router.route === '/404' || fullWidth ? null : <SideRight {...props} />

  const maxWidth = fullWidth ? 'max-w-[96rem] mx-auto' : 'max-w-[86rem]' // 普通最大宽度是86rem和顶部菜单栏对齐，留空则与窗口对齐

  const HEO_HERO_BODY_REVERSE = siteConfig(
    'HEO_HERO_BODY_REVERSE',
    false,
    CONFIG
  )
  const HEO_LOADING_COVER = siteConfig('HEO_LOADING_COVER', true, CONFIG)

  // 加载 wow 动画（延后到空闲时间，避免阻塞首屏渲染/LCP）
  useEffect(() => {
    const defer = () => loadWowJS()
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(defer)
    } else {
      setTimeout(defer, 1500)
    }
  }, [])

  return (
    <div
      id='theme-heo'
      className={`${siteConfig('FONT_STYLE')} bg-[#f7f9fe] dark:bg-[#18171d] h-full min-h-screen flex flex-col scroll-smooth`}>
      <Style />

      {/* 顶部嵌入 导航栏，首页放hero，文章页放文章详情 */}
      {headerSlot}

      {/* 主区块 */}
      <main
        id='wrapper-outer'
        className={`flex-grow w-full ${maxWidth} mx-auto relative md:px-5`}>
        <div
          id='container-inner'
          className={`${HEO_HERO_BODY_REVERSE ? 'flex-row-reverse' : ''} w-full mx-auto lg:flex justify-center relative z-10`}>
          <div className={`w-full h-auto ${className || ''}`}>
            {/* 主区上部嵌入 */}
            {slotTop}
            {children}
          </div>

          <div className='lg:px-2'></div>

          <div className='hidden xl:block'>
            {/* 主区快右侧 */}
            {slotRight}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <Footer />

      {HEO_LOADING_COVER && <LoadingCover />}
    </div>
  )
}

/**
 * 首页
 * 是一个博客列表，嵌入一个Hero大图
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  const { posts, siteInfo } = props
  const { locale } = useGlobal()

  // 获取推荐文章（前3篇）
  const featuredPosts = posts?.slice(0, 3) || []
  // 获取最新文章（第4-9篇）
  const latestPosts = posts?.slice(3, 9) || []

  return (
    <div id='post-outer-wrapper' className='px-5 md:px-0'>
      {/* 网站介绍卡片 - AdSense 优化 */}
      <div className='mb-8 bg-white dark:bg-[#1e1e1e] rounded-xl p-6 border dark:border-gray-700 shadow-lg'>
        <h2 className='text-3xl font-bold mb-4 text-gray-800 dark:text-white flex items-center'>
          <i className='fas fa-rocket mr-3 text-blue-500'></i>
          欢迎来到 {siteInfo?.title}
        </h2>
        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <p className='text-gray-600 dark:text-gray-300 leading-relaxed mb-4'>
              {siteInfo?.description || '这里是一个专注于分享高质量内容的知识平台，我们致力于为读者提供有价值的技术见解、学习资源和实用经验。'}
            </p>
            <p className='text-gray-600 dark:text-gray-300 leading-relaxed mb-4'>
              我们专注于提供最新的技术文章、实用教程和深度分析，帮助开发者和技术爱好者提升技能，解决实际问题。无论您是初学者还是资深专家，都能在这里找到有价值的内容。
            </p>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-3 text-gray-800 dark:text-white'>
              <i className='fas fa-star mr-2 text-yellow-500'></i>
              主要特色
            </h3>
            <ul className='space-y-2 text-gray-600 dark:text-gray-300'>
              <li className='flex items-center'>
                <i className='fas fa-check-circle mr-2 text-green-500'></i>
                原创技术文章与深度解析
              </li>
              <li className='flex items-center'>
                <i className='fas fa-check-circle mr-2 text-green-500'></i>
                实用开发工具与资源分享
              </li>
              <li className='flex items-center'>
                <i className='fas fa-check-circle mr-2 text-green-500'></i>
                最新技术趋势与行业动态
              </li>
              <li className='flex items-center'>
                <i className='fas fa-check-circle mr-2 text-green-500'></i>
                开源项目与代码示例
              </li>
            </ul>
          </div>
        </div>
        <div className='flex flex-wrap gap-3 mt-6'>
          <span className='px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium flex items-center'>
            <i className='fas fa-code mr-2'></i>
            技术分享
          </span>
          <span className='px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium flex items-center'>
            <i className='fas fa-graduation-cap mr-2'></i>
            学习资源
          </span>
          <span className='px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium flex items-center'>
            <i className='fas fa-book mr-2'></i>
            实用教程
          </span>
          <span className='px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium flex items-center'>
            <i className='fas fa-tools mr-2'></i>
            开发工具
          </span>
        </div>
      </div>

      {/* 文章分类条 */}
      <CategoryBar {...props} />

      {/* 主要内容区域 */}
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}

/**
 * 博客列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  return (
    <div id='post-outer-wrapper' className='px-5  md:px-0'>
      {/* 文章分类条 */}
      <CategoryBar {...props} />
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}

/**
 * 搜索
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    // 高亮搜索结果
    if (currentSearch) {
      setTimeout(() => {
        replaceSearchResult({
          doms: document.getElementsByClassName('replace'),
          search: currentSearch,
          target: {
            element: 'span',
            className: 'text-red-500 border-b border-dashed'
          }
        })
      }, 100)
    }
  }, [])
  return (
    <div currentSearch={currentSearch}>
      {/* 面包屑导航 */}
      <Breadcrumb {...props} />

      <div id='post-outer-wrapper' className='px-5  md:px-0'>
        {!currentSearch ? (
          <SearchNav {...props} />
        ) : (
          <div id='posts-wrapper'>
            {siteConfig('POST_LIST_STYLE') === 'page' ? (
              <BlogPostListPage {...props} />
            ) : (
              <BlogPostListScroll {...props} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * 归档
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => {
  const { archivePosts } = props

  // 归档页顶部显示条，如果是默认归档则不显示。分类详情页显示分类列表，标签详情页显示当前标签

  return (
    <>
      {/* 面包屑导航 */}
      <Breadcrumb {...props} />

      <div className='p-5 rounded-xl border dark:border-gray-600 max-w-6xl w-full bg-white dark:bg-[#1e1e1e]'>
        {/* 文章分类条 */}
        <CategoryBar {...props} border={false} />

        <div className='px-3'>
          {Object.keys(archivePosts).map(archiveTitle => (
            <BlogPostArchive
              key={archiveTitle}
              posts={archivePosts[archiveTitle]}
              archiveTitle={archiveTitle}
            />
          ))}
        </div>
      </div>
    </>
  )
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const { locale, fullWidth } = useGlobal()

  const [hasCode, setHasCode] = useState(false)

  useEffect(() => {
    const hasCode = document.querySelectorAll('[class^="language-"]').length > 0
    setHasCode(hasCode)
  }, [])

  const commentEnable =
    siteConfig('COMMENT_TWIKOO_ENV_ID') ||
    siteConfig('COMMENT_WALINE_SERVER_URL') ||
    siteConfig('COMMENT_VALINE_APP_ID') ||
    siteConfig('COMMENT_GISCUS_REPO') ||
    siteConfig('COMMENT_CUSDIS_APP_ID') ||
    siteConfig('COMMENT_UTTERRANCES_REPO') ||
    siteConfig('COMMENT_GITALK_CLIENT_ID') ||
    siteConfig('COMMENT_WEBMENTION_ENABLE')

  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(
        () => {
          if (isBrowser) {
            const article = document.querySelector(
              '#article-wrapper #notion-article'
            )
            if (!article) {
              router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
              })
            }
          }
        },
        waiting404
      )
    }
  }, [post])
  return (
    <>
      {/* 面包屑导航 */}
      {!lock && post && <Breadcrumb post={post} {...props} />}

      <div
        className={`article h-full w-full ${fullWidth ? '' : 'xl:max-w-5xl'} ${hasCode ? 'xl:w-[73.15vw]' : ''} bg-white dark:bg-[#18171d] dark:border-gray-600 lg:hover:shadow lg:border rounded-2xl lg:px-2 lg:py-4`}>
        {/* 文章锁 */}
        {lock && <PostLock validPassword={validPassword} />}

        {!lock && post && (
          <div className='mx-auto md:w-full md:px-5'>
            {/* 文章主体 */}
            <article
              id='article-wrapper'
              itemScope
              itemType='https://schema.org/Movie'>
              {/* Notion文章主体 */}
              <section
                className='wow fadeInUp p-5 justify-center mx-auto'
                data-wow-delay='.2s'>
                <AISummary aiSummary={post.aiSummary}/>
                <WWAds orientation='horizontal' className='w-full' />
                {post && <NotionPage post={post} />}
                <WWAds orientation='horizontal' className='w-full' />
              </section>

              {/* 上一篇\下一篇文章 */}
              <PostAdjacent {...props} />

              {/* 分享 */}
              <ShareBar post={post} />
              {post?.type === 'Post' && (
                <div className='px-5'>
                  {/* 版权 */}
                  <PostCopyright {...props} />
                  {/* 文章推荐 */}
                  {/*<PostRecommend {...props} />*/}
                </div>
              )}
            </article>

            {/* 评论区 */}
            {fullWidth ? null : (
              <div className={`${commentEnable && post ? '' : 'hidden'}`}>
                <hr className='my-4 border-dashed' />
                {/* 评论区上方广告 */}
                <div className='py-2'>
                  <AdSlot />
                </div>
                {/* 评论互动 */}
                <div className='duration-200 overflow-x-auto px-5'>
                  <div className='text-2xl dark:text-white'>
                    <i className='fas fa-comment mr-1' />
                    {locale.COMMON.COMMENTS}
                  </div>
                  <Comment frontMatter={post} className='' />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <FloatTocButton {...props} />
    </>
  )
}

/**
 * 404
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  // const { meta, siteInfo } = props
  const { onLoading, fullWidth } = useGlobal()
  return (
    <>
      {/* 主区块 */}
      <main
        id='wrapper-outer'
        className={`flex-grow ${fullWidth ? '' : 'max-w-4xl'} w-screen mx-auto px-5`}>
        <div id='error-wrapper' className={'w-full mx-auto justify-center'}>
          <Transition
            show={!onLoading}
            appear={true}
            enter='transition ease-in-out duration-700 transform order-first'
            enterFrom='opacity-0 translate-y-16'
            enterTo='opacity-100'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 -translate-y-16'
            unmount={false}>
            {/* 404卡牌 */}
            <div className='error-content flex flex-col md:flex-row w-full mt-12 h-[30rem] md:h-96 justify-center items-center bg-white dark:bg-[#1B1C20] border dark:border-gray-800 rounded-3xl'>
              {/* 左侧动图 */}
              <LazyImage
                className='error-img h-60 md:h-full p-4'
                src={
                  'https://bu.dusays.com/2023/03/03/6401a7906aa4a.gif'
                }></LazyImage>

              {/* 右侧文字 */}
              <div className='error-info flex-1 flex flex-col justify-center items-center space-y-4'>
                <h1 className='error-title font-extrabold md:text-9xl text-7xl dark:text-white'>
                  404
                </h1>
                <div className='dark:text-white'>请尝试站内搜索寻找文章</div>
                <Link href='/'>
                  <button className='bg-blue-500 py-2 px-4 text-white shadow rounded-lg hover:bg-blue-600 hover:shadow-md duration-200 transition-all'>
                    回到主页
                  </button>
                </Link>
              </div>
            </div>

            {/* 404页面底部显示最新文章 */}
            <div className='mt-12'>
              <LatestPostsGroup {...props} />
            </div>
          </Transition>
        </div>
      </main>
    </>
  )
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()

  return (
    <div id='category-outer-wrapper' className='mt-8 px-5 md:px-0'>
      <div className='text-4xl font-extrabold dark:text-gray-200 mb-5'>
        {locale.COMMON.CATEGORY}
      </div>
      <div
        id='category-list'
        className='duration-200 flex flex-wrap m-10 justify-center'>
        {categoryOptions?.map(category => {
          return (
            <Link
              key={category.name}
              href={`/category/${category.name}`}
              passHref
              legacyBehavior>
              <div
                className={
                  'group mr-5 mb-5 flex flex-nowrap items-center border bg-white text-2xl rounded-xl dark:hover:text-white px-4 cursor-pointer py-3 hover:text-white hover:bg-indigo-600 transition-all hover:scale-110 duration-150'
                }>
                <HashTag className={'w-5 h-5 stroke-gray-500 stroke-2'} />
                {category.name}
                <div className='bg-[#f1f3f8] ml-1 px-2 rounded-lg group-hover:text-indigo-600 '>
                  {category.count}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()

  return (
    <div id='tag-outer-wrapper' className='px-5 mt-8 md:px-0'>
      <div className='text-4xl font-extrabold dark:text-gray-200 mb-5'>
        {locale.COMMON.TAGS}
      </div>
      <div
        id='tag-list'
        className='duration-200 flex flex-wrap space-x-5 space-y-5 m-10 justify-center'>
        {tagOptions.map(tag => {
          return (
            <Link
              key={tag.name}
              href={`/tag/${tag.name}`}
              passHref
              legacyBehavior>
              <div
                className={
                  'group flex flex-nowrap items-center border bg-white text-2xl rounded-xl dark:hover:text-white px-4 cursor-pointer py-3 hover:text-white hover:bg-indigo-600 transition-all hover:scale-110 duration-150'
                }>
                <HashTag className={'w-5 h-5 stroke-gray-500 stroke-2'} />
                {tag.name}
                <div className='bg-[#f1f3f8] ml-1 px-2 rounded-lg group-hover:text-indigo-600 '>
                  {tag.count}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}

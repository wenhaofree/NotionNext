import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import CopyRightDate from '@/components/CopyRightDate'
import PoweredBy from '@/components/PoweredBy'
import { siteConfig } from '@/lib/config'
import SocialButton from './SocialButton'
/**
 * 页脚
 * @returns
 */
const Footer = () => {
  const BEI_AN = siteConfig('BEI_AN')
  const BIO = siteConfig('BIO')
  return (
    <footer className='relative flex-shrink-0 bg-white dark:bg-[#1a191d] justify-center text-center m-auto w-full leading-6  text-gray-600 dark:text-gray-100 text-sm'>
      {/* 颜色过度区 */}
      <div
        id='color-transition'
        className='h-32 bg-gradient-to-b from-[#f7f9fe] to-white  dark:bg-[#1a191d] dark:from-inherit dark:to-inherit'
      />

      {/* 社交按钮 */}
      <div className='w-full h-24'>
        <SocialButton />
      </div>

      <br />

      {/* 法律页面链接 */}
      <div className='w-full py-4 px-6 bg-gray-50 dark:bg-[#1e1e1e] border-t dark:border-t-[#3D3D3F]'>
        <div className='flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
          <a href='/about' className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
            关于我们
          </a>
          <span className='text-gray-400'>|</span>
          <a href='/privacy' className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
            隐私政策
          </a>
          <span className='text-gray-400'>|</span>
          <a href='/terms' className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
            使用条款
          </a>
          <span className='text-gray-400'>|</span>
          <a href='/disclaimer' className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
            免责声明
          </a>
          <span className='text-gray-400'>|</span>
          <a href='/contact' className='hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
            联系我们
          </a>
        </div>
      </div>

      {/* 底部页面信息 */}
      <div
        id='footer-bottom'
        className='w-full h-20 flex flex-col p-3 lg:flex-row justify-between px-6 items-center bg-[#f1f3f7] dark:bg-[#21232A] border-t dark:border-t-[#3D3D3F]'>
        <div id='footer-bottom-left' className='text-center lg:text-start'>
          {/*<PoweredBy />*/}
          <div className='flex gap-x-1'>
            <CopyRightDate />
            <a
              href={'/about'}
              className='underline font-semibold dark:text-gray-300 '>
              {siteConfig('AUTHOR')}
            </a>
            {BIO && <span className='mx-1'> | {BIO}</span>}
          </div>
        </div>

        <div id='footer-bottom-right'>
          {BEI_AN && (
            <>
              <i className='fas fa-shield-alt' />{' '}
              <a href='https://beian.miit.gov.cn/' className='mr-2'>
                {siteConfig('BEI_AN')}
              </a>
            </>
          )}
          <BeiAnGongAn />

          <span className='hidden busuanzi_container_site_pv'>
            <i className='fas fa-eye' />
            <span className='px-1 busuanzi_value_site_pv'> </span>{' '}
          </span>
          <span className='pl-2 hidden busuanzi_container_site_uv'>
            <i className='fas fa-users' />{' '}
            <span className='px-1 busuanzi_value_site_uv'> </span>{' '}
          </span>

          {/* <h1 className='text-xs pt-4 text-light-400 dark:text-gray-400'>{title} {siteConfig('BIO') && <>|</>} {siteConfig('BIO')}</h1> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer

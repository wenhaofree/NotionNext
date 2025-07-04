/**
 * Prism Mac Style JavaScript
 * 代码高亮的 Mac 风格样式增强脚本
 * @author NotionNext
 */

(function() {
  'use strict';

  // 确保 Prism 已加载
  if (typeof window !== 'undefined' && window.Prism) {
    
    // 添加 Mac 风格的代码块装饰
    function addMacStyleDecorations() {
      const codeBlocks = document.querySelectorAll('pre[class*="language-"]');
      
      codeBlocks.forEach(function(block) {
        // 检查是否已经添加了 Mac 装饰
        if (block.querySelector('.mac-decoration')) {
          return;
        }
        
        // 创建 Mac 风格的装饰元素
        const decoration = document.createElement('div');
        decoration.className = 'mac-decoration';
        decoration.innerHTML = '<span class="mac-dot red"></span><span class="mac-dot yellow"></span><span class="mac-dot green"></span>';
        
        // 将装饰添加到代码块的开头
        block.style.position = 'relative';
        block.style.paddingTop = '2.5rem';
        
        decoration.style.position = 'absolute';
        decoration.style.top = '0.75rem';
        decoration.style.left = '1rem';
        decoration.style.zIndex = '10';
        
        block.appendChild(decoration);
      });
    }
    
    // 添加样式
    function addMacStyles() {
      if (document.getElementById('prism-mac-styles')) {
        return;
      }
      
      const style = document.createElement('style');
      style.id = 'prism-mac-styles';
      style.textContent = `
        .mac-decoration {
          display: flex;
          gap: 0.5rem;
        }
        
        .mac-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
        }
        
        .mac-dot.red {
          background-color: #ff5f57;
        }
        
        .mac-dot.yellow {
          background-color: #ffbd2e;
        }
        
        .mac-dot.green {
          background-color: #28ca42;
        }
        
        pre[class*="language-"] {
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
      `;
      
      document.head.appendChild(style);
    }
    
    // 初始化函数
    function initMacStyle() {
      addMacStyles();
      addMacStyleDecorations();
    }
    
    // 如果 DOM 已加载，立即执行
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initMacStyle);
    } else {
      initMacStyle();
    }
    
    // 监听动态内容变化
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver(function(mutations) {
        let shouldUpdate = false;
        
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(function(node) {
              if (node.nodeType === 1 && (
                node.tagName === 'PRE' || 
                node.querySelector && node.querySelector('pre[class*="language-"]')
              )) {
                shouldUpdate = true;
              }
            });
          }
        });
        
        if (shouldUpdate) {
          setTimeout(addMacStyleDecorations, 100);
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
    
    // 暴露全局函数供外部调用
    window.PrismMacStyle = {
      init: initMacStyle,
      addDecorations: addMacStyleDecorations
    };
    
  } else {
    console.warn('Prism is not loaded, Mac style enhancements will not be applied.');
  }
  
})();

// 兼容性检查和错误处理
try {
  // 确保脚本在各种环境下都能正常工作
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.PrismMacStyle;
  }
} catch (e) {
  // 静默处理模块系统错误
}

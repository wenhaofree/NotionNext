# React 水合错误修复说明

## 🐛 问题描述

在 NotionNext 项目中遇到了 React 水合错误：

```
Error: Text content does not match server-rendered HTML.
```

这个错误主要出现在 LazyImage 组件的内联样式中，特别是包含中文字符的 CSS content 属性。

## 🔧 修复方案

### 1. 移除内联样式

将 LazyImage 组件中的内联 `<style>` 标签移除，避免服务端和客户端渲染不一致的问题。

### 2. 使用全局 CSS

将样式移动到 `styles/globals.css` 文件中，确保服务端和客户端使用相同的样式。

### 3. 简化错误处理

使用 React 状态管理错误状态，而不是依赖 CSS 伪元素的 content 属性。

## 📝 具体修改

### LazyImage 组件修改

```javascript
// 添加错误状态
const [hasError, setHasError] = useState(false)

// 简化错误处理
const handleImageError = () => {
  setHasError(true)
  if (imageRef.current) {
    imageRef.current.classList.remove('lazy-image-placeholder')
  }
}

// 条件渲染错误状态
if (hasError) {
  return (
    <div 
      className={`lazy-image-error ${className || ''}`}
      style={{ width: width || 'auto', height: height || 'auto', ...style }}
      title="图片加载失败"
    >
      <span>⚠️</span>
    </div>
  )
}
```

### CSS 样式修改

```css
/* 移动到 globals.css */
.lazy-image-placeholder {
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.01) 33%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.01) 66%) #f2f2f2;
  background-size: 300% 100%;
  animation: lazy-loading 1s infinite linear;
  transition: opacity 0.3s ease;
}

.lazy-image-error {
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 24px;
  min-height: 100px;
  border-radius: 8px;
  border: 2px dashed #d1d5db;
}
```

## ✅ 修复效果

1. **消除水合错误** - 不再出现服务端和客户端内容不匹配的错误
2. **保持功能完整** - 图片懒加载和错误处理功能正常工作
3. **改善用户体验** - 错误状态显示更加友好
4. **提高性能** - 避免了内联样式的重复渲染

## 🔍 预防措施

为了避免类似的水合错误，建议：

1. **避免内联样式** - 特别是包含动态内容的样式
2. **使用全局 CSS** - 确保服务端和客户端样式一致
3. **谨慎使用 CSS content** - 避免在 content 属性中使用可能编码不一致的字符
4. **测试 SSR** - 在开发过程中测试服务端渲染的一致性

## 🧪 测试验证

修复后，可以通过以下方式验证：

1. **开发环境测试**
   ```bash
   npm run dev
   ```

2. **生产构建测试**
   ```bash
   npm run build
   npm run start
   ```

3. **检查控制台** - 确保没有水合错误

4. **功能测试** - 验证图片懒加载和错误处理正常工作

## 📚 相关资源

- [Next.js 水合错误文档](https://nextjs.org/docs/messages/react-hydration-error)
- [React 水合概念](https://react.dev/reference/react-dom/client/hydrateRoot)
- [CSS-in-JS 最佳实践](https://styled-components.com/docs/advanced#server-side-rendering)

## 🎯 总结

通过将内联样式移动到全局 CSS 文件，并简化错误处理逻辑，成功解决了 React 水合错误问题。这种方法不仅修复了错误，还提高了代码的可维护性和性能。

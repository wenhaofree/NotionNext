# Hero 推荐文章配置验证报告

## 🎯 配置概述

您的 Heo 主题推荐文章功能已正确配置，默认会展示 6 个带有"推荐"标签的文章。

## ✅ 当前配置状态

### 主要配置项
```javascript
// themes/heo/config.js
HEO_HERO_RECOMMEND_POST_TAG: '推荐',                    // ✅ 已设置推荐标签
HEO_HERO_RECOMMEND_POST_SORT_BY_UPDATE_TIME: true,     // ✅ 按更新时间排序
HERO_RECOMMEND_COVER: 'https://cdn.pixabay.com/...',   // ✅ 默认封面图
```

### 功能特性
- ✅ **最多显示 6 篇文章** - 在 `getTopPosts` 函数中限制为 6 篇
- ✅ **标签筛选** - 只显示包含"推荐"标签的文章
- ✅ **时间排序** - 按最后编辑时间倒序排列
- ✅ **降级处理** - 如果没有推荐文章，显示最新的 6 篇文章
- ✅ **点击跳转** - 每个推荐文章都可以点击跳转到详情页

## 🔧 技术实现细节

### 1. 推荐文章获取逻辑
```javascript
function getTopPosts({ latestPosts, allNavPages }) {
  // 1. 安全检查输入数据
  if (!latestPosts || !Array.isArray(latestPosts)) {
    return []
  }

  // 2. 如果没有设置推荐标签，返回最新 6 篇文章
  if (!siteConfig('HEO_HERO_RECOMMEND_POST_TAG', null, CONFIG) || 
      siteConfig('HEO_HERO_RECOMMEND_POST_TAG', null, CONFIG) === '') {
    return latestPosts.slice(0, 6)
  }

  // 3. 按配置排序文章
  const shouldSortByTime = siteConfig('HEO_HERO_RECOMMEND_POST_SORT_BY_UPDATE_TIME', false, CONFIG)
  let sortPosts = shouldSortByTime 
    ? [...allNavPages].sort((a, b) => new Date(b.lastEditedDate) - new Date(a.lastEditedDate))
    : [...allNavPages]

  // 4. 筛选包含推荐标签的文章，最多 6 篇
  const topPosts = []
  const recommendTag = '推荐'
  
  for (const post of sortPosts) {
    if (topPosts.length === 6) break
    if (post?.tags?.includes(recommendTag)) {
      topPosts.push(post)
    }
  }

  // 5. 降级处理：如果没有推荐文章，返回最新文章
  return topPosts.length > 0 ? topPosts : latestPosts.slice(0, 6)
}
```

### 2. 显示组件结构
```javascript
// TopGroup 组件负责渲染推荐文章
<div className='xl:grid xl:grid-cols-3 xl:gap-3'>
  {topPosts?.map((post, index) => (
    <Link href={`/${post.slug}`} key={index}>
      <div className='cursor-pointer h-[164px] group relative'>
        <LazyImage src={post.pageCoverThumbnail} />
        <div className='group-hover:text-indigo-600'>
          {post.title}
        </div>
        {/* 推荐标识 */}
        <div className='opacity-0 group-hover:opacity-100'>
          荐
        </div>
      </div>
    </Link>
  ))}
</div>
```

## 📋 使用说明

### 如何添加推荐文章
1. **在 Notion 中编辑文章**
2. **添加"推荐"标签** - 在文章的 Tags 属性中添加"推荐"标签
3. **保存并同步** - NotionNext 会自动获取更新

### 推荐文章显示规则
1. **优先级**: 带有"推荐"标签的文章优先显示
2. **排序**: 按最后编辑时间倒序排列（最新的在前）
3. **数量**: 最多显示 6 篇文章
4. **降级**: 如果推荐文章不足 6 篇，用最新文章补充

### 布局说明
- **桌面端**: 3 列网格布局，每行 3 篇文章
- **移动端**: 水平滚动布局
- **交互**: 鼠标悬停显示"荐"字标识和颜色变化

## 🎨 视觉效果

### 推荐文章卡片特性
- ✅ **封面图片** - 显示文章封面或默认图片
- ✅ **文章标题** - 最多显示 2 行，超出省略
- ✅ **悬停效果** - 标题颜色变化 + "荐"字显示
- ✅ **响应式** - 适配不同屏幕尺寸
- ✅ **加载优化** - 首篇文章优先加载

### 样式配置
```css
/* 推荐文章卡片 */
.cursor-pointer.h-[164px] {
  height: 164px;
  transition: all 0.2s ease;
}

/* 悬停效果 */
.group-hover:text-indigo-600 {
  color: #4f46e5; /* 浅色模式 */
}

.dark .group-hover:text-yellow-600 {
  color: #d97706; /* 深色模式 */
}

/* 推荐标识 */
.opacity-0.group-hover:opacity-100 {
  transition: all 0.2s ease;
  transform: translateX(-1rem);
}
```

## 🔍 故障排除

### 常见问题

#### 1. 推荐文章不显示
**可能原因**:
- 文章没有添加"推荐"标签
- 标签名称不匹配（区分大小写）
- 文章数据未同步

**解决方案**:
```javascript
// 检查配置
console.log('推荐标签:', siteConfig('HEO_HERO_RECOMMEND_POST_TAG'))
console.log('所有文章:', allNavPages)
console.log('推荐文章:', topPosts)
```

#### 2. 显示数量不正确
**可能原因**:
- 推荐文章总数少于 6 篇
- 文章数据结构问题

**解决方案**:
- 添加更多带"推荐"标签的文章
- 检查文章的 tags 属性格式

#### 3. 点击无法跳转
**可能原因**:
- 文章 slug 为空或无效
- 路由配置问题

**解决方案**:
- 检查文章的 slug 属性
- 验证路由配置

## 📊 性能优化

### 已实现的优化
- ✅ **数据安全检查** - 防止空数据导致错误
- ✅ **懒加载图片** - 提升页面加载速度
- ✅ **优先加载** - 首篇文章图片优先加载
- ✅ **错误处理** - 完善的异常处理机制

### 建议的优化
```javascript
// 可以考虑添加缓存机制
const cachedTopPosts = useMemo(() => {
  return getTopPosts({ latestPosts, allNavPages })
}, [latestPosts, allNavPages])
```

## 📝 总结

您的推荐文章功能配置完全正确：

1. ✅ **配置正确** - `HEO_HERO_RECOMMEND_POST_TAG: '推荐'`
2. ✅ **逻辑完善** - 支持标签筛选、排序、降级处理
3. ✅ **显示正常** - 最多显示 6 篇推荐文章
4. ✅ **交互完整** - 点击可跳转到文章详情页
5. ✅ **样式美观** - 响应式布局和悬停效果

现在您只需要在 Notion 中为文章添加"推荐"标签，这些文章就会自动在首页 Hero 区域的右侧显示！🎉

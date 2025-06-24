#!/bin/bash

# 项目重新部署脚本
# 功能：拉取最新代码、构建项目、重启服务

echo "========================================="
echo "开始执行项目重新部署..."
echo "========================================="

# 步骤1: 拉取最新代码
echo ""
echo "📥 [1/3] 正在拉取最新代码..."
echo "执行命令: git pull"
git pull

# 检查git pull是否成功
if [ $? -eq 0 ]; then
    echo "✅ 代码拉取成功"
else
    echo "❌ 代码拉取失败，请检查网络连接或仓库状态"
    exit 1
fi

# 步骤2: 构建项目
echo ""
echo "🔨 [2/3] 正在构建项目..."
echo "执行命令: pnpm run build"
pnpm run build

# 检查构建是否成功
if [ $? -eq 0 ]; then
    echo "✅ 项目构建成功"
else
    echo "❌ 项目构建失败，请检查构建配置或依赖"
    exit 1
fi

# 步骤3: 重启PM2服务
echo ""
echo "🔄 [3/3] 正在重启服务..."
echo "执行命令: pm2 reload yzzzzy"
pm2 reload yzzzzy

# 检查PM2重启是否成功
if [ $? -eq 0 ]; then
    echo "✅ 服务重启成功"
else
    echo "❌ 服务重启失败，请检查PM2配置"
    exit 1
fi

echo ""
echo "========================================="
echo "🎉 项目重新部署完成！"
echo "========================================="
#!/bin/bash

# 显示当前状态
git status

# 添加所有更改
echo -e "\n添加所有更改..."
git add .

# 获取提交信息
echo -e "\n请输入提交描述: "
read description

# 执行提交
echo -e "\n执行提交..."
git commit -q -m "feat: $description"

# 显示成功信息
echo -e "\n✨ Commit 成功!" 

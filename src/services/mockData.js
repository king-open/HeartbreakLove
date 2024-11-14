// 从 localStorage 获取存储的帖子数据
// 如果 localStorage 中没有数据，则使用默认的示例帖子
let allPosts = JSON.parse(localStorage.getItem('posts')) || [
  {
    id: 1,                    // 帖子唯一标识
    image: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=800',  // 帖子图片
    content: '时光静好，愿你安好。无论经历什么，记住保持微笑。',  // 帖子内容
    likes: 128,               // 点赞数
    comments: [               // 评论数组
      {
        id: 1,               // 评论ID
        content: '写得真好！', // 评论内容
        author: '快乐的小松鼠', // 评论作者
        timestamp: '2024-03-20T10:00:00.000Z', // 评论时间
      },
      {
        id: 2,
        content: '感同身受',
        author: '阳光灿烂',
        timestamp: '2024-03-20T11:30:00.000Z',
      }
    ],
    liked: false,            // 当前用户是否点赞
    timestamp: '2024-03-20T09:00:00.000Z',  // 帖子发布时间
  }
];

// 更新 localStorage 中的帖子数据
const updateLocalStorage = () => {
  localStorage.setItem('posts', JSON.stringify(allPosts));
};

// 导出模拟数据和相关方法
export const mockPosts = {
  // 获取第一页帖子数据
  getFirstPagePosts: () => allPosts,

  // 生成新的帖子数据（用于加载更多）
  getNextPagePost: () => ({
    id: Date.now(),          // 使用时间戳作为ID
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    content: '新的一天，新的开始。',
    likes: Math.floor(Math.random() * 1000),  // 随机生成点赞数
    comments: [],
    liked: false,
    timestamp: new Date().toISOString(),
  }),

  // 添加新帖子到列表开头
  addNewPost: (post) => {
    allPosts = [post, ...allPosts];  // 将新帖子添加到数组开头
    updateLocalStorage();            // 更新本地存储
    return post;
  },

  // 模拟异步 API 请求
  fetchPosts: async (page) => {
    // 添加 1 秒延迟模拟网络请求
    await new Promise(resolve => setTimeout(resolve, 1000));
    // 第一页返回所有帖子，其他页返回新生成的帖子
    return page === 1 
      ? mockPosts.getFirstPagePosts()
      : [mockPosts.getNextPagePost()];
  }
}; 

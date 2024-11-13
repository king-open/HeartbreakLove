export const mockPosts = {
  getFirstPagePosts: () => [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=800',
      content: '时光静好，愿你安好。无论经历什么，记住保持微笑。',
      likes: 128,
      comments: [
        {
          id: 1,
          content: '写得真好！',
          author: '快乐的小松鼠',
          timestamp: '2024-03-20T10:00:00.000Z',
        },
        {
          id: 2,
          content: '感同身受',
          author: '阳光灿烂',
          timestamp: '2024-03-20T11:30:00.000Z',
        }
      ],
      liked: false,
      timestamp: '2024-03-20T09:00:00.000Z',
    }
  ],

  getNextPagePost: () => ({
    id: Date.now(),
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    content: '新的一天，新的开始。',
    likes: Math.floor(Math.random() * 1000),
    comments: [],
    liked: false,
    timestamp: new Date().toISOString(),
  }),

  // 模拟 API 请求
  fetchPosts: async (page) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return page === 1 
      ? mockPosts.getFirstPagePosts()
      : [mockPosts.getNextPagePost()];
  }
}; 

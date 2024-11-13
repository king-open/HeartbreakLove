export const initialPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=800',
    content: '时光静好，愿你安好。无论经历什么，记住保持微笑。',
    likes: 128,
    comments: [],
    liked: false,
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    content: '新的一天，新的开始。',
    likes: 56,
    comments: [],
    liked: false,
    timestamp: new Date().toISOString(),
  },
];

export const initialUserInfo = {
  name: '阳光灿烂',
  bio: '热爱生活，享受当下',
  postsCount: 12,
  followersCount: 256,
  followingCount: 128,
  tags: ['摄影', '旅行', '美食'],
  mood: '开心',
}; 

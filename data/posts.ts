import { Post } from '@/lib/types';

export const posts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      avatar: '👤',
      verified: true,
    },
    timestamp: '2h',
    content:
      "Just finished reading the most fascinating article about the intersection of AI and creative communities. The future of social platforms isn't just about connections—it's about cultivating spaces where authentic voices can thrive without algorithmic manipulation.\n\nWhat makes a platform truly \"culture-first\" in 2025?",
    actions: { likes: 234, comments: 67, reposts: 45, shares: 12 },
  },
  {
    id: '2',
    author: {
      name: 'Marcus Williams',
      avatar: '👤',
      verified: true,
    },
    timestamp: '4h',
    content:
      "The way we're rethinking content moderation is wild. Instead of just removing harmful content, we're building systems that understand cultural context and nuance. Real safety means protecting communities, not just policing keywords.",
    actions: { likes: 189, comments: 43, reposts: 28, shares: 8 },
  },
  {
    id: '3',
    author: {
      name: 'Jasmine Lee',
      avatar: '👤',
      verified: false,
    },
    timestamp: '6h',
    content:
      "Hot take: The best social platforms are the ones you don't feel anxious opening. If your app makes me feel worse about myself or the world, I'm out. Give me thoughtful conversations over viral rage any day.",
    actions: { likes: 456, comments: 91, reposts: 67, shares: 23 },
  },
  {
    id: '4',
    author: {
      name: 'Alex Rivera',
      avatar: '👤',
      verified: true,
    },
    timestamp: '8h',
    content:
      "Community-driven moderation is the future. When the people using the platform have a say in how it's governed, everyone wins. Power to the people, not just the algorithms.",
    actions: { likes: 312, comments: 54, reposts: 38, shares: 15 },
  },
];
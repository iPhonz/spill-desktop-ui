import type { Meta, StoryObj } from '@storybook/react';
import { LoginCard } from '../components/rightrail/LoginCard';
import { UpNextList } from '../components/rightrail/UpNextList';
import { TrendingList } from '../components/rightrail/TrendingList';
import { upNextItems } from '../data/upNext';
import { trendingLinks } from '../data/trending';

// LoginCard Stories
const loginMeta = {
  title: 'RightRail/LoginCard',
  component: LoginCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginCard>;

export default loginMeta;
type LoginStory = StoryObj<typeof loginMeta>;

export const Login: LoginStory = {};

// UpNextList Stories
const upNextMeta = {
  title: 'RightRail/UpNextList',
  component: UpNextList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UpNextList>;

export const UpNext: StoryObj<typeof upNextMeta> = {
  args: {
    items: upNextItems,
  },
};

export const EmptyUpNext: StoryObj<typeof upNextMeta> = {
  args: {
    items: [],
  },
};

// TrendingList Stories
const trendingMeta = {
  title: 'RightRail/TrendingList',
  component: TrendingList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TrendingList>;

export const Trending: StoryObj<typeof trendingMeta> = {
  args: {
    links: trendingLinks,
  },
};

export const EmptyTrending: StoryObj<typeof trendingMeta> = {
  args: {
    links: [],
  },
};
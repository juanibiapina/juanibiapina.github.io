import { getCollection } from 'astro:content';

export const POSTS_PER_PAGE = 5;

export interface Post {
  url: string;
  frontmatter: {
    title: string;
    description: string;
    pubDate: Date;
  };
}

export async function getPaginatedPosts(page: number = 1) {
  const posts = await getCollection('posts');

  const sortedPosts = posts
    .sort((a, b) => {
      const dateA = new Date(a.data.pubDate);
      const dateB = new Date(b.data.pubDate);
      return dateB.getTime() - dateA.getTime();
    })
    .map(post => ({
      url: `/posts/${post.slug}/`,
      frontmatter: {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate
      }
    }));

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const currentPosts = sortedPosts.slice(start, end);

  return {
    posts: currentPosts,
    totalPages,
    currentPage: page
  };
}

import { getCollection, render } from 'astro:content';

export interface Post {
  url: string;
  frontmatter: {
    title: string;
    description: string;
    pubDate: Date;
    readingTime?: string;
  };
}

export async function getAllPosts() {
  const posts = await getCollection('posts');

  const sortedPosts = posts
    .sort((a, b) => {
      const dateA = new Date(a.data.pubDate);
      const dateB = new Date(b.data.pubDate);
      return dateB.getTime() - dateA.getTime();
    })
    .map(async post => {
      const { remarkPluginFrontmatter } = await render(post);
      return {
        url: `/posts/${post.id}/`,
        frontmatter: {
          title: post.data.title,
          description: post.data.description,
          pubDate: post.data.pubDate,
          readingTime: remarkPluginFrontmatter.readingTime
        }
      };
    });

  return await Promise.all(sortedPosts);
}

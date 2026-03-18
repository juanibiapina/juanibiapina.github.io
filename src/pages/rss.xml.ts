import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown);
  return String(result);
}

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    customData: [
      `<language>${SITE.lang ?? "en"}</language>`,
      `<atom:link href="${SITE.website}rss.xml" rel="self" type="application/rss+xml"/>`,
    ].join(""),
    items: await Promise.all(
      sortedPosts.map(async ({ data, id, body, filePath }) => ({
        link: getPath(id, filePath),
        title: data.title,
        description: data.description,
        pubDate: new Date(data.modDatetime ?? data.pubDatetime),
        categories: data.tags,
        content: body ? await markdownToHtml(body) : undefined,
      }))
    ),
  });
}

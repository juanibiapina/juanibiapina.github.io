import type { Element, Root, RootContent } from "hast";

// Post images never render wider than the post column (`max-w-page` minus `px-4` padding in PostDetails).
// Without this, Astro's constrained layout emits `sizes="... 100vw"` and wide 2x screens download the largest image.
export const POST_IMAGE_SIZES = "(min-width: 56rem) 54rem, calc(100vw - 2rem)";

const setSizes = (node: Root | RootContent) => {
  if (node.type === "element") {
    const element = node as Element;
    if (element.tagName === "img" && element.properties.sizes === undefined) {
      element.properties.sizes = POST_IMAGE_SIZES;
    }
  }
  if ("children" in node) {
    for (const child of node.children) setSizes(child);
  }
};

export const rehypeImageSizes = () => (tree: Root) => {
  setSizes(tree);
};

export const SITE = {
  website: "https://juanibiapina.dev/",
  author: "Juan Ibiapina",
  profile: "https://github.com/juanibiapina",
  desc: "Juan Ibiapina's blog on agentic coding, developer tooling, and the things that catch his attention.",
  title: "Juan Ibiapina",
  ogImage: "og.png",
  lightAndDarkMode: true,
  postPerIndex: 10,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showBackButton: true,
  editPost: {
    enabled: false,
    text: "",
    url: "",
  },
  dynamicOgImage: true,
  dir: "ltr",
  lang: "en",
  timezone: "Europe/Berlin",
} as const;

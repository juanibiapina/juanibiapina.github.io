export const SITE = {
  website: "https://juanibiapina.dev/",
  author: "Juan Ibiapina",
  profile: "https://github.com/juanibiapina",
  desc: "Blog by Juan Ibiapina - software engineer, language enthusiast, and open source contributor.",
  title: "Juan Ibiapina",
  ogImage: "og.png",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
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

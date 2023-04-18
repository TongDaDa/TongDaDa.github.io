const removeMd = require("remove-markdown");

module.exports = (themeConfig, ctx) => {
  themeConfig = Object.assign(themeConfig, {
    summary: !!themeConfig.summary,
    summaryLength:
      typeof themeConfig.summaryLength === "number"
        ? themeConfig.summaryLength
        : 400,
    pwa: !!themeConfig.pwa
  });

  themeConfig.heroImage =
    themeConfig.heroImage || "https://source.unsplash.com/featured/1200x800";

  const defaultBlogPluginOptions = {
    directories: [
      {
        id: "post",
        dirname: "_posts",
        path: "/",
        // layout: 'IndexPost', defaults to `Layout.vue`
        itemLayout: "Post",
        frontmatter: { title: "Home" },
        itemPermalink: "/:year/:month/:day/:slug",
        pagination: {
          lengthPerPage: 10
        }
      },
      {
        id: "project",
        dirname: "_projects",
        path: "/projects/",
        layout: "Projects",
        itemLayout: "Project",
        frontmatter: { title: "Project" },
        itemPermalink: "/projects/:slug",
        pagination: {
          lengthPerPage: 10
        }
      },
      {
        id: "myself",
        dirname: "_aboutme",
        path: "/about_me/",
        layout: "AboutMe",
        itemLayout: "Project",
        frontmatter: { title: "关于我" },
        itemPermalink: "/projects/:slug",
        pagination: {
          lengthPerPage: 10
        }
      }
    ],
    comment: [
      {
        // Which service you'd like to use
        service: 'vssue',
        // The owner's name of repository to store the issues and comments.
        owner: 'You',
        // The name of repository to store the issues and comments.
        repo: 'Your repo',
        // The clientId & clientSecret introduced in OAuth2 spec.
        clientId: 'Your clientId',
        clientSecret: 'Your clientSecret',
      },
    ],
    frontmatters: [
      {
        id: "tag",
        keys: ["tag", "tags"],
        path: "/tag/",
        // layout: 'Tag',  defaults to `FrontmatterKey.vue`
        frontmatter: { title: "Tag" },
        pagination: {
          lengthPerPage: 5
        }
      }
    ]
  };

  const { modifyBlogPluginOptions } = themeConfig;

  const blogPluginOptions =
    typeof modifyBlogPluginOptions === "function"
      ? modifyBlogPluginOptions(defaultBlogPluginOptions)
      : defaultBlogPluginOptions;

  const plugins = [
    "disqus",
    "seo",
    "reading-time",
    "smooth-scroll",
    "reading-progress",
    "@vuepress/medium-zoom",
    "@vuepress/nprogress",
    ["@vuepress/blog", blogPluginOptions],
    [
      "@vuepress/search",
      {
        searchMaxSuggestions: 10
      }
    ]
  ];

  if (themeConfig.socialShare && themeConfig.socialShareNetworks) {
    plugins.push(
      ["social-share", { networks: themeConfig.socialShareNetworks }]
    )
  }

  if (themeConfig.sitemap && themeConfig.hostname) {
    plugins.push([
      "sitemap",
      {
        hostname: themeConfig.hostname
      }
    ]);
  }

  if (themeConfig.googleAnalytics) {
    plugins.push([
      "@vuepress/google-analytics",
      {
        ga: themeConfig.googleAnalytics
      }
    ]);
  }

  if (themeConfig.pwa) {
    plugins.push([
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: true
      }
    ]);
  }

  const config = {
    plugins,
    define: {
      THEME_BLOG_PAGINATION_COMPONENT: themeConfig.paginationComponent
        ? themeConfig.paginationComponent
        : "Pagination"
    }
  };

  /**
   * Generate summary.
   */
  config.extendPageData = function (pageCtx) {
    const strippedContent = pageCtx._strippedContent;
    if (!strippedContent) {
      return;
    }

    const sanitizedContent = strippedContent
      .trim()
      .replace(/^#+\s+(.*)/, "")

    if (themeConfig.summary) {
      pageCtx.summary =
        removeMd(
            sanitizedContent
            .slice(0, themeConfig.summaryLength)
        ) + " ...";
    };

    pageCtx.content = removeMd(sanitizedContent)
  }

  return config;
};

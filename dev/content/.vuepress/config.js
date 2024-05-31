module.exports = {
  title: "Oliver Liu",
  description: "一个充满理想并付诸于行动中的码农，喜欢遨游在计算机世界里，励志于成为一名多才多艺的人(多财多亿也行)",
  theme: require.resolve("../../"),
  summaryLength: 500,
  scripts: ['click_effects.js'],
  themeConfig: {
    summary: true,
    nav: [
      {
        text: "Home",
        link: "/",
        icon: "el-icon-house"
      },
      {
        text: "Projects",
        link: "/projects/",
        icon: "el-icon-folder"
      },
      {
        text: "About me",
        link: "/about_me/",
        icon: "el-icon-user"
      }
    ],
    sitemap: true, // enables sitemap plugin
    hostname: "https://ahmadmostafa.com/", // required for sitemap
    disqus: "aflyingpig", // if you want to incorporate Disqus for comments replace this value else just get rid of it
    socialShare: true, // enables social share
    // there will support the signa blog and zhihu.
    socialShareNetworks: ["facebook", "twitter"], // required for social share plugin
    googleAnalytics: "UA-164508376-1", // Google Analytics tracking ID
    about: {
      fullName: "Oliver",
      bio: "The passionate coding was my pursuit for a long time and I love the open source culture",
      image: "https://avatars.githubusercontent.com/u/23241188?v=4"
    },
    footer: {
      contact: [
        {
          type: "github",
          link: "https://github.com/TongDaDa"
        },
        {
          type: "segment",
          link: "https://segmentfault.com/u/liutong"
        },
        {
          type: "linkedin",
          link: "https://weibo.com/u/5736764406?is_all=1"
        },
        {
          type: "twitter",
          link: "https://twitter.com/Console90Liu"
        }
      ],
      copyright: [
        {
          text: "Privacy Policy",
          link: "https://policies.google.com/privacy?hl=en-US"
        },
        {
          text: "MIT Licensed | Copyright © 2018-present Vue.js",
          link: ""
        }
      ]
    }
  }
};

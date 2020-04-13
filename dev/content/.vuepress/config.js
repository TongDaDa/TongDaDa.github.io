module.exports = {
  title: "Oliver Liu",
  description: "一个充满理想并付诸于行动中的码农小白，喜欢遨游在计算机世界里，励志于成为一名赚很多钱的程序员",
  theme: require.resolve("../../"),
  summaryLength: 500,
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
    googleAnalytics: "", // Google Analytics tracking ID
    about: {
      fullName: "Oliver",
      bio: "The passionate coding was my pursuit for a long time and I love the open source culture",
      image: "https://s.gravatar.com/avatar/e1f9f7c451d11f5d8bf9508f7a22f36c?size=496&default=retro"
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

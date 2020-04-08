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
      bio: "I am a passionate Software Engineer",
      image: "https://wx3.sinaimg.cn/mw690/006geSualy8fqrbnwnjjij30ro0roae2.jpg"
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

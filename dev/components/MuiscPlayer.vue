<template>
    <div class="p-music" id="float-music">
      <client-only>
        <aplayer
            :autoplay="true"
            :mini="mini"
            showLrc
            :listFolded="true"
            :muted.sync="muted"
            :listMaxHeight="'180px'"
            :volume.sync="volume"
            :music="this.musicList[0]"
            :list="this.musicList"
        />
      </client-only>
    </div>
</template>
  
  <script>
  import aplayer from "vue-aplayer";
  
  export default {
    data() {
      return {
        musicList: [
          {
              title: '虹之间',
              artist: '金贵晟',
              lrc: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/%E8%99%B9%E4%B9%8B%E9%97%B4%20-%20%E9%87%91%E8%B4%B5%E6%99%9F.lrc',
              src: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/%E8%99%B9%E4%B9%8B%E9%97%B4%20-%20%E9%87%91%E8%B4%B5%E6%99%9F.mp3',
              pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Photo_zhaolei.jpg/220px-Photo_zhaolei.jpg'
          },
          {
              title: '少年锦时',
              artist: '赵雷',
              lrc: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/%E5%B0%91%E5%B9%B4%E9%94%A6%E6%97%B6%20-%20%E8%B5%B5%E9%9B%B7.lrc',
              src: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/%E5%B0%91%E5%B9%B4%E9%94%A6%E6%97%B6%20-%20%E8%B5%B5%E9%9B%B7.mp3',
              pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Photo_zhaolei.jpg/220px-Photo_zhaolei.jpg'
          },
          {
              title: '南方姑娘',
              artist: '赵雷',
              lrc: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/%E5%8D%97%E6%96%B9%E5%A7%91%E5%A8%98%20-%20%E8%B5%B5%E9%9B%B7.lrc',
              src: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/%E5%8D%97%E6%96%B9%E5%A7%91%E5%A8%98%20-%20%E8%B5%B5%E9%9B%B7.mp3',
              pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Photo_zhaolei.jpg/220px-Photo_zhaolei.jpg'
          },
          {
              title: '凄美地',
              artist: '郭顶',
              lrc: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/%E5%87%84%E7%BE%8E%E5%9C%B0%20-%20%E9%83%AD%E9%A1%B6.lrc',
              src: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/%E5%87%84%E7%BE%8E%E5%9C%B0%20-%20%E9%83%AD%E9%A1%B6.mp3',
              pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Photo_zhaolei.jpg/220px-Photo_zhaolei.jpg'
          },
          {
              title: "安和桥",
              artist: '宋冬野',
              lrc: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/%E5%AE%89%E5%92%8C%E6%A1%A5%20-%20%E5%AE%8B%E5%86%AC%E9%87%8E.lrc',
              src: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/%E5%AE%89%E5%92%8C%E6%A1%A5%20-%20%E5%AE%8B%E5%86%AC%E9%87%8E.mp3',
              pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Photo_zhaolei.jpg/220px-Photo_zhaolei.jpg'
          },
          {
              title: "Trouble I'm In",
              artist: 'Twinbed',
              lrc: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/Trouble%20I%27m%20In%20-%20Twinbed.lrc',
              src: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/Trouble%20I%27m%20In%20-%20Twinbed.mp3',
              pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Photo_zhaolei.jpg/220px-Photo_zhaolei.jpg'
          },
          {
              title: "Wake",
              artist: 'Hillsong Young',
              lrc: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/Hillsong%20Young%20And%20Free-Wake%28Live%29.lrc',
              src: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/Hillsong%20Young%20And%20Free-Wake%28Live%29.mp3',
              pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Photo_zhaolei.jpg/220px-Photo_zhaolei.jpg'
          },
          {
              title: "Someone You Loved",
              artist: 'Sam Roman&Tom Barnes',
              lrc: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/Emma%20Heesters%26Benjamin%20Kohn%26Lewis%20Capaldi%26Pete%20Kelleher%26Sam%20Roman%26Tom%20Barnes-Someone%20You%20Loved.lrc',
              src: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/Emma%20Heesters%26Benjamin%20Kohn%26Lewis%20Capaldi%26Pete%20Kelleher%26Sam%20Roman%26Tom%20Barnes-Someone%20You%20Loved.mp3',
              pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Photo_zhaolei.jpg/220px-Photo_zhaolei.jpg'
          },
          {
              title: "违背的青春",
              artist: '薛之谦',
              lrc: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/%E8%96%9B%E4%B9%8B%E8%B0%A6-%E8%BF%9D%E8%83%8C%E7%9A%84%E9%9D%92%E6%98%A5.lrc',
              src: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/%E8%96%9B%E4%B9%8B%E8%B0%A6-%E8%BF%9D%E8%83%8C%E7%9A%84%E9%9D%92%E6%98%A5.mp3',
              pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Photo_zhaolei.jpg/220px-Photo_zhaolei.jpg'
          },
          {
              title: "心墙",
              artist: '郭静',
              lrc: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/%E9%83%AD%E9%9D%99-%E5%BF%83%E5%A2%99.lrc',
              src: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/%E9%83%AD%E9%9D%99-%E5%BF%83%E5%A2%99.mp3',
              pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Photo_zhaolei.jpg/220px-Photo_zhaolei.jpg'
          },
          {
              title: "执子之手",
              artist: '宝石Gem',
              lrc: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E7%9F%B3Gem%26%E4%B8%80%E5%93%A9%E5%93%A9%E4%B8%80-%E6%89%A7%E5%AD%90%E4%B9%8B%E6%89%8B.lrc',
              src: 'https://tongingtest.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E7%9F%B3Gem%26%E4%B8%80%E5%93%A9%E5%93%A9%E4%B8%80-%E6%89%A7%E5%AD%90%E4%B9%8B%E6%89%8B.mp3',
              pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Photo_zhaolei.jpg/220px-Photo_zhaolei.jpg'
          },
        ],
        mini: false,
        autoplay: false,
        volume: 0.5,
        muted: false,
      }
    },
    components: { aplayer },
    mounted () {
      const trackPos = () => {
        const homePageEle = document.getElementById("homepage_blogtag");
        if (!homePageEle) {
          return;
        }
        const musicBarEle = document.getElementById("float-music");
        const {width, height, top, left} = homePageEle.getBoundingClientRect();
        if (homePageEle) {
          musicBarEle.style.bottom = `auto`;
          musicBarEle.style.right = `auto`;
          musicBarEle.style.top = `${height + top}px`;
          musicBarEle.style.left = `${left}px`;
          musicBarEle.style.width = `${width}px`;
          musicBarEle.style.position = 'fixed';
          musicBarEle.style.display = "block"
        }
      }
      window.hompageRender = () => {
        trackPos();
        const timeInner = document.querySelectorAll(".aplayer-time-inner");
        if (timeInner[0]) {
          timeInner[0].style.display = "block";
        }
      }
      setTimeout(() => {
        window.addEventListener("scroll", trackPos);
      }, 1000);
      window.moveMusicBar = () => {
          const musicBarEle = document.getElementById("float-music");
          const timeInner = document.querySelectorAll(".aplayer-time-inner");
          if (musicBarEle) {
            if (timeInner[0]) {
              timeInner[0].style.display = "none";
            }
            musicBarEle.style.top = `auto`;
            musicBarEle.style.left = `auto`;
            musicBarEle.style.bottom = `20px`;
            musicBarEle.style.right = `5px`;
            musicBarEle.style.width = `270px`;
            musicBarEle.style.position = 'fixed';
            musicBarEle.style.display = "block"
          }
      }
      const afterRouteListener = (before, after) => {
          if (before.path === "/") {
            setTimeout(() => {
              window.hompageRender();
            }, 1000);
          } else {
            window.moveMusicBar();
          }
        }
        this.$router.afterHooks.push(afterRouteListener);
        afterRouteListener(this.$route);
      }
  };
  </script>
  
  <style lang="stylus">
  .p-music {
    display: none;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 20px;
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2);
  }
  .p-music .aplayer {
    margin: 0;
  }
  .aplayer-volume-bar-wrap {
    display: none !important;
  }
  </style>
  
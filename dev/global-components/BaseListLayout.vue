<template>
  <div
    id="base-list-layout"
    class="zoomIn"
  >
    <header
      class="home-hero"
      :style="{backgroundImage: 'url(' + $withBase($themeConfig.heroImage) + ')'}"
    >
      <div class="p-3 text-center text-light">
        <h1 class="display-3">{{ $site.title }}</h1>
        <p class="font-weight-light h3 text-light">{{ $site.description }}</p>
        <a
          href="#posts"
          class="el-button el-button--primary my-3"
        >Latest Posts</a>
      </div>
    </header>
    <featured-posts class="my-5 d-sm-none d-lg-block"></featured-posts>
    <el-container class="row p-3">
      <aside class="col-sm-12 col-lg-3 py-3 my-2">
        <About />
        <BlogTags :tags="tags" />
      </aside>
      <div
        class="col-sm-12 col-lg-8 mx-auto"
        id="posts"
      >
        <PostsList
          :posts="pages"
          title="Latest Posts"
        />

        <div class="d-flex">
          <component
            v-if="$pagination.length > 1 && paginationComponent"
            :is="paginationComponent"
          ></component>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
/* global THEME_BLOG_PAGINATION_COMPONENT */

import Vue from "vue";
import PostsList from "@theme/components/PostsList.vue";
import About from "@theme/components/About.vue";
import FeaturedPosts from "@theme/components/FeaturedPosts";
import { Pagination, SimplePagination } from '@vuepress/plugin-blog/lib/client/components'
// import { createApi } from 'unsplash-js';

export default {
  components: { PostsList, Pagination, FeaturedPosts, About },
  created () {
    this.paginationComponent = this.getPaginationComponent()
  },
  mounted() {
    // const unsplash = createApi({
    //   accessKey: 'WOJPvx7_24kOgjn16FQy1rz-xV8_5KrhBR5m-yRXzaE',
    //   fetch: fetch,
    // });
    // unsplash.photos.getRandom({
    //   w: 1200,
    //   h: 800,
    //   featured: true,
    //   count: 1
    // }).then(result => {
    //   console.log(result);
    // })
    // fetch("https://unsplash.com/oauth/authorize", {
    //   header: {
    //     client_id: "WOJPvx7_24kOgjn16FQy1rz-xV8_5KrhBR5m-yRXzaE",
    //     response_type: "",
    //     scope: "public read_photos"
    //   }
    // })
    // .then(res => res.json())
    // .then(data => {
    //   return data.token;
    // })
  },
  // data: {
  //   bgImgUrl: ""
  // },

  computed: {
    pages () {
      return this.$pagination.pages;
    },
    tags () {
      return this.$tag.list
    }
  },
  methods: {
    getPaginationComponent () {
      const n = THEME_BLOG_PAGINATION_COMPONENT
      if (n === 'Pagination') {
        return Pagination
      }
      if (n === 'SimplePagination') {
        return SimplePagination
      }
      return Vue.component(n) || Pagination
    },
  }
};
</script>

<style src="prismjs/themes/prism-okaidia.css"></style>


<style>
header.home-hero {
  background-color: #999;
  background-blend-mode: multiply;
  padding: 10rem 0rem;
  background-repeat: none;
  background-size: cover;
}
</style>

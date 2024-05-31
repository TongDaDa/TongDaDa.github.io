<template>
  <section>
    <Header />
    <DefaultGlobalLayout />
    <MusicPlayer />
    <Footer />
  </section>
</template>

<script>
import GlobalLayout from "@app/components/GlobalLayout.vue";
import MusicPlayer from "@theme/components/MuiscPlayer.vue";
import Header from "@theme/components/Header.vue";
import Footer from "@theme/components/Footer.vue";

export default {
  components: {
    DefaultGlobalLayout: GlobalLayout,
    Header,
    MusicPlayer,
    Footer
  },

  data () {
    return {
      isMobileHeaderOpen: false
    };
  },

  mounted () {
    this.$router.afterEach(() => {
      this.isMobileHeaderOpen = false;
    });
  },

};
</script>

<style scoped>
  .homepage {
    min-height: 80vh;
  }
</style>

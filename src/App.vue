<template>
  <div id="app">
    <div class="background">
      <img :src="imgSrc"
        width="100%"
        height="100%"
        alt="" />
    </div>
    <el-container>
      <el-header>
        <vheader />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from "@/layout/HeaderNavMenu.vue";
import http from "@/libs/HttpRequest.js"
export default {
  name: "app",
  data () {
    return {
      imgSrc: require("@/assets/bg.png"),
    };
  },
  components: {
    vheader: Header,
  },
  mounted () {
    Window.Vue = this;
    // http.get("/vocab-word", { "vocab_book_id": "70da8af0244afdbe35e2aab2ff3850b6233c3ebc7c0880e8df2a7e6dfbf33d4a" }).then(response => {
    //   console.log(response.data)
    // })
  }
};
</script>

<style>
body {
  margin: 0 auto;
}
.background {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
}
.el-container {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: 1;
  position: absolute;
}
.el-header {
  text-align: center;
  width: 100%;
  height: 5% !important;
}
.el-main {
  /* background-color: #e9eef3; */
  text-align: center;
  width: 100%;
  height: 80% !important;
}
.el-footer {
  background-color: #1e3056;
  text-align: center;
  width: 100%;
  height: 15% !important;
}
</style>

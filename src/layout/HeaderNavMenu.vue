<template>
  <el-menu
    :default-active="this.$route.path"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="AboutUs">关于我们</el-menu-item>
    <el-menu-item index="HelpCenter">帮助中心</el-menu-item>
    <el-menu-item index="SignIn">登录</el-menu-item>
    <el-menu-item index="SignUp">注册</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push({
			name:keyPath[0]
		})
    },
  },
};
</script>

<style scoped>
.el-menu-demo {
  /* height: 40px; */
  /* border-bottom-color:none!important; */
  background-color: rgba(0, 0, 0, 0);
  float: right;
  /* margin-right: 8.54%; */
}
/* 点击出来的下划线进行隐藏 */
.el-menu-item.is-active {
  border-bottom: none !important;
  color: rgba(0, 0, 0, 0);
}
/* 整体的下划线进行隐藏 */
.el-menu.el-menu--horizontal {
  border-bottom: none;
}

/* 点击出来的下划线动效残留进行隐藏 */
.el-menu--horizontal > .el-menu-item {
  border-bottom: none;
}
/* 点击以后的背景色进行隐藏 */
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: rgba(0, 0, 0, 0);
}
</style>

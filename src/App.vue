<template>
  <div id="app">
    <el-container style="width:100%;height:100%">
      <el-header>
        <!-- 顶部 -->
        <Header-top></Header-top>
      </el-header>
      <el-container class="content">
          <div class="el-aside">
            <!-- 左侧 -->
            <Aside-left></Aside-left>
          </div>
          <el-main>
              <menu-top class="menu-top"></menu-top>
              <div class="content-view">
                <router-view/>
              </div>   
              <div class="version">Copyright © 杭州三汇数字信息技术有限公司 @production=<span>{{version}}</span></div>           
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {addControl} from 'api/js/control'
import HeaderTop from 'components/HeaderTop'
import AsideLeft from 'components/AsideLeft'
import menuTop from 'components/menuTop'
export default {
  name: "App",
  data(){
    return {
      version:'0.0.0'
    }
  },
  created() {
  
  },
  mounted(){
    this.version = window.gloabl.version;
  },
  components:{HeaderTop,AsideLeft,menuTop}
  
}
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
.el-header
  background: rgb(40,52,70) !important;   
  color:#fff 
.content
  height calc(100% - 60px) 
.el-aside
  float left
  height 100%
.el-main
  background-color #fff
  height 100%
  padding 0 !important
.menu-top
  width 100%
  height 30px
  box-shadow 0 5px 10px #ddd;
.content-view
  padding 10px
  box-sizing border-box 
  height calc(100% - 50px)
.version
  height 20px
  line-height 20px
  text-align center
  box-shadow 10px 5px 10px #ddd;

</style>

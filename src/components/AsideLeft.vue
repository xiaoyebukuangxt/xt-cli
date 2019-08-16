<template>
  <div class="nav">
    <div class="fold cursor" @click="isCollapse = !isCollapse">
        <i class="el-icon-arrow-left"  v-if="!isCollapse"></i>
        <i class="el-icon-arrow-right" v-if="isCollapse"></i>
    </div>
    <div class="menu-box" style="">
        <el-menu style="" router class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-submenu v-for="(menu,num) in menuList" :key="num"  :index="''+num" :class="{sub_active:isActiveSub(menu)}">
              <template slot="title" ><i class="fa nav-icon" :class="menu.icon"></i><span slot="title">{{menu.menuName}}</span></template>
              <el-menu-item :index="item.url" v-for="(item,i) in menu.children" :key="i" :class="{router_active:isActive(item)}">
                  <span slot="title">{{item.menuName}}</span>
              </el-menu-item>						
          </el-submenu>
        </el-menu>
    </div>
    
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menuList: []
    };
  },
  mounted() {
    this.setMenu();
  },
  computed: {},
  methods: {
    //控制当前子菜单样式
    isActive(item) {
      // 获取当前路由
      return item.url == this.$route.path.slice(1);
    },
    //控制当前父菜单样式
    isActiveSub(item) {
      let flag = false;
      item.children.forEach(element => {
        if(element.url == this.$route.path.slice(1)){
          flag = true;
        }
      });
     return flag;
    },
    setMenu(id) {
      let person = {
        menuName: "菜单一",
        icon: "fa-user-o",
        children: [
          { menuName: "菜单2", url: "menu1" },
          { menuName: "菜单3", url: "menu2" },
          { menuName: "菜单4", url: "menu3" }
        ]
      };    
      this.menuList = [
        person,
      ];
    },
  },
  components: {},
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.nav {
  font-size: 16px;
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  text-align: left;
  overflow: hidden;

  .fold {
    position: absolute;
    bottom: 0;
    z-index: 999;
    width: 100%;
    height: 25px;
    background: rgb(40, 52, 70);
    color: #fff;
    text-align: center;
    line-height: 25px;

    i {
      font-size: 18px;
    }
  }

  .menu-box {
    height: calc(100% - 25px);
    overflow-y: auto;
    overflow-x: hidden;
    background: #001529 !important;  
  }

  .menu-box::-webkit-scrollbar {
    width: 0px !important;
    height: 0px !important;
  }

  .nav-icon {
    margin-right: 10px;
    font-size: 16px;
  }
}

// 菜单展开的宽度
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 260px;
}
</style>

<template>
  <div class="nav-top">
        <div class="all">
            <div class="move-left left" :class="[diabledLeft ? 'not-allow-click':'cursor']" v-if="isShowBtn">
                <i class="el-icon-caret-left" title="左移" @click="leftMove"></i>
            </div>

            <div class="nav-router left" ref="routeBox">
                <ul :style="{'left':leftVal+'px'}" ref="allRoute">
                    <li v-for="(item,index) in topMenu" :key="index" :ref="'li'+index" :class="{active:isActive(item)}">
                        <span class="route-name">
                            <router-link :to="{path:item.router,query:item.query}"  >{{item.name}}</router-link>
                            <i class="el-icon-close close-route cursor" @click="closeMenu(item)"></i>
                        </span>
                    </li>
                </ul>
            </div>

            <div class="move-left left" :class="[diabledRight ? 'not-allow-click':'cursor']" v-if="isShowBtn">
                <i class="el-icon-caret-right" title="右移" @click="rightMove"></i>
            </div>
        </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menuList: [],
      leftVal: 0,
      routeList: [],
      diabledLeft:true,
      diabledRight:true,
      isShowBtn:false
    };
  },
  mounted() {
    //关闭顶部路由链接
    this.$eventBus.$on('closeMenu',(content) => {
        var index =  this.routeList.findIndex(y => {
            return y.name == content;
        })
        this.routeList.splice(index,1);
    })
    // 例如
    // setTimeout(() => {
    //     //顶部路由会根据当前url路由增加，必须保证路由跳转完成，在删除,（如果你删除了当前路由但是url还是在这个路由下，便又会增加）
    //     this.$eventBus.$emit("closeMenu", "新增请销假");
    //   }, 200);
  },
  computed: {
    topMenu() {
      // 获取当前路由 和 名称
      let nowRoute = this.$route.path.slice(1);
      let routeName = this.$route.meta ? this.$route.meta.name : null;
      let query = this.$route.query;
      if (routeName) {
        let menuObj = { name: routeName, router: nowRoute, query: query };
        let flag = false;
        for (var i = 0; i < this.routeList.length; i++) {
          if (this.routeList[i].name == routeName) {
            flag = true;
            break;
          }
        }
        if (!flag) this.routeList.unshift(menuObj);
      }
      return this.routeList;
    },
  },
  methods: {
    isActive(item) {
      return item.router === this.$route.path.slice(1);
    },
    leftMove() {
      if(!this.diabledLeft){
        this.leftVal += 100;
      }
      // return;
      // let boxLength = this.$refs.routeBox.offsetWidth;
      // let allRoute = 0;
      // this.routeList.forEach((item, index) => {
      //   let ref = "li" + index;
      //   allRoute += this.$refs[ref][0].offsetWidth;
      // });
      // //1、如果路由总宽度没有box大，则不移动 2、路由已经移动到看到第一个了，则不移动
      // if (boxLength >= allRoute || this.leftVal >= 0) {
      //   this.leftVal = 0;
      //   return;
      // }
      // this.leftVal += 100;
    },
    rightMove() {
      if(!this.diabledRight){
        this.leftVal -= 100;
      }
      // return;
      // let boxLength = this.$refs.routeBox.offsetWidth;
      // let allRoute = 0;
      // this.routeList.forEach((item, index) => {
      //   let ref = "li" + index;
      //   allRoute += this.$refs[ref][0].offsetWidth;
      // });
      // //1、如果路由总宽度没有box大，则不移动
      // if (boxLength >= allRoute) {
      //   this.leftVal = 0;
      //   return;
      // }
      // //2、如果路由已经移动到看到最后一个了，则不移动
      // if (-this.leftVal + boxLength >= allRoute) {
      //   return;
      // }
      // this.leftVal -= 100;
    },
    closeMenu(item) {
      if (this.routeList.length == 1) return;
      this.routeList.forEach((value, index) => {
        if (item.name == value.name) {
          //删除的菜单是当前路由 先跳转到别的路由 再删除
          if (item.router == this.$route.path.slice(1)) {
            var i = index ? index - 1 : index + 1;
            this.$router.push({ path: this.routeList[i].router });
          }
          this.routeList.splice(index, 1);
        }
      });
    }
  },
  components: {},
  watch:{
    routeList:function(newVal,oldVal){
      if(newVal.length > 0){
        this.$nextTick(() => {
          let boxLength = this.$refs.routeBox.offsetWidth;
          let allRoute = 0;
          this.routeList.forEach((item, index) => {
            let ref = "li" + index;
            allRoute += this.$refs[ref][0].offsetWidth;                 
          });

          if(boxLength < allRoute){ //控制按钮是否显示
            this.isShowBtn = true;
          }else{
            this.isShowBtn = false;
            this.leftVal = 0;
          }

          if(boxLength >= allRoute || this.leftVal >= 0){
            this.diabledLeft = true; //控制左侧按钮
          }else{
            this.diabledLeft = false;
          }
         
          if (boxLength >= allRoute || (-this.leftVal + boxLength >= allRoute)) {
            this.diabledRight = true; //控制
          }else{
            this.diabledRight = false;
          }
        })
      }
    },
    leftVal:function(newVal,oldVal){
        this.$nextTick(() => {
          let boxLength = this.$refs.routeBox.offsetWidth;
          let allRoute = 0;
          this.routeList.forEach((item, index) => {
            let ref = "li" + index;
            allRoute += this.$refs[ref][0].offsetWidth;                 
          });

          if(boxLength >= allRoute || this.leftVal >= 0){
            this.diabledLeft = true; //控制左侧按钮
          }else{
            this.diabledLeft = false;
          }

          
          if (boxLength >= allRoute || (-this.leftVal + boxLength >= allRoute)) {
            this.diabledRight = true; //控制
          }else{
            this.diabledRight = false;
          }

        })     
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.all {
    width: 100%;
    height: 30px;
    background: #d8e9fe;

    .move-left {
        width: 30px;
        color: #409EFF;
        line-height: 30px;
        height: 30px;
        text-align: center;
        font-size: 22px;
    }

    .nav-router {
        width: calc(100% - 60px);
        height: 100%;
        position: relative;
        overflow: hidden;

        ul {
            width: 5000px;
            height: 100%;
            position: absolute;
            left: 0;

            li {
                padding: 0px 4px;
                margin-top: 3px;
                float: left;

                .route-name {
                    display: block;
                    padding: 0 10px;
                    height: 22px;
                    margin-right: 0px;
                    line-height: 22px;
                    border-radius: 4px;
                    // border: 1px solid #ccc;

                    a {
                        color: #333;
                    }

                    .close-route {
                        color: #999;
                        margin-left: 5px;

                        &:hover {
                            color: red !important;
                        }
                    }
                }
            }
        }
    }
}

// 当前路由
.active {
    .route-name {
        background: #409EFF;

        a {
            color: #fff !important;
        }

        .close-route {
            color: #fff !important;
        }
    }
}

.not-allow-click {
    cursor: not-allowed;
}
</style>

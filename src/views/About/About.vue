<template>
  <div class="about">
    host {{this.$route.fullPath}}
  </div>
  
</template>


<script>
import Table from 'views/common/Table'
export default {
  data() {
    return {
      
    };
  },
  mounted(){
  },
  components:{
    Table
  }
};
</script>


<style scoped lang="stylus">
h1 {
  color: red;
}
</style>
<template>
  <div class="table">
      <el-table
      :data="tableData"
      border
      style="width: 100%">
        <span v-for="(item,index) in dataArr" :key="index">
            <el-table-column 
            :label="item.name"
            :fixed="item.fixed"          
            align="center">
                <template slot-scope="scope" >
                    <div class="ellipsis" v-if="!item.type" v-text="scope.row[item.code]" :title="scope.row[item.code]"></div> 
                    <slot :name="item.type" v-if="item.type" :text="scope.row[item.code]"></slot>
                </template>
            </el-table-column>
        </span> 
    </el-table>

   
</div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    dataArr: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="stylus">
h1 {
  color: red;
}
</style>
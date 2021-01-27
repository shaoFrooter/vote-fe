<template>
  <el-table
    :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%" v-loading="loading">
    <el-table-column
      label="标题"
      prop="title">
    </el-table-column>
    <el-table-column
      label="类型"
      prop="voteType" :formatter="typeFormat">
    </el-table-column>
    <el-table-column
      label="开始时间"
      prop="startTime">
    </el-table-column>
    <el-table-column
      label="结束时间"
      prop="endTime">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row.id)" v-bind:disabled="scope.row.started===true">编辑</el-button>
        <el-button
          size="mini"
          @click="handleDelete( scope.row.id)">删除</el-button>
        <el-button
          size="mini"
          @click="handleView(scope.row.id)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        pageNo:1,
        pageSize:100,
        tableData: [],
        search: '',
        loading:true
      }
    },
    activated(){
      this.pageNo=1;
      this.pageSize=10;
      this.myList(this.pageNo,this.pageSize);
    },
    methods: {
      myList(pageNo,pageSize){
        this.$axios.get('/vote/myVoteList',{
          params:{
            pageNo:pageNo,
            pageSize:pageSize
          }
        }).then(response=>{
          let code=response.data.code;
          if(code===200) {
            let data1=response.data.data;
            if(data1==null){
              this.tableData = [];
              this.loading=false;
            }else {
              let data = data1.data;
              if (data == null) {
                // this.tableData = [];
                this.loading = false;
              } else {
                this.tableData = data;
                this.loading = false;
              }
            }
          }
        })
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(id) {
        this.$confirm('此操作将会永久删除数据，是否继续','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(()=>{
          let params={id:id};
          this.$axios.post('/vote/deleteByVoteId',params).then(response=>{
            let code=response.data.code;
            if(code===200){
              this.$message({
                message:'删除成功',
                type:'success'
              });
              this.pageNo=1;
              this.pageSize=10;
              this.myList(this.pageNo,this.pageSize);
            }else{
              this.$message({
                message:response.data.message,
                type:'warning'
              });
            }
          });
        });

      },
      handleView(id){
        this.$router.push({name:'voteDetail',query:{id:id}});
      },
      handleEdit(id){
        this.$router.push({name:'voteUpdate',query:{id:id}});
      },
      typeFormat(row){
        if(row.voteType===1){
          return '单选';
        }
        return '多选';
      }
    },
  }
</script>

<style scoped>

</style>

<template>
  <el-table
    :data="tableData"
    style="width: 100%" v-loading="loading" height="600px" v-el-table-infinite-scroll="loadMoreData">
    <el-table-column type="expand" >
      <template v-slot="props">
          <el-radio-group v-model="props.row.radioSelect" v-if="props.row.voteType===1">
            <el-radio v-for="item in props.row.voteOptions" :key="item.id" :label="item.id" v-bind:disabled="props.row.voted" style="display:block;margin-top:15px">{{item.optionName}}</el-radio>
          </el-radio-group>
        <el-checkbox-group v-model="props.row.checkArray" v-else-if="props.row.voteType===2">
          <el-checkbox v-for="item in props.row.voteOptions" :key="item.id" :label="item.id" v-bind:disabled="props.row.voted" style="display:block;margin-top:15px">{{item.optionName}}</el-checkbox>
        </el-checkbox-group>
        <el-button style="display:block;margin-top: 15px" v-bind:disabled="props.row.voted" v-if="props.row.voted==true" >已投票</el-button>
        <el-button @click="voteSubmit(props.$index,props.row.id,props.row.voteType==1?props.row.radioSelect:props.row.checkArray,props.row.voteType)" style="display:block;margin-top: 15px" v-bind:disabled="props.row.voted" v-else-if="props.row.voted==false">投票</el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="id"
      prop="id">
    </el-table-column>
    <el-table-column
      label="标题"
      prop="title">
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
      label="详情"
      prop="id">
      <template v-slot="scope">
        <el-button @click="detailView(scope.row.id)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
<script>
  import elTableInfiniteScroll from 'el-table-infinite-scroll';
  export default {
    directives: {
      'el-table-infinite-scroll': elTableInfiniteScroll
    },
    name:'VoteList',
    data() {
      return {
        total:0,
        search:'',
        loading:true,
        count:0,
        tableData: [],
        pageNo:1,
        pageSize:10
      };
    },
    activated(){
      this.pageNo=1;
      this.pageSize=10;
      this.tableData=[];
      this.voteList(this.pageNo,this.pageSize);
    },
    methods: {
      loadMoreData(){
        if(this.pageNo*this.pageSize<this.total) {
          this.pageNo++;
          this.voteList(this.pageNo, this.pageSize);
        }
      },
      voteList(pageNo,pageSize){
        this.$axios.get('/vote/voteList',{
          params:{
            pageNo:pageNo,
            pageSize:pageSize
          }
        }).then(response=>{
          let code=response.data.code;
          if(code===200){
            let data1=response.data.data;
            this.total=data1.total;
            if(data1==null){
              // this.tableData=[];
              this.loading=false;
              return;
            }
            let data=data1.data;
            if(data===null){
              // this.tableData=[];
            }else{
              this.tableData=this.tableData.concat(data);
            }
            this.loading=false;
          }
        })
      },
      voteSubmit(index,voteId,voteOption,voteType){
        let voteOptionData;
        if(voteType==1){
          voteOptionData=[voteOption]
        }else{
          voteOptionData=voteOption
        }
        let paramData={
          options:voteOptionData,
          voteId:voteId,
          voteType:voteType
        }
        this.$axios.post('/vote/addVote',paramData).then(response=> {
          this.tableData[index].voted=true;
          let code=response.data.code;
          if(code==200){
            this.$message({
              message:'投票成功',
              type:'success'
            });
          }else{
            this.tableData[index].voted=false;
            let msg=response.data.message;
            this.$message({
              message:msg,
              type:'warning'
            });
          }
        })
      },
      detailView(id){
        this.$router.push({name:'voteDetail',query:{id:id}});
      }
    }
  };
</script>

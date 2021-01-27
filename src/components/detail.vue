<template>
<el-form ref="form" :model="form" label-width="200px" v-loading="loading">
  <el-form-item label="标题">
    <span>{{form.title}}</span>
  </el-form-item>
  <el-form-item label="选票类型">
    <!--<span>{{form.voteType===1?'单选票':'多选票'}}</span>-->
    <span v-if="form.voteType===1">单选票</span>
    <span v-else-if="form.voteType===2">多选票</span>
  </el-form-item>
  <el-form-item label="开始时间">
    <span>{{form.startTime}}</span>
  </el-form-item>
  <el-form-item label="结束时间">
    <span>{{form.endTime}}</span>
  </el-form-item>
  <el-form-item v-for="item in form.voteOptions" :key="item.id" :label="item.optionName">{{item.votes}} 票</el-form-item>
</el-form>
</template>
<script>
  export default {
    data() {
      return {
        loading:true,
        voteId:0,
        form: {
        }
      }
    },
    activated:function(){
      this.getDetail();
    },
    methods: {
      getDetail(){
        let paramId=this.$route.query.id;
        this.voteId=paramId;
        this.$axios.get('/vote/detail',{
          params:{
            id:this.voteId
          }
        }).then(response=>{
          this.form=response.data.data;
          this.loading=false;
        })
      }
    }
  }
</script>

<template>
  <el-form ref="form" :model="form" label-width="80px" :rules="voteCreateRule" class="create-vote-class">
    <el-form-item label="标题" prop="title" class="create-vote-form-item-title-class">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="投票时间" prop="voteTime" class="create-vote-time-item-class">
      <el-date-picker
        v-model="form.voteTime"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        align="center">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="选票类型" prop="voteType" class="create-vote-voteType-form-item-class">
      <el-radio-group v-model="form.voteType">
        <el-radio label="1">单选</el-radio>
        <el-radio label="2">多选</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="选项" prop="optionNames" v-for="(item,index) in form.optionNames" :key="item.key" :prop="'optionNames.'+index+'.optionName'" :rules="voteCreateRule.optionName" class="create-vote-form-item-class">
      <el-col :span="8"><el-input v-model="item.optionName"></el-input></el-col>
      <el-col :span="3"><el-button @click.prevent="removeEnvironmentForm(item)"  size="mini" circle>删除</el-button></el-col>
    </el-form-item>
    <el-form-item class="create-vote-form-item-class">
      <el-button type="primary" @click="addEnvironmentForm">增加选项</el-button>
      <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
      <el-button type="primary" @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<style>
  .create-vote-class{
    margin: 0 auto;
    width: 800px;
  }
  .create-vote-form-item-class{
    width: 600px;
    text-align: center;
  }
  .create-vote-form-item-title-class{
    width: 480px;
  }
  .create-vote-time-item-class{
    width: 400px;
  }
  .create-vote-voteType-form-item-class{
    width: 450px;
  }
</style>

<script>
  export default {
    name: 'VoteCreate',
    data() {
      return {
        voteTime: [],
        voteCreateRule:{
          title:[{ required: true, message: '请输入标题', trigger: 'blur' }],
          voteType:[{ required: true, message: '请输入选票类型', trigger: 'blur' }],
          voteTime:[{ required: true, message: '请输入投票时间', trigger: 'blur' }],
          optionName:[{ required: true, message: '请输入投票选项', trigger: 'blur' }],
        },
        form: {
          title: '',
          voteType:0,
          startTime: 0,
          endTime: 0,
          voteTime:[],
          optionNames: [
            {
              key: 0,
              optionName: ''
            }
          ]
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: '',
        rules1: [{required: true, message: '请输入选项名称', trigger: 'blur'}]
      }
    },
    activated(){
      this.form.optionNames=[{
        key: 0,
        optionName: ''
      }];
      this.resetForm('form');
    },
    methods: {
      resetForm(formName){
        // this.form.optionNames=[];
        this.$refs[formName].resetFields();
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid){
            let startString = this.form.voteTime[0].toString();
            let endString = this.form.voteTime[1].toString();
            this.form.startTime = new Date(startString).getTime();
            this.form.endTime = new Date(endString).getTime();
            this.$axios.post('/vote/createVote', this.form).then(response => {
              let code=response.data.code;
              let voteId=response.data.data;
              if(code===200){
                this.$message({
                  message:'创建投票成功',
                  type:'success'
                });
                this.$router.push({name:'voteDetail',query:{id:voteId}});
                this.resetForm(formName);
              }else{
                this.$message({
                  message:'创建失败',
                  type:'warning'
                });
              }

            });
          }
        });
      },
      addEnvironmentForm() {
        this.form.optionNames.push({optionName: null, key: new Date().getTime()});
      },
      removeEnvironmentForm(item) {
        let index = this.form.optionNames.indexOf(item);
        if (index !== -1) {
          this.form.optionNames.splice(index, 1);
        }
      }
    }
  }
</script>
<style scoped>

</style>

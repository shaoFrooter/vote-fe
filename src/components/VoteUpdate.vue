<template>
  <el-form ref="form" :model="form" label-width="80px" :rules="voteCreateRule">
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="投票时间" prop="voteTime">
      <el-date-picker
        v-model="form.voteTime"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        align="right">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="选票类型" prop="voteType">
      <el-radio-group v-model="form.voteType">
        <el-radio label="1">单选</el-radio>
        <el-radio label="2">多选</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="选项" prop="optionNames" v-for="(item,index) in form.optionNames" :key="item.id" :prop="'optionNames.'+index+'.optionName'" :rules="voteCreateRule.optionName">
      <el-col :span="5"><el-input v-model="item.optionName"></el-input></el-col>
      <el-col :span="2"><el-button @click.prevent="removeEnvironmentForm(item)"  size="mini" circle>删除</el-button></el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addEnvironmentForm">增加选项</el-button>
      <el-button type="primary" @click="onSubmit('form')">更新</el-button>
    </el-form-item>
  </el-form>
</template>

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
          id:0,
          title: '',
          voteType:'1',
          startTime: 0,
          endTime: 0,
          voteTime:[],
          optionNames: [
            {
              id: 0,
              voteId:0,
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
      this.getDetail();
    },
    methods: {
      getDetail(){
        let paramId=this.$route.query.id;
        this.$axios.get('/vote/detail',{
          params:{
            id:paramId
          }
        }).then(response=>{
          let responseData=response.data.data;
          if(responseData==null) {
          }else{
            this.form.id=responseData.id;
            let startTime=responseData.startTime;
            let endTime=responseData.endTime;
            let timeArray=[new Date(startTime),new Date(endTime)];
            this.form.voteTime=timeArray;
            this.form.title=responseData.title;
            this.form.voteType=responseData.voteType.toString();
            this.form.optionNames=responseData.voteOptions;
          }
        })
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid) {
            this.$confirm('此操作将会永久更新数据，是否继续', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              let startString = this.form.voteTime[0].toString();
              let endString = this.form.voteTime[1].toString();
              this.form.startTime = new Date(startString).getTime();
              this.form.endTime = new Date(endString).getTime();
              this.$axios.post('/vote/updateVote', this.form).then(response => {
                let code = response.data.code;
                let voteId = response.data.data;
                if (code === 200) {
                  this.$message({
                    message: '更新成功',
                    type: 'success'
                  });
                  this.$router.push({name: 'voteDetail', query: {id: voteId}});
                  this.resetForm(formName);
                } else {
                  this.$message({
                    message: '更新失败',
                    type: 'warning'
                  });
                }

              });
            });
          }
        });
      },
      addEnvironmentForm() {
        this.form.optionNames.push({optionName: null, id: new Date().getTime(),voteId:this.form.id});
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

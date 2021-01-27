<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item class="login-el-form-item">
      <span class="vote-title-class">登  录</span>
    </el-form-item>
    <el-form-item label="用户名" prop="username" class="login-el-form-item">
      <el-input v-model="ruleForm.username" placeholder="请输入用户名或邮箱"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="passwd" class="login-el-form-item">
      <el-input v-model="ruleForm.passwd" type="password"></el-input>
    </el-form-item>
    <el-form-item class="login-el-form-item">
      还没有账号？<el-link type="primary" href="/#/register" style="margin-right: 30px" >注册</el-link>
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<style>
  .demo-ruleForm{
    margin: 0 auto;
    width: 500px;
  }
  .login-el-form-item{
    width: 400px;
    text-align: center;
  }
  .vote-title-class{
    font-size: 20px;
    font-weight: bold;
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    text-align: center;
    color: #2c3e50;
  }
</style>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          username: '',
          passwd: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          passwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/vote/login',this.ruleForm).then(response=> {
              let code=response.data.code;
              if(code===200){
                this.$axios.get('/vote/userInfo').then(res=>{
                  let code=res.data.code;
                  let data=res.data.data;
                  if(code==200) {
                    this.$message({
                      message:'登录成功',
                      type:'success'
                    });
                    this.$store.commit('setUserData',data);
                    this.$router.push({name: 'voteList'});
                  }
                });
              }else{
                this.$message({
                  message:response.data.message,
                  type:'warning'
                });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>


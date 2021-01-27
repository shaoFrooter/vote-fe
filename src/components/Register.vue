<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="register-ruleForm">
    <el-form-item class="register-el-form-item">
      <span class="register-title">注 册</span>
    </el-form-item>
    <el-form-item label="用户名" prop="username" class="register-el-form-item">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email" class="register-el-form-item">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="passwd" class="register-el-form-item">
      <el-input v-model="ruleForm.passwd" type="password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="passwdCheck" class="register-el-form-item">
      <el-input v-model="ruleForm.passwdCheck" type="password"></el-input>
    </el-form-item>
    <el-form-item class="register-el-form-item">
      已有账号？<el-link type="primary" href="/#/login" style="margin-right: 30px">登录</el-link>
      <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<style>
  .register-ruleForm{
    margin: 0 auto;
    width: 500px;
  }
  .register-el-form-item{
    width: 400px;
    text-align: center;
  }
  .register-title{
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
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.passwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          email: '',
          fileList: [],
          passwd: '',
          passwdCheck: '',
        },
        rules: {
          username: [
            { required: true, message: '请填写用户名', trigger: 'blur' },
            { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'},
            {pattern: /[0-9a-zA-Z]{1,6}/, message: '只可以输入数字和字母',trigger: 'blur'}
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
          ],
          passwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
          ],
          passwdCheck: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' },
            {
              validator:validatePass2,trigger:'blur'
            }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/vote/register',this.ruleForm).then(response=> {
              let data=response.data;
              let dataCode=data.code;
              if(dataCode===200){
                this.$message({
                  message:'注册成功',
                  type:'success'
                });
                this.$router.push({name:'login'})
              }else{
                this.$message({
                  message:data.message,
                  type:'warning'
                });
              }
            })
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

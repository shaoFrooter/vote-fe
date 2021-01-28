<template>
  <el-container>
    <el-header>
      <span>{{username}}</span>
      <el-button @click="logout">登出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1', '3']" router :default-active="this.$route.path">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>投票</template>
            <el-menu-item-group>
              <el-menu-item index="/avi/vote/voteList" >当前投票</el-menu-item>
              <el-menu-item index="/avi/vote/create" >创建投票</el-menu-item>
              <el-menu-item index="/avi/vote/myList" >我创建的投票</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <AppMain></AppMain>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import AppMain from '@/components/AppMain'
    export default {
      components: {AppMain},
      name: "layout",
      data() {
        return {
          username: ''
        }
      },
      mounted() {
        this.username = JSON.parse(localStorage.getItem('userData')).nickName;
      },
      methods:{
        logout(){
          this.$axios.post('/vote/logout').then(response=>{
            let code=response.data.code;
            if(code===200){
              //删除localStorage
              this.$store.commit('clearUserData');
              this.$message({
                message:'退出成功',
                type:'success'
              });
              this.$router.push({name:'login'});
            }
          });
        }
      }
    }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: right;
    line-height: 60px;
  }
</style>

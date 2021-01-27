<template>

  <el-container>
    <el-header>
      <span>{{username}}</span>
      <el-button @click="logout">登出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1', '3']" router="true" :default-active="this.$route.path">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>投票</template>
            <el-menu-item-group>
              <el-menu-item index="/vote/voteList" v-on:click="voteList">当前投票</el-menu-item>
              <el-menu-item index="1-2" v-on:click="createVote">创建投票</el-menu-item>
              <el-menu-item index="1-2" v-on:click="myVoteList">我创建的投票</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <VoteList v-if="mainType===1"></VoteList>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import VoteList from '@/components/voteList'
  export default {
    name: "VoteMain",
    components:{VoteList},
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        username:'',
        mainType:1
        // tableData: Array(20).fill(item)
      }
    },
    mounted(){
      //获取当前登录用户名
      this.username=JSON.parse(localStorage.getItem('userData')).nickName;
    },
    methods:{
      voteList(){
        this.mainType=1;
        // this.$router.push({name:'voteList'});
      },
      createVote(){
        this.mainType=2;
        alert('创建投票');
      },
      myVoteList(){
        this.mainType=3;
        alert('我创建的投票');
      },
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
  };
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: right;
    line-height: 60px;
  }

  /*.el-aside {*/
    /*background-color: #D3DCE6;*/
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height: 200px;*/
  /*}*/

  /*.el-main {*/
    /*background-color: #E9EEF3;*/
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height: 160px;*/
  /*}*/

  /*body > .el-container {*/
    /*margin-bottom: 40px;*/
  /*}*/

  /*.el-container:nth-child(5) .el-aside,*/
  /*.el-container:nth-child(6) .el-aside {*/
    /*line-height: 260px;*/
  /*}*/

  /*.el-container:nth-child(7) .el-aside {*/
    /*line-height: 320px;*/
  /*}*/
</style>

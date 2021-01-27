import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import VoteList from '@/components/voteList'
import VoteCreate from '@/components/VoteCreate'
import MyVoteList from '@/components/MyVoteList'
import VoteDetail from '@/components/detail'
import VoteUpdate from '@/components/VoteUpdate'
import Layout from '@/components/layout'
import AppMain from "@/components/AppMain"

Vue.use(Router)

const router=new Router({
  mode:'history',
  routes: [
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'/avi',
      name:'avi',
      component:Layout,
      children:[
        {
          path:'/avi/vote',
          name:'vote',
          component: AppMain,
          children: [
            {
              path:'/avi/vote/voteList',
              name:'voteList',
              component:VoteList
            },
            {
              path:'/avi/vote/create',
              name:'voteCreate',
              component:VoteCreate
            },
            {
              path:'/avi/vote/update',
              name:'voteUpdate',
              component:VoteUpdate
            },
            {
              path:'/avi/vote/myList',
              name:'myVoteList',
              component:MyVoteList
            },
            {
              path:'/avi/vote/detail',
              name:'voteDetail',
              component:VoteDetail
            }
          ]
        }
      ]
    }
  ]
});
router.beforeEach((to,from,next)=>{
  let toPath=to.path;
  //登录注册不做处理
  if(toPath==='/login'||toPath==='/register'){
    next();
  }else{
    let userData=JSON.parse(localStorage.getItem('userData'));
    if(userData===null||userData===''){
      next('/login');
    }else{
      next();
    }
  }
});
export default router;

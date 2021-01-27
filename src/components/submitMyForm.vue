<template>
  <!--<div id='app2'>-->
    <!--<span v-bind:title="message">-->
      <!--鼠标悬停几秒钟查看此处动态绑定的提示信息！-->
    <!--</span>-->
  <!--</div>-->
  <!--<div id='app-3'>-->
    <!--<p v-if="seen">我看到你了</p>-->
  <!--</div>-->
  <!--<div id="app-4">-->
    <!--<ol>-->
      <!--<li v-for="todo in todos">-->
        <!--{{todo.name}}-->
      <!--</li>-->
    <!--</ol>-->
  <!--</div>-->
  <!--<div id="'app-5">-->
    <!--<p>{{message}}</p>-->
    <!--<button v-on:click="reverseMessage">反转消息</button>-->
  <!--</div>-->
  <!--<div>-->
    <!--<p>{{message}}</p>-->
    <!--<input v-model="message"></input>-->
  <!--</div>-->
  <div>
    <!--<p>{{message1}}</p>-->
    <!--<li v-for="n in evenNumbers">{{ n }}</li>-->
    <!--<button v-on:click="count1+=1">ADD ONE</button>-->
    <!--<p>the button above clicked {{count1}} times</p>-->
    <!--<button v-on:click="greet">Greet</button>-->
    <!--绑定输入信息并显示-->
    <input v-model="inputMessage" placeholder="edit me">
    <p>Message is: {{ inputMessage }}</p>
    <br/>
    <!--复选框，bool值-->
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
    <br/>
    <!--复选框多选-->
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames">
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
    <label for="mike">Mike</label>
    <br>
    <span>Checked names: {{ checkedNames }}</span>
    <button v-on:click="checkBoxFunc">checkBoxFunc</button>
    <br/>
    <!--单选按钮-->
    <input type="radio" id="one" value="One" v-model="picked">
    <label for="one">One</label>
    <br>
    <input type="radio" id="two" value="Two" v-model="picked">
    <label for="two">Two</label>
    <br>
    <span>Picked: {{ picked }}</span>
    <br/>
    <!--选择框-->
    <div id="example-5">
      <select v-model="selected">
        <option disabled value="">请选择</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <span>Selected: {{ selected }}</span>
    </div>
    <br/>
    <!--选择框多选-->
    <div id="example-6">
      <select v-model="selectedMulti" multiple style="width: 50px;">
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <br>
      <span>Selected: {{ selectedMulti }}</span>
    </div>
    <!--动态选项-->
    <div id="example-7">
    <select v-model="selected">
      <option v-for="option in options" v-bind:value="option.value">
        {{ option.text }}
      </option>
    </select>
    <span>Selected: {{ selected }}</span>
    </div>
    <br>
    <!--输入数字-->
    <div id="example-8">
      <input v-model.number="age" type="number"/>
    </div>
    <!--<div>-->
      <!--<blog-post v-for="post in posts" v-bind:key="post.id" v-bind:title="post.title"></blog-post>-->
    <!--</div>-->
    <!--局部组件-->
    <!--<div>-->
      <!--<compoent-a title="局部组件" v-for="post in posts" v-bind:key="post.id" v-bind:title="post.title"></compoent-a>-->
    <!--</div>-->
    <div>
      <base-checkbox v-model="lovingVue">
      </base-checkbox>
    </div>
  </div>
</template>

<script>
  var compoentA={props: ['title'],
    template: '<h3>{{ title }}</h3>'}
  export default {
    data () {
      // return {
      //   message: 'welcome to my second vue'+new Date().toLocaleDateString()
      // }
      // return {
      //   seen: true
      // }
      // return {
      //   todos: [
      //     {text:'text1',name:'name1'},
      //     {text:'text2',name:'name2'},
      //     {text:'text3',name:'name3'}
      //   ]
      // }
      // return {
      //   message: 'hello shaof'
      // }
      return {
        numbers: [1, 2, 3, 4, 5],
        message1: 6789,
        count1: 1,
        inputMessage: '',
        checkedNames:[],
        picked:'',
        selected:'',
        selectedMulti:[],
        options:[
          {text:'one',value:'A'},
          {text:'two',value:'B'},
          {text:'three',value:'C'},
        ],
        age:10,
        posts: [
          { id: 1, title: 'My journey and you' },
          { id: 2, title: 'Blogging with Vue' },
          { id: 3, title: 'Why Vue is so fun' }
        ]
      }
    },
    computed:{
      evenNumbers:function () {
        return this.numbers.filter(function (number) {
          return number%2==0
        })
      }
    },
    methods:{
      greet:function (event) {
        alert('count1='+this.count1)
        if(this.count1>3) {
          alert('count1='+this.count1+" more than 3")
        }else{
          alert('count1='+this.count1+" less than 3")
        }
      },
      checkBoxFunc:function () {
        alert(this.checkedNames);
      }
    },
    components:{compoentA}
    // methods:{
    //   reverseMessage:function () {
    //     this.message=this.message.split('').reverse().join('');
    //   }
    // }
  }
</script>

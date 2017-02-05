import Vue from 'vue'
import AV from 'leancloud-storage'
var APP_ID = '8T4BiacRUOODhFzIP3Ruj2go-gzGzoHsz';
var APP_KEY = 'CFe5dgJu7sCwXws2HkqMsFyl';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//     words: 'Hello World!'
// }).then(function(object) {
//     alert('LeanCloud Rocks!');
// })

var app = new Vue({
  el: '#app',
  data: {
      actionType:'signUp',
    newTodo: '',
    todoList: [],
    currentUser: null,
      formData:{
          username:'',
          password:''
      }
  },
  created:function(){
  	window.onbeforeunload=()=>{
  		let dataString=JSON.stringify(this.todoList)
  		window.localStorage.setItem("myTodos",dataString)
  	}

  	let oldDataString=window.localStorage.getItem("myTodos")
  	let oldData=JSON.parse(oldDataString)
  	this.todoList=oldData||[]
  	this.currentUser=this.getCurrentUser();

  },
  methods: {
    addTodo: function(){
      this.todoList.push({
        title: this.newTodo,
        createdAt: ("创建于"+ new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()),
        done: false // 添加一个 done 属性
      })
      this.newTodo = ''
    },
    removeTodo:function(todo){
    	let index=this.todoList.indexOf(todo)
    	this.todoList.splice(index,1)
    },
      signUp: function () {
          let user = new AV.User();
          user.setUsername(this.formData.username);
          user.setPassword(this.formData.password);
          user.signUp().then((loginedUser) => {
              this.currentUser=this.getCurrentUser()
          },  (error) => {  alert("可能您所填写的用户名被注册啦，更换用户名试试")
          });
      },
      login: function () {
          AV.User.logIn(this.formData.username, this.formData.password).then( (loginedUser) => {
       this.currentUser=this.getCurrentUser()
          },  (error) => {  alert("登录失败，您所输入的用户名或密码有误，请重新输入")
          });
      },
      getCurrentUser: function () { // 
      	let current=AV.User.current()
      	if (current) {
      		let {id,createdAt,attributes:{username}} = current
      		return{ id,username,createdAt}
      	}else{
      		return null
      	}
      // let {id, createdAt, attributes: {username}} = AV.User.current()  

      // return {id, username, createdAt} 
    },
    logout:function(){
    	AV.User.logOut()
    	this.currentUser=null
    	window.location.reload()
    }
  }
})  
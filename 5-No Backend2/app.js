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
  	// window.onbeforeunload=()=>{
  	// 	let dataString=JSON.stringify(this.todoList)
  	// 	window.localStorage.setItem("myTodos",dataString)
  	// }

  	// let oldDataString=window.localStorage.getItem("myTodos")
  	// let oldData=JSON.parse(oldDataString)
  	// this.todoList=oldData||[]
  	this.currentUser=this.getCurrentUser();

    this.fetchTodos()

  },
  methods: {
    fetchTodos:function(){
          if(this.currentUser){
      var query = new AV.Query('AllTodos');
      query.find()
       .then((todos) => {
        let avAllTodos=todos[0]
        let id=avAllTodos.id
        this.todoList=JSON.parse(avAllTodos.attributes.content)
        this.todoList.id=id         
       }, function(error){
           console.error(error) 
      })
     }
    },
    updateTodos:function(){
      let dataString=JSON.stringify(this.todoList)
      let avTodos=AV.Object.createWithoutData('AllTodos',this.todoList.id)
      avTodos.set('content',dataString)
      avTodos.save().then(()=>{
        console.log('更新成功')
      })
    },
    saveTodos:function(){
      let dataString=JSON.stringify(this.todoList)
      var AVTodos=AV.Object.extend('AllTodos');
      var avTodos=new AVTodos();
      var acl=new AV.ACL()
      acl.setReadAccess(AV.User.current(),true)
      acl.setWriteAccess(AV.User.current(),true)
      avTodos.set('content',dataString);
      avTodos.setACL(acl)
      avTodos.save().then((todo) => {
        this.todoList.id=todo.id
        console.log("保存成功！");
      },function(error){
        alert("保存失败！");
        console.log("保存失败!")
      });
    },
    saveOrUpdateTodos:function(){
      if(this.todoList.id){
        this.updateTodos()
      }else{
        this.saveTodos()
      }
    },
    addTodo: function(){
      this.todoList.push({
        title: this.newTodo,
        createdAt: ("创建于"+ new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()),
        done: false // 添加一个 done 属性
      })
      this.newTodo = ''
      this.saveOrUpdateTodos()
    },
    removeTodo:function(todo){
    	let index=this.todoList.indexOf(todo)
    	this.todoList.splice(index,1)
       this.saveOrUpdateTodos()
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
        this.fetchTodos() 
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